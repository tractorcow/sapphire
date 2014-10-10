<?php

namespace SilverStripe\Framework\Forms\Fields;

/**
 * Encapsulation of an oembed tag, linking to an external media source.
 *
 * @see Oembed
 * @package forms
 * @subpackage fields-formattedinput
 */
class HtmlEditorField_Embed extends HtmlEditorField_File {

	private static $casting = array(
		'Type' => 'Varchar',
		'Info' => 'Varchar'
	);

	protected $oembed;

	public function __construct($url, $file = null) {
		parent::__construct($url, $file);
		$this->oembed = Oembed::get_oembed_from_url($url);
		if(!$this->oembed) {
			$controller = Controller::curr();
			$controller->response->addHeader('X-Status',
				rawurlencode(_t(
					'HtmlEditorField.URLNOTANOEMBEDRESOURCE',
					"The URL '{url}' could not be turned into a media resource.",
					"The given URL is not a valid Oembed resource; the embed element couldn't be created.",
					array('url' => $url)
				)));
			$controller->response->setStatusCode(404);

			throw new SS_HTTPResponse_Exception($controller->response);
		}
	}

	public function getWidth() {
		return $this->oembed->Width ?: 100;
	}

	public function getHeight() {
		return $this->oembed->Height ?: 100;
	}

	/**
	 * Provide an initial width for inserted media, restricted based on $embed_width
	 *
	 * @return int
	 */
	public function getInsertWidth() {
		$width = $this->getWidth();
		$maxWidth = Config::inst()->get('HtmlEditorField', 'insert_width');
		return ($width <= $maxWidth) ? $width : $maxWidth;
	}

	/**
	 * Provide an initial height for inserted media, scaled proportionally to the initial width
	 *
	 * @return int
	 */
	public function getInsertHeight() {
		$width = $this->getWidth();
		$height = $this->getHeight();
		$maxWidth = Config::inst()->get('HtmlEditorField', 'insert_width');
		return ($width <= $maxWidth) ? $height : round($height*($maxWidth/$width));
	}

	public function getPreview() {
		if(isset($this->oembed->thumbnail_url)) {
			return sprintf('<img src="%s" />', Convert::raw2att($this->oembed->thumbnail_url));
		}
	}

	public function getName() {
		if(isset($this->oembed->title)) {
			return $this->oembed->title;
		} else {
			return parent::getName();
		}
	}

	public function getType() {
		return $this->oembed->type;
	}

	public function getOembed() {
		return $this->oembed;
	}

	public function appCategory() {
		return 'embed';
	}

	public function getInfo() {
		return $this->oembed->info;
	}
}
