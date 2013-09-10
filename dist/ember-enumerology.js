/*! ember-enumerology - v0.1.0 - 2013-09-10
* https://github.com/jamesotron/ember-enumerology
* Copyright (c) 2013 James Harton; Licensed MIT */
(function() {


}).call(this);

(function() {
  window.Enumerology = Em.Namespace.create({
    VERSION: '0.10.0',
    create: function(dependentKey) {
      return Enumerology.Pipeline.create({
        dependentKey: dependentKey
      });
    }
  });

}).call(this);

(function() {
  var assert, classify, pipeline,
    __slice = [].slice;

  classify = function(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  assert = function(msg, test) {
    if (!test) {
      throw new Error(msg);
    }
  };

  pipeline = Em.Object.extend({
    init: function() {
      this._super();
      this['getEach'] = this['mapBy'];
      this['mapProperty'] = this['mapBy'];
      this['size'] = this['length'];
      return this.set('transformations', []);
    },
    finalize: function() {
      var baseKey, dependentKeys, transformations;
      baseKey = this.get('dependentKey');
      assert("Must have a dependent key", !Em.isEmpty(baseKey));
      transformations = this.get('transformations');
      assert("Must have at least one transformation applied", transformations.get('length') > 0);
      dependentKeys = transformations.map(function(item) {
        return "" + baseKey + (item.get('dependencies'));
      }).uniq();
      return Ember.computed.apply(Ember, __slice.call(dependentKeys).concat([function() {
        var result;
        result = this.get(baseKey);
        transformations.forEach(function(transform) {
          return result = transform.apply(this, result);
        });
        return result;
      }]));
    },
    any: function(callback) {
      return this._addTransformation('any', {
        callback: callback
      });
    },
    anyBy: function(key, value) {
      if (value == null) {
        value = null;
      }
      return this._addTransformation('anyBy', {
        key: key,
        value: value
      });
    },
    compact: function() {
      return this._addTransformation('compact', {});
    },
    contains: function(obj) {
      return this._addTransformation('contains', {
        obj: obj
      });
    },
    every: function(callback, target) {
      if (target == null) {
        target = null;
      }
      return this._addTransformation('every', {
        callback: callback,
        target: target
      });
    },
    everyBy: function(key, value) {
      if (value == null) {
        value = null;
      }
      return this._addTransformation('everyBy', {
        key: key,
        value: value
      });
    },
    filter: function(callback, target) {
      if (target == null) {
        target = null;
      }
      return this._addTransformation('filter', {
        callback: callback,
        target: target
      });
    },
    filterBy: function(key, value) {
      if (value == null) {
        value = null;
      }
      return this._addTransformation('filterBy', {
        key: key,
        value: value
      });
    },
    find: function(callback, target) {
      if (target == null) {
        target = null;
      }
      return this._addTransformation('find', {
        callback: callback,
        target: target
      });
    },
    findBy: function(key, value) {
      if (value == null) {
        value = null;
      }
      return this._addTransformation('findBy', {
        key: key,
        value: value
      });
    },
    invoke: function() {
      var args, methodName;
      methodName = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this._addTransformation('invoke', {
        methodName: methodName,
        args: args
      });
    },
    length: function() {
      return this._addTransformation('length');
    },
    map: function(callback, target) {
      if (target == null) {
        target = null;
      }
      return this._addTransformation('map', {
        callback: callback,
        target: target
      });
    },
    mapBy: function(key) {
      return this._addTransformation('mapBy', {
        key: key
      });
    },
    reduce: function(callback, initialValue) {
      return this._addTransformation('reduce', {
        callback: callback,
        initialValue: initialValue
      });
    },
    reject: function(callback, target) {
      if (target == null) {
        target = null;
      }
      return this._addTransformation('reject', {
        callback: callback,
        target: target
      });
    },
    rejectBy: function(key, value) {
      if (value == null) {
        value = null;
      }
      return this._addTransformation('rejectBy', {
        key: key,
        value: value
      });
    },
    setEach: function(key, value) {
      return this._addTransformation('setEach', {
        key: key,
        value: value
      });
    },
    uniq: function() {
      return this._addTransformation('uniq');
    },
    without: function(value) {
      return this._addTransformation('without', {
        value: value
      });
    },
    _addTransformation: function(name, opts) {
      this.get('transformations').addObject(Enumerology.Transform[classify(name)].create(opts));
      return this;
    }
  });

  Enumerology.Pipeline = pipeline;

}).call(this);

(function() {
  Enumerology.Transform = Em.Object.extend({
    dependencies: '[]'
  });

}).call(this);

(function() {
  Enumerology.TransformBy = Enumerology.Transform.extend({
    dependencies: (function() {
      return ".@each." + (this.get('key'));
    }).property('key')
  });

}).call(this);

(function() {
  var any;

  any = Enumerology.Transform.extend({
    apply: function(target, collection) {
      return collection.any(this.get('callback'), this.getWithDefault('target', target));
    }
  });

  Enumerology.Transform.Any = any;

}).call(this);

(function() {
  var anyBy;

  anyBy = Enumerology.TransformBy.extend({
    apply: function(target, collection) {
      return collection.anyBy(this.get('key'), this.get('value'));
    }
  });

  Enumerology.Transform.AnyBy = anyBy;

}).call(this);

(function() {
  var compact;

  compact = Enumerology.Transform.extend({
    apply: function(target, collection) {
      return collection.compact();
    }
  });

  Enumerology.Transform.Compact = compact;

}).call(this);

(function() {
  var contains;

  contains = Enumerology.Transform.extend({
    apply: function(target, collection) {
      return collection.contains(this.get('obj'));
    }
  });

  Enumerology.Transform.Contains = contains;

}).call(this);

(function() {
  var every;

  every = Enumerology.Transform.extend({
    apply: function(target, collection) {
      return collection.every(this.get('callback'), this.getWithDefault('target', target));
    }
  });

  Enumerology.Transform.Every = every;

}).call(this);

(function() {
  var everyBy;

  everyBy = Enumerology.TransformBy.extend({
    apply: function(target, collection) {
      return collection.everyBy(this.get('key'), this.get('value'));
    }
  });

  Enumerology.Transform.EveryBy = everyBy;

}).call(this);

(function() {
  var filter;

  filter = Enumerology.Transform.extend({
    apply: function(target, collection) {
      return collection.filter(this.get('callback'), this.getWithDefault('target', target));
    }
  });

  Enumerology.Transform.Filter = filter;

}).call(this);

(function() {
  var filterBy;

  filterBy = Enumerology.TransformBy.extend({
    apply: function(target, collection) {
      return collection.filterBy(this.get('key'), this.get('value'));
    }
  });

  Enumerology.Transform.FilterBy = filterBy;

}).call(this);

(function() {
  var find;

  find = Enumerology.Transform.extend({
    apply: function(target, collection) {
      return collection.find(this.get('callback'), this.getWithDefault('target', target));
    }
  });

  Enumerology.Transform.Find = find;

}).call(this);

(function() {
  var findBy;

  findBy = Enumerology.TransformBy.extend({
    apply: function(target, collection) {
      return collection.findBy(this.get('key'), this.get('value'));
    }
  });

  Enumerology.Transform.FindBy = findBy;

}).call(this);

(function() {
  var invoke,
    __slice = [].slice;

  invoke = Enumerology.Transform.extend({
    apply: function(target, collection) {
      return collection.invoke.apply(collection, [this.get('methodName')].concat(__slice.call(this.getWithDefault('args', []))));
    }
  });

  Enumerology.Transform.Invoke = invoke;

}).call(this);

(function() {
  var length;

  length = Enumerology.Transform.extend({
    apply: function(target, collection) {
      return collection.get('length');
    }
  });

  Enumerology.Transform.Length = length;

}).call(this);

(function() {
  var map;

  map = Enumerology.Transform.extend({
    apply: function(target, collection) {
      return collection.map(this.get('callback'), this.getWithDefault('target', target));
    }
  });

  Enumerology.Transform.Map = map;

}).call(this);

(function() {
  var mapBy;

  mapBy = Enumerology.TransformBy.extend({
    apply: function(target, collection) {
      return collection.mapBy(this.get('key'));
    }
  });

  Enumerology.Transform.MapBy = mapBy;

}).call(this);

(function() {
  var reduce;

  reduce = Enumerology.Transform.extend({
    apply: function(target, collection) {
      return collection.reduce(this.get('callback'), this.get('initialValue'));
    }
  });

  Enumerology.Transform.Reduce = reduce;

}).call(this);

(function() {
  var reject;

  reject = Enumerology.Transform.extend({
    apply: function(target, collection) {
      return collection.reject(this.get('callback'), this.getWithDefault('target', target));
    }
  });

  Enumerology.Transform.Reject = reject;

}).call(this);

(function() {
  var rejectBy;

  rejectBy = Enumerology.TransformBy.extend({
    apply: function(target, collection) {
      return collection.rejectBy(this.get('key'), this.get('value'));
    }
  });

  Enumerology.Transform.RejectBy = rejectBy;

}).call(this);

(function() {
  var setEach;

  setEach = Enumerology.TransformBy.extend({
    apply: function(target, collection) {
      collection.setEach(this.get('key'), this.get('value'));
      return collection;
    }
  });

  Enumerology.Transform.SetEach = setEach;

}).call(this);

(function() {
  var uniq;

  uniq = Enumerology.Transform.extend({
    apply: function(target, collection) {
      return collection.uniq(this.get('value'));
    }
  });

  Enumerology.Transform.Uniq = uniq;

}).call(this);

(function() {
  var without;

  without = Enumerology.Transform.extend();

  Enumerology.Transform.Without = without;

}).call(this);