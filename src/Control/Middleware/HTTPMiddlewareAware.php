<?php

namespace SilverStripe\Control\Middleware;

use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;

/**
 * Allows client objects to process HTTPMiddleware
 */
trait HTTPMiddlewareAware
{
    /**
     * @var HTTPMiddleware[]
     */
    private $middlewares = [];

    /**
     * @return HTTPMiddleware[]
     */
    public function getMiddlewares()
    {
        return $this->middlewares;
    }

    /**
     * @param HTTPMiddleware[] $middlewares
     * @return $this
     */
    public function setMiddlewares($middlewares)
    {
        $this->middlewares = $middlewares;
        return $this;
    }

    /**
     * @param HTTPMiddleware $middleware
     * @return $this
     */
    public function addMiddleware(HTTPMiddleware $middleware)
    {
        $this->middlewares[] = $middleware;
        return $this;
    }

    /**
     * Call middleware
     *
     * @param HTTPRequest $request
     * @param callable $last Last config to call
     * @return HTTPResponse
     */
    protected function callMiddleware(HTTPRequest $request, callable $last)
    {
        // Reverse middlewares
        $next = $last;
        /** @var HTTPMiddleware $middleware */
        foreach (array_reverse($this->getMiddlewares()) as $middleware) {
            $next = function ($request) use ($middleware, $next) {
                return $middleware->process($request, $next);
            };
        }
        return call_user_func($next, $request);
    }
}
