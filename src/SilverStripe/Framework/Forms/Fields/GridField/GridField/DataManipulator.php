<?php

namespace SilverStripe\Framework\Forms\Fields\GridField;

/**
 * Can modify the data list.
 *
 * For example, a paginating component can apply a limit, or a sorting
 * component can apply a sort.
 *
 * Generally, the data manipulator will make use of to {@link GridState}
 * variables to decide how to modify the {@link DataList}.
 *
 * @package forms
 * @subpackage fields-gridfield
 */
interface GridField_DataManipulator extends GridFieldComponent {

	/**
	 * Manipulate the {@link DataList} as needed by this grid modifier.
	 *
	 * @param GridField
	 * @param SS_List
	 * @return DataList
	 */
	public function getManipulatedData(GridField $gridField, SS_List $dataList);
}
