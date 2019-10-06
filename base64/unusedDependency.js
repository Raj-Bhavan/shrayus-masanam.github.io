'use strict'
(function(window) {
  /**
   * @return {?}
   */
  function require() {
    return window && window.INSTALL_SCOPE ? window.INSTALL_SCOPE : window;
  }
  /**
   * @return {?}
   */
  function now() {
    return (new Date).getTime();
  }
  /**
   * @param {?} target
   * @param {!Function} fn
   * @return {?}
   */
  function bind(target, fn) {
    return function() {
      return fn.apply(target, arguments);
    };
  }
  /**
   * @param {!Object} object
   * @param {!Function} callback
   * @param {!Window} context
   * @return {?}
   */
  function each(object, callback, context) {
    if (typeof object.forEach == "function") {
      object.forEach(callback, context);
      return object;
    }
    var i;
    for (i in object) {
      if (object.hasOwnProperty(i)) {
        callback.call(context || window, object[i], i);
      }
    }
    return object;
  }
  /**
   * @param {!Element} obj
   * @param {string} type
   * @param {string} fn
   * @return {undefined}
   */
  function on(obj, type, fn) {
    if (obj.addEventListener) {
      obj.addEventListener(type, fn, false);
    } else {
      if (obj.attachEvent) {
        /** @type {string} */
        obj["e" + type + fn] = fn;
        /**
         * @return {?}
         */
        obj[type + fn] = function() {
          return obj["e" + type + fn](window.event);
        };
        obj.attachEvent("on" + type, obj[type + fn]);
      }
    }
  }
  /**
   * @param {!Element} elem
   * @param {string} type
   * @param {string} fn
   * @return {undefined}
   */
  function removeEvent(elem, type, fn) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, fn, false);
    } else {
      if (elem.detachEvent) {
        elem.detachEvent("on" + type, elem[type + fn]);
        /** @type {null} */
        elem[type + fn] = null;
        /** @type {null} */
        elem["e" + type + fn] = null;
      }
    }
  }
  /**
   * @param {!Event} event
   * @return {undefined}
   */
  function stopEvent(event) {
    if (event.stopPropogation) {
      event.stopPropogation();
    }
    if (event.preventDefault) {
      event.preventDefault();
    }
    /** @type {boolean} */
    event.returnValue = false;
  }
  /**
   * @param {!Node} element1
   * @param {!Array} element2
   * @return {?}
   */
  function contains(element1, element2) {
    if (element.contains) {
      return element1.contains(element2);
    }
    return !!(element1.compareDocumentPosition(element2) & 16);
  }
  /**
   * @param {?} charCode
   * @return {?}
   */
  function select(charCode) {
    var e = {
      38 : "up",
      40 : "down",
      37 : "left",
      39 : "right",
      27 : "esc"
    };
    if (e[charCode]) {
      return e[charCode];
    }
    return String.fromCharCode(charCode);
  }
  /**
   * @param {number} height
   * @param {number} max
   * @return {?}
   */
  function f(height, max) {
    return Math.floor(Math.random() * (max - height + 1) + height);
  }
  /**
   * @param {!Element} element
   * @return {?}
   */
  function getBoundingClientRect(element) {
    if (typeof element.getBoundingClientRect === "function") {
      var rect = element.getBoundingClientRect();
      var winX = window.pageXOffset;
      var winY = window.pageYOffset;
      return {
        width : rect.width,
        height : rect.height,
        left : rect.left + winX,
        top : rect.top + winY
      };
    }
    rect = {
      width : element.offsetWidth,
      height : element.offsetHeight,
      left : 0,
      top : 0
    };
    /** @type {!Element} */
    var parent = element;
    for (; parent;) {
      rect.left += parent.offsetLeft;
      rect.top += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return rect;
  }
  /**
   * @return {?}
   */
  function getCompatElement() {
    /** @type {!HTMLDocument} */
    var doc = document;
    return !doc.compatMode || doc.compatMode == "CSS1Compat" ? doc.documentElement : doc.body;
  }
  /**
   * @return {?}
   */
  function getSize() {
    var doc = getCompatElement();
    var values = {
      x : doc.clientWidth,
      y : doc.clientHeight
    };
    /** @type {!HTMLBodyElement} */
    var body = document.body;
    return {
      x : Math.max(doc.scrollWidth, body.scrollWidth, values.x),
      y : Math.max(doc.scrollHeight, body.scrollHeight, values.y)
    };
  }
  /**
   * @param {!Node} elem
   * @param {?} name
   * @return {?}
   */
  function getStyle(elem, name) {
    if (elem.style[name]) {
      return elem.style[name];
    }
    if (elem.currentStyle) {
      return elem.currentStyle[name];
    }
    return document.defaultView.getComputedStyle(elem, null).getPropertyValue(name);
  }
  /**
   * @param {!Element} element
   * @param {!Object} props
   * @return {undefined}
   */
  function extend(element, props) {
    var key;
    for (key in props) {
      if (props.hasOwnProperty(key)) {
        var value = props[key];
        if (typeof value === "number" && key !== "opacity" && key !== "zIndex") {
          /** @type {string} */
          value = value + "px";
        }
        element.style[key] = value;
      }
    }
  }
  /**
   * @param {!Object} element
   * @param {string} className
   * @return {?}
   */
  function hasClass(element, className) {
    return element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
  }
  /**
   * @param {!Object} elem
   * @param {string} className
   * @return {undefined}
   */
  function removeClass(elem, className) {
    if (!hasClass(elem, className)) {
      elem.className += " " + className;
    }
  }
  /**
   * @param {!Object} el
   * @param {string} cls
   * @return {undefined}
   */
  function initialize(el, cls) {
    if (hasClass(el, cls)) {
      /** @type {!RegExp} */
      var hideClassRegExp = new RegExp("(\\s|^)" + cls + "(\\s|$)");
      el.className = el.className.replace(hideClassRegExp, " ");
    }
  }
  /**
   * @param {!Node} to
   * @return {?}
   */
  function closest(to) {
    return to.cloneNode(true);
  }
  /**
   * @param {string} el
   * @param {!Object} obj
   * @return {?}
   */
  function $(el, obj) {
    /** @type {!Element} */
    var node = document.createElement(el);
    var key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === "styles") {
          extend(node, obj[key]);
        } else {
          node[key] = obj[key];
        }
      }
    }
    return node;
  }
  /**
   * @param {number} delay
   * @param {!Function} callback
   * @param {?} object
   * @return {?}
   */
  function delay(delay, callback, object) {
    return setTimeout(bind(object, callback), delay);
  }
  /**
   * @return {?}
   */
  function find() {
    if (config.KICKASS_CONTAINER_ELEMENT) {
      return document.getElementById(config.KICKASS_CONTAINER_ELEMENT);
    } else {
      return document.body;
    }
  }
  var JSONP = function() {
    /**
     * @param {string} url
     * @return {undefined}
     */
    function load(url) {
      /** @type {!Element} */
      var script = document.createElement("script");
      /** @type {boolean} */
      var done = false;
      /** @type {string} */
      script.src = url;
      /** @type {boolean} */
      script.async = true;
      /** @type {function(): undefined} */
      script.onload = script.onreadystatechange = function() {
        if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
          /** @type {boolean} */
          done = true;
          /** @type {null} */
          script.onload = script.onreadystatechange = null;
          if (script && script.parentNode) {
            script.parentNode.removeChild(script);
          }
        }
      };
      if (!parentElement) {
        /** @type {!Element} */
        parentElement = document.getElementsByTagName("head")[0];
        if (!parentElement) {
          /** @type {!HTMLBodyElement} */
          parentElement = document.body;
        }
      }
      parentElement.appendChild(script);
    }
    /**
     * @param {string} url
     * @param {!Object} data
     * @param {?} callback
     * @return {?}
     */
    function jsonp(url, data, callback) {
      /** @type {string} */
      serialisedParams = "?";
      data = data || {};
      for (i in data) {
        if (data.hasOwnProperty(i)) {
          /** @type {string} */
          serialisedParams = serialisedParams + (encodeURIComponent(i) + "=" + encodeURIComponent(data[i]) + "&");
        }
      }
      /** @type {string} */
      var jsonp = "json" + ++counter;
      /**
       * @param {?} identifierPositions
       * @return {undefined}
       */
      window[jsonp] = function(identifierPositions) {
        callback(identifierPositions);
        try {
          delete window[jsonp];
        } catch (e) {
        }
        /** @type {null} */
        window[jsonp] = null;
      };
      load(url + serialisedParams + "callback=" + jsonp);
      return jsonp;
    }
    /** @type {number} */
    var counter = 0;
    var parentElement;
    var serialisedParams;
    var i;
    var window = this;
    return {
      get : jsonp
    };
  }();
  var self = {
    request : function(url, data, callback) {
      if (this.calledByExtension()) {
        /** @type {!Function} */
        this._callbacks[this._callbackId++] = callback;
        window.postMessage(JSON.stringify({
          from : "kickassapp-page",
          url : url,
          type : "callApi",
          params : data
        }), "*");
        return;
      }
      data = data || {};
      /** @type {string} */
      var path = "?";
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          /** @type {string} */
          path = path + (encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&");
        }
      }
      /** @type {!XMLHttpRequest} */
      var xhr = new XMLHttpRequest;
      /**
       * @return {undefined}
       */
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          callback(JSON.parse(xhr.responseText));
        }
      };
      xhr.open("GET", url + path);
      /** @type {boolean} */
      xhr.withCredentials = true;
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send();
    },
    calledByExtension : function() {
      return !!document.getElementById("kickass-has-been-initialized-yes-yes-yes");
    },
    _callbacks : {},
    _callbackId : 0
  };
  if (self.calledByExtension()) {
    window.addEventListener("message", function(textFile) {
      var effect;
      try {
        /** @type {*} */
        effect = JSON.parse(textFile.data);
      } catch (e) {
        return;
      }
      if (effect.from === "kickassapp-extension" && effect.sanityCheck === "kickassapp-extension-version1") {
        var message = effect.payload;
        if (message.type === "response") {
          self._callbacks[message.requestId](message.body);
          delete self._callbacks[message.requestId];
        } else {
          if (message.type === "destroy") {
            window.KICKASSGAME.destroy();
          }
        }
      }
    }, false);
  }
  /**
   * @param {!Object} c
   * @return {?}
   */
  var Class = function(c) {
    /**
     * @return {?}
     */
    var klass = function() {
      if (klass.$prototyping) {
        return this;
      }
      if (typeof this.initialize == "function") {
        return this.initialize.apply(this, arguments);
      }
    };
    if (c.Extends) {
      klass.parent = c.Extends;
      /** @type {boolean} */
      c.Extends.$prototyping = true;
      klass.prototype = new c.Extends;
      /** @type {boolean} */
      c.Extends.$prototyping = false;
    }
    var n;
    for (n in c) {
      if (c.hasOwnProperty(n)) {
        klass.prototype[n] = c[n];
      }
    }
    return klass;
  };
  if (typeof exports != "undefined") {
    /** @type {function(!Object): ?} */
    exports.Class = Class;
  }
  var Vector = new Class({
    initialize : function(x, y) {
      if (typeof x == "object") {
        this.x = x.x;
        this.y = x.y;
      } else {
        /** @type {string} */
        this.x = x;
        /** @type {number} */
        this.y = y;
      }
    },
    cp : function() {
      return new Vector(this.x, this.y);
    },
    mul : function(factor) {
      this.x *= factor;
      this.y *= factor;
      return this;
    },
    mulNew : function(factor) {
      return new Vector(this.x * factor, this.y * factor);
    },
    div : function(val) {
      this.x /= val;
      this.y /= val;
      return this;
    },
    divNew : function(length) {
      return new Vector(this.x / length, this.y / length);
    },
    add : function(value) {
      this.x += value.x;
      this.y += value.y;
      return this;
    },
    addNew : function(p) {
      return new Vector(this.x + p.x, this.y + p.y);
    },
    sub : function(other) {
      this.x -= other.x;
      this.y -= other.y;
      return this;
    },
    subNew : function(vec) {
      return new Vector(this.x - vec.x, this.y - vec.y);
    },
    rotate : function(theta) {
      var oldX = this.x;
      var oldY = this.y;
      /** @type {number} */
      this.x = oldX * Math.cos(theta) - Math.sin(theta) * oldY;
      /** @type {number} */
      this.y = oldX * Math.sin(theta) + Math.cos(theta) * oldY;
      return this;
    },
    rotateNew : function(angle) {
      return this.cp().rotate(angle);
    },
    setAngle : function(a) {
      var d = this.len();
      /** @type {number} */
      this.x = Math.cos(a) * d;
      /** @type {number} */
      this.y = Math.sin(a) * d;
      return this;
    },
    setAngleNew : function(angle) {
      return this.cp().setAngle(angle);
    },
    setLength : function(length) {
      var l = this.len();
      if (l) {
        this.mul(length / l);
      } else {
        this.x = this.y = length;
      }
      return this;
    },
    setLengthNew : function(length) {
      return this.cp().setLength(length);
    },
    normalize : function() {
      var len = this.len();
      if (len == 0) {
        return this;
      }
      this.x /= len;
      this.y /= len;
      return this;
    },
    normalizeNew : function() {
      return this.cp().normalize();
    },
    angle : function() {
      return Math.atan2(this.y, this.x);
    },
    collidesWith : function(rect) {
      return this.x > rect.x && this.y > rect.y && this.x < rect.x + rect.width && this.y < rect.y + rect.height;
    },
    len : function() {
      /** @type {number} */
      var length = Math.sqrt(this.x * this.x + this.y * this.y);
      if (length < 0.005 && length > -0.005) {
        return 0;
      }
      return length;
    },
    is : function(v) {
      return typeof v == "object" && this.x == v.x && this.y == v.y;
    },
    dot : function(v) {
      return this.x * v.x + this.y * v.y;
    },
    inTriangle : function(a, b, c) {
      var v0 = c.subNew(a);
      var v1 = b.subNew(a);
      var v2 = p.subNew(a);
      var dot00 = v0.dot(v0);
      var dot01 = v0.dot(v1);
      var dot02 = v0.dot(v2);
      var dot11 = v1.dot(v1);
      var dot12 = v1.dot(v2);
      /** @type {number} */
      var scale = 1 / (dot00 * dot11 - dot01 * dot01);
      /** @type {number} */
      var u = (dot11 * dot02 - dot01 * dot12) * scale;
      /** @type {number} */
      var v = (dot00 * dot12 - dot01 * dot02) * scale;
      return u > 0 && v > 0 && u + v < 1;
    },
    distanceFrom : function(b) {
      return Math.sqrt(Math.pow(this.x - b.x, 2), Math.pow(this.y - b.y, 2));
    },
    toString : function() {
      return "[Vector(" + this.x + ", " + this.y + ") angle: " + this.angle() + ", length: " + this.len() + "]";
    }
  });
  if (typeof exports != "undefined") {
    exports.Vector = Vector;
  }
  var Rectangle = new Class({
    initialize : function(x, y, w, h) {
      this.pos = new Vector(x, y);
      this.size = {
        width : w,
        height : h
      };
    },
    hasPoint : function(a) {
      return a.x > this.getLeft() && a.x < this.getRight() && a.y > this.getTop() && a.y < this.getBottom();
    },
    setLeft : function(x) {
      this.pos.x = x + this.size.width / 2;
    },
    setTop : function(y) {
      this.pos.y = y + this.size.height / 2;
    },
    getLeft : function() {
      return this.pos.x - this.size.width / 2;
    },
    getTop : function() {
      return this.pos.y - this.size.height / 2;
    },
    getRight : function() {
      return this.pos.x + this.size.width / 2;
    },
    getBottom : function() {
      return this.pos.y + this.size.height / 2;
    },
    cp : function() {
      return new Rectangle(this.pos.x, this.pos.y, this.size.width, this.size.height);
    }
  });
  if (typeof exports != "undefined") {
    exports.Rect = Rectangle;
  }
  var ToolbarWidget = new Class({
    initialize : function() {
      /** @type {!Array} */
      this.listeners = [];
      this.tweens = {};
      this.running = {};
    },
    addListener : function(callback) {
      this.listeners.push(callback);
    },
    add : function(name, options) {
      options = options || {};
      options.duration = options.duration || 500;
      options.transition = options.transition || Functions.Linear;
      options.repeats = typeof options.repeats == "undefined" ? false : options.repeats;
      if (!options.tweens) {
        var start = options.start || 0;
        var end = typeof options.end == "undefined" ? 1 : options.end;
        /** @type {!Array} */
        options.tweens = [[start, end]];
      }
      /** @type {!Object} */
      this.tweens[name] = options;
    },
    update : function(entity) {
      entity = typeof entity === "number" ? entity : now();
      var name;
      for (name in this.tweens) {
        if (this.tweens.hasOwnProperty(name)) {
          if (!this.running[name]) {
            this.tweenStart(name, entity);
            continue;
          }
          var self = this.tweens[name];
          /** @type {number} */
          var elapsed = entity - this.running[name].startTime;
          if (elapsed > self.duration) {
            this.tweenFinished(self, name);
            continue;
          }
          var e = self.transition(elapsed / self.duration);
          /** @type {!Array} */
          var files = [];
          /** @type {number} */
          var i = 0;
          var f;
          for (; f = self.tweens[i]; i++) {
            var md5file = e * (f[1] - f[0]) + f[0];
            files.push(md5file);
          }
          this.fire(name, files, e);
        }
      }
    },
    tweenStart : function(name, time) {
      this.running[name] = {
        startTime : time
      };
      /** @type {!Array} */
      var nodes = [];
      /** @type {number} */
      var type = 0;
      var map;
      for (; map = this.tweens[name].tweens[type]; type++) {
        nodes.push(map[0]);
      }
      this.fire(name, nodes, 0);
    },
    tweenFinished : function(self, name) {
      /** @type {!Array} */
      var nodes = [];
      /** @type {number} */
      var type = 0;
      var map;
      for (; map = self.tweens[type]; type++) {
        nodes.push(map[1]);
      }
      this.fire(name, nodes, 1);
      if (!self.repeats) {
        delete this.running[name];
        delete this.tweens[name];
        return;
      }
      this.tweenStart(name, now());
    },
    fire : function(data, start, tag) {
      /** @type {number} */
      var i = 0;
      var item;
      for (; item = this.listeners[i]; i++) {
        item.set.call(item, data, start, tag);
      }
    }
  });
  var Functions = {
    Linear : function(_amount) {
      return _amount;
    },
    Quadratic : function(min) {
      return min * min;
    },
    Quintic : function(y) {
      return y * y * y;
    },
    Shake : function(radius) {
      return Math.sin(radius);
    }
  };
  var data = {
    FPS : 60,
    useAnimationFrame : false,
    boids : {
      flockRadius : 400,
      size : 100
    },
    path : function() {
      return "https://kickassapp.com/" + Array.prototype.slice.call(arguments).join("");
    },
    hasCanvas : typeof document.createElement("canvas").getContext !== "undefined",
    bulletColor : "black"
  };
  window.GameGlobals = data;
  if (!Array.prototype.indexOf) {
    /**
     * @param {string} searchElement
     * @param {number=} p1
     * @return {number}
     * @template T
     */
    Array.prototype.indexOf = function(searchElement) {
      if (this === void 0 || this === null) {
        throw new TypeError;
      }
      /** @type {!Object} */
      var O = Object(this);
      /** @type {number} */
      var len = O.length >>> 0;
      if (len === 0) {
        return -1;
      }
      /** @type {number} */
      var n = 0;
      if (arguments.length > 0) {
        /** @type {number} */
        n = Number(arguments[1]);
        if (n !== n) {
          /** @type {number} */
          n = 0;
        } else {
          if (n !== 0 && n !== 1 / 0 && n !== -(1 / 0)) {
            /** @type {number} */
            n = (n > 0 || -1) * Math.floor(Math.abs(n));
          }
        }
      }
      if (n >= len) {
        return -1;
      }
      /** @type {number} */
      var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
      for (; k < len; k++) {
        if (k in O && O[k] === searchElement) {
          return k;
        }
      }
      return -1;
    };
  }
  var setTimeout = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(rafFunction, canCreateDiscussions) {
      window.setTimeout(rafFunction, 1000 / 60);
    };
  }();
  var User = new Class({
    initialize : function(options) {
      if (options && options.mySite) {
        this.mySite = options.mySite;
      }
      /** @type {!Array} */
      this.players = [];
      /** @type {!Array} */
      this.elements = [];
      this.weaponClass = activeOutputs[1].cannonClass;
      this.scrollPos = new Vector(0, 0);
      this.scrollSize = new Vector(0, 0);
      this.windowSize = {
        width : 0,
        height : 0
      };
      this.updateWindowInfo();
      this.bulletManager = new InspectorHighlighter(this);
      this.bulletManager.updateEnemyIndex();
      this.explosionManager = new WindowTree(this);
      this.ui = new UI(this);
      this.bombManager = new HeaderBox(this);
      this.menuManager = new WindowDetails(this);
      this.menuManager.create();
      if (typeof WindowsTab !== "undefined") {
        this.statisticsManager = new WindowsTab(this);
      }
      this.sessionManager = new PixmapsList(this);
      this.lastUpdate = now();
      this.keyMap = {};
      this.keydownEvent = bind(this, this.keydown);
      this.keyupEvent = bind(this, this.keyup);
      /** @type {number} */
      this.multiplier = 10;
      if (this.isCampaign()) {
        this.audioManager = {
          explosion : new PixmapsTab(data.path("static/sounds/game/explosion"), ["mp3", "ogg"]),
          shot : new PixmapsTab(data.path("static/sounds/game/shot"), ["mp3", "ogg"])
        };
      } else {
        this.audioManager = {};
      }
      if (window.KickAssStyle && window.KickAssStyle === "white") {
        /** @type {string} */
        data.bulletColor = "white";
      }
      on(document, "keydown", this.keydownEvent);
      on(document, "keyup", this.keyupEvent);
      on(document, "keypress", this.keydownEvent);
    },
    begin : function() {
      this.addPlayer();
      /** @type {boolean} */
      this.sessionManager.isPlaying = true;
      if (!data.useAnimationFrame) {
        this.loopTimer = window.setInterval(bind(this, this.loop), 1000 / data.FPS);
      }
      if (data.useAnimationFrame) {
        setTimeout(bind(this, this.loop));
      }
    },
    keydown : function(event) {
      var key = select(event.keyCode);
      /** @type {boolean} */
      this.keyMap[key] = true;
      switch(key) {
        case "left":
        case "right":
        case "up":
        case "down":
        case "esc":
        case " ":
          stopEvent(event);
          break;
      }
      switch(key) {
        case "esc":
          this.destroy();
          break;
      }
    },
    keyup : function(event) {
      var keyCode = select(event.keyCode);
      /** @type {boolean} */
      this.keyMap[keyCode] = false;
      switch(keyCode) {
        case "left":
        case "right":
        case "up":
        case "down":
        case "esc":
        case " ":
          if (event.stopPropogation) {
            event.stopPropogation();
          }
          if (event.preventDefault) {
            event.preventDefault();
          }
          /** @type {boolean} */
          event.returnValue = false;
          break;
      }
    },
    loop : function() {
      var currentTime = now();
      /** @type {number} */
      var tDelta = (currentTime - this.lastUpdate) / 1000;
      this.updateWindowInfo();
      /** @type {number} */
      var i = 0;
      var player;
      for (; player = this.players[i]; i++) {
        player.update(tDelta);
      }
      this.bulletManager.update(tDelta);
      this.bombManager.update(tDelta);
      this.explosionManager.update(tDelta);
      this.ui.update(tDelta);
      if (this.statisticsManager) {
        this.statisticsManager.update(tDelta);
      }
      this.sessionManager.update(tDelta);
      this.lastUpdate = currentTime;
      if (data.useAnimationFrame) {
        setTimeout(bind(this, this.loop));
      }
    },
    addPlayer : function() {
      /** @type {boolean} */
      var data = false;
      var list_of_people = Collections.Standard;
      if (window.KICKASSSHIP && window.KICKASSSHIP.points) {
        list_of_people = KICKASSSHIP;
      }
      if (this.mySite && this.mySite.getShipConfig()) {
        list_of_people = this.mySite.getShipConfig();
      }
      var p = new Annotation(this);
      p.setShip(list_of_people);
      this.players.push(p);
      this.explosionManager.addExplosion(p.pos);
    },
    registerElement : function(fn) {
      if (!fn) {
        throw new Error("Can't register unexisting element.");
      }
      this.elements.push(fn);
    },
    unregisterElement : function(element) {
      this.elements.splice(this.elements.indexOf(element), 1);
    },
    isKickAssElement : function(b) {
      /** @type {number} */
      var i = 0;
      var a;
      for (; a = this.elements[i]; i++) {
        if (b === a || contains(a, b)) {
          return true;
        }
      }
      return false;
    },
    isKeyPressed : function(key) {
      return !!this.keyMap[key];
    },
    updateWindowInfo : function() {
      /** @type {boolean} */
      var isIEQuirks = !!window.ActiveXObject && document.compatMode == "BackCompat";
      this.windowSize = {
        width : document.documentElement.clientWidth,
        height : document.documentElement.clientHeight
      };
      if (isIEQuirks) {
        /** @type {number} */
        this.windowSize.width = document.body.clientWidth;
        /** @type {number} */
        this.windowSize.height = document.body.clientHeight;
      }
      if (this.menuManager && this.menuManager.isVisible()) {
        this.windowSize.height -= this.menuManager.getHeight();
      }
      this.scrollPos.x = window.pageXOffset || document.documentElement.scrollLeft;
      this.scrollPos.y = window.pageYOffset || document.documentElement.scrollTop;
      this.scrollSize = getSize();
    },
    hideAll : function() {
      /** @type {number} */
      var i = 0;
      var d;
      for (; d = this.elements[i]; i++) {
        /** @type {string} */
        d.style.visibility = "hidden";
      }
    },
    showAll : function() {
      /** @type {number} */
      var i = 0;
      var d;
      for (; d = this.elements[i]; i++) {
        /** @type {string} */
        d.style.visibility = "visible";
      }
    },
    updateShips : function(hover, opt_isInitial) {
      if (!opt_isInitial) {
        this.ui.showMessage("You're now flying<br /><em>" + hover.name + "<em>!!");
      }
      /** @type {number} */
      var i = 0;
      var li;
      for (; li = this.players[i]; i++) {
        li.setShip(hover);
      }
    },
    changeWeapon : function(action, label) {
      this.weaponClass = action.cannonClass;
      if (!label) {
        this.ui.showMessage("Changed to " + action.name.toUpperCase() + "!!!!");
      }
      /** @type {number} */
      var i = 0;
      var player;
      for (; player = this.players[i]; i++) {
        player.setCannons(action.cannonClass);
      }
    },
    changeWeaponById : function(id, run) {
      if (activeOutputs[id]) {
        this.changeWeapon(activeOutputs[id], run);
      }
    },
    flyOutPlayers : function(options, suggestedVariableValueCallback) {
      /** @type {number} */
      var id = 0;
      var map;
      for (; map = this.players[id]; id++) {
        map.flyTo(options, -map.size.height);
        /** @type {boolean} */
        map.isBound = false;
      }
    },
    flyInPlayers : function() {
      /** @type {number} */
      var id = 0;
      var map;
      for (; map = this.players[id]; id++) {
        map.flyTo(map.pos.x, 100, function() {
          /** @type {boolean} */
          this.isBound = true;
        });
      }
    },
    newRank : function(pasted) {
      this.ui.showMessage("OMG. You leveled up to: <strong>" + pasted + "</strong>!<br /><small>Be sure to check what cool new stuff you get in the menu.</small>");
    },
    fireBomb : function() {
      this.bombManager.blow();
    },
    destroy : function() {
      removeEvent(document, "keydown", this.keydownEvent);
      removeEvent(document, "keypress", this.keydownEvent);
      removeEvent(document, "keyup", this.keyupEvent);
      /** @type {number} */
      var i = 0;
      var player;
      for (; player = this.players[i]; i++) {
        player.destroy();
      }
      this.bulletManager.destroy();
      this.explosionManager.destroy();
      this.menuManager.destroy();
      if (!data.useAnimationFrame) {
        clearInterval(this.loopTimer);
      }
      /** @type {boolean} */
      require().KICKASSGAME = false;
      if (this.isCampaign()) {
        document.location.reload();
      }
    },
    isCampaign : function() {
      return require().IS_CLOUDFLARE_GAME;
    },
    isMySite : function() {
      return !!require().KICKASS_SITE_KEY;
    },
    shouldShowAd : function() {
      return !this.mySite && !this.isCampaign();
    },
    shouldShowMenu : function() {
      return !this.mySite && !this.isCampaign();
    },
    shouldShowHowToImage : function() {
      return this.mySite || this.isCampaign();
    }
  });
  window.KickAss = User;
  var WindowsTab = new Class({
    initialize : function(game) {
      /** @type {!Object} */
      this.game = game;
      this.data = {};
      this.data.startedPlaying = now();
      /** @type {number} */
      this.data.elementsDestroyed = 0;
      /** @type {number} */
      this.data.shotsFired = 0;
      /** @type {number} */
      this.data.distanceFlownInPixels = 0;
      /** @type {number} */
      this.data.totalPointsThisSession = 0;
      /** @type {number} */
      this.data.usedThrusters = 0;
      /** @type {number} */
      this.lastUpdate = 0;
    },
    usedThrusters : function() {
      /** @type {number} */
      this.data.usedThrusters = 1;
    },
    increaseDistanceWithPixels : function(text) {
      this.data.distanceFlownInPixels += text;
    },
    increasePointsGainedWithPoints : function(text) {
      this.data.totalPointsThisSession += text;
    },
    addShotFired : function() {
      this.data.shotsFired++;
      if (this.game.audioManager.shot) {
        this.game.audioManager.shot.play();
      }
    },
    addElementsDestroyed : function() {
      this.data.elementsDestroyed++;
    },
    update : function(entity) {
      this.lastUpdate += entity;
      if (this.lastUpdate > 0.25) {
        this.syncWithServer();
        /** @type {number} */
        this.lastUpdate = 0;
      }
    },
    syncWithServer : function() {
      /** @type {!Array} */
      var drilldownLevelLabels = [];
      var key;
      for (key in this.data) {
        if (this.data.hasOwnProperty(key)) {
          drilldownLevelLabels.push(key + ":" + this.data[key]);
        }
      }
      this.game.menuManager.sendMessageToMenu("stats:!" + drilldownLevelLabels.join("|"));
    }
  });
  var Tool = new Class({
    initialize : function(a) {
      /** @type {string} */
      this.key = a;
    },
    load : function(localLoad) {
      self.request(data.path("mysite/api.json"), {
        site_key : this.key,
        url : document.location.toString()
      }, bind(this, function(user) {
        if (user && user.embed) {
          this.mySiteData = user.embed;
          localLoad(true);
        } else {
          localLoad(false);
        }
      }));
    },
    install : function() {
    },
    getShipId : function() {
      return this.mySiteData && this.mySiteData.settings.ship;
    },
    getShipConfig : function() {
      return this.mySiteData && this.mySiteData.settings.ship_config;
    },
    getShareURL : function() {
      return this.mySiteData && this.mySiteData.settings.share_url;
    }
  });
  var Menu = new Class({
    initialize : function(game) {
      /** @type {!Object} */
      this.game = game;
      this.size = {
        height : 300
      };
    },
    generate : function(elem) {
      /** @type {!Element} */
      this.container = document.createElement("div");
      /** @type {string} */
      this.container.className = "KICKASSELEMENT";
      /** @type {string} */
      this.container.id = "kickass-profile-menu";
      elem.appendChild(this.container);
      var getdate = require().KICKASSSHIPID || "";
      this.url = data.path("intermediate_postmessage.html?url=" + encodeURIComponent(require().KICKASSURL || document.location.href) + "&origin=" + encodeURIComponent(document.location.href) + "&preship=" + getdate + "&is_campaign=" + (this.game.isCampaign() ? "true" : "") + "&is_mysite=" + (this.game.isMySite() ? "true" : ""));
      /** @type {boolean} */
      this.isSocketReady = false;
      /** @type {!Element} */
      this.socketIframe = document.createElement("iframe");
      /** @type {string} */
      this.socketIframe.frameborder = "0";
      /** @type {string} */
      this.socketIframe.className = "KICKASSELEMENT";
      /** @type {string} */
      this.socketIframe.width = "100%";
      /** @type {string} */
      this.socketIframe.height = this.size.height + "px";
      this.container.appendChild(this.socketIframe);
      /** @type {string} */
      this.menuOrigin = "https://kickassapp.com/".replace(/\/$/, "");
      this.socketIframe.src = this.url;
      this.onMessage = bind(this, function(options) {
        if (options.origin !== this.menuOrigin && options.origin !== this.menuOrigin.replace("http://", "https://")) {
          console.log("ignoring event from", options.origin);
          return;
        }
        var response = options.data;
        if (response === "ready") {
          this.onGameReady();
          return;
        }
        var headersAndBody = response.split(":!");
        if (headersAndBody.length !== 2) {
          return;
        }
        var id = headersAndBody.shift().replace(/^./g, function(hashComponent) {
          return hashComponent.charAt(0).toUpperCase();
        });
        if (typeof this["messageType" + id] === "function") {
          this["messageType" + id](headersAndBody.join(":!"));
        }
      });
      window.addEventListener("message", this.onMessage, false);
      this.game.registerElement(this.container);
    },
    socketPostMessage : function(type) {
      this.socketIframe.contentWindow.postMessage(type, this.menuOrigin);
    },
    onGameReady : function() {
      /** @type {boolean} */
      this.isSocketReady = true;
      this.game.registerElement(this.container.getElementsByTagName("iframe")[0]);
      this.socketPostMessage("url:!" + (require().KICKASSURL || document.location.href));
      if (this.game.statisticsManager) {
        this.game.statisticsManager.syncWithServer();
      }
      this.game.menuManager.onGameReady();
    },
    sendMessage : function(json) {
      if (!this.isSocketReady) {
        return;
      }
      if (json != this.lastMessage) {
        try {
          this.socketPostMessage(json);
        } catch (e) {
        }
        /** @type {string} */
        this.lastMessage = json;
      }
    },
    messageTypeChangeShip : function(style) {
      style = style.split(",");
      var shipId = style[0];
      var contentVal = style[1];
      /** @type {boolean} */
      var isInitial = style[2] === "initial";
      if (this.shipId === shipId) {
        return;
      }
      if (isInitial && require().KICKASSSHIP) {
        return;
      }
      this.shipId = shipId;
      self.request(data.path("designer/ship/" + shipId + "/construction.json"), {
        ship_id : shipId,
        is_initial : isInitial ? "1" : "0"
      }, bind(this, function(context) {
        this.game.updateShips(context.data, isInitial);
        try {
          window.focus();
        } catch (e) {
        }
      }));
      if (!isInitial) {
        this.parent.hideMenu();
      }
    },
    messageTypeChangeWeapon : function(loc, params) {
      this.game.changeWeaponById(loc, params);
    },
    messageTypeSetMultiplier : function(value) {
      /** @type {number} */
      value = parseInt(value, 10);
      if (isNaN(value) || !value) {
        return;
      }
      /** @type {number} */
      this.game.multiplier = value;
    },
    messageTypeNewRank : function(text) {
      this.game.newRank(text);
    },
    messageTypePlayerMessage : function(message) {
      this.game.ui.showMessage(message);
    },
    destroy : function() {
      this.game.unregisterElement(this.container);
      this.game.unregisterElement(this.iframe);
      window.removeEventListener("message", this.onMessage, false);
      this.container.parentNode.removeChild(this.container);
    }
  });
  var WindowDetails = new Class({
    initialize : function(game) {
      /** @type {!Object} */
      this.game = game;
      /** @type {number} */
      this.numPoints = 0;
      if (!require().KICKASS_INLINE_CSS) {
        this.includeCSS(data.path("css/menustyles.css"));
      }
    },
    generateDefaults : function() {
      var id;
      for (id in activeOutputs) {
        if (activeOutputs.hasOwnProperty(id)) {
          this.addWeapon(activeOutputs[id], id);
        }
      }
      this.hideBombMenu();
    },
    create : function() {
      /** @type {!Element} */
      this.container = document.createElement("div");
      /** @type {string} */
      this.container.className = "KICKASSELEMENT KICKASShidden " + (this.game.shouldShowMenu() ? "" : "KICKASSNOMENU");
      /** @type {string} */
      this.container.id = "kickass-menu";
      if (this.game.shouldShowMenu()) {
        /** @type {string} */
        this.container.style.bottom = "-250px";
        /** @type {string} */
        this.container.style.display = "none";
      } else {
        initialize(this.container, "KICKASShidden");
      }
      find().appendChild(this.container);
      /** @type {string} */
      var opt_by = this.game.shouldShowAd() ? '<iframe style="background: transparent" src="' + data.path("hello.html") + '" class="KICKASSELEMENT" id="kickass-hello-sunshine"></iframe>' : "";
      /** @type {string} */
      this.container.innerHTML = '<div id="kickass-howto-image" class="KICKASSELEMENT kickass-howto-invisible"></div>' + '<div id="kickass-pointstab" class="KICKASSELEMENT">' + opt_by + '<div id="kickass-bomb-menu" class="KICKASSELEMENT KICKASShidden">' + '<ul id="kickass-bomb-list" class="KICKASSELEMENT">' + "</ul>" + "</div>" + '<div id="kickass-weapons-menu" class="KICKASSELEMENT KICKASShidden" style="display:none">' + '<ul id="kickass-weapons-list" class="KICKASSELEMENT">' + "</ul>" + "</div>" + 
      '<div id="kickass-pointstab-wrapper" class="KICKASSELEMENT">' + '<div id="kickass-points" class="KICKASSELEMENT">' + this.numPoints + "</div>" + '<div id="kickass-esctoquit" class="KICKASSELEMENT">Press esc to quit</div>' + this.getShareHTML() + "</div>" + '<ul id="kickass-pointstab-menu" class="KICKASSELEMENT" ' + (this.game.shouldShowMenu() ? "" : 'style="display:none"') + ">" + '<li class="KICKASSELEMENT"><a class="KICKASSELEMENT" id="kickass-link-highscores" href="#">Submit score</a></li>' + 
      '<li class="KICKASSELEMENT"><a class="KICKASSELEMENT" id="kickass-link-menu" href="#">Menu</a></li>' + '<li class="last-li KICKASSELEMENT"><a class="KICKASSELEMENT" id="kickass-link-ships" href="#">Switch ship</a></li>' + "</ul>" + "</div>";
      /** @type {(Element|null)} */
      this.pointsTab = document.getElementById("kickass-pointstab");
      /** @type {(Element|null)} */
      this.pointsTabWrapper = document.getElementById("kickass-pointstab-wrapper");
      /** @type {(Element|null)} */
      this.points = document.getElementById("kickass-points");
      /** @type {(Element|null)} */
      this.escToQuit = document.getElementById("kickass-esctoquit");
      /** @type {(Element|null)} */
      this.howToImage = document.getElementById("kickass-howto-image");
      /** @type {(Element|null)} */
      this.weaponsMenu = document.getElementById("kickass-weapons-menu");
      /** @type {(Element|null)} */
      this.weaponsList = document.getElementById("kickass-weapons-list");
      /** @type {(Element|null)} */
      this.bombLink = document.getElementById("kickass-bomb-menu");
      /** @type {(Element|null)} */
      this.submitScoreLink = document.getElementById("kickass-link-highscores");
      /** @type {(Element|null)} */
      this.menuLink = document.getElementById("kickass-link-menu");
      /** @type {(Element|null)} */
      this.switchShipLink = document.getElementById("kickass-link-ships");
      /** @type {!NodeList<Element>} */
      var objs = this.container.getElementsByTagName("*");
      /** @type {number} */
      var i = 0;
      for (; i < objs.length; i++) {
        this.game.registerElement(objs[i]);
      }
      this.game.registerElement(this.container);
      if (this.game.shouldShowMenu()) {
        this.menu = new Menu(this.game);
        this.menu.parent = this;
        this.menu.generate(this.container);
      } else {
        setTimeout(function() {
          this.onGameReady();
        }.bind(this), 100);
      }
      on(this.submitScoreLink, "click", bind(this, function(e) {
        stopEvent(e);
        this.navigateTo("highscores");
      }));
      on(this.menuLink, "click", bind(this, function(e) {
        stopEvent(e);
        this.toggleMenu();
        this.navigateTo("main", true);
      }));
      on(this.switchShipLink, "click", bind(this, function(e) {
        stopEvent(e);
        this.navigateTo("ships");
      }));
      on(this.bombLink, "click", bind(this, function(e) {
        stopEvent(e);
        this.game.fireBomb();
      }));
      on(this.pointsTabWrapper, "click", bind(this, this.toggleMenu));
      on(this.weaponsMenu, "click", bind(this, this.toggleWeaponsMenu));
      this.generateDefaults();
    },
    getShareHTML : function() {
      if (typeof require().KICKASS_SHARE_URL !== "undefined") {
        if (require().KICKASS_SHARE_URL) {
          /** @type {string} */
          var paramValue = encodeURIComponent(require().KICKASS_SHARE_URL);
          return '<iframe class="KICKASSELEMENT kickass-like" src="//www.facebook.com/plugins/share_button.php?href=' + paramValue + '&amp;send=false&amp;layout=button&amp;width=47&amp;show_faces=false&amp;action=like&amp;colorscheme=dark&amp;font=arial&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:21px;" allowTransparency="true"></iframe>';
        } else {
          return "";
        }
      } else {
        /** @type {string} */
        paramValue = "https://www.facebook.com/kickassapp";
        if (this.game.mySite) {
          if (this.game.mySite.getShareURL()) {
            paramValue = this.game.mySite.getShareURL();
          } else {
            return "";
          }
        }
        return '<iframe class="KICKASSELEMENT kickass-like" src="//www.facebook.com/plugins/like.php?href=' + encodeURIComponent(paramValue) + '&amp;send=false&amp;layout=button_count&amp;width=47&amp;show_faces=false&amp;action=like&amp;colorscheme=dark&amp;font=arial&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:21px;" allowTransparency="true"></iframe>';
      }
    },
    onGameReady : function() {
      /** @type {string} */
      this.container.style.display = "block";
      if (this.game.shouldShowHowToImage()) {
        setTimeout(bind(this, function() {
          initialize(this.howToImage, "kickass-howto-invisible");
        }), 10);
        setTimeout(bind(this, function() {
          removeClass(this.howToImage, "kickass-howto-invisible");
        }), 4000);
      }
    },
    navigateTo : function(name, force) {
      if (!force) {
        this.showMenu();
      }
      if (this.menu) {
        this.menu.socketPostMessage("navigate:!" + name);
      }
    },
    toggleMenu : function() {
      if (this.game.shouldShowMenu()) {
        if (hasClass(this.container, "KICKASShidden")) {
          this.showMenu();
        } else {
          this.hideMenu();
        }
      } else {
        this.showMenu();
      }
    },
    toggleWeaponsMenu : function() {
      if (hasClass(this.weaponsMenu, "KICKASShidden")) {
        this.showWeaponsMenu();
      } else {
        this.hideWeaponsMenu();
      }
    },
    hideWeaponsMenu : function() {
      /** @type {string} */
      this.weaponsMenu.style.width = "";
      removeClass(this.weaponsMenu, "KICKASShidden");
    },
    showWeaponsMenu : function() {
      var children = this.weaponsMenu.getElementsByTagName("li");
      children = children[children.length - 1];
      /** @type {string} */
      this.weaponsMenu.style.width = children.offsetLeft + children.offsetWidth - 47 + "px";
      initialize(this.weaponsMenu, "KICKASShidden");
    },
    showMenu : function() {
      if (this.game.shouldShowMenu()) {
        /** @type {string} */
        this.container.style.bottom = "";
        initialize(this.container, "KICKASShidden");
      }
    },
    hideMenu : function() {
      /** @type {string} */
      this.container.style.bottom = "";
      removeClass(this.container, "KICKASShidden");
    },
    showBombMenu : function() {
      /** @type {string} */
      this.bombLink.style.width = "";
    },
    hideBombMenu : function() {
      /** @type {string} */
      this.bombLink.style.width = "0px";
    },
    getHeight : function() {
      return this.container.clientHeight;
    },
    isVisible : function() {
      return !hasClass(this.container, "KICKASShidden");
    },
    addPoints : function(value, color1) {
      /** @type {number} */
      var t = value * this.game.multiplier;
      this.numPoints += t;
      this.points.innerHTML = this.numPoints;
      if (this.game.statisticsManager) {
        this.game.statisticsManager.increasePointsGainedWithPoints(t);
      }
      this.game.ui.addPointsBubbleAt(color1, t);
    },
    includeCSS : function(href) {
      /** @type {!Element} */
      var linkEl = document.createElement("link");
      /** @type {string} */
      linkEl.rel = "stylesheet";
      /** @type {string} */
      linkEl.type = "text/css";
      /** @type {string} */
      linkEl.href = href;
      (document.head || document.body).appendChild(linkEl);
    },
    sendMessageToMenu : function(blob) {
      if (this.menu) {
        this.menu.sendMessage(blob);
      }
    },
    addWeapon : function(item, type) {
      /** @type {!Element} */
      var li = document.createElement("li");
      /** @type {string} */
      li.className = "KICKASSELEMENT kickass-weapon-item";
      /** @type {!Object} */
      li.weapon = item;
      /** @type {string} */
      li.style.backgroundImage = "url(" + data.path("css/gfx/kickass/weap-" + item.id + ".png") + ")";
      /** @type {string} */
      li.innerHTML = '<span class="KICKASSELEMENT">' + item.name + "</span>";
      this.weaponsList.appendChild(li);
      on(li, "click", bind(this, function(e) {
        stopEvent(e);
        this.changeWeapon(item);
        this.sendMessageToMenu("changeWeapon:!" + type);
      }));
    },
    changeWeapon : function(action) {
      this.game.changeWeapon(action);
    },
    destroy : function() {
      var objs = this.container.getElementsByTagName("*");
      /** @type {number} */
      var i = 0;
      for (; i < objs.length; i++) {
        this.game.unregisterElement(objs[i]);
      }
      this.game.unregisterElement(this.container);
      if (this.menu) {
        this.menu.destroy();
      }
      this.container.parentNode.removeChild(this.container);
    }
  });
  var UI = new Class({
    initialize : function(game) {
      /** @type {number} */
      this.UNIQID = 0;
      /** @type {!Object} */
      this.game = game;
      this.pointBubbles = {};
      this.messages = {};
      this.fx = new ToolbarWidget;
      this.fx.addListener(this);
    },
    update : function(entity) {
      this.fx.update();
    },
    set : function(key, options, name) {
      var ids = key.split("-")[0];
      var i = key.split("-")[1];
      if (this.pointBubbles[i]) {
        var elem = this.pointBubbles[i];
        elem.style.top = options[0] + "px";
        elem.style.opacity = options[1];
        if (name == 1 && elem.parentNode) {
          elem.parentNode.removeChild(elem);
          delete this.pointBubbles[i];
        }
      } else {
        if (this.messages[i] && ids == "messagedown") {
          var m = this.messages[i];
          m.style.top = options[0] + "px";
          if (name == 1) {
            setTimeout(bind(this, function() {
              this.fx.add("messageup-" + i, {
                tweens : [[options[0], -100]],
                transition : Functions.Quadratic,
                duration : 300
              });
            }), m.staytime || 4000);
          }
        } else {
          if (this.messages[i] && ids == "messageup") {
            m = this.messages[i];
            m.style.top = options[0] + "px";
            if (name == 1) {
              m.parentNode.removeChild(m);
              delete this.messages[i];
            }
          }
        }
      }
    },
    addPointsBubbleAt : function(a, b) {
      /** @type {string} */
      var id = "bubble" + this.UNIQID++;
      var tabPadding = this.game.scrollPos.y + a.y;
      var i = $("span", {
        innerHTML : b,
        className : "KICKASSELEMENT",
        styles : {
          position : "absolute",
          font : "20px Arial",
          fontWeight : "bold",
          opacity : "1",
          color : "black",
          textShadow : "#fff 1px 1px 3px",
          top : tabPadding,
          zIndex : "10000000"
        }
      });
      /** @type {string} */
      i.style.left = a.x - i.offsetWidth / 2 + "px";
      find().appendChild(i);
      this.pointBubbles[id] = i;
      this.fx.add("bubble-" + id, {
        tweens : [[tabPadding, tabPadding - 15], [1, 0]]
      });
    },
    showMessage : function(name, data) {
      data = data || false;
      /** @type {number} */
      var width = 300;
      /** @type {number} */
      var i = this.UNIQID++;
      var msg = $("div", {
        innerHTML : name,
        className : "KICKASSELEMENT",
        id : "kickass-message-" + i,
        styles : {
          position : "fixed",
          top : -100,
          left : "50%",
          marginLeft : -width / 2,
          width : width,
          background : "#222",
          opacity : 0.8,
          padding : "10px",
          color : "#fff",
          textAlign : "center",
          borderRadius : 15,
          font : "20px Arial",
          fontWeight : "bold",
          zIndex : "10000000"
        }
      });
      /** @type {number} */
      msg.staytime = data;
      find().appendChild(msg);
      var hello_back = this.getLowestBubbleY();
      msg.kickassto = hello_back;
      this.fx.add("messagedown-" + i, {
        duration : 300,
        tweens : [[-100, hello_back]],
        transition : Functions.Quadratic
      });
      this.messages[i] = msg;
      return msg;
    },
    getLowestBubbleY : function() {
      /** @type {number} */
      var maxPrimaryDepth = 100;
      var i;
      for (i in this.messages) {
        if (this.messages.hasOwnProperty(i)) {
          /** @type {number} */
          maxPrimaryDepth = Math.max(this.messages[i].kickassto + this.messages[i].offsetHeight + 10, maxPrimaryDepth);
        }
      }
      return maxPrimaryDepth;
    }
  });
  var PixmapsTab = new Class({
    initialize : function(url, formats) {
      /** @type {string} */
      this.src = url;
      this.formats = formats;
      /** @type {number} */
      channels = 8;
      /** @type {boolean} */
      this.supportsAudio = typeof document.createElement("audio").play != "undefined";
      if (this.supportsAudio) {
        /** @type {number} */
        this.numChannels = channels;
        /** @type {!Array} */
        this.channels = [];
        /** @type {number} */
        var i = 0;
        for (; i < this.numChannels; i++) {
          this.channels.push({
            isPlaying : false,
            element : this.prepareElement(this.buildAudioElement())
          });
        }
      }
    },
    buildAudioElement : function() {
      var types = {
        "ogg" : "audio/ogg",
        "mp3" : "audio/mpeg"
      };
      /** @type {!Element} */
      var obj = document.createElement("audio");
      /** @type {number} */
      var i = 0;
      var ext;
      for (; ext = this.formats[i]; i++) {
        /** @type {!Element} */
        var item = document.createElement("source");
        /** @type {string} */
        item.src = this.src + "." + ext;
        item.type = types[ext];
        obj.appendChild(item);
      }
      return obj;
    },
    prepareElement : function(el) {
      if (typeof el.addEventListener == "undefined") {
        return el;
      }
      var playerActions = this;
      el.addEventListener("ended", function(canCreateDiscussions) {
        playerActions.audioEnded(el);
      }, false);
      return el;
    },
    audioEnded : function(e) {
      /** @type {number} */
      var i = 0;
      var instance;
      for (; instance = this.channels[i]; i++) {
        if (instance.element === e) {
          /** @type {boolean} */
          instance.isPlaying = false;
        }
      }
    },
    play : function() {
      if (!this.supportsAudio) {
        return;
      }
      /** @type {number} */
      var name = 0;
      var self;
      for (; self = this.channels[name]; name++) {
        if (!self.isPlaying) {
          /** @type {boolean} */
          self.isPlaying = true;
          if (typeof self.element.play == "function") {
            self.element.play();
          }
          return;
        }
      }
    }
  });
  var Collections = {
    Standard : {
      points : [[-10, 10], [0, -15], [10, 10]],
      thrusters : [{
        s : {
          w : 20,
          h : 7
        },
        p : {
          x : 0,
          y : 14
        },
        a : 0
      }],
      cannons : [{
        p : {
          x : 0,
          y : -15
        },
        a : 0
      }]
    }
  };
  /** @type {number} */
  var nextProfileItemId = 0;
  var Annotation = new Class({
    initialize : function(game) {
      /** @type {number} */
      this.id = nextProfileItemId++;
      /** @type {!Object} */
      this.game = game;
      /** @type {boolean} */
      this.tween = false;
      /** @type {boolean} */
      this.isBound = true;
      this.pos = new Vector(200, 200);
      this.vel = new Vector(0, 0);
      this.acc = new Vector(0, 0);
      this.dir = new Vector(0, 1);
      /** @type {number} */
      this.currentRotation = 0;
      /** @type {boolean} */
      this.isBroken = false;
      /** @type {!Array} */
      this.lineOffsets = [];
      /** @type {number} */
      this.deadTime = 0;
      /** @type {number} */
      this.friction = 0.8;
      /** @type {number} */
      this.terminalVelocity = 2000;
      this.lastPos = new Vector(0, 0);
    },
    setShip : function(id) {
      /** @type {!Object} */
      this.ship = id;
      /** @type {!Array} */
      this.verts = [];
      /** @type {number} */
      var i = 0;
      var d;
      for (; d = this.ship.points[i]; i++) {
        this.verts.push(new Vector(d[0], d[1]));
      }
      this.verts.push(this.verts[0]);
      /** @type {!Array} */
      this.thrusters = [];
      /** @type {!Array} */
      this.cannons = [];
      this.addThrusters(this.ship.thrusters);
      this.addCannons(this.ship.cannons);
      this.size = this.getSizeFromVertsAndObjects();
      this.bounds = this.calculateBounds();
      if (this.sheet) {
        this.sheet.destroy();
      }
      this.sheet = new Container(new Rectangle(100, 100, this.bounds.x, this.bounds.y));
      /** @type {boolean} */
      this.forceRedraw = true;
    },
    setCannons : function(OBSSource) {
      /** @type {!Array} */
      var tweened = [];
      /** @type {number} */
      var _k = 0;
      var source;
      for (; source = this.cannons[_k]; _k++) {
        var tween = new OBSSource(this, this.game, source.pos.x, source.pos.y, source.angle);
        tweened.push(tween);
        source.destroy();
      }
      /** @type {!Array} */
      this.cannons = tweened;
    },
    addThrusters : function(requests) {
      /** @type {number} */
      var i = 0;
      var request;
      for (; request = requests[i]; i++) {
        var falseySection = new TextSection(request);
        this.thrusters.push(falseySection);
      }
    },
    addCannons : function(respEl) {
      /** @type {number} */
      var chat = 0;
      var data;
      for (; data = respEl[chat]; chat++) {
        var $ = player[data.m] || player.cannon;
        var plugin = new $.cannonClass(this, this.game, data.p.x, data.p.y, data.a);
        plugin.player = this;
        plugin.game = this.game;
        this.cannons.push(plugin);
      }
    },
    update : function(tDelta) {
      if (this.isBroken) {
        if (!this.lineOffsets.length) {
          /** @type {number} */
          var i = 0;
          for (; i < this.verts.length - 1; i++) {
            this.lineOffsets[i] = {
              pos : new Vector(0, 0),
              dir : (new Vector(1, 1)).setAngle(Math.PI * 2 * Math.random())
            };
          }
        }
        /** @type {number} */
        i = 0;
        for (; i < this.lineOffsets.length; i++) {
          this.lineOffsets[i].pos.add(this.lineOffsets[i].dir.cp().setLength(50).mul(tDelta));
        }
        this.sheet.clear();
        this.sheet.setAngle(this.dir.angle());
        this.sheet.setPosition(this.pos);
        this.sheet.drawBrokenPlayer(this.verts, this.lineOffsets);
        if (now() - this.deadTime > 1000.0) {
          /** @type {boolean} */
          this.isBroken = false;
          /** @type {!Array} */
          this.lineOffsets = [];
          this.randomPos();
        }
        return;
      }
      if (!this.tween) {
        if (this.game.isKeyPressed("left") || this.game.isKeyPressed("right")) {
          if (this.game.isKeyPressed("left")) {
            this.rotateLeft(tDelta);
          }
          if (this.game.isKeyPressed("right")) {
            this.rotateRight(tDelta);
          }
        } else {
          this.stopRotate();
        }
        if (this.game.isKeyPressed("up")) {
          this.activateThrusters();
        } else {
          this.stopThrusters();
        }
      }
      if (this.game.isKeyPressed(" ")) {
        /** @type {boolean} */
        this.isShooting = true;
        if (!this.isBroken) {
          this.shootPressed();
        }
      } else {
        if (this.isShooting) {
          /** @type {boolean} */
          this.isShooting = false;
          this.shootReleased();
        }
      }
      if (this.currentRotation) {
        this.dir.setAngle(this.dir.angle() + this.currentRotation * tDelta);
      }
      var children = this.acc.mulNew(tDelta).sub(this.vel.mulNew(tDelta * this.friction));
      this.vel.add(children);
      if (this.vel.len() > this.terminalVelocity) {
        this.vel.setLength(this.terminalVelocity);
      }
      var res = this.vel.mulNew(tDelta);
      this.pos.add(res);
      if (this.game.statisticsManager) {
        this.game.statisticsManager.increaseDistanceWithPixels(res.len());
      }
      /** @type {boolean} */
      var message = !this.acc.is({
        x : 0,
        y : 0
      });
      /** @type {number} */
      i = 0;
      var p;
      for (; p = this.thrusters[i]; i++) {
        p.setIsShown(message);
        p.update(tDelta);
      }
      if (this.isBound) {
        this.checkBounds();
      }
      if (!this.lastPos.is(this.pos) || this.currentRotation || this.forceRedraw) {
        /** @type {boolean} */
        this.forceRedraw = false;
        this.sheet.clear();
        this.sheet.setAngle(this.dir.angle() + Math.PI / 2);
        this.sheet.setPosition(this.pos);
        if (message) {
          /** @type {number} */
          i = 0;
          for (; p = this.thrusters[i]; i++) {
            p.drawTo(this.sheet);
          }
        }
        this.sheet.drawPlayer(this.verts);
        this.lastPos = this.pos.cp();
      }
      /** @type {number} */
      i = 0;
      var body1;
      for (; body1 = this.cannons[i]; i++) {
        body1.update(tDelta);
      }
    },
    randomPos : function() {
      var end = this.game.windowSize.width;
      var height = this.game.windowSize.height;
      this.pos = new Vector(f(0, end), f(0, height));
    },
    checkBounds : function() {
      if (this.tween) {
        return;
      }
      var x = this.game.windowSize.width;
      var y = this.game.windowSize.height;
      var xmax = this.pos.x + this.sheet.rect.size.width / 2;
      var _miny = this.pos.y + this.sheet.rect.size.height / 2;
      if (xmax > x) {
        window.scrollTo(this.game.scrollPos.x + 50, this.game.scrollPos.y);
        /** @type {number} */
        this.pos.x = 0;
      } else {
        if (this.pos.x < 0) {
          window.scrollTo(this.game.scrollPos.x - 50, this.game.scrollPos.y);
          /** @type {number} */
          this.pos.x = x - this.sheet.rect.size.width / 2;
        }
      }
      if (_miny > y) {
        window.scrollTo(this.game.scrollPos.x, this.game.scrollPos.y + y * 0.75);
        /** @type {number} */
        this.pos.y = 0;
      } else {
        if (this.pos.y < 0) {
          window.scrollTo(this.game.scrollPos.x, this.game.scrollPos.y - y * 0.75);
          /** @type {number} */
          this.pos.y = y - this.sheet.rect.size.height / 2;
        }
      }
    },
    inRect : function(rect) {
      /** @type {boolean} */
      var .num_const = false;
      /** @type {number} */
      var i = 0;
      var voxel;
      for (; voxel = this.verts[i]; i++) {
        if (rect.hasPoint(new Vector(voxel.x + this.pos.x, voxel.y + this.pos.y))) {
          /** @type {boolean} */
          .num_const = true;
        }
      }
      return .num_const;
    },
    hit : function(otherPlayerName) {
      if (this.isBroken) {
        return;
      }
      /** @type {boolean} */
      this.isBroken = true;
      this.deadTime = now();
    },
    activateThrusters : function() {
      if (this.game.statisticsManager) {
        this.game.statisticsManager.usedThrusters();
      }
      this.acc = (new Vector(500, 0)).setAngle(this.dir.angle());
    },
    stopThrusters : function() {
      this.acc = new Vector(0, 0);
    },
    rotateLeft : function(event) {
      /** @type {number} */
      this.currentRotation = Math.max(-Math.PI * 2, this.currentRotation - Math.PI * 10 * event);
    },
    rotateRight : function(event) {
      /** @type {number} */
      this.currentRotation = Math.min(Math.PI * 2, this.currentRotation + Math.PI * 10 * event);
    },
    stopRotate : function() {
      /** @type {number} */
      this.currentRotation = 0;
    },
    getSizeFromVertsAndObjects : function() {
      /** @type {number} */
      var height = 0;
      /** @type {number} */
      var i = 0;
      var degree;
      for (; degree = this.verts[i]; i++) {
        /** @type {number} */
        height = Math.max(height, (new Vector(degree)).len());
      }
      /** @type {number} */
      i = 0;
      var particle;
      for (; particle = this.thrusters[i]; i++) {
        var record_summary = (new Vector(particle.pos.x - particle.size.width / 2, particle.pos.y - particle.size.height / 2)).rotate(particle.angle);
        var gos_type_4_lens = (new Vector(particle.pos.x + particle.size.width / 2, particle.pos.y - particle.size.height / 2)).rotate(particle.angle);
        var _dvParser = (new Vector(particle.pos.x - particle.size.width / 2, particle.pos.y + particle.size.height / 2)).rotate(particle.angle);
        var _dvScope = (new Vector(particle.pos.x + particle.size.width / 2, particle.pos.y + particle.size.height / 2)).rotate(particle.angle);
        /** @type {number} */
        height = Math.max(height, record_summary.len(), gos_type_4_lens.len(), _dvParser.len(), _dvScope.len());
      }
      return {
        width : height * 2,
        height : height * 2
      };
    },
    calculateBounds : function() {
      return {
        x : Math.max(this.size.width, this.size.height) * 1,
        y : Math.max(this.size.height, this.size.width) * 1
      };
    },
    shootPressed : function() {
      /** @type {number} */
      var i = 0;
      var node_style_list;
      for (; node_style_list = this.cannons[i]; i++) {
        node_style_list.shootPressed();
      }
    },
    shootReleased : function() {
      /** @type {number} */
      var i = 0;
      var node_style_list;
      for (; node_style_list = this.cannons[i]; i++) {
        node_style_list.shootReleased();
      }
    },
    flyTo : function(to, length, cb) {
      this.tween = {
        start : {
          pos : this.pos.cp(),
          dir : this.dir.cp()
        },
        to : new Vector(to, length),
        callback : cb || function() {
        }
      };
      this.tween.time = this.getTimeforTween();
    },
    destroy : function() {
      this.sheet.destroy();
    }
  });
  var TextSection = new Class({
    initialize : function(b, a) {
      this.pos = new Vector(b.p);
      this.size = {
        width : b.s.w,
        height : b.s.h
      };
      this.angle = b.a || 0;
      /** @type {!Object} */
      this.ship = a;
      /** @type {boolean} */
      this.isShown = false;
      /** @type {number} */
      this.flameY = 1;
      this.fx = new ToolbarWidget;
      this.fx.addListener(this);
      this.flames = {
        r : [],
        y : []
      };
      /** @type {number} */
      this.lastFrameUpdate = 0;
      this.generateFlames();
    },
    update : function(entity) {
      this.fx.update();
      if (now() - this.lastFrameUpdate > 1000 / 60) {
        this.generateFlames();
      }
    },
    set : function(vec_a, vec_b) {
      switch(vec_a) {
        case "flames":
          /** @type {number} */
          this.flameY = vec_b;
          break;
      }
    },
    setIsShown : function(panelId) {
      if (!this.isShown && panelId) {
        /** @type {number} */
        this.flameY = 0.0;
        this.generateFlames();
        this.fx.add("flames", {
          start : this.flameY,
          end : 1,
          duration : 250,
          transition : Functions.Quintic
        });
      }
      /** @type {boolean} */
      this.isShown = panelId;
    },
    drawTo : function(texture) {
      texture.drawFlames(this.flames, this.angle);
    },
    generateFlames : function() {
      /**
       * @param {number} b
       * @param {number} callback
       * @return {?}
       */
      function create(b, callback) {
        return new Vector(b, callback);
      }
      var width = this.size.width;
      /** @type {number} */
      var authDataLen = this.size.width * 0.05;
      /** @type {number} */
      var _t = this.size.width * 0.8;
      /** @type {number} */
      var previousNodeSize = _t * 0.1;
      /** @type {number} */
      var height = width / 2;
      /** @type {number} */
      var position = _t / 2;
      /** @type {number} */
      var offsetY = -this.size.height / 2;
      /** @type {number} */
      var metaY = 0;
      var px = this.pos.x;
      /** @type {number} */
      var t = this.pos.y - this.size.height / 2;
      /** @type {!Array} */
      this.flames.r = [create(-height + px, t)];
      /** @type {!Array} */
      this.flames.y = [create(-position + px, t)];
      this.flames.self = this;
      /** @type {number} */
      var offset = 0;
      for (; offset < width; offset = offset + authDataLen) {
        this.flames.r.push(create(offset - height + px, this.flameY * f(this.size.height * 0.7, this.size.height) + t));
      }
      this.flames.r.push(create(height + px, t));
      /** @type {number} */
      offset = 0;
      for (; offset < _t; offset = offset + previousNodeSize) {
        this.flames.y.push(create(offset - position + px, this.flameY * f(this.size.height * 0.4, this.size.height * 0.7) + t));
      }
      this.flames.y.push(create(position + px, t));
      this.lastFrameUpdate = now();
      var x = create(px, t);
      /** @type {number} */
      var i = 0;
      var p;
      for (; p = this.flames.r[i]; i++) {
        p.sub(x).rotate(this.angle).add(x);
      }
      /** @type {number} */
      i = 0;
      for (; p = this.flames.y[i]; i++) {
        p.sub(x).rotate(this.angle).add(x);
      }
    }
  });
  var HeaderBox = new Class({
    initialize : function(game) {
      /** @type {!Object} */
      this.game = game;
      /** @type {number} */
      this.bombShowDelay = 30;
      /** @type {number} */
      this.nextBomb = this.bombShowDelay;
    },
    update : function(entity) {
      if (this.game.isKeyPressed("F") && this.isReady()) {
        this.blow();
      }
      if (this.nextBomb === -1 || !this.game.sessionManager.isPlaying) {
        return;
      }
      this.nextBomb -= entity;
      if (this.nextBomb < 0) {
        this.game.menuManager.showBombMenu();
        /** @type {number} */
        this.nextBomb = -1;
        this.game.ui.showMessage("BOMB IS READY<br />(lower right corner or F)");
      }
    },
    blow : function() {
      var el = this.game.ui.showMessage("3...", 5000);
      delay(1000, function() {
        /** @type {string} */
        el.innerHTML = "2...";
      }, this);
      delay(2000, function() {
        /** @type {string} */
        el.innerHTML = "1...";
      }, this);
      delay(3000, function() {
        /** @type {string} */
        el.innerHTML = "boom";
      }, this);
      delay(3000, this.blowStuffUp, this);
      this.nextBomb = this.bombShowDelay;
    },
    blowStuffUp : function() {
      this.game.bulletManager.updateEnemyIndex();
      var toolbars = this.game.bulletManager.enemyIndex;
      /** @type {number} */
      var i = 0;
      var el;
      for (; (el = toolbars[i]) && i < 10; i++) {
        var rect = getBoundingClientRect(el);
        var end = new Vector(rect.left + rect.width / 2, rect.top + rect.height / 2);
        this.game.explosionManager.addExplosion(end, el, validator);
        el.parentNode.removeChild(el);
      }
      this.game.menuManager.hideBombMenu();
      this.nextBomb = this.bombShowDelay;
    },
    isReady : function() {
      return this.nextBomb === -1;
    }
  });
  /** @type {!Array} */
  var t = ["BR", "SCRIPT", "STYLE", "TITLE", "META", "HEAD", "OPTION", "OPTGROUP", "LINK"];
  /** @type {number} */
  var minSize = 5;
  var InspectorHighlighter = new Class({
    initialize : function(game) {
      /** @type {!Object} */
      this.game = game;
      /** @type {number} */
      this.lastBlink = 0;
      /** @type {boolean} */
      this.blinkActive = false;
      /** @type {!Array} */
      this.enemyIndex = [];
      /** @type {number} */
      this.updateDelay = 2.5;
      /** @type {number} */
      this.nextUpdate = this.updateDelay;
    },
    update : function(entity) {
      if (this.game.isKeyPressed("B")) {
        this.blink();
      } else {
        if (this.blinkActive) {
          this.endBlink();
        }
      }
      this.nextUpdate -= entity;
      if (this.nextUpdate < 0) {
        this.updateEnemyIndex();
      }
    },
    blink : function() {
      if (now() - this.lastBlink > 250) {
        /** @type {number} */
        var i = 0;
        var textArea;
        for (; textArea = this.enemyIndex[i]; i++) {
          if (!this.blinkActive) {
            /** @type {string} */
            textArea.style.outline = "1px solid red";
          } else {
            textArea.style.outline = textArea.KICKASSOLDBORDER;
          }
        }
        /** @type {boolean} */
        this.blinkActive = !this.blinkActive;
        this.lastBlink = now();
        if (!this.blinkActive) {
          this.updateEnemyIndex();
        }
      }
    },
    endBlink : function() {
      /** @type {number} */
      var i = 0;
      var textArea;
      for (; textArea = this.enemyIndex[i]; i++) {
        textArea.style.outline = textArea.KICKASSOLDBORDER;
      }
      /** @type {number} */
      this.lastBlink = 0;
      /** @type {boolean} */
      this.blinkActive = false;
    },
    updateEnemyIndex : function() {
      /** @type {!NodeList<Element>} */
      var tooldivs = document.getElementsByTagName("*");
      /** @type {!Array} */
      this.enemyIndex = [];
      /** @type {number} */
      var i = 0;
      var target;
      for (; target = tooldivs[i]; i++) {
        if (this.isDestroyable(target)) {
          this.enemyIndex.push(target);
          target.KICKASSOLDBORDER = target.style.outline || document.defaultView.getComputedStyle(target, null).outline;
        }
      }
      this.nextUpdate = this.updateDelay;
    },
    isDestroyable : function(x, y) {
      if (this.shouldIgnoreElement(x, y)) {
        return false;
      }
      /** @type {number} */
      var j = 0;
      var inner;
      for (; inner = x.childNodes[j]; j++) {
        if (inner.nodeType === 1 && t.indexOf(inner.tagName) === -1 && (inner.offsetWidth >= minSize && inner.offsetHeight >= minSize) && document.defaultView.getComputedStyle(inner, null).visibility !== "hidden") {
          return false;
        }
      }
      return true;
    },
    isDestroyableFromCollision : function(paramName) {
      return this.isDestroyable(paramName, true);
    },
    shouldIgnoreElement : function(el, h) {
      if (el.nodeType !== 1) {
        return true;
      }
      if (el == document.documentElement || el == document.body) {
        return true;
      }
      if (t.indexOf(el.tagName) !== -1) {
        return true;
      }
      if (el.style.visibility == "hidden" || el.style.display == "none") {
        return true;
      }
      if (typeof el.className == "string" && el.className.indexOf("KICKASSELEMENT") != -1) {
        return true;
      }
      if (!h) {
        if (el.offsetWidth < minSize || el.offsetHeight < minSize) {
          return true;
        }
      }
      var rect;
      if (el.offsetLeft < 0 || el.offsetTop < 0) {
        rect = getBoundingClientRect(el);
        if (rect.left + rect.width < 0 || rect.top + rect.height < 0) {
          return true;
        }
      }
      if (!rect) {
        rect = getBoundingClientRect(el);
      }
      if (rect.top >= this.game.scrollSize.y) {
        return true;
      }
      return false;
    },
    destroy : function() {
      var b;
      for (b in this.bullets) {
        if (this.bullets.hasOwnProperty(b)) {
          /** @type {number} */
          var i = 0;
          var subwiki;
          for (; subwiki = this.bullets[b][i]; i++) {
            subwiki.destroy();
          }
        }
      }
      this.bullets = {};
    }
  });
  var PixmapsList = new Class({
    initialize : function(game) {
      /** @type {!Object} */
      this.game = game;
      /** @type {boolean} */
      this.isPlaying = false;
    },
    update : function(entity) {
      if (this.isPlaying && this.game.bulletManager.enemyIndex.length == 0) {
        this.weHaveWon();
      }
    },
    weHaveWon : function() {
      /** @type {boolean} */
      this.isPlaying = false;
      this.game.ui.showMessage("You're done!");
      if (this.game.isCampaign()) {
        this.game.menuManager.showMenu();
        this.game.menuManager.navigateTo("highscores");
      } else {
        this.game.menuManager.showMenu();
      }
      this.game.menuManager.sendMessageToMenu("gameFinished:!");
    }
  });
  var WindowTree = new Class({
    initialize : function(game) {
      /** @type {!Object} */
      this.game = game;
      /** @type {!Array} */
      this.explosions = [];
    },
    update : function(tDelta) {
      var current = now();
      /** @type {number} */
      var i = 0;
      var options;
      for (; options = this.explosions[i]; i++) {
        if (current - options.bornAt > (options.ttl || 500)) {
          options.destroy();
          this.explosions.splice(i, 1);
          continue;
        }
        options.update(tDelta);
      }
    },
    addExplosion : function(x, y, z) {
      z = z || Widget;
      var s = new z(x, y);
      s.game = this.game;
      s.checkBounds();
      this.explosions.push(s);
      if (this.game.audioManager.explosion) {
        this.game.audioManager.explosion.play();
      }
    },
    destroy : function() {
      /** @type {number} */
      var i = 0;
      var subwiki;
      for (; subwiki = this.explosions[i]; i++) {
        subwiki.destroy();
      }
      /** @type {!Array} */
      this.explosions = [];
    }
  });
  var Element = new Class({
    initialize : function(player, game, x, y, maxlife) {
      /** @type {!Object} */
      this.player = player;
      /** @type {!Object} */
      this.game = game;
      this.pos = new Vector(x, y);
      this.angle = maxlife || 0;
    },
    shootPressed : function() {
    },
    shootReleased : function() {
    },
    checkCollisions : function() {
    },
    getExplosionClass : function() {
      return Widget;
    },
    update : function(tDelta) {
      this.game.hideAll();
      this.checkCollisions(tDelta);
      this.game.showAll();
    },
    checkCollision : function(entity) {
      var file = entity.checkCollision();
      if (!file) {
        return false;
      }
      this.game.explosionManager.addExplosion(entity.pos, file, this.getExplosionClass());
      this.game.menuManager.addPoints(Math.min(file.getElementsByTagName("*").length + 1, 100), entity.pos);
      if (!file.isShot) {
        file.parentNode.removeChild(file);
      }
      if (this.game.statisticsManager) {
        this.game.statisticsManager.addElementsDestroyed();
      }
      return true;
    },
    createBullet : function(options) {
      var Userpage = this.getABulletPos();
      var node = this.getABulletDir();
      var self = new options(Userpage, node);
      self.game = this.game;
      self.manager = this;
      self.initCanvas();
      self.vel.add(self.vel.cp().setLength(this.player.vel.len()));
      return self;
    },
    getABulletPos : function() {
      return this.player.pos.cp().add(this.pos.cp().rotate(this.player.dir.angle() + Math.PI / 2));
    },
    getABulletDir : function() {
      return this.player.dir.cp().rotate(this.angle);
    },
    destroy : function() {
    }
  });
  var OperationsViewer = new Class({
    Extends : Element,
    initialize : function(b, game, x, y, maxlife) {
      Element.prototype.initialize.apply(this, arguments);
      /** @type {!Array} */
      this.lasers = [];
    },
    getExplosionClass : function() {
      return ParticipantWidget;
    },
    update : function(entity) {
      if (!this.lasers.length) {
        return;
      }
      this.removeOld();
      Element.prototype.update.call(this, entity);
    },
    checkCollisions : function(tDelta) {
      /** @type {number} */
      var j = 0;
      var object;
      for (; object = this.lasers[j]; j++) {
        object.update(tDelta);
        if (this.checkCollision(object)) {
        }
      }
    },
    removeOld : function() {
      /** @type {number} */
      var i = 0;
      var scroller;
      for (; scroller = this.lasers[i]; i++) {
        if (scroller.outOfBounds) {
          scroller.destroy();
          this.lasers.splice(i, 1);
        }
      }
    },
    shootPressed : function() {
      if (this.lasers.length > 5) {
        return;
      }
      if (now() - this.lastFired < 500) {
        return;
      }
      this.lastFired = now();
      if (this.game.statisticsManager) {
        this.game.statisticsManager.addShotFired();
      }
      this.lasers.push(this.createBullet(keyReads));
    },
    destroy : function() {
      if (this.lasers.length) {
        /** @type {number} */
        var i = 0;
        var subwiki;
        for (; subwiki = this.lasers[i]; i++) {
          subwiki.destroy();
        }
        /** @type {!Array} */
        this.lasers = [];
      }
    }
  });
  var AddParticipantWindow = new Class({
    Extends : Element,
    initialize : function() {
      Element.prototype.initialize.apply(this, arguments);
      /** @type {number} */
      this.lastFired = 0;
      /** @type {!Array} */
      this.bullets = [];
    },
    getExplosionClass : function() {
      return Widget;
    },
    update : function(entity) {
      if (!this.bullets.length) {
        return;
      }
      this.removeOld();
      Element.prototype.update.call(this, entity);
    },
    removeOld : function() {
      var currT = now();
      /** @type {number} */
      var i = 0;
      var bullet;
      for (; bullet = this.bullets[i]; i++) {
        if (currT - bullet.bornAt > 2000) {
          bullet.destroy();
          this.bullets.splice(i, 1);
        }
      }
    },
    checkCollisions : function(tDelta) {
      /** @type {number} */
      var i = 0;
      var object;
      for (; object = this.bullets[i]; i++) {
        object.update(tDelta);
        if (this.checkCollision(object)) {
          object.destroy();
          this.bullets.splice(i, 1);
        }
      }
    },
    shootPressed : function() {
      if (now() - this.lastFired < 200) {
        return;
      }
      this.lastFired = now();
      this.addBullet();
      if (this.game.statisticsManager) {
        this.game.statisticsManager.addShotFired();
      }
    },
    addBullet : function() {
      if (this.bullets.length > 7) {
        this.bullets[0].destroy();
        this.bullets.shift();
      }
      var bullet = this.createBullet(options);
      this.bullets.push(bullet);
    },
    destroy : function() {
      /** @type {number} */
      var i = 0;
      var bullet;
      for (; bullet = this.bullets[i]; i++) {
        bullet.destroy();
      }
      /** @type {!Array} */
      this.bullets = [];
    }
  });
  var options = new Class({
    initialize : function(b, directory) {
      this.pos = b.cp();
      /** @type {!Object} */
      this.dir = directory;
      this.vel = new Vector(500, 500);
      this.bornAt = now();
    },
    initCanvas : function() {
      this.sheet = new Container(new Rectangle(this.pos.x, this.pos.y, 5, 5));
      this.sheet.drawBullet();
    },
    draw : function() {
      this.sheet.setPosition(this.pos);
    },
    update : function(tDelta) {
      this.pos.add(this.vel.setAngle(this.dir.angle()).mulNew(tDelta));
      this.checkBounds();
      this.draw();
    },
    checkCollision : function() {
      /** @type {(Element|null)} */
      var el = document.elementFromPoint(this.pos.x, this.pos.y);
      if (el && el.nodeType == 3) {
        /** @type {(Node|null)} */
        el = el.parentNode;
      }
      /** @type {(Node|boolean)} */
      var o = el && this.game.bulletManager.isDestroyableFromCollision(el) ? el : false;
      return o;
    },
    checkBounds : function() {
      var x = this.game.windowSize.width;
      var y = this.game.windowSize.height;
      var xmax = this.pos.x + this.sheet.rect.size.width / 2;
      var _miny = this.pos.y + this.sheet.rect.size.height / 2;
      if (xmax > x) {
        /** @type {number} */
        this.pos.x = 0;
      } else {
        if (this.pos.x < 0) {
          /** @type {number} */
          this.pos.x = x - this.sheet.rect.size.width / 2;
        }
      }
      if (_miny > y) {
        /** @type {number} */
        this.pos.y = 0;
      } else {
        if (this.pos.y < 0) {
          /** @type {number} */
          this.pos.y = y - this.sheet.rect.size.height / 2;
        }
      }
    },
    destroy : function() {
      this.sheet.destroy();
    }
  });
  var keyReads = new Class({
    Extends : options,
    initialize : function() {
      options.prototype.initialize.apply(this, arguments);
      this.vel = new Vector(750, 750);
      this.lastDrawPos = this.pos.cp();
    },
    initCanvas : function() {
      /** @type {number} */
      var block_size = Math.max(data.laserImage.width, data.laserImage.height);
      this.sheet = new Container(new Rectangle(0, 0, block_size, block_size));
    },
    update : function(entity) {
      options.prototype.update.apply(this, arguments);
    },
    draw : function() {
      this.sheet.drawLaser(this.pos, this.dir);
      this.lastDrawPos = this.pos.cp();
    },
    checkBounds : function() {
      var returnValue = this.game.windowSize.width;
      var width = this.game.windowSize.height;
      var subDirectoryReturnValue = this.pos.x + this.sheet.rect.size.width / 2;
      var boundswidth = this.pos.y + this.sheet.rect.size.height / 2;
      if (subDirectoryReturnValue > returnValue || this.pos.x < 0) {
        /** @type {boolean} */
        this.outOfBounds = true;
      }
      if (boundswidth > width || this.pos.y < 0) {
        /** @type {boolean} */
        this.outOfBounds = true;
      }
    },
    destroy : function() {
      this.sheet.destroy();
    }
  });
  /** @type {!Element} */
  data.laserImage = document.createElement("img");
  data.laserImage.src = data.path("css/gfx/kickass/laser.png");
  var Animal = new Class({
    initialize : function(options, iconStart) {
      this.bornAt = now();
      this.pos = options.cp();
    },
    update : function(entity) {
    },
    checkBounds : function() {
    },
    destroy : function() {
    }
  });
  var Widget = new Class({
    Extends : Animal,
    initialize : function(event, where) {
      Animal.prototype.initialize.apply(this, arguments);
      this.particleVel = new Vector(150, 0);
      /** @type {!Array} */
      this.particles = [];
      this.generateParticles();
      this.sheet = new Container(new Rectangle(event.x, event.y, 250, 250));
    },
    update : function(tDelta) {
      /** @type {number} */
      var i = 0;
      var player;
      for (; player = this.particles[i]; i++) {
        player.pos.add(player.vel.mulNew(tDelta).mul(f(0.5, 1.0)).setAngle(player.dir.angle()));
      }
      this.sheet.clear();
      this.sheet.drawExplosion(this.particles);
    },
    generateParticles : function() {
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var cell_amount = !data.hasCanvas ? 10 : 40;
      for (; i < cell_amount; i++) {
        this.particles.push({
          dir : (new Vector(f(0, 20) - 10, f(0, 20) - 10)).normalize(),
          vel : this.particleVel.cp(),
          pos : new Vector(0, 0),
          color : ["yellow", "red"][f(0, 1)]
        });
      }
    },
    checkBounds : function() {
      var docWidth = this.sheet.rect.getRight();
      var value = this.sheet.rect.getBottom();
      var viewportWidth = this.game.windowSize.width;
      var old = this.game.windowSize.height;
      if (docWidth > viewportWidth) {
        this.pos.x -= docWidth - viewportWidth;
      }
      if (value > old) {
        this.pos.y -= value - old;
      }
      this.sheet.setPosition(this.pos);
    },
    destroy : function() {
      this.sheet.destroy();
    }
  });
  var validator = new Class({
    Extends : Widget,
    initialize : function(event, where) {
      Animal.prototype.initialize.apply(this, arguments);
      this.particleVel = new Vector(200, 0);
      /** @type {!Array} */
      this.particles = [];
      this.generateParticles();
      this.sheet = new Container(new Rectangle(event.x, event.y, 500, 500));
      /** @type {number} */
      this.ttl = 2000;
      /** @type {number} */
      this.generationDelay = 0.6;
      /** @type {number} */
      this.generationTimes = 2;
      /** @type {number} */
      this.nextGenerate = this.generationDelay;
    },
    update : function(entity) {
      this.nextGenerate -= entity;
      if (this.nextGenerate <= 0 && this.generationTimes > 0) {
        this.nextGenerate = this.generationDelay;
        this.generateParticles();
        this.generationTimes--;
      }
      Widget.prototype.update.call(this, entity);
    }
  });
  var ParticipantWidget = new Class({
    Extends : Animal,
    initialize : function(name, frame) {
      if (!frame) {
        return;
      }
      Animal.prototype.initialize.apply(this, arguments);
      /** @type {!Object} */
      this.element = frame;
      this.fx = new ToolbarWidget;
      this.fx.addListener(this);
      this.start();
    },
    update : function(entity) {
      if (!this.element) {
        return;
      }
      this.fx.update();
    },
    set : function(name, value) {
      if (name == "opacity") {
      }
    },
    start : function() {
      var toBeBound = this.createClones();
      var value = toBeBound[0];
      var node = toBeBound[1];
      /** @type {string} */
      var tileStatStream = "rotate(-" + f(30, 50) + "deg) translate(-100px, 40px)";
      /** @type {string} */
      var physicsMatrix = "rotate(" + f(30, 50) + "deg) translate(100px, 40px)";
      extend(value, {
        "transform" : tileStatStream
      });
      extend(node, {
        "transform" : physicsMatrix
      });
      this.left = value;
      this.right = node;
      this.fx.add("opacity", {
        start : 1,
        end : 0.5,
        duration : 500
      });
    },
    createClones : function() {
      var position = getBoundingClientRect(this.element);
      var $container = this.createContainer(position);
      var el = this.createContainer(position);
      var table = closest(this.element);
      var row = closest(this.element);
      removeClass(table, "KICKASSELEMENT");
      removeClass(row, "KICKASSELEMENT");
      var options = {
        margin : 0,
        overflow : "hidden"
      };
      extend(table, options);
      extend(row, options);
      $container.appendChild(table);
      el.appendChild(row);
      /** @type {string} */
      el.style.left = position.left + position.width / 2 + "px";
      el.scrollLeft += position.width / 2;
      /** @type {number} */
      this.element.style.opacity = 0;
      /** @type {string} */
      this.element.style.visibility = "hidden";
      /** @type {string} */
      this.element.style.display = "none";
      return each([$container, el], function(enemyContainer) {
        /** @type {string} */
        enemyContainer.style.transition = "transform 500ms ease-in";
      });
    },
    createContainer : function(pos) {
      /** @type {!Element} */
      var table = document.createElement("div");
      extend(table, {
        position : "absolute",
        left : pos.left,
        top : pos.top,
        width : pos.width * 0.5,
        height : pos.height,
        overflow : "hidden"
      });
      find().appendChild(table);
      return table;
    },
    destroy : function() {
      try {
        this.left.parentNode.removeChild(this.left);
        this.right.parentNode.removeChild(this.right);
        this.element.parentNode.removeChild(this.element);
      } catch (e) {
      }
    }
  });
  var activeOutputs = {
    1 : {
      name : "Cannon",
      id : "cannon",
      cannonClass : AddParticipantWindow
    },
    2 : {
      name : "Laser",
      id : "laser",
      cannonClass : OperationsViewer
    }
  };
  var player = {
    "cannon" : activeOutputs[1],
    "laser" : activeOutputs[2]
  };
  var RenderNode = new Class({
    initialize : function(castNode) {
      /** @type {!Element} */
      this.canvas = document.createElement("canvas");
      /** @type {string} */
      this.canvas.className = "KICKASSELEMENT";
      with(this.canvas.style) {
        /** @type {string} */
        position = "absolute";
        /** @type {string} */
        zIndex = "1000000";
      }
      data.kickass.registerElement(this.canvas);
      if (this.canvas.getContext) {
        this.ctx = this.canvas.getContext("2d");
      }
      /** @type {!Object} */
      this.rect = castNode;
      /** @type {number} */
      this.angle = 0;
      this.updateCanvas();
      find().appendChild(this.canvas);
    },
    tracePoly : function(vars) {
      if (!vars[0]) {
        return;
      }
      this.ctx.save();
      this.ctx.translate(this.rect.size.width / 2, this.rect.size.height / 2);
      this.ctx.rotate(this.angle);
      this.ctx.beginPath();
      this.ctx.moveTo(vars[0].x, vars[0].y);
      /** @type {number} */
      var i = 0;
      for (; i < vars.length; i++) {
        this.ctx.lineTo(vars[i].x, vars[i].y);
      }
      this.ctx.restore();
    },
    setAngle : function(angle) {
      /** @type {number} */
      this.angle = angle;
    },
    updateCanvas : function() {
      if (this.canvas.width != this.rect.size.width) {
        this.canvas.width = this.rect.size.width;
      }
      if (this.canvas.height != this.rect.size.height) {
        this.canvas.height = this.rect.size.height;
      }
      /** @type {string} */
      this.canvas.style.left = data.kickass.scrollPos.x + (this.rect.pos.x - this.rect.size.width / 2) + "px";
      /** @type {string} */
      this.canvas.style.top = data.kickass.scrollPos.y + (this.rect.pos.y - this.rect.size.height / 2) + "px";
    },
    drawLine : function(text, y, width, height) {
      this.ctx.save();
      this.ctx.translate(this.rect.size.width / 2, this.rect.size.height / 2);
      this.ctx.beginPath();
      this.ctx.moveTo(text, y);
      this.ctx.lineTo(width, height);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.restore();
    },
    drawCircle : function(radius, center) {
      center = center || {
        x : 0,
        y : 0
      };
      this.ctx.save();
      this.ctx.translate(this.rect.size.width / 2, this.rect.size.height / 2);
      if (center) {
        this.ctx.translate(center.x, center.y);
      }
      this.ctx.beginPath();
      this.ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.restore();
    },
    drawRect : function(x, y, w, h) {
      this.ctx.save();
      this.ctx.translate(this.rect.size.width / 2, this.rect.size.height / 2);
      this.ctx.translate(x, y);
      this.ctx.fillRect(x, y, w, h);
      this.ctx.restore();
      this.ctx.fill();
    },
    drawImageFull : function(img) {
      this.ctx.drawImage(img, 0, 0, this.rect.size.width, this.rect.size.height);
    },
    drawImage : function(img, offset, y) {
      this.ctx.save();
      this.ctx.translate(this.rect.size.width / 2 + offset, this.rect.size.height / 2 + y);
      this.ctx.rotate(this.angle);
      this.ctx.drawImage(img, 0, -11);
      this.ctx.restore();
    },
    setFillColor : function(color) {
      /** @type {string} */
      this.ctx.fillStyle = color;
    },
    setStrokeColor : function(color) {
      /** @type {string} */
      this.ctx.strokeStyle = color;
    },
    setLineWidth : function(width) {
      /** @type {number} */
      this.ctx.lineWidth = width;
    },
    fillPath : function() {
      this.ctx.fill();
    },
    strokePath : function() {
      this.ctx.stroke();
    },
    clear : function() {
      this.ctx.clearRect(0, 0, this.rect.size.width, this.rect.size.height);
    },
    destroy : function() {
      data.kickass.unregisterElement(this.canvas);
      this.canvas.parentNode.removeChild(this.canvas);
    }
  });
  var Container = new Class({
    initialize : function(host) {
      /** @type {!Object} */
      this.rect = host;
      this.drawer = new RenderNode(host);
    },
    clear : function() {
      this.drawer.clear();
    },
    setPosition : function(value) {
      this.rect.pos = value.cp();
      this.drawer.rect = this.rect;
      this.drawer.updateCanvas();
    },
    setAngle : function(angle) {
      this.drawer.setAngle(angle);
    },
    drawPlayer : function(ctx) {
      this.drawer.setFillColor("white");
      this.drawer.setStrokeColor("black");
      this.drawer.setLineWidth(1.5);
      this.drawer.tracePoly(ctx);
      this.drawer.fillPath();
      this.drawer.tracePoly(ctx);
      this.drawer.strokePath();
    },
    drawBrokenPlayer : function(vertices, normals) {
      this.drawer.setStrokeColor("black");
      this.drawer.setLineWidth(1.5);
      /** @type {number} */
      var i = 1;
      var b;
      var a = vertices[0];
      for (; b = vertices[i]; i++, a = b) {
        var n = normals[i - 1];
        this.drawer.drawLine(a.x + n.pos.x, a.x + n.pos.y, b.x + n.pos.x, b.y + n.pos.y);
      }
    },
    drawFlames : function(flame, options) {
      this.drawer.setLineWidth(1.5);
      this.drawer.setFillColor("red");
      this.drawer.tracePoly(flame.r);
      this.drawer.fillPath();
      this.drawer.setFillColor("yellow");
      this.drawer.tracePoly(flame.y);
      this.drawer.fillPath();
    },
    drawBullet : function() {
      this.drawer.setFillColor(data.bulletColor);
      this.drawer.drawCircle(2.5);
    },
    drawExplosion : function(respEl) {
      /** @type {number} */
      var chat = 0;
      var data;
      for (; data = respEl[chat]; chat++) {
        this.drawer.setFillColor(data.color);
        this.drawer.drawRect(data.pos.x, data.pos.y, 3, 3);
      }
    },
    drawFace : function(canvas) {
      this.drawer.drawImageFull(canvas);
    },
    drawLaser : function(value, nextValue) {
      this.clear();
      this.setPosition(value);
      this.drawer.setAngle(nextValue.angle());
      this.drawer.drawImage(data.laserImage, 0, 0);
    },
    transformToSheetCoordinates : function(value) {
      var ret = value.cp().sub(new Vector(this.rect.size.width / 2, this.rect.size.height / 2));
      return ret;
    },
    destroy : function() {
      this.drawer.destroy();
    }
  });
  var config = require();
  /**
   * @return {undefined}
   */
  var init = function() {
    if (!config.KICKASSGAME) {
      if (config.KICKASS_SITE_KEY) {
        var tool = new Tool(config.KICKASS_SITE_KEY);
        tool.load(function(useToolingApi) {
          config.KICKASSGAME = data.kickass = new User({
            mySite : useToolingApi ? tool : false
          });
          config.KICKASSGAME.begin();
        });
      } else {
        config.KICKASSGAME = data.kickass = new User;
        config.KICKASSGAME.begin();
      }
    } else {
      config.KICKASSGAME.addPlayer();
    }
  };
  if (config.LAZYLOAD_KICKASS) {
    /** @type {function(): undefined} */
    window.startBrowserBlaster = init;
  } else {
    init();
  }
})(typeof exports != "undefined" ? exports : window);
document.getElementById("mysite").remove();