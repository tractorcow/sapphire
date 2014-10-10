<?php

namespace SilverStripe\Framework\Forms\Fields;

/**
 * Readonly version of {@link InlineFormAction}.
 * @package forms
 * @subpackage actions
 */
class InlineFormAction_ReadOnly extends FormField {

	protected $readonly = true;

	public function Field($properties = array()) {
		return "<input type=\"submit\" name=\"action_{$this->name}\" value=\"{$this->title}\" id=\"{$this->id()}\""
			. " disabled=\"disabled\" class=\"action disabled$this->extraClass\" />";
	}

	public function Title() {
		return false;
	}
}
