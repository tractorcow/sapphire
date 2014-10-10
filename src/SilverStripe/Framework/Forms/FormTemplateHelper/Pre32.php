<?php

namespace SilverStripe\Framework\Forms;

/**
 * Note that this will cause duplicate and invalid ID attributes.
 *
 * @deprecated 4.0
 *
 * @package framework
 * @subpackage forms
 */
class FormTemplateHelper_Pre32 extends FormTemplateHelper {

	/**
	 * @param Form
	 *
	 * @return string
	 */
	public function generateFormID($form) {
		if($id = $form->getHTMLID()) {
			return $id;
		}

		return sprintf("%s_%s",
			$form->class,
			str_replace(array('.', '/'), '', $form->getName())
		);
	}

	/**
	 * @param FormField
	 *
	 * @return string
	 */
	public function generateFieldHolderID($field) {
		return $field->getName();
	}

	/**
	 * @param FormField
	 *
	 * @return string
	 */
	public function generateFieldID($field) {
		$name = preg_replace(
			'/(^-)|(-$)/', '',
			preg_replace('/[^A-Za-z0-9_-]+/', '-', $field->getName())
		);

		if($form = $field->getForm()) {
			$form = sprintf("%s_%s",
				get_class($form),
				str_replace(array('.', '/'), '', $form->getName())
			);

			return $form . '_' . $name;
		}

		return $name;
	}
}
