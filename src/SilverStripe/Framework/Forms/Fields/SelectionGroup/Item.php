<?php

namespace SilverStripe\Framework\Forms\Fields;

class SelectionGroup_Item extends CompositeField {

	/**
	 * @var String
	 */
	protected $value;

	/**
	 * @var String
	 */
	protected $title;

	/**
	 * @param String $value Form field identifier
	 * @param FormField $field Contents of the option
	 * @param String $title Title to show for the radio button option
	 */
	function __construct($value, $fields = null, $title = null) {
		$this->value = $value;
		$this->title = ($title) ? $title : $value;
		if($fields && !is_array($fields)) $fields = array($fields);

		parent::__construct($fields);
	}

	function getTitle() {
		return $this->title;
	}

	function setTitle($title) {
		$this->title = $title;
		return $this;
	}

	function getValue() {
		return $this->value;
	}

	function setValue($Value) {
		$this->value = $Value;
		return $this;
	}

}
