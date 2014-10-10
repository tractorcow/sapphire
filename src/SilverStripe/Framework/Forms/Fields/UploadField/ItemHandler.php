<?php

namespace SilverStripe\Framework\Forms\Fields;

/**
 * RequestHandler for actions (edit, remove, delete) on a single item (File) of the UploadField
 *
 * @author Zauberfisch
 * @package forms
 * @subpackages fields-files
 */
class UploadField_ItemHandler extends RequestHandler {

	/**
	 * @var UploadField
	 */
	protected $parent;

	/**
	 * @var int FileID
	 */
	protected $itemID;

	private static $url_handlers = array(
		'$Action!' => '$Action',
		'' => 'index',
	);

	private static $allowed_actions = array(
		'delete',
		'edit',
		'EditForm',
	);

	/**
	 * @param UploadFIeld $parent
	 * @param int $item
	 */
	public function __construct($parent, $itemID) {
		$this->parent = $parent;
		$this->itemID = $itemID;

		parent::__construct();
	}

	/**
	 * @return File
	 */
	public function getItem() {
		return DataObject::get_by_id('File', $this->itemID);
	}

	/**
	 * @param string $action
	 * @return string
	 */
	public function Link($action = null) {
		return Controller::join_links($this->parent->Link(), '/item/', $this->itemID, $action);
	}

	/**
	 * @return string
	 */
	public function DeleteLink() {
		$token = $this->parent->getForm()->getSecurityToken();
		return $token->addToUrl($this->Link('delete'));
	}

	/**
	 * @return string
	 */
	public function EditLink() {
		return $this->Link('edit');
	}

	/**
	 * Action to handle deleting of a single file
	 *
	 * @param HTTPRequest $request
	 * @return HTTPResponse
	 */
	public function delete(HTTPRequest $request) {
		// Check form field state
		if($this->parent->isDisabled() || $this->parent->isReadonly()) return $this->httpError(403);

		// Protect against CSRF on destructive action
		$token = $this->parent->getForm()->getSecurityToken();
		if(!$token->checkRequest($request)) return $this->httpError(400);

		// Check item permissions
		$item = $this->getItem();
		if(!$item) return $this->httpError(404);
		if(!$item->canDelete()) return $this->httpError(403);

		// Delete the file from the filesystem. The file will be removed
		// from the relation on save
		// @todo Investigate if references to deleted files (if unsaved) is dangerous
		$item->delete();
	}

	/**
	 * Action to handle editing of a single file
	 *
	 * @param HTTPRequest $request
	 * @return ViewableData_Customised
	 */
	public function edit(HTTPRequest $request) {
		// Check form field state
		if($this->parent->isDisabled() || $this->parent->isReadonly()) return $this->httpError(403);

		// Check item permissions
		$item = $this->getItem();
		if(!$item) return $this->httpError(404);
		if(!$item->canEdit()) return $this->httpError(403);

		Requirements::css(FRAMEWORK_DIR . '/css/UploadField.css');

		return $this->customise(array(
			'Form' => $this->EditForm()
		))->renderWith($this->parent->getTemplateFileEdit());
	}

	/**
	 * @return Form
	 */
	public function EditForm() {
		$file = $this->getItem();
		// Get form components
		$fields = $this->parent->getFileEditFields($file);
		$actions = $this->parent->getFileEditActions($file);
		$validator = $this->parent->getFileEditValidator($file);
		$form = new Form(
			$this,
			__FUNCTION__,
			$fields,
			$actions,
			$validator
		);
		$form->loadDataFrom($file);
		$form->addExtraClass('small');

		return $form;
	}

	/**
	 * @param array $data
	 * @param Form $form
	 * @param HTTPRequest $request
	 */
	public function doEdit(array $data, Form $form, HTTPRequest $request) {
		// Check form field state
		if($this->parent->isDisabled() || $this->parent->isReadonly()) return $this->httpError(403);

		// Check item permissions
		$item = $this->getItem();
		if(!$item) return $this->httpError(404);

		$form->saveInto($item);
		$item->write();

		$form->sessionMessage(_t('UploadField.Saved', 'Saved'), 'good');

		return $this->edit($request);
	}

}
