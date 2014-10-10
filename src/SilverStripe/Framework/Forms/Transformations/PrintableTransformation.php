<?php

namespace SilverStripe\Framework\Forms\Transformations;

/**
 * Transformation that will make a form printable.
 * Builds on readonly forms with different behaviour for tabsets.
 * @package forms
 * @subpackage transformations
 */
class PrintableTransformation extends ReadonlyTransformation {
	public function transformTabSet($field) {
		$transformedField = new PrintableTransformation_TabSet($field->Tabs()->transform($this));
		$transformedField->Title = $field->Title();
		$transformedField->TabSet = $field->TabSet;
		return $transformedField;
	}
}