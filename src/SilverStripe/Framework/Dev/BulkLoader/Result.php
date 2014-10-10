<?php

namespace SilverStripe\Framework\Dev;

/**
 * Encapsulates the result of a {@link BulkLoader} import
 * (usually through the {@link BulkLoader->processAll()} method).
 *
 * @todo Refactor to support lazy-loaded DataObjectSets once they are implemented.
 *
 * @package framework
 * @subpackage bulkloading
 * @author Ingo Schommer, Silverstripe Ltd. (<firstname>@silverstripe.com)
 */
class BulkLoader_Result extends Object {

	/**
	 * @var array Stores a map of ID and ClassNames
	 * which can be reconstructed to DataObjects.
	 * As imports can get large we just store enough
	 * information to reconstruct the objects on demand.
	 * Optionally includes a status message specific to
	 * the import of this object. This information is stored
	 * in a custom object property "_BulkLoaderMessage".
	 *
	 * Example:
	 * <code>
	 * array(array('ID'=>1, 'ClassName'=>'Member', 'Message'=>'Updated existing record based on ParentID relation'))
	 * </code>
	 */
	protected $created = array();

	/**
	 * @var array (see {@link $created})
	 */
	protected $updated = array();

	/**
	 * @var array (see {@link $created})
	 */
	protected $deleted = array();

	/**
	 * Stores the last change.
	 * It is in the same format as {@link $created} but with an additional key, "ChangeType", which will be set to
	 * one of 3 strings: "created", "updated", or "deleted"
	 */
	protected $lastChange = array();

	/**
	 * Returns the count of all objects which were
	 * created or updated.
	 *
	 * @return int
	 */
	public function Count() {
		return count($this->created) + count($this->updated);
	}

	/**
	 * @return int
	 */
	public function CreatedCount() {
		return count($this->created);
	}

	/**
	 * @return int
	 */
	public function UpdatedCount() {
		return count($this->updated);
	}

	/**
	 * @return int
	 */
	public function DeletedCount() {
		return count($this->deleted);
	}

	/**
	 * Returns all created objects. Each object might
	 * contain specific importer feedback in the "_BulkLoaderMessage" property.
	 *
	 * @return ArrayList
	 */
	public function Created() {
		return $this->mapToArrayList($this->created);
	}

	/**
	 * @return ArrayList
	 */
	public function Updated() {
		return $this->mapToArrayList($this->updated);
	}

	/**
	 * @return ArrayList
	 */
	public function Deleted() {
		return $this->mapToArrayList($this->deleted);
	}

	/**
	 * Returns the last change.
	 * It is in the same format as {@link $created} but with an additional key, "ChangeType", which will be set to
	 * one of 3 strings: "created", "updated", or "deleted"
	 */
	public function LastChange() {
		return $this->lastChange;
	}

	/**
	 * @param $obj DataObject
	 * @param $message string
	 */
	public function addCreated($obj, $message = null) {
		$this->created[] = $this->lastChange = array(
			'ID' => $obj->ID,
			'ClassName' => $obj->class,
			'Message' => $message
		);
		$this->lastChange['ChangeType'] = 'created';
	}

	/**
	 * @param $obj DataObject
	 * @param $message string
	 */
	public function addUpdated($obj, $message = null) {
		$this->updated[] = $this->lastChange = array(
			'ID' => $obj->ID,
			'ClassName' => $obj->class,
			'Message' => $message
		);
		$this->lastChange['ChangeType'] = 'updated';
	}

	/**
	 * @param $obj DataObject
	 * @param $message string
	 */
	public function addDeleted($obj, $message = null) {
		$this->deleted[] = $this->lastChange = array(
			'ID' => $obj->ID,
			'ClassName' => $obj->class,
			'Message' => $message
		);
		$this->lastChange['ChangeType'] = 'deleted';
	}

	/**
	 * @param $arr Array containing ID and ClassName maps
	 * @return ArrayList
	 */
	protected function mapToArrayList($arr) {
		$set = new ArrayList();
		foreach($arr as $arrItem) {
			$obj = DataObject::get_by_id($arrItem['ClassName'], $arrItem['ID']);
			$obj->_BulkLoaderMessage = $arrItem['Message'];
			if($obj) $set->push($obj);
		}

		return $set;
	}
}
