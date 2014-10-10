<?php

namespace SilverStripe\Framework\Forms\Fields;

/**
 * Encapsulation of an image tag, linking to an image either internal or external to the site.
 *
 * @package forms
 * @subpackage fields-formattedinput
 */
class HtmlEditorField_Image extends HtmlEditorField_File {

	protected $width;

	protected $height;

	public function __construct($url, $file = null) {
		parent::__construct($url, $file);

		// Get dimensions for remote file
		$info = @getimagesize($url);
		if($info) {
			$this->width = $info[0];
			$this->height = $info[1];
		}
	}

	public function getWidth() {
		return ($this->file) ? $this->file->Width : $this->width;
	}

	public function getHeight() {
		return ($this->file) ? $this->file->Height : $this->height;
	}

	/**
	 * Provide an initial width for inserted image, restricted based on $embed_width
	 *
	 * @return int
	 */
	public function getInsertWidth() {
		$width = $this->getWidth();
		$maxWidth = Config::inst()->get('HtmlEditorField', 'insert_width');
		return ($width <= $maxWidth) ? $width : $maxWidth;
	}

	/**
	 * Provide an initial height for inserted image, scaled proportionally to the initial width
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
		return ($this->file) ? $this->file->CMSThumbnail() : sprintf('<img src="%s" />', Convert::raw2att($this->url));
	}

}
