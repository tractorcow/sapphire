<?php

namespace SilverStripe\Framework\Forms\Fields\GridField;

/**
 * Allows viewing readonly details of individual records.
 *
 * @package forms
 * @subpackage fields-gridfield
 */
class GridFieldConfig_RecordViewer extends GridFieldConfig_Base {

	public function __construct($itemsPerPage = null) {
		parent::__construct($itemsPerPage);

		$this->addComponent(new GridFieldViewButton());
		$this->addComponent(new GridFieldDetailForm());

		$this->extend('updateConfig');
	}

}
