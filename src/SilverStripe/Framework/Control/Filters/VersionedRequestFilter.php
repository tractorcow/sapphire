<?php

namespace SilverStripe\Framework\Control\Filters;

/**
 * Initialises the versioned stage when a request is made.
 *
 * @package framework
 * @subpackage control
 */
class VersionedRequestFilter implements RequestFilter {

	public function preRequest(HTTPRequest $request, Session $session, DataModel $model) {
		Versioned::choose_site_stage($session);
		return true;
	}

	public function postRequest(HTTPRequest $request, HTTPResponse $response, DataModel $model) {
		return true;
	}

}
