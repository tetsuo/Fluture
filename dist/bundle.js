/**
 * Fluture bundled; version 10.1.1
 */

var Fluture = (function () {
	'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var sanctuaryShow = createCommonjsModule(function (module) {
	//. # sanctuary-show
	//.
	//. Haskell has a `show` function which can be applied to a compatible value to
	//. produce a descriptive string representation of that value. The idea is that
	//. the string representation should, if possible, be an expression which would
	//. produce the original value if evaluated.
	//.
	//. This library provides a similar [`show`](#show) function.
	//.
	//. In general, this property should hold: `eval (show (x)) = x`. In some cases
	//. parens are necessary to ensure correct interpretation (`{}`, for example,
	//. is an empty block rather than an empty object in some contexts). Thus the
	//. property is more accurately stated `eval ('(' + show (x) + ')') = x`.
	//.
	//. One can make values of a custom type compatible with [`show`](#show) by
	//. defining a `@@show` method. For example:
	//.
	//. ```javascript
	//. //# Maybe#@@show :: Maybe a ~> () -> String
	//. //.
	//. //. ```javascript
	//. //. > show (Nothing)
	//. //. 'Nothing'
	//. //.
	//. //. > show (Just (['foo', 'bar', 'baz']))
	//. //. 'Just (["foo", "bar", "baz"])'
	//. //. ```
	//. Maybe.prototype['@@show'] = function() {
	//.   return this.isNothing ? 'Nothing' : 'Just (' + show (this.value) + ')';
	//. };
	//. ```

	(function(f) {

	  /* istanbul ignore else */
	  {
	    module.exports = f();
	  }

	}(function() {

	  //  $$show :: String
	  var $$show = '@@show';

	  //  seen :: Array Any
	  var seen = [];

	  //  entry :: Object -> String -> String
	  function entry(o) {
	    return function(k) {
	      return show(k) + ': ' + show(o[k]);
	    };
	  }

	  //# show :: Showable a => a -> String
	  //.
	  //. Returns a useful string representation of the given value.
	  //.
	  //. Dispatches to the value's `@@show` method if present.
	  //.
	  //. Where practical, `show (eval ('(' + show (x) + ')')) = show (x)`.
	  //.
	  //. ```javascript
	  //. > show (null)
	  //. 'null'
	  //.
	  //. > show (undefined)
	  //. 'undefined'
	  //.
	  //. > show (true)
	  //. 'true'
	  //.
	  //. > show (new Boolean (false))
	  //. 'new Boolean (false)'
	  //.
	  //. > show (-0)
	  //. '-0'
	  //.
	  //. > show (NaN)
	  //. 'NaN'
	  //.
	  //. > show (new Number (Infinity))
	  //. 'new Number (Infinity)'
	  //.
	  //. > show ('foo\n"bar"\nbaz\n')
	  //. '"foo\\n\\"bar\\"\\nbaz\\n"'
	  //.
	  //. > show (new String (''))
	  //. 'new String ("")'
	  //.
	  //. > show (['foo', 'bar', 'baz'])
	  //. '["foo", "bar", "baz"]'
	  //.
	  //. > show ([[[[[0]]]]])
	  //. '[[[[[0]]]]]'
	  //.
	  //. > show ({x: [1, 2], y: [3, 4], z: [5, 6]})
	  //. '{"x": [1, 2], "y": [3, 4], "z": [5, 6]}'
	  //. ```
	  function show(x) {
	    if (seen.indexOf(x) >= 0) return '<Circular>';

	    switch (Object.prototype.toString.call(x)) {

	      case '[object Boolean]':
	        return typeof x === 'object' ?
	          'new Boolean (' + show(x.valueOf()) + ')' :
	          x.toString();

	      case '[object Number]':
	        return typeof x === 'object' ?
	          'new Number (' + show(x.valueOf()) + ')' :
	          1 / x === -Infinity ? '-0' : x.toString(10);

	      case '[object String]':
	        return typeof x === 'object' ?
	          'new String (' + show(x.valueOf()) + ')' :
	          JSON.stringify(x);

	      case '[object Date]':
	        return 'new Date (' +
	               show(isNaN(x.valueOf()) ? NaN : x.toISOString()) +
	               ')';

	      case '[object Error]':
	        return 'new ' + x.name + ' (' + show(x.message) + ')';

	      case '[object Arguments]':
	        return 'function () { return arguments; } (' +
	               Array.prototype.map.call(x, show).join(', ') +
	               ')';

	      case '[object Array]':
	        seen.push(x);
	        try {
	          return '[' + x.map(show).concat(
	            Object.keys(x)
	            .sort()
	            .filter(function(k) { return !/^\d+$/.test(k); })
	            .map(entry(x))
	          ).join(', ') + ']';
	        } finally {
	          seen.pop();
	        }

	      case '[object Object]':
	        seen.push(x);
	        try {
	          return (
	            $$show in x &&
	            (x.constructor == null || x.constructor.prototype !== x) ?
	              x[$$show]() :
	              '{' + Object.keys(x).sort().map(entry(x)).join(', ') + '}'
	          );
	        } finally {
	          seen.pop();
	        }

	      default:
	        return String(x);

	    }
	  }

	  return show;

	}));
	});

	var sanctuaryTypeIdentifiers = createCommonjsModule(function (module) {
	/*
	        @@@@@@@            @@@@@@@         @@
	      @@       @@        @@       @@      @@@
	    @@   @@@ @@  @@    @@   @@@ @@  @@   @@@@@@ @@   @@@  @@ @@@      @@@@
	   @@  @@   @@@   @@  @@  @@   @@@   @@   @@@   @@   @@@  @@@   @@  @@@   @@
	   @@  @@   @@@   @@  @@  @@   @@@   @@   @@@   @@   @@@  @@@   @@  @@@@@@@@
	   @@  @@   @@@  @@   @@  @@   @@@  @@    @@@   @@   @@@  @@@   @@  @@@
	    @@   @@@ @@@@@     @@   @@@ @@@@@      @@@    @@@ @@  @@@@@@      @@@@@
	      @@                 @@                           @@  @@
	        @@@@@@@            @@@@@@@               @@@@@    @@
	                                                          */
	//. # sanctuary-type-identifiers
	//.
	//. A type is a set of values. Boolean, for example, is the type comprising
	//. `true` and `false`. A value may be a member of multiple types (`42` is a
	//. member of Number, PositiveNumber, Integer, and many other types).
	//.
	//. In certain situations it is useful to divide JavaScript values into
	//. non-overlapping types. The language provides two constructs for this
	//. purpose: the [`typeof`][1] operator and [`Object.prototype.toString`][2].
	//. Each has pros and cons, but neither supports user-defined types.
	//.
	//. sanctuary-type-identifiers comprises:
	//.
	//.   - an npm and browser -compatible package for deriving the
	//.     _type identifier_ of a JavaScript value; and
	//.   - a specification which authors may follow to specify type
	//.     identifiers for their types.
	//.
	//. ### Specification
	//.
	//. For a type to be compatible with the algorithm:
	//.
	//.   - every member of the type MUST have a `constructor` property
	//.     pointing to an object known as the _type representative_;
	//.
	//.   - the type representative MUST have a `@@type` property
	//.     (the _type identifier_); and
	//.
	//.   - the type identifier MUST be a string primitive and SHOULD have
	//.     format `'<namespace>/<name>[@<version>]'`, where:
	//.
	//.       - `<namespace>` MUST consist of one or more characters, and
	//.         SHOULD equal the name of the npm package which defines the
	//.         type (including [scope][3] where appropriate);
	//.
	//.       - `<name>` MUST consist of one or more characters, and SHOULD
	//.         be the unique name of the type; and
	//.
	//.       - `<version>` MUST consist of one or more digits, and SHOULD
	//.         represent the version of the type.
	//.
	//. If the type identifier does not conform to the format specified above,
	//. it is assumed that the entire string represents the _name_ of the type;
	//. _namespace_ will be `null` and _version_ will be `0`.
	//.
	//. If the _version_ is not given, it is assumed to be `0`.
	//.
	//. For example:
	//.
	//. ```javascript
	//. //  Identity :: a -> Identity a
	//. function Identity(x) {
	//.   if (!(this instanceof Identity)) return new Identity(x);
	//.   this.value = x;
	//. }
	//.
	//. Identity['@@type'] = 'my-package/Identity';
	//. ```
	//.
	//. Note that by using a constructor function the `constructor` property is set
	//. implicitly for each value created. Constructor functions are convenient for
	//. this reason, but are not required. This definition is also valid:
	//.
	//. ```javascript
	//. //  IdentityTypeRep :: TypeRep Identity
	//. var IdentityTypeRep = {
	//.   '@@type': 'my-package/Identity'
	//. };
	//.
	//. //  Identity :: a -> Identity a
	//. function Identity(x) {
	//.   return {constructor: IdentityTypeRep, value: x};
	//. }
	//. ```

	(function(f) {

	  {
	    module.exports = f();
	  }

	}(function() {

	  //  $$type :: String
	  var $$type = '@@type';

	  //  pattern :: RegExp
	  var pattern = new RegExp(
	    '^'
	  + '([\\s\\S]+)'   //  <namespace>
	  + '/'             //  SOLIDUS (U+002F)
	  + '([\\s\\S]+?)'  //  <name>
	  + '(?:'           //  optional non-capturing group {
	  +   '@'           //    COMMERCIAL AT (U+0040)
	  +   '([0-9]+)'    //    <version>
	  + ')?'            //  }
	  + '$'
	  );

	  //. ### Usage
	  //.
	  //. ```javascript
	  //. const type = require('sanctuary-type-identifiers');
	  //. ```
	  //.
	  //. ```javascript
	  //. > function Identity(x) {
	  //. .   if (!(this instanceof Identity)) return new Identity(x);
	  //. .   this.value = x;
	  //. . }
	  //. . Identity['@@type'] = 'my-package/Identity@1';
	  //.
	  //. > type.parse(type(Identity(0)))
	  //. {namespace: 'my-package', name: 'Identity', version: 1}
	  //. ```
	  //.
	  //. ### API
	  //.
	  //# type :: Any -> String
	  //.
	  //. Takes any value and returns a string which identifies its type. If the
	  //. value conforms to the [specification][4], the custom type identifier is
	  //. returned.
	  //.
	  //. ```javascript
	  //. > type(null)
	  //. 'Null'
	  //.
	  //. > type(true)
	  //. 'Boolean'
	  //.
	  //. > type(Identity(0))
	  //. 'my-package/Identity@1'
	  //. ```
	  function type(x) {
	    return x != null &&
	           x.constructor != null &&
	           x.constructor.prototype !== x &&
	           typeof x.constructor[$$type] === 'string' ?
	      x.constructor[$$type] :
	      Object.prototype.toString.call(x).slice('[object '.length, -']'.length);
	  }

	  //# type.parse :: String -> { namespace :: Nullable String, name :: String, version :: Number }
	  //.
	  //. Takes any string and parses it according to the [specification][4],
	  //. returning an object with `namespace`, `name`, and `version` fields.
	  //.
	  //. ```javascript
	  //. > type.parse('my-package/List@2')
	  //. {namespace: 'my-package', name: 'List', version: 2}
	  //.
	  //. > type.parse('nonsense!')
	  //. {namespace: null, name: 'nonsense!', version: 0}
	  //.
	  //. > type.parse(Identity['@@type'])
	  //. {namespace: 'my-package', name: 'Identity', version: 1}
	  //. ```
	  type.parse = function parse(s) {
	    var groups = pattern.exec(s);
	    return {
	      namespace: groups == null || groups[1] == null ? null : groups[1],
	      name:      groups == null                      ? s    : groups[2],
	      version:   groups == null || groups[3] == null ? 0    : Number(groups[3])
	    };
	  };

	  return type;

	}));

	//. [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
	//. [2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
	//. [3]: https://docs.npmjs.com/misc/scope
	//. [4]: #specification
	});

	var concurrify = createCommonjsModule(function (module) {
	//. # Concurrify
	//.
	//. [![Chat](https://badges.gitter.im/fluture-js/concurrify.svg)](https://gitter.im/fluture-js/fluture)
	//. [![NPM Version](https://badge.fury.io/js/concurrify.svg)](https://www.npmjs.com/package/concurrify)
	//. [![Dependencies](https://david-dm.org/fluture-js/concurrify.svg)](https://david-dm.org/fluture-js/concurrify)
	//. [![Build Status](https://travis-ci.org/fluture-js/concurrify.svg?branch=master)](https://travis-ci.org/fluture-js/concurrify)
	//. [![Code Coverage](https://codecov.io/gh/fluture-js/concurrify/branch/master/graph/badge.svg)](https://codecov.io/gh/fluture-js/concurrify)
	//.
	//. Turn non-concurrent [FantasyLand 3][FL3] Applicatives concurrent.
	//.
	//. Most time-dependent applicatives are very useful as Monads, because it
	//. gives them the ability to run sequentially, where each step depends on the
	//. previous. However, they lose the ability to run concurrently. This library
	//. allows one to wrap a [`Monad`][FL:Monad] (with sequential `ap`) in an
	//. [`Alternative`][FL:Alternative] (with parallel `ap`).
	//.
	//. ## Usage
	//.
	//. ```js
	//. // The concurrify function takes four arguments, explained below.
	//. const concurrify = require ('concurrify');
	//.
	//. // The Type Representative of the Applicative we want to transform.
	//. const Future = require ('fluture');
	//.
	//. // A "zero" instance and an "alt" function for "Alternative".
	//. const zero = Future (() => {});
	//. const alt = Future.race;
	//.
	//. // An override "ap" function that runs the Applicatives concurrently.
	//. const ap = (mx, mf) => (Future.both (mx, mf)).map (([x, f]) => f (x));
	//.
	//. // A new Type Representative created by concurrify.
	//. const ConcurrentFuture = concurrify (Future, zero, alt, ap);
	//.
	//. // We can use our type as such:
	//. const par = ConcurrentFuture (Future.of (1));
	//. const seq = par.sequential;
	//. seq.fork (console.error, console.log);
	//. ```
	//.
	//. ## Interoperability
	//.
	//. * Implements [FantasyLand 3][FL3] `Alternative`
	//.   (`of`, `zero`, `map`, `ap`, `alt`).
	//. * Instances can be identified by, and are compared using,
	//.   [Sanctuary Type Identifiers][STI].
	//. * Instances can be converted to String representations according to
	//.   [Sanctuary Show][SS].
	//.
	//. ## API
	(function(f) {

	  /* istanbul ignore next */
	  {
	    module.exports = f (
	      sanctuaryShow,
	      sanctuaryTypeIdentifiers
	    );
	  }

	} (function(show, type) {

	  var $alt = 'fantasy-land/alt';
	  var $ap = 'fantasy-land/ap';
	  var $map = 'fantasy-land/map';
	  var $of = 'fantasy-land/of';
	  var $zero = 'fantasy-land/zero';
	  var $$type = '@@type';
	  var $$show = '@@show';
	  var ordinal = ['first', 'second', 'third', 'fourth', 'fifth'];

	  //       isFunction :: Any -> Boolean
	  function isFunction(f) {
	    return typeof f === 'function';
	  }

	  //       isBinary :: Function -> Boolean
	  function isBinary(f) {
	    return f.length >= 2;
	  }

	  //       isApplicativeRepr :: TypeRepr -> Boolean
	  function isApplicativeRepr(Repr) {
	    return typeof Repr[$of] === 'function' &&
	           typeof Repr[$of] ()[$ap] === 'function';
	  }

	  //       invalidArgument :: (String, Number, String, String) -> !Undefined
	  function invalidArgument(it, at, expected, actual) {
	    throw new TypeError (
	      it
	      + ' expects its '
	      + ordinal[at]
	      + ' argument to '
	      + expected
	      + '\n  Actual: '
	      + show (actual)
	    );
	  }

	  //       invalidContext :: (String, String, String) -> !Undefined
	  function invalidContext(it, actual, an) {
	    throw new TypeError (
	      it
	      + ' was invoked outside the context of a '
	      + an
	      + '. \n  Called on: '
	      + show (actual)
	    );
	  }

	  //       getTypeIdentifier :: TypeRepresentative -> String
	  function getTypeIdentifier(Repr) {
	    return Repr[$$type] || Repr.name || 'Anonymous';
	  }

	  //       generateTypeIdentifier :: String -> String
	  function generateTypeIdentifier(identifier) {
	    var o = type.parse (identifier);
	    return (
	      (o.namespace || 'concurrify') + '/Concurrent' + o.name + '@' + o.version
	    );
	  }

	  //# concurrify :: (Applicative f, Alternative (m f)) => (TypeRep f, f a, (f a, f a) -> f a, (f a, f (a -> b)) -> f b) -> f c -> m f c
	  return function concurrify(Repr, zero, alt, ap) {

	    var INNERTYPE = getTypeIdentifier (Repr);
	    var OUTERTYPE = generateTypeIdentifier (INNERTYPE);
	    var INNERNAME = (type.parse (INNERTYPE)).name;
	    var OUTERNAME = (type.parse (OUTERTYPE)).name;

	    function Concurrently(sequential) {
	      this.sequential = sequential;
	    }

	    function isInner(x) {
	      return (
	        (x instanceof Repr) ||
	        (Boolean (x) && x.constructor === Repr) ||
	        (type (x) === Repr[$$type])
	      );
	    }

	    function isOuter(x) {
	      return (
	        (x instanceof Concurrently) ||
	        (Boolean (x) && x.constructor === Concurrently) ||
	        (type (x) === OUTERTYPE)
	      );
	    }

	    function construct(x) {
	      if (!isInner (x)) {
	        invalidArgument (OUTERNAME, 0, 'be of type "' + INNERNAME + '"', x);
	      }
	      return new Concurrently (x);
	    }

	    if (!isApplicativeRepr (Repr)) {
	      invalidArgument ('concurrify', 0, 'represent an Applicative', Repr);
	    }

	    if (!isInner (zero)) {
	      invalidArgument
	        ('concurrify', 1, 'be of type "' + INNERNAME + '"', zero);
	    }

	    if (!isFunction (alt)) {
	      invalidArgument ('concurrify', 2, 'be a function', alt);
	    }

	    if (!isBinary (alt)) {
	      invalidArgument ('concurrify', 2, 'be binary', alt);
	    }

	    if (!isFunction (ap)) {
	      invalidArgument ('concurrify', 3, 'be a function', ap);
	    }

	    if (!isBinary (ap)) {
	      invalidArgument ('concurrify', 3, 'be binary', ap);
	    }

	    var proto =
	    Concurrently.prototype =
	    construct.prototype = {constructor: construct};

	    construct[$$type] = OUTERTYPE;

	    var mzero = new Concurrently (zero);

	    construct[$zero] = function Concurrently$zero() {
	      return mzero;
	    };

	    construct[$of] = function Concurrently$of(value) {
	      return new Concurrently (Repr[$of] (value));
	    };

	    proto[$map] = function Concurrently$map(mapper) {
	      if (!isOuter (this)) {
	        invalidContext (OUTERNAME + '#map', this, OUTERNAME);
	      }

	      if (!isFunction (mapper)) {
	        invalidArgument (OUTERNAME + '#map', 0, 'be a function', mapper);
	      }

	      return new Concurrently (this.sequential[$map] (mapper));
	    };

	    proto[$ap] = function Concurrently$ap(m) {
	      if (!isOuter (this)) {
	        invalidContext (OUTERNAME + '#ap', this, OUTERNAME);
	      }

	      if (!isOuter (m)) {
	        invalidArgument (OUTERNAME + '#ap', 0, 'be a ' + OUTERNAME, m);
	      }

	      return new Concurrently (ap (this.sequential, m.sequential));
	    };

	    proto[$alt] = function Concurrently$alt(m) {
	      if (!isOuter (this)) {
	        invalidContext (OUTERNAME + '#alt', this, OUTERNAME);
	      }

	      if (!isOuter (m)) {
	        invalidArgument (OUTERNAME + '#alt', 0, 'be a ' + OUTERNAME, m);
	      }

	      return new Concurrently (alt (this.sequential, m.sequential));
	    };

	    proto[$$show] = function Concurrently$show() {
	      return OUTERNAME + '(' + show (this.sequential) + ')';
	    };

	    proto.toString = function Concurrently$toString() {
	      if (!isOuter (this)) {
	        invalidContext (OUTERNAME + '#toString', this, OUTERNAME);
	      }
	      return this[$$show] ();
	    };

	    return construct;

	  };

	}));

	//. [FL3]: https://github.com/fantasyland/fantasy-land/
	//. [FL:Monad]: https://github.com/fantasyland/fantasy-land/#monad
	//. [FL:Alternative]: https://github.com/fantasyland/fantasy-land/#alternative
	//. [STI]: https://github.com/sanctuary-js/sanctuary-type-identifiers
	//. [SS]: https://github.com/sanctuary-js/sanctuary-show
	});

	function noop(){}
	function moop(){ return this }
	function padf(sf, s){ return s.replace(/^/gm, sf).replace(sf, '') }
	function showf(f){ return padf('  ', sanctuaryShow(f)) }

	function partial1(f, a){
	  return function bound1(b, c, d){
	    switch(arguments.length){
	      case 1: return f(a, b);
	      case 2: return f(a, b, c);
	      default: return f(a, b, c, d);
	    }
	  };
	}

	function partial2(f, a, b){
	  return function bound2(c, d){
	    return arguments.length === 1 ? f(a, b, c) : f(a, b, c, d);
	  };
	}

	function partial3(f, a, b, c){
	  return function bound3(d){
	    return f(a, b, c, d);
	  };
	}

	function raise(x){
	  throw x;
	}

	function indent(s){
	  return '  ' + s;
	}

	var FL = {
	  alt: 'fantasy-land/alt',
	  ap: 'fantasy-land/ap',
	  bimap: 'fantasy-land/bimap',
	  chain: 'fantasy-land/chain',
	  chainRec: 'fantasy-land/chainRec',
	  map: 'fantasy-land/map',
	  of: 'fantasy-land/of',
	  zero: 'fantasy-land/zero'
	};

	var ordinal = ['first', 'second', 'third', 'fourth', 'fifth'];

	var namespace = 'fluture';
	var name = 'Future';
	var version = 4;

	var $$type = namespace + '/' + name + '@' + version;

	function error(message){
	  return new Error(message);
	}

	function typeError(message){
	  return new TypeError(message);
	}

	function invalidArgument(it, at, expected, actual){
	  return typeError(
	    it + ' expects its ' + ordinal[at] + ' argument to ' + expected + '\n  Actual: ' + sanctuaryShow(actual)
	  );
	}

	function invalidContext(it, actual){
	  return typeError(
	    it + ' was invoked outside the context of a Future. You might want to use'
	  + ' a dispatcher instead\n  Called on: ' + sanctuaryShow(actual)
	  );
	}

	function invalidNamespace(m, x){
	  return (
	    'The Future was not created by ' + namespace + '. '
	  + 'Make sure you transform other Futures to ' + namespace + ' Futures. '
	  + 'Got ' + (x ? ('a Future from ' + x) : 'an unscoped Future') + '.'
	  + '\n  See: https://github.com/fluture-js/Fluture#casting-futures'
	  );
	}

	function invalidVersion(m, x){
	  return (
	    'The Future was created by ' + (x < version ? 'an older' : 'a newer')
	  + ' version of ' + namespace + '. '
	  + 'This means that one of the sources which creates Futures is outdated. '
	  + 'Update this source, or transform its created Futures to be compatible.'
	  + '\n  See: https://github.com/fluture-js/Fluture#casting-futures'
	  );
	}

	function invalidFuture(it, at, m, s){
	  var id = sanctuaryTypeIdentifiers.parse(sanctuaryTypeIdentifiers(m));
	  var info = id.name === name ? '\n' + (
	    id.namespace !== namespace ? invalidNamespace(m, id.namespace)
	  : id.version !== version ? invalidVersion(m, id.version)
	  : 'Nothing seems wrong. Contact the Fluture maintainers.') : '';
	  return typeError(
	    it + ' expects ' + (ordinal[at] ? 'its ' + ordinal[at] + ' argument to be a valid Future' : at)
	  + '.' + info + '\n  Actual: ' + sanctuaryShow(m) + ' :: ' + id.name + (s || '')
	  );
	}

	function valueToError(x){
	  var name$$1, message;
	  try{
	    if(x && typeof x.name === 'string' && typeof x.message === 'string'){
	      name$$1 = x.name;
	      message = x.message;
	    }else{
	      name$$1 = 'Non-Error';
	      message = sanctuaryShow(x);
	    }
	  }catch (_){
	    name$$1 = 'Something';
	    message = '<The value which was thrown could not be converted to string>';
	  }
	  var e = error(
	    name$$1 + ' occurred while running a computation for a Future:\n\n' +
	    message.split('\n').map(indent).join('\n')
	  );
	  return e;
	}

	function throwInvalidArgument(it, at, expected, actual){
	  throw invalidArgument(it, at, expected, actual);
	}

	function throwInvalidContext(it, actual){
	  throw invalidContext(it, actual);
	}

	function throwInvalidFuture(it, at, m, s){
	  throw invalidFuture(it, at, m, s);
	}

	/**
	 * Custom implementation of a double ended queue.
	 */
	function Denque(array) {
	  this._head = 0;
	  this._tail = 0;
	  this._capacityMask = 0x3;
	  this._list = new Array(4);
	  if (Array.isArray(array)) {
	    this._fromArray(array);
	  }
	}

	/**
	 * -------------
	 *  PUBLIC API
	 * -------------
	 */

	/**
	 * Returns the item at the specified index from the list.
	 * 0 is the first element, 1 is the second, and so on...
	 * Elements at negative values are that many from the end: -1 is one before the end
	 * (the last element), -2 is two before the end (one before last), etc.
	 * @param index
	 * @returns {*}
	 */
	Denque.prototype.peekAt = function peekAt(index) {
	  var i = index;
	  // expect a number or return undefined
	  if ((i !== (i | 0))) {
	    return void 0;
	  }
	  var len = this.size();
	  if (i >= len || i < -len) return undefined;
	  if (i < 0) i += len;
	  i = (this._head + i) & this._capacityMask;
	  return this._list[i];
	};

	/**
	 * Alias for peakAt()
	 * @param i
	 * @returns {*}
	 */
	Denque.prototype.get = function get(i) {
	  return this.peekAt(i);
	};

	/**
	 * Returns the first item in the list without removing it.
	 * @returns {*}
	 */
	Denque.prototype.peek = function peek() {
	  if (this._head === this._tail) return undefined;
	  return this._list[this._head];
	};

	/**
	 * Alias for peek()
	 * @returns {*}
	 */
	Denque.prototype.peekFront = function peekFront() {
	  return this.peek();
	};

	/**
	 * Returns the item that is at the back of the queue without removing it.
	 * Uses peekAt(-1)
	 */
	Denque.prototype.peekBack = function peekBack() {
	  return this.peekAt(-1);
	};

	/**
	 * Returns the current length of the queue
	 * @return {Number}
	 */
	Object.defineProperty(Denque.prototype, 'length', {
	  get: function length() {
	    return this.size();
	  }
	});

	/**
	 * Return the number of items on the list, or 0 if empty.
	 * @returns {number}
	 */
	Denque.prototype.size = function size() {
	  if (this._head === this._tail) return 0;
	  if (this._head < this._tail) return this._tail - this._head;
	  else return this._capacityMask + 1 - (this._head - this._tail);
	};

	/**
	 * Add an item at the beginning of the list.
	 * @param item
	 */
	Denque.prototype.unshift = function unshift(item) {
	  if (item === undefined) return this.size();
	  var len = this._list.length;
	  this._head = (this._head - 1 + len) & this._capacityMask;
	  this._list[this._head] = item;
	  if (this._tail === this._head) this._growArray();
	  if (this._head < this._tail) return this._tail - this._head;
	  else return this._capacityMask + 1 - (this._head - this._tail);
	};

	/**
	 * Remove and return the first item on the list,
	 * Returns undefined if the list is empty.
	 * @returns {*}
	 */
	Denque.prototype.shift = function shift() {
	  var head = this._head;
	  if (head === this._tail) return undefined;
	  var item = this._list[head];
	  this._list[head] = undefined;
	  this._head = (head + 1) & this._capacityMask;
	  if (head < 2 && this._tail > 10000 && this._tail <= this._list.length >>> 2) this._shrinkArray();
	  return item;
	};

	/**
	 * Add an item to the bottom of the list.
	 * @param item
	 */
	Denque.prototype.push = function push(item) {
	  if (item === undefined) return this.size();
	  var tail = this._tail;
	  this._list[tail] = item;
	  this._tail = (tail + 1) & this._capacityMask;
	  if (this._tail === this._head) {
	    this._growArray();
	  }

	  if (this._head < this._tail) return this._tail - this._head;
	  else return this._capacityMask + 1 - (this._head - this._tail);
	};

	/**
	 * Remove and return the last item on the list.
	 * Returns undefined if the list is empty.
	 * @returns {*}
	 */
	Denque.prototype.pop = function pop() {
	  var tail = this._tail;
	  if (tail === this._head) return undefined;
	  var len = this._list.length;
	  this._tail = (tail - 1 + len) & this._capacityMask;
	  var item = this._list[this._tail];
	  this._list[this._tail] = undefined;
	  if (this._head < 2 && tail > 10000 && tail <= len >>> 2) this._shrinkArray();
	  return item;
	};

	/**
	 * Remove and return the item at the specified index from the list.
	 * Returns undefined if the list is empty.
	 * @param index
	 * @returns {*}
	 */
	Denque.prototype.removeOne = function removeOne(index) {
	  var i = index;
	  // expect a number or return undefined
	  if ((i !== (i | 0))) {
	    return void 0;
	  }
	  if (this._head === this._tail) return void 0;
	  var size = this.size();
	  var len = this._list.length;
	  if (i >= size || i < -size) return void 0;
	  if (i < 0) i += size;
	  i = (this._head + i) & this._capacityMask;
	  var item = this._list[i];
	  var k;
	  if (index < size / 2) {
	    for (k = index; k > 0; k--) {
	      this._list[i] = this._list[i = (i - 1 + len) & this._capacityMask];
	    }
	    this._list[i] = void 0;
	    this._head = (this._head + 1 + len) & this._capacityMask;
	  } else {
	    for (k = size - 1 - index; k > 0; k--) {
	      this._list[i] = this._list[i = ( i + 1 + len) & this._capacityMask];
	    }
	    this._list[i] = void 0;
	    this._tail = (this._tail - 1 + len) & this._capacityMask;
	  }
	  return item;
	};

	/**
	 * Remove number of items from the specified index from the list.
	 * Returns array of removed items.
	 * Returns undefined if the list is empty.
	 * @param index
	 * @param count
	 * @returns {array}
	 */
	Denque.prototype.remove = function remove(index, count) {
	  var i = index;
	  var removed;
	  var del_count = count;
	  // expect a number or return undefined
	  if ((i !== (i | 0))) {
	    return void 0;
	  }
	  if (this._head === this._tail) return void 0;
	  var size = this.size();
	  var len = this._list.length;
	  if (i >= size || i < -size || count < 1) return void 0;
	  if (i < 0) i += size;
	  if (count === 1 || !count) {
	    removed = new Array(1);
	    removed[0] = this.removeOne(i);
	    return removed;
	  }
	  if (i === 0 && i + count >= size) {
	    removed = this.toArray();
	    this.clear();
	    return removed;
	  }
	  if (i + count > size) count = size - i;
	  var k;
	  removed = new Array(count);
	  for (k = 0; k < count; k++) {
	    removed[k] = this._list[(this._head + i + k) & this._capacityMask];
	  }
	  i = (this._head + i) & this._capacityMask;
	  if (index + count === size) {
	    this._tail = (this._tail - count + len) & this._capacityMask;
	    for (k = count; k > 0; k--) {
	      this._list[i = (i + 1 + len) & this._capacityMask] = void 0;
	    }
	    return removed;
	  }
	  if (index === 0) {
	    this._head = (this._head + count + len) & this._capacityMask;
	    for (k = count - 1; k > 0; k--) {
	      this._list[i = (i + 1 + len) & this._capacityMask] = void 0;
	    }
	    return removed;
	  }
	  if (index < size / 2) {
	    this._head = (this._head + index + count + len) & this._capacityMask;
	    for (k = index; k > 0; k--) {
	      this.unshift(this._list[i = (i - 1 + len) & this._capacityMask]);
	    }
	    i = (this._head - 1 + len) & this._capacityMask;
	    while (del_count > 0) {
	      this._list[i = (i - 1 + len) & this._capacityMask] = void 0;
	      del_count--;
	    }
	  } else {
	    this._tail = i;
	    i = (i + count + len) & this._capacityMask;
	    for (k = size - (count + index); k > 0; k--) {
	      this.push(this._list[i++]);
	    }
	    i = this._tail;
	    while (del_count > 0) {
	      this._list[i = (i + 1 + len) & this._capacityMask] = void 0;
	      del_count--;
	    }
	  }
	  if (this._head < 2 && this._tail > 10000 && this._tail <= len >>> 2) this._shrinkArray();
	  return removed;
	};

	/**
	 * Native splice implementation.
	 * Remove number of items from the specified index from the list and/or add new elements.
	 * Returns array of removed items or empty array if count == 0.
	 * Returns undefined if the list is empty.
	 *
	 * @param index
	 * @param count
	 * @param {...*} [elements]
	 * @returns {array}
	 */
	Denque.prototype.splice = function splice(index, count) {
	  var i = index;
	  // expect a number or return undefined
	  if ((i !== (i | 0))) {
	    return void 0;
	  }
	  var size = this.size();
	  if (i < 0) i += size;
	  if (i > size) return void 0;
	  if (arguments.length > 2) {
	    var k;
	    var temp;
	    var removed;
	    var arg_len = arguments.length;
	    var len = this._list.length;
	    var arguments_index = 2;
	    if (!size || i < size / 2) {
	      temp = new Array(i);
	      for (k = 0; k < i; k++) {
	        temp[k] = this._list[(this._head + k) & this._capacityMask];
	      }
	      if (count === 0) {
	        removed = [];
	        if (i > 0) {
	          this._head = (this._head + i + len) & this._capacityMask;
	        }
	      } else {
	        removed = this.remove(i, count);
	        this._head = (this._head + i + len) & this._capacityMask;
	      }
	      while (arg_len > arguments_index) {
	        this.unshift(arguments[--arg_len]);
	      }
	      for (k = i; k > 0; k--) {
	        this.unshift(temp[k - 1]);
	      }
	    } else {
	      temp = new Array(size - (i + count));
	      var leng = temp.length;
	      for (k = 0; k < leng; k++) {
	        temp[k] = this._list[(this._head + i + count + k) & this._capacityMask];
	      }
	      if (count === 0) {
	        removed = [];
	        if (i != size) {
	          this._tail = (this._head + i + len) & this._capacityMask;
	        }
	      } else {
	        removed = this.remove(i, count);
	        this._tail = (this._tail - leng + len) & this._capacityMask;
	      }
	      while (arguments_index < arg_len) {
	        this.push(arguments[arguments_index++]);
	      }
	      for (k = 0; k < leng; k++) {
	        this.push(temp[k]);
	      }
	    }
	    return removed;
	  } else {
	    return this.remove(i, count);
	  }
	};

	/**
	 * Soft clear - does not reset capacity.
	 */
	Denque.prototype.clear = function clear() {
	  this._head = 0;
	  this._tail = 0;
	};

	/**
	 * Returns true or false whether the list is empty.
	 * @returns {boolean}
	 */
	Denque.prototype.isEmpty = function isEmpty() {
	  return this._head === this._tail;
	};

	/**
	 * Returns an array of all queue items.
	 * @returns {Array}
	 */
	Denque.prototype.toArray = function toArray() {
	  return this._copyArray(false);
	};

	/**
	 * -------------
	 *   INTERNALS
	 * -------------
	 */

	/**
	 * Fills the queue with items from an array
	 * For use in the constructor
	 * @param array
	 * @private
	 */
	Denque.prototype._fromArray = function _fromArray(array) {
	  for (var i = 0; i < array.length; i++) this.push(array[i]);
	};

	/**
	 *
	 * @param fullCopy
	 * @returns {Array}
	 * @private
	 */
	Denque.prototype._copyArray = function _copyArray(fullCopy) {
	  var newArray = [];
	  var list = this._list;
	  var len = list.length;
	  var i;
	  if (fullCopy || this._head > this._tail) {
	    for (i = this._head; i < len; i++) newArray.push(list[i]);
	    for (i = 0; i < this._tail; i++) newArray.push(list[i]);
	  } else {
	    for (i = this._head; i < this._tail; i++) newArray.push(list[i]);
	  }
	  return newArray;
	};

	/**
	 * Grows the internal list array.
	 * @private
	 */
	Denque.prototype._growArray = function _growArray() {
	  if (this._head) {
	    // copy existing data, head to end, then beginning to tail.
	    this._list = this._copyArray(true);
	    this._head = 0;
	  }

	  // head is at 0 and array is now full, safe to extend
	  this._tail = this._list.length;

	  this._list.length *= 2;
	  this._capacityMask = (this._capacityMask << 1) | 1;
	};

	/**
	 * Shrinks the internal list array.
	 * @private
	 */
	Denque.prototype._shrinkArray = function _shrinkArray() {
	  this._list.length >>>= 1;
	  this._capacityMask >>>= 1;
	};


	var denque = Denque;

	function isFunction(f){
	  return typeof f === 'function';
	}

	function isThenable(m){
	  return m instanceof Promise || m != null && isFunction(m.then);
	}

	function isBoolean(f){
	  return typeof f === 'boolean';
	}

	function isNumber(f){
	  return typeof f === 'number';
	}

	function isUnsigned(n){
	  return (n === Infinity || isNumber(n) && n > 0 && n % 1 === 0);
	}

	function isObject(o){
	  return o !== null && typeof o === 'object';
	}

	function isIterator(i){
	  return isObject(i) && isFunction(i.next);
	}

	function isArray(x){
	  return Array.isArray(x);
	}

	function hasMethod(method, x){
	  return x != null && isFunction(x[method]);
	}

	function isFunctor(x){
	  return hasMethod(FL.map, x);
	}

	function isAlt(x){
	  return isFunctor(x) && hasMethod(FL.alt, x);
	}

	function isApply(x){
	  return isFunctor(x) && hasMethod(FL.ap, x);
	}

	function isBifunctor(x){
	  return isFunctor(x) && hasMethod(FL.bimap, x);
	}

	function isChain(x){
	  return isApply(x) && hasMethod(FL.chain, x);
	}

	/* eslint no-param-reassign:0 */

	var nil = {head: null};
	nil.tail = nil;

	function isNil(list){
	  return list.tail === list;
	}

	function cons(head, tail){
	  return {head: head, tail: tail};
	}

	/*eslint no-cond-assign:0, no-constant-condition:0 */

	function Future$onCrash(x){
	  raise(valueToError(x));
	}

	function Future(computation){
	  if(!isFunction(computation)) throwInvalidArgument('Future', 0, 'be a Function', computation);
	  return new Computation(computation);
	}

	function isFuture(x){
	  return x instanceof Future || sanctuaryTypeIdentifiers(x) === $$type;
	}

	Future['@@type'] = $$type;

	Future.prototype['@@show'] = function Future$show(){
	  return this.toString();
	};

	Future.prototype[FL.ap] = function Future$FL$ap(other){
	  return other._ap(this);
	};

	Future.prototype[FL.map] = function Future$FL$map(mapper){
	  return this._map(mapper);
	};

	Future.prototype[FL.bimap] = function Future$FL$bimap(lmapper, rmapper){
	  return this._bimap(lmapper, rmapper);
	};

	Future.prototype[FL.chain] = function Future$FL$chain(mapper){
	  return this._chain(mapper);
	};

	Future.prototype.pipe = function Future$pipe(f){
	  if(!isFuture(this)) throwInvalidContext('Future#pipe', this);
	  if(!isFunction(f)) throwInvalidArgument('Future#pipe', 0, 'to be a Function', f);
	  return f(this);
	};

	Future.prototype.fork = function Future$fork(rej, res){
	  if(!isFuture(this)) throwInvalidContext('Future#fork', this);
	  if(!isFunction(rej)) throwInvalidArgument('Future#fork', 0, 'to be a Function', rej);
	  if(!isFunction(res)) throwInvalidArgument('Future#fork', 1, 'to be a Function', res);
	  return this._interpret(Future$onCrash, rej, res);
	};

	Future.prototype.forkCatch = function Future$forkCatch(rec, rej, res){
	  if(!isFuture(this)) throwInvalidContext('Future#fork', this);
	  if(!isFunction(rec)) throwInvalidArgument('Future#fork', 0, 'to be a Function', rec);
	  if(!isFunction(rej)) throwInvalidArgument('Future#fork', 1, 'to be a Function', rej);
	  if(!isFunction(res)) throwInvalidArgument('Future#fork', 2, 'to be a Function', res);
	  return this._interpret(function Future$forkCatch$recover(x){ rec(valueToError(x)); }, rej, res);
	};

	Future.prototype.value = function Future$value(res){
	  if(!isFuture(this)) throwInvalidContext('Future#value', this);
	  if(!isFunction(res)) throwInvalidArgument('Future#value', 0, 'to be a Function', res);
	  var _this = this;
	  return _this._interpret(Future$onCrash, function Future$value$rej(x){
	    raise(error(
	      'Future#value was called on a rejected Future\n' +
	      '  Rejection: ' + sanctuaryShow(x) + '\n' +
	      '  Future: ' + _this.toString()
	    ));
	  }, res);
	};

	Future.prototype.done = function Future$done(callback){
	  if(!isFuture(this)) throwInvalidContext('Future#done', this);
	  if(!isFunction(callback)) throwInvalidArgument('Future#done', 0, 'to be a Function', callback);
	  return this._interpret(Future$onCrash,
	                         function Future$done$rej(x){ callback(x); },
	                         function Future$done$res(x){ callback(null, x); });
	};

	Future.prototype.promise = function Future$promise(){
	  var _this = this;
	  return new Promise(function Future$promise$computation(res, rej){
	    _this._interpret(Future$onCrash, rej, res);
	  });
	};

	Future.prototype.extractLeft = function Future$extractLeft(){
	  return [];
	};

	Future.prototype.extractRight = function Future$extractRight(){
	  return [];
	};

	Future.prototype._transform = function Future$transform(action){
	  return new Transformation(this, cons(action, nil));
	};

	function Computation(computation){
	  this._computation = computation;
	}

	Computation.prototype = Object.create(Future.prototype);

	Computation.prototype._interpret = function Computation$interpret(rec, rej, res){
	  var open = false, cancel = noop, cont = function(){ open = true; };
	  try{
	    cancel = this._computation(function Computation$rej(x){
	      cont = function Computation$rej$cont(){
	        open = false;
	        rej(x);
	      };
	      if(open){
	        cont();
	      }
	    }, function Computation$res(x){
	      cont = function Computation$res$cont(){
	        open = false;
	        res(x);
	      };
	      if(open){
	        cont();
	      }
	    }) || noop;
	  }catch(e){
	    open = false;
	    rec(e);
	    return noop;
	  }
	  if(!(isFunction(cancel) && cancel.length === 0)){
	    rec(typeError(
	      'The computation was expected to return a nullary function or void\n' +
	      '  Actual: ' + sanctuaryShow(cancel)
	    ));
	  }
	  cont();
	  return function Computation$cancel(){
	    if(open){
	      open = false;
	      cancel && cancel();
	    }
	  };
	};

	Computation.prototype.toString = function Computation$toString(){
	  return 'Future(' + showf(this._computation) + ')';
	};

	function Transformation(spawn, actions){
	  this._spawn = spawn;
	  this._actions = actions;
	}

	Transformation.prototype = Object.create(Future.prototype);

	Transformation.prototype._transform = function Transformation$_transform(action){
	  return new Transformation(this._spawn, cons(action, this._actions));
	};

	Transformation.prototype._interpret = function Transformation$interpret(rec, rej, res){

	  //This is the primary queue of actions. All actions in here will be "cold",
	  //meaning they haven't had the chance yet to run concurrent computations.
	  var queue = new denque();

	  //These combined variables define our current state.
	  // future  = the future we are currently forking
	  // action  = the action to be informed when the future settles
	  // cancel  = the cancel function of the current future
	  // settled = a boolean indicating whether a new tick should start
	  // async   = a boolean indicating whether we are awaiting a result asynchronously
	  var future, action, cancel = noop, stack = nil, settled, async = true, it;

	  //Pushes a new action onto the stack. The stack is used to keep "hot"
	  //actions. The last one added is the first one to process, because actions
	  //are pushed right-to-left (see warmupActions).
	  function pushStack(x){
	    stack = cons(x, stack);
	  }

	  //Takes the leftmost action from the stack and returns it.
	  function popStack(){
	    var x = stack.head;
	    stack = stack.tail;
	    return x;
	  }

	  //This function is called with a future to use in the next tick.
	  //Here we "flatten" the actions of another Sequence into our own actions,
	  //this is the magic that allows for infinitely stack safe recursion because
	  //actions like ChainAction will return a new Sequence.
	  //If we settled asynchronously, we call drain() directly to run the next tick.
	  function settle(m){
	    settled = true;
	    future = m;
	    if(future._spawn){
	      var tail = future._actions;
	      while(!isNil(tail)){
	        queue.unshift(tail.head);
	        tail = tail.tail;
	      }
	      future = future._spawn;
	    }
	    if(async) drain();
	  }

	  //This function serves as a rejection handler for our current future.
	  //It will tell the current action that the future rejected, and it will
	  //settle the current tick with the action's answer to that.
	  function rejected(x){
	    settle(action.rejected(x));
	  }

	  //This function serves as a resolution handler for our current future.
	  //It will tell the current action that the future resolved, and it will
	  //settle the current tick with the action's answer to that.
	  function resolved(x){
	    settle(action.resolved(x));
	  }

	  //This function is passed into actions when they are "warmed up".
	  //If the action decides that it has its result, without the need to await
	  //anything else, then it can call this function to force "early termination".
	  //When early termination occurs, all actions which were queued prior to the
	  //terminator will be skipped. If they were already hot, they will also receive
	  //a cancel signal so they can cancel their own concurrent computations, as
	  //their results are no longer needed.
	  function early(m, terminator){
	    cancel();
	    queue.clear();
	    if(async && action !== terminator){
	      action.cancel();
	      while((it = popStack()) && it !== terminator) it.cancel();
	    }
	    settle(m);
	  }

	  //This will cancel the current Future, the current action, and all queued hot actions.
	  function Sequence$cancel(){
	    cancel();
	    action && action.cancel();
	    while(it = popStack()) it.cancel();
	  }

	  //This function is called when an exception is caught.
	  function exception(e){
	    Sequence$cancel();
	    settled = true;
	    queue.clear();
	    future = never;
	    rec(e);
	  }

	  //This function serves to kickstart concurrent computations.
	  //Takes all actions from the cold queue *back-to-front*, and calls run() on
	  //each of them, passing them the "early" function. If any of them settles (by
	  //calling early()), we abort. After warming up all actions in the cold queue,
	  //we warm up the current action as well.
	  function warmupActions(){
	    while(it = queue.pop()){
	      it = it.run(early);
	      if(settled) return;
	      pushStack(it);
	    }
	    action = action.run(early);
	  }

	  //This function represents our main execution loop. By "tick", we've been
	  //referring to the execution of one iteration in the while-loop below.
	  function drain(){
	    async = false;
	    while(true){
	      settled = false;
	      if(action = queue.shift()){
	        cancel = future._interpret(exception, rejected, resolved);
	        if(!settled) warmupActions();
	      }else if(action = popStack()){
	        cancel = future._interpret(exception, rejected, resolved);
	      }else break;
	      if(settled) continue;
	      async = true;
	      return;
	    }
	    cancel = future._interpret(exception, rej, res);
	  }

	  //Start the execution loop.
	  settle(this);

	  //Return the cancellation function.
	  return Sequence$cancel;

	};

	Transformation.prototype.toString = function Transformation$toString(){
	  var str = '', tail = this._actions;

	  while(!isNil(tail)){
	    str = '.' + tail.head.toString() + str;
	    tail = tail.tail;
	  }

	  return this._spawn.toString() + str;
	};

	function Crashed(error$$1){
	  this._error = error$$1;
	}

	Crashed.prototype = Object.create(Future.prototype);

	Crashed.prototype._interpret = function Crashed$interpret(rec){
	  rec(this._error);
	  return noop;
	};

	Crashed.prototype.toString = function Crashed$toString(){
	  return 'Future(function crash(){ throw ' + sanctuaryShow(this._error) + ' })';
	};

	function Rejected(value){
	  this._value = value;
	}

	Rejected.prototype = Object.create(Future.prototype);

	Rejected.prototype._interpret = function Rejected$interpret(rec, rej){
	  rej(this._value);
	  return noop;
	};

	Rejected.prototype.extractLeft = function Rejected$extractLeft(){
	  return [this._value];
	};

	Rejected.prototype.toString = function Rejected$toString(){
	  return 'Future.reject(' + sanctuaryShow(this._value) + ')';
	};

	function reject(x){
	  return new Rejected(x);
	}

	function Resolved(value){
	  this._value = value;
	}

	Resolved.prototype = Object.create(Future.prototype);

	Resolved.prototype._interpret = function Resolved$interpret(rec, rej, res){
	  res(this._value);
	  return noop;
	};

	Resolved.prototype.extractRight = function Resolved$extractRight(){
	  return [this._value];
	};

	Resolved.prototype.toString = function Resolved$toString(){
	  return 'Future.of(' + sanctuaryShow(this._value) + ')';
	};

	function resolve(x){
	  return new Resolved(x);
	}

	function Never(){
	  this._isNever = true;
	}

	Never.prototype = Object.create(Future.prototype);

	Never.prototype._interpret = function Never$interpret(){
	  return noop;
	};

	Never.prototype.toString = function Never$toString(){
	  return 'Future.never';
	};

	var never = new Never();

	function isNever(x){
	  return isFuture(x) && x._isNever === true;
	}

	function Eager(future){
	  var _this = this;
	  _this.rec = noop;
	  _this.rej = noop;
	  _this.res = noop;
	  _this.crashed = false;
	  _this.rejected = false;
	  _this.resolved = false;
	  _this.value = null;
	  _this.cancel = future._interpret(function Eager$crash(x){
	    _this.value = x;
	    _this.crashed = true;
	    _this.cancel = noop;
	    _this.rec(x);
	  }, function Eager$reject(x){
	    _this.value = x;
	    _this.rejected = true;
	    _this.cancel = noop;
	    _this.rej(x);
	  }, function Eager$resolve(x){
	    _this.value = x;
	    _this.resolved = true;
	    _this.cancel = noop;
	    _this.res(x);
	  });
	}

	Eager.prototype = Object.create(Future.prototype);

	Eager.prototype._interpret = function Eager$interpret(rec, rej, res){
	  if(this.crashed) rec(this.value);
	  else if(this.rejected) rej(this.value);
	  else if(this.resolved) res(this.value);
	  else{
	    this.rec = rec;
	    this.rej = rej;
	    this.res = res;
	  }
	  return this.cancel;
	};

	var Action = {
	  rejected: function Action$rejected(x){ this.cancel(); return new Rejected(x) },
	  resolved: function Action$resolved(x){ this.cancel(); return new Resolved(x) },
	  run: moop,
	  cancel: noop
	};

	function nullaryActionToString(){
	  return this.name + '()';
	}

	function defineNullaryAction(name$$1, prototype){
	  var _name = '_' + name$$1;
	  function NullaryAction(){}
	  NullaryAction.prototype = Object.assign(Object.create(Action), prototype);
	  NullaryAction.prototype.name = name$$1;
	  NullaryAction.prototype.toString = nullaryActionToString;
	  Future.prototype[name$$1] = function checkedNullaryTransformation(){
	    if(!isFuture(this)) throwInvalidContext('Future#' + name$$1, this);
	    return this[_name]();
	  };
	  Future.prototype[_name] = function uncheckedNullaryTransformation(){
	    return this._transform(new NullaryAction);
	  };
	  return NullaryAction;
	}

	function mapperActionToString(){
	  return this.name + '(' + showf(this.mapper) + ')';
	}

	function defineMapperAction(name$$1, prototype){
	  var _name = '_' + name$$1;
	  function MapperAction(mapper){ this.mapper = mapper; }
	  MapperAction.prototype = Object.assign(Object.create(Action), prototype);
	  MapperAction.prototype.name = name$$1;
	  MapperAction.prototype.toString = mapperActionToString;
	  Future.prototype[name$$1] = function checkedMapperTransformation(mapper){
	    if(!isFuture(this)) throwInvalidContext('Future#' + name$$1, this);
	    if(!isFunction(mapper)) throwInvalidArgument('Future#' + name$$1, 0, 'to be a Function', mapper);
	    return this[_name](mapper);
	  };
	  Future.prototype[_name] = function uncheckedMapperTransformation(mapper){
	    return this._transform(new MapperAction(mapper));
	  };
	  return MapperAction;
	}

	function bimapperActionToString(){
	  return this.name + '(' + showf(this.lmapper) + ', ' + showf(this.rmapper) + ')';
	}

	function defineBimapperAction(name$$1, prototype){
	  var _name = '_' + name$$1;
	  function BimapperAction(lmapper, rmapper){ this.lmapper = lmapper; this.rmapper = rmapper; }
	  BimapperAction.prototype = Object.assign(Object.create(Action), prototype);
	  BimapperAction.prototype.name = name$$1;
	  BimapperAction.prototype.toString = bimapperActionToString;
	  Future.prototype[name$$1] = function checkedBimapperTransformation(lm, rm){
	    if(!isFuture(this)) throwInvalidContext('Future#' + name$$1, this);
	    if(!isFunction(lm)) throwInvalidArgument('Future#' + name$$1, 0, 'to be a Function', lm);
	    if(!isFunction(rm)) throwInvalidArgument('Future#' + name$$1, 1, 'to be a Function', rm);
	    return this[_name](lm, rm);
	  };
	  Future.prototype[_name] = function uncheckedBimapperTransformation(lm, rm){
	    return this._transform(new BimapperAction(lm, rm));
	  };
	  return BimapperAction;
	}

	function otherActionToString(){
	  return this.name + '(' + this.other.toString() + ')';
	}

	function defineOtherAction(name$$1, prototype){
	  var _name = '_' + name$$1;
	  function OtherAction(other){ this.other = other; }
	  OtherAction.prototype = Object.assign(Object.create(Action), prototype);
	  OtherAction.prototype.name = name$$1;
	  OtherAction.prototype.toString = otherActionToString;
	  Future.prototype[name$$1] = function checkedOtherTransformation(other){
	    if(!isFuture(this)) throwInvalidContext('Future#' + name$$1, this);
	    if(!isFuture(other)) throwInvalidFuture('Future#' + name$$1, 0, other);
	    return this[_name](other);
	  };
	  Future.prototype[_name] = function uncheckedOtherTransformation(other){
	    return this._transform(new OtherAction(other));
	  };
	  return OtherAction;
	}

	function defineParallelAction(name$$1, rec, rej, res, prototype){
	  var ParallelAction = defineOtherAction(name$$1, prototype);
	  ParallelAction.prototype.run = function ParallelAction$run(early){
	    var eager = new Eager(this.other);
	    var action = new ParallelAction(eager);
	    function ParallelAction$early(m){ early(m, action); }
	    action.cancel = eager._interpret(
	      function ParallelAction$rec(x){ rec(ParallelAction$early, x); },
	      function ParallelAction$rej(x){ rej(ParallelAction$early, x); },
	      function ParallelAction$res(x){ res(ParallelAction$early, x); }
	    );
	    return action;
	  };
	  return ParallelAction;
	}

	function apActionHandler(f){
	  return isFunction(f) ?
	         this.other._map(function ApAction$resolved$mapper(x){ return f(x) }) :
	         new Crashed(typeError(
	           'Future#' + this.name + ' expects its first argument to be a Future of a Function\n' +
	           '  Actual: Future.of(' + sanctuaryShow(f) + ')'
	         ));
	}

	function chainActionHandler(x){
	  var m;
	  try{ m = this.mapper(x); }catch(e){ return new Crashed(e) }
	  return isFuture(m) ? m : new Crashed(invalidFuture(
	    'Future#' + this.name,
	    'the function it\'s given to return a Future',
	    m,
	    '\n  From calling: ' + showf(this.mapper) + '\n  With: ' + sanctuaryShow(x)
	  ));
	}

	function returnOther(){
	  return this.other;
	}

	function mapWith(mapper, create, value){
	  var m;
	  try{ m = create(mapper(value)); }catch(e){ m = new Crashed(e); }
	  return m;
	}

	function mapRight(value){
	  return mapWith(this.rmapper, resolve, value);
	}

	function earlyCrash(early, x){
	  early(new Crashed(x));
	}

	function earlyReject(early, x){
	  early(new Rejected(x));
	}

	function earlyResolve(early, x){
	  early(new Resolved(x));
	}

	defineOtherAction('ap', {
	  resolved: apActionHandler
	});

	defineMapperAction('map', {
	  resolved: function MapAction$resolved(x){ return mapWith(this.mapper, resolve, x) }
	});

	defineBimapperAction('bimap', {
	  resolved: mapRight,
	  rejected: function BimapAction$rejected(x){ return mapWith(this.lmapper, reject, x) }
	});

	defineMapperAction('chain', {
	  resolved: chainActionHandler
	});

	defineMapperAction('mapRej', {
	  rejected: function MapRejAction$rejected(x){ return mapWith(this.mapper, reject, x) }
	});

	defineMapperAction('chainRej', {
	  rejected: chainActionHandler
	});

	defineNullaryAction('swap', {
	  rejected: Action.resolved,
	  resolved: Action.rejected
	});

	defineBimapperAction('fold', {
	  resolved: mapRight,
	  rejected: function FoldAction$rejected(x){ return mapWith(this.lmapper, resolve, x) }
	});

	var finallyAction = {
	  rejected: function FinallyAction$rejected(x){ return this.other._and(new Rejected(x)) },
	  resolved: function FinallyAction$resolved(x){ return this.other._and(new Resolved(x)) }
	};

	defineOtherAction('finally', finallyAction);
	defineOtherAction('lastly', finallyAction);

	defineOtherAction('and', {
	  resolved: returnOther
	});

	defineOtherAction('or', {
	  rejected: returnOther
	});

	defineParallelAction('_parallelAp', earlyCrash, earlyReject, noop, {
	  resolved: apActionHandler
	});

	defineParallelAction('race', earlyCrash, earlyReject, earlyResolve, {});

	defineParallelAction('both', earlyCrash, earlyReject, noop, {
	  resolved: function BothAction$resolved(x){
	    return this.other._map(function BothAction$resolved$mapper(y){ return [x, y] });
	  }
	});

	function Next(x){
	  return {done: false, value: x};
	}

	function Done(x){
	  return {done: true, value: x};
	}

	function isIteration(x){
	  return isObject(x) && isBoolean(x.done);
	}

	function chainRec(step, init){
	  return resolve(Next(init))._chain(function chainRec$recur(o){
	    return o.done ? resolve(o.value) : step(Next, Done, o.value)._chain(chainRec$recur);
	  });
	}

	function ap$mval(mval, mfunc){
	  if(!isApply(mfunc)) throwInvalidArgument('Future.ap', 1, 'be an Apply', mfunc);
	  return mfunc[FL.ap](mval);
	}

	function ap(mval, mfunc){
	  if(!isApply(mval)) throwInvalidArgument('Future.ap', 0, 'be an Apply', mval);
	  if(arguments.length === 1) return partial1(ap$mval, mval);
	  return ap$mval(mval, mfunc);
	}

	function alt$left(left, right){
	  if(!isAlt(right)) throwInvalidArgument('alt', 1, 'be an Alt', right);
	  return left[FL.alt](right);
	}

	function alt(left, right){
	  if(!isAlt(left)) throwInvalidArgument('alt', 0, 'be an Alt', left);
	  if(arguments.length === 1) return partial1(alt$left, left);
	  return alt$left(left, right);
	}

	function map$mapper(mapper, m){
	  if(!isFunctor(m)) throwInvalidArgument('Future.map', 1, 'be a Functor', m);
	  return m[FL.map](mapper);
	}

	function map(mapper, m){
	  if(!isFunction(mapper)) throwInvalidArgument('Future.map', 0, 'be a Function', mapper);
	  if(arguments.length === 1) return partial1(map$mapper, mapper);
	  return map$mapper(mapper, m);
	}

	function bimap$lmapper$rmapper(lmapper, rmapper, m){
	  if(!isBifunctor(m)) throwInvalidArgument('Future.bimap', 2, 'be a Bifunctor', m);
	  return m[FL.bimap](lmapper, rmapper);
	}

	function bimap$lmapper(lmapper, rmapper, m){
	  if(!isFunction(rmapper)) throwInvalidArgument('Future.bimap', 1, 'be a Function', rmapper);
	  if(arguments.length === 2) return partial2(bimap$lmapper$rmapper, lmapper, rmapper);
	  return bimap$lmapper$rmapper(lmapper, rmapper, m);
	}

	function bimap(lmapper, rmapper, m){
	  if(!isFunction(lmapper)) throwInvalidArgument('Future.bimap', 0, 'be a Function', lmapper);
	  if(arguments.length === 1) return partial1(bimap$lmapper, lmapper);
	  if(arguments.length === 2) return bimap$lmapper(lmapper, rmapper);
	  return bimap$lmapper(lmapper, rmapper, m);
	}

	function chain$chainer(chainer, m){
	  if(!isChain(m)) throwInvalidArgument('Future.chain', 1, 'be a Chain', m);
	  return m[FL.chain](chainer);
	}

	function chain(chainer, m){
	  if(!isFunction(chainer)) throwInvalidArgument('Future.chain', 0, 'be a Function', chainer);
	  if(arguments.length === 1) return partial1(chain$chainer, chainer);
	  return chain$chainer(chainer, m);
	}

	function mapRej$mapper(mapper, m){
	  if(!isFuture(m)) throwInvalidFuture('Future.mapRej', 1, m);
	  return m.mapRej(mapper);
	}

	function mapRej(mapper, m){
	  if(!isFunction(mapper)) throwInvalidArgument('Future.mapRej', 0, 'be a Function', mapper);
	  if(arguments.length === 1) return partial1(mapRej$mapper, mapper);
	  return mapRej$mapper(mapper, m);
	}

	function chainRej$chainer(chainer, m){
	  if(!isFuture(m)) throwInvalidFuture('Future.chainRej', 1, m);
	  return m.chainRej(chainer);
	}

	function chainRej(chainer, m){
	  if(!isFunction(chainer)) throwInvalidArgument('Future.chainRej', 0, 'be a Function', chainer);
	  if(arguments.length === 1) return partial1(chainRej$chainer, chainer);
	  return chainRej$chainer(chainer, m);
	}

	function lastly$right(right, left){
	  if(!isFuture(left)) throwInvalidFuture('Future.finally', 1, left);
	  return left.finally(right);
	}

	function lastly(right, left){
	  if(!isFuture(right)) throwInvalidFuture('Future.finally', 0, right);
	  if(arguments.length === 1) return partial1(lastly$right, right);
	  return lastly$right(right, left);
	}

	function and$left(left, right){
	  if(!isFuture(right)) throwInvalidFuture('Future.and', 1, right);
	  return left.and(right);
	}

	function and(left, right){
	  if(!isFuture(left)) throwInvalidFuture('Future.and', 0, left);
	  if(arguments.length === 1) return partial1(and$left, left);
	  return and$left(left, right);
	}

	function both$left(left, right){
	  if(!isFuture(right)) throwInvalidFuture('Future.both', 1, right);
	  return left.both(right);
	}

	function both(left, right){
	  if(!isFuture(left)) throwInvalidFuture('Future.both', 0, left);
	  if(arguments.length === 1) return partial1(both$left, left);
	  return both$left(left, right);
	}

	function or$left(left, right){
	  if(!isFuture(right)) throwInvalidFuture('Future.or', 1, right);
	  return left.or(right);
	}

	function or(left, right){
	  if(!isFuture(left)) throwInvalidFuture('Future.or', 0, left);
	  if(arguments.length === 1) return partial1(or$left, left);
	  return or$left(left, right);
	}

	function race$right(right, left){
	  if(!isFuture(left)) throwInvalidFuture('Future.race', 1, left);
	  return left.race(right);
	}

	function race(right, left){
	  if(!isFuture(right)) throwInvalidFuture('Future.race', 0, right);
	  if(arguments.length === 1) return partial1(race$right, right);
	  return race$right(right, left);
	}

	function swap(m){
	  if(!isFuture(m)) throwInvalidFuture('Future.swap', 0, m);
	  return m.swap();
	}

	function fold$f$g(f, g, m){
	  if(!isFuture(m)) throwInvalidFuture('Future.fold', 2, m);
	  return m.fold(f, g);
	}

	function fold$f(f, g, m){
	  if(!isFunction(g)) throwInvalidArgument('Future.fold', 1, 'be a function', g);
	  if(arguments.length === 2) return partial2(fold$f$g, f, g);
	  return fold$f$g(f, g, m);
	}

	function fold(f, g, m){
	  if(!isFunction(f)) throwInvalidArgument('Future.fold', 0, 'be a function', f);
	  if(arguments.length === 1) return partial1(fold$f, f);
	  if(arguments.length === 2) return fold$f(f, g);
	  return fold$f(f, g, m);
	}

	function done$callback(callback, m){
	  if(!isFuture(m)) throwInvalidFuture('Future.done', 1, m);
	  return m.done(callback);
	}

	function done(callback, m){
	  if(!isFunction(callback)) throwInvalidArgument('Future.done', 0, 'be a Function', callback);
	  if(arguments.length === 1) return partial1(done$callback, callback);
	  return done$callback(callback, m);
	}

	function fork$f$g(f, g, m){
	  if(!isFuture(m)) throwInvalidFuture('Future.fork', 2, m);
	  return m._interpret(raise, f, g);
	}

	function fork$f(f, g, m){
	  if(!isFunction(g)) throwInvalidArgument('Future.fork', 1, 'be a function', g);
	  if(arguments.length === 2) return partial2(fork$f$g, f, g);
	  return fork$f$g(f, g, m);
	}

	function fork(f, g, m){
	  if(!isFunction(f)) throwInvalidArgument('Future.fork', 0, 'be a function', f);
	  if(arguments.length === 1) return partial1(fork$f, f);
	  if(arguments.length === 2) return fork$f(f, g);
	  return fork$f(f, g, m);
	}

	function forkCatch(f, g, h, m){
	  if(!isFunction(f)) throwInvalidArgument('Future.forkCatch', 0, 'be a function', f);
	  if(arguments.length === 1) return partial1(forkCatch, f);
	  if(!isFunction(g)) throwInvalidArgument('Future.forkCatch', 1, 'be a function', g);
	  if(arguments.length === 2) return partial2(forkCatch, f, g);
	  if(!isFunction(h)) throwInvalidArgument('Future.forkCatch', 2, 'be a function', h);
	  if(arguments.length === 3) return partial3(forkCatch, f, g, h);
	  if(!isFuture(m)) throwInvalidFuture('Future.forkCatch', 3, m);
	  return m._interpret(function forkCatch$recover(x){ f(valueToError(x)); }, g, h);
	}

	function promise(m){
	  if(!isFuture(m)) throwInvalidFuture('Future.promise', 0, m);
	  return m.promise();
	}

	function value$cont(cont, m){
	  if(!isFuture(m)) throwInvalidFuture('Future.value', 1, m);
	  return m.value(cont);
	}

	function value(cont, m){
	  if(!isFunction(cont)) throwInvalidArgument('Future.value', 0, 'be a Function', cont);
	  if(arguments.length === 1) return partial1(value$cont, cont);
	  return value$cont(cont, m);
	}

	function extractLeft(m){
	  if(!isFuture(m)) throwInvalidFuture('Future.extractLeft', 0, m);
	  return m.extractLeft();
	}

	function extractRight(m){
	  if(!isFuture(m)) throwInvalidFuture('Future.extractRight', 0, m);
	  return m.extractRight();
	}

	function After(time, value){
	  this._time = time;
	  this._value = value;
	}

	After.prototype = Object.create(Future.prototype);

	After.prototype._interpret = function After$interpret(rec, rej, res){
	  var id = setTimeout(res, this._time, this._value);
	  return function After$cancel(){ clearTimeout(id); };
	};

	After.prototype.extractRight = function After$extractRight(){
	  return [this._value];
	};

	After.prototype.toString = function After$toString(){
	  return 'Future.after(' + sanctuaryShow(this._time) + ', ' + sanctuaryShow(this._value) + ')';
	};

	function RejectAfter(time, value){
	  this._time = time;
	  this._value = value;
	}

	RejectAfter.prototype = Object.create(Future.prototype);

	RejectAfter.prototype._interpret = function RejectAfter$interpret(rec, rej){
	  var id = setTimeout(rej, this._time, this._value);
	  return function RejectAfter$cancel(){ clearTimeout(id); };
	};

	RejectAfter.prototype.extractLeft = function RejectAfter$extractLeft(){
	  return [this._value];
	};

	RejectAfter.prototype.toString = function RejectAfter$toString(){
	  return 'Future.rejectAfter(' + sanctuaryShow(this._time) + ', ' + sanctuaryShow(this._value) + ')';
	};

	function after$time(time, value){
	  return time === Infinity ? never : new After(time, value);
	}

	function after(time, value){
	  if(!isUnsigned(time)) throwInvalidArgument('Future.after', 0, 'be a positive integer', time);
	  if(arguments.length === 1) return partial1(after$time, time);
	  return after$time(time, value);
	}

	function rejectAfter$time(time, reason){
	  return time === Infinity ? never : new RejectAfter(time, reason);
	}

	function rejectAfter(time, reason){
	  if(!isUnsigned(time)){
	    throwInvalidArgument('Future.rejectAfter', 0, 'be a positive integer', time);
	  }
	  if(arguments.length === 1) return partial1(rejectAfter$time, time);
	  return rejectAfter$time(time, reason);
	}

	function Attempt(fn){
	  this._fn = fn;
	}

	Attempt.prototype = Object.create(Future.prototype);

	Attempt.prototype._interpret = function Attempt$interpret(rec, rej, res){
	  var r;
	  try{ r = this._fn(); }catch(e){ rej(e); return noop }
	  res(r);
	  return noop;
	};

	Attempt.prototype.toString = function Attempt$toString(){
	  return 'Future.try(' + showf(this._fn) + ')';
	};

	function attempt(f){
	  if(!isFunction(f)) throwInvalidArgument('Future.try', 0, 'be a function', f);
	  return new Attempt(f);
	}

	var Cold = Cached.Cold = 0;
	var Pending = Cached.Pending = 1;
	var Crashed$1 = Cached.Crashed = 2;
	var Rejected$1 = Cached.Rejected = 3;
	var Resolved$1 = Cached.Resolved = 4;

	function Queued(rec, rej, res){
	  this[Crashed$1] = rec;
	  this[Rejected$1] = rej;
	  this[Resolved$1] = res;
	}

	function Cached(pure){
	  this._pure = pure;
	  this.reset();
	}

	Cached.prototype = Object.create(Future.prototype);

	Cached.prototype.extractLeft = function Cached$extractLeft(){
	  return this._state === Rejected$1 ? [this._value] : [];
	};

	Cached.prototype.extractRight = function Cached$extractRight(){
	  return this._state === Resolved$1 ? [this._value] : [];
	};

	Cached.prototype._addToQueue = function Cached$addToQueue(rec, rej, res){
	  var _this = this;
	  if(_this._state > Pending) return noop;
	  var i = _this._queue.push(new Queued(rec, rej, res)) - 1;
	  _this._queued = _this._queued + 1;

	  return function Cached$removeFromQueue(){
	    if(_this._state > Pending) return;
	    _this._queue[i] = undefined;
	    _this._queued = _this._queued - 1;
	    if(_this._queued === 0) _this.reset();
	  };
	};

	Cached.prototype._drainQueue = function Cached$drainQueue(){
	  if(this._state <= Pending) return;
	  if(this._queued === 0) return;
	  var queue = this._queue;
	  var length = queue.length;
	  var state = this._state;
	  var value = this._value;

	  for(var i = 0; i < length; i++){
	    queue[i] && queue[i][state](value);
	    queue[i] = undefined;
	  }

	  this._queue = undefined;
	  this._queued = 0;
	};

	Cached.prototype.crash = function Cached$crash(error){
	  if(this._state > Pending) return;
	  this._value = error;
	  this._state = Crashed$1;
	  this._drainQueue();
	};

	Cached.prototype.reject = function Cached$reject(reason){
	  if(this._state > Pending) return;
	  this._value = reason;
	  this._state = Rejected$1;
	  this._drainQueue();
	};

	Cached.prototype.resolve = function Cached$resolve(value){
	  if(this._state > Pending) return;
	  this._value = value;
	  this._state = Resolved$1;
	  this._drainQueue();
	};

	Cached.prototype.run = function Cached$run(){
	  var _this = this;
	  if(_this._state > Cold) return;
	  _this._state = Pending;
	  _this._cancel = _this._pure._interpret(
	    function Cached$fork$rec(x){ _this.crash(x); },
	    function Cached$fork$rej(x){ _this.reject(x); },
	    function Cached$fork$res(x){ _this.resolve(x); }
	  );
	};

	Cached.prototype.reset = function Cached$reset(){
	  if(this._state === Cold) return;
	  if(this._state === Pending) this._cancel();
	  this._cancel = noop;
	  this._queue = [];
	  this._queued = 0;
	  this._value = undefined;
	  this._state = Cold;
	};

	Cached.prototype._interpret = function Cached$interpret(rec, rej, res){
	  var cancel = noop;

	  switch(this._state){
	    case Pending: cancel = this._addToQueue(rec, rej, res); break;
	    case Crashed$1: rec(this._value); break;
	    case Rejected$1: rej(this._value); break;
	    case Resolved$1: res(this._value); break;
	    default: cancel = this._addToQueue(rec, rej, res); this.run();
	  }

	  return cancel;
	};

	Cached.prototype.toString = function Cached$toString(){
	  return 'Future.cache(' + this._pure.toString() + ')';
	};

	function cache(m){
	  if(!isFuture(m)) throwInvalidFuture('Future.cache', 0, m);
	  return new Cached(m);
	}

	function Encase(fn, a){
	  this._fn = fn;
	  this._a = a;
	}

	Encase.prototype = Object.create(Future.prototype);

	Encase.prototype._interpret = function Encase$interpret(rec, rej, res){
	  var r;
	  try{ r = this._fn(this._a); }catch(e){ rej(e); return noop }
	  res(r);
	  return noop;
	};

	Encase.prototype.toString = function Encase$toString(){
	  return 'Future.encase(' + showf(this._fn) + ', ' + sanctuaryShow(this._a) + ')';
	};

	function encase(f, x){
	  if(!isFunction(f)) throwInvalidArgument('Future.encase', 0, 'be a function', f);
	  if(arguments.length === 1) return partial1(encase, f);
	  return new Encase(f, x);
	}

	function Encase2(fn, a, b){
	  this._fn = fn;
	  this._a = a;
	  this._b = b;
	}

	Encase2.prototype = Object.create(Future.prototype);

	Encase2.prototype._interpret = function Encase2$interpret(rec, rej, res){
	  var r;
	  try{ r = this._fn(this._a, this._b); }catch(e){ rej(e); return noop }
	  res(r);
	  return noop;
	};

	Encase2.prototype.toString = function Encase2$toString(){
	  return 'Future.encase2(' + showf(this._fn) + ', ' + sanctuaryShow(this._a) + ', ' + sanctuaryShow(this._b) + ')';
	};

	function encase2(f, x, y){
	  if(!isFunction(f)) throwInvalidArgument('Future.encase2', 0, 'be a function', f);

	  switch(arguments.length){
	    case 1: return partial1(encase2, f);
	    case 2: return partial2(encase2, f, x);
	    default: return new Encase2(f, x, y);
	  }
	}

	function Encase3(fn, a, b, c){
	  this._fn = fn;
	  this._a = a;
	  this._b = b;
	  this._c = c;
	}

	Encase3.prototype = Object.create(Future.prototype);

	Encase3.prototype._interpret = function Encase3$interpret(rec, rej, res){
	  var r;
	  try{ r = this._fn(this._a, this._b, this._c); }catch(e){ rej(e); return noop }
	  res(r);
	  return noop;
	};

	Encase3.prototype.toString = function Encase3$toString(){
	  return 'Future.encase3('
	       + showf(this._fn)
	       + ', '
	       + sanctuaryShow(this._a)
	       + ', '
	       + sanctuaryShow(this._b)
	       + ', '
	       + sanctuaryShow(this._c)
	       + ')';
	};

	function encase3(f, x, y, z){
	  if(!isFunction(f)) throwInvalidArgument('Future.encase3', 0, 'be a function', f);

	  switch(arguments.length){
	    case 1: return partial1(encase3, f);
	    case 2: return partial2(encase3, f, x);
	    case 3: return partial3(encase3, f, x, y);
	    default: return new Encase3(f, x, y, z);
	  }
	}

	function EncaseN(fn, a){
	  this._fn = fn;
	  this._a = a;
	}

	EncaseN.prototype = Object.create(Future.prototype);

	EncaseN.prototype._interpret = function EncaseN$interpret(rec, rej, res){
	  var open = false, cont = function(){ open = true; };
	  try{
	    this._fn(this._a, function EncaseN$done(err, val){
	      cont = err ? function EncaseN3$rej(){
	        open = false;
	        rej(err);
	      } : function EncaseN3$res(){
	        open = false;
	        res(val);
	      };
	      if(open){
	        cont();
	      }
	    });
	  }catch(e){
	    rec(e);
	    open = false;
	    return noop;
	  }
	  cont();
	  return function EncaseN$cancel(){ open = false; };
	};

	EncaseN.prototype.toString = function EncaseN$toString(){
	  return 'Future.encaseN(' + showf(this._fn) + ', ' + sanctuaryShow(this._a) + ')';
	};

	function encaseN(f, x){
	  if(!isFunction(f)) throwInvalidArgument('Future.encaseN', 0, 'be a function', f);
	  if(arguments.length === 1) return partial1(encaseN, f);
	  return new EncaseN(f, x);
	}

	function EncaseN2(fn, a, b){
	  this._fn = fn;
	  this._a = a;
	  this._b = b;
	}

	EncaseN2.prototype = Object.create(Future.prototype);

	EncaseN2.prototype._interpret = function EncaseN2$interpret(rec, rej, res){
	  var open = false, cont = function(){ open = true; };
	  try{
	    this._fn(this._a, this._b, function EncaseN2$done(err, val){
	      cont = err ? function EncaseN2$rej(){
	        open = false;
	        rej(err);
	      } : function EncaseN2$res(){
	        open = false;
	        res(val);
	      };
	      if(open){
	        cont();
	      }
	    });
	  }catch(e){
	    rec(e);
	    open = false;
	    return noop;
	  }
	  cont();
	  return function EncaseN2$cancel(){ open = false; };
	};

	EncaseN2.prototype.toString = function EncaseN2$toString(){
	  return 'Future.encaseN2(' + showf(this._fn) + ', ' + sanctuaryShow(this._a) + ', ' + sanctuaryShow(this._b) + ')';
	};

	function encaseN2(f, x, y){
	  if(!isFunction(f)) throwInvalidArgument('Future.encaseN2', 0, 'be a function', f);

	  switch(arguments.length){
	    case 1: return partial1(encaseN2, f);
	    case 2: return partial2(encaseN2, f, x);
	    default: return new EncaseN2(f, x, y);
	  }
	}

	function EncaseN3(fn, a, b, c){
	  this._fn = fn;
	  this._a = a;
	  this._b = b;
	  this._c = c;
	}

	EncaseN3.prototype = Object.create(Future.prototype);

	EncaseN3.prototype._interpret = function EncaseN3$interpret(rec, rej, res){
	  var open = false, cont = function(){ open = true; };
	  try{
	    this._fn(this._a, this._b, this._c, function EncaseN3$done(err, val){
	      cont = err ? function EncaseN3$rej(){
	        open = false;
	        rej(err);
	      } : function EncaseN3$res(){
	        open = false;
	        res(val);
	      };
	      if(open){
	        cont();
	      }
	    });
	  }catch(e){
	    rec(e);
	    open = false;
	    return noop;
	  }
	  cont();
	  return function EncaseN3$cancel(){ open = false; };
	};

	EncaseN3.prototype.toString = function EncaseN3$toString(){
	  return 'Future.encaseN3('
	       + showf(this._fn)
	       + ', '
	       + sanctuaryShow(this._a)
	       + ', '
	       + sanctuaryShow(this._b)
	       + ', '
	       + sanctuaryShow(this._c)
	       + ')';
	};

	function encaseN3(f, x, y, z){
	  if(!isFunction(f)) throwInvalidArgument('Future.encaseN3', 0, 'be a function', f);

	  switch(arguments.length){
	    case 1: return partial1(encaseN3, f);
	    case 2: return partial2(encaseN3, f, x);
	    case 3: return partial3(encaseN3, f, x, y);
	    default: return new EncaseN3(f, x, y, z);
	  }
	}

	function invalidPromise(p, f, a){
	  return typeError(
	    'Future.encaseP expects the function it\'s given to return a Promise/Thenable'
	    + '\n  Actual: ' + (sanctuaryShow(p)) + '\n  From calling: ' + (showf(f))
	    + '\n  With: ' + (sanctuaryShow(a))
	  );
	}

	function EncaseP(fn, a){
	  this._fn = fn;
	  this._a = a;
	}

	EncaseP.prototype = Object.create(Future.prototype);

	EncaseP.prototype._interpret = function EncaseP$interpret(rec, rej, res){
	  var open = true, fn = this._fn, a = this._a, p;
	  try{
	    p = fn(a);
	  }catch(e){
	    rec(e);
	    return noop;
	  }
	  if(!isThenable(p)){
	    rec(invalidPromise(p, fn, a));
	    return noop;
	  }
	  p.then(function EncaseP$res(x){
	    if(open){
	      open = false;
	      res(x);
	    }
	  }, function EncaseP$rej(x){
	    if(open){
	      open = false;
	      rej(x);
	    }
	  });
	  return function EncaseP$cancel(){ open = false; };
	};

	EncaseP.prototype.toString = function EncaseP$toString(){
	  return 'Future.encaseP(' + showf(this._fn) + ', ' + sanctuaryShow(this._a) + ')';
	};

	function encaseP(f, x){
	  if(!isFunction(f)) throwInvalidArgument('Future.encaseP', 0, 'be a function', f);
	  if(arguments.length === 1) return partial1(encaseP, f);
	  return new EncaseP(f, x);
	}

	function invalidPromise$1(p, f, a, b){
	  return typeError(
	    'Future.encaseP2 expects the function it\'s given to return a Promise/Thenable'
	    + '\n  Actual: ' + (sanctuaryShow(p)) + '\n  From calling: ' + (showf(f))
	    + '\n  With 1: ' + (sanctuaryShow(a))
	    + '\n  With 2: ' + (sanctuaryShow(b))
	  );
	}

	function EncaseP2(fn, a, b){
	  this._fn = fn;
	  this._a = a;
	  this._b = b;
	}

	EncaseP2.prototype = Object.create(Future.prototype);

	EncaseP2.prototype._interpret = function EncaseP2$interpret(rec, rej, res){
	  var open = true, fn = this._fn, a = this._a, b = this._b, p;
	  try{
	    p = fn(a, b);
	  }catch(e){
	    rec(e);
	    return noop;
	  }
	  if(!isThenable(p)){
	    rec(invalidPromise$1(p, fn, a, b));
	    return noop;
	  }
	  p.then(function EncaseP2$res(x){
	    if(open){
	      open = false;
	      res(x);
	    }
	  }, function EncaseP2$rej(x){
	    if(open){
	      open = false;
	      rej(x);
	    }
	  });
	  return function EncaseP2$cancel(){ open = false; };
	};

	EncaseP2.prototype.toString = function EncaseP2$toString(){
	  return 'Future.encaseP2(' + showf(this._fn) + ', ' + sanctuaryShow(this._a) + ', ' + sanctuaryShow(this._b) + ')';
	};

	function encaseP2(f, x, y){
	  if(!isFunction(f)) throwInvalidArgument('Future.encaseP2', 0, 'be a function', f);

	  switch(arguments.length){
	    case 1: return partial1(encaseP2, f);
	    case 2: return partial2(encaseP2, f, x);
	    default: return new EncaseP2(f, x, y);
	  }
	}

	function invalidPromise$2(p, f, a, b, c){
	  return typeError(
	    'Future.encaseP3 expects the function it\'s given to return a Promise/Thenable'
	    + '\n  Actual: ' + (sanctuaryShow(p)) + '\n  From calling: ' + (showf(f))
	    + '\n  With 1: ' + (sanctuaryShow(a))
	    + '\n  With 2: ' + (sanctuaryShow(b))
	    + '\n  With 3: ' + (sanctuaryShow(c))
	  );
	}

	function EncaseP3(fn, a, b, c){
	  this._fn = fn;
	  this._a = a;
	  this._b = b;
	  this._c = c;
	}

	EncaseP3.prototype = Object.create(Future.prototype);

	EncaseP3.prototype._interpret = function EncaseP3$interpret(rec, rej, res){
	  var open = true, fn = this._fn, a = this._a, b = this._b, c = this._c, p;
	  try{
	    p = fn(a, b, c);
	  }catch(e){
	    rec(e);
	    return noop;
	  }
	  if(!isThenable(p)){
	    rec(invalidPromise$2(p, fn, a, b, c));
	    return noop;
	  }
	  p.then(function EncaseP3$res(x){
	    if(open){
	      open = false;
	      res(x);
	    }
	  }, function EncaseP3$rej(x){
	    if(open){
	      open = false;
	      rej(x);
	    }
	  });
	  return function EncaseP3$cancel(){ open = false; };
	};

	EncaseP3.prototype.toString = function EncaseP3$toString(){
	  return 'Future.encaseP3('
	       + showf(this._fn)
	       + ', '
	       + sanctuaryShow(this._a)
	       + ', '
	       + sanctuaryShow(this._b)
	       + ', '
	       + sanctuaryShow(this._c)
	       + ')';
	};

	function encaseP3(f, x, y, z){
	  if(!isFunction(f)) throwInvalidArgument('Future.encaseP3', 0, 'be a function', f);

	  switch(arguments.length){
	    case 1: return partial1(encaseP3, f);
	    case 2: return partial2(encaseP3, f, x);
	    case 3: return partial3(encaseP3, f, x, y);
	    default: return new EncaseP3(f, x, y, z);
	  }
	}

	var Undetermined = 0;
	var Synchronous = 1;
	var Asynchronous = 2;

	/*eslint consistent-return: 0, no-cond-assign: 0*/

	function invalidIteration(o){
	  return typeError(
	    'The iterator did not return a valid iteration from iterator.next()\n' +
	    '  Actual: ' + sanctuaryShow(o)
	  );
	}

	function invalidState(x){
	  return invalidFuture(
	    'Future.do',
	    'the iterator to produce only valid Futures',
	    x,
	    '\n  Tip: If you\'re using a generator, make sure you always yield a Future'
	  );
	}

	function Go(generator){
	  this._generator = generator;
	}

	Go.prototype = Object.create(Future.prototype);

	Go.prototype._interpret = function Go$interpret(rec, rej, res){

	  var timing = Undetermined, cancel = noop, state, value, iterator;

	  try{
	    iterator = this._generator();
	  }catch(e){
	    rec(e);
	    return noop;
	  }

	  if(!isIterator(iterator)){
	    rec(invalidArgument('Future.do', 0, 'return an iterator, maybe you forgot the "*"', iterator));
	    return noop;
	  }

	  function resolved(x){
	    value = x;
	    if(timing === Asynchronous) return drain();
	    timing = Synchronous;
	  }

	  function drain(){
	    //eslint-disable-next-line no-constant-condition
	    while(true){
	      try{
	        state = iterator.next(value);
	      }catch(e){
	        return rec(e);
	      }
	      if(!isIteration(state)) return rec(invalidIteration(state));
	      if(state.done) break;
	      if(!isFuture(state.value)) return rec(invalidState(state.value));
	      timing = Undetermined;
	      cancel = state.value._interpret(rec, rej, resolved);
	      if(timing === Undetermined) return timing = Asynchronous;
	    }
	    res(state.value);
	  }

	  drain();

	  return function Go$cancel(){ cancel(); };

	};

	Go.prototype.toString = function Go$toString(){
	  return 'Future.do(' + showf(this._generator) + ')';
	};

	function go(generator){
	  if(!isFunction(generator)) throwInvalidArgument('Future.do', 0, 'be a Function', generator);
	  return new Go(generator);
	}

	/* eslint no-param-reassign:0 */

	function invalidDisposal(m, f, x){
	  return invalidFuture(
	    'Future.hook',
	    'the first function it\'s given to return a Future',
	    m,
	    '\n  From calling: ' + showf(f) + '\n  With: ' + sanctuaryShow(x)
	  );
	}

	function invalidConsumption(m, f, x){
	  return invalidFuture(
	    'Future.hook',
	    'the second function it\'s given to return a Future',
	    m,
	    '\n  From calling: ' + showf(f) + '\n  With: ' + sanctuaryShow(x)
	  );
	}

	function Hook(acquire, dispose, consume){
	  this._acquire = acquire;
	  this._dispose = dispose;
	  this._consume = consume;
	}

	Hook.prototype = Object.create(Future.prototype);

	Hook.prototype._interpret = function Hook$interpret(rec, rej, res){

	  var _acquire = this._acquire, _dispose = this._dispose, _consume = this._consume;
	  var cancel, cancelConsume = noop, resource, value, cont = noop;

	  function Hook$done(){
	    cont(value);
	  }

	  function Hook$reject(x){
	    rej(x);
	  }

	  function Hook$consumptionException(e){
	    var rec_ = rec;
	    cont = noop;
	    rej = noop;
	    rec = noop;
	    Hook$dispose();
	    rec_(e);
	  }

	  function Hook$dispose(){
	    var disposal;
	    try{
	      disposal = _dispose(resource);
	    }catch(e){
	      return rec(e);
	    }
	    if(!isFuture(disposal)){
	      return rec(invalidDisposal(disposal, _dispose, resource));
	    }
	    disposal._interpret(rec, Hook$reject, Hook$done);
	    cancel = Hook$cancelDisposal;
	  }

	  function Hook$cancelConsumption(){
	    cancelConsume();
	    Hook$dispose();
	    Hook$cancelDisposal();
	  }

	  function Hook$cancelDisposal(){
	    cont = noop;
	    rec = noop;
	    rej = noop;
	  }

	  function Hook$consumptionRejected(x){
	    cont = rej;
	    value = x;
	    Hook$dispose();
	  }

	  function Hook$consumptionResolved(x){
	    cont = res;
	    value = x;
	    Hook$dispose();
	  }

	  function Hook$consume(x){
	    resource = x;
	    var consumption;
	    try{
	      consumption = _consume(resource);
	    }catch(e){
	      return Hook$consumptionException(e);
	    }
	    if(!isFuture(consumption)){
	      return Hook$consumptionException(invalidConsumption(consumption, _consume, resource));
	    }
	    cancel = Hook$cancelConsumption;
	    cancelConsume = consumption._interpret(
	      Hook$consumptionException,
	      Hook$consumptionRejected,
	      Hook$consumptionResolved
	    );
	  }

	  var cancelAcquire = _acquire._interpret(rec, Hook$reject, Hook$consume);
	  cancel = cancel || cancelAcquire;

	  return function Hook$fork$cancel(){ cancel(); };

	};

	Hook.prototype.toString = function Hook$toString(){
	  return 'Future.hook('
	       + this._acquire.toString()
	       + ', '
	       + showf(this._dispose)
	       + ', '
	       + showf(this._consume)
	       + ')';
	};

	function hook$acquire$cleanup(acquire, cleanup, consume){
	  if(!isFunction(consume)) throwInvalidArgument('Future.hook', 2, 'be a Future', consume);
	  return new Hook(acquire, cleanup, consume);
	}

	function hook$acquire(acquire, cleanup, consume){
	  if(!isFunction(cleanup)) throwInvalidArgument('Future.hook', 1, 'be a function', cleanup);
	  if(arguments.length === 2) return partial2(hook$acquire$cleanup, acquire, cleanup);
	  return hook$acquire$cleanup(acquire, cleanup, consume);
	}

	function hook(acquire, cleanup, consume){
	  if(!isFuture(acquire)) throwInvalidFuture('Future.hook', 0, acquire);
	  if(arguments.length === 1) return partial1(hook$acquire, acquire);
	  if(arguments.length === 2) return hook$acquire(acquire, cleanup);
	  return hook$acquire(acquire, cleanup, consume);
	}

	function Node(fn){
	  this._fn = fn;
	}

	Node.prototype = Object.create(Future.prototype);

	Node.prototype._interpret = function Node$interpret(rec, rej, res){
	  var open = false, cont = function(){ open = true; };
	  try{
	    this._fn(function Node$done(err, val){
	      cont = err ? function Node$rej(){
	        open = false;
	        rej(err);
	      } : function Node$res(){
	        open = false;
	        res(val);
	      };
	      if(open){
	        cont();
	      }
	    });
	  }catch(e){
	    rec(e);
	    open = false;
	    return noop;
	  }
	  cont();
	  return function Node$cancel(){ open = false; };
	};

	Node.prototype.toString = function Node$toString(){
	  return 'Future.node(' + showf(this._fn) + ')';
	};

	function node(f){
	  if(!isFunction(f)) throwInvalidArgument('Future.node', 0, 'be a function', f);
	  return new Node(f);
	}

	function Parallel(max, futures){
	  this._futures = futures;
	  this._length = futures.length;
	  this._max = Math.min(this._length, max);
	}

	Parallel.prototype = Object.create(Future.prototype);

	Parallel.prototype._interpret = function Parallel$interpret(rec, rej, res){

	  var _futures = this._futures, _length = this._length, _max = this._max;
	  var cancels = new Array(_length), out = new Array(_length);
	  var cursor = 0, running = 0, blocked = false;

	  function Parallel$cancel(){
	    cursor = _length;
	    for(var n = 0; n < _length; n++) cancels[n] && cancels[n]();
	  }

	  function Parallel$run(idx){
	    running++;
	    cancels[idx] = _futures[idx]._interpret(function Parallel$rec(e){
	      cancels[idx] = noop;
	      Parallel$cancel();
	      rec(e);
	    }, function Parallel$rej(reason){
	      cancels[idx] = noop;
	      Parallel$cancel();
	      rej(reason);
	    }, function Parallel$res(value){
	      cancels[idx] = noop;
	      out[idx] = value;
	      running--;
	      if(cursor === _length && running === 0) res(out);
	      else if(blocked) Parallel$drain();
	    });
	  }

	  function Parallel$drain(){
	    blocked = false;
	    while(cursor < _length && running < _max) Parallel$run(cursor++);
	    blocked = true;
	  }

	  Parallel$drain();

	  return Parallel$cancel;

	};

	Parallel.prototype.toString = function Parallel$toString(){
	  return 'Future.parallel(' + this._max + ', ' + sanctuaryShow(this._futures) + ')';
	};

	var emptyArray = new Resolved([]);

	function validateNthFuture(m, i){
	  if(!isFuture(m)) throwInvalidFuture(
	    'Future.parallel',
	    'its second argument to be an array of valid Futures. ' +
	    'The value at position ' + i + ' in the array is not a Future',
	    m
	  );
	}

	function parallel$max(max, xs){
	  if(!isArray(xs)) throwInvalidArgument('Future.parallel', 1, 'be an array', xs);
	  for(var idx = 0; idx < xs.length; idx++) validateNthFuture(xs[idx], idx);
	  return xs.length === 0 ? emptyArray : new Parallel(max, xs);
	}

	function parallel(max, xs){
	  if(!isUnsigned(max)) throwInvalidArgument('Future.parallel', 0, 'be a positive integer', max);
	  if(arguments.length === 1) return partial1(parallel$max, max);
	  return parallel$max(max, xs);
	}

	function invalidPromise$3(p, f){
	  return typeError(
	    'Future.tryP expects the function it\'s given to return a Promise/Thenable'
	    + '\n  Actual: ' + sanctuaryShow(p) + '\n  From calling: ' + showf(f)
	  );
	}

	function TryP(fn){
	  this._fn = fn;
	}

	TryP.prototype = Object.create(Future.prototype);

	TryP.prototype._interpret = function TryP$interpret(rec, rej, res){
	  var open = true, fn = this._fn, p;
	  try{
	    p = fn();
	  }catch(e){
	    rec(e);
	    return noop;
	  }
	  if(!isThenable(p)){
	    rec(invalidPromise$3(p, fn));
	    return noop;
	  }
	  p.then(function TryP$res(x){
	    if(open){
	      open = false;
	      res(x);
	    }
	  }, function TryP$rej(x){
	    if(open){
	      open = false;
	      rej(x);
	    }
	  });
	  return function TryP$cancel(){ open = false; };
	};

	TryP.prototype.toString = function TryP$toString(){
	  return 'Future.tryP(' + sanctuaryShow(this._fn) + ')';
	};

	function tryP(f){
	  if(!isFunction(f)) throwInvalidArgument('Future.tryP', 0, 'be a function', f);
	  return new TryP(f);
	}

	Future.resolve = Future.of = Future[FL.of] = resolve;
	Future.chainRec = Future[FL.chainRec] = chainRec;
	Future.reject = reject;
	Future.ap = ap;
	Future.map = map;
	Future.bimap = bimap;
	Future.chain = chain;

	var Par = concurrify(Future, never, race, function parallelAp(a, b){ return b._parallelAp(a) });
	Par.of = Par[FL.of];
	Par.zero = Par[FL.zero];
	Par.map = map;
	Par.ap = ap;
	Par.alt = alt;

	function isParallel(x){
	  return x instanceof Par || sanctuaryTypeIdentifiers(x) === Par['@@type'];
	}

	function seq(par){
	  if(!isParallel(par)) throwInvalidArgument('Future.seq', 0, 'to be a Par', par);
	  return par.sequential;
	}

	var Fluture = /*#__PURE__*/Object.freeze({
		Future: Future,
		default: Future,
		Par: Par,
		isParallel: isParallel,
		seq: seq,
		isFuture: isFuture,
		reject: reject,
		resolve: resolve,
		of: resolve,
		never: never,
		isNever: isNever,
		after: after,
		rejectAfter: rejectAfter,
		attempt: attempt,
		try: attempt,
		cache: cache,
		encase: encase,
		encase2: encase2,
		encase3: encase3,
		encaseN: encaseN,
		encaseN2: encaseN2,
		encaseN3: encaseN3,
		encaseP: encaseP,
		encaseP2: encaseP2,
		encaseP3: encaseP3,
		go: go,
		do: go,
		hook: hook,
		node: node,
		parallel: parallel,
		tryP: tryP,
		ap: ap,
		alt: alt,
		map: map,
		bimap: bimap,
		chain: chain,
		mapRej: mapRej,
		chainRej: chainRej,
		lastly: lastly,
		finally: lastly,
		and: and,
		both: both,
		or: or,
		race: race,
		swap: swap,
		fold: fold,
		done: done,
		fork: fork,
		forkCatch: forkCatch,
		promise: promise,
		value: value,
		extractLeft: extractLeft,
		extractRight: extractRight
	});

	var index_cjs = Object.assign(Future, Fluture);

	return index_cjs;

}());
