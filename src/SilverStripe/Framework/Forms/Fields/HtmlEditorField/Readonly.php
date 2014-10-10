<?php

namespace SilverStripe\Framework\Forms\Fields;

/**
 * Readonly version of an {@link HTMLEditorField}.
 * @package forms
 * @subpackage fields-formattedinput
 */
class HtmlEditorField_Readonly extends ReadonlyField {
	public function Field($properties = array()) {
		$valforInput = $this->value ? Convert::raw2att($this->value) : "";
		return "<span class=\"readonly typography\" id=\"" . $this->id() . "\">"
			. ( $this->value && $this->value != '<p></p>' ? $this->value : '<i>(not set)</i>' )
			. "</span><input type=\"hidden\" name=\"".$this->name."\" value=\"".$valforInput."\" />";
	}
	public function Type() {
		return 'htmleditorfield readonly';
	}
}
