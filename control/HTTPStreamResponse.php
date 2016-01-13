<?php

/**
 * A response which contains a streamable data source.
 *
 * @package framework
 * @subpackage control
 */
class HTTPStreamResponse extends SS_HTTPResponse {

    /**
     * Stream source for this response
     *
     * @var resource
     */
    protected $stream = null;

    /**
     * HTTPStreamResponse constructor.
     * @param resource $stream Data stream
     * @param int $contentLength size of the stream in bytes
     * @param int $statusCode The numeric status code - 200, 404, etc
	 * @param string $statusDescription The text to be given alongside the status code.
     */
    public function __construct($stream, $contentLength, $statusCode, $statusDescription) {
        parent::__construct(null, $statusCode, $statusDescription);
        $this->setStream($stream);
        if($contentLength) {
            $this->addHeader('Content-Length', $contentLength);
        }
    }

    /**
     * Determine if a stream is seekable
     *
     * @return bool
     */
    protected function isSeekable() {
        $stream = $this->getStream();
        if(!$stream) {
            return false;
        }
        $metadata = stream_get_meta_data($stream);
        return $metadata['seekable'];
    }

    /**
     * @return resource
     */
    public function getStream() {
        return $this->stream;
    }

    /**
     * @param resource $stream
     * @return $this
     */
    public function setStream($stream) {
        $this->setBody(null);
        $this->stream = $stream;
        return $this;
    }

    public function getBody(){
        $body = parent::getBody();
        if(isset($body)) {
            return $body;
        }

        // Load from stream
        $stream = $this->getStream();
        if(!$stream) {
            return null;
        }
        $body = stream_get_contents($stream);

        // If this stream isn't seekable, we'll need to save the body
        // in case of subsequent requests.
        $seekable = $this->isSeekable();
        if(!$seekable) {
            $this->setBody($body);
        }
        return $body;
    }


	/**
	 * Output body of this response to the browser
	 */
	protected function outputBody() {
        // If the output has been overwritten, or the stream is irreversable and has
        // already been consumed, return the cached body.
        $body = parent::getBody();
        if($body) {
            echo $body;
            return;
        }

        $stream = $this->getStream();
        if($stream) {
            $output = fopen('php://stdout', 'w');
            stream_copy_to_stream($stream, $output);
            return;
        }




		// Only show error pages or generic "friendly" errors if the status code signifies
		// an error, and the response doesn't have any body yet that might contain
		// a more specific error description.
		$body = $this->getBody();
		if(Director::isLive() && $this->isError() && empty($body)) {
			$formatter = Injector::inst()->get('FriendlyErrorFormatter');
			echo $formatter->format(array(
				'code' => $this->statusCode
			));

		} else {
			echo $body;
		}
	}
}