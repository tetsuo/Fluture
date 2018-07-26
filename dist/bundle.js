/**
 * Fluture bundled; version 9.0.0
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
	//. This package specifies an [algorithm][3] for deriving a _type identifier_
	//. from any JavaScript value, and exports an implementation of the algorithm.
	//. Authors of algebraic data types may follow this specification in order to
	//. make their data types compatible with the algorithm.
	//.
	//. ### Algorithm
	//.
	//. 1.  Take any JavaScript value `x`.
	//.
	//. 2.  If `x` is `null` or `undefined`, go to step 6.
	//.
	//. 3.  If `x.constructor` evaluates to `null` or `undefined`, go to step 6.
	//.
	//. 4.  If `x.constructor.prototype === x`, go to step 6. This check prevents a
	//.     prototype object from being considered a member of its associated type.
	//.
	//. 5.  If `typeof x.constructor['@@type']` evaluates to `'string'`, return
	//.     the value of `x.constructor['@@type']`.
	//.
	//. 6.  Return the [`Object.prototype.toString`][2] representation of `x`
	//.     without the leading `'[object '` and trailing `']'`.
	//.
	//. ### Compatibility
	//.
	//. For an algebraic data type to be compatible with the [algorithm][3]:
	//.
	//.   - every member of the type must have a `constructor` property pointing
	//.     to an object known as the _type representative_;
	//.
	//.   - the type representative must have a `@@type` property; and
	//.
	//.   - the type representative's `@@type` property (the _type identifier_)
	//.     must be a string primitive, ideally `'<npm-package-name>/<type-name>'`.
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
	//.
	//. ### Usage
	//.
	//. ```javascript
	//. var Identity = require('my-package').Identity;
	//. var type = require('sanctuary-type-identifiers');
	//.
	//. type(null);         // => 'Null'
	//. type(true);         // => 'Boolean'
	//. type([1, 2, 3]);    // => 'Array'
	//. type(Identity);     // => 'Function'
	//. type(Identity(0));  // => 'my-package/Identity'
	//. ```
	//.
	//.
	//. [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
	//. [2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
	//. [3]: #algorithm

	(function(f) {

	  {
	    module.exports = f();
	  }

	}(function() {

	  //  $$type :: String
	  var $$type = '@@type';

	  //  type :: Any -> String
	  function type(x) {
	    return x != null &&
	           x.constructor != null &&
	           x.constructor.prototype !== x &&
	           typeof x.constructor[$$type] === 'string' ?
	      x.constructor[$$type] :
	      Object.prototype.toString.call(x).slice('[object '.length, -']'.length);
	  }

	  return type;

	}));
	});

	var sanctuaryTypeClasses = createCommonjsModule(function (module) {
	/*
	             ############                  #
	            ############                  ###
	                  #####                  #####
	                #####      ####################
	              #####       ######################
	            #####                     ###########
	          #####         ######################
	        #####          ####################
	      #####                        #####
	     ############                 ###
	    ############                 */

	//. # sanctuary-type-classes
	//.
	//. The [Fantasy Land Specification][FL] "specifies interoperability of common
	//. algebraic structures" by defining a number of type classes. For each type
	//. class, it states laws which every member of a type must obey in order for
	//. the type to be a member of the type class. In order for the Maybe type to
	//. be considered a [Functor][], for example, every `Maybe a` value must have
	//. a `fantasy-land/map` method which obeys the identity and composition laws.
	//.
	//. This project provides:
	//.
	//.   - [`TypeClass`](#TypeClass), a function for defining type classes;
	//.   - one `TypeClass` value for each Fantasy Land type class;
	//.   - lawful Fantasy Land methods for JavaScript's built-in types;
	//.   - one function for each Fantasy Land method; and
	//.   - several functions derived from these functions.
	//.
	//. ## Type-class hierarchy
	//.
	/* eslint-disable max-len */
	//. <pre>
	//.  Setoid   Semigroupoid  Semigroup   Foldable        Functor      Contravariant  Filterable
	//. (equals)    (compose)    (concat)   (reduce)         (map)        (contramap)    (filter)
	//.     |           |           |           \         / | | | | \
	//.     |           |           |            \       /  | | | |  \
	//.     |           |           |             \     /   | | | |   \
	//.     |           |           |              \   /    | | | |    \
	//.     |           |           |               \ /     | | | |     \
	//.    Ord      Category     Monoid         Traversable | | | |      \
	//.   (lte)       (id)       (empty)        (traverse)  / | | \       \
	//.                             |                      /  | |  \       \
	//.                             |                     /   / \   \       \
	//.                             |             Profunctor /   \ Bifunctor \
	//.                             |              (promap) /     \ (bimap)   \
	//.                             |                      /       \           \
	//.                           Group                   /         \           \
	//.                          (invert)               Alt        Apply      Extend
	//.                                                (alt)        (ap)     (extend)
	//.                                                 /           / \           \
	//.                                                /           /   \           \
	//.                                               /           /     \           \
	//.                                              /           /       \           \
	//.                                             /           /         \           \
	//.                                           Plus    Applicative    Chain      Comonad
	//.                                          (zero)       (of)      (chain)    (extract)
	//.                                             \         / \         / \
	//.                                              \       /   \       /   \
	//.                                               \     /     \     /     \
	//.                                                \   /       \   /       \
	//.                                                 \ /         \ /         \
	//.                                             Alternative    Monad     ChainRec
	//.                                                                     (chainRec)
	//. </pre>
	/* eslint-enable max-len */
	//.
	//. ## API

	(function(f) {

	  /* istanbul ignore else */
	  {
	    module.exports = f(sanctuaryTypeIdentifiers);
	  }

	}(function(type) {

	  /* istanbul ignore if */
	  if (typeof __doctest !== 'undefined') {
	    /* global __doctest:false */
	    /* eslint-disable no-unused-vars */
	    var Identity = __doctest.require('./test/Identity');
	    var List = __doctest.require('./test/List');
	    var Maybe = __doctest.require('./test/Maybe');
	    var Sum = __doctest.require('./test/Sum');
	    var Tuple = __doctest.require('./test/Tuple');

	    var Nil = List.Nil, Cons = List.Cons;
	    var Nothing = Maybe.Nothing, Just = Maybe.Just;
	    /* eslint-enable no-unused-vars */
	  }

	  //  concat_ :: Array a -> Array a -> Array a
	  function concat_(xs) {
	    return function(ys) {
	      return xs.concat(ys);
	    };
	  }

	  //  constant :: a -> b -> a
	  function constant(x) {
	    return function(y) {
	      return x;
	    };
	  }

	  //  forEachKey :: (StrMap a, StrMap a ~> String -> Undefined) -> Undefined
	  function forEachKey(strMap, f) {
	    Object.keys(strMap).forEach(f, strMap);
	  }

	  //  has :: (String, Object) -> Boolean
	  function has(k, o) {
	    return Object.prototype.hasOwnProperty.call(o, k);
	  }

	  //  identity :: a -> a
	  function identity(x) { return x; }

	  //  pair :: a -> b -> Array2 a b
	  function pair(x) {
	    return function(y) {
	      return [x, y];
	    };
	  }

	  //  sameType :: (a, b) -> Boolean
	  function sameType(x, y) {
	    return typeof x === typeof y && type(x) === type(y);
	  }

	  //  thrush :: a -> (a -> b) -> b
	  function thrush(x) {
	    return function(f) {
	      return f(x);
	    };
	  }

	  //  type Iteration a = { value :: a, done :: Boolean }

	  //  iterationNext :: a -> Iteration a
	  function iterationNext(x) { return {value: x, done: false}; }

	  //  iterationDone :: a -> Iteration a
	  function iterationDone(x) { return {value: x, done: true}; }

	  //# TypeClass :: (String, String, Array TypeClass, a -> Boolean) -> TypeClass
	  //.
	  //. The arguments are:
	  //.
	  //.   - the name of the type class, prefixed by its npm package name;
	  //.   - the documentation URL of the type class;
	  //.   - an array of dependencies; and
	  //.   - a predicate which accepts any JavaScript value and returns `true`
	  //.     if the value satisfies the requirements of the type class; `false`
	  //.     otherwise.
	  //.
	  //. Example:
	  //.
	  //. ```javascript
	  //. //    hasMethod :: String -> a -> Boolean
	  //. const hasMethod = name => x => x != null && typeof x[name] == 'function';
	  //.
	  //. //    Foo :: TypeClass
	  //. const Foo = Z.TypeClass(
	  //.   'my-package/Foo',
	  //.   'http://example.com/my-package#Foo',
	  //.   [],
	  //.   hasMethod('foo')
	  //. );
	  //.
	  //. //    Bar :: TypeClass
	  //. const Bar = Z.TypeClass(
	  //.   'my-package/Bar',
	  //.   'http://example.com/my-package#Bar',
	  //.   [Foo],
	  //.   hasMethod('bar')
	  //. );
	  //. ```
	  //.
	  //. Types whose values have a `foo` method are members of the Foo type class.
	  //. Members of the Foo type class whose values have a `bar` method are also
	  //. members of the Bar type class.
	  //.
	  //. Each `TypeClass` value has a `test` field: a function which accepts
	  //. any JavaScript value and returns `true` if the value satisfies the
	  //. type class's predicate and the predicates of all the type class's
	  //. dependencies; `false` otherwise.
	  //.
	  //. `TypeClass` values may be used with [sanctuary-def][type-classes]
	  //. to define parametrically polymorphic functions which verify their
	  //. type-class constraints at run time.
	  function TypeClass(name, url, dependencies, test) {
	    if (!(this instanceof TypeClass)) {
	      return new TypeClass(name, url, dependencies, test);
	    }
	    this.name = name;
	    this.url = url;
	    this.test = function(x) {
	      return dependencies.every(function(d) { return d.test(x); }) && test(x);
	    };
	  }

	  TypeClass['@@type'] = 'sanctuary-type-classes/TypeClass';

	  //  data Location = Constructor | Value

	  //  Constructor :: Location
	  var Constructor = 'Constructor';

	  //  Value :: Location
	  var Value = 'Value';

	  //  _funcPath :: (Boolean, Array String, a) -> Nullable Function
	  function _funcPath(allowInheritedProps, path, _x) {
	    var x = _x;
	    for (var idx = 0; idx < path.length; idx += 1) {
	      var k = path[idx];
	      if (x == null || !(allowInheritedProps || has(k, x))) return null;
	      x = x[k];
	    }
	    return typeof x === 'function' ? x : null;
	  }

	  //  funcPath :: (Array String, a) -> Nullable Function
	  function funcPath(path, x) {
	    return _funcPath(true, path, x);
	  }

	  //  implPath :: Array String -> Nullable Function
	  function implPath(path) {
	    return _funcPath(false, path, implementations);
	  }

	  //  functionName :: Function -> String
	  var functionName = has('name', function f() {}) ?
	    function functionName(f) { return f.name; } :
	    /* istanbul ignore next */
	    function functionName(f) {
	      var match = /function (\w*)/.exec(f);
	      return match == null ? '' : match[1];
	    };

	  //  $ :: (String, Array TypeClass, StrMap (Array Location)) -> TypeClass
	  function $(_name, dependencies, requirements) {
	    function getBoundMethod(_name) {
	      var name = 'fantasy-land/' + _name;
	      return requirements[_name] === Constructor ?
	        function(typeRep) {
	          var f = funcPath([name], typeRep);
	          return f == null && typeof typeRep === 'function' ?
	            implPath([functionName(typeRep), name]) :
	            f;
	        } :
	        function(x) {
	          var isPrototype = x != null &&
	                            x.constructor != null &&
	                            x.constructor.prototype === x;
	          var m = null;
	          if (!isPrototype) m = funcPath([name], x);
	          if (m == null)    m = implPath([type(x), 'prototype', name]);
	          return m && m.bind(x);
	        };
	    }

	    var version = '9.0.0';  // updated programmatically
	    var keys = Object.keys(requirements);

	    var typeClass = TypeClass(
	      'sanctuary-type-classes/' + _name,
	      'https://github.com/sanctuary-js/sanctuary-type-classes/tree/v' + version
	        + '#' + _name,
	      dependencies,
	      function(x) {
	        return keys.every(function(_name) {
	          var arg = requirements[_name] === Constructor ? x.constructor : x;
	          return getBoundMethod(_name)(arg) != null;
	        });
	      }
	    );

	    typeClass.methods = keys.reduce(function(methods, _name) {
	      methods[_name] = getBoundMethod(_name);
	      return methods;
	    }, {});

	    return typeClass;
	  }

	  //# Setoid :: TypeClass
	  //.
	  //. `TypeClass` value for [Setoid][].
	  //.
	  //. ```javascript
	  //. > Setoid.test(null)
	  //. true
	  //. ```
	  var Setoid = $('Setoid', [], {equals: Value});

	  //# Ord :: TypeClass
	  //.
	  //. `TypeClass` value for [Ord][].
	  //.
	  //. ```javascript
	  //. > Ord.test(0)
	  //. true
	  //.
	  //. > Ord.test(Math.sqrt)
	  //. false
	  //. ```
	  var Ord = $('Ord', [Setoid], {lte: Value});

	  //# Semigroupoid :: TypeClass
	  //.
	  //. `TypeClass` value for [Semigroupoid][].
	  //.
	  //. ```javascript
	  //. > Semigroupoid.test(Math.sqrt)
	  //. true
	  //.
	  //. > Semigroupoid.test(0)
	  //. false
	  //. ```
	  var Semigroupoid = $('Semigroupoid', [], {compose: Value});

	  //# Category :: TypeClass
	  //.
	  //. `TypeClass` value for [Category][].
	  //.
	  //. ```javascript
	  //. > Category.test(Math.sqrt)
	  //. true
	  //.
	  //. > Category.test(0)
	  //. false
	  //. ```
	  var Category = $('Category', [Semigroupoid], {id: Constructor});

	  //# Semigroup :: TypeClass
	  //.
	  //. `TypeClass` value for [Semigroup][].
	  //.
	  //. ```javascript
	  //. > Semigroup.test('')
	  //. true
	  //.
	  //. > Semigroup.test(0)
	  //. false
	  //. ```
	  var Semigroup = $('Semigroup', [], {concat: Value});

	  //# Monoid :: TypeClass
	  //.
	  //. `TypeClass` value for [Monoid][].
	  //.
	  //. ```javascript
	  //. > Monoid.test('')
	  //. true
	  //.
	  //. > Monoid.test(0)
	  //. false
	  //. ```
	  var Monoid = $('Monoid', [Semigroup], {empty: Constructor});

	  //# Group :: TypeClass
	  //.
	  //. `TypeClass` value for [Group][].
	  //.
	  //. ```javascript
	  //. > Group.test(Sum(0))
	  //. true
	  //.
	  //. > Group.test('')
	  //. false
	  //. ```
	  var Group = $('Group', [Monoid], {invert: Value});

	  //# Filterable :: TypeClass
	  //.
	  //. `TypeClass` value for [Filterable][].
	  //.
	  //. ```javascript
	  //. > Filterable.test({})
	  //. true
	  //.
	  //. > Filterable.test('')
	  //. false
	  //. ```
	  var Filterable = $('Filterable', [], {filter: Value});

	  //# Functor :: TypeClass
	  //.
	  //. `TypeClass` value for [Functor][].
	  //.
	  //. ```javascript
	  //. > Functor.test([])
	  //. true
	  //.
	  //. > Functor.test('')
	  //. false
	  //. ```
	  var Functor = $('Functor', [], {map: Value});

	  //# Bifunctor :: TypeClass
	  //.
	  //. `TypeClass` value for [Bifunctor][].
	  //.
	  //. ```javascript
	  //. > Bifunctor.test(Tuple('foo', 64))
	  //. true
	  //.
	  //. > Bifunctor.test([])
	  //. false
	  //. ```
	  var Bifunctor = $('Bifunctor', [Functor], {bimap: Value});

	  //# Profunctor :: TypeClass
	  //.
	  //. `TypeClass` value for [Profunctor][].
	  //.
	  //. ```javascript
	  //. > Profunctor.test(Math.sqrt)
	  //. true
	  //.
	  //. > Profunctor.test([])
	  //. false
	  //. ```
	  var Profunctor = $('Profunctor', [Functor], {promap: Value});

	  //# Apply :: TypeClass
	  //.
	  //. `TypeClass` value for [Apply][].
	  //.
	  //. ```javascript
	  //. > Apply.test([])
	  //. true
	  //.
	  //. > Apply.test('')
	  //. false
	  //. ```
	  var Apply = $('Apply', [Functor], {ap: Value});

	  //# Applicative :: TypeClass
	  //.
	  //. `TypeClass` value for [Applicative][].
	  //.
	  //. ```javascript
	  //. > Applicative.test([])
	  //. true
	  //.
	  //. > Applicative.test({})
	  //. false
	  //. ```
	  var Applicative = $('Applicative', [Apply], {of: Constructor});

	  //# Chain :: TypeClass
	  //.
	  //. `TypeClass` value for [Chain][].
	  //.
	  //. ```javascript
	  //. > Chain.test([])
	  //. true
	  //.
	  //. > Chain.test({})
	  //. false
	  //. ```
	  var Chain = $('Chain', [Apply], {chain: Value});

	  //# ChainRec :: TypeClass
	  //.
	  //. `TypeClass` value for [ChainRec][].
	  //.
	  //. ```javascript
	  //. > ChainRec.test([])
	  //. true
	  //.
	  //. > ChainRec.test({})
	  //. false
	  //. ```
	  var ChainRec = $('ChainRec', [Chain], {chainRec: Constructor});

	  //# Monad :: TypeClass
	  //.
	  //. `TypeClass` value for [Monad][].
	  //.
	  //. ```javascript
	  //. > Monad.test([])
	  //. true
	  //.
	  //. > Monad.test({})
	  //. false
	  //. ```
	  var Monad = $('Monad', [Applicative, Chain], {});

	  //# Alt :: TypeClass
	  //.
	  //. `TypeClass` value for [Alt][].
	  //.
	  //. ```javascript
	  //. > Alt.test({})
	  //. true
	  //.
	  //. > Alt.test('')
	  //. false
	  //. ```
	  var Alt = $('Alt', [Functor], {alt: Value});

	  //# Plus :: TypeClass
	  //.
	  //. `TypeClass` value for [Plus][].
	  //.
	  //. ```javascript
	  //. > Plus.test({})
	  //. true
	  //.
	  //. > Plus.test('')
	  //. false
	  //. ```
	  var Plus = $('Plus', [Alt], {zero: Constructor});

	  //# Alternative :: TypeClass
	  //.
	  //. `TypeClass` value for [Alternative][].
	  //.
	  //. ```javascript
	  //. > Alternative.test([])
	  //. true
	  //.
	  //. > Alternative.test({})
	  //. false
	  //. ```
	  var Alternative = $('Alternative', [Applicative, Plus], {});

	  //# Foldable :: TypeClass
	  //.
	  //. `TypeClass` value for [Foldable][].
	  //.
	  //. ```javascript
	  //. > Foldable.test({})
	  //. true
	  //.
	  //. > Foldable.test('')
	  //. false
	  //. ```
	  var Foldable = $('Foldable', [], {reduce: Value});

	  //# Traversable :: TypeClass
	  //.
	  //. `TypeClass` value for [Traversable][].
	  //.
	  //. ```javascript
	  //. > Traversable.test([])
	  //. true
	  //.
	  //. > Traversable.test('')
	  //. false
	  //. ```
	  var Traversable = $('Traversable', [Functor, Foldable], {traverse: Value});

	  //# Extend :: TypeClass
	  //.
	  //. `TypeClass` value for [Extend][].
	  //.
	  //. ```javascript
	  //. > Extend.test([])
	  //. true
	  //.
	  //. > Extend.test({})
	  //. false
	  //. ```
	  var Extend = $('Extend', [Functor], {extend: Value});

	  //# Comonad :: TypeClass
	  //.
	  //. `TypeClass` value for [Comonad][].
	  //.
	  //. ```javascript
	  //. > Comonad.test(Identity(0))
	  //. true
	  //.
	  //. > Comonad.test([])
	  //. false
	  //. ```
	  var Comonad = $('Comonad', [Extend], {extract: Value});

	  //# Contravariant :: TypeClass
	  //.
	  //. `TypeClass` value for [Contravariant][].
	  //.
	  //. ```javascript
	  //. > Contravariant.test(Math.sqrt)
	  //. true
	  //.
	  //. > Contravariant.test([])
	  //. false
	  //. ```
	  var Contravariant = $('Contravariant', [], {contramap: Value});

	  //  Null$prototype$equals :: Null ~> Null -> Boolean
	  function Null$prototype$equals(other) {
	    return true;
	  }

	  //  Null$prototype$lte :: Null ~> Null -> Boolean
	  function Null$prototype$lte(other) {
	    return true;
	  }

	  //  Undefined$prototype$equals :: Undefined ~> Undefined -> Boolean
	  function Undefined$prototype$equals(other) {
	    return true;
	  }

	  //  Undefined$prototype$lte :: Undefined ~> Undefined -> Boolean
	  function Undefined$prototype$lte(other) {
	    return true;
	  }

	  //  Boolean$prototype$equals :: Boolean ~> Boolean -> Boolean
	  function Boolean$prototype$equals(other) {
	    return typeof this === 'object' ?
	      equals(this.valueOf(), other.valueOf()) :
	      this === other;
	  }

	  //  Boolean$prototype$lte :: Boolean ~> Boolean -> Boolean
	  function Boolean$prototype$lte(other) {
	    return typeof this === 'object' ?
	      lte(this.valueOf(), other.valueOf()) :
	      this === false || other === true;
	  }

	  //  Number$prototype$equals :: Number ~> Number -> Boolean
	  function Number$prototype$equals(other) {
	    return typeof this === 'object' ?
	      equals(this.valueOf(), other.valueOf()) :
	      isNaN(this) && isNaN(other) || this === other;
	  }

	  //  Number$prototype$lte :: Number ~> Number -> Boolean
	  function Number$prototype$lte(other) {
	    return typeof this === 'object' ?
	      lte(this.valueOf(), other.valueOf()) :
	      isNaN(this) || this <= other;
	  }

	  //  Date$prototype$equals :: Date ~> Date -> Boolean
	  function Date$prototype$equals(other) {
	    return equals(this.valueOf(), other.valueOf());
	  }

	  //  Date$prototype$lte :: Date ~> Date -> Boolean
	  function Date$prototype$lte(other) {
	    return lte(this.valueOf(), other.valueOf());
	  }

	  //  RegExp$prototype$equals :: RegExp ~> RegExp -> Boolean
	  function RegExp$prototype$equals(other) {
	    return other.source === this.source &&
	           other.global === this.global &&
	           other.ignoreCase === this.ignoreCase &&
	           other.multiline === this.multiline &&
	           other.sticky === this.sticky &&
	           other.unicode === this.unicode;
	  }

	  //  String$empty :: () -> String
	  function String$empty() {
	    return '';
	  }

	  //  String$prototype$equals :: String ~> String -> Boolean
	  function String$prototype$equals(other) {
	    return typeof this === 'object' ?
	      equals(this.valueOf(), other.valueOf()) :
	      this === other;
	  }

	  //  String$prototype$lte :: String ~> String -> Boolean
	  function String$prototype$lte(other) {
	    return typeof this === 'object' ?
	      lte(this.valueOf(), other.valueOf()) :
	      this <= other;
	  }

	  //  String$prototype$concat :: String ~> String -> String
	  function String$prototype$concat(other) {
	    return this + other;
	  }

	  //  Array$empty :: () -> Array a
	  function Array$empty() {
	    return [];
	  }

	  //  Array$of :: a -> Array a
	  function Array$of(x) {
	    return [x];
	  }

	  //  Array$chainRec :: ((a -> c, b -> c, a) -> Array c, a) -> Array b
	  function Array$chainRec(f, x) {
	    var result = [];
	    var nil = {};
	    var todo = {head: x, tail: nil};
	    while (todo !== nil) {
	      var more = nil;
	      var steps = f(iterationNext, iterationDone, todo.head);
	      for (var idx = 0; idx < steps.length; idx += 1) {
	        var step = steps[idx];
	        if (step.done) {
	          result.push(step.value);
	        } else {
	          more = {head: step.value, tail: more};
	        }
	      }
	      todo = todo.tail;
	      while (more !== nil) {
	        todo = {head: more.head, tail: todo};
	        more = more.tail;
	      }
	    }
	    return result;
	  }

	  //  Array$zero :: () -> Array a
	  function Array$zero() {
	    return [];
	  }

	  //  Array$prototype$equals :: Array a ~> Array a -> Boolean
	  function Array$prototype$equals(other) {
	    if (other.length !== this.length) return false;
	    for (var idx = 0; idx < this.length; idx += 1) {
	      if (!equals(this[idx], other[idx])) return false;
	    }
	    return true;
	  }

	  //  Array$prototype$lte :: Array a ~> Array a -> Boolean
	  function Array$prototype$lte(other) {
	    for (var idx = 0; true; idx += 1) {
	      if (idx === this.length) return true;
	      if (idx === other.length) return false;
	      if (!equals(this[idx], other[idx])) return lte(this[idx], other[idx]);
	    }
	  }

	  //  Array$prototype$concat :: Array a ~> Array a -> Array a
	  function Array$prototype$concat(other) {
	    return this.concat(other);
	  }

	  //  Array$prototype$filter :: Array a ~> (a -> Boolean) -> Array a
	  function Array$prototype$filter(pred) {
	    return this.filter(function(x) { return pred(x); });
	  }

	  //  Array$prototype$map :: Array a ~> (a -> b) -> Array b
	  function Array$prototype$map(f) {
	    return this.map(function(x) { return f(x); });
	  }

	  //  Array$prototype$ap :: Array a ~> Array (a -> b) -> Array b
	  function Array$prototype$ap(fs) {
	    var result = [];
	    for (var idx = 0; idx < fs.length; idx += 1) {
	      for (var idx2 = 0; idx2 < this.length; idx2 += 1) {
	        result.push(fs[idx](this[idx2]));
	      }
	    }
	    return result;
	  }

	  //  Array$prototype$chain :: Array a ~> (a -> Array b) -> Array b
	  function Array$prototype$chain(f) {
	    var result = [];
	    for (var idx = 0; idx < this.length; idx += 1) {
	      for (var idx2 = 0, xs = f(this[idx]); idx2 < xs.length; idx2 += 1) {
	        result.push(xs[idx2]);
	      }
	    }
	    return result;
	  }

	  //  Array$prototype$alt :: Array a ~> Array a -> Array a
	  var Array$prototype$alt = Array$prototype$concat;

	  //  Array$prototype$reduce :: Array a ~> ((b, a) -> b, b) -> b
	  function Array$prototype$reduce(f, initial) {
	    var acc = initial;
	    for (var idx = 0; idx < this.length; idx += 1) acc = f(acc, this[idx]);
	    return acc;
	  }

	  //  Array$prototype$traverse :: Applicative f => Array a ~> (TypeRep f, a -> f b) -> f (Array b)
	  function Array$prototype$traverse(typeRep, f) {
	    var xs = this;
	    function go(idx, n) {
	      switch (n) {
	        case 0: return of(typeRep, []);
	        case 2: return lift2(pair, f(xs[idx]), f(xs[idx + 1]));
	        default:
	          var m = Math.floor(n / 4) * 2;
	          return lift2(concat_, go(idx, m), go(idx + m, n - m));
	      }
	    }
	    return this.length % 2 === 1 ?
	      lift2(concat_, map(Array$of, f(this[0])), go(1, this.length - 1)) :
	      go(0, this.length);
	  }

	  //  Array$prototype$extend :: Array a ~> (Array a -> b) -> Array b
	  function Array$prototype$extend(f) {
	    return this.map(function(_, idx, xs) { return f(xs.slice(idx)); });
	  }

	  //  Arguments$prototype$equals :: Arguments ~> Arguments -> Boolean
	  function Arguments$prototype$equals(other) {
	    return Array$prototype$equals.call(this, other);
	  }

	  //  Arguments$prototype$lte :: Arguments ~> Arguments -> Boolean
	  function Arguments$prototype$lte(other) {
	    return Array$prototype$lte.call(this, other);
	  }

	  //  Error$prototype$equals :: Error ~> Error -> Boolean
	  function Error$prototype$equals(other) {
	    return equals(this.name, other.name) &&
	           equals(this.message, other.message);
	  }

	  //  Object$empty :: () -> StrMap a
	  function Object$empty() {
	    return {};
	  }

	  //  Object$zero :: () -> StrMap a
	  function Object$zero() {
	    return {};
	  }

	  //  Object$prototype$equals :: StrMap a ~> StrMap a -> Boolean
	  function Object$prototype$equals(other) {
	    var self = this;
	    var keys = Object.keys(this).sort();
	    return equals(keys, Object.keys(other).sort()) &&
	           keys.every(function(k) { return equals(self[k], other[k]); });
	  }

	  //  Object$prototype$lte :: StrMap a ~> StrMap a -> Boolean
	  function Object$prototype$lte(other) {
	    var theseKeys = Object.keys(this).sort();
	    var otherKeys = Object.keys(other).sort();
	    while (true) {
	      if (theseKeys.length === 0) return true;
	      if (otherKeys.length === 0) return false;
	      var k = theseKeys.shift();
	      var z = otherKeys.shift();
	      if (k < z) return true;
	      if (k > z) return false;
	      if (!equals(this[k], other[k])) return lte(this[k], other[k]);
	    }
	  }

	  //  Object$prototype$concat :: StrMap a ~> StrMap a -> StrMap a
	  function Object$prototype$concat(other) {
	    var result = {};
	    function assign(k) { result[k] = this[k]; }
	    forEachKey(this, assign);
	    forEachKey(other, assign);
	    return result;
	  }

	  //  Object$prototype$filter :: StrMap a ~> (a -> Boolean) -> StrMap a
	  function Object$prototype$filter(pred) {
	    var result = {};
	    forEachKey(this, function(k) { if (pred(this[k])) result[k] = this[k]; });
	    return result;
	  }

	  //  Object$prototype$map :: StrMap a ~> (a -> b) -> StrMap b
	  function Object$prototype$map(f) {
	    var result = {};
	    forEachKey(this, function(k) { result[k] = f(this[k]); });
	    return result;
	  }

	  //  Object$prototype$ap :: StrMap a ~> StrMap (a -> b) -> StrMap b
	  function Object$prototype$ap(other) {
	    var result = {};
	    forEachKey(this, function(k) {
	      if (has(k, other)) result[k] = other[k](this[k]);
	    });
	    return result;
	  }

	  //  Object$prototype$alt :: StrMap a ~> StrMap a -> StrMap a
	  var Object$prototype$alt = Object$prototype$concat;

	  //  Object$prototype$reduce :: StrMap a ~> ((b, a) -> b, b) -> b
	  function Object$prototype$reduce(f, initial) {
	    var self = this;
	    function reducer(acc, k) { return f(acc, self[k]); }
	    return Object.keys(this).sort().reduce(reducer, initial);
	  }

	  //  Object$prototype$traverse :: Applicative f => StrMap a ~> (TypeRep f, a -> f b) -> f (StrMap b)
	  function Object$prototype$traverse(typeRep, f) {
	    var self = this;
	    return Object.keys(this).reduce(function(applicative, k) {
	      function set(o) {
	        return function(v) {
	          var singleton = {}; singleton[k] = v;
	          return Object$prototype$concat.call(o, singleton);
	        };
	      }
	      return lift2(set, applicative, f(self[k]));
	    }, of(typeRep, {}));
	  }

	  //  Function$id :: () -> a -> a
	  function Function$id() {
	    return identity;
	  }

	  //  Function$of :: b -> (a -> b)
	  function Function$of(x) {
	    return function(_) { return x; };
	  }

	  //  Function$chainRec :: ((a -> c, b -> c, a) -> (z -> c), a) -> (z -> b)
	  function Function$chainRec(f, x) {
	    return function(a) {
	      var step = iterationNext(x);
	      while (!step.done) {
	        step = f(iterationNext, iterationDone, step.value)(a);
	      }
	      return step.value;
	    };
	  }

	  //  Function$prototype$equals :: Function ~> Function -> Boolean
	  function Function$prototype$equals(other) {
	    return other === this;
	  }

	  //  Function$prototype$compose :: (a -> b) ~> (b -> c) -> (a -> c)
	  function Function$prototype$compose(other) {
	    var semigroupoid = this;
	    return function(x) { return other(semigroupoid(x)); };
	  }

	  //  Function$prototype$map :: (a -> b) ~> (b -> c) -> (a -> c)
	  function Function$prototype$map(f) {
	    var functor = this;
	    return function(x) { return f(functor(x)); };
	  }

	  //  Function$prototype$promap :: (b -> c) ~> (a -> b, c -> d) -> (a -> d)
	  function Function$prototype$promap(f, g) {
	    var profunctor = this;
	    return function(x) { return g(profunctor(f(x))); };
	  }

	  //  Function$prototype$ap :: (a -> b) ~> (a -> b -> c) -> (a -> c)
	  function Function$prototype$ap(f) {
	    var apply = this;
	    return function(x) { return f(x)(apply(x)); };
	  }

	  //  Function$prototype$chain :: (a -> b) ~> (b -> a -> c) -> (a -> c)
	  function Function$prototype$chain(f) {
	    var chain = this;
	    return function(x) { return f(chain(x))(x); };
	  }

	  //  Function$prototype$extend :: Semigroup a => (a -> b) ~> ((a -> b) -> c) -> (a -> c)
	  function Function$prototype$extend(f) {
	    var extend = this;
	    return function(x) {
	      return f(function(y) { return extend(concat(x, y)); });
	    };
	  }

	  //  Function$prototype$contramap :: (b -> c) ~> (a -> b) -> (a -> c)
	  function Function$prototype$contramap(f) {
	    var contravariant = this;
	    return function(x) { return contravariant(f(x)); };
	  }

	  /* eslint-disable key-spacing */
	  var implementations = {
	    Null: {
	      'prototype': {
	        'fantasy-land/equals':      Null$prototype$equals,
	        'fantasy-land/lte':         Null$prototype$lte
	      }
	    },
	    Undefined: {
	      'prototype': {
	        'fantasy-land/equals':      Undefined$prototype$equals,
	        'fantasy-land/lte':         Undefined$prototype$lte
	      }
	    },
	    Boolean: {
	      'prototype': {
	        'fantasy-land/equals':      Boolean$prototype$equals,
	        'fantasy-land/lte':         Boolean$prototype$lte
	      }
	    },
	    Number: {
	      'prototype': {
	        'fantasy-land/equals':      Number$prototype$equals,
	        'fantasy-land/lte':         Number$prototype$lte
	      }
	    },
	    Date: {
	      'prototype': {
	        'fantasy-land/equals':      Date$prototype$equals,
	        'fantasy-land/lte':         Date$prototype$lte
	      }
	    },
	    RegExp: {
	      'prototype': {
	        'fantasy-land/equals':      RegExp$prototype$equals
	      }
	    },
	    String: {
	      'fantasy-land/empty':         String$empty,
	      'prototype': {
	        'fantasy-land/equals':      String$prototype$equals,
	        'fantasy-land/lte':         String$prototype$lte,
	        'fantasy-land/concat':      String$prototype$concat
	      }
	    },
	    Array: {
	      'fantasy-land/empty':         Array$empty,
	      'fantasy-land/of':            Array$of,
	      'fantasy-land/chainRec':      Array$chainRec,
	      'fantasy-land/zero':          Array$zero,
	      'prototype': {
	        'fantasy-land/equals':      Array$prototype$equals,
	        'fantasy-land/lte':         Array$prototype$lte,
	        'fantasy-land/concat':      Array$prototype$concat,
	        'fantasy-land/filter':      Array$prototype$filter,
	        'fantasy-land/map':         Array$prototype$map,
	        'fantasy-land/ap':          Array$prototype$ap,
	        'fantasy-land/chain':       Array$prototype$chain,
	        'fantasy-land/alt':         Array$prototype$alt,
	        'fantasy-land/reduce':      Array$prototype$reduce,
	        'fantasy-land/traverse':    Array$prototype$traverse,
	        'fantasy-land/extend':      Array$prototype$extend
	      }
	    },
	    Arguments: {
	      'prototype': {
	        'fantasy-land/equals':      Arguments$prototype$equals,
	        'fantasy-land/lte':         Arguments$prototype$lte
	      }
	    },
	    Error: {
	      'prototype': {
	        'fantasy-land/equals':      Error$prototype$equals
	      }
	    },
	    Object: {
	      'fantasy-land/empty':         Object$empty,
	      'fantasy-land/zero':          Object$zero,
	      'prototype': {
	        'fantasy-land/equals':      Object$prototype$equals,
	        'fantasy-land/lte':         Object$prototype$lte,
	        'fantasy-land/concat':      Object$prototype$concat,
	        'fantasy-land/filter':      Object$prototype$filter,
	        'fantasy-land/map':         Object$prototype$map,
	        'fantasy-land/ap':          Object$prototype$ap,
	        'fantasy-land/alt':         Object$prototype$alt,
	        'fantasy-land/reduce':      Object$prototype$reduce,
	        'fantasy-land/traverse':    Object$prototype$traverse
	      }
	    },
	    Function: {
	      'fantasy-land/id':            Function$id,
	      'fantasy-land/of':            Function$of,
	      'fantasy-land/chainRec':      Function$chainRec,
	      'prototype': {
	        'fantasy-land/equals':      Function$prototype$equals,
	        'fantasy-land/compose':     Function$prototype$compose,
	        'fantasy-land/map':         Function$prototype$map,
	        'fantasy-land/promap':      Function$prototype$promap,
	        'fantasy-land/ap':          Function$prototype$ap,
	        'fantasy-land/chain':       Function$prototype$chain,
	        'fantasy-land/extend':      Function$prototype$extend,
	        'fantasy-land/contramap':   Function$prototype$contramap
	      }
	    }
	  };
	  /* eslint-enable key-spacing */

	  //# equals :: (a, b) -> Boolean
	  //.
	  //. Returns `true` if its arguments are of the same type and equal according
	  //. to the type's [`fantasy-land/equals`][] method; `false` otherwise.
	  //.
	  //. `fantasy-land/equals` implementations are provided for the following
	  //. built-in types: Null, Undefined, Boolean, Number, Date, RegExp, String,
	  //. Array, Arguments, Error, Object, and Function.
	  //.
	  //. The algorithm supports circular data structures. Two arrays are equal
	  //. if they have the same index paths and for each path have equal values.
	  //. Two arrays which represent `[1, [1, [1, [1, [1, ...]]]]]`, for example,
	  //. are equal even if their internal structures differ. Two objects are equal
	  //. if they have the same property paths and for each path have equal values.
	  //.
	  //. ```javascript
	  //. > equals(0, -0)
	  //. true
	  //.
	  //. > equals(NaN, NaN)
	  //. true
	  //.
	  //. > equals(Cons('foo', Cons('bar', Nil)), Cons('foo', Cons('bar', Nil)))
	  //. true
	  //.
	  //. > equals(Cons('foo', Cons('bar', Nil)), Cons('bar', Cons('foo', Nil)))
	  //. false
	  //. ```
	  var equals = (function() {
	    //  $pairs :: Array (Array2 Any Any)
	    var $pairs = [];

	    return function equals(x, y) {
	      if (!sameType(x, y)) return false;

	      //  This algorithm for comparing circular data structures was
	      //  suggested in <http://stackoverflow.com/a/40622794/312785>.
	      if ($pairs.some(function(p) { return p[0] === x && p[1] === y; })) {
	        return true;
	      }

	      $pairs.push([x, y]);
	      try {
	        return Setoid.test(x) && Setoid.test(y) && Setoid.methods.equals(x)(y);
	      } finally {
	        $pairs.pop();
	      }
	    };
	  }());

	  //# lt :: (a, b) -> Boolean
	  //.
	  //. Returns `true` if its arguments are of the same type and the first is
	  //. less than the second according to the type's [`fantasy-land/lte`][]
	  //. method; `false` otherwise.
	  //.
	  //. This function is derived from [`lte`](#lte).
	  //.
	  //. See also [`gt`](#gt) and [`gte`](#gte).
	  //.
	  //. ```javascript
	  //. > lt(0, 0)
	  //. false
	  //.
	  //. > lt(0, 1)
	  //. true
	  //.
	  //. > lt(1, 0)
	  //. false
	  //. ```
	  function lt(x, y) {
	    return sameType(x, y) && !lte(y, x);
	  }

	  //# lte :: (a, b) -> Boolean
	  //.
	  //. Returns `true` if its arguments are of the same type and the first
	  //. is less than or equal to the second according to the type's
	  //. [`fantasy-land/lte`][] method; `false` otherwise.
	  //.
	  //. `fantasy-land/lte` implementations are provided for the following
	  //. built-in types: Null, Undefined, Boolean, Number, Date, String, Array,
	  //. Arguments, and Object.
	  //.
	  //. The algorithm supports circular data structures in the same manner as
	  //. [`equals`](#equals).
	  //.
	  //. See also [`lt`](#lt), [`gt`](#gt), and [`gte`](#gte).
	  //.
	  //. ```javascript
	  //. > lte(0, 0)
	  //. true
	  //.
	  //. > lte(0, 1)
	  //. true
	  //.
	  //. > lte(1, 0)
	  //. false
	  //. ```
	  var lte = (function() {
	    //  $pairs :: Array (Array2 Any Any)
	    var $pairs = [];

	    return function lte(x, y) {
	      if (!sameType(x, y)) return false;

	      //  This algorithm for comparing circular data structures was
	      //  suggested in <http://stackoverflow.com/a/40622794/312785>.
	      if ($pairs.some(function(p) { return p[0] === x && p[1] === y; })) {
	        return equals(x, y);
	      }

	      $pairs.push([x, y]);
	      try {
	        return Ord.test(x) && Ord.test(y) && Ord.methods.lte(x)(y);
	      } finally {
	        $pairs.pop();
	      }
	    };
	  }());

	  //# gt :: (a, b) -> Boolean
	  //.
	  //. Returns `true` if its arguments are of the same type and the first is
	  //. greater than the second according to the type's [`fantasy-land/lte`][]
	  //. method; `false` otherwise.
	  //.
	  //. This function is derived from [`lte`](#lte).
	  //.
	  //. See also [`lt`](#lt) and [`gte`](#gte).
	  //.
	  //. ```javascript
	  //. > gt(0, 0)
	  //. false
	  //.
	  //. > gt(0, 1)
	  //. false
	  //.
	  //. > gt(1, 0)
	  //. true
	  //. ```
	  function gt(x, y) {
	    return lt(y, x);
	  }

	  //# gte :: (a, b) -> Boolean
	  //.
	  //. Returns `true` if its arguments are of the same type and the first
	  //. is greater than or equal to the second according to the type's
	  //. [`fantasy-land/lte`][] method; `false` otherwise.
	  //.
	  //. This function is derived from [`lte`](#lte).
	  //.
	  //. See also [`lt`](#lt) and [`gt`](#gt).
	  //.
	  //. ```javascript
	  //. > gte(0, 0)
	  //. true
	  //.
	  //. > gte(0, 1)
	  //. false
	  //.
	  //. > gte(1, 0)
	  //. true
	  //. ```
	  function gte(x, y) {
	    return lte(y, x);
	  }

	  //# min :: Ord a => (a, a) -> a
	  //.
	  //. Returns the smaller of its two arguments.
	  //.
	  //. This function is derived from [`lte`](#lte).
	  //.
	  //. See also [`max`](#max).
	  //.
	  //. ```javascript
	  //. > min(10, 2)
	  //. 2
	  //.
	  //. > min(new Date('1999-12-31'), new Date('2000-01-01'))
	  //. new Date('1999-12-31')
	  //.
	  //. > min('10', '2')
	  //. '10'
	  //. ```
	  function min(x, y) {
	    return lte(x, y) ? x : y;
	  }

	  //# max :: Ord a => (a, a) -> a
	  //.
	  //. Returns the larger of its two arguments.
	  //.
	  //. This function is derived from [`lte`](#lte).
	  //.
	  //. See also [`min`](#min).
	  //.
	  //. ```javascript
	  //. > max(10, 2)
	  //. 10
	  //.
	  //. > max(new Date('1999-12-31'), new Date('2000-01-01'))
	  //. new Date('2000-01-01')
	  //.
	  //. > max('10', '2')
	  //. '2'
	  //. ```
	  function max(x, y) {
	    return lte(x, y) ? y : x;
	  }

	  //# compose :: Semigroupoid c => (c j k, c i j) -> c i k
	  //.
	  //. Function wrapper for [`fantasy-land/compose`][].
	  //.
	  //. `fantasy-land/compose` implementations are provided for the following
	  //. built-in types: Function.
	  //.
	  //. ```javascript
	  //. > compose(Math.sqrt, x => x + 1)(99)
	  //. 10
	  //. ```
	  function compose(x, y) {
	    return Semigroupoid.methods.compose(y)(x);
	  }

	  //# id :: Category c => TypeRep c -> c
	  //.
	  //. Function wrapper for [`fantasy-land/id`][].
	  //.
	  //. `fantasy-land/id` implementations are provided for the following
	  //. built-in types: Function.
	  //.
	  //. ```javascript
	  //. > id(Function)('foo')
	  //. 'foo'
	  //. ```
	  function id(typeRep) {
	    return Category.methods.id(typeRep)();
	  }

	  //# concat :: Semigroup a => (a, a) -> a
	  //.
	  //. Function wrapper for [`fantasy-land/concat`][].
	  //.
	  //. `fantasy-land/concat` implementations are provided for the following
	  //. built-in types: String, Array, and Object.
	  //.
	  //. ```javascript
	  //. > concat('abc', 'def')
	  //. 'abcdef'
	  //.
	  //. > concat([1, 2, 3], [4, 5, 6])
	  //. [1, 2, 3, 4, 5, 6]
	  //.
	  //. > concat({x: 1, y: 2}, {y: 3, z: 4})
	  //. {x: 1, y: 3, z: 4}
	  //.
	  //. > concat(Cons('foo', Cons('bar', Cons('baz', Nil))), Cons('quux', Nil))
	  //. Cons('foo', Cons('bar', Cons('baz', Cons('quux', Nil))))
	  //. ```
	  function concat(x, y) {
	    return Semigroup.methods.concat(x)(y);
	  }

	  //# empty :: Monoid m => TypeRep m -> m
	  //.
	  //. Function wrapper for [`fantasy-land/empty`][].
	  //.
	  //. `fantasy-land/empty` implementations are provided for the following
	  //. built-in types: String, Array, and Object.
	  //.
	  //. ```javascript
	  //. > empty(String)
	  //. ''
	  //.
	  //. > empty(Array)
	  //. []
	  //.
	  //. > empty(Object)
	  //. {}
	  //.
	  //. > empty(List)
	  //. Nil
	  //. ```
	  function empty(typeRep) {
	    return Monoid.methods.empty(typeRep)();
	  }

	  //# invert :: Group g => g -> g
	  //.
	  //. Function wrapper for [`fantasy-land/invert`][].
	  //.
	  //. ```javascript
	  //. > invert(Sum(5))
	  //. Sum(-5)
	  //. ```
	  function invert(group) {
	    return Group.methods.invert(group)();
	  }

	  //# filter :: Filterable f => (a -> Boolean, f a) -> f a
	  //.
	  //. Function wrapper for [`fantasy-land/filter`][]. Discards every element
	  //. which does not satisfy the predicate.
	  //.
	  //. `fantasy-land/filter` implementations are provided for the following
	  //. built-in types: Array and Object.
	  //.
	  //. See also [`reject`](#reject).
	  //.
	  //. ```javascript
	  //. > filter(x => x % 2 == 1, [1, 2, 3])
	  //. [1, 3]
	  //.
	  //. > filter(x => x % 2 == 1, {x: 1, y: 2, z: 3})
	  //. {x: 1, z: 3}
	  //.
	  //. > filter(x => x % 2 == 1, Cons(1, Cons(2, Cons(3, Nil))))
	  //. Cons(1, Cons(3, Nil))
	  //.
	  //. > filter(x => x % 2 == 1, Nothing)
	  //. Nothing
	  //.
	  //. > filter(x => x % 2 == 1, Just(0))
	  //. Nothing
	  //.
	  //. > filter(x => x % 2 == 1, Just(1))
	  //. Just(1)
	  //. ```
	  function filter(pred, filterable) {
	    return Filterable.methods.filter(filterable)(pred);
	  }

	  //# reject :: Filterable f => (a -> Boolean, f a) -> f a
	  //.
	  //. Discards every element which satisfies the predicate.
	  //.
	  //. This function is derived from [`filter`](#filter).
	  //.
	  //. ```javascript
	  //. > reject(x => x % 2 == 1, [1, 2, 3])
	  //. [2]
	  //.
	  //. > reject(x => x % 2 == 1, {x: 1, y: 2, z: 3})
	  //. {y: 2}
	  //.
	  //. > reject(x => x % 2 == 1, Cons(1, Cons(2, Cons(3, Nil))))
	  //. Cons(2, Nil)
	  //.
	  //. > reject(x => x % 2 == 1, Nothing)
	  //. Nothing
	  //.
	  //. > reject(x => x % 2 == 1, Just(0))
	  //. Just(0)
	  //.
	  //. > reject(x => x % 2 == 1, Just(1))
	  //. Nothing
	  //. ```
	  function reject(pred, filterable) {
	    return filter(function(x) { return !pred(x); }, filterable);
	  }

	  //# takeWhile :: Filterable f => (a -> Boolean, f a) -> f a
	  //.
	  //. Discards the first element which does not satisfy the predicate, and all
	  //. subsequent elements.
	  //.
	  //. This function is derived from [`filter`](#filter).
	  //.
	  //. See also [`dropWhile`](#dropWhile).
	  //.
	  //. ```javascript
	  //. > takeWhile(s => /x/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
	  //. ['xy', 'xz', 'yx']
	  //.
	  //. > takeWhile(s => /y/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
	  //. ['xy']
	  //.
	  //. > takeWhile(s => /z/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
	  //. []
	  //. ```
	  function takeWhile(pred, filterable) {
	    var take = true;
	    return filter(function(x) { return take = take && pred(x); }, filterable);
	  }

	  //# dropWhile :: Filterable f => (a -> Boolean, f a) -> f a
	  //.
	  //. Retains the first element which does not satisfy the predicate, and all
	  //. subsequent elements.
	  //.
	  //. This function is derived from [`filter`](#filter).
	  //.
	  //. See also [`takeWhile`](#takeWhile).
	  //.
	  //. ```javascript
	  //. > dropWhile(s => /x/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
	  //. ['yz', 'zx', 'zy']
	  //.
	  //. > dropWhile(s => /y/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
	  //. ['xz', 'yx', 'yz', 'zx', 'zy']
	  //.
	  //. > dropWhile(s => /z/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
	  //. ['xy', 'xz', 'yx', 'yz', 'zx', 'zy']
	  //. ```
	  function dropWhile(pred, filterable) {
	    var take = false;
	    return filter(function(x) { return take = take || !pred(x); }, filterable);
	  }

	  //# map :: Functor f => (a -> b, f a) -> f b
	  //.
	  //. Function wrapper for [`fantasy-land/map`][].
	  //.
	  //. `fantasy-land/map` implementations are provided for the following
	  //. built-in types: Array, Object, and Function.
	  //.
	  //. ```javascript
	  //. > map(Math.sqrt, [1, 4, 9])
	  //. [1, 2, 3]
	  //.
	  //. > map(Math.sqrt, {x: 1, y: 4, z: 9})
	  //. {x: 1, y: 2, z: 3}
	  //.
	  //. > map(Math.sqrt, s => s.length)('Sanctuary')
	  //. 3
	  //.
	  //. > map(Math.sqrt, Tuple('foo', 64))
	  //. Tuple('foo', 8)
	  //.
	  //. > map(Math.sqrt, Nil)
	  //. Nil
	  //.
	  //. > map(Math.sqrt, Cons(1, Cons(4, Cons(9, Nil))))
	  //. Cons(1, Cons(2, Cons(3, Nil)))
	  //. ```
	  function map(f, functor) {
	    return Functor.methods.map(functor)(f);
	  }

	  //# flip :: Functor f => (f (a -> b), a) -> f b
	  //.
	  //. Maps over the given functions, applying each to the given value.
	  //.
	  //. This function is derived from [`map`](#map).
	  //.
	  //. ```javascript
	  //. > flip(x => y => x + y, '!')('foo')
	  //. 'foo!'
	  //.
	  //. > flip([Math.floor, Math.ceil], 1.5)
	  //. [1, 2]
	  //.
	  //. > flip({floor: Math.floor, ceil: Math.ceil}, 1.5)
	  //. {floor: 1, ceil: 2}
	  //.
	  //. > flip(Cons(Math.floor, Cons(Math.ceil, Nil)), 1.5)
	  //. Cons(1, Cons(2, Nil))
	  //. ```
	  function flip(functor, x) {
	    return Functor.methods.map(functor)(thrush(x));
	  }

	  //# bimap :: Bifunctor f => (a -> b, c -> d, f a c) -> f b d
	  //.
	  //. Function wrapper for [`fantasy-land/bimap`][].
	  //.
	  //. ```javascript
	  //. > bimap(s => s.toUpperCase(), Math.sqrt, Tuple('foo', 64))
	  //. Tuple('FOO', 8)
	  //. ```
	  function bimap(f, g, bifunctor) {
	    return Bifunctor.methods.bimap(bifunctor)(f, g);
	  }

	  //# mapLeft :: Bifunctor f => (a -> b, f a c) -> f b c
	  //.
	  //. Maps the given function over the left side of a Bifunctor.
	  //.
	  //. ```javascript
	  //. > mapLeft(Math.sqrt, Tuple(64, 9))
	  //. Tuple(8, 9)
	  //. ```
	  function mapLeft(f, bifunctor) {
	    return bimap(f, identity, bifunctor);
	  }

	  //# promap :: Profunctor p => (a -> b, c -> d, p b c) -> p a d
	  //.
	  //. Function wrapper for [`fantasy-land/promap`][].
	  //.
	  //. `fantasy-land/promap` implementations are provided for the following
	  //. built-in types: Function.
	  //.
	  //. ```javascript
	  //. > promap(Math.abs, x => x + 1, Math.sqrt)(-100)
	  //. 11
	  //. ```
	  function promap(f, g, profunctor) {
	    return Profunctor.methods.promap(profunctor)(f, g);
	  }

	  //# ap :: Apply f => (f (a -> b), f a) -> f b
	  //.
	  //. Function wrapper for [`fantasy-land/ap`][].
	  //.
	  //. `fantasy-land/ap` implementations are provided for the following
	  //. built-in types: Array, Object, and Function.
	  //.
	  //. ```javascript
	  //. > ap([Math.sqrt, x => x * x], [1, 4, 9, 16, 25])
	  //. [1, 2, 3, 4, 5, 1, 16, 81, 256, 625]
	  //.
	  //. > ap({a: Math.sqrt, b: x => x * x}, {a: 16, b: 10, c: 1})
	  //. {a: 4, b: 100}
	  //.
	  //. > ap(s => n => s.slice(0, n), s => Math.ceil(s.length / 2))('Haskell')
	  //. 'Hask'
	  //.
	  //. > ap(Identity(Math.sqrt), Identity(64))
	  //. Identity(8)
	  //.
	  //. > ap(Cons(Math.sqrt, Cons(x => x * x, Nil)), Cons(16, Cons(100, Nil)))
	  //. Cons(4, Cons(10, Cons(256, Cons(10000, Nil))))
	  //. ```
	  function ap(applyF, applyX) {
	    return Apply.methods.ap(applyX)(applyF);
	  }

	  //# lift2 :: Apply f => (a -> b -> c, f a, f b) -> f c
	  //.
	  //. Lifts `a -> b -> c` to `Apply f => f a -> f b -> f c` and returns the
	  //. result of applying this to the given arguments.
	  //.
	  //. This function is derived from [`map`](#map) and [`ap`](#ap).
	  //.
	  //. See also [`lift3`](#lift3).
	  //.
	  //. ```javascript
	  //. > lift2(x => y => Math.pow(x, y), [10], [1, 2, 3])
	  //. [10, 100, 1000]
	  //.
	  //. > lift2(x => y => Math.pow(x, y), Identity(10), Identity(3))
	  //. Identity(1000)
	  //. ```
	  function lift2(f, x, y) {
	    return ap(map(f, x), y);
	  }

	  //# lift3 :: Apply f => (a -> b -> c -> d, f a, f b, f c) -> f d
	  //.
	  //. Lifts `a -> b -> c -> d` to `Apply f => f a -> f b -> f c -> f d` and
	  //. returns the result of applying this to the given arguments.
	  //.
	  //. This function is derived from [`map`](#map) and [`ap`](#ap).
	  //.
	  //. See also [`lift2`](#lift2).
	  //.
	  //. ```javascript
	  //. > lift3(x => y => z => x + z + y, ['<'], ['>'], ['foo', 'bar', 'baz'])
	  //. ['<foo>', '<bar>', '<baz>']
	  //.
	  //. > lift3(x => y => z => x + z + y, Identity('<'), Identity('>'), Identity('baz'))
	  //. Identity('<baz>')
	  //. ```
	  function lift3(f, x, y, z) {
	    return ap(ap(map(f, x), y), z);
	  }

	  //# apFirst :: Apply f => (f a, f b) -> f a
	  //.
	  //. Combines two effectful actions, keeping only the result of the first.
	  //. Equivalent to Haskell's `(<*)` function.
	  //.
	  //. This function is derived from [`lift2`](#lift2).
	  //.
	  //. See also [`apSecond`](#apSecond).
	  //.
	  //. ```javascript
	  //. > apFirst([1, 2], [3, 4])
	  //. [1, 1, 2, 2]
	  //.
	  //. > apFirst(Identity(1), Identity(2))
	  //. Identity(1)
	  //. ```
	  function apFirst(x, y) {
	    return lift2(constant, x, y);
	  }

	  //# apSecond :: Apply f => (f a, f b) -> f b
	  //.
	  //. Combines two effectful actions, keeping only the result of the second.
	  //. Equivalent to Haskell's `(*>)` function.
	  //.
	  //. This function is derived from [`lift2`](#lift2).
	  //.
	  //. See also [`apFirst`](#apFirst).
	  //.
	  //. ```javascript
	  //. > apSecond([1, 2], [3, 4])
	  //. [3, 4, 3, 4]
	  //.
	  //. > apSecond(Identity(1), Identity(2))
	  //. Identity(2)
	  //. ```
	  function apSecond(x, y) {
	    return lift2(constant(identity), x, y);
	  }

	  //# of :: Applicative f => (TypeRep f, a) -> f a
	  //.
	  //. Function wrapper for [`fantasy-land/of`][].
	  //.
	  //. `fantasy-land/of` implementations are provided for the following
	  //. built-in types: Array and Function.
	  //.
	  //. ```javascript
	  //. > of(Array, 42)
	  //. [42]
	  //.
	  //. > of(Function, 42)(null)
	  //. 42
	  //.
	  //. > of(List, 42)
	  //. Cons(42, Nil)
	  //. ```
	  function of(typeRep, x) {
	    return Applicative.methods.of(typeRep)(x);
	  }

	  //# append :: (Applicative f, Semigroup (f a)) => (a, f a) -> f a
	  //.
	  //. Returns the result of appending the first argument to the second.
	  //.
	  //. This function is derived from [`concat`](#concat) and [`of`](#of).
	  //.
	  //. See also [`prepend`](#prepend).
	  //.
	  //. ```javascript
	  //. > append(3, [1, 2])
	  //. [1, 2, 3]
	  //.
	  //. > append(3, Cons(1, Cons(2, Nil)))
	  //. Cons(1, Cons(2, Cons(3, Nil)))
	  //. ```
	  function append(x, xs) {
	    return concat(xs, of(xs.constructor, x));
	  }

	  //# prepend :: (Applicative f, Semigroup (f a)) => (a, f a) -> f a
	  //.
	  //. Returns the result of prepending the first argument to the second.
	  //.
	  //. This function is derived from [`concat`](#concat) and [`of`](#of).
	  //.
	  //. See also [`append`](#append).
	  //.
	  //. ```javascript
	  //. > prepend(1, [2, 3])
	  //. [1, 2, 3]
	  //.
	  //. > prepend(1, Cons(2, Cons(3, Nil)))
	  //. Cons(1, Cons(2, Cons(3, Nil)))
	  //. ```
	  function prepend(x, xs) {
	    return concat(of(xs.constructor, x), xs);
	  }

	  //# chain :: Chain m => (a -> m b, m a) -> m b
	  //.
	  //. Function wrapper for [`fantasy-land/chain`][].
	  //.
	  //. `fantasy-land/chain` implementations are provided for the following
	  //. built-in types: Array and Function.
	  //.
	  //. ```javascript
	  //. > chain(x => [x, x], [1, 2, 3])
	  //. [1, 1, 2, 2, 3, 3]
	  //.
	  //. > chain(x => x % 2 == 1 ? of(List, x) : Nil, Cons(1, Cons(2, Cons(3, Nil))))
	  //. Cons(1, Cons(3, Nil))
	  //.
	  //. > chain(n => s => s.slice(0, n), s => Math.ceil(s.length / 2))('Haskell')
	  //. 'Hask'
	  //. ```
	  function chain(f, chain_) {
	    return Chain.methods.chain(chain_)(f);
	  }

	  //# join :: Chain m => m (m a) -> m a
	  //.
	  //. Removes one level of nesting from a nested monadic structure.
	  //.
	  //. This function is derived from [`chain`](#chain).
	  //.
	  //. ```javascript
	  //. > join([[1], [2], [3]])
	  //. [1, 2, 3]
	  //.
	  //. > join([[[1, 2, 3]]])
	  //. [[1, 2, 3]]
	  //.
	  //. > join(Identity(Identity(1)))
	  //. Identity(1)
	  //. ```
	  function join(chain_) {
	    return chain(identity, chain_);
	  }

	  //# chainRec :: ChainRec m => (TypeRep m, (a -> c, b -> c, a) -> m c, a) -> m b
	  //.
	  //. Function wrapper for [`fantasy-land/chainRec`][].
	  //.
	  //. `fantasy-land/chainRec` implementations are provided for the following
	  //. built-in types: Array.
	  //.
	  //. ```javascript
	  //. > chainRec(
	  //. .   Array,
	  //. .   (next, done, s) => s.length == 2 ? [s + '!', s + '?'].map(done)
	  //. .                                    : [s + 'o', s + 'n'].map(next),
	  //. .   ''
	  //. . )
	  //. ['oo!', 'oo?', 'on!', 'on?', 'no!', 'no?', 'nn!', 'nn?']
	  //. ```
	  function chainRec(typeRep, f, x) {
	    return ChainRec.methods.chainRec(typeRep)(f, x);
	  }

	  //# alt :: Alt f => (f a, f a) -> f a
	  //.
	  //. Function wrapper for [`fantasy-land/alt`][].
	  //.
	  //. `fantasy-land/alt` implementations are provided for the following
	  //. built-in types: Array and Object.
	  //.
	  //. ```javascript
	  //. > alt([1, 2, 3], [4, 5, 6])
	  //. [1, 2, 3, 4, 5, 6]
	  //.
	  //. > alt(Nothing, Nothing)
	  //. Nothing
	  //.
	  //. > alt(Nothing, Just(1))
	  //. Just(1)
	  //.
	  //. > alt(Just(2), Just(3))
	  //. Just(2)
	  //. ```
	  function alt(x, y) {
	    return Alt.methods.alt(x)(y);
	  }

	  //# zero :: Plus f => TypeRep f -> f a
	  //.
	  //. Function wrapper for [`fantasy-land/zero`][].
	  //.
	  //. `fantasy-land/zero` implementations are provided for the following
	  //. built-in types: Array and Object.
	  //.
	  //. ```javascript
	  //. > zero(Array)
	  //. []
	  //.
	  //. > zero(Object)
	  //. {}
	  //.
	  //. > zero(Maybe)
	  //. Nothing
	  //. ```
	  function zero(typeRep) {
	    return Plus.methods.zero(typeRep)();
	  }

	  //# reduce :: Foldable f => ((b, a) -> b, b, f a) -> b
	  //.
	  //. Function wrapper for [`fantasy-land/reduce`][].
	  //.
	  //. `fantasy-land/reduce` implementations are provided for the following
	  //. built-in types: Array and Object.
	  //.
	  //. ```javascript
	  //. > reduce((xs, x) => [x].concat(xs), [], [1, 2, 3])
	  //. [3, 2, 1]
	  //.
	  //. > reduce(concat, '', Cons('foo', Cons('bar', Cons('baz', Nil))))
	  //. 'foobarbaz'
	  //. ```
	  function reduce(f, x, foldable) {
	    return Foldable.methods.reduce(foldable)(f, x);
	  }

	  //# size :: Foldable f => f a -> Integer
	  //.
	  //. Returns the number of elements of the given structure.
	  //.
	  //. This function is derived from [`reduce`](#reduce).
	  //.
	  //. ```javascript
	  //. > size([])
	  //. 0
	  //.
	  //. > size(['foo', 'bar', 'baz'])
	  //. 3
	  //.
	  //. > size(Nil)
	  //. 0
	  //.
	  //. > size(Cons('foo', Cons('bar', Cons('baz', Nil))))
	  //. 3
	  //. ```
	  function size(foldable) {
	    //  Fast path for arrays.
	    if (Array.isArray(foldable)) return foldable.length;
	    return reduce(function(n, _) { return n + 1; }, 0, foldable);
	  }

	  //# elem :: (Setoid a, Foldable f) => (a, f a) -> Boolean
	  //.
	  //. Takes a value and a structure and returns `true` if the
	  //. value is an element of the structure; `false` otherwise.
	  //.
	  //. This function is derived from [`equals`](#equals) and
	  //. [`reduce`](#reduce).
	  //.
	  //. ```javascript
	  //. > elem('c', ['a', 'b', 'c'])
	  //. true
	  //.
	  //. > elem('x', ['a', 'b', 'c'])
	  //. false
	  //.
	  //. > elem(3, {x: 1, y: 2, z: 3})
	  //. true
	  //.
	  //. > elem(8, {x: 1, y: 2, z: 3})
	  //. false
	  //.
	  //. > elem(0, Just(0))
	  //. true
	  //.
	  //. > elem(0, Just(1))
	  //. false
	  //.
	  //. > elem(0, Nothing)
	  //. false
	  //. ```
	  function elem(x, foldable) {
	    return reduce(function(b, y) { return b || equals(x, y); },
	                  false,
	                  foldable);
	  }

	  //# foldMap :: (Monoid m, Foldable f) => (TypeRep m, a -> m, f a) -> m
	  //.
	  //. Deconstructs a foldable by mapping every element to a monoid and
	  //. concatenating the results.
	  //.
	  //. This function is derived from [`concat`](#concat), [`empty`](#empty),
	  //. and [`reduce`](#reduce).
	  //.
	  //. ```javascript
	  //. > foldMap(String, f => f.name, [Math.sin, Math.cos, Math.tan])
	  //. 'sincostan'
	  //. ```
	  function foldMap(typeRep, f, foldable) {
	    return reduce(function(monoid, x) { return concat(monoid, f(x)); },
	                  empty(typeRep),
	                  foldable);
	  }

	  //# reverse :: (Applicative f, Foldable f, Monoid (f a)) => f a -> f a
	  //.
	  //. Reverses the elements of the given structure.
	  //.
	  //. This function is derived from [`concat`](#concat), [`empty`](#empty),
	  //. [`of`](#of), and [`reduce`](#reduce).
	  //.
	  //. ```javascript
	  //. > reverse([1, 2, 3])
	  //. [3, 2, 1]
	  //.
	  //. > reverse(Cons(1, Cons(2, Cons(3, Nil))))
	  //. Cons(3, Cons(2, Cons(1, Nil)))
	  //. ```
	  function reverse(foldable) {
	    //  Fast path for arrays.
	    if (Array.isArray(foldable)) return foldable.slice().reverse();
	    var F = foldable.constructor;
	    return reduce(function(xs, x) { return concat(of(F, x), xs); },
	                  empty(F),
	                  foldable);
	  }

	  //# sort :: (Ord a, Applicative f, Foldable f, Monoid (f a)) => f a -> f a
	  //.
	  //. Performs a [stable sort][] of the elements of the given structure,
	  //. using [`lte`](#lte) for comparisons.
	  //.
	  //. This function is derived from [`lte`](#lte), [`concat`](#concat),
	  //. [`empty`](#empty), [`of`](#of), and [`reduce`](#reduce).
	  //.
	  //. See also [`sortBy`](#sortBy).
	  //.
	  //. ```javascript
	  //. > sort(['foo', 'bar', 'baz'])
	  //. ['bar', 'baz', 'foo']
	  //.
	  //. > sort([Just(2), Nothing, Just(1)])
	  //. [Nothing, Just(1), Just(2)]
	  //.
	  //. > sort(Cons('foo', Cons('bar', Cons('baz', Nil))))
	  //. Cons('bar', Cons('baz', Cons('foo', Nil)))
	  //. ```
	  function sort(foldable) {
	    return sortBy(identity, foldable);
	  }

	  //# sortBy :: (Ord b, Applicative f, Foldable f, Monoid (f a)) => (a -> b, f a) -> f a
	  //.
	  //. Performs a [stable sort][] of the elements of the given structure,
	  //. using [`lte`](#lte) to compare the values produced by applying the
	  //. given function to each element of the structure.
	  //.
	  //. This function is derived from [`lte`](#lte), [`concat`](#concat),
	  //. [`empty`](#empty), [`of`](#of), and [`reduce`](#reduce).
	  //.
	  //. See also [`sort`](#sort).
	  //.
	  //. ```javascript
	  //. > sortBy(s => s.length, ['red', 'green', 'blue'])
	  //. ['red', 'blue', 'green']
	  //.
	  //. > sortBy(s => s.length, ['black', 'white'])
	  //. ['black', 'white']
	  //.
	  //. > sortBy(s => s.length, ['white', 'black'])
	  //. ['white', 'black']
	  //.
	  //. > sortBy(s => s.length, Cons('red', Cons('green', Cons('blue', Nil))))
	  //. Cons('red', Cons('blue', Cons('green', Nil)))
	  //. ```
	  function sortBy(f, foldable) {
	    var rs = reduce(function(rs, x) {
	      rs.push({idx: rs.length, x: x, fx: f(x)});
	      return rs;
	    }, [], foldable);

	    var lte_ = (function(r) {
	      switch (typeof (r && r.fx)) {
	        case 'number':  return function(x, y) { return x <= y || x !== x; };
	        case 'string':  return function(x, y) { return x <= y; };
	        default:        return lte;
	      }
	    }(rs[0]));

	    rs.sort(function(a, b) {
	      return lte_(a.fx, b.fx) ? lte_(b.fx, a.fx) ? a.idx - b.idx : -1 : 1;
	    });

	    if (Array.isArray(foldable)) {
	      for (var idx = 0; idx < rs.length; idx += 1) rs[idx] = rs[idx].x;
	      return rs;
	    }

	    var F = foldable.constructor;
	    var result = empty(F);
	    for (idx = 0; idx < rs.length; idx += 1) {
	      result = concat(result, of(F, rs[idx].x));
	    }
	    return result;
	  }

	  //# traverse :: (Applicative f, Traversable t) => (TypeRep f, a -> f b, t a) -> f (t b)
	  //.
	  //. Function wrapper for [`fantasy-land/traverse`][].
	  //.
	  //. `fantasy-land/traverse` implementations are provided for the following
	  //. built-in types: Array and Object.
	  //.
	  //. See also [`sequence`](#sequence).
	  //.
	  //. ```javascript
	  //. > traverse(Array, x => x, [[1, 2, 3], [4, 5]])
	  //. [[1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]]
	  //.
	  //. > traverse(Identity, x => Identity(x + 1), [1, 2, 3])
	  //. Identity([2, 3, 4])
	  //. ```
	  function traverse(typeRep, f, traversable) {
	    return Traversable.methods.traverse(traversable)(typeRep, f);
	  }

	  //# sequence :: (Applicative f, Traversable t) => (TypeRep f, t (f a)) -> f (t a)
	  //.
	  //. Inverts the given `t (f a)` to produce an `f (t a)`.
	  //.
	  //. This function is derived from [`traverse`](#traverse).
	  //.
	  //. ```javascript
	  //. > sequence(Array, Identity([1, 2, 3]))
	  //. [Identity(1), Identity(2), Identity(3)]
	  //.
	  //. > sequence(Identity, [Identity(1), Identity(2), Identity(3)])
	  //. Identity([1, 2, 3])
	  //. ```
	  function sequence(typeRep, traversable) {
	    return traverse(typeRep, identity, traversable);
	  }

	  //# extend :: Extend w => (w a -> b, w a) -> w b
	  //.
	  //. Function wrapper for [`fantasy-land/extend`][].
	  //.
	  //. `fantasy-land/extend` implementations are provided for the following
	  //. built-in types: Array and Function.
	  //.
	  //. ```javascript
	  //. > extend(ss => ss.join(''), ['x', 'y', 'z'])
	  //. ['xyz', 'yz', 'z']
	  //.
	  //. > extend(f => f([3, 4]), reverse)([1, 2])
	  //. [4, 3, 2, 1]
	  //. ```
	  function extend(f, extend_) {
	    return Extend.methods.extend(extend_)(f);
	  }

	  //# duplicate :: Extend w => w a -> w (w a)
	  //.
	  //. Adds one level of nesting to a comonadic structure.
	  //.
	  //. This function is derived from [`extend`](#extend).
	  //.
	  //. ```javascript
	  //. > duplicate(Identity(1))
	  //. Identity(Identity(1))
	  //.
	  //. > duplicate([1])
	  //. [[1]]
	  //.
	  //. > duplicate([1, 2, 3])
	  //. [[1, 2, 3], [2, 3], [3]]
	  //.
	  //. > duplicate(reverse)([1, 2])([3, 4])
	  //. [4, 3, 2, 1]
	  //. ```
	  function duplicate(extend_) {
	    return extend(identity, extend_);
	  }

	  //# extract :: Comonad w => w a -> a
	  //.
	  //. Function wrapper for [`fantasy-land/extract`][].
	  //.
	  //. ```javascript
	  //. > extract(Identity(42))
	  //. 42
	  //. ```
	  function extract(comonad) {
	    return Comonad.methods.extract(comonad)();
	  }

	  //# contramap :: Contravariant f => (b -> a, f a) -> f b
	  //.
	  //. Function wrapper for [`fantasy-land/contramap`][].
	  //.
	  //. `fantasy-land/contramap` implementations are provided for the following
	  //. built-in types: Function.
	  //.
	  //. ```javascript
	  //. > contramap(s => s.length, Math.sqrt)('Sanctuary')
	  //. 3
	  //. ```
	  function contramap(f, contravariant) {
	    return Contravariant.methods.contramap(contravariant)(f);
	  }

	  return {
	    TypeClass: TypeClass,
	    Setoid: Setoid,
	    Ord: Ord,
	    Semigroupoid: Semigroupoid,
	    Category: Category,
	    Semigroup: Semigroup,
	    Monoid: Monoid,
	    Group: Group,
	    Filterable: Filterable,
	    Functor: Functor,
	    Bifunctor: Bifunctor,
	    Profunctor: Profunctor,
	    Apply: Apply,
	    Applicative: Applicative,
	    Chain: Chain,
	    ChainRec: ChainRec,
	    Monad: Monad,
	    Alt: Alt,
	    Plus: Plus,
	    Alternative: Alternative,
	    Foldable: Foldable,
	    Traversable: Traversable,
	    Extend: Extend,
	    Comonad: Comonad,
	    Contravariant: Contravariant,
	    equals: equals,
	    lt: lt,
	    lte: lte,
	    gt: gt,
	    gte: gte,
	    min: min,
	    max: max,
	    compose: compose,
	    id: id,
	    concat: concat,
	    empty: empty,
	    invert: invert,
	    filter: filter,
	    reject: reject,
	    map: map,
	    flip: flip,
	    bimap: bimap,
	    mapLeft: mapLeft,
	    promap: promap,
	    ap: ap,
	    lift2: lift2,
	    lift3: lift3,
	    apFirst: apFirst,
	    apSecond: apSecond,
	    of: of,
	    append: append,
	    prepend: prepend,
	    chain: chain,
	    join: join,
	    chainRec: chainRec,
	    alt: alt,
	    zero: zero,
	    reduce: reduce,
	    size: size,
	    elem: elem,
	    foldMap: foldMap,
	    reverse: reverse,
	    sort: sort,
	    sortBy: sortBy,
	    takeWhile: takeWhile,
	    dropWhile: dropWhile,
	    traverse: traverse,
	    sequence: sequence,
	    extend: extend,
	    duplicate: duplicate,
	    extract: extract,
	    contramap: contramap
	  };

	}));

	//. [Alt]:                      v:fantasyland/fantasy-land#alt
	//. [Alternative]:              v:fantasyland/fantasy-land#alternative
	//. [Applicative]:              v:fantasyland/fantasy-land#applicative
	//. [Apply]:                    v:fantasyland/fantasy-land#apply
	//. [Bifunctor]:                v:fantasyland/fantasy-land#bifunctor
	//. [Category]:                 v:fantasyland/fantasy-land#category
	//. [Chain]:                    v:fantasyland/fantasy-land#chain
	//. [ChainRec]:                 v:fantasyland/fantasy-land#chainrec
	//. [Comonad]:                  v:fantasyland/fantasy-land#comonad
	//. [Contravariant]:            v:fantasyland/fantasy-land#contravariant
	//. [Extend]:                   v:fantasyland/fantasy-land#extend
	//. [FL]:                       v:fantasyland/fantasy-land
	//. [Filterable]:               v:fantasyland/fantasy-land#filterable
	//. [Foldable]:                 v:fantasyland/fantasy-land#foldable
	//. [Functor]:                  v:fantasyland/fantasy-land#functor
	//. [Group]:                    v:fantasyland/fantasy-land#group
	//. [Monad]:                    v:fantasyland/fantasy-land#monad
	//. [Monoid]:                   v:fantasyland/fantasy-land#monoid
	//. [Ord]:                      v:fantasyland/fantasy-land#ord
	//. [Plus]:                     v:fantasyland/fantasy-land#plus
	//. [Profunctor]:               v:fantasyland/fantasy-land#profunctor
	//. [Semigroup]:                v:fantasyland/fantasy-land#semigroup
	//. [Semigroupoid]:             v:fantasyland/fantasy-land#semigroupoid
	//. [Setoid]:                   v:fantasyland/fantasy-land#setoid
	//. [Traversable]:              v:fantasyland/fantasy-land#traversable
	//. [`fantasy-land/alt`]:       v:fantasyland/fantasy-land#alt-method
	//. [`fantasy-land/ap`]:        v:fantasyland/fantasy-land#ap-method
	//. [`fantasy-land/bimap`]:     v:fantasyland/fantasy-land#bimap-method
	//. [`fantasy-land/chain`]:     v:fantasyland/fantasy-land#chain-method
	//. [`fantasy-land/chainRec`]:  v:fantasyland/fantasy-land#chainrec-method
	//. [`fantasy-land/compose`]:   v:fantasyland/fantasy-land#compose-method
	//. [`fantasy-land/concat`]:    v:fantasyland/fantasy-land#concat-method
	//. [`fantasy-land/contramap`]: v:fantasyland/fantasy-land#contramap-method
	//. [`fantasy-land/empty`]:     v:fantasyland/fantasy-land#empty-method
	//. [`fantasy-land/equals`]:    v:fantasyland/fantasy-land#equals-method
	//. [`fantasy-land/extend`]:    v:fantasyland/fantasy-land#extend-method
	//. [`fantasy-land/extract`]:   v:fantasyland/fantasy-land#extract-method
	//. [`fantasy-land/filter`]:    v:fantasyland/fantasy-land#filter-method
	//. [`fantasy-land/id`]:        v:fantasyland/fantasy-land#id-method
	//. [`fantasy-land/invert`]:    v:fantasyland/fantasy-land#invert-method
	//. [`fantasy-land/lte`]:       v:fantasyland/fantasy-land#lte-method
	//. [`fantasy-land/map`]:       v:fantasyland/fantasy-land#map-method
	//. [`fantasy-land/of`]:        v:fantasyland/fantasy-land#of-method
	//. [`fantasy-land/promap`]:    v:fantasyland/fantasy-land#promap-method
	//. [`fantasy-land/reduce`]:    v:fantasyland/fantasy-land#reduce-method
	//. [`fantasy-land/traverse`]:  v:fantasyland/fantasy-land#traverse-method
	//. [`fantasy-land/zero`]:      v:fantasyland/fantasy-land#zero-method
	//. [stable sort]:              https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
	//. [type-classes]:             https://github.com/sanctuary-js/sanctuary-def#type-classes
	});

	var sanctuaryTypeIdentifiers$1 = createCommonjsModule(function (module) {
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
	      sanctuaryTypeClasses,
	      sanctuaryTypeIdentifiers$1
	    );
	  }

	} (function(show, Z, type) {

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
	    try {
	      return Z.Applicative.test (Z.of (Repr));
	    } catch (_) {
	      return false;
	    }
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
	      return new Concurrently (Z.of (Repr, value));
	    };

	    proto[$map] = function Concurrently$map(mapper) {
	      if (!isOuter (this)) {
	        invalidContext (OUTERNAME + '#map', this, OUTERNAME);
	      }

	      if (!isFunction (mapper)) {
	        invalidArgument (OUTERNAME + '#map', 0, 'be a function', mapper);
	      }

	      return new Concurrently (Z.map (mapper, this.sequential));
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
	  map: 'fantasy-land/map',
	  bimap: 'fantasy-land/bimap',
	  chain: 'fantasy-land/chain',
	  chainRec: 'fantasy-land/chainRec',
	  ap: 'fantasy-land/ap',
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
	  var id = sanctuaryTypeIdentifiers$1.parse(sanctuaryTypeIdentifiers$1(m));
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

	function isFunction(f){
	  return typeof f === 'function';
	}

	function isThenable(m){
	  return m instanceof Promise || Boolean(m) && isFunction(m.then);
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

	/* eslint no-param-reassign:0 */

	var nil = {head: null};
	nil.tail = nil;

	function cons(head, tail){
	  return {head: head, tail: tail};
	}

	/*eslint no-cond-assign:0, no-constant-condition:0 */

	function interpretSequence(seq, rec, rej, res){

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

	      while(tail !== nil){
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

	  //This function represents our main execution loop.
	  //When we refer to a "tick", we mean the execution of the body inside the
	  //primary while-loop of this function.
	  //Every tick follows the following algorithm:
	  // 1. We try to take an action from the cold queue, if we fail, go to step 2.
	  //      1a. We fork the future.
	  //      1b. We warmupActions() if the we haven't settled yet.
	  // 2. We try to take an action from the hot queue, if we fail, go to step 3.
	  //      2a. We fork the Future, if settles, we continue to the next tick.
	  // 3. If we couldn't take actions from either queues, we fork the Future into
	  //    the user provided continuations. This is the end of the interpretation.
	  // 4. If we did take an action from one of queues, but none of the steps
	  //    caused a settle(), it means we are asynchronously waiting for something
	  //    to settle and start the next tick, so we return from the function.
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
	  settle(seq);

	  //Return the cancellation function.
	  return Sequence$cancel;

	}

	function Future$value$rej(x){
	  raise(error(
	    'Future#value was called on a rejected Future\n' +
	    '  Actual: Future.reject(' + sanctuaryShow(x) + ')'
	  ));
	}

	function Future$onCrash(x){
	  raise(valueToError(x));
	}

	function Future(computation){
	  if(!isFunction(computation)) throwInvalidArgument('Future', 0, 'be a Function', computation);
	  return new Computation(computation);
	}

	function isFuture(x){
	  return x instanceof Future || sanctuaryTypeIdentifiers$1(x) === $$type;
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

	Future.prototype.ap = function Future$ap(other){
	  if(!isFuture(this)) throwInvalidContext('Future#ap', this);
	  if(!isFuture(other)) throwInvalidFuture('Future#ap', 0, other);
	  return this._ap(other);
	};

	Future.prototype.map = function Future$map(mapper){
	  if(!isFuture(this)) throwInvalidContext('Future#map', this);
	  if(!isFunction(mapper)) throwInvalidArgument('Future#map', 0, 'to be a Function', mapper);
	  return this._map(mapper);
	};

	Future.prototype.bimap = function Future$bimap(lmapper, rmapper){
	  if(!isFuture(this)) throwInvalidContext('Future#bimap', this);
	  if(!isFunction(lmapper)) throwInvalidArgument('Future#bimap', 0, 'to be a Function', lmapper);
	  if(!isFunction(rmapper)) throwInvalidArgument('Future#bimap', 1, 'to be a Function', rmapper);
	  return this._bimap(lmapper, rmapper);
	};

	Future.prototype.chain = function Future$chain(mapper){
	  if(!isFuture(this)) throwInvalidContext('Future#chain', this);
	  if(!isFunction(mapper)) throwInvalidArgument('Future#chain', 0, 'to be a Function', mapper);
	  return this._chain(mapper);
	};

	Future.prototype.mapRej = function Future$mapRej(mapper){
	  if(!isFuture(this)) throwInvalidContext('Future#mapRej', this);
	  if(!isFunction(mapper)) throwInvalidArgument('Future#mapRej', 0, 'to be a Function', mapper);
	  return this._mapRej(mapper);
	};

	Future.prototype.chainRej = function Future$chainRej(mapper){
	  if(!isFuture(this)) throwInvalidContext('Future#chainRej', this);
	  if(!isFunction(mapper)) throwInvalidArgument('Future#chainRej', 0, 'to be a Function', mapper);
	  return this._chainRej(mapper);
	};

	Future.prototype.race = function Future$race(other){
	  if(!isFuture(this)) throwInvalidContext('Future#race', this);
	  if(!isFuture(other)) throwInvalidFuture('Future#race', 0, other);
	  return this._race(other);
	};

	Future.prototype.both = function Future$both(other){
	  if(!isFuture(this)) throwInvalidContext('Future#both', this);
	  if(!isFuture(other)) throwInvalidFuture('Future#both', 0, other);
	  return this._both(other);
	};

	Future.prototype.and = function Future$and(other){
	  if(!isFuture(this)) throwInvalidContext('Future#and', this);
	  if(!isFuture(other)) throwInvalidFuture('Future#and', 0, other);
	  return this._and(other);
	};

	Future.prototype.or = function Future$or(other){
	  if(!isFuture(this)) throwInvalidContext('Future#or', this);
	  if(!isFuture(other)) throwInvalidFuture('Future#or', 0, other);
	  return this._or(other);
	};

	Future.prototype.swap = function Future$swap(){
	  if(!isFuture(this)) throwInvalidContext('Future#ap', this);
	  return this._swap();
	};

	Future.prototype.fold = function Future$fold(lmapper, rmapper){
	  if(!isFuture(this)) throwInvalidContext('Future#ap', this);
	  if(!isFunction(lmapper)) throwInvalidArgument('Future#fold', 0, 'to be a Function', lmapper);
	  if(!isFunction(rmapper)) throwInvalidArgument('Future#fold', 1, 'to be a Function', rmapper);
	  return this._fold(lmapper, rmapper);
	};

	Future.prototype.finally = function Future$finally(other){
	  if(!isFuture(this)) throwInvalidContext('Future#finally', this);
	  if(!isFuture(other)) throwInvalidFuture('Future#finally', 0, other);
	  return this._finally(other);
	};

	Future.prototype.lastly = function Future$lastly(other){
	  if(!isFuture(this)) throwInvalidContext('Future#lastly', this);
	  if(!isFuture(other)) throwInvalidFuture('Future#lastly', 0, other);
	  return this._finally(other);
	};

	Future.prototype.fork = function Future$fork(rej, res){
	  if(!isFuture(this)) throwInvalidContext('Future#fork', this);
	  if(!isFunction(rej)) throwInvalidArgument('Future#fork', 0, 'to be a Function', rej);
	  if(!isFunction(res)) throwInvalidArgument('Future#fork', 1, 'to be a Function', res);
	  return this._interpret(Future$onCrash, rej, res);
	};

	Future.prototype.forkCatch = function Future$fork(rec, rej, res){
	  if(!isFuture(this)) throwInvalidContext('Future#fork', this);
	  if(!isFunction(rec)) throwInvalidArgument('Future#fork', 0, 'to be a Function', rec);
	  if(!isFunction(rej)) throwInvalidArgument('Future#fork', 1, 'to be a Function', rej);
	  if(!isFunction(res)) throwInvalidArgument('Future#fork', 2, 'to be a Function', res);
	  return this._interpret(rec, rej, res);
	};

	Future.prototype.value = function Future$value(res){
	  if(!isFuture(this)) throwInvalidContext('Future#value', this);
	  if(!isFunction(res)) throwInvalidArgument('Future#value', 0, 'to be a Function', res);
	  return this._interpret(Future$onCrash, Future$value$rej, res);
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

	Future.prototype.isRejected = function Future$isRejected(){
	  return false;
	};

	Future.prototype.isResolved = function Future$isResolved(){
	  return false;
	};

	Future.prototype.isSettled = function Future$isSettled(){
	  return this.isRejected() || this.isResolved();
	};

	Future.prototype.extractLeft = function Future$extractLeft(){
	  return [];
	};

	Future.prototype.extractRight = function Future$extractRight(){
	  return [];
	};

	var Core = Object.create(Future.prototype);

	Core._ap = function Core$ap(other){
	  return new Sequence(this)._ap(other);
	};

	Core._parallelAp = function Core$parallelAp(other){
	  return new Sequence(this)._parallelAp(other);
	};

	Core._map = function Core$map(mapper){
	  return new Sequence(this)._map(mapper);
	};

	Core._bimap = function Core$bimap(lmapper, rmapper){
	  return new Sequence(this)._bimap(lmapper, rmapper);
	};

	Core._chain = function Core$chain(mapper){
	  return new Sequence(this)._chain(mapper);
	};

	Core._mapRej = function Core$mapRej(mapper){
	  return new Sequence(this)._mapRej(mapper);
	};

	Core._chainRej = function Core$chainRej(mapper){
	  return new Sequence(this)._chainRej(mapper);
	};

	Core._race = function Core$race(other){
	  return new Sequence(this)._race(other);
	};

	Core._both = function Core$both(other){
	  return new Sequence(this)._both(other);
	};

	Core._and = function Core$and(other){
	  return new Sequence(this)._and(other);
	};

	Core._or = function Core$or(other){
	  return new Sequence(this)._or(other);
	};

	Core._swap = function Core$swap(){
	  return new Sequence(this)._swap();
	};

	Core._fold = function Core$fold(lmapper, rmapper){
	  return new Sequence(this)._fold(lmapper, rmapper);
	};

	Core._finally = function Core$finally(other){
	  return new Sequence(this)._finally(other);
	};

	function Computation(computation){
	  this._computation = computation;
	}

	Computation.prototype = Object.create(Core);

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

	function Rejected(value){
	  this._value = value;
	}

	Rejected.prototype = Object.create(Core);

	Rejected.prototype._ap = moop;
	Rejected.prototype._parallelAp = moop;
	Rejected.prototype._map = moop;
	Rejected.prototype._chain = moop;
	Rejected.prototype._race = moop;
	Rejected.prototype._both = moop;
	Rejected.prototype._and = moop;

	Rejected.prototype._or = function Rejected$or(other){
	  return other;
	};

	Rejected.prototype._finally = function Rejected$finally(other){
	  return other._and(this);
	};

	Rejected.prototype._swap = function Rejected$swap(){
	  return new Resolved(this._value);
	};

	Rejected.prototype._interpret = function Rejected$interpret(rec, rej){
	  rej(this._value);
	  return noop;
	};

	Rejected.prototype.isRejected = function Rejected$isRejected(){
	  return true;
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

	Resolved.prototype = Object.create(Core);

	Resolved.prototype._race = moop;
	Resolved.prototype._mapRej = moop;
	Resolved.prototype._or = moop;

	Resolved.prototype._and = function Resolved$and(other){
	  return other;
	};

	Resolved.prototype._both = function Resolved$both(other){
	  var left = this._value;
	  return other._map(function Resolved$both$mapper(right){
	    return [left, right];
	  });
	};

	Resolved.prototype._swap = function Resolved$swap(){
	  return new Rejected(this._value);
	};

	Resolved.prototype._finally = function Resolved$finally(other){
	  var value = this._value;
	  return other._map(function Resolved$finally$mapper(){
	    return value;
	  });
	};

	Resolved.prototype._interpret = function Resolved$interpret(rec, rej, res){
	  res(this._value);
	  return noop;
	};

	Resolved.prototype.isResolved = function Resolved$isResolved(){
	  return true;
	};

	Resolved.prototype.extractRight = function Resolved$extractRight(){
	  return [this._value];
	};

	Resolved.prototype.toString = function Resolved$toString(){
	  return 'Future.of(' + sanctuaryShow(this._value) + ')';
	};

	function of(x){
	  return new Resolved(x);
	}

	function Never(){
	  this._isNever = true;
	}

	Never.prototype = Object.create(Future.prototype);

	Never.prototype._ap = moop;
	Never.prototype._parallelAp = moop;
	Never.prototype._map = moop;
	Never.prototype._bimap = moop;
	Never.prototype._chain = moop;
	Never.prototype._mapRej = moop;
	Never.prototype._chainRej = moop;
	Never.prototype._both = moop;
	Never.prototype._or = moop;
	Never.prototype._swap = moop;
	Never.prototype._fold = moop;
	Never.prototype._finally = moop;

	Never.prototype._race = function Never$race(other){
	  return other;
	};

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

	function Crashed(error$$1){
	  this._error = error$$1;
	}

	Crashed.prototype = Object.create(Future.prototype);

	Crashed.prototype._ap = moop;
	Crashed.prototype._parallelAp = moop;
	Crashed.prototype._map = moop;
	Crashed.prototype._bimap = moop;
	Crashed.prototype._chain = moop;
	Crashed.prototype._mapRej = moop;
	Crashed.prototype._chainRej = moop;
	Crashed.prototype._both = moop;
	Crashed.prototype._or = moop;
	Crashed.prototype._swap = moop;
	Crashed.prototype._fold = moop;
	Crashed.prototype._finally = moop;
	Crashed.prototype._race = moop;

	Crashed.prototype._interpret = function Crashed$interpret(rec){
	  rec(this._error);
	  return noop;
	};

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

	Eager.prototype = Object.create(Core);

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
	  run: function Action$run(){ return this },
	  cancel: function Action$cancel(){}
	};

	function ApAction(other){ this.other = other; }
	ApAction.prototype = Object.create(Action);

	ApAction.prototype.resolved = function ApAction$resolved(f){
	  return isFunction(f) ?
	         this.other._map(function ApAction$resolved$mapper(x){ return f(x) }) :
	         new Crashed(typeError(
	           'Future#ap expects its first argument to be a Future of a Function'
	           + '\n  Actual: Future.of(' + sanctuaryShow(f) + ')'
	         ));
	};

	ApAction.prototype.toString = function ApAction$toString(){
	  return 'ap(' + this.other.toString() + ')';
	};

	function MapAction(mapper){ this.mapper = mapper; }
	MapAction.prototype = Object.create(Action);

	MapAction.prototype.resolved = function MapAction$resolved(x){
	  var m;
	  try{ m = new Resolved(this.mapper(x)); }catch(e){ m = new Crashed(e); }
	  return m;
	};

	MapAction.prototype.toString = function MapAction$toString(){
	  return 'map(' + showf(this.mapper) + ')';
	};

	function BimapAction(lmapper, rmapper){ this.lmapper = lmapper; this.rmapper = rmapper; }
	BimapAction.prototype = Object.create(Action);

	BimapAction.prototype.rejected = function BimapAction$rejected(x){
	  var m;
	  try{ m = new Rejected(this.lmapper(x)); }catch(e){ m = new Crashed(e); }
	  return m;
	};

	BimapAction.prototype.resolved = function BimapAction$resolved(x){
	  var m;
	  try{ m = new Resolved(this.rmapper(x)); }catch(e){ m = new Crashed(e); }
	  return m;
	};

	BimapAction.prototype.toString = function BimapAction$toString(){
	  return 'bimap(' + showf(this.lmapper) + ', ' + showf(this.rmapper) + ')';
	};

	function ChainAction(mapper){ this.mapper = mapper; }
	ChainAction.prototype = Object.create(Action);

	ChainAction.prototype.resolved = function ChainAction$resolved(x){
	  var m;
	  try{ m = this.mapper(x); }catch(e){ return new Crashed(e) }
	  return isFuture(m) ? m : new Crashed(invalidFuture(
	    'Future#chain',
	    'the function it\'s given to return a Future',
	    m,
	    '\n  From calling: ' + showf(this.mapper) + '\n  With: ' + sanctuaryShow(x)
	  ));
	};

	ChainAction.prototype.toString = function ChainAction$toString(){
	  return 'chain(' + showf(this.mapper) + ')';
	};

	function MapRejAction(mapper){ this.mapper = mapper; }
	MapRejAction.prototype = Object.create(Action);

	MapRejAction.prototype.rejected = function MapRejAction$rejected(x){
	  var m;
	  try{ m = new Rejected(this.mapper(x)); }catch(e){ m = new Crashed(e); }
	  return m;
	};

	MapRejAction.prototype.toString = function MapRejAction$toString(){
	  return 'mapRej(' + showf(this.mapper) + ')';
	};

	function ChainRejAction(mapper){ this.mapper = mapper; }
	ChainRejAction.prototype = Object.create(Action);

	ChainRejAction.prototype.rejected = function ChainRejAction$rejected(x){
	  var m;
	  try{ m = this.mapper(x); }catch(e){ return new Crashed(e) }
	  return isFuture(m) ? m : new Crashed(invalidFuture(
	    'Future#chainRej',
	    'the function it\'s given to return a Future',
	    m,
	    '\n  From calling: ' + showf(this.mapper) + '\n  With: ' + sanctuaryShow(x)
	  ));
	};

	ChainRejAction.prototype.toString = function ChainRejAction$toString(){
	  return 'chainRej(' + showf(this.mapper) + ')';
	};

	function SwapAction(){}
	SwapAction.prototype = Object.create(Action);

	SwapAction.prototype.rejected = function SwapAction$rejected(x){
	  return new Resolved(x);
	};

	SwapAction.prototype.resolved = function SwapAction$resolved(x){
	  return new Rejected(x);
	};

	SwapAction.prototype.toString = function SwapAction$toString(){
	  return 'swap()';
	};

	function FoldAction(lmapper, rmapper){ this.lmapper = lmapper; this.rmapper = rmapper; }
	FoldAction.prototype = Object.create(Action);

	FoldAction.prototype.rejected = function FoldAction$rejected(x){
	  var m;
	  try{ m = new Resolved(this.lmapper(x)); }catch(e){ m = new Crashed(e); }
	  return m;
	};

	FoldAction.prototype.resolved = function FoldAction$resolved(x){
	  var m;
	  try{ m = new Resolved(this.rmapper(x)); }catch(e){ m = new Crashed(e); }
	  return m;
	};

	FoldAction.prototype.toString = function FoldAction$toString(){
	  return 'fold(' + showf(this.lmapper) + ', ' + showf(this.rmapper) + ')';
	};

	function FinallyAction(other){ this.other = other; }
	FinallyAction.prototype = Object.create(Action);

	FinallyAction.prototype.rejected = function FinallyAction$rejected(x){
	  return this.other._and(new Rejected(x));
	};

	FinallyAction.prototype.resolved = function FinallyAction$resolved(x){
	  return this.other._map(function FoldAction$resolved$mapper(){ return x });
	};

	FinallyAction.prototype.cancel = function FinallyAction$cancel(){
	  this.other._interpret(noop, noop, noop)();
	};

	FinallyAction.prototype.toString = function FinallyAction$toString(){
	  return 'finally(' + this.other.toString() + ')';
	};

	function AndAction(other){ this.other = other; }
	AndAction.prototype = Object.create(Action);

	AndAction.prototype.resolved = function AndAction$resolved(){
	  return this.other;
	};

	AndAction.prototype.toString = function AndAction$toString(){
	  return 'and(' + this.other.toString() + ')';
	};

	function OrAction(other){ this.other = other; }
	OrAction.prototype = Object.create(Action);

	OrAction.prototype.rejected = function OrAction$rejected(){
	  return this.other;
	};

	OrAction.prototype.toString = function OrAction$toString(){
	  return 'or(' + this.other.toString() + ')';
	};

	function ParallelApAction(other){ this.other = other; }
	ParallelApAction.prototype = Object.create(ApAction.prototype);

	ParallelApAction.prototype.run = function ParallelApAction$run(early){
	  return new ParallelApActionState(early, this.other);
	};

	ParallelApAction.prototype.toString = function ParallelApAction$toString(){
	  return '_parallelAp(' + this.other.toString() + ')';
	};

	function RaceAction(other){ this.other = other; }
	RaceAction.prototype = Object.create(Action);

	RaceAction.prototype.run = function RaceAction$run(early){
	  return new RaceActionState(early, new Eager(this.other));
	};

	RaceAction.prototype.toString = function RaceAction$toString(){
	  return 'race(' + this.other.toString() + ')';
	};

	function BothAction(other){ this.other = other; }
	BothAction.prototype = Object.create(Action);

	BothAction.prototype.resolved = function BothAction$resolved(x){
	  return this.other._map(function BothAction$resolved$mapper(y){ return [x, y] });
	};

	BothAction.prototype.run = function BothAction$run(early){
	  return new BothActionState(early, new Eager(this.other));
	};

	BothAction.prototype.toString = function BothAction$toString(){
	  return 'both(' + this.other.toString() + ')';
	};

	function ParallelApActionState(early, other){
	  var _this = this;
	  _this.other = new Eager(other);
	  _this.cancel = this.other._interpret(
	    function ParallelApActionState$rec(x){ early(new Crashed(x), _this); },
	    function ParallelApActionState$rej(x){ early(new Rejected(x), _this); },
	    noop
	  );
	}

	ParallelApActionState.prototype = Object.create(ParallelApAction.prototype);

	function RaceActionState(early, other){
	  var _this = this;
	  _this.other = other;
	  _this.cancel = other._interpret(
	    function RaceActionState$rec(x){ early(new Crashed(x), _this); },
	    function RaceActionState$rej(x){ early(new Rejected(x), _this); },
	    function RaceActionState$res(x){ early(new Resolved(x), _this); }
	  );
	}

	RaceActionState.prototype = Object.create(RaceAction.prototype);

	function BothActionState(early, other){
	  var _this = this;
	  _this.other = other;
	  _this.cancel = other._interpret(
	    function BothActionState$rec(x){ early(new Crashed(x), _this); },
	    function BothActionState$rej(x){ early(new Rejected(x), _this); },
	    noop
	  );
	}

	BothActionState.prototype = Object.create(BothAction.prototype);

	function Sequence(spawn, actions){
	  this._spawn = spawn;
	  this._actions = actions || nil;
	}

	Sequence.prototype = Object.create(Future.prototype);

	Sequence.prototype._transform = function Sequence$_transform(action){
	  return new Sequence(this._spawn, cons(action, this._actions));
	};

	Sequence.prototype._ap = function Sequence$ap(other){
	  return this._transform(new ApAction(other));
	};

	Sequence.prototype._parallelAp = function Sequence$pap(other){
	  return this._transform(new ParallelApAction(other));
	};

	Sequence.prototype._map = function Sequence$map(mapper){
	  return this._transform(new MapAction(mapper));
	};

	Sequence.prototype._bimap = function Sequence$bimap(lmapper, rmapper){
	  return this._transform(new BimapAction(lmapper, rmapper));
	};

	Sequence.prototype._chain = function Sequence$chain(mapper){
	  return this._transform(new ChainAction(mapper));
	};

	Sequence.prototype._mapRej = function Sequence$mapRej(mapper){
	  return this._transform(new MapRejAction(mapper));
	};

	Sequence.prototype._chainRej = function Sequence$chainRej(mapper){
	  return this._transform(new ChainRejAction(mapper));
	};

	Sequence.prototype._race = function Sequence$race(other){
	  return isNever(other) ? this : this._transform(new RaceAction(other));
	};

	Sequence.prototype._both = function Sequence$both(other){
	  return this._transform(new BothAction(other));
	};

	Sequence.prototype._and = function Sequence$and(other){
	  return this._transform(new AndAction(other));
	};

	Sequence.prototype._or = function Sequence$or(other){
	  return this._transform(new OrAction(other));
	};

	Sequence.prototype._swap = function Sequence$swap(){
	  return this._transform(new SwapAction);
	};

	Sequence.prototype._fold = function Sequence$fold(lmapper, rmapper){
	  return this._transform(new FoldAction(lmapper, rmapper));
	};

	Sequence.prototype._finally = function Sequence$finally(other){
	  return this._transform(new FinallyAction(other));
	};

	Sequence.prototype._interpret = function Sequence$interpret(rec, rej, res){
	  return interpretSequence(this, rec, rej, res);
	};

	Sequence.prototype.toString = function Sequence$toString(){
	  var str = '', tail = this._actions;

	  while(tail !== nil){
	    str = '.' + tail.head.toString() + str;
	    tail = tail.tail;
	  }

	  return this._spawn.toString() + str;
	};

	function Next(x){
	  return {done: false, value: x};
	}

	function Done(x){
	  return {done: true, value: x};
	}

	function isIteration(x){
	  return isObject(x) && isBoolean(x.done);
	}

	var Undetermined = 0;
	var Synchronous = 1;
	var Asynchronous = 2;

	function ChainRec(step, init){
	  this._step = step;
	  this._init = init;
	}

	ChainRec.prototype = Object.create(Core);

	ChainRec.prototype._interpret = function ChainRec$interpret(rec, rej, res){

	  var _step = this._step;
	  var _init = this._init;
	  var timing = Undetermined, cancel = noop, state = Next(_init);

	  function resolved(it){
	    state = it;
	    timing = timing === Undetermined ? Synchronous : drain();
	  }

	  function drain(){
	    while(!state.done){
	      timing = Undetermined;

	      try{
	        var m = _step(Next, Done, state.value);
	      }catch(e){
	        rec(e);
	        return;
	      }

	      cancel = m._interpret(rec, rej, resolved);

	      if(timing !== Synchronous){
	        timing = Asynchronous;
	        return;
	      }
	    }

	    res(state.value);
	  }

	  drain();

	  return function Future$chainRec$cancel(){ cancel(); };

	};

	ChainRec.prototype.toString = function ChainRec$toString(){
	  return 'Future.chainRec(' + showf(this._step) + ', ' + sanctuaryShow(this._init) + ')';
	};

	function chainRec(step, init){
	  return new ChainRec(step, init);
	}

	function ap$mval(mval, mfunc){
	  if(!sanctuaryTypeClasses.Apply.test(mfunc)) throwInvalidArgument('Future.ap', 1, 'be an Apply', mfunc);
	  return sanctuaryTypeClasses.ap(mval, mfunc);
	}

	function ap(mval, mfunc){
	  if(!sanctuaryTypeClasses.Apply.test(mval)) throwInvalidArgument('Future.ap', 0, 'be an Apply', mval);
	  if(arguments.length === 1) return partial1(ap$mval, mval);
	  return ap$mval(mval, mfunc);
	}

	function alt$left(left, right){
	  if(!sanctuaryTypeClasses.Alt.test(right)) throwInvalidArgument('alt', 1, 'be an Alt', right);
	  return sanctuaryTypeClasses.alt(left, right);
	}

	function alt(left, right){
	  if(!sanctuaryTypeClasses.Alt.test(left)) throwInvalidArgument('alt', 0, 'be an Alt', left);
	  if(arguments.length === 1) return partial1(alt$left, left);
	  return alt$left(left, right);
	}

	function map$mapper(mapper, m){
	  if(!sanctuaryTypeClasses.Functor.test(m)) throwInvalidArgument('Future.map', 1, 'be a Functor', m);
	  return sanctuaryTypeClasses.map(mapper, m);
	}

	function map(mapper, m){
	  if(!isFunction(mapper)) throwInvalidArgument('Future.map', 0, 'be a Function', mapper);
	  if(arguments.length === 1) return partial1(map$mapper, mapper);
	  return map$mapper(mapper, m);
	}

	function bimap$lmapper$rmapper(lmapper, rmapper, m){
	  if(!sanctuaryTypeClasses.Bifunctor.test(m)) throwInvalidArgument('Future.bimap', 2, 'be a Bifunctor', m);
	  return sanctuaryTypeClasses.bimap(lmapper, rmapper, m);
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
	  if(!sanctuaryTypeClasses.Chain.test(m)) throwInvalidArgument('Future.chain', 1, 'be a Chain', m);
	  return sanctuaryTypeClasses.chain(chainer, m);
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
	  return m._interpret(f, g, h);
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

	function After$race(other){
	  return other.isSettled()
	       ? other
	       : isNever(other)
	       ? this
	       : typeof other._time === 'number'
	       ? other._time < this._time ? other : this
	       : Core._race.call(this, other);
	}

	function After(time, value){
	  this._time = time;
	  this._value = value;
	}

	After.prototype = Object.create(Core);

	After.prototype._race = After$race;

	After.prototype._swap = function After$swap(){
	  return new RejectAfter(this._time, this._value);
	};

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

	RejectAfter.prototype = Object.create(Core);

	RejectAfter.prototype._race = After$race;

	RejectAfter.prototype._swap = function RejectAfter$swap(){
	  return new After(this._time, this._value);
	};

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

	Attempt.prototype = Object.create(Core);

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

	Cached.prototype = Object.create(Core);

	Cached.prototype.isRejected = function Cached$isRejected(){
	  return this._state === Rejected$1;
	};

	Cached.prototype.isResolved = function Cached$isResolved(){
	  return this._state === Resolved$1;
	};

	Cached.prototype.extractLeft = function Cached$extractLeft(){
	  return this.isRejected() ? [this._value] : [];
	};

	Cached.prototype.extractRight = function Cached$extractRight(){
	  return this.isResolved() ? [this._value] : [];
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

	Encase.prototype = Object.create(Core);

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

	Encase2.prototype = Object.create(Core);

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

	Encase3.prototype = Object.create(Core);

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

	EncaseN.prototype = Object.create(Core);

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

	EncaseN2.prototype = Object.create(Core);

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

	EncaseN3.prototype = Object.create(Core);

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

	EncaseP.prototype = Object.create(Core);

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

	EncaseP2.prototype = Object.create(Core);

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

	EncaseP3.prototype = Object.create(Core);

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

	Go.prototype = Object.create(Core);

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

	Hook.prototype = Object.create(Core);

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

	Node.prototype = Object.create(Core);

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

	Parallel.prototype = Object.create(Core);

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

	TryP.prototype = Object.create(Core);

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

	Future.of = Future[FL.of] = of;
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
	  return x instanceof Par || sanctuaryTypeIdentifiers$1(x) === Par['@@type'];
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
		of: of,
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
