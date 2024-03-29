/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var hasSymbols = require( '@stdlib/assert-has-symbol-support' );
var hasMap = require( '@stdlib/assert-has-map-support' );
var hasSet = require( '@stdlib/assert-has-set-support' );
var hasWeakMap = require( '@stdlib/assert-has-weakmap-support' );
var hasWeakSet = require( '@stdlib/assert-has-weakset-support' );
var Int8Array = require( '@stdlib/array-int8' );
var Uint8Array = require( '@stdlib/array-uint8' );
var Uint8ClampedArray = require( '@stdlib/array-uint8c' );
var Int16Array = require( '@stdlib/array-int16' );
var Uint16Array = require( '@stdlib/array-uint16' );
var Int32Array = require( '@stdlib/array-int32' );
var Uint32Array = require( '@stdlib/array-uint32' );
var Float32Array = require( '@stdlib/array-float32' );
var Float64Array = require( '@stdlib/array-float64' );
var ArrayBuffer = require( '@stdlib/array-buffer' );
var Symbol = require( '@stdlib/symbol-ctor' );
var Number = require( '@stdlib/number-ctor' );
var Boolean = require( '@stdlib/boolean-ctor' );
var isObjectLike = require( './../lib' );


// VARIABLES //

var opts;


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof isObjectLike, 'function', 'export is a function' );
	t.end();
});

tape( 'attached to the main export is a function to test if a value is an array of object-like elements', function test( t ) {
	t.equal( typeof isObjectLike.isObjectLikeArray, 'function', 'has method' );
	t.end();
});

tape( 'the function returns a boolean indicating if a value is object-like', function test( t ) {
	var expected;
	var values;
	var bool;
	var i;

	values = [
		'a',
		new String( 'a' ), // eslint-disable-line no-new-wrappers
		5,
		new Number( 5 ), // eslint-disable-line no-new-wrappers
		NaN,
		true,
		new Boolean( true ), // eslint-disable-line no-new-wrappers
		false,
		new Boolean( false ), // eslint-disable-line no-new-wrappers
		void 0,
		null,
		[],
		{},
		function noop() {},
		/./,
		new Date(),
		Math,
		JSON,
		new Error(),
		new TypeError(),
		new SyntaxError(),
		new URIError(),
		new EvalError(),
		new ReferenceError(),
		new RangeError(),
		new Int8Array(),
		new Uint8Array(),
		new Uint8ClampedArray(),
		new Int16Array(),
		new Uint16Array(),
		new Int32Array(),
		new Uint32Array(),
		new Float32Array(),
		new Float64Array(),
		new ArrayBuffer()
	];

	expected = [
		false, // 'a'
		true,  // String
		false, // 5
		true,  // Number
		false, // NaN
		false, // true
		true,  // Boolean
		false, // false
		true,  // Boolean
		false, // void 0
		false, // null
		true,  // []
		true,  // {}
		false, // function
		true,  // RegExp
		true,  // Date
		true,
		true,
		true,
		true,
		true,
		true,
		true,
		true,
		true,
		true,
		true,
		true,
		true,
		true,
		true,
		true,
		true,
		true,
		true
	];

	for ( i = 0; i < values.length; i++ ) {
		bool = isObjectLike( values[i] );
		t.equal( bool, expected[i], 'returns '+expected[i]+' when provided '+values[i] );
	}
	t.end();
});

opts = {
	'skip': !hasMap()
};
tape( 'the function supports Map objects', opts, function test( t ) {
	var bool = isObjectLike( new Map() );
	t.equal( bool, true, 'returns true' );
	t.end();
});

opts = {
	'skip': !hasWeakMap()
};
tape( 'the function supports WeakMap objects', opts, function test( t ) {
	var bool = isObjectLike( new WeakMap() );
	t.equal( bool, true, 'returns true' );
	t.end();
});

opts = {
	'skip': !hasSet()
};
tape( 'the function supports Set objects', opts, function test( t ) {
	var bool = isObjectLike( new Set() );
	t.equal( bool, true, 'returns true' );
	t.end();
});

opts = {
	'skip': !hasWeakSet()
};
tape( 'the function supports WeakSet objects', opts, function test( t ) {
	var bool = isObjectLike( new WeakSet() );
	t.equal( bool, true, 'returns true' );
	t.end();
});

opts = {
	'skip': !hasSymbols()
};
tape( 'the function supports Symbol objects', opts, function test( t ) {
	var bool = isObjectLike( Symbol( 'beep' ) );
	t.equal( bool, false, 'returns false' );
	t.end();
});

tape( 'the function supports custom objects', function test( t ) {
	var bool;
	function Person() {}
	bool = isObjectLike( new Person() );
	t.equal( bool, true, 'returns true' );
	t.end();
});

// TODO: add generator function test
