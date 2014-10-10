<?php

namespace SilverStripe\Framework\Forms\Fields;

/**
 * Readonly version of a checkbox field - "Yes" or "No".
 *
 * @package forms
 * @subpackage fields-basic
 */
class CheckboxField_Readonly extends ReadonlyField {

	public function performReadonlyTransformation() {
		return clone $this;
	}

	public function Value() {
		return Convert::raw2xml($this->value ?
			_t('CheckboxField.YESANSWER', 'Yes') :
			_t('CheckboxField.NOANSWER', 'No'));
	}

}
