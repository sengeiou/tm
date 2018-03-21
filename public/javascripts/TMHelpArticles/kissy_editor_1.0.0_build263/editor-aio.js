
if (typeof YAHOO == "undefined" || !YAHOO) {
	var YAHOO = {}
}
YAHOO.namespace = function() {
	var a = arguments, b = null, d, e, c;
	for (d = 0; d < a.length; d = d + 1) {
		c = ("" + a[d]).split(".");
		b = YAHOO;
		for (e = (c[0] == "YAHOO") ? 1 : 0; e < c.length; e = e + 1) {
			b[c[e]] = b[c[e]] || {};
			b = b[c[e]]
		}
	}
	return b
};
YAHOO.log = function(b, a, c) {
	var d = YAHOO.widget.Logger;
	if (d && d.log) {
		return d.log(b, a, c)
	} else {
		return false
	}
};
YAHOO.register = function(d, i, a) {
	var e = YAHOO.env.modules, c, f, g, h, b;
	if (!e[d]) {
		e[d] = {
			versions : [],
			builds : []
		}
	}
	c = e[d];
	f = a.version;
	g = a.build;
	h = YAHOO.env.listeners;
	c.name = d;
	c.version = f;
	c.build = g;
	c.versions.push(f);
	c.builds.push(g);
	c.mainClass = i;
	for (b = 0; b < h.length; b = b + 1) {
		h[b](c)
	}
	if (i) {
		i.VERSION = f;
		i.BUILD = g
	} else {
		YAHOO.log("mainClass is undefined for module " + d, "warn")
	}
};
YAHOO.env = YAHOO.env || {
	modules : [],
	listeners : []
};
YAHOO.env.getVersion = function(a) {
	return YAHOO.env.modules[a] || null
};
YAHOO.env.ua = function() {
	var e = function(i) {
		var h = 0;
		return parseFloat(i.replace(/\./g, function() {
			return (h++ == 1) ? "" : "."
		}))
	}, b = navigator, c = {
		ie : 0,
		opera : 0,
		gecko : 0,
		webkit : 0,
		mobile : null,
		air : 0,
		caja : b.cajaVersion,
		secure : false,
		os : null
	}, f = navigator && navigator.userAgent, d = window && window.location, g = d
			&& d.href, a;
	c.secure = g && (g.toLowerCase().indexOf("https") === 0);
	if (f) {
		if ((/windows|win32/i).test(f)) {
			c.os = "windows"
		} else {
			if ((/macintosh/i).test(f)) {
				c.os = "macintosh"
			}
		}
		if ((/KHTML/).test(f)) {
			c.webkit = 1
		}
		a = f.match(/AppleWebKit\/([^\s]*)/);
		if (a && a[1]) {
			c.webkit = e(a[1]);
			if (/ Mobile\//.test(f)) {
				c.mobile = "Apple"
			} else {
				a = f.match(/NokiaN[^\/]*/);
				if (a) {
					c.mobile = a[0]
				}
			}
			a = f.match(/AdobeAIR\/([^\s]*)/);
			if (a) {
				c.air = a[0]
			}
		}
		if (!c.webkit) {
			a = f.match(/Opera[\s\/]([^\s]*)/);
			if (a && a[1]) {
				c.opera = e(a[1]);
				a = f.match(/Opera Mini[^;]*/);
				if (a) {
					c.mobile = a[0]
				}
			} else {
				a = f.match(/MSIE\s([^;]*)/);
				if (a && a[1]) {
					c.ie = e(a[1])
				} else {
					a = f.match(/Gecko\/([^\s]*)/);
					if (a) {
						c.gecko = 1;
						a = f.match(/rv:([^\s\)]*)/);
						if (a && a[1]) {
							c.gecko = e(a[1])
						}
					}
				}
			}
		}
	}
	return c
}();
(function() {
	YAHOO.namespace("util", "widget", "example");
	if ("undefined" !== typeof YAHOO_config) {
		var d = YAHOO_config.listener, a = YAHOO.env.listeners, b = true, c;
		if (d) {
			for (c = 0; c < a.length; c++) {
				if (a[c] == d) {
					b = false;
					break
				}
			}
			if (b) {
				a.push(d)
			}
		}
	}
})();
YAHOO.lang = YAHOO.lang || {};
(function() {
	var h = YAHOO.lang, a = Object.prototype, b = "[object Array]", g = "[object Function]", c = "[object Object]", e = [], d = [
			"toString", "valueOf" ], f = {
		isArray : function(i) {
			return a.toString.apply(i) === b
		},
		isBoolean : function(i) {
			return typeof i === "boolean"
		},
		isFunction : function(i) {
			return (typeof i === "function") || a.toString.apply(i) === g
		},
		isNull : function(i) {
			return i === null
		},
		isNumber : function(i) {
			return typeof i === "number" && isFinite(i)
		},
		isObject : function(i) {
			return (i && (typeof i === "object" || h.isFunction(i))) || false
		},
		isString : function(i) {
			return typeof i === "string"
		},
		isUndefined : function(i) {
			return typeof i === "undefined"
		},
		_IEEnumFix : (YAHOO.env.ua.ie) ? function(j, k) {
			var l, m, i;
			for (l = 0; l < d.length; l = l + 1) {
				m = d[l];
				i = k[m];
				if (h.isFunction(i) && i != a[m]) {
					j[m] = i
				}
			}
		} : function() {
		},
		extend : function(i, m, j) {
			if (!m || !i) {
				throw new Error(
						"extend failed, please check that all dependencies are included.")
			}
			var k = function() {
			}, l;
			k.prototype = m.prototype;
			i.prototype = new k();
			i.prototype.constructor = i;
			i.superclass = m.prototype;
			if (m.prototype.constructor == a.constructor) {
				m.prototype.constructor = m
			}
			if (j) {
				for (l in j) {
					if (h.hasOwnProperty(j, l)) {
						i.prototype[l] = j[l]
					}
				}
				h._IEEnumFix(i.prototype, j)
			}
		},
		augmentObject : function(n, i) {
			if (!i || !n) {
				throw new Error("Absorb failed, verify dependencies.")
			}
			var l = arguments, j, m, k = l[2];
			if (k && k !== true) {
				for (j = 2; j < l.length; j = j + 1) {
					n[l[j]] = i[l[j]]
				}
			} else {
				for (m in i) {
					if (k || !(m in n)) {
						n[m] = i[m]
					}
				}
				h._IEEnumFix(n, i)
			}
		},
		augmentProto : function(i, j) {
			if (!j || !i) {
				throw new Error("Augment failed, verify dependencies.")
			}
			var l = [ i.prototype, j.prototype ], k;
			for (k = 2; k < arguments.length; k = k + 1) {
				l.push(arguments[k])
			}
			h.augmentObject.apply(this, l)
		},
		dump : function(q, l) {
			var o, m, j = [], i = "{...}", p = "f(){...}", k = ", ", n = " => ";
			if (!h.isObject(q)) {
				return q + ""
			} else {
				if (q instanceof Date || ("nodeType" in q && "tagName" in q)) {
					return q
				} else {
					if (h.isFunction(q)) {
						return p
					}
				}
			}
			l = (h.isNumber(l)) ? l : 3;
			if (h.isArray(q)) {
				j.push("[");
				for (o = 0, m = q.length; o < m; o = o + 1) {
					if (h.isObject(q[o])) {
						j.push((l > 0) ? h.dump(q[o], l - 1) : i)
					} else {
						j.push(q[o])
					}
					j.push(k)
				}
				if (j.length > 1) {
					j.pop()
				}
				j.push("]")
			} else {
				j.push("{");
				for (o in q) {
					if (h.hasOwnProperty(q, o)) {
						j.push(o + n);
						if (h.isObject(q[o])) {
							j.push((l > 0) ? h.dump(q[o], l - 1) : i)
						} else {
							j.push(q[o])
						}
						j.push(k)
					}
				}
				if (j.length > 1) {
					j.pop()
				}
				j.push("}")
			}
			return j.join("")
		},
		substitute : function(i, x, p) {
			var t, u, v, m, l, j, n = [], w, s = "dump", o = " ", y = "{", k = "}", q, r;
			for (;;) {
				t = i.lastIndexOf(y);
				if (t < 0) {
					break
				}
				u = i.indexOf(k, t);
				if (t + 1 >= u) {
					break
				}
				w = i.substring(t + 1, u);
				m = w;
				j = null;
				v = m.indexOf(o);
				if (v > -1) {
					j = m.substring(v + 1);
					m = m.substring(0, v)
				}
				l = x[m];
				if (p) {
					l = p(m, l, j)
				}
				if (h.isObject(l)) {
					if (h.isArray(l)) {
						l = h.dump(l, parseInt(j, 10))
					} else {
						j = j || "";
						q = j.indexOf(s);
						if (q > -1) {
							j = j.substring(4)
						}
						r = l.toString();
						if (r === c || q > -1) {
							l = h.dump(l, parseInt(j, 10))
						} else {
							l = r
						}
					}
				} else {
					if (!h.isString(l) && !h.isNumber(l)) {
						l = "~-" + n.length + "-~";
						n[n.length] = w
					}
				}
				i = i.substring(0, t) + l + i.substring(u + 1)
			}
			for (t = n.length - 1; t >= 0; t = t - 1) {
				i = i.replace(new RegExp("~-" + t + "-~"), "{" + n[t] + "}",
						"g")
			}
			return i
		},
		trim : function(j) {
			try {
				return j.replace(/^\s+|\s+$/g, "")
			} catch (i) {
				return j
			}
		},
		merge : function() {
			var i = {}, k = arguments, l = k.length, j;
			for (j = 0; j < l; j = j + 1) {
				h.augmentObject(i, k[j], true)
			}
			return i
		},
		later : function(j, p, i, n, m) {
			j = j || 0;
			p = p || {};
			var o = i, k = n, l, q;
			if (h.isString(i)) {
				o = p[i]
			}
			if (!o) {
				throw new TypeError("method undefined")
			}
			if (k && !h.isArray(k)) {
				k = [ n ]
			}
			l = function() {
				o.apply(p, k || e)
			};
			q = (m) ? setInterval(l, j) : setTimeout(l, j);
			return {
				interval : m,
				cancel : function() {
					if (this.interval) {
						clearInterval(q)
					} else {
						clearTimeout(q)
					}
				}
			}
		},
		isValue : function(i) {
			return (h.isObject(i) || h.isString(i) || h.isNumber(i) || h
					.isBoolean(i))
		}
	};
	h.hasOwnProperty = (a.hasOwnProperty) ? function(j, i) {
		return j && j.hasOwnProperty(i)
	} : function(j, i) {
		return !h.isUndefined(j[i]) && j.constructor.prototype[i] !== j[i]
	};
	f.augmentObject(h, f, true);
	YAHOO.util.Lang = h;
	h.augment = h.augmentProto;
	YAHOO.augment = h.augmentProto;
	YAHOO.extend = h.extend
})();
YAHOO.register("yahoo", YAHOO, {
	version : "2.8.0r4",
	build : "2449"
});
(function() {
	YAHOO.env._id_counter = YAHOO.env._id_counter || 0;
	var ao = YAHOO.util, ai = YAHOO.lang, aE = YAHOO.env.ua, at = YAHOO.lang.trim, aN = {}, aJ = {}, ag = /^t(?:able|d|h)$/i, y = /color$/i, aj = window.document, z = aj.documentElement, aM = "ownerDocument", aD = "defaultView", av = "documentElement", ax = "compatMode", aP = "offsetLeft", ae = "offsetTop", aw = "offsetParent", x = "parentNode", aF = "nodeType", aq = "tagName", af = "scrollLeft", aI = "scrollTop", ad = "getBoundingClientRect", au = "getComputedStyle", aQ = "currentStyle", ah = "CSS1Compat", aO = "BackCompat", aK = "class", an = "className", ak = "", ar = " ", ay = "(?:^|\\s)", aG = "(?= |$)", Y = "g", aB = "position", aL = "fixed", G = "relative", aH = "left", aC = "top", az = "medium", aA = "borderLeftWidth", ac = "borderTopWidth", ap = aE.opera, al = aE.webkit, am = aE.gecko, aa = aE.ie;
	ao.Dom = {
		CUSTOM_ATTRIBUTES : (!z.hasAttribute) ? {
			"for" : "htmlFor",
			"class" : an
		} : {
			htmlFor : "for",
			className : aK
		},
		DOT_ATTRIBUTES : {},
		get : function(f) {
			var c, a, e, g, d, b;
			if (f) {
				if (f[aF] || f.item) {
					return f
				}
				if (typeof f === "string") {
					c = f;
					f = aj.getElementById(f);
					b = (f) ? f.attributes : null;
					if (f && b && b.id && b.id.value === c) {
						return f
					} else {
						if (f && aj.all) {
							f = null;
							a = aj.all[c];
							for (g = 0, d = a.length; g < d; ++g) {
								if (a[g].id === c) {
									return a[g]
								}
							}
						}
					}
					return f
				}
				if (YAHOO.util.Element && f instanceof YAHOO.util.Element) {
					f = f.get("element")
				}
				if ("length" in f) {
					e = [];
					for (g = 0, d = f.length; g < d; ++g) {
						e[e.length] = ao.Dom.get(f[g])
					}
					return e
				}
				return f
			}
			return null
		},
		getComputedStyle : function(a, b) {
			if (window[au]) {
				return a[aM][aD][au](a, null)[b]
			} else {
				if (a[aQ]) {
					return ao.Dom.IE_ComputedStyle.get(a, b)
				}
			}
		},
		getStyle : function(a, b) {
			return ao.Dom.batch(a, ao.Dom._getStyle, b)
		},
		_getStyle : function() {
			if (window[au]) {
				return function(b, d) {
					d = (d === "float") ? d = "cssFloat" : ao.Dom._toCamel(d);
					var a = b.style[d], c;
					if (!a) {
						c = b[aM][aD][au](b, null);
						if (c) {
							a = c[d]
						}
					}
					return a
				}
			} else {
				if (z[aQ]) {
					return function(b, e) {
						var a;
						switch (e) {
						case "opacity":
							a = 100;
							try {
								a = b.filters["DXImageTransform.Microsoft.Alpha"].opacity
							} catch (d) {
								try {
									a = b.filters("alpha").opacity
								} catch (c) {
								}
							}
							return a / 100;
						case "float":
							e = "styleFloat";
						default:
							e = ao.Dom._toCamel(e);
							a = b[aQ] ? b[aQ][e] : null;
							return (b.style[e] || a)
						}
					}
				}
			}
		}(),
		setStyle : function(b, c, a) {
			ao.Dom.batch(b, ao.Dom._setStyle, {
				prop : c,
				val : a
			})
		},
		_setStyle : function() {
			if (aa) {
				return function(c, b) {
					var a = ao.Dom._toCamel(b.prop), d = b.val;
					if (c) {
						switch (a) {
						case "opacity":
							if (ai.isString(c.style.filter)) {
								c.style.filter = "alpha(opacity=" + d * 100
										+ ")";
								if (!c[aQ] || !c[aQ].hasLayout) {
									c.style.zoom = 1
								}
							}
							break;
						case "float":
							a = "styleFloat";
						default:
							c.style[a] = d
						}
					} else {
					}
				}
			} else {
				return function(c, b) {
					var a = ao.Dom._toCamel(b.prop), d = b.val;
					if (c) {
						if (a == "float") {
							a = "cssFloat"
						}
						c.style[a] = d
					} else {
					}
				}
			}
		}(),
		getXY : function(a) {
			return ao.Dom.batch(a, ao.Dom._getXY)
		},
		_canPosition : function(a) {
			return (ao.Dom._getStyle(a, "display") !== "none" && ao.Dom
					._inDoc(a))
		},
		_getXY : function() {
			if (aj[av][ad]) {
				return function(j) {
					var i, a, h, c, d, e, f, l, k, g = Math.floor, b = false;
					if (ao.Dom._canPosition(j)) {
						h = j[ad]();
						c = j[aM];
						i = ao.Dom.getDocumentScrollLeft(c);
						a = ao.Dom.getDocumentScrollTop(c);
						b = [ g(h[aH]), g(h[aC]) ];
						if (aa && aE.ie < 8) {
							d = 2;
							e = 2;
							f = c[ax];
							if (aE.ie === 6) {
								if (f !== aO) {
									d = 0;
									e = 0
								}
							}
							if ((f === aO)) {
								l = ab(c[av], aA);
								k = ab(c[av], ac);
								if (l !== az) {
									d = parseInt(l, 10)
								}
								if (k !== az) {
									e = parseInt(k, 10)
								}
							}
							b[0] -= d;
							b[1] -= e
						}
						if ((a || i)) {
							b[0] += i;
							b[1] += a
						}
						b[0] = g(b[0]);
						b[1] = g(b[1])
					} else {
					}
					return b
				}
			} else {
				return function(h) {
					var a, g, f, d, c, e = false, b = h;
					if (ao.Dom._canPosition(h)) {
						e = [ h[aP], h[ae] ];
						a = ao.Dom.getDocumentScrollLeft(h[aM]);
						g = ao.Dom.getDocumentScrollTop(h[aM]);
						c = ((am || aE.webkit > 519) ? true : false);
						while ((b = b[aw])) {
							e[0] += b[aP];
							e[1] += b[ae];
							if (c) {
								e = ao.Dom._calcBorders(b, e)
							}
						}
						if (ao.Dom._getStyle(h, aB) !== aL) {
							b = h;
							while ((b = b[x]) && b[aq]) {
								f = b[aI];
								d = b[af];
								if (am
										&& (ao.Dom._getStyle(b, "overflow") !== "visible")) {
									e = ao.Dom._calcBorders(b, e)
								}
								if (f || d) {
									e[0] -= d;
									e[1] -= f
								}
							}
							e[0] += a;
							e[1] += g
						} else {
							if (ap) {
								e[0] -= a;
								e[1] -= g
							} else {
								if (al || am) {
									e[0] += a;
									e[1] += g
								}
							}
						}
						e[0] = Math.floor(e[0]);
						e[1] = Math.floor(e[1])
					} else {
					}
					return e
				}
			}
		}(),
		getX : function(a) {
			var b = function(c) {
				return ao.Dom.getXY(c)[0]
			};
			return ao.Dom.batch(a, b, ao.Dom, true)
		},
		getY : function(a) {
			var b = function(c) {
				return ao.Dom.getXY(c)[1]
			};
			return ao.Dom.batch(a, b, ao.Dom, true)
		},
		setXY : function(b, a, c) {
			ao.Dom.batch(b, ao.Dom._setXY, {
				pos : a,
				noRetry : c
			})
		},
		_setXY : function(i, f) {
			var e = ao.Dom._getStyle(i, aB), g = ao.Dom.setStyle, b = f.pos, a = f.noRetry, d = [
					parseInt(ao.Dom.getComputedStyle(i, aH), 10),
					parseInt(ao.Dom.getComputedStyle(i, aC), 10) ], c, h;
			if (e == "static") {
				e = G;
				g(i, aB, e)
			}
			c = ao.Dom._getXY(i);
			if (!b || c === false) {
				return false
			}
			if (isNaN(d[0])) {
				d[0] = (e == G) ? 0 : i[aP]
			}
			if (isNaN(d[1])) {
				d[1] = (e == G) ? 0 : i[ae]
			}
			if (b[0] !== null) {
				g(i, aH, b[0] - c[0] + d[0] + "px")
			}
			if (b[1] !== null) {
				g(i, aC, b[1] - c[1] + d[1] + "px")
			}
			if (!a) {
				h = ao.Dom._getXY(i);
				if ((b[0] !== null && h[0] != b[0])
						|| (b[1] !== null && h[1] != b[1])) {
					ao.Dom._setXY(i, {
						pos : b,
						noRetry : true
					})
				}
			}
		},
		setX : function(b, a) {
			ao.Dom.setXY(b, [ a, null ])
		},
		setY : function(a, b) {
			ao.Dom.setXY(a, [ null, b ])
		},
		getRegion : function(a) {
			var b = function(c) {
				var d = false;
				if (ao.Dom._canPosition(c)) {
					d = ao.Region.getRegion(c)
				} else {
				}
				return d
			};
			return ao.Dom.batch(a, b, ao.Dom, true)
		},
		getClientWidth : function() {
			return ao.Dom.getViewportWidth()
		},
		getClientHeight : function() {
			return ao.Dom.getViewportHeight()
		},
		getElementsByClassName : function(f, b, e, c, j, d) {
			b = b || "*";
			e = (e) ? ao.Dom.get(e) : null || aj;
			if (!e) {
				return []
			}
			var a = [], k = e.getElementsByTagName(b), h = ao.Dom.hasClass;
			for ( var i = 0, g = k.length; i < g; ++i) {
				if (h(k[i], f)) {
					a[a.length] = k[i]
				}
			}
			if (c) {
				ao.Dom.batch(a, c, j, d)
			}
			return a
		},
		hasClass : function(b, a) {
			return ao.Dom.batch(b, ao.Dom._hasClass, a)
		},
		_hasClass : function(a, c) {
			var b = false, d;
			if (a && c) {
				d = ao.Dom._getAttribute(a, an) || ak;
				if (c.exec) {
					b = c.test(d)
				} else {
					b = c && (ar + d + ar).indexOf(ar + c + ar) > -1
				}
			} else {
			}
			return b
		},
		addClass : function(b, a) {
			return ao.Dom.batch(b, ao.Dom._addClass, a)
		},
		_addClass : function(a, c) {
			var b = false, d;
			if (a && c) {
				d = ao.Dom._getAttribute(a, an) || ak;
				if (!ao.Dom._hasClass(a, c)) {
					ao.Dom.setAttribute(a, an, at(d + ar + c));
					b = true
				}
			} else {
			}
			return b
		},
		removeClass : function(b, a) {
			return ao.Dom.batch(b, ao.Dom._removeClass, a)
		},
		_removeClass : function(f, a) {
			var e = false, d, c, b;
			if (f && a) {
				d = ao.Dom._getAttribute(f, an) || ak;
				ao.Dom.setAttribute(f, an, d.replace(ao.Dom._getClassRegex(a),
						ak));
				c = ao.Dom._getAttribute(f, an);
				if (d !== c) {
					ao.Dom.setAttribute(f, an, at(c));
					e = true;
					if (ao.Dom._getAttribute(f, an) === "") {
						b = (f.hasAttribute && f.hasAttribute(aK)) ? aK : an;
						f.removeAttribute(b)
					}
				}
			} else {
			}
			return e
		},
		replaceClass : function(a, c, b) {
			return ao.Dom.batch(a, ao.Dom._replaceClass, {
				from : c,
				to : b
			})
		},
		_replaceClass : function(g, a) {
			var f, c, e, b = false, d;
			if (g && a) {
				c = a.from;
				e = a.to;
				if (!e) {
					b = false
				} else {
					if (!c) {
						b = ao.Dom._addClass(g, a.to)
					} else {
						if (c !== e) {
							d = ao.Dom._getAttribute(g, an) || ak;
							f = (ar + d.replace(ao.Dom._getClassRegex(c), ar
									+ e)).split(ao.Dom._getClassRegex(e));
							f.splice(1, 0, ar + e);
							ao.Dom.setAttribute(g, an, at(f.join(ak)));
							b = true
						}
					}
				}
			} else {
			}
			return b
		},
		generateId : function(b, a) {
			a = a || "yui-gen";
			var c = function(e) {
				if (e && e.id) {
					return e.id
				}
				var d = a + YAHOO.env._id_counter++;
				if (e) {
					if (e[aM] && e[aM].getElementById(d)) {
						return ao.Dom.generateId(e, d + a)
					}
					e.id = d
				}
				return d
			};
			return ao.Dom.batch(b, c, ao.Dom, true)
					|| c.apply(ao.Dom, arguments)
		},
		isAncestor : function(c, a) {
			c = ao.Dom.get(c);
			a = ao.Dom.get(a);
			var b = false;
			if ((c && a) && (c[aF] && a[aF])) {
				if (c.contains && c !== a) {
					b = c.contains(a)
				} else {
					if (c.compareDocumentPosition) {
						b = !!(c.compareDocumentPosition(a) & 16)
					}
				}
			} else {
			}
			return b
		},
		inDocument : function(a, b) {
			return ao.Dom._inDoc(ao.Dom.get(a), b)
		},
		_inDoc : function(c, a) {
			var b = false;
			if (c && c[aq]) {
				a = a || c[aM];
				b = ao.Dom.isAncestor(a[av], c)
			} else {
			}
			return b
		},
		getElementsBy : function(a, b, f, d, i, e, c) {
			b = b || "*";
			f = (f) ? ao.Dom.get(f) : null || aj;
			if (!f) {
				return []
			}
			var j = [], k = f.getElementsByTagName(b);
			for ( var h = 0, g = k.length; h < g; ++h) {
				if (a(k[h])) {
					if (c) {
						j = k[h];
						break
					} else {
						j[j.length] = k[h]
					}
				}
			}
			if (d) {
				ao.Dom.batch(j, d, i, e)
			}
			return j
		},
		getElementBy : function(a, b, c) {
			return ao.Dom.getElementsBy(a, b, c, null, null, null, true)
		},
		batch : function(a, c, f, e) {
			var g = [], d = (e) ? f : window;
			a = (a && (a[aq] || a.item)) ? a : ao.Dom.get(a);
			if (a && c) {
				if (a[aq] || a.length === undefined) {
					return c.call(d, a, f)
				}
				for ( var b = 0; b < a.length; ++b) {
					g[g.length] = c.call(d, a[b], f)
				}
			} else {
				return false
			}
			return g
		},
		getDocumentHeight : function() {
			var b = (aj[ax] != ah || al) ? aj.body.scrollHeight
					: z.scrollHeight, a = Math.max(b, ao.Dom
					.getViewportHeight());
			return a
		},
		getDocumentWidth : function() {
			var b = (aj[ax] != ah || al) ? aj.body.scrollWidth : z.scrollWidth, a = Math
					.max(b, ao.Dom.getViewportWidth());
			return a
		},
		getViewportHeight : function() {
			var a = self.innerHeight, b = aj[ax];
			if ((b || aa) && !ap) {
				a = (b == ah) ? z.clientHeight : aj.body.clientHeight
			}
			return a
		},
		getViewportWidth : function() {
			var a = self.innerWidth, b = aj[ax];
			if (b || aa) {
				a = (b == ah) ? z.clientWidth : aj.body.clientWidth
			}
			return a
		},
		getAncestorBy : function(a, b) {
			while ((a = a[x])) {
				if (ao.Dom._testElement(a, b)) {
					return a
				}
			}
			return null
		},
		getAncestorByClassName : function(c, b) {
			c = ao.Dom.get(c);
			if (!c) {
				return null
			}
			var a = function(d) {
				return ao.Dom.hasClass(d, b)
			};
			return ao.Dom.getAncestorBy(c, a)
		},
		getAncestorByTagName : function(c, b) {
			c = ao.Dom.get(c);
			if (!c) {
				return null
			}
			var a = function(d) {
				return d[aq] && d[aq].toUpperCase() == b.toUpperCase()
			};
			return ao.Dom.getAncestorBy(c, a)
		},
		getPreviousSiblingBy : function(a, b) {
			while (a) {
				a = a.previousSibling;
				if (ao.Dom._testElement(a, b)) {
					return a
				}
			}
			return null
		},
		getPreviousSibling : function(a) {
			a = ao.Dom.get(a);
			if (!a) {
				return null
			}
			return ao.Dom.getPreviousSiblingBy(a)
		},
		getNextSiblingBy : function(a, b) {
			while (a) {
				a = a.nextSibling;
				if (ao.Dom._testElement(a, b)) {
					return a
				}
			}
			return null
		},
		getNextSibling : function(a) {
			a = ao.Dom.get(a);
			if (!a) {
				return null
			}
			return ao.Dom.getNextSiblingBy(a)
		},
		getFirstChildBy : function(b, a) {
			var c = (ao.Dom._testElement(b.firstChild, a)) ? b.firstChild
					: null;
			return c || ao.Dom.getNextSiblingBy(b.firstChild, a)
		},
		getFirstChild : function(a, b) {
			a = ao.Dom.get(a);
			if (!a) {
				return null
			}
			return ao.Dom.getFirstChildBy(a)
		},
		getLastChildBy : function(b, a) {
			if (!b) {
				return null
			}
			var c = (ao.Dom._testElement(b.lastChild, a)) ? b.lastChild : null;
			return c || ao.Dom.getPreviousSiblingBy(b.lastChild, a)
		},
		getLastChild : function(a) {
			a = ao.Dom.get(a);
			return ao.Dom.getLastChildBy(a)
		},
		getChildrenBy : function(c, d) {
			var a = ao.Dom.getFirstChildBy(c, d), b = a ? [ a ] : [];
			ao.Dom.getNextSiblingBy(a, function(e) {
				if (!d || d(e)) {
					b[b.length] = e
				}
				return false
			});
			return b
		},
		getChildren : function(a) {
			a = ao.Dom.get(a);
			if (!a) {
			}
			return ao.Dom.getChildrenBy(a)
		},
		getDocumentScrollLeft : function(a) {
			a = a || aj;
			return Math.max(a[av].scrollLeft, a.body.scrollLeft)
		},
		getDocumentScrollTop : function(a) {
			a = a || aj;
			return Math.max(a[av].scrollTop, a.body.scrollTop)
		},
		insertBefore : function(b, a) {
			b = ao.Dom.get(b);
			a = ao.Dom.get(a);
			if (!b || !a || !a[x]) {
				return null
			}
			return a[x].insertBefore(b, a)
		},
		insertAfter : function(b, a) {
			b = ao.Dom.get(b);
			a = ao.Dom.get(a);
			if (!b || !a || !a[x]) {
				return null
			}
			if (a.nextSibling) {
				return a[x].insertBefore(b, a.nextSibling)
			} else {
				return a[x].appendChild(b)
			}
		},
		getClientRegion : function() {
			var a = ao.Dom.getDocumentScrollTop(), c = ao.Dom
					.getDocumentScrollLeft(), d = ao.Dom.getViewportWidth() + c, b = ao.Dom
					.getViewportHeight()
					+ a;
			return new ao.Region(a, d, b, c)
		},
		setAttribute : function(c, b, a) {
			ao.Dom.batch(c, ao.Dom._setAttribute, {
				attr : b,
				val : a
			})
		},
		_setAttribute : function(a, c) {
			var b = ao.Dom._toCamel(c.attr), d = c.val;
			if (a && a.setAttribute) {
				if (ao.Dom.DOT_ATTRIBUTES[b]) {
					a[b] = d
				} else {
					b = ao.Dom.CUSTOM_ATTRIBUTES[b] || b;
					a.setAttribute(b, d)
				}
			} else {
			}
		},
		getAttribute : function(b, a) {
			return ao.Dom.batch(b, ao.Dom._getAttribute, a)
		},
		_getAttribute : function(c, b) {
			var a;
			b = ao.Dom.CUSTOM_ATTRIBUTES[b] || b;
			if (c && c.getAttribute) {
				a = c.getAttribute(b, 2)
			} else {
			}
			return a
		},
		_toCamel : function(c) {
			var a = aN;
			function b(e, d) {
				return d.toUpperCase()
			}
			return a[c]
					|| (a[c] = c.indexOf("-") === -1 ? c : c.replace(
							/-([a-z])/gi, b))
		},
		_getClassRegex : function(b) {
			var a;
			if (b !== undefined) {
				if (b.exec) {
					a = b
				} else {
					a = aJ[b];
					if (!a) {
						b = b.replace(ao.Dom._patterns.CLASS_RE_TOKENS, "\\$1");
						a = aJ[b] = new RegExp(ay + b + aG, Y)
					}
				}
			}
			return a
		},
		_patterns : {
			ROOT_TAG : /^body|html$/i,
			CLASS_RE_TOKENS : /([\.\(\)\^\$\*\+\?\|\[\]\{\}\\])/g
		},
		_testElement : function(a, b) {
			return a && a[aF] == 1 && (!b || b(a))
		},
		_calcBorders : function(a, d) {
			var c = parseInt(ao.Dom[au](a, ac), 10) || 0, b = parseInt(
					ao.Dom[au](a, aA), 10) || 0;
			if (am) {
				if (ag.test(a[aq])) {
					c = 0;
					b = 0
				}
			}
			d[0] += b;
			d[1] += c;
			return d
		}
	};
	var ab = ao.Dom[au];
	if (aE.opera) {
		ao.Dom[au] = function(c, b) {
			var a = ab(c, b);
			if (y.test(b)) {
				a = ao.Dom.Color.toRGB(a)
			}
			return a
		}
	}
	if (aE.webkit) {
		ao.Dom[au] = function(c, b) {
			var a = ab(c, b);
			if (a === "rgba(0, 0, 0, 0)") {
				a = "transparent"
			}
			return a
		}
	}
	if (aE.ie && aE.ie >= 8 && aj.documentElement.hasAttribute) {
		ao.Dom.DOT_ATTRIBUTES.type = true
	}
})();
YAHOO.util.Region = function(c, b, a, d) {
	this.top = c;
	this.y = c;
	this[1] = c;
	this.right = b;
	this.bottom = a;
	this.left = d;
	this.x = d;
	this[0] = d;
	this.width = this.right - this.left;
	this.height = this.bottom - this.top
};
YAHOO.util.Region.prototype.contains = function(a) {
	return (a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom)
};
YAHOO.util.Region.prototype.getArea = function() {
	return ((this.bottom - this.top) * (this.right - this.left))
};
YAHOO.util.Region.prototype.intersect = function(b) {
	var d = Math.max(this.top, b.top), c = Math.min(this.right, b.right), a = Math
			.min(this.bottom, b.bottom), e = Math.max(this.left, b.left);
	if (a >= d && c >= e) {
		return new YAHOO.util.Region(d, c, a, e)
	} else {
		return null
	}
};
YAHOO.util.Region.prototype.union = function(b) {
	var d = Math.min(this.top, b.top), c = Math.max(this.right, b.right), a = Math
			.max(this.bottom, b.bottom), e = Math.min(this.left, b.left);
	return new YAHOO.util.Region(d, c, a, e)
};
YAHOO.util.Region.prototype.toString = function() {
	return ("Region {top: " + this.top + ", right: " + this.right
			+ ", bottom: " + this.bottom + ", left: " + this.left
			+ ", height: " + this.height + ", width: " + this.width + "}")
};
YAHOO.util.Region.getRegion = function(d) {
	var b = YAHOO.util.Dom.getXY(d), e = b[1], c = b[0] + d.offsetWidth, a = b[1]
			+ d.offsetHeight, f = b[0];
	return new YAHOO.util.Region(e, c, a, f)
};
YAHOO.util.Point = function(a, b) {
	if (YAHOO.lang.isArray(a)) {
		b = a[1];
		a = a[0]
	}
	YAHOO.util.Point.superclass.constructor.call(this, b, a, b, a)
};
YAHOO.extend(YAHOO.util.Point, YAHOO.util.Region);
(function() {
	var v = YAHOO.util, w = "clientTop", r = "clientLeft", n = "parentNode", m = "right", a = "hasLayout", o = "px", c = "opacity", l = "auto", t = "borderLeftWidth", q = "borderTopWidth", h = "borderRightWidth", b = "borderBottomWidth", e = "visible", g = "transparent", j = "height", s = "width", p = "style", d = "currentStyle", f = /^width|height$/, i = /^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i, k = {
		get : function(A, y) {
			var z = "", x = A[d][y];
			if (y === c) {
				z = v.Dom.getStyle(A, c)
			} else {
				if (!x || (x.indexOf && x.indexOf(o) > -1)) {
					z = x
				} else {
					if (v.Dom.IE_COMPUTED[y]) {
						z = v.Dom.IE_COMPUTED[y](A, y)
					} else {
						if (i.test(x)) {
							z = v.Dom.IE.ComputedStyle.getPixel(A, y)
						} else {
							z = x
						}
					}
				}
			}
			return z
		},
		getOffset : function(A, z) {
			var x = A[d][z], E = z.charAt(0).toUpperCase() + z.substr(1), D = "offset"
					+ E, C = "pixel" + E, y = "", B;
			if (x == l) {
				B = A[D];
				if (B === undefined) {
					y = 0
				}
				y = B;
				if (f.test(z)) {
					A[p][z] = B;
					if (A[D] > B) {
						y = B - (A[D] - B)
					}
					A[p][z] = l
				}
			} else {
				if (!A[p][C] && !A[p][z]) {
					A[p][z] = x
				}
				y = A[p][C]
			}
			return y + o
		},
		getBorderWidth : function(z, x) {
			var y = null;
			if (!z[d][a]) {
				z[p].zoom = 1
			}
			switch (x) {
			case q:
				y = z[w];
				break;
			case b:
				y = z.offsetHeight - z.clientHeight - z[w];
				break;
			case t:
				y = z[r];
				break;
			case h:
				y = z.offsetWidth - z.clientWidth - z[r];
				break
			}
			return y + o
		},
		getPixel : function(A, B) {
			var y = null, x = A[d][m], z = A[d][B];
			A[p][m] = z;
			y = A[p].pixelRight;
			A[p][m] = x;
			return y + o
		},
		getMargin : function(y, z) {
			var x;
			if (y[d][z] == l) {
				x = 0 + o
			} else {
				x = v.Dom.IE.ComputedStyle.getPixel(y, z)
			}
			return x
		},
		getVisibility : function(y, z) {
			var x;
			while ((x = y[d]) && x[z] == "inherit") {
				y = y[n]
			}
			return (x) ? x[z] : e
		},
		getColor : function(x, y) {
			return v.Dom.Color.toRGB(x[d][y]) || g
		},
		getBorderColor : function(z, A) {
			var y = z[d], x = y[A] || y.color;
			return v.Dom.Color.toRGB(v.Dom.Color.toHex(x))
		}
	}, u = {};
	u.top = u.right = u.bottom = u.left = u[s] = u[j] = k.getOffset;
	u.color = k.getColor;
	u[q] = u[h] = u[b] = u[t] = k.getBorderWidth;
	u.marginTop = u.marginRight = u.marginBottom = u.marginLeft = k.getMargin;
	u.visibility = k.getVisibility;
	u.borderColor = u.borderTopColor = u.borderRightColor = u.borderBottomColor = u.borderLeftColor = k.getBorderColor;
	v.Dom.IE_COMPUTED = u;
	v.Dom.IE_ComputedStyle = k
})();
(function() {
	var c = "toString", a = parseInt, d = RegExp, b = YAHOO.util;
	b.Dom.Color = {
		KEYWORDS : {
			black : "000",
			silver : "c0c0c0",
			gray : "808080",
			white : "fff",
			maroon : "800000",
			red : "f00",
			purple : "800080",
			fuchsia : "f0f",
			green : "008000",
			lime : "0f0",
			olive : "808000",
			yellow : "ff0",
			navy : "000080",
			blue : "00f",
			teal : "008080",
			aqua : "0ff"
		},
		re_RGB : /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,
		re_hex : /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
		re_hex3 : /([0-9A-F])/gi,
		toRGB : function(e) {
			if (!b.Dom.Color.re_RGB.test(e)) {
				e = b.Dom.Color.toHex(e)
			}
			if (b.Dom.Color.re_hex.exec(e)) {
				e = "rgb("
						+ [ a(d.$1, 16), a(d.$2, 16), a(d.$3, 16) ].join(", ")
						+ ")"
			}
			return e
		},
		toHex : function(e) {
			e = b.Dom.Color.KEYWORDS[e] || e;
			if (b.Dom.Color.re_RGB.exec(e)) {
				var f = (d.$1.length === 1) ? "0" + d.$1 : Number(d.$1), g = (d.$2.length === 1) ? "0"
						+ d.$2
						: Number(d.$2), h = (d.$3.length === 1) ? "0" + d.$3
						: Number(d.$3);
				e = [ f[c](16), g[c](16), h[c](16) ].join("")
			}
			if (e.length < 6) {
				e = e.replace(b.Dom.Color.re_hex3, "$1$1")
			}
			if (e !== "transparent" && e.indexOf("#") < 0) {
				e = "#" + e
			}
			return e.toLowerCase()
		}
	}
}());
YAHOO.register("dom", YAHOO.util.Dom, {
	version : "2.8.0r4",
	build : "2449"
});
YAHOO.util.CustomEvent = function(d, e, f, a, c) {
	this.type = d;
	this.scope = e || window;
	this.silent = f;
	this.fireOnce = c;
	this.fired = false;
	this.firedWith = null;
	this.signature = a || YAHOO.util.CustomEvent.LIST;
	this.subscribers = [];
	if (!this.silent) {
	}
	var b = "_YUICEOnSubscribe";
	if (d !== b) {
		this.subscribeEvent = new YAHOO.util.CustomEvent(b, this, true)
	}
	this.lastError = null
};
YAHOO.util.CustomEvent.LIST = 0;
YAHOO.util.CustomEvent.FLAT = 1;
YAHOO.util.CustomEvent.prototype = {
	subscribe : function(d, c, b) {
		if (!d) {
			throw new Error("Invalid callback for subscriber to '" + this.type
					+ "'")
		}
		if (this.subscribeEvent) {
			this.subscribeEvent.fire(d, c, b)
		}
		var a = new YAHOO.util.Subscriber(d, c, b);
		if (this.fireOnce && this.fired) {
			this.notify(a, this.firedWith)
		} else {
			this.subscribers.push(a)
		}
	},
	unsubscribe : function(d, b) {
		if (!d) {
			return this.unsubscribeAll()
		}
		var c = false;
		for ( var f = 0, a = this.subscribers.length; f < a; ++f) {
			var e = this.subscribers[f];
			if (e && e.contains(d, b)) {
				this._delete(f);
				c = true
			}
		}
		return c
	},
	fire : function() {
		this.lastError = null;
		var b = [], a = this.subscribers.length;
		var f = [].slice.call(arguments, 0), g = true, d, h = false;
		if (this.fireOnce) {
			if (this.fired) {
				return true
			} else {
				this.firedWith = f
			}
		}
		this.fired = true;
		if (!a && this.silent) {
			return true
		}
		if (!this.silent) {
		}
		var e = this.subscribers.slice();
		for (d = 0; d < a; ++d) {
			var c = e[d];
			if (!c) {
				h = true
			} else {
				g = this.notify(c, f);
				if (false === g) {
					if (!this.silent) {
					}
					break
				}
			}
		}
		return (g !== false)
	},
	notify : function(d, g) {
		var h, b = null, e = d.getScope(this.scope), a = YAHOO.util.Event.throwErrors;
		if (!this.silent) {
		}
		if (this.signature == YAHOO.util.CustomEvent.FLAT) {
			if (g.length > 0) {
				b = g[0]
			}
			try {
				h = d.fn.call(e, b, d.obj)
			} catch (c) {
				this.lastError = c;
				if (a) {
					throw c
				}
			}
		} else {
			try {
				h = d.fn.call(e, this.type, g, d.obj)
			} catch (f) {
				this.lastError = f;
				if (a) {
					throw f
				}
			}
		}
		return h
	},
	unsubscribeAll : function() {
		var a = this.subscribers.length, b;
		for (b = a - 1; b > -1; b--) {
			this._delete(b)
		}
		this.subscribers = [];
		return a
	},
	_delete : function(a) {
		var b = this.subscribers[a];
		if (b) {
			delete b.fn;
			delete b.obj
		}
		this.subscribers.splice(a, 1)
	},
	toString : function() {
		return "CustomEvent: '" + this.type + "', context: " + this.scope
	}
};
YAHOO.util.Subscriber = function(a, c, b) {
	this.fn = a;
	this.obj = YAHOO.lang.isUndefined(c) ? null : c;
	this.overrideContext = b
};
YAHOO.util.Subscriber.prototype.getScope = function(a) {
	if (this.overrideContext) {
		if (this.overrideContext === true) {
			return this.obj
		} else {
			return this.overrideContext
		}
	}
	return a
};
YAHOO.util.Subscriber.prototype.contains = function(a, b) {
	if (b) {
		return (this.fn == a && this.obj == b)
	} else {
		return (this.fn == a)
	}
};
YAHOO.util.Subscriber.prototype.toString = function() {
	return "Subscriber { obj: " + this.obj + ", overrideContext: "
			+ (this.overrideContext || "no") + " }"
};
if (!YAHOO.util.Event) {
	YAHOO.util.Event = function() {
		var h = false, g = [], e = [], d = 0, j = [], c = 0, b = {
			63232 : 38,
			63233 : 40,
			63234 : 37,
			63235 : 39,
			63276 : 33,
			63277 : 34,
			25 : 9
		}, a = YAHOO.env.ua.ie, i = "focusin", f = "focusout";
		return {
			POLL_RETRYS : 500,
			POLL_INTERVAL : 40,
			EL : 0,
			TYPE : 1,
			FN : 2,
			WFN : 3,
			UNLOAD_OBJ : 3,
			ADJ_SCOPE : 4,
			OBJ : 5,
			OVERRIDE : 6,
			CAPTURE : 7,
			lastError : null,
			isSafari : YAHOO.env.ua.webkit,
			webkit : YAHOO.env.ua.webkit,
			isIE : a,
			_interval : null,
			_dri : null,
			_specialTypes : {
				focusin : (a ? "focusin" : "focus"),
				focusout : (a ? "focusout" : "blur")
			},
			DOMReady : false,
			throwErrors : false,
			startInterval : function() {
				if (!this._interval) {
					this._interval = YAHOO.lang.later(this.POLL_INTERVAL, this,
							this._tryPreloadAttach, null, true)
				}
			},
			onAvailable : function(m, q, o, n, p) {
				var l = (YAHOO.lang.isString(m)) ? [ m ] : m;
				for ( var k = 0; k < l.length; k = k + 1) {
					j.push({
						id : l[k],
						fn : q,
						obj : o,
						overrideContext : n,
						checkReady : p
					})
				}
				d = this.POLL_RETRYS;
				this.startInterval()
			},
			onContentReady : function(m, l, k, n) {
				this.onAvailable(m, l, k, n, true)
			},
			onDOMReady : function() {
				this.DOMReadyEvent.subscribe.apply(this.DOMReadyEvent,
						arguments)
			},
			_addListener : function(w, y, n, t, p, k) {
				if (!n || !n.call) {
					return false
				}
				if (this._isValidCollection(w)) {
					var m = true;
					for ( var s = 0, q = w.length; s < q; ++s) {
						m = this.on(w[s], y, n, t, p) && m
					}
					return m
				} else {
					if (YAHOO.lang.isString(w)) {
						var u = this.getEl(w);
						if (u) {
							w = u
						} else {
							this.onAvailable(w, function() {
								YAHOO.util.Event._addListener(w, y, n, t, p, k)
							});
							return true
						}
					}
				}
				if (!w) {
					return false
				}
				if ("unload" == y && t !== this) {
					e[e.length] = [ w, y, n, t, p ];
					return true
				}
				var x = w;
				if (p) {
					if (p === true) {
						x = t
					} else {
						x = p
					}
				}
				var v = function(z) {
					return n.call(x, YAHOO.util.Event.getEvent(z, w), t)
				};
				var l = [ w, y, n, v, x, t, p, k ];
				var r = g.length;
				g[r] = l;
				try {
					this._simpleAdd(w, y, v, k)
				} catch (o) {
					this.lastError = o;
					this.removeListener(w, y, n);
					return false
				}
				return true
			},
			_getType : function(k) {
				return this._specialTypes[k] || k
			},
			addListener : function(p, m, k, o, n) {
				var l = ((m == i || m == f) && !YAHOO.env.ua.ie) ? true : false;
				return this._addListener(p, this._getType(m), k, o, n, l)
			},
			addFocusListener : function(k, l, n, m) {
				return this.on(k, i, l, n, m)
			},
			removeFocusListener : function(k, l) {
				return this.removeListener(k, i, l)
			},
			addBlurListener : function(k, l, n, m) {
				return this.on(k, f, l, n, m)
			},
			removeBlurListener : function(k, l) {
				return this.removeListener(k, f, l)
			},
			removeListener : function(t, u, n) {
				var s, p, k;
				u = this._getType(u);
				if (typeof t == "string") {
					t = this.getEl(t)
				} else {
					if (this._isValidCollection(t)) {
						var m = true;
						for (s = t.length - 1; s > -1; s--) {
							m = (this.removeListener(t[s], u, n) && m)
						}
						return m
					}
				}
				if (!n || !n.call) {
					return this.purgeElement(t, false, u)
				}
				if ("unload" == u) {
					for (s = e.length - 1; s > -1; s--) {
						k = e[s];
						if (k && k[0] == t && k[1] == u && k[2] == n) {
							e.splice(s, 1);
							return true
						}
					}
					return false
				}
				var r = null;
				var q = arguments[3];
				if ("undefined" === typeof q) {
					q = this._getCacheIndex(g, t, u, n)
				}
				if (q >= 0) {
					r = g[q]
				}
				if (!t || !r) {
					return false
				}
				var l = r[this.CAPTURE] === true ? true : false;
				try {
					this._simpleRemove(t, u, r[this.WFN], l)
				} catch (o) {
					this.lastError = o;
					return false
				}
				delete g[q][this.WFN];
				delete g[q][this.FN];
				g.splice(q, 1);
				return true
			},
			getTarget : function(m, k) {
				var l = m.target || m.srcElement;
				return this.resolveTextNode(l)
			},
			resolveTextNode : function(k) {
				try {
					if (k && 3 == k.nodeType) {
						return k.parentNode
					}
				} catch (l) {
				}
				return k
			},
			getPageX : function(k) {
				var l = k.pageX;
				if (!l && 0 !== l) {
					l = k.clientX || 0;
					if (this.isIE) {
						l += this._getScrollLeft()
					}
				}
				return l
			},
			getPageY : function(l) {
				var k = l.pageY;
				if (!k && 0 !== k) {
					k = l.clientY || 0;
					if (this.isIE) {
						k += this._getScrollTop()
					}
				}
				return k
			},
			getXY : function(k) {
				return [ this.getPageX(k), this.getPageY(k) ]
			},
			getRelatedTarget : function(k) {
				var l = k.relatedTarget;
				if (!l) {
					if (k.type == "mouseout") {
						l = k.toElement
					} else {
						if (k.type == "mouseover") {
							l = k.fromElement
						}
					}
				}
				return this.resolveTextNode(l)
			},
			getTime : function(m) {
				if (!m.time) {
					var k = new Date().getTime();
					try {
						m.time = k
					} catch (l) {
						this.lastError = l;
						return k
					}
				}
				return m.time
			},
			stopEvent : function(k) {
				this.stopPropagation(k);
				this.preventDefault(k)
			},
			stopPropagation : function(k) {
				if (k.stopPropagation) {
					k.stopPropagation()
				} else {
					k.cancelBubble = true
				}
			},
			preventDefault : function(k) {
				if (k.preventDefault) {
					k.preventDefault()
				} else {
					k.returnValue = false
				}
			},
			getEvent : function(n, l) {
				var k = n || window.event;
				if (!k) {
					var m = this.getEvent.caller;
					while (m) {
						k = m.arguments[0];
						if (k && Event == k.constructor) {
							break
						}
						m = m.caller
					}
				}
				return k
			},
			getCharCode : function(k) {
				var l = k.keyCode || k.charCode || 0;
				if (YAHOO.env.ua.webkit && (l in b)) {
					l = b[l]
				}
				return l
			},
			_getCacheIndex : function(q, n, m, o) {
				for ( var p = 0, k = q.length; p < k; p = p + 1) {
					var l = q[p];
					if (l && l[this.FN] == o && l[this.EL] == n
							&& l[this.TYPE] == m) {
						return p
					}
				}
				return -1
			},
			generateId : function(l) {
				var k = l.id;
				if (!k) {
					k = "yuievtautoid-" + c;
					++c;
					l.id = k
				}
				return k
			},
			_isValidCollection : function(k) {
				try {
					return (k && typeof k !== "string" && k.length
							&& !k.tagName && !k.alert && typeof k[0] !== "undefined")
				} catch (l) {
					return false
				}
			},
			elCache : {},
			getEl : function(k) {
				return (typeof k === "string") ? document.getElementById(k) : k
			},
			clearCache : function() {
			},
			DOMReadyEvent : new YAHOO.util.CustomEvent("DOMReady", YAHOO, 0, 0,
					1),
			_load : function(k) {
				if (!h) {
					h = true;
					var l = YAHOO.util.Event;
					l._ready();
					l._tryPreloadAttach()
				}
			},
			_ready : function(k) {
				var l = YAHOO.util.Event;
				if (!l.DOMReady) {
					l.DOMReady = true;
					l.DOMReadyEvent.fire();
					l._simpleRemove(document, "DOMContentLoaded", l._ready)
				}
			},
			_tryPreloadAttach : function() {
				if (j.length === 0) {
					d = 0;
					if (this._interval) {
						this._interval.cancel();
						this._interval = null
					}
					return
				}
				if (this.locked) {
					return
				}
				if (this.isIE) {
					if (!this.DOMReady) {
						this.startInterval();
						return
					}
				}
				this.locked = true;
				var n = !h;
				if (!n) {
					n = (d > 0 && j.length > 0)
				}
				var o = [];
				var m = function(t, s) {
					var u = t;
					if (s.overrideContext) {
						if (s.overrideContext === true) {
							u = s.obj
						} else {
							u = s.overrideContext
						}
					}
					s.fn.call(u, s.obj)
				};
				var k, l, p, q, r = [];
				for (k = 0, l = j.length; k < l; k = k + 1) {
					p = j[k];
					if (p) {
						q = this.getEl(p.id);
						if (q) {
							if (p.checkReady) {
								if (h || q.nextSibling || !n) {
									r.push(p);
									j[k] = null
								}
							} else {
								m(q, p);
								j[k] = null
							}
						} else {
							o.push(p)
						}
					}
				}
				for (k = 0, l = r.length; k < l; k = k + 1) {
					p = r[k];
					m(this.getEl(p.id), p)
				}
				d--;
				if (n) {
					for (k = j.length - 1; k > -1; k--) {
						p = j[k];
						if (!p || !p.id) {
							j.splice(k, 1)
						}
					}
					this.startInterval()
				} else {
					if (this._interval) {
						this._interval.cancel();
						this._interval = null
					}
				}
				this.locked = false
			},
			purgeElement : function(p, o, m) {
				var r = (YAHOO.lang.isString(p)) ? this.getEl(p) : p;
				var n = this.getListeners(r, m), q, l;
				if (n) {
					for (q = n.length - 1; q > -1; q--) {
						var k = n[q];
						this.removeListener(r, k.type, k.fn)
					}
				}
				if (o && r && r.childNodes) {
					for (q = 0, l = r.childNodes.length; q < l; ++q) {
						this.purgeElement(r.childNodes[q], o, m)
					}
				}
			},
			getListeners : function(r, t) {
				var o = [], s;
				if (!t) {
					s = [ g, e ]
				} else {
					if (t === "unload") {
						s = [ e ]
					} else {
						t = this._getType(t);
						s = [ g ]
					}
				}
				var m = (YAHOO.lang.isString(r)) ? this.getEl(r) : r;
				for ( var p = 0; p < s.length; p = p + 1) {
					var k = s[p];
					if (k) {
						for ( var n = 0, l = k.length; n < l; ++n) {
							var q = k[n];
							if (q && q[this.EL] === m
									&& (!t || t === q[this.TYPE])) {
								o.push({
									type : q[this.TYPE],
									fn : q[this.FN],
									obj : q[this.OBJ],
									adjust : q[this.OVERRIDE],
									scope : q[this.ADJ_SCOPE],
									index : n
								})
							}
						}
					}
				}
				return (o.length) ? o : null
			},
			_unload : function(l) {
				var r = YAHOO.util.Event, o, p, q, m, n, k = e.slice(), s;
				for (o = 0, m = e.length; o < m; ++o) {
					q = k[o];
					if (q) {
						s = window;
						if (q[r.ADJ_SCOPE]) {
							if (q[r.ADJ_SCOPE] === true) {
								s = q[r.UNLOAD_OBJ]
							} else {
								s = q[r.ADJ_SCOPE]
							}
						}
						q[r.FN]
								.call(s, r.getEvent(l, q[r.EL]),
										q[r.UNLOAD_OBJ]);
						k[o] = null
					}
				}
				q = null;
				s = null;
				e = null;
				if (g) {
					for (p = g.length - 1; p > -1; p--) {
						q = g[p];
						if (q) {
							r.removeListener(q[r.EL], q[r.TYPE], q[r.FN], p)
						}
					}
					q = null
				}
				r._simpleRemove(window, "unload", r._unload)
			},
			_getScrollLeft : function() {
				return this._getScroll()[1]
			},
			_getScrollTop : function() {
				return this._getScroll()[0]
			},
			_getScroll : function() {
				var l = document.documentElement, k = document.body;
				if (l && (l.scrollTop || l.scrollLeft)) {
					return [ l.scrollTop, l.scrollLeft ]
				} else {
					if (k) {
						return [ k.scrollTop, k.scrollLeft ]
					} else {
						return [ 0, 0 ]
					}
				}
			},
			regCE : function() {
			},
			_simpleAdd : function() {
				if (window.addEventListener) {
					return function(n, m, k, l) {
						n.addEventListener(m, k, (l))
					}
				} else {
					if (window.attachEvent) {
						return function(n, m, k, l) {
							n.attachEvent("on" + m, k)
						}
					} else {
						return function() {
						}
					}
				}
			}(),
			_simpleRemove : function() {
				if (window.removeEventListener) {
					return function(n, m, k, l) {
						n.removeEventListener(m, k, (l))
					}
				} else {
					if (window.detachEvent) {
						return function(k, m, l) {
							k.detachEvent("on" + m, l)
						}
					} else {
						return function() {
						}
					}
				}
			}()
		}
	}();
	(function() {
		var a = YAHOO.util.Event;
		a.on = a.addListener;
		a.onFocus = a.addFocusListener;
		a.onBlur = a.addBlurListener;
		if (a.isIE) {
			if (self !== self.top) {
				document.onreadystatechange = function() {
					if (document.readyState == "complete") {
						document.onreadystatechange = null;
						a._ready()
					}
				}
			} else {
				YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,
						YAHOO.util.Event, true);
				var b = document.createElement("p");
				a._dri = setInterval(function() {
					try {
						b.doScroll("left");
						clearInterval(a._dri);
						a._dri = null;
						a._ready();
						b = null
					} catch (c) {
					}
				}, a.POLL_INTERVAL)
			}
		} else {
			if (a.webkit && a.webkit < 525) {
				a._dri = setInterval(function() {
					var c = document.readyState;
					if ("loaded" == c || "complete" == c) {
						clearInterval(a._dri);
						a._dri = null;
						a._ready()
					}
				}, a.POLL_INTERVAL)
			} else {
				a._simpleAdd(document, "DOMContentLoaded", a._ready)
			}
		}
		a._simpleAdd(window, "load", a._load);
		a._simpleAdd(window, "unload", a._unload);
		a._tryPreloadAttach()
	})()
}
YAHOO.util.EventProvider = function() {
};
YAHOO.util.EventProvider.prototype = {
	__yui_events : null,
	__yui_subscribers : null,
	subscribe : function(a, e, b, c) {
		this.__yui_events = this.__yui_events || {};
		var d = this.__yui_events[a];
		if (d) {
			d.subscribe(e, b, c)
		} else {
			this.__yui_subscribers = this.__yui_subscribers || {};
			var f = this.__yui_subscribers;
			if (!f[a]) {
				f[a] = []
			}
			f[a].push({
				fn : e,
				obj : b,
				overrideContext : c
			})
		}
	},
	unsubscribe : function(f, d, b) {
		this.__yui_events = this.__yui_events || {};
		var a = this.__yui_events;
		if (f) {
			var c = a[f];
			if (c) {
				return c.unsubscribe(d, b)
			}
		} else {
			var g = true;
			for ( var e in a) {
				if (YAHOO.lang.hasOwnProperty(a, e)) {
					g = g && a[e].unsubscribe(d, b)
				}
			}
			return g
		}
		return false
	},
	unsubscribeAll : function(a) {
		return this.unsubscribe(a)
	},
	createEvent : function(g, b) {
		this.__yui_events = this.__yui_events || {};
		var d = b || {}, e = this.__yui_events, c;
		if (e[g]) {
		} else {
			c = new YAHOO.util.CustomEvent(g, d.scope || this, d.silent,
					YAHOO.util.CustomEvent.FLAT, d.fireOnce);
			e[g] = c;
			if (d.onSubscribeCallback) {
				c.subscribeEvent.subscribe(d.onSubscribeCallback)
			}
			this.__yui_subscribers = this.__yui_subscribers || {};
			var a = this.__yui_subscribers[g];
			if (a) {
				for ( var f = 0; f < a.length; ++f) {
					c.subscribe(a[f].fn, a[f].obj, a[f].overrideContext)
				}
			}
		}
		return e[g]
	},
	fireEvent : function(d) {
		this.__yui_events = this.__yui_events || {};
		var b = this.__yui_events[d];
		if (!b) {
			return null
		}
		var a = [];
		for ( var c = 1; c < arguments.length; ++c) {
			a.push(arguments[c])
		}
		return b.fire.apply(b, a)
	},
	hasEvent : function(a) {
		if (this.__yui_events) {
			if (this.__yui_events[a]) {
				return true
			}
		}
		return false
	}
};
(function() {
	var a = YAHOO.util.Event, b = YAHOO.lang;
	YAHOO.util.KeyListener = function(i, d, h, g) {
		if (!i) {
		} else {
			if (!d) {
			} else {
				if (!h) {
				}
			}
		}
		if (!g) {
			g = YAHOO.util.KeyListener.KEYDOWN
		}
		var f = new YAHOO.util.CustomEvent("keyPressed");
		this.enabledEvent = new YAHOO.util.CustomEvent("enabled");
		this.disabledEvent = new YAHOO.util.CustomEvent("disabled");
		if (b.isString(i)) {
			i = document.getElementById(i)
		}
		if (b.isFunction(h)) {
			f.subscribe(h)
		} else {
			f.subscribe(h.fn, h.scope, h.correctScope)
		}
		function e(m, n) {
			if (!d.shift) {
				d.shift = false
			}
			if (!d.alt) {
				d.alt = false
			}
			if (!d.ctrl) {
				d.ctrl = false
			}
			if (m.shiftKey == d.shift && m.altKey == d.alt
					&& m.ctrlKey == d.ctrl) {
				var l, o = d.keys, j;
				if (YAHOO.lang.isArray(o)) {
					for ( var k = 0; k < o.length; k++) {
						l = o[k];
						j = a.getCharCode(m);
						if (l == j) {
							f.fire(j, m);
							break
						}
					}
				} else {
					j = a.getCharCode(m);
					if (o == j) {
						f.fire(j, m)
					}
				}
			}
		}
		this.enable = function() {
			if (!this.enabled) {
				a.on(i, g, e);
				this.enabledEvent.fire(d)
			}
			this.enabled = true
		};
		this.disable = function() {
			if (this.enabled) {
				a.removeListener(i, g, e);
				this.disabledEvent.fire(d)
			}
			this.enabled = false
		};
		this.toString = function() {
			return "KeyListener [" + d.keys + "] " + i.tagName
					+ (i.id ? "[" + i.id + "]" : "")
		}
	};
	var c = YAHOO.util.KeyListener;
	c.KEYDOWN = "keydown";
	c.KEYUP = "keyup";
	c.KEY = {
		ALT : 18,
		BACK_SPACE : 8,
		CAPS_LOCK : 20,
		CONTROL : 17,
		DELETE : 46,
		DOWN : 40,
		END : 35,
		ENTER : 13,
		ESCAPE : 27,
		HOME : 36,
		LEFT : 37,
		META : 224,
		NUM_LOCK : 144,
		PAGE_DOWN : 34,
		PAGE_UP : 33,
		PAUSE : 19,
		PRINTSCREEN : 44,
		RIGHT : 39,
		SCROLL_LOCK : 145,
		SHIFT : 16,
		SPACE : 32,
		TAB : 9,
		UP : 38
	}
})();
YAHOO.register("event", YAHOO.util.Event, {
	version : "2.8.0r4",
	build : "2449"
});
YAHOO.register("yahoo-dom-event", YAHOO, {
	version : "2.8.0r4",
	build : "2449"
});
(function() {
	var l = YAHOO.lang, isFunction = l.isFunction, isObject = l.isObject, isArray = l.isArray, _toStr = Object.prototype.toString, Native = (YAHOO.env.ua.caja ? window
			: this).JSON, _UNICODE_EXCEPTIONS = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, _ESCAPES = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, _VALUES = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, _BRACKETS = /(?:^|:|,)(?:\s*\[)+/g, _UNSAFE = /^[\],:{}\s]*$/, _SPECIAL_CHARS = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, _CHARS = {
		"\b" : "\\b",
		"\t" : "\\t",
		"\n" : "\\n",
		"\f" : "\\f",
		"\r" : "\\r",
		'"' : '\\"',
		"\\" : "\\\\"
	}, UNDEFINED = "undefined", OBJECT = "object", NULL = "null", STRING = "string", NUMBER = "number", BOOLEAN = "boolean", DATE = "date", _allowable = {
		"undefined" : UNDEFINED,
		string : STRING,
		"[object String]" : STRING,
		number : NUMBER,
		"[object Number]" : NUMBER,
		"boolean" : BOOLEAN,
		"[object Boolean]" : BOOLEAN,
		"[object Date]" : DATE,
		"[object RegExp]" : OBJECT
	}, EMPTY = "", OPEN_O = "{", CLOSE_O = "}", OPEN_A = "[", CLOSE_A = "]", COMMA = ",", COMMA_CR = ",\n", CR = "\n", COLON = ":", COLON_SP = ": ", QUOTE = '"';
	Native = _toStr.call(Native) === "[object JSON]" && Native;
	function _char(c) {
		if (!_CHARS[c]) {
			_CHARS[c] = "\\u"
					+ ("0000" + (+(c.charCodeAt(0))).toString(16)).slice(-4)
		}
		return _CHARS[c]
	}
	function _revive(data, reviver) {
		var walk = function(o, key) {
			var k, v, value = o[key];
			if (value && typeof value === "object") {
				for (k in value) {
					if (l.hasOwnProperty(value, k)) {
						v = walk(value, k);
						if (v === undefined) {
							delete value[k]
						} else {
							value[k] = v
						}
					}
				}
			}
			return reviver.call(o, key, value)
		};
		return typeof reviver === "function" ? walk({
			"" : data
		}, "") : data
	}
	function _prepare(s) {
		return s.replace(_UNICODE_EXCEPTIONS, _char)
	}
	function _isSafe(str) {
		return l.isString(str)
				&& _UNSAFE.test(str.replace(_ESCAPES, "@")
						.replace(_VALUES, "]").replace(_BRACKETS, ""))
	}
	function _parse(s, reviver) {
		s = _prepare(s);
		if (_isSafe(s)) {
			return _revive(eval("(" + s + ")"), reviver)
		}
		throw new SyntaxError("JSON.parse")
	}
	function _type(o) {
		var t = typeof o;
		return _allowable[t] || _allowable[_toStr.call(o)]
				|| (t === OBJECT ? (o ? OBJECT : NULL) : UNDEFINED)
	}
	function _string(s) {
		return QUOTE + s.replace(_SPECIAL_CHARS, _char) + QUOTE
	}
	function _indent(s, space) {
		return s.replace(/^/gm, space)
	}
	function _stringify(o, w, space) {
		if (o === undefined) {
			return undefined
		}
		var replacer = isFunction(w) ? w : null, format = _toStr.call(space)
				.match(/String|Number/)
				|| [], _date = YAHOO.lang.JSON.dateToString, stack = [], tmp, i, len;
		if (replacer || !isArray(w)) {
			w = undefined
		}
		if (w) {
			tmp = {};
			for (i = 0, len = w.length; i < len; ++i) {
				tmp[w[i]] = true
			}
			w = tmp
		}
		space = format[0] === "Number" ? new Array(Math.min(Math.max(0, space),
				10) + 1).join(" ") : (space || EMPTY).slice(0, 10);
		function _serialize(h, key) {
			var value = h[key], t = _type(value), a = [], colon = space ? COLON_SP
					: COLON, arr, i, keys, k, v;
			if (isObject(value) && isFunction(value.toJSON)) {
				value = value.toJSON(key)
			} else {
				if (t === DATE) {
					value = _date(value)
				}
			}
			if (isFunction(replacer)) {
				value = replacer.call(h, key, value)
			}
			if (value !== h[key]) {
				t = _type(value)
			}
			switch (t) {
			case DATE:
			case OBJECT:
				break;
			case STRING:
				return _string(value);
			case NUMBER:
				return isFinite(value) ? value + EMPTY : NULL;
			case BOOLEAN:
				return value + EMPTY;
			case NULL:
				return NULL;
			default:
				return undefined
			}
			for (i = stack.length - 1; i >= 0; --i) {
				if (stack[i] === value) {
					throw new Error("JSON.stringify. Cyclical reference")
				}
			}
			arr = isArray(value);
			stack.push(value);
			if (arr) {
				for (i = value.length - 1; i >= 0; --i) {
					a[i] = _serialize(value, i) || NULL
				}
			} else {
				keys = w || value;
				i = 0;
				for (k in keys) {
					if (keys.hasOwnProperty(k)) {
						v = _serialize(value, k);
						if (v) {
							a[i++] = _string(k) + colon + v
						}
					}
				}
			}
			stack.pop();
			if (space && a.length) {
				return arr ? OPEN_A + CR + _indent(a.join(COMMA_CR), space)
						+ CR + CLOSE_A : OPEN_O + CR
						+ _indent(a.join(COMMA_CR), space) + CR + CLOSE_O
			} else {
				return arr ? OPEN_A + a.join(COMMA) + CLOSE_A : OPEN_O
						+ a.join(COMMA) + CLOSE_O
			}
		}
		return _serialize({
			"" : o
		}, "")
	}
	YAHOO.lang.JSON = {
		useNativeParse : !!Native,
		useNativeStringify : !!Native,
		isSafe : function(s) {
			return _isSafe(_prepare(s))
		},
		parse : function(s, reviver) {
			return Native && YAHOO.lang.JSON.useNativeParse ? Native.parse(s,
					reviver) : _parse(s, reviver)
		},
		stringify : function(o, w, space) {
			return Native && YAHOO.lang.JSON.useNativeStringify ? Native
					.stringify(o, w, space) : _stringify(o, w, space)
		},
		dateToString : function(d) {
			function _zeroPad(v) {
				return v < 10 ? "0" + v : v
			}
			return d.getUTCFullYear() + "-" + _zeroPad(d.getUTCMonth() + 1)
					+ "-" + _zeroPad(d.getUTCDate()) + "T"
					+ _zeroPad(d.getUTCHours()) + COLON
					+ _zeroPad(d.getUTCMinutes()) + COLON
					+ _zeroPad(d.getUTCSeconds()) + "Z"
		},
		stringToDate : function(str) {
			var m = str
					.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?Z$/);
			if (m) {
				var d = new Date();
				d.setUTCFullYear(m[1], m[2] - 1, m[3]);
				d.setUTCHours(m[4], m[5], m[6], (m[7] || 0));
				return d
			}
			return str
		}
	};
	YAHOO.lang.JSON.isValid = YAHOO.lang.JSON.isSafe
})();
YAHOO.register("json", YAHOO.lang.JSON, {
	version : "2.8.0r4",
	build : "2449"
});
YAHOO.util.Connect = {
	_msxml_progid : [ "Microsoft.XMLHTTP", "MSXML2.XMLHTTP.3.0",
			"MSXML2.XMLHTTP" ],
	_http_headers : {},
	_has_http_headers : false,
	_use_default_post_header : true,
	_default_post_header : "application/x-www-form-urlencoded; charset=UTF-8",
	_default_form_header : "application/x-www-form-urlencoded",
	_use_default_xhr_header : true,
	_default_xhr_header : "XMLHttpRequest",
	_has_default_headers : true,
	_default_headers : {},
	_poll : {},
	_timeOut : {},
	_polling_interval : 50,
	_transaction_id : 0,
	startEvent : new YAHOO.util.CustomEvent("start"),
	completeEvent : new YAHOO.util.CustomEvent("complete"),
	successEvent : new YAHOO.util.CustomEvent("success"),
	failureEvent : new YAHOO.util.CustomEvent("failure"),
	abortEvent : new YAHOO.util.CustomEvent("abort"),
	_customEvents : {
		onStart : [ "startEvent", "start" ],
		onComplete : [ "completeEvent", "complete" ],
		onSuccess : [ "successEvent", "success" ],
		onFailure : [ "failureEvent", "failure" ],
		onUpload : [ "uploadEvent", "upload" ],
		onAbort : [ "abortEvent", "abort" ]
	},
	setProgId : function(a) {
		this._msxml_progid.unshift(a)
	},
	setDefaultPostHeader : function(a) {
		if (typeof a == "string") {
			this._default_post_header = a
		} else {
			if (typeof a == "boolean") {
				this._use_default_post_header = a
			}
		}
	},
	setDefaultXhrHeader : function(a) {
		if (typeof a == "string") {
			this._default_xhr_header = a
		} else {
			this._use_default_xhr_header = a
		}
	},
	setPollingInterval : function(a) {
		if (typeof a == "number" && isFinite(a)) {
			this._polling_interval = a
		}
	},
	createXhrObject : function(b) {
		var d, a, f;
		try {
			a = new XMLHttpRequest();
			d = {
				conn : a,
				tId : b,
				xhr : true
			}
		} catch (e) {
			for (f = 0; f < this._msxml_progid.length; ++f) {
				try {
					a = new ActiveXObject(this._msxml_progid[f]);
					d = {
						conn : a,
						tId : b,
						xhr : true
					};
					break
				} catch (c) {
				}
			}
		} finally {
			return d
		}
	},
	getConnectionObject : function(a) {
		var c, b = this._transaction_id;
		try {
			if (!a) {
				c = this.createXhrObject(b)
			} else {
				c = {
					tId : b
				};
				if (a === "xdr") {
					c.conn = this._transport;
					c.xdr = true
				} else {
					if (a === "upload") {
						c.upload = true
					}
				}
			}
			if (c) {
				this._transaction_id++
			}
		} catch (d) {
		}
		return c
	},
	asyncRequest : function(b, e, c, a) {
		var d, f, g = (c && c.argument) ? c.argument : null;
		if (this._isFileUpload) {
			f = "upload"
		} else {
			if (c.xdr) {
				f = "xdr"
			}
		}
		d = this.getConnectionObject(f);
		if (!d) {
			return null
		} else {
			if (c && c.customevents) {
				this.initCustomEvents(d, c)
			}
			if (this._isFormSubmit) {
				if (this._isFileUpload) {
					this.uploadFile(d, c, e, a);
					return d
				}
				if (b.toUpperCase() == "GET") {
					if (this._sFormData.length !== 0) {
						e += ((e.indexOf("?") == -1) ? "?" : "&")
								+ this._sFormData
					}
				} else {
					if (b.toUpperCase() == "POST") {
						a = a ? this._sFormData + "&" + a : this._sFormData
					}
				}
			}
			if (b.toUpperCase() == "GET" && (c && c.cache === false)) {
				e += ((e.indexOf("?") == -1) ? "?" : "&") + "rnd="
						+ new Date().valueOf().toString()
			}
			if (this._use_default_xhr_header) {
				if (!this._default_headers["X-Requested-With"]) {
					this.initHeader("X-Requested-With",
							this._default_xhr_header, true)
				}
			}
			if ((b.toUpperCase() === "POST" && this._use_default_post_header)
					&& this._isFormSubmit === false) {
				this.initHeader("Content-Type", this._default_post_header)
			}
			if (d.xdr) {
				this.xdr(d, b, e, c, a);
				return d
			}
			d.conn.open(b, e, true);
			if (this._has_default_headers || this._has_http_headers) {
				this.setHeader(d)
			}
			this.handleReadyState(d, c);
			d.conn.send(a || "");
			if (this._isFormSubmit === true) {
				this.resetFormState()
			}
			this.startEvent.fire(d, g);
			if (d.startEvent) {
				d.startEvent.fire(d, g)
			}
			return d
		}
	},
	initCustomEvents : function(a, b) {
		var c;
		for (c in b.customevents) {
			if (this._customEvents[c][0]) {
				a[this._customEvents[c][0]] = new YAHOO.util.CustomEvent(
						this._customEvents[c][1], (b.scope) ? b.scope : null);
				a[this._customEvents[c][0]].subscribe(b.customevents[c])
			}
		}
	},
	handleReadyState : function(c, b) {
		var d = this, a = (b && b.argument) ? b.argument : null;
		if (b && b.timeout) {
			this._timeOut[c.tId] = window.setTimeout(function() {
				d.abort(c, b, true)
			}, b.timeout)
		}
		this._poll[c.tId] = window.setInterval(function() {
			if (c.conn && c.conn.readyState === 4) {
				window.clearInterval(d._poll[c.tId]);
				delete d._poll[c.tId];
				if (b && b.timeout) {
					window.clearTimeout(d._timeOut[c.tId]);
					delete d._timeOut[c.tId]
				}
				d.completeEvent.fire(c, a);
				if (c.completeEvent) {
					c.completeEvent.fire(c, a)
				}
				d.handleTransactionResponse(c, b)
			}
		}, this._polling_interval)
	},
	handleTransactionResponse : function(c, f, a) {
		var j, d, h = (f && f.argument) ? f.argument : null, b = (c.r && c.r.statusText === "xdr:success") ? true
				: false, g = (c.r && c.r.statusText === "xdr:failure") ? true
				: false, e = a;
		try {
			if ((c.conn.status !== undefined && c.conn.status !== 0) || b) {
				j = c.conn.status
			} else {
				if (g && !e) {
					j = 0
				} else {
					j = 13030
				}
			}
		} catch (i) {
			j = 13030
		}
		if ((j >= 200 && j < 300) || j === 1223 || b) {
			d = c.xdr ? c.r : this.createResponseObject(c, h);
			if (f && f.success) {
				if (!f.scope) {
					f.success(d)
				} else {
					f.success.apply(f.scope, [ d ])
				}
			}
			this.successEvent.fire(d);
			if (c.successEvent) {
				c.successEvent.fire(d)
			}
		} else {
			switch (j) {
			case 12002:
			case 12029:
			case 12030:
			case 12031:
			case 12152:
			case 13030:
				d = this.createExceptionObject(c.tId, h, (a ? a : false));
				if (f && f.failure) {
					if (!f.scope) {
						f.failure(d)
					} else {
						f.failure.apply(f.scope, [ d ])
					}
				}
				break;
			default:
				d = (c.xdr) ? c.response : this.createResponseObject(c, h);
				if (f && f.failure) {
					if (!f.scope) {
						f.failure(d)
					} else {
						f.failure.apply(f.scope, [ d ])
					}
				}
			}
			this.failureEvent.fire(d);
			if (c.failureEvent) {
				c.failureEvent.fire(d)
			}
		}
		this.releaseObject(c);
		d = null
	},
	createResponseObject : function(d, g) {
		var a = {}, e = {}, i, b, h, c;
		try {
			b = d.conn.getAllResponseHeaders();
			h = b.split("\n");
			for (i = 0; i < h.length; i++) {
				c = h[i].indexOf(":");
				if (c != -1) {
					e[h[i].substring(0, c)] = YAHOO.lang.trim(h[i]
							.substring(c + 2))
				}
			}
		} catch (f) {
		}
		a.tId = d.tId;
		a.status = (d.conn.status == 1223) ? 204 : d.conn.status;
		a.statusText = (d.conn.status == 1223) ? "No Content"
				: d.conn.statusText;
		a.getResponseHeader = e;
		a.getAllResponseHeaders = b;
		a.responseText = d.conn.responseText;
		a.responseXML = d.conn.responseXML;
		if (g) {
			a.argument = g
		}
		return a
	},
	createExceptionObject : function(b, f, a) {
		var d = 0, c = "communication failure", g = -1, h = "transaction aborted", e = {};
		e.tId = b;
		if (a) {
			e.status = g;
			e.statusText = h
		} else {
			e.status = d;
			e.statusText = c
		}
		if (f) {
			e.argument = f
		}
		return e
	},
	initHeader : function(a, b, c) {
		var d = (c) ? this._default_headers : this._http_headers;
		d[a] = b;
		if (c) {
			this._has_default_headers = true
		} else {
			this._has_http_headers = true
		}
	},
	setHeader : function(a) {
		var b;
		if (this._has_default_headers) {
			for (b in this._default_headers) {
				if (YAHOO.lang.hasOwnProperty(this._default_headers, b)) {
					a.conn.setRequestHeader(b, this._default_headers[b])
				}
			}
		}
		if (this._has_http_headers) {
			for (b in this._http_headers) {
				if (YAHOO.lang.hasOwnProperty(this._http_headers, b)) {
					a.conn.setRequestHeader(b, this._http_headers[b])
				}
			}
			this._http_headers = {};
			this._has_http_headers = false
		}
	},
	resetDefaultHeaders : function() {
		this._default_headers = {};
		this._has_default_headers = false
	},
	abort : function(d, b, a) {
		var e, g = (b && b.argument) ? b.argument : null;
		d = d || {};
		if (d.conn) {
			if (d.xhr) {
				if (this.isCallInProgress(d)) {
					d.conn.abort();
					window.clearInterval(this._poll[d.tId]);
					delete this._poll[d.tId];
					if (a) {
						window.clearTimeout(this._timeOut[d.tId]);
						delete this._timeOut[d.tId]
					}
					e = true
				}
			} else {
				if (d.xdr) {
					d.conn.abort(d.tId);
					e = true
				}
			}
		} else {
			if (d.upload) {
				var f = "yuiIO" + d.tId;
				var c = document.getElementById(f);
				if (c) {
					YAHOO.util.Event.removeListener(c, "load");
					document.body.removeChild(c);
					if (a) {
						window.clearTimeout(this._timeOut[d.tId]);
						delete this._timeOut[d.tId]
					}
					e = true
				}
			} else {
				e = false
			}
		}
		if (e === true) {
			this.abortEvent.fire(d, g);
			if (d.abortEvent) {
				d.abortEvent.fire(d, g)
			}
			this.handleTransactionResponse(d, b, true)
		}
		return e
	},
	isCallInProgress : function(a) {
		a = a || {};
		if (a.xhr && a.conn) {
			return a.conn.readyState !== 4 && a.conn.readyState !== 0
		} else {
			if (a.xdr && a.conn) {
				return a.conn.isCallInProgress(a.tId)
			} else {
				if (a.upload === true) {
					return document.getElementById("yuiIO" + a.tId) ? true
							: false
				} else {
					return false
				}
			}
		}
	},
	releaseObject : function(a) {
		if (a && a.conn) {
			a.conn = null;
			a = null
		}
	}
};
(function() {
	var c = YAHOO.util.Connect, b = {};
	function f(k) {
		var j = '<object id="YUIConnectionSwf" type="application/x-shockwave-flash" data="'
				+ k
				+ '" width="0" height="0"><param name="movie" value="'
				+ k
				+ '"><param name="allowScriptAccess" value="always"></object>', i = document
				.createElement("div");
		document.body.appendChild(i);
		i.innerHTML = j
	}
	function h(i, l, k, m, j) {
		b[parseInt(i.tId)] = {
			o : i,
			c : m
		};
		if (j) {
			m.method = l;
			m.data = j
		}
		i.conn.send(k, m, i.tId)
	}
	function e(i) {
		f(i);
		c._transport = document.getElementById("YUIConnectionSwf")
	}
	function g() {
		c.xdrReadyEvent.fire()
	}
	function a(i, j) {
		if (i) {
			c.startEvent.fire(i, j.argument);
			if (i.startEvent) {
				i.startEvent.fire(i, j.argument)
			}
		}
	}
	function d(j) {
		var i = b[j.tId].o, k = b[j.tId].c;
		if (j.statusText === "xdr:start") {
			a(i, k);
			return
		}
		j.responseText = decodeURI(j.responseText);
		i.r = j;
		if (k.argument) {
			i.r.argument = k.argument
		}
		this.handleTransactionResponse(i, k,
				j.statusText === "xdr:abort" ? true : false);
		delete b[j.tId]
	}
	c.xdr = h;
	c.swf = f;
	c.transport = e;
	c.xdrReadyEvent = new YAHOO.util.CustomEvent("xdrReady");
	c.xdrReady = g;
	c.handleXdrResponse = d
})();
(function() {
	var e = YAHOO.util.Connect, c = YAHOO.util.Event;
	e._isFormSubmit = false;
	e._isFileUpload = false;
	e._formNode = null;
	e._sFormData = null;
	e._submitElementValue = null;
			e.uploadEvent = new YAHOO.util.CustomEvent("upload"),
			e._hasSubmitListener = function() {
				if (c) {
					c
							.addListener(
									document,
									"click",
									function(h) {
										var i = c.getTarget(h), j = i.nodeName
												.toLowerCase();
										if ((j === "input" || j === "button")
												&& (i.type && i.type
														.toLowerCase() == "submit")) {
											e._submitElementValue = encodeURIComponent(i.name)
													+ "="
													+ encodeURIComponent(i.value)
										}
									});
					return true
				}
				return false
			}();
	function b(k, p, u) {
		var l, v, m, o, h, n = false, r = [], i = 0, s, q, t, j, w;
		this.resetFormState();
		if (typeof k == "string") {
			l = (document.getElementById(k) || document.forms[k])
		} else {
			if (typeof k == "object") {
				l = k
			} else {
				return
			}
		}
		if (p) {
			this.createFrame(u ? u : null);
			this._isFormSubmit = true;
			this._isFileUpload = true;
			this._formNode = l;
			return
		}
		for (s = 0, q = l.elements.length; s < q; ++s) {
			v = l.elements[s];
			h = v.disabled;
			m = v.name;
			if (!h && m) {
				m = encodeURIComponent(m) + "=";
				o = encodeURIComponent(v.value);
				switch (v.type) {
				case "select-one":
					if (v.selectedIndex > -1) {
						w = v.options[v.selectedIndex];
						r[i++] = m
								+ encodeURIComponent((w.attributes.value && w.attributes.value.specified) ? w.value
										: w.text)
					}
					break;
				case "select-multiple":
					if (v.selectedIndex > -1) {
						for (t = v.selectedIndex, j = v.options.length; t < j; ++t) {
							w = v.options[t];
							if (w.selected) {
								r[i++] = m
										+ encodeURIComponent((w.attributes.value && w.attributes.value.specified) ? w.value
												: w.text)
							}
						}
					}
					break;
				case "radio":
				case "checkbox":
					if (v.checked) {
						r[i++] = m + o
					}
					break;
				case "file":
				case undefined:
				case "reset":
				case "button":
					break;
				case "submit":
					if (n === false) {
						if (this._hasSubmitListener && this._submitElementValue) {
							r[i++] = this._submitElementValue
						}
						n = true
					}
					break;
				default:
					r[i++] = m + o
				}
			}
		}
		this._isFormSubmit = true;
		this._sFormData = r.join("&");
		this.initHeader("Content-Type", this._default_form_header);
		return this._sFormData
	}
	function f() {
		this._isFormSubmit = false;
		this._isFileUpload = false;
		this._formNode = null;
		this._sFormData = ""
	}
	function g(j) {
		var i = "yuiIO" + this._transaction_id, h;
		if (YAHOO.env.ua.ie) {
			h = document.createElement('<iframe id="' + i + '" name="' + i
					+ '" />');
			if (typeof j == "boolean") {
				h.src = "javascript:false"
			}
		} else {
			h = document.createElement("iframe");
			h.id = i;
			h.name = i
		}
		h.style.position = "absolute";
		h.style.top = "-1000px";
		h.style.left = "-1000px";
		document.body.appendChild(h)
	}
	function d(l) {
		var i = [], k = l.split("&"), j, h;
		for (j = 0; j < k.length; j++) {
			h = k[j].indexOf("=");
			if (h != -1) {
				i[j] = document.createElement("input");
				i[j].type = "hidden";
				i[j].name = decodeURIComponent(k[j].substring(0, h));
				i[j].value = decodeURIComponent(k[j].substring(h + 1));
				this._formNode.appendChild(i[j])
			}
		}
		return i
	}
	function a(t, i, s, u) {
		var n = "yuiIO" + t.tId, m = "multipart/form-data", k = document
				.getElementById(n), r = (document.documentMode && document.documentMode === 8) ? true
				: false, h = this, l = (i && i.argument) ? i.argument : null, j, o, v, p, w, q;
		w = {
			action : this._formNode.getAttribute("action"),
			method : this._formNode.getAttribute("method"),
			target : this._formNode.getAttribute("target")
		};
		this._formNode.setAttribute("action", s);
		this._formNode.setAttribute("method", "POST");
		this._formNode.setAttribute("target", n);
		if (YAHOO.env.ua.ie && !r) {
			this._formNode.setAttribute("encoding", m)
		} else {
			this._formNode.setAttribute("enctype", m)
		}
		if (u) {
			j = this.appendPostData(u)
		}
		this._formNode.submit();
		this.startEvent.fire(t, l);
		if (t.startEvent) {
			t.startEvent.fire(t, l)
		}
		if (i && i.timeout) {
			this._timeOut[t.tId] = window.setTimeout(function() {
				h.abort(t, i, true)
			}, i.timeout)
		}
		if (j && j.length > 0) {
			for (o = 0; o < j.length; o++) {
				this._formNode.removeChild(j[o])
			}
		}
		for (v in w) {
			if (YAHOO.lang.hasOwnProperty(w, v)) {
				if (w[v]) {
					this._formNode.setAttribute(v, w[v])
				} else {
					this._formNode.removeAttribute(v)
				}
			}
		}
		this.resetFormState();
		q = function() {
			if (i && i.timeout) {
				window.clearTimeout(h._timeOut[t.tId]);
				delete h._timeOut[t.tId]
			}
			h.completeEvent.fire(t, l);
			if (t.completeEvent) {
				t.completeEvent.fire(t, l)
			}
			p = {
				tId : t.tId,
				argument : i.argument
			};
			try {
				p.responseText = k.contentWindow.document.body ? k.contentWindow.document.body.innerHTML
						: k.contentWindow.document.documentElement.textContent;
				p.responseXML = k.contentWindow.document.XMLDocument ? k.contentWindow.document.XMLDocument
						: k.contentWindow.document
			} catch (x) {
			}
			if (i && i.upload) {
				if (!i.scope) {
					i.upload(p)
				} else {
					i.upload.apply(i.scope, [ p ])
				}
			}
			h.uploadEvent.fire(p);
			if (t.uploadEvent) {
				t.uploadEvent.fire(p)
			}
			c.removeListener(k, "load", q);
			setTimeout(function() {
				document.body.removeChild(k);
				h.releaseObject(t)
			}, 100)
		};
		c.addListener(k, "load", q)
	}
	e.setForm = b;
	e.resetFormState = f;
	e.createFrame = g;
	e.appendPostData = d;
	e.uploadFile = a
})();
YAHOO.register("connection", YAHOO.util.Connect, {
	version : "2.8.0r4",
	build : "2449"
});
var KISSY = window.KISSY || {};
KISSY.Editor = function(a, b) {
	var c = KISSY.Editor;
	if (!(this instanceof c)) {
		return new c(a, b)
	} else {
		if (!c._isReady) {
			c._setup()
		}
		return new c.Instance(a, b)
	}
};
(function(b) {
	var a = YAHOO.lang;
	a
			.augmentObject(
					b,
					{
						version : "0.1",
						lang : {},
						mods : {},
						plugins : {},
						add : function(c, e, d) {
							this.mods[c] = {
								name : c,
								fn : e,
								details : d || {}
							};
							return this
						},
						addPlugin : function(f, j) {
							var d = typeof f == "string" ? [ f ] : f, e = this.plugins, h, g, c;
							for (g = 0, c = d.length; g < c; ++g) {
								h = d[g];
								if (!e[h]) {
									e[h] = a.merge(j, {
										name : h
									})
								}
							}
						},
						_isReady : false,
						_setup : function() {
							this._loadModules();
							this._isReady = true
						},
						_attached : {},
						_loadModules : function() {
							var f = this.mods, e = this._attached, d, c;
							for (d in f) {
								c = f[d];
								if (!e[d] && c) {
									e[d] = c;
									if (c.fn) {
										c.fn(this)
									}
								}
							}
						}
					})
})(KISSY.Editor);
KISSY.Editor.add("config", function(a) {
	a.config = {
		base : "",
		language : "zh-cn",
		theme : "default",
		toolbar : [ "source", "", "fontName", "fontSize", "bold", "italic",
				"underline", "strikeThrough", "foreColor", "backColor", "",
				"link", "smiley", "image", "", "insertOrderedList",
				"insertUnorderedList", "outdent", "indent", "justifyLeft",
				"justifyCenter", "justifyRight" ],
		statusbar : [ "wordcount", "resize" ],
		pluginsConfig : {}
	}
});
KISSY.Editor.add("lang~en", function(a) {
	a.lang.en = {
		source : {
			text : "Source",
			title : "Source"
		},
		undo : {
			text : "Undo",
			title : "Undo (Ctrl+Z)"
		},
		redo : {
			text : "Redo",
			title : "Redo (Ctrl+Y)"
		},
		fontName : {
			text : "Font Name",
			title : "Font Name",
			options : {
				Arial : "Arial",
				"Times New Roman" : "Times New Roman",
				"Arial Black" : "Arial Black",
				"Arial Narrow" : "Arial Narrow",
				"Comic Sans MS" : "Comic Sans MS",
				"Courier New" : "Courier New",
				Garamond : "Garamond",
				Georgia : "Georgia",
				Tahoma : "Tahoma",
				"Trebuchet MS" : "Trebuchet MS",
				Verdana : "Verdana"
			}
		},
		fontSize : {
			text : "Size",
			title : "Font size",
			options : {
				"8" : "1",
				"10" : "2",
				"12" : "3",
				"14" : "4",
				"18" : "5",
				"24" : "6",
				"36" : "7"
			}
		},
		bold : {
			text : "Bold",
			title : "Bold (Ctrl+B)"
		},
		italic : {
			text : "Italic",
			title : "Italick (Ctrl+I)"
		},
		underline : {
			text : "Underline",
			title : "Underline (Ctrl+U)"
		},
		strikeThrough : {
			text : "Strikeout",
			title : "Strikeout"
		},
		link : {
			text : "Link",
			title : "Insert/Edit link",
			href : "URL:",
			target : "Open link in new window",
			remove : "Remove link"
		},
		blockquote : {
			text : "Blockquote",
			title : "Insert blockquote"
		},
		smiley : {
			text : "Smiley",
			title : "Insert smiley"
		},
		image : {
			text : "Image",
			title : "Insert image",
			tab_link : "Web Image",
			tab_local : "Local Image",
			tab_album : "Album Image",
			label_link : "Enter image web address:",
			label_local : "Browse your computer for the image file to upload:",
			label_album : "Select the image from your album:",
			uploading : "Uploading...",
			upload_error : "Exception occurs when uploading file.",
			upload_filter : "Only allow PNG, GIF, JPG image type.",
			ok : "Insert"
		},
		insertOrderedList : {
			text : "Numbered List",
			title : "Numbered List (Ctrl+7)"
		},
		insertUnorderedList : {
			text : "Bullet List",
			title : "Bullet List (Ctrl+8)"
		},
		outdent : {
			text : "Decrease Indent",
			title : "Decrease Indent"
		},
		indent : {
			text : "Increase Indent",
			title : "Increase Indent"
		},
		justifyLeft : {
			text : "Left Justify",
			title : "Left Justify (Ctrl+L)"
		},
		justifyCenter : {
			text : "Center Justify",
			title : "Center Justify (Ctrl+E)"
		},
		justifyRight : {
			text : "Right Justify",
			title : "Right Justify (Ctrl+R)"
		},
		foreColor : {
			text : "Text Color",
			title : "Text Color"
		},
		backColor : {
			text : "Text Background Color",
			title : "Text Background Color"
		},
		maximize : {
			text : "Maximize",
			title : "Maximize"
		},
		removeformat : {
			text : "Remove Format",
			title : "Remove Format"
		},
		wordcount : {
			tmpl : "Remain %remain% words (include html code)"
		},
		resize : {
			larger_text : "Larger",
			larger_title : "Enlarge the editor",
			smaller_text : "Smaller",
			smaller_title : "Shrink the editor"
		},
		common : {
			ok : "OK",
			cancel : "Cancel"
		}
	}
});
KISSY.Editor
		.add(
				"lang~zh-cn",
				function(a) {
					a.lang["zh-cn"] = {
						source : {
							text : "\u6e90\u7801",
							title : "\u6e90\u7801"
						},
						undo : {
							text : "\u64a4\u9500",
							title : "\u64a4\u9500"
						},
						redo : {
							text : "\u91cd\u505a",
							title : "\u91cd\u505a"
						},
						fontName : {
							text : "\u5b57\u4f53",
							title : "\u5b57\u4f53",
							options : {
								"\u5b8b\u4f53" : "\u5b8b\u4f53",
								"\u9ed1\u4f53" : "\u9ed1\u4f53",
								"\u96b6\u4e66" : "\u96b6\u4e66",
								"\u6977\u4f53" : "\u6977\u4f53_GB2312",
								"\u5fae\u8f6f\u96c5\u9ed1" : "\u5fae\u8f6f\u96c5\u9ed1",
								Georgia : "Georgia",
								"Times New Roman" : "Times New Roman",
								Impact : "Impact",
								"Courier New" : "Courier New",
								Arial : "Arial",
								Verdana : "Verdana",
								Tahoma : "Tahoma"
							}
						},
						fontSize : {
							text : "\u5927\u5c0f",
							title : "\u5927\u5c0f",
							options : {
								"8" : "1",
								"10" : "2",
								"12" : "3",
								"14" : "4",
								"18" : "5",
								"24" : "6",
								"36" : "7"
							}
						},
						bold : {
							text : "\u7c97\u4f53",
							title : "\u7c97\u4f53"
						},
						italic : {
							text : "\u659c\u4f53",
							title : "\u659c\u4f53"
						},
						underline : {
							text : "\u4e0b\u5212\u7ebf",
							title : "\u4e0b\u5212\u7ebf"
						},
						strikeThrough : {
							text : "\u5220\u9664\u7ebf",
							title : "\u5220\u9664\u7ebf"
						},
						link : {
							text : "\u94fe\u63a5",
							title : "\u63d2\u5165/\u7f16\u8f91\u94fe\u63a5",
							href : "URL:",
							target : "\u5728\u65b0\u7a97\u53e3\u6253\u5f00\u94fe\u63a5",
							remove : "\u79fb\u9664\u94fe\u63a5"
						},
						blockquote : {
							text : "\u5f15\u7528",
							title : "\u5f15\u7528"
						},
						smiley : {
							text : "\u8868\u60c5",
							title : "\u63d2\u5165\u8868\u60c5"
						},
						image : {
							text : "\u56fe\u7247",
							title : "\u63d2\u5165\u56fe\u7247",
							tab_link : "\u7f51\u7edc\u56fe\u7247",
							tab_local : "\u672c\u5730\u4e0a\u4f20",
							tab_album : "\u6211\u7684\u76f8\u518c",
							label_link : "\u8bf7\u8f93\u5165\u56fe\u7247\u5730\u5740\uff1a",
							label_local : "\u8bf7\u9009\u62e9\u672c\u5730\u56fe\u7247\uff1a",
							label_album : "\u8bf7\u9009\u62e9\u76f8\u518c\u56fe\u7247\uff1a",
							uploading : "\u6b63\u5728\u4e0a\u4f20...",
							upload_error : "\u5bf9\u4e0d\u8d77\uff0c\u4e0a\u4f20\u6587\u4ef6\u65f6\u53d1\u751f\u4e86\u9519\u8bef\uff1a",
							upload_filter : "\u4ec5\u652f\u6301 JPG, PNG \u548c GIF \u56fe\u7247\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\u3002",
							ok : "\u63d2\u5165"
						},
						insertOrderedList : {
							text : "\u6709\u5e8f\u5217\u8868",
							title : "\u6709\u5e8f\u5217\u8868"
						},
						insertUnorderedList : {
							text : "\u65e0\u5e8f\u5217\u8868",
							title : "\u65e0\u5e8f\u5217\u8868"
						},
						outdent : {
							text : "\u51cf\u5c11\u7f29\u8fdb",
							title : "\u51cf\u5c11\u7f29\u8fdb"
						},
						indent : {
							text : "\u589e\u52a0\u7f29\u8fdb",
							title : "\u589e\u52a0\u7f29\u8fdb"
						},
						justifyLeft : {
							text : "\u5de6\u5bf9\u9f50",
							title : "\u5de6\u5bf9\u9f50"
						},
						justifyCenter : {
							text : "\u5c45\u4e2d\u5bf9\u9f50",
							title : "\u5c45\u4e2d\u5bf9\u9f50"
						},
						justifyRight : {
							text : "\u53f3\u5bf9\u9f50",
							title : "\u53f3\u5bf9\u9f50"
						},
						foreColor : {
							text : "\u6587\u672c\u989c\u8272",
							title : "\u6587\u672c\u989c\u8272"
						},
						backColor : {
							text : "\u80cc\u666f\u989c\u8272",
							title : "\u80cc\u666f\u989c\u8272"
						},
						maximize : {
							text : "\u5168\u5c4f\u7f16\u8f91",
							title : "\u5168\u5c4f\u7f16\u8f91"
						},
						removeformat : {
							text : "\u6e05\u9664\u683c\u5f0f",
							title : "\u6e05\u9664\u683c\u5f0f"
						},
						wordcount : {
							tmpl : "\u8fd8\u53ef\u4ee5\u8f93\u5165 %remain% \u5b57\uff08\u542b html \u4ee3\u7801\uff09"
						},
						resize : {
							larger_text : "\u589e\u5927",
							larger_title : "\u589e\u5927\u7f16\u8f91\u533a\u57df",
							smaller_text : "\u7f29\u5c0f",
							smaller_title : "\u7f29\u5c0f\u7f16\u8f91\u533a\u57df"
						},
						common : {
							ok : "\u786e\u5b9a",
							cancel : "\u53d6\u6d88"
						}
					}
				});
KISSY.Editor.add("core~plugin", function(a) {
	a.PLUGIN_TYPE = {
		CUSTOM : 0,
		TOOLBAR_SEPARATOR : 1,
		TOOLBAR_BUTTON : 2,
		TOOLBAR_MENU_BUTTON : 4,
		TOOLBAR_SELECT : 8,
		STATUSBAR_ITEM : 16,
		FUNC : 32
	}
});
KISSY.Editor.add("core~dom", function(b) {
	var a = YAHOO.env.ua;
	b.Dom = {
		getText : function(c) {
			return c ? (c.textContent || "") : ""
		},
		setItemUnselectable : function(g) {
			var d, f, c, h, e;
			d = g.getElementsByTagName("*");
			for (f = -1, c = d.length; f < c; ++f) {
				e = (f == -1) ? g : d[f];
				h = e.nodeName;
				if (h && h != "INPUT") {
					e.setAttribute("unselectable", "on")
				}
			}
			return g
		},
		BLOCK_ELEMENTS : {
			blockquote : 1,
			div : 1,
			h1 : 1,
			h2 : 1,
			h3 : 1,
			h4 : 1,
			h5 : 1,
			h6 : 1,
			hr : 1,
			p : 1,
			address : 1,
			center : 1,
			pre : 1,
			form : 1,
			fieldset : 1,
			caption : 1,
			table : 1,
			tbody : 1,
			tr : 1,
			th : 1,
			td : 1,
			ul : 1,
			ol : 1,
			dl : 1,
			dt : 1,
			dd : 1,
			li : 1
		}
	};
	if (a.ie) {
		b.Dom.getText = function(c) {
			return c ? (c.innerText || "") : ""
		}
	}
});
KISSY.Editor
		.add(
				"core~color",
				function(d) {
					var c = "toString", a = parseInt, b = RegExp;
					d.Color = {
						KEYWORDS : {
							black : "000",
							silver : "c0c0c0",
							gray : "808080",
							white : "fff",
							maroon : "800000",
							red : "f00",
							purple : "800080",
							fuchsia : "f0f",
							green : "008000",
							lime : "0f0",
							olive : "808000",
							yellow : "ff0",
							navy : "000080",
							blue : "00f",
							teal : "008080",
							aqua : "0ff"
						},
						re_RGB : /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,
						re_hex : /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
						re_hex3 : /([0-9A-F])/gi,
						toRGB : function(e) {
							if (!this.re_RGB.test(e)) {
								e = this.toHex(e)
							}
							if (this.re_hex.exec(e)) {
								e = "rgb("
										+ [ a(b.$1, 16), a(b.$2, 16),
												a(b.$3, 16) ].join(", ") + ")"
							}
							return e
						},
						toHex : function(i) {
							i = this.KEYWORDS[i] || i;
							if (this.re_RGB.exec(i)) {
								var h = (b.$1 >> 0)[c](16), f = (b.$2 >> 0)[c]
										(16), e = (b.$3 >> 0)[c](16);
								i = [ h.length == 1 ? "0" + h : h,
										f.length == 1 ? "0" + f : f,
										e.length == 1 ? "0" + e : e ].join("")
							}
							if (i.length < 6) {
								i = i.replace(this.re_hex3, "$1$1")
							}
							if (i !== "transparent" && i.indexOf("#") < 0) {
								i = "#" + i
							}
							return i.toLowerCase()
						},
						int2hex : function(h) {
							var g, f, e;
							h = h >> 0;
							g = h & 255;
							f = (h >> 8) & 255;
							e = (h >> 16) & 255;
							return this.toHex("rgb(" + g + "," + f + "," + e
									+ ")")
						}
					}
				});
KISSY.Editor
		.add(
				"core~command",
				function(f) {
					var d = YAHOO.env.ua, b = {
						backColor : d.gecko ? "hiliteColor" : "backColor"
					}, c = "bold,italic,underline,strikeThrough", a = "styleWithCSS", e = "execCommand";
					f.Command = {
						exec : function(i, h, j, g) {
							h = b[h] || h;
							this._preExec(i, h, g);
							i[e](h, false, j)
						},
						_preExec : function(i, h, g) {
							if (d.gecko) {
								var j = typeof g === "undefined" ? (c
										.indexOf(h) === -1) : g;
								i[e](a, false, j)
							}
						}
					}
				});
KISSY.Editor.add("core~range", function(b) {
	var a = YAHOO.env.ua.ie;
	b.Range = {
		getSelectionRange : function(f) {
			var e = f.document, d, c;
			if (f.getSelection) {
				d = f.getSelection();
				if (d.getRangeAt) {
					c = d.getRangeAt(0)
				} else {
					c = e.createRange();
					c.setStart(d.anchorNode, d.anchorOffset);
					c.setEnd(d.focusNode, d.focusOffset)
				}
			} else {
				if (e.selection) {
					c = e.selection.createRange()
				}
			}
			return c
		},
		getCommonAncestor : function(c) {
			return c.startContainer || (c.parentElement && c.parentElement())
					|| (c.commonParentElement && c.commonParentElement())
		},
		getSelectedText : function(c) {
			if ("text" in c) {
				return c.text
			}
			return c.toString ? c.toString() : ""
		},
		saveRange : function(c) {
			a && c.contentWin.focus();
			return c.getSelectionRange()
		}
	}
});
KISSY.Editor
		.add(
				"core~instance",
				function(k) {
					var c = YAHOO.util, e = c.Dom, i = c.Event, f = YAHOO.lang, g = YAHOO.env.ua, a = g.ie, d = "ks-editor", h = '<div class="ks-editor-toolbar"></div><div class="ks-editor-content"><iframe frameborder="0" allowtransparency="1"></iframe></div><div class="ks-editor-statusbar"></div>', b = '<!doctype html><html><head><title>Rich Text Area</title><meta http-equiv="content-type" content="text/html; charset=gb18030" /><link type="text/css" href="{CONTENT_CSS}" rel="stylesheet" /></head><body spellcheck="false" class="ks-editor-post">{CONTENT}</body></html>', j = "themes";
					k.Instance = function(l, m) {
						this.textarea = e.get(l);
						this.config = f.merge(k.config, m || {});
						this.sourceMode = false;
						this.toolbar = new k.Toolbar(this);
						this.statusbar = new k.Statusbar(this);
						this._init()
					};
					f
							.augmentObject(
									k.Instance.prototype,
									{
										_init : function() {
											this._renderUI();
											this._initPlugins();
											this._initAutoFocus()
										},
										_renderUI : function() {
											this._renderContainer();
											this._setupContentPanel()
										},
										_initPlugins : function() {
											var m, n, o = k.plugins, l = [];
											for (m in o) {
												l[m] = f.merge(o[m])
											}
											this.plugins = l;
											this.toolbar.init();
											this.statusbar.init();
											for (m in l) {
												n = l[m];
												if (n.inited) {
													continue
												}
												if (n.type === k.PLUGIN_TYPE.FUNC) {
													n.editor = this;
													if (n.init) {
														n.init()
													}
													n.inited = true
												}
											}
										},
										_renderContainer : function() {
											var n = this.textarea, r = e
													.getRegion(n), p = (r.right
													- r.left - 2)
													+ "px", l = (r.bottom
													- r.top - 2)
													+ "px", m = document
													.createElement("div"), q, o;
											m.className = d;
											m.style.width = p;
											m.innerHTML = h;
											q = m.childNodes[1];
											q.style.width = "100%";
											q.style.height = l;
											o = q.childNodes[0];
											o.style.width = "100%";
											o.style.height = "100%";
											o.setAttribute("frameBorder", 0);
											n.style.display = "none";
											e.insertBefore(m, n);
											this.container = m;
											this.toolbar.domEl = m.childNodes[0];
											this.contentWin = o.contentWindow;
											this.contentDoc = o.contentWindow.document;
											this.statusbar.domEl = m.childNodes[2]
										},
										_setupContentPanel : function() {
											var p = this.contentDoc, o = this.config, l = "content"
													+ (o.debug ? "" : "-min")
													+ ".css", n = o.base + j
													+ "/" + o.theme + "/" + l, m = this;
											p.open();
											p.write(b.replace("{CONTENT_CSS}",
													n).replace("{CONTENT}",
													this.textarea.value));
											p.close();
											if (a) {
												p.body.contentEditable = "true"
											} else {
												p.designMode = "on"
											}
											if (a) {
												i
														.on(
																p,
																"click",
																function() {
																	if (p.activeElement.parentNode.nodeType === 9) {
																		m
																				._focusToEnd()
																	}
																})
											}
										},
										_initAutoFocus : function() {
											if (this.config.autoFocus) {
												this._focusToEnd()
											}
										},
										_focusToEnd : function() {
											this.contentWin.focus();
											var n = this.contentDoc.body.lastChild, l = k.Range
													.getSelectionRange(this.contentWin);
											if (g.ie) {
												try {
													l.moveToElementText(n)
												} catch (m) {
												}
												l.collapse(false);
												l.select()
											} else {
												try {
													l
															.setEnd(
																	n,
																	n.childNodes.length)
												} catch (m) {
												}
												l.collapse(false)
											}
										},
										focus : function() {
											this._focusToEnd()
										},
										execCommand : function(m, n, l) {
											this.contentWin.focus();
											k.Command.exec(this.contentDoc, m,
													n, l)
										},
										getData : function() {
											if (this.sourceMode) {
												return this.textarea.value
											}
											return this.getContentDocData()
										},
										getContentDocData : function() {
											var m = this.contentDoc.body, l = "", n = k.plugins.save;
											l = m.innerHTML;
											if (l == "<br>") {
												l = ""
											}
											if (n && n.filterData) {
												l = n.filterData(l)
											}
											return l
										},
										getSelectionRange : function() {
											return k.Range
													.getSelectionRange(this.contentWin)
										}
									})
				});
KISSY.Editor
		.add(
				"core~toolbar",
				function(j) {
					var c = YAHOO.util, b = c.Dom, r = c.Event, e = YAHOO.lang, o = YAHOO.env.ua.ie, n = o === 6, h = j.PLUGIN_TYPE, d = '<div class="ks-editor-stripbar-sep ks-inline-block"></div>', m = '<div class="ks-editor-toolbar-button ks-inline-block" title="{TITLE}"><div class="ks-editor-toolbar-button-outer-box"><div class="ks-editor-toolbar-button-inner-box"><span class="ks-editor-toolbar-item ks-editor-toolbar-{NAME}">{TEXT}</span></div></div></div>', l = '<div class="ks-editor-toolbar-menu-button-caption ks-inline-block"><span class="ks-editor-toolbar-item ks-editor-toolbar-{NAME}">{TEXT}</span></div><div class="ks-editor-toolbar-menu-button-dropdown ks-inline-block"></div>', q = "ks-editor-toolbar-menu-button", i = "ks-editor-toolbar-select", g = "ks-editor-toolbar-button-active", a = "ks-editor-toolbar-button-hover", p = "ks-editor-toolbar-button-selected", f = "fontName,fontSize,bold,italic,underline,strikeThroughinsertOrderedList,insertUnorderedListjustifyLeft,justifyCenter,justifyRight", k = document
							.createElement("div");
					j.Toolbar = function(s) {
						this.editor = s;
						this.config = s.config;
						this.lang = j.lang[this.config.language];
						this.items = [];
						this.stateItems = []
					};
					e
							.augmentObject(
									j.Toolbar.prototype,
									{
										init : function() {
											var u = this.config.toolbar, t = this.editor.plugins, w, x;
											for ( var v = 0, s = u.length; v < s; ++v) {
												w = u[v];
												if (w) {
													if (!(w in t)) {
														continue
													}
													x = t[w];
													this._addItem(x);
													this.items.push(x);
													if (f.indexOf(x.name) !== -1) {
														this.stateItems.push(x)
													}
												} else {
													this._addSeparator()
												}
											}
											this._initUpdateState()
										},
										_addItem : function(v) {
											var u, t = v.type, w = this.lang, s;
											if (!v.lang) {
												v.lang = e
														.merge(
																w.common,
																this.lang[v.name]
																		|| {})
											}
											s = m.replace("{TITLE}",
													v.lang.title || "")
													.replace("{NAME}", v.name)
													.replace("{TEXT}",
															v.lang.text || "");
											if (n) {
												s = s
														.replace("outer-box",
																"outer-box ks-inline-block")
														.replace("inner-box",
																"inner-box ks-inline-block")
											}
											k.innerHTML = s;
											v.domEl = u = k.firstChild;
											if (t == h.TOOLBAR_MENU_BUTTON
													|| t == h.TOOLBAR_SELECT) {
												this._renderMenuButton(v);
												if (t == h.TOOLBAR_SELECT) {
													this._renderSelect(v)
												}
											}
											this._bindItemUI(v);
											this._addToToolbar(u);
											v.editor = this.editor;
											if (v.init) {
												v.init()
											}
											v.inited = true
										},
										_renderMenuButton : function(u) {
											var t = u.domEl, s = t
													.getElementsByTagName("span")[0].parentNode;
											b.addClass(t, q);
											s.innerHTML = l.replace("{NAME}",
													u.name).replace("{TEXT}",
													u.lang.text || "")
										},
										_renderSelect : function(s) {
											b.addClass(s.domEl, i)
										},
										_bindItemUI : function(t) {
											var s = t.domEl;
											if (t.exec) {
												r.on(s, "click", function() {
													t.exec()
												})
											}
											r.on(s, "mousedown", function() {
												b.addClass(s, g)
											});
											r.on(s, "mouseup", function() {
												b.removeClass(s, g)
											});
											r
													.on(
															s,
															"mouseout",
															function(w) {
																var v = r
																		.getRelatedTarget(w), u;
																try {
																	if (s.contains) {
																		u = s
																				.contains(v)
																	} else {
																		if (s.compareDocumentPosition) {
																			u = s
																					.compareDocumentPosition(v) & 8
																		}
																	}
																} catch (w) {
																	u = false
																}
																if (u) {
																	return
																}
																b.removeClass(
																		s, g)
															});
											if (n) {
												r.on(s, "mouseenter",
														function() {
															b.addClass(s, a)
														});
												r.on(s, "mouseleave",
														function() {
															b.removeClass(s, a)
														})
											}
										},
										_addSeparator : function() {
											k.innerHTML = d;
											this._addToToolbar(k.firstChild)
										},
										_addToToolbar : function(s) {
											if (o) {
												s = j.Dom
														.setItemUnselectable(s)
											}
											this.domEl.appendChild(s)
										},
										_initUpdateState : function() {
											var t = this.editor.contentDoc, s = this;
											r.on(t, "click", function() {
												s.updateState()
											});
											r.on(t, "keyup", function(u) {
												var v = u.keyCode;
												if ((v >= 33 && v <= 40)
														|| v === 8 || v === 13
														|| v === 46) {
													s.updateState()
												}
											})
										},
										updateState : function(t) {
											var u = this.stateItems, w;
											t = t ? t.join("|") : "";
											for ( var v = 0, s = u.length; v < s; v++) {
												w = u[v];
												if (t
														&& t.indexOf(w.name) === -1) {
													continue
												}
												if (w.updateState) {
													w.updateState();
													continue
												}
												this.updateItemState(w)
											}
										},
										updateItemState : function(u) {
											var t = this.editor.contentDoc;
											try {
												if (t
														.queryCommandEnabled(u.name)) {
													if (t
															.queryCommandState(u.name)) {
														b.addClass(u.domEl, p)
													} else {
														b.removeClass(u.domEl,
																p)
													}
												}
											} catch (s) {
											}
										}
									})
				});
KISSY.Editor
		.add(
				"core~statusbar",
				function(d) {
					var e = YAHOO.util, c = YAHOO.lang, b = YAHOO.env.ua.ie, a = '<div class="ks-editor-stripbar-sep kissy-inline-block"></div>', g = '<div class="ks-editor-statusbar-item ks-editor-{NAME} ks-inline-block"></div>', f = document
							.createElement("div");
					d.Statusbar = function(h) {
						this.editor = h;
						this.config = h.config;
						this.lang = d.lang[this.config.language]
					};
					c
							.augmentObject(
									d.Statusbar.prototype,
									{
										init : function() {
											var k = this.config.statusbar, j = this.editor.plugins, m;
											for ( var l = 0, h = k.length; l < h; ++l) {
												m = k[l];
												if (m) {
													if (!(m in j)) {
														continue
													}
													this._addItem(j[m])
												} else {
													this._addSep()
												}
											}
										},
										_addItem : function(i) {
											var h, j = this.lang;
											if (!i.lang) {
												i.lang = c
														.merge(
																j.common,
																this.lang[i.name]
																		|| {})
											}
											f.innerHTML = g.replace("{NAME}",
													i.name);
											i.domEl = h = f.firstChild;
											this._addToToolbar(h);
											i.editor = this.editor;
											if (i.init) {
												i.init()
											}
											i.inited = true
										},
										_addSep : function() {
											f.innerHTML = a;
											this._addToToolbar(f.firstChild)
										},
										_addToToolbar : function(h) {
											if (b) {
												h = d.Dom
														.setItemUnselectable(h)
											}
											this.domEl.appendChild(h)
										}
									})
				});
KISSY.Editor
		.add(
				"core~menu",
				function(n) {
					var e = YAHOO.util, i = e.Dom, m = e.Event, j = YAHOO.env.ua, g = "display", k = "none", f = "", a = "ks-editor-drop-menu", l = "ks-editor-drop-menu-shadow", d = "ks-editor-drop-menu-content", c = "ks-editor-toolbar-button-selected", b = a
							+ "-shim", h;
					n.Menu = {
						generateDropMenu : function(q, p, s) {
							var r = document.createElement("div"), o = this;
							r.innerHTML = '<div class="' + l
									+ '"></div><div class="' + d + '"></div>';
							r.className = a;
							r.style[g] = k;
							document.body.appendChild(r);
							m.on(p, "click", function(t) {
								m.stopPropagation(t);
								q.activeDropMenu && o._hide(q);
								if (q.activeDropMenu != r) {
									o._setDropMenuPosition(p, r, s);
									q.activeDropMenu = r;
									q.activeDropButton = p;
									o._show(q)
								} else {
									q.activeDropMenu = null;
									q.activeDropButton = null
								}
							});
							m.on([ document, q.contentDoc ], "click",
									function() {
										if (q.activeDropMenu) {
											o.hideActiveDropMenu(q);
											if (this == q.contentDoc) {
												q.contentWin.focus()
											}
										}
									});
							this._initResizeEvent(p, r, s);
							return r.childNodes[1]
						},
						_setDropMenuPosition : function(o, q, u) {
							var p = i.getRegion(o), t = p.left, s = p.bottom;
							if (u) {
								t += u[0];
								s += u[1]
							}
							q.style.left = t + "px";
							q.style.top = s + "px"
						},
						_isVisible : function(o) {
							if (!o) {
								return false
							}
							return o.style[g] != k
						},
						hideActiveDropMenu : function(o) {
							this._hide(o);
							o.activeDropMenu = null;
							o.activeDropButton = null
						},
						_hide : function(o) {
							var q = o.activeDropMenu, p = o.activeDropButton;
							if (q) {
								h && (h.style[g] = k);
								q.style[g] = k
							}
							p && (i.removeClass(p, c))
						},
						_show : function(o) {
							var q = o.activeDropMenu, p = o.activeDropButton;
							if (q) {
								q.style[g] = f;
								if (j.ie === 6) {
									this._updateShimRegion(q);
									h.style[g] = f
								}
							}
							p && (i.addClass(p, c))
						},
						_updateShimRegion : function(o) {
							if (o) {
								if (j.ie === 6) {
									if (!h) {
										this._initShim()
									}
									this._setShimRegion(o)
								}
							}
						},
						_initResizeEvent : function(q, r, s) {
							var p = this, o;
							m.on(window, "resize", function() {
								if (o) {
									clearTimeout(o)
								}
								o = setTimeout(function() {
									if (p._isVisible(r)) {
										p._setDropMenuPosition(q, r, s)
									}
								}, 50)
							})
						},
						_initShim : function() {
							h = document.createElement("iframe");
							h.src = "about:blank";
							h.className = b;
							h.style.position = "absolute";
							h.style[g] = k;
							h.style.border = k;
							document.body.appendChild(h)
						},
						_setShimRegion : function(o) {
							if (h && this._isVisible(o)) {
								var p = i.getRegion(o);
								if (p.width > 0) {
									h.style.left = p.left + "px";
									h.style.top = p.top + "px";
									h.style.width = (p.width - 1) + "px";
									h.style.height = (p.height - 1) + "px"
								}
							}
						}
					}
				});
KISSY.Editor.add("smilies~config~default", function(a) {
	a.Smilies = a.Smilies || {};
	a.Smilies["default"] = {
		name : "default",
		mode : "icons",
		cols : 5,
		fileNames : [ "smile", "confused", "cool", "cry", "eek", "angry",
				"wink", "sweat", "lol", "stun", "razz", "shy", "rolleyes",
				"sad", "happy", "yes", "no", "heart", "idea", "rose" ],
		fileExt : "gif"
	}
});
KISSY.Editor
		.add(
				"smilies~config~wangwang",
				function(a) {
					a.Smilies = a.Smilies || {};
					a.Smilies.wangwang = {
						name : "wangwang",
						mode : "sprite",
						base : "http://a.tbcdn.cn/sys/wangwang/smiley/48x48/",
						spriteStyle : "background: url(http://a.tbcdn.cn/sys/wangwang/smiley/sprite.png) no-repeat -1px 0; width: 288px; height: 235px",
						unitStyle : "width: 24px; height: 24px",
						filePattern : {
							start : 0,
							end : 98,
							step : 1
						},
						fileExt : "gif"
					}
				});
KISSY.Editor
		.add(
				"plugins~base",
				function(b) {
					var c = b.PLUGIN_TYPE, a = "bold,italic,underline,strikeThrough,insertOrderedList,insertUnorderedList";
					b.addPlugin(a.split(","), {
						type : c.TOOLBAR_BUTTON,
						exec : function() {
							this.editor.execCommand(this.name);
							this.editor.toolbar.updateState()
						}
					})
				});
KISSY.Editor
		.add(
				"plugins~color",
				function(n) {
					var c = YAHOO.util, h = c.Dom, m = c.Event, l = YAHOO.env.ua, e = l.ie, k = n.PLUGIN_TYPE, d = '<div class="ks-editor-palette-table"><table><tbody>{TR}</tbody></table></div>', b = '<td class="ks-editor-palette-cell"><div class="ks-editor-palette-colorswatch" title="{COLOR}" style="background-color:{COLOR}"></div></td>', i = [
							"000", "444", "666", "999", "CCC", "EEE", "F3F3F3",
							"FFF" ], g = [ "F00", "F90", "FF0", "0F0", "0FF",
							"00F", "90F", "F0F" ], f = [ "F4CCCC", "FCE5CD",
							"FFF2CC", "D9EAD3", "D0E0E3", "CFE2F3", "D9D2E9",
							"EAD1DC", "EA9999", "F9CB9C", "FFE599", "B6D7A8",
							"A2C4C9", "9FC5E8", "B4A7D6", "D5A6BD", "E06666",
							"F6B26B", "FFD966", "93C47D", "76A5AF", "6FA8DC",
							"8E7CC3", "C27BAD", "CC0000", "E69138", "F1C232",
							"6AA84F", "45818E", "3D85C6", "674EA7", "A64D79",
							"990000", "B45F06", "BF9000", "38761D", "134F5C",
							"0B5394", "351C75", "741B47", "660000", "783F04",
							"7F6000", "274E13", "0C343D", "073763", "20124D",
							"4C1130" ], j = "ks-editor-palette-colorswatch", a = "ks-editor-palette-cell-selected";
					n
							.addPlugin(
									[ "foreColor", "backColor" ],
									{
										type : k.TOOLBAR_MENU_BUTTON,
										color : "",
										_indicator : null,
										swatches : null,
										dropMenu : null,
										range : null,
										init : function() {
											var p = this.domEl, o = p
													.getElementsByTagName("span")[0].parentNode;
											this.color = this
													._getDefaultColor();
											h
													.addClass(p,
															"ks-editor-toolbar-color-button");
											o.innerHTML = '<div class="ks-editor-toolbar-color-button-indicator" style="border-bottom-color:'
													+ this.color
													+ '">'
													+ o.innerHTML + "</div>";
											this._indicator = o.firstChild;
											this._renderUI();
											this._bindUI();
											this.swatches = h
													.getElementsByClassName(j,
															"div",
															this.dropMenu)
										},
										_renderUI : function() {
											this.dropMenu = n.Menu
													.generateDropMenu(
															this.editor,
															this.domEl,
															[ 1, 0 ]);
											this._generatePalettes();
											if (e) {
												n.Dom
														.setItemUnselectable(this.dropMenu)
											}
										},
										_bindUI : function() {
											this._bindPickEvent();
											m
													.on(
															this.domEl,
															"click",
															function() {
																this.range = this.editor
																		.getSelectionRange();
																e
																		&& this.editor.contentDoc.selection
																				.empty();
																this
																		._updateSelectedColor(this.color)
															}, this, true)
										},
										_generatePalettes : function() {
											var o = "";
											o += this._getPaletteTable(i);
											o += this._getPaletteTable(g);
											o += this._getPaletteTable(f);
											this.dropMenu.innerHTML = o
										},
										_getPaletteTable : function(q) {
											var s, p = q.length, r, o = "<tr>";
											for (s = 0, p = q.length; s < p; ++s) {
												if (s != 0 && s % 8 == 0) {
													o += "</tr><tr>"
												}
												r = n.Color.toRGB("#" + q[s])
														.toUpperCase();
												o += b.replace(/{COLOR}/g, r)
											}
											o += "</tr>";
											return d.replace("{TR}", o)
										},
										_bindPickEvent : function() {
											var o = this;
											m
													.on(
															this.dropMenu,
															"click",
															function(q) {
																var r = m
																		.getTarget(q), p = r
																		.getAttribute("title");
																if (p
																		&& p
																				.indexOf("RGB") === 0) {
																	o
																			._doAction(p)
																}
																m
																		.stopPropagation(q);
																n.Menu
																		.hideActiveDropMenu(o.editor)
															})
										},
										_doAction : function(p) {
											if (!p) {
												return
											}
											this.setColor(n.Color.toHex(p));
											var o = this.range;
											if (e && o.select) {
												o.select()
											}
											this.editor.execCommand(this.name,
													this.color)
										},
										setColor : function(o) {
											this.color = o;
											this._updateIndicatorColor(o);
											this._updateSelectedColor(o)
										},
										_updateIndicatorColor : function(o) {
											this._indicator.style.borderBottomColor = o
										},
										_updateSelectedColor : function(s) {
											var q, o, r, p = this.swatches;
											for (q = 0, o = p.length; q < o; ++q) {
												r = p[q];
												if (n.Color
														.toHex(r.style.backgroundColor) == s) {
													h.addClass(r.parentNode, a)
												} else {
													h.removeClass(r.parentNode,
															a)
												}
											}
										},
										_getDefaultColor : function() {
											return (this.name == "foreColor") ? "#000000"
													: "#ffffff"
										}
									})
				});
KISSY.Editor
		.add(
				"plugins~font",
				function(k) {
					var a = YAHOO.util, b = a.Dom, j = a.Event, f = YAHOO.env.ua, e = k.PLUGIN_TYPE, d = "ks-editor-option-hover", h = '<ul class="ks-editor-select-list">{LI}</ul>', c = '<li class="ks-editor-option" data-value="{VALUE}"><span class="ks-editor-option-checkbox"></span><span style="{STYLE}">{KEY}</span></li>', i = "ks-editor-option-selected", g = {
						"10px" : 1,
						"13px" : 2,
						"16px" : 3,
						"18px" : 4,
						"24px" : 5,
						"32px" : 6,
						"48px" : 7
					};
					k
							.addPlugin(
									[ "fontName", "fontSize" ],
									{
										type : e.TOOLBAR_SELECT,
										selectedValue : "",
										selectHead : null,
										selectList : null,
										options : [],
										items : null,
										selectedItem : null,
										range : null,
										init : function() {
											this.options = this.lang.options;
											this.selectHead = this.domEl
													.getElementsByTagName("span")[0];
											this._renderUI();
											this._bindUI()
										},
										_renderUI : function() {
											this.selectList = k.Menu
													.generateDropMenu(
															this.editor,
															this.domEl,
															[ 1, 0 ]);
											this._renderSelectList();
											this.items = this.selectList
													.getElementsByTagName("li")
										},
										_bindUI : function() {
											this._bindPickEvent();
											j
													.on(
															this.domEl,
															"click",
															function() {
																this.range = this.editor
																		.getSelectionRange();
																f.ie
																		&& this.editor.contentDoc.selection
																				.empty();
																if (this.selectedValue) {
																	this
																			._updateSelectedOption(this.selectedValue)
																} else {
																	if (this.selectedItem) {
																		b
																				.removeClass(
																						this.selectedItem,
																						i);
																		this.selectedItem = null
																	}
																}
															}, this, true)
										},
										_renderSelectList : function() {
											var n = "", l = this.options, m, o;
											for (m in l) {
												o = l[m];
												n += c
														.replace("{VALUE}", o)
														.replace(
																"{STYLE}",
																this
																		._getOptionStyle(
																				m,
																				o))
														.replace("{KEY}", m)
											}
											this.selectList.innerHTML = h
													.replace("{LI}", n);
											b.addClass(this.selectList,
													"ks-editor-drop-menu-"
															+ this.name)
										},
										_bindPickEvent : function() {
											var l = this;
											j
													.on(
															this.selectList,
															"click",
															function(m) {
																var n = j
																		.getTarget(m);
																if (n.nodeName != "LI") {
																	n = b
																			.getAncestorByTagName(
																					n,
																					"li")
																}
																if (!n) {
																	return
																}
																l
																		._doAction(n
																				.getAttribute("data-value"));
																j
																		.stopPropagation(m);
																k.Menu
																		.hideActiveDropMenu(l.editor)
															});
											if (f.ie === 6) {
												j.on(this.items, "mouseenter",
														function() {
															b.addClass(this, d)
														});
												j.on(this.items, "mouseleave",
														function() {
															b.removeClass(this,
																	d)
														})
											}
										},
										_doAction : function(m) {
											if (!m) {
												return
											}
											this.selectedValue = m;
											this._setOption(m);
											var l = this.range;
											if (f.ie && l.select) {
												l.select()
											}
											this.editor.execCommand(this.name,
													this.selectedValue)
										},
										_setOption : function(l) {
											this._updateHeadText(this
													._getOptionKey(l));
											this._updateSelectedOption(l)
										},
										_getOptionStyle : function(l, m) {
											if (this.name == "fontName") {
												return "font-family:" + m
											} else {
												return "font-size:" + l + "px"
											}
										},
										_getOptionKey : function(n) {
											var l = this.options, m;
											for (m in l) {
												if (l[m] == n) {
													return m
												}
											}
											return null
										},
										_updateHeadText : function(l) {
											this.selectHead.innerHTML = l
										},
										_updateSelectedOption : function(p) {
											var m = this.items, n, l = m.length, o;
											for (n = 0; n < l; ++n) {
												o = m[n];
												if (o
														.getAttribute("data-value") == p) {
													b.addClass(o, i);
													this.selectedItem = o
												} else {
													b.removeClass(o, i)
												}
											}
										},
										updateState : function() {
											var p = this.editor.contentDoc, m = this.options, l = this.name, o, q;
											try {
												if (p.queryCommandEnabled(l)) {
													q = p.queryCommandValue(l);
													if (f.webkit
															&& l == "fontSize") {
														q = this
																._getWebkitFontSize(q)
													}
													q
															&& (o = this
																	._getOptionKey(q));
													if (o in m) {
														if (q != this.selectedValue) {
															this.selectedValue = q;
															this
																	._updateHeadText(o)
														}
													} else {
														this.selectedValue = "";
														this
																._updateHeadText(this.lang.text)
													}
												}
											} catch (n) {
											}
										},
										_getWebkitFontSize : function(l) {
											if (l in g) {
												return g[l]
											}
											return null
										}
									})
				});
KISSY.Editor
		.add(
				"plugins~image",
				function(j) {
					var c = YAHOO.util, b = c.Dom, u = c.Event, l = c.Connect, f = YAHOO.lang, k = YAHOO.env.ua, m = k.ie, h = j.PLUGIN_TYPE, d = "ks-editor-image", r = "ks-editor-btn-ok", e = "ks-editor-btn-cancel", g = "ks-editor-image-tabs", p = "ks-editor-image-tab-content", n = "ks-editor-image-uploading", a = "ks-editor-dialog-actions", o = "ks-editor-image-no-tab", t = "ks-editor-image-tab-selected", s = {
						local : '<li rel="local" class="' + t
								+ '">{tab_local}</li>',
						link : '<li rel="link">{tab_link}</li>',
						album : '<li rel="album">{tab_album}</li>'
					}, q = [
							'<form action="javascript: void(0)">',
							'<ul class="',
							g,
							' ks-clearfix">',
							"</ul>",
							'<div class="',
							p,
							'" rel="local" style="display: none">',
							"<label>{label_local}</label>",
							'<input type="file" size="40" name="imgFile" unselectable="on" />',
							"{local_extraCode}",
							"</div>",
							'<div class="',
							p,
							'" rel="link">',
							"<label>{label_link}</label>",
							'<input name="imgUrl" size="50" />',
							"</div>",
							'<div class="',
							p,
							'" rel="album" style="display: none">',
							"<label>{label_album}</label>",
							'<p style="width: 300px">\u5c1a\u672a\u5b9e\u73b0...</p>',
							"</div>", '<div class="', n,
							'" style="display: none">',
							'<p style="width: 300px">{uploading}</p>',
							"</div>", '<div class="', a, '">',
							'<button name="ok" class="', r, '">{ok}</button>',
							'<span class="', e, '">{cancel}</span>', "</div>",
							"</form>" ].join(""), i = {
						tabs : [ "link" ],
						upload : {
							actionUrl : "",
							filter : "png|gif|jpg|jpeg",
							filterMsg : "",
							enableXdr : false,
							connectionSwf : "http://a.tbcdn.cn/yui/2.8.0r4/build/connection/connection.swf",
							formatResponse : function(x) {
								var v = [];
								for ( var w in x) {
									v.push(x[w])
								}
								return v
							},
							extraCode : ""
						}
					};
					j
							.addPlugin(
									"image",
									{
										type : h.TOOLBAR_BUTTON,
										config : {},
										dialog : null,
										form : null,
										range : null,
										currentTab : null,
										currentPanel : null,
										uploadingPanel : null,
										actionsBar : null,
										init : function() {
											var v = this.editor.config.pluginsConfig[this.name]
													|| {};
											i.upload.filterMsg = this.lang.upload_filter;
											this.config = f.merge(i, v);
											this.config.upload = f.merge(
													i.upload, v.upload || {});
											this._renderUI();
											this._bindUI();
											this.actionsBar = b
													.getElementsByClassName(a,
															"div", this.dialog)[0];
											this.uploadingPanel = b
													.getElementsByClassName(n,
															"div", this.dialog)[0];
											this.config.upload.enableXdr
													&& this._initXdrUpload()
										},
										_renderUI : function() {
											var v = j.Menu.generateDropMenu(
													this.editor, this.domEl, [
															1, 0 ]), w = this.lang;
											w.local_extraCode = this.config.upload.extraCode;
											v.className += " " + d;
											v.innerHTML = q.replace(
													/\{([^}]+)\}/g, function(x,
															y) {
														return (y in w) ? w[y]
																: y
													});
											this.dialog = v;
											this.form = v
													.getElementsByTagName("form")[0];
											if (m) {
												j.Dom.setItemUnselectable(v)
											}
											this._renderTabs()
										},
										_renderTabs : function() {
											var v = this.lang, F = this, B = b
													.getElementsByClassName(g,
															"ul", this.dialog)[0], C = b
													.getElementsByClassName(p,
															"div", this.dialog);
											var E = this.config.tabs, z = "";
											for ( var x = 0, w = E.length; x < w; x++) {
												z += s[E[x]]
											}
											B.innerHTML = z.replace(
													/\{([^}]+)\}/g, function(G,
															H) {
														return (H in v) ? v[H]
																: H
													});
											var D = B.childNodes, A = C.length;
											if (D.length === 1) {
												b.addClass(this.dialog, o)
											}
											y(D[0]);
											u.on(D, "click", function() {
												y(this)
											});
											function y(I) {
												var H = 0, G = I
														.getAttribute("rel");
												for ( var J = 0; J < A; J++) {
													if (D[J]) {
														b.removeClass(D[J], t)
													}
													C[J].style.display = "none";
													if (C[J]
															.getAttribute("rel") == G) {
														H = J
													}
												}
												if (k.ie === 6) {
													j.Menu
															._updateShimRegion(F.dialog)
												}
												b.addClass(I, t);
												C[H].style.display = "";
												F.currentTab = I
														.getAttribute("rel");
												F.currentPanel = C[H]
											}
										},
										_bindUI : function() {
											var v = this;
											u
													.on(
															this.domEl,
															"click",
															function() {
																if (v.dialog.style.visibility === m ? "hidden"
																		: "visible") {
																	v._syncUI()
																}
															});
											u
													.on(
															this.dialog,
															"click",
															function(w) {
																var x = u
																		.getTarget(w), y = v.currentTab;
																switch (x.className) {
																case r:
																	if (y === "local") {
																		u
																				.stopPropagation(w);
																		v
																				._insertLocalImage()
																	} else {
																		v
																				._insertWebImage()
																	}
																	break;
																case e:
																	break;
																default:
																	u
																			.stopPropagation(w)
																}
															})
										},
										_initXdrUpload : function() {
											var x = this.config.tabs;
											for ( var w = 0, v = x.length; w < v; w++) {
												if (x[w] === "local") {
													l
															.transport(this.config.upload.connectionSwf);
													break
												}
											}
										},
										_insertLocalImage : function() {
											var A = this.form, w = this.config.upload, y = A.imgFile.value, z = w.actionUrl, v = this, x;
											if (y && z) {
												if (w.filter !== "*") {
													x = y
															.substring(
																	y
																			.lastIndexOf(".") + 1)
															.toLowerCase();
													if (w.filter.indexOf(x) == -1) {
														alert(w.filterMsg);
														v.form.reset();
														return
													}
												}
												this.uploadingPanel.style.display = "";
												this.currentPanel.style.display = "none";
												this.actionsBar.style.display = "none";
												if (k.ie === 6) {
													j.Menu
															._updateShimRegion(this.dialog)
												}
												l.setForm(A, true);
												l
														.asyncRequest(
																"post",
																z,
																{
																	upload : function(
																			D) {
																		try {
																			var C = w
																					.formatResponse(f.JSON
																							.parse(D.responseText));
																			if (C[0] == "0") {
																				v
																						._insertImage(C[1]);
																				v
																						._hideDialog()
																			} else {
																				v
																						._onUploadError(C[1])
																			}
																		} catch (B) {
																			v
																					._onUploadError(f
																							.dump(B)
																							+ "\no = "
																							+ f
																									.dump(D)
																							+ "\n[from upload catch code]")
																		}
																	},
																	xdr : w.enableXdr
																})
											} else {
												v._hideDialog()
											}
										},
										_onUploadError : function(v) {
											alert(this.lang.upload_error
													+ "\n\n" + v);
											this._hideDialog()
										},
										_insertWebImage : function() {
											var v = this.form.imgUrl.value;
											v && this._insertImage(v)
										},
										_hideDialog : function() {
											var v = this.editor.activeDropMenu;
											if (v
													&& b.isAncestor(v,
															this.dialog)) {
												j.Menu
														.hideActiveDropMenu(this.editor)
											}
											this.editor.contentWin.focus()
										},
										_syncUI : function() {
											this.range = j.Range
													.saveRange(this.editor);
											this.form.reset();
											this.uploadingPanel.style.display = "none";
											this.currentPanel.style.display = "";
											this.actionsBar.style.display = ""
										},
										_insertImage : function(x, B) {
											x = f.trim(x);
											if (x.length === 0) {
												return
											}
											var A = this.editor, w = this.range;
											if (window.getSelection) {
												var v = A.contentDoc
														.createElement("img");
												v.src = x;
												if (B) {
													v.setAttribute("alt", B)
												}
												w.deleteContents();
												w.insertNode(v);
												if (k.webkit) {
													var z = A.contentWin
															.getSelection();
													z.addRange(w);
													z.collapseToEnd()
												} else {
													w.setStartAfter(v)
												}
												A.contentWin.focus()
											} else {
												if (document.selection) {
													A.contentWin.focus();
													if ("text" in w) {
														w.select();
														var y = '<img src="'
																+ x + '"';
														B
																&& (y += ' "alt="'
																		+ B
																		+ '"');
														y += ">";
														w.pasteHTML(y)
													} else {
														w.execCommand(
																"insertImage",
																false, x)
													}
												}
											}
										}
									})
				});
KISSY.Editor.add("plugins~indent", function(b) {
	var c = b.PLUGIN_TYPE, a = {
		type : c.TOOLBAR_BUTTON,
		exec : function() {
			this.editor.execCommand(this.name);
			this.editor.toolbar.updateState()
		}
	};
	b.addPlugin([ "indent", "outdent" ], a)
});
KISSY.Editor.add("plugins~justify",
		function(b) {
			var d = b.PLUGIN_TYPE, c = [ "justifyLeft", "justifyCenter",
					"justifyRight" ], a = {
				type : d.TOOLBAR_BUTTON,
				exec : function() {
					this.editor.execCommand(this.name);
					this.editor.toolbar.updateState(c)
				}
			};
			b.addPlugin(c, a)
		});
KISSY.Editor.add("plugins~keystroke", function(c) {
	var d = YAHOO.util, a = d.Event, b = YAHOO.env.ua, e = c.PLUGIN_TYPE;
	c.addPlugin("keystroke", {
		type : e.FUNC,
		init : function() {
			var f = this.editor;
			if (b.ie && b.ie < 8) {
				a.on(f.contentDoc, "keydown", function(h) {
					if (h.keyCode == 9) {
						this.selection.empty()
					}
				})
			}
			var g = f.textarea.form;
			if (g) {
				new YAHOO.util.KeyListener(f.contentDoc, {
					ctrl : true,
					keys : 13
				}, {
					fn : function() {
						if (!f.sourceMode) {
							f.textarea.value = f.getData()
						}
						g.submit()
					}
				}).enable()
			}
		}
	})
});
KISSY.Editor
		.add(
				"plugins~link",
				function(j) {
					var b = YAHOO.util, a = b.Dom, r = b.Event, f = YAHOO.lang, k = YAHOO.env.ua, m = k.ie, i = j.PLUGIN_TYPE, o = j.Range, h = new Date()
							.getTime(), l = /^\w+:\/\/.*|#.*$/, c = "ks-editor-link", d = "ks-editor-link-newlink-mode", q = "ks-editor-btn-ok", e = "ks-editor-btn-cancel", p = "ks-editor-link-remove", g = "http://", n = [
							'<form onsubmit="return false"><ul>',
							'<li class="ks-editor-link-href"><label>{href}</label><input name="href" style="width: 220px" value="http://" type="text" /></li>',
							'<li class="ks-editor-link-target"><input name="target" id="target_"',
							h, ' type="checkbox" /> <label for="target_"', h,
							">{target}</label></li>",
							'<li class="ks-editor-dialog-actions">',
							'<button name="ok" class="', q, '">{ok}</button>',
							'<span class="', e, '">{cancel}</span>',
							'<span class="', p, '">{remove}</span>', "</li>",
							"</ul></form>" ].join("");
					j
							.addPlugin(
									"link",
									{
										type : i.TOOLBAR_BUTTON,
										dialog : null,
										form : null,
										range : null,
										init : function() {
											this._renderUI();
											this._bindUI()
										},
										_renderUI : function() {
											var s = j.Menu.generateDropMenu(
													this.editor, this.domEl, [
															1, 0 ]), t = this.lang;
											s.className += " " + c;
											s.innerHTML = n.replace(
													/\{([^}]+)\}/g, function(u,
															v) {
														return t[v] ? t[v] : v
													});
											this.dialog = s;
											this.form = s
													.getElementsByTagName("form")[0];
											k.webkit
													&& (this.form.target.parentNode.style.display = "none");
											m && j.Dom.setItemUnselectable(s)
										},
										_bindUI : function() {
											var t = this.form, s = this;
											r
													.on(
															this.domEl,
															"click",
															function() {
																if (s.dialog.style.visibility === m ? "hidden"
																		: "visible") {
																	s._syncUI()
																}
															});
											r
													.on(
															this.dialog,
															"click",
															function(u) {
																var v = r
																		.getTarget(u);
																switch (v.className) {
																case q:
																	s
																			._createLink(
																					t.href.value,
																					t.target.checked);
																	break;
																case e:
																	break;
																case p:
																	s._unLink();
																	break;
																default:
																	r
																			.stopPropagation(u)
																}
															})
										},
										_syncUI : function() {
											this.range = j.Range
													.saveRange(this.editor);
											var u = this.form, t, s;
											t = o.getCommonAncestor(this.range);
											s = (t.nodeName == "A") ? t : a
													.getAncestorByTagName(t,
															"A");
											if (s) {
												u.href.value = s.href;
												u.target.checked = s.target === "_blank";
												a.removeClass(u, d)
											} else {
												u.href.value = g;
												u.target.checked = false;
												a.addClass(u, d)
											}
											setTimeout(function() {
												u.href.select()
											}, 50)
										},
										_createLink : function(v, x) {
											v = this._getValidHref(v);
											if (v.length === 0) {
												this._unLink();
												return
											}
											var u = this.range, y = document
													.createElement("div"), t, s, w;
											s = o.getCommonAncestor(u);
											t = (s.nodeName == "A") ? s : a
													.getAncestorByTagName(s,
															"A");
											if (t) {
												t.href = v;
												if (x) {
													t.setAttribute("target",
															"_blank")
												} else {
													t.removeAttribute("target")
												}
												return
											}
											t = document.createElement("a");
											t.href = v;
											if (x) {
												t.setAttribute("target",
														"_blank")
											}
											if (m) {
												if (u.select) {
													u.select()
												}
												if ("text" in u) {
													t.innerHTML = u.htmlText
															|| v;
													y.innerHTML = "";
													y.appendChild(t);
													u.pasteHTML(y.innerHTML)
												} else {
													this.editor.execCommand(
															"createLink", v)
												}
											} else {
												if (k.webkit) {
													this.editor.execCommand(
															"createLink", v)
												} else {
													if (u.collapsed) {
														t.innerHTML = v
													} else {
														w = u.cloneContents();
														while (w.firstChild) {
															t
																	.appendChild(w.firstChild)
														}
													}
													u.deleteContents();
													u.insertNode(t);
													u.selectNode(t)
												}
											}
										},
										_getValidHref : function(s) {
											s = f.trim(s);
											if (s && !l.test(s)) {
												s = g + s
											}
											return s
										},
										_unLink : function() {
											var v = this.editor, t = this.range, w = o
													.getSelectedText(t), s = o
													.getCommonAncestor(t), u;
											if (!w && s.nodeType == 3) {
												u = s.parentNode;
												if (u.nodeName == "A") {
													u.parentNode.replaceChild(
															s, u)
												}
											} else {
												if (t.select) {
													t.select()
												}
												v.execCommand("unLink", null)
											}
										}
									})
				});
KISSY.Editor
		.add(
				"plugins~resize",
				function(d) {
					var e = YAHOO.util, a = e.Event, b = YAHOO.env.ua, f = d.PLUGIN_TYPE, c = '<span class="ks-editor-resize-larger" title="{larger_title}">{larger_text}</span><span class="ks-editor-resize-smaller" title="{smaller_title}">{smaller_text}</span>';
					d
							.addPlugin(
									"resize",
									{
										type : f.STATUSBAR_ITEM,
										contentEl : null,
										currentHeight : 0,
										init : function() {
											this.contentEl = this.editor.container.childNodes[1];
											this.currentHeight = parseInt(this.contentEl.style.height);
											this.renderUI();
											this.bindUI()
										},
										renderUI : function() {
											var g = this.lang;
											this.domEl.innerHTML = c.replace(
													/\{([^}]+)\}/g, function(h,
															i) {
														return g[i] ? g[i] : i
													})
										},
										bindUI : function() {
											var h = this.domEl
													.getElementsByTagName("span"), j = h[0], g = h[1], i = this.contentEl;
											a.on(j, "click", function() {
												this.currentHeight += 100;
												this._doResize()
											}, this, true);
											a.on(g, "click", function() {
												if (this.currentHeight < 100) {
													this.currentHeight = 0
												} else {
													this.currentHeight -= 100
												}
												this._doResize()
											}, this, true)
										},
										_doResize : function() {
											this.contentEl.style.height = this.currentHeight
													+ "px";
											this.editor.textarea.style.height = this.currentHeight
													+ "px"
										}
									})
				});
KISSY.Editor
		.add(
				"plugins~save",
				function(c) {
					var d = YAHOO.util, b = d.Event, e = c.PLUGIN_TYPE, a = {
						b : {
							tag : "strong"
						},
						i : {
							tag : "em"
						},
						u : {
							tag : "span",
							style : "text-decoration:underline"
						},
						strike : {
							tag : "span",
							style : "text-decoration:line-through"
						}
					};
					c
							.addPlugin(
									"save",
									{
										type : e.FUNC,
										init : function() {
											var g = this.editor, f = g.textarea, h = f.form;
											if (h) {
												b.on(h, "submit", function() {
													if (!g.sourceMode) {
														f.value = g.getData()
													}
												})
											}
										},
										filterData : function(f) {
											f = f
													.replace(
															/<(\/?)([^>\s]+)([^>]*)>/g,
															function(i, k, h, g) {
																h = h
																		.toLowerCase();
																var l = a[h], j = h;
																if (l && !g) {
																	j = l.tag;
																	if (!k
																			&& l.style) {
																		j += ' style="'
																				+ l.style
																				+ '"'
																	}
																}
																return "<" + k
																		+ j + g
																		+ ">"
															});
											if (f.indexOf("mso") > 0) {
												f = this.filterWord(f)
											}
											return f
										},
										filterWord : function(f) {
											f = f
													.replace(
															/<(\w[^>]*) onmouseover="([^\"]*)"([^>]*)/gi,
															"<$1$3");
											f = f
													.replace(
															/<(\w[^>]*) onmouseout="([^\"]*)"([^>]*)/gi,
															"<$1$3");
											f = f.replace(/<H(\d)([^>]*)>/gi,
													"<h$1>");
											f = f
													.replace(
															/<(H\d)><FONT[^>]*>([\s\S]*?)<\/FONT><\/\1>/gi,
															"<$1>$2</$1>");
											f = f
													.replace(
															/<(H\d)><EM>([\s\S]*?)<\/EM><\/\1>/gi,
															"<$1>$2</$1>");
											f = f.replace(/<meta[^>]*>/ig, "");
											f = f
													.replace(
															/<link rel="\S+" href="file:[^>]*">/ig,
															"");
											f = f
													.replace(
															/<!--\[if gte mso [0-9]{1,2}\]>[\s\S]*?<!\[endif\]-->/ig,
															"");
											f = f
													.replace(
															/<style>[\s\S]*?mso[\s\S]*?<\/style>/ig,
															"");
											f = f.replace(/ lang=".+?"/ig, "");
											f = f.replace(/<o:p><\/o:p>/ig, "");
											f = f.replace(/ class="Mso.+?"/ig,
													"");
											return f
										}
									})
				});
KISSY.Editor
		.add(
				"plugins~smiley",
				function(j) {
					var a = YAHOO.util, h = a.Event, c = YAHOO.lang, e = YAHOO.env.ua, d = j.PLUGIN_TYPE, g = "ks-editor-smiley-dialog", f = "ks-editor-smiley-icons", i = "ks-editor-smiley-sprite", b = {
						tabs : [ "default" ]
					};
					j
							.addPlugin(
									"smiley",
									{
										type : d.TOOLBAR_BUTTON,
										config : {},
										dialog : null,
										range : null,
										init : function() {
											this.config = c
													.merge(
															b,
															this.editor.config.pluginsConfig[this.name]
																	|| {});
											this._renderUI();
											this._bindUI()
										},
										_renderUI : function() {
											var k = j.Menu.generateDropMenu(
													this.editor, this.domEl, [
															1, 0 ]);
											k.className += " " + g;
											this.dialog = k;
											this._renderDialog();
											if (e.ie) {
												j.Dom.setItemUnselectable(k)
											}
										},
										_renderDialog : function() {
											var l = j.Smilies[this.config.tabs[0]], k = l.mode;
											if (k === "icons") {
												this._renderIcons(l)
											} else {
												if (k === "sprite") {
													this._renderSprite(l)
												}
											}
										},
										_renderIcons : function(m) {
											var l = this.editor.config.base
													+ "smilies/" + m.name + "/", n = m.fileNames, s = "."
													+ m.fileExt, r = m.cols, q = [], o, p = n.length, k;
											q.push('<div class="' + f + '">');
											for (o = 0; o < p; o++) {
												k = n[o];
												q.push('<img src="' + l + k + s
														+ '" alt="' + k
														+ '" title="' + k
														+ '" />');
												if (o % r === r - 1) {
													q.push("<br />")
												}
											}
											q.push("</div");
											this.dialog.innerHTML = q.join("")
										},
										_renderSprite : function(m) {
											var q = m.base, r = m.filePattern, l = "."
													+ m.fileExt, k = r.end + 1, p = r.step, n, o = [];
											o.push('<div class="' + i
													+ ' ks-clearfix" style="'
													+ m.spriteStyle + '">');
											for (n = 0; n < k; n += p) {
												o.push('<span data-icon="' + q
														+ n + l + '" style="'
														+ m.unitStyle
														+ '"></span>')
											}
											o.push("</div");
											this.dialog.innerHTML = o.join("")
										},
										_bindUI : function() {
											var k = this;
											h
													.on(
															this.domEl,
															"click",
															function() {
																k.range = j.Range
																		.saveRange(k.editor)
															});
											h
													.on(
															this.dialog,
															"click",
															function(l) {
																var m = h
																		.getTarget(l);
																switch (m.nodeName) {
																case "IMG":
																	k
																			._insertImage(
																					m.src,
																					m
																							.getAttribute("alt"));
																	break;
																case "SPAN":
																	k
																			._insertImage(
																					m
																							.getAttribute("data-icon"),
																					"");
																	break;
																default:
																	h
																			.stopPropagation(l)
																}
															})
										},
										_insertImage : function(m, p) {
											m = c.trim(m);
											if (m.length === 0) {
												return
											}
											var o = this.editor, l = this.range;
											if (window.getSelection) {
												var k = o.contentDoc
														.createElement("img");
												k.src = m;
												k.setAttribute("alt", p);
												l.deleteContents();
												l.insertNode(k);
												if (e.webkit) {
													var n = o.contentWin
															.getSelection();
													n.addRange(l);
													n.collapseToEnd()
												} else {
													l.setStartAfter(k)
												}
												o.contentWin.focus()
											} else {
												if (document.selection) {
													if ("text" in l) {
														l
																.pasteHTML('<img src="'
																		+ m
																		+ '" alt="'
																		+ p
																		+ '" />')
													} else {
														o.execCommand(
																"insertImage",
																m)
													}
												}
											}
										}
									})
				});
KISSY.Editor
		.add(
				"plugins~source",
				function(e) {
					var f = YAHOO.util, d = f.Dom, c = YAHOO.env.ua, g = e.PLUGIN_TYPE, b = "ks-editor-toolbar-button-selected", a = "ks-editor-src-mode";
					e
							.addPlugin(
									"source",
									{
										type : g.TOOLBAR_BUTTON,
										init : function() {
											var h = this.editor;
											this.iframe = h.contentWin.frameElement;
											this.textarea = h.textarea;
											this.iframe.parentNode
													.appendChild(h.textarea);
											d
													.addClass(this.domEl,
															"ks-editor-toolbar-source-button")
										},
										exec : function() {
											var h = this.editor, i = h.sourceMode;
											if (i) {
												h.contentDoc.body.innerHTML = this.textarea.value
											} else {
												this.textarea.value = h
														.getContentDocData()
											}
											if (c.ie && c.ie < 8) {
												h.contentDoc.selection.empty()
											}
											this.textarea.style.display = i ? "none"
													: "";
											this.iframe.style.display = i ? ""
													: "none";
											h.sourceMode = !i;
											this._updateButtonState()
										},
										_updateButtonState : function() {
											var h = this.editor, i = h.sourceMode;
											if (i) {
												d.addClass(h.container, a);
												d.addClass(this.domEl, b)
											} else {
												d.removeClass(h.container, a);
												d.removeClass(this.domEl, b)
											}
										}
									})
				});
KISSY.Editor.add("plugins~undo", function(a) {
	var b = a.PLUGIN_TYPE;
	a.addPlugin([ "undo", "redo" ], {
		type : b.TOOLBAR_BUTTON,
		exec : function() {
			this.editor.execCommand(this.name)
		}
	})
});
KISSY.Editor
		.add(
				"plugins~wordcount",
				function(f) {
					var g = YAHOO.util, c = g.Dom, b = g.Event, e = YAHOO.lang, h = f.PLUGIN_TYPE, d = "ks-editor-wordcount-alarm", a = {
						total : 50000,
						threshold : 100
					};
					f.addPlugin("wordcount", {
						type : h.STATUSBAR_ITEM,
						total : Infinity,
						remain : Infinity,
						threshold : 0,
						remainEl : null,
						init : function() {
							var j = e.merge(a,
									this.editor.config.pluginsConfig[this.name]
											|| {});
							this.total = j.total;
							this.threshold = j.threshold;
							this.renderUI();
							this.bindUI();
							var i = this;
							setTimeout(function() {
								i.syncUI()
							}, 50)
						},
						renderUI : function() {
							this.domEl.innerHTML = this.lang.tmpl.replace(
									"%remain%", "<em>" + this.total + "</em>");
							this.remainEl = this.domEl
									.getElementsByTagName("em")[0]
						},
						bindUI : function() {
							var i = this.editor;
							b.on(i.textarea, "keyup", this.syncUI, this, true);
							b
									.on(i.contentDoc, "keyup", this.syncUI,
											this, true);
							b.on(i.container, "click", this.syncUI, this, true)
						},
						syncUI : function() {
							this.remain = this.total
									- this.editor.getData().length;
							this.remainEl.innerHTML = this.remain;
							if (this.remain <= this.threshold) {
								c.addClass(this.domEl, d)
							} else {
								c.removeClass(this.domEl, d)
							}
						}
					})
				});
