<?php

namespace SilverStripe\Framework\Core\Manifest;

/**
 * Stores manifest data in APC.
 * Note: benchmarks seem to indicate this is not particularly faster than _File
 *
 * @package framework
 * @subpackage manifest
 */
class ManifestCache_APC implements ManifestCache {
	protected $pre;

	function __construct($name) {
		$this->pre = $name;
	}

	function load($key) {
		return apc_fetch($this->pre.$key);
	}

	function save($data, $key) {
		apc_store($this->pre.$key, $data);
	}

	function clear() {
	}
}
