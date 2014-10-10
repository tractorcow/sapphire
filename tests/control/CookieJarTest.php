<?php

/**
 * Testing CookieJar
 *
 * Testing the CookieJar acts as expected and keeps track of Cookies it is loaded
 * with as well as new cookies that are set during the running of an application
 *
 */
class CookieJarTest extends SapphireTest {

	/**
	 * Test that the construction argument is stored and returned as expected
	 */
	public function testConstruct() {

		//some default cookies to load
		$defaultCookies = array(
			'cookie1' => 1,
			'cookie2' => 'cookies',
			'cookie3' => 'test',
		);

		$CookieJar = new CookieJar($defaultCookies);

		//make sure all the "recieved" cookies are as expected
		$this->assertEquals($defaultCookies, $CookieJar->getAll(false));

		//make sure there are no "phantom" cookies
		$this->assertEquals($defaultCookies, $CookieJar->getAll(true));

		//check an empty array is accepted
		$CookieJar = new CookieJar(array());
		$this->assertEmpty($CookieJar->getAll(false));


		//check no argument is accepted
		$CookieJar = new CookieJar();
		$this->assertEmpty($CookieJar->getAll(false));
	}

	/**
	 * Test that we can set and get cookies
	 */
	public function testSetAndGet() {
		$CookieJar = new CookieJar();

		$this->assertEmpty($CookieJar->get('testCookie'));

		//set a test cookie
		$CookieJar->set('testCookie', 'testVal');

		//make sure it was set
		$this->assertEquals('testVal', $CookieJar->get('testCookie'));

		//make sure we can distinguise it from ones that were "existing"
		$this->assertEmpty($CookieJar->get('testCookie', false));
	}

	/**
	 * Test that we can distinguish between vars that were loaded on instantiation
	 * and those added later
	 */
	public function testExistingVersusNew() {
		//load with a cookie
		$CookieJar = new CookieJar(array(
			'cookieExisting' => 'i woz here',
		));

		//set a new cookie
		$CookieJar->set('cookieNew', 'i am new');

		//check we can fetch new and old cookie values
		$this->assertEquals('i woz here', $CookieJar->get('cookieExisting'));
		$this->assertEquals('i woz here', $CookieJar->get('cookieExisting', false));
		$this->assertEquals('i am new', $CookieJar->get('cookieNew'));
		//there should be no original value for the new cookie
		$this->assertEmpty($CookieJar->get('cookieNew', false));

		//change the existing cookie, can we fetch the new and old value
		$CookieJar->set('cookieExisting', 'i woz changed');

		$this->assertEquals('i woz changed', $CookieJar->get('cookieExisting'));
		$this->assertEquals('i woz here', $CookieJar->get('cookieExisting', false));

		//check we can get all cookies
		$this->assertEquals(array(
			'cookieExisting' => 'i woz changed',
			'cookieNew' => 'i am new',
		), $CookieJar->getAll());

		//check we can get all original cookies
		$this->assertEquals(array(
			'cookieExisting' => 'i woz here',
		), $CookieJar->getAll(false));
	}

	/**
	 * Check we can remove cookies and we can access their original values
	 */
	public function testForceExpiry() {
		//load an existing cookie
		$CookieJar = new CookieJar(array(
			'cookieExisting' => 'i woz here',
		));

		//make sure it's available
		$this->assertEquals('i woz here', $CookieJar->get('cookieExisting'));

		//remove the cookie
		$CookieJar->forceExpiry('cookieExisting');

		//check it's gone
		$this->assertEmpty($CookieJar->get('cookieExisting'));

		//check we can get it's original value
		$this->assertEquals('i woz here', $CookieJar->get('cookieExisting', false));


		//check we can add a new cookie and remove it and it doesn't leave any phantom values
		$CookieJar->set('newCookie', 'i am new');

		//check it's set by not recieved
		$this->assertEquals('i am new', $CookieJar->get('newCookie'));
		$this->assertEmpty($CookieJar->get('newCookie', false));

		//remove it
		$CookieJar->forceExpiry('newCookie');

		//check it's neither set nor reveived
		$this->assertEmpty($CookieJar->get('newCookie'));
		$this->assertEmpty($CookieJar->get('newCookie', false));
	}

}
