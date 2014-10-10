<?php

namespace SilverStripe\Framework\Forms\Fields;

/**
 * File selection popup for attaching existing files.
 *
 * @package forms
 * @subpackages fields-files
 */
class UploadField_SelectHandler extends RequestHandler {

	/**
	 * @var UploadField
	 */
	protected $parent;

	/**
	 * @var string
	 */
	protected $folderName;

	private static $url_handlers = array(
		'$Action!' => '$Action',
		'' => 'index',
	);

	private static $allowed_actions = array(
		'Form'
	);

	public function __construct($parent, $folderName = null) {
		$this->parent = $parent;
		$this->folderName = $folderName;

		parent::__construct();
	}

	public function index() {
		// Requires a separate JS file, because we can't reach into the iframe with entwine.
		Requirements::javascript(FRAMEWORK_DIR . '/javascript/UploadField_select.js');
		return $this->renderWith('CMSDialog');
	}

	/**
	 * @param string $action
	 * @return string
	 */
	public function Link($action = null) {
		return Controller::join_links($this->parent->Link(), '/select/', $action);
	}

	/**
	 * Build the file selection form.
	 *
	 * @return Form
	 */
	public function Form() {
		// Find out the requested folder ID.
		$folderID = $this->parent->getRequest()->requestVar('ParentID');
		if ($folderID === null && $this->parent->getDisplayFolderName()) {
			$folder = Folder::find_or_make($this->parent->getDisplayFolderName());
			$folderID = $folder ? $folder->ID : 0;
		}

		// Construct the form
		$action = new FormAction('doAttach', _t('UploadField.AttachFile', 'Attach file(s)'));
		$action->addExtraClass('ss-ui-action-constructive icon-accept');
		$form = new Form(
			$this,
			'Form',
			new FieldList($this->getListField($folderID)),
			new FieldList($action)
		);

		// Add a class so we can reach the form from the frontend.
		$form->addExtraClass('uploadfield-form');

		return $form;
	}

	/**
	 * @param $folderID The ID of the folder to display.
	 * @return FormField
	 */
	protected function getListField($folderID) {
		// Generate the folder selection field.
		$folderField = new TreeDropdownField('ParentID', _t('HtmlEditorField.FOLDER', 'Folder'), 'Folder');
		$folderField->setValue($folderID);

		// Generate the file list field.
		$config = GridFieldConfig::create();
		$config->addComponent(new GridFieldSortableHeader());
		$config->addComponent(new GridFieldFilterHeader());
		$config->addComponent($colsComponent = new GridFieldDataColumns());
		$colsComponent->setDisplayFields(array(
			'Title' => singleton('File')->fieldLabel('Name'),
			'Filename' => singleton('File')->fieldLabel('Filename'),
			'Size' => singleton('File')->fieldLabel('Size')
		));

		// If relation is to be autoset, we need to make sure we only list compatible objects.
		$baseClass = $this->parent->getRelationAutosetClass();

		// Create the data source for the list of files within the current directory.
		$files = DataList::create($baseClass);
		if($folderID) $files = $files->filter('ParentID', $folderID);

		$fileField = new GridField('Files', false, $files, $config);
		$fileField->setAttribute('data-selectable', true);
		if($this->parent->getAllowedMaxFileNumber() !== 1) {
			$fileField->setAttribute('data-multiselect', true);
		}

		$selectComposite = new CompositeField(
			$folderField,
			$fileField
		);

		return $selectComposite;
	}

	public function doAttach($data, $form) {
		// Popup-window attach does not require server side action, as it is implemented via JS
	}

}
