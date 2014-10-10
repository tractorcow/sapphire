<?php

namespace SilverStripe\Framework\Forms\Fields;

/**
 * Encapsulation of a file which can either be a remote URL
 * or a {@link File} on the local filesystem, exhibiting common properties
 * such as file name or the URL.
 *
 * @todo Remove once core has support for remote files
 * @package forms
 * @subpackage fields-formattedinput
 */
class HtmlEditorField_File extends ViewableData {

	private static $casting = array(
		'URL' => 'Varchar',
		'Name' => 'Varchar'
	);

	/** @var String */
	protected $url;

	/** @var File */
	protected $file;

	/**
	 * @param String
	 * @param File
	 */
	public function __construct($url, $file = null) {
		$this->url = $url;
		$this->file = $file;
		$this->failover = $file;

		parent::__construct();
	}

	/**
	 * @return File Might not be set (for remote files)
	 */
	public function getFile() {
		return $this->file;
	}

	public function getURL() {
		return $this->url;
	}

	public function getName() {
		return ($this->file) ? $this->file->Name : preg_replace('/\?.*/', '', basename($this->url));
	}

	/**
	 * @return String HTML
	 */
	public function getPreview() {
		$preview = $this->extend('getPreview');
		if($preview) return $preview;

		if($this->file) {
			return $this->file->CMSThumbnail();
		} else {
			// Hack to use the framework's built-in thumbnail support without creating a local file representation
			$tmpFile = new File(array('Name' => $this->Name, 'Filename' => $this->Name));
			return $tmpFile->CMSThumbnail();
		}
	}

	public function getExtension() {
		return strtolower(($this->file) ? $this->file->Extension : pathinfo($this->Name, PATHINFO_EXTENSION));
	}

	public function appCategory() {
		if($this->file) {
			return $this->file->appCategory();
		} else {
			// Hack to use the framework's built-in thumbnail support without creating a local file representation
			$tmpFile = new File(array('Name' => $this->Name, 'Filename' => $this->Name));
			return $tmpFile->appCategory();
		}
	}

}
