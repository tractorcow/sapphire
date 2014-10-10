<?php

namespace SilverStripe\Framework\Control;

/**
 * Implements the "Null Object" pattern for a missing http request.
 * Set on controllers on construction time, typically overwritten
 * by {@link Controller->handleRequest()} and {@link Controller->handleAction()} later on.
 *
 * @package framework
 * @subpackage control
 */
class NullHTTPRequest extends HTTPRequest {

	public function __construct() {
		parent::__construct(null, null);
	}

}
