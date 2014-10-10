<?php

namespace SilverStripe\Framework\Forms\Transformations;

/**
 * Class representing printable tabsets
 * @package forms
 * @subpackage transformations
 */
class PrintableTransformation_TabSet extends TabSet {
	public function __construct($tabs) {
		$this->children = $tabs;
		CompositeField::__construct($tabs);
	}

	public function FieldHolder($properties = array()) {
		// This gives us support for sub-tabs.
		$tag = ($this->tabSet) ? "h2>" : "h1>";

		foreach($this->children as $tab) {
			$retVal .= "<$tag" . $tab->Title() . "</$tag\n";
			$retVal .= $tab->FieldHolder();
		}
		return $retVal;

	}


}

