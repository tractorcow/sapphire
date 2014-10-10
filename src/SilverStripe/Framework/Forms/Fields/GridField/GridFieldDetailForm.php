<?php

namespace SilverStripe\Framework\Forms\Fields\GridField;

/**
 * Provides view and edit forms at GridField-specific URLs.
 *
 * These can be placed into pop-ups by an appropriate front-end.
 *
 * Usually added to a {@link GridField} alongside of a
 * {@link GridFieldEditButton} which takes care of linking the
 * individual rows to their edit view.
 *
 * The URLs provided will be off the following form:
 *  - <FormURL>/field/<GridFieldName>/item/<RecordID>
 *  - <FormURL>/field/<GridFieldName>/item/<RecordID>/edit
 *
 * @package forms
 * @subpackage fields-gridfield
 */
class GridFieldDetailForm implements GridField_URLHandler {

	/**
	 * @var String
	 */
	protected $template = 'GridFieldDetailForm';

	/**
	 *
	 * @var string
	 */
	protected $name;

	/**
	 * @var Validator The form validator used for both add and edit fields.
	 */
	protected $validator;

	/**
	 * @var FieldList Falls back to {@link DataObject->getCMSFields()} if not defined.
	 */
	protected $fields;

	/**
	 * @var String
	 */
	protected $itemRequestClass;

	/**
	 * @var function With two parameters: $form and $component
	 */
	protected $itemEditFormCallback;

	public function getURLHandlers($gridField) {
		return array(
			'item/$ID' => 'handleItem',
			'autocomplete' => 'handleAutocomplete',
		);
	}

	/**
	 * Create a popup component. The two arguments will specify how the popup form's HTML and
	 * behaviour is created.  The given controller will be customised, putting the edit form into the
	 * template with the given name.
	 *
	 * The arguments are experimental API's to support partial content to be passed back to whatever
	 * controller who wants to display the getCMSFields
	 *
	 * @param string $name The name of the edit form to place into the pop-up form
	 */
	public function __construct($name = 'DetailForm') {
		$this->name = $name;
	}

	/**
	 *
	 * @param GridField $gridField
	 * @param HTTPRequest $request
	 * @return GridFieldDetailForm_ItemRequest
	 */
	public function handleItem($gridField, $request) {
		// Our getController could either give us a true Controller, if this is the top-level GridField.
		// It could also give us a RequestHandler in the form of GridFieldDetailForm_ItemRequest if this is a
		// nested GridField.
		$requestHandler = $gridField->getForm()->getController();

		if(is_numeric($request->param('ID'))) {
			$record = $gridField->getList()->byId($request->param("ID"));
		} else {
			$record = Object::create($gridField->getModelClass());
		}

		$class = $this->getItemRequestClass();

		$handler = Object::create($class, $gridField, $this, $record, $requestHandler, $this->name);
		$handler->setTemplate($this->template);

		// if no validator has been set on the GridField and the record has a
		// CMS validator, use that.
		if(!$this->getValidator() && method_exists($record, 'getCMSValidator')) {
			$this->setValidator($record->getCMSValidator());
		}

		return $handler->handleRequest($request, DataModel::inst());
	}

	/**
	 * @param String
	 */
	public function setTemplate($template) {
		$this->template = $template;
		return $this;
	}

	/**
	 * @return String
	 */
	public function getTemplate() {
		return $this->template;
	}

	/**
	 * @param String
	 */
	public function setName($name) {
		$this->name = $name;
		return $this;
	}

	/**
	 * @return String
	 */
	public function getName() {
		return $this->name;
	}

	/**
	 * @param Validator $validator
	 */
	public function setValidator(Validator $validator) {
		$this->validator = $validator;
		return $this;
	}

	/**
	 * @return Validator
	 */
	public function getValidator() {
		return $this->validator;
	}

	/**
	 * @param FieldList $fields
	 */
	public function setFields(FieldList $fields) {
		$this->fields = $fields;
		return $this;
	}

	/**
	 * @return FieldList
	 */
	public function getFields() {
		return $this->fields;
	}

	/**
	 * @param String
	 */
	public function setItemRequestClass($class) {
		$this->itemRequestClass = $class;
		return $this;
	}

	/**
	 * @return String
	 */
	public function getItemRequestClass() {
		if($this->itemRequestClass) {
			return $this->itemRequestClass;
		} else if(ClassInfo::exists(get_class($this) . "_ItemRequest")) {
			return get_class($this) . "_ItemRequest";
		} else {
			return 'GridFieldDetailForm_ItemRequest';
		}
	}

	/**
	 * @param Closure $cb Make changes on the edit form after constructing it.
	 */
	public function setItemEditFormCallback(Closure $cb) {
		$this->itemEditFormCallback = $cb;
	}

	/**
	 * @return Closure
	 */
	public function getItemEditFormCallback() {
		return $this->itemEditFormCallback;
	}

}
