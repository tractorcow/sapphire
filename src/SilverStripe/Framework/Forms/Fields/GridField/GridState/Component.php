<?php

namespace SilverStripe\Framework\Forms\Fields\GridField;

/**
 * @see GridState
 *
 * @package forms
 * @subpackage fields-gridfield
 */
class GridState_Component implements GridField_HTMLProvider {

	public function getHTMLFragments($gridField) {
		return array(
			'before' => $gridField->getState(false)->Field()
		);
	}
}
