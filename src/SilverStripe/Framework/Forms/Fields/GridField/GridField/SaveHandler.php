<?php

namespace SilverStripe\Framework\Forms\Fields\GridField;

/**
 * A component which is used to handle when a {@link GridField} is saved into
 * a record.
 *
 * @package forms
 * @subpackage fields-gridfield
 */
interface GridField_SaveHandler extends GridFieldComponent {

	/**
	 * Called when a grid field is saved - i.e. the form is submitted.
	 *
	 * @param GridField $field
	 * @param DataObjectInterface $record
	 */
	public function handleSave(GridField $grid, DataObjectInterface $record);

}
