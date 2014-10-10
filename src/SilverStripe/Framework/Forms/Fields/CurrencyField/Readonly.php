<?php

namespace SilverStripe\Framework\Forms\Fields;

/**
 * Readonly version of a {@link CurrencyField}.
 * @package forms
 * @subpackage fields-formattedinput
 */
class CurrencyField_Readonly extends ReadonlyField {

	/**
	 * overloaded to display the correctly formated value for this datatype
	 */
	public function Field($properties = array()) {
		if($this->value){
			$val = $this->dontEscape ? $this->value : Convert::raw2xml($this->value);
			$val = _t('CurrencyField.CURRENCYSYMBOL', '$') . number_format(preg_replace('/[^0-9.]/',"",$val), 2);
		} else {
			$val = '<i>'._t('CurrencyField.CURRENCYSYMBOL', '$').'0.00</i>';
		}
		$valforInput = $this->value ? Convert::raw2att($val) : "";
		return "<span class=\"readonly ".$this->extraClass()."\" id=\"" . $this->id() . "\">$val</span>"
			. "<input type=\"hidden\" name=\"".$this->name."\" value=\"".$valforInput."\" />";
	}

	/**
	 * This already is a readonly field.
	 */
	public function performReadonlyTransformation() {
		return clone $this;
	}

}
