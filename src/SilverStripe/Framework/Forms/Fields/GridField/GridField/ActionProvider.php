<?php

namespace SilverStripe\Framework\Forms\Fields\GridField;

/**
 * An action is defined by two things: an action name, and zero or more named
 * arguments.
 *
 * There is no built-in notion of a record-specific or column-specific action,
 * but you may choose to define an argument such as ColumnName or RecordID in
 * order to implement these.
 *
 * Does not provide interface elements to call those actions.
 *
 * @see {@link GridField_FormAction}.
 *
 * @package forms
 * @subpackage fields-gridfield
 */
interface GridField_ActionProvider extends GridFieldComponent {
	/**
	 * Return a list of the actions handled by this action provider.
	 *
	 * Used to identify the action later on through the $actionName parameter
	 * in {@link handleAction}.
	 *
	 * There is no namespacing on these actions, so you need to ensure that
	 * they don't conflict with other components.
	 *
	 * @param GridField
	 * @return Array with action identifier strings.
	 */
	public function getActions($gridField);

	/**
	 * Handle an action on the given {@link GridField}.
	 *
	 * Calls ALL components for every action handled, so the component needs
	 * to ensure it only accepts actions it is actually supposed to handle.
	 *
	 * @param GridField
	 * @param String Action identifier, see {@link getActions()}.
	 * @param Array Arguments relevant for this
	 * @param Array All form data
	 */
	public function handleAction(GridField $gridField, $actionName, $arguments, $data);
}