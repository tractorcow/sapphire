<?php

namespace SilverStripe\Framework\Forms\Fields;

/**
 * Disabled version of {@link DateField}.
 * Allows dates to be represented in a form, by showing in a user friendly format, eg, dd/mm/yyyy.
 * @package forms
 * @subpackage fields-datetime
 */
class DateField_Disabled extends DateField {

	protected $disabled = true;

	public function Field($properties = array()) {
		if($this->valueObj) {
			if($this->valueObj->isToday()) {
				$val = Convert::raw2xml($this->valueObj->toString($this->getConfig('dateformat'))
					. ' ('._t('DateField.TODAY','today').')');
			} else {
				$df = new Date($this->name);
				$df->setValue($this->dataValue());
				$val = Convert::raw2xml($this->valueObj->toString($this->getConfig('dateformat'))
					. ', ' . $df->Ago());
			}
		} else {
			$val = '<i>('._t('DateField.NOTSET', 'not set').')</i>';
		}

		return "<span class=\"readonly\" id=\"" . $this->id() . "\">$val</span>";
	}

	public function Type() {
		return "date_disabled readonly";
	}

	public function validate($validator) {
		return true;
	}
}