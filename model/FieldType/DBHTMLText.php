<?php

namespace SilverStripe\Model\FieldType;

use Injector;
use HTTP;
use ShortcodeParser;
use DOMDocument;
use HTMLEditorField;
use TextField;
use Exception;

/**
 * Represents a large text field that contains HTML content.
 * This behaves similarly to {@link Text}, but the template processor won't escape any HTML content within it.
 *
 * Options can be specified in a $db config via one of the following:
 *  - "HTMLFragment(['shortcodes=true', 'whitelist=meta,link'])"
 *  - "HTMLFragment('whitelist=meta,link')"
 *  - "HTMLFragment(['shortcodes=true'])". "HTMLText" is also a synonym for this.
 *  - "HTMLFragment('shortcodes=true')"
 *
 * @see HTMLVarchar
 * @see Text
 * @see Varchar
 *
 * @package framework
 * @subpackage model
 */
class DBHTMLText extends DBText {
	private static $escape_type = 'xml';

	private static $casting = array(
		"AbsoluteLinks" => "HTMLFragment",
		"BigSummary" => "HTMLFragment",
		"ContextSummary" => "HTMLFragment",
		"FirstParagraph" => "HTMLFragment",
		"FirstSentence" => "HTMLFragment",
		"LimitCharacters" => "HTMLFragment",
		"LimitSentences" => "HTMLFragment",
		"Lower" => "HTMLFragment",
		"LowerCase" => "HTMLFragment",
		"Summary" => "HTMLFragment",
		"Upper" => "HTMLFragment",
		"UpperCase" => "HTMLFragment",
		"EscapeXML" => "HTMLFragment",
		"LimitWordCount" => "HTMLFragment",
		"LimitWordCountXML" => "HTMLFragment",
		"NoHTML" => "Text",
	);

	/**
	 * Enable shortcode parsing on this field
	 *
	 * @var bool
	 */
	protected $processShortcodes = false;

	/**
	 * Check if shortcodes are enabled
	 *
	 * @return bool
	 */
	public function getProcessShortcodes() {
		return $this->processShortcodes;
	}

	/**
	 * Set shortcodes on or off by default
	 *
	 * @param bool $process
	 * @return $this
	 */
	public function setProcessShortcodes($process) {
		$this->processShortcodes = (bool)$process;
		return $this;
	}

	/**
	 * List of html properties to whitelist
	 *
	 * @var array
	 */
	protected $whitelist = [];

	/**
	 * List of html properties to whitelist
	 *
	 * @return array
	 */
	public function getWhitelist() {
		return $this->whitelist;
	}

	/**
	 * Set list of html properties to whitelist
	 *
	 * @param array $whitelist
	 * @return $this
	 */
	public function setWhitelist($whitelist) {
		if(!is_array($whitelist)) {
			$whitelist = preg_split('/\s*,\s*/', $whitelist);
		}
		$this->whitelist = $whitelist;
		return $this;
	}

	/**
	 * @param array $options
	 *
	 * Options accepted in addition to those provided by Text:
	 *
	 *   - shortcodes: If true, shortcodes will be turned into the appropriate HTML.
	 *                 If false, shortcodes will not be processed.
	 *
	 *   - whitelist: If provided, a comma-separated list of elements that will be allowed to be stored
	 *                (be careful on relying on this for XSS protection - some seemingly-safe elements allow
	 *                attributes that can be exploited, for instance <img onload="exploiting_code();" src="..." />)
	 *                Text nodes outside of HTML tags are filtered out by default, but may be included by adding
	 *                the text() directive. E.g. 'link,meta,text()' will allow only <link /> <meta /> and text at
	 *                the root level.
	 *
	 * @return $this
	 */
	public function setOptions(array $options = array()) {
		if(array_key_exists("shortcodes", $options)) {
			$this->setProcessShortcodes(!!$options["shortcodes"]);
		}

		if(array_key_exists("whitelist", $options)) {
			$this->setWhitelist($options['whitelist']);
		}

		return parent::setOptions($options);
	}

	/**
	 * Create a summary of the content. This will be some section of the first paragraph, limited by
	 * $maxWords. All internal tags are stripped out - the return value is a string
	 *
	 * This is sort of the HTML aware equivilent to Text#Summary, although the logic for summarising is not exactly
	 * the same
	 *
	 * @param int $maxWords Maximum number of words to return - may return less, but never more. Pass -1 for no limit
	 * @param int $flex Number of words to search through when looking for a nice cut point
	 * @param string $add What to add to the end of the summary if we cut at a less-than-ideal cut point
	 * @return string A nice(ish) summary with no html tags (but possibly still some html entities)
	 *
	 * @see framework/core/model/fieldtypes/Text#Summary($maxWords)
	 */
	public function Summary($maxWords = 50, $flex = 15, $add = '...') {
		$str = false;

		/* First we need the text of the first paragraph, without tags. Try using SimpleXML first */
		if (class_exists('SimpleXMLElement')) {
			$doc = new DOMDocument();

			// Catch warnings thrown by loadHTML and turn them into a failure boolean rather than a SilverStripe error
			set_error_handler(create_function('$no, $str', 'throw new Exception("HTML Parse Error: ".$str);'), E_ALL);
			//  Nonbreaking spaces get converted into weird characters, so strip them
			$value = str_replace('&nbsp;', ' ', $this->value);
			try {
				$res = $doc->loadHTML('<meta content="text/html; charset=utf-8" http-equiv="Content-type"/>' . $value);
			}
			catch (Exception $e) { $res = false; }
			restore_error_handler();

			if ($res) {
				$xml = simplexml_import_dom($doc);
				$res = $xml->xpath('//p');
				if (!empty($res)) $str = strip_tags($res[0]->asXML());
			}
		}

		/* If that failed, most likely the passed HTML is broken. use a simple regex + a custom more brutal strip_tags.
		 * We don't use strip_tags because that does very badly on broken HTML */
		if (!$str) {
			/* See if we can pull a paragraph out*/

			// Strip out any images in case there's one at the beginning. Not doing this will return a blank paragraph
			$str = preg_replace('{^\s*(<.+?>)*<img[^>]*>}', '', $this->value);
			if (preg_match('{<p(\s[^<>]*)?>(.*[A-Za-z]+.*)</p>}', $str, $matches)) $str = $matches[2];

			/* If _that_ failed, just use the whole text */
			if (!$str) $str = $this->value;

			/* Now pull out all the html-alike stuff */
			/* Take out anything that is obviously a tag */
			$str = preg_replace('{</?[a-zA-Z]+[^<>]*>}', '', $str);
			/* Strip out any left over looking bits. Textual < or > should already be encoded to &lt; or &gt; */
			$str = preg_replace('{</|<|>}', '', $str);
		}

		/* Now split into words. If we are under the maxWords limit, just return the whole string (re-implode for
		 * whitespace normalization) */
		$words = preg_split('/\s+/', $str);
		if ($maxWords == -1 || count($words) <= $maxWords) return implode(' ', $words);

		/* Otherwise work backwards for a looking for a sentence ending (we try to avoid abbreviations, but aren't
		 * very good at it) */
		for ($i = $maxWords; $i >= $maxWords - $flex && $i >= 0; $i--) {
			if (preg_match('/\.$/', $words[$i]) && !preg_match('/(Dr|Mr|Mrs|Ms|Miss|Sr|Jr|No)\.$/i', $words[$i])) {
				return implode(' ', array_slice($words, 0, $i+1));
			}
		}

		// If we didn't find a sentence ending quickly enough, just cut at the maxWords point and add '...' to the end
		return implode(' ', array_slice($words, 0, $maxWords)) . $add;
	}

	/**
	 * Returns the first sentence from the first paragraph. If it can't figure out what the first paragraph is (or
	 * there isn't one), it returns the same as Summary()
	 *
	 * This is the HTML aware equivilent to Text#FirstSentence
	 *
	 * @see framework/core/model/fieldtypes/Text#FirstSentence()
	 */
	public function FirstSentence() {
		/* Use summary's html processing logic to get the first paragraph */
		$paragraph = $this->Summary(-1);

		/* Then look for the first sentence ending. We could probably use a nice regex, but for now this will do */
		$words = preg_split('/\s+/', $paragraph);
		foreach ($words as $i => $word) {
			if (preg_match('/(!|\?|\.)$/', $word) && !preg_match('/(Dr|Mr|Mrs|Ms|Miss|Sr|Jr|No)\.$/i', $word)) {
				return implode(' ', array_slice($words, 0, $i+1));
			}
		}

		/* If we didn't find a sentence ending, use the summary. We re-call rather than using paragraph so that
		 * Summary will limit the result this time */
		return $this->Summary();
	}

	/**
	 * Return the value of the field with relative links converted to absolute urls (with placeholders parsed).
	 * @return string
	 */
	public function AbsoluteLinks() {
		return HTTP::absoluteURLs($this->forTemplate());
	}

	public function forTemplate() {
		return $this->XML();
	}

	public function XML() {
		if ($this->processShortcodes) {
			return ShortcodeParser::get_active()->parse($this->value);
		} else {
			return $this->value;
		}
	}

	/**
	 * Safely escape for XML string
	 *
	 * @return string
	 */
	public function CDATA() {
		return sprintf(
			'<![CDATA[%s]]>',
			str_replace(']]>', ']]]]><![CDATA[>', $this->XML())
		);
	}

	public function prepValueForDB($value) {
		return parent::prepValueForDB($this->whitelistContent($value));
	}

	/**
	 * Filter the given $value string through the whitelist filter
	 *
	 * @param string $value Input html content
	 * @return string Value with all non-whitelisted content stripped (if applicable)
	 */
	public function whitelistContent($value) {
		if($this->whitelist) {
			$dom = Injector::inst()->create('HTMLValue', $value);

			$query = array();
			$textFilter = ' | //body/text()';
			foreach ($this->whitelist as $tag) {
				if($tag === 'text()') {
					$textFilter = ''; // Disable text filter if allowed
				} else {
					$query[] = 'not(self::'.$tag.')';
				}
			}

			foreach($dom->query('//body//*['.implode(' and ', $query).']'.$textFilter) as $el) {
				if ($el->parentNode) $el->parentNode->removeChild($el);
			}

			$value = $dom->getContent();
		}
		return $value;
	}

	/**
	 * Returns true if the field has meaningful content.
	 * Excludes null content like <h1></h1>, <p></p> ,etc
	 *
	 * @return boolean
	 */
	public function exists() {
		// If it's blank, it's blank
		if(!parent::exists()) {
			return false;
		}

		// If it's got a content tag
		if(preg_match('/<(img|embed|object|iframe|meta|source|link)[^>]*>/i', $this->value)) {
			return true;
		}

		// If it's just one or two tags on its own (and not the above) it's empty.
		// This might be <p></p> or <h1></h1> or whatever.
		if(preg_match('/^[\\s]*(<[^>]+>[\\s]*){1,2}$/', $this->value)) {
			return false;
		}

		// Otherwise its content is genuine content
		return true;
	}

	public function scaffoldFormField($title = null, $params = null) {
		return new HTMLEditorField($this->name, $title);
	}

	public function scaffoldSearchField($title = null, $params = null) {
		return new TextField($this->name, $title);
	}

}


