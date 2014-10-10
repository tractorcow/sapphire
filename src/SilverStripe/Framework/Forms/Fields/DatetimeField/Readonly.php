<?php

namespace SilverStripe\Framework\Forms\Fields;

/**
 * The readonly class for our {@link DatetimeField}.
 *
 * @package forms
 * @subpackage fields-datetime
 */
class DatetimeField_Readonly extends DatetimeField {

	protected $readonly = true;

	public function Field($properties = array()) {
		$valDate = $this->dateField->dataValue();
		$valTime = $this->timeField->dataValue();

		if($valDate && $valTime) {
			$format = sprintf(
				$this->getConfig('datetimeorder'),
				$this->dateField->getConfig('dateformat'),
				$this->timeField->getConfig('timeformat')
			);
			$valueObj = new Zend_Date(
				sprintf($this->getConfig('datetimeorder'), $valDate, $valTime),
				$this->getConfig('datavalueformat'),
				$this->dateField->getLocale()
			);
			$val = $valueObj->toString($format);

		} else {
			$val = sprintf('<em>%s</em>', _t('DatetimeField.NOTSET', 'Not set'));
		}

		return "<span class=\"readonly\" id=\"" . $this->id() . "\">$val</span>";
	}

	public function validate($validator) {
		return true;
	}
}
