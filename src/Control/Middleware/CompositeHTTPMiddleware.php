<?php

namespace SilverStripe\Control\Middleware;

use SilverStripe\Control\HTTPRequest;

/**
 * Provide a list of nested middleware to a standard HTTPMiddelware
 * interface
 */
class CompositeHTTPMiddleware implements HTTPMiddleware
{
    use HTTPMiddlewareAware;

    public function process(HTTPRequest $request, callable $delegate)
    {
        return $this->callMiddleware($request, $delegate);
    }
}
