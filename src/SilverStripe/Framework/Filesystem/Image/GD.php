<?php

namespace SilverStripe\Framework\Filesystem\Image;

/**
 * This class is maintained for backwards-compatibility only. Please use the {@link GDBackend} class instead.
 *
 * @package framework
 * @subpackage filesystem
 */
class GD extends GDBackend {

	/**
	 * @deprecated 3.2 Use the "GDBackend.default_quality" config setting instead
	 */
	public static function set_default_quality($quality) {
		Deprecation::notice('3.2', 'Use the "GDBackend.default_quality" config setting instead');
		GDBackend::set_default_quality($quality);
	}
}
