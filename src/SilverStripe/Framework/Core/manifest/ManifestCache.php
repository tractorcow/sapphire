<?php

namespace SilverStripe\Framework\Core\Manifest;

/**
 * A basic caching interface that manifests use to store data.
 *
 * @package framework
 * @subpackage manifest
 */
interface ManifestCache {
	public function __construct($name);
	public function load($key);
	public function save($data, $key);
	public function clear();
}
