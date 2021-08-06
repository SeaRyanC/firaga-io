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
  function m(n2, l3, u3, i3, t3, o3, e3, c3, s4, a3) {
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
        I(n2, k3, _2 = _2 || r, t3, o3, e3, c3, s4, a3), b3 = k3.__e, (p3 = k3.ref) && _2.ref != p3 && (w3 || (w3 = []), _2.ref && w3.push(_2.ref, null, k3), w3.push(p3, k3.__c || b3, k3)), b3 != null ? (m3 == null && (m3 = b3), typeof k3.type == "function" && k3.__k != null && k3.__k === _2.__k ? k3.__d = s4 = g(k3, s4, n2) : s4 = x(n2, k3, _2, A2, b3, s4), a3 || u3.type !== "option" ? typeof u3.type == "function" && (u3.__d = s4) : n2.value = "") : s4 && _2.__e == s4 && s4.parentNode != n2 && (s4 = d(_2));
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
  function I(l3, u3, i3, t3, o3, r3, f3, e3, s4) {
    var a3, v3, h3, d3, _2, k3, b3, g3, w3, x3, A2, P2 = u3.type;
    if (u3.constructor !== void 0)
      return null;
    i3.__h != null && (s4 = i3.__h, e3 = u3.__e = i3.__e, u3.__h = null, r3 = [e3]), (a3 = n.__b) && a3(u3);
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
          v3.context = x3, v3.props = g3, v3.state = v3.__s, (a3 = n.__r) && a3(u3), v3.__d = false, v3.__v = u3, v3.__P = l3, a3 = v3.render(v3.props, v3.state, v3.context), v3.state = v3.__s, v3.getChildContext != null && (t3 = c(c({}, t3), v3.getChildContext())), h3 || v3.getSnapshotBeforeUpdate == null || (k3 = v3.getSnapshotBeforeUpdate(d3, _2)), A2 = a3 != null && a3.type === y && a3.key == null ? a3.props.children : a3, m(l3, Array.isArray(A2) ? A2 : [A2], u3, i3, t3, o3, r3, f3, e3, s4), v3.base = u3.__e, u3.__h = null, v3.__h.length && f3.push(v3), b3 && (v3.__E = v3.__ = null), v3.__e = false;
        } else
          r3 == null && u3.__v === i3.__v ? (u3.__k = i3.__k, u3.__e = i3.__e) : u3.__e = j(i3.__e, u3, i3, t3, o3, r3, f3, s4);
      (a3 = n.diffed) && a3(u3);
    } catch (l4) {
      u3.__v = null, (s4 || r3 != null) && (u3.__e = e3, u3.__h = !!s4, r3[r3.indexOf(e3)] = null), n.__e(l4, u3, i3);
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

  // data/colors.csv
  var require_colors = __commonJS({
    "data/colors.csv"(exports, module) {
      module.exports = "R,G,B,Artkal Midi Soft,Artkal Mini Soft,Artkal Mini,Artkal Midi,Name\r\n255,255,255,R01,A01,C01,S01,White\r\n255,163,139,R02,A44,C44,S02,Burning Sand\r\n246,176,76,R03,A03,C03,S03,Tangerine\r\n255,103,31,R04,A17,C17,S04,Orange\r\n225,6,0,R05,A05,C05,S05,Tall Poppy\r\n236,134,208,R06,A49,C49,S06,Raspberry Pink\r\n155,155,155,R07,A33,C33,S07,Gray\r\n36,222,91,R08,,,S08,Emerald\r\n0,104,94,R09,,,S09,Dark Green\r\n65,182,230,R10,A19,C19,S10,Baby Blue\r\n79,159,179,,A99,C99,S100,Lagoon\r\n49,150,221,,A100,C100,S101,Electric Blue\r\n27,108,182,,A101,C101,S102,Pool Blue\r\n8,57,128,,A102,C102,S103,Caribbean Blue\r\n10,102,139,,A103,C103,S104,Deep Water\r\n8,91,110,,A104,C104,S105,Petrol Blue\r\n0,78,120,,A105,C105,S106,Wegdewood Blue\r\n0,85,116,,A106,C106,S107,Pond Blue\r\n204,190,128,,A107,C107,S108,Seashell Beige\r\n164,147,80,,A108,C108,S109,Beige\r\n0,51,153,R11,A21,C21,S11,Dark Blue\r\n158,136,60,,A109,C109,S110,Beach Beige\r\n118,108,43,,A110,C110,S111,Caffe Latt\xE9\r\n121,95,38,,A111,C111,S112,Oaktree Brown\r\n186,184,162,,A112,C112,S113,Khaki\r\n114,140,84,,A113,C113,S114,Light Greengray\r\n126,124,68,,A114,C114,S115,Mossy Green\r\n100,105,46,,A115,C115,S116,Earth Green\r\n78,88,44,,A116,C116,S117,Sage Green\r\n74,94,45,,A117,C117,S118,Pinetree Green\r\n113,196,182,,A118,C118,S119,Frosty Blue\r\n160,94,181,R12,A26,C26,S12,Pastel Lavender\r\n102,204,153,,A119,C119,S120,Polar Mint\r\n86,154,131,,A120,C120,S121,Celadon Green\r\n20,194,91,,A121,C121,S122,Eucalyptus\r\n24,168,24,,A122,C122,S123,Clover Field\r\n4,85,46,,A123,C123,S124,Pooltable Felt\r\n19,107,90,,A124,C124,S125,Snake Green\r\n5,70,65,,A125,C125,S126,Dark Eucalyptus\r\n217,182,214,,A126,C126,S127,Marsmallow Rose\r\n173,98,164,,A127,C127,S128,Light Grape\r\n230,140,163,,A128,C128,S129,Rosebud Pink\r\n0,0,0,R13,A02,C02,S13,Black\r\n222,84,121,,A129,C129,S130,Fuschia\r\n158,130,186,,A130,C130,S131,Candy Violet\r\n232,65,107,,A131,C131,S132,Flamingo\r\n183,56,143,,A132,C132,S133,Pink Plum\r\n88,31,126,,A133,C133,S134,Amethyst\r\n140,163,212,,A134,C134,S135,Moonlight Blue\r\n154,154,204,,A135,C135,S136,Summer Rain\r\n89,129,193,,A136,C136,S137,Azure Blue\r\n65,102,176,,A137,C137,S138,Cornflower Blue\r\n71,95,171,,A138,C138,S139,Forget Me Not\r\n250,224,83,R14,A42,C42,S14,Sandstorm\r\n55,69,147,,A139,C139,S140,Indigo\r\n61,86,165,,A140,C140,S141,Horizon Blue\r\n41,66,135,,A141,C141,S142,Cobalt\r\n37,38,138,,A142,C142,S143,Royal Blue\r\n26,47,111,,A143,C143,S144,Marine\r\n211,201,93,,A144,C144,S145,Pale Yellow Moss\r\n81,9,24,,A145,C145,S146,Bloodrose Red\r\n100,179,158,,A146,C146,S147,Spearmint\r\n99,67,56,,A147,C147,S148,Mocha\r\n237,211,158,,A148,C148,S149,Creme\r\n122,62,44,R15,A30,C30,S15,Redwood\r\n105,99,171,,A149,C149,S150,Iris Violet\r\n43,63,31,,A150,C150,S151,Forest Green\r\n151,145,197,,A151,C151,S152,Lilac\r\n184,189,224,,A152,C152,S153,Pale Lilac\r\n249,200,152,,A153,C153,S154,Sahara Sand\r\n195,144,105,,A154,C154,S155,Sunkissed Teint\r\n90,90,90,,A155,C155,S156,Steel Grey\r\n60,60,60,,A156,C156,S157,Iron Grey\r\n26,26,26,,A157,C157,S158,Pepper\r\n139,139,139,,A56,C56,S159,Oslo Gray\r\n92,71,56,R16,A32,C32,S16,Brown\r\n123,77,53,R17,A31,C31,S17,Light Brown\r\n204,153,102,R18,A23,C23,S18,Sand\r\n252,191,169,R19,A22,C22,S19,Bubble Gum\r\n36,158,107,R20,A14,C14,S20,Green\r\n135,216,57,R21,A13,C13,S21,Pastel Green\r\n51,0,114,R22,A27,C27,S22,Purple\r\n100,53,155,R23,,,S23,Royal Purple\r\n20,123,209,R24,A37,C37,S24,True Blue\r\n255,52,179,R25,A08,C08,S25,Hot Pink\r\n219,33,82,R26,A09,C09,S26,Magenta\r\n255,209,0,R27,A11,C11,S27,Yellow\r\n234,184,228,R28,,,S28,Lily Pink\r\n246,235,97,R29,A41,C41,S29,Pastel Yellow\r\n153,214,234,R30,A39,C39,S30,Shadow Green\r\n158,229,176,R31,A60,C60,S31,Sea Mist\r\n255,231,128,R32,A24,C24,S32,Beeswax\r\n197,180,227,R33,A50,C50,S33,Maverick\r\n186,12,47,R34,A06,C06,S34,Red\r\n247,206,215,R35,,,S35,Mona Lisa\r\n201,128,158,R36,A36,C36,S36,Old Pink\r\n113,216,191,R37,,,S37,Blue-Green\r\n171,37,86,R38,,,S38,Burgundy\r\n237,139,0,R39,A04,C04,S39,Yellow Orange\r\n241,167,220,R40,A07,C07,S40,Carnation Pink\r\n154,85,22,R41,,,S41,Metallic Gold\r\n125,124,121,R42,A35,C35,S42,Metallic Silver\r\n118,119,119,R43,A34,C34,S43,Dark Gray\r\n170,220,235,R44,A18,C18,S44,Sky Blue\r\n0,178,169,R45,A54,C54,S45,Medium Turquoise\r\n115,211,60,R46,A53,C53,S46,Bright Green\r\n180,126,0,R47,A28,C28,S47,Marigold\r\n255,199,44,R48,A48,C48,S48,Corn\r\n114,25,95,R49,,,S49,Mulberry Wood\r\n250,170,114,R50,,,S50,Mandy's Pink\r\n252,251,205,R51,A51,C51,S51,Spring Sun\r\n242,240,161,R52,A10,C10,S52,Picasso\r\n105,179,231,R53,A38,C38,S53,Turquoise\r\n0,144,218,R54,A20,C20,S54,Light Blue\r\n173,220,145,R57,A12,C12,S55,Pistachio\r\n255,106,19,R59,A16,C16,S56,Bright Carrot\r\n164,73,61,R63,A29,C29,S57,Buccaneer\r\n165,0,52,R64,A43,C43,S58,Paprika\r\n74,31,135,,A52,C52,S59,Butterfly Bush\r\n167,123,202,R66,A25,C25,S60,Lavender\r\n206,220,0,R68,A40,C40,S61,Key Lime Pie\r\n0,124,88,R69,A15,C15,S62,Green Tea\r\n88,87,53,R70,,,S63,Metallic Copper\r\n5,8,73,R55,A58,C58,S64,Black Rock\r\n243,234,93,R58,A46,C46,S65,Canary\r\n244,99,58,R60,,,S66,Blaze Orange\r\n243,207,179,R61,A47,C47,S67,Vanilla\r\n225,192,120,R71,,,S68,Tan\r\n40,40,40,R72,A69,C69,S69,Mine Shaft\r\n155,188,17,R89,A84,C84,S70,Dark Algae\r\n0,133,34,R73,A86,C86,S71,Jade Green\r\n89,213,216,R74,A79,C79,S72,Light Sea Blue\r\n72,169,197,R91,A81,C81,S73,Steel Blue\r\n0,174,214,R75,A82,C82,S74,Azure\r\n0,133,173,R92,A83,C83,S75,Dark Steel Blue\r\n0,174,199,R76,A80,C80,S76,Sea Blue\r\n239,239,239,R77,A87,C87,S77,Ghost While\r\n209,209,209,R78,A88,C88,S78,Ash Grey\r\n187,188,188,R79,A89,C89,S79,Light Gray\r\n153,155,48,R90,A85,C85,S80,Dark Olive\r\n205,178,119,R81,A74,C74,S81,Deer\r\n181,129,80,R82,A75,C75,S82,Clay\r\n184,97,37,R83,A73,C73,S83,Sienna\r\n170,87,97,R84,A77,C77,S84,Deep Chestnut\r\n92,19,27,R85,A78,C78,S85,Red Wine\r\n234,170,0,R86,A71,C71,S86,Goldenrod\r\n255,109,106,R87,A76,C76,S87,Coral Red\r\n218,24,132,,,,S88,Dark Pink\r\n77,77,77,R88,A90,C90,S89,Charcoal Gray\r\n255,197,110,R80,A72,C72,S90,Pastel Orange\r\n24,48,40,R93,A70,C70,S91,Brunswick Green\r\n222,185,71,,A91,C91,S92,Dandelion\r\n218,182,152,,A92,C92,S93,Pale Skin\r\n244,169,153,,A93,C93,S94,Warm Blush\r\n238,125,103,,A94,C94,S95,Salmon\r\n240,134,97,,A95,C95,S96,Apricot\r\n212,114,42,,A96,C96,S97,Papaya\r\n100,172,223,,A97,C97,S98,Himalaya Blue\r\n100,194,220,,A98,C98,S99,Waterfall\r\n93,219,93,R56,A45,C45,,Spring Green\r\n108,194,74,,A55,C55,,Confier\r\n188,4,35,R65,A57,C57,,Fresh Red\r\n83,26,35,R62,A59,C59,,Scarlett\r\n241,235,156,,A61,C61,,Feta\r\n252,63,63,,A62,C62,,Carnation\r\n234,190,219,,A63,C63,,Pink Pearl\r\n165,0,80,,A64,C64,,Rose\r\n239,129,46,,A65,C65,,Mango Tango\r\n252,108,133,,A66,C66,,Wild Watermelon\r\n177,78,181,,A67,C67,,Orchid\r\n105,194,238,,A68,C68,,Toothpaste Blue\r\n255,197,110,R67,,,,Yolk Yellow";
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
        var s4 = "R" + c3.R + "B" + c3.B + "G" + c3.G;
        if ("A" in c3) {
          s4 = s4 + "A" + c3.A;
        }
        return s4;
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
      module.exports = "line.gridmajor {\r\n    stroke-width: 2px;\r\n    stroke: rgba(0, 0, 0, 0.5);\r\n}\r\n\r\nline.gridminor {\r\n    stroke-width: 1px;\r\n    stroke: rgba(0, 0, 0, 0.2);\r\n}\r\n\r\ntext {\r\n    font-family: 'Courier New', Courier, monospace;\r\n    font-weight: bold;\r\n    font-size: 31px;\r\n    fill: black;\r\n    pointer-events: none;\r\n}\r\n\r\nuse.dark text,\r\ntext.dark {\r\n    fill: white;\r\n}\r\n\r\nuse.light text,\r\ntext.light {\r\n    fill: black;\r\n}\r\n";
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
      rows: lines.slice(1).map((s4) => s4.split(/,/g))
    };
    for (const r3 of result.rows) {
      if (r3.length !== result.headers.length) {
        throw new Error(`Malformed line: ${JSON.stringify(r3)} length doesn't match header size (${result.headers.length})`);
      }
    }
    return result;
  }

  // src/color-data.ts
  function loadColorData() {
    const colorDataRaw = parseCsv(require_colors());
    const rows = assertCsv(colorDataRaw, ["R", "G", "B", "Artkal Midi Soft", "Artkal Mini Soft", "Artkal Mini", "Artkal Midi", "Name"]);
    const colorData2 = [];
    for (const r3 of rows) {
      for (let i3 = 3; i3 < r3.length - 1; i3++) {
        if (r3[i3].length) {
          colorData2.push({
            name: r3[r3.length - 1],
            code: r3[i3],
            r: +r3[0],
            R: +r3[0],
            g: +r3[1],
            G: +r3[1],
            b: +r3[2],
            B: +r3[2]
          });
        }
      }
    }
    return colorData2;
  }
  function assertCsv(c3, headers) {
    if (JSON.stringify(headers) !== JSON.stringify(c3.headers))
      throw new Error("Headers don't match");
    return c3.rows;
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
    "lego": {
      size: [32, 32],
      pitch: 8
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
      const n2 = Date.now();
      console.log(`PERF: '${event}' finished in ${n2 - last}ms`);
      last = n2;
    }
  }
  function carve(width, height, xSize, ySize) {
    const res = [];
    const xa = carveAxis(width, xSize);
    const ya = carveAxis(height, ySize);
    let cy = 0;
    for (const y3 of ya) {
      let cx = 0;
      for (const x3 of xa) {
        res.push({
          x: cx,
          y: cy,
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

  // src/palettizer.ts
  var diff2 = require_lib();
  function palettize(rgbaArray, palette) {
    const pixels = [];
    for (let y3 = 0; y3 < rgbaArray.height; y3++) {
      const row = [];
      for (let x3 = 0; x3 < rgbaArray.width; x3++) {
        if (rgbaArray.pixels[y3][x3] === -1) {
          row.push(void 0);
        } else {
          const paletteEntry = palette.filter((p3) => p3.color === rgbaArray.pixels[y3][x3])[0];
          row.push(paletteEntry.target);
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
  function makePalette(rgbaArray, allowedColors, settings) {
    const tempAssignments = [];
    const inputColors = [];
    for (let y3 = 0; y3 < rgbaArray.height; y3++) {
      for (let x3 = 0; x3 < rgbaArray.width; x3++) {
        const color = rgbaArray.pixels[y3][x3];
        if (color === -1)
          continue;
        const extant = inputColors.filter((r3) => r3.color === color)[0];
        if (extant) {
          extant.count++;
        } else {
          inputColors.push({
            color,
            count: 1,
            r: color & 255,
            g: color >> 8 & 255,
            b: color >> 16 & 255
          });
        }
      }
    }
    inputColors.sort((a3, b3) => b3.count - a3.count);
    const diff3 = colorDiff[settings.colorMatch];
    for (const r3 of inputColors) {
      if (allowedColors === void 0) {
        let R = r3.color & 255, G = r3.color >> 8 & 255, B = r3.color >> 16 & 255;
        tempAssignments.push({
          color: r3.color,
          target: {
            R,
            G,
            B,
            r: R,
            g: G,
            b: B,
            name: colorEntryToHex({r: R, g: G, b: B}),
            code: ""
          },
          count: r3.count
        });
      } else {
        let bestTarget = void 0;
        let bestScore = Infinity;
        for (const c3 of allowedColors) {
          if (settings.nodupes) {
            if (tempAssignments.some((t3) => t3.target === c3))
              continue;
          }
          const score = diff3(r3, c3);
          if (score < bestScore) {
            bestTarget = c3;
            bestScore = score;
          }
        }
        if (bestTarget === void 0)
          throw new Error("impossible");
        tempAssignments.push({
          color: r3.color,
          target: bestTarget,
          count: r3.count
        });
      }
    }
    return tempAssignments;
  }
  var colorDiff = {
    rgb: (lhs, rhs) => {
      return Math.pow(lhs.r - rhs.r, 2) * 3 + Math.pow(lhs.g - rhs.g, 2) * 4 + Math.pow(lhs.b - rhs.b, 2) * 2;
    },
    "ciede2000": (lhs, rhs) => {
      return diff2.diff(diff2.rgb_to_lab({R: lhs.r, G: lhs.g, B: lhs.b}), diff2.rgb_to_lab({R: rhs.r, G: rhs.g, B: rhs.b}));
    }
  };

  // src/image-utils.tsx
  var colorData = loadColorData();
  var artkalStarterCodes = "CT1,C01,C88,C33,C34,C02,C51,C47,C23,C31,C32,C78,C22,C44,C07,C09,C05,C57,C50,C25,C26,C52,C27,C64,C10,C42,C48,C03,C04,C17,C12,C13,C14,C86,C15,C70,C39,C60,C79,C54,C81,C82,C68,C19,C38,C20,C37,C21".split(",");
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
    console.log(dstContext.filter);
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
            const newData = new ImageData(Math.floor(width / scaleChk), Math.floor(height / scaleChk));
            let c3 = 0;
            for (let y3 = yOffset; y3 < height; y3 += scaleChk) {
              for (let x3 = xOffset; x3 < width; x3 += scaleChk) {
                const c0 = (y3 * width + x3) * 4;
                newData.data[c3] = data[c0];
                newData.data[c3 + 1] = data[c0 + 1];
                newData.data[c3 + 2] = data[c0 + 2];
                newData.data[c3 + 3] = data[c0 + 3];
                c3 += 4;
              }
            }
            mark(`Descale with match ${scaleChk} ${xOffset} ${yOffset}`);
            return newData;
          }
        }
      }
    }
    mark("Descale with no match");
    return imageData;
    function areSame(x0, y0, x1, y1) {
      const c0 = (y0 * imageData.width + x0) * 4;
      const c1 = (y1 * imageData.width + x1) * 4;
      return data[c0] === data[c1] && data[c0 + 1] === data[c1 + 1] && data[c0 + 2] === data[c1 + 2] && data[c0 + 3] === data[c1 + 3];
    }
  }
  function applyTransparencyAndCrop(imageData, transparentValue) {
    imageData = descale(imageData);
    let minY = Infinity, maxY = -Infinity;
    let minX = Infinity, maxX = -Infinity;
    for (let y3 = 0; y3 < imageData.height; y3++) {
      for (let x3 = 0; x3 < imageData.width; x3++) {
        if (!isTransparent(colorAt(imageData, x3, y3))) {
          minX = Math.min(minX, x3);
          maxX = Math.max(maxX, x3);
          minY = Math.min(minY, y3);
          maxY = Math.max(maxY, y3);
        }
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
        if (!isTransparent(color)) {
          newImage.data[c3 + 0] = color >> 0 & 255;
          newImage.data[c3 + 1] = color >> 8 & 255;
          newImage.data[c3 + 2] = color >> 16 & 255;
          newImage.data[c3 + 3] = 255;
        }
      }
    }
    return newImage;
    function isTransparent(n2) {
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
    const croppedImageData = applyTransparencyAndCrop(imageData, transparency);
    mark("Apply transparency & crop");
    const adjustedImageData = applyImageAdjustments(croppedImageData, imageSettings.brightness * 10 + 100, imageSettings.contrast * 10 + 100, imageSettings.saturation * 10 + 100, imageSettings.flip, imageSettings.mirror);
    mark("Adjust image");
    return adjustedImageData;
  }
  function palettizeImage(rgbaArray, materialSettings) {
    const {mark} = timer();
    let allowedColors;
    switch (materialSettings.palette) {
      case "artkal-all-mini":
        allowedColors = colorData.filter((c3) => c3.code.startsWith("C"));
        break;
      case "artkal-mini-starter":
        allowedColors = colorData.filter((c3) => artkalStarterCodes.includes(c3.code));
        break;
      case "all":
        allowedColors = void 0;
        break;
      default:
        allowedColors = colorData;
        break;
    }
    const palette = makePalette(rgbaArray, allowedColors, materialSettings);
    mark("Create palette");
    const quantized = palettize(rgbaArray, palette);
    mark("Apply palette");
    return {
      palette,
      rgbaArray,
      quantized
    };
  }
  function createPartListImage(palette, quantized) {
    const partList = getPartList(palette);
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
  function getPartList(palette) {
    const res = [];
    for (const ent of palette) {
      const extant = res.filter((e3) => e3.target === ent.target)[0];
      if (extant) {
        extant.count += ent.count;
      } else {
        res.push({count: ent.count, target: ent.target, symbol: "#"});
      }
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

  // src/types.tsx
  init_preact_module();
  var MaterialSettings = {
    palette: [
      ["artkal-mini-starter", /* @__PURE__ */ a("span", null, "Artkal Mini Starter Set ", /* @__PURE__ */ a("a", {
        href: "https://amzn.to/3wThLo8",
        target: "_blank",
        title: "Buy"
      }, "\u{1F6D2}"))],
      ["artkal-all-mini", "All Artkal Mini"],
      ["all", "All Colors"]
    ],
    size: [
      ["artkal-mini", /* @__PURE__ */ a("span", null, "Artkal Mini ", /* @__PURE__ */ a("a", {
        href: "https://amzn.to/3eNjvcm",
        target: "_blank",
        title: "Buy"
      }, "\u{1F6D2}"))],
      ["perler-mini", /* @__PURE__ */ a("span", null, "Perler Mini", /* @__PURE__ */ a("a", {
        href: "https://amzn.to/2WcXJIH",
        target: "_blank",
        title: "Buy"
      }, "\u{1F6D2}"))],
      ["perler", /* @__PURE__ */ a("span", null, "Perler ", /* @__PURE__ */ a("a", {
        href: "https://amzn.to/36U2tov",
        target: "_blank",
        title: "Buy"
      }, "\u{1F6D2}"))],
      ["lego", "LEGO \u2122"]
    ],
    colorMatch: [
      ["ciede2000", "CIEDE2000"],
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
      ["56", "56"],
      ["50", "50"],
      ["29", "29"],
      ["28", "28"],
      ["10", "10"],
      ["none", "None"]
    ],
    background: [
      ["#777", "Grey"],
      ["#000", "Black"],
      ["#FFF", "White"],
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

  // src/user-gallery.ts
  var defaultGallery = [
    ["Squirtle", "squirtle"],
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
    ["Eevee", "eevee"],
    ["Mario (NES)", "mario-1"],
    ["Gannon", "gannon"],
    ["Ken", "ken"],
    ["Shyguy", "shyguy"],
    ["Brachiosaur", "brachiosaur"],
    ["Sonic", "sonic"],
    ["Piranha Plant", "smw-plant"]
  ];
  var s3 = defaultGallery.map((s4) => `./gallery/${s4}.png`).reverse();
  var keyname = "user-gallery";
  function createGallery() {
    let current = defaultGallery.map(([name, uri]) => [name, `./gallery/${uri}.png`]);
    const s4 = window.localStorage.getItem(keyname);
    if (s4 !== null) {
      current = JSON.parse(s4);
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
    const sliceWidth = Math.max.apply(Math.max, slices.map((s4) => s4.width));
    const sliceHeight = Math.max.apply(Math.max, slices.map((s4) => s4.height));
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
          doc.fill([color.R, color.G, color.B]);
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
            doc.text(image.partList[px].symbol, (cx + 0.5) * pitchPts, (cy + 0.5) * pitchPts, {align: "center", baseline: "middle", height: pitchPts, width: pitchPts});
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
    const text = `${image.partList[partIndex].target.code} (${image.partList[partIndex].target.name})`;
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
        const s4 = x3 + "-" + y3;
        if (alreadyPlotted.has(s4))
          return;
        alreadyPlotted.set(s4, true);
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
    }, /* @__PURE__ */ a("h1", {
      class: "dialog-title"
    }, "Print"), /* @__PURE__ */ a(FormatGroup, {
      ...props
    }), /* @__PURE__ */ a(PaperSizeGroup, {
      ...props
    }), /* @__PURE__ */ a(ImageSizeGroup, {
      ...props
    }), /* @__PURE__ */ a(PageBreakingGroup, {
      ...props
    }), /* @__PURE__ */ a("div", {
      class: "final-row"
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
        debug: true
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
        title: "Step by Step",
        description: "Print one monochrome grid per color",
        icon: /* @__PURE__ */ a(StepByStepPreviewer, {
          image
        })
      },
      {
        value: "color",
        title: "Color Image",
        description: "Print a single color image",
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
      let s4 = "";
      for (let x3 = Math.max(startX, 0); x3 < Math.min(props.image.width, startX + width); x3++) {
        const px = props.image.partList[props.image.pixels[y3][x3]];
        s4 = s4 + (px?.symbol ?? " ");
      }
      lines.push(s4);
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
    }))), /* @__PURE__ */ a(BackgroundLayer, {
      image,
      bg: displaySettings.background
    }), /* @__PURE__ */ a(ColorLayer, {
      image
    }), /* @__PURE__ */ a(GridLayer, {
      image,
      grid: displaySettings.grid
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
      fill: props.bg
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
            if (px === void 0)
              return;
          }
          const t3 = document.createElementNS(svgns, "text");
          if (planStyle === "spans") {
            t3.innerHTML = runCount.toString();
          } else {
            const sym = px?.symbol;
            if (runCount === 1) {
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
            if (x3 === image.width)
              break;
          }
        }
      }
    }
  }
  function GridLayer(props) {
    const {image, grid} = props;
    const gridLayer = s2(null);
    y2(() => {
      renderGrid();
    }, [image, grid]);
    return /* @__PURE__ */ a("g", {
      ref: gridLayer
    });
    function renderGrid() {
      clearChildren(gridLayer.current);
      const target = gridLayer.current;
      if (grid !== "none") {
        const gridInterval = +grid;
        for (let y3 = 0; y3 <= image.height; y3++) {
          const line = document.createElementNS(svgns, "line");
          line.classList.add("gridline");
          line.classList.add(gridInterval < image.height && y3 % gridInterval === 0 ? "gridmajor" : "gridminor");
          line.setAttribute("x1", -16);
          line.setAttribute("x2", image.width * 32 + 16);
          line.setAttribute("y1", y3 * 32);
          line.setAttribute("y2", y3 * 32);
          target.appendChild(line);
        }
        for (let x3 = 0; x3 <= image.width; x3++) {
          const line = document.createElementNS(svgns, "line");
          line.classList.add(gridInterval < image.width && x3 % gridInterval === 0 ? "gridmajor" : "gridminor");
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
        title.innerHTML = `${image.partList[i3].target.code} - ${image.partList[i3].target.name}`;
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

  // src/app.tsx
  var memoized = {
    adjustImage: memoize(adjustImage),
    palettizeImage: memoize(palettizeImage),
    createPartListImage: memoize(createPartListImage)
  };
  var galleryStorage = createGallery();
  var DefaultAppProps = {
    display: {
      background: "#777",
      grid: "56",
      planStyle: "none",
      refobj: "none"
    },
    image: {
      brightness: 0,
      contrast: 0,
      saturation: 0,
      flip: false,
      mirror: false,
      repixelate: false,
      transparency: "auto"
    },
    material: {
      colorMatch: "ciede2000",
      nodupes: false,
      palette: "artkal-mini-starter",
      size: "artkal-mini"
    },
    print: {
      paperSize: "letter",
      format: "step-by-step",
      imageSize: "actual",
      breakStrategy: "grid"
    },
    source: {
      displayName: galleryStorage.current[0][0],
      uri: galleryStorage.current[0][1],
      _decoded: void 0
    },
    ui: {
      isUploadOpen: false,
      isPrintOpen: false,
      showLegend: true,
      showSettings: true
    }
  };
  function createApp(initProps = DefaultAppProps, renderTarget) {
    let _props = initProps;
    selectImage(_props.source.displayName, _props.source.uri);
    function updateProp(parent, name, value) {
      _props = {..._props, [parent]: {..._props[parent], [name]: value}};
      N(/* @__PURE__ */ a(App, {
        ..._props
      }), renderTarget);
      window.localStorage.setItem("props", JSON.stringify(_props, (name2, val) => name2.startsWith("_") ? void 0 : val));
    }
    function acceptUserImage(displayName, uri) {
      galleryStorage.add(displayName, uri);
      selectImage(displayName, uri);
    }
    function selectImage(displayName, uri) {
      getImageDataFromName(uri, (data) => {
        updateProp("source", "uri", uri);
        updateProp("source", "displayName", displayName);
        updateProp("source", "_decoded", data);
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
          if (evt.key === "Escape") {
            updateProp("ui", "isPrintOpen", false);
            updateProp("ui", "isUploadOpen", false);
          }
        });
      }, []);
      const none = {};
      const imageData = props.source._decoded;
      const adjustedImageData = imageData && memoized.adjustImage(imageData, props.image);
      const processedRgbaArray = adjustedImageData && imageDataToRgbaArray(adjustedImageData);
      const {palette, quantized} = processedRgbaArray ? memoized.palettizeImage(processedRgbaArray, props.material) : none;
      const image = palette && quantized ? memoized.createPartListImage(palette, quantized) : void 0;
      const pitch = getPitch(props.material.size);
      return /* @__PURE__ */ a("div", {
        class: "app-top"
      }, /* @__PURE__ */ a(PropContext.Provider, {
        value: updateProp
      }, /* @__PURE__ */ a("div", {
        class: "toolbar"
      }, /* @__PURE__ */ a("button", {
        class: "toolbar-button",
        title: "Upload",
        onClick: () => updateProp("ui", "isUploadOpen", true)
      }, "\u{1F4C2}"), /* @__PURE__ */ a("button", {
        class: "toolbar-button",
        title: "Settings",
        onClick: () => updateProp("ui", "showSettings", !props.ui.showSettings)
      }, "\u2699"), /* @__PURE__ */ a("button", {
        class: "toolbar-button",
        title: "Print...",
        onClick: () => updateProp("ui", "isPrintOpen", true)
      }, "\u{1F5A8}"), /* @__PURE__ */ a("button", {
        class: "toolbar-button",
        title: "Legend",
        onClick: () => updateProp("ui", "showLegend", !props.ui.showLegend)
      }, "\u{1F4C3}"), /* @__PURE__ */ a("button", {
        class: "toolbar-button",
        title: "Help"
      }, "\u2753")), /* @__PURE__ */ a("div", {
        class: "app-main"
      }, props.ui.showSettings && /* @__PURE__ */ a("div", {
        class: "settings"
      }, /* @__PURE__ */ a(MaterialSettingsRow, {
        ...props.material
      }), /* @__PURE__ */ a(ImageSettingsRow, {
        ...props.image
      }), /* @__PURE__ */ a(DisplaySettingsRow, {
        ...props.display
      }), !!image && /* @__PURE__ */ a(Stats, {
        img: image,
        pitch: getPitch(props.material.size)
      })), image ? /* @__PURE__ */ a(PlanSvg, {
        image,
        pitch,
        displaySettings: props.display
      }) : /* @__PURE__ */ a("div", null, "Loading..."), props.ui.showLegend && image && /* @__PURE__ */ a(Legend, {
        partList: image.partList
      })), props.ui.isUploadOpen && /* @__PURE__ */ a(GalleryContainer, {
        gallery: galleryStorage.current,
        load: (name, uri) => {
          selectImage(name, uri);
        },
        requestDelete: (uri) => {
          galleryStorage.remove(uri);
        }
      }), props.ui.isPrintOpen && image && /* @__PURE__ */ a(PrintDialog, {
        image,
        settings: props.print,
        gridSize: props.material.size,
        filename: props.source.displayName
      })));
    }
    function ImageSettingsRow(props) {
      return /* @__PURE__ */ a("div", {
        class: "settings-row"
      }, /* @__PURE__ */ a("details", {
        open: true
      }, /* @__PURE__ */ a("summary", null, "Image Settings"), /* @__PURE__ */ a("div", {
        class: "options-row"
      }, /* @__PURE__ */ a("div", {
        class: "options-group"
      }, /* @__PURE__ */ a("span", {
        class: "header"
      }, "Transparency"), getRadioGroup(props, "image", "transparency", ImageSettings.transparency)), /* @__PURE__ */ a("div", {
        class: "options-group"
      }, /* @__PURE__ */ a("span", {
        class: "header"
      }, "Color Adjust"), getSlider(props, "image", "brightness", "Brightness"), getSlider(props, "image", "contrast", "Contrast"), getSlider(props, "image", "saturation", "Saturation")), /* @__PURE__ */ a("div", {
        class: "options-group"
      }, /* @__PURE__ */ a("span", {
        class: "header"
      }, "Transforms"), getCheckbox(props, "image", "flip", "Flip"), getCheckbox(props, "image", "mirror", "Mirror")))));
    }
    function MaterialSettingsRow(props) {
      return /* @__PURE__ */ a("div", {
        class: "settings-row"
      }, /* @__PURE__ */ a("details", {
        open: true
      }, /* @__PURE__ */ a("summary", null, "Material Settings"), /* @__PURE__ */ a("div", {
        class: "options-row"
      }, /* @__PURE__ */ a("div", {
        class: "options-group"
      }, /* @__PURE__ */ a("span", {
        class: "header"
      }, "Color Matching"), getRadioGroup(props, "material", "colorMatch", MaterialSettings.colorMatch), getCheckbox(props, "material", "nodupes", "No Duplicates")), /* @__PURE__ */ a("div", {
        class: "options-group"
      }, /* @__PURE__ */ a("span", {
        class: "header"
      }, "Palette"), getRadioGroup(props, "material", "palette", MaterialSettings.palette)), /* @__PURE__ */ a("div", {
        class: "options-group"
      }, /* @__PURE__ */ a("span", {
        class: "header"
      }, "Grid Size"), getRadioGroup(props, "material", "size", MaterialSettings.size)))));
    }
    function Legend({partList}) {
      return /* @__PURE__ */ a("table", {
        className: "part-list"
      }, /* @__PURE__ */ a("thead", null, /* @__PURE__ */ a("tr", null, /* @__PURE__ */ a("th", {
        colSpan: 5,
        className: "top-header"
      }, "Legend"))), /* @__PURE__ */ a("tbody", null, partList.map((ent) => {
        return /* @__PURE__ */ a("tr", {
          key: ent.symbol + ent.count + ent.target.name
        }, /* @__PURE__ */ a("td", {
          className: "legend-symbol"
        }, ent.symbol), /* @__PURE__ */ a("td", {
          className: "part-count"
        }, ent.count.toLocaleString()), /* @__PURE__ */ a("td", {
          className: "color-code"
        }, ent.target.code), /* @__PURE__ */ a("td", {
          className: "color-swatch",
          style: {color: colorEntryToHex(ent.target)}
        }, "\u2B24"), /* @__PURE__ */ a("td", {
          className: "color-name"
        }, /* @__PURE__ */ a("span", {
          className: "colorName"
        }, ent.target.name)));
      })));
    }
    function Stats({img, pitch}) {
      return /* @__PURE__ */ a("table", {
        className: "plan-stats"
      }, /* @__PURE__ */ a("thead", null, /* @__PURE__ */ a("tr", null, /* @__PURE__ */ a("th", {
        colSpan: 4,
        className: "top-header"
      }, "Statistics"))), /* @__PURE__ */ a("tbody", null, /* @__PURE__ */ a("tr", null, /* @__PURE__ */ a("td", {
        className: "stat-label"
      }, "Width"), /* @__PURE__ */ a("td", {
        className: "stat-value"
      }, img.width.toLocaleString(), "px"), /* @__PURE__ */ a("td", {
        className: "stat-value"
      }, fmt(img.width * pitch), "mm"), /* @__PURE__ */ a("td", {
        className: "stat-value"
      }, fmt(img.width * pitch / 25.4), '"')), /* @__PURE__ */ a("tr", null, /* @__PURE__ */ a("td", {
        className: "stat-label"
      }, "Height"), /* @__PURE__ */ a("td", {
        className: "stat-value"
      }, img.height.toLocaleString(), "px"), /* @__PURE__ */ a("td", {
        className: "stat-value"
      }, fmt(img.height * pitch), "mm"), /* @__PURE__ */ a("td", {
        className: "stat-value"
      }, fmt(img.height * pitch / 25.4), '"')), /* @__PURE__ */ a("tr", null, /* @__PURE__ */ a("td", {
        className: "stat-label"
      }, "Pixels"), /* @__PURE__ */ a("td", {
        colSpan: 4,
        className: "stat-value"
      }, getImageStats(img).pixels))));
      function fmt(n2) {
        return n2.toFixed(2);
      }
    }
    function DisplaySettingsRow(props) {
      return /* @__PURE__ */ a("div", {
        class: "settings-row"
      }, /* @__PURE__ */ a("details", {
        open: true
      }, /* @__PURE__ */ a("summary", null, "Plan Settings"), /* @__PURE__ */ a("div", {
        class: "options-row"
      }, /* @__PURE__ */ a("div", {
        className: "options-group"
      }, /* @__PURE__ */ a("span", {
        className: "header"
      }, "Legend"), getRadioGroup(props, "display", "planStyle", DisplaySettings.planStyle)), /* @__PURE__ */ a("div", {
        className: "options-group"
      }, /* @__PURE__ */ a("span", {
        className: "header"
      }, "Grid"), getRadioGroup(props, "display", "grid", DisplaySettings.grid)), /* @__PURE__ */ a("div", {
        className: "options-group"
      }, /* @__PURE__ */ a("span", {
        className: "header"
      }, "Background"), getRadioGroup(props, "display", "background", DisplaySettings.background)), /* @__PURE__ */ a("div", {
        className: "options-group"
      }, /* @__PURE__ */ a("span", {
        className: "header"
      }, "Comparison"), getRadioGroup(props, "display", "refobj", DisplaySettings.refobj)))));
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
      }, /* @__PURE__ */ a("h2", null, "Pick Image"), /* @__PURE__ */ a("div", {
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
      })), /* @__PURE__ */ a("div", {
        class: "about"
      }, /* @__PURE__ */ a("a", {
        href: "https://github.com/SeaRyanC/firaga-io"
      }, /* @__PURE__ */ a("img", {
        src: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        width: "40",
        height: "40"
      }))));
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
      return /* @__PURE__ */ a("label", null, /* @__PURE__ */ a("input", {
        type: "range",
        onChange: changed,
        min: "-10",
        max: "10",
        step: "1",
        value: props[key]
      }), label);
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

  // src/firaga.tsx
  window.addEventListener("DOMContentLoaded", function() {
    const s4 = window.localStorage.getItem("props");
    let props = void 0;
    if (s4 !== null) {
      props = JSON.parse(s4);
    }
    createApp(props, document.body);
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
