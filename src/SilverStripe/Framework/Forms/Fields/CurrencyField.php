<?php

namespace SilverStripe\Framework\Forms\Fields;

/**
 * Renders a text field, validating its input as a currency.
 * Limited to US-centric formats, including a hardcoded currency
 * symbol and decimal separators.
 * See {@link MoneyField} for a more flexible implementation.
 *
 * @todo Add localization support, see http://open.silverstripe.com/ticket/2931
 *
 * @package forms
 * @subpackage fields-formattedinput
 */
class CurrencyField extends TextField {
	/**
	 * allows the value to be set. removes the first character
	 * if it is not a number (probably a currency symbol)
	 */
	public function setValue($val) {
		if(!$val) $val = 0.00;
		$this->value = '$' . number_format((double)preg_replace('/[^0-9.\-]/', '', $val), 2);
		return $this;
	}
	/**
	 * Overwrite the datavalue before saving to the db ;-)
	 * return 0.00 if no value, or value is non-numeric
	 */
	public function dataValue() {
		if($this->value) {
			return preg_replace('/[^0-9.\-]/','', $this->value);
		}else{
			return 0.00;
		}
	}

	public function Type() {
		return 'currency text';
	}

	/**
	 * Create a new class for this field
	 */
	public function performReadonlyTransformation() {
		return $this->castedCopy('CurrencyField_Readonly');
	}

	public function validate($validator) {
		if(!empty ($this->value)
				&& !preg_match('/^\s*(\-?\$?|\$\-?)?(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?\s*$/', $this->value)) {

			$validator->validationError($this->name, _t('Form.VALIDCURRENCY', "Please enter a valid currency"),
				"validation", false);
			return false;
		}
		return true;
	}
}
