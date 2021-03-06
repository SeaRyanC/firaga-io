(() => {
  var __defProp = Object.defineProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = {exports: {}}).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {get: all[name], enumerable: true});
  };

  // node_modules/preact/dist/preact.module.js
  var preact_module_exports = {};
  __export(preact_module_exports, {
    Component: () => p,
    Fragment: () => y,
    cloneElement: () => S,
    createContext: () => q,
    createElement: () => a,
    createRef: () => h,
    h: () => a,
    hydrate: () => O,
    isValidElement: () => l,
    options: () => n,
    render: () => N,
    toChildArray: () => w
  });
  function c(n2, l3) {
    for (var u3 in l3)
      n2[u3] = l3[u3];
    return n2;
  }
  function s(n2) {
    var l3 = n2.parentNode;
    l3 && l3.removeChild(n2);
  }
  function a(n2, l3, u3) {
    var i3, t3, o3, r3 = arguments, f3 = {};
    for (o3 in l3)
      o3 == "key" ? i3 = l3[o3] : o3 == "ref" ? t3 = l3[o3] : f3[o3] = l3[o3];
    if (arguments.length > 3)
      for (u3 = [u3], o3 = 3; o3 < arguments.length; o3++)
        u3.push(r3[o3]);
    if (u3 != null && (f3.children = u3), typeof n2 == "function" && n2.defaultProps != null)
      for (o3 in n2.defaultProps)
        f3[o3] === void 0 && (f3[o3] = n2.defaultProps[o3]);
    return v(n2, f3, i3, t3, null);
  }
  function v(l3, u3, i3, t3, o3) {
    var r3 = {type: l3, props: u3, key: i3, ref: t3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: o3 == null ? ++n.__v : o3};
    return n.vnode != null && n.vnode(r3), r3;
  }
  function h() {
    return {current: null};
  }
  function y(n2) {
    return n2.children;
  }
  function p(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function d(n2, l3) {
    if (l3 == null)
      return n2.__ ? d(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
    for (var u3; l3 < n2.__k.length; l3++)
      if ((u3 = n2.__k[l3]) != null && u3.__e != null)
        return u3.__e;
    return typeof n2.type == "function" ? d(n2) : null;
  }
  function _(n2) {
    var l3, u3;
    if ((n2 = n2.__) != null && n2.__c != null) {
      for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++)
        if ((u3 = n2.__k[l3]) != null && u3.__e != null) {
          n2.__e = n2.__c.base = u3.__e;
          break;
        }
      return _(n2);
    }
  }
  function k(l3) {
    (!l3.__d && (l3.__d = true) && u.push(l3) && !b.__r++ || t !== n.debounceRendering) && ((t = n.debounceRendering) || i)(b);
  }
  function b() {
    for (var n2; b.__r = u.length; )
      n2 = u.sort(function(n3, l3) {
        return n3.__v.__b - l3.__v.__b;
      }), u = [], n2.some(function(n3) {
        var l3, u3, i3, t3, o3, r3;
        n3.__d && (o3 = (t3 = (l3 = n3).__v).__e, (r3 = l3.__P) && (u3 = [], (i3 = c({}, t3)).__v = t3.__v + 1, I(r3, t3, i3, l3.__n, r3.ownerSVGElement !== void 0, t3.__h != null ? [o3] : null, u3, o3 == null ? d(t3) : o3, t3.__h), T(u3, t3), t3.__e != o3 && _(t3)));
      });
  }
  function m(n2, l3, u3, i3, t3, o3, e3, c3, s3, a3) {
    var h3, p3, _2, k3, b3, m3, w3, A2 = i3 && i3.__k || f, P2 = A2.length;
    for (u3.__k = [], h3 = 0; h3 < l3.length; h3++)
      if ((k3 = u3.__k[h3] = (k3 = l3[h3]) == null || typeof k3 == "boolean" ? null : typeof k3 == "string" || typeof k3 == "number" || typeof k3 == "bigint" ? v(null, k3, null, null, k3) : Array.isArray(k3) ? v(y, {children: k3}, null, null, null) : k3.__b > 0 ? v(k3.type, k3.props, k3.key, null, k3.__v) : k3) != null) {
        if (k3.__ = u3, k3.__b = u3.__b + 1, (_2 = A2[h3]) === null || _2 && k3.key == _2.key && k3.type === _2.type)
          A2[h3] = void 0;
        else
          for (p3 = 0; p3 < P2; p3++) {
            if ((_2 = A2[p3]) && k3.key == _2.key && k3.type === _2.type) {
              A2[p3] = void 0;
              break;
            }
            _2 = null;
          }
        I(n2, k3, _2 = _2 || r, t3, o3, e3, c3, s3, a3), b3 = k3.__e, (p3 = k3.ref) && _2.ref != p3 && (w3 || (w3 = []), _2.ref && w3.push(_2.ref, null, k3), w3.push(p3, k3.__c || b3, k3)), b3 != null ? (m3 == null && (m3 = b3), typeof k3.type == "function" && k3.__k != null && k3.__k === _2.__k ? k3.__d = s3 = g(k3, s3, n2) : s3 = x(n2, k3, _2, A2, b3, s3), a3 || u3.type !== "option" ? typeof u3.type == "function" && (u3.__d = s3) : n2.value = "") : s3 && _2.__e == s3 && s3.parentNode != n2 && (s3 = d(_2));
      }
    for (u3.__e = m3, h3 = P2; h3--; )
      A2[h3] != null && (typeof u3.type == "function" && A2[h3].__e != null && A2[h3].__e == u3.__d && (u3.__d = d(i3, h3 + 1)), L(A2[h3], A2[h3]));
    if (w3)
      for (h3 = 0; h3 < w3.length; h3++)
        z(w3[h3], w3[++h3], w3[++h3]);
  }
  function g(n2, l3, u3) {
    var i3, t3;
    for (i3 = 0; i3 < n2.__k.length; i3++)
      (t3 = n2.__k[i3]) && (t3.__ = n2, l3 = typeof t3.type == "function" ? g(t3, l3, u3) : x(u3, t3, t3, n2.__k, t3.__e, l3));
    return l3;
  }
  function w(n2, l3) {
    return l3 = l3 || [], n2 == null || typeof n2 == "boolean" || (Array.isArray(n2) ? n2.some(function(n3) {
      w(n3, l3);
    }) : l3.push(n2)), l3;
  }
  function x(n2, l3, u3, i3, t3, o3) {
    var r3, f3, e3;
    if (l3.__d !== void 0)
      r3 = l3.__d, l3.__d = void 0;
    else if (u3 == null || t3 != o3 || t3.parentNode == null)
      n:
        if (o3 == null || o3.parentNode !== n2)
          n2.appendChild(t3), r3 = null;
        else {
          for (f3 = o3, e3 = 0; (f3 = f3.nextSibling) && e3 < i3.length; e3 += 2)
            if (f3 == t3)
              break n;
          n2.insertBefore(t3, o3), r3 = o3;
        }
    return r3 !== void 0 ? r3 : t3.nextSibling;
  }
  function A(n2, l3, u3, i3, t3) {
    var o3;
    for (o3 in u3)
      o3 === "children" || o3 === "key" || o3 in l3 || C(n2, o3, null, u3[o3], i3);
    for (o3 in l3)
      t3 && typeof l3[o3] != "function" || o3 === "children" || o3 === "key" || o3 === "value" || o3 === "checked" || u3[o3] === l3[o3] || C(n2, o3, l3[o3], u3[o3], i3);
  }
  function P(n2, l3, u3) {
    l3[0] === "-" ? n2.setProperty(l3, u3) : n2[l3] = u3 == null ? "" : typeof u3 != "number" || e.test(l3) ? u3 : u3 + "px";
  }
  function C(n2, l3, u3, i3, t3) {
    var o3;
    n:
      if (l3 === "style")
        if (typeof u3 == "string")
          n2.style.cssText = u3;
        else {
          if (typeof i3 == "string" && (n2.style.cssText = i3 = ""), i3)
            for (l3 in i3)
              u3 && l3 in u3 || P(n2.style, l3, "");
          if (u3)
            for (l3 in u3)
              i3 && u3[l3] === i3[l3] || P(n2.style, l3, u3[l3]);
        }
      else if (l3[0] === "o" && l3[1] === "n")
        o3 = l3 !== (l3 = l3.replace(/Capture$/, "")), l3 = l3.toLowerCase() in n2 ? l3.toLowerCase().slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + o3] = u3, u3 ? i3 || n2.addEventListener(l3, o3 ? H : $, o3) : n2.removeEventListener(l3, o3 ? H : $, o3);
      else if (l3 !== "dangerouslySetInnerHTML") {
        if (t3)
          l3 = l3.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
        else if (l3 !== "href" && l3 !== "list" && l3 !== "form" && l3 !== "tabIndex" && l3 !== "download" && l3 in n2)
          try {
            n2[l3] = u3 == null ? "" : u3;
            break n;
          } catch (n3) {
          }
        typeof u3 == "function" || (u3 != null && (u3 !== false || l3[0] === "a" && l3[1] === "r") ? n2.setAttribute(l3, u3) : n2.removeAttribute(l3));
      }
  }
  function $(l3) {
    this.l[l3.type + false](n.event ? n.event(l3) : l3);
  }
  function H(l3) {
    this.l[l3.type + true](n.event ? n.event(l3) : l3);
  }
  function I(l3, u3, i3, t3, o3, r3, f3, e3, s3) {
    var a3, v3, h3, d3, _2, k3, b3, g3, w3, x3, A2, P2 = u3.type;
    if (u3.constructor !== void 0)
      return null;
    i3.__h != null && (s3 = i3.__h, e3 = u3.__e = i3.__e, u3.__h = null, r3 = [e3]), (a3 = n.__b) && a3(u3);
    try {
      n:
        if (typeof P2 == "function") {
          if (g3 = u3.props, w3 = (a3 = P2.contextType) && t3[a3.__c], x3 = a3 ? w3 ? w3.props.value : a3.__ : t3, i3.__c ? b3 = (v3 = u3.__c = i3.__c).__ = v3.__E : ("prototype" in P2 && P2.prototype.render ? u3.__c = v3 = new P2(g3, x3) : (u3.__c = v3 = new p(g3, x3), v3.constructor = P2, v3.render = M), w3 && w3.sub(v3), v3.props = g3, v3.state || (v3.state = {}), v3.context = x3, v3.__n = t3, h3 = v3.__d = true, v3.__h = []), v3.__s == null && (v3.__s = v3.state), P2.getDerivedStateFromProps != null && (v3.__s == v3.state && (v3.__s = c({}, v3.__s)), c(v3.__s, P2.getDerivedStateFromProps(g3, v3.__s))), d3 = v3.props, _2 = v3.state, h3)
            P2.getDerivedStateFromProps == null && v3.componentWillMount != null && v3.componentWillMount(), v3.componentDidMount != null && v3.__h.push(v3.componentDidMount);
          else {
            if (P2.getDerivedStateFromProps == null && g3 !== d3 && v3.componentWillReceiveProps != null && v3.componentWillReceiveProps(g3, x3), !v3.__e && v3.shouldComponentUpdate != null && v3.shouldComponentUpdate(g3, v3.__s, x3) === false || u3.__v === i3.__v) {
              v3.props = g3, v3.state = v3.__s, u3.__v !== i3.__v && (v3.__d = false), v3.__v = u3, u3.__e = i3.__e, u3.__k = i3.__k, u3.__k.forEach(function(n2) {
                n2 && (n2.__ = u3);
              }), v3.__h.length && f3.push(v3);
              break n;
            }
            v3.componentWillUpdate != null && v3.componentWillUpdate(g3, v3.__s, x3), v3.componentDidUpdate != null && v3.__h.push(function() {
              v3.componentDidUpdate(d3, _2, k3);
            });
          }
          v3.context = x3, v3.props = g3, v3.state = v3.__s, (a3 = n.__r) && a3(u3), v3.__d = false, v3.__v = u3, v3.__P = l3, a3 = v3.render(v3.props, v3.state, v3.context), v3.state = v3.__s, v3.getChildContext != null && (t3 = c(c({}, t3), v3.getChildContext())), h3 || v3.getSnapshotBeforeUpdate == null || (k3 = v3.getSnapshotBeforeUpdate(d3, _2)), A2 = a3 != null && a3.type === y && a3.key == null ? a3.props.children : a3, m(l3, Array.isArray(A2) ? A2 : [A2], u3, i3, t3, o3, r3, f3, e3, s3), v3.base = u3.__e, u3.__h = null, v3.__h.length && f3.push(v3), b3 && (v3.__E = v3.__ = null), v3.__e = false;
        } else
          r3 == null && u3.__v === i3.__v ? (u3.__k = i3.__k, u3.__e = i3.__e) : u3.__e = j(i3.__e, u3, i3, t3, o3, r3, f3, s3);
      (a3 = n.diffed) && a3(u3);
    } catch (l4) {
      u3.__v = null, (s3 || r3 != null) && (u3.__e = e3, u3.__h = !!s3, r3[r3.indexOf(e3)] = null), n.__e(l4, u3, i3);
    }
  }
  function T(l3, u3) {
    n.__c && n.__c(u3, l3), l3.some(function(u4) {
      try {
        l3 = u4.__h, u4.__h = [], l3.some(function(n2) {
          n2.call(u4);
        });
      } catch (l4) {
        n.__e(l4, u4.__v);
      }
    });
  }
  function j(n2, l3, u3, i3, t3, o3, e3, c3) {
    var a3, v3, h3, y3, p3 = u3.props, d3 = l3.props, _2 = l3.type, k3 = 0;
    if (_2 === "svg" && (t3 = true), o3 != null) {
      for (; k3 < o3.length; k3++)
        if ((a3 = o3[k3]) && (a3 === n2 || (_2 ? a3.localName == _2 : a3.nodeType == 3))) {
          n2 = a3, o3[k3] = null;
          break;
        }
    }
    if (n2 == null) {
      if (_2 === null)
        return document.createTextNode(d3);
      n2 = t3 ? document.createElementNS("http://www.w3.org/2000/svg", _2) : document.createElement(_2, d3.is && d3), o3 = null, c3 = false;
    }
    if (_2 === null)
      p3 === d3 || c3 && n2.data === d3 || (n2.data = d3);
    else {
      if (o3 = o3 && f.slice.call(n2.childNodes), v3 = (p3 = u3.props || r).dangerouslySetInnerHTML, h3 = d3.dangerouslySetInnerHTML, !c3) {
        if (o3 != null)
          for (p3 = {}, y3 = 0; y3 < n2.attributes.length; y3++)
            p3[n2.attributes[y3].name] = n2.attributes[y3].value;
        (h3 || v3) && (h3 && (v3 && h3.__html == v3.__html || h3.__html === n2.innerHTML) || (n2.innerHTML = h3 && h3.__html || ""));
      }
      if (A(n2, d3, p3, t3, c3), h3)
        l3.__k = [];
      else if (k3 = l3.props.children, m(n2, Array.isArray(k3) ? k3 : [k3], l3, u3, i3, t3 && _2 !== "foreignObject", o3, e3, n2.firstChild, c3), o3 != null)
        for (k3 = o3.length; k3--; )
          o3[k3] != null && s(o3[k3]);
      c3 || ("value" in d3 && (k3 = d3.value) !== void 0 && (k3 !== n2.value || _2 === "progress" && !k3) && C(n2, "value", k3, p3.value, false), "checked" in d3 && (k3 = d3.checked) !== void 0 && k3 !== n2.checked && C(n2, "checked", k3, p3.checked, false));
    }
    return n2;
  }
  function z(l3, u3, i3) {
    try {
      typeof l3 == "function" ? l3(u3) : l3.current = u3;
    } catch (l4) {
      n.__e(l4, i3);
    }
  }
  function L(l3, u3, i3) {
    var t3, o3, r3;
    if (n.unmount && n.unmount(l3), (t3 = l3.ref) && (t3.current && t3.current !== l3.__e || z(t3, null, u3)), i3 || typeof l3.type == "function" || (i3 = (o3 = l3.__e) != null), l3.__e = l3.__d = void 0, (t3 = l3.__c) != null) {
      if (t3.componentWillUnmount)
        try {
          t3.componentWillUnmount();
        } catch (l4) {
          n.__e(l4, u3);
        }
      t3.base = t3.__P = null;
    }
    if (t3 = l3.__k)
      for (r3 = 0; r3 < t3.length; r3++)
        t3[r3] && L(t3[r3], u3, i3);
    o3 != null && s(o3);
  }
  function M(n2, l3, u3) {
    return this.constructor(n2, u3);
  }
  function N(l3, u3, i3) {
    var t3, o3, e3;
    n.__ && n.__(l3, u3), o3 = (t3 = typeof i3 == "function") ? null : i3 && i3.__k || u3.__k, e3 = [], I(u3, l3 = (!t3 && i3 || u3).__k = a(y, null, [l3]), o3 || r, r, u3.ownerSVGElement !== void 0, !t3 && i3 ? [i3] : o3 ? null : u3.firstChild ? f.slice.call(u3.childNodes) : null, e3, !t3 && i3 ? i3 : o3 ? o3.__e : u3.firstChild, t3), T(e3, l3);
  }
  function O(n2, l3) {
    N(n2, l3, O);
  }
  function S(n2, l3, u3) {
    var i3, t3, o3, r3 = arguments, f3 = c({}, n2.props);
    for (o3 in l3)
      o3 == "key" ? i3 = l3[o3] : o3 == "ref" ? t3 = l3[o3] : f3[o3] = l3[o3];
    if (arguments.length > 3)
      for (u3 = [u3], o3 = 3; o3 < arguments.length; o3++)
        u3.push(r3[o3]);
    return u3 != null && (f3.children = u3), v(n2.type, f3, i3 || n2.key, t3 || n2.ref, null);
  }
  function q(n2, l3) {
    var u3 = {__c: l3 = "__cC" + o++, __: n2, Consumer: function(n3, l4) {
      return n3.children(l4);
    }, Provider: function(n3) {
      var u4, i3;
      return this.getChildContext || (u4 = [], (i3 = {})[l3] = this, this.getChildContext = function() {
        return i3;
      }, this.shouldComponentUpdate = function(n4) {
        this.props.value !== n4.value && u4.some(k);
      }, this.sub = function(n4) {
        u4.push(n4);
        var l4 = n4.componentWillUnmount;
        n4.componentWillUnmount = function() {
          u4.splice(u4.indexOf(n4), 1), l4 && l4.call(n4);
        };
      }), n3.children;
    }};
    return u3.Provider.__ = u3.Consumer.contextType = u3;
  }
  var n, l, u, i, t, o, r, f, e;
  var init_preact_module = __esm({
    "node_modules/preact/dist/preact.module.js"() {
      r = {};
      f = [];
      e = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      n = {__e: function(n2, l3) {
        for (var u3, i3, t3; l3 = l3.__; )
          if ((u3 = l3.__c) && !u3.__)
            try {
              if ((i3 = u3.constructor) && i3.getDerivedStateFromError != null && (u3.setState(i3.getDerivedStateFromError(n2)), t3 = u3.__d), u3.componentDidCatch != null && (u3.componentDidCatch(n2), t3 = u3.__d), t3)
                return u3.__E = u3;
            } catch (l4) {
              n2 = l4;
            }
        throw n2;
      }, __v: 0}, l = function(n2) {
        return n2 != null && n2.constructor === void 0;
      }, p.prototype.setState = function(n2, l3) {
        var u3;
        u3 = this.__s != null && this.__s !== this.state ? this.__s : this.__s = c({}, this.state), typeof n2 == "function" && (n2 = n2(c({}, u3), this.props)), n2 && c(u3, n2), n2 != null && this.__v && (l3 && this.__h.push(l3), k(this));
      }, p.prototype.forceUpdate = function(n2) {
        this.__v && (this.__e = true, n2 && this.__h.push(n2), k(this));
      }, p.prototype.render = y, u = [], i = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, b.__r = 0, o = 0;
    }
  });

  // data/color-data-new.csv
  var require_color_data_new = __commonJS({
    "data/color-data-new.csv"(exports, module) {
      module.exports = "R,G,B,Name,Artkal Midi,Artkal Mini,Artkal Mini Starter,Artkal Midi Soft,Artkal Mini Soft,All Perler,Perler Multi Mix,Perler Mini Assorted,Perler Mini Bulk,EvoRetro,Funzbo\r\n255,255,255,White,S01,C01,C01,R01,A01,,,,,,\r\n255,163,139,Burning Sand,S02,C44,C44,R02,A44,,,,,,\r\n246,176,76,Tangerine,S03,C03,C03,R03,A03,,,,,,\r\n255,103,31,Orange,S04,C17,C17,R04,A17,,,,,,\r\n225,6,0,Tall Poppy,S05,C05,C05,R05,A05,,,,,,\r\n236,134,208,Raspberry Pink,S06,C49,,R06,A49,,,,,,\r\n155,155,155,Gray,S07,C33,C33,R07,A33,,,,,,\r\n36,222,91,Emerald,S08,,,R08,,,,,,,\r\n0,104,94,Dark Green,S09,,,R09,,,,,,,\r\n65,182,230,Baby Blue,S10,C19,C19,R10,A19,,,,,,\r\n79,159,179,Lagoon,S100,C99,,,A99,,,,,,\r\n49,150,221,Electric Blue,S101,C100,,,A100,,,,,,\r\n27,108,182,Pool Blue,S102,C101,,,A101,,,,,,\r\n8,57,128,Caribbean Blue,S103,C102,,,A102,,,,,,\r\n10,102,139,Deep Water,S104,C103,,,A103,,,,,,\r\n8,91,110,Petrol Blue,S105,C104,,,A104,,,,,,\r\n0,78,120,Wegdewood Blue,S106,C105,,,A105,,,,,,\r\n0,85,116,Pond Blue,S107,C106,,,A106,,,,,,\r\n204,190,128,Seashell Beige,S108,C107,,,A107,,,,,,\r\n164,147,80,Beige,S109,C108,,,A108,,,,,,\r\n0,51,153,Dark Blue,S11,C21,C21,R11,A21,,,,,,\r\n158,136,60,Beach Beige,S110,C109,,,A109,,,,,,\r\n118,108,43,Caffe Latt\xE9,S111,C110,,,A110,,,,,,\r\n121,95,38,Oaktree Brown,S112,C111,,,A111,,,,,,\r\n186,184,162,Khaki,S113,C112,,,A112,,,,,,\r\n114,140,84,Light Greengray,S114,C113,,,A113,,,,,,\r\n126,124,68,Mossy Green,S115,C114,,,A114,,,,,,\r\n100,105,46,Earth Green,S116,C115,,,A115,,,,,,\r\n78,88,44,Sage Green,S117,C116,,,A116,,,,,,\r\n74,94,45,Pinetree Green,S118,C117,,,A117,,,,,,\r\n113,196,182,Frosty Blue,S119,C118,,,A118,,,,,,\r\n160,94,181,Pastel Lavender,S12,C26,C26,R12,A26,,,,,,\r\n102,204,153,Polar Mint,S120,C119,,,A119,,,,,,\r\n86,154,131,Celadon Green,S121,C120,,,A120,,,,,,\r\n20,194,91,Eucalyptus,S122,C121,,,A121,,,,,,\r\n24,168,24,Clover Field,S123,C122,,,A122,,,,,,\r\n4,85,46,Pooltable Felt,S124,C123,,,A123,,,,,,\r\n19,107,90,Snake Green,S125,C124,,,A124,,,,,,\r\n5,70,65,Dark Eucalyptus,S126,C125,,,A125,,,,,,\r\n217,182,214,Marsmallow Rose,S127,C126,,,A126,,,,,,\r\n173,98,164,Light Grape,S128,C127,,,A127,,,,,,\r\n230,140,163,Rosebud Pink,S129,C128,,,A128,,,,,,\r\n0,0,0,Black,S13,C02,C02,R13,A02,,,,,,\r\n222,84,121,Fuschia,S130,C129,,,A129,,,,,,\r\n158,130,186,Candy Violet,S131,C130,,,A130,,,,,,\r\n232,65,107,Flamingo,S132,C131,,,A131,,,,,,\r\n183,56,143,Pink Plum,S133,C132,,,A132,,,,,,\r\n88,31,126,Amethyst,S134,C133,,,A133,,,,,,\r\n140,163,212,Moonlight Blue,S135,C134,,,A134,,,,,,\r\n154,154,204,Summer Rain,S136,C135,,,A135,,,,,,\r\n89,129,193,Azure Blue,S137,C136,,,A136,,,,,,\r\n65,102,176,Cornflower Blue,S138,C137,,,A137,,,,,,\r\n71,95,171,Forget Me Not,S139,C138,,,A138,,,,,,\r\n250,224,83,Sandstorm,S14,C42,C42,R14,A42,,,,,,\r\n55,69,147,Indigo,S140,C139,,,A139,,,,,,\r\n61,86,165,Horizon Blue,S141,C140,,,A140,,,,,,\r\n41,66,135,Cobalt,S142,C141,,,A141,,,,,,\r\n37,38,138,Royal Blue,S143,C142,,,A142,,,,,,\r\n26,47,111,Marine,S144,C143,,,A143,,,,,,\r\n211,201,93,Pale Yellow Moss,S145,C144,,,A144,,,,,,\r\n81,9,24,Bloodrose Red,S146,C145,,,A145,,,,,,\r\n100,179,158,Spearmint,S147,C146,,,A146,,,,,,\r\n99,67,56,Mocha,S148,C147,,,A147,,,,,,\r\n237,211,158,Creme,S149,C148,,,A148,,,,,,\r\n122,62,44,Redwood,S15,C30,,R15,A30,,,,,,\r\n105,99,171,Iris Violet,S150,C149,,,A149,,,,,,\r\n43,63,31,Forest Green,S151,C150,,,A150,,,,,,\r\n151,145,197,Lilac,S152,C151,,,A151,,,,,,\r\n184,189,224,Pale Lilac,S153,C152,,,A152,,,,,,\r\n249,200,152,Sahara Sand,S154,C153,,,A153,,,,,,\r\n195,144,105,Sunkissed Teint,S155,C154,,,A154,,,,,,\r\n90,90,90,Steel Grey,S156,C155,,,A155,,,,,,\r\n60,60,60,Iron Grey,S157,C156,,,A156,,,,,,\r\n26,26,26,Pepper,S158,C157,,,A157,,,,,,\r\n139,139,139,Oslo Gray,S159,C56,,,A56,,,,,,\r\n92,71,56,Brown,S16,C32,C32,R16,A32,,,,,,\r\n123,77,53,Light Brown,S17,C31,C31,R17,A31,,,,,,\r\n204,153,102,Sand,S18,C23,C23,R18,A23,,,,,,\r\n252,191,169,Bubble Gum,S19,C22,C22,R19,A22,,,,,,\r\n36,158,107,Green,S20,C14,,R20,A14,,,,,,\r\n135,216,57,Pastel Green,S21,C13,C13,R21,A13,,,,,,\r\n51,0,114,Purple,S22,C27,C27,R22,A27,,,,,,\r\n100,53,155,Royal Purple,S23,,,R23,,,,,,,\r\n20,123,209,True Blue,S24,C37,C37,R24,A37,,,,,,\r\n255,52,179,Hot Pink,S25,C08,,R25,A08,,,,,,\r\n219,33,82,Magenta,S26,C09,C09,R26,A09,,,,,,\r\n255,209,0,Yellow,S27,C11,,R27,A11,,,,,,\r\n234,184,228,Lily Pink,S28,,,R28,,,,,,,\r\n246,235,97,Pastel Yellow,S29,C41,,R29,A41,,,,,,\r\n153,214,234,Shadow Green,S30,C39,C39,R30,A39,,,,,,\r\n158,229,176,Sea Mist,S31,C60,C60,R31,A60,,,,,,\r\n255,231,128,Beeswax,S32,C24,,R32,A24,,,,,,\r\n197,180,227,Maverick,S33,C50,C50,R33,A50,,,,,,\r\n186,12,47,Red,S34,C06,,R34,A06,,,,,,\r\n247,206,215,Mona Lisa,S35,,,R35,,,,,,,\r\n201,128,158,Old Pink,S36,C36,,R36,A36,,,,,,\r\n113,216,191,Blue-Green,S37,,,R37,,,,,,,\r\n171,37,86,Burgundy,S38,,,R38,,,,,,,\r\n237,139,0,Yellow Orange,S39,C04,C04,R39,A04,,,,,,\r\n241,167,220,Carnation Pink,S40,C07,C07,R40,A07,,,,,,\r\n154,85,22,Metallic Gold,S41,,,R41,,,,,,,\r\n125,124,121,Metallic Silver,S42,C35,,R42,A35,,,,,,\r\n118,119,119,Dark Gray,S43,C34,C34,R43,A34,,,,,,\r\n170,220,235,Sky Blue,S44,C18,,R44,A18,,,,,,\r\n0,178,169,Medium Turquoise,S45,C54,C54,R45,A54,,,,,,\r\n115,211,60,Bright Green,S46,C53,,R46,A53,,,,,,\r\n180,126,0,Marigold,S47,C28,,R47,A28,,,,,,\r\n255,199,44,Corn,S48,C48,C48,R48,A48,,,,,,\r\n114,25,95,Mulberry Wood,S49,,,R49,,,,,,,\r\n250,170,114,Mandy's Pink,S50,,,R50,,,,,,,\r\n252,251,205,Spring Sun,S51,C51,C51,R51,A51,,,,,,\r\n242,240,161,Picasso,S52,C10,C10,R52,A10,,,,,,\r\n105,179,231,Turquoise,S53,C38,C38,R53,A38,,,,,,\r\n0,144,218,Light Blue,S54,C20,C20,R54,A20,,,,,,\r\n173,220,145,Pistachio,S55,C12,C12,R57,A12,,,,,,\r\n255,106,19,Bright Carrot,S56,C16,,R59,A16,,,,,,\r\n164,73,61,Buccaneer,S57,C29,,R63,A29,,,,,,\r\n165,0,52,Paprika,S58,C43,,R64,A43,,,,,,\r\n74,31,135,Butterfly Bush,S59,C52,C52,,A52,,,,,,\r\n167,123,202,Lavender,S60,C25,C25,R66,A25,,,,,,\r\n206,220,0,Key Lime Pie,S61,C40,,R68,A40,,,,,,\r\n0,124,88,Green Tea,S62,C15,C15,R69,A15,,,,,,\r\n88,87,53,Metallic Copper,S63,,,R70,,,,,,,\r\n5,8,73,Black Rock,S64,C58,,R55,A58,,,,,,\r\n243,234,93,Canary,S65,C46,,R58,A46,,,,,,\r\n244,99,58,Blaze Orange,S66,,,R60,,,,,,,\r\n243,207,179,Vanilla,S67,C47,C47,R61,A47,,,,,,\r\n225,192,120,Tan,S68,,,R71,,,,,,,\r\n40,40,40,Mine Shaft,S69,C69,,R72,A69,,,,,,\r\n155,188,17,Dark Algae,S70,C84,,R89,A84,,,,,,\r\n0,133,34,Jade Green,S71,C86,C86,R73,A86,,,,,,\r\n89,213,216,Light Sea Blue,S72,C79,C79,R74,A79,,,,,,\r\n72,169,197,Steel Blue,S73,C81,C81,R91,A81,,,,,,\r\n0,174,214,Azure,S74,C82,C82,R75,A82,,,,,,\r\n0,133,173,Dark Steel Blue,S75,C83,,R92,A83,,,,,,\r\n0,174,199,Sea Blue,S76,C80,,R76,A80,,,,,,\r\n239,239,239,Ghost While,S77,C87,,R77,A87,,,,,,\r\n209,209,209,Ash Grey,S78,C88,C88,R78,A88,,,,,,\r\n187,188,188,Light Gray,S79,C89,,R79,A89,,,,,,\r\n153,155,48,Dark Olive,S80,C85,,R90,A85,,,,,,\r\n205,178,119,Deer,S81,C74,,R81,A74,,,,,,\r\n181,129,80,Clay,S82,C75,,R82,A75,,,,,,\r\n184,97,37,Sienna,S83,C73,,R83,A73,,,,,,\r\n170,87,97,Deep Chestnut,S84,C77,,R84,A77,,,,,,\r\n92,19,27,Red Wine,S85,C78,C78,R85,A78,,,,,,\r\n234,170,0,Goldenrod,S86,C71,,R86,A71,,,,,,\r\n255,109,106,Coral Red,S87,C76,,R87,A76,,,,,,\r\n218,24,132,Dark Pink,S88,,,,,,,,,,\r\n77,77,77,Charcoal Gray,S89,C90,,R88,A90,,,,,,\r\n255,197,110,Pastel Orange,S90,C72,,R80,A72,,,,,,\r\n24,48,40,Brunswick Green,S91,C70,C70,R93,A70,,,,,,\r\n222,185,71,Dandelion,S92,C91,,,A91,,,,,,\r\n218,182,152,Pale Skin,S93,C92,,,A92,,,,,,\r\n244,169,153,Warm Blush,S94,C93,,,A93,,,,,,\r\n238,125,103,Salmon,S95,C94,,,A94,,,,,,\r\n240,134,97,Apricot,S96,C95,,,A95,,,,,,\r\n212,114,42,Papaya,S97,C96,,,A96,,,,,,\r\n100,172,223,Himalaya Blue,S98,C97,,,A97,,,,,,\r\n100,194,220,Waterfall,S99,C98,,,A98,,,,,,\r\n93,219,93,Spring Green,,C45,,R56,A45,,,,,,\r\n108,194,74,Confier,,C55,,,A55,,,,,,\r\n188,4,35,Fresh Red,,C57,C57,R65,A57,,,,,,\r\n83,26,35,Scarlett,,C59,,R62,A59,,,,,,\r\n241,235,156,Feta,,C61,,,A61,,,,,,\r\n252,63,63,Carnation,,C62,,,A62,,,,,,\r\n234,190,219,Pink Pearl,,C63,,,A63,,,,,,\r\n165,0,80,Rose,,C64,C64,,A64,,,,,,\r\n239,129,46,Mango Tango,,C65,,,A65,,,,,,\r\n252,108,133,Wild Watermelon,,C66,,,A66,,,,,,\r\n177,78,181,Orchid,,C67,,,A67,,,,,,\r\n105,194,238,Toothpaste Blue,,C68,C68,,A68,,,,,,\r\n255,197,110,Yolk Yellow,,,,R67,,,,,,,\r\n255,255,255,White,,,,,,1,1,,1,,\r\n190,195,191,Light Gray,,,,,,1,,,1,,\r\n150,152,156,Gray,,,,,,1,1,,1,,\r\n147,161,159,Pewter,,,,,,1,,,,,\r\n84,95,95,Charcoal,,,,,,1,,,,,\r\n86,87,92,Dark Gray,,,,,,1,,,,,\r\n0,0,0,Black,,,,,,1,1,,1,,\r\n241,229,216,Toasted Marshmallow,,,,,,1,,,1,,\r\n234,196,159,Sand,,,,,,1,,,1,,\r\n215,176,135,Fawn,,,,,,1,,,,,\r\n207,168,137,Tan,,,,,,1,1,,1,,\r\n160,78,63,Rust,,,,,,1,,,,,\r\n136,64,79,Cranapple,,,,,,1,,,,,\r\n164,123,71,Light Brown,,,,,,1,1,,1,,\r\n126,84,70,Gingerbread,,,,,,1,,,,,\r\n108,82,77,Brown,,,,,,1,1,,1,,\r\n237,231,186,Creme,,,,,,1,,,,,\r\n250,238,141,Pastel Yellow,,,,,,1,,,,,\r\n249,215,55,Yellow,,,,,,1,1,,1,,\r\n255,182,78,Cheddar,,,,,,1,1,,,,\r\n255,128,62,Orange,,,,,,1,,,1,,\r\n225,154,82,Butterscotch,,,,,,1,1,,1,,\r\n218,140,44,Honey,,,,,,1,,,,,\r\n255,97,88,Hot Coral,,,,,,1,1,,,,\r\n255,119,127,Salmon,,,,,,1,,,,,\r\n255,158,141,Blush,,,,,,1,1,,,,\r\n255,181,190,Flamingo,,,,,,1,,,,,\r\n252,198,184,Peach,,,,,,1,,,1,,\r\n245,192,213,Light Pink,,,,,,1,,,,,\r\n225,109,157,Bubblegum,,,,,,1,,,1,,\r\n230,87,148,Pink,,,,,,1,,,,,\r\n243,70,118,Magenta,,,,,,1,,,,,\r\n196,58,68,Red,,,,,,1,1,,1,,\r\n173,51,69,Cherry,,,,,,1,,,,,\r\n173,60,108,Raspberry,,,,,,1,1,,,,\r\n178,95,170,Plum,,,,,,1,1,,,,\r\n180,166,211,Lavender,,,,,,1,,,,,\r\n149,130,187,Pastel Lavender,,,,,,1,1,,1,,\r\n111,84,147,Purple,,,,,,1,1,,1,,\r\n135,167,225,Blueberry Cr\xE8me,,,,,,1,,,,,\r\n108,136,191,Periwinkle,,,,,,1,,,,,\r\n180,217,223,Robin's Egg,,,,,,1,,,,,\r\n99,169,214,Pastel Blue,,,,,,1,,,,,\r\n39,138,203,Light Blue,,,,,,1,1,,1,,\r\n0,102,179,Cobalt,,,,,,1,,,,,\r\n43,48,124,Dark Blue,,,,,,1,1,,1,,\r\n22,40,70,Midnight,,,,,,1,,,,,\r\n176,232,213,Toothpaste,,,,,,1,1,,1,,\r\n0,143,204,Turquoise,,,,,,1,1,,1,,\r\n56,199,175,Light Green,,,,,,1,,,,,\r\n0,150,138,Parrot Green,,,,,,1,1,,,,\r\n115,213,148,Pastel Green,,,,,,1,1,,,,\r\n119,202,74,Kiwi Lime,,,,,,1,1,,1,,\r\n84,177,96,Bright Green,,,,,,1,,,1,,\r\n0,150,84,Shamrock,,,,,,1,,,,,\r\n16,131,85,Dark Green,,,,,,1,1,,1,,\r\n203,215,53,Prickly Pear,,,,,,1,,,,,\r\n60,97,79,Evergreen,,,,,,1,,,,,\r\n247,209,0,Yellow,,,,,,,,,,1,\r\n255,147,0,Orange,,,,,,,,,,1,\r\n250,217,138,Cream,,,,,,,,,,1,\r\n238,0,4,Red,,,,,,,,,,1,\r\n161,171,172,Gray,,,,,,,,,,1,\r\n0,63,44,Dark Green,,,,,,,,,,1,\r\n2,18,153,Blue,,,,,,,,,,1,\r\n116,38,160,Purple,,,,,,,,,,1,\r\n0,111,223,Light Blue,,,,,,,,,,1,\r\n80,50,22,Brown,,,,,,,,,,1,\r\n80,171,110,Light Green,,,,,,,,,,1,\r\n243,0,118,Pink,,,,,,,,,,1,\r\n0,0,0,Black,,,,,,,,,,1,\r\n255,255,255,White,,,,,,,,,,1,\r\n0,0,0,Black,,,,,,,,,,,1\r\n1,78,218,Blue,,,,,,,,,,,1\r\n1,0,78,Dark Blue,,,,,,,,,,,1\r\n0,196,249,Light Blue,,,,,,,,,,,1\r\n0,40,39,Forest Green,,,,,,,,,,,1\r\n1,195,81,Green,,,,,,,,,,,1\r\n157,212,0,Light Green,,,,,,,,,,,1\r\n248,235,193,Peach,,,,,,,,,,,1\r\n239,240,244,White,,,,,,,,,,,1\r\n126,101,221,Purple,,,,,,,,,,,1\r\n116,0,160,Royal Purple,,,,,,,,,,,1\r\n170,91,0,Leather,,,,,,,,,,,1\r\n161,102,0,Brown,,,,,,,,,,,1\r\n155,158,151,Gray,,,,,,,,,,,1\r\n252,218,0,Yellow,,,,,,,,,,,1\r\n254,230,0,Light Yellow,,,,,,,,,,,1\r\n251,197,62,Light Orange,,,,,,,,,,,1\r\n255,176,224,Pink,,,,,,,,,,,1\r\n241,0,109,Deep Pink,,,,,,,,,,,1\r\n255,151,0,Orange,,,,,,,,,,,1\r\n149,0,2,Burgundy,,,,,,,,,,,1\r\n240,12,1,Red,,,,,,,,,,,1";
    }
  });

  // data/color/dmc.txt
  var require_dmc = __commonJS({
    "data/color/dmc.txt"(exports, module) {
      module.exports = "FFE2E2.3713.Salmon Very Light\r\nFFC9C9.761.Salmon Light\r\nF5ADAD.760.Salmon\r\nF18787.3712.Salmon Medium\r\nE36D6D.3328.Salmon Dark\r\nBF2D2D.347.Salmon Very Dark\r\nFED7CC.353.Peach\r\nFD9C97.352.Coral Light\r\nE96A67.351.Coral\r\nE04848.350.Coral Medium\r\nD21035.349.Coral Dark\r\nBB051F.817.Coral Red Very Dark\r\nFFCBD5.3708.Melon Light\r\nFFADBC.3706.Melon Medium\r\nFF7992.3705.Melon Dark\r\nE74967.3801.Melon Very Dark\r\nE31D42.666.Bright Red\r\nC72B3B.321.Red\r\nB71F33.304.Red Medium\r\nA7132B.498.Red Dark\r\n970B23.816.Garnet\r\n87071F.815.Garnet Medium\r\n7B001B.814.Garnet Dark\r\nFFB2BB.894.Carnation Very Light\r\nFC90A2.893.Carnation Light\r\nFF798C.892.Carnation Medium\r\nFF5773.891.Carnation Dark\r\nFFDFD9.818.Baby Pink\r\nFDB5B5.957.Geranium Pale\r\nFF9191.956.Geranium\r\n564A4A.309.Rose Dark\r\nFFD7D7.963.Dusty Rose Ultra Very Light\r\nFFBDBD.3716.Dusty Rose Medium Very Light\r\nE68A8A.962.Dusty Rose Medium\r\nCF7373.961.Dusty Rose Dark\r\nEA8699.3833.Raspberry Light\r\nDB556E.3832.Raspberry Medium\r\nB32F48.3831.Raspberry Dark\r\n913546.777.Raspberry Very Dark\r\nFFEEEB.819.Baby Pink Light\r\nFBADB4.3326.Rose Light\r\nFCB0B9.776.Pink Medium\r\nF27688.899.Rose Medium\r\nEE546E.335.Rose\r\nB33B4B.326.Rose Very Dark\r\nF0CED4.151.Dusty Rose Very Light\r\nE4A6AC.3354.Dusty Rose Light\r\nE8879B.3733.Dusty Rose\r\nDA6783.3731.Dusty Rose Very Dark\r\nBC4365.3350.Dusty Rose Ultra Dark\r\nAB0249.150.Dusty Rose Ultra Very Dark\r\nFBBFC2.3689.Mauve Light\r\nE7A9AC.3688.Mauve Medium\r\nC96B70.3687.Mauve\r\nAB3357.3803.Mauve Dark\r\n881531.3685.Mauve Very Dark\r\nFFC0CD.605.Cranberry Very Light\r\nFFB0BE.604.Cranberry Light\r\nFFA4BE.603.Cranberry\r\nE24874.602.Cranberry Medium\r\nD1286A.601.Cranberry Dark\r\nCD2F63.600.Cranberry Very Dark\r\nFF8CAE.3806.Cyclamen Pink Light\r\nF3478B.3805.Cyclamen Pink\r\nE02876.3804.Cyclamen Pink Dark\r\nF4AED5.3609.Plum Ultra Light\r\nEA9CC4.3608.Plum Very Light\r\nC54989.3607.Plum Light\r\n9C2462.718.Plum\r\n9B1359.917.Plum Medium\r\n820043.915.Plum Dark\r\nFFDFD5.225.Shell Pink Ultra Very Light\r\nEBB7AF.224.Shell Pink Very Light\r\nE2A099.152.Shell Pink Medium Light\r\nCC847C.223.Shell Pink Light\r\nBC6C64.3722.Shell Pink Medium\r\nA14B51.3721.Shell Pink Dark\r\n883E43.221.Shell Pink Very Dark\r\nDFB3BB.778.Antique Mauve Very Light\r\nDBA9B2.3727.Antique Mauve Light\r\nB7737F.316.Antique Mauve Medium\r\n9B5B66.3726.Antique Mauve Dark\r\n814952.315.Antique Mauve Medium Dark\r\n714149.3802.Antique Mauve Very Darkv\r\n822637.902.Garnet Very Dark\r\nD7CBD3.3743.Antique Violet Very Light\r\nB79DA7.3042.Antique Violet Light\r\n956F7C.3041.Antique Violet Medium\r\n785762.3740.Antique Violet Dark\r\nBA91AA.3836.Grape Light\r\n946083.3835.Grape Medium\r\n72375D.3834.Grape Dark\r\n572433.154.Grape Very Dark\r\nE3CBE3.211.Lavender Light\r\nC39FC3.210.Lavender Medium\r\nA37BA7.209.Lavender Dark\r\n835B8B.208.Lavender Very Dark\r\n6C3A6E.3837.Lavender Ultra Dark\r\n633666.327.Violet Dark\r\nE6CCD9.153.Violet Very Light\r\nDBB3CB.554.Violet Light\r\nA3638B.553.Violet\r\n803A6B.552.Violet Medium\r\n5C184E.550.Violet Very Dark\r\nD3D7ED.3747.Blue Violet Very Light\r\nB7BFDD.341.Blue Violet Light\r\nA3AED1.156.Blue Violet Medium Light\r\nADA7C7.340.Blue Violet Medium\r\n9891B6.155.Blue Violet Medium Dark\r\n776B98.3746.Blue Violet Dark\r\n5C5478.333.Blue Violet Very Dark\r\nBBC3D9.157.Cornflower Blue Very Light\r\n8F9CC1.794.Cornflower Blue Light\r\n707DA2.793.Cornflower Blue Medium\r\n60678C.3807.Cornflower Blue\r\n555B7B.792.Cornflower Blue Dark\r\n4C526E.158.Cornflower Blue Very Dark\r\n464563.791.Cornflower Blue Very Dark\r\nB0C0DA.3840.Lavender Blue Light\r\n7B8EAB.3839.Lavender Blue Medium\r\n5C7294.3838.Lavender Blue Dark\r\nC0CCDE.800.Delft Blue Pale\r\n94A8C6.809.Delft Blue\r\n748EB6.799.Delft Blue Medium\r\n466A8E.798.Delft Blue Dark\r\n13477D.797.Royal Blue\r\n11416D.796.Royal Blue Dark\r\n0E365C.820.Royal Blue Very Dark\r\nDBECF5.162.Blue Ultra Very Light\r\nBDDDED.827.Blue Very Light\r\nA1C2D7.813.Blue Light\r\n6B9EBF.826.Blue Medium\r\n4781A5.825.Blue Dark\r\n396987.824.Blue Very Dark\r\n30C2EC.996.Electric Blue Medium\r\n14AAD0.3843.Electric Blue\r\n2696B6.995.Electric Blue Dark\r\n06E3E6.3846.Turquoise Bright Light\r\n04C4CA.3845.Turquoise Bright Medium\r\n12AEBA.3844.Turquoise Bright Dark\r\nC7CAD7.159.Blue Gray Light\r\n999FB7.160.Blue Gray Medium\r\n7880A4.161.Blue Gray\r\nEEFCFC.3756.Baby Blue Ultra Very Light\r\nD9EBF1.775.Baby Blue Very Light\r\nCDDFED.3841.Baby Blue Pale\r\nB8D2E6.3325.Baby Blue Light\r\n93B4CE.3755.Baby Blue\r\n739FC1.334.Baby Blue Medium\r\n5A8FB8.322.Baby Blue Dark\r\n35668B.312.Baby Blue Very Dark\r\n2C597C.803.Baby Blue Ultra Very Dark\r\n253B73.336.Navy Blue\r\n213063.823.Navy Blue Dark\r\n1B2853.939.Navy Blue Very Dark\r\nDBE2E9.3753.Antique Blue Ultra Very Light\r\nC7D1DB.3752.Antique Blue Very Light\r\nA2B5C6.932.Antique Blue Light\r\n6A859E.931.Antique Blue Medium\r\n455C71.930.Antique Blue Dark\r\n384C5E.3750.Antique Blue Very Dark\r\nC5E8ED.828.Sky Blue Very Light\r\nACD8E2.3761.Sky Blue Light\r\n7EB1C8.519.Sky Blue\r\n4F93A7.518.Wedgewood Light\r\n3E85A2.3760.Wedgewood Medium\r\n3B768F.517.Wedgewood Dark\r\n32667C.3842.Wedgewood Very Dark\r\n1C5066.311.Wedgewood Ultra Very Dark\r\nE5FCFD.747.Peacock Blue Very Light\r\n99CFD9.3766.Peacock Blue Light\r\n64ABBA.807.Peacock Blue\r\n3D95A5.806.Peacock Blue Dark\r\n347F8C.3765.Peacock Blue Very Dark\r\nBCE3E6.3811.Turquoise Very Light\r\n90C3CC.598.Turquoise Light\r\n5BA3B3.597.Turquoise\r\n488E9A.3810.Turquoise Dark\r\n3F7C85.3809.Turquoise Vy Dark\r\n366970.3808.Turquoise Ultra Very Dark\r\nDDE3E3.928.Gray Green Very Light\r\nBDCBCB.927.Gray Green Light\r\n98AEAE.926.Gray Green Medium\r\n657F7F.3768.Gray Green Dark\r\n566A6A.924.Gray Green Vy Dark\r\n52B3A4.3849.Teal Green Light\r\n559392.3848.Teal Green Medium\r\n347D75.3847.Teal Green Dark\r\nA9E2D8.964.Sea Green Light\r\n59C7B4.959.Sea Green Medium\r\n3EB6A1.958.Sea Green Dark\r\n2F8C84.3812.Sea Green Very Dark\r\n49B3A1.3851.Green Bright Light\r\n3D9384.943.Green Bright Medium\r\n378477.3850.Green Bright Dark\r\n90C0B4.993.Aquamarine Very Light\r\n6FAE9F.992.Aquamarine Light\r\n508B7D.3814.Aquamarine\r\n477B6E.991.Aquamarine Dark\r\nB9D7C0.966.Jade Ultra Very Light\r\nA7CDAF.564.Jade Very Light\r\n8FC098.563.Jade Light\r\n53976A.562.Jade Medium\r\n338362.505.Jade Green\r\n99C3AA.3817.Celadon Green Light\r\n65A57D.3816.Celadon Green\r\n4D8361.163.Celadon Green Medium\r\n477759.3815.Celadon Green Dark\r\n2C6A45.561.Celadon Green VD\r\nC4DECC.504.Blue Green Very Light\r\nB2D4BD.3813.Blue Green Light\r\n7BAC94.503.Blue Green Medium\r\n5B9071.502.Blue Green\r\n396F52.501.Blue Green Dark\r\n044D33.500.Blue Green Very Dark\r\nA2D6AD.955.Nile Green Light\r\n88BA91.954.Nile Green\r\n6DAB77.913.Nile Green Medium\r\n1B9D6B.912.Emerald Green Light\r\n189065.911.Emerald Green Medium\r\n187E56.910.Emerald Green Dark\r\n156F49.909.Emerald Green Very Dark\r\n115A3B.3818.Emerald Green Ultra Very Dark\r\nD7EDCC.369.Pistachio Green Very Light\r\nA6C298.368.Pistachio Green Light\r\n69885A.320.Pistachio Green Medium\r\n617A52.367.Pistachio Green Dark\r\n205F2E.319.Pistachio Grn Very Dark\r\n174923.890.Pistachio Grn Ultra Very Dark\r\nC8D8B8.164.Forest Green Light\r\n8DA675.989.Forest Green\r\n738B5B.988.Forest Green Medium\r\n587141.987.Forest Green Dark\r\n405230.986.Forest Green Very Dark\r\nE4ECD4.772.Yellow Green Very Light\r\nCCD9B1.3348.Yellow Green Light\r\n71935C.3347.Yellow Green Medium\r\n406A3A.3346.Hunter Green\r\n1B5915.3345.Hunter Green Dark\r\n1B5300.895.Hunter Green Very Dark\r\n9ECF34.704.Chartreuse Bright\r\n7BB547.703.Chartreuse\r\n47A72F.702.Kelly Green\r\n3F8F29.701.Green Light\r\n07731B.700.Green Bright\r\n056517.699.Green\r\nC7E666.907.Parrot Green Light\r\n7FB335.906.Parrot Green Medium\r\n628A28.905.Parrot Green Dark\r\n557822.904.Parrot Green Very Dark\r\nD8E498.472.Avocado Green Ultra Light\r\nAEBF79.471.Avocado Grn Very Light\r\n94AB4F.470.Avocado Grn Light\r\n72843C.469.Avocado Green\r\n627133.937.Avocado Green Medium\r\n4C5826.936.Avocado Green Very Dark\r\n424D21.935.Avocado Green Dark\r\n313919.934.Avocado Grn Black\r\nABB197.523.Fern Green Light\r\n9CA482.3053.Green Gray\r\n889268.3052.Green Gray Medium\r\n5F6648.3051.Green Gray Dark\r\nC4CDAC.524.Fern Green Very Light\r\n969E7E.522.Fern Green\r\n666D4F.520.Fern Green Dark\r\n83975F.3364.Pine Green\r\n728256.3363.Pine Green Medium\r\n5E6B47.3362.Pine Green Dark\r\nEFF4A4.165.Moss Green Very Light\r\nE0E868.3819.Moss Green Light\r\nC0C840.166.Moss Green Medium Light\r\nA7AE38.581.Moss Green\r\n888D33.580.Moss Green Dark\r\nC7C077.734.Olive Green Light\r\nBCB34C.733.Olive Green Medium\r\n948C36.732.Olive Green\r\n938B37.731.Olive Green Dark\r\n827B30.730.Olive Green Very Dark\r\nB9B982.3013.Khaki Green Light\r\nA6A75D.3012.Khaki Green Medium\r\n898A58.3011.Khaki Green Dark\r\nCCB784.372.Mustard Light\r\nBFA671.371.Mustard\r\nB89D64.370.Mustard Medium\r\nDBBE7F.834.Golden Olive Very Light\r\nC8AB6C.833.Golden Olive Light\r\nBD9B51.832.Golden Olive\r\nAA8F56.831.Golden Olive Medium\r\n8D784B.830.Golden Olive Dark\r\n7E6B42.829.Golden Olive Very Dark\r\nDCC4AA.613.Drab Brown Very Light\r\nBC9A78.612.Drab Brown Light\r\n967656.611.Drab Brown\r\n796047.610.Drab Brown Dark\r\nE7D6C1.3047.Yellow Beige Light\r\nD8BC9A.3046.Yellow Beige Medium\r\nBC966A.3045.Yellow Beige Dark\r\nA77C49.167.Yellow Beige Very Dark\r\nFCFCEE.746.Off White\r\nF5ECCB.677.Old Gold Very Light\r\nC69F7B.422.Hazelnut Brown Light\r\nB78B61.3828.Hazelnut Brown\r\nA07042.420.Hazelnut Brown Dark\r\n835E39.869.Hazelnut Brown Very Dark\r\nE4B468.728.Topaz\r\nCE9124.783.Topaz Medium\r\nAE7720.782.Topaz Dark\r\nA26D20.781.Topaz Very Dark\r\n94631A.780.Topaz Ultra Very Dark\r\nE5CE97.676.Old Gold Light\r\nD0A53E.729.Old Gold Medium\r\nBC8D0E.680.Old Gold Dark\r\nA98204.3829.Old Gold Vy Dark\r\nF6DC98.3822.Straw Light\r\nF3CE75.3821.Straw\r\nDFB65F.3820.Straw Dark\r\nCD9D37.3852.Straw Very Dark\r\nFFFB8B.445.Lemon Light\r\nFDED54.307.Lemon\r\nFFE300.973.Canary Bright\r\nFFD600.444.Lemon Dark\r\nFDF9CD.3078.Golden Yellow Very Light\r\nFFF1AF.727.Topaz Very Light\r\nFDD755.726.Topaz Light\r\nFFC840.725.Topaz Medium Light\r\nFFB515.972.Canary Deep\r\nFFE9AD.745.Yellow Pale Light\r\nFFE793.744.Yellow Pale\r\nFED376.743.Yellow Medium\r\nFFBF57.742.Tangerine Light\r\nFFA32B.741.Tangerine Medium\r\nFF8B00.740.Tangerine\r\nF78B13.970.Pumpkin Light\r\nF67F00.971.Pumpkin\r\nFF7B4D.947.Burnt Orange\r\nEB6307.946.Burnt Orange Medium\r\nD15807.900.Burnt Orange Dark\r\nFFDED5.967.Apricot Very Light\r\nFECDC2.3824.Apricot Light\r\nFCAB98.3341.Apricot\r\nFF836F.3340.Apricot Medium\r\nFD5D35.608.Burnt Orange Bright\r\nFA3203.606.Orange Red Bright\r\nFFE2CF.951.Tawny Light\r\nFFD3B5.3856.Mahogany Ultra Very Light\r\nF7976F.722.Orange Spice Light\r\nF27842.721.Orange Spice Medium\r\nE55C1F.720.Orange Spice Dark\r\nFDBD96.3825.Pumpkin Pale\r\nE27323.922.Copper Light\r\nC66218.921.Copper\r\nAC5414.920.Copper Medium\r\nA64510.919.Red Copper\r\n82340A.918.Red Copper Dark\r\nFFEEE3.3770.Tawny Vy Light\r\nFBD5BB.945.Tawny\r\nF7A777.402.Mahogany Very Light\r\nCF7939.3776.Mahogany Light\r\nB35F2B.301.Mahogany Medium\r\n8F430F.400.Mahogany Dark\r\n6F2F00.300.Mahogany Very Dark\r\nFFFDE3.3823.Yellow Ultra Pale\r\nFAD396.3855.Autumn Gold Light\r\nF2AF68.3854.Autumn Gold Medium\r\nF29746.3853.Autumn Gold Dark\r\nF7BB77.3827.Golden Brown Pale\r\nDC9C56.977.Golden Brown Light\r\nC28142.976.Golden Brown Medium\r\nAD7239.3826.Golden Brown\r\n914F12.975.Golden Brown Dark\r\nFEE7DA.948.Peach Very Light\r\nF7CBBF.754.Peach Light\r\nF4BBA9.3771.Terra Cotta Ultra Very Light\r\nEEAA9B.758.Terra Cotta Very Light\r\nD98978.3778.Terra Cotta Light\r\nC56A5B.356.Terra Cotta Medium\r\nB95544.3830.Terra Cotta\r\n984436.355.Terra Cotta Dark\r\n863022.3777.Terra Cotta Very Dark\r\nF8CAC8.3779.Rosewood Ultra Very Light\r\nBA8B7C.3859.Rosewood Light\r\n964A3F.3858.Rosewood Medium\r\n68251A.3857.Rosewood Dark\r\nF3E1D7.3774.Desert Sand Very Light\r\nEED3C4.950.Desert Sand Light\r\nC48E70.3064.Desert Sand\r\nBB8161.407.Desert Sand Medium\r\nB67552.3773.Desert Sand Dark\r\nA06C50.3772.Desert Sand Very Dark\r\n875539.632.Desert Sand Ultra Very Dark\r\nD7CECB.453.Shell Gray Light\r\nC0B3AE.452.Shell Gray Medium\r\n917B73.451.Shell Gray Dark\r\nA68881.3861.Cocoa Light\r\n7D5D57.3860.Cocoa\r\n624B45.779.Cocoa Dark\r\nFFFBEF.712.Cream\r\nF8E4C8.739.Tan Ultra Very Light\r\nECCC9E.738.Tan Very Light\r\nE4BB8E.437.Tan Light\r\nCB9051.436.Tan\r\nB87748.435.Brown Very Light\r\n985E33.434.Brown Light\r\n7A451F.433.Brown Medium\r\n653919.801.Coffee Brown Dark\r\n492A13.898.Coffee Brown Very Dark\r\n361F0E.938.Coffee Brown Ultra Dark\r\n1E1108.3371.Black Brown\r\nF2E3CE.543.Beige Brown Ultra Very Light\r\nCBB69C.3864.Mocha Beige Light\r\nA4835C.3863.Mocha Beige Medium\r\n8A6E4E.3862.Mocha Beige Dark\r\n4B3C2A.3031.Mocha Brown Very Dark\r\nFFFFFF.B5200.Snow White\r\nFCFBF8.Blanc.White\r\nF9F7F1.3865.Winter White\r\nF0EADA.Ecru.Ecru\r\nE7E2D3.822.Beige Gray Light\r\nDDD8CB.644.Beige Gray Medium\r\nA49878.642.Beige Gray Dark\r\n857B61.640.Beige Gray Very Dark\r\n625D50.3787.Brown Gray Dark\r\n4F4B41.3021.Brown Gray Very Dark\r\nEBEAE7.3024.Brown Gray Very Light\r\nB1AA97.3023.Brown Gray Light\r\n8E9078.3022.Brown Gray Medium\r\n636458.535.Ash Gray Very Light\r\nE3D8CC.3033.Mocha Brown Very Light\r\nD2BCA6.3782.Mocha Brown Light\r\nB39F8B.3032.Mocha Brown Medium\r\n7F6A55.3790.Beige Gray Ultra Dark\r\n6B5743.3781.Mocha Brown Dark\r\nFAF6F0.3866.Mocha Brown Ultra Very Light\r\nD1BAA1.842.Beige Brown Very Light\r\nB69B7E.841.Beige Brown Light\r\n9A7C5C.840.Beige Brown Medium\r\n675541.839.Beige Brown Dark\r\n594937.838.Beige Brown Very Dark\r\nE6E8E8.3072.Beaver Gray Very Light\r\nBCB4AC.648.Beaver Gray Light\r\nB0A69C.647.Beaver Gray Medium\r\n877D73.646.Beaver Gray Dark\r\n6E655C.645.Beaver Gray Very Dark\r\n484848.844.Beaver Gray Ultra Dark\r\nECECEC.762.Pearl Gray Very Light\r\nD3D3D6.415.Pearl Gray\r\nABABAB.318.Steel Gray Light\r\n8C8C8C.414.Steel Gray Dark\r\nD1D1D1.168.Pewter Very Light\r\n848484.169.Pewter Light\r\n6C6C6C.317.Pewter Gray\r\n565656.413.Pewter Gray Dark\r\n424242.3799.Pewter Gray Very Dark\r\n000000.310.Black\r\nE3E3E6.1.White Tin\r\nD7D7D8.2.Tin\r\nB8B8BB.3.Tin Medium\r\nAEAEB1.4.Tin Dark\r\nE3CCBE.5.Driftwood Light\r\nDCC6B8.6.Driftwood Medium Light\r\n8F7B6E.7.Driftwood\r\n6A5046.8.Driftwood Dark\r\n55200E.9.Cocoa Very Dark\r\nEDFED9.10.Tender Green Very Light\r\nE2EDB5.11.Tender Green Light\r\nCDD99A.12.Tender Green\r\nBFF6E0.13.Nile Green Medium Light\r\nD0FBB2.14.Apple Green Pale\r\nD1EDA4.15.Apple Green\r\nC9C258.16.Chartreuse Light\r\nE5E272.17.Yellow Plum Light\r\nD9D56D.18.Yellow Plum\r\nF7C95F.19.Autumn Gold medium Light\r\nF7AF93.20.Shrimp\r\nD79982.21.Alizarin Light\r\nBC604E.22.Alizarin\r\nEDE2ED.23.Apple Blossom\r\nE0D7EE.24.White Lavender\r\nDAD2E9.25.Lavender Ultra Light\r\nD7CAE6.26.Lavender Pale\r\nF0EEF9.27.White Violet\r\n9086A9.28.Eggplant Medium Light\r\n674076.29.Eggplant\r\n7D77A5.30.Blueberry Medium Light\r\n50518D.31.Blueberry\r\n4D2E8A.32.Blueberry Dark\r\n9C599E.33.Fuschia\r\n7D3064.34.Fuschia Dark\r\n46052D.35.Fuschia Very Dark";
    }
  });

  // data/color/lego.txt
  var require_lego = __commonJS({
    "data/color/lego.txt"(exports, module) {
      module.exports = "FFFFFF.1.White\r\nDDDEDD.2.Grey\r\nD9BB7B.5.Brick Yellow\r\nD67240.18.Nougat\r\nFF0000.21.Bright Red\r\n0000FF.23.Bright Blue\r\nFFFF00.24.Bright Yellow\r\n000000.26.Black\r\n009900.28.Dark Green\r\n00CC00.37.Bright Green\r\nA83D15.38.Dark Orange\r\n478CC6.102.Medium Blue\r\nFF6600.106.Bright Orange\r\n059D9E.107.Bright Bluish Green\r\n95B90B.119.Bright Yellowish-Green\r\n990066.124.Bright Reddish Violet\r\n5E748C.135.Sand Blue\r\n8D7452.138.Sand Yellow\r\n002541.140.Earth Blue\r\n003300.141.Earth Green\r\n5F8265.151.Sand Green\r\n80081B.154.Dark Red\r\nF49B00.191.Flame Yellowish Orange\r\n5B1C0C.192.Reddish Brown\r\n9C9291.194.Medium Stone Grey\r\n4C5156.199.Dark Stone Grey\r\nE4E4DA.208.Light Stone Grey\r\n87C0EA.212.Light Royal Blue\r\nDE378B.221.Bright Purple\r\nEE9DC3.222.Light Purple\r\nFFFF99.226.Cool Yellow\r\n2C1577.268.Dark Purple\r\nF5C189.283.Light Nougat\r\n300F06.308.Dark Brown\r\nAA7D55.312.Medium Nougat\r\n469BC3.321.Dark Azur\r\n68C3E2.322.Medium Azur\r\nD3F2EA.323.Aqua\r\nA06EB9.324.Medium Lavender\r\nCDA4DE.325.Lavender\r\nF5F3D7.329.White Glow\r\nE2F99A.326.Spring Yellowish Green\r\n77774E.330.Olive Green\r\n96B93B.331.Medium-Yellowish Green";
    }
  });

  // node_modules/color-diff/lib/diff.js
  var require_diff = __commonJS({
    "node_modules/color-diff/lib/diff.js"(exports) {
      exports.ciede2000 = ciede2000;
      var sqrt = Math.sqrt;
      var pow = Math.pow;
      var cos = Math.cos;
      var atan2 = Math.atan2;
      var sin = Math.sin;
      var abs = Math.abs;
      var exp = Math.exp;
      var PI = Math.PI;
      function ciede2000(c1, c22) {
        var L1 = c1.L;
        var a1 = c1.a;
        var b1 = c1.b;
        var L2 = c22.L;
        var a22 = c22.a;
        var b22 = c22.b;
        var kL = 1;
        var kC = 1;
        var kH = 1;
        var C1 = sqrt(pow(a1, 2) + pow(b1, 2));
        var C2 = sqrt(pow(a22, 2) + pow(b22, 2));
        var a_C1_C2 = (C1 + C2) / 2;
        var G = 0.5 * (1 - sqrt(pow(a_C1_C2, 7) / (pow(a_C1_C2, 7) + pow(25, 7))));
        var a1p = (1 + G) * a1;
        var a2p = (1 + G) * a22;
        var C1p = sqrt(pow(a1p, 2) + pow(b1, 2));
        var C2p = sqrt(pow(a2p, 2) + pow(b22, 2));
        var h1p = hp_f(b1, a1p);
        var h2p = hp_f(b22, a2p);
        var dLp = L2 - L1;
        var dCp = C2p - C1p;
        var dhp = dhp_f(C1, C2, h1p, h2p);
        var dHp = 2 * sqrt(C1p * C2p) * sin(radians(dhp) / 2);
        var a_L = (L1 + L2) / 2;
        var a_Cp = (C1p + C2p) / 2;
        var a_hp = a_hp_f(C1, C2, h1p, h2p);
        var T2 = 1 - 0.17 * cos(radians(a_hp - 30)) + 0.24 * cos(radians(2 * a_hp)) + 0.32 * cos(radians(3 * a_hp + 6)) - 0.2 * cos(radians(4 * a_hp - 63));
        var d_ro = 30 * exp(-pow((a_hp - 275) / 25, 2));
        var RC = sqrt(pow(a_Cp, 7) / (pow(a_Cp, 7) + pow(25, 7)));
        var SL = 1 + 0.015 * pow(a_L - 50, 2) / sqrt(20 + pow(a_L - 50, 2));
        var SC = 1 + 0.045 * a_Cp;
        var SH = 1 + 0.015 * a_Cp * T2;
        var RT = -2 * RC * sin(radians(2 * d_ro));
        var dE = sqrt(pow(dLp / (SL * kL), 2) + pow(dCp / (SC * kC), 2) + pow(dHp / (SH * kH), 2) + RT * (dCp / (SC * kC)) * (dHp / (SH * kH)));
        return dE;
      }
      function degrees(n2) {
        return n2 * (180 / PI);
      }
      function radians(n2) {
        return n2 * (PI / 180);
      }
      function hp_f(x3, y3) {
        if (x3 === 0 && y3 === 0)
          return 0;
        else {
          var tmphp = degrees(atan2(x3, y3));
          if (tmphp >= 0)
            return tmphp;
          else
            return tmphp + 360;
        }
      }
      function dhp_f(C1, C2, h1p, h2p) {
        if (C1 * C2 === 0)
          return 0;
        else if (abs(h2p - h1p) <= 180)
          return h2p - h1p;
        else if (h2p - h1p > 180)
          return h2p - h1p - 360;
        else if (h2p - h1p < -180)
          return h2p - h1p + 360;
        else
          throw new Error();
      }
      function a_hp_f(C1, C2, h1p, h2p) {
        if (C1 * C2 === 0)
          return h1p + h2p;
        else if (abs(h1p - h2p) <= 180)
          return (h1p + h2p) / 2;
        else if (abs(h1p - h2p) > 180 && h1p + h2p < 360)
          return (h1p + h2p + 360) / 2;
        else if (abs(h1p - h2p) > 180 && h1p + h2p >= 360)
          return (h1p + h2p - 360) / 2;
        else
          throw new Error();
      }
    }
  });

  // node_modules/color-diff/lib/convert.js
  var require_convert = __commonJS({
    "node_modules/color-diff/lib/convert.js"(exports) {
      exports.rgb_to_lab = rgb_to_lab;
      exports.rgba_to_lab = rgba_to_lab;
      exports.normalize_rgb = normalize_rgb;
      var pow = Math.pow;
      function rgba_to_lab(c3, bc) {
        c3 = normalize_rgb(c3);
        var bc = typeof bc !== "undefined" ? normalize_rgb(bc) : {R: 255, G: 255, B: 255};
        var new_c = {
          R: bc.R + (c3.R - bc.R) * c3.A,
          G: bc.G + (c3.G - bc.G) * c3.A,
          B: bc.B + (c3.B - bc.B) * c3.A
        };
        return rgb_to_lab(new_c);
      }
      function rgb_to_lab(c3) {
        return xyz_to_lab(rgb_to_xyz(c3));
      }
      function rgb_to_xyz(c3) {
        c3 = normalize_rgb(c3);
        var R = c3.R / 255;
        var G = c3.G / 255;
        var B = c3.B / 255;
        if (R > 0.04045)
          R = pow((R + 0.055) / 1.055, 2.4);
        else
          R = R / 12.92;
        if (G > 0.04045)
          G = pow((G + 0.055) / 1.055, 2.4);
        else
          G = G / 12.92;
        if (B > 0.04045)
          B = pow((B + 0.055) / 1.055, 2.4);
        else
          B = B / 12.92;
        R *= 100;
        G *= 100;
        B *= 100;
        var X = R * 0.4124 + G * 0.3576 + B * 0.1805;
        var Y = R * 0.2126 + G * 0.7152 + B * 0.0722;
        var Z = R * 0.0193 + G * 0.1192 + B * 0.9505;
        return {"X": X, "Y": Y, "Z": Z};
      }
      function xyz_to_lab(c3) {
        var ref_Y = 100;
        var ref_Z = 108.883;
        var ref_X = 95.047;
        var Y = c3.Y / ref_Y;
        var Z = c3.Z / ref_Z;
        var X = c3.X / ref_X;
        if (X > 8856e-6)
          X = pow(X, 1 / 3);
        else
          X = 7.787 * X + 16 / 116;
        if (Y > 8856e-6)
          Y = pow(Y, 1 / 3);
        else
          Y = 7.787 * Y + 16 / 116;
        if (Z > 8856e-6)
          Z = pow(Z, 1 / 3);
        else
          Z = 7.787 * Z + 16 / 116;
        var L2 = 116 * Y - 16;
        var a3 = 500 * (X - Y);
        var b3 = 200 * (Y - Z);
        return {"L": L2, "a": a3, "b": b3};
      }
      function normalize_rgb(c3) {
        var new_c = {
          R: c3.R || c3.r || 0,
          G: c3.G || c3.g || 0,
          B: c3.B || c3.b || 0
        };
        if (typeof c3.a !== "undefined" || typeof c3.A !== "undefined") {
          new_c.A = c3.A || c3.a || 0;
        }
        return new_c;
      }
    }
  });

  // node_modules/color-diff/lib/palette.js
  var require_palette = __commonJS({
    "node_modules/color-diff/lib/palette.js"(exports) {
      exports.map_palette = map_palette;
      exports.map_palette_lab = map_palette_lab;
      exports.match_palette_lab = match_palette_lab;
      exports.palette_map_key = palette_map_key;
      exports.lab_palette_map_key = lab_palette_map_key;
      var ciede2000 = require_diff().ciede2000;
      var color_convert = require_convert();
      function palette_map_key(c3) {
        c3 = color_convert.normalize_rgb(c3);
        var s3 = "R" + c3.R + "B" + c3.B + "G" + c3.G;
        if ("A" in c3) {
          s3 = s3 + "A" + c3.A;
        }
        return s3;
      }
      function lab_palette_map_key(c3) {
        return "L" + c3.L + "a" + c3.a + "b" + c3.b;
      }
      function map_palette(a3, b3, type, bc) {
        var c3 = {};
        bc = typeof bc !== "undefined" ? bc : {R: 255, G: 255, B: 255};
        type = type || "closest";
        for (var idx1 = 0; idx1 < a3.length; idx1 += 1) {
          var color1 = a3[idx1];
          var best_color = void 0;
          var best_color_diff = void 0;
          for (var idx2 = 0; idx2 < b3.length; idx2 += 1) {
            var color2 = b3[idx2];
            var current_color_diff = diff3(color1, color2, bc);
            if (best_color == void 0 || type === "closest" && current_color_diff < best_color_diff) {
              best_color = color2;
              best_color_diff = current_color_diff;
              continue;
            }
            if (type === "furthest" && current_color_diff > best_color_diff) {
              best_color = color2;
              best_color_diff = current_color_diff;
              continue;
            }
          }
          c3[palette_map_key(color1)] = best_color;
        }
        return c3;
      }
      function match_palette_lab(target_color, palette, find_furthest) {
        var color2, current_color_diff;
        var best_color = palette[0];
        var best_color_diff = ciede2000(target_color, best_color);
        for (var idx2 = 1, l3 = palette.length; idx2 < l3; idx2 += 1) {
          color2 = palette[idx2];
          current_color_diff = ciede2000(target_color, color2);
          if (!find_furthest && current_color_diff < best_color_diff || find_furthest && current_color_diff > best_color_diff) {
            best_color = color2;
            best_color_diff = current_color_diff;
          }
        }
        return best_color;
      }
      function map_palette_lab(a3, b3, type) {
        var c3 = {};
        var find_furthest = type === "furthest";
        for (var idx1 = 0; idx1 < a3.length; idx1 += 1) {
          var color1 = a3[idx1];
          c3[lab_palette_map_key(color1)] = match_palette_lab(color1, b3, find_furthest);
        }
        return c3;
      }
      function diff3(c1, c22, bc) {
        var conv_c1 = color_convert.rgb_to_lab;
        var conv_c2 = color_convert.rgb_to_lab;
        var rgba_conv = function(x3) {
          return color_convert.rgba_to_lab(x3, bc);
        };
        if ("A" in c1) {
          conv_c1 = rgba_conv;
        }
        if ("A" in c22) {
          conv_c2 = rgba_conv;
        }
        c1 = conv_c1(c1);
        c22 = conv_c2(c22);
        return ciede2000(c1, c22);
      }
    }
  });

  // node_modules/color-diff/lib/index.js
  var require_lib = __commonJS({
    "node_modules/color-diff/lib/index.js"(exports, module) {
      "use strict";
      var diff3 = require_diff();
      var convert = require_convert();
      var palette = require_palette();
      var color = module.exports = {};
      color.diff = diff3.ciede2000;
      color.rgb_to_lab = convert.rgb_to_lab;
      color.rgba_to_lab = convert.rgba_to_lab;
      color.map_palette = palette.map_palette;
      color.palette_map_key = palette.palette_map_key;
      color.map_palette_lab = palette.map_palette_lab;
      color.lab_palette_map_key = palette.lab_palette_map_key;
      color.match_palette_lab = palette.match_palette_lab;
      color.closest = function(target, relative, bc) {
        var key = color.palette_map_key(target);
        bc = typeof bc !== "undefined" ? bc : {R: 255, G: 255, B: 255};
        var result = color.map_palette([target], relative, "closest", bc);
        return result[key];
      };
      color.furthest = function(target, relative, bc) {
        var key = color.palette_map_key(target);
        bc = typeof bc !== "undefined" ? bc : {R: 255, G: 255, B: 255};
        var result = color.map_palette([target], relative, "furthest", bc);
        return result[key];
      };
      color.closest_lab = function(target, relative) {
        return color.match_palette_lab(target, relative, false);
      };
      color.furthest_lab = function(target, relative) {
        return color.match_palette_lab(target, relative, true);
      };
    }
  });

  // src/components/svg.css
  var require_svg = __commonJS({
    "src/components/svg.css"(exports, module) {
      module.exports = "line.gridmajor {\r\n    stroke-width: 2px;\r\n    stroke: rgba(0, 0, 0, 0.5);\r\n    filter: drop-shadow(0px 0px 3px rgba(255, 255, 255, .3));\r\n    pointer-events: none;\r\n}\r\n\r\nline.gridminor {\r\n    stroke-width: 1px;\r\n    stroke: rgba(0, 0, 0, 0.2);\r\n    pointer-events: none;\r\n}\r\n\r\ntext {\r\n    font-family: 'Courier New', Courier, monospace;\r\n    font-weight: bold;\r\n    font-size: 31px;\r\n    fill: black;\r\n    pointer-events: none;\r\n}\r\n\r\nuse.dark text,\r\ntext.dark {\r\n    fill: white;\r\n}\r\n\r\nuse.light text,\r\ntext.light {\r\n    fill: black;\r\n}\r\n";
    }
  });

  // src/app.tsx
  init_preact_module();

  // node_modules/preact/hooks/dist/hooks.module.js
  init_preact_module();
  var t2;
  var u2;
  var r2;
  var o2 = 0;
  var i2 = [];
  var c2 = n.__b;
  var f2 = n.__r;
  var e2 = n.diffed;
  var a2 = n.__c;
  var v2 = n.unmount;
  function m2(t3, r3) {
    n.__h && n.__h(u2, t3, o2 || r3), o2 = 0;
    var i3 = u2.__H || (u2.__H = {__: [], __h: []});
    return t3 >= i3.__.length && i3.__.push({}), i3.__[t3];
  }
  function l2(n2) {
    return o2 = 1, p2(w2, n2);
  }
  function p2(n2, r3, o3) {
    var i3 = m2(t2++, 2);
    return i3.t = n2, i3.__c || (i3.__ = [o3 ? o3(r3) : w2(void 0, r3), function(n3) {
      var t3 = i3.t(i3.__[0], n3);
      i3.__[0] !== t3 && (i3.__ = [t3, i3.__[1]], i3.__c.setState({}));
    }], i3.__c = u2), i3.__;
  }
  function y2(r3, o3) {
    var i3 = m2(t2++, 3);
    !n.__s && k2(i3.__H, o3) && (i3.__ = r3, i3.__H = o3, u2.__H.__h.push(i3));
  }
  function h2(r3, o3) {
    var i3 = m2(t2++, 4);
    !n.__s && k2(i3.__H, o3) && (i3.__ = r3, i3.__H = o3, u2.__h.push(i3));
  }
  function s2(n2) {
    return o2 = 5, d2(function() {
      return {current: n2};
    }, []);
  }
  function d2(n2, u3) {
    var r3 = m2(t2++, 7);
    return k2(r3.__H, u3) && (r3.__ = n2(), r3.__H = u3, r3.__h = n2), r3.__;
  }
  function F(n2) {
    var r3 = u2.context[n2.__c], o3 = m2(t2++, 9);
    return o3.__c = n2, r3 ? (o3.__ == null && (o3.__ = true, r3.sub(u2)), r3.props.value) : n2.__;
  }
  function x2() {
    i2.forEach(function(t3) {
      if (t3.__P)
        try {
          t3.__H.__h.forEach(g2), t3.__H.__h.forEach(j2), t3.__H.__h = [];
        } catch (u3) {
          t3.__H.__h = [], n.__e(u3, t3.__v);
        }
    }), i2 = [];
  }
  n.__b = function(n2) {
    u2 = null, c2 && c2(n2);
  }, n.__r = function(n2) {
    f2 && f2(n2), t2 = 0;
    var r3 = (u2 = n2.__c).__H;
    r3 && (r3.__h.forEach(g2), r3.__h.forEach(j2), r3.__h = []);
  }, n.diffed = function(t3) {
    e2 && e2(t3);
    var o3 = t3.__c;
    o3 && o3.__H && o3.__H.__h.length && (i2.push(o3) !== 1 && r2 === n.requestAnimationFrame || ((r2 = n.requestAnimationFrame) || function(n2) {
      var t4, u3 = function() {
        clearTimeout(r3), b2 && cancelAnimationFrame(t4), setTimeout(n2);
      }, r3 = setTimeout(u3, 100);
      b2 && (t4 = requestAnimationFrame(u3));
    })(x2)), u2 = void 0;
  }, n.__c = function(t3, u3) {
    u3.some(function(t4) {
      try {
        t4.__h.forEach(g2), t4.__h = t4.__h.filter(function(n2) {
          return !n2.__ || j2(n2);
        });
      } catch (r3) {
        u3.some(function(n2) {
          n2.__h && (n2.__h = []);
        }), u3 = [], n.__e(r3, t4.__v);
      }
    }), a2 && a2(t3, u3);
  }, n.unmount = function(t3) {
    v2 && v2(t3);
    var u3 = t3.__c;
    if (u3 && u3.__H)
      try {
        u3.__H.__.forEach(g2);
      } catch (t4) {
        n.__e(t4, u3.__v);
      }
  };
  var b2 = typeof requestAnimationFrame == "function";
  function g2(n2) {
    var t3 = u2;
    typeof n2.__c == "function" && n2.__c(), u2 = t3;
  }
  function j2(n2) {
    var t3 = u2;
    n2.__c = n2.__(), u2 = t3;
  }
  function k2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, u3) {
      return t4 !== n2[u3];
    });
  }
  function w2(n2, t3) {
    return typeof t3 == "function" ? t3(n2) : t3;
  }

  // src/gallery.tsx
  var preact = (init_preact_module(), preact_module_exports);
  function Gallery(props) {
    const storage = props.gallery;
    const cells = storage.map(([name, uri], index) => {
      return /* @__PURE__ */ preact.h(GalleryCell, {
        key: name + "." + uri,
        alt: `${name}`,
        src: `${uri}`,
        onClick: () => props.load(name, uri),
        onDeleteClick: () => props.requestDelete(uri)
      });
    });
    return /* @__PURE__ */ preact.h("div", {
      className: "gallery-list"
    }, cells);
  }
  function GalleryCell(props) {
    return /* @__PURE__ */ preact.h("div", {
      className: "gallery-entry",
      title: props.alt,
      onClick: props.onClick
    }, /* @__PURE__ */ preact.h("img", {
      src: props.src
    }), /* @__PURE__ */ preact.h("div", {
      className: "gallery-delete",
      onClick: (e3) => {
        e3.preventDefault();
        e3.stopPropagation();
        props.onDeleteClick();
      }
    }, "\u274C"));
  }

  // src/csv.ts
  function parseCsv(content) {
    const lines = content.split(/\r?\n/g);
    const result = {
      headers: lines[0].split(/,/g),
      rows: lines.slice(1).map((s3) => s3.split(/,/g))
    };
    for (const r3 of result.rows) {
      if (r3.length !== result.headers.length) {
        throw new Error(`Malformed line: ${JSON.stringify(r3)} length doesn't match header size (${result.headers.length})`);
      }
    }
    return result;
  }

  // src/color-data.ts
  function parseColorFile(name, s3) {
    const res = {
      name,
      colors: []
    };
    const rgx1 = /^(\S\S)(\S\S)(\S\S)\.([^.]+)\.(.*)$/gm;
    let m3;
    while (m3 = rgx1.exec(s3)) {
      res.colors.push({
        r: parseInt(m3[1], 16),
        g: parseInt(m3[2], 16),
        b: parseInt(m3[3], 16),
        code: m3[4],
        name: m3[5]
      });
    }
    if (res.colors.length) {
      return res;
    }
    const rgx2 = /^(\S\S)(\S\S)(\S\S)(.*)$/gm;
    while (m3 = rgx2.exec(s3)) {
      res.colors.push({
        r: parseInt(m3[1], 16),
        g: parseInt(m3[2], 16),
        b: parseInt(m3[3], 16),
        name: m3[4]
      });
    }
    return res;
  }
  function loadColorData() {
    const colorDataRaw = parseCsv(require_color_data_new());
    console.assert(colorDataRaw.headers[0] === "R", "R");
    console.assert(colorDataRaw.headers[1] === "G", "G");
    console.assert(colorDataRaw.headers[2] === "B", "B");
    console.assert(colorDataRaw.headers[3] === "Name", "Name");
    const sets = [];
    for (let i3 = 4; i3 < colorDataRaw.headers.length; i3++) {
      sets.push({
        name: colorDataRaw.headers[i3],
        colors: []
      });
    }
    for (const r3 of colorDataRaw.rows) {
      for (let i3 = 4; i3 < r3.length; i3++) {
        const codeInThisSet = r3[i3];
        if (codeInThisSet.length) {
          const entry = {
            r: parseInt(r3[0]),
            g: parseInt(r3[1]),
            b: parseInt(r3[2]),
            name: r3[3]
          };
          if (codeInThisSet !== "1") {
            entry.code = r3[i3];
          }
          sets[i3 - 4].colors.push(entry);
        }
      }
    }
    sets.push(parseColorFile("dmc", require_dmc()));
    sets.push(parseColorFile("lego", require_lego()));
    return {sets};
  }

  // src/ictcp.ts
  var m1 = 2610 / 16384;
  function PQ(L2, M2, S2) {
    return [PQf(L2), PQf(M2), PQf(S2)];
  }
  function PQf(n2) {
    let num = 3424 / 4096 + 2413 / 128 * Math.pow(n2 / 1e4, m1);
    let denom = 1 + 2392 / 128 * Math.pow(n2 / 1e4, m1);
    return Math.pow((3424 / 4096 + 2413 / 128 * Math.pow(n2 / 1e4, m1)) / (1 + 2392 / 128 * Math.pow(n2 / 1e4, m1)), 2523 / 32);
  }
  function rgbToXyz(r3, g3, b3) {
    r3 = sRGBtoLinearRGB(r3 / 255);
    g3 = sRGBtoLinearRGB(g3 / 255);
    b3 = sRGBtoLinearRGB(b3 / 255);
    const X = 0.4124 * r3 + 0.3576 * g3 + 0.1805 * b3;
    const Y = 0.2126 * r3 + 0.7152 * g3 + 0.0722 * b3;
    const Z = 0.0193 * r3 + 0.1192 * g3 + 0.9505 * b3;
    return [X, Y, Z];
  }
  function xyzToXYZa(xyz) {
    return xyz.map((n2) => Math.max(n2 * 203, 0));
  }
  function sRGBtoLinearRGB(color) {
    if (color <= 0.04045) {
      return color / 12.92;
    }
    return Math.pow((color + 0.055) / 1.055, 2.4);
  }
  function rgbToICtCp(arg) {
    const xyz = rgbToXyz(arg.r, arg.g, arg.b);
    const xyza = xyzToXYZa(xyz);
    const [R, G, B] = xyza;
    const L2 = 0.3592 * R + 0.6976 * G - 0.0358 * B;
    const M2 = -0.1922 * R + 1.1004 * G + 0.0755 * B;
    const S2 = 7e-3 * R + 0.0749 * G + 0.8434 * B;
    const [Lp, Mp, Sp] = PQ(L2, M2, S2);
    const I2 = 0.5 * Lp + 0.5 * Mp;
    const Ct = (6610 * Lp - 13613 * Mp + 7003 * Sp) / 4096;
    const Cp = (17933 * Lp - 17390 * Mp - 543 * Sp) / 4096;
    return [I2, Ct, Cp];
  }

  // src/utils.tsx
  var preact2 = (init_preact_module(), preact_module_exports);
  var diff = require_lib();
  var symbolAlphabet = "ABCDEFGHJKLMNPQRSTVXZ\u03B1\u03B2\u0394\u03B8\u03BB\u03C0\u03A6\u03A8\u03A9abcdefghijklmnopqrstuvwxyz0123456789";
  var GridFormats = {
    "perler": {
      size: [29, 29],
      pitch: 139.75 / (29 - 1)
    },
    "artkal-mini": {
      size: [50, 50],
      pitch: 137.8 / (50 - 1)
    },
    "perler-mini": {
      size: [56, 56],
      pitch: 147.9 / (56 - 1)
    },
    "16 ct": {
      size: [16, 16],
      pitch: 25.4 / 16
    },
    "30 ct": {
      size: [30, 30],
      pitch: 25.4 / 30
    },
    "lego": {
      size: [32, 32],
      pitch: 8
    },
    "funzbo": {
      size: [29, 29],
      pitch: 139.1 / (29 - 1)
    },
    "evoretro": {
      size: [29, 29],
      pitch: 139.3 / (29 - 1)
    }
  };
  function getPitch(size) {
    return GridFormats[size].pitch;
  }
  function getGridSize(size) {
    return GridFormats[size].size;
  }
  function colorEntryToHtml(c3) {
    return "rgb(" + c3.r + "," + c3.g + "," + c3.b + ")";
  }
  function colorEntryToHex(c3) {
    return "#" + hx(c3.r) + hx(c3.g) + hx(c3.b);
  }
  function hx(n2) {
    if (n2 === void 0)
      return "";
    if (n2 === 0)
      return "00";
    if (n2 < 16)
      return "0" + n2.toString(16);
    return n2.toString(16);
  }
  function isBright(i3) {
    return i3.r + i3.g * 1.4 + i3.b > 460;
  }
  function timer() {
    let last = Date.now();
    return {mark};
    function mark(event) {
      if (window.location.hostname === "localhost" || window.location.search === "?dev") {
        const n2 = Date.now();
        console.log(`PERF: '${event}' finished in ${n2 - last}ms`);
        last = n2;
      }
    }
  }
  function carveImageFast(image, carveSize) {
    const rowOccupancyMatrix = [];
    for (let y3 = 0; y3 < image.height; y3++) {
      rowOccupancyMatrix[y3] = [];
      let counter = 0;
      for (let x3 = image.width - 1; x3 >= -carveSize; x3--) {
        const px = image.pixels[y3][x3];
        if (x3 < 0 || (px === void 0 || px === -1)) {
          if (counter > 0)
            counter--;
        } else {
          counter = carveSize;
        }
        rowOccupancyMatrix[y3][x3 + carveSize] = counter !== 0;
      }
    }
    const occupancyMatrix = [];
    for (let x3 = 0; x3 < image.width + carveSize; x3++) {
      occupancyMatrix[x3] = [];
      let counter = 0;
      for (let y3 = image.height - 1; y3 >= -carveSize; y3--) {
        if (y3 >= 0 && rowOccupancyMatrix[y3][x3]) {
          counter = carveSize;
        } else {
          if (counter > 0)
            counter--;
        }
        occupancyMatrix[x3][y3 + carveSize] = counter > 0;
      }
    }
    let xOffset = 0;
    let yOffset = 0;
    let bestCount = Infinity;
    for (let y3 = 0; y3 < carveSize; y3++) {
      for (let x3 = 0; x3 < carveSize; x3++) {
        let occCount = 0;
        for (let oy = y3; oy < image.height + carveSize; oy += carveSize) {
          for (let ox = x3; ox < image.width + carveSize; ox += carveSize) {
            if (occupancyMatrix[ox][oy])
              occCount++;
          }
        }
        if (occCount < bestCount) {
          xOffset = x3;
          yOffset = y3;
          bestCount = occCount;
        }
      }
    }
    return {xOffset, yOffset};
  }
  function carve(width, height, xSize, ySize) {
    const res = [];
    const xa = carveAxis(width, xSize);
    const ya = carveAxis(height, ySize);
    let cy = 0;
    let row = 0;
    for (const y3 of ya) {
      let cx = 0;
      let col = 0;
      row++;
      for (const x3 of xa) {
        col++;
        res.push({
          x: cx,
          y: cy,
          row,
          col,
          width: x3,
          height: y3
        });
        cx += x3;
      }
      cy += y3;
    }
    return res;
  }
  function carveAxis(width, size) {
    if (width <= size)
      return [width];
    if (width <= size * 2) {
      return [Math.ceil(width / 2), Math.floor(width / 2)];
    }
    const remainder = width % size;
    let res = [remainder];
    let remaining = width - res[0];
    while (remaining > size) {
      res.push(size);
      remaining -= size;
    }
    res.push(remaining);
    return res;
  }
  function assertNever(n2, message) {
    throw new Error(`Invalid ${n2} - ${message}`);
  }
  function nameOfColor(color) {
    if (color.code === void 0) {
      return color.name;
    }
    return `${color.code} (${color.name})`;
  }
  function dollars(amt) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return formatter.format(amt);
  }
  function feetInches(mm) {
    const inches = mm / 25.4;
    if (inches < 12) {
      return `${inches.toFixed(1)}\u2033`;
    }
    return `${Math.floor(inches / 12)}\u2032${String.fromCharCode(8201)}${Math.round(inches % 12)}\u2033`;
  }
  function timeAmount(seconds) {
    const minutes = Math.ceil(seconds / 60);
    if (minutes < 1) {
      return `1 minute`;
    } else if (minutes < 60) {
      return `${minutes} minutes`;
    } else if (minutes < 120) {
      return `${Math.floor(minutes / 60)}:${Math.floor(minutes % 60)}`;
    }
    return `${Math.ceil(minutes / 60)} hours`;
  }

  // src/palettizer.ts
  var diff2 = require_lib();
  function palettize(rgbaArray, palette) {
    const pixels = [];
    const colorLookup = new Map();
    for (const p3 of palette) {
      colorLookup.set(p3.color, p3.target);
    }
    for (let y3 = 0; y3 < rgbaArray.height; y3++) {
      const row = [];
      for (let x3 = 0; x3 < rgbaArray.width; x3++) {
        if (rgbaArray.pixels[y3][x3] === -1) {
          row.push(void 0);
        } else {
          row.push(colorLookup.get(rgbaArray.pixels[y3][x3]));
        }
      }
      pixels.push(row);
    }
    return {
      pixels,
      width: rgbaArray.width,
      height: rgbaArray.height
    };
  }
  function surveyColors(rgbaArray) {
    const perf = timer();
    const inputColors = [];
    const colorToColor = new Map();
    for (let y3 = 0; y3 < rgbaArray.height; y3++) {
      for (let x3 = 0; x3 < rgbaArray.width; x3++) {
        const color = rgbaArray.pixels[y3][x3];
        if (color === -1)
          continue;
        if (colorToColor.has(color)) {
          colorToColor.get(color).count++;
        } else {
          const entry = {
            color,
            count: 1,
            r: color & 255,
            g: color >> 8 & 255,
            b: color >> 16 & 255
          };
          inputColors.push(entry);
          colorToColor.set(color, entry);
        }
      }
    }
    perf.mark(`Palette: Survey colors (${inputColors.length}) and counts`);
    return inputColors;
  }
  function makePalette(inputColors, allowedColors, settings) {
    const perf = timer();
    const noDuplicates = settings.nodupes && (!allowedColors || inputColors.length < allowedColors.length);
    const tempAssignments = [];
    inputColors.sort((a3, b3) => b3.count - a3.count);
    const diff3 = colorDiff[settings.colorMatch];
    for (const inColor of inputColors) {
      if (allowedColors === void 0) {
        const {r: r3, g: g3, b: b3} = inColor;
        tempAssignments.push({
          color: inColor.color,
          target: {
            r: r3,
            g: g3,
            b: b3,
            name: colorEntryToHex({r: r3, g: g3, b: b3}),
            code: ""
          },
          count: inColor.count
        });
      } else {
        let targetColor = inColor;
        if (settings.matchBlackAndWhite && (inColor.r === inColor.g && inColor.g === inColor.b)) {
          let rgb;
          if (inColor.r > 208) {
            rgb = 255 - (255 - inColor.r) * 0.5;
          } else if (inColor.r < 41) {
            rgb = inColor.r * 0.3;
          } else {
            rgb = inColor.r;
          }
          targetColor = {
            ...inColor,
            r: rgb,
            b: rgb,
            g: rgb
          };
        }
        let bestTarget = void 0;
        let bestScore = Infinity;
        for (const c3 of allowedColors) {
          if (noDuplicates) {
            if (tempAssignments.some((t3) => t3.target === c3))
              continue;
          }
          const score = diff3(targetColor, c3);
          if (score < bestScore) {
            bestTarget = c3;
            bestScore = score;
          }
        }
        if (bestTarget === void 0)
          throw new Error("impossible");
        tempAssignments.push({
          color: inColor.color,
          target: bestTarget,
          count: inColor.count
        });
      }
    }
    perf.mark("Palette: Assign color entries");
    return tempAssignments;
  }
  var colorDiff = {
    rgb: (lhs, rhs) => {
      return Math.pow(lhs.r - rhs.r, 2) * 3 + Math.pow(lhs.g - rhs.g, 2) * 4 + Math.pow(lhs.b - rhs.b, 2) * 2;
    },
    rgb2: (r3, g3, b3, rhs) => {
      return Math.pow(r3 - rhs.r, 2) * 3 + Math.pow(g3 - rhs.g, 2) * 4 + Math.pow(b3 - rhs.b, 2) * 2;
    },
    "ciede2000": (lhs, rhs) => {
      return diff2.diff(rgbToLabCached(lhs), rgbToLabCached(rhs));
    },
    "ictcp": (lhs, rhs) => {
      const a3 = rgbToICtCp(lhs), b3 = rgbToICtCp(rhs);
      const di = a3[0] - b3[0], dct = (a3[1] - b3[1]) / 2, dcp = a3[2] - b3[2];
      return di * di + dct * dct + dcp * dcp;
    }
  };
  function rgbToLabCached(rgb) {
    if ("_lab" in rgb) {
      return rgb["_lab"];
    }
    return rgb["_lab"] = diff2.rgb_to_lab({R: rgb.r, G: rgb.g, B: rgb.b});
  }

  // src/image-utils.tsx
  var colorData = loadColorData();
  function imageDataToRgbaArray(imageData) {
    const raw = [];
    for (let y3 = 0; y3 < imageData.height; y3++) {
      const row = [];
      for (let x3 = 0; x3 < imageData.width; x3++) {
        const b3 = 4 * (y3 * imageData.width + x3);
        if (imageData.data[b3 + 3] === 255) {
          row.push((imageData.data[b3 + 2] << 16) + (imageData.data[b3 + 1] << 8) + imageData.data[b3]);
        } else {
          row.push(-1);
        }
      }
      raw.push(row);
    }
    return {
      pixels: raw,
      width: imageData.width,
      height: imageData.height
    };
  }
  function applyImageAdjustments(image, brightnessPct, contrastPct, saturationPct, flip, mirror) {
    const srcCanvas = document.createElement("canvas");
    srcCanvas.width = image.width;
    srcCanvas.height = image.height;
    const srcContext = srcCanvas.getContext("2d");
    srcContext.putImageData(image, 0, 0);
    const dstCanvas = document.createElement("canvas");
    dstCanvas.width = image.width;
    dstCanvas.height = image.height;
    const dstContext = dstCanvas.getContext("2d");
    dstContext.filter = `saturate(${saturationPct}%) brightness(${brightnessPct}%) contrast(${contrastPct}%)`;
    if (flip) {
      dstContext.scale(1, -1);
      dstContext.translate(0, -image.height);
    }
    if (mirror) {
      dstContext.scale(-1, 1);
      dstContext.translate(-image.width, 0);
    }
    dstContext.drawImage(srcCanvas, 0, 0);
    return dstContext.getImageData(0, 0, image.width, image.height);
  }
  function descale(imageData) {
    const {mark} = timer();
    const {data, width, height} = imageData;
    for (const scaleChk of [8, 7, 6, 5, 4, 3, 2]) {
      for (let xOffset = 0; xOffset < scaleChk; xOffset++) {
        for (let yOffset = 0; yOffset < scaleChk; yOffset++) {
          let match = true;
          for (let x3 = xOffset; x3 < width; x3 += scaleChk) {
            for (let y3 = yOffset; y3 < height; y3 += scaleChk) {
              for (let xi = 1; xi < scaleChk; xi++) {
                for (let yi = 1; yi < scaleChk; yi++) {
                  if (!areSame(x3 + xi, y3 + yi, x3, y3)) {
                    match = false;
                    break;
                  }
                }
                if (!match)
                  break;
              }
              if (!match)
                break;
            }
            if (!match)
              break;
          }
          if (match) {
            const newData = new ImageData(Math.floor((width - xOffset) / scaleChk), Math.floor((height - yOffset) / scaleChk));
            let c3 = 0;
            for (let y3 = 0; y3 < newData.height; y3++) {
              for (let x3 = 0; x3 < newData.width; x3++) {
                const src = ((y3 * scaleChk + yOffset) * width + x3 * scaleChk + xOffset) * 4;
                const dst = (y3 * newData.width + x3) * 4;
                newData.data[dst] = data[src];
                newData.data[dst + 1] = data[src + 1];
                newData.data[dst + 2] = data[src + 2];
                newData.data[dst + 3] = data[src + 3];
              }
            }
            mark(`Descale with match ${width}x${height} (${scaleChk} ${xOffset} ${yOffset}) -> ${newData.width}x${newData.height}`);
            return newData;
          }
        }
      }
    }
    mark("Descale with no match");
    return imageData;
    function areSame(x0, y0, x1, y1) {
      if (x0 >= imageData.width || y0 >= imageData.height)
        return true;
      const c0 = (y0 * imageData.width + x0) * 4;
      const c1 = (y1 * imageData.width + x1) * 4;
      return data[c0] === data[c1] && data[c0 + 1] === data[c1 + 1] && data[c0 + 2] === data[c1 + 2] && data[c0 + 3] === data[c1 + 3];
    }
  }
  function applyTransparencyAndCrop(imageData, transparentValue, keepOutline) {
    const keepArray = new Array(imageData.width * imageData.height);
    let minY = Infinity, maxY = -Infinity;
    let minX = Infinity, maxX = -Infinity;
    if (isNaN(transparentValue)) {
      minX = minY = 0;
      maxX = imageData.width - 1;
      maxY = imageData.height - 1;
      keepArray.fill(true, 0, keepArray.length);
    } else {
      keepArray.fill(false, 0, keepArray.length);
      for (let y3 = 0; y3 < imageData.height; y3++) {
        for (let x3 = 0; x3 < imageData.width; x3++) {
          const keep = !isTransparent(colorAt(imageData, x3, y3));
          if (keep) {
            minX = Math.min(minX, x3);
            maxX = Math.max(maxX, x3);
            minY = Math.min(minY, y3);
            maxY = Math.max(maxY, y3);
            keepArray[y3 * imageData.width + x3] = true;
            if (keepOutline) {
              if (x3 !== 0)
                keepArray[y3 * imageData.width + (x3 - 1)] = true;
              if (y3 !== 0)
                keepArray[(y3 - 1) * imageData.width + x3] = true;
              if (x3 !== imageData.width - 1)
                keepArray[y3 * imageData.width + (x3 + 1)] = true;
              if (y3 !== imageData.height - 1)
                keepArray[(y3 + 1) * imageData.width + x3] = true;
            }
          }
        }
      }
      if (keepOutline) {
        if (minX !== 0)
          minX--;
        if (minY !== 0)
          minY--;
        if (maxX !== imageData.width - 1)
          maxX++;
        if (maxY !== imageData.height - 1)
          maxY++;
      }
    }
    const newImage = new ImageData(maxX - minX + 1, maxY - minY + 1);
    for (let y3 = 0; y3 < newImage.height; y3++)
      for (let x3 = 0; x3 < newImage.width; x3++)
        newImage.data[(y3 * newImage.width + x3) * 4 + 3] = 0;
    for (let y3 = minY; y3 <= maxY; y3++) {
      for (let x3 = minX; x3 <= maxX; x3++) {
        const color = colorAt(imageData, x3, y3);
        const c3 = ((y3 - minY) * newImage.width + (x3 - minX)) * 4;
        if (keepArray[y3 * imageData.width + x3]) {
          newImage.data[c3 + 0] = color >> 0 & 255;
          newImage.data[c3 + 1] = color >> 8 & 255;
          newImage.data[c3 + 2] = color >> 16 & 255;
          newImage.data[c3 + 3] = 255;
        }
      }
    }
    return newImage;
    function isTransparent(n2) {
      if (isNaN(transparentValue))
        return false;
      if (transparentValue === 0) {
        return (n2 >> 24) * 255 === 0;
      }
      return (n2 & 16777215) === (transparentValue & 16777215);
    }
  }
  function getImageData(img) {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    return imageData;
  }
  function inferTransparencyValue(imageData) {
    let hasEdgeMagenta = false;
    for (let y3 = 0; y3 < imageData.height; y3++) {
      const isYedge = y3 === 0 || y3 === imageData.height - 1;
      for (let x3 = 0; x3 < imageData.width; x3++) {
        const c3 = 4 * (y3 * imageData.width + x3);
        if (imageData.data[c3 + 3] === 0) {
          return 0;
        }
        if (isYedge || x3 === 0 || x3 === imageData.width - 1) {
          if (imageData.data[c3 + 0] === 255 && imageData.data[c3 + 1] === 0 && imageData.data[c3 + 2] === 255) {
            hasEdgeMagenta = true;
          }
        }
      }
    }
    if (hasEdgeMagenta)
      return 16711935;
    return getCornerTransparency(imageData);
  }
  function getCornerTransparency(rgbaArray) {
    const arr = [
      colorAt(rgbaArray, 0, 0),
      colorAt(rgbaArray, 0, rgbaArray.height - 1),
      colorAt(rgbaArray, rgbaArray.width - 1, 0),
      colorAt(rgbaArray, rgbaArray.width - 1, rgbaArray.height)
    ];
    arr.sort();
    if (arr[1] === arr[2]) {
      return arr[1];
    }
    return 0;
  }
  function colorAt(img, x3, y3) {
    const c3 = (y3 * img.width + x3) * 4;
    return img.data[c3 + 0] << 0 | img.data[c3 + 1] << 8 | img.data[c3 + 2] << 16 | img.data[c3 + 3] << 24;
  }
  function adjustImage(imageData, imageSettings) {
    const {mark} = timer();
    mark("Image -> RGBA");
    let transparency;
    switch (imageSettings.transparency) {
      case "auto":
        mark("Infer transparency");
        transparency = inferTransparencyValue(imageData);
        break;
      case "alpha":
        transparency = 0;
        break;
      case "none":
        transparency = NaN;
        break;
      case "magenta":
        transparency = 4294902015;
        break;
      case "corners":
        transparency = getCornerTransparency(imageData);
        break;
    }
    const descaledImageData = imageSettings.descale ? descale(imageData) : imageData;
    const croppedImageData = applyTransparencyAndCrop(descaledImageData, transparency, imageSettings.keepOutline);
    mark("Apply transparency & crop");
    const originalSize = [croppedImageData.width, croppedImageData.height];
    const maxSize = isTrueColorImage(croppedImageData, 256) ? 96 : 480;
    const downsize = maxDimension(originalSize, maxSize);
    const rescaledImageData = downsize === originalSize ? croppedImageData : resizeImage(croppedImageData, downsize);
    const adjustedImageData = applyImageAdjustments(rescaledImageData, imageSettings.brightness * 10 + 100, imageSettings.contrast * 10 + 100, imageSettings.saturation * 10 + 100, imageSettings.flip, imageSettings.mirror);
    mark("Adjust image");
    return adjustedImageData;
  }
  function maxDimension(size, max) {
    if (size[0] <= max && size[1] <= max)
      return size;
    const scale = Math.max(size[0] / max, size[1] / max);
    return [Math.round(size[0] / scale), Math.round(size[1] / scale)];
  }
  function palettizeImage(rgbaArray, materialSettings, imageProps) {
    const {mark} = timer();
    let allowedColors;
    switch (materialSettings.palette) {
      case "dmc":
        allowedColors = colorData.sets.filter((f3) => f3.name === "dmc")[0].colors;
        break;
      case "lego":
        allowedColors = colorData.sets.filter((f3) => f3.name === "lego")[0].colors;
        break;
      case "artkal-all-mini":
        allowedColors = colorData.sets.filter((f3) => f3.name === "Artkal Mini")[0].colors;
        break;
      case "artkal-mini-starter":
        allowedColors = colorData.sets.filter((f3) => f3.name === "Artkal Mini Starter")[0].colors;
        break;
      case "perler-all":
        allowedColors = colorData.sets.filter((f3) => f3.name === "All Perler")[0].colors;
        break;
      case "perler-multimix":
        allowedColors = colorData.sets.filter((f3) => f3.name === "Perler Multi Mix")[0].colors;
        break;
      case "evoretro":
        allowedColors = colorData.sets.filter((f3) => f3.name === "EvoRetro")[0].colors;
        break;
      case "funzbo":
        allowedColors = colorData.sets.filter((f3) => f3.name === "Funzbo")[0].colors;
        break;
      case "all":
        allowedColors = void 0;
        break;
      default:
        assertNever(materialSettings.palette, "Unknown palette");
    }
    const survey = surveyColors(rgbaArray);
    let doDither;
    if (allowedColors === void 0) {
      doDither = false;
    } else if (imageProps.dithering === "auto") {
      doDither = survey.length > 256;
    } else {
      doDither = imageProps.dithering === "on";
    }
    let quantized;
    if (doDither) {
      quantized = dither(rgbaArray, allowedColors);
    } else {
      const palette = makePalette(survey, allowedColors, materialSettings);
      mark("Create palette");
      quantized = palettize(rgbaArray, palette);
      mark("Apply palette");
    }
    return {
      rgbaArray,
      quantized
    };
  }
  function createPartListImage(quantized) {
    const partList = getPartList(quantized);
    const res = new Array(quantized.height);
    const lookup = new Map();
    for (let i3 = 0; i3 < partList.length; i3++) {
      lookup.set(partList[i3].target, i3);
    }
    for (let y3 = 0; y3 < quantized.height; y3++) {
      res[y3] = new Array(quantized.width);
      for (let x3 = 0; x3 < quantized.width; x3++) {
        const px = quantized.pixels[y3][x3];
        if (px === void 0) {
          res[y3][x3] = -1;
        } else {
          res[y3][x3] = lookup.get(px);
        }
      }
    }
    return {
      pixels: res,
      width: quantized.width,
      height: quantized.height,
      partList
    };
  }
  function getPartList(quantized) {
    const lookup = new Map();
    for (let y3 = 0; y3 < quantized.height; y3++) {
      for (let x3 = 0; x3 < quantized.width; x3++) {
        const c3 = quantized.pixels[y3][x3];
        if (c3 === void 0)
          continue;
        const entry = lookup.get(c3);
        if (entry === void 0) {
          lookup.set(c3, {count: 1, target: c3, symbol: "#"});
        } else {
          entry.count++;
        }
      }
    }
    const res = [];
    for (const entry of lookup.entries()) {
      res.push(entry[1]);
    }
    res.sort((a3, b3) => b3.count - a3.count);
    for (let i3 = 0; i3 < res.length; i3++) {
      res[i3].symbol = symbolAlphabet[i3];
    }
    return res;
  }
  function getImageStats(image) {
    return {
      pixels: image.partList.reduce((a3, b3) => a3 + b3.count, 0)
    };
  }
  function renderPartListImageToDataURL(image, maxPartFrame = Infinity) {
    const buffer = new Uint8ClampedArray(image.width * image.height * 4);
    const partList = image.partList.map((p3) => p3.target);
    for (let x3 = 0; x3 < image.width; x3++) {
      for (let y3 = 0; y3 < image.height; y3++) {
        const c3 = (y3 * image.width + x3) * 4;
        const px = image.pixels[y3][x3];
        if (px !== -1 && px < maxPartFrame) {
          const color = image.partList[px];
          buffer[c3 + 0] = color.target.r;
          buffer[c3 + 1] = color.target.g;
          buffer[c3 + 2] = color.target.b;
          buffer[c3 + 3] = 255;
        } else {
          buffer[c3 + 3] = 0;
        }
      }
    }
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    const data = ctx.createImageData(image.width, image.height);
    data.data.set(buffer);
    ctx.putImageData(data, 0, 0);
    return canvas.toDataURL();
  }
  function resizeImage(imageData, downsize) {
    const src = document.createElement("canvas");
    src.width = imageData.width;
    src.height = imageData.height;
    src.getContext("2d").putImageData(imageData, 0, 0);
    const dst = document.createElement("canvas");
    [dst.width, dst.height] = downsize;
    const context = dst.getContext("2d");
    context.scale(downsize[0] / imageData.width, downsize[1] / imageData.height);
    context.drawImage(src, 0, 0);
    return context.getImageData(0, 0, downsize[0], downsize[1]);
  }
  function dither(image, allowedColors) {
    const perf = timer();
    const chR = image.pixels.map((line) => line.map((e3) => e3 & 255));
    const chG = image.pixels.map((line) => line.map((e3) => e3 >> 8 & 255));
    const chB = image.pixels.map((line) => line.map((e3) => e3 >> 16 & 255));
    perf.mark("Create channel arrays");
    const pixels = new Array(image.height);
    for (let y3 = 0; y3 < image.height; y3++) {
      pixels[y3] = new Array(image.width);
      if (y3 % 2 === 0) {
        for (let x3 = 0; x3 < image.width; x3++) {
          quantize(x3, y3, true);
        }
      } else {
        for (let x3 = image.width - 1; x3 >= 0; x3--) {
          quantize(x3, y3, false);
        }
      }
    }
    perf.mark("Dither");
    console.trace();
    return {
      pixels,
      width: image.width,
      height: image.height
    };
    function quantize(x3, y3, rightScanning) {
      if (image.pixels[y3][x3] === -1) {
        pixels[y3][x3] = void 0;
      } else {
        let bestError = Infinity;
        let bestColor = void 0;
        for (const c3 of allowedColors) {
          const e3 = colorDiff.rgb2(chR[y3][x3], chG[y3][x3], chB[y3][x3], c3);
          if (e3 < bestError) {
            bestColor = c3;
            bestError = e3;
          }
        }
        pixels[y3][x3] = bestColor;
        const er = bestColor.r - chR[y3][x3], eg = bestColor.g - chG[y3][x3], eb = bestColor.b - chB[y3][x3];
        if (rightScanning) {
          applyError(x3 + 1, y3 + 0, er, eg, eb, 7 / 16);
          applyError(x3 - 1, y3 + 1, er, eg, eb, 3 / 16);
          applyError(x3 + 0, y3 + 1, er, eg, eb, 5 / 16);
          applyError(x3 + 1, y3 + 1, er, eg, eb, 1 / 16);
        } else {
          applyError(x3 - 1, y3 + 0, er, eg, eb, 7 / 16);
          applyError(x3 + 1, y3 + 1, er, eg, eb, 3 / 16);
          applyError(x3 + 0, y3 + 1, er, eg, eb, 5 / 16);
          applyError(x3 - 1, y3 + 1, er, eg, eb, 1 / 16);
        }
      }
    }
    function applyError(x3, y3, r3, g3, b3, f3) {
      if (x3 < 0 || x3 >= image.width)
        return;
      if (y3 < 0 || y3 >= image.height)
        return;
      chR[y3][x3] -= r3 * f3;
      chG[y3][x3] -= g3 * f3;
      chB[y3][x3] -= b3 * f3;
    }
  }
  function isTrueColorImage(img, threshold) {
    const set = new Set();
    let c3 = 0;
    for (let y3 = 0; y3 < img.height; y3++) {
      for (let x3 = 0; x3 < img.width; x3++) {
        set.add(img.data[c3 + 0] << 0 | img.data[c3 + 1] << 8 | img.data[c3 + 2] << 16 | img.data[c3 + 3] << 24);
        c3 += 4;
      }
      if (set.size > threshold)
        return true;
    }
    return false;
  }

  // src/types.tsx
  init_preact_module();
  var BuyLink = ({code}) => {
    return /* @__PURE__ */ a("a", {
      href: "https://amzn.to/" + code,
      rel: "noreferrer",
      target: "_blank",
      title: "Buy"
    }, "\u{1F6D2}");
  };
  var MaterialSettings = {
    palette: [
      ["artkal-mini-starter", /* @__PURE__ */ a("span", null, "Artkal Mini Starter ", /* @__PURE__ */ a(BuyLink, {
        code: "3wThLo8"
      }))],
      ["artkal-all-mini", "All Artkal Mini"],
      ["perler-multimix", /* @__PURE__ */ a("span", null, "Perler Multi Mix ", /* @__PURE__ */ a(BuyLink, {
        code: "2WjPiLU"
      }))],
      ["perler-all", /* @__PURE__ */ a("span", null, "All Perler ", /* @__PURE__ */ a(BuyLink, {
        code: "3kPFwL9"
      }))],
      ["evoretro", /* @__PURE__ */ a("span", null, "Evoretro ", /* @__PURE__ */ a(BuyLink, {
        code: "39Lp3kO"
      }))],
      ["funzbo", /* @__PURE__ */ a("span", null, "Funzbo ", /* @__PURE__ */ a(BuyLink, {
        code: "3GDH7N3"
      }))],
      ["lego", /* @__PURE__ */ a("span", null, "LEGO ", /* @__PURE__ */ a(BuyLink, {
        code: "3omMszN"
      }))],
      ["dmc", /* @__PURE__ */ a("span", null, "DMC ", /* @__PURE__ */ a(BuyLink, {
        code: "3D4PRtf"
      }))],
      ["all", "All Colors"]
    ],
    size: [
      ["artkal-mini", /* @__PURE__ */ a("span", null, "Artkal Mini", /* @__PURE__ */ a(BuyLink, {
        code: "3eNjvcm"
      }))],
      ["perler-mini", /* @__PURE__ */ a("span", null, "Perler Mini", /* @__PURE__ */ a(BuyLink, {
        code: "2WcXJIH"
      }))],
      ["perler", /* @__PURE__ */ a("span", null, "Perler", /* @__PURE__ */ a(BuyLink, {
        code: "36U2tov"
      }))],
      ["evoretro", /* @__PURE__ */ a("span", null, "Evoretro", /* @__PURE__ */ a(BuyLink, {
        code: "39Lp3kO"
      }))],
      ["funzbo", /* @__PURE__ */ a("span", null, "Funzbo", /* @__PURE__ */ a(BuyLink, {
        code: "3GDH7N3"
      }))],
      ["16 ct", /* @__PURE__ */ a("span", {
        title: "16 threads per inch (cross-stitch)"
      }, "16 ct")],
      ["30 ct", /* @__PURE__ */ a("span", {
        title: "30 threads per inch (cross-stitch)"
      }, "30 ct")],
      ["lego", "LEGO \u2122"]
    ],
    colorMatch: [
      ["ciede2000", "CIEDE2000"],
      ["ictcp", "ICtCp"],
      ["rgb", "RGB"]
    ]
  };
  var ImageSettings = {
    transparency: [
      ["auto", "Auto"],
      ["alpha", "Alpha Channel"],
      ["magenta", "Magenta"],
      ["corners", "Corners"],
      ["none", "None"]
    ],
    dithering: [
      ["auto", "Auto"],
      ["on", "On"],
      ["off", "Off"]
    ]
  };
  var DisplaySettings = {
    planStyle: [
      ["symbolspans", "Symbols + Spans"],
      ["spans", "Spans"],
      ["symbols", "Symbols"],
      ["none", "None"]
    ],
    grid: [
      ["auto", "Auto"],
      ["50", "50"],
      ["25", "25"],
      ["10", "10"],
      ["none", "None"]
    ],
    background: [
      ["#777", "Grey"],
      ["#000", "Black"],
      ["#FFF", "White"],
      ["url(#checkPattern)", "Checker"],
      ["transparent", "Transparent"],
      ["url(#wood)", "Wood"]
    ],
    refobj: [
      ["none", "None"],
      ["quarter", "Quarter"],
      ["dollar", "Dollar"],
      ["credit", "Bank Card"]
    ]
  };

  // src/components/context.ts
  init_preact_module();
  var PropContext = q(null);

  // src/components/print-dialog.tsx
  init_preact_module();

  // src/pdf-generator.ts
  async function makePdf(image, settings) {
    loadPdfAnd(() => makePdfWorker(image, settings));
  }
  async function loadPdfAnd(func) {
    const tagName = "pdf-script-tag";
    const scriptEl = document.getElementById(tagName);
    if (scriptEl === null) {
      const tag1 = document.createElement("script");
      tag1.id = tagName;
      tag1.onload = () => {
        func();
      };
      tag1.src = "https://github.com/foliojs/pdfkit/releases/download/v0.12.1/pdfkit.standalone.js";
      document.head.appendChild(tag1);
    } else {
      func();
    }
  }
  function makePdfWorker(image, settings) {
    const pageMarginPts = inchesToPoints(1 / 3);
    const doc = new PDFDocument({
      size: settings.paperSize
    });
    const stream = doc.pipe(blobStream());
    if (settings.style === "legend") {
      drawLegend(doc, image);
    }
    const paperWidthPts = doc.page.width;
    const paperHeightPts = doc.page.height;
    const printableWidthPts = paperWidthPts - pageMarginPts * 2;
    const printableHeightPts = paperHeightPts - pageMarginPts * 2;
    const cellHeaderHeightPts = doc.heightOfString("Testing");
    let pitchPts;
    if (settings.imageSize === "actual") {
      pitchPts = mmToPoints(settings.pitch);
    } else if (settings.imageSize === "legible") {
      if (settings.breakStrategy === "grid") {
        pitchPts = 0.99 * Math.min((printableWidthPts - cellHeaderHeightPts) / settings.carveSize[0], (printableHeightPts - cellHeaderHeightPts) / settings.carveSize[1]);
      } else {
        pitchPts = mmToPoints(4);
      }
    } else {
      if (image.width >= image.height) {
        pitchPts = Math.min((printableWidthPts - cellHeaderHeightPts) / image.height, (printableHeightPts - cellHeaderHeightPts) / image.width);
      } else {
        pitchPts = Math.min((printableWidthPts - cellHeaderHeightPts) / image.width, (printableHeightPts - cellHeaderHeightPts) / image.height);
      }
    }
    let carveSize;
    if (settings.imageSize === "single-page") {
      carveSize = [Infinity, Infinity];
    } else if (settings.breakStrategy === "grid") {
      carveSize = settings.carveSize;
    } else {
      carveSize = [Math.floor((printableWidthPts - cellHeaderHeightPts) / pitchPts), Math.floor((printableHeightPts - cellHeaderHeightPts) / pitchPts)];
    }
    const slices = generateImageSlices(image, carveSize);
    const sliceWidth = Math.max.apply(Math.max, slices.map((s3) => s3.width));
    const sliceHeight = Math.max.apply(Math.max, slices.map((s3) => s3.height));
    const gridSizePts = {
      width: pitchPts * sliceWidth,
      height: pitchPts * sliceHeight
    };
    const textPlacement = gridSizePts.width * 1.2 > gridSizePts.height ? "top" : "side";
    const imageCellSizePts = {
      width: gridSizePts.width + (textPlacement === "side" ? cellHeaderHeightPts : 0),
      height: gridSizePts.height + (textPlacement === "top" ? cellHeaderHeightPts : 0)
    };
    if (settings.debug) {
      doc.rect(pageMarginPts, pageMarginPts, paperWidthPts - pageMarginPts * 2, paperHeightPts - pageMarginPts * 2);
      doc.stroke("red");
    }
    if (settings.style === "step-by-step") {
      const slicesToPrint = [];
      for (const slice of slices) {
        const doneMap = [];
        for (let y3 = 0; y3 < slice.height; y3++) {
          doneMap[y3] = [];
          for (let x3 = 0; x3 < slice.width; x3++) {
            doneMap[y3][x3] = false;
          }
        }
        for (let i3 = 0; i3 < image.partList.length; i3++) {
          if (isAnyPixel(slice, (p3) => p3 === image.partList[i3])) {
            slicesToPrint.push({partIndex: i3, slice});
          }
        }
      }
      const layout = getLayout(slicesToPrint.length, paperWidthPts, paperHeightPts, pageMarginPts, imageCellSizePts.width, imageCellSizePts.height);
      const multipleSlices = slices.length > 1;
      for (const stp of slicesToPrint) {
        const pos = layout.shift();
        const done = pos.next(doc, stp.slice.width * pitchPts, stp.slice.height * pitchPts);
        printSteppedSlice({
          doc,
          image,
          partIndex: stp.partIndex,
          slice: stp.slice,
          pitch: pitchPts,
          textPlacement,
          cellHeaderHeightPts,
          multipleSlices,
          debug: settings.debug
        });
        done();
      }
    } else if (settings.style === "color") {
      const layout = getLayout(slices.length, paperWidthPts, paperHeightPts, pageMarginPts, imageCellSizePts.width, imageCellSizePts.height);
      for (const slice of slices) {
        const pos = layout.shift();
        const done = pos.next(doc, slice.width * pitchPts, slice.height * pitchPts);
        if (settings.debug) {
          doc.rect(0, 0, slice.width * pitchPts, slice.height * pitchPts);
          doc.stroke("blue");
        }
        for (let i3 = 0; i3 < image.partList.length; i3++) {
          for (let y3 = slice.y; y3 < slice.y + slice.height; y3++) {
            const cy = y3 - slice.y;
            for (let x3 = slice.x; x3 < slice.x + slice.width; x3++) {
              const cx = x3 - slice.x;
              if (image.pixels[y3][x3] === i3) {
                doc.rect(cx * pitchPts, cy * pitchPts, pitchPts, pitchPts);
              }
            }
          }
          const color = image.partList[i3].target;
          doc.fill([color.r, color.g, color.b]);
        }
        done();
      }
    } else if (settings.style === "legend") {
      const layout = getLayout(slices.length, paperWidthPts, paperHeightPts, pageMarginPts, imageCellSizePts.width, imageCellSizePts.height);
      for (const slice of slices) {
        const pos = layout.shift();
        const done = pos.next(doc, slice.width * pitchPts, slice.height * pitchPts);
        doc.fontSize(pitchPts);
        doc.font("Courier");
        for (let y3 = slice.y; y3 < slice.y + slice.height; y3++) {
          const cy = y3 - slice.y;
          for (let x3 = slice.x; x3 < slice.x + slice.width; x3++) {
            const cx = x3 - slice.x;
            const px = image.pixels[y3][x3];
            if (px === -1)
              continue;
            doc.text(image.partList[px].symbol, cx * pitchPts, cy * pitchPts, {align: "center", baseline: "middle", height: pitchPts, width: pitchPts});
          }
        }
        done();
      }
    }
    stream.on("finish", () => {
      window.open(stream.toBlobURL("application/pdf"), "_blank");
    });
    doc.end();
  }
  function drawLegend(doc, image) {
    doc.save();
    doc.fontSize(16);
    const symbolColumnWidth = 5 + Math.max.apply(Math, image.partList.map((p3) => doc.widthOfString(p3.symbol)));
    const codeColumnWidth = 5 + Math.max.apply(Math, image.partList.map((p3) => doc.widthOfString(p3.target.code ?? "")));
    const countColumnWidth = 5 + Math.max.apply(Math, image.partList.map((p3) => doc.widthOfString(p3.count.toLocaleString())));
    const swatchColumnWidth = 32;
    const nameColumnWidth = 5 + Math.max.apply(Math, image.partList.map((p3) => doc.widthOfString(p3.target.name)));
    const lineMargin = 2;
    const lineHeight = lineMargin * 2 + doc.heightOfString("I like you, person reading this code");
    doc.translate(inchesToPoints(1), inchesToPoints(1));
    let x3 = 0;
    let y3 = 0;
    for (let i3 = 0; i3 < image.partList.length; i3++) {
      x3 = 0;
      doc.text(image.partList[i3].symbol, x3, y3 + lineMargin, {width: symbolColumnWidth, height: lineHeight, align: "center"});
      x3 += symbolColumnWidth;
      doc.rect(x3, y3 + lineMargin, swatchColumnWidth - 5, lineHeight - lineMargin * 2);
      doc.fill([image.partList[i3].target.r, image.partList[i3].target.g, image.partList[i3].target.b]);
      doc.fillColor("black");
      x3 += swatchColumnWidth;
      doc.text(image.partList[i3].count.toLocaleString(), x3, y3 + lineMargin, {width: countColumnWidth - 5, align: "right"});
      x3 += countColumnWidth;
      const code = image.partList[i3].target.code;
      if (code !== void 0) {
        doc.text(code, x3, y3 + lineMargin, {width: codeColumnWidth});
        x3 += codeColumnWidth;
      }
      doc.text(image.partList[i3].target.name, x3, y3 + lineMargin, {width: nameColumnWidth});
      x3 += nameColumnWidth;
      doc.moveTo(0, y3);
      doc.lineTo(x3, y3);
      doc.stroke("grey");
      y3 += lineHeight;
    }
    doc.restore();
    doc.addPage();
  }
  function generateImageSlices(image, size) {
    const carves1 = carve(image.width, image.height, size[0], size[1]);
    const carves2 = carve(image.width, image.height, size[1], size[0]);
    const carves = carves1.length <= carves2.length ? carves1 : carves2;
    return carves.map((c3) => ({
      image,
      width: c3.width,
      height: c3.height,
      x: c3.x,
      y: c3.y,
      row: c3.row,
      col: c3.col,
      forEach: makeForEach(image, c3.x, c3.y, c3.width, c3.height)
    })).filter((slice) => isAnyPixel(slice, (p3) => !!p3));
  }
  function isAnyPixel(slice, test) {
    for (let x3 = slice.x; x3 < slice.x + slice.width; x3++) {
      for (let y3 = slice.y; y3 < slice.y + slice.height; y3++) {
        if (test(slice.image.partList[slice.image.pixels[y3][x3]]))
          return true;
      }
    }
    return false;
  }
  function makeForEach(image, x0, y0, width, height, test) {
    return function(callback) {
      for (let x3 = x0; x3 < x0 + width; x3++) {
        for (let y3 = y0; y3 < y0 + height; y3++) {
          const p3 = image.pixels[y3][x3];
          const color = image.partList[p3];
          if (color && (!test || test(color))) {
            callback(x3 - x0, y3 - y0, color);
          }
        }
      }
    };
  }
  function printSteppedSlice(opts) {
    const {
      image,
      partIndex,
      doc,
      slice,
      pitch
    } = opts;
    const gridSizePts = {
      width: slice.width * pitch,
      height: slice.height * pitch
    };
    const text = opts.multipleSlices ? `${nameOfColor(image.partList[partIndex].target)} Row ${slice.row} Col ${slice.col}` : `${nameOfColor(image.partList[partIndex].target)}`;
    if (opts.textPlacement === "side") {
      if (opts.debug) {
        doc.rect(0, 0, gridSizePts.width + opts.cellHeaderHeightPts, gridSizePts.height);
        doc.stroke("blue");
      }
      doc.translate(opts.cellHeaderHeightPts, 0);
      doc.save();
      doc.rotate(-90);
      doc.translate(-gridSizePts.height, 0);
      doc.text(text, 0, 0, {baseline: "bottom", align: "center", width: gridSizePts.height, ellipsis: true});
      doc.restore();
    } else {
      if (opts.debug) {
        doc.rect(0, 0, gridSizePts.width, gridSizePts.height + opts.cellHeaderHeightPts);
        doc.stroke("blue");
      }
      doc.translate(0, opts.cellHeaderHeightPts);
      doc.text(text, 0, 0, {baseline: "bottom", align: "center", width: gridSizePts.width, ellipsis: true});
    }
    doc.rect(0, 0, gridSizePts.width, gridSizePts.height);
    doc.lineWidth(1);
    doc.stroke("grey");
    traceOwnPixels();
    doc.fill("black");
    tracePriorPixels();
    doc.lineWidth(1.3);
    doc.stroke("grey");
    function traceOwnPixels() {
      for (let y3 = slice.y; y3 < slice.y + slice.height; y3++) {
        const cyPts = (y3 - slice.y + 0.5) * pitch;
        for (let x3 = slice.x; x3 < slice.x + slice.width; x3++) {
          if (image.pixels[y3][x3] === partIndex) {
            const cxPts = (x3 - slice.x + 0.5) * pitch;
            doc.circle(cxPts, cyPts, pitch / 2.5);
          }
        }
      }
    }
    function tracePriorPixels() {
      const alreadyPlotted = new Map();
      for (let y3 = slice.y; y3 < slice.y + slice.height; y3++) {
        outline(slice.x, slice.x + slice.width, (x3) => isPrior(x3, y3), (x3) => plot(x3, y3));
      }
      for (let x3 = slice.x; x3 < slice.x + slice.width; x3++) {
        outline(slice.y, slice.y + slice.height, (y3) => isPrior(x3, y3), (y3) => plot(x3, y3));
      }
      function plot(x3, y3) {
        const s3 = x3 + "-" + y3;
        if (alreadyPlotted.has(s3))
          return;
        alreadyPlotted.set(s3, true);
        const cxPts = (x3 - slice.x) * pitch;
        const cyPts = (y3 - slice.y) * pitch;
        doc.moveTo(cxPts + pitch * 0.3, cyPts + pitch * 0.3);
        doc.lineTo(cxPts + pitch * 0.7, cyPts + pitch * 0.7);
        doc.moveTo(cxPts + pitch * 0.3, cyPts + pitch * 0.7);
        doc.lineTo(cxPts + pitch * 0.7, cyPts + pitch * 0.3);
      }
      function isPrior(x3, y3) {
        const px = image.pixels[y3][x3];
        if (px < partIndex && px !== -1) {
          return true;
        }
        return false;
      }
      function outline(startInclusive, endEnclusive, callback, plotter) {
        let inside = false;
        for (let i3 = startInclusive; i3 < endEnclusive; i3++) {
          if (callback(i3)) {
            if (!inside)
              plotter(i3);
            inside = true;
          } else {
            if (inside)
              plotter(i3 - 1);
            inside = false;
          }
        }
        if (inside)
          plotter(endEnclusive - 1);
      }
    }
  }
  function getLayout(cellCount, pageWidthPts, pageHeightPts, pageMarginPts, cellWidthPts, cellHeightPts) {
    const cellMarginPts = mmToPoints(9);
    const result = [];
    const printableWidthPts = pageWidthPts - pageMarginPts * 2;
    const printableHeightPts = pageHeightPts - pageMarginPts * 2;
    const densestUnrotatedLayout = {
      maxCols: Math.floor((cellMarginPts + printableWidthPts) / (cellMarginPts + cellWidthPts)),
      maxRows: Math.floor((cellMarginPts + printableHeightPts) / (cellMarginPts + cellHeightPts))
    };
    const densestRotatedLayout = {
      maxCols: Math.floor((cellMarginPts + printableWidthPts) / (cellMarginPts + cellHeightPts)),
      maxRows: Math.floor((cellMarginPts + printableHeightPts) / (cellMarginPts + cellWidthPts))
    };
    const isRotated = densestRotatedLayout.maxRows * densestRotatedLayout.maxCols > densestUnrotatedLayout.maxRows * densestUnrotatedLayout.maxCols && densestUnrotatedLayout.maxRows * densestUnrotatedLayout.maxCols < cellCount;
    const densestLayout = isRotated ? densestRotatedLayout : densestUnrotatedLayout;
    if (densestLayout.maxRows * densestLayout.maxCols === 0) {
      throw new Error("Can't do this layout");
    }
    while (true) {
      if (densestLayout.maxCols >= densestLayout.maxRows) {
        if ((densestLayout.maxCols - 1) * densestLayout.maxRows >= cellCount) {
          densestLayout.maxCols--;
          continue;
        }
        if ((densestLayout.maxRows - 1) * densestLayout.maxCols >= cellCount) {
          densestLayout.maxRows--;
          continue;
        }
      } else {
        if ((densestLayout.maxRows - 1) * densestLayout.maxCols >= cellCount) {
          densestLayout.maxRows--;
          continue;
        }
        if ((densestLayout.maxCols - 1) * densestLayout.maxRows >= cellCount) {
          densestLayout.maxCols--;
          continue;
        }
      }
      break;
    }
    const layoutXsize = isRotated ? cellHeightPts : cellWidthPts;
    const layoutYsize = isRotated ? cellWidthPts : cellHeightPts;
    const unallocatedX = pageWidthPts - pageMarginPts * 2 - densestLayout.maxCols * layoutXsize;
    const unallocatedY = pageHeightPts - pageMarginPts * 2 - densestLayout.maxRows * layoutYsize;
    const xJustification = unallocatedX / (densestLayout.maxCols + 1);
    const yJustification = unallocatedY / (densestLayout.maxRows + 1);
    const xInterval = layoutXsize + xJustification;
    const yInterval = layoutYsize + yJustification;
    console.log(JSON.stringify({
      pageWidthPts,
      pageHeightPts,
      cellWidthPts,
      cellHeightPts,
      densestUnrotatedLayout,
      densestRotatedLayout,
      isRotated,
      densestLayout,
      unallocatedX,
      unallocatedY,
      xInterval,
      yInterval,
      xJustification,
      yJustification
    }, void 0, 2));
    let firstPage = true;
    while (true) {
      let first = true;
      if (isRotated) {
        for (let x3 = densestLayout.maxCols - 1; x3 >= 0; x3--) {
          for (let y3 = 0; y3 < densestLayout.maxRows; y3++) {
            if (iter(x3, y3, first)) {
              return result;
            }
            first = false;
          }
        }
      } else {
        for (let y3 = 0; y3 < densestLayout.maxRows; y3++) {
          for (let x3 = 0; x3 < densestLayout.maxCols; x3++) {
            if (iter(x3, y3, first)) {
              return result;
            }
            first = false;
          }
        }
      }
      firstPage = false;
    }
    function iter(x3, y3, first) {
      const newPage = first && !firstPage;
      addCell(newPage, pageMarginPts + xJustification + x3 * xInterval, pageMarginPts + yJustification + y3 * yInterval);
      if (result.length === cellCount) {
        return true;
      }
    }
    function addCell(newPage, translateX, translateY) {
      result.push({
        next(doc, actualWidthPts, actualHeightPts) {
          if (newPage) {
            doc.addPage();
          }
          const spareX = layoutXsize - (isRotated ? actualHeightPts : actualWidthPts);
          const spareY = layoutYsize - (isRotated ? actualWidthPts : actualHeightPts);
          doc.save();
          doc.translate(translateX + spareX / 2, translateY + spareY / 2);
          if (isRotated) {
            doc.rotate(90);
            doc.translate(0, -layoutXsize);
          }
          return () => {
            doc.restore();
          };
        }
      });
    }
  }
  function inchesToPoints(inches) {
    return inches * 72;
  }
  function mmToPoints(mm) {
    return mm / 25.4 * 72;
  }

  // src/components/print-dialog.tsx
  function PrintDialog(props) {
    const updateProp = F(PropContext);
    return /* @__PURE__ */ a("div", {
      class: "print-dialog"
    }, /* @__PURE__ */ a("div", {
      class: "print-options"
    }, /* @__PURE__ */ a(FormatGroup, {
      ...props
    }), /* @__PURE__ */ a(PaperSizeGroup, {
      ...props
    }), /* @__PURE__ */ a(ImageSizeGroup, {
      ...props
    }), /* @__PURE__ */ a(PageBreakingGroup, {
      ...props
    })), /* @__PURE__ */ a("div", {
      class: "print-buttons"
    }, /* @__PURE__ */ a("button", {
      class: "cancel",
      onClick: () => updateProp("ui", "isPrintOpen", false)
    }, "Cancel"), /* @__PURE__ */ a("button", {
      class: "print",
      onClick: () => print()
    }, "Print\xA0", /* @__PURE__ */ a("img", {
      class: "pdf-logo",
      src: "./pdf-logo.png"
    }))));
    function print() {
      const settings = {
        style: props.settings.format,
        paperSize: props.settings.paperSize,
        breakStrategy: props.settings.breakStrategy,
        imageSize: props.settings.imageSize,
        carveSize: getGridSize(props.gridSize),
        pitch: getPitch(props.gridSize),
        filename: props.filename.replace(".png", ""),
        debug: window.location.host.indexOf("localhost") === 0
      };
      makePdf(props.image, settings);
    }
  }
  var FormatGroup = makeRadioGroup(({image}) => ({
    title: "Format",
    key: "format",
    values: [
      {
        value: "step-by-step",
        title: "Single Color",
        description: "Print one black-and-white grid per color. Best for laser printers or when colors are difficult to tell apart.",
        icon: /* @__PURE__ */ a(StepByStepPreviewer, {
          image
        })
      },
      {
        value: "color",
        title: "Color Image",
        description: "Print a single color image. Best for color printers and images with fewer colors.",
        icon: /* @__PURE__ */ a(ColorImagePreviewer, {
          image
        })
      },
      {
        value: "legend",
        title: "Legend",
        description: "Print a grid of letters corresponding to the legend",
        icon: /* @__PURE__ */ a(SinglePlanPreviewer, {
          image
        })
      }
    ]
  }));
  var PaperSizeGroup = makeRadioGroup(() => ({
    key: "paperSize",
    title: "Paper Size",
    values: [
      {
        title: "Letter",
        value: "letter",
        description: '8.5" x 11"',
        icon: /* @__PURE__ */ a("span", {
          class: "letter-icon"
        })
      },
      {
        title: "A4",
        value: "a4",
        description: "210mm x 297mm",
        icon: /* @__PURE__ */ a("span", {
          class: "a4-icon"
        })
      }
    ]
  }));
  var ImageSizeGroup = makeRadioGroup(() => ({
    key: "imageSize",
    title: "Image Size",
    values: [
      {
        title: "Page",
        value: "single-page",
        description: "Scale the image to fit a single page",
        icon: /* @__PURE__ */ a("span", {
          class: "size-stretch"
        }, "\u26F6")
      },
      {
        title: "Actual",
        value: "actual",
        description: "Print at actual size. Multiple pages will be generated if necessary",
        icon: /* @__PURE__ */ a("span", {
          class: "size-actual"
        }, "1:1")
      },
      {
        title: "Legible",
        value: "legible",
        description: "Print at a legible size. Multiple pages will be generated if necessary",
        icon: /* @__PURE__ */ a("span", {
          class: "size-legible"
        }, "\u{1F441}")
      }
    ]
  }));
  var PageBreakingGroup = makeRadioGroup(() => ({
    key: "breakStrategy",
    title: "Page Breaking",
    values: [
      {
        title: "Grid",
        value: "grid",
        description: "Split large images based on the pegboard grid size",
        icon: /* @__PURE__ */ a("span", {
          class: "break-grid"
        }, "\u{1F533}")
      },
      {
        title: "Page",
        value: "page",
        description: "Split large images based on the page size",
        icon: /* @__PURE__ */ a("span", {
          class: "break-paper"
        }, "\u{1F4C4}")
      }
    ]
  }));
  function StepByStepPreviewer(props) {
    const [frame, setFrame] = l2(0);
    const imgRef = s2();
    y2(() => {
      drawNextFrame();
      const id = window.setInterval(incrementFrame, 600);
      return () => {
        window.clearInterval(id);
      };
    });
    return /* @__PURE__ */ a("img", {
      class: "step-by-step-preview",
      ref: imgRef
    });
    function incrementFrame() {
      setFrame((frame + 1) % (props.image.partList.length + 3));
    }
    function drawNextFrame() {
      imgRef.current.src = renderPartListImageToDataURL(props.image, frame);
    }
  }
  function ColorImagePreviewer(props) {
    return /* @__PURE__ */ a("img", {
      src: renderPartListImageToDataURL(props.image)
    });
  }
  function SinglePlanPreviewer(props) {
    const width = 5;
    const height = 4;
    const startX = Math.floor(props.image.width / 2) - Math.floor(width / 2);
    const startY = Math.floor(props.image.height / 2) - Math.floor(height / 2);
    const lines = [];
    for (let y3 = Math.max(startY, 0); y3 < Math.min(props.image.height, startY + height); y3++) {
      let s3 = "";
      for (let x3 = Math.max(startX, 0); x3 < Math.min(props.image.width, startX + width); x3++) {
        const px = props.image.partList[props.image.pixels[y3][x3]];
        s3 = s3 + (px?.symbol ?? " ");
      }
      lines.push(s3);
    }
    return /* @__PURE__ */ a("span", null, /* @__PURE__ */ a("pre", null, lines.join("\n")));
  }
  function makeRadioGroup(factory) {
    return function(props) {
      const updateProp = F(PropContext);
      const p3 = factory(props);
      return /* @__PURE__ */ a("div", {
        class: "print-setting-group"
      }, /* @__PURE__ */ a("h1", null, p3.title), /* @__PURE__ */ a("div", {
        class: "print-setting-group-options"
      }, p3.values.map((v3) => /* @__PURE__ */ a("label", null, /* @__PURE__ */ a("input", {
        type: "radio",
        name: p3.key,
        checked: v3.value === props.settings[p3.key],
        onChange: () => {
          updateProp("print", p3.key, v3.value);
        }
      }), /* @__PURE__ */ a("div", {
        class: "option"
      }, /* @__PURE__ */ a("h3", null, v3.title), v3.icon)))), /* @__PURE__ */ a("span", {
        class: "description"
      }, p3.values.filter((v3) => v3.value === props.settings[p3.key])[0]?.description));
    };
  }

  // src/components/plan-display.tsx
  init_preact_module();
  var svgns = "http://www.w3.org/2000/svg";
  var svgCss = require_svg();
  var refObjs = {
    quarter: {
      url: "https://upload.wikimedia.org/wikipedia/commons/4/44/2014_ATB_Quarter_Obv.png",
      width: 24.26,
      height: 24.26
    },
    dollar: {
      url: "https://upload.wikimedia.org/wikipedia/commons/2/23/US_one_dollar_bill%2C_obverse%2C_series_2009.jpg",
      width: 156.1,
      height: 66.3
    },
    credit: {
      url: "https://upload.wikimedia.org/wikipedia/commons/2/23/CIDSampleAmex.png",
      width: 85.6,
      height: 53.98
    }
  };
  function PlanSvg(props) {
    const {
      image,
      displaySettings
    } = props;
    const {
      planStyle
    } = displaySettings;
    const isBackgroundDark = displaySettings.background === "#000" || displaySettings.background === "#777";
    return /* @__PURE__ */ a("svg", {
      class: "plan",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: `-16 -16 ${(image.width + 1) * 32} ${(image.height + 1) * 32}`,
      preserveAspectRatio: "xMidYMid meet"
    }, /* @__PURE__ */ a("style", null, svgCss), /* @__PURE__ */ a("defs", null, /* @__PURE__ */ a("rect", {
      id: "melted",
      width: "32",
      height: "32",
      rx: "7",
      ry: "7"
    }), /* @__PURE__ */ a("rect", {
      id: "square",
      width: "32",
      height: "32"
    }), /* @__PURE__ */ a("rect", {
      id: "circle",
      width: "32",
      height: "32",
      rx: "16",
      ry: "16"
    }), /* @__PURE__ */ a("pattern", {
      id: "wood",
      patternUnits: "userSpaceOnUse",
      width: "400",
      height: "400"
    }, /* @__PURE__ */ a("image", {
      href: "https://upload.wikimedia.org/wikipedia/commons/5/50/Mahag%C3%B3ni_001.jpg",
      x: "0",
      y: "0",
      width: "400",
      height: "400"
    })), /* @__PURE__ */ a("filter", {
      id: "blurFilter"
    }, /* @__PURE__ */ a("feGaussianBlur", {
      in: "SourceGraphic",
      stdDeviation: "4"
    })), /* @__PURE__ */ a("pattern", {
      id: "checkPattern",
      viewBox: "0 0 32 32",
      width: "32",
      height: "32",
      patternUnits: "userSpaceOnUse"
    }, /* @__PURE__ */ a("rect", {
      x: "0",
      y: "0",
      width: "16",
      height: "16",
      fill: "#DDDDDD"
    }), /* @__PURE__ */ a("rect", {
      x: "0",
      y: "16",
      width: "16",
      height: "16",
      fill: "#999999"
    }), /* @__PURE__ */ a("rect", {
      x: "16",
      y: "0",
      width: "16",
      height: "16",
      fill: "#999999"
    }), /* @__PURE__ */ a("rect", {
      x: "16",
      y: "16",
      width: "16",
      height: "16",
      fill: "#DDDDDD"
    }))), /* @__PURE__ */ a(BackgroundLayer, {
      image,
      bg: displaySettings.background
    }), /* @__PURE__ */ a(ColorLayer, {
      image
    }), /* @__PURE__ */ a(GridLayer, {
      image,
      grid: displaySettings.grid,
      boardSize: props.gridSize,
      nudgeGrid: displaySettings.nudgeGrid
    }), /* @__PURE__ */ a(TextLayer, {
      image,
      planStyle: props.displaySettings.planStyle,
      isBackgroundDark
    }), /* @__PURE__ */ a(RefObjLayer, {
      pitch: props.pitch,
      name: displaySettings.refobj
    }));
  }
  function BackgroundLayer(props) {
    return /* @__PURE__ */ a("rect", {
      x: -16,
      y: -16,
      width: (props.image.width + 1) * 32,
      height: (props.image.height + 1) * 32,
      fill: props.bg,
      filter: props.bg === "url(#checkPattern)" ? "url(#blurFilter)" : ""
    });
  }
  function TextLayer(props) {
    const {image, planStyle, isBackgroundDark} = props;
    const textLayer = s2(null);
    y2(() => {
      renderSpans();
    }, [image, planStyle, isBackgroundDark]);
    return /* @__PURE__ */ a("g", {
      ref: textLayer
    });
    function renderSpans() {
      clearChildren(textLayer.current);
      const target = textLayer.current;
      if (planStyle === "symbols") {
        for (let y3 = 0; y3 < image.height; y3++) {
          for (let x3 = 0; x3 < image.width; x3++) {
            const px = image.partList[image.pixels[y3][x3]];
            if (px === void 0)
              continue;
            const t3 = document.createElementNS(svgns, "text");
            t3.innerHTML = px.symbol;
            t3.setAttribute("x", (x3 + 0.5) * 32);
            t3.setAttribute("y", (y3 + 0.8) * 32);
            t3.setAttribute("text-anchor", "middle");
            if (isBright(px.target)) {
              t3.setAttribute("class", "bright");
            } else {
              t3.setAttribute("class", "dark");
            }
            target.appendChild(t3);
          }
        }
      }
      if (planStyle === "spans" || planStyle === "symbolspans") {
        let addAt = function(px, runCount, endX, y3) {
          if (planStyle === "spans") {
            if (runCount < 2)
              return;
          } else {
            if (px === void 0 && runCount < 3)
              return;
          }
          const t3 = document.createElementNS(svgns, "text");
          if (planStyle === "spans") {
            t3.innerHTML = runCount.toString();
          } else {
            const sym = px?.symbol;
            if (sym === void 0) {
              t3.innerHTML = runCount.toString();
            } else if (runCount === 1) {
              t3.innerHTML = sym;
            } else if (runCount === 2) {
              t3.innerHTML = `${sym}`;
            } else {
              t3.innerHTML = `${sym}\xD7${runCount.toString()}`;
            }
          }
          t3.setAttribute("x", ((endX - runCount / 2) * 32).toString());
          t3.setAttribute("y", ((y3 + 0.8) * 32).toString());
          t3.setAttribute("text-anchor", "middle");
          if (px === void 0 ? !props.isBackgroundDark : isBright(px.target)) {
            t3.setAttribute("class", "bright");
          } else {
            t3.setAttribute("class", "dark");
          }
          target.appendChild(t3);
        };
        for (let y3 = 0; y3 < image.height; y3++) {
          let nowColor = void 0;
          let runCount = 0;
          for (let x3 = 0; x3 <= image.width; x3++) {
            if (x3 === image.width) {
              addAt(nowColor, runCount, x3, y3);
              break;
            }
            const px = image.partList[image.pixels[y3][x3]];
            if (nowColor === px) {
              runCount++;
            } else {
              if (runCount > 0) {
                addAt(nowColor, runCount, x3, y3);
              }
              nowColor = px;
              runCount = 1;
            }
          }
        }
      }
    }
  }
  function GridLayer(props) {
    const {image, grid, nudgeGrid} = props;
    const gridLayer = s2(null);
    y2(() => {
      renderGrid();
    }, [image, grid, nudgeGrid]);
    return /* @__PURE__ */ a("g", {
      ref: gridLayer
    });
    function renderGrid() {
      clearChildren(gridLayer.current);
      const target = gridLayer.current;
      if (grid !== "none") {
        let gridInterval;
        if (grid === "auto") {
          gridInterval = getGridSize(props.boardSize)[0];
        } else {
          gridInterval = parseInt(grid);
        }
        const gridOffset = props.nudgeGrid ? carveImageFast(image, gridInterval) : {xOffset: 0, yOffset: 0};
        for (let y3 = 0; y3 <= image.height; y3++) {
          const line = document.createElementNS(svgns, "line");
          line.classList.add("gridline");
          line.classList.add(gridInterval < image.height && y3 % gridInterval === gridOffset.yOffset ? "gridmajor" : "gridminor");
          line.setAttribute("x1", -16);
          line.setAttribute("x2", image.width * 32 + 16);
          line.setAttribute("y1", y3 * 32);
          line.setAttribute("y2", y3 * 32);
          target.appendChild(line);
        }
        for (let x3 = 0; x3 <= image.width; x3++) {
          const line = document.createElementNS(svgns, "line");
          line.classList.add(gridInterval < image.width && x3 % gridInterval === gridOffset.xOffset ? "gridmajor" : "gridminor");
          line.setAttribute("x1", x3 * 32);
          line.setAttribute("x2", x3 * 32);
          line.setAttribute("y1", -16);
          line.setAttribute("y2", image.height * 32 + 16);
          target.appendChild(line);
        }
      }
    }
  }
  function ColorLayer(props) {
    const colorsLayer = s2(null);
    const {image} = props;
    y2(() => {
      clearChildren(colorsLayer.current);
      renderColors(colorsLayer.current);
    }, [props.image]);
    return /* @__PURE__ */ a("g", {
      ref: colorsLayer
    });
    function renderColors(colorLayer) {
      const {mark} = timer();
      for (let i3 = 0; i3 < image.partList.length; i3++) {
        const parts = [];
        for (let y3 = 0; y3 < image.height; y3++) {
          for (let x3 = 0; x3 < image.width; x3++) {
            if (image.pixels[y3][x3] === i3) {
              parts.push(`M ${x3 * 32} ${y3 * 32} l 32 0 l 0 32 l -32 0 l 0 -32 z`);
            }
          }
        }
        const r3 = document.createElementNS(svgns, "path");
        r3.setAttribute("d", parts.join(" "));
        r3.setAttribute("fill", colorEntryToHtml(image.partList[i3].target));
        r3.setAttribute("stroke-width", "1px");
        const title = document.createElementNS(svgns, "title");
        title.innerHTML = nameOfColor(image.partList[i3].target);
        r3.appendChild(title);
        colorLayer.appendChild(r3);
      }
      mark("Render colors");
    }
  }
  function RefObjLayer(props) {
    if (props.name === "none") {
      return /* @__PURE__ */ a("g", null);
    }
    const refObj = refObjs[props.name];
    const factor = 32 / props.pitch;
    return /* @__PURE__ */ a("g", null, /* @__PURE__ */ a("image", {
      href: refObj.url,
      width: refObj.width * factor,
      height: refObj.height * factor,
      opacity: 0.8,
      x: 0,
      y: 0
    }));
  }
  function clearChildren(el) {
    if (el) {
      el.innerHTML = "";
    }
  }

  // src/components/welcome-screen.tsx
  init_preact_module();
  function WelcomeScreen() {
    const updateProp = F(PropContext);
    return /* @__PURE__ */ a("div", {
      class: "welcome-screen"
    }, /* @__PURE__ */ a("h1", null, "Welcome to firaga.io!"), /* @__PURE__ */ a("p", null, /* @__PURE__ */ a("b", null, "firaga"), " is an online tool to help you plan and create pixel art crafts using materials like Perler beads, cross-stitching, LEGO, or just regular old paint."), /* @__PURE__ */ a("p", null, /* @__PURE__ */ a("b", null, "firaga"), " comes preconfigured with color palettes corresponding to many popular crafting products, and uses an ", /* @__PURE__ */ a("b", null, "advanced color-matching"), " formula to produce the most accurate results."), /* @__PURE__ */ a("p", null, /* @__PURE__ */ a("b", null, "firaga"), " also makes high-quality, actual-size ", /* @__PURE__ */ a("b", null, "printable plans"), " for both color and black-and-white printers. Placing one of these plans under a transparent pegboard makes for quick and easy crafting."), /* @__PURE__ */ a("p", null, "For more info, read ", /* @__PURE__ */ a("a", {
      href: "https://firaga.io/help"
    }, "the documentation"), ", or talk to us on ", /* @__PURE__ */ a("a", {
      href: "https://twitter.com/firaga_io"
    }, "Twitter"), " or ", /* @__PURE__ */ a("a", {
      href: "https://github.com/SeaRyanC/firaga-io"
    }, "GitHub"), ". Happy making!"), /* @__PURE__ */ a("button", {
      class: "cancel",
      onClick: () => updateProp("ui", "isWelcomeOpen", false)
    }, "Let's go!"));
  }

  // src/app.tsx
  var memoized = {
    adjustImage: memoize(adjustImage),
    palettizeImage: memoize(palettizeImage),
    createPartListImage: memoize(createPartListImage),
    imageDataToRgbaArray: memoize(imageDataToRgbaArray)
  };
  function createApp(initProps, galleryStorage2, renderTarget) {
    let _props = initProps;
    selectImage(_props.source.displayName, _props.source.uri);
    function updateProp(parent, name, value, skipRender = false) {
      _props = {..._props, [parent]: {..._props[parent], [name]: value}};
      if (!skipRender) {
        N(/* @__PURE__ */ a(App, {
          ..._props
        }), renderTarget);
        window.localStorage.setItem("props", JSON.stringify(_props, (name2, val) => name2.startsWith("_") ? void 0 : val));
        setTimeout(() => document.body.className = "", 1e3);
      }
    }
    function toggleProp(parent, name) {
      updateProp(parent, name, !_props[parent][name]);
    }
    function acceptUserImage(displayName, uri) {
      galleryStorage2.add(displayName, uri);
      selectImage(displayName, uri);
    }
    function selectImage(displayName, uri) {
      getImageDataFromName(uri, (data) => {
        updateProp("source", "uri", uri, true);
        updateProp("source", "displayName", displayName, true);
        updateProp("source", "_decoded", data, true);
        updateProp("ui", "isUploadOpen", false);
      });
    }
    function App(props) {
      h2(() => {
        window.addEventListener("paste", function(evt) {
          const e3 = evt;
          for (const item of e3.clipboardData?.items ?? []) {
            if (item.type.indexOf("image") !== -1) {
              const blob = item.getAsFile();
              if (!blob)
                continue;
              const reader = new FileReader();
              reader.onload = (img) => {
                const uri = img.target.result;
                acceptUserImage(blob.name, uri);
              };
              reader.readAsDataURL(blob);
            }
          }
        });
        window.addEventListener("keydown", (evt) => {
          if (evt.ctrlKey) {
            switch (evt.key) {
              case "o":
                toggleProp("ui", "isUploadOpen");
                break;
              case "p":
                toggleProp("ui", "isPrintOpen");
                break;
              case "l":
                toggleProp("ui", "showLegend");
                break;
              case "e":
                toggleProp("ui", "showSettings");
                break;
              default:
                return;
            }
            evt.preventDefault();
          } else {
            switch (evt.key) {
              case "Escape":
                updateProp("ui", "isPrintOpen", false);
                updateProp("ui", "isUploadOpen", false);
                break;
            }
          }
        });
      }, []);
      const none = {};
      const imageData = props.source._decoded;
      const adjustedImageData = imageData && memoized.adjustImage(imageData, props.image);
      const processedRgbaArray = adjustedImageData && memoized.imageDataToRgbaArray(adjustedImageData);
      const {quantized} = processedRgbaArray ? memoized.palettizeImage(processedRgbaArray, props.material, props.image) : none;
      const image = quantized ? memoized.createPartListImage(quantized) : void 0;
      const pitch = getPitch(props.material.size);
      return /* @__PURE__ */ a("div", {
        class: "app-top"
      }, /* @__PURE__ */ a(PropContext.Provider, {
        value: updateProp
      }, props.ui.isWelcomeOpen && /* @__PURE__ */ a(WelcomeScreen, null), /* @__PURE__ */ a("div", {
        class: "toolbar"
      }, /* @__PURE__ */ a("button", {
        title: "Open...",
        class: `toolbar-button ${props.ui.isUploadOpen ? "on" : "off"} text`,
        onClick: () => toggleProp("ui", "isUploadOpen")
      }, "\u{1F4C2}", /* @__PURE__ */ a("span", {
        class: "extended-label"
      }, "Open")), /* @__PURE__ */ a("button", {
        title: "Print...",
        class: `toolbar-button ${props.ui.isPrintOpen ? "on" : "off"} text`,
        onClick: () => toggleProp("ui", "isPrintOpen")
      }, "\u{1F5A8}\uFE0F", /* @__PURE__ */ a("span", {
        class: "extended-label"
      }, "Print")), /* @__PURE__ */ a("span", {
        class: "toolbar-divider"
      }), /* @__PURE__ */ a("button", {
        title: "Settings",
        class: `toolbar-button ${props.ui.showSettings ? "on" : "off"} text`,
        onClick: () => toggleProp("ui", "showSettings")
      }, "\u2699\uFE0F", /* @__PURE__ */ a("span", {
        class: "extended-label"
      }, "Settings")), /* @__PURE__ */ a("button", {
        title: "Legend",
        class: `toolbar-button ${props.ui.showLegend ? "on" : "off"} text`,
        onClick: () => toggleProp("ui", "showLegend")
      }, "\u{1F511}", /* @__PURE__ */ a("span", {
        class: "extended-label"
      }, "Legend")), /* @__PURE__ */ a("span", {
        class: "toolbar-divider"
      }), /* @__PURE__ */ a("button", {
        title: "Help",
        class: `toolbar-button ${props.ui.isWelcomeOpen ? "on" : "off"} text`,
        onClick: () => toggleProp("ui", "isWelcomeOpen")
      }, "\u2754", /* @__PURE__ */ a("span", {
        class: "extended-label"
      }, "Help")), /* @__PURE__ */ a("a", {
        class: `toolbar-button off`,
        title: "GitHub",
        href: "https://github.com/SeaRyanC/firaga-io"
      }, "\u{1F468}\u200D\u{1F4BB}", /* @__PURE__ */ a("span", {
        class: "extended-label"
      }, "Code")), /* @__PURE__ */ a("a", {
        class: `toolbar-button off`,
        title: "Twitter",
        href: "https://twitter.com/firaga_io"
      }, "\u{1F4AC}", /* @__PURE__ */ a("span", {
        class: "extended-label"
      }, "Twitter"))), /* @__PURE__ */ a("div", {
        class: "app-main"
      }, props.ui.showSettings && /* @__PURE__ */ a("div", {
        class: "settings"
      }, /* @__PURE__ */ a("div", {
        class: "settings-header"
      }, "Settings", /* @__PURE__ */ a("div", {
        class: "close-button",
        onClick: () => updateProp("ui", "showSettings", false)
      }, "\u2716")), /* @__PURE__ */ a("div", {
        class: "settings-list"
      }, /* @__PURE__ */ a(MaterialSettingsRow, {
        ...props.material
      }), /* @__PURE__ */ a(ImageSettingsRow, {
        ...props.image
      }), /* @__PURE__ */ a(DisplaySettingsRow, {
        ...props.display
      }))), image ? /* @__PURE__ */ a(PlanSvg, {
        image,
        pitch,
        displaySettings: props.display,
        gridSize: props.material.size
      }) : /* @__PURE__ */ a("div", null, "Loading..."), props.ui.showLegend && image && /* @__PURE__ */ a(Legend, {
        partList: image.partList,
        image,
        pitch: getPitch(props.material.size)
      })), props.ui.isUploadOpen && /* @__PURE__ */ a(GalleryContainer, {
        gallery: galleryStorage2.current,
        load: (name, uri) => {
          selectImage(name, uri);
        },
        requestDelete: (uri) => {
          galleryStorage2.remove(uri);
          N(/* @__PURE__ */ a(App, {
            ..._props
          }), renderTarget);
        }
      }), props.ui.isPrintOpen && image && /* @__PURE__ */ a(PrintDialog, {
        image,
        settings: props.print,
        gridSize: props.material.size,
        filename: props.source.displayName
      })), /* @__PURE__ */ a("datalist", {
        id: "image-ticks"
      }, /* @__PURE__ */ a("option", {
        value: "0",
        label: "0"
      })));
    }
    function ImageSettingsRow(props) {
      return /* @__PURE__ */ a("div", {
        class: "settings-row"
      }, /* @__PURE__ */ a("h1", null, "Image"), /* @__PURE__ */ a("div", {
        class: "options-row"
      }, /* @__PURE__ */ a("div", {
        class: "options-group"
      }, /* @__PURE__ */ a("span", {
        class: "header"
      }, "Transparency"), getRadioGroup(props, "image", "transparency", ImageSettings.transparency), getCheckbox(props, "image", "keepOutline", "Keep Outline")), navigator.vendor !== "Apple Computer, Inc." && /* @__PURE__ */ a("div", {
        class: "options-group"
      }, /* @__PURE__ */ a("span", {
        class: "header"
      }, "Color Adjust"), getSlider(props, "image", "brightness", "Brightness"), getSlider(props, "image", "contrast", "Contrast"), getSlider(props, "image", "saturation", "Saturation")), /* @__PURE__ */ a("div", {
        class: "options-group"
      }, /* @__PURE__ */ a("span", {
        class: "header"
      }, "Dithering"), getRadioGroup(props, "image", "dithering", ImageSettings.dithering)), /* @__PURE__ */ a("div", {
        class: "options-group"
      }, /* @__PURE__ */ a("span", {
        class: "header"
      }, "Transforms"), getCheckbox(props, "image", "flip", "Flip"), getCheckbox(props, "image", "mirror", "Mirror"), getCheckbox(props, "image", "descale", "Undo Upscaling"))));
    }
    function MaterialSettingsRow(props) {
      return /* @__PURE__ */ a("div", {
        class: "settings-row"
      }, /* @__PURE__ */ a("h1", null, "Material"), /* @__PURE__ */ a("div", {
        class: "options-row"
      }, /* @__PURE__ */ a("div", {
        class: "options-group"
      }, /* @__PURE__ */ a("span", {
        class: "header"
      }, "Color Matching"), getRadioGroup(props, "material", "colorMatch", MaterialSettings.colorMatch), getCheckbox(props, "material", "nodupes", "No Duplicates"), getCheckbox(props, "material", "matchBlackAndWhite", "Improve Black/White")), /* @__PURE__ */ a("div", {
        class: "options-group"
      }, /* @__PURE__ */ a("span", {
        class: "header"
      }, "Palette"), getRadioGroup(props, "material", "palette", MaterialSettings.palette)), /* @__PURE__ */ a("div", {
        class: "options-group"
      }, /* @__PURE__ */ a("span", {
        class: "header"
      }, "Size"), getRadioGroup(props, "material", "size", MaterialSettings.size))));
    }
    function Legend({partList, image, pitch}) {
      return /* @__PURE__ */ a("div", {
        class: "part-list-container"
      }, /* @__PURE__ */ a("table", {
        class: "part-list"
      }, /* @__PURE__ */ a("thead", null, /* @__PURE__ */ a("tr", null, /* @__PURE__ */ a("th", {
        colSpan: 5,
        class: "top-header"
      }, "Legend"))), /* @__PURE__ */ a("tbody", null, partList.map((ent) => {
        return /* @__PURE__ */ a("tr", {
          key: ent.symbol + ent.count + ent.target.name
        }, /* @__PURE__ */ a("td", {
          class: "legend-symbol"
        }, ent.symbol), /* @__PURE__ */ a("td", {
          class: "part-count"
        }, ent.count.toLocaleString()), ent.target.code && /* @__PURE__ */ a("td", {
          class: "color-code"
        }, ent.target.code), /* @__PURE__ */ a("td", {
          class: "color-swatch",
          style: {color: colorEntryToHex(ent.target)}
        }, "\u2B24"), /* @__PURE__ */ a("td", {
          class: "color-name"
        }, /* @__PURE__ */ a("span", {
          class: "colorName"
        }, ent.target.name)));
      }))), /* @__PURE__ */ a(Stats, {
        image,
        pitch
      }));
    }
    function Stats({image, pitch}) {
      const pixelCount = getImageStats(image).pixels;
      return /* @__PURE__ */ a("table", {
        class: "plan-stats"
      }, /* @__PURE__ */ a("thead", null, /* @__PURE__ */ a("tr", null, /* @__PURE__ */ a("th", {
        colSpan: 4,
        class: "top-header"
      }, "Statistics"))), /* @__PURE__ */ a("tbody", null, /* @__PURE__ */ a("tr", null, /* @__PURE__ */ a("td", {
        class: "stat-label",
        rowSpan: 3
      }, "Size"), /* @__PURE__ */ a("td", {
        class: "stat-value"
      }, image.width.toLocaleString(), "\xD7", image.height.toLocaleString(), "px")), /* @__PURE__ */ a("tr", null, /* @__PURE__ */ a("td", {
        class: "stat-value"
      }, feetInches(image.width * pitch), "\xD7", feetInches(image.height * pitch))), /* @__PURE__ */ a("tr", null, /* @__PURE__ */ a("td", {
        class: "stat-value"
      }, fmt(image.width * pitch / 10), "\xD7", fmt(image.height * pitch / 10), "cm")), /* @__PURE__ */ a("tr", null, /* @__PURE__ */ a("td", {
        class: "stat-label"
      }, "Pixels"), /* @__PURE__ */ a("td", {
        colSpan: 4,
        class: "stat-value"
      }, pixelCount.toLocaleString())), /* @__PURE__ */ a("tr", null, /* @__PURE__ */ a("td", {
        class: "stat-label"
      }, "Cost (USD)"), /* @__PURE__ */ a("td", {
        colSpan: 4,
        class: "stat-value"
      }, dollars(pixelCount * 2e-3))), /* @__PURE__ */ a("tr", null, /* @__PURE__ */ a("td", {
        class: "stat-label"
      }, "Time"), /* @__PURE__ */ a("td", {
        colSpan: 4,
        class: "stat-value"
      }, timeAmount(pixelCount * 4)))));
      function fmt(n2) {
        return n2.toFixed(1);
      }
    }
    function DisplaySettingsRow(props) {
      return /* @__PURE__ */ a("div", {
        class: "settings-row"
      }, /* @__PURE__ */ a("h1", null, "Plan"), /* @__PURE__ */ a("div", {
        class: "options-row"
      }, /* @__PURE__ */ a("div", {
        class: "options-group"
      }, /* @__PURE__ */ a("span", {
        class: "header"
      }, "Legend"), getRadioGroup(props, "display", "planStyle", DisplaySettings.planStyle)), /* @__PURE__ */ a("div", {
        class: "options-group"
      }, /* @__PURE__ */ a("span", {
        class: "header"
      }, "Grid"), getRadioGroup(props, "display", "grid", DisplaySettings.grid), getCheckbox(props, "display", "nudgeGrid", "Nudge Grid")), /* @__PURE__ */ a("div", {
        class: "options-group"
      }, /* @__PURE__ */ a("span", {
        class: "header"
      }, "Background"), getRadioGroup(props, "display", "background", DisplaySettings.background)), /* @__PURE__ */ a("div", {
        class: "options-group"
      }, /* @__PURE__ */ a("span", {
        class: "header"
      }, "Comparison"), getRadioGroup(props, "display", "refobj", DisplaySettings.refobj))));
    }
    function GalleryContainer(props) {
      const fileInputRef = s2();
      const dropBoxRef = s2();
      y2(() => {
        const db = dropBoxRef.current;
        db.addEventListener("dragenter", (e3) => (e3.stopPropagation(), e3.preventDefault()), false);
        db.addEventListener("dragover", (e3) => (e3.stopPropagation(), e3.preventDefault()), false);
        db.addEventListener("drop", function(e3) {
          e3.stopPropagation();
          e3.preventDefault();
          const files = e3.dataTransfer?.files;
          if (!files)
            return;
          for (let i3 = 0; i3 < files.length; i3++) {
            const file = files[i3];
            if (!file.type.startsWith("image/"))
              continue;
            const reader = new FileReader();
            reader.onload = (img) => {
              const name = file.name;
              const uri = img.target.result;
              acceptUserImage(name, uri);
            };
            reader.readAsDataURL(file);
          }
        }, false);
      }, []);
      return /* @__PURE__ */ a("div", {
        class: "gallery"
      }, /* @__PURE__ */ a("div", {
        class: "close-button",
        onClick: () => updateProp("ui", "isUploadOpen", false)
      }, "\u2716"), /* @__PURE__ */ a("h2", null, "Pick Image"), /* @__PURE__ */ a("div", {
        ref: dropBoxRef,
        class: "dropbox"
      }, /* @__PURE__ */ a("label", {
        for: "upload-image-button",
        style: "display: inline",
        class: "download-button-label"
      }, "Upload"), /* @__PURE__ */ a("input", {
        id: "upload-image-button",
        style: "display: none;",
        type: "file",
        accept: "image/png, image/jpeg",
        ref: fileInputRef,
        onChange: fileInputChanged,
        value: "Choose..."
      }), ", Paste, or Drag & Drop here"), /* @__PURE__ */ a("h2", null, "Gallery"), /* @__PURE__ */ a("div", {
        class: "gallery-list-container"
      }, /* @__PURE__ */ a(Gallery, {
        ...props
      })));
      function fileInputChanged() {
        if (!fileInputRef.current)
          return;
        if (!fileInputRef.current.files)
          return;
        const files = fileInputRef.current.files;
        for (let i3 = 0; i3 < files.length; i3++) {
          const file = files[i3];
          const reader = new FileReader();
          reader.onload = (img) => {
            acceptUserImage(file.name, img.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    }
    function getCheckbox(props, subKey, valueKey, label) {
      return /* @__PURE__ */ a("label", null, /* @__PURE__ */ a("input", {
        type: "checkbox",
        checked: props[valueKey],
        onChange: (arg) => {
          updateProp(subKey, valueKey, !props[valueKey]);
        }
      }), label);
    }
    function getSlider(props, parentKey, key, label) {
      return /* @__PURE__ */ a("div", {
        class: "slider-caption"
      }, /* @__PURE__ */ a("input", {
        type: "range",
        list: "image-ticks",
        class: "slider",
        onChange: changed,
        min: "-10",
        max: "10",
        step: "1",
        value: props[key]
      }), /* @__PURE__ */ a("span", null, label));
      function changed(e3) {
        updateProp(parentKey, key, e3.target.value);
      }
    }
    function getRadioGroup(props, parentProp, key, settings) {
      return radioGroup(key, (k3, v3) => updateProp(parentProp, k3, v3), props[key], settings);
    }
  }
  function radioGroup(name, changed, defaultValue, values) {
    return /* @__PURE__ */ a(y, null, values.map(([value, caption]) => {
      return /* @__PURE__ */ a("label", {
        key: value
      }, /* @__PURE__ */ a("input", {
        type: "radio",
        onChange: fireChanged,
        name,
        value,
        checked: value === defaultValue
      }), caption);
      function fireChanged() {
        changed(name, value);
      }
    }));
  }
  function getImageDataFromName(name, callback) {
    const img = new Image();
    img.addEventListener("load", () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d")?.drawImage(img, 0, 0);
      callback(getImageData(img));
    });
    img.src = name;
  }
  function memoize(func) {
    const calls = [];
    return function(...args) {
      for (let i3 = 0; i3 < calls.length; i3++) {
        if (calls[i3][0].length === args.length) {
          let match = true;
          for (let j3 = 0; j3 < args.length; j3++) {
            if (calls[i3][0][j3] !== args[j3]) {
              match = false;
              break;
            }
          }
          if (match) {
            return calls[i3][1];
          }
        }
      }
      const r3 = func.apply(void 0, args);
      calls.push([args, r3]);
      if (calls.length > 20) {
        calls.splice(0, 20);
      }
      return r3;
    };
  }

  // src/user-gallery.ts
  var defaultGallery = [
    ["Eevee", "eevee"],
    ["Mario 3", "mario-3"],
    ["Megaman X", "megaman_x"],
    ["Earthbound", "earthbound"],
    ["Kirby", "kirby"],
    ["Mushrom", "mushroom"],
    ["Crono", "crono"],
    ["Ghost", "ghost-smw"],
    ["Mew", "mew"],
    ["Caped Mario", "mario-cape"],
    ["Link (NES)", "link-nes"],
    ["Pac-man Ghost", "ghost"],
    ["Link (SNES)", "link"],
    ["Mario (NES)", "mario-1"],
    ["Gannon", "gannon"],
    ["Ken", "ken"],
    ["Shyguy", "shyguy"],
    ["Squirtle", "squirtle"],
    ["Brachiosaur", "brachiosaur"],
    ["Sonic", "sonic"],
    ["Piranha Plant", "smw-plant"]
  ];
  var keyname = "user-gallery";
  function createGallery() {
    let current = defaultGallery.map(([name, uri]) => [name, `./gallery/${uri}.png`]);
    const s3 = window.localStorage.getItem(keyname);
    if (s3 !== null) {
      current = JSON.parse(s3);
    }
    function add(name, uri) {
      for (let i3 = 0; i3 < current.length; i3++) {
        if (current[i3][1] === uri) {
          return;
        }
      }
      current = [[name, uri], ...current];
      window.setTimeout(save, 250);
    }
    function remove(uri) {
      for (let i3 = 0; i3 < current.length; i3++) {
        if (current[i3][1] === uri) {
          current.splice(i3, 1);
          current = [...current];
        }
      }
    }
    function save() {
      window.localStorage.setItem(keyname, JSON.stringify(current));
    }
    return {
      add,
      remove,
      get current() {
        return current;
      }
    };
  }

  // src/firaga.tsx
  var galleryStorage = createGallery();
  var DefaultAppProps = {
    display: {
      background: "url(#checkPattern)",
      grid: "auto",
      nudgeGrid: true,
      planStyle: "none",
      refobj: "none"
    },
    image: {
      brightness: 0,
      contrast: 0,
      saturation: 0,
      flip: false,
      mirror: false,
      descale: true,
      dithering: "auto",
      transparency: "auto",
      keepOutline: false
    },
    material: {
      colorMatch: "ictcp",
      nodupes: false,
      palette: "perler-multimix",
      size: "perler",
      matchBlackAndWhite: true
    },
    print: {
      paperSize: "letter",
      format: "step-by-step",
      imageSize: "actual",
      breakStrategy: "page"
    },
    source: {
      displayName: galleryStorage.current[0][0],
      uri: galleryStorage.current[0][1],
      _decoded: void 0
    },
    ui: {
      isUploadOpen: false,
      isPrintOpen: false,
      isWelcomeOpen: true,
      showLegend: false,
      showSettings: false,
      tourStage: void 0,
      helpTopic: void 0
    }
  };
  window.addEventListener("DOMContentLoaded", function() {
    const s3 = window.localStorage.getItem("props");
    let props;
    if (s3 === null) {
      props = DefaultAppProps;
    } else {
      props = JSON.parse(s3);
    }
    try {
      createApp(props, galleryStorage, document.body);
    } catch (e3) {
      window.localStorage.clear();
      console.error(e3);
      props = DefaultAppProps;
      createApp(props, galleryStorage, document.body);
    }
  });
})();
/**
 * @author Markus Ekholm
 * @copyright 2012-2016 (c) Markus Ekholm <markus at botten dot org >
 * @license Copyright (c) 2012-2016, Markus Ekholm
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Neither the name of the author nor the
 *      names of its contributors may be used to endorse or promote products
 *      derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL MARKUS EKHOLM BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
