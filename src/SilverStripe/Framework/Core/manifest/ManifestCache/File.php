<?php

namespace SilverStripe\Framework\Core\Manifest;

/**
 * Stores manifest data in files in TEMP_DIR dir on filesystem
 *
 * @package framework
 * @subpackage manifest
 */
class ManifestCache_File implements ManifestCache {
	function __construct($name) {
		$this->folder = TEMP_FOLDER.'/'.$name;
		if (!is_dir($this->folder)) mkdir($this->folder);
	}

	function load($key) {
		$file = $this->folder.'/cache_'.$key;
		return file_exists($file) ? unserialize(file_get_contents($file)) : null;
	}

	function save($data, $key) {
		$file = $this->folder.'/cache_'.$key;
		file_put_contents($file, serialize($data));
	}

	function clear() {
		array_map('unlink', glob($this->folder.'/cache_*'));
	}
}
