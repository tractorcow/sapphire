<?php

namespace SilverStripe\Framework\Forms\Fields\GridField;

/**
 * This class is the base class when you want to have an action that alters
 * the state of the {@link GridField}, rendered as a button element.
 *
 * @package forms
 * @subpackage fields-gridfield
 */
class GridField_FormAction extends FormAction {

	/**
	 * @var GridField
	 */
	protected $gridField;

	/**
	 * @var array
	 */
	protected $stateValues;

	/**
	 * @var array
	 */
	protected $args = array();

	/**
	 * @var string
	 */
	protected $actionName;

	/**
	 * @var boolean
	 */
	public $useButtonTag = true;

	/**
	 * @param GridField $gridField
	 * @param string $name
	 * @param string $label
	 * @param string $actionName
	 * @param array $args
	 */
	public function __construct(GridField $gridField, $name, $title, $actionName, $args) {
		$this->gridField = $gridField;
		$this->actionName = $actionName;
		$this->args = $args;

		parent::__construct($name, $title);
	}

	/**
	 * urlencode encodes less characters in percent form than we need - we
	 * need everything that isn't a \w.
	 *
	 * @param string $val
	 */
	public function nameEncode($val) {
		return preg_replace_callback('/[^\w]/', array($this, '_nameEncode'), $val);
	}

	/**
	 * The callback for nameEncode
	 *
	 * @param string $val
	 */
	public function _nameEncode($match) {
		return '%'.dechex(ord($match[0]));
	}

	/**
	 * @return array
	 */
	public function getAttributes() {
		// Store state in session, and pass ID to client side.
		$state = array(
			'grid' => $this->getNameFromParent(),
			'actionName' => $this->actionName,
			'args' => $this->args,
		);

		$id = preg_replace('/[^\w]+/', '_', uniqid('', true));
		Session::set($id, $state);
		$actionData['StateID'] = $id;

		return array_merge(
			parent::getAttributes(),
			array(
				// Note:  This field needs to be less than 65 chars, otherwise Suhosin security patch
				// will strip it from the requests
				'name' => 'action_gridFieldAlterAction'. '?' . http_build_query($actionData),
				'data-url' => $this->gridField->Link(),
			)
		);
	}

	/**
	 * Calculate the name of the gridfield relative to the Form
	 *
	 * @param GridField $base
	 * @return string
	 */
	protected function getNameFromParent() {
		$base = $this->gridField;
		$name = array();

		do {
			array_unshift($name, $base->getName());
			$base = $base->getForm();
		} while ($base && !($base instanceof Form));

		return implode('.', $name);
	}
}
