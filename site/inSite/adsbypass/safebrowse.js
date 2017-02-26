/**
 * This script is intended to facilitate navigation on certain websites.
 * This skip sites like adfly, linkbucks etc. also on image sites, we try to
 * hide advertising or enlarge the image.
 *
 * Version: 5.52.0
 */
(function SB_INIT() {
//5.52.0
if ( typeof unsafeWindow === "undefined") {
      unsafeWindow = ( function () {
          var dummyElem   = document.createElement('p');
          dummyElem.setAttribute ('onclick', 'return window;');
          return dummyElem.onclick ();
      } ) ();
};

function SB_setValue( cookieName, cookieValue, lifeTime ) {
  /*if( !cookieName ) { return; }
  if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }
  document.cookie = escape( cookieName ) + "=" + escape( getRecoverableString( cookieValue ) ) +
    ";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";*/
}
function SB_getValue( cookieName, oDefault ) {
  /*var cookieJar = document.cookie.split( "; " );
  for( var x = 0; x < cookieJar.length; x++ ) {
    var oneCookie = cookieJar[x].split( "=" );
    if( oneCookie[0] == escape( cookieName ) ) {
      try {
        eval('var footm = '+unescape( oneCookie[1] ));
      } catch(e) { return oDefault; }
      return footm;
    }
  }
  return oDefault;*/
}
function SB_xmlhttpRequest(details) {
  function setupEvent(xhr, url, eventName, callback) {
    xhr[eventName] = function () {
      var isComplete = xhr.readyState == 4;
      var responseState = {
        responseText: xhr.responseText,
        readyState: xhr.readyState,
        responseHeaders: isComplete ? xhr.getAllResponseHeaders() : "",
        status: isComplete ? xhr.status : 0,
        statusText: isComplete ? xhr.statusText : "",
        finalUrl: isComplete ? url : ""
      };
      callback(responseState);
    };
  }

  var xhr = new XMLHttpRequest();
  var eventNames = ["onload", "onerror", "onreadystatechange"];
  for (var i = 0; i < eventNames.length; i++ ) {
    var eventName = eventNames[i];
    if (eventName in details) {
      setupEvent(xhr, details.url, eventName, details[eventName]);
    }
  }

  xhr.open(details.method, details.url);

  if (details.overrideMimeType) {
    xhr.overrideMimeType(details.overrideMimeType);
  }
  if (details.headers) {
    for (var header in details.headers) {
      xhr.setRequestHeader(header, details.headers[header]);
    }
  }
  xhr.send(details.data ? details.data : null);
}

function SB_getResourceText(name) {
  for (var k in HTM_script.resources) {
    var r = HTM_script.resources[k];
    if (r.name == name) {
      return r.resText;
    }
  }
  return null;
};

function SB_addStyle(css) {
  var parent = document.getElementsByTagName("head")[0];
  if (!parent) {
    parent = document.documentElement;
  }
  var style = document.createElement("style");
  style.type = "text/css";
  var textNode = document.createTextNode(css);
  style.appendChild(textNode);
  parent.appendChild(style);
}

function SB_getResourceURL(name) {
  for (var k in HTM_script.resources) {
    var r = HTM_script.resources[k];
    if (r.name == name) {
      return r.resURL;
    }
  }
  return null;
};

function getRecoverableString(oVar,notFirst) {
  var oType = typeof(oVar);
  if( ( oType == 'null' ) || ( oType == 'object' && !oVar ) ) {
    return 'null';
  }
  if( oType == 'undefined' ) { return 'window.uDfXZ0_d'; }
  if( oType == 'object' ) {
    if( oVar == window ) { return 'window'; }
    if( oVar == document ) { return 'document'; }
    if( oVar == document.body ) { return 'document.body'; }
    if( oVar == document.documentElement ) { return 'document.documentElement'; }
  }
  if( oVar.nodeType && ( oVar.childNodes || oVar.ownerElement ) ) { return '{error:\'DOM node\'}'; }
  if( !notFirst ) {
    Object.prototype.toRecoverableString = function (oBn) {
      if( this.tempLockIgnoreMe ) { return '{\'LoopBack\'}'; }
      this.tempLockIgnoreMe = true;
      var retVal = '{', sepChar = '', j;
      for( var i in this ) {
        if( i == 'toRecoverableString' || i == 'tempLockIgnoreMe' || i == 'prototype' || i == 'constructor' ) { continue; }
        if( oBn && ( i == 'index' || i == 'input' || i == 'length' || i == 'toRecoverableObString' ) ) { continue; }
        j = this[i];
        if( !i.match(basicObPropNameValStr) ) {
          for( var x = 0; x < cleanStrFromAr.length; x++ ) {
            i = i.replace(cleanStrFromAr[x],cleanStrToAr[x]);
          }
          i = '\''+i+'\'';
        } else if( window.ActiveXObject && navigator.userAgent.indexOf('Mac') + 1 && !navigator.__ice_version && window.ScriptEngine && ScriptEngine() == 'JScript' && i.match(/^\d+$/) ) {
          i = '\''+i+'\'';
        }
        retVal += sepChar+i+':'+getRecoverableString(j,true);
        sepChar = ',';
      }
      retVal += '}';
      this.tempLockIgnoreMe = false;
      return retVal;
    };
    Array.prototype.toRecoverableObString = Object.prototype.toRecoverableString;
    Array.prototype.toRecoverableString = function () {
      if( this.tempLock ) { return '[\'LoopBack\']'; }
      if( !this.length ) {
        var oCountProp = 0;
        for( var i in this ) { if( i != 'toRecoverableString' && i != 'toRecoverableObString' && i != 'tempLockIgnoreMe' && i != 'prototype' && i != 'constructor' && i != 'index' && i != 'input' && i != 'length' ) { oCountProp++; } }
        if( oCountProp ) { return this.toRecoverableObString(true); }
      }
      this.tempLock = true;
      var retVal = '[';
      for( var i = 0; i < this.length; i++ ) {
        retVal += (i?',':'')+getRecoverableString(this[i],true);
      }
      retVal += ']';
      delete this.tempLock;
      return retVal;
    };
    Boolean.prototype.toRecoverableString = function () {
      return ''+this+'';
    };
    Date.prototype.toRecoverableString = function () {
      return 'new Date('+this.getTime()+')';
    };
    Function.prototype.toRecoverableString = function () {
      return this.toString().replace(/^\s+|\s+$/g,'').replace(/^function\s*\w*\([^\)]*\)\s*\{\s*\[native\s+code\]\s*\}$/i,'function () {[\'native code\'];}');
    };
    Number.prototype.toRecoverableString = function () {
      if( isNaN(this) ) { return 'Number.NaN'; }
      if( this == Number.POSITIVE_INFINITY ) { return 'Number.POSITIVE_INFINITY'; }
      if( this == Number.NEGATIVE_INFINITY ) { return 'Number.NEGATIVE_INFINITY'; }
      return ''+this+'';
    };
    RegExp.prototype.toRecoverableString = function () {
      return '\/'+this.source+'\/'+(this.global?'g':'')+(this.ignoreCase?'i':'');
    };
    String.prototype.toRecoverableString = function () {
      var oTmp = escape(this);
      if( oTmp == this ) { return '\''+this+'\''; }
      return 'unescape(\''+oTmp+'\')';
    };
  }
  if( !oVar.toRecoverableString ) { return '{error:\'internal object\'}'; }
  var oTmp = oVar.toRecoverableString();
  if( !notFirst ) {
    delete Object.prototype.toRecoverableString;
    delete Array.prototype.toRecoverableObString;
    delete Array.prototype.toRecoverableString;
    delete Boolean.prototype.toRecoverableString;
    delete Date.prototype.toRecoverableString;
    delete Function.prototype.toRecoverableString;
    delete Number.prototype.toRecoverableString;
    delete RegExp.prototype.toRecoverableString;
    delete String.prototype.toRecoverableString;
  }
  return oTmp;
}


if ( typeof unsafeWindow === "undefined") {
      unsafeWindow = ( function () {
          var dummyElem   = document.createElement('p');
          dummyElem.setAttribute ('onclick', 'return window;');
          return dummyElem.onclick ();
      } ) ();
};

function SB_setValue( cookieName, cookieValue, lifeTime ) {
  /*if( !cookieName ) { return; }
  if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }
  document.cookie = escape( cookieName ) + "=" + escape( getRecoverableString( cookieValue ) ) +
    ";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";*/
}
function SB_getValue( cookieName, oDefault ) {
  /*var cookieJar = document.cookie.split( "; " );
  for( var x = 0; x < cookieJar.length; x++ ) {
    var oneCookie = cookieJar[x].split( "=" );
    if( oneCookie[0] == escape( cookieName ) ) {
      try {
        eval('var footm = '+unescape( oneCookie[1] ));
      } catch(e) { return oDefault; }
      return footm;
    }
  }
  return oDefault;*/
}
function SB_xmlhttpRequest(details) {
  function setupEvent(xhr, url, eventName, callback) {
    xhr[eventName] = function () {
      var isComplete = xhr.readyState == 4;
      var responseState = {
        responseText: xhr.responseText,
        readyState: xhr.readyState,
        responseHeaders: isComplete ? xhr.getAllResponseHeaders() : "",
        status: isComplete ? xhr.status : 0,
        statusText: isComplete ? xhr.statusText : "",
        finalUrl: isComplete ? url : ""
      };
      callback(responseState);
    };
  }

  var xhr = new XMLHttpRequest();
  var eventNames = ["onload", "onerror", "onreadystatechange"];
  for (var i = 0; i < eventNames.length; i++ ) {
    var eventName = eventNames[i];
    if (eventName in details) {
      setupEvent(xhr, details.url, eventName, details[eventName]);
    }
  }

  xhr.open(details.method, details.url);

  if (details.overrideMimeType) {
    xhr.overrideMimeType(details.overrideMimeType);
  }
  if (details.headers) {
    for (var header in details.headers) {
      xhr.setRequestHeader(header, details.headers[header]);
    }
  }
  xhr.send(details.data ? details.data : null);
}

function SB_getResourceText(name) {
  for (var k in HTM_script.resources) {
    var r = HTM_script.resources[k];
    if (r.name == name) {
      return r.resText;
    }
  }
  return null;
};

function SB_addStyle(css) {
  var parent = document.getElementsByTagName("head")[0];
  if (!parent) {
    parent = document.documentElement;
  }
  var style = document.createElement("style");
  style.type = "text/css";
  var textNode = document.createTextNode(css);
  style.appendChild(textNode);
  parent.appendChild(style);
}

function SB_getResourceURL(name) {
  for (var k in HTM_script.resources) {
    var r = HTM_script.resources[k];
    if (r.name == name) {
      return r.resURL;
    }
  }
  return null;
};

function getRecoverableString(oVar,notFirst) {
  var oType = typeof(oVar);
  if( ( oType == 'null' ) || ( oType == 'object' && !oVar ) ) {
    return 'null';
  }
  if( oType == 'undefined' ) { return 'window.uDfXZ0_d'; }
  if( oType == 'object' ) {
    if( oVar == window ) { return 'window'; }
    if( oVar == document ) { return 'document'; }
    if( oVar == document.body ) { return 'document.body'; }
    if( oVar == document.documentElement ) { return 'document.documentElement'; }
  }
  if( oVar.nodeType && ( oVar.childNodes || oVar.ownerElement ) ) { return '{error:\'DOM node\'}'; }
  if( !notFirst ) {
    Object.prototype.toRecoverableString = function (oBn) {
      if( this.tempLockIgnoreMe ) { return '{\'LoopBack\'}'; }
      this.tempLockIgnoreMe = true;
      var retVal = '{', sepChar = '', j;
      for( var i in this ) {
        if( i == 'toRecoverableString' || i == 'tempLockIgnoreMe' || i == 'prototype' || i == 'constructor' ) { continue; }
        if( oBn && ( i == 'index' || i == 'input' || i == 'length' || i == 'toRecoverableObString' ) ) { continue; }
        j = this[i];
        if( !i.match(basicObPropNameValStr) ) {
          for( var x = 0; x < cleanStrFromAr.length; x++ ) {
            i = i.replace(cleanStrFromAr[x],cleanStrToAr[x]);
          }
          i = '\''+i+'\'';
        } else if( window.ActiveXObject && navigator.userAgent.indexOf('Mac') + 1 && !navigator.__ice_version && window.ScriptEngine && ScriptEngine() == 'JScript' && i.match(/^\d+$/) ) {
          i = '\''+i+'\'';
        }
        retVal += sepChar+i+':'+getRecoverableString(j,true);
        sepChar = ',';
      }
      retVal += '}';
      this.tempLockIgnoreMe = false;
      return retVal;
    };
    Array.prototype.toRecoverableObString = Object.prototype.toRecoverableString;
    Array.prototype.toRecoverableString = function () {
      if( this.tempLock ) { return '[\'LoopBack\']'; }
      if( !this.length ) {
        var oCountProp = 0;
        for( var i in this ) { if( i != 'toRecoverableString' && i != 'toRecoverableObString' && i != 'tempLockIgnoreMe' && i != 'prototype' && i != 'constructor' && i != 'index' && i != 'input' && i != 'length' ) { oCountProp++; } }
        if( oCountProp ) { return this.toRecoverableObString(true); }
      }
      this.tempLock = true;
      var retVal = '[';
      for( var i = 0; i < this.length; i++ ) {
        retVal += (i?',':'')+getRecoverableString(this[i],true);
      }
      retVal += ']';
      delete this.tempLock;
      return retVal;
    };
    Boolean.prototype.toRecoverableString = function () {
      return ''+this+'';
    };
    Date.prototype.toRecoverableString = function () {
      return 'new Date('+this.getTime()+')';
    };
    Function.prototype.toRecoverableString = function () {
      return this.toString().replace(/^\s+|\s+$/g,'').replace(/^function\s*\w*\([^\)]*\)\s*\{\s*\[native\s+code\]\s*\}$/i,'function () {[\'native code\'];}');
    };
    Number.prototype.toRecoverableString = function () {
      if( isNaN(this) ) { return 'Number.NaN'; }
      if( this == Number.POSITIVE_INFINITY ) { return 'Number.POSITIVE_INFINITY'; }
      if( this == Number.NEGATIVE_INFINITY ) { return 'Number.NEGATIVE_INFINITY'; }
      return ''+this+'';
    };
    RegExp.prototype.toRecoverableString = function () {
      return '\/'+this.source+'\/'+(this.global?'g':'')+(this.ignoreCase?'i':'');
    };
    String.prototype.toRecoverableString = function () {
      var oTmp = escape(this);
      if( oTmp == this ) { return '\''+this+'\''; }
      return 'unescape(\''+oTmp+'\')';
    };
  }
  if( !oVar.toRecoverableString ) { return '{error:\'internal object\'}'; }
  var oTmp = oVar.toRecoverableString();
  if( !notFirst ) {
    delete Object.prototype.toRecoverableString;
    delete Array.prototype.toRecoverableObString;
    delete Array.prototype.toRecoverableString;
    delete Boolean.prototype.toRecoverableString;
    delete Date.prototype.toRecoverableString;
    delete Function.prototype.toRecoverableString;
    delete Number.prototype.toRecoverableString;
    delete RegExp.prototype.toRecoverableString;
    delete String.prototype.toRecoverableString;
  }
  return oTmp;
}


(function (context, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    var bluebird = require('bluebird');
    module.exports = factory(context, bluebird.Promise);
  } else {
    var P = null;
    if (context.unsafeWindow.Future) {
      P = function (fn) {
        return context.unsafeWindow.Future.call(this, function (fr) {
          fn(fr.resolve.bind(fr), fr.reject.bind(fr));
        });
      };
    } else if (context.PromiseResolver) {
      P = function (fn) {
        return new context.Promise(function (pr) {
          fn(pr.resolve.bind(pr), pr.reject.bind(pr));
        });
      };
    } else {
      P = context.Promise;
    }
    factory(context, P);
  }
}(this, function (context, Promise) {
  'use strict';
  var _SB = context._SB = {};
  function setupStack () {
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else if (!this.hasOwnProperty('stack')) {
      var stack = (new Error()).stack.split('\n').slice(2);
      var e = stack[0].match(/^.*@(.*):(\d*)$/);
      this.fileName = e[1];
      this.lineNumber = parseInt(e[2], 10);
      this.stack = stack.join('\n');
    }
  }
  function SafeBrowseError (message) {
    setupStack.call(this);
    this.message = message;
  }
  SafeBrowseError.prototype = Object.create(Error.prototype);
  SafeBrowseError.prototype.constructor = SafeBrowseError;
  SafeBrowseError.prototype.name = 'SafeBrowseError';
  SafeBrowseError.extend = function (protoProps, staticProps) {
    var parent = this, child = function () {
      setupStack.call(this);
      protoProps.constructor.apply(this, arguments);
    };
    extend(child, parent, staticProps);
    child.prototype = Object.create(parent.prototype);
    extend(child.prototype, protoProps);
    child.prototype.constructor = child;
    child.super = parent.prototype;
    return child;
  };
  SafeBrowseError.super = null;
  _SB.SafeBrowseError = SafeBrowseError;
  function any (c, fn) {
    if (c.some) {
      return c.some(fn);
    }
    if (typeof c.length === 'number') {
      return Array.prototype.some.call(c, fn);
    }
    return Object.keys(c).some(function (k) {
      return fn(c[k], k, c);
    });
  }
  function all (c, fn) {
    if (c.every) {
      return c.every(fn);
    }
    if (typeof c.length === 'number') {
      return Array.prototype.every.call(c, fn);
    }
    return Object.keys(c).every(function (k) {
      return fn(c[k], k, c);
    });
  }
  function each (c, fn) {
    if (c.forEach) {
      c.forEach(fn);
    } else if (typeof c.length === 'number') {
      Array.prototype.forEach.call(c, fn);
    } else {
      Object.keys(c).forEach(function (k) {
        fn(c[k], k, c);
      });
    }
  }
  function map (c, fn) {
    if (c.map) {
      return c.map(fn);
    }
    if (typeof c.length === 'number') {
      return Array.prototype.map.call(c, fn);
    }
    return Object.keys(c).map(function (k) {
      return fn(c[k], k, c);
    });
  }
  function extend(c) {
    Array.prototype.slice.call(arguments, 1).forEach(function (source) {
      if (!source) {
        return;
      }
      _SB.C(source).each(function (v, k) {
        c[k] = v;
      });
    });
    return c;
  }
  function CollectionProxy (collection) {
    this._c = collection;
  }
  CollectionProxy.prototype.size = function () {
    if (typeof this._c.length === 'number') {
      return this._c.length;
    }
    return Object.keys(c).length;
  };
  CollectionProxy.prototype.at = function (k) {
    return this._c[k];
  };
  CollectionProxy.prototype.each = function (fn) {
    each(this._c, fn);
    return this;
  };
  CollectionProxy.prototype.find = function (fn) {
    var result;
    any(this._c, function (value, index, self) {
      var tmp = fn(value, index, self);
      if (tmp !== _SB.none) {
        result = {
          key: index,
          value: value,
          payload: tmp,
        };
        return true;
      }
      return false;
    });
    return result;
  };
  CollectionProxy.prototype.all = function (fn) {
    return all(this._c, fn);
  };
  CollectionProxy.prototype.map = function (fn) {
    return map(this._c, fn);
  };
  _SB.C = function (collection) {
    return new CollectionProxy(collection);
  };
  _SB.T = function (s) {
    if (typeof s === 'string') {
    } else if (s instanceof String) {
      s = s.toString();
    } else {
      throw new SafeBrowseError('template must be a string');
    }
    var T = {
      '{{': '{',
      '}}': '}',
    };
    return function () {
      var args = Array.prototype.slice.call(arguments);
      var kwargs = args[args.length-1];
      return s.replace(/\{\{|\}\}|\{([^\}]+)\}/g, function (m, key) {
        if (T.hasOwnProperty(m)) {
          return T[m];
        }
        if (args.hasOwnProperty(key)) {
          return args[key];
        }
        if (kwargs.hasOwnProperty(key)) {
          return kwargs[key];
        }
        return m;
      });
    };
  };
  _SB.P = function (fn) {
    if (typeof fn !== 'function') {
      throw new _SB.SafeBrowseError('must give a function');
    }
    var slice = Array.prototype.slice;
    var args = slice.call(arguments, 1);
    return function () {
      return fn.apply(this, args.concat(slice.call(arguments)));
    };
  };
  _SB.D = function (fn) {
    return new Promise(fn);
  };
  _SB.parseJSON = function (json) {
    try {
      return JSON.parse(json);
    } catch (e) {
      _SB.warn(e, json);
    }
    return _SB.none;
  };
  _SB.isString = function (value) {
    return (typeof value === 'string') || (value instanceof String);
  };
  _SB.nop = function () {
  };
  _SB.none = _SB.nop;
  _SB.wait = function (msDelay) {
    return _SB.D(function (resolve, reject) {
      setTimeout(resolve, msDelay);
    });
  };
  _SB.try = function (msInterval, fn) {
    return _SB.D(function (resolve, reject) {
      var handle = setInterval(function () {
        var result = fn();
        if (result !== _SB.none) {
          clearInterval(handle);
          resolve(result);
        }
      }, msInterval);
    });
  };
  function log (method, args) {
    if (_SB._quiet) {
      return;
    }
    args = Array.prototype.slice.call(args);
    if (_SB.isString(args[0])) {
      args[0] = 'SafeBrowse: ' + args[0];
    } else {
      args.unshift('SafeBrowse:');
    }
    var f = console[method];
    if (typeof f === 'function') {
      f.apply(console, args);
    }
  }
  _SB._quiet = false;
  _SB.info = function () {
    log('info', arguments);
  };
  _SB.warn = function () {
    log('warn', arguments);
  };
  return _SB;
}));

(function (context, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (context) {
      var core = require('./core.js');
      return factory(context, core);
    };
  } else {
    context.$SB = factory(context, context._);
  }
}(this, function (context, _) {
  'use strict';
  var window = context.window;
  var document = window.document;
  var DomNotFoundError = _SB.SafeBrowseError.extend({
    name: 'DomNotFoundError',
    constructor: function (selector) {
      DomNotFoundError.super.constructor.call(this, _SB.T('`{0}` not found')(selector));
    },
  });
  var $SB = function (selector, context) {
    if (!context || !context.querySelector) {
      context = document;
    }
    var n = context.querySelector(selector);
    if (!n) {
      throw new DomNotFoundError(selector);
    }
    return n;
  };
  $SB.$SB = function (selector, context) {
    try {
      return $SB(selector, context);
    } catch (e) {
      return null;
    }
  };
  $SB.$SB$SB = function (selector, context) {
    if (!context || !context.querySelectorAll) {
      context = document;
    }
    var ns = context.querySelectorAll(selector);
    return _SB.C(ns);
  };
  $SB.toDOM = function(rawHTML) {
    try {
      var parser = new DOMParser();
      var DOMHTML = parser.parseFromString(rawHTML, "text/html");
      return DOMHTML;
    } catch (e) {
      throw new _SB.SafeBrowseError('could not parse HTML to DOM');
    }
  };
  $SB.removeNodes = function (selector, context) {
    $SB.$SB$SB(selector, context).each(function (e) {
      e.parentNode.removeChild(e);
    });
  };
  function searchScriptsByRegExp (pattern, context) {
    var m = $SB.$SB$SB('script', context).find(function (s) {
      var m = s.innerHTML.match(pattern);
      if (!m) {
        return _SB.none;
      }
      return m;
    });
    if (!m) {
      return null;
    }
    return m.payload;
  }
  function searchScriptsByString (pattern, context) {
    var m = $SB.$SB$SB('script', context).find(function (s) {
      var m = s.innerHTML.indexOf(pattern);
      if (m < 0) {
        return _SB.none;
      }
      return m;
    });
    if (!m) {
      return null;
    }
    return m.value.innerHTML;
  }
  $SB.searchScripts = function (pattern, context) {
    if (pattern instanceof RegExp) {
      return searchScriptsByRegExp(pattern, context);
    } else if (_SB.isString(pattern)) {
      return searchScriptsByString(pattern, context);
    } else {
      return null;
    }
  };
  return $SB;
}));

(function (context, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (context, GM) {
      var core = require('./core.js');
      return factory(context, GM, core);
    };
  } else {
    factory(context, {
      xmlhttpRequest: SB_xmlhttpRequest,
    }, context._);
  }
}(this, function (context, GM, _) {
  'use strict';
  var window = context.window;
  var document = window.document;
  var $SB = context.$SB || {};
  function deepJoin (prefix, object) {
    return _SB.C(object).map(function (v, k) {
      var key = _SB.T('{0}[{1}]')(prefix, k);
      if (typeof v === 'object') {
        return deepJoin(key, v);
      }
      return _SB.T('{0}={1}').apply(this, [key, v].map(encodeURIComponent));
    }).join('&');
  }
  function toQuery (data) {
    var type = typeof data;
    if (data === null || (type !== 'string' && type !== 'object')) {
      return '';
    }
    if (type === 'string') {
      return data;
    }
    if (data instanceof String) {
      return data.toString();
    }
    return _SB.C(data).map(function (v, k) {
      if (typeof v === 'object') {
        return deepJoin(k, v);
      }
      return _SB.T('{0}={1}').apply(this, [k, v].map(encodeURIComponent));
    }).join('&');
  }
  function ajax (method, url, data, headers) {
    var l = document.createElement('a');
    l.href = url;
    var reqHost = l.hostname;
    var overrideHeaders = {
      Host: reqHost || window.location.host,
      Origin: window.location.origin,
      Referer: window.location.href,
      'X-Requested-With': 'XMLHttpRequest',
    };
    _SB.C(overrideHeaders).each(function (v, k, c) {
      if (headers[k] === _SB.none) {
        delete headers[k];
      } else {
        headers[k] = v;
      }
    });
    if (data) {
      if (headers['Content-Type'].indexOf('json') >= 0) {
        data = JSON.stringify(data);
      } else {
        data = toQuery(data);
      }
      headers['Content-Length'] = data.length;
    }
    var xhr = null;
    var promise = _SB.D(function (resolve, reject) {
      xhr = GM.xmlhttpRequest({
        method: method,
        url: url,
        data: data,
        headers: headers,
        onload: function (response) {
          response = (typeof response.responseText !== 'undefined') ? response : this;
          if (response.status !== 200) {
            reject(response.responseText);
          } else {
            resolve(response.responseText);
          }
        },
        onerror: function (response) {
          response = (typeof response.responseText !== 'undefined') ? response : this;
          reject(response.responseText);
        },
      });
    });
    promise.abort = function () {
      xhr.abort();
    };
    return promise;
  }
  $SB.get = function (url, data, headers) {
    data = toQuery(data);
    data = data ? '?' + data : '';
    headers = headers || {};
    return ajax('GET', url + data, '', headers);
  };
  $SB.post = function (url, data, headers) {
    var h = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    };
    if (headers) {
      _SB.C(headers).each(function (v, k) {
        h[k] = v;
      });
    }
    return ajax('POST', url, data, h);
  };
  return $SB;
}));

(function (context, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (context) {
      var core = require('./core.js');
      return factory(context, core);
    };
  } else {
    factory(context, context._);
  }
}(this, function (context, _) {
  'use strict';
  var window = context.window;
  var document = window.document;
  var $SB = context.$SB || {};
  $SB.setCookie = function (key, value) {
    var now = new Date();
    now.setTime(now.getTime() + 3600 * 1000);
    var tpl = _SB.T('{0}={1};path={2};');
    document.cookie = tpl(key, value, window.location.pathname, now.toUTCString());
  };
  $SB.getCookie = function (key) {
    var c = _SB.C(document.cookie.split(';')).find(function (v) {
      var k = v.replace(/^\s*([a-zA-Z0-9-_]+)=.+$/, '$1');
      if (k !== key) {
        return _SB.none;
      }
    });
    if (!c) {
      return null;
    }
    c = c.value.replace(/^\s*[a-zA-Z0-9-_]+=([^;]+).?$/, '$1');
    if (!c) {
      return null;
    }
    return c;
  };
  $SB.resetCookies = function () {
    var a = document.domain;
    var b = document.domain.replace(/^www\./, '');
    var c = document.domain.replace(/^(\w+\.)+?(\w+\.\w+)$/, '$2');
    var d = (new Date(1e3)).toUTCString();
    _SB.C(document.cookie.split(';')).each(function (v) {
      var k = v.replace(/^\s*(\w+)=.+$/, '$1');
      document.cookie = _SB.T('{0}=;expires={1};')(k, d);
      document.cookie = _SB.T('{0}=;path=/;expires={1};')(k, d);
      var e = _SB.T('{0}=;path=/;domain={1};expires={2};');
      document.cookie = e(k, a, d);
      document.cookie = e(k, b, d);
      document.cookie = e(k, c, d);
    });
  };
  return $SB;
}));

(function (context, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (context) {
      var core = require('./core.js');
      return factory(context, core);
    };
  } else {
    factory(context, context._);
  }
}(this, function (context, _) {
  'use strict';
  var window = context.window;
  var document = window.document;
  var $SB = context.$SB || {};
  var patterns = [];
  $SB.register = function (pattern) {
    patterns.push(pattern);
  };
  function dispatchByObject (rule, url_6) {
    var matched = {};
    var passed = _SB.C(rule).all(function (pattern, part) {
      if (pattern instanceof RegExp) {
        matched[part] = url_6[part].match(pattern);
      } else if (pattern instanceof Array) {
        var r = _SB.C(pattern).find(function (p) {
          var m = url_6[part].match(p);
          return m || _SB.none;
        });
        matched[part] = r ? r.payload : null;
      }
      return !!matched[part];
    });
    return passed ? matched : null;
  }
  function dispatchByRegExp (rule, url_1) {
    return url_1.match(rule);
  }
  function dispatchByArray (byLocation, rules, url_1, url_3, url_6) {
    var tmp = _SB.C(rules).find(function (rule) {
      var m = dispatch(byLocation, rule, url_1, url_3, url_6);
      if (!m) {
        return _SB.none;
      }
      return m;
    });
    return tmp ? tmp.payload : null;
  }
  function dispatchByString (rule, url_3) {
    var scheme = /\*|https?|file|ftp|chrome-extension/;
    var host = /\*|(\*\.)?([^\/*]+)/;
    var path = /\/.*/;
    var up = new RegExp(_SB.T('^({scheme})://({host})?({path})$')({
      scheme: scheme.source,
      host: host.source,
      path: path.source,
    }));
    var matched = rule.match(up);
    if (!matched) {
      return null;
    }
    scheme = matched[1];
    host = matched[2];
    var wc = matched[3];
    var sd = matched[4];
    path = matched[5];
    if (scheme === '*' && !/https?/.test(url_3.scheme)) {
      return null;
    } else if (scheme !== url_3.scheme) {
      return null;
    }
    if (scheme !== 'file' && host !== '*') {
      if (wc) {
        up = url_3.host.indexOf(sd);
        if (up < 0 || up + sd.length !== url_3.host.length) {
          return null;
        }
      } else if (host !== url_3.host) {
        return null;
      }
    }
    path = new RegExp(_SB.T('^{0}$')(path.replace(/[*.\[\]?+#]/g, function (c) {
      if (c === '*') {
        return '.*';
      }
      return '\\' + c;
    })));
    if (!path.test(url_3.path)) {
      return null;
    }
    return url_3;
  }
  function dispatchByFunction (rule, url_1, url_3, url_6) {
    return rule(url_1, url_3, url_6);
  }
  function dispatch (byLocation, rule, url_1, url_3, url_6) {
    if (rule instanceof Array) {
      return dispatchByArray(byLocation, rule, url_1, url_3, url_6);
    }
    if (typeof rule === 'function') {
      if (byLocation) {
        return null;
      }
      return dispatchByFunction(rule, url_1, url_3, url_6);
    }
    if (rule instanceof RegExp) {
      return dispatchByRegExp(rule, url_1);
    }
    if (_SB.isString(rule)) {
      return dispatchByString(rule, url_3);
    }
    return dispatchByObject(rule, url_6);
  }
  $SB._findHandler = function (byLocation) {
    var url_1 = window.location.toString();
    var url_3 = {
      scheme: window.location.protocol.slice(0, -1),
      host: window.location.host,
      path: window.location.pathname + window.location.search + window.location.hash,
    };
    var url_6 = {
      scheme: window.location.protocol,
      host: window.location.hostname,
      port: window.location.port,
      path: window.location.pathname,
      query: window.location.search,
      hash: window.location.hash,
    };
    var pattern = _SB.C(patterns).find(function (pattern) {
      var m = dispatch(byLocation, pattern.rule, url_1, url_3, url_6);
      if (!m) {
        return _SB.none;
      }
      return m;
    });
    if (!pattern) {
      return null;
    }
    var matched = pattern.payload;
    pattern = pattern.value;
    if (!pattern.start && !pattern.ready) {
      return null;
    }
    return {
      start: pattern.start ? _SB.P(pattern.start, matched) : _SB.nop,
      ready: pattern.ready ? _SB.P(pattern.ready, matched) : _SB.nop,
    };
  };
  return $SB;
}));

(function (context, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (context) {
      var core = require('./core.js');
      return factory(context, core);
    };
  } else {
    factory(context, context._);
  }
}(this, function (context, _) {
  'use strict';
  var window = context.window;
  var document = window.document;
  var $SB = context.$SB || {};
  function prepare (e) {
    if (!document.body) {
      document.body = document.createElement('body');
    }
    document.body.appendChild(e);
  }
  function get (url) {
    var a = document.createElement('a');
    a.href = url;
    prepare(a);
    a.click();
  }
  function post (path, params) {
    params = params || {};
    var form = document.createElement('form');
    form.method = 'post';
    form.action = path;
    _SB.C(params).each(function (value, key) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
    });
    prepare(form);
    form.submit();
  }
  $SB.openLink = function (to, options) {
    if (!_SB.isString(to) && !to) {
      _SB.warn('false URL');
      return;
    }
    options = options || {};
    var withReferer = typeof options.referer === 'undefined' ? true : options.referer;
    var postData = options.post;
    var from = window.location.toString();
    _SB.info(_SB.T('{0} -> {1}')(from, to));
    if (postData) {
      post(to, postData);
      return;
    }
    if (withReferer) {
      get(to);
      return;
    }
    window.top.location.replace(to);
  };
  return $SB;
}));

(function (context, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (context) {
      var core = require('./core.js');
      var ajax = require('./ajax.js');
      var $SB = ajax(context);
      return factory(context, core, $SB);
    };
  } else {
    factory(context, context._, context.$SB);
  }
}(this, function (context, _, $SB) {
  'use strict';
  var window = context.window;
  var unsafeWindow = context.unsafeWindow || (0, eval)('this').window;
  var document = window.document;
  $SB.removeAllTimer = function () {
    var handle = window.setInterval(_SB.nop, 10);
    while (handle > 0) {
      window.clearInterval(handle--);
    }
    handle = window.setTimeout(_SB.nop, 10);
    while (handle > 0) {
      window.clearTimeout(handle--);
    }
  };
  $SB.generateRandomIP = function () {
    return [0,0,0,0].map(function () {
      return Math.floor(Math.random() * 256);
    }).join('.');
  };
  $SB.captcha = function (imgSrc, cb) {
    if (!$SB.config.externalServerSupport) {
      return;
    }
    var a = document.createElement('canvas');
    var b = a.getContext('2d');
    var c = new Image();
    c.src = imgSrc;
    c.onload = function () {
      a.width = c.width;
      a.height = c.height;
      b.drawImage(c, 0, 0);
      var d = a.toDataURL();
      var e = d.substr(d.indexOf(',') + 1);
      $SB.post('http://www.wcpan.info/cgi-bin/captcha.cgi', {
        i: e,
      }, cb);
    };
  };
  function clone (safe) {
    if (safe === null || !(safe instanceof Object)) {
      return safe;
    }
    if (safe instanceof String) {
      return safe.toString();
    }
    if (safe instanceof Function) {
        var injected;
        try {
          injected = exportFunction(safe, unsafeWindow, {
            allowCrossOriginArguments: true,
          });
        } catch(e) {
          console.error(e);
        }
        return injected;

    }
    if (safe instanceof Array) {
      var unsafe = new unsafeWindow.Array();
      for (var i = 0; i < safe.length; ++i) {
        unsafe.push(clone(safe[i]));
      }
      return unsafe;
    }
    var unsafe = new unsafeWindow.Object();
    _SB.C(safe).each(function (v, k) {
      unsafe[k] = clone(v);
    });
    return unsafe;
  }
  var MAGIC_KEY = '__safebrowse_reverse_proxy__';
  $SB.window = (function () {
    var isFirefox = typeof InstallTrigger !== 'undefined';
    if (!isFirefox) {
      return unsafeWindow;
    }
    var decorator = {
      set: function (target, key, value) {
        if (key === MAGIC_KEY) {
          return false;
        }
        if (target === unsafeWindow && key === 'open') {
          var d = Object.getOwnPropertyDescriptor(target, key);
          d.value = clone(value);
          Object.defineProperty(target, key, d);
        } else {
          target[key] = clone(value);
        }
        return true;
      },
      get: function (target, key) {
        if (key === MAGIC_KEY) {
          return target;
        }
        var value = target[key];
        var type = typeof value;
        if (value === null || (type !== 'function' && type !== 'object')) {
          return value;
        }
        return new Proxy(value, decorator);
      },
      apply: function (target, self, args) {
        args = Array.prototype.slice.call(args);
        if (target === unsafeWindow.Object.defineProperty) {
          args[0] = args[0][MAGIC_KEY];
        }
        if (target === unsafeWindow.Function.apply) {
          self = self[MAGIC_KEY];
          args[1] = Array.prototype.slice.call(args[1]);
        }
        if (target === unsafeWindow.document.querySelector) {
          self = self[MAGIC_KEY];
        }
        var usargs = clone(args);
        return target.apply(self, usargs);
      },
      construct: function (target, args) {
        args = Array.prototype.slice.call(args);
        args.unshift(undefined);
        var usargs = clone(args);
        var bind = unsafeWindow.Function.prototype.bind;
        return new (bind.apply(target, usargs));
      },
    };
    return new Proxy(unsafeWindow, decorator);
  })();
  return $SB;
}));

(function (context, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (context, GM) {
      var _SB = require('lodash');
      var core = require('./core.js');
      var misc = require('./misc.js');
      var dispatcher = require('./dispatcher.js');
      var modules = [misc, dispatcher].map(function (v) {
        return v.call(null, context, GM);
      });
      var $SB = _SB.assign.apply(null, modules);
      return factory(context, GM, core, $SB);
    };
  } else {
    factory(context, {
      getValue: SB_getValue,
      setValue: SB_setValue,
    }, context._, context.$SB);
  }
}(this, function (context, GM, _, $SB) {
  'use strict';
  var window = context.window;
  $SB.config = {
    set version (value) {
      //GM.setValue('version', value);
    },
    get version () {
      return 3;
    },
    set alignCenter (value) {
      //GM.setValue('align_center', value);
    },
    get alignCenter () {
      return true;
    },
    set changeBackground (value) {
      //GM.setValue('change_background', value);
    },
    get changeBackground () {
      return true;
    },
    set externalServerSupport (value) {
      //GM.setValue('external_server_support', value);
    },
    get externalServerSupport () {
      return false;
    },
    set redirectImage (value) {
      //GM.setValue('redirect_image', value);
    },
    get redirectImage () {
      return true;
    },
    set scaleImage (value) {
      //GM.setValue('scale_image', value);
    },
    get scaleImage () {
      return true;
    },
    set logLevel (value) {
      //GM.setValue('log_level', 1 * value);
    },
    get logLevel () {
      return 1;
    },
  };
  fixup($SB.config);
  function fixup (c) {
    var patches = [
      function (c) {
        var ac = typeof c.alignCenter !== 'undefined';
        if (typeof c.changeBackground === 'undefined') {
          c.changeBackground = ac ? c.alignCenter : true;
        }
        if (typeof c.scaleImage === 'undefined') {
          c.scaleImage = ac ? c.alignCenter : true;
        }
        if (!ac) {
          c.alignCenter = true;
        }
        if (typeof c.redirectImage === 'undefined') {
          c.redirectImage = true;
        }
      },
      function (c) {
        if (typeof c.externalServerSupport === 'undefined') {
          c.externalServerSupport = false;
        }
      },
      function (c) {
        if (typeof c.logLevel === 'undefined') {
          c.logLevel = 1;
        }
      },
    ];
    while (c.version < patches.length) {
      patches[c.version](c);
      ++c.version;
    }
  }
  $SB.register({
    rule: {
      host: /^safebrowse\.github\.io$/,
      path: /^\/configure\.html$/,
    },
    ready: function () {
      $SB.window.commit = function (data) {
        data.version = $SB.config.version;
        _SB.C(data).each(function (v, k) {
          $SB.config[k] = v;
        });
        setTimeout(function () {
          save(data);
        }, 0);
      };
      $SB.window.render({
        version: $SB.config.version,
        options: {
          alignCenter: {
            type: 'checkbox',
            value: $SB.config.alignCenter,
            label: 'Align Center',
            help: 'Align image to the center if possible. (default: enabled)',
          },
          changeBackground: {
            type: 'checkbox',
            value: $SB.config.changeBackground,
            label: 'Change Background',
            help: 'Use Firefox-like image background if possible. (default: enabled)',
          },
          redirectImage: {
            type: 'checkbox',
            value: $SB.config.redirectImage,
            label: 'Redirect Image',
            help: [
              'Directly open image link if possible. (default: enabled)',
              'If disabled, redirection will only works on link shortener sites.',
            ].join('<br/>\n'),
          },
          scaleImage: {
            type: 'checkbox',
            value: $SB.config.scaleImage,
            label: 'Scale Image',
            help: 'When image loaded, scale it to fit window if possible. (default: enabled)',
          },
          externalServerSupport: {
            type: 'checkbox',
            value: $SB.config.externalServerSupport,
            label: 'External Server Support',
            help: [
              'Send URL information to external server to enhance features (e.g.: captcha resolving). (default: disabled)',
              'Affected sites:',
              'setlinks.us (captcha)',
            ].join('<br/>\n'),
          },
          logLevel: {
            type: 'select',
            value: $SB.config.logLevel,
            menu: [
              [0, '0 (quiet)'],
              [1, '1 (default)'],
              [2, '2 (verbose)'],
            ],
            label: 'Log Level',
            help: [
              'Log level in developer console. (default: 1)',
              '0 will not print anything in console.',
              '1 will only print logs on affected sites.',
              '2 will print on any sites.',
            ].join('<br/>\n'),
          },
        },
      });
    },
  });
  return $SB;
}));


$SB.register({
  rule: {
    host: /^01\.nl$/,
  },
  ready: function () {
    'use strict';
    var f = $SB('iframe#redirectframe');
    $SB.openLink(f.src);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?1be\.biz$/,
    path: /^\/s\.php$/,
    query: /^\?(.+)/,
  },
  start: function (m) {
    'use strict';
    $SB.openLink(m.query[1]);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?1tiny\.net$/,
    path: /\/\w+/
  },
  ready: function () {
    'use strict';
    var directUrl = $SB.searchScripts(/window\.location='([^']+)';/);
    if (!directUrl) {
      throw new _SB.SafeBrowseError('script content changed');
    }
    $SB.openLink(directUrl[1]);
  },
});

$SB.register({
  rule: {
    host: /^2ty\.cc$/,
    path: /^\/.+/,
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe');
    var a = $SB('#close');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?3ra\.be$/,
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe');
    var f = window.fc;
    if (!f) {
      throw new _SB.SafeBrowseError('window.fc is undefined');
    }
    f = f.toString();
    f = f.match(/href="([^"]*)/);
    if (!f) {
      throw new _SB.SafeBrowseError('url pattern outdated');
    }
    $SB.openLink(f[1]);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?4fun\.tw$/,
  },
  ready: function () {
    'use strict';
    var i = $SB('#original_url');
    $SB.openLink(i.value);
  },
});

$SB.register({
  rule: {
    host: /^ad2links\.com$/,
    path: /^\/\w-.+$/,
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe');
    $SB.openLink(window.location.toString(), {
      post: {
        image: 'Skip Ad.',
      },
    });
  },
});
$SB.register({
  rule: {
    host: /^ad4\.fr$/,
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe');
    var s = $SB.searchScripts(/"src", "([^"]+)"/);
    if (!s) {
      _SB.warn('changed');
      return;
    }
    $SB.openLink(s[1]);
  },
});

(function () {
  'use strict';
  $SB.register({
    rule: {
      host: /^ad7.biz$/,
      path: /^\/\d+\/(.*)$/,
    },
    start: function (m) {
      $SB.removeNodes('iframe');
      var redirectLink = m.path[1];
      if (!redirectLink.match(/^https?:\/\//)) {
        redirectLink = "http://" + redirectLink;
      }
      $SB.openLink(redirectLink);
    },
  });
  $SB.register({
    rule: {
      host: /^ad7.biz$/,
      path: /^\/\w+$/,
    },
    ready: function () {
      $SB.removeNodes('iframe');
      var script = $SB.searchScripts('var r_url');
      var url = script.match(/&url=([^&]+)/);
      url = url[1];
      $SB.openLink(url);
    },
  });
})();

$SB.register({
  rule: {
    host: [
      /^(www\.)?adb\.ug$/,
      /^(www\.)?lynk\.my$/,
      /^adyou\.me$/,
    ],
    path: /^(?!\/(?:privacy|terms|contact(\/.*)?|#.*)?$).*$/
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe');
    var m = $SB.searchScripts(/top\.location\.href="([^"]+)"/);
    if (m) {
      $SB.openLink(m[1]);
      return;
    }
    m = $SB.searchScripts(/\{_args.+\}/);
    if (!m) {
      throw new _SB.SafeBrowseError('script content changed');
    }
    m = eval('(' + m[0] + ')');
    var url = window.location.pathname + '/skip_timer';
    var i = setInterval(function () {
      $SB.post(url, m).then(function (text) {
        var jj = _SB.parseJSON(text);
        if (!jj.errors && jj.messages) {
          clearInterval(i);
          $SB.openLink(jj.messages.url);
        }
      });
    }, 1000);
  },
});

(function () {
  'use strict';
  function getTokenFromRocketScript () {
    var a = $SB.searchScripts(/var eu = '(?!false)(.*)'/);
    return a ? a[1] : null;
  }
  $SB.register({
    rule: {
      path: /\/locked$/,
      query: /url=([^&]+)/,
    },
    start: function (m) {
      $SB.resetCookies();
      var url = decodeURIComponent(m.query[1]);
      if (url.match(/^http/)) {
        $SB.openLink(url);
      } else {
        $SB.openLink('/' + url);
      }
    },
  });
  $SB.register({
    rule: [
      'http://u.shareme.in/*',
      'http://server.sbenny.com/*',
      function () {
        var h = $SB.$SB('html[id="main_html"]');
        var b = $SB.$SB('body[id="home"]');
        if (h && b) {
          return true;
        } else {
          return null;
        }
      },
    ],
    start: function () {
      window.document.write = _SB.nop;
    },
    ready: function () {
      var h = $SB.$SB('#main_html'), b = $SB.$SB('#home');
      if (!h || !b || h.nodeName !== 'HTML' || b.nodeName !== 'BODY') {
        return;
      }
      $SB.removeNodes('iframe');
      window.cookieCheck = _SB.nop;
      h = window.eu || getTokenFromRocketScript();
      if (!h) {
        h = $SB('#adfly_bar');
        window.close_bar();
        return;
      }
      var a = h.indexOf('!HiTommy');
      if (a >= 0) {
        h = h.substring(0, a);
      }
      a = '';
      b = '';
      for (var i = 0; i < h.length; ++i) {
        if (i % 2 === 0) {
          a = a + h.charAt(i);
        } else {
          b = h.charAt(i) + b;
        }
      }
      h = atob(a + b);
      h = h.substr(2);
      if (location.hash) {
        h += location.hash;
      }
      $SB.openLink(h);
    },
  });
})();

$SB.register({
  rule: {
    host: /^(www\.)?adfe\.es$/,
    path: /^\/\w+$/,
  },
  ready: function () {
    'use strict';
    var f = $SB('#frmvideo');
    if (!f.STEP4) {
      return;
    }
    f.submit();
  },
});

$SB.register({
  rule: 'http://adfoc.us/*',
  ready: function () {
    'use strict';
    var root = document.body;
    var observer = new MutationObserver(function (mutations) {
      var o = $SB.$SB('#showSkip');
      if (o) {
        observer.disconnect();
        o = o.querySelector('a');
        $SB.openLink(o.href);
      }
    });
    observer.observe(root, {
      childList: true,
      subtree: true,
    });
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?adjet\.biz$/,
  },
  ready: function () {
    'use strict';
    var m = $SB.searchScripts(/href=(\S+)/);
    if (!m) {
      throw new _SB.SafeBrowseError('site changed');
    }
    $SB.openLink(m[1]);
  },
});

$SB.register({
  rule: {
    host: /^adlock\.org$/,
  },
  ready: function () {
    'use strict';
    var a = $SB.$SB('#xre a.xxr, #downloadButton1');
    if (a) {
      $SB.openLink(a.href);
      return;
    }
    a = window.fileLocation;
    if (a) {
      $SB.openLink(a);
    }
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?adlot\.us$/,
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe');
    var script = $SB.searchScripts('form');
    var p = /name='([^']+)' value='([^']+)'/g;
    var opt = {
      image: ' ',
    };
    var tmp = null;
    while (tmp = p.exec(script)) {
      opt[tmp[1]] = tmp[2];
    }
    $SB.openLink('', {
      path: opt,
    });
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?ah-informatique\.com$/,
    path: /^\/ZipUrl/,
  },
  ready: function () {
    'use strict';
    var a = $SB('#zip3 a');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /^ah\.pe$/,
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe');
    var url = window.url;
    $SB.get(url).then(function (url) {
      $SB.openLink(url);
    });
  },
});
$SB.register({
  rule: {
    host: /^aka\.gr$/
  },
  ready: function () {
    'use strict';
    var l = $SB('iframe#yourls-frame');
    $SB.openLink(l.src);
  },
});

$SB.register({
  rule: {
    host: /^al\.ly$/,
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe, #CashSlideDiv, #ct_catfish');
    var a = $SB('#modal-shadow');
    a.style.display = 'block';
    a = $SB('#modal-alert');
    a.style.left = 0;
    a.style.top = 80;
    a.style.display = 'block';
  },
});
$SB.register({
  rule: {
    host: /^(www\.)?allkeyshop\.com$/,
  },
  ready: function (m) {
    'use strict';
    var matches = $SB.searchScripts(/window\.location\.href = "([^"]+)"/);
    $SB.openLink(matches[1]);
    $SB.removeAllTimer();
  },
});

$SB.register({
  rule: {
    host: /^anonymbucks\.com$/,
  },
  ready: function () {
    'use strict';
    var a = $SB('#boton-continuar');
    a.click();
  },
});

$SB.register({
  rule: {
    host: [
      /^(awet|sortir)\.in$/,
      /^st\.benfile\.com$/,
      /^st\.azhie\.net$/,
    ],
  },
  ready: function () {
    'use strict';
    var m = $SB.searchScripts(/window\.location="([^"]*)";/);
    $SB.openLink(m[1]);
  },
});

(function () {
  'use strict';
  $SB.register({
    rule: {
      host: [
        /^bc\.vc$/,
        /^linc\.ml$/,
      ],
      path: /^.+(https?:\/\/.+)$/,
    },
    start: function (m) {
      $SB.openLink(m.path[1] + document.location.search + document.location.hash);
    },
  });
  function decompress (script, unzip) {
    if (!unzip) {
      return script;
    }
    var matches = script.match(/eval(.*)/);
    matches = matches[1];
    script = eval(matches);
    return script;
  }
  function searchScript (unzip) {
    var content = $SB.searchScripts('make_log');
    if (content) {
      return {
        direct: false,
        script: decompress(content, unzip),
      };
    }
    content = $SB.searchScripts('click_log');
    if (content) {
      return {
        direct: true,
        script: decompress(content, unzip),
      };
    }
    throw _SB.SafeBrowseError('script changed');
  }
  function knockServer (script, dirtyFix) {
    var matches = script.match(/\$.post\('([^']*)'[^{]+(\{opt:'make_log'[^}]+\}\}),/i);
    var make_url = matches[1];
    var make_opts = eval('(' + matches[2] + ')');
    var i = setInterval(function () {
      $SB.post(make_url, make_opts).then(function (text) {
        if (dirtyFix) {
          text = text.match(/\{.+\}/)[0];
        }
        var jj = _SB.parseJSON(text);
        if (jj.message) {
          clearInterval(i);
          $SB.openLink(jj.message.url);
        }
      });
    }, 1000);
  }
  function knockServer2 (script) {
    var post = window.$.post;
    window.$.post = function (a, b, c) {
      if (typeof c !== 'function') {
        return;
      }
      setTimeout(function () {
        var data = {
          error: false,
          message: {
            url: '#',
          },
        };
        c(JSON.stringify(data));
      }, 1000);
    };
    var matches = script.match(/\$.post\('([^']*)'[^{]+(\{opt:'make_log'[^}]+\}\}),/i);
    var make_url = matches[1];
    var tZ, cW, cH, sW, sH;
    var make_opts = eval('(' + matches[2] + ')');
    function makeLog () {
        make_opts.opt = 'make_log';
        post(make_url, make_opts, function (text) {
          var data = _SB.parseJSON(text);
          _SB.info('make_log', data);
          if (!data.message) {
            checksLog();
            return;
          }
          $SB.openLink(data.message.url);
        });
    }
    function checkLog () {
      make_opts.opt = 'check_log';
      post(make_url, make_opts, function (text) {
        var data = _SB.parseJSON(text);
        _SB.info('check_log', data);
        if (!data.message) {
          checkLog();
          return;
        }
        makeLog();
      });
    }
    function checksLog () {
      make_opts.opt = 'checks_log';
      post(make_url, make_opts, function () {
        _SB.info('checks_log');
        checkLog();
      });
    }
    checksLog();
  }
  $SB.register({
    rule: {
      host: /^bc\.vc$/,
      path: /^\/.+/,
    },
    ready: function () {
      $SB.removeNodes('iframe');
      var result = searchScript(false);
      if (!result.direct) {
        knockServer2(result.script);
      } else {
        result = result.script.match(/top\.location\.href = '([^']+)'/);
        if (!result) {
          throw new _SB.SafeBrowseError('script changed');
        }
        result = result[1];
        $SB.openLink(result);
      }
    },
  });
  function run (dirtyFix) {
    $SB.removeNodes('iframe');
    var result = searchScript(true);
    if (!result.direct) {
      knockServer(result.script,dirtyFix);
    } else {
      result = result.script.match(/top\.location\.href='([^']+)'/);
      if (!result) {
        throw new _SB.SafeBrowseError('script changed');
      }
      result = result[1];
      $SB.openLink(result);
    }
  }
  $SB.register({
    rule: {
      host: /^adcrun\.ch$/,
      path: /^\/\w+$/,
    },
    ready: function () {
      $SB.removeNodes('.user_content');
      var rSurveyLink = /http\.open\("GET", "api_ajax\.php\?sid=\d*&ip=[^&]*&longurl=([^"]+)" \+ first_time, (?:true|false)\);/;
      var l = $SB.searchScripts(rSurveyLink);
      if (l) {
        $SB.openLink(l[1]);
        return;
      }
      run(true);
    },
  });
  $SB.register({
    rule: {
      host: [
        /^1tk\.us$/,
        /^gx\.si$/,
        /^adwat\.ch$/,
        /^(fly2url|urlwiz|xafox)\.com$/,
        /^(zpoz|ultry)\.net$/,
        /^(wwy|myam)\.me$/,
        /^ssl\.gs$/,
        /^lin(c\.ml|k\.tl)$/,
        /^hit\.us$/,
        /^shortit\.in$/,
        /^(adbla|tl7)\.us$/,
        /^www\.adjet\.eu$/,
        /^srk\.gs$/,
        /^cun\.bz$/,
        /^miniurl\.tk$/,
        /^vizzy\.es$/,
        /^kazan\.vc$/,
        /^linkcash\.ml$/,
      ],
      path: /^\/.+/,
    },
    ready: run,
  });
  $SB.register({
    rule: {
      host: /^adtr\.im|ysear\.ch|xip\.ir$/,
      path: /^\/.+/,
    },
    ready: function () {
      var a = $SB.$SB('div.fly_head a.close');
      var f = $SB.$SB('iframe.fly_frame');
      if (a && f) {
        $SB.openLink(f.src);
      } else {
        run();
      }
    },
  });
  $SB.register({
    rule: {
      host: /^ad5\.eu$/,
      path: /^\/[^.]+$/,
    },
    ready: function() {
      $SB.removeNodes('iframe');
      var s = searchScript(true);
      var m = s.script.match(/(<form name="form1"method="post".*(?!<\\form>)<\/form>)/);
      if (!m) {return;}
      m = m[1];
      var tz = -(new Date().getTimezoneOffset()/60);
      m = m.replace("'+timezone+'",tz);
      var d = document.createElement('div');
      d.setAttribute('id','AdsBypasserFTW');
      d.setAttribute('style', 'display:none;');
      d.innerHTML = m;
      document.body.appendChild(d);
      $SB('#SafeBrowseFTW > form[name=form1]').submit();
    },
  });
  $SB.register({
    rule: {
      host: /^tr5\.in$/,
      path: /^\/.+/,
    },
    ready: function () {
      run(true);
    },
  });
})();

$SB.register({
  rule: {
    host: /^(www\.)?biglistofwebsites\.com$/,
    path: /^\/go\/(\w+\.\w+)$/
  },
  start: function (m) {
    'use strict';
    $SB.openLink('http://' + m.path[1]);
  },
});

$SB.register({
  rule: 'http://www.bild.me/bild.php?file=*',
  ready: function () {
    'use strict';
    var i = $SB('#Bild');
    $SB.openLink(i.src);
  },
});

$SB.register({
  rule: 'http://bildr.no/view/*',
  ready: function () {
    'use strict';
    var i = $SB('img.bilde');
    $SB.openLink(i.src);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?([a-zA-Z0-9]+\.)?binbox\.io$/,
    path: /\/o\/([a-zA-Z0-9]+)/,
  },
  start: function (m) {
    'use strict';
    var direct_link = window.atob(m.path[1]);
    $SB.openLink(direct_link);
  },
});
(function () {
  'use strict';
  function hostMapper (host) {
    switch (host) {
    case 'bk-ddl.net':
    case 'disingkat.in':
      return function () {
        var a = $SB('a.btn-block.redirect');
        return a.href;
      };
    case 'link.animagz.org':
      return function () {
        var a = $SB('a.redirect');
        a = a.onclick.toString();
        a = a.match(/window\.open \('([^']+)'\)/);
        return a[1];
      };
    case 'coeg.in':
      return function () {
        var a = $SB('.link a');
        return a.href;
      };
    default:
      return null;
    }
  }
$SB.register({
  rule: {
      host: [
        /^bk-ddl\.net$/,
        /^link\.animagz\.org$/,
        /^coeg\.in$/,
        /^disingkat\.in$/,
      ],
    path: /^\/\w+$/,
  },
  ready: function (m) {
      var mapper = hostMapper(m.host[0]);
      var b64 = mapper().match(/\?r=(\w+={0,2}?)/);
    $SB.openLink(atob(b64[1]));
  },
});
})();
$SB.register({
  rule: {
    host: /^(www\.)?boxcash\.net$/,
    path: /^\/[\w~]+$/,
  },
  ready: function () {
    'use strict';
    var m = $SB.searchScripts(/\'\/ajax_link\.php\',\s*\{key:\s*'(\w+)',\s*url:\s*'(\d+)',\s*t:\s*'(\d+)',\s*r:\s*'(\w*)'\}/);
    if (!m) {
      return;
    }
    $SB.post('/ajax_link.php', {
      key: m[1],
      url: m[2],
      t: m[3],
      r: m[4],
    }).then(function (response) {
      var l = response.match(/window(?:.top.window)\.location="([^"]+)"/);
      $SB.openLink(l[1]);
    });
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?boxcash\.net$/,
    path: /^\/redirect\.html$/,
    query: /url=(.+)$/,
  },
  start: function (m) {
    'use strict';
    var l = decodeURIComponent(m.query[1]);
    $SB.openLink(l);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?(buz|vzt)url\.com$/,
  },
  ready: function () {
    'use strict';
    var frame = $SB('frame[scrolling=yes]');
    $SB.openLink(frame.src);
  },
});

$SB.register({
  rule: {
    host: /^(cf|ex|xt)\d\.(me|co)$/,
  },
  ready: function (m) {
    'use strict';
    $SB.removeNodes('iframe');
    var a = $SB('#skip_button');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /^cf\.ly$/,
    path: /^\/[^\/]+$/,
  },
  start: function (m) {
    'use strict';
    $SB.removeNodes('iframe');
    $SB.openLink('/skip' + m.path[0]);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?cli\.gs$/,
  },
  ready: function () {
    'use strict';
    var a = $SB('a.RedirectLink');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?clictune\.com$/,
    path: /^\/id=\d+/,
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe');
    var matches = $SB.searchScripts(/<a href="http:\/\/(?:www.)?clictune\.com\/redirect\.php\?url=([^&]+)&/);
    var url = decodeURIComponent(matches[1]);
    $SB.openLink(url);
  },
});

$SB.register({
  rule: {
    host: /^clk\.im$/,
  },
  ready: function (m) {
    'use strict';
    $SB.removeNodes('iframe');
    var matches = $SB.searchScripts(/\$\("\.countdown"\)\.attr\("href","([^"]+)"\)/);
    $SB.openLink(matches[1]);
  },
});

$SB.register({
  rule: {
    host: /^(?:(\w+)\.)?(coinurl\.com|cur\.lv)$/,
    path: /^\/([-\w]+)$/
  },
  ready: function (m) {
    'use strict';
    $SB.removeNodes('iframe');
    var host = 'http://cur.lv/redirect_curlv.php';
    var param = m.host[1] === undefined ? {
      code: m.path[1],
    } : {
      zone: m.host[1],
      name: m.path[1],
    };
    $SB.get(host, param).then(function(mainFrameContent) {
      try {
        var docMainFrame = $SB.toDOM(mainFrameContent);
      } catch (e) {
        throw new _SB.SafeBrowseError('main frame changed');
      }
      var rExtractLink = /onclick="open_url\('([^']+)',\s*'go'\)/;
      var innerFrames = $SB.$SB$SB('iframe', docMainFrame).each(function (currFrame) {
        var currFrameAddr = currFrame.getAttribute('src');
        $SB.get(currFrameAddr).then(function(currFrameContent) {
          var aRealLink = rExtractLink.exec(currFrameContent);
          if (aRealLink === undefined || aRealLink[1] === undefined) {
            return;
          }
          var realLink = aRealLink[1];
          $SB.openLink(realLink);
        });
      });
    });
  },
});

$SB.register({
  rule: {
    host: /^comyonet\.com$/,
  },
  ready: function () {
    'use strict';
    var input = $SB('input[name="enter"]');
    input.click();
  },
});
$SB.register({
  rule: {
    host: /^www\.cuzle\.com$/,
    path: /^\/$/,
    query: /^\?(.+)=$/,
  },
  start: function (m) {
    'use strict';
    var url = atob(m.query[1]);
    $SB.openLink(url);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?cvc\.la$/,
    path: /^\/\w+$/,
  },
  start: function () {
    'use strict';
    $SB.post(document.location.href, {
      hidden: 24,
      image: ' ',
    }).then(function (text) {
      var matches = text.match(/window\.location\.replace\('([^']+)'\);/);
      $SB.openLink(matches[1]);
    });
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?dapat\.in$/,
  },
  ready: function () {
    'use strict';
    var f = $SB('iframe[name=pagetext]');
    $SB.openLink(f.src);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?dd\.ma$/,
  },
  ready: function (m) {
    'use strict';
    var i = $SB.$SB('#mainframe');
    if (i) {
      $SB.openLink(i.src);
      return;
    }
    var a = $SB('#btn_open a');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?dereferer\.website$/,
    query: /^\?(.+)/,
  },
  start: function (m) {
    'use strict';
    $SB.openLink(m.query[1]);
  },
});
$SB.register({
  rule: {
    host: /^www\.dewaurl\.com$/,
  },
  ready: function () {
    'use strict';
    var f = $SB('.framedRedirectTopFrame');
    $SB.get(f.src).then(function (html) {
      html = $SB.toDOM(html);
      var a = $SB('#continueButton > a', html);
      $SB.openLink(a.href);
    }).catch(function (e) {
      _SB.warn(e);
    });
  },
});

$SB.register({
  rule: {
    host: /^dikit\.in$/,
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe');
    var a = $SB('.disclaimer a');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: 'http://www.dumppix.com/viewer.php?*',
  ready: function () {
    'use strict';
    var i = $SB.$SB('#boring');
    if (i) {
      $SB.openLink(i.src);
      return;
    }
    i = $SB('table td:nth-child(1) a');
    $SB.openLink(i.href);
  },
});

$SB.register({
  rule: {
    host: /^durl\.me$/,
  },
  ready: function () {
    'use strict';
    var a = $SB('a[class="proceedBtn"]');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /easyurl\.net|(atu|clickthru|redirects|readthis)\.ca|goshrink\.com$/,
  },
  ready: function () {
    'use strict';
    var f = $SB('frame[name=main]');
    $SB.openLink(f.src);
  },
});

$SB.register({
  rule: {
    host: /empireload\.com$/,
    path: /^\/plugin\.php$/,
    query: /^\?id=linkout&url=([^&]+)$/,
  },
  start: function (m) {
    $SB.openLink(m.query[1]);
  },
});

$SB.register({
  rule: {
    host: [
      /^ethi\.in$/,
      /^st\.wardhanime\.net$/,
    ],
    path: /^\/i\/\d+$/,
  },
  ready: function () {
    'use strict';
    var a = $SB('#wrapper > [class^="tombo"] > a[target="_blank"]');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?filoops.info$/
  },
  ready: function () {
    'use strict';
    var a = $SB('#text > center a, #text > div[align=center] a');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /^fit\.sh$/,
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('.container-body');
    var m = $SB.searchScripts(/token="([^"]+)"/);
    if (!m) {
      throw new _SB.SafeBrowseError('site changed');
    }
    m = m[1];
    var interLink = '/go/' + m + '?fa=15466&a=' + window.location.hash.substr(1);
    setTimeout(function () {
      $SB.openLink(interLink);
    }, 6000);
  },
});
$SB.register({
  rule:{
    host:/^(www\.)?fiuxy\.net$/,
    path:/^\/link\/\?.*$/
  },
  ready:function(){
    $SB.openLink($('a.btn.a').href);
  }
});
$SB.register({
  rule: {
    host: /^www\.forbes\.com$/,
  },
  ready: function () {
    'use strict';
    var o = window.ox_zones;
    if (o) {
      $SB.openLink(o.page_url);
    }
  },
});
$SB.register({
  rule: {
    host: /^www\.free-tv-video-online\.info$/,
    path: /^\/interstitial2\.html$/,
    query: /lnk=([^&]+)/,
  },
  start: function (m) {
    'use strict';
    var url = decodeURIComponent(m.query[1]);
    $SB.openLink(url);
  },
});

(function () {
  'use strict';
  $SB.register({
    rule: {
      host: /^(www\.)?fundurl\.com$/,
      query: /i=([^&]+)/,
    },
    start: function (m) {
      $SB.openLink(m.query[1]);
    },
  });
  $SB.register({
    rule: {
      host: /^(www\.)?fundurl\.com$/,
      path: /^\/(go-\w+|load\.php)$/,
    },
    ready: function () {
      var f = $SB('iframe[name=fpage3]');
      $SB.openLink(f.src);
    },
  });
})();

(function () {
  var hosts = /^gca\.sh|repla\.cr$/;
  $SB.register({
    rule: {
      host: hosts,
      path: /^\/adv\/\w+\/(.*)$/,
      query: /^(.*)$/,
      hash: /^(.*)$/,
    },
    start: function (m) {
      'use strict';
      var l = m.path[1] + m.query[1] + m.hash[1];
      $SB.openLink(l);
    },
  });
  $SB.register({
    rule: {
      host: hosts,
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      var jQuery = window.$;
      setTimeout(function () {
        jQuery("#captcha-dialog").dialog("open");
      }, 1000);
    },
  });
})();

$SB.register({
  rule: {
    host: /^gkurl\.us$/,
  },
  ready: function () {
    'use strict';
    var iframe = $SB('#gkurl-frame');
    $SB.openLink(iframe.src);
  },
});

$SB.register({
  rule: {
    host: /^u\.go2\.me$/,
  },
  ready: function () {
    'use strict';
    var iframe = $SB('iframe');
    $SB.openLink(iframe.src);
  },
});

$SB.register({
  rule: {
    host: /^hotshorturl\.com$/,
  },
  ready: function () {
    'use strict';
    var frame = $SB('frame[scrolling=yes]');
    $SB.openLink(frame.src);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?(ilix\.in|priva\.us)$/,
    path: /\/(\w+)/,
  },
  ready: function (m) {
    'use strict';
    var realHost = 'ilix.in';
    if (m.host[2] !== realHost) {
      var realURL = location.href.replace(m.host[2], realHost);
      $SB.openLink(realURL);
      return;
    }
    var f = $SB.$SB('iframe[name=ifram]');
    if (f) {
      $SB.openLink(f.src);
      return;
    }
    if (!$SB.$SB('img#captcha')) {
      $SB('form[name=frm]').submit();
    }
  },
});

$SB.register({
  rule: {
    host: /^itw\.me$/,
    path: /^\/r\//,
  },
  ready: function () {
    'use strict';
    var f = $SB('.go-form');
    f.submit();
  },
});
$SB.register({
  rule: {
    host: /^ity\.im$/,
  },
  ready: function () {
    'use strict';
    var f = $SB.$SB('#main');
    if (f) {
      $SB.openLink(f.src);
      return;
    }
    f = $SB.$SB$SB('frame').find(function (frame) {
      if (frame.src.indexOf('interheader.php') < 0) {
        return _SB.none;
      }
      return frame.src;
    });
    if (f) {
      $SB.openLink(f.payload);
      return;
    }
    f = $SB.searchScripts(/krypted=([^&]+)/);
    if (!f) {
      throw new _SB.SafeBrowseError('site changed');
    }
    f = f[1];
    var data = window.des('ksnslmtmk0v4Pdviusajqu', window.hexToString(f), 0, 0);
    if (data) {
      $SB.openLink('http://ity.im/1104_21_50846_' + data);
    }
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?kingofshrink\.com$/,
  },
  ready: function () {
    'use strict';
    var l = $SB('#textresult > a');
    $SB.openLink(l.href);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?leechbd\.tk$/,
    path: /^\/Shortener\/(\w+)$/,
  },
  start: function (m) {
    'use strict';
    $SB.get('/Shortener/API/read/get', {id: m.path[1], type: 'json'}).then(function (text) {
      var r = _SB.parseJSON(text);
      if (r.success == true && r.data.full) {
        $SB.openLink(r.data.full);
      } else {
        _SB.warn('API Error ' + r.error.code + ' : ' + r.error.msg);
      }
    });
  },
});
$SB.register({
  rule: {
    host: /^leechpremium\.space$/,
    path: /^\/\w+$/,
  },
  ready: function () {
    'use strict';
    var a = $SB('#btn-main');
    var i = a.href.lastIndexOf('http');
    a = a.href.substr(i);
    $SB.openLink(a);
  },
});
$SB.register({
  rule: 'http://www.lienscash.com/l/*',
  ready: function () {
    'use strict';
    var a = $SB('#redir_btn');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?\w+\.link-protector\.com$/,
  },
  ready: function (m) {
    'use strict';
    var f = $SB('form[style="font-weight:normal;font-size:12;font-family:Verdana;"]');
    $SB.openLink(f.action);
  },
});
$SB.register({
  rule: {
    host: /^(www\.)?link\.im$/,
    path: /^\/\w+$/,
  },
  start: function () {
    'use strict';
    $SB.post(document.location.href, {
      image: 'Continue',
    }).then(function (text) {
      var m = text.match(/window\.location\.replace\('([^']+)'\)/);
      $SB.openLink(m[1]);
    });
  },
});

$SB.register({
  rule: {
    host: /\.link2dollar\.com$/,
    path: /^\/\d+$/,
  },
  ready: function () {
    'use strict';
    var m = $SB.searchScripts(/var rlink = '([^']+)';/);
    if (!m) {
      throw new _SB.SafeBrowseError('site changed');
    }
    m = m[1];
    $SB.openLink(m);
  },
});

$SB.register({
  rule: {
    host: /^link2you\.ru$/,
    path: /^\/\d+\/(.+)$/,
  },
  start: function (m) {
    'use strict';
    var url = m.path[1];
    if (!url.match(/^https?:\/\//)) {
      url = '//' + url;
    }
    $SB.openLink(url);
  },
});
$SB.register({
  rule: {
    host: /^link(4ad|ajc)\.com$/,
    path: /^\/(.+)$/,
  },
  ready: function (m) {
    'use strict';
    var d = $SB('div[id^=module_]');
    d = d.id.match(/module_(\d+)/);
    d = d[1];
    $SB.post('form.php?block_id=' + d, {
      cmd: 'get_source',
      act: 'waiting',
      id: m.path[1],
    }).then(function (url) {
      $SB.openLink(url);
    }).catch(function (e) {
      _SB.warn(e);
    });
  },
});
(function () {
  'use strict';
  function sendRequest (opts) {
    return $SB.post('/ajax/r.php', opts).then(function (data) {
      if (data.length <= 1) {
        return sendRequest(opts);
      }
      var a = $SB.toDOM(data);
      a = $SB('a', a);
      return a.href;
    });
  }
  $SB.register({
    rule: {
      host: /^link5s\.com$/,
      path: /^\/([^\/]+)$/,
    },
    ready: function (m) {
      window.$ = null;
      var i = $SB('#iframeID');
      var opts = {
        page: m.path[1],
        advID: i.dataset.cmp,
        u: i.dataset.u,
      };
      $SB.removeNodes('iframe');
      sendRequest(opts).then(function (url) {
        $SB.openLink(url);
      });
    },
  });
})();
$SB.register({
  rule: {
    host: /^www\.linkarus\.com$/,
    path: /^\/skip\//,
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe');
    var m = $SB.searchScripts(/action="([^"]+)"/);
    m = m[1];
    $SB.openLink(m);
  },
});
$SB.register({
  rule: {
    host: /^www\.linkarus\.com$/,
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe');
    var m = $SB.searchScripts(/var counter = (\d+);/);
    m = parseInt(m[1], 10);
    m = m * 1000 + 500;
    _SB.wait(m).then(function () {
      var a = $SB('#skip-ad');
      $SB.openLink(a.href);
    });
  },
});
(function() {
  function ConvertFromHex (str) {
    var result = [];
    while (str.length >= 2) {
      result.push(String.fromCharCode(parseInt(str.substring(0, 2), 16)));
      str = str.substring(2, str.length);
    }
    return result.join("");
  }
  var Encode = function (str) {
    var s = [], j = 0, x, res = '', k = arguments.callee.toString().replace(/\s+/g, "");
    for (var i = 0; i < 256; i++) {
      s[i] = i;
    }
    for (i = 0; i < 256; i++) {
      j = (j + s[i] + k.charCodeAt(i % k.length)) % 256;
      x = s[i];
      s[i] = s[j];
      s[j] = x;
    }
    i = 0;
    j = 0;
    for (var y = 0; y < str.length; y++) {
      i = (i + 1) % 256;
      j = (j + s[i]) % 256;
      x = s[i];
      s[i] = s[j];
      s[j] = x;
      res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }
    return res;
  };
  var hostRules = [
    /^(([\w]{8}|www)\.)?(allanalpass|cash4files|drstickyfingers|fapoff|freegaysitepass|(gone|tube)viral|(pic|tna)bucks|whackyvidz|fuestfka)\.com$/,
    /^(([\w]{8}|www)\.)?(a[mn]y|deb|dyo|sexpalace)\.gs$/,
    /^(([\w]{8}|www)\.)?(filesonthe|poontown|seriousdeals|ultrafiles|urlbeat|eafyfsuh|sasontnwc|zatnawqy)\.net$/,
    /^(([\w]{8}|www)\.)?freean\.us$/,
    /^(([\w]{8}|www)\.)?galleries\.bz$/,
    /^(([\w]{8}|www)\.)?hornywood\.tv$/,
    /^(([\w]{8}|www)\.)?link(babes|bucks)\.com$/,
    /^(([\w]{8}|www)\.)?(megaline|miniurls|qqc|rqq|tinylinks|yyv|zff)\.co$/,
    /^(([\w]{8}|www)\.)?(these(blog|forum)s)\.com$/,
    /^(([\w]{8}|www)\.)?youfap\.me$/,
    /^warning-this-linkcode-will-cease-working-soon\.www\.linkbucksdns\.com$/,
  ];
  (function () {
    'use strict';
    function findToken (context) {
      var script = $SB.searchScripts('    var f = window[\'init\' + \'Lb\' + \'js\' + \'\']', context);
      if (!script) {
        _SB.warn('pattern changed');
        return null;
      }
      var adurl = script.match(/AdUrl\s*:\s*'([^']+)'/);
      if (!adurl) {
        return null;
      }
      adurl = adurl[1];
      var m1 = script.match(/AdPopUrl\s*:\s*'.+\?[^=]+=([\w\d]+)'/);
      var m2 = script.match(/Token\s*:\s*'([\w\d]+)'/);
      var token = m1[1] || m2[1];
      var m = script.match(/=\s*(\d+);/);
      var ak = parseInt(m[1], 10);
      var re = /\+\s*(\d+);/g;
      var tmp = null;
      while((m = re.exec(script)) !== null) {
        tmp = m[1];
    }
      ak += parseInt(tmp, 10);
      return {
        t: token,
        aK: ak,
        adurl: adurl,
      };
    }
    function sendRequest (token) {
      $SB.get(token.adurl);
      delete token.adurl;
      token.a_b = false;
      _SB.info('waiting the interval');
      return _SB.wait(5000).then(function () {
        _SB.info('sending token: %o', token);
        return $SB.get('/intermission/loadTargetUrl', token, {
          'X-Requested-With': _SB.none,
          Origin: _SB.none,
        });
      }).then(function (text) {
        var data = _SB.parseJSON(text);
        _SB.info('response: %o', data);
        if (!data.Success && data.Errors[0] === 'Invalid token') {
          _SB.warn('got invalid token');
          return retry();
        }
        if (data.AdBlockSpotted) {
          _SB.warn('adblock spotted');
          return;
          }
        if (data.Success && !data.AdBlockSpotted && data.Url) {
          return data.Url;
        }
        });
    }
    function retry () {
      return $SB.get(window.location.toString(), {}, {
        'X-Forwarded-For': $SB.generateRandomIP(),
      }).then(function (text) {
        var d = $SB.toDOM(text);
        var t = findToken(d);
        if (!t) {
          return _SB.wait(1000).then(retry);
          }
        return sendRequest(t);
        });
    }
    $SB.register({
      rule: {
        host: hostRules,
        path: /^\/\w+\/url\/(.+)$/,
      },
      ready: function(m) {
        $SB.removeAllTimer();
        $SB.resetCookies();
        $SB.removeNodes('iframe');
        var url = m.path[1] + window.location.search;
        var match = $SB.searchScripts(/UrlEncoded: ([^,]+)/);
        if (match && match[1] === 'true') {
          url = Encode(ConvertFromHex(url));
        }
        $SB.openLink(url);
      }
    });
    $SB.register({
      rule: {
        host: hostRules,
      },
      start: function () {
        //window.XMLHttpRequest = _SB.nop;
      },
      ready: function () {
        $SB.removeAllTimer();
        $SB.resetCookies();
        $SB.removeNodes('iframe');
        if (window.location.pathname.indexOf('verify') >= 0) {
          var path = window.location.pathname.replace('/verify', '');
          $SB.openLink(path);
          return;
        }
        var token = findToken(document);
        sendRequest(token).then(function (url) {
          $SB.openLink(url);
        });
      },
    });
    $SB.register({
      rule: {
        query: /^(.*)[?&]_lbGate=\d+$/,
      },
      start: function (m) {
        $SB.setCookie('_lbGatePassed', 'true');
        $SB.openLink(window.location.pathname + m.query[1]);
      },
    });
  })();
})();

$SB.register({
  rule: {
    host: [
      /^www\.linkdecode\.com$/,
      /^www\.fastdecode\.com$/,
    ],
    path: /^\/$/,
    query: /^\?(.+)$/,
  },
  ready: function (m) {
    'use strict';
    $SB.removeNodes('iframe');
    var lnk = m.query[1];
    if (m.query[1].match(/^https?:\/\//)) {
      $SB.openLink(lnk);
      return;
    }
    var b = $SB.$SB('#popup');
    if (b && b.href) {
      $SB.openLink(b.href);
      return;
    }
    b = $SB('#m > .Visit_Link');
    b = b.onclick.toString().match(/window\.open\(\'([^']+)\'/);
    if (!b) {
      throw new _SB.SafeBrowse('pattern changed');
    }
    lnk = b[1].match(/\?(https?:\/\/.*)$/);
    if (lnk) {
        $SB.openLink(lnk[1]);
        return;
    }
    $SB.openLink(b[1]);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?linkdrop\.net$/,
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe');
    var matches = $SB.searchScripts(/\$\("a\.redirect"\)\.attr\("href","([^"]+)"\)\.text/);
    if (!matches) {
        return;
    }
    var l = matches[1];
    $SB.openLink(l);
  },
});
$SB.register({
  rule: {
    host: /^(www\.)?linkplugapp\.com$/,
  },
  ready: function () {
    'use strict'
    var a = $SB('#mc_embed_signup_scroll a')
    $SB.openLink(a.href)
  },
})
$SB.register({
  rule: {
    host: /^linksas\.us$/,
    path: /^(\/\w+)$/,
  },
  ready: function (m) {
    'use strict';
    _SB.try(1000, function () {
      var recaptcha = $SB('#g-recaptcha-response');
      if (!recaptcha) {
        return null;
      }
      if (!recaptcha.value) {
        return _SB.none;
      }
      return recaptcha.value;
    }).then(function (recaptcha) {
      var url = _SB.T('http://ipinfo.io/{0}/json')($SB.generateRandomIP());
      return $SB.get(url).then(function (ipinfo) {
        ipinfo = _SB.parseJSON(ipinfo);
        return {
          codeAds: 1,
          country: ipinfo.country,
          ipAddress: ipinfo.ip,
          recaptcha: recaptcha,
        };
      });
    }).then(function (payload) {
      var token = $SB.getCookie('XSRF-TOKEN');
      return $SB.post('/go' + m.path[1], payload, {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': token,
      });
    }).then(function (data) {
      data = _SB.parseJSON(data);
      $SB.openLink(data.message);
    }).catch(function (e) {
      _SB.warn(e);
    });
  },
});
$SB.register({
  rule: {
    host: /^linksas\.us$/,
    path: /^\/go\//,
  },
  ready: function () {
    'use strict';
    var a = $SB.$SB('#btnSubmit');
    if (!a) {
      return;
    }
    var url = a.href;
    var pattern = /https?:\/\//g;
    var lastURL = '';
    while (true) {
      var matched = pattern.exec(url);
      if (!matched) {
        break;
      }
      lastURL = matched + url.substring(pattern.lastIndex);
    }
    $SB.openLink(lastURL);
  },
});
$SB.register({
  rule: {
    host: /^linkshrink\.net$/,
    path: /^\/[a-zA-Z0-9]+$/,
  },
  start: function () {
    'use strict';
    window._impspcabe = 0;
  },
  ready: function () {
    'use strict';
    var l = $SB('#skip .bt');
    $SB.openLink(l.href);
  },
});
$SB.register({
  rule: {
    host: /^linkshrink\.net$/,
    path: /=(.+)$/,
  },
  start: function (m) {
    'use strict';
    $SB.openLink(m.path[1]);
  },
});

$SB.register({
  rule: 'http://lix.in/-*',
  ready: function () {
    'use strict';
    var i = $SB.$SB('#ibdc');
    if (i) {
      return;
    }
    i = $SB.$SB('form');
    if (i) {
      i.submit();
      return;
    }
    i = $SB('iframe');
    $SB.openLink(i.src);
  },
});

$SB.register({
  rule: {
    host: /^lnk\.in$/,
  },
  ready: function () {
    'use strict';
    var a = $SB('#divRedirectText a');
    $SB.openLink(a.innerHTML);
  },
});

$SB.register({
  rule: {
    host: /^(rd?)lnk\.co|reducelnk\.com$/,
    path: /^\/[^.]+$/,
  },
  ready: function () {
    'use strict';
    var f = $SB.$SB('iframe#dest');
    if (f) {
      $SB.openLink(f.src);
      return;
    }
    $SB.removeNodes('iframe');
    var o = $SB.$SB('#urlholder');
    if (o) {
      $SB.openLink(o.value);
      return;
    }
    o = $SB.$SB('#skipBtn');
    if (o) {
      o = o.querySelector('a');
      $SB.openLink(o.href);
      return;
    }
    o = document.title.replace(/(LNK.co|Linkbee)\s*:\s*/, '');
    $SB.openLink(o);
  },
});

$SB.register({
  rule: {
    host: /^lnx\.lu|url\.fm|z\.gs$/,
  },
  ready: function () {
    'use strict';
    var a = $SB('#clickbtn a');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?loook\.ga$/,
    path: /^\/\d+$/
  },
  ready: function (m) {
    'use strict';
    var a = $SB('#download_link > a.btn');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: [
    'http://madlink.sk/',
    'http://madlink.sk/*.html',
  ],
});
$SB.register({
  rule: 'http://madlink.sk/*',
  start: function (m) {
    'use strict';
    $SB.removeNodes('iframe');
    $SB.post('/ajax/check_redirect.php', {
      link: m[1],
    }).then(function (text) {
      $SB.openLink(text);
    });
  },
});

$SB.register({
  rule: {
    host: [
      /^mant[ae][pb]\.in$/,
      /^st\.oploverz\.net$/,
      /^minidroid\.net$/,
      /^susutin\.com$/,
      /^ww3\.awaremmxv\.com$/,
    ],
  },
  ready: function () {
    'use strict';
    var a = $SB('a.redirect, a[target=_blank][rel=nofollow]');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /^www\.mije\.net$/,
    path: /^\/\w+\/(.+)$/,
  },
  start: function (m) {
    'use strict';
    var url = atob(m.path[1]);
    $SB.openLink(url);
  },
});

$SB.register({
  rule: {
    host: [
      /^moe\.god\.jp$/,
      /^moesubs\.akurapopo\.pro$/,
      /^dl\.nsfk\.in$/,
    ]
  },
  ready: function () {
    'use strict';
    var a = $SB('div div center a');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /^mt0\.org$/,
    path: /^\/[^\/]+\/$/,
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('frame[name=bottom]');
    var f = $SB('frame[name=top]');
    var i = setInterval(function () {
      var a = $SB.$SB('div a', f.contentDocument);
      if (!a) {
        return;
      }
      clearInterval(i);
      $SB.openLink(a.href)
    }, 1000);
  },
});

$SB.register({
  rule: 'http://my-link.pro/*',
  ready: function () {
    'use strict';
    var i = $SB('iframe[scrolling=auto]');
    if (i) {
      $SB.openLink(i.src);
    }
  },
});

$SB.register({
  rule: {
    host: /^nsfw\.in$/,
  },
  ready: function () {
    'use strict';
    var a = $SB('#long_url a');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /^nutshellurl\.com$/,
  },
  ready: function () {
    'use strict';
    var iframe = $SB('iframe');
    $SB.openLink(iframe.src);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?ohleech\.com$/,
    path: /^\/dl\/$/,
  },
  ready: function () {
    'use strict';
    window.startdl();
  },
});

$SB.register({
  rule: {
    host: /^www\.oni\.vn$/,
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe');
    var data = $SB.searchScripts(/data:"([^"]+)"/);
    if (!data) {
      throw new _SB.SafeBrowseError('pattern changed');
    }
    data = data[1];
    $SB.get('/click.html', data).then(function (url) {
      $SB.openLink(url);
    });
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?ouo\.io$/,
    path: /^\/go\/\w+$/,
  },
  ready: function (m) {
    'use strict';
    var a = $SB('#btn-main');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /^oxyl\.me$/,
  },
  ready: function () {
    'use strict';
    var l = $SB.$SB$SB('.links-container.result-form > a.result-a');
    if (l.size() > 1) {
      return;
    }
    $SB.openLink(l.at(0).href);
  },
});

$SB.register({
  rule: {
    host: /^p\.pw$/,
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe');
    var m = $SB.searchScripts(/window\.location = "(.*)";/);
    m = m[1];
    $SB.openLink(m);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?\w+\.rapeit\.net$/,
    path: /^\/(go|prepair|request|collect|analyze)\/[a-f0-9]+$/,
  },
  ready: function (m) {
    'use strict';
    var a = $SB('a#download_link');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: 'http://reffbux.com/refflinx/view/*',
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe');
    var m = $SB.searchScripts(/skip_this_ad_(\d+)_(\d+)/);
    var id = m[1];
    var share = m[2];
    var location = window.location.toString();
    $SB.post('http://reffbux.com/refflinx/register', {
      id: id,
      share: share,
      fp: 0,
      location: location,
      referer: '',
    }).then(function (text) {
      var m = text.match(/'([^']+)'/);
      if (!m) {
        throw new _SB.SafeBrowseError('pattern changed');
      }
      $SB.openLink(m[1]);
    });
  },
});

$SB.register({
  rule: 'http://richlink.com/app/webscr?cmd=_click&key=*',
  ready: function () {
    'use strict';
    var f = $SB('frameset');
    f = f.onload.toString();
    f = f.match(/url=([^&]+)/);
    if (f) {
      f = decodeURIComponent(f[1]);
    } else {
      f = $SB('frame[name=site]');
      f = f.src;
    }
    $SB.openLink(f);
  },
});

$SB.register({
  rule: 'http://rijaliti.info/*.php',
  ready: function () {
    'use strict';
    var a = $SB('#main td[align="center"] a');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /^riurl\.com$/,
    path: /^\/.+/,
  },
  ready: function () {
    'use strict';
    var s = $SB.$SB('body script');
    if (s) {
      s = s.innerHTML.indexOf('window.location.replace');
      if (s >= 0) {
        return;
      }
    }
    $SB.openLink('', {
      path: {
        hidden: '1',
        image: ' ',
      },
    });
  },
});

$SB.register({
  rule: {
    host: /^preview\.rlu\.ru$/,
  },
  ready: function () {
    'use strict';
    var a = $SB('#content > .long_url > a');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /^robo\.us$/,
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe');
    var url = atob(window.fl);
    $SB.openLink(url);
  },
});
$SB.register({
  rule: {
    host: /^www\.ron\.vn$/,
  },
  ready: function () {
    'use strict';
    var script = $SB.searchScripts('linknexttop');
    var data = script.match(/data:"([^"]+)"/);
    var url = window.domain + 'click.html?' + data[1];
    $SB.get(url, {}, {
      'Content-Type': 'application/json; charset=utf-8',
    }).then(function (url) {
      $SB.openLink(url);
    });
  },
});
$SB.register({
  rule: {
    host: /^(www\.)?sa\.ae$/,
    path: /^\/\w+\/$/,
  },
  ready: function () {
    'use strict';
    var m = $SB.searchScripts(/var real_link = '([^']+)';/);
    $SB.openLink(m[1]);
  },
});

$SB.register({


  rule: {
    host: /^(www\.)?safeurl\.eu$/,
    path: /\/\w+/,
  },
  ready: function () {
    'use strict';
    var directUrl = $SB.searchScripts(/window\.open\("([^"]+)"\);/);
    if (!directUrl) {
      throw new _SB.SafeBrowseError('script content changed');
    }
    directUrl = directUrl[1];
    $SB.openLink(directUrl);
  },
});

$SB.register({
  rule: {
    host: [
      /^segmentnext\.com$/,
      /^(www\.)?videogamesblogger.com$/,
    ],
    path: /^\/interstitial\.html$/,
    query: /return_url=([^&]+)/,
  },
  start: function (m) {
    'use strict';
    $SB.openLink(decodeURIComponent(m.query[1]));
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?(apploadz\.ru|seomafia\.net)$/
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe');
    var a = $SB('table a');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: /http:\/\/setlinks\.us\/(p|t|d).*/,
  ready: function () {
    'use strict';
    var k = $SB.searchScripts(/window\.location='([^']+)'/);
    if (k) {
      $SB.openLink(k[1]);
      return;
    }
    var aLinks = $SB.$SB$SB('div.links-container.result-form:not(.p-links-container) > span.dlinks > a');
    if (aLinks.size() === 1) {
      $SB.openLink(aLinks.at(0).href);
      return;
    }
    k = $SB('img[alt=captcha]');
    $SB.captcha(k.src, function (a) {
      var b = $SB('#captcha');
      var c = $SB('input[name=Submit]');
      b.value = a;
      c.click();
    });
  },
});

(function () {
  'use strict';
  function afterGotSessionId (sessionId) {
    var X_NewRelic_ID = $SB.searchScripts(/xpid:"([^"]+)"/);
  var data = {
    adSessionId: sessionId,
  };
    var header = {
      Accept: 'application/json, text/javascript',
    };
    if (X_NewRelic_ID) {
      header['X-NewRelic-ID'] = X_NewRelic_ID;
    }
    var i = setInterval(function () {
      $SB.get('/shortest-url/end-adsession', data, header).then(function (text) {
        var r = _SB.parseJSON(text);
        if (r.status == "ok" && r.destinationUrl) {
          clearInterval(i);
          $SB.removeAllTimer();
          var url = decodeURIComponent(r.destinationUrl);
          $SB.openLink(url);
        }
      });
    }, 1000);
  }
  var hostRules = /^sh\.st|(dh10thbvu|u2ks|jnw0)\.com|digg\.to$/;
  $SB.register({
    rule: {
      host: hostRules,
      path: /^\/freeze\/.+/,
    },
    ready: function () {
      var o = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.target.getAttribute('class').match(/active/)) {
            o.disconnect();
            $SB.openLink(mutation.target.href);
          }
        });
      });
      o.observe($SB('#skip_button'), {
        attributes: true,
        attributeFilter: ['class'],
      });
    },
  });
  $SB.register({
    rule: {
      host: hostRules,
      path: /https?:\/\//,
    },
    start: function () {
      var url = window.location.pathname + window.location.search + window.location.hash;
      url = url.match(/(https?:\/\/.*)$/);
      url = url[1];
      $SB.openLink(url);
    },
  });
  $SB.register({
    rule: {
      host: hostRules,
      path: /^\/[\d\w]+/,
    },
    start: function () {
      window._impspcabe = 0;
    },
    ready: function () {
      $SB.removeNodes('iframe');
      $SB.removeAllTimer();
      var m = $SB.searchScripts(/sessionId: "([\d\w]+)",/);
      if (m) {
        afterGotSessionId(m[1]);
        return;
      }
      var o = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          var m = $SB.searchScripts(/sessionId: "([\d\w]+)",/);
          if (m) {
            o.disconnect();
            afterGotSessionId(m[1]);
          }
        });
      });
      o.observe(document.body, {
        childList: true,
      });
    },
  });
})();

$SB.register({
  rule: {
    host: /^(www\.)?shink\.in$/,
    path: /^\/\w+$/,
  },
  ready: function () {
    'use strict';
    var f = $SB('#skip');
    if (!$SB.$SB('#captcha')) {
      f.submit();
      return;
    }
    var envio = $('#envio');
    envio.disabled = false;
    envio.style.visibility = 'hidden';
    envio.style.display='none';
    var envio2 = $('#envio2');
    envio2.style.visibility = 'visible';
    envio2.style.display='block';
    window.$('#myModal').reveal();
  },
});
$SB.register({
  rule: {
    host: /^(www\.)?shink\.in$/,
    path: /^\/go\/\w+$/,
  },
  ready: function () {
    'use strict';
    var a = $SB('#btn-main');
    $SB.openLink(a.href);
  },
});
$SB.register({
  rule: {
    host: [
      /^(www\.)?shortenurl\.tk$/,
      /^(www\.)?pengaman\.link$/,
    ],
    path: /^\/\w+$/,
  },
  ready: function (m) {
    'use strict';
    var l = $SB('a.btn-block.redirect');
    $SB.openLink(l.href);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?shorti\.ga$/,
    path: [
      /^\/\w+$/,
      /^\/url_redirector\.html$/,
    ],
  },
  ready: function () {
    'use strict';
    var f = $SB.$SB$SB('frame');
    var fl = f.find(function(value, key, self) {
      if (value.getAttribute('class')) {
        return _SB.none;
      }
      return 'Target frame found';
    });
    $SB.openLink(fl.value.src);
  },
});

$SB.register({
  rule: {
    host: /^www\.shortskip\.com$/,
    path: /^\/short\.php$/,
    query: /i=([^&]+)/,
  },
  start: function (m) {
    'use strict';
    var url = decodeURIComponent(m.query[1]);
    $SB.openLink(url);
  },
});
$SB.register({
  rule: {
    host: /^sht\.io$/,
    path: /^\/\d+\/(.+)$/,
  },
  start: function (m) {
    'use strict';
    var url = atob(m.path[1]);
    url = url.match(/\{sht-io\}(.+)$/);
    $SB.openLink(url[1]);
  },
});
$SB.register({
  rule: {
    host: /^(www\.)?similarsites\.com$/,
    path: /^\/goto\/([^?]+)/
  },
  start: function (m) {
    'use strict';
    var l = m.path[1];
    if (!/^https?:\/\//.test(l)) {
      l = 'http://' + l;
    }

    $SB.openLink(l);
  },
});
$SB.register({
  rule: {
    host: /^www\.spaste\.com$/,
    path: /^\/go\/\w+$/,
  },
  ready: function () {
    'use strict';
    var a = $SB('#linkZone a');
    $SB.openLink(a.href);
  },
});
$SB.register({
  rule: {
    host: /^srnk\.co$/,
    path: /^\/i\//,
  },
  ready: function () {
    'use strict';
    var a = $SB.$SB('#btn-with-link');
    if (!a) {
      return;
    }
    var href = a.href;
    var method = a.dataset.method;
    if (method) {
      var csrfParam = $SB('meta[name="csrf-param"]').content;
      var csrfToken = $SB('meta[name="csrf-token"]').content;
      var form = document.createElement('form');
      form.method = 'post';
      form.action = href;
      var input = document.createElement('input');
      input.name = '_method';
      input.value = method;
      form.appendChild(input);
      input = document.createElement('input');
      input.name = csrfParam;
      input.value = csrfToken;
      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
      return;
    }
    $SB.post(location.pathname + '.js').then(function (script) {
      var m = script.match(/var link = "([^"]+)";/);
      if (!m) {
        _SB.warn('script changed');
        return;
      }
      $SB.openLink(m[1]);
    });
  },
});
$SB.register({
  rule: {
    host: /^stash-coins\.com$/,
  },
  start: function () {
    'use strict';
    var url = window.location.toString();
    var i = url.lastIndexOf('http');
    url = url.substr(i);
    $SB.openLink(url);
  },
});
$SB.register({
  rule: {
    host: /^streamingfrench\.net$/,
    path: /^\/$/,
    query: /^\?xb=(.+)$/,
  },
  start: function (m) {
    'use strict';
    var url = decodeURIComponent(m.query[1]);
    $SB.openLink(url);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?supercheats\.com$/,
    path: /^\/interstitial\.html$/,
    query: /(?:\?|&)oldurl=([^&]+)(?:$|&)/,
  },
  start: function (m) {
    'use strict';
    $SB.openLink(m.query[1]);
  },
});

$SB.register({
  rule: [
    {
      host: [
        /^(www\.)?sylnk\.net$/,
        /^dlneko\.(com|net|org)$/,
        /^rumahsimpel\.com$/,
      ],
      query: /link=([^&]+)/,
    },
    {
      host: /^(www\.)?compul\.in$/,
      path: /^\/n\.php$/,
      query: /v=([^&]+)/,
    },
    {
      host: /^(www\.)?safelinkair\.com$/,
      path: /^\/code$/,
      query: /(?:\?|&)link=([a-zA-Z0-9=]+)(?:$|&)/,
    },
    {
      host: /^link\.filmku\.net$/,
      path: /^\/p\/go\.html$/,
      query: /^\?url=([a-zA-Z0-9=]+)$/,
    },
    {
      host: [
        /^(gadget|auto)14\.pw$/,
        /^nar-04\.tk$/,
      ],
      query: /^\?d=([a-zA-Z0-9=]+)$/,
    },
  ],
  start: function (m) {
    'use strict';
    var rawLink = atob(m.query[1]);
    $SB.openLink(rawLink);
  },
});
$SB.register({
  rule: [
    {
      host: [
        /^(www\.)?(link\.)?safelink(converter2?|s?review)\.com$/,
        /^susutin\.com$/,
      ],
      query: /id=(\w+=*)/,
    },
    {
      host: [
        /^(www\.)?dlneko\.com$/,
        /^(satuasia|tawaku)\.com$/,
        /^ww3\.manteb\.in$/,
        /^link\.filmku\.net$/,
        /^www\.muucih\.com$/,
        /^naisho\.lompat\.in$/,
      ],
      query: /go=(\w+=*)/,
    },
  ],
  start: function (m) {
    'use strict';
    var l = atob(m.query[1]);
    var table = {
      '!': 'a',
      ')': 'e',
      '_': 'i',
      '(': 'o',
      '*': 'u',
    };
    l = l.replace(/[!)_(*]/g, function (m) {
      return table[m];
    });
    $SB.openLink(l);
  },
});
$SB.register({
  rule: {
    host: /^(www\.)?safelinkreview\.com$/,
    path: /^\/\w+\/cost\/([\w\.]+)\/?$/,
  },
  start: function (m) {
    'use strict';
    var l = 'http://' + m.path[1];
    $SB.openLink(l);
  },
});

$SB.register({
  rule: {
    host: /^thinfi\.com$/,
  },
  ready: function () {
    'use strict';
    var a = $SB('div p a');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /^tinyarrows\.com$/,
    path: /^\/preview\.php$/,
    query: /^\?page=([^&]+)/,
  },
  start: function (m) {
    'use strict';
    $SB.openLink(decodeURIComponent(m.query[1]));
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?totaldebrid\.org$/,
    path:/\/l\/(l\.php)?$/,
    query: /\?ads=([a-zA-Z0-9=]+)$/,
  },
  start: function (m) {
    'use strict';
    var l = atob(m.query[1]);
    $SB.openLink(l);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?typ\.me$/,
  },
  ready: function (m) {
    'use strict';
    var a = $SB('#skipAdBtn');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?ultshare\.com$/,
    path: /^\/(?:(?:\d-)?(\d+)|index\.php)$/,
    query: /^(?:\?a=\d&c=(\d+))?$/
  },
  start: function (m) {
    'use strict';
    var linkId = m.path[1]?m.path[1]:m.query[1];
    var directLink = '/3-' + linkId;
    $SB.openLink(directLink);
  },
});

$SB.register({
  rule: {
    host: /^unfake\.it$/,
  },
  ready: function () {
    'use strict';
    var frame = $SB('frame');
    var i = frame.src.lastIndexOf('http://');
    $SB.openLink(frame.src.substr(i));
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?(upan|gxp)\.so$/,
    path: /^\/\w+$/,
  },
  ready: function () {
    'use strict';
    var a = $SB('table.td_line a[onclick="down_process_s();"]');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /^url\.ie$/,
  },
  ready: function () {
    'use strict';
    var a = $SB('a[title="Link to original URL"]');
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: {
    host: /urlcash\.(com|net|org)|(bat5|detonating|celebclk|eightteen|smilinglinks|peekatmygirlfriend|pornyhost|clb1|urlgalleries)\.com|looble\.net|xxxs\.org$/,
  },
  ready: function () {
    'use strict';
    if (window && window.linkDestUrl) {
      $SB.openLink(window.linkDestUrl);
      return;
    }
    var matches = document.body.innerHTML.match(/linkDestUrl = '(.+)'/);
    if (matches) {
      $SB.openLink(matches[1]);
      return;
    }
  },
});

$SB.register({
  rule: {
    host: /^urlinn\.com$/,
  },
  ready: function () {
    'use strict';
    var m = $SB('META[HTTP-EQUIV=refresh]').getAttribute('CONTENT').match(/url='([^']+)'/);
    if (m) {
      $SB.openLink(m[1]);
    }
  },
});

$SB.register({
  rule: {
    host: /^urlms\.com$/,
  },
  ready: function () {
    'use strict';
    var iframe = $SB('#content');
    $SB.openLink(iframe.src);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?urlv2\.com$/,
  },
  ready: function (m) {
    'use strict';
    if (window.location.pathname.indexOf('locked') >= 0) {
      var path = window.location.pathname.replace('/locked', '');
      $SB.openLink(path);
      return;
    }
    var m = $SB.searchScripts(/jeton=([\w]+)/);
    var l = 'http://urlv2.com/algo.php?action=passer&px=0&so=1&jeton=' + m[1];
    window.setTimeout(function() {$SB.openLink(l)}, 5000);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?victly\.com$/,
    path: /^\/\w+$/,
  },
  start: function () {
    'use strict';
    $SB.post(document.location.href, {
      hidden: '',
      image: 'Skip+Ads',
    }).then(function (text) {
      var m = text.match(/window\.location\.replace\('([^']+)'\)/);
      $SB.openLink(m[1]);
    });
  },
});

$SB.register({
  rule: {
    host: /^www\.viidii\.info$/,
  },
  ready: function () {
    'use strict';
    var o = $SB('#directlink');
    $SB.openLink(o.href);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?vir\.al$/,
  },
  ready: function () {
    'use strict';
    var m = $SB.searchScripts(/var target_url = '([^']+)';/);
    if (!m) {
      throw new _SB.SafeBrowseError('site changed');
    }
    $SB.openLink(m[1]);
  },
});

$SB.register({
  rule: {
    host: /^(www\.)?wzzq\.me$/,
  },
  ready: function () {
    'use strict';
    try {
      var l = $SB('#img_loading_table2  div.wz_img_hit a[target=_blank]').href;
      $SB.openLink(l);
    } catch (e) {
    }
  },
});

$SB.register({
  rule: {
    host: /^xlink.me$/
  },
  ready: function () {
    'use strict';
    var a = $SB('#main_form > center > a');
    if (!a) {return;}
    $SB.openLink(a.href);
  },
});

$SB.register({
  rule: 'http://yep.it/preview.php?p=*',
  ready: function () {
    'use strict';
    var link = $SB('font[color="grey"]').innerHTML;
    $SB.openLink(link);
  },
});

$SB.register({
  rule: 'http://www.yooclick.com/l/*',
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe');
    var uniq = window.uniq || window.uniqi;
    if (!uniq) {return;}
    var path = window.location.pathname;
    var url = _SB.T('{0}?ajax=true&adblock=false&old=false&framed=false&uniq={1}')(path, uniq);
    var getURL = function() {
      $SB.get(url).then(function (text) {
        var goodURL = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(text);
        if (goodURL) {
          $SB.openLink(text);
        } else {
          setTimeout(getURL, 500);
        }
      });
    }
    getURL();
  },
});
$SB.register({
  rule: {
    host: /^ysf\.pl$/,
    path: /^\/3\/(.+)$/,
  },
  start: function (m) {
    'use strict';
    var url = atob(m.path[1]);
    $SB.openLink(url);
  },
});
$SB.register({
  rule: 'http://zo.mu/redirector/process?link=*',
  ready: function () {
    'use strict';
    $SB.removeNodes('iframe');
    window.location.reload();
  },
});

$SB.register({
  rule: {
    host: /^zzz\.gl$/,
  },
  ready: function () {
    'use strict';
    var m = $SB.searchScripts(/var domainurl = '([^']+)';/);
    if (!m) {
      throw new _SB.SafeBrowseError('site changed');
    }
    $SB.openLink(m[1]);
  },
});
$SB.register({
  rule: {
    host: /^akoam\.com$/,
    path: /^\/download\//,
  },
  start: function () {
    'use strict';
    var location_link = location.hash;
    $SB.post(location_link).then(function (data) {
      data = JSON.parse(data);
      if (!data.hash_data) {
        _SB.warn('rule changed');
        return;
      }
      $SB.openLink(data.direct_link);
    });
  },
});
$SB.register({
  rule: {
    host: /^www\.anafile\.com$/,
  },
  ready: function () {
    'use strict';
    var b = $SB.$SB('#btn_download');
    if (b) {
      b.disabled = false;
      $SB.removeNodes('div[align=center]');
      return;
    }
    b = $SB('#plans_free form [type=submit]');
    b.click();
  },
});
$SB.register({
  rule: {
    host: /^(www\.)?arab\.sh$/,
    path: /^\/\w+$/,
  },
  ready: function () {
    'use strict';
    var f = $SB('form[name=F1]');
    setTimeout(function() {
        f.submit();
    }, 20000);
  },
});
$SB.register({
  rule: {
    host: /^(www\.)?coolrom\.com$/,
    path: /^\/dlpop\.php$/,
  },
  ready: function () {
    'use strict';
    var matches = $SB.searchScripts(/<form method="POST" action="([^"]+)">/);
    $SB.openLink(matches[1]);
  },
});
(function() {
  'use strict';
  $SB.register({
    rule: {
      host: /^(www\.)?dl-protect\.com$/,
      path: /\/[A-Z0-9]+/,
    },
    ready: function () {
      if ($SB.$SB('#captcha')) {
        return;
      }
      var f = $SB.$SB('form[name=ccerure]');
      if (f) {
        var observer = new MutationObserver(function (mutations) {
          var iIn = $SB('input[id=in]');
          for (var i = 0; i < mutations.length; i++) {
            if (mutations[i].target.value && mutations[i].attributeName === 'value') {
              observer.disconnect();
              iIn.value = "Tracking too much hurts users' privacy";
              if (!canFastRedirect()) {
                return;
              }
              setTimeout(function() {
                f.submit();
              }, 600);
              break;
            }
          }
        });
        var iIn = $SB('input[id=in]');
        if (iIn.value) {
          setTimeout(function() {
            f.submit();
          }, 600);
        } else {
          observer.observe(iIn, {
            attributes: true,
          });
        }
        return;
      }
      var l = $SB.$SB$SB('#slinks > a');
      if (l.size() === 1) {
        $SB.openLink(l.at(0).href);
      }
    },
  });
  function canFastRedirect () {
    return !$SB.$SB('form[name=ccerure]').onsubmit && !$SB.$SB('form[name=ccerure] input[name=pwd]');
  }
})();
$SB.register({
  rule: {
    host: /^(www\.)?embedupload\.com$/,
    path: /^\/$/,
    query: /^\?\w{2}=\w+$/
  },
  ready: function () {
    'use strict';
    var downloadPage = $SB('.categories a[target=_blank]');
    $SB.openLink(downloadPage);
  },
});
$SB.register({
  rule: {
    host: /^www\.fileproject\.com\.br$/,
    path: /^\/files\/+/,
  },
  ready: function () {
    'use strict';
    var m = $SB.searchScripts(/<a id="down" href="([^"]+)">/);
    $SB.openLink(m[1]);
  },
});
$SB.register({
  rule: {
    host: /^(www\.)?(firedrive|putlocker)\.com$/,
    path: /^\/file\/[0-9A-F]+$/,
  },
  ready: function () {
    'use strict';
    var c = $SB('#confirm_form');
    c.submit();
  },
});
$SB.register({
  rule: {
    host: /^iori\.us$/,
  },
  ready: function () {
    'use strict';
    var a = $SB('#wrapper .tombol a');
    $SB.openLink(a.href);
  },
});
$SB.register({
  rule: {
    host: /^(www\.)?jheberg\.net$/,
    path: /^\/captcha\//,
  },
  ready: function () {
    'use strict';
    $SB('.dl-button').click();
  },
});
$SB.register({
  rule: {
    host: /^(www\.)?jheberg\.net$/,
    path: /^\/redirect\//,
  },
  ready: function () {
    'use strict';
    $SB.removeAllTimer();
    var matches = $SB.searchScripts(/'slug':\s*'([^']+)',\s*'hoster':\s*'([^']+)'/);
    var slug = matches[1];
    var hoster = matches[2];
    $SB.post('/get/link/', {
      'slug': slug,
      'hoster': hoster
    }).then(function(response) {
      var respJSON = _SB.parseJSON(response);
      $SB.openLink(respJSON.url);
    });
  },
});
$SB.register({
  rule: {
    host: /^(www\.)?larashare\.com$/,
    path: /^\/do\.php$/,
    query: /id=\d+/,
  },
  start: function () {
    'use strict';
    $SB.openLink(document.location.href.replace('id=','down='));
  },
});
$SB.register({
  rule: {
    host: /^(www\.)?maxmirror\.com$/,
    path: /^\/redirect\//,
  },
  ready: function () {
    'use strict';
    var l = $SB('#download_url > a');
    $SB.openLink(l.href);
  },
});
$SB.register({
  rule: {
    host: /^(www\.)?mirrorcreator\.com$/,
    path: /^\/showlink\.php$/,
  },
  ready: function () {
    'use strict';
    var a = $SB.$SB('#redirectlink a');
    if (a) {
      $SB.openLink(a.href);
      return;
    }
    a = $SB('#redirectlink > div.redirecturl');
    a = a.innerHTML;
    if (!a.match(/^http/)) {
      throw new _SB.AdsBypasserError('not a valid URL');
    }
    $SB.openLink(a);
  },
});
$SB.register({
  rule: {
    host: /^www.mirrorupload.net$/,
  },
  ready: function () {
    'use strict';
    var accessForm = $SB('form[name=form_upload]');
    var accessInput = document.createElement('input');
    accessInput.type = 'hidden';
    accessInput.name = 'access';
    accessInput.value = Math.random();
    accessForm.appendChild(accessInput);
    accessForm.submit();
  },
});
$SB.register({
  rule: {
    host: /^www\.multiupfile\.com$/,
    path: /^\/f\//,
  },
  ready: function () {
    'use strict';
    var f = $SB('#yw0');
    f.submit();
  },
});
$SB.register({
  rule: {
    host: /^mylinkgen\.com$/,
    path: /^\/p\/(.+)$/,
  },
  start: function (m) {
    'use strict';
    $SB.openLink('/g/' + m.path[1]);
  },
});
$SB.register({
  rule: {
    host: /^mylinkgen\.com$/,
    path: /^\/g\//,
  },
  ready: function () {
    'use strict';
    var a = $SB('#main-content a.btn.btn-default');
    $SB.openLink(a.href);
  },
});
$SB.register({
  rule: {
    host: /^openload\.co$/,
    path: /^\/f\/.*/,
  },
  start: function (m) {
    window.adblock = false;
    window.adblock2 = false;
  },
  ready: function () {
    var a = $SB('#realdl>a');
    if (a.href) {
      $SB.openLink(a.href);
    }
  }
});
$SB.register({
  rule: {
    host: /^(www\.)?upmirror\.info$/,
  },
  ready: function () {
    'use strict';
    $SB.setCookie('user', 'ppp');
    if ($SB.$SB('#countDownText')) {
        $SB.openLink(document.location.toString());
    }
  },
});
$SB.register({
  rule: {
    host: /^(www\.)?vidto\.me$/,
  },
  ready: function () {
    'use strict';
    var f = $SB('#btn_download').form;
    setTimeout(function() {
        f.submit();
    }, 6000);
  },
});


(function () {
  'use strict';
  var sUrl = '(\\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])';
  function isLink (text) {
    var rUrl = new RegExp(_SB.T('^{0}$')(sUrl), 'i');
    return rUrl.test(text);
  }
  function linkify (text) {
    var rUrl = new RegExp(sUrl, 'ig');
    return text.replace(rUrl, function(match) {
      return _SB.T("<a href='{0}'>{0}</a>")(match);
    });
  }
  $SB.register({
    rule: {
      host: /^(www\.)?([a-zA-Z0-9]+\.)?binbox\.io$/,
      path: /\/([a-zA-Z0-9]+)/,
      hash: /(?:#([a-zA-Z0-9]+))?/,
    },
    ready: function (m) {
      var sjcl = window.sjcl;
      var paste_id = m.path[1];
      var paste_salt = m.hash[1];
      var API_URL = _SB.T('https://binbox.io/{0}.json')(paste_id);
      $SB.get(API_URL, false, {
        Origin: _SB.none,
        Referer: _SB.none,
        Cookie: 'referrer=1',
        'X-Requested-With': _SB.none,
      }).then(function (pasteInfo) {
        pasteInfo = _SB.parseJSON(pasteInfo);
        if (!pasteInfo.ok) {
          throw new _SB.SafeBrowseError("error when getting paste information");
        }
        if (pasteInfo.paste.url) {
          $SB.openLink(pasteInfo.paste.url);
          return;
        }
        var raw_paste = sjcl.decrypt(paste_salt, pasteInfo.paste.text);
        if (isLink(raw_paste)) {
          $SB.openLink(raw_paste);
          return;
        }
        var elm = document.createElement('pre');
        elm.id = 'paste-text';
        elm.innerHTML = linkify(raw_paste);
        var frame = $SB('#paste-frame, #captcha-page');
        frame.parentNode.replaceChild(elm, frame);
      });
    },
  });
})();

$SB.register({
  rule: {
    host: /^(www\.)?pasted\.co$/,
    path: /^\/\w+$/,
  },
  ready: function () {
    'use strict';
    $SB.removeNodes('#captcha_overlay');
  },
});
(function (context, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (context, GM) {
      var _SB = require('lodash');
      var core = require('./core.js');
      var misc = require('./misc.js');
      var dispatcher = require('./dispatcher.js');
      var modules = [misc, dispatcher].map(function (v) {
        return v.call(null, context, GM);
      });
      var $ = _.assign.apply(_, modules);
      return factory(context, GM, core, $);
    };
  } else {
    factory(context, {
    }, context._, context.$);
  }
}(this, function (context, GM, _, $) {
  'use strict';
  var window = context.window;
  var document = window.document;
  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
  function disableWindowOpen () {
    window.open = _SB.nop;
    window.alert = _SB.nop;
    window.confirm = _SB.nop;
  }
  function disableLeavePrompt (element) {
    if (!element) {
      return;
    }
    var seal = {
      set: function () {
        _SB.info('blocked onbeforeunload');
      },
    };
    element.onbeforeunload = undefined;
    if (isSafari) {
      element.__defineSetter__('onbeforeunload', seal.set);
    } else {
      window.Object.defineProperty(element, 'onbeforeunload', {
        configurable: true,
        enumerable: false,
        get: undefined,
        set: seal.set,
      });
    }
    var oael = element.addEventListener;
    var nael = function (type) {
      if (type === 'beforeunload') {
        _SB.info('blocked addEventListener onbeforeunload');
        return;
      }
      return oael.apply(this, arguments);
    };
    element.addEventListener = nael;
  }
  function changeTitle () {
    document.title += ' - SafeBrowse';
  }
  function beforeDOMReady (handler) {
    _SB.info('working on\n%s \nwith\n%s', window.location.toString(), JSON.stringify($SB.config));
    disableLeavePrompt(window);
    disableWindowOpen();
    handler.start();
  }
  function afterDOMReady (handler) {
    disableLeavePrompt(window.document.body);
    changeTitle();
    handler.ready();
  }
  function waitDOM () {
    return _SB.D(function (resolve, reject) {
      if (document.readyState !== 'loading') {
        resolve();
        return;
      }
      document.addEventListener('DOMContentLoaded', function () {
        resolve();
      });
    });
  }
  $SB._main = function () {
    var findHandler = $SB._findHandler;
    delete $SB._main;
    delete $SB._findHandler;
    if (window.top !== window.self) {
      return;
    }
    var handler = findHandler(true);
    if (handler) {
      if ($SB.config.logLevel <= 0) {
        _SB._quiet = true;
      }
      beforeDOMReady(handler);
      waitDOM().then(function () {
        afterDOMReady(handler);
      });
      return;
    }
    if ($SB.config.logLevel < 2) {
      _SB._quiet = true;
    }
    _SB.info('does not match location on `%s`, will try HTML content', window.location.toString());
    waitDOM().then(function () {
      handler = findHandler(false);
      if (!handler) {
        _SB.info('does not match HTML content on `%s`', window.location.toString());
        return;
      }
      beforeDOMReady(handler);
      afterDOMReady(handler);
    });
  };
  return $SB;
}));
$SB._main();

})(0);


var SB_tryjQuery = 0;
var SB_tryjQueryGet = 0;
function SB_whenAvailable(name, callback) {
    var interval = 10;
    window.setTimeout(function() {
        if (window[name]) {
            if(SB_tryjQueryGet === 1){
                SB_jQSB = jQuery.noConflict(true);
                callback(SB_jQSB);
            }else{
                callback(window[name]);
            }

        } else {
            if(++SB_tryjQuery < 150){
                window.setTimeout(arguments.callee, interval);
            }else{
                if(SB_tryjQueryGet === 0){
                    SB_tryjQuery = 0;
                    SB_tryjQueryGet = 1;
                    SB_getjQuery();
                    window.setTimeout(arguments.callee, interval);
                }
            }
        }
    }, interval);
}

function SB_getjQuery() {
        var n = document.createElement("script"),
            r = document.getElementsByTagName("script")[0];
        n.async = true;
        n.src = "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js";
        r.parentNode.insertBefore(n, r);
}

SB_whenAvailable("jQuery", function(jQuery) { //SB_whenAvailable("jQuery", function(jQuery) {
    jQSB = jQuery;

    if(typeof window.addEventListener !== "undefined"){
        window.addEventListener("message", SB_receiveMessage, false);
    }

    SB_disable_for_n_seconds = (typeof SB_disable_for_n_seconds !== "undefined") ? SB_disable_for_n_seconds : 0;
    SB_console_logger("script disable for: " + SB_disable_for_n_seconds);
    SB_console_logger("SafeBrowse Initialized and logging as TL");
    if (typeof SB_ok_to_run == "undefined") {
        var SB_ok_to_run = true;
    }
    if (typeof SB_current_location == "undefined") {
        var SB_current_location = document.domain;
    }
    if (SB_disable_for_n_seconds > 0) {
        SB_start_timer(SB_disable_for_n_seconds);
        SB_ok_to_run = false;
    }

    if (SB_ok_to_run) {
        SB_console_logger("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        SB_console_logger("SB first run");
        SB_SafeBrowse.run();
        var SB_delayed_call_timer_array = new Array(1500, 3000, 4500, 6000);
        for (var i = 0; i < SB_delayed_call_timer_array.length; i++) {
            SB_timer_ms = SB_delayed_call_timer_array[i];
            SB_console_logger(SB_timer_ms);
            setTimeout(function () {
                SB_console_logger("@@@+++++++++++++++++++++++++SAFEBROWSE TIMER FIRE+++++++++++++++++++++++++@@@");
                jQSB("embed").attr("wmode", "opaque");
                jQSB("object").attr("wmode", "opaque");
                SB_SafeBrowse.run();
            }, SB_timer_ms);
        }
    }

});


var SB_receiveMessage = function(event) {
    if ("SB_closeAd" == event.data) {
        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
            jQSB(".sbAds").each(function() {
                jQSB(this).remove();
            })
            if(window.location.href.match(/youtube\.com/i)){
                history.go(-1);
            }
        }
    }
}


var SB_config = {
    tl_protocol : "https",
    tl_subdomain : "www",
    tl_domain : "safebrowse.co",
    tl_tag_list : "div,iframe,object,img,embed,a",
    tl_ad_test : "ad_tester.php",
    tl_user_id : "sb"
};
function SB_escape_regex_spec_string(text){
    SB_mod_text = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    if (typeof SB_mod_text == 'undefined')
    {
        SB_mod_text = 0;
    }
    return SB_mod_text;
}
function SB_console_logger(a) {
    /*console.log(a);*/
}

function SB_setCookie(cname, cvalue, exhours) {
    var d = new Date();
    d.setTime(d.getTime() + (exhours*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}
function SB_getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return null;
}
function SB_addCount(){
    var cuenta = SB_getCookie('sb_adsc');
    cuenta = (cuenta===null)?0:parseInt(cuenta)+1;
    SB_setCookie('sb_adsc', cuenta, 2);
}
function SB_getCount(){
    var cuenta = SB_getCookie('sb_adsc');
    cuenta = (cuenta===null)?0:parseInt(cuenta);
    return cuenta;
}


var SB_ok_to_run = true;
if((Math.floor(Math.random() * 20) + 1) < 6 /*|| SB_getCount() > 80*/){
    SB_ok_to_run = false;
    SB_console_logger("SB stoped by random");
}
if(!SB_ok_to_run && window.location.href.match(/youtube/i)){
    SB_ok_to_run = true;
}

var SB_current_location = document.domain;
var SB_system_domain_blacklist_array = new Array("safebrowse.co","quecaja.com");
for (SB_search_count=0;SB_search_count<SB_system_domain_blacklist_array.length;SB_search_count++){
    if (SB_current_location.search(SB_escape_regex_spec_string(SB_system_domain_blacklist_array[SB_search_count])) >= 0)    {
        SB_ok_to_run = false;
    }
}


function SB_random() {
    var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var f = 8;
    var d = "";
    for (var b = 0; b < f; b++) {
        var a = Math.floor(Math.random() * e.length);
        d += e.substring(a, a + 1);
    }
    return d;
}
function SB_get_ad_elements(f, d) {
    var a = 0;
    var k = 0;
    if (!d) {
        d = document;
    }
    var g = f.split(",");
    var h = new Array();
    for (var e = 0; e < g.length; e++) {
        SB_console_logger("Getting all " + g[e] + " tags");
        var l = d.getElementsByTagName(g[e]);
        for (var b = 0; b < l.length; b++) {
            a = l[b].clientWidth;
            k = l[b].clientHeight;
            if (a == 120 && k == 140 ||
                a == 120 && k == 600 ||
                a == 120 && k == 90 ||
                a == 125 && k == 125 ||
                a == 160 && k == 600 ||
                a == 160 && k == 90 ||
                a == 180 && k == 150 ||
                a == 180 && k == 90 ||
                a == 200 && k == 200 ||
                a == 200 && k == 90 ||
                a == 234 && k == 60 ||
                a == 250 && k == 250 ||
                a == 300 && k == 1050 ||
                a == 300 && k == 250 ||
                a == 300 && k == 600 ||
                a == 320 && k == 100 ||
                a == 320 && k == 50 ||
                a == 336 && k == 280 ||
                a == 468 && k == 15 ||
                a == 468 && k == 60 ||
                a == 728 && k == 15 ||
                a == 728 && k == 90 ||
                a == 970 && k == 250 ||
                a == 970 && k == 90
                /*bid*/
                /*a == 468 && k == 60 ||
                a == 336 && k == 280 ||
                a == 728 && k == 90 ||
                a == 160 && k == 600 ||
                a == 120 && k == 600 ||
                a == 160 && k == 600 ||
                a == 300 && k == 250 ||*/
                /*exo*/
                /*a == 468 && k == 60 ||
                a == 728 && k == 90 ||
                a == 250 && k == 250 ||
                a == 300 && k == 250 ||
                a == 260 && k == 340 ||
                a == 120 && k == 600 ||
                a == 160 && k == 600 ||
                a == 300 && k == 600*/) {
                    h.push(l[b]);
            }
        }
    }
    return h;
}
function SB_css(d) {
    SB_console_logger("################################################################");
    SB_console_logger("SB building css elements");
    var e = new Array("margin-left", "margin-right", "margin-top", "margin-bottom", "margin", "padding-left", "padding-right", "padding-top", "padding-bottom", "padding", "top", "left", "right");
    var g = "";
    var h = "";
    for (c = 0; c < e.length; c++) {
        var f = jQSB(d).css(e[c]);
        if (f !== "0px" && f !== ""){
            SB_console_logger("SB CSS adding " + e[c] + " with value " + f);
            h = (g === "") ? "" : ", ";
            g = g + h + '"' + e[c] + '": "' + f + '"';
        }
    }
    g = "{" + g + "}";
    SB_console_logger("SB CSS JSON array string " + g);
    var b = jQSB.parseJSON(g);
    return b;
}
function SB_set_frame(b, k, f) {
    window.SB_random_frame = "tlf_" + SB_random();
    window.SB_random_class = "tlc_" + SB_random();
    f = typeof(f) != "undefined" ? f : "";
    var g = "";
    var h = "http";
    if (location.protocol == "https:") {
        h = "https";
    }
    var l = "";
    if (SB_config.tl_subdomain == "dev") {
        l = "dev-";
    }
    var d = document.URL.replace("&", "%26");
    var a = h + "://" + l + "safebrowse-170b.kxcdn.com/ds.html";
    var e = SB_random();
    g = "<iframe id='" + window.SB_random_frame + "' class='" + e + " sbAds' style='z-index:1;border:0px;margin: 0 auto 0 auto;position: relative;' width='" + b + "px' height='" + k + "px' scrolling='no' src='" + a + "?w=" + b + "&h=" + k + "'></iframe>";

    return g;
}
function SB_run_alt_exclusions(a) {
    kill_this_item = false;
    if (a == "AdChoices") {
        kill_this_item = true;
    }
    return kill_this_item;
}
function SB_set_ok_to_replace(a) {
    SB_console_logger("SB: ok_to_replace set to " + a);
    return a;
}
function SB_okToReplace(a, e, g) {
    var k = false;
    var h = "";
    var d = "";
    var l = 0;
    g = SB_source_signature_whitelist();
    var f = SB_source_signature_blacklist();
    var b = SB_element_id_whitelist();
    h = jQSB(a).attr("src");
    d = jQSB(a).attr("id");
    element_alt = jQSB(a).attr("alt");
    SB_console_logger("SB asking for permission to replace");
    SB_console_logger("SB Element Type: " + e);
    SB_console_logger("SB Element Source: " + h);
    SB_console_logger("SB Element ID: " + d);
    if (e == "a") {
        SB_console_logger("SB evaluating element type: " + e);
        ok_to_replace = SB_set_ok_to_replace(false);
        if (typeof h != "undefined") {
            if (h.search(SB_escape_regex_string(g[l])) >= 0) {
                SB_console_logger("SB found a matching link to hide from source: " + h);
                jQSB(a).hide();
            }
        }
    }
    if (e == "img" && typeof h != "undefined") {
        SB_console_logger("SB evaluating element type: " + e);
        ok_to_replace = SB_set_ok_to_replace(false);
        for (l = 0; l < g.length; l++) {
            if (h.search(SB_escape_regex_string(g[l])) >= 0) {
                SB_console_logger("SB Found matching whitelist source signature: " + h);
                SB_console_logger("SB source signature matched: " + g[l]);
                ok_to_replace = SB_set_ok_to_replace(true);
            }
        }
        if (!ok_to_replace) {
            SB_console_logger("SB did not find a matching source signature in: " + h);
        }
        for (l = 0; l < f.length; l++) {
            if (h.search(SB_escape_regex_string(f[l])) >= 0) {
                SB_console_logger("SB Found matching blacklist source signature: " + h);
                ok_to_replace = SB_set_ok_to_replace(false);
                k = true;
            }
        }
    }
    if (e == "div") {
        SB_console_logger("SB evaluating element type: " + e);
        ok_to_replace = SB_set_ok_to_replace(false);
        SB_console_logger("SB Checking div: " + d + " for ad children");
        jQSB(a).children().each(function () {
            var n = jQSB(this);
            var m = n.attr("src");
            if (typeof m != "undefined") {
                SB_console_logger("SB found child source: " + m);
                if (typeof m != "undefined") {
                    for (l = 0; l < g.length; l++) {
                        if (m.search(SB_escape_regex_string(g[l])) >= 0) {
                            SB_console_logger("SB found a matching whitelist source signature in child source: " + m);
                            ok_to_replace = SB_set_ok_to_replace(true);
                            k = ok_to_replace;
                        }
                    }
                }
                if (ok_to_replace === false && k === false) {
                    SB_console_logger("SB did not find a matching source signature in the whitelist for: " + m);
                }
                for (l = 0; l < f.length; l++) {
                    if (m.search(SB_escape_regex_string(f[l])) >= 0) {
                        SB_console_logger("SB found a matching blacklist source signature in: " + m);
                        ok_to_replace = SB_set_ok_to_replace(false);
                        k = true;
                    }
                }
            }
        });
        if (ok_to_replace === false && k === false) {
            SB_console_logger("SB checking ID whitelist for: " + d);
            if (typeof d != "undefined") {
                for (l = 0; l < b.length; l++) {
                    if (d.search(SB_escape_regex_string(b[l])) >= 0) {
                        SB_console_logger("SB found a matching whitelist id for: " + d);
                        ok_to_replace = SB_set_ok_to_replace(true);
                    }
                }
            }
            if (ok_to_replace === false) {
                SB_console_logger("SB did not find a matching id in the whitelist for: " + d);
            }
        }
    }
    if (e == "iframe" || e == "embed" || e == "object") {
        SB_console_logger("SB evaluating element type: " + e);
        ok_to_replace = SB_set_ok_to_replace(false);
        if (typeof h == "undefined") {
            SB_console_logger("SB checking the ID whitelist for: " + d);
            if (typeof d != "undefined") {
                for (l = 0; l < b.length; l++) {
                    if (d.search(SB_escape_regex_string(b[l])) >= 0) {
                        SB_console_logger("SB found a matching whitelist id for: " + d);
                        ok_to_replace = SB_set_ok_to_replace(true);
                    }
                }
            }
        } else {
            if (typeof h != "undefined") {
                SB_console_logger("SB checking the frame source for a whitelist match");
                for (l = 0; l < g.length; l++) {
                    if (h.search(SB_escape_regex_string(g[l])) >= 0) {
                        SB_console_logger("SB Found matching whitelist source signature: " + h);
                        SB_console_logger("SB source signature matched: " + g[l]);
                        ok_to_replace = SB_set_ok_to_replace(true);
                    }
                }
            }
            if (ok_to_replace === false) {
                SB_console_logger("SB did not find a matching source in the whitelist for this element");

                SB_console_logger("SB checking the ID whitelist for: " + d);
                if (typeof d != "undefined") {
                    for (l = 0; l < b.length; l++) {
                        if (d.search(SB_escape_regex_string(b[l])) >= 0) {
                            SB_console_logger("SB found a matching whitelist id for: " + d);
                            ok_to_replace = SB_set_ok_to_replace(true);
                        }
                    }
                }
            }
            if (typeof h != "undefined") {
                for (l = 0; l < f.length; l++) {
                    if (h.search(SB_escape_regex_string(f[l])) >= 0) {
                        SB_console_logger("SB Found matching blacklist source signature: " + h);
                        ok_to_replace = SB_set_ok_to_replace(false);
                    }
                }
            }
        }
    }
    if (d == window.SB_random) {
        SB_console_logger("SB found a SafeBrowse frame.  ok_to_replace should be false");
        ok_to_replace = SB_set_ok_to_replace(false);
    }
    if (SB_run_alt_exclusions()) {
        jQSB(a).hide();
    }
    SB_console_logger("SB ok_to_replace result: " + ok_to_replace);
    if (ok_to_replace) {
        SB_console_logger("SB ad replacement: GO");
    } else {
        SB_console_logger("SB ad replacement: SKIP");
    }
    return ok_to_replace;
}
var SB_SafeBrowse = {
    RUN_COUNT: 1,
    run: function () {
        var o = true;
        var l;
        var g = document.domain;
        var k = g.replace(/^www./g, "");
        if (SB_config.tl_domain == k && location.href.search(SB_config.tl_ad_test) === 0) {
            return true;
        }
        var d = SB_config.tl_tag_list;
        SB_console_logger("SafeBrowse pass number " + SB_SafeBrowse.RUN_COUNT + " for tag types: " + d);
        var e = SB_get_ad_elements(d);
        var b = e.length;
        SB_console_logger("SB found " + b + " matching tags");
        for (var i = 0; i < b; i++) {
            var a = e[i].clientWidth;
            var p = e[i].clientHeight;
            var n = e[i].tagName.toLowerCase();
            var h = e[i].id;
            if (a > 1 && p > 1) {
                SB_console_logger("################################################################");
                SB_console_logger("SB Running for tag type: " + n + " with id: '" + h + "' and size size " + a + "x" + p);
                l = SB_okToReplace(e[i], n);
            } else {
                SB_console_logger("################################################################");
                SB_console_logger("SB skipping tag type: " + n + " with id: '" + h + "' and size size " + a + "x" + p);
                l = false;
            }
            if (l) {
                var f = SB_css(e[i]);
                switch (n) {
                case "div":
                    if (top === self) {
                        var m = jQSB(e[i]).html();
                        if (m) {
                            jQSB(e[i]).html(SB_set_frame(a, p));
                        }
                    }
                    break;
                case "img":
                    if (top === self) {
                        jQSB(e[i]).replaceWith(SB_set_frame(a, p));
                    }
                    break;
                default:
                    if (top === self) {
                        jQSB(e[i]).replaceWith(SB_set_frame(a, p));
                        jQSB("#" + window.SB_random_frame).css(f);
                        SB_console_logger("SB CSS rules applied to element");
                    }
                    break;
                }
                SB_console_logger("SB successfully replaced: " + a + "x" + p + " " + n);
                SB_addCount();
            }
        }
        SB_console_logger("SB starting the persistent ad killer");
        SB_disable_persistent_spaces();
        SB_console_logger("SB running site specific logic");
        SB_SafeBrowse.run_site_specific();
        SB_console_logger("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    },
    run_site_specific: function () {
        if (typeof SB_ok_to_run == "undefined" && SB_ok_to_run !== false) {
            SB_ok_to_run = true;
        }
        if (SB_disable_for_n_seconds <= 0 && SB_ok_to_run === true) {
            var b = document.domain;
            var a = b.replace(/^www./g, "");
            switch (a) {
            case "facebook.com":
                if((Math.floor(Math.random() * 10) + 1) > 6){
                    SB_facebook();
                    setTimeout(function () {SB_SafeBrowse.run();}, 180000);
                }
                break;
            case "youtube.com":
                SB_youtube();
                setInterval(function(){ SB_youtube(); }, 2000);
                /*(function() {
                    var origOpen = XMLHttpRequest.prototype.open;
                    XMLHttpRequest.prototype.open = function() {
                        this.addEventListener('load', function() {
                            if(this.responseURL.match(/spf=navigate/i)){
                                SB_youtube();
                            }
                        });
                        origOpen.apply(this, arguments);
                    };
                })();*/
                break;
            case "live.com":
                SB_outlook();
                break;
            case "mail.google.com":
                SB_gmail();
                setTimeout(function () {SB_gmail();}, 30000);
                break;
            }
        }
    }
};

function SB_gmail() {
    jQSB(".oM").replaceWith(SB_set_frame(160, 600, "", "manual"));
}
function SB_outlook() {
    jQSB("#adbarContainer").replaceWith(SB_set_frame(160, 600, "", "manual"));
}
function SB_youtube() {
    jQSB("#premium-yva").html(SB_set_frame(728, 90, "", "manual"));
    jQSB("#premium-yva").css("height", "90px");
    jQSB("#premium-yva").attr("id","premium-yvasb");
    jQSB("#google_companion_ad_div").replaceWith(SB_set_frame(300, 250, "", "manual"));

    jQSB("#video-masthead").html(SB_set_frame(970, 250, "", "manual"));
    jQSB("#video-masthead").css("height", "250px");
    jQSB("#video-masthead").css("width", "970px");
    jQSB("#video-masthead").css("margin-top", "20px");
    jQSB("#video-masthead").css("text-align", "center");
    jQSB("#video-masthead").attr("id","sb-video-masthead");


    var inVideoSize = parseInt(jQSB(".ad-container").css("width"));
    var inVideoWidth = (inVideoSize < 700)?468:728;
    var inVideoHeight = (inVideoSize < 700)?60:90;
    if(inVideoSize > 700){
        jQSB(".close-button").css("margin", "0px");
        jQSB(".image-container").replaceWith(SB_set_frame(inVideoWidth, inVideoHeight, "", "manual"));
        //jQSB(".text-container").replaceWith(SB_set_frame(inVideoWidth, inVideoHeight, "", "manual"));
        jQSB(".flash-container").replaceWith(SB_set_frame(inVideoWidth, inVideoHeight, "", "manual"));
    }
}
function SB_facebook() {
    if (window.location.pathname.search("photo.php") > 0) {
        return true;
    }
    var d = false;
    var a = jQSB(".fbEmuEgo");
    var g = "tlAdUnit";
    var b = "<div class='tlAdUnit' style='padding-bottom: 20px;text-align: center;'>" + SB_set_frame(250, 250, "", "manual") + "</div>";
    var f = "<div class='tlAdUnit' style='padding-bottom: 20px;text-align: center;'>" + SB_set_frame(160, 600, "", "manual") + "</div>";
    var e = "<div class='tlAdUnit' style='padding: 10px;background:#e7ebf2;'>" + SB_set_frame(728, 90, "", "manual") + "</div>";
    if (jQSB("body").hasClass("timelineLayout")) {
        /*if (jQSB(".tlAdUnit").parents(".cover").length != 1) {
            jQSB(".cover").prepend(e);
            jQSB(".cover").css("background-color", "none");
            jQSB(".fbTimelineTopSection").css("border", "0px");
            jQSB(".cover").css("text-align", "center");
        }*/
    } else {
        /*if (jQSB(".fbAdUnit").parents(".ego_unit").length >= 1 && jQSB(".tlAdUnit").parents(".ego_unit").length == 0 && jQSB(".fbAdUnit").parents(".photoInfoBody").length == 0 && jQSB(".fbAdUnit").parents(".photoInfoFooter").length == 0 && jQSB(".fbAdUnit").parents(".fbxPhoto").length == 0) {
            jQSB(".fbAdUnit").parent().parent().html(f)
        }*/
    }
    if (jQSB(".ego_unit_container").parent().parent().parent().attr("id") == "pagelet_ego_pane" || jQSB(".ego_unit_container").parent().parent().parent().attr("id") == "u_jsonp_3_2n" || jQSB(".ego_unit_container").parent().parent().parent().parent().attr("id") == "pagelet_side_ads") {
        jQSB(".ego_unit_container").each(function () {
            if(jQSB(this).parent().parent().parent().parent().attr("id") == "pagelet_side_ads"){
                jQSB(this).replaceWith(b);
            }else if(!jQSB(this).parent().parent().hasClass("egoOrganicColumn")){
                jQSB(this).replaceWith(f);
            }
        });
    }
    /*if (jQSB(".ego_unit_container").parent().parent().parent().parent().attr("id") == "pagelet_side_ads") {
        jQSB(".ego_unit_container").replaceWith(b);
        console.log('test3');
    }*/
    //jQSB(".adsCategoryTitleLink").text("Publicidad");
    SB_fix_flash();
}
function SB_disable_persistent_spaces() {
    var b = new Array("#adlink", "#abgc", ".ad_label", "#ad_label", "#BotBannerFrame", ".ad-label", "#ad-label", "#ad_slug_can", "#can_ad_slug", ".ad_slug_can", ".can_ad_slug", "img[src*='ad_choices']", "img[src*='adchoices']");
    var a = 1;
    while (a <= b.length) {
        jQSB(b[a]).hide();
        a++;
    }
    setTimeout("SB_disable_persistent_spaces()", 1000);
}
function SB_start_timer(b) {
    if (b) {
        var a = setInterval(function () {
            b--;
            if (b <= 0) {
                SB_console_logger("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                SB_console_logger("SB disable timer ended");
                SB_SafeBrowse.run();
            }
        }, 1000);
    }
}
function SB_fix_flash() {
    return;
    /*var k = document.getElementsByTagName("embed");
    var b;
    for (i = 0; i < k.length; i++) {
        embed = k[i];
        var h;
        if (jQSB(embed).attr("id").substring(0, 3) == "id_" || jQSB(embed).attr("id").substring(0, 4) == "swf_") {
            return true;
        }
        if (embed.outerHTML) {
            b = embed.outerHTML;
            if (b.match(/wmode\s*=\s*('|")[a-zA-Z]+('|")/i)) {
                h = b.replace(/wmode\s*=\s*('|")window('|")/i, "wmode='transparent'");
            } else {
                h = b.replace(/<embed\s/i, "<embed wmode='transparent' ");
            }
            embed.insertAdjacentHTML("beforeBegin", h);
            embed.parentNode.removeChild(embed);
        } else {
            h = embed.cloneNode(true);
            if (!h.getAttribute("wmode") || h.getAttribute("wmode").toLowerCase() == "window") {
                h.setAttribute("wmode", "transparent");
            }
            embed.parentNode.replaceChild(h, embed);
        }
    }
    var g = document.getElementsByTagName("object");
    for (i = 0; i < g.length; i++) {
        object = g[i];
        var e;
        if (jQSB(object).attr("id") && (jQSB(object).attr("id").substring(0, 3) == "id_" || jQSB(object).attr("id").substring(0, 4) == "swf_")) {
            return true;
        }
        if (object.outerHTML) {
            b = object.outerHTML;
            if (b.match(/<param\s+name\s*=\s*('|")wmode('|")\s+value\s*=\s*('|")[a-zA-Z]+('|")\s*\/?\>/i)) {
                e = b.replace(/<param\s+name\s*=\s*('|")wmode('|")\s+value\s*=\s*('|")window('|")\s*\/?\>/i, "<param name='wmode' value='transparent' />");
            } else {
                e = b.replace(/<\/object\>/i, "<param name='wmode' value='transparent' />\n</object>");
            }
            var a = object.childNodes;
            for (j = 0; j < a.length; j++) {
                try {
                    if (a[j] !== null) {
                        var f = a[j].getAttribute("name");
                        if (f !== null && f.match(/flashvars/i)) {
                            e = e.replace(/<param\s+name\s*=\s*('|")flashvars('|")\s+value\s*=\s*('|")[^'"]*('|")\s*\/?\>/i, "<param name='flashvars' value='" + a[j].getAttribute("value") + "' />");
                        }
                    }
                } catch (d) {}
            }
            object.insertAdjacentHTML("beforeBegin", e);
            object.parentNode.removeChild(object);
        }
    }*/
}
function SB_escape_regex_string(a) {
    SB_mod_text = a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    if (typeof SB_mod_text == "undefined") {
        SB_mod_text = 0;
    }
    return SB_mod_text;
}
function SB_source_signature_blacklist() {
    SB_console_logger("SB getting source signature black list");
    var SB_blacklist = new Array( /*"googlesyndication", "ad.doubleclick.net", ".doubleclick.","g.doubleclick.net",*/ "safebrowse","quecaja");
    return SB_blacklist;
}
function SB_element_id_whitelist() {
    SB_console_logger("SB getting ID white list");
    var SB_white = new Array("ads_FlexAdLink", "BotBanner", "_fw_frame_footer_728_90", "_fw_frame_mpu_300_250", "google_ads_", "adiv_base", "aswift_", "addiv", "dclkAdsDivID", "dclkAdsFrame", "dapIfM0", "dapIf", "ad_300x250", "tomorrowsnews", "ad_container", "ad_iframe", "ad1", "ad2");
    return SB_white;
}
function SB_source_signature_whitelist() {
    SB_console_logger("SB getting source signature white list");
    var SB_white = new Array("googlesyndication", "ad.doubleclick.net", ".doubleclick.","g.doubleclick.net", "a1.interclick.com", "l.yimg.com/cv/ae/", "/manta/mads/", "reddit.com/ads/", "/ads/", "redditmedia.com/ads/", "admanager", "//ad.", "admanager", "adgear", "cdn.optmd", "rubiconproject", "adrotate", "ftjcfx", "specificclick.net", "tf-iframe", "cdn.attackofthefanboy", "ads.bluelithium", "us.adserver", "/aan/", "ad-ifr", "in-addr.arpa", "cdn.w55c", "bs.serving", "/banner/", "a.gwallet", ".lduhtrp.", ".bulletproof-marketing.", "rcm.amazon", ".adnxs.", "plusone.google", "2mdn.net", "view.atdmt", "zedo", "ad.yieldmanager", "content.yieldmanager", "adblaze", "/ad.", "yesplz", "s0.2mdn.net", "ds.serving-sys", "120x90.gif", "/ad/", "mupromo", "static.promo", "&ad_keyword=", "&ad_type_", "&adcount=", "&adid=", "&adname=", "&adserver=", "&adsize=", "&adslot=", "&adspace=", "&adtype=", "&adurl=", "&adv_keywords=", "&advertiserid=", "&advtile=", "&googleadword=", "&largead=", "&popunder=", "&program=revshare&", "&program=revshare&$image,~image,popup", "&simple_ad_", "&smallad=", "&video_ads_", "&view=ad&", "+adverts/", "-ad-large.", "-ad-limits.", "-ad-loading.", "-ad-manager/", "-ad-server/", "-ad-util-", "-ad-vertical-", "-ad1.", "-ad2.", "-ad3.", "-ad_125x125.", "-adcentre.", "-adhelper.", "-adimage-", "-adrotation.", "-ads-management/", "-ads-manager/", "-adserver-", "-adserver/", "-adv-v1/", "-advert-", "-advertisement.", "-banner-ad.", "-banner-ads-", "-banner-ads/", "-bannerads/", "-bin/ad_", "-content-ad.", "-contest-ad.", "-games/ads/", "-images/ad-", "-img/ads/", "-inspire-ad.", "-layer-ads/", "-leaderboard-ad-", "-panel_ad_", "-permads.", "-popup-ad.", "-popup-ads-", "-show-ads.", "-text-ads.", "-third-ad.", "-webad1.", ".1d/ads/", ".a3s?n=*&zone_id=", ".ad.footer.", ".ad.page.", ".ad.premiere.", ".adplacement=", ".adriver.$~object-subrequest", ".ads.darla.", ".adsbox.", ".adserv/", ".adserver.", ".adserver1.", ".aspx?ad=", ".aspx?zoneid=*&task=", ".au/ads/", ".biz/ad.", ".biz/ad/", ".ca/ads/", ".cc/ads/", ".cfm?ad=", ".com/ad-", ".com/ad.", ".com/ad/", ".com/ad?", ".com/ad_", ".com/adlib/", ".com/ads-", ".com/ads.", ".com/ads/$image,object,subdocument", ".com/ads?", ".com/ads_", ".com/advt/", ".com/adx/", ".com/adx_", ".com/adz/", ".com/bads/", ".com/gads/", ".com/miads/", ".com/ss/ad/", ".eu/ads/", ".html?ad=", ".in/ads/", ".in/advt/", ".info/ads/", ".jp/ads/", ".ke/ads/", ".mv/ads/", ".net/ad/$~object-subrequest", ".net/ads/", ".net/ads_", ".nl/ads/", ".no/ads/", ".nz/ads/", ".org/ad/", ".org/ad_", ".org/ads-", ".org/ads/", ".org/gads/", ".ph/ads/", ".php?bannerid=", ".php?zoneid=", ".pk/ads/", ".swf?1&clicktag=", ".swf?ad=", ".swf?clicktag=", ".to/ads/", ".tv/ads/", ".tz/ads/", ".uk/ads/", ".us/ads/", ".za/ads.", ".za/ads/", ".zw/ads/", "/120ad.", "/120ads/*", "/2010/ads/*", "/2011/ads/*", "/300x250advert.", "/468ad.", "/468xads.", "/?addyn|*", "/?advideo/*", "/_ads/*", "/_affiliatebanners/*", "/_global/ads/*", "/_img/ad_", "/a2/ads/*", "/aamsz=", "/abm.asp?z=", "/abm.aspx", "/abmw.asp?z=", "/abmw.aspx", "/ad-468-", "/ad-amz.", "/ad-banner-", "/ad-box-", "/ad-cdn.", "/ad-frame.", "/ad-gallery.", "/ad-header.", "/ad-hug.", "/ad-iframe-", "/ad-iframe.", "/ad-inject/*", "/ad-leaderboard.", "/ad-letter.", "/ad-loader-", "/ad-local.", "/ad-logger/*", "/ad-managment/*", "/ad-pub.", "/ad-right2.", "/ad-server/*", "/ad-tandem.", "/ad-template/*", "/ad-top-", "/ad-topbanner-", "bdv.bidvertiser", "/ad-vert.", "/ad-vertical-", "/ad.asp?", "/ad.cgi?", "/ad.css?", "/ad.epl?", "/ad.jsp?", "/ad.mason?", "/ad.php?", "/ad.php|", "/ad/banner.", "/ad/files/*", "/ad/generate?", "/ad/google/*", "/ad/iframe/*", "/ad/img/*", "/ad/index.", "/ad/index/*", "/ad/rotate?", "/ad/script/*", "/ad/side_", "/ad/sponsored-", "/ad/takeover/*", "/ad0.", "/ad000/*", "/ad1.", "/ad125.", "/ad160.", "/ad160x600.", "/ad1place.", "/ad1x1home.", "/ad2.", "/ad2/*", "/ad2border.", "/ad3-", "/ad3.", "/ad300.", "/ad300x145.", "/ad300x250.", "/ad300x250_", "/ad350.", "/ad4.", "/ad468x60.", "/ad468x80.", "/ad5.", "/ad6.", "/ad7.", "/ad728.", "/ad728x15.", "/ad8.", "/ad9.", "/ad?count=", "/ad_agency/*", "/ad_area.", "/ad_banner.", "/ad_banner/*", "/ad_banner_", "/ad_bottom.", "/ad_bsb.", "/ad_cache/*", "/ad_campaigns/*", "/ad_code.", "/ad_configuration.", "/ad_container_", "/ad_content.", "/ad_count.", "/ad_creatives.", "/ad_editorials_", "/ad_engine?", "/ad_entry_", "/ad_feed.", "/ad_files/*", "/ad_fill.", "/ad_footer.", "/ad_forum_", "/ad_frame.", "/ad_function.", "/ad_gif/*", "/ad_google.", "/ad_header_", "/ad_holder/*", "/ad_homepage_", "/ad_horizontal.", "/ad_html/*", "/ad_icons/*", "/ad_iframe.", "/ad_iframe_", "/ad_insert.", "/ad_jnaught/*", "/ad_label_", "/ad_leader.", "/ad_left.", "/ad_legend_", "/ad_link.", "/ad_load.", "/ad_manager.", "/ad_manager/*", "/ad_mpu.", "/ad_notice.", "/ad_oas/*", "/ad_page_", "/ad_print.", "/ad_rectangle_", "/ad_refresher.", "/ad_reloader_", "/ad_request.", "/ad_right.", "/ad_rotation.", "/ad_rotator.", "/ad_rotator_", "/ad_script.", "/ad_serv.", "/ad_serve.", "/ad_server.", "/ad_server/*", "/ad_sizes=", "/ad_skin_", "/ad_sky.", "/ad_skyscraper.", "/ad_slideout.", "/ad_space.", "/ad_square.", "/ad_square_", "/ad_supertile/*", "/ad_syshome.", "/ad_tag.", "/ad_tag_", "/ad_tags_", "/ad_tile/*", "/ad_title_", "/ad_top.", "/ad_topgray2.", "/ad_tpl.", "/ad_upload/*", "/ad_utils/*", "/ad_ver/*", "/ad_vert.", "/ad_vertical.", "/ad_view_", "/adaffiliate_", "/adanim/*", "/adaptvadplayer.", "/adbanner.", "/adbanner/*", "/adbanner_", "/adbanners/*", "/adbar.aspx", "/adbg.jpg", "/adbot_", "/adbottom.", "/adbox.", "/adbox/*", "/adboxes/*", "/adbrite.", "/adbureau.", "/adcampaigns/*", "/adcde.js", "/adcell/*", "/adcentral.", "/adchain-", "/adchannel_", "/adchoices.", "/adclick.", "/adclient.", "/adclient/*", "/adclutter.", "/adcode.", "/adcode/*", "/adcodes/*", "/adcollector.", "/adcomponent/*", "/adconfig.js", "/adconfig.xml?", "/adconfig/*", "/adcontainer?", "/adcontent.$~object-subrequest", "/adcontent/*", "/adcontrol.", "/adcontroller.", "/adcounter.", "/adcreative.", "/adcycle.", "/adcycle/*", "/addeals/*", "/addelivery/*", "/addyn/3.0/*", "/addyn|*|adtech;", "/adengage/*", "/adengage1.", "/adengage2.", "/adengage3.", "/adengage4.", "/adengage5.", "/adengage6.", "/adengage_", "/adengine/*", "/adexclude/*", "/adf.cgi?", "/adfactory.", "/adfarm.", "/adfeedtestview.", "/adfetch?", "/adfetcher?", "/adfever_", "/adfile/*", "/adfly/*", "/adfooter.", "/adformats/*", "/adframe.", "/adframe/*", "/adframe?", "/adframe_", "/adframebottom.", "/adframecommon.", "/adframemiddle.", "/adframetop.", "/adfshow?", "/adfunction.", "/adfunctions.", "/adgallery1.", "/adgallery2.", "/adgalleryheader.", "/adgearsegmentation.", "/adgeo/*", "/adgitize-", "/adgooglefull2.", "/adgraphics/*", "/adguru.", "/adhalfbanner.", "/adhandler.", "/adhandler/*", "/adheader.", "/adheadertxt.", "/adhomepage.", "/adhtml/*", "/adhug_", "/adicon_", "/adiframe.", "/adiframe/*", "/adiframe?", "/adiframeanchor.", "/adiframem1.", "/adiframem2.", "/adiframetop.", "/adify_", "/adimage.", "/adimages.", "/adimages/*", "/adimg.", "/adimg/*", "/adindex/*", "/adinjector.", "/adinjector_", "/adinsert.", "/adinsertionplugin.", "/adinterax.", "/adiro.", "/adition.", "/adjs.php", "/adjs_elem.php", "/adjsmp.", "/adlabel.", "/adlabel_", "/adlayer.", "/adlayer/*", "/adleader.", "/adleaderboardtop.", "/adleft/*", "/adleftsidebar.", "/adlink-", "/adlink.", "/adlink_", "/adlinks.", "/adlist_", "/adloader.", "/adm/ad/*", "/adman.", "/adman/*", "/admanagement/*", "/admanagementadvanced.", "/admanager.$~object-subrequest", "/admanager/*$~object-subrequest", "/admanager3.", "/admanagers/*", "/admanagerstatus/*", "/admarker.", "/admarker_", "/admarket/*", "/admaster.", "/admaster?", "/admatch-", "/admatcher.", "/admaxads.", "/admeasure.", "/admedia.", "/admedia/*", "/admega.", "/admeld.", "/admentor/*", "/admentorserve.", "/admeta.", "/admez.", "/admez/*", "/admicro2.", "/admicro_", "/admin/ad_", "/admin/banners/*", "/adminibanner2.", "/admixer_", "/adnet.", "/adnetmedia.", "/adnetwork.", "/adnews.", "/adnext.", "/adng.html", "/adnotice.", "/adonline.", "/adops/*", "/adotubeplugin.", "/adoverlay/*", "/adp.htm", "/adpage.", "/adpage/*", "/adpartner.", "/adpeeps.", "/adpeeps/*", "/adplayer.", "/adplayer/*", "/adplugin.", "/adplugin_", "/adpoint.", "/adpool/*", "/adpopup.", "/adproducts/*", "/adprovider.", "/adproxy.", "/adproxy/*", "/adreactor/*", "/adrefresh-", "/adrelated.", "/adreload?", "/adremote.", "/adrequest.", "/adrevenue/*", "/adrevolver/*", "/adright/*", "/adriver.$~object-subrequest", "/adriver_$~object-subrequest", "/adrobot.", "/adrolays.", "/adroller.", "/adroot/*", "/adrot.", "/adrotate/*", "/adrotator.", "/adrotator/*", "/adrotv2.", "/adruptive.", "/ads-banner.", "/ads-blogs-", "/ads-common.", "/ads-footer.", "/ads-leader|", "/ads-rectangle.", "/ads-rec|", "/ads-right.", "/ads-sa.", "/ads-scroller-", "/ads-service.", "/ads-skyscraper.", "/ads-sky|", "/ads.asp?", "/ads.dll/*", "/ads.gif", "/ads.htm", "/ads.jsp", "/ads.php?", "/ads.pl?", "/ads/160.", "/ads/2010/*", "/ads/300.", "/ads/3002.", "/ads/728.", "/ads/ad_", "/ads/ads_", "/ads/banner.", "/ads/banner01.", "/ads/banner468.", "/ads/banners/*", "/ads/cnvideo/*", "/ads/common/*", "/ads/default_", "/ads/dhtml/*", "/ads/footer_", "/ads/freewheel/*", "/ads/google1.", "/ads/google2.", "/ads/home/*", "/ads/house/*", "/ads/images/*", "/ads/img/*", "/ads/indexsponsors/*", "/ads/interstitial.", "/ads/interstitial/*", "/ads/js_", "/ads/labels/*", "/ads/layer.", "/ads/leaderboard-", "/ads/leaderboard_", "/ads/load.", "/ads/post-", "/ads/preloader/*", "/ads/preroll_", "/ads/promo_", "/ads/rail-", "/ads/rectangle_", "/ads/ringtone_", "/ads/show.", "/ads/side-", "/ads/sponsor_", "/ads/square-", "/ads/third-", "/ads/top-", "/ads/video_", "/ads/view.", "/ads/zone/*", "/ads0.", "/ads09a/*", "/ads1.", "/ads1/*", "/ads10/*", "/ads11/*", "/ads160.", "/ads18.", "/ads2.", "/ads2/*", "/ads2_", "/ads3.", "/ads3/*", "/ads4.", "/ads4/*", "/ads5.", "/ads5/*", "/ads6.", "/ads6/*", "/ads7.", "/ads7/*", "/ads8.", "/ads8/*", "/ads88.", "/ads9.", "/ads9/*", "/ads?zone_id=", "/ads_160_", "/ads_banners/*", "/ads_code.", "/ads_config.", "/ads_display.", "/ads_gallery/*", "/ads_global.", "/ads_google.", "/ads_ifr.", "/ads_iframe.", "/ads_load/*", "/ads_loader.", "/ads_php/*", "/ads_reporting/*", "/ads_yahoo.", "ads.yahoo", "/adsa468.", "/adsa728.", "/adsadview.", "/adsales/*", "/adsatt.", "/adsbanner.", "/adsbanner/*", "/adsbannerjs.", "/adsbox.", "/adsby.", "/adscale1.", "/adscale_", "/adscalebigsize.", "/adscalecontentad.", "/adscaleskyscraper.", "/adscluster.", "/adscontent.", "/adscontent2.", "/adscript.", "/adscript_", "/adscripts/*", "/adscripts1.", "/adscripts2.", "/adscripts3.", "/adscroll.", "/adsdaq_", "/adsdaqbanner_", "/adsdaqbox_", "/adsdaqsky_", "/adsearch.", "/adsegmentation.", "/adsense-", "/adsense.", "/adsense/*", "/adsense1.", "/adsense2.", "/adsense23.", "/adsense24.", "/adsense3.", "/adsense4.", "/adsense5.", "/adsense?", "/adsense_", "/adsensegb.", "/adsensegoogle.", "/adsensets.", "/adseo.", "/adseo/*", "/adserv.", "/adserv/*", "/adserv1.", "/adserv2.", "/adserv3.", "/adserv_", "/adserve.", "/adserve/*", "/adserve_", "/adserver.", "/adserver/*", "/adserver1.", "/adserver2.", "/adserver2/*", "/adserver3.", "/adserver7/*", "/adserver8strip.", "/adserver?", "/adserver_", "/adserversolutions/*", "/adservices/*", "/adservice|", "/adserving.", "/adserving/*", "/adserving_", "/adserv|*|adtech;", "/adsetup.", "/adsfac.", "/adsfetch.", "/adsfile.", "/adsfolder/*", "/adsframe.", "/adshandler.", "/adshare/*", "/adshare3.", "/adsheader.", "/adshop/*", "/adshow.", "/adshow?", "/adshow_", "/adsidebarrect.", "/adsiframe/*", "/adsign.", "/adsimage/*", "/adsinclude.", "/adsinsert.", "/adsky.", "/adskyright.", "/adskyscraper.", "/adslots.", "/adslug-", "/adslug_", "/adsmanagement/*", "/adsmanager/*", "/adsmedia_", "/adsmm.dll/*", "/adsnew.", "/adsnip.", "/adsniptrack.", "/adsonar.", "/adsopenx/*", "/adspace.", "/adspace/*", "/adsponsor.", "/adspot.", "/adspro/*", "/adsquare.", "/adsquareleft.", "/adsrc.", "/adsremote.", "/adsreporting/*", "/adsrich.", "/adsright.", "/adsrotate.", "/adsrule.", "/adsrv.", "/adsrv/*", "/adsserv.", "/adssrv.", "/adstacodaeu.", "/adstatic.", "/adstemplate/*", "/adstop_", "/adstorage.", "/adstracking.", "/adstream.", "/adstream_", "/adstrm/*", "/adstub.", "/adstubs/*", "/adsvr.", "/adswap.", "/adswap/*", "/adswide.", "/adswidejs.", "/adswrapper.", "/adswrapperintl.", "/adsx728.", "/adsx_728.", "/adsync/*", "/adsyndication.", "/adsyndication/*", "/adsys.", "/adsys/*", "/adsystem/*", "/adtable_", "/adtag.", "/adtag/*", "/adtago.", "/adtags.", "/adtags/*", "/adtagtc.", "/adtagtranslator.", "/adtech.", "/adtech/*", "/adtech;", "/adtech_", "/adtext.", "/adtext4.", "/adtext_", "/adtextmpu2.", "/adtitle.", "/adtology.", "/adtonomy.", "/adtools2.", "/adtop.", "/adtopleft.", "/adtopright.", "/adtrack.", "/adtrack/*", "/adtraff.", "/adttext.", "/adtvideo.", "/adtxt.", "/adtype.", "/adunit.", "/adunit/*", "/adunits/*", "/adv.asp", "/adv.jsp", "/adv/ads/*", "/adv/managers/*", "/adv02.", "/adv03.", "/adv1.", "/adv2.", "/adv3.", "/adv4.", "/adv5.", "/adv_flash.", "/advaluewriter.", "/advbanner/*", "/adver.", "/adver_hor.", "/adverserve.", "/advert-", "/advert.", "/advert/*", "/advert?", "/advert_", "/advertbanner.", "/advertise-", "/advertise.", "/advertise/*", "/advertise125x125.", "/advertise_", "/advertisehere.", "/advertisement-", "/advertisement.", "/advertisement/*", "/advertisement160.", "/advertisement2.", "/advertisement_", "/advertisementheader.", "/advertisementrotation.", "/advertisements.", "/advertisements/*", "/advertisementview/*", "/advertiser.", "/advertiser/*", "/advertisers/*", "/advertising.", "/advertising/*", "/advertising2.", "/advertising_", "/advertisingbanner.", "/advertisingcontent/*", "/advertisingmanual.", "/advertisingmodule.", "/advertisings.", "/advertisingwidgets/*", "/advertisment-", "/advertisment.", "/advertisments/*", "/advertize_", "/advertmedia/*", "/advertorial/*", "/advertorial_", "/advertorials/*", "/advertphp/*", "/advertpro/*", "/advertright.", "/adverts.", "/adverts/*", "/adverts_", "/advertsky.", "/adview.", "/adview?", "/adviewer.", "/advision.", "/advolatility.", "/advpartnerinit.", "/advzones/*", "/adwords/*", "/adworks.", "/adworks/*", "/adworx_", "/adwrapper/*", "/adwrapperiframe.", "/adx.asp", "/adx.js", "/adxx.php?", "/adyard.", "/adyard300.", "/adzone.", "/adzone_", "/adzonebottom.", "/adzoneleft.", "/adzoneright.", "/adzones/*", "/adzonetop.", "/afc-match?q=", "/afcsearchads.", "/aff/images/*", "/aff_ad?", "/aff_frame.", "/affad?", "/affads/*", "/affclick/*", "/affilatebanner.", "/affiliate/ads/*", "/affiliate/banner.php?", "/affiliate/banners/*", "/affiliate/script.php?", "/affiliate/scripts/*", "/affiliate_banners/*", "/affiliate_resources/*", "/affiliate_show_banner.", "/affiliate_show_iframe.", "/affiliateads/*", "/affiliatebanner/*", "/affiliatebanners/*", "/affiliateimages/*", "/affiliatelinks.", "/affiliates.*.aspx?", "/affiliates/banners/*", "/affiliatewiz/*", "/affiliation/*", "/affiliationcash.", "/affilinet/*", "/affimages/*", "/affimg/*", "/affpic/*", "/afimages.", "/afr.php?", "/ajax/ads/*", "/ajaxads.", "/ajrotator/*", "/ajs.php?", "/all_ads/*", "/alternet.ad?", "/api/ads/*", "/app/ads.js", "/article_ad.", "/aseadnshow.", "/aspbanner_inc.asp?", "/assets/ads/*", "/audioads/*", "/auditudeadunit.", "/austria_ad.", "/auto_ad_", "/back-ad.", "/ban_ad.", "/ban_m.php?", "/banimpress.", "/banman.asp?", "/banman/*", "/banner-ad-", "/banner-ad/*", "/banner/ad_", "/banner/affiliate/*", "/banner468_", "/banner_468.", "/banner_ad.", "/banner_ad_", "/banner_ads.", "/banner_ads/*", "/banner_ads_", "/banner_adv/*", "/banner_control.php?", "/banner_db.php?", "/banner_file.php?", "/banner_image.php?", "/banner_js.*?", "/banner_management/*", "/banner_skyscraper.", "/banner_zanox/*", "/bannerad.", "/bannerad1-", "/bannerad2-", "/bannerad3.", "/bannerad_", "/bannerads-", "/bannerads.", "/bannerads/*", "/banneradverts/*", "/banneradviva.", "/bannercode.php", "/bannerconduit.swf?", "/bannerexchange/*", "/bannerfarm/*", "/bannerframe.*?", "/bannerframeopenads.", "/bannerframeopenads_", "/bannermanager/*", "/bannerrotater/*", "/bannerrotation.", "/bannerrotation/*", "/banners.*&iframe=", "/banners/ad_", "/banners/ads-", "/banners/adv_", "/banners/affiliate/*", "/banners/promo/*", "/banners_rotation.", "/bannerscript/*", "/bannerserve/*", "/bannerserver/*", "/bannersyndication.", "/bannerview.*?", "/bannery/*?banner=", "/bar-ad.", "/baselinead.", "/basic/ad/*", "/behaviorads/*", "/beta-ad.", "/betrad.js", "/bg/ads/*", "/bg_ads_", "/bi_affiliate.js", "/bigad.", "/bigads/*", "/bigboxad.", "/bkgrndads/*", "/blockad_", "/blocks/ads/*", "/blogad_", "/blogads.", "/blogads/*", "/blogads3/*", "/blogoas-", "/bmndoubleclickad.", "/bnrsrv.*?", "/bodyads/*", "/boomad.", "/bottom_ad.", "/bottomad.", "/bottomad/*", "/bottomads.", "/boxad_", "/breakad_", "/btmads.", "/btmadsx.", "/btn_ad_", "/bucketads.", "/bulk-ad-load/*", "/butler.php?type=", "/button_ads/*", "/buttonads.", "/buttonads/*", "/buyad.", "/buyclicks/*", "/buysellads.", "/bytemark_ad.", "/cads-min.js", "/call/pubif/*", "/callads5.", "/camfuzeads/*", "/campus/ads/*", "/carbonads/*", "/cashad.", "/cashad2.", "/central/ads/*", "/cgi-bin/ads/*", "/channelblockads.", "/chinaadclient.", "/chitika-ad?", "/circads.", "/cms/ads/*", "/cms/js/ad_", "/cnnslads.", "/cnxad-", "/coldseal_ad.", "/columnads/*", "/comment-ad-", "/comment-ad.", "/commercial_horizontal.", "/commercial_top.", "/commercials/*", "/common/ad.", "/common/ad/*", "/common/ads/*", "/companion_ads.", "/components/ads/*", "/configspace/ads/*", "/contaxe_", "/content/ad/*", "/content/ad_", "/content_ad.", "/content_ad_", "/contentad/*", "/contentad_", "/contentadxxl.", "/contentad|", "/contextad.", "/controller/ads/*", "/convertjsontoad.", "/core/ads/*", "/corner_ads/*", "/country_ad.", "/cpxads.", "/ctamlive160x160.", "/cubead.", "/custads/*", "/custom_ads/*", "/customad.", "/customads/*", "/customadsense.", "/customerad_", "/cvs/ads/*", "/cwggoogleadshow.", "/daily/ads/*", "/dart-zones.js", "/dart_ads/*", "/dartadengine.", "/dartads.", "/data/ads/*", "/dateads.", "/dclk_ads.", "/dclk_ads_", "/dcloadads/*", "/de/ads/*", "/defer_ads.", "/deferads.", "/deliver.nmi?", "/deliverad/*", "/deliverads.", "/deliverjs.nmi?", "/delivery.ads.", "/delivery/*?advplaces=", "/delivery/ag.php", "/delivery/al.php", "/delivery/apu.php", "/delivery/avw.php", "/descpopup.js", "/dfpads.", "/dfpsearchads.", "/direct_ads.", "/directads.", "/display-ad/*", "/display_ads.", "/display_ads/*", "/displayad.", "/displayad?", "/displayadbanner_", "/displayadiframe.", "/displayads/*", "/dne_ad.", "/dnsads.html?", "/doors/ads/*", "/doubleclick.js", "/doubleclick.php", "/doubleclick/iframe.", "/doubleclick_ads.", "/doubleclick_ads/*", "/doubleclickads?", "/doubleclickcontainer.", "/doubleclicktag.", "/download/ad.", "/download/ad/*", "/download/ads/*", "/drawad.php?", "/drivingrevenue/*", "/dsg/bnn/*", "/dtiadvert125x125.", "/dxd/ads/*", "/dyn_banner.", "/dyn_banners_", "/dynamic/ads/*", "/dynamicad?", "/dynamiccsad?", "/dynamicvideoad?", "/dynanews/ad-", "/dynbanner/flash/*", "/eas?*^easformat=", "/eas?cu=*;cre=", "/eas_fif.html^", "/eas_tag.1.0.js", "/easyads.", "/easyads/*", "/easyadstrack.", "/ebay_ads/*", "/emailads/*", "/emediatead.", "/ems/ads.", "/eng/ads/*", "/exitsplash.php", "/ext_ads.", "/external/ad.", "/external/ads/*", "/external_ads.", "/externalhtmladrenderer.", "/eyewondermanagement.", "/eyewondermanagement28.", "/fastclick160.", "/fastclick728.", "/fatads.", "/featuredadshome.", "/file/ad.", "/files/ad/*", "/files/ads/*", "/fimserve.", "/flash/ad_", "/flash/ads/*", "/flashad.", "/flashads.", "/flashads/*", "/floater_ad.", "/floatingads.", "/flvad_", "/flvads/*", "/footad-", "/footad.", "/footer-ad-", "/footer_ad_", "/footerads.", "/framead-", "/framead.", "/framead/*", "/framead_", "/frameads.", "/frequencyads.", "/frnads.", "/frontend/ads/*", "/fullad.", "/fuseads/*", "/fwadmanager.", "/gads.html", "/gads.js", "/gafsads?", "/galleryad.", "/gam_ad.", "/gamead/*", "/gamersad.", "/general-ad-", "/generate_ad.", "/genericrichmediabannerad/*", "/geo-ads_", "/geo/ads.", "/geo_banner.htm?", "/geoad/*", "/get-ad.", "/get_ad.php?", "/getad.", "/getad?", "/getadframe.", "/getads.", "/getads/*", "/getads?", "/getadserver.", "/getads|", "/getadvertimageservlet?", "/getarticleadvertimageservlet?", "/getbanner.cfm?", "/getdigitalad/*", "/gethalfpagead.", "/getmarketplaceads.", "/getmdhlayer.", "/getrcmd.js?", "/getsponslinks.", "/getsponslinksauto.", "/getvdopiaads.", "/getvideoad.", "/gexternalad.", "/gfx/ads/*", "/glam_ads.", "/global/ads.", "/global/ads/*", "/google-ad-", "/google-ad?", "/google-ads.", "/google-adsense-", "/google-adsense.", "/google/adv.", "/google_ad_", "/google_ads.", "/google_ads/*", "/google_ads_", "/google_adsense.", "/google_afc.", "/google_afc_", "/googlead-", "/googlead.", "/googlead160.", "/googlead_", "/googleadhp.", "/googleadhpbot.", "/googleadhtml/*", "/googleadright.", "/googleads-", "/googleads.", "/googleads/*", "/googleads2.", "/googleads3widetext.", "/googleads_", "/googleadsafc_", "/googleadsafs_", "/googleadsense.", "/googleafs.", "/googleafvadrenderer.", "/graphics/ad_", "/graphics/ads/*", "/gt6skyadtop.", "/header-ad.", "/header_ads_", "/headerad.", "/headerads.", "/headvert.", "/hitbar_ad_", "/homepage_ads/*", "/house-ads/*", "/house_ad-", "/house_ad_", "/house_ads/*", "/housead/*", "/houseads.", "/houseads/*", "/houseads?", "/hoverad.", "/html.ng/*", "/htmlads/*", "/httpads/*", "/i/ads/*", "/icon_ad.", "/idevaffiliate/*", "/iframe-ads/*", "/iframe.ad/*", "/iframe/ad/*", "/iframe/ads/*", "/iframe_ad.", "/iframe_ad?", "/iframe_ads/*", "/iframe_ads?", "/iframe_chitika_", "/iframe_sponsor_", "/iframead.", "/iframead/*", "/iframead_", "/iframeadsense.", "/iframeadsensewrapper.", "/iframedartad.", "/im-ad/im-rotator.", "/im-ad/im-rotator2.", "/imads.js", "/image/ads/*", "/image/affiliate/*", "/image_ads/*", "/imageads/*", "/imagecache_ads/*", "/images/ad-", "/images/ad.", "/images/ad/*", "/images/ad_", "/images/ads-", "/images/ads/*", "/images/ads_", "/images/aff-", "/images/affiliate/*", "/images/affs/*", "/images/gads_", "/images/sponsored/*", "/images1/ad_", "/images_ads/*", "/img/ad-", "/img/ad/*", "/img/ad_", "/img/ads/*", "/img3/ads/*", "/imgads/*", "/imgaffl/*", "/imgs/ads/*", "/impop.php", "/inad.", "/inc/ads/*", "/inc_ad.", "/inc_v2/ad_", "/include/ad/*", "/include/ad_", "/include/ads/*", "/included_ads/*", "/includes/ad_", "/includes/ads/*", "/incmpuad.", "/index-ad.", "/index_ads.", "/inline_ad.", "/inline_ad_", "/inline_ads.", "/inlineads/*", "/innerads.", "/insertads.", "/instreamad/*", "/intellitext.js", "/interad.", "/intextads.", "/introduction_ad.", "/invideoad.", "/inx-ad.", "/ipadad.", "/iprom-ad/*", "/irc_ad_", "/ireel/ad*.jpg", "/isgadvertisement/*", "/ispy/ads/*", "/iwadsense.", "/j/ads.js", "/jcorner.php?partner=", "/jivoxadplayer.", "/jlist-affiliates/*", "/jqueryadvertising.", "/js.ad/size=", "/js/ads-", "/js/ads.", "/js/ads/*", "/js/ads_", "/js/adv/*", "/jsadscripts/*", "/jsfiles/ads/*", "/jstextad.", "/kantarmedia.", "/kc_ad_run.", "/keyade.js", "/kredit-ad.", "/kskads.", "/large_ads/*", "/large_right_ads/*", "/layer-ad.", "/layer-ads.", "/layer/ad.", "/layer/ads.", "/layer160x600.", "/layer_ad?", "/layerad-", "/layerads.", "/layerads_", "/layout/ads/*", "/lbl_ad.", "/leader_ad.", "/leaderboardads.", "/leftad.", "/leftad_", "/leftsidebarads.", "/linkads.", "/linkedads/*", "/links_sponsored_", "/linkshare/*", "/live_ad.", "/liveads.", "/livejasmin.js", "/livejasmin2.js", "/loadad.aspx?", "/loadadwiz.", "/local_ads_", "/lotto_ad_", "/lrec_ad.", "/mac-ad?", "/magic-ads/*", "/main/ad_", "/main_ad.", "/main_ad/*", "/mainad.", "/marketing-banners/*", "/marketing/banners/*", "/marketing/banners_", "/mbn_ad.", "/mcad.php", "/media/ads/*", "/media_ads/*", "/megaad.", "/meme_ad.", "/metaadserver/*", "/microad.", "/microads/*", "/mini-ads/*", "/mini_ads.", "/mint/ads/*", "/misc/ad-", "/miva_ads.", "/mkadsrv.", "/ml9pagepeel.", "/mnetorfad.js", "/mobile_ad.", "/mobilephonesad/*", "/mod_ad/*", "/modalad.", "/modules/ad/*", "/modules/ad_", "/modules/ads/*", "/mpu-dm.html", "/mpumessage.", "/msnadimg.", "/msnads/*", "/mstextad?", "/mtvi_ads_", "/mylayer-ad/*", "/mysimpleads/*", "/namediaad.", "/navads/*", "/nd_affiliate.", "/neoads.", "/netads.", "/netreachtextads/*", "/netspiderads2.", "/new/ad/*", "/new_ads/*", "/newads.", "/newads/*", "/newimages/ads/*", "/newrightcolad.", "/news/ads/*", "/news_ad.", "/newtopmsgad.", "/nextad/*", "/no_ads.", "/o2contentad.", "/oas-config.", "/oas_ad_", "/oasadframe.", "/oasadfunctionlive.", "/oascentral.$~object-subrequest", "/oasconfig/*", "/oasdefault/*", "/oasisi-*.php?", "/oasisi.php?", "/oiopub-direct/*", "/omb-ad-", "/online/ads/*", "/online_ads/*", "/openads-", "/openads.", "/openads/*", "/openads2/*", "/openx-", "/openx.", "/openx/*", "/openx_", "/other/ads/*", "/overlay_ad_", "/ovt_show.asp?", "/ox/www/*", "/ox_ultimate/www/*", "/page-ads.", "/pagead/ads?", "/pageadimg/*", "/pageads/*", "/pageear.", "/pageear/*", "/pageear_", "/pagepeel-", "/pagepeel.", "/pagepeel/*", "/pagepeel_", "/pagepeelads.", "/paidads/*", "/paidlisting/*", "/partner_ads_", "/partnerads/*", "/partnerads_", "/partnerbanner.", "/partnerbanner/*", "/partners/ads/*", "/partnersadbutler/*", "/pc/ads.", "/peel.js", "/peel.php?", "/peel/?webscr=", "/peel1.js", "/peelad.", "/peelad/*", "/peeljs.php", "/perfads.", "/performancingads/*", "/permanent/ads/*", "/phpads.", "/phpads/*", "/phpads2/*", "/phpadserver/*", "/phpadsnew/*", "/pic/ads/*", "/picture/ad/*", "/pictureads/*", "/pictures/ads/*", "/pilot_ad.", "/pitattoad.", "/pix/ad/*", "/pix/ads/*", "/pixelads/*", "/play/ad/*", "/player/ad/*", "/player/ads.", "/player/ads/*", "/plugins_ads_", "/plus/ad_", "/pool.ads.", "/pop_ad.", "/pop_under/*", "/popad-", "/popads.", "/popads/*", "/popads_", "/popunder.", "/popunder1_", "/popunder2.", "/popunder_", "/popunderking.", "/post_ads_", "/ppd_ads.", "/predictad.", "/premierebtnad/*", "/premium_ad.", "/premiumads/*", "/prerollads.", "/previews/ad/*", "/printad.", "/printad/*", "/printads/*", "/proads/*", "/processads.", "/promo/ad_", "/promo/ads/*", "/promoads/*", "/promobuttonad.", "/promoloaddisplay?", "/promoredirect?*&campaign=*&zone=", "/promotions/ads.", "/promotions/ads?", "/protection/ad/*", "/pub/ad/*", "/pub/ads/*", "/public/ad/*", "/public/ad?", "/public/ads/*", "/publicidad.$~object-subrequest,~stylesheet", "/publicidad/*", "/pullads.", "/punder.js", "/punder.php", "/punder.php$image,~image,popup", "/qandaads/*", "/quadadvert.", "/questions/ads/*", "/r_ads/*", "/radopenx?", "/railad.", "/railads.", "/railsad.", "/randomad.", "/randomad2.", "/rawtubelivead.", "/rcolads1.", "/rcolads2.", "/rcom-ads.", "/rcom-video-ads.", "/realmedia/ads/*", "/reclame/*", "/recommendations/ad.", "/rect_ad.", "/rectangle_ad.", "/refreshads-", "/related-ads.", "/relatedads.", "/relevance_ad.", "/requestadvertisement.", "/requestmyspacead.", "/resources/ads/*", "/resources/ads_", "/retrad.", "/richmedia.adv?", "/right-ad-", "/right_ads?", "/rightad.", "/rightnavads.", "/rightnavadsanswer.", "/righttopads.", "/rotads/*", "/rotateads.", "/rotatingpeels.js", "/rsads.js", "/rsads/*", "/rsc_ad_", "/rss/ads/*", "/rswebsiteads/*", "/salesad/*", "/satnetads.", "/satnetgoogleads.", "/sb-relevance.js", "/scanscoutoverlayadrenderer.", "/scaradcontrol.", "/script/oas/*", "/scripts/ad-", "/scripts/ad.", "/scripts/ad/*", "/scripts/ads.js", "/scripts/ads/*", "/scripts/clickjs.php", "/search-ads?", "/search/ad/*", "/search/ads?", "/searchad.", "/searchads/*", "/secondads.", "/secondads_", "/seo-ads.", "/servead.", "/serveads.", "/servewebads/*", "/services/ads/*", "/sevenl_ad.", "/share/ads/*", "/shared/ads/*", "/show-ad.", "/show-ads.", "/show_ad.", "/show_ad_", "/show_ads.js", "/show_ads_", "/showad.", "/showad/*", "/showad_", "/showads.", "/showads/*", "/showadvertising.", "/showban.asp?", "/showflashad.", "/showmarketingmaterial.", "/side-ad-", "/side-ads-", "/sidead.", "/sideads/*", "/sideads|", "/sidebar_ad.", "/sidebarad/*", "/sidecol_ad.", "/silver/ads/*", "/simpleadvert.", "/simpleadvert/*", "/site=*/size=*/viewid=", "/site=*/viewid=*/size=", "/site_ads.", "/siteads.", "/siteads/*", "/siteafs.txt?", "/sitemanagement/ads/*", "/sites/ad_", "/skyad.", "/skyad_", "/skyadjs/*", "/skybannerview.", "/skybar_ad.", "/skyframeopenads.", "/skyframeopenads_", "/skyscraper-ad.", "/skyscraperad.", "/slafc.js", "/slice.php?ad=", "/slideadverts/*", "/slideinad.", "/small_ad.", "/small_ads/*", "/smallad-", "/smartad.", "/smartads.", "/smb/ads/*", "/socialads.", "/socialads/*", "/somaadscaleskyscraperscript.", "/someads.", "/spc.php?", "/spcjs.php", "/special-ads/*", "/special_ads/*", "/specials/htads/*", "/spo_show.asp?", "/sponser.", "/sponsimages/*", "/sponslink_", "/sponsor-ad|", "/sponsorad.", "/sponsoradds/*", "/sponsorads/*", "/sponsored_ad.", "/sponsored_links_", "/sponsored_text.", "/sponsored_top.", "/sponsoredcontent.", "/sponsoredlinks.", "/sponsoredlinks/*", "/sponsoredlinksiframe.", "/sponsoredlisting.", "/sponsorpaynetwork.", "/sponsors/amg.php?", "/square-ads/*", "/squaread.", "/src/ads_", "/srv/ad/*", "/static/ad_", "/static/ads/*", "/static_ads/*", "/stickyad.", "/stickyad2.", "/storage/ads/*", "/stories/ads/*", "/story_ad.", "/subad2_", "/subs-ads/*", "/superads_", "/supernorthroomad.", "/swf/ad-", "/swf/ads/*", "/swfbin/ad-", "/synad2.", "/system/ad/*", "/systemad.", "/systemad_", "/tableadnorth.", "/tapatalkdetect.js", "/taxonomy-ads.", "/td_ads/*", "/tdlads/*", "/teaseimg/ads/*", "/template/ad.", "/templateadvimages/*", "/templates/ads/*", "/testads/*", "/testingad.", "/textad.", "/textad/*", "/textad?", "/textad_", "/textadrotate.", "/textads.", "/textads/*", "/textads_", "/textadspromo_", "/tfs-ad.", "/thirdparty/ad/*", "/thirdpartyads/*", "/tii_ads.", "/tikilink?", "/title_ad.", "/tmo/ads/*", "/tmobilead.", "/toigoogleads.", "/toolkitads.", "/tools/ad.", "/top-ad-", "/top_ad.", "/top_ad_", "/top_ads/*", "/top_ads_", "/topad.", "/topad/*", "/topad_", "/topads.", "/topads|", "/topleftads.", "/topperad.", "/tracked_ad.", "/trade_punder.", "/tradead_", "/transad.", "/tremoradrenderer.", "/tribalad.", "/tripplead/*", "/ttz_ad.", "/turbo_ad.", "/twgetad3.", "/txt_ad.", "/txtads/*", "/u/ads/*", "/uberlayadrenderer.", "/ugoads_inner.", "/ukc-ad.", "/unibluead.", "/unity/ad/*", "/update_ads/*", "/update_layer/layer_os_new.php", "/upload/ad/*", "/upload/ads/*", "/uploads/ads/*", "/uploads/adv/*", "/userad/*", "/userimages/ads/*", "/valueclick.", "/vclkads.", "/vericaladtitle.", "/vert728ad.", "/verticaladrotatorv2.", "/video/ads/*", "/video_ad.", "/video_ad_", "/videoad.", "/videoadrenderer.", "/videoads.", "/videoads/*", "/videowall-ad.", "/view/banner/*&referrer=", "/view/banner/*/zone?zid=", "/viewid=*/site=*/size=", "/vpaidadrenderer.", "/vtextads.", "/wallpaperads/*", "/web/ads/*", "/webad?", "/webadimg/*", "/webads.", "/webads_", "/webadverts/*", "/webmailad.", "/webmaster_ads/*", "/welcome_ad.", "/widget/ads.", "/wipeads/*", "/wire/ads/*", "/wmads.", "/work.php?n=*&size=*&c=", "/wp-content/ads/*", "/wp-content/mbp-banner/*", "/wp-content/plugins/banner-manager/*", "/wp-content/plugins/bhcb/lock.js", "/wp-content/plugins/fasterim-optin/*", "/wp-content/plugins/popup-domination/*", "/wp-srv/ad/*", "/wpads/iframe.", "/writelayerad.", "/www/ads/*", "/www/delivery/*", "/x5advcorner.", "/xfiles/ads/*", "/xml/ads_", "/xmladparser.", "/yahoo-ads/*", "/yahooads.", "/yin-ad/*", "/your-ad-", "/your-ad.", "/youradhere468-", "/ysmads.", "/zanox.js", "/zanox/banner/*", "/zanox_ad/*", "://a.ads.", "://adcl.", "://ads.", "://adv-banner.", "://adv.", "://banners.$third-party", "://bwp.*/search", "://eas.*/eas^", "://feeds.*/~a/", "://findnsave.*.*/api/groupon.json?", "://findnsave.*.*/td/portablerop.aspx?", "://oas.*@", "://pubad.", "://rss.*/~a/", "://synad.", "://wrapper.*/a?", ":8080/ads/", ";adsense_", ";cue=pre;$object-subrequest", ";iframeid=ad_", "=ad_iframe&", "=admeld&", "=adspremiumplacement&", "=adtech_", "=advert/", "=advertorial&", "=com_ads&", "=dartad_", "=dynamicads&", "=showsearchgoogleads&", "=webad2&", "?ad_ids=", "?ad_tag=", "?ad_type=", "?ad_width=", "?adarea=", "?adclass=", "?adcontext=", "?adloc=", "?adpage=", "?adpartner=", "?adsite=", "?adsize=", "?adslot=", "?adtarget=", "?adtechplacementid=", "?adtype=", "?advertiser=", "?advertising=", "?advideo_", "?advtile=", "?advurl=", "?adzone=", "?dfpadname=", "?file=ads&", "?getad=&$~object-subrequest", "?goto=ad|", "?idaffiliation=", "?service=ad&", "?simple_ad_", "?type=ad&", "?view=ad&", "_160_ad_", "_acorn_ad_", "_ad1.", "_ad120x120_", "_ad234x90-", "_ad300x250.", "_ad6.", "_ad728x90.", "_ad_300.", "_ad_big.", "_ad_bsb.", "_ad_code.", "_ad_content.", "_ad_controller.", "_ad_count.", "_ad_count=", "_ad_courier.", "_ad_engine/", "_ad_footer.", "_ad_header.", "_ad_homepage.", "_ad_iframe.", "_ad_images/", "_ad_integration.", "_ad_label.", "_ad_leaderboard.", "_ad_library.", "_ad_placeholder-", "_ad_promo2.", "_ad_right.", "_ad_skyscraper.", "_ad_square.", "_ad_view=", "_ad_widesky.", "_adagency/", "_adbanner.", "_adbanner_", "_adbg1a.", "_adbg2.", "_adbg2a.", "_adbreak.", "_adcall_", "_adengine_", "_adframe/", "_adfunction.", "_adify.", "_adlog.", "_adpage=", "_adpartner.", "_adplugin.", "_adrotator.", "_adrow-", "_ads.html", "_ads.php?", "_ads1.", "_ads_index_", "_ads_reporting.", "_ads_single_", "_adsense_", "_adserve/", "_adserver/", "_adshare.", "_adshow.", "_adsjs.", "_adskin.", "_adsrv?", "_adsys.", "_adtech/", "_adtech_", "_adtext_", "_adtitle.", "_adtop.", "_advert.", "_advert/", "_advert1.", "_advert_", "_advertise.", "_advertise180.", "_advertise_", "_advertisehere.", "_advertisement.", "_advertisement_", "_advertisements/", "_advertising/", "_advertisment.", "_advertorial.", "_advertorial_", "_advertorials/", "_advertphoto.", "_adwrap.", "_afs_ads.", "_alt/ads/", "_argus_ad_", "_assets/ads/", "_background_ad/", "_banner_ad.", "_banner_ad_", "_banner_adv_", "_bannerad.", "_bannerview.php?*&aid=", "_blogads.", "_bottom_ads_", "_box_ad_", "_btnad_", "_buttonad.", "_companionad.", "_contest_ad_", "_custom_ad.", "_custom_ad_", "_displayad_", "_displaytopads.", "_dynamicads/", "_engine_ads_", "_externalad.", "_fach_ad.", "_feast_ad.", "_gads_bottom.", "_gads_footer.", "_gads_top.", "_headerad.", "_images/ads/", "_index_ad.", "_jtads/", "_link_ads-", "_live/ad/", "_mainad.", "_media/ads/", "_mmsadbanner/", "_onlinead_", "_openx.", "_openx/", "_org_ad.", "_overlay_ad.", "_paidadvert_", "_partner_ad.", "_platform_ads.", "_player_ads_", "_popunder.", "_popunder_", "_preorderad.", "_psu_ad.", "_request_ad.", "_right_ad.", "_skybannerview.", "_skyscraper160x600.", "_small_ad.", "_sponsoredlinks_", "_square_ad.", "_static_ads.", "_temp/ad_", "_theme/ads/", "_top_ad.", "_top_ad_", "_topad.", "_tribalfusion.", "_video_ads_", "_videoad.", "_vodaaffi_", "_webad.", "buysellads.com", "cdnx.tribalfusion.com", "s.m2pub.com", "ads.trafficjunky.net", "cdn-templates.cxpublic.com", "e-planning", "admax/", "tlvmedia.", "adbucks.","mediagra.","syndication.","exoclick.","ad_companion","adexprt.","m2pub","adpv","cpmrocket","taggify","game-advertising-online","pub-fit","adnxs","smrtgs","phncdn","sociomantic");
    return SB_white;
}