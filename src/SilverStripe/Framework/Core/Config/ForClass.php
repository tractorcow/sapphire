<?php

namespace SilverStripe\Framework\Core;

/**
 * @package framework
 * @subpackage core
 */
class Config_ForClass {

	/**
	 * @var string $class
	 */
	protected $class;

	/**
	 * @param string $class
	 */
	public function __construct($class) {
		$this->class = $class;
	}

	/**
	 * @param string $name
	 */
	public function __get($name) {
		return Config::inst()->get($this->class, $name);
	}

	/**
	 * @param string $name
	 * @param mixed $val
	 */
	public function __set($name, $val) {
		return Config::inst()->update($this->class, $name, $val);
	}

	/**
	 * @param string $name
	 * @param int $sourceOptions
	 *
	 * @return array|scalar
	 */
	public function get($name, $sourceOptions = 0) {
		return Config::inst()->get($this->class, $name, $sourceOptions);
	}

	/**
	 * @param string
	 *
	 * @return Config_ForClass
	 */
	public function forClass($class) {
		return Config::inst()->forClass($class);
	}
}
