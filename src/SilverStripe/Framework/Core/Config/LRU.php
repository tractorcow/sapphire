<?php

namespace SilverStripe\Framework\Core;

/**
 * @package framework
 * @subpackage core
 */
class Config_LRU {
	const SIZE = 1000;

	protected $cache;
	protected $indexing;

	protected $i = 0;
	protected $c = 0;

	public function __construct() {
		if (version_compare(PHP_VERSION, '5.3.7', '<')) {
			// SplFixedArray causes seg faults before PHP 5.3.7
			$this->cache = array();
		}
		else {
			$this->cache = new SplFixedArray(self::SIZE);
		}

		// Pre-fill with stdClass instances. By reusing we avoid object-thrashing
		for ($i = 0; $i < self::SIZE; $i++) {
			$this->cache[$i] = new stdClass();
			$this->cache[$i]->key = null;
		}

		$this->indexing = array();
	}

	public function __clone() {
		if (version_compare(PHP_VERSION, '5.3.7', '<')) {
			// SplFixedArray causes seg faults before PHP 5.3.7
			$cloned = array();
		}
		else {
			$cloned = new SplFixedArray(self::SIZE);
		}
		for ($i = 0; $i < self::SIZE; $i++) {
			$cloned[$i] = clone $this->cache[$i];
		}
		$this->cache = $cloned;
	}

	public function set($key, $val, $tags = array()) {
		// Find an index to set at
		$replacing = null;

		// Target count - not always the lowest, but guaranteed to exist (or hit an empty item)
		$target = $this->c - self::SIZE + 1;
		$i = $stop = $this->i;

		do {
			if (!($i--)) $i = self::SIZE-1;
			$item = $this->cache[$i];

			if ($item->key === null) { $replacing = null; break; }
			else if ($item->c <= $target) { $replacing = $item; break; }
		}
		while ($i != $stop);

		if ($replacing) unset($this->indexing[$replacing->key]);

		$this->indexing[$key] = $this->i = $i;

		$obj = $this->cache[$i];
		$obj->key = $key;
		$obj->value = $val;
		$obj->tags = $tags;
		$obj->c = ++$this->c;
	}

	private $hit = 0;
	private $miss = 0;

	public function stats() {
		return $this->miss ? ($this->hit / $this->miss) : 0;
	}

	public function get($key) {
		if (isset($this->indexing[$key])) {
			$this->hit++;

			$res = $this->cache[$this->indexing[$key]];
			$res->c = ++$this->c;
			return $res->value;
		}

		$this->miss++;
		return false;
	}

	public function clean($tag = null) {
		if ($tag) {
			foreach ($this->cache as $i => $v) {
				if ($v->key !== null && in_array($tag, $v->tags)) {
					unset($this->indexing[$v->key]);
					$this->cache[$i]->key = null;
				}
			}
		}
		else {
			for ($i = 0; $i < self::SIZE; $i++) $this->cache[$i]->key = null;
			$this->indexing = array();
		}
	}
}