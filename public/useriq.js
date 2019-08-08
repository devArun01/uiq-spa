function _uiq_forEach(e, t, n) {
  for (var r = 0; r < e.length; r++)
    t.call(n, r, e[r])
}
function _uiq_getComputedStyle(e, t) {
  if (window.getComputedStyle) {
    var n = getComputedStyle(e, null);
    switch (t) {
      case "height":
        n = n.height;
        break;
      case "width":
        n = n.width;
        break;
      default:
        n = 0
    }
    return parseInt(n, 10)
  }
  return 0
}
function _uiq_removeNode(e, t) {
  "string" != typeof e && (e = String(e));
  var n = document.querySelectorAll(e);
  _uiq_forEach(n, function (e, n) {
    n.classList.contains(t) || n.parentNode.removeChild(n)
  })
}
function _uiq_getEmbeddedCampaign(e) {
  var t = e.match(/.*[?&]_uiqc=([\d,]+)(&|#|$)/);
  return t = t ? t[1] : null
}
function _uiq_getEmbeddedTour(e) {
  var t = e.match(/.*[?&]_uiqt=t([\d,]+)(&|#|$)/);
  return t = t ? t[1] : null
}
function _uiq_removeEmbeddedTour(e) {
  var t = _uiq_getEmbeddedTour(e)
    , n = "?_uiqt=t" + t;
  return e = e.replace(n, "")
}
function _uiq_stopMedia(e, t) {
  t.src = e
}
function _uiq_trackVideoEvent(e, t, n) {
  window._uiq_activeData = window._uiq_activeData || {},
    window._uiq_activeData.videoUrl = e,
    window._uiq_activeData.interaction_state = t,
    window._uiq_activeData.interaction = "video",
    window._uiq_activeData.percentage = n,
    Useriq.useriqTracker.trackCampaign(window._uiq_activeData),
    _uiq_resetActiveData()
}
function _uiq_resetActiveData() {
  try {
    window._uiq_activeData = {}
  } catch (e) { }
}
function _uiq_checkInsideFrames(e, t) {
  var n = window.Useriq.frames;
  n.length && n.forEach(function (n) {
    useriqPostRobot.send(n, "check-step-element", {
      step_id: t,
      action_type: e
    })
  })
}
function _uiq_activateCampaign(e, t) {
  function n(e) {
    return "object" == typeof e || "[object Object]" == e.toString()
  }
  if (t = t || "",
    null !== e || "" !== e) {
    var r, i = Useriq.useriqTracker.getSiteId(), o = Useriq.useriqTracker.getCvarUserId(), a = Useriq.useriqTracker.getCustomVariable(null, "_uiq");
    if (n(a)) {
      void 0 !== Array.prototype.toJSON && delete Array.prototype.toJSON;
      try {
        _uiq_JSON.parse(a),
          r = a
      } catch (u) {
        r = _uiq_JSON.stringify(a)
      }
    } else
      r = a;
    try {
      r = window.encodeURIComponent(r)
    } catch (u) { }
    var s = _uiq_base_cf_url + "/active_campaign.json?site_id=" + i + "&uid=" + o + "&vid=null&campaign_type=" + t + "&campaign_id=" + e + "&_cvars=" + r
      , c = document.getElementById("uiq-campaign-" + e);
    c && c.parentNode.removeChild(c);
    var l = document
      , d = l.createElement("script")
      , f = l.getElementsByTagName("script")[0];
    d.type = "text/javascript",
      d.defer = !0,
      d.async = !0,
      d.id = "uiq-campaign-" + e,
      d.src = s,
      f.parentNode.insertBefore(d, f)
  }
}
function _uiq_previewCampaign(e) {
  function t(e) {
    return "object" == typeof e || "[object Object]" == e.toString()
  }
  if (null !== e && t(e)) {
    var n = Useriq.useriqTracker.getSiteId()
      , r = Useriq.useriqTracker.getCvarUserId()
      , i = Useriq.useriqTracker.getCustomVariable(null, "_uiq")
      , o = _uiq_base_cf_url + "/preview_campaign.json";
    window.fetch(o, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        site_id: n,
        uid: r,
        preview_campaign: e,
        _cvars: i
      })
    }).then(function (e) {
      return e.text()
    }).then(function (e) {
      var t = document.getElementById("uiq-campaign-" + n);
      t && t.parentNode.removeChild(t);
      var r = document
        , i = r.createElement("script")
        , o = r.getElementsByTagName("script")[0];
      i.type = "text/javascript",
        i.defer = !0,
        i.async = !0,
        i.id = "uiq-campaign-" + n,
        i.text = e,
        o.parentNode.insertBefore(i, o)
    })
  }
}
function _uiq_checkTooltipsXhr(e) {
  try {
    e = _uiq_JSON.parse(e)
  } catch (t) {
    console.warn(e),
      console.warn(t)
  }
  window._uiq_tooltip = !!e.tooltip && e.tooltip;
  var n = !!window._uiq_tooltip && window._uiq_tooltip.active_tooltips
    , r = !!n && window._uiq_tooltip.tooltip_ids
    , i = e.site_id;
  if (n && r) {
    r = _uiq_JSON.stringify(r);
    var o = _uiq_base_cf_url + "/active_tooltip.json?site_id=" + i + "&campaign_id=" + r
      , a = document.getElementById("uiq-tooltips-" + i);
    a && a.parentNode.removeChild(a);
    var u = document
      , s = u.createElement("script")
      , c = u.getElementsByTagName("script")[0];
    s.type = "text/javascript",
      s.defer = !0,
      s.async = !0,
      s.id = "uiq-tooltips-" + i,
      s.src = o,
      c.parentNode.insertBefore(s, c)
  }
}
function _uiq_checkAdminXhr(e) {
  try {
    e = _uiq_JSON.parse(e)
  } catch (t) {
    console.warn(e),
      console.warn(t)
  }
  var n = !!document.getElementById("UIQjquery")
    , r = !!document.getElementById("uiq_admin_app");
  window._uiq_admin = !!e.admin && e.admin,
    window._uiq_site_settings = !!e.site && e.site,
    window._uiq_cf_site_id = !!e.site_id && e.site_id,
    window._uiq_site_id = Useriq.useriqTracker.getSiteId();
  var i = !!window._uiq_admin && window._uiq_admin.active_admin;
  if (Useriq.useriqTracker.setSiteSettings(window._uiq_site_settings),
    window._uiq_cf_site_id === window._uiq_site_id && i && (n || _uiq_app.loadjQuery(),
      !r)) {
    var o = document.getElementById("uiq_admin_js");
    o && o.parentElement.removeChild(o),
      Useriq.useriqTracker.retrieveAdminAssets()
  }
}
function _uiq_checkFeaturesXhr(e, t) {
  try {
    e = _uiq_JSON.parse(e)
  } catch (n) {
    console.warn(e),
      console.warn(n)
  }
  var r = !!document.getElementById("UIQjquery");
  window._uiq_ft = !!e && e,
    window._uiq_master = !!e.master && e.master,
    window._uiq_campaign = !!e.campaign && e.campaign,
    window._uiq_launcher = !!e.launcher && e.launcher,
    window._uiq_site_settings = !!e.site && e.site,
    window._uiq_cf_site_id = !!e.site_id && e.site_id,
    window._uiq_site_id = Useriq.useriqTracker.getSiteId();
  var i = !!window._uiq_campaign && window._uiq_campaign.active_campaign
    , o = !!i && window._uiq_campaign.campaign_id
    , a = !!i && window._uiq_campaign.campaign_type
    , u = !!window._uiq_campaign && window._uiq_campaign.mobile_device
    , s = !!window._uiq_launcher && window._uiq_launcher.active_launcher;
  Useriq.useriqTracker.setSiteSettings(window._uiq_site_settings),
    Useriq.useriqTracker.removeAssets(!0),
    "412039601" == window._uiq_site_id && (i = !1);
  var c = _uiq_getEmbeddedTour(document.location.href);
  null !== c && (i = window._uiq_campaign.active_campaign = !0,
    o = window._uiq_campaign.campaign_id = c,
    a = window._uiq_campaign.campaign_type = "Guided Tour",
    t());
  var l = _uiq_getEmbeddedCampaign(document.location.href);
  null !== l && (i = window._uiq_campaign.active_campaign = !0,
    o = window._uiq_campaign.campaign_id = l,
    a = window._uiq_campaign.campaign_type = "",
    t());
  var d = window.sessionStorage.getItem("_uiq_preview_id")
    , f = window.sessionStorage.getItem("_uiq_preview_type");
  d && (i = window._uiq_campaign.active_campaign = !0,
    o = window._uiq_campaign.campaign_id = d,
    a = window._uiq_campaign.campaign_type = f,
    window.sessionStorage.removeItem("_uiq_preview_id"),
    window.sessionStorage.removeItem("_uiq_preview_type"),
    t());
  var p = window.sessionStorage.getItem("_uiq_launcher_campaign_id")
    , h = window.sessionStorage.getItem("_uiq_launcher_campaign_type");
  p && (i = window._uiq_campaign.active_campaign = !0,
    o = window._uiq_campaign.campaign_id = p,
    a = window._uiq_campaign.campaign_type = h,
    window.sessionStorage.removeItem("_uiq_launcher_campaign_id"),
    window.sessionStorage.removeItem("_uiq_launcher_campaign_type"),
    t());
  var m = window.sessionStorage.getItem("_uiq_tour_id");
  if (m && (i = window._uiq_campaign.active_campaign = !0,
    o = window._uiq_campaign.campaign_id = m,
    a = window._uiq_campaign.campaign_type = "Guided Tour",
    window.sessionStorage.removeItem("_uiq_tour_id"),
    t()),
    window._uiq_cf_site_id === window._uiq_site_id)
    if (i && "412039601" != window._uiq_site_id && (!i || u !== !1 && null !== u ? !i || u !== !0 || "308016601" != window._uiq_site_id && "310018701" != window._uiq_site_id && "310018601" != window._uiq_site_id || r || _uiq_app.loadjQuery() : r || _uiq_app.loadjQuery()),
      (s || i) && (r || _uiq_app.loadjQuery()),
      void 0 !== o ? Useriq.useriqTracker.setActiveCampaignId(o) : Useriq.useriqTracker.setActiveCampaignId(null),
      i) {
      var v = {
        type: a,
        id: o
      };
      Useriq.useriqTracker.setActiveCampaign(v)
    } else
      Useriq.useriqTracker.setActiveCampaign(null);
  try {
    window.sessionStorage.setItem("_uiq_ct", o)
  } catch (n) { }
  _uiq_onInitOrReload()
}
function _uiq_executeWhenLoaded(e, t) {
  for (var n = 0; n < t.length; n++)
    if (!window[t[n]])
      return void setTimeout(function () {
        _uiq_executeWhenLoaded(e, t)
      }, 50);
  e()
}
function _uiq_onInitOrReload() {
  clearTimeout(window.uiq_delay_present),
    _uiq_executeWhenLoaded(function () {
      var e = !!window._uiq_launcher && window._uiq_launcher.active_launcher
        , t = !!window._uiq_launcher && window._uiq_launcher.launcher_id
        , n = document.querySelector("#uiq_launcher:not(.useriq-app-preview)")
        , r = document.querySelector("#uiq_launcher_pane:not(.useriq-app-preview)")
        , i = document.querySelector("#uiq_launcher_badge:not(.useriq-app-preview)")
        , o = document.querySelector("#uiq_launcher_badge_pulse:not(.useriq-app-preview)")
        , a = document.querySelector("#uiq-launcher-css");
      window.uiq_launcher_api && (window.removeEventListener("hashchange", window.uiq_launcher_api._uiq_closePanel),
        window.removeEventListener("hashchange", window.uiq_launcher_api.uiq_resetLauncher),
        window.removeEventListener("beforeunload", window.uiq_launcher_api._uiq_closePanel),
        n && n.parentNode.removeChild(n),
        r && r.parentNode.removeChild(r),
        i && i.parentNode.removeChild(i),
        o && o.parentNode.removeChild(o),
        a && a.parentNode.removeChild(a)),
        e && _uiq_activateCampaign(t);
      var u = !!window._uiq_campaign && window._uiq_campaign.active_campaign
        , s = !!u && window._uiq_campaign.campaign_id
        , c = !!u && window._uiq_campaign.campaign_type;
      u && "Guided Tour" == c ? _uiq_activateCampaign(s, "Tour") : u && _uiq_activateCampaign(s)
    }, ["_uiq_jquery_ready"])
}
function _uiq_XHR_fallback(e, t, n) {
  var r = new XMLHttpRequest;
  r.open(e, t, !0),
    r.withCredentials = !0,
    r.timeout = 2e3,
    r.onreadystatechange = function () {
      4 !== r.readyState || r.status >= 200 && r.status < 400 ? 4 === r.readyState && "function" == typeof callback && console.log("fallback successfull") : console.log("fallback failed")
    }
    ,
    n && r.setRequestHeader("Content-Type", "application/json"),
    r.send(n)
}
function _uiq_XHR(e, t, n, r, i) {
  try {
    var o = Useriq.useriqTracker.getSiteId()
  } catch (a) {
    o = !1
  }
  var u = new XMLHttpRequest;
  u.open(e, t, !0),
    u.withCredentials = !0,
    "407029301" == o ? u.timeout = 2e3 : u.timeout = 4e3,
    u.onreadystatechange = function () {
      4 !== u.readyState || u.status >= 200 && u.status < 400 || !i ? 4 === u.readyState && "function" == typeof n && n(u.response, function () {
        _uiq_XHR_fallback(e, i, r)
      }) : _uiq_XHR_fallback(e, i, r)
    }
    ,
    r && u.setRequestHeader("Content-Type", "application/json"),
    u.send(r)
}
function UserIQ() {
  this.jQuery = !1,
    this.Sizzle = !1;
  try {
    this.Sizzle = window.Sizzle.noConflict()
  } catch (e) { }
  this.loadjQuery = function () {
    var e = this
      , t = document.createElement("script");
    t.src = "https://feed.useriq.com/js/jquery-useriq.min.js",
      t.id = "UIQjquery",
      t.readyState ? t.onreadystatechange = function () {
        var t = this.readyState;
        if (!t || "complete" === t || "loaded" === t)
          try {
            e.loadjQueryHandler()
          } catch (n) { }
      }
        : t.onload = function () {
          e.loadjQueryHandler()
        }
      ,
      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(t)
  }
    ,
    this.loadjQueryHandler = function () {
      try {
        this.jQuery = window.jQuery.noConflict(!0),
          window._uiq_jquery_ready = !0
      } catch (e) { }
    }
}
try {
  !function (e) {
    function t(e, t, n, r) {
      var i, o, a, u, s, c, l, f = t && t.ownerDocument, h = t ? t.nodeType : 9;
      if (n = n || [],
        "string" != typeof e || !e || 1 !== h && 9 !== h && 11 !== h)
        return n;
      if (!r && ((t ? t.ownerDocument || t : B) !== R && x(t),
        t = t || R,
        L)) {
        if (11 !== h && (s = ge.exec(e)))
          if (i = s[1]) {
            if (9 === h) {
              if (!(a = t.getElementById(i)))
                return n;
              if (a.id === i)
                return n.push(a),
                  n
            } else if (f && (a = f.getElementById(i)) && U(t, a) && a.id === i)
              return n.push(a),
                n
          } else {
            if (s[2])
              return K.apply(n, t.getElementsByTagName(e)),
                n;
            if ((i = s[3]) && q.getElementsByClassName && t.getElementsByClassName)
              return K.apply(n, t.getElementsByClassName(i)),
                n
          }
        if (q.qsa && !F[e + " "] && (!D || !D.test(e))) {
          if (1 !== h)
            f = t,
              l = e;
          else if ("object" !== t.nodeName.toLowerCase()) {
            for ((u = t.getAttribute("id")) ? u = u.replace(be, qe) : t.setAttribute("id", u = W),
              c = O(e),
              o = c.length; o--;)
              c[o] = "#" + u + " " + p(c[o]);
            l = c.join(","),
              f = we.test(e) && d(t.parentNode) || t
          }
          if (l)
            try {
              return K.apply(n, f.querySelectorAll(l)),
                n
            } catch (m) { } finally {
              u === W && t.removeAttribute("id")
            }
        }
      }
      return A(e.replace(ue, "$1"), t, n, r)
    }
    function n() {
      function e(n, r) {
        return t.push(n + " ") > E.cacheLength && delete e[t.shift()],
          e[n + " "] = r
      }
      var t = [];
      return e
    }
    function r(e) {
      return e[W] = !0,
        e
    }
    function i(e) {
      var t = R.createElement("fieldset");
      try {
        return !!e(t)
      } catch (n) {
        return !1
      } finally {
        t.parentNode && t.parentNode.removeChild(t),
          t = null
      }
    }
    function o(e, t) {
      for (var n = e.split("|"), r = n.length; r--;)
        E.attrHandle[n[r]] = t
    }
    function a(e, t) {
      var n = t && e
        , r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
      if (r)
        return r;
      if (n)
        for (; n = n.nextSibling;)
          if (n === t)
            return -1;
      return e ? 1 : -1
    }
    function u(e) {
      return function (t) {
        var n = t.nodeName.toLowerCase();
        return "input" === n && t.type === e
      }
    }
    function s(e) {
      return function (t) {
        var n = t.nodeName.toLowerCase();
        return ("input" === n || "button" === n) && t.type === e
      }
    }
    function c(e) {
      return function (t) {
        return "form" in t ? t.parentNode && t.disabled === !1 ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && Se(t) === e : t.disabled === e : "label" in t && t.disabled === e
      }
    }
    function l(e) {
      return r(function (t) {
        return t = +t,
          r(function (n, r) {
            for (var i, o = e([], n.length, t), a = o.length; a--;)
              n[i = o[a]] && (n[i] = !(r[i] = n[i]))
          })
      })
    }
    function d(e) {
      return e && "undefined" != typeof e.getElementsByTagName && e
    }
    function f() { }
    function p(e) {
      for (var t = 0, n = e.length, r = ""; t < n; t++)
        r += e[t].value;
      return r
    }
    function h(e, t, n) {
      var r = t.dir
        , i = t.next
        , o = i || r
        , a = n && "parentNode" === o
        , u = G++;
      return t.first ? function (t, n, i) {
        for (; t = t[r];)
          if (1 === t.nodeType || a)
            return e(t, n, i);
        return !1
      }
        : function (t, n, s) {
          var c, l, d, f = [z, u];
          if (s) {
            for (; t = t[r];)
              if ((1 === t.nodeType || a) && e(t, n, s))
                return !0
          } else
            for (; t = t[r];)
              if (1 === t.nodeType || a)
                if (d = t[W] || (t[W] = {}),
                  l = d[t.uniqueID] || (d[t.uniqueID] = {}),
                  i && i === t.nodeName.toLowerCase())
                  t = t[r] || t;
                else {
                  if ((c = l[o]) && c[0] === z && c[1] === u)
                    return f[2] = c[2];
                  if (l[o] = f,
                    f[2] = e(t, n, s))
                    return !0
                }
          return !1
        }
    }
    function m(e) {
      return e.length > 1 ? function (t, n, r) {
        for (var i = e.length; i--;)
          if (!e[i](t, n, r))
            return !1;
        return !0
      }
        : e[0]
    }
    function v(e, n, r) {
      for (var i = 0, o = n.length; i < o; i++)
        t(e, n[i], r);
      return r
    }
    function g(e, t, n, r, i) {
      for (var o, a = [], u = 0, s = e.length, c = null != t; u < s; u++)
        (o = e[u]) && (n && !n(o, r, i) || (a.push(o),
          c && t.push(u)));
      return a
    }
    function w(e, t, n, i, o, a) {
      return i && !i[W] && (i = w(i)),
        o && !o[W] && (o = w(o, a)),
        r(function (r, a, u, s) {
          var c, l, d, f = [], p = [], h = a.length, m = r || v(t || "*", u.nodeType ? [u] : u, []), w = !e || !r && t ? m : g(m, f, e, u, s), _ = n ? o || (r ? e : h || i) ? [] : a : w;
          if (n && n(w, _, u, s),
            i)
            for (c = g(_, p),
              i(c, [], u, s),
              l = c.length; l--;)
              (d = c[l]) && (_[p[l]] = !(w[p[l]] = d));
          if (r) {
            if (o || e) {
              if (o) {
                for (c = [],
                  l = _.length; l--;)
                  (d = _[l]) && c.push(w[l] = d);
                o(null, _ = [], c, s)
              }
              for (l = _.length; l--;)
                (d = _[l]) && (c = o ? ee(r, d) : f[l]) > -1 && (r[c] = !(a[c] = d))
            }
          } else
            _ = g(_ === a ? _.splice(h, _.length) : _),
              o ? o(null, a, _, s) : K.apply(a, _)
        })
    }
    function _(e) {
      for (var t, n, r, i = e.length, o = E.relative[e[0].type], a = o || E.relative[" "], u = o ? 1 : 0, s = h(function (e) {
        return e === t
      }, a, !0), c = h(function (e) {
        return ee(t, e) > -1
      }, a, !0), l = [function (e, n, r) {
        var i = !o && (r || n !== k) || ((t = n).nodeType ? s(e, n, r) : c(e, n, r));
        return t = null,
          i
      }
      ]; u < i; u++)
        if (n = E.relative[e[u].type])
          l = [h(m(l), n)];
        else {
          if (n = E.filter[e[u].type].apply(null, e[u].matches),
            n[W]) {
            for (r = ++u; r < i && !E.relative[e[r].type]; r++)
              ;
            return w(u > 1 && m(l), u > 1 && p(e.slice(0, u - 1).concat({
              value: " " === e[u - 2].type ? "*" : ""
            })).replace(ue, "$1"), n, u < r && _(e.slice(u, r)), r < i && _(e = e.slice(r)), r < i && p(e))
          }
          l.push(n)
        }
      return m(l)
    }
    function y(e, n) {
      var i = n.length > 0
        , o = e.length > 0
        , a = function (r, a, u, s, c) {
          var l, d, f, p = 0, h = "0", m = r && [], v = [], w = k, _ = r || o && E.find.TAG("*", c), y = z += null == w ? 1 : Math.random() || .1, b = _.length;
          for (c && (k = a === R || a || c); h !== b && null != (l = _[h]); h++) {
            if (o && l) {
              for (d = 0,
                a || l.ownerDocument === R || (x(l),
                  u = !L); f = e[d++];)
                if (f(l, a || R, u)) {
                  s.push(l);
                  break
                }
              c && (z = y)
            }
            i && ((l = !f && l) && p-- ,
              r && m.push(l))
          }
          if (p += h,
            i && h !== p) {
            for (d = 0; f = n[d++];)
              f(m, v, a, u);
            if (r) {
              if (p > 0)
                for (; h--;)
                  m[h] || v[h] || (v[h] = $.call(s));
              v = g(v)
            }
            K.apply(s, v),
              c && !r && v.length > 0 && p + n.length > 1 && t.uniqueSort(s)
          }
          return c && (z = y,
            k = w),
            m
        };
      return i ? r(a) : a
    }
    var b, q, E, S, T, O, C, A, k, P, N, x, R, I, L, D, j, M, U, W = "sizzle" + 1 * new Date, B = e.document, z = 0, G = 0, H = n(), J = n(), F = n(), Y = function (e, t) {
      return e === t && (N = !0),
        0
    }, V = {}.hasOwnProperty, X = [], $ = X.pop, Q = X.push, K = X.push, Z = X.slice, ee = function (e, t) {
      for (var n = 0, r = e.length; n < r; n++)
        if (e[n] === t)
          return n;
      return -1
    }, te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ne = "[\\x20\\t\\r\\n\\f]", re = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", ie = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + re + "))|)" + ne + "*\\]", oe = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)", ae = new RegExp(ne + "+", "g"), ue = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"), se = new RegExp("^" + ne + "*," + ne + "*"), ce = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"), le = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"), de = new RegExp(oe), fe = new RegExp("^" + re + "$"), pe = {
      ID: new RegExp("^#(" + re + ")"),
      CLASS: new RegExp("^\\.(" + re + ")"),
      TAG: new RegExp("^(" + re + "|[*])"),
      ATTR: new RegExp("^" + ie),
      PSEUDO: new RegExp("^" + oe),
      CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
      bool: new RegExp("^(?:" + te + ")$", "i"),
      needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
    }, he = /^(?:input|select|textarea|button)$/i, me = /^h\d$/i, ve = /^[^{]+\{\s*\[native \w/, ge = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, we = /[+~]/, _e = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"), ye = function (e, t, n) {
      var r = "0x" + t - 65536;
      return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
    }, be = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, qe = function (e, t) {
      return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
    }, Ee = function () {
      x()
    }, Se = h(function (e) {
      return e.disabled === !0 && "fieldset" === e.nodeName.toLowerCase()
    }, {
        dir: "parentNode",
        next: "legend"
      });
    try {
      K.apply(X = Z.call(B.childNodes), B.childNodes),
        X[B.childNodes.length].nodeType
    } catch (Te) {
      K = {
        apply: X.length ? function (e, t) {
          Q.apply(e, Z.call(t))
        }
          : function (e, t) {
            for (var n = e.length, r = 0; e[n++] = t[r++];)
              ;
            e.length = n - 1
          }
      }
    }
    q = t.support = {},
      T = t.isXML = function (e) {
        var t = e && (e.ownerDocument || e).documentElement;
        return !!t && "HTML" !== t.nodeName
      }
      ,
      x = t.setDocument = function (e) {
        var t, n, r = e ? e.ownerDocument || e : B;
        return r !== R && 9 === r.nodeType && r.documentElement ? (R = r,
          I = R.documentElement,
          L = !T(R),
          B !== R && (n = R.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Ee, !1) : n.attachEvent && n.attachEvent("onunload", Ee)),
          q.attributes = i(function (e) {
            return e.className = "i",
              !e.getAttribute("className")
          }),
          q.getElementsByTagName = i(function (e) {
            return e.appendChild(R.createComment("")),
              !e.getElementsByTagName("*").length
          }),
          q.getElementsByClassName = ve.test(R.getElementsByClassName),
          q.getById = i(function (e) {
            return I.appendChild(e).id = W,
              !R.getElementsByName || !R.getElementsByName(W).length
          }),
          q.getById ? (E.filter.ID = function (e) {
            var t = e.replace(_e, ye);
            return function (e) {
              return e.getAttribute("id") === t
            }
          }
            ,
            E.find.ID = function (e, t) {
              if ("undefined" != typeof t.getElementById && L) {
                var n = t.getElementById(e);
                return n ? [n] : []
              }
            }
          ) : (E.filter.ID = function (e) {
            var t = e.replace(_e, ye);
            return function (e) {
              var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
              return n && n.value === t
            }
          }
            ,
            E.find.ID = function (e, t) {
              if ("undefined" != typeof t.getElementById && L) {
                var n, r, i, o = t.getElementById(e);
                if (o) {
                  if (n = o.getAttributeNode("id"),
                    n && n.value === e)
                    return [o];
                  for (i = t.getElementsByName(e),
                    r = 0; o = i[r++];)
                    if (n = o.getAttributeNode("id"),
                      n && n.value === e)
                      return [o]
                }
                return []
              }
            }
            ),
          E.find.TAG = q.getElementsByTagName ? function (e, t) {
            return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : q.qsa ? t.querySelectorAll(e) : void 0
          }
            : function (e, t) {
              var n, r = [], i = 0, o = t.getElementsByTagName(e);
              if ("*" === e) {
                for (; n = o[i++];)
                  1 === n.nodeType && r.push(n);
                return r
              }
              return o
            }
          ,
          E.find.CLASS = q.getElementsByClassName && function (e, t) {
            if ("undefined" != typeof t.getElementsByClassName && L)
              return t.getElementsByClassName(e)
          }
          ,
          j = [],
          D = [],
          (q.qsa = ve.test(R.querySelectorAll)) && (i(function (e) {
            I.appendChild(e).innerHTML = "<a id='" + W + "'></a><select id='" + W + "-\r\\' msallowcapture=''><option selected=''></option></select>",
              e.querySelectorAll("[msallowcapture^='']").length && D.push("[*^$]=" + ne + "*(?:''|\"\")"),
              e.querySelectorAll("[selected]").length || D.push("\\[" + ne + "*(?:value|" + te + ")"),
              e.querySelectorAll("[id~=" + W + "-]").length || D.push("~="),
              e.querySelectorAll(":checked").length || D.push(":checked"),
              e.querySelectorAll("a#" + W + "+*").length || D.push(".#.+[+~]")
          }),
            i(function (e) {
              e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
              var t = R.createElement("input");
              t.setAttribute("type", "hidden"),
                e.appendChild(t).setAttribute("name", "D"),
                e.querySelectorAll("[name=d]").length && D.push("name" + ne + "*[*^$|!~]?="),
                2 !== e.querySelectorAll(":enabled").length && D.push(":enabled", ":disabled"),
                I.appendChild(e).disabled = !0,
                2 !== e.querySelectorAll(":disabled").length && D.push(":enabled", ":disabled"),
                e.querySelectorAll("*,:x"),
                D.push(",.*:")
            })),
          (q.matchesSelector = ve.test(M = I.matches || I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && i(function (e) {
            q.disconnectedMatch = M.call(e, "*"),
              M.call(e, "[s!='']:x"),
              j.push("!=", oe)
          }),
          D = D.length && new RegExp(D.join("|")),
          j = j.length && new RegExp(j.join("|")),
          t = ve.test(I.compareDocumentPosition),
          U = t || ve.test(I.contains) ? function (e, t) {
            var n = 9 === e.nodeType ? e.documentElement : e
              , r = t && t.parentNode;
            return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
          }
            : function (e, t) {
              if (t)
                for (; t = t.parentNode;)
                  if (t === e)
                    return !0;
              return !1
            }
          ,
          Y = t ? function (e, t) {
            if (e === t)
              return N = !0,
                0;
            var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
            return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1,
              1 & n || !q.sortDetached && t.compareDocumentPosition(e) === n ? e === R || e.ownerDocument === B && U(B, e) ? -1 : t === R || t.ownerDocument === B && U(B, t) ? 1 : P ? ee(P, e) - ee(P, t) : 0 : 4 & n ? -1 : 1)
          }
            : function (e, t) {
              if (e === t)
                return N = !0,
                  0;
              var n, r = 0, i = e.parentNode, o = t.parentNode, u = [e], s = [t];
              if (!i || !o)
                return e === R ? -1 : t === R ? 1 : i ? -1 : o ? 1 : P ? ee(P, e) - ee(P, t) : 0;
              if (i === o)
                return a(e, t);
              for (n = e; n = n.parentNode;)
                u.unshift(n);
              for (n = t; n = n.parentNode;)
                s.unshift(n);
              for (; u[r] === s[r];)
                r++;
              return r ? a(u[r], s[r]) : u[r] === B ? -1 : s[r] === B ? 1 : 0
            }
          ,
          R) : R
      }
      ,
      t.matches = function (e, n) {
        return t(e, null, null, n)
      }
      ,
      t.matchesSelector = function (e, n) {
        if ((e.ownerDocument || e) !== R && x(e),
          n = n.replace(le, "='$1']"),
          q.matchesSelector && L && !F[n + " "] && (!j || !j.test(n)) && (!D || !D.test(n)))
          try {
            var r = M.call(e, n);
            if (r || q.disconnectedMatch || e.document && 11 !== e.document.nodeType)
              return r
          } catch (i) { }
        return t(n, R, null, [e]).length > 0
      }
      ,
      t.contains = function (e, t) {
        return (e.ownerDocument || e) !== R && x(e),
          U(e, t)
      }
      ,
      t.attr = function (e, t) {
        (e.ownerDocument || e) !== R && x(e);
        var n = E.attrHandle[t.toLowerCase()]
          , r = n && V.call(E.attrHandle, t.toLowerCase()) ? n(e, t, !L) : void 0;
        return void 0 !== r ? r : q.attributes || !L ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
      }
      ,
      t.escape = function (e) {
        return (e + "").replace(be, qe)
      }
      ,
      t.error = function (e) {
        throw new Error("Syntax error, unrecognized expression: " + e)
      }
      ,
      t.uniqueSort = function (e) {
        var t, n = [], r = 0, i = 0;
        if (N = !q.detectDuplicates,
          P = !q.sortStable && e.slice(0),
          e.sort(Y),
          N) {
          for (; t = e[i++];)
            t === e[i] && (r = n.push(i));
          for (; r--;)
            e.splice(n[r], 1)
        }
        return P = null,
          e
      }
      ,
      S = t.getText = function (e) {
        var t, n = "", r = 0, i = e.nodeType;
        if (i) {
          if (1 === i || 9 === i || 11 === i) {
            if ("string" == typeof e.textContent)
              return e.textContent;
            for (e = e.firstChild; e; e = e.nextSibling)
              n += S(e)
          } else if (3 === i || 4 === i)
            return e.nodeValue
        } else
          for (; t = e[r++];)
            n += S(t);
        return n
      }
      ,
      E = t.selectors = {
        cacheLength: 50,
        createPseudo: r,
        match: pe,
        attrHandle: {},
        find: {},
        relative: {
          ">": {
            dir: "parentNode",
            first: !0
          },
          " ": {
            dir: "parentNode"
          },
          "+": {
            dir: "previousSibling",
            first: !0
          },
          "~": {
            dir: "previousSibling"
          }
        },
        preFilter: {
          ATTR: function (e) {
            return e[1] = e[1].replace(_e, ye),
              e[3] = (e[3] || e[4] || e[5] || "").replace(_e, ye),
              "~=" === e[2] && (e[3] = " " + e[3] + " "),
              e.slice(0, 4)
          },
          CHILD: function (e) {
            return e[1] = e[1].toLowerCase(),
              "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]),
                e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]),
              e
          },
          PSEUDO: function (e) {
            var t, n = !e[6] && e[2];
            return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && de.test(n) && (t = O(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
              e[2] = n.slice(0, t)),
              e.slice(0, 3))
          }
        },
        filter: {
          TAG: function (e) {
            var t = e.replace(_e, ye).toLowerCase();
            return "*" === e ? function () {
              return !0
            }
              : function (e) {
                return e.nodeName && e.nodeName.toLowerCase() === t
              }
          },
          CLASS: function (e) {
            var t = H[e + " "];
            return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && H(e, function (e) {
              return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
            })
          },
          ATTR: function (e, n, r) {
            return function (i) {
              var o = t.attr(i, e);
              return null == o ? "!=" === n : !n || (o += "",
                "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(ae, " ") + " ").indexOf(r) > -1 : "|=" === n && (o === r || o.slice(0, r.length + 1) === r + "-"))
            }
          },
          CHILD: function (e, t, n, r, i) {
            var o = "nth" !== e.slice(0, 3)
              , a = "last" !== e.slice(-4)
              , u = "of-type" === t;
            return 1 === r && 0 === i ? function (e) {
              return !!e.parentNode
            }
              : function (t, n, s) {
                var c, l, d, f, p, h, m = o !== a ? "nextSibling" : "previousSibling", v = t.parentNode, g = u && t.nodeName.toLowerCase(), w = !s && !u, _ = !1;
                if (v) {
                  if (o) {
                    for (; m;) {
                      for (f = t; f = f[m];)
                        if (u ? f.nodeName.toLowerCase() === g : 1 === f.nodeType)
                          return !1;
                      h = m = "only" === e && !h && "nextSibling"
                    }
                    return !0
                  }
                  if (h = [a ? v.firstChild : v.lastChild],
                    a && w) {
                    for (f = v,
                      d = f[W] || (f[W] = {}),
                      l = d[f.uniqueID] || (d[f.uniqueID] = {}),
                      c = l[e] || [],
                      p = c[0] === z && c[1],
                      _ = p && c[2],
                      f = p && v.childNodes[p]; f = ++p && f && f[m] || (_ = p = 0) || h.pop();)
                      if (1 === f.nodeType && ++_ && f === t) {
                        l[e] = [z, p, _];
                        break
                      }
                  } else if (w && (f = t,
                    d = f[W] || (f[W] = {}),
                    l = d[f.uniqueID] || (d[f.uniqueID] = {}),
                    c = l[e] || [],
                    p = c[0] === z && c[1],
                    _ = p),
                    _ === !1)
                    for (; (f = ++p && f && f[m] || (_ = p = 0) || h.pop()) && ((u ? f.nodeName.toLowerCase() !== g : 1 !== f.nodeType) || !++_ || (w && (d = f[W] || (f[W] = {}),
                      l = d[f.uniqueID] || (d[f.uniqueID] = {}),
                      l[e] = [z, _]),
                      f !== t));)
                      ;
                  return _ -= i,
                    _ === r || _ % r === 0 && _ / r >= 0
                }
              }
          },
          PSEUDO: function (e, n) {
            var i, o = E.pseudos[e] || E.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
            return o[W] ? o(n) : o.length > 1 ? (i = [e, e, "", n],
              E.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function (e, t) {
                for (var r, i = o(e, n), a = i.length; a--;)
                  r = ee(e, i[a]),
                    e[r] = !(t[r] = i[a])
              }) : function (e) {
                return o(e, 0, i)
              }
            ) : o
          }
        },
        pseudos: {
          not: r(function (e) {
            var t = []
              , n = []
              , i = C(e.replace(ue, "$1"));
            return i[W] ? r(function (e, t, n, r) {
              for (var o, a = i(e, null, r, []), u = e.length; u--;)
                (o = a[u]) && (e[u] = !(t[u] = o))
            }) : function (e, r, o) {
              return t[0] = e,
                i(t, null, o, n),
                t[0] = null,
                !n.pop()
            }
          }),
          has: r(function (e) {
            return function (n) {
              return t(e, n).length > 0
            }
          }),
          contains: r(function (e) {
            return e = e.replace(_e, ye),
              function (t) {
                return (t.textContent || t.innerText || S(t)).indexOf(e) > -1
              }
          }),
          lang: r(function (e) {
            return fe.test(e || "") || t.error("unsupported lang: " + e),
              e = e.replace(_e, ye).toLowerCase(),
              function (t) {
                var n;
                do
                  if (n = L ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                    return n = n.toLowerCase(),
                      n === e || 0 === n.indexOf(e + "-");
                while ((t = t.parentNode) && 1 === t.nodeType); return !1
              }
          }),
          target: function (t) {
            var n = e.location && e.location.hash;
            return n && n.slice(1) === t.id
          },
          root: function (e) {
            return e === I
          },
          focus: function (e) {
            return e === R.activeElement && (!R.hasFocus || R.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
          },
          enabled: c(!1),
          disabled: c(!0),
          checked: function (e) {
            var t = e.nodeName.toLowerCase();
            return "input" === t && !!e.checked || "option" === t && !!e.selected
          },
          selected: function (e) {
            return e.parentNode && e.parentNode.selectedIndex,
              e.selected === !0
          },
          empty: function (e) {
            for (e = e.firstChild; e; e = e.nextSibling)
              if (e.nodeType < 6)
                return !1;
            return !0
          },
          parent: function (e) {
            return !E.pseudos.empty(e)
          },
          header: function (e) {
            return me.test(e.nodeName)
          },
          input: function (e) {
            return he.test(e.nodeName)
          },
          button: function (e) {
            var t = e.nodeName.toLowerCase();
            return "input" === t && "button" === e.type || "button" === t
          },
          text: function (e) {
            var t;
            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
          },
          first: l(function () {
            return [0]
          }),
          last: l(function (e, t) {
            return [t - 1]
          }),
          eq: l(function (e, t, n) {
            return [n < 0 ? n + t : n]
          }),
          even: l(function (e, t) {
            for (var n = 0; n < t; n += 2)
              e.push(n);
            return e
          }),
          odd: l(function (e, t) {
            for (var n = 1; n < t; n += 2)
              e.push(n);
            return e
          }),
          lt: l(function (e, t, n) {
            for (var r = n < 0 ? n + t : n; --r >= 0;)
              e.push(r);
            return e
          }),
          gt: l(function (e, t, n) {
            for (var r = n < 0 ? n + t : n; ++r < t;)
              e.push(r);
            return e
          })
        }
      },
      E.pseudos.nth = E.pseudos.eq;
    for (b in {
      radio: !0,
      checkbox: !0,
      file: !0,
      password: !0,
      image: !0
    })
      E.pseudos[b] = u(b);
    for (b in {
      submit: !0,
      reset: !0
    })
      E.pseudos[b] = s(b);
    f.prototype = E.filters = E.pseudos,
      E.setFilters = new f,
      O = t.tokenize = function (e, n) {
        var r, i, o, a, u, s, c, l = J[e + " "];
        if (l)
          return n ? 0 : l.slice(0);
        for (u = e,
          s = [],
          c = E.preFilter; u;) {
          r && !(i = se.exec(u)) || (i && (u = u.slice(i[0].length) || u),
            s.push(o = [])),
            r = !1,
            (i = ce.exec(u)) && (r = i.shift(),
              o.push({
                value: r,
                type: i[0].replace(ue, " ")
              }),
              u = u.slice(r.length));
          for (a in E.filter)
            !(i = pe[a].exec(u)) || c[a] && !(i = c[a](i)) || (r = i.shift(),
              o.push({
                value: r,
                type: a,
                matches: i
              }),
              u = u.slice(r.length));
          if (!r)
            break
        }
        return n ? u.length : u ? t.error(e) : J(e, s).slice(0)
      }
      ,
      C = t.compile = function (e, t) {
        var n, r = [], i = [], o = F[e + " "];
        if (!o) {
          for (t || (t = O(e)),
            n = t.length; n--;)
            o = _(t[n]),
              o[W] ? r.push(o) : i.push(o);
          o = F(e, y(i, r)),
            o.selector = e
        }
        return o
      }
      ,
      A = t.select = function (e, t, n, r) {
        var i, o, a, u, s, c = "function" == typeof e && e, l = !r && O(e = c.selector || e);
        if (n = n || [],
          1 === l.length) {
          if (o = l[0] = l[0].slice(0),
            o.length > 2 && "ID" === (a = o[0]).type && 9 === t.nodeType && L && E.relative[o[1].type]) {
            if (t = (E.find.ID(a.matches[0].replace(_e, ye), t) || [])[0],
              !t)
              return n;
            c && (t = t.parentNode),
              e = e.slice(o.shift().value.length)
          }
          for (i = pe.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i],
            !E.relative[u = a.type]);)
            if ((s = E.find[u]) && (r = s(a.matches[0].replace(_e, ye), we.test(o[0].type) && d(t.parentNode) || t))) {
              if (o.splice(i, 1),
                e = r.length && p(o),
                !e)
                return K.apply(n, r),
                  n;
              break
            }
        }
        return (c || C(e, l))(r, t, !L, n, !t || we.test(e) && d(t.parentNode) || t),
          n
      }
      ,
      q.sortStable = W.split("").sort(Y).join("") === W,
      q.detectDuplicates = !!N,
      x(),
      q.sortDetached = i(function (e) {
        return 1 & e.compareDocumentPosition(R.createElement("fieldset"))
      }),
      i(function (e) {
        return e.innerHTML = "<a href='#'></a>",
          "#" === e.firstChild.getAttribute("href")
      }) || o("type|href|height|width", function (e, t, n) {
        if (!n)
          return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
      }),
      q.attributes && i(function (e) {
        return e.innerHTML = "<input/>",
          e.firstChild.setAttribute("value", ""),
          "" === e.firstChild.getAttribute("value")
      }) || o("value", function (e, t, n) {
        if (!n && "input" === e.nodeName.toLowerCase())
          return e.defaultValue
      }),
      i(function (e) {
        return null == e.getAttribute("disabled")
      }) || o(te, function (e, t, n) {
        var r;
        if (!n)
          return e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
      });
    var Oe = e.Sizzle;
    t.noConflict = function () {
      return e.Sizzle === t && (e.Sizzle = Oe),
        t
    }
      ,
      e.Sizzle = t
  }(window)
} catch (e) { }
try {
  !function (e, t) {
    e.Tether = t()
  }(this, function (e, t, n) {
    "use strict";
    function r(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
    }
    function i(e) {
      var t = e.getBoundingClientRect()
        , n = {};
      for (var r in t)
        n[r] = t[r];
      if (e.ownerDocument !== document) {
        var o = e.ownerDocument.defaultView.frameElement;
        if (o) {
          var a = i(o);
          n.top += a.top,
            n.bottom += a.top,
            n.left += a.left,
            n.right += a.left
        }
      }
      return n
    }
    function o(e) {
      var t = getComputedStyle(e) || {}
        , n = t.position
        , r = [];
      if ("fixed" === n)
        return [e];
      for (var i = e; (i = i.parentNode) && i && 1 === i.nodeType;) {
        var o = void 0;
        try {
          o = getComputedStyle(i)
        } catch (a) { }
        if ("undefined" == typeof o || null === o)
          return r.push(i),
            r;
        var u = o
          , s = u.overflow
          , c = u.overflowX
          , l = u.overflowY;
        /(auto|scroll)/.test(s + l + c) && ("absolute" !== n || ["relative", "absolute", "fixed"].indexOf(o.position) >= 0) && r.push(i)
      }
      return r.push(e.ownerDocument.body),
        e.ownerDocument !== document && r.push(e.ownerDocument.defaultView),
        r
    }
    function a() {
      T && document.body.removeChild(T),
        T = null
    }
    function u(e) {
      var t = void 0;
      e === document ? (t = document,
        e = document.documentElement) : t = e.ownerDocument;
      var n = t.documentElement
        , r = i(e)
        , o = A();
      return r.top -= o.top,
        r.left -= o.left,
        "undefined" == typeof r.width && (r.width = document.body.scrollWidth - r.left - r.right),
        "undefined" == typeof r.height && (r.height = document.body.scrollHeight - r.top - r.bottom),
        r.top = r.top - n.clientTop,
        r.left = r.left - n.clientLeft,
        r.right = t.body.clientWidth - r.width - r.left,
        r.bottom = t.body.clientHeight - r.height - r.top,
        r
    }
    function s(e) {
      return e.offsetParent || document.documentElement
    }
    function c() {
      if (k)
        return k;
      var e = document.createElement("div");
      e.style.width = "100%",
        e.style.height = "200px";
      var t = document.createElement("div");
      l(t.style, {
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        visibility: "hidden",
        width: "200px",
        height: "150px",
        overflow: "hidden"
      }),
        t.appendChild(e),
        document.body.appendChild(t);
      var n = e.offsetWidth;
      t.style.overflow = "scroll";
      var r = e.offsetWidth;
      n === r && (r = t.clientWidth),
        document.body.removeChild(t);
      var i = n - r;
      return k = {
        width: i,
        height: i
      }
    }
    function l() {
      var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0]
        , t = [];
      return Array.prototype.push.apply(t, arguments),
        t.slice(1).forEach(function (t) {
          if (t)
            for (var n in t)
              ({}).hasOwnProperty.call(t, n) && (e[n] = t[n])
        }),
        e
    }
    function d(e, t) {
      if ("undefined" != typeof e.classList)
        t.split(" ").forEach(function (t) {
          t.trim() && e.classList.remove(t);
        });
      else {
        var n = new RegExp("(^| )" + t.split(" ").join("|") + "( |$)", "gi")
          , r = h(e).replace(n, " ");
        m(e, r)
      }
    }
    function f(e, t) {
      if ("undefined" != typeof e.classList)
        t.split(" ").forEach(function (t) {
          t.trim() && e.classList.add(t)
        });
      else {
        d(e, t);
        var n = h(e) + (" " + t);
        m(e, n)
      }
    }
    function p(e, t) {
      if ("undefined" != typeof e.classList)
        return e.classList.contains(t);
      var n = h(e);
      return new RegExp("(^| )" + t + "( |$)", "gi").test(n)
    }
    function h(e) {
      return e.className instanceof e.ownerDocument.defaultView.SVGAnimatedString ? e.className.baseVal : e.className
    }
    function m(e, t) {
      e.setAttribute("class", t)
    }
    function v(e, t, n) {
      n.forEach(function (n) {
        t.indexOf(n) === -1 && p(e, n) && d(e, n)
      }),
        t.forEach(function (t) {
          p(e, t) || f(e, t)
        })
    }
    function r(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
    }
    function g(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }),
        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    function w(e, t) {
      var n = arguments.length <= 2 || void 0 === arguments[2] ? 1 : arguments[2];
      return e + n >= t && t >= e - n
    }
    function _() {
      return "undefined" != typeof performance && "undefined" != typeof performance.now ? performance.now() : +new Date
    }
    function y() {
      for (var e = {
        top: 0,
        left: 0
      }, t = arguments.length, n = Array(t), r = 0; r < t; r++)
        n[r] = arguments[r];
      return n.forEach(function (t) {
        var n = t.top
          , r = t.left;
        "string" == typeof n && (n = parseFloat(n, 10)),
          "string" == typeof r && (r = parseFloat(r, 10)),
          e.top += n,
          e.left += r
      }),
        e
    }
    function b(e, t) {
      return "string" == typeof e.left && e.left.indexOf("%") !== -1 && (e.left = parseFloat(e.left, 10) / 100 * t.width),
        "string" == typeof e.top && e.top.indexOf("%") !== -1 && (e.top = parseFloat(e.top, 10) / 100 * t.height),
        e
    }
    function q(e, t) {
      return "scrollParent" === t ? t = e.scrollParents[0] : "window" === t && (t = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset]),
        t === document && (t = t.documentElement),
        "undefined" != typeof t.nodeType && !function () {
          var e = t
            , n = u(t)
            , r = n
            , i = getComputedStyle(t);
          if (t = [r.left, r.top, n.width + r.left, n.height + r.top],
            e.ownerDocument !== document) {
            var o = e.ownerDocument.defaultView;
            t[0] += o.pageXOffset,
              t[1] += o.pageYOffset,
              t[2] += o.pageXOffset,
              t[3] += o.pageYOffset
          }
          X.forEach(function (e, n) {
            e = e[0].toUpperCase() + e.substr(1),
              "Top" === e || "Left" === e ? t[n] += parseFloat(i["border" + e + "Width"]) : t[n] -= parseFloat(i["border" + e + "Width"])
          })
        }(),
        t
    }
    var E = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value" in r && (r.writable = !0);
          try {
            Object.defineProperty(e, r.key, r)
          } catch (i) { }
        }
      }
      return function (t, n, r) {
        return n && e(t.prototype, n),
          r && e(t, r),
          t
      }
    }()
      , S = void 0;
    "undefined" == typeof S && (S = {
      modules: []
    });
    var T = null
      , O = function () {
        var e = 0;
        return function () {
          return ++e
        }
      }()
      , C = {}
      , A = function () {
        var e = T;
        e && document.body.contains(e) || (e = document.createElement("div"),
          e.setAttribute("data-tether-id", O()),
          l(e.style, {
            top: 0,
            left: 0,
            position: "absolute"
          }),
          document.body.appendChild(e),
          T = e);
        var t = e.getAttribute("data-tether-id");
        return "undefined" == typeof C[t] && (C[t] = i(e),
          N(function () {
            delete C[t]
          })),
          C[t]
      }
      , k = null
      , P = []
      , N = function (e) {
        P.push(e)
      }
      , x = function () {
        for (var e = void 0; e = P.pop();)
          e()
      }
      , R = function () {
        function e() {
          r(this, e)
        }
        return E(e, [{
          key: "on",
          value: function (e, t, n) {
            var r = !(arguments.length <= 3 || void 0 === arguments[3]) && arguments[3];
            "undefined" == typeof this.bindings && (this.bindings = {}),
              "undefined" == typeof this.bindings[e] && (this.bindings[e] = []),
              this.bindings[e].push({
                handler: t,
                ctx: n,
                once: r
              })
          }
        }, {
          key: "once",
          value: function (e, t, n) {
            this.on(e, t, n, !0)
          }
        }, {
          key: "off",
          value: function (e, t) {
            if ("undefined" != typeof this.bindings && "undefined" != typeof this.bindings[e])
              if ("undefined" == typeof t)
                delete this.bindings[e];
              else
                for (var n = 0; n < this.bindings[e].length;)
                  this.bindings[e][n].handler === t ? this.bindings[e].splice(n, 1) : ++n
          }
        }, {
          key: "trigger",
          value: function (e) {
            if ("undefined" != typeof this.bindings && this.bindings[e]) {
              for (var t = 0, n = arguments.length, r = Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
                r[i - 1] = arguments[i];
              for (; t < this.bindings[e].length;) {
                var o = this.bindings[e][t]
                  , a = o.handler
                  , u = o.ctx
                  , s = o.once
                  , c = u;
                "undefined" == typeof c && (c = this),
                  a.apply(c, r),
                  s ? this.bindings[e].splice(t, 1) : ++t
              }
            }
          }
        }]),
          e
      }();
    S.Utils = {
      getActualBoundingClientRect: i,
      getScrollParents: o,
      getBounds: u,
      getOffsetParent: s,
      extend: l,
      addClass: f,
      removeClass: d,
      hasClass: p,
      updateClasses: v,
      defer: N,
      flush: x,
      uniqueId: O,
      Evented: R,
      getScrollBarSize: c,
      removeUtilElements: a
    };
    var I = function () {
      function e(e, t) {
        var n = []
          , r = !0
          , i = !1
          , o = void 0;
        try {
          for (var a, u = e[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value),
            !t || n.length !== t); r = !0)
            ;
        } catch (s) {
          i = !0,
            o = s
        } finally {
          try {
            !r && u["return"] && u["return"]()
          } finally {
            if (i)
              throw o
          }
        }
        return n
      }
      return function (t, n) {
        if (Array.isArray(t))
          return t;
        if (Symbol.iterator in Object(t))
          return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
      }
    }()
      , E = function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
              r.configurable = !0,
              "value" in r && (r.writable = !0);
            try {
              Object.defineProperty(e, r.key, r)
            } catch (i) { }
          }
        }
        return function (t, n, r) {
          return n && e(t.prototype, n),
            r && e(t, r),
            t
        }
      }()
      , L = function (e, t, n) {
        for (var r = !0; r;) {
          var i = e
            , o = t
            , a = n;
          r = !1,
            null === i && (i = Function.prototype);
          var u = Object.getOwnPropertyDescriptor(i, o);
          if (void 0 !== u) {
            if ("value" in u)
              return u.value;
            var s = u.get;
            if (void 0 === s)
              return;
            return s.call(a)
          }
          var c = Object.getPrototypeOf(i);
          if (null === c)
            return;
          e = c,
            t = o,
            n = a,
            r = !0,
            u = c = void 0
        }
      };
    if ("undefined" == typeof S)
      throw new Error("You must include the utils.js file before tether.js");
    var D = S.Utils
      , o = D.getScrollParents
      , u = D.getBounds
      , s = D.getOffsetParent
      , l = D.extend
      , f = D.addClass
      , d = D.removeClass
      , v = D.updateClasses
      , N = D.defer
      , x = D.flush
      , c = D.getScrollBarSize
      , a = D.removeUtilElements
      , j = function () {
        if ("undefined" == typeof document)
          return "";
        for (var e = document.createElement("div"), t = ["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"], n = 0; n < t.length; ++n) {
          var r = t[n];
          if (void 0 !== e.style[r])
            return r
        }
      }()
      , M = []
      , U = function () {
        M.forEach(function (e) {
          e.position(!1)
        }),
          x()
      };
    !function () {
      var e = null
        , t = null
        , n = null
        , r = function i() {
          return "undefined" != typeof t && t > 16 ? (t = Math.min(t - 16, 250),
            void (n = setTimeout(i, 250))) : void ("undefined" != typeof e && _() - e < 10 || (null != n && (clearTimeout(n),
              n = null),
              e = _(),
              U(),
              t = _() - e))
        };
      "undefined" != typeof window && "undefined" != typeof window.addEventListener && ["resize", "scroll", "touchmove"].forEach(function (e) {
        window.addEventListener(e, r)
      })
    }();
    var W = {
      center: "center",
      left: "right",
      right: "left"
    }
      , B = {
        middle: "middle",
        top: "bottom",
        bottom: "top"
      }
      , z = {
        top: 0,
        left: 0,
        middle: "50%",
        center: "50%",
        bottom: "100%",
        right: "100%"
      }
      , G = function (e, t) {
        var n = e.left
          , r = e.top;
        return "auto" === n && (n = W[t.left]),
          "auto" === r && (r = B[t.top]),
          {
            left: n,
            top: r
          }
      }
      , H = function (e) {
        var t = e.left
          , n = e.top;
        return "undefined" != typeof z[e.left] && (t = z[e.left]),
          "undefined" != typeof z[e.top] && (n = z[e.top]),
          {
            left: t,
            top: n
          }
      }
      , J = function (e) {
        var t = e.split(" ")
          , n = I(t, 2)
          , r = n[0]
          , i = n[1];
        return {
          top: r,
          left: i
        }
      }
      , F = J
      , Y = function (e) {
        function t(e) {
          var n = this;
          r(this, t),
            L(Object.getPrototypeOf(t.prototype), "constructor", this).call(this),
            this.position = this.position.bind(this),
            M.push(this),
            this.history = [],
            this.setOptions(e, !1),
            S.modules.forEach(function (e) {
              "undefined" != typeof e.initialize && e.initialize.call(n)
            }),
            this.position()
        }
        return g(t, e),
          E(t, [{
            key: "getClass",
            value: function () {
              var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0]
                , t = this.options.classes;
              return "undefined" != typeof t && t[e] ? this.options.classes[e] : this.options.classPrefix ? this.options.classPrefix + "-" + e : e
            }
          }, {
            key: "setOptions",
            value: function (e) {
              var t = this
                , n = arguments.length <= 1 || void 0 === arguments[1] || arguments[1]
                , r = {
                  offset: "0 0",
                  targetOffset: "0 0",
                  targetAttachment: "auto auto",
                  classPrefix: "tether"
                };
              this.options = l(r, e);
              var i = this.options
                , a = i.element
                , u = i.target
                , s = i.targetModifier;
              if (this.element = a,
                this.target = u,
                this.targetModifier = s,
                "viewport" === this.target ? (this.target = document.body,
                  this.targetModifier = "visible") : "scroll-handle" === this.target && (this.target = document.body,
                    this.targetModifier = "scroll-handle"),
                ["element", "target"].forEach(function (e) {
                  if ("undefined" == typeof t[e])
                    throw new Error("Tether Error: Both element and target must be defined");
                  "undefined" != typeof t[e].jquery ? t[e] = t[e][0] : "string" == typeof t[e] && (t[e] = document.querySelector(t[e]))
                }),
                f(this.element, this.getClass("element")),
                this.options.addTargetClasses !== !1 && f(this.target, this.getClass("target")),
                !this.options.attachment)
                throw new Error("Tether Error: You must provide an attachment");
              this.targetAttachment = F(this.options.targetAttachment),
                this.attachment = F(this.options.attachment),
                this.offset = J(this.options.offset),
                this.targetOffset = J(this.options.targetOffset),
                "undefined" != typeof this.scrollParents && this.disable(),
                "scroll-handle" === this.targetModifier ? this.scrollParents = [this.target] : this.scrollParents = o(this.target),
                this.options.enabled !== !1 && this.enable(n)
            }
          }, {
            key: "getTargetBounds",
            value: function () {
              if ("undefined" == typeof this.targetModifier)
                return u(this.target);
              if ("visible" === this.targetModifier) {
                if (this.target === document.body)
                  return {
                    top: pageYOffset,
                    left: pageXOffset,
                    height: innerHeight,
                    width: innerWidth
                  };
                var e = u(this.target)
                  , t = {
                    height: e.height,
                    width: e.width,
                    top: e.top,
                    left: e.left
                  };
                return t.height = Math.min(t.height, e.height - (pageYOffset - e.top)),
                  t.height = Math.min(t.height, e.height - (e.top + e.height - (pageYOffset + innerHeight))),
                  t.height = Math.min(innerHeight, t.height),
                  t.height -= 2,
                  t.width = Math.min(t.width, e.width - (pageXOffset - e.left)),
                  t.width = Math.min(t.width, e.width - (e.left + e.width - (pageXOffset + innerWidth))),
                  t.width = Math.min(innerWidth, t.width),
                  t.width -= 2,
                  t.top < pageYOffset && (t.top = pageYOffset),
                  t.left < pageXOffset && (t.left = pageXOffset),
                  t
              }
              if ("scroll-handle" === this.targetModifier) {
                var e = void 0
                  , n = this.target;
                n === document.body ? (n = document.documentElement,
                  e = {
                    left: pageXOffset,
                    top: pageYOffset,
                    height: innerHeight,
                    width: innerWidth
                  }) : e = u(n);
                var r = getComputedStyle(n)
                  , i = n.scrollWidth > n.clientWidth || [r.overflow, r.overflowX].indexOf("scroll") >= 0 || this.target !== document.body
                  , o = 0;
                i && (o = 15);
                var a = e.height - parseFloat(r.borderTopWidth) - parseFloat(r.borderBottomWidth) - o
                  , t = {
                    width: 15,
                    height: .975 * a * (a / n.scrollHeight),
                    left: e.left + e.width - parseFloat(r.borderLeftWidth) - 15
                  }
                  , s = 0;
                a < 408 && this.target === document.body && (s = -11e-5 * Math.pow(a, 2) - .00727 * a + 22.58),
                  this.target !== document.body && (t.height = Math.max(t.height, 24));
                var c = this.target.scrollTop / (n.scrollHeight - a);
                return t.top = c * (a - t.height - s) + e.top + parseFloat(r.borderTopWidth),
                  this.target === document.body && (t.height = Math.max(t.height, 24)),
                  t
              }
            }
          }, {
            key: "clearCache",
            value: function () {
              this._cache = {}
            }
          }, {
            key: "cache",
            value: function (e, t) {
              return "undefined" == typeof this._cache && (this._cache = {}),
                "undefined" == typeof this._cache[e] && (this._cache[e] = t.call(this)),
                this._cache[e]
            }
          }, {
            key: "enable",
            value: function () {
              var e = this
                , t = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
              this.options.addTargetClasses !== !1 && f(this.target, this.getClass("enabled")),
                f(this.element, this.getClass("enabled")),
                this.enabled = !0,
                this.scrollParents.forEach(function (t) {
                  t !== e.target.ownerDocument && t.addEventListener("scroll", e.position)
                }),
                t && this.position()
            }
          }, {
            key: "disable",
            value: function () {
              var e = this;
              d(this.target, this.getClass("enabled")),
                d(this.element, this.getClass("enabled")),
                this.enabled = !1,
                "undefined" != typeof this.scrollParents && this.scrollParents.forEach(function (t) {
                  t.removeEventListener("scroll", e.position)
                })
            }
          }, {
            key: "destroy",
            value: function () {
              var e = this;
              this.disable(),
                M.forEach(function (t, n) {
                  t === e && M.splice(n, 1)
                }),
                0 === M.length && a()
            }
          }, {
            key: "updateAttachClasses",
            value: function (e, t) {
              var n = this;
              e = e || this.attachment,
                t = t || this.targetAttachment;
              var r = ["left", "top", "bottom", "right", "middle", "center"];
              "undefined" != typeof this._addAttachClasses && this._addAttachClasses.length && this._addAttachClasses.splice(0, this._addAttachClasses.length),
                "undefined" == typeof this._addAttachClasses && (this._addAttachClasses = []);
              var i = this._addAttachClasses;
              e.top && i.push(this.getClass("element-attached") + "-" + e.top),
                e.left && i.push(this.getClass("element-attached") + "-" + e.left),
                t.top && i.push(this.getClass("target-attached") + "-" + t.top),
                t.left && i.push(this.getClass("target-attached") + "-" + t.left);
              var o = [];
              r.forEach(function (e) {
                o.push(n.getClass("element-attached") + "-" + e),
                  o.push(n.getClass("target-attached") + "-" + e)
              }),
                N(function () {
                  "undefined" != typeof n._addAttachClasses && (v(n.element, n._addAttachClasses, o),
                    n.options.addTargetClasses !== !1 && v(n.target, n._addAttachClasses, o),
                    delete n._addAttachClasses)
                })
            }
          }, {
            key: "position",
            value: function () {
              var e = this
                , t = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
              if (this.enabled) {
                this.clearCache();
                var n = G(this.targetAttachment, this.attachment);
                this.updateAttachClasses(this.attachment, n);
                var r = this.cache("element-bounds", function () {
                  return u(e.element)
                })
                  , i = r.width
                  , o = r.height;
                if (0 === i && 0 === o && "undefined" != typeof this.lastSize) {
                  var a = this.lastSize;
                  i = a.width,
                    o = a.height
                } else
                  this.lastSize = {
                    width: i,
                    height: o
                  };
                var l = this.cache("target-bounds", function () {
                  return e.getTargetBounds()
                })
                  , d = l
                  , f = b(H(this.attachment), {
                    width: i,
                    height: o
                  })
                  , p = b(H(n), d)
                  , h = b(this.offset, {
                    width: i,
                    height: o
                  })
                  , m = b(this.targetOffset, d);
                f = y(f, h),
                  p = y(p, m);
                for (var v = l.left + p.left - f.left, g = l.top + p.top - f.top, w = 0; w < S.modules.length; ++w) {
                  var _ = S.modules[w]
                    , q = _.position.call(this, {
                      left: v,
                      top: g,
                      targetAttachment: n,
                      targetPos: l,
                      elementPos: r,
                      offset: f,
                      targetOffset: p,
                      manualOffset: h,
                      manualTargetOffset: m,
                      scrollbarSize: C,
                      attachment: this.attachment
                    });
                  if (q === !1)
                    return !1;
                  "undefined" != typeof q && "object" == typeof q && (g = q.top,
                    v = q.left)
                }
                var E = {
                  page: {
                    top: g,
                    left: v
                  },
                  viewport: {
                    top: g - pageYOffset,
                    bottom: pageYOffset - g - o + innerHeight,
                    left: v - pageXOffset,
                    right: pageXOffset - v - i + innerWidth
                  }
                }
                  , T = this.target.ownerDocument
                  , O = T.defaultView
                  , C = void 0;
                return O.innerHeight > T.documentElement.clientHeight && (C = this.cache("scrollbar-size", c),
                  E.viewport.bottom -= C.height),
                  O.innerWidth > T.documentElement.clientWidth && (C = this.cache("scrollbar-size", c),
                    E.viewport.right -= C.width),
                  ["", "static"].indexOf(T.body.style.position) !== -1 && ["", "static"].indexOf(T.body.parentElement.style.position) !== -1 || (E.page.bottom = T.body.scrollHeight - g - o,
                    E.page.right = T.body.scrollWidth - v - i),
                  "undefined" != typeof this.options.optimizations && this.options.optimizations.moveElement !== !1 && "undefined" == typeof this.targetModifier && !function () {
                    var t = e.cache("target-offsetparent", function () {
                      return s(e.target)
                    })
                      , n = e.cache("target-offsetparent-bounds", function () {
                        return u(t)
                      })
                      , r = getComputedStyle(t)
                      , i = n
                      , o = {};
                    if (["Top", "Left", "Bottom", "Right"].forEach(function (e) {
                      o[e.toLowerCase()] = parseFloat(r["border" + e + "Width"])
                    }),
                      n.right = T.body.scrollWidth - n.left - i.width + o.right,
                      n.bottom = T.body.scrollHeight - n.top - i.height + o.bottom,
                      E.page.top >= n.top + o.top && E.page.bottom >= n.bottom && E.page.left >= n.left + o.left && E.page.right >= n.right) {
                      var a = t.scrollTop
                        , c = t.scrollLeft;
                      E.offset = {
                        top: E.page.top - n.top + a - o.top,
                        left: E.page.left - n.left + c - o.left
                      }
                    }
                  }(),
                  this.move(E),
                  this.history.unshift(E),
                  this.history.length > 3 && this.history.pop(),
                  t && x(),
                  !0
              }
            }
          }, {
            key: "move",
            value: function (e) {
              var t = this;
              if ("undefined" != typeof this.element.parentNode) {
                var n = {};
                for (var r in e) {
                  n[r] = {};
                  for (var i in e[r]) {
                    for (var o = !1, a = 0; a < this.history.length; ++a) {
                      var u = this.history[a];
                      if ("undefined" != typeof u[r] && !w(u[r][i], e[r][i])) {
                        o = !0;
                        break
                      }
                    }
                    o || (n[r][i] = !0)
                  }
                }
                var c = {
                  top: "",
                  left: "",
                  right: "",
                  bottom: ""
                }
                  , d = function (e, n) {
                    var r = "undefined" != typeof t.options.optimizations
                      , i = r ? t.options.optimizations.gpu : null;
                    if (i !== !1) {
                      var o = void 0
                        , a = void 0;
                      if (e.top ? (c.top = 0,
                        o = n.top) : (c.bottom = 0,
                          o = -n.bottom),
                        e.left ? (c.left = 0,
                          a = n.left) : (c.right = 0,
                            a = -n.right),
                        window.matchMedia) {
                        var u = window.matchMedia("only screen and (min-resolution: 1.3dppx)").matches || window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 1.3)").matches;
                        u || (a = Math.round(a),
                          o = Math.round(o))
                      }
                      c[j] = "translateX(" + a + "px) translateY(" + o + "px)",
                        "msTransform" !== j && (c[j] += " translateZ(0)")
                    } else
                      e.top ? c.top = n.top + "px" : c.bottom = n.bottom + "px",
                        e.left ? c.left = n.left + "px" : c.right = n.right + "px"
                  }
                  , f = !1;
                if ((n.page.top || n.page.bottom) && (n.page.left || n.page.right) ? (c.position = "absolute",
                  d(n.page, e.page)) : (n.viewport.top || n.viewport.bottom) && (n.viewport.left || n.viewport.right) ? (c.position = "fixed",
                    d(n.viewport, e.viewport)) : "undefined" != typeof n.offset && n.offset.top && n.offset.left ? !function () {
                      c.position = "absolute";
                      var r = t.cache("target-offsetparent", function () {
                        return s(t.target)
                      });
                      s(t.element) !== r && N(function () {
                        t.element.parentNode.removeChild(t.element),
                          r.appendChild(t.element)
                      }),
                        d(n.offset, e.offset),
                        f = !0
                    }() : (c.position = "absolute",
                      d({
                        top: !0,
                        left: !0
                      }, e.page)),
                  !f)
                  if (this.options.bodyElement)
                    this.options.bodyElement.appendChild(this.element);
                  else {
                    for (var p = !0, h = this.element.parentNode; h && 1 === h.nodeType && "BODY" !== h.tagName;) {
                      if ("static" !== getComputedStyle(h).position) {
                        p = !1;
                        break
                      }
                      h = h.parentNode
                    }
                    p || (this.element.parentNode.removeChild(this.element),
                      this.element.ownerDocument.body.appendChild(this.element))
                  }
                var m = {}
                  , v = !1;
                for (var i in c) {
                  var g = c[i]
                    , _ = this.element.style[i];
                  _ !== g && (v = !0,
                    m[i] = g)
                }
                v && N(function () {
                  l(t.element.style, m),
                    t.trigger("repositioned")
                })
              }
            }
          }]),
          t
      }(R);
    Y.modules = [],
      S.position = U;
    var V = l(Y, S)
      , I = function () {
        function e(e, t) {
          var n = []
            , r = !0
            , i = !1
            , o = void 0;
          try {
            for (var a, u = e[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value),
              !t || n.length !== t); r = !0)
              ;
          } catch (s) {
            i = !0,
              o = s
          } finally {
            try {
              !r && u["return"] && u["return"]()
            } finally {
              if (i)
                throw o
            }
          }
          return n
        }
        return function (t, n) {
          if (Array.isArray(t))
            return t;
          if (Symbol.iterator in Object(t))
            return e(t, n);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
      }()
      , D = S.Utils
      , u = D.getBounds
      , l = D.extend
      , v = D.updateClasses
      , N = D.defer
      , X = ["left", "top", "right", "bottom"];
    S.modules.push({
      position: function (e) {
        var t = this
          , n = e.top
          , r = e.left
          , i = e.targetAttachment;
        if (!this.options.constraints)
          return !0;
        var o = this.cache("element-bounds", function () {
          return u(t.element)
        })
          , a = o.height
          , s = o.width;
        if (0 === s && 0 === a && "undefined" != typeof this.lastSize) {
          var c = this.lastSize;
          s = c.width,
            a = c.height
        }
        var d = this.cache("target-bounds", function () {
          return t.getTargetBounds()
        })
          , f = d.height
          , p = d.width
          , h = [this.getClass("pinned"), this.getClass("out-of-bounds")];
        this.options.constraints.forEach(function (e) {
          var t = e.outOfBoundsClass
            , n = e.pinnedClass;
          t && h.push(t),
            n && h.push(n)
        }),
          h.forEach(function (e) {
            ["left", "top", "right", "bottom"].forEach(function (t) {
              h.push(e + "-" + t)
            })
          });
        var m = []
          , g = l({}, i)
          , w = l({}, this.attachment);
        return this.options.constraints.forEach(function (e) {
          var o = e.to
            , u = e.attachment
            , c = e.pin;
          "undefined" == typeof u && (u = "");
          var l = void 0
            , d = void 0;
          if (u.indexOf(" ") >= 0) {
            var h = u.split(" ")
              , v = I(h, 2);
            d = v[0],
              l = v[1]
          } else
            l = d = u;
          var _ = q(t, o);
          "target" !== d && "both" !== d || (n < _[1] && "top" === g.top && (n += f,
            g.top = "bottom"),
            n + a > _[3] && "bottom" === g.top && (n -= f,
              g.top = "top")),
            "together" === d && ("top" === g.top && ("bottom" === w.top && n < _[1] ? (n += f,
              g.top = "bottom",
              n += a,
              w.top = "top") : "top" === w.top && n + a > _[3] && n - (a - f) >= _[1] && (n -= a - f,
                g.top = "bottom",
                w.top = "bottom")),
              "bottom" === g.top && ("top" === w.top && n + a > _[3] ? (n -= f,
                g.top = "top",
                n -= a,
                w.top = "bottom") : "bottom" === w.top && n < _[1] && n + (2 * a - f) <= _[3] && (n += a - f,
                  g.top = "top",
                  w.top = "top")),
              "middle" === g.top && (n + a > _[3] && "top" === w.top ? (n -= a,
                w.top = "bottom") : n < _[1] && "bottom" === w.top && (n += a,
                  w.top = "top"))),
            "target" !== l && "both" !== l || (r < _[0] && "left" === g.left && (r += p,
              g.left = "right"),
              r + s > _[2] && "right" === g.left && (r -= p,
                g.left = "left")),
            "together" === l && (r < _[0] && "left" === g.left ? "right" === w.left ? (r += p,
              g.left = "right",
              r += s,
              w.left = "left") : "left" === w.left && (r += p,
                g.left = "right",
                r -= s,
                w.left = "right") : r + s > _[2] && "right" === g.left ? "left" === w.left ? (r -= p,
                  g.left = "left",
                  r -= s,
                  w.left = "right") : "right" === w.left && (r -= p,
                    g.left = "left",
                    r += s,
                    w.left = "left") : "center" === g.left && (r + s > _[2] && "left" === w.left ? (r -= s,
                      w.left = "right") : r < _[0] && "right" === w.left && (r += s,
                        w.left = "left"))),
            "element" !== d && "both" !== d || (n < _[1] && "bottom" === w.top && (n += a,
              w.top = "top"),
              n + a > _[3] && "top" === w.top && (n -= a,
                w.top = "bottom")),
            "element" !== l && "both" !== l || (r < _[0] && ("right" === w.left ? (r += s,
              w.left = "left") : "center" === w.left && (r += s / 2,
                w.left = "left")),
              r + s > _[2] && ("left" === w.left ? (r -= s,
                w.left = "right") : "center" === w.left && (r -= s / 2,
                  w.left = "right"))),
            "string" == typeof c ? c = c.split(",").map(function (e) {
              return e.trim()
            }) : c === !0 && (c = ["top", "left", "right", "bottom"]),
            c = c || [];
          var y = []
            , b = [];
          n < _[1] && (c.indexOf("top") >= 0 ? (n = _[1],
            y.push("top")) : b.push("top")),
            n + a > _[3] && (c.indexOf("bottom") >= 0 ? (n = _[3] - a,
              y.push("bottom")) : b.push("bottom")),
            r < _[0] && (c.indexOf("left") >= 0 ? (r = _[0],
              y.push("left")) : b.push("left")),
            r + s > _[2] && (c.indexOf("right") >= 0 ? (r = _[2] - s,
              y.push("right")) : b.push("right")),
            y.length && !function () {
              var e = void 0;
              e = "undefined" != typeof t.options.pinnedClass ? t.options.pinnedClass : t.getClass("pinned"),
                m.push(e),
                y.forEach(function (t) {
                  m.push(e + "-" + t)
                })
            }(),
            b.length && !function () {
              var e = void 0;
              e = "undefined" != typeof t.options.outOfBoundsClass ? t.options.outOfBoundsClass : t.getClass("out-of-bounds"),
                m.push(e),
                b.forEach(function (t) {
                  m.push(e + "-" + t)
                })
            }(),
            (y.indexOf("left") >= 0 || y.indexOf("right") >= 0) && (w.left = g.left = !1),
            (y.indexOf("top") >= 0 || y.indexOf("bottom") >= 0) && (w.top = g.top = !1),
            g.top === i.top && g.left === i.left && w.top === t.attachment.top && w.left === t.attachment.left || (t.updateAttachClasses(w, g),
              t.trigger("update", {
                attachment: w,
                targetAttachment: g
              }))
        }),
          N(function () {
            t.options.addTargetClasses !== !1 && v(t.target, m, h),
              v(t.element, m, h)
          }),
          {
            top: n,
            left: r
          }
      }
    });
    var D = S.Utils
      , u = D.getBounds
      , v = D.updateClasses
      , N = D.defer;
    S.modules.push({
      position: function (e) {
        var t = this
          , n = e.top
          , r = e.left
          , i = this.cache("element-bounds", function () {
            return u(t.element)
          })
          , o = i.height
          , a = i.width
          , s = this.getTargetBounds()
          , c = n + o
          , l = r + a
          , d = [];
        n <= s.bottom && c >= s.top && ["left", "right"].forEach(function (e) {
          var t = s[e];
          t !== r && t !== l || d.push(e)
        }),
          r <= s.right && l >= s.left && ["top", "bottom"].forEach(function (e) {
            var t = s[e];
            t !== n && t !== c || d.push(e)
          });
        var f = []
          , p = []
          , h = ["left", "top", "right", "bottom"];
        return f.push(this.getClass("abutted")),
          h.forEach(function (e) {
            f.push(t.getClass("abutted") + "-" + e)
          }),
          d.length && p.push(this.getClass("abutted")),
          d.forEach(function (e) {
            p.push(t.getClass("abutted") + "-" + e)
          }),
          N(function () {
            t.options.addTargetClasses !== !1 && v(t.target, p, f),
              v(t.element, p, f)
          }),
          !0
      }
    });
    var I = function () {
      function e(e, t) {
        var n = []
          , r = !0
          , i = !1
          , o = void 0;
        try {
          for (var a, u = e[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value),
            !t || n.length !== t); r = !0)
            ;
        } catch (s) {
          i = !0,
            o = s
        } finally {
          try {
            !r && u["return"] && u["return"]()
          } finally {
            if (i)
              throw o
          }
        }
        return n
      }
      return function (t, n) {
        if (Array.isArray(t))
          return t;
        if (Symbol.iterator in Object(t))
          return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
      }
    }();
    return S.modules.push({
      position: function (e) {
        var t = e.top
          , n = e.left;
        if (this.options.shift) {
          var r = this.options.shift;
          "function" == typeof this.options.shift && (r = this.options.shift.call(this, {
            top: t,
            left: n
          }));
          var i = void 0
            , o = void 0;
          if ("string" == typeof r) {
            r = r.split(" "),
              r[1] = r[1] || r[0];
            var a = r
              , u = I(a, 2);
            i = u[0],
              o = u[1],
              i = parseFloat(i, 10),
              o = parseFloat(o, 10)
          } else
            i = r.top,
              o = r.left;
          return t += i,
            n += o,
            {
              top: t,
              left: n
            }
        }
      }
    }),
      V
  })
} catch (e) { }
!function (e, t) {
  !function n() {
    document && document.body ? e.uiqscroll = t() : setTimeout(n, 9)
  }()
}(this, function () {
  "use strict";
  var e = function (e) {
    return "getComputedStyle" in window && "smooth" === window.getComputedStyle(e)["scroll-behavior"]
  };
  if ("undefined" == typeof window || !("document" in window))
    return {};
  var t = function (t, n, r) {
    n = n || 999,
      r || 0 === r || (r = 9);
    var i, o = function (e) {
      i = e
    }, a = function () {
      clearTimeout(i),
        o(0)
    }, u = function (e) {
      return Math.max(0, t.getTopOf(e) - r)
    }, s = function (r, i, u) {
      if (a(),
        0 === i || i && i < 0 || e(t.body))
        t.toY(r),
          u && u();
      else {
        var s = t.getY()
          , c = Math.max(0, r) - s
          , l = (new Date).getTime();
        i = i || Math.min(Math.abs(c), n),
          function d() {
            o(setTimeout(function () {
              var e = Math.min(1, ((new Date).getTime() - l) / i)
                , n = Math.max(0, Math.floor(s + c * (e < .5 ? 2 * e * e : e * (4 - 2 * e) - 1)));
              t.toY(n),
                e < 1 && t.getHeight() + n < t.body.scrollHeight ? d() : (setTimeout(a, 99),
                  u && u())
            }, 9))
          }()
      }
      setTimeout(function () {
        Tether.position
      }, 150)
    }, c = function (e, t, n) {
      s(u(e), t, n)
    }, l = function (e, n, i) {
      var o = e.getBoundingClientRect().height
        , a = t.getTopOf(e) + o
        , l = t.getHeight()
        , d = t.getY()
        , f = d + l;
      u(e) < d || o + r > l ? c(e, n, i) : a + r > f ? s(a - l + r, n, i) : i && i()
    }, d = function (e, n, r, i) {
      s(Math.max(0, t.getTopOf(e) - t.getHeight() / 2 + (r || e.getBoundingClientRect().height / 2)), n, i)
    }, f = function (e, t) {
      return (0 === e || e) && (n = e),
        (0 === t || t) && (r = t),
        {
          defaultDuration: n,
          edgeOffset: r
        }
    };
    return {
      setup: f,
      to: c,
      toY: s,
      intoView: l,
      center: d,
      stop: a,
      moving: function () {
        return !!i
      },
      getY: t.getY,
      getTopOf: t.getTopOf
    }
  }
    , n = document.documentElement
    , r = function () {
      return window.scrollY || n.scrollTop
    }
    , i = t({
      body: document.scrollingElement || document.body,
      toY: function (e) {
        window.scrollTo(0, e)
      },
      getY: r,
      getHeight: function () {
        return window.innerHeight || n.clientHeight
      },
      getTopOf: function (e) {
        return e.getBoundingClientRect().top + r() - n.offsetTop
      }
    });
  return i.createScroller = function (e, r, i) {
    return t({
      body: e,
      toY: function (t) {
        e.scrollTop = t
      },
      getY: function () {
        return e.scrollTop
      },
      getHeight: function () {
        return Math.min(e.clientHeight, window.innerHeight || n.clientHeight)
      },
      getTopOf: function (e) {
        return e.offsetTop
      }
    }, r, i)
  }
    ,
    i
});
try {
  !function (e, t) {
    e.useriqPostRobot = t()
  }(this, function () {
    return function (e) {
      function t(r) {
        if (n[r])
          return n[r].exports;
        var i = n[r] = {
          i: r,
          l: !1,
          exports: {}
        };
        return e[r].call(i.exports, i, i.exports, t),
          i.l = !0,
          i.exports
      }
      var n = {};
      return t.m = e,
        t.c = n,
        t.i = function (e) {
          return e
        }
        ,
        t.d = function (e, n, r) {
          t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r
          })
        }
        ,
        t.n = function (e) {
          var n = e && e.__esModule ? function () {
            return e["default"]
          }
            : function () {
              return e
            }
            ;
          return t.d(n, "a", n),
            n
        }
        ,
        t.o = function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        t.p = "",
        t(t.s = 26)
    }([function (e, t, n) {
      "use strict";
      var r = n(22);
      n.d(t, "a", function () {
        return r.a
      });
      var i = n(11);
      n.d(t, "b", function () {
        return i.a
      }),
        n.d(t, "c", function () {
          return i.b
        })
    }
      , function (e, t, n) {
        "use strict";
        function r(e) {
          var t = e.location;
          if (!t)
            throw new Error("Can not read window location");
          var n = t.protocol;
          if (!n)
            throw new Error("Can not read window protocol");
          if (n === T.FILE_PROTOCOL)
            return "file://";
          var r = t.host;
          if (!r)
            throw new Error("Can not read window host");
          return n + "//" + r
        }
        function i(e) {
          e = e || window;
          var t = r(e);
          return t && e.mockDomain && 0 === e.mockDomain.indexOf(T.MOCK_PROTOCOL) ? e.mockDomain : t
        }
        function o(e) {
          try {
            if (!e.location.href)
              return !0;
            if ("about:blank" === e.location.href)
              return !0
          } catch (t) { }
          return !1
        }
        function a(e) {
          try {
            var t = Object.getOwnPropertyDescriptor(e, "location");
            if (t && !1 === t.enumerable)
              return !1
          } catch (n) { }
          try {
            if (o(e))
              return !0;
            if (r(e) === r(window))
              return !0
          } catch (n) { }
          return !1
        }
        function u(e) {
          if (!a(e))
            return !1;
          try {
            if (o(e))
              return !0;
            if (i(window) === i(e))
              return !0
          } catch (t) { }
          return !1
        }
        function s(e) {
          if (e)
            try {
              if (e.parent && e.parent !== e)
                return e.parent
            } catch (t) {
              return
            }
        }
        function c(e) {
          if (e && !s(e))
            try {
              return e.opener
            } catch (t) {
              return
            }
        }
        function l(e) {
          var t = [];
          try {
            for (; e.parent !== e;)
              t.push(e.parent),
                e = e.parent
          } catch (n) { }
          return t
        }
        function d(e, t) {
          if (!e || !t)
            return !1;
          var n = s(t);
          return n ? n === e : -1 !== l(t).indexOf(e)
        }
        function f(e) {
          var t = []
            , n = void 0;
          try {
            n = e.frames
          } catch (r) {
            n = e
          }
          var i = void 0;
          try {
            i = n.length
          } catch (r) { }
          if (0 === i)
            return t;
          if (i) {
            for (var o = 0; o < i; o++) {
              var a = void 0;
              try {
                a = n[o]
              } catch (r) {
                continue
              }
              t.push(a)
            }
            return t
          }
          for (var u = 0; u < 100; u++) {
            var s = void 0;
            try {
              s = n[u]
            } catch (r) {
              return t
            }
            if (!s)
              return t;
            t.push(s)
          }
          return t
        }
        function p(e) {
          for (var t = [], n = f(e), r = Array.isArray(n), i = 0, n = r ? n : n[Symbol.iterator](); ;) {
            var o;
            if (r) {
              if (i >= n.length)
                break;
              o = n[i++]
            } else {
              if (i = n.next(),
                i.done)
                break;
              o = i.value
            }
            var a = o;
            t.push(a);
            for (var u = p(a), s = Array.isArray(u), c = 0, u = s ? u : u[Symbol.iterator](); ;) {
              var l;
              if (s) {
                if (c >= u.length)
                  break;
                l = u[c++]
              } else {
                if (c = u.next(),
                  c.done)
                  break;
                l = c.value
              }
              var d = l;
              t.push(d)
            }
          }
          return t
        }
        function h(e) {
          if (e) {
            try {
              if (e.top)
                return e.top
            } catch (t) { }
            if (s(e) === e)
              return e;
            try {
              if (d(window, e) && window.top)
                return window.top
            } catch (t) { }
            try {
              if (d(e, window) && window.top)
                return window.top
            } catch (t) { }
            for (var n = p(e), r = Array.isArray(n), i = 0, n = r ? n : n[Symbol.iterator](); ;) {
              var o;
              if (r) {
                if (i >= n.length)
                  break;
                o = n[i++]
              } else {
                if (i = n.next(),
                  i.done)
                  break;
                o = i.value
              }
              var a = o;
              try {
                if (a.top)
                  return a.top
              } catch (t) { }
              if (s(a) === a)
                return a
            }
          }
        }
        function m(e) {
          if (!e.contentWindow)
            return !0;
          if (!e.parentNode)
            return !0;
          var t = e.ownerDocument;
          return !(!t || !t.body || t.body.contains(e))
        }
        function v(e, t) {
          for (var n = 0; n < e.length; n++)
            try {
              if (e[n] === t)
                return n
            } catch (r) { }
          return -1
        }
        function g(e) {
          var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
          try {
            if (e === window)
              return !1
          } catch (r) {
            return !0
          }
          try {
            if (!e)
              return !0
          } catch (r) {
            return !0
          }
          try {
            if (e.closed)
              return !0
          } catch (r) {
            return !r || r.message !== O
          }
          if (t && u(e))
            try {
              if (e.mockclosed)
                return !0
            } catch (r) { }
          try {
            if (!e.parent || !e.top)
              return !0
          } catch (r) { }
          try {
            n.i(S.a)(e === e)
          } catch (r) {
            return !0
          }
          var i = v(C, e);
          if (-1 !== i) {
            var o = A[i];
            if (o && m(o))
              return !0
          }
          return !1
        }
        function w(e) {
          e = e || window;
          var t = c(e);
          if (t)
            return t;
          var n = s(e);
          return n || void 0
        }
        function _(e, t) {
          var n = w(t);
          if (n)
            return n === e;
          if (t === e)
            return !1;
          if (h(t) === t)
            return !1;
          for (var r = f(e), i = Array.isArray(r), o = 0, r = i ? r : r[Symbol.iterator](); ;) {
            var a;
            if (i) {
              if (o >= r.length)
                break;
              a = r[o++]
            } else {
              if (o = r.next(),
                o.done)
                break;
              a = o.value
            }
            if (a === t)
              return !0
          }
          return !1
        }
        function y() {
          return Boolean(c(window))
        }
        function b() {
          return Boolean(s(window))
        }
        function q(e, t) {
          if ("string" == typeof e) {
            if ("string" == typeof t)
              return e === T.WILDCARD || t === e;
            if (n.i(S.b)(t))
              return !1;
            if (Array.isArray(t))
              return !1
          }
          return n.i(S.b)(e) ? n.i(S.b)(t) ? e.toString() === t.toString() : !Array.isArray(t) && Boolean(t.match(e)) : !!Array.isArray(e) && (Array.isArray(t) ? JSON.stringify(e) === JSON.stringify(t) : !n.i(S.b)(t) && e.some(function (e) {
            return q(e, t)
          }))
        }
        function E(e) {
          try {
            if (e === window)
              return !0
          } catch (t) {
            if (t && t.message === O)
              return !0
          }
          try {
            if ("[object Window]" === Object.prototype.toString.call(e))
              return !0
          } catch (t) {
            if (t && t.message === O)
              return !0
          }
          try {
            if (window.Window && e instanceof window.Window)
              return !0
          } catch (t) {
            if (t && t.message === O)
              return !0
          }
          try {
            if (e && e.self === e)
              return !0
          } catch (t) {
            if (t && t.message === O)
              return !0
          }
          try {
            if (e && e.parent === e)
              return !0
          } catch (t) {
            if (t && t.message === O)
              return !0
          }
          try {
            if (e && e.top === e)
              return !0
          } catch (t) {
            if (t && t.message === O)
              return !0
          }
          try {
            n.i(S.a)(e === e)
          } catch (t) {
            return !0
          }
          try {
            n.i(S.a)(e && e.__cross_domain_utils_window_check__)
          } catch (t) {
            return !0
          }
          return !1
        }
        t.i = r,
          t.g = i,
          t.h = a,
          t.f = g,
          t.a = w,
          t.j = _,
          t.c = y,
          t.d = b,
          t.b = q,
          t.e = E;
        var S = n(17)
          , T = {
            MOCK_PROTOCOL: "mock:",
            FILE_PROTOCOL: "file:",
            WILDCARD: "*"
          }
          , O = "Call was rejected by callee.\r\n"
          , C = []
          , A = []
      }
      , function (e, t, n) {
        "use strict";
        var r = n(19);
        n.d(t, "a", function () {
          return r.a
        })
      }
      , function (e, t, n) {
        "use strict";
        n.d(t, "a", function () {
          return i
        });
        var r = n(0)
          , i = window[r.b.WINDOW_PROPS.POSTROBOT] = window[r.b.WINDOW_PROPS.POSTROBOT] || {};
        i.registerSelf = function () { }
      }
      , function (e, t, n) {
        "use strict";
        var r = n(8);
        n.d(t, "c", function () {
          return r.a
        }),
          n.d(t, "d", function () {
            return r.f
          }),
          n.d(t, "e", function () {
            return r.d
          }),
          n.d(t, "h", function () {
            return r.c
          }),
          n.d(t, "i", function () {
            return r.b
          }),
          n.d(t, "j", function () {
            return r.h
          }),
          n.d(t, "l", function () {
            return r.i
          }),
          n.d(t, "m", function () {
            return r.j
          }),
          n.d(t, "n", function () {
            return r.e
          }),
          n.d(t, "o", function () {
            return r.k
          });
        var i = n(9);
        n.d(t, "g", function () {
          return i.a
        });
        var o = n(28);
        n.d(t, "b", function () {
          return o.a
        }),
          n.d(t, "f", function () {
            return o.b
          }),
          n.d(t, "k", function () {
            return o.c
          });
        var a = n(27);
        n.d(t, "a", function () {
          return a.a
        }),
          n.d(t, "p", function () {
            return a.b
          })
      }
      , function (e, t, n) {
        "use strict";
        var r = n(23);
        n.d(t, "a", function () {
          return r.a
        }),
          n.d(t, "b", function () {
            return r.b
          });
        var i = n(13);
        n.d(t, "e", function () {
          return i.a
        });
        var o = n(12);
        n.d(t, "c", function () {
          return o.e
        }),
          n.d(t, "d", function () {
            return o.f
          }),
          n.d(t, "f", function () {
            return o.g
          }),
          n.d(t, "g", function () {
            return o.d
          })
      }
      , function (e, t, n) {
        "use strict";
        function r() {
          a.a.initialized || (n.i(o.a)(),
            n.i(i.a)(),
            n.i(i.b)()),
            a.a.initialized = !0
        }
        Object.defineProperty(t, "__esModule", {
          value: !0
        }),
          t.init = r,
          n.d(t, "bridge", function () {
            return l
          });
        var i = n(4)
          , o = n(5)
          , a = n(3)
          , u = n(21);
        n.d(t, "cleanUpWindow", function () {
          return u.a
        });
        var s = n(31);
        n.d(t, "parent", function () {
          return s.a
        }),
          n.d(t, "send", function () {
            return s.b
          }),
          n.d(t, "request", function () {
            return s.c
          }),
          n.d(t, "sendToParent", function () {
            return s.d
          }),
          n.d(t, "client", function () {
            return s.e
          }),
          n.d(t, "on", function () {
            return s.f
          }),
          n.d(t, "listen", function () {
            return s.g
          }),
          n.d(t, "once", function () {
            return s.h
          }),
          n.d(t, "listener", function () {
            return s.i
          }),
          n.d(t, "CONFIG", function () {
            return s.j
          }),
          n.d(t, "CONSTANTS", function () {
            return s.k
          }),
          n.d(t, "disable", function () {
            return s.l
          });
        var c = n(2);
        n.d(t, "Promise", function () {
          return c.a
        }),
          r();
        var l = null
      }
      , function (e, t, n) {
        "use strict";
        var r = n(10);
        n.d(t, "a", function () {
          return r.WeakMap
        })
      }
      , function (e, t, n) {
        "use strict";
        function r(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
          if (t >= 3)
            return "stringifyError stack overflow";
          try {
            if (!e)
              return "<unknown error: " + Object.prototype.toString.call(e) + ">";
            if ("string" == typeof e)
              return e;
            if (e instanceof Error) {
              var n = e && e.stack
                , i = e && e.message;
              if (n && i)
                return -1 !== n.indexOf(i) ? n : i + "\n" + n;
              if (n)
                return n;
              if (i)
                return i
            }
            return "function" == typeof e.toString ? e.toString() : Object.prototype.toString.call(e)
          } catch (o) {
            return "Error while stringifying error: " + r(o, t + 1)
          }
        }
        function i() { }
        function o(e, t, n) {
          return e.addEventListener ? e.addEventListener(t, n) : e.attachEvent("on" + t, n),
            {
              cancel: function () {
                e.removeEventListener ? e.removeEventListener(t, n) : e.detachEvent("on" + t, n)
              }
            }
        }
        function a() {
          var e = "0123456789abcdef";
          return "xxxxxxxxxx".replace(/./g, function () {
            return e.charAt(Math.floor(Math.random() * e.length))
          })
        }
        function u(e, t) {
          for (var n = 0; n < e.length; n++)
            t(e[n], n)
        }
        function s(e, t) {
          for (var n in e)
            e.hasOwnProperty(n) && t(e[n], n)
        }
        function c(e, t) {
          Array.isArray(e) ? u(e, t) : "object" === (void 0 === e ? "undefined" : w(e)) && null !== e && s(e, t)
        }
        function l(e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
          if (n >= 100)
            throw new Error("Self-referential object passed, or object contained too many layers");
          var r = void 0;
          if ("object" !== (void 0 === e ? "undefined" : w(e)) || null === e || Array.isArray(e)) {
            if (!Array.isArray(e))
              throw new Error("Invalid type: " + (void 0 === e ? "undefined" : w(e)));
            r = []
          } else
            r = {};
          return c(e, function (e, i) {
            var o = t(e, i);
            void 0 !== o ? r[i] = o : "object" === (void 0 === e ? "undefined" : w(e)) && null !== e ? r[i] = l(e, t, n + 1) : r[i] = e
          }),
            r
        }
        function d(e, t) {
          function n() {
            r = setTimeout(n, t),
              e.call()
          }
          var r = void 0;
          return r = setTimeout(n, t),
            {
              cancel: function () {
                clearTimeout(r)
              }
            }
        }
        function f(e) {
          return "[object RegExp]" === Object.prototype.toString.call(e)
        }
        function p() {
          return n.i(v.c)() ? g.b.WINDOW_TYPES.POPUP : n.i(v.d)() ? g.b.WINDOW_TYPES.IFRAME : g.b.WINDOW_TYPES.FULLPAGE
        }
        function h(e, t, n) {
          var r = void 0
            , i = void 0;
          try {
            if ("{}" !== JSON.stringify({}) && (r = Object.prototype.toJSON,
              delete Object.prototype.toJSON),
              "{}" !== JSON.stringify({}))
              throw new Error("Can not correctly serialize JSON objects");
            if ("[]" !== JSON.stringify([]) && (i = Array.prototype.toJSON,
              delete Array.prototype.toJSON),
              "[]" !== JSON.stringify([]))
              throw new Error("Can not correctly serialize JSON objects")
          } catch (o) {
            throw new Error("Can not repair JSON.stringify: " + o.message)
          }
          var a = JSON.stringify.call(this, e, t, n);
          try {
            r && (Object.prototype.toJSON = r),
              i && (Array.prototype.toJSON = i)
          } catch (o) {
            throw new Error("Can not repair JSON.stringify: " + o.message)
          }
          return a
        }
        function m(e) {
          return JSON.parse(e)
        }
        t.b = r,
          n.d(t, "e", function () {
            return _
          }),
          t.j = i,
          t.i = o,
          t.f = a,
          t.g = l,
          t.k = d,
          t.a = f,
          t.d = p,
          t.c = h,
          t.h = m;
        var v = (n(7),
          n(1))
          , g = n(0)
          , w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
          }
            : function (e) {
              return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
          , _ = function (e) {
            if (!e)
              return e;
            var t = !1;
            return function () {
              if (!t)
                return t = !0,
                  e.apply(this, arguments)
            }
          }
      }
      , function (e, t, n) {
        "use strict";
        n.d(t, "a", function () {
          return u
        });
        var r = n(8)
          , i = n(0)
          , o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
          }
            : function (e) {
              return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
          , a = ["debug", "info", "warn", "error"];
        Function.prototype.bind && window.console && "object" === o(console.log) && ["log", "info", "warn", "error"].forEach(function (e) {
          console[e] = this.bind(console[e], console)
        }, Function.prototype.call);
        var u = {
          clearLogs: function () {
            if (window.console && window.console.clear && window.console.clear(),
              i.a.LOG_TO_PAGE) {
              var e = document.getElementById("postRobotLogs");
              e && e.parentNode && e.parentNode.removeChild(e)
            }
          },
          writeToPage: function (e, t) {
            setTimeout(function () {
              var i = document.getElementById("postRobotLogs");
              i || (i = document.createElement("div"),
                i.id = "postRobotLogs",
                i.style.cssText = "width: 800px; font-family: monospace; white-space: pre-wrap;",
                document.body && document.body.appendChild(i));
              var o = document.createElement("div")
                , a = (new Date).toString().split(" ")[4]
                , u = Array.prototype.slice.call(t).map(function (e) {
                  if ("string" == typeof e)
                    return e;
                  if (!e)
                    return Object.prototype.toString.call(e);
                  var t = void 0;
                  try {
                    t = n.i(r.c)(e, null, 2)
                  } catch (i) {
                    t = "[object]"
                  }
                  return "\n\n" + t + "\n\n"
                }).join(" ")
                , s = a + " " + e + " " + u;
              o.innerHTML = s;
              var c = {
                log: "#ddd",
                warn: "orange",
                error: "red",
                info: "blue",
                debug: "#aaa"
              }[e];
              o.style.cssText = "margin-top: 10px; color: " + c + ";",
                i.childNodes.length ? i.insertBefore(o, i.childNodes[0]) : i.appendChild(o)
            })
          },
          logLevel: function (e, t) {
            setTimeout(function () {
              try {
                var o = window.LOG_LEVEL || i.a.LOG_LEVEL;
                if (a.indexOf(e) < a.indexOf(o))
                  return;
                if (t = Array.prototype.slice.call(t),
                  t.unshift("" + window.location.host + window.location.pathname),
                  t.unshift("::"),
                  t.unshift("" + n.i(r.d)().toLowerCase()),
                  t.unshift("[post-robot]"),
                  i.a.LOG_TO_PAGE && u.writeToPage(e, t),
                  !window.console)
                  return;
                if (window.console[e] || (e = "log"),
                  !window.console[e])
                  return;
                window.console[e].apply(window.console, t)
              } catch (s) { }
            }, 1)
          },
          debug: function () {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
              t[n] = arguments[n];
            u.logLevel("debug", t)
          },
          info: function () {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
              t[n] = arguments[n];
            u.logLevel("info", t)
          },
          warn: function () {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
              t[n] = arguments[n];
            u.logLevel("warn", t)
          },
          error: function () {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
              t[n] = arguments[n];
            u.logLevel("error", t)
          }
        }
      }
      , function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var r = n(16);
        n.d(t, "WeakMap", function () {
          return r.a
        })
      }
      , function (e, t, n) {
        "use strict";
        n.d(t, "a", function () {
          return r
        }),
          n.d(t, "b", function () {
            return i
          });
        var r = {
          POST_MESSAGE_TYPE: {
            REQUEST: "postrobot_message_request",
            RESPONSE: "postrobot_message_response",
            ACK: "postrobot_message_ack"
          },
          POST_MESSAGE_ACK: {
            SUCCESS: "success",
            ERROR: "error"
          },
          POST_MESSAGE_NAMES: {
            METHOD: "postrobot_method",
            READY: "postrobot_ready",
            OPEN_TUNNEL: "postrobot_open_tunnel"
          },
          WINDOW_TYPES: {
            FULLPAGE: "fullpage",
            POPUP: "popup",
            IFRAME: "iframe"
          },
          WINDOW_PROPS: {
            POSTROBOT: "__postRobot__"
          },
          SERIALIZATION_TYPES: {
            METHOD: "postrobot_method",
            ERROR: "postrobot_error",
            PROMISE: "postrobot_promise",
            ZALGO_PROMISE: "postrobot_zalgo_promise",
            REGEX: "regex"
          },
          SEND_STRATEGIES: {
            POST_MESSAGE: "postrobot_post_message",
            BRIDGE: "postrobot_bridge",
            GLOBAL: "postrobot_global"
          },
          MOCK_PROTOCOL: "mock:",
          FILE_PROTOCOL: "file:",
          BRIDGE_NAME_PREFIX: "__postrobot_bridge__",
          POSTROBOT_PROXY: "__postrobot_proxy__",
          WILDCARD: "*"
        }
          , i = Object.keys(r.POST_MESSAGE_NAMES).map(function (e) {
            return r.POST_MESSAGE_NAMES[e]
          })
      }
      , function (e, t, n) {
        "use strict";
        function r(e, t) {
          f.a.responseListeners[e] = t
        }
        function i(e) {
          return f.a.responseListeners[e]
        }
        function o(e) {
          delete f.a.responseListeners[e]
        }
        function a(e) {
          f.a.erroredResponseListeners[e] = !0
        }
        function u(e) {
          return Boolean(f.a.erroredResponseListeners[e])
        }
        function s(e) {
          var t = e.name
            , r = e.win
            , i = e.domain;
          if (r === h.b.WILDCARD && (r = null),
            i === h.b.WILDCARD && (i = null),
            !t)
            throw new Error("Name required to get request listener");
          var o = f.a.requestListeners[t];
          if (o)
            for (var a = [r, f.a.WINDOW_WILDCARD], u = 0; u < a.length; u++) {
              var s = a[u]
                , c = s && o.get(s);
              if (c) {
                if (i && "string" == typeof i) {
                  if (c[i])
                    return c[i];
                  if (c[m])
                    for (var l = c[m], p = Array.isArray(l), v = 0, l = p ? l : l[Symbol.iterator](); ;) {
                      var g;
                      if (p) {
                        if (v >= l.length)
                          break;
                        g = l[v++]
                      } else {
                        if (v = l.next(),
                          v.done)
                          break;
                        g = v.value
                      }
                      var w = g
                        , _ = w.regex
                        , y = w.listener;
                      if (n.i(d.b)(_, i))
                        return y
                    }
                }
                if (c[h.b.WILDCARD])
                  return c[h.b.WILDCARD]
              }
            }
        }
        function c(e, t) {
          var r = e.name
            , i = e.win
            , o = e.domain;
          if (!r || "string" != typeof r)
            throw new Error("Name required to add request listener");
          if (Array.isArray(i)) {
            for (var a = [], u = i, d = Array.isArray(u), v = 0, u = d ? u : u[Symbol.iterator](); ;) {
              var g;
              if (d) {
                if (v >= u.length)
                  break;
                g = u[v++]
              } else {
                if (v = u.next(),
                  v.done)
                  break;
                g = v.value
              }
              var w = g;
              a.push(c({
                name: r,
                domain: o,
                win: w
              }, t))
            }
            return {
              cancel: function () {
                for (var e = a, t = Array.isArray(e), n = 0, e = t ? e : e[Symbol.iterator](); ;) {
                  var r;
                  if (t) {
                    if (n >= e.length)
                      break;
                    r = e[n++]
                  } else {
                    if (n = e.next(),
                      n.done)
                      break;
                    r = n.value
                  }
                  r.cancel()
                }
              }
            }
          }
          if (Array.isArray(o)) {
            for (var _ = [], y = o, b = Array.isArray(y), q = 0, y = b ? y : y[Symbol.iterator](); ;) {
              var E;
              if (b) {
                if (q >= y.length)
                  break;
                E = y[q++]
              } else {
                if (q = y.next(),
                  q.done)
                  break;
                E = q.value
              }
              var S = E;
              _.push(c({
                name: r,
                win: i,
                domain: S
              }, t))
            }
            return {
              cancel: function () {
                for (var e = _, t = Array.isArray(e), n = 0, e = t ? e : e[Symbol.iterator](); ;) {
                  var r;
                  if (t) {
                    if (n >= e.length)
                      break;
                    r = e[n++]
                  } else {
                    if (n = e.next(),
                      n.done)
                      break;
                    r = n.value
                  }
                  r.cancel()
                }
              }
            }
          }
          var T = s({
            name: r,
            win: i,
            domain: o
          });
          if (i && i !== h.b.WILDCARD || (i = f.a.WINDOW_WILDCARD),
            o = o || h.b.WILDCARD,
            T)
            throw i && o ? new Error("Request listener already exists for " + r + " on domain " + o.toString() + " for " + (i === f.a.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : i ? new Error("Request listener already exists for " + r + " for " + (i === f.a.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : o ? new Error("Request listener already exists for " + r + " on domain " + o.toString()) : new Error("Request listener already exists for " + r);
          var O = f.a.requestListeners
            , C = O[r];
          C || (C = new l.a,
            O[r] = C);
          var A = C.get(i);
          A || (A = {},
            C.set(i, A));
          var k = o.toString()
            , P = A[m]
            , N = void 0;
          return n.i(p.c)(o) ? (P || (P = [],
            A[m] = P),
            N = {
              regex: o,
              listener: t
            },
            P.push(N)) : A[k] = t,
            {
              cancel: function () {
                A && (delete A[k],
                  i && 0 === Object.keys(A).length && C["delete"](i),
                  N && P.splice(P.indexOf(N, 1)))
              }
            }
        }
        t.f = r,
          t.b = i,
          t.d = o,
          t.g = a,
          t.a = u,
          t.c = s,
          t.e = c;
        var l = (n(2),
          n(7))
          , d = n(1)
          , f = n(3)
          , p = n(4)
          , h = n(0);
        f.a.responseListeners = f.a.responseListeners || {},
          f.a.requestListeners = f.a.requestListeners || {},
          f.a.WINDOW_WILDCARD = f.a.WINDOW_WILDCARD || new function () { }
          ,
          f.a.erroredResponseListeners = f.a.erroredResponseListeners || {};
        var m = "__domain_regex__"
      }
      , function (e, t, n) {
        "use strict";
        function r(e, t, n) {
          return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : e[t] = n,
            e
        }
        function i(e, t) {
          var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
            , i = n.i(c.d)()
            , o = n.i(c.e)()
            , u = n.i(a.g)(window);
          return d({}, t, r, {
            sourceDomain: u,
            id: t.id || i,
            windowType: o
          })
        }
        function o(e, t, o) {
          return u.a["try"](function () {
            t = i(e, t, {
              data: n.i(c.f)(e, o, t.data),
              domain: o
            });
            var d = void 0;
            if (d = -1 !== s.c.indexOf(t.name) || t.type === s.b.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === t.ack ? "error" : "info",
              c.g.logLevel(d, ["\n\n\t", "#send", t.type.replace(/^postrobot_message_/, ""), "::", t.name, "::", o || s.b.WILDCARD, "\n\n", t]),
              e === window)
              throw new Error("Attemping to send message to self");
            if (n.i(a.f)(e))
              throw new Error("Window is closed");
            c.g.debug("Running send message strategies", t);
            var f = []
              , p = n.i(c.h)(r({}, s.b.WINDOW_PROPS.POSTROBOT, t), null, 2);
            return u.a.map(Object.keys(l.a), function (t) {
              return u.a["try"](function () {
                if (!s.a.ALLOWED_POST_MESSAGE_METHODS[t])
                  throw new Error("Strategy disallowed: " + t);
                return l.a[t](e, p, o)
              }).then(function () {
                return f.push(t + ": success"),
                  !0
              }, function (e) {
                return f.push(t + ": " + n.i(c.i)(e) + "\n"),
                  !1
              })
            }).then(function (e) {
              var n = e.some(Boolean)
                , r = t.type + " " + t.name + " " + (n ? "success" : "error") + ":\n  - " + f.join("\n  - ") + "\n";
              if (c.g.debug(r),
                !n)
                throw new Error(r)
            })
          })
        }
        t.a = o;
        var a = n(1)
          , u = n(2)
          , s = n(0)
          , c = n(4)
          , l = n(25)
          , d = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
          }
      }
      , function (e, t, n) {
        "use strict";
        function r() {
          if (!window.WeakMap)
            return !1;
          if (!window.Object.freeze)
            return !1;
          try {
            var e = new window.WeakMap
              , t = {};
            return window.Object.freeze(t),
              e.set(t, "__testvalue__"),
              "__testvalue__" === e.get(t)
          } catch (n) {
            return !1
          }
        }
        t.a = r
      }
      , function (e, t, n) {
        "use strict";
        function r(e, t) {
          for (var n = 0; n < e.length; n++)
            try {
              if (e[n] === t)
                return n
            } catch (r) { }
          return -1
        }
        function i() { }
        t.b = r,
          t.a = i
      }
      , function (e, t, n) {
        "use strict";
        function r(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
        }
        n.d(t, "a", function () {
          return l
        });
        var i = n(1)
          , o = n(14)
          , a = n(15)
          , u = function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                  r.configurable = !0,
                  "value" in r && (r.writable = !0),
                  Object.defineProperty(e, r.key, r)
              }
            }
            return function (t, n, r) {
              return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
          }()
          , s = Object.defineProperty
          , c = Date.now() % 1e9
          , l = function () {
            function e() {
              if (r(this, e),
                c += 1,
                this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__" + c,
                n.i(o.a)())
                try {
                  this.weakmap = new window.WeakMap
                } catch (t) { }
              this.keys = [],
                this.values = []
            }
            return u(e, [{
              key: "_cleanupClosedWindows",
              value: function () {
                for (var e = this.weakmap, t = this.keys, r = 0; r < t.length; r++) {
                  var o = t[r];
                  if (n.i(i.e)(o) && n.i(i.f)(o)) {
                    if (e)
                      try {
                        e["delete"](o)
                      } catch (a) { }
                    t.splice(r, 1),
                      this.values.splice(r, 1),
                      r -= 1
                  }
                }
              }
            }, {
              key: "isSafeToReadWrite",
              value: function (e) {
                if (n.i(i.e)(e))
                  return !1;
                try {
                  n.i(a.a)(e && e.self),
                    n.i(a.a)(e && e[this.name])
                } catch (t) {
                  return !1
                }
                return !0
              }
            }, {
              key: "set",
              value: function (e, t) {
                if (!e)
                  throw new Error("WeakMap expected key");
                var r = this.weakmap;
                if (r)
                  try {
                    r.set(e, t)
                  } catch (i) {
                    delete this.weakmap
                  }
                if (this.isSafeToReadWrite(e)) {
                  var o = this.name
                    , u = e[o];
                  u && u[0] === e ? u[1] = t : s(e, o, {
                    value: [e, t],
                    writable: !0
                  })
                } else {
                  this._cleanupClosedWindows();
                  var c = this.keys
                    , l = this.values
                    , d = n.i(a.b)(c, e);
                  -1 === d ? (c.push(e),
                    l.push(t)) : l[d] = t
                }
              }
            }, {
              key: "get",
              value: function (e) {
                if (!e)
                  throw new Error("WeakMap expected key");
                var t = this.weakmap;
                if (t)
                  try {
                    if (t.has(e))
                      return t.get(e)
                  } catch (r) {
                    delete this.weakmap
                  }
                if (!this.isSafeToReadWrite(e)) {
                  this._cleanupClosedWindows();
                  var i = this.keys
                    , o = n.i(a.b)(i, e);
                  if (-1 === o)
                    return;
                  return this.values[o]
                }
                var u = e[this.name];
                if (u && u[0] === e)
                  return u[1]
              }
            }, {
              key: "delete",
              value: function (e) {
                if (!e)
                  throw new Error("WeakMap expected key");
                var t = this.weakmap;
                if (t)
                  try {
                    t["delete"](e)
                  } catch (r) {
                    delete this.weakmap
                  }
                if (this.isSafeToReadWrite(e)) {
                  var i = e[this.name];
                  i && i[0] === e && (i[0] = i[1] = void 0)
                } else {
                  this._cleanupClosedWindows();
                  var o = this.keys
                    , u = n.i(a.b)(o, e);
                  -1 !== u && (o.splice(u, 1),
                    this.values.splice(u, 1))
                }
              }
            }, {
              key: "has",
              value: function (e) {
                if (!e)
                  throw new Error("WeakMap expected key");
                var t = this.weakmap;
                if (t)
                  try {
                    return t.has(e)
                  } catch (r) {
                    delete this.weakmap
                  }
                if (this.isSafeToReadWrite(e)) {
                  var i = e[this.name];
                  return !(!i || i[0] !== e)
                }
                return this._cleanupClosedWindows(),
                  -1 !== n.i(a.b)(this.keys, e)
              }
            }]),
              e
          }()
      }
      , function (e, t, n) {
        "use strict";
        function r(e) {
          return "[object RegExp]" === Object.prototype.toString.call(e)
        }
        function i() { }
        t.b = r,
          t.a = i
      }
      , function (e, t, n) {
        "use strict";
        function r(e) {
          if (-1 === a.indexOf(e)) {
            a.push(e),
              setTimeout(function () {
                throw e
              }, 1);
            for (var t = 0; t < o.length; t++)
              o[t](e)
          }
        }
        function i(e) {
          return o.push(e),
            {
              cancel: function () {
                o.splice(o.indexOf(e), 1)
              }
            }
        }
        t.a = r,
          t.b = i;
        var o = []
          , a = []
      }
      , function (e, t, n) {
        "use strict";
        function r(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
        }
        n.d(t, "a", function () {
          return s
        });
        var i = n(20)
          , o = n(18)
          , a = function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                  r.configurable = !0,
                  "value" in r && (r.writable = !0),
                  Object.defineProperty(e, r.key, r)
              }
            }
            return function (t, n, r) {
              return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
          }()
          , u = window.__zalgopromise__ = window.__zalgopromise__ || {
            flushPromises: [],
            activeCount: 0
          }
          , s = function () {
            function e(t) {
              var n = this;
              if (r(this, e),
                this.resolved = !1,
                this.rejected = !1,
                this.errorHandled = !1,
                this.handlers = [],
                t) {
                var i = void 0
                  , o = void 0
                  , a = !1
                  , u = !1
                  , s = !1;
                try {
                  t(function (e) {
                    s ? n.resolve(e) : (a = !0,
                      i = e)
                  }, function (e) {
                    s ? n.reject(e) : (u = !0,
                      o = e)
                  })
                } catch (c) {
                  return void this.reject(c)
                }
                s = !0,
                  a ? this.resolve(i) : u && this.reject(o)
              }
            }
            return a(e, [{
              key: "resolve",
              value: function (e) {
                if (this.resolved || this.rejected)
                  return this;
                if (n.i(i.a)(e))
                  throw new Error("Can not resolve promise with another promise");
                return this.resolved = !0,
                  this.value = e,
                  this.dispatch(),
                  this
              }
            }, {
              key: "reject",
              value: function (e) {
                var t = this;
                if (this.resolved || this.rejected)
                  return this;
                if (n.i(i.a)(e))
                  throw new Error("Can not reject promise with another promise");
                if (!e) {
                  var r = e && "function" == typeof e.toString ? e.toString() : Object.prototype.toString.call(e);
                  e = new Error("Expected reject to be called with Error, got " + r)
                }
                return this.rejected = !0,
                  this.error = e,
                  this.errorHandled || setTimeout(function () {
                    t.errorHandled || n.i(o.a)(e)
                  }, 1),
                  this.dispatch(),
                  this
              }
            }, {
              key: "asyncReject",
              value: function (e) {
                this.errorHandled = !0,
                  this.reject(e)
              }
            }, {
              key: "dispatch",
              value: function () {
                var t = this
                  , r = this.dispatching
                  , o = this.resolved
                  , a = this.rejected
                  , s = this.handlers;
                if (!r && (o || a)) {
                  this.dispatching = !0,
                    u.activeCount += 1;
                  for (var c = 0; c < s.length; c++)
                    !function (r) {
                      var u = s[r]
                        , c = u.onSuccess
                        , l = u.onError
                        , d = u.promise
                        , f = void 0;
                      if (o)
                        try {
                          f = c ? c(t.value) : t.value
                        } catch (p) {
                          return d.reject(p),
                            "continue"
                        }
                      else if (a) {
                        if (!l)
                          return d.reject(t.error),
                            "continue";
                        try {
                          f = l(t.error)
                        } catch (p) {
                          return d.reject(p),
                            "continue"
                        }
                      }
                      f instanceof e && (f.resolved || f.rejected) ? (f.resolved ? d.resolve(f.value) : d.reject(f.error),
                        f.errorHandled = !0) : n.i(i.a)(f) ? f instanceof e && (f.resolved || f.rejected) ? f.resolved ? d.resolve(f.value) : d.reject(f.error) : f.then(function (e) {
                          d.resolve(e)
                        }, function (e) {
                          d.reject(e)
                        }) : d.resolve(f)
                    }(c);
                  s.length = 0,
                    this.dispatching = !1,
                    u.activeCount -= 1,
                    0 === u.activeCount && e.flushQueue()
                }
              }
            }, {
              key: "then",
              value: function (t, n) {
                if (t && "function" != typeof t && !t.call)
                  throw new Error("Promise.then expected a function for success handler");
                if (n && "function" != typeof n && !n.call)
                  throw new Error("Promise.then expected a function for error handler");
                var r = new e;
                return this.handlers.push({
                  promise: r,
                  onSuccess: t,
                  onError: n
                }),
                  this.errorHandled = !0,
                  this.dispatch(),
                  r
              }
            }, {
              key: "catch",
              value: function (e) {
                return this.then(void 0, e)
              }
            }, {
              key: "finally",
              value: function (t) {
                return this.then(function (n) {
                  return e["try"](t).then(function () {
                    return n
                  })
                }, function (n) {
                  return e["try"](t).then(function () {
                    throw n
                  })
                })
              }
            }, {
              key: "timeout",
              value: function (e, t) {
                var n = this;
                if (this.resolved || this.rejected)
                  return this;
                var r = setTimeout(function () {
                  n.resolved || n.rejected || n.reject(t || new Error("Promise timed out after " + e + "ms"))
                }, e);
                return this.then(function (e) {
                  return clearTimeout(r),
                    e
                })
              }
            }, {
              key: "toPromise",
              value: function () {
                if (!window.Promise)
                  throw new Error("Could not find window.Promise");
                return window.Promise.resolve(this)
              }
            }], [{
              key: "resolve",
              value: function (t) {
                return t instanceof e ? t : n.i(i.a)(t) ? new e(function (e, n) {
                  return t.then(e, n)
                }
                ) : (new e).resolve(t)
              }
            }, {
              key: "reject",
              value: function (t) {
                return (new e).reject(t)
              }
            }, {
              key: "all",
              value: function (t) {
                var r = new e
                  , o = t.length
                  , a = [];
                if (!o)
                  return r.resolve(a),
                    r;
                for (var u = 0; u < t.length; u++)
                  !function (u) {
                    var s = t[u];
                    if (s instanceof e) {
                      if (s.resolved)
                        return a[u] = s.value,
                          o -= 1,
                          "continue"
                    } else if (!n.i(i.a)(s))
                      return a[u] = s,
                        o -= 1,
                        "continue";
                    e.resolve(s).then(function (e) {
                      a[u] = e,
                        0 === (o -= 1) && r.resolve(a)
                    }, function (e) {
                      r.reject(e)
                    })
                  }(u);
                return 0 === o && r.resolve(a),
                  r
              }
            }, {
              key: "hash",
              value: function (t) {
                var n = {};
                return e.all(Object.keys(t).map(function (r) {
                  return e.resolve(t[r]).then(function (e) {
                    n[r] = e
                  })
                })).then(function () {
                  return n
                })
              }
            }, {
              key: "map",
              value: function (t, n) {
                return e.all(t.map(n))
              }
            }, {
              key: "onPossiblyUnhandledException",
              value: function (e) {
                return n.i(o.b)(e)
              }
            }, {
              key: "try",
              value: function (t, n, r) {
                var i = void 0;
                try {
                  i = t.apply(n, r || [])
                } catch (o) {
                  return e.reject(o)
                }
                return e.resolve(i)
              }
            }, {
              key: "delay",
              value: function (t) {
                return new e(function (e) {
                  setTimeout(e, t)
                }
                )
              }
            }, {
              key: "isPromise",
              value: function (t) {
                return !!(t && t instanceof e) || n.i(i.a)(t)
              }
            }, {
              key: "flush",
              value: function () {
                var t = new e;
                return u.flushPromises.push(t),
                  0 === u.activeCount && e.flushQueue(),
                  t
              }
            }, {
              key: "flushQueue",
              value: function () {
                var e = u.flushPromises;
                u.flushPromises = [];
                for (var t = e, n = Array.isArray(t), r = 0, t = n ? t : t[Symbol.iterator](); ;) {
                  var i;
                  if (n) {
                    if (r >= t.length)
                      break;
                    i = t[r++]
                  } else {
                    if (r = t.next(),
                      r.done)
                      break;
                    i = r.value
                  }
                  i.resolve()
                }
              }
            }]),
              e
          }()
      }
      , function (e, t, n) {
        "use strict";
        function r(e) {
          try {
            if (!e)
              return !1;
            if (window.Promise && e instanceof window.Promise)
              return !0;
            if (window.Window && e instanceof window.Window)
              return !1;
            if (window.constructor && e instanceof window.constructor)
              return !1;
            if (i) {
              var t = i.call(e);
              if ("[object Window]" === t || "[object global]" === t || "[object DOMWindow]" === t)
                return !1
            }
            if ("function" == typeof e.then)
              return !0
          } catch (n) {
            return !1
          }
          return !1
        }
        t.a = r;
        var i = {}.toString
      }
      , function (e, t, n) {
        "use strict";
        function r(e) {
          var t = i.a.requestPromises.get(e);
          if (t)
            for (var n = t, r = Array.isArray(n), o = 0, n = r ? n : n[Symbol.iterator](); ;) {
              var a;
              if (r) {
                if (o >= n.length)
                  break;
                a = n[o++]
              } else {
                if (o = n.next(),
                  o.done)
                  break;
                a = o.value
              }
              var u = a;
              u.reject(new Error("No response from window - cleaned up"))
            }
          i.a.popupWindowsByWin && i.a.popupWindowsByWin["delete"](e),
            i.a.remoteWindows && i.a.remoteWindows["delete"](e),
            i.a.requestPromises["delete"](e),
            i.a.methods["delete"](e),
            i.a.readyPromises["delete"](e)
        }
        t.a = r;
        var i = n(3)
      }
      , function (e, t, n) {
        "use strict";
        function r(e, t, n) {
          return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : e[t] = n,
            e
        }
        n.d(t, "a", function () {
          return a
        });
        var i, o = n(11), a = {
          ALLOW_POSTMESSAGE_POPUP: !("__ALLOW_POSTMESSAGE_POPUP__" in window) || window.__ALLOW_POSTMESSAGE_POPUP__,
          LOG_LEVEL: "error",
          BRIDGE_TIMEOUT: 5e3,
          ACK_TIMEOUT: -1 !== window.navigator.userAgent.match(/MSIE/i) ? 2e3 : 1e3,
          RES_TIMEOUT: 1 / 0,
          LOG_TO_PAGE: !1,
          ALLOWED_POST_MESSAGE_METHODS: (i = {},
            r(i, o.a.SEND_STRATEGIES.POST_MESSAGE, !0),
            r(i, o.a.SEND_STRATEGIES.BRIDGE, !0),
            r(i, o.a.SEND_STRATEGIES.GLOBAL, !0),
            i)
        };
        0 === window.location.href.indexOf(o.a.FILE_PROTOCOL) && (a.ALLOW_POSTMESSAGE_POPUP = !0)
      }
      , function (e, t, n) {
        "use strict";
        function r(e) {
          var t = void 0;
          try {
            t = n.i(c.j)(e)
          } catch (r) {
            return
          }
          if (t && "object" === (void 0 === t ? "undefined" : f(t)) && null !== t && (t = t[s.b.WINDOW_PROPS.POSTROBOT]) && "object" === (void 0 === t ? "undefined" : f(t)) && null !== t && t.type && "string" == typeof t.type && d.a[t.type])
            return t
        }
        function i(e) {
          if (!window || window.closed)
            throw new Error("Message recieved in closed window");
          try {
            if (!e.source)
              return
          } catch (t) {
            return
          }
          var i = e.source
            , o = e.origin
            , a = e.data
            , f = r(a);
          if (f) {
            if (!f.sourceDomain || "string" != typeof f.sourceDomain)
              throw new Error("Expected message to have sourceDomain");
            if (0 !== f.sourceDomain.indexOf(s.b.MOCK_PROTOCOL) && 0 !== f.sourceDomain.indexOf(s.b.FILE_PROTOCOL) || (o = f.sourceDomain),
              -1 === l.a.receivedMessages.indexOf(f.id)) {
              l.a.receivedMessages.push(f.id);
              var p = void 0;
              if (p = -1 !== s.c.indexOf(f.name) || f.type === s.b.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === f.ack ? "error" : "info",
                c.g.logLevel(p, ["\n\n\t", "#receive", f.type.replace(/^postrobot_message_/, ""), "::", f.name, "::", o, "\n\n", f]),
                n.i(u.f)(i))
                return void c.g.debug("Source window is closed - can not send " + f.type + " " + f.name);
              f.data && (f.data = n.i(c.k)(i, o, f.data)),
                d.a[f.type](i, o, f)
            }
          }
        }
        function o(e) {
          try {
            e.source
          } catch (t) {
            return
          }
          var n = {
            source: e.source || e.sourceElement,
            origin: e.origin || e.originalEvent && e.originalEvent.origin,
            data: e.data
          };
          i(n)
        }
        function a() {
          n.i(c.l)(window, "message", o)
        }
        t.b = o,
          t.a = a;
        var u = n(1)
          , s = n(0)
          , c = n(4)
          , l = n(3)
          , d = n(24)
          , f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
          }
            : function (e) {
              return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
          ;
        l.a.receivedMessages = l.a.receivedMessages || []
      }
      , function (e, t, n) {
        "use strict";
        function r(e, t, n) {
          return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : e[t] = n,
            e
        }
        n.d(t, "a", function () {
          return f
        });
        var i, o = n(2), a = n(1), u = n(0), s = n(4), c = n(13), l = n(12), d = Object.assign || function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
          }
          return e
        }
          , f = (i = {},
            r(i, u.b.POST_MESSAGE_TYPE.ACK, function (e, t, r) {
              if (!n.i(l.a)(r.hash)) {
                var i = n.i(l.b)(r.hash);
                if (!i)
                  throw new Error("No handler found for post message ack for message: " + r.name + " from " + t + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!n.i(a.b)(i.domain, t))
                  throw new Error("Ack origin " + t + " does not match domain " + i.domain.toString());
                i.ack = !0
              }
            }),
            r(i, u.b.POST_MESSAGE_TYPE.REQUEST, function (e, t, r) {
              function i(i) {
                return r.fireAndForget || n.i(a.f)(e) ? o.a.resolve() : n.i(c.a)(e, d({
                  target: r.originalSource,
                  hash: r.hash,
                  name: r.name
                }, i), t)
              }
              var f = n.i(l.c)({
                name: r.name,
                win: e,
                domain: t
              });
              return o.a.all([i({
                type: u.b.POST_MESSAGE_TYPE.ACK
              }), o.a["try"](function () {
                if (!f)
                  throw new Error("No handler found for post message: " + r.name + " from " + t + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!n.i(a.b)(f.domain, t))
                  throw new Error("Request origin " + t + " does not match domain " + f.domain.toString());
                var i = r.data;
                return f.handler({
                  source: e,
                  origin: t,
                  data: i
                })
              }).then(function (e) {
                return i({
                  type: u.b.POST_MESSAGE_TYPE.RESPONSE,
                  ack: u.b.POST_MESSAGE_ACK.SUCCESS,
                  data: e
                })
              }, function (e) {
                var t = n.i(s.i)(e).replace(/^Error: /, "");
                return i({
                  type: u.b.POST_MESSAGE_TYPE.RESPONSE,
                  ack: u.b.POST_MESSAGE_ACK.ERROR,
                  error: t
                })
              })]).then(s.m)["catch"](function (e) {
                return f && f.handleError ? f.handleError(e) : void s.g.error(n.i(s.i)(e))
              })
            }),
            r(i, u.b.POST_MESSAGE_TYPE.RESPONSE, function (e, t, r) {
              if (!n.i(l.a)(r.hash)) {
                var i = n.i(l.b)(r.hash);
                if (!i)
                  throw new Error("No handler found for post message response for message: " + r.name + " from " + t + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!n.i(a.b)(i.domain, t))
                  throw new Error("Response origin " + t + " does not match domain " + i.domain);
                if (n.i(l.d)(r.hash),
                  r.ack === u.b.POST_MESSAGE_ACK.ERROR)
                  return i.respond(new Error(r.error), null);
                if (r.ack === u.b.POST_MESSAGE_ACK.SUCCESS) {
                  var o = r.data || r.response;
                  return i.respond(null, {
                    source: e,
                    origin: t,
                    data: o
                  })
                }
              }
            }),
            i)
      }
      , function (e, t, n) {
        "use strict";
        n.d(t, "a", function () {
          return o
        });
        var r = n(1)
          , i = n(0)
          , o = {};
        o[i.b.SEND_STRATEGIES.POST_MESSAGE] = function (e, t, o) {
          var a = void 0;
          a = Array.isArray(o) ? o : o ? [o] : [i.b.WILDCARD],
            a = a.map(function (t) {
              if (0 === t.indexOf(i.b.MOCK_PROTOCOL)) {
                if (window.location.protocol === i.b.FILE_PROTOCOL)
                  return i.b.WILDCARD;
                if (!n.i(r.h)(e))
                  throw new Error("Attempting to send messsage to mock domain " + t + ", but window is actually cross-domain");
                return n.i(r.i)(e)
              }
              return 0 === t.indexOf(i.b.FILE_PROTOCOL) ? i.b.WILDCARD : t
            }),
            a.forEach(function (n) {
              return e.postMessage(t, n)
            })
        }
      }
      , function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var r = n(6);
        n.d(t, "cleanUpWindow", function () {
          return r.cleanUpWindow
        }),
          n.d(t, "init", function () {
            return r.init
          }),
          n.d(t, "bridge", function () {
            return r.bridge
          }),
          n.d(t, "Promise", function () {
            return r.Promise
          }),
          n.d(t, "parent", function () {
            return r.parent
          }),
          n.d(t, "send", function () {
            return r.send
          }),
          n.d(t, "request", function () {
            return r.request
          }),
          n.d(t, "sendToParent", function () {
            return r.sendToParent
          }),
          n.d(t, "client", function () {
            return r.client
          }),
          n.d(t, "on", function () {
            return r.on
          }),
          n.d(t, "listen", function () {
            return r.listen
          }),
          n.d(t, "once", function () {
            return r.once
          }),
          n.d(t, "listener", function () {
            return r.listener
          }),
          n.d(t, "CONFIG", function () {
            return r.CONFIG
          }),
          n.d(t, "CONSTANTS", function () {
            return r.CONSTANTS
          }),
          n.d(t, "disable", function () {
            return r.disable
          }),
          t["default"] = r
      }
      , function (e, t, n) {
        "use strict";
        function r() {
          n.i(c.on)(s.b.POST_MESSAGE_NAMES.READY, {
            domain: s.b.WILDCARD
          }, function (e) {
            var t = e.source
              , n = d.a.readyPromises.get(t);
            n ? n.resolve(e) : (n = (new u.a).resolve(e),
              d.a.readyPromises.set(t, n))
          });
          var e = n.i(a.a)();
          e && n.i(c.send)(e, s.b.POST_MESSAGE_NAMES.READY, {}, {
            domain: s.b.WILDCARD,
            timeout: 1 / 0
          })["catch"](function (e) {
            l.a.debug(n.i(f.b)(e))
          })
        }
        function i(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3
            , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Window"
            , r = d.a.readyPromises.get(e);
          return r || (r = new u.a,
            d.a.readyPromises.set(e, r),
            setTimeout(function () {
              return r.reject(new Error(n + " did not load after " + t + "ms"))
            }, t),
            r)
        }
        t.a = r,
          t.b = i;
        var o = n(7)
          , a = n(1)
          , u = n(2)
          , s = n(0)
          , c = n(6)
          , l = n(9)
          , d = n(3)
          , f = n(8);
        d.a.readyPromises = d.a.readyPromises || new o.a
      }
      , function (e, t, n) {
        "use strict";
        function r(e, t) {
          return "object" === (void 0 === e ? "undefined" : S(e)) && null !== e && e.__type__ === t
        }
        function i(e, t, r, i) {
          var o = n.i(y.f)()
            , a = E.a.methods.get(e);
          return a || (a = {},
            E.a.methods.set(e, a)),
            a[o] = {
              domain: t,
              method: r
            },
            {
              __type__: _.b.SERIALIZATION_TYPES.METHOD,
              __id__: o,
              __name__: i
            }
        }
        function o(e) {
          return {
            __type__: _.b.SERIALIZATION_TYPES.ERROR,
            __message__: n.i(y.b)(e)
          }
        }
        function a(e, t, n, r) {
          return {
            __type__: _.b.SERIALIZATION_TYPES.PROMISE,
            __then__: i(e, t, function (e, t) {
              return n.then(e, t)
            }, r + ".then")
          }
        }
        function u(e, t, n, r) {
          return {
            __type__: _.b.SERIALIZATION_TYPES.ZALGO_PROMISE,
            __then__: i(e, t, function (e, t) {
              return n.then(e, t)
            }, r + ".then")
          }
        }
        function s(e) {
          return {
            __type__: _.b.SERIALIZATION_TYPES.REGEX,
            __source__: e.source
          }
        }
        function c(e, t, r) {
          return n.i(y.g)({
            obj: r
          }, function (r, c) {
            return "function" == typeof r ? i(e, t, r, c.toString()) : r instanceof Error ? o(r) : window.Promise && r instanceof window.Promise ? a(e, t, r, c.toString()) : w.a.isPromise(r) ? u(e, t, r, c.toString()) : n.i(y.a)(r) ? s(r) : void 0
          }).obj
        }
        function l(e, t, r) {
          function i() {
            var i = Array.prototype.slice.call(arguments);
            return q.a.debug("Call foreign method", r.__name__, i),
              n.i(b.send)(e, _.b.POST_MESSAGE_NAMES.METHOD, {
                id: r.__id__,
                name: r.__name__,
                args: i
              }, {
                  domain: t,
                  timeout: 1 / 0
                }).then(function (e) {
                  var t = e.data;
                  return q.a.debug("Got foreign method result", r.__name__, t.result),
                    t.result
                }, function (e) {
                  throw q.a.debug("Got foreign method error", n.i(y.b)(e)),
                  e
                })
          }
          return i.__name__ = r.__name__,
            i.__xdomain__ = !0,
            i.source = e,
            i.origin = t,
            i
        }
        function d(e, t, n) {
          return new Error(n.__message__)
        }
        function f(e, t, n) {
          return new w.a(function (r, i) {
            return l(e, t, n.__then__)(r, i)
          }
          )
        }
        function p(e, t, n) {
          return window.Promise ? new window.Promise(function (r, i) {
            return l(e, t, n.__then__)(r, i)
          }
          ) : f(e, t, n)
        }
        function h(e, t, n) {
          return new RegExp(n.__source__)
        }
        function m(e, t, i) {
          return n.i(y.g)({
            obj: i
          }, function (n, i) {
            if ("object" === (void 0 === n ? "undefined" : S(n)) && null !== n)
              return r(n, _.b.SERIALIZATION_TYPES.METHOD) ? l(e, t, n) : r(n, _.b.SERIALIZATION_TYPES.ERROR) ? d(e, t, n) : r(n, _.b.SERIALIZATION_TYPES.PROMISE) ? p(e, t, n) : r(n, _.b.SERIALIZATION_TYPES.ZALGO_PROMISE) ? f(e, t, n) : r(n, _.b.SERIALIZATION_TYPES.REGEX) ? h(e, t, n) : void 0
          }).obj
        }
        n.d(t, "a", function () {
          return T
        }),
          t.b = c,
          t.c = m;
        var v = n(7)
          , g = n(1)
          , w = n(2)
          , _ = n(0)
          , y = n(8)
          , b = n(6)
          , q = n(9)
          , E = n(3)
          , S = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
          }
            : function (e) {
              return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
          ;
        E.a.methods = E.a.methods || new v.a;
        var T = n.i(y.e)(function () {
          n.i(b.on)(_.b.POST_MESSAGE_NAMES.METHOD, {
            origin: _.b.WILDCARD
          }, function (e) {
            var t = e.source
              , r = e.origin
              , i = e.data
              , o = E.a.methods.get(t);
            if (!o)
              throw new Error("Could not find any methods this window has privileges to call");
            var a = o[i.id];
            if (!a)
              throw new Error("Could not find method with id: " + i.id);
            if (!n.i(g.b)(a.domain, r))
              throw new Error("Method domain " + a.domain + " does not match origin " + r);
            return q.a.debug("Call local method", i.name, i.args),
              w.a["try"](function () {
                return a.method.apply({
                  source: t,
                  origin: r,
                  data: i
                }, i.args)
              }).then(function (e) {
                return {
                  result: e,
                  id: i.id,
                  name: i.name
                }
              })
          })
        })
      }
      , function (e, t, n) {
        "use strict";
        function r(e) {
          return s.a["try"](function () {
            if (!e.name)
              throw new Error("Expected options.name");
            var t = e.name
              , r = void 0
              , i = void 0;
            if ("string" == typeof e.window) {
              var o = document.getElementById(e.window);
              if (!o)
                throw new Error("Expected options.window " + Object.prototype.toString.call(e.window) + " to be a valid element id");
              if ("iframe" !== o.tagName.toLowerCase())
                throw new Error("Expected options.window " + Object.prototype.toString.call(e.window) + " to be an iframe");
              if (!o.contentWindow)
                throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
              r = o.contentWindow
            } else if (e.window instanceof HTMLIFrameElement) {
              if ("iframe" !== e.window.tagName.toLowerCase())
                throw new Error("Expected options.window " + Object.prototype.toString.call(e.window) + " to be an iframe");
              if (e.window && !e.window.contentWindow)
                throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
              e.window && e.window.contentWindow && (r = e.window.contentWindow)
            } else
              r = e.window;
            if (!r)
              throw new Error("Expected options.window to be a window object, iframe, or iframe element id.");
            var a = r;
            i = e.domain || l.b.WILDCARD;
            var u = e.name + "_" + n.i(f.d)();
            if (n.i(c.f)(a))
              throw new Error("Target window is closed");
            var h = !1
              , m = p.a.requestPromises.get(a);
            m || (m = [],
              p.a.requestPromises.set(a, m));
            var v = s.a["try"](function () {
              if (n.i(c.j)(window, a))
                return s.a.resolve(n.i(f.p)(a))
            }).then(function () {
              return new s.a(function (r, o) {
                var s = void 0;
                if (e.fireAndForget || (s = {
                  name: t,
                  window: a,
                  domain: i,
                  respond: function (e, t) {
                    e || (h = !0,
                      m.splice(m.indexOf(v, 1))),
                      e ? o(e) : r(t)
                  }
                },
                  n.i(d.d)(u, s)),
                  n.i(d.e)(a, {
                    type: l.b.POST_MESSAGE_TYPE.REQUEST,
                    hash: u,
                    name: t,
                    data: e.data,
                    fireAndForget: e.fireAndForget
                  }, i)["catch"](o),
                  e.fireAndForget)
                  return r();
                var f = l.a.ACK_TIMEOUT
                  , p = e.timeout || l.a.RES_TIMEOUT
                  , g = 100
                  , w = function _() {
                    if (!h) {
                      if (n.i(c.f)(a))
                        return o(s.ack ? new Error("Window closed for " + t + " before response") : new Error("Window closed for " + t + " before ack"));
                      if (f -= g,
                        p -= g,
                        s.ack) {
                        if (p === 1 / 0)
                          return;
                        g = Math.min(p, 2e3)
                      } else {
                        if (f <= 0)
                          return o(new Error("No ack for postMessage " + t + " in " + n.i(c.g)() + " in " + l.a.ACK_TIMEOUT + "ms"));
                        if (p <= 0)
                          return o(new Error("No response for postMessage " + t + " in " + n.i(c.g)() + " in " + (e.timeout || l.a.RES_TIMEOUT) + "ms"))
                      }
                      setTimeout(_, g);
                    }
                  };
                setTimeout(w, g)
              }
              )
            });
            return v["catch"](function () {
              n.i(d.f)(u),
                n.i(d.g)(u)
            }),
              m.push(v),
              v
          })
        }
        function i(e, t, n, i) {
          return i = i || {},
            i.window = e,
            i.name = t,
            i.data = n,
            r(i)
        }
        function o(e, t, r) {
          var o = n.i(c.a)();
          return o ? i(o, e, t, r) : new s.a(function (e, t) {
            return t(new Error("Window does not have a parent"))
          }
          )
        }
        function a() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if (!e.window)
            throw new Error("Expected options.window");
          var t = e.window;
          return {
            send: function (n, r) {
              return i(t, n, r, e)
            }
          }
        }
        n.d(t, "a", function () {
          return i
        }),
          t.b = r,
          t.c = o,
          t.d = a;
        var u = n(7)
          , s = n(2)
          , c = n(1)
          , l = n(0)
          , d = n(5)
          , f = n(4)
          , p = n(3);
        p.a.requestPromises = p.a.requestPromises || new u.a
      }
      , function (e, t, n) {
        "use strict";
        function r() {
          delete window[i.b.WINDOW_PROPS.POSTROBOT],
            window.removeEventListener("message", o.b)
        }
        t.c = r;
        var i = n(0)
          , o = n(5);
        n.d(t, "a", function () {
          return i.a
        }),
          n.d(t, "b", function () {
            return i.b
          })
      }
      , function (e, t, n) {
        "use strict";
        n.d(t, "a", function () {
          return u
        });
        var r = n(1)
          , i = n(29);
        n.d(t, "b", function () {
          return i.a
        }),
          n.d(t, "c", function () {
            return i.b
          }),
          n.d(t, "d", function () {
            return i.c
          }),
          n.d(t, "e", function () {
            return i.d
          });
        var o = n(32);
        n.d(t, "f", function () {
          return o.a
        }),
          n.d(t, "g", function () {
            return o.b
          }),
          n.d(t, "h", function () {
            return o.c
          }),
          n.d(t, "i", function () {
            return o.d
          });
        var a = n(30);
        n.d(t, "j", function () {
          return a.a
        }),
          n.d(t, "k", function () {
            return a.b
          }),
          n.d(t, "l", function () {
            return a.c
          });
        var u = n.i(r.a)()
      }
      , function (e, t, n) {
        "use strict";
        function r(e) {
          if (!e.name)
            throw new Error("Expected options.name");
          if (!e.handler)
            throw new Error("Expected options.handler");
          var t = e.name
            , r = e.window
            , i = e.domain
            , o = {
              handler: e.handler,
              handleError: e.errorHandler || function (e) {
                throw e
              }
              ,
              window: r,
              domain: i || d.b.WILDCARD,
              name: t
            }
            , a = n.i(l.c)({
              name: t,
              win: r,
              domain: i
            }, o);
          if (e.once) {
            var s = o.handler;
            o.handler = n.i(c.n)(function () {
              return a.cancel(),
                s.apply(this, arguments)
            })
          }
          if (o.window && e.errorOnClose)
            var p = n.i(c.o)(function () {
              r && "object" === (void 0 === r ? "undefined" : f(r)) && n.i(u.f)(r) && (p.cancel(),
                o.handleError(new Error("Post message target window is closed")))
            }, 50);
          return {
            cancel: function () {
              a.cancel()
            }
          }
        }
        function i(e, t, n) {
          return "function" == typeof t && (n = t,
            t = {}),
            t = t || {},
            t.name = e,
            t.handler = n || t.handler,
            r(t)
        }
        function o(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
            , n = arguments[2];
          "function" == typeof t && (n = t,
            t = {}),
            t = t || {},
            n = n || t.handler;
          var i = t.errorHandler
            , o = new s.a(function (r, o) {
              t = t || {},
                t.name = e,
                t.once = !0,
                t.handler = function (e) {
                  if (r(e),
                    n)
                    return n(e)
                }
                ,
                t.errorHandler = function (e) {
                  if (o(e),
                    i)
                    return i(e)
                }
            }
            )
            , a = r(t);
          return o.cancel = a.cancel,
            o
        }
        function a() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return {
            on: function (t, n) {
              return i(t, e, n)
            }
          }
        }
        n.d(t, "a", function () {
          return i
        }),
          t.b = r,
          t.c = o,
          t.d = a;
        var u = n(1)
          , s = n(2)
          , c = n(4)
          , l = n(5)
          , d = n(0)
          , f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
          }
            : function (e) {
              return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
      }
    ])
  })
} catch (e) { }
var _uiq_base_cf_url = "https://secure2.useriq.com";
if ("object" != typeof _uiq_JSON && "object" == typeof window.JSON && window.JSON.stringify && window.JSON.parse)
  var _uiq_JSON = window.JSON;
else
  _uiq_JSON = {},
    _uiq_JSON.stringify = function (e) {
      return e
    }
    ,
    _uiq_JSON.parse = function (e) {
      return e
    }
    ;
if (Array.isArray || (Array.isArray = function (e) {
  return "[object Array]" === Object.prototype.toString.call(e)
}
),
  "function" != typeof Object.assign && !function () {
    Object.assign = function (e) {
      "use strict";
      if (void 0 === e || null === e)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var t = Object(e), n = 1; n < arguments.length; n++) {
        var r = arguments[n];
        if (void 0 !== r && null !== r)
          for (var i in r)
            r.hasOwnProperty(i) && (t[i] = r[i])
      }
      return t
    }
  }(),
  "object" != typeof _uiq && (_uiq = []),
  Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector),
  Element.prototype.closest || (Element.prototype.closest = function (e) {
    var t = this;
    if (!document.documentElement.contains(t))
      return null;
    do {
      if (t.matches(e))
        return t;
      t = t.parentElement || t.parentNode
    } while (null !== t && 1 === t.nodeType); return null
  }
  ),
  "object" != typeof window.Useriq) {
  window.Useriq = function () {
    "use strict";
    function e(e) {
      try {
        return ee(e)
      } catch (t) {
        return unescape(e)
      }
    }
    function t(e) {
      var t = typeof e;
      return "undefined" !== t
    }
    function n(e) {
      return "function" == typeof e
    }
    function r(e) {
      return "object" == typeof e || "[object Object]" == e.toString()
    }
    function i(e) {
      return "string" == typeof e || e instanceof String
    }
    function o(e) {
      if (!e)
        return !0;
      var t, n = !0;
      for (t in e)
        Object.prototype.hasOwnProperty.call(e, t) && (n = !1);
      return n
    }
    function a() {
      "object" == typeof window.JSON && window.JSON.stringify && window.JSON.parse ? (window._uiq_JSON = window.JSON,
        _uiq_JSON.parse = window.JSON.parse,
        _uiq_JSON.stringify = window.JSON.stringify,
        window._uiq_check_json = !0) : window._uiq_check_json = !1
    }
    function u(e) {
      try {
        void 0 !== console && console && console.error && console.error(e)
      } catch (t) { }
    }
    function s() {
      var e, t, n;
      for (e = 0; e < arguments.length; e += 1)
        if (n = arguments[e],
          t = n.shift(),
          i(t)) {
          if (!z[t]) {
            var r = "The method '" + t + '\' was not found in "_uiq" variable.';
            throw u(r),
            new TypeError(r)
          }
          if (z[t].apply(z, n),
            "addTracker" === t)
            break;
          if ("setTrackerUrl" === t || "setSiteId" === t)
            break
        } else
          t.apply(z, n)
    }
    function c(e, t, n, r) {
      return e.addEventListener ? (e.addEventListener(t, n, r),
        !0) : e.attachEvent ? e.attachEvent("on" + t, n) : void (e["on" + t] = n)
    }
    function l(e, t) {
      var r, i, o, a = "";
      for (r in V)
        Object.prototype.hasOwnProperty.call(V, r) && (i = V[r][e],
          n(i) && (o = i(t),
            o && (a += o)));
      return a
    }
    function d() {
      if (l("unload"),
        window.Useriq.useriqTracker.sendBulk(),
        W)
        for (; Date.now() < W;)
          ;
    }
    function f(e, t, n) {
      var r = X.createElement("script");
      r.type = "text/javascript",
        r.id = t,
        r.src = e,
        r.readyState ? r.onreadystatechange = function () {
          var e = this.readyState;
          "loaded" !== e && "complete" !== e || (r.onreadystatechange = null,
            n())
        }
          : r.onload = n,
        X.getElementsByTagName("head")[0].appendChild(r)
    }
    function p() {
      var e = "";
      try {
        e = K.top.document.referrer
      } catch (t) {
        if (K.parent)
          try {
            e = K.parent.document.referrer
          } catch (n) {
            e = ""
          }
      }
      return ("" === e || x()) && (e = X.referrer),
        e
    }
    function h(e) {
      var t = new RegExp("^([a-z]+):")
        , n = t.exec(e);
      return n ? n[1] : null
    }
    function m(e) {
      var t = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)")
        , n = t.exec(e);
      return n ? n[1] : e
    }
    function v(e, t) {
      var n = "[\\?&#]" + t + "=([^&#]*)"
        , r = new RegExp(n)
        , i = r.exec(e);
      return i ? ee(i[1]) : ""
    }
    function g(e) {
      return unescape(te(e))
    }
    function w(e) {
      var t, n, r, i, o, a, u, s, c, l, d = function (e, t) {
        return e << t | e >>> 32 - t
      }, f = function (e) {
        var t, n, r = "";
        for (t = 7; t >= 0; t--)
          n = e >>> 4 * t & 15,
            r += n.toString(16);
        return r
      }, p = [], h = 1732584193, m = 4023233417, v = 2562383102, w = 271733878, _ = 3285377520, y = [];
      for (e = g(e),
        l = e.length,
        n = 0; n < l - 3; n += 4)
        r = e.charCodeAt(n) << 24 | e.charCodeAt(n + 1) << 16 | e.charCodeAt(n + 2) << 8 | e.charCodeAt(n + 3),
          y.push(r);
      switch (3 & l) {
        case 0:
          n = 2147483648;
          break;
        case 1:
          n = e.charCodeAt(l - 1) << 24 | 8388608;
          break;
        case 2:
          n = e.charCodeAt(l - 2) << 24 | e.charCodeAt(l - 1) << 16 | 32768;
          break;
        case 3:
          n = e.charCodeAt(l - 3) << 24 | e.charCodeAt(l - 2) << 16 | e.charCodeAt(l - 1) << 8 | 128
      }
      for (y.push(n); 14 !== (15 & y.length);)
        y.push(0);
      for (y.push(l >>> 29),
        y.push(l << 3 & 4294967295),
        t = 0; t < y.length; t += 16) {
        for (n = 0; n < 16; n++)
          p[n] = y[t + n];
        for (n = 16; n <= 79; n++)
          p[n] = d(p[n - 3] ^ p[n - 8] ^ p[n - 14] ^ p[n - 16], 1);
        for (i = h,
          o = m,
          a = v,
          u = w,
          s = _,
          n = 0; n <= 19; n++)
          c = d(i, 5) + (o & a | ~o & u) + s + p[n] + 1518500249 & 4294967295,
            s = u,
            u = a,
            a = d(o, 30),
            o = i,
            i = c;
        for (n = 20; n <= 39; n++)
          c = d(i, 5) + (o ^ a ^ u) + s + p[n] + 1859775393 & 4294967295,
            s = u,
            u = a,
            a = d(o, 30),
            o = i,
            i = c;
        for (n = 40; n <= 59; n++)
          c = d(i, 5) + (o & a | o & u | a & u) + s + p[n] + 2400959708 & 4294967295,
            s = u,
            u = a,
            a = d(o, 30),
            o = i,
            i = c;
        for (n = 60; n <= 79; n++)
          c = d(i, 5) + (o ^ a ^ u) + s + p[n] + 3395469782 & 4294967295,
            s = u,
            u = a,
            a = d(o, 30),
            o = i,
            i = c;
        h = h + i & 4294967295,
          m = m + o & 4294967295,
          v = v + a & 4294967295,
          w = w + u & 4294967295,
          _ = _ + s & 4294967295
      }
      return c = f(h) + f(m) + f(v) + f(w) + f(_),
        c.toLowerCase()
    }
    function _(e, t, n) {
      return e || (e = ""),
        t || (t = ""),
        "translate.googleusercontent.com" === e ? ("" === n && (n = t),
          t = v(t, "u"),
          e = m(t)) : "cc.bingj.com" !== e && "webcache.googleusercontent.com" !== e && "74.6." !== e.slice(0, 5) || (t = X.links[0].href,
            e = m(t)),
        [e, t, n]
    }
    function y(e) {
      var t = e.length;
      return "." === e.charAt(--t) && (e = e.slice(0, t)),
        "*." === e.slice(0, 2) && (e = e.slice(1)),
        e.indexOf("/") !== -1 && (e = e.substr(0, e.indexOf("/"))),
        e
    }
    function b(e) {
      if (e = e && e.text ? e.text : e,
        !i(e)) {
        var n = X.getElementsByTagName("title");
        n && t(n[0]) && (e = n[0].text)
      }
      return e
    }
    function q(e, n) {
      if (e && e.indexOf)
        return e.indexOf(n);
      if (!t(e) || null === e)
        return -1;
      if (!e.length)
        return -1;
      var r = e.length;
      if (0 === r)
        return -1;
      for (var i = 0; i < r;) {
        if (e[i] === n)
          return i;
        i++
      }
      return -1
    }
    function E(e, t) {
      var n = e.data
        , r = e.target
        , i = r.getVideoUrl()
        , o = i.match(/[?&]v=([^&#]*)/)[1]
        , a = (r.getPlayerState(),
          Math.floor(r.getDuration()),
          {
            Play: !0,
            Pause: !1,
            "Watch to End": !0
          })
        , u = {
          1: "Play",
          2: "Pause"
        }
        , s = u[n];
      if (t.playTracker = t.playTracker || {},
        1 === n && (t.playTracker[o] = !0,
          t.videoId = o,
          t.pauseFlag = !1),
        !t.playTracker[t.videoId])
        return !1;
      if (2 === n) {
        if (t.pauseFlag)
          return !1;
        t.pauseFlag = !0
      }
      a[s] && _uiq_trackVideoEvent(i, s)
    }
    function S(e) {
      var t = YT.get(e.id);
      t || (t = new YT.Player(e, {})),
        "undefined" == typeof e.pauseFlag && (e.pauseFlag = !1,
          t.addEventListener("onStateChange", function (t) {
            E(t, e)
          }))
    }
    function T(e) {
      var t = new Vimeo.Player(e)
        , n = t.getVideoUrl();
      t.ready().then(function () {
        t.on("play", function (e) {
          _uiq_trackVideoEvent(n, "play", 100 * e.percent)
        }),
          t.on("pause", function (e) {
            _uiq_trackVideoEvent(n, "pause", 100 * e.percent)
          }),
          t.on("ended", function (e) {
            _uiq_trackVideoEvent(n, "finish", 100 * e.percent)
          })
      })
    }
    function O() {
      var e = _uiq_app.Sizzle(".uiq-video-tracking");
      e.forEach(T)
    }
    function C() {
      var e = _uiq_app.Sizzle(".uiq-video-tracking")[0]
        , t = e.src.substr(e.src.lastIndexOf("/") + 1);
      window._wq = window._wq || [],
        window._wq.push({
          id: t,
          onReady: A
        })
    }
    function A(e) {
      var t = e.hashedId()
        , n = e.duration()
        , r = 0;
      e.bind("play", function () {
        _uiq_trackVideoEvent(t, "play", r)
      }),
        e.bind("pause", function () {
          _uiq_trackVideoEvent(t, "pause", r)
        }),
        e.bind("end", function () {
          _uiq_trackVideoEvent(t, "finish", 100)
        }),
        e.bind("secondchange", function (e) {
          r = Math.round(e / n * 100)
        })
    }
    function k(e) {
      if ("yt" === e) {
        if ("undefined" == typeof YT) {
          var t = document.getElementsByTagName("head")[0]
            , n = document.createElement("script");
          n.type = "text/javascript",
            n.src = "//www.youtube.com/iframe_api",
            t.appendChild(n)
        }
        window.onYouTubeIframeAPIReady = function () {
          var e = _uiq_app.Sizzle(".uiq-video-tracking");
          e.forEach(S)
        }
      } else
        "vim" === e ? "undefined" == typeof Vimeo ? f("https://player.vimeo.com/api/player.js", "uiq_vim", O) : O() : "wis" === e && ("undefined" == typeof Wistia ? f("https://fast.wistia.net/assets/external/E-v1.js", "uiq_wistia", C) : C())
    }
    function P() {
      window === window.top ? (useriqPostRobot.on("uiq-register", function (e) {
        if (e.source) {
          var t = window.top;
          t.Useriq && t.Useriq.frames.push(e.source);
          var n = window.Useriq.useriqTracker.getActiveCampaign();
          n && window.useriqPostRobot.send(e.source, "active-campaign", {
            activeCampaign: n
          }),
            window.uiqAdminApp && window.uiqAdminApp.$emit("frameLoaded")
        }
        return {
          id: !0
        }
      }),
        useriqPostRobot.on("check-step-element", function (e) {
          var t = new CustomEvent("check-step-element", {
            detail: {
              step_id: e.data.step_id,
              action_type: e.data.action_type
            }
          });
          document.dispatchEvent(t)
        }),
        useriqPostRobot.on("tours-on-frame", function (e) {
          if (e.data.srcUrl !== window.location.href) {
            var t = [];
            e.data.tours.forEach(function (e) {
              e.framed = !0,
                t.push(e)
            }),
              window.uiqAdminApp.$emit("tours-from-frame", t)
          }
        }),
        useriqPostRobot.on("tooltips-on-frame", function (e) {
          if (e.data.srcUrl !== window.location.href) {
            var t = [];
            e.data.tooltips.forEach(function (e) {
              e.framed = !0,
                t.push(e)
            }),
              window.uiqAdminApp.$emit("tooltips-from-frame", t)
          }
        }),
        useriqPostRobot.on("features-on-frame", function (e) {
          console.log('FEATURES ON FRAME')
          if (e.data.srcUrl !== window.location.href) {
            var t = [];
            e.data.features.forEach(function (e) {
              e.framed = !0,
                t.push(e)
            }),
              window.uiqAdminApp.$emit("features-from-frame", t)
          }
        }),
        useriqPostRobot.on("campaigns-on-frame", function (e) {
          if (e.data.srcUrl !== window.location.href) {
            var t = [];
            e.data.campaigns.forEach(function (e) {
              e.framed = !0,
                t.push(e)
            }),
              window.uiqAdminApp.$emit("campaigns-from-frame", t)
          }
        }),
        useriqPostRobot.on("update-active-record", function (e) {
          e.data.record && window.Useriq.useriqAdminTools.setActiveRecord(e.data.record)
        }),
        useriqPostRobot.on("hide-content", function () {
          Y.useriqAdminTools.hideContent()
        }),
        useriqPostRobot.on("request-active-record", function () {
          var e = Y.useriqAdminTools.getActiveRecord();
          Y.frames.length && Y.frames.forEach(function (t) {
            useriqPostRobot.send(t, "sending-active-record", e)
          })
        })) : (useriqPostRobot.on("fetch-features", function () {
          window.Useriq.useriqTracker.retrieveFeatures()
        }),
          useriqPostRobot.on("fetch-tooltips", function () {
            window.Useriq.useriqTracker.retrieveTooltips()
          }),
          useriqPostRobot.on("fetch-tours", function () {
            window.Useriq.useriqTracker.retrieveTours()
          }),
          useriqPostRobot.on("fetch-campaigns", function () {
            window.Useriq.useriqTracker.retrieveCampaigns()
          }),
          useriqPostRobot.on("start-record", function () {
            window.Useriq.useriqAdminTools.startRecording()
          }),
          useriqPostRobot.on("stop-record", function () {
            window.Useriq.useriqAdminTools.stopRecording()
          }),
          useriqPostRobot.on("enable-events", function () {
            window.Useriq.useriqAdminTools.enableEvents()
          }),
          useriqPostRobot.on("disable-events", function (e) {
            window.Useriq.useriqAdminTools.disableEvents(e.data.noBlock)
          }),
          useriqPostRobot.on("show-outline", function (e) {
            window.Useriq.useriqAdminTools.showOutline(e.data.element)
          }),
          useriqPostRobot.on("hide-outline", function () {
            window.Useriq.useriqAdminTools.hideOutline()
          }),
          useriqPostRobot.on("highlight-selector", function (e) {
            window.Useriq.useriqAdminTools.highlightSelector(e.data.object)
          }),
          useriqPostRobot.on("hide-content", function () {
            window.Useriq.useriqAdminTools.hideContent()
          }),
          useriqPostRobot.on("preview-step", function (e) {
            window.Useriq.useriqAdminTools.previewStep(e.data.step)
          }),
          useriqPostRobot.on("hide-step-preview", function () {
            window.Useriq.useriqAdminTools.hideStepPreview()
          }),
          useriqPostRobot.on("preview-tour", function (e) {
            window.Useriq.useriqAdminTools.hideStepPreview(e.data.tour)
          }),
          useriqPostRobot.on("preview-tooltip", function (e) {
            window.Useriq.useriqAdminTools.previewTooltip(e.data.tooltip)
          }),
          useriqPostRobot.on("hide-tooltip-preview", function () {
            window.Useriq.useriqAdminTools.hideTooltipPreview()
          }),
          useriqPostRobot.on("preview-campaign", function (e) {
            window.Useriq.useriqAdminTools.previewCampaign(e.data.campaign)
          }),
          useriqPostRobot.on("hide-campaign-preview", function () {
            window.Useriq.useriqAdminTools.hideCampaignPreview()
          }),
          useriqPostRobot.on("check-element-exists", function (e) {
            return window.Useriq.useriqAdminTools.checkElementExists(e.data.record)
          }),
          useriqPostRobot.on("sending-active-record", function (e) {
            window.Useriq.useriqAdminTools.setActiveRecord(e.data)
          }),
          useriqPostRobot.on("active-campaign", function (e) {
            if (e.data) {
              var t = e.data
                , n = t.activeCampaign;
              Y.useriqTracker.setActiveCampaign(n),
                "Guided Tour" === n.type && (n.type = "Tour",
                  _uiq_activateCampaign(n.id, n.type))
            }
          }),
          useriqPostRobot.on("check-step-element", function (e) {
            var t = new CustomEvent("check-step-element", {
              detail: {
                step_id: e.data.step_id,
                action_type: e.data.action_type
              }
            });
            document.dispatchEvent(t)
          }),
          useriqPostRobot.on("add-theme", function (e) {
            window.Useriq.useriqAdminTools.addTheme(e.data.record)
          }),
          useriqPostRobot.on("remove-theme", function (e) {
            window.Useriq.useriqAdminTools.removeTheme(e.data.record)
          }))
    }
    function N(e) {
      var t = e.target || e.srcElement;
      "IFRAME" === t.nodeName && /uiq-video-tracking/.test(t.classList) && (t.src.indexOf("youtube.com/embed/") > -1 ? k("yt") : t.src.indexOf("player.vimeo.com/video") > -1 ? k("vim") : t.src.indexOf("fast.wistia.net/embed") > -1 && k("wis"))
    }
    function x() {
      var e;
      try {
        e = window.frameElement
      } catch (t) {
        return !0
      }
      try {
        var n = window.self == window.top || window.self == window.top.self;
        return !n
      } catch (r) {
        return !0
      }
    }
    function R() {
      function e(e) {
        var t, n, r;
        null == e && (e = {}),
          n = [];
        for (t in e)
          r = e[t],
            _.hasOwnProperty(t) ? n.push(w[t] = r) : n.push(void 0);
        return n
      }
      function t(e) {
        return !(1 !== (null != e ? e.nodeType : void 0))
      }
      function n(e) {
        var n, r;
        if (r = [],
          t(e))
          for (n = e; t(n);)
            r.push(n),
              n = n.parentNode;
        return r
      }
      function r(e) {
        return e.tagName.toLowerCase()
      }
      function i(e) {
        var t = y.classes
          , n = !1
          , r = !1;
        try {
          r = Y.useriqTracker.getSiteSettings()
        } catch (i) {
          r = !1
        }
        r && (n = !!r.excluded_css_classes && r.excluded_css_classes);
        var o = e.getAttribute("class");
        if (!o)
          return !1;
        o = o.split("useriq-target")[0],
          o = o.split("tether-target")[0];
        for (var a, u = 0; u < t.length; u++)
          a = new RegExp(t[u], "g"),
            o = o.replace(a, "");
        if (n) {
          n = n.split(",");
          for (var s = 0; s < n.length; s++)
            a = new RegExp(n[s], "g"),
              o = o.replace(a, "")
        }
        return o = o.replace(/{.*}/, " "),
          o = o.replace(/\s+/g, " "),
          o = o.replace(/^\s|\s$/g, "")
      }
      function o(e) {
        if (!e)
          return "";
        var t;
        return t = e.split("").map(function (e) {
          return ":" === e ? "\\;" : /[ !"#$%&'()*+,.\/;<=>?@\[\\\]^`{|}~]/.test(e) ? "\\" + e : escape(e).replace(/\%/g, "\\")
        }),
          t.join("")
      }
      function a(e) {
        var t, n;
        return t = e.getAttribute("id"),
          null == t || "" === t || /\s/.exec(t) || /^\d/.exec(t) || (n = "#" + o(t),
            1 !== document.querySelectorAll(n).length) ? null : n
      }
      function u(e) {
        var t = document.getElementsByTagName("html")
          , n = document.getElementsByTagName("body");
        if (e == t[0])
          ;
        else if (e != n[0]) {
          var r, a, u;
          return u = [],
            r = e.getAttribute("class"),
            null != r && (r = i(e),
              r && "" !== r && (u = function () {
                var e, t, n, i;
                for (n = r.split(/\s+/),
                  i = [],
                  e = 0,
                  t = n.length; e < t; e++)
                  a = n[e],
                    a && i.push("." + o(a));
                return i
              }
                .call(this))),
            u
        }
      }
      function s(e) {
        var t, n, r, i, o, a, u;
        for (u = [],
          n = ["id", "class"],
          o = e.attributes,
          r = 0,
          i = o.length; r < i; r++)
          t = o[r],
            a = t.nodeName,
            b.call(n, a) < 0 && u.push("[" + t.nodeName + "=" + t.nodeValue + "]");
        return u
      }
      function c(e) {
        var n, r, i, o, a, u;
        if (o = e.parentNode,
          null != o)
          for (n = 0,
            u = o.childNodes,
            r = 0,
            i = u.length; r < i; r++)
            if (a = u[r],
              t(a) && (n++ ,
                a === e))
              return ":nth-child(" + n + ")";
        return null
      }
      function l(e) {
        var t, n, r, i, o;
        if (t = e.tagName.toLowerCase(),
          n = e.innerText || "",
          n.length > 32 && (n = n.substring(0, 31)),
          null != n && "" !== n) {
          if (r = t + ':contains("' + n + '")',
            r = r.toString(),
            _uiq_app.Sizzle(r) && 1 === _uiq_app.Sizzle(r).length)
            return r;
          if (i = e.parentNode,
            i && (o = i.tagName.toLowerCase(),
              r = o + " > " + r,
              _uiq_app.Sizzle(r) && 1 === _uiq_app.Sizzle(r).length))
            return r
        }
        return null
      }
      function d(e, t) {
        var n, r;
        return n = !1,
          null != t && "" !== t && (r = _uiq_app.Sizzle(t),
            1 === r.length && r[0] === e && (n = !0)),
          n
      }
      function f(e) {
        var t;
        return t = {
          t: null,
          i: null,
          c: null,
          a: null,
          n: null,
          f: null,
          u: null
        },
          b.call(w.selectors, "tag") >= 0 && (t.t = r(e)),
          b.call(w.selectors, "id") >= 0 && (t.i = a(e)),
          b.call(w.selectors, "class") >= 0 && (t.c = u(e)),
          b.call(w.selectors, "attribute") >= 0 && (t.a = s(e)),
          b.call(w.selectors, "nthchild") >= 0 && (t.n = c(e)),
          b.call(w.selectors, "contains") >= 0 && (t.u = l(e)),
          t
      }
      function p(e, t) {
        var n, r;
        return r = e.parentNode,
          n = r.querySelectorAll(t),
          1 === n.length && n[0] === e
      }
      function h(e, t, n) {
        var r, i, o, a, u, s, c;
        for (s = g(t),
          i = 0,
          a = s.length; i < a; i++)
          if (r = s[i],
            p(e, r))
            return r;
        if (null != n)
          for (c = t.map(function (e) {
            return n + e
          }),
            o = 0,
            u = c.length; o < u; o++)
            if (r = c[o],
              p(e, r))
              return r;
        return null
      }
      function m(e) {
        var t, n, r, i, o, a;
        for (a = f(e),
          i = w.selectors,
          n = 0,
          r = i.length; n < r; n++)
          switch (o = i[n]) {
            case "id":
              if (null != a.i)
                return a.i;
              break;
            case "tag":
              if (null != a.t && p(e, a.t))
                return a.t;
              break;
            case "class":
              if (null != a.c && 0 !== a.c.length && (t = h(e, a.c, a.t)))
                return t;
              break;
            case "attribute":
              if (null != a.a && 0 !== a.a.length && (t = h(e, a.a, a.t)))
                return t;
              break;
            case "nthchild":
              if (null != a.n)
                return a.n;
              break;
            case "contains":
              if (null != a.u)
                return a.u
          }
        return "*"
      }
      function v(e) {
        var t, r, i, o, a, u, s, c, l, f;
        t = [],
          s = n(e);
        try {
          for (i = 0,
            a = s.length; i < a; i++)
            r = s[i],
              l = m(r),
              null != l && t.push(l);
          for (f = [],
            o = 0,
            u = t.length; o < u; o++)
            if (r = t[o],
              f.unshift(r),
              c = f.join(" > "),
              d(e, c))
              return c
        } catch (p) { }
        return null
      }
      function g(e) {
        var t, n, r, i, o, a, u;
        for (null == e && (e = []),
          u = [[]],
          t = r = 0,
          o = e.length - 1; 0 <= o ? r <= o : r >= o; t = 0 <= o ? ++r : --r)
          for (n = i = 0,
            a = u.length - 1; 0 <= a ? i <= a : i >= a; n = 0 <= a ? ++i : --i)
            u.push(u[n].concat(e[t]));
        return u.shift(),
          u = u.sort(function (e, t) {
            return e.length - t.length
          }),
          u = u.map(function (e) {
            return e.join("")
          })
      }
      var w = {}
        , _ = {
          selectors: ["id", "class", "tag", "nthchild"]
        }
        , y = {
          classes: ["uiq_outline_temp", "uiq_event_outline", "uiq_outline", "uiq_active_css", "uiq_hover", "hover", "hovering", "toolBarLinkBorder"]
        }
        , b = [].indexOf || function (e) {
          for (var t = 0, n = this.length; t < n; t++)
            if (t in this && this[t] === e)
              return t;
          return -1
        }
        ;
      return e(_),
        {
          setOptions: function (t) {
            e(t)
          },
          getSelector: function (e) {
            return v(e)
          },
          getContainsSelector: function (e) {
            return l(e)
          },
          sanitizeClasses: function (e) {
            return i(e)
          }
        }
    }
    function I() {
      function e(e) {
        var t = 128
          , n = e ? e.nodeName : ""
          , r = !1
          , i = !1;
        try {
          i = Y.useriqTracker.getSiteSettings()
        } catch (o) {
          i = !1
        }
        if (i && (r = !!i.dynamic_ids && i.dynamic_ids),
          e) {
          if (e.id && !r && (n += " id: " + e.id),
            e.name && (n += " name: " + e.name),
            e.className) {
            var a = Y.useriqSelectorEngine.sanitizeClasses(e);
            try {
              a = a.trim()
            } catch (o) {
              a = ""
            }
            "" != a && 0 != a && (n += " className: " + a)
          }
          if (e.textContent) {
            var u = e.textContent.replace(/[\r\n\t]/g, " ");
            u = u.length > t ? u.substring(0, t - 3) + "..." : u,
              u = u.trim(),
              "" != u && (n += " textContent: " + u)
          }
          var s = Y.useriqTracker.getDataAttrTracking()
            , c = Y.useriqTracker.getDataAttrTrackingName();
          if (s && e.dataset)
            for (var l in e.dataset)
              if (e.dataset.hasOwnProperty(l)) {
                var d = c.indexOf("-") > -1 ? c.replace(/-([a-z])/g, function (e) {
                  return e[1].toUpperCase()
                }) : c;
                if (l === d) {
                  var f = l
                    , p = e.dataset[l];
                  try {
                    p = p.trim()
                  } catch (o) {
                    p = ""
                  }
                  "" != p && "{}" != p && (n += " dataset: {" + f + ': "' + p + '"}')
                }
              }
        }
        return n
      }
      function t(t) {
        var n, r = [""];
        if (n = t.querySelectorAll("*"),
          !(0 != n.length && n.length < 16))
          return r;
        for (var i = 0; i < n.length; i++)
          r.push(e(n[i]));
        return r
      }
      function n() {
        d = null,
          document.body.addEventListener("mousemove", i, !1)
      }
      function r() {
        d = null,
          document.body.removeEventListener("mousemove", i, !1),
          document.querySelectorAll(".uiq_outline_temp").forEach(function (e) {
            e.classList.remove("uiq_outline_temp")
          })
      }
      function i(e) {
        var t = document.getElementById("uiq_admin_block");
        t && (t.style.display = "none");
        var n = document.elementFromPoint(e.clientX, e.clientY);
        null === n.getAttribute("data-useriq") && (d && d.classList.remove("uiq_outline_temp"),
          d = n,
          n.classList.add("uiq_outline_temp")),
          "IFRAME" !== n.nodeName && "OBJECT" !== n.nodeName && "EMBED" !== n.nodeName && t && (t.style.display = "block")
      }
      function o(e) {
        var t = document.getElementById("uiq_admin_block");
        if (t && (t.style.display = "none"),
          void 0 === e.target.dataset.useriq) {
          e.preventDefault(),
            e.stopPropagation();
          var n = document.elementFromPoint(e.clientX, e.clientY);
          c.highlightTarget(n);
          var r = !!window._uiq_admin && window._uiq_admin.admin_enabled_double_click;
          r && c.replayClickIfDoubleClick(n)
        }
        t && (t.style.display = "block")
      }
      function a(e, t, n) {
        n = n || !0,
          n && (e = u(e),
            t = u(t));
        var r = s(e);
        return r.test(t)
      }
      function u(e) {
        return e.replace(/^(http|https)?:\/\//, "")
      }
      function s(e) {
        var t = e.replace(/[^A-Za-z0-9]/g, function (e, t, n, r, i, o) {
          return "\\" + e
        })
          , n = t.replace("\\*", ".*?");
        return new RegExp("^" + n + "$")
      }
      var c = this
        , l = null
        , d = null
        , f = null
        , p = "http://dev.useriq.com:3000"
        , h = "https://feed.useriq.com/images/micro-feedback";
      this.setActiveRecord = function (e) {
        l = !e && l ? l : e
      }
        ,
        this.getActiveRecord = function () {
          return l
        }
        ,
        this.resetActiveRecord = function () {
          l = null
        }
        ,
        this.getPageUrl = function () {
          var e = window.location.href;
          return "#" !== e.slice(-1) && "?" !== e.slice(-1) || (e = e.slice(0, -1)),
            e
        }
        ,
        this.createFromHtml = function (e) {
          var t = document.createElement("div");
          return t.innerHTML = e,
            t.children[0]
        }
        ,
        this.createWildcards = function (e) {
          function t(e, t) {
            return t ? t : ""
          }
          function n(e, t, n) {
            return n
          }
          var r = /(https?\:\/\/)*(.+)/
            , i = e.replace(r, t)
            , o = e.replace(r, n)
            , a = o.split("/")
            , u = [];
          return a.forEach(function (e, t) {
            var n = a.slice(0);
            if (n[t] = "*",
              i) {
              var r = i + n.join("/");
              u.push(r)
            } else
              u.push(n.join("/"))
          }),
            u
        }
        ,
        this.hideContent = function () {
          var e = document.querySelectorAll(".useriq-step");
          e && Array.prototype.forEach.call(e, function (e) {
            e.parentNode.removeChild(e)
          });
          var t = document.querySelectorAll(".drop-element:not(.useriq-app-preview)");
          t && Array.prototype.forEach.call(t, function (e) {
            e.parentNode.removeChild(e)
          });
          var n = document.querySelectorAll(".useriq-tip:not(.useriq-app-preview)");
          n && Array.prototype.forEach.call(n, function (e) {
            e.parentNode.removeChild(e)
          });
          var r = document.querySelectorAll(".useriq-icon-tip:not(.useriq-app-preview)");
          r && Array.prototype.forEach.call(r, function (e) {
            e.parentNode.removeChild(e)
          });
          var i = document.querySelectorAll(".uiq-admin-list-tooltip");
          Array.prototype.forEach.call(i, function (e) {
            e.parentNode.removeChild(e)
          }),
            document.querySelectorAll(".uiq_outline").forEach(function (e) {
              e.classList.remove("uiq_outline")
            }),
            document.querySelectorAll(".uiq_event_outline").forEach(function (e) {
              e.classList.remove("uiq_outline")
            }),
            window.Useriq.wizard.uiq_hideWizard()
        }
        ,
        this.showOutline = function (e) {
          e && null === e.getAttribute("data-useriq") && e.classList.add("uiq_outline")
        }
        ,
        this.hideOutline = function () {
          document.querySelectorAll(".uiq_outline").forEach(function (e) {
            e.classList.remove("uiq_outline")
          })
        }
        ,
        this.enableEvents = function () {
          var e = document.getElementById("uiq_admin_block");
          e && e.parentElement.removeChild(e),
            document.body.removeEventListener("click", o, !0),
            r()
        }
        ,
        this.disableEvents = function (e) {
          if (!e) {
            var t = document.createElement("div");
            t.id = "uiq_admin_block",
              t.classList.add("uiq-admin-block"),
              document.body.appendChild(t)
          }
          document.body.addEventListener("click", o, !0),
            n()
        }
        ,
        this.replayClickIfDoubleClick = function (e) {
          if (e && e == f) {
            c.enableEvents();
            var t = f.tagName
              , n = "click";
            "SELECT" === t && (n = "mousedown",
              f.onchange = function () {
                var e = this[this.selectedIndex];
                c.highlightTarget(e)
              }
            );
            var r = document.createEvent("MouseEvent");
            r.initMouseEvent(n, !0, !0, window, null, 0, 0, 0, 0, !1, !1, !1, !1, 0, null),
              f.setAttribute("data-useriq", !0),
              f.dispatchEvent(r),
              window.Useriq.wizard.uiq_hideWizard(),
              f.removeAttribute("data-useriq"),
              f = null,
              c.disableEvents()
          } else
            f = e
        }
        ,
        this.highlightTarget = function (n) {
          c.hideContent(),
            window.useriqPostRobot.send(window.top, "hide-content");
          var r = window.Useriq.frames;
          r.length && r.forEach(function (e) {
            try {
              window.useriqPostRobot.send(e, "hide-content")
            } catch (t) { }
          });
          var i = window.Useriq.useriqAdminTools.getActiveRecord()
            , o = !1
            , a = !1;
          try {
            a = Y.useriqTracker.getSiteSettings()
          } catch (u) {
            a = !1
          }
          a && (o = !!a.dynamic_ids && a.dynamic_ids);
          var s = {
            selectors: ["id", "class", "tag", "nthchild"]
          };
          o && (s = {
            selectors: ["class", "tag", "nthchild"]
          }),
            Y.useriqSelectorEngine.setOptions(s);
          var l = Y.useriqSelectorEngine.getSelector(n);
          s = {
            selectors: ["class", "tag", "nthchild"]
          },
            Y.useriqSelectorEngine.setOptions(s);
          var d = Y.useriqSelectorEngine.getSelector(n)
            , f = Y.useriqSelectorEngine.getContainsSelector(n);
          try {
            switch (i.type) {
              case "step":
                i.event_binding_selector = l,
                  i.secondary_event_selector = d,
                  i.tertiary_event_selector = f,
                  i.step_anchor = l,
                  i.secondary_step_anchor = d,
                  i.tertiary_step_anchor = f,
                  Y.wizard.uiq_showStepWizard(i);
                break;
              case "tooltip":
                i.primary_selector = l,
                  i.secondary_selector = d,
                  i.tertiary_selector = f,
                  Y.wizard.uiq_showTooltipWizard(i);
                break;
              case "feature":
                i.primary_selector = l,
                  i.secondary_selector = d,
                  i.tertiary_selector = f,
                  i.scheme = e(n),
                  i.child_elements = t(n),
                  Y.wizard.uiq_showFeatureWizard(i),
                  Y.framed ? (i.framed = !0,
                    i.url = c.getPageUrl(),
                    useriqPostRobot.send(window.top, "update-active-record", {
                      record: i
                    })) : i.framed = !1
            }
          } catch (u) { }
          n && c.showOutline(n)
        }
        ,
        this.startRecording = function () {
          c.disableEvents(),
            window.useriqPostRobot.send(window.top, "request-active-record"),
            window.Useriq.wizard.uiq_createWizard()
        }
        ,
        this.stopRecording = function () {
          c.enableEvents(),
            c.hideOutline(),
            window.Useriq.wizard.uiq_hideWizard()
        }
        ,
        this.highlightSelector = function (e) {
          var t = c.buildSelector(e) || ""
            , n = window._uiq_app.Sizzle(t)[0]
            , r = c.getPageUrl()
            , i = e.url || e.step_url || e.tour_url;
          !n || i && i != r && !a(i, r) || c.showOutline(n)
        }
        ,
        this.buildSelector = function (e) {
          var t = "";
          try {
            var n = e.primary_selector || e.step_anchor || e.event_binding_selector;
            window._uiq_app.Sizzle(n)[0] && (t = n)
          } catch (r) {
            t = ""
          }
          try {
            var i = e.secondary_selector || e.secondary_step_anchor || e.secondary_event_selector;
            window._uiq_app.Sizzle(i)[0] && (t += "" !== t ? "," : "",
              t += i)
          } catch (r) {
            t += ""
          }
          try {
            var o = e.tertiary_selector || e.tertiary_step_anchor || e.tertiary_event_selector;
            window._uiq_app.Sizzle(o)[0] && (t += "" !== t ? "," : "",
              t += o)
          } catch (r) {
            t += ""
          }
          return t
        }
        ,
        this.previewStep = function (e) {
          var t = c.getPageUrl();
          if (!e.step_url || e.step_url == t || a(e.step_url, t)) {
            c.hideStepPreview();
            var n = new window.UserIQTour.Tour({
              defaults: {
                classes: "useriq-element useriq-open useriq-theme-arrows",
                showCancelLink: !0
              }
            })
              , r = {};
            if (e.step_anchor_edge !== !1)
              switch (e.step_anchor_edge) {
                case "sw":
                  r = {
                    attachment: "top right",
                    targetAttachment: "bottom center",
                    targetOffset: "0 30"
                  };
                  break;
                case "se":
                  r = {
                    attachment: "top left",
                    targetAttachment: "bottom center",
                    targetOffset: "0 -30"
                  };
                  break;
                case "nw":
                  r = {
                    attachment: "bottom right",
                    targetAttachment: "top center",
                    targetOffset: "0 30"
                  };
                  break;
                case "ne":
                  r = {
                    attachment: "bottom left",
                    targetAttachment: "top center",
                    targetOffset: "0 -30"
                  }
              }
            var i = null;
            try {
              i = c.buildSelector(e)
            } catch (o) { }
            var u = i ? i + " " + (e.step_anchor_edge || "") : i
              , s = [];
            "none" !== e.step_b1_type && s.push({
              text: e.step_b1_text,
              classes: "useriq-button-secondary",
              action: n.hide
            }),
              "none" !== e.step_b2_type && s.push({
                text: e.step_b2_text,
                classes: "useriq-button-example-primary",
                action: n.next
              });
            var l = {};
            l = {
              event: e.event_type,
              selector: e.event_binding_selector,
              secondary_selector: e.secondary_event_selector,
              tertiary_selector: e.tertiary_event_selector
            },
              n.addStep("Preview Step", {
                title: e.step_title,
                text: [e.step_content],
                attachTo: u,
                offset: e.step_offset,
                tetherOptions: r,
                classes: "useriq useriq-open useriq-theme-arrows useriq-transparent-text",
                buttons: s,
                advanceOn: l,
                step_resolution_position: e.step_resolution_position
              }),
              n.start()
          }
        }
        ,
        this.hideStepPreview = function () {
          document.querySelectorAll(".useriq-step:not(.useriq-app-preview)").forEach(function (e) {
            e.parentNode.removeChild(e)
          })
        }
        ,
        this.previewTour = function (e) {
          var t = c.getPageUrl();
          e.tour_url && e.tour_url != t && !a(e.tour_url, t) || (c.hideStepPreview(),
            e.multipage && e.tour_steps[0].step_url != t && e.tour_steps[0].step_url.indexOf("*") == -1 && (window.location.href = e.tour_steps[0].step_url + "_uiq_t=" + e.id),
            window._uiq_activateCampaign(e.id, "Tour"))
        }
        ,
        this.previewTooltip = function (e) {
          function t(r) {
            var i, o;
            try {
              o = r.parentNode
            } catch (a) {
              return n(),
                !0
            }
            try {
              if ("BODY" === r.nodeName)
                return n(),
                  !0;
              i = r.style
            } catch (a) {
              t(o)
            }
            if (null === i.zIndex || "" === i.zIndex)
              t(o);
            else
              try {
                return e.z_index = parseInt(i.zIndex, 10),
                  n(),
                  !0
              } catch (a) {
                t(o)
              }
          }
          function n() {
            var t = window._uiq_app.Sizzle("#uiqTip-" + e.uuid)[0];
            if ((!e.z_index || e.z_index < 100) && (e.z_index = 100),
              e.animation) {
              var n = t.querySelector(".useriq-pulse");
              n.style.zIndex = e.z_index - 1
            }
            t.style.zIndex = e.z_index,
              new window.Tether({
                element: t,
                target: s,
                attachment: e.tether_position || "middle left",
                offset: e.tether_offset || "0 0"
              }),
              r()
          }
          function r() {
            function t(t) {
              var n = "<div><div>" + t + '</div><div style="height:100px">  <div style="text-align: center;">    <img id="micro1-' + e.uuid + '" class="useriq-microIcon" value="1" src="' + h + '/smiley-mad-disabled.png" />    <img id="micro2-' + e.uuid + '" class="useriq-microIcon" value="2" src="' + h + '/smiley-neutral-disabled.png" />    <img id="micro3-' + e.uuid + '" class="useriq-microIcon" value="3" src="' + h + '/smiley-happy-disabled.png" />  </div>  <button id="microSubmit-' + e.uuid + '" class="useriq-microSubmit"> Submit </button></div></div>';
              return n
            }
            var n = window._uiq_app.Sizzle("#uiqTip-" + e.uuid)[0] || s
              , r = {};
            e.direct_element_tether && (r = {
              offset: e.tether_offset || "0 0"
            });
            var i = e.micro_feedback ? t(e.content) : e.content;
            new window.Drop({
              target: n,
              classPrefix: "drop",
              classes: "drop-theme-hubspot-popovers",
              position: e.bubble_position || "left middle",
              content: i || "Tooltip Content",
              constrainToWindow: !0,
              constrainToScrollParent: !1,
              openOn: "always",
              remove: !0,
              tetherOptions: r
            })
          }
          var i = c.getPageUrl();
          if ((!e.url || e.url == i || a(e.url, i)) && c.checkElementExists(e)) {
            var o = null;
            try {
              o = c.buildSelector(e)
            } catch (u) { }
            var s = window._uiq_app.Sizzle(o)[0];
            if (e.direct_element_tether)
              r();
            else {
              var l = c.createFromHtml("<div data-useriq class='useriq-icon-tip useriq-drop' id='uiqTip-" + e.uuid + "'></div>")
                , d = c.createFromHtml("<div data-useriq class='useriq-tip useriq-drop' id='uiqTip-" + e.uuid + '\'><div data-useriq class="useriq-pulse uiq_outline_tip"></div></div>');
              e.animation && "false" !== e.animation ? document.body.appendChild(d) : document.body.appendChild(l),
                t(s)
            }
          }
        }
        ,
        this.hideTooltipPreview = function () {
          document.querySelectorAll(".drop-element:not(.useriq-app-preview)").forEach(function (e) {
            e.parentNode.removeChild(e)
          }),
            document.querySelectorAll(".useriq-tip:not(.useriq-app-preview)").forEach(function (e) {
              e.parentNode.removeChild(e)
            }),
            document.querySelectorAll(".useriq-icon-tip:not(.useriq-app-preview)").forEach(function (e) {
              e.parentNode.removeChild(e)
            })
        }
        ,
        this.previewCampaign = function (e) {
          var t = c.getPageUrl();
          e.trigger_value && e.trigger_value != t && !a(e.trigger_value, t) || _uiq_previewCampaign(e)
        }
        ,
        this.hideCampaignPreview = function () {
          Y.useriqTracker.removeAssets()
        }
        ,
        this.checkElementExists = function (e) {
          var t = c.buildSelector(e)
            , n = window._uiq_app.Sizzle(t)[0];
          return "center" == e.step_location || n && null !== n.offsetParent
        }
        ,
        this.addTheme = function (e) {
          if (e) {
            var t = e.theme_id;
            if (t) {
              var n = document.getElementsByTagName("head")[0];
              Y.useriqTracker.ajax("GET", p + "/themes/" + t).then(function (e) {
                var r = window.JSON.parse(e)
                  , i = r.complete_css
                  , o = document.createElement("style");
                o.id = "uiq_admin_theme_" + t,
                  o.rel = "stylesheet",
                  o.type = "text/css",
                  o.innerHTML = i,
                  n.appendChild(o)
              })
            }
          }
        }
        ,
        this.removeTheme = function (e) {
          if (e) {
            var t = e.theme_id;
            if (t) {
              var n = document.getElementById("uiq_admin_theme_" + t);
              n && n.parentElement.removeChild(n)
            }
          }
        }
    }
    function L(s, d) {
      function f(e) {
        var t = X.getElementById("uiq-campaign-css-" + Qt);
        t && t.parentNode.removeChild(t);
        var n = X.getElementById("uiq-campaign-" + Qt);
        n && n.parentNode.removeChild(n);
        var r = X.querySelector("#_uiq_ft:not(.useriq-app-preview)")
          , i = X.querySelector("#_uiq_ft_subtle:not(.useriq-app-preview)");
        r && r.parentNode.removeChild(r),
          i && i.parentNode.removeChild(i);
        var o = X.getElementsByClassName("_uiq_modal-backdrop");
        if (o)
          for (var a = 0; a < o.length; a++)
            o[a].parentNode.removeChild(o[a]);
        var u = X.getElementById("useriq-backdrop-box");
        u && u.parentNode.removeChild(u),
          g(),
          e || E()
      }
      function g() {
        var e = X.querySelectorAll(".useriq-element:not(.useriq-app-preview)");
        e && Array.prototype.forEach.call(e, function (e) {
          e.parentNode.removeChild(e)
        })
      }
      function E() {
        var e = X.querySelectorAll(".drop-element:not(.useriq-app-preview)");
        e && Array.prototype.forEach.call(e, function (e) {
          try {
            e.parentNode.removeChild(e)
          } catch (t) { }
        });
        var t = X.querySelectorAll(".useriq-tip:not(.useriq-app-preview)");
        t && Array.prototype.forEach.call(t, function (e) {
          try {
            e.parentNode.removeChild(e)
          } catch (t) { }
        });
        var n = X.querySelectorAll(".useriq-icon-tip:not(.useriq-app-preview)");
        n && Array.prototype.forEach.call(n, function (e) {
          try {
            e.parentNode.removeChild(e)
          } catch (t) { }
        }),
          K.removeDrops && K.removeDrops()
      }
      function S() {
        function e(e) {
          e = /^\?/.test(e) ? e.substring(1) : e;
          const t = e.split("&");
          for (var n = {}, r = 0; r < t.length; r++) {
            var i = t[r].split("=");
            n[ee(i[0])] = ee(i[1])
          }
          return n
        }
        E();
        var t = Qt
          , n = "";
        if (window.location) {
          var i = window.location.href;
          "?" === i.slice(-1) && (i = i.slice(0, -1)),
            n = te(R(i))
        } else
          n = k();
        xn === !1 && ve();
        for (var o in xn)
          if (xn.hasOwnProperty(o) && "user_id" === xn[o][0])
            var a = xn[o][1];
        var u = "";
        if (r(xn)) {
          void 0 !== Array.prototype.toJSON && delete Array.prototype.toJSON;
          try {
            _uiq_JSON.parse(xn),
              u = xn
          } catch (s) {
            u = _uiq_JSON.stringify(xn)
          }
        } else
          u = xn;
        try {
          u = te(u)
        } catch (s) { }
        var c = En + "/campaigns/tips"
          , l = "url=" + n + "&site_id=" + t + "&uid=" + a + "&vid=" + _e().uuid + "&_cvars=" + u;
        bn || l.length > yn ? (l = JSON.stringify(e(l)),
          _uiq_XHR("POST", c, _uiq_checkTooltipsXhr, l)) : (c = c + "?" + l,
            _uiq_XHR("GET", c, _uiq_checkTooltipsXhr))
      }
      function T(e, t) {
        var n = {}
          , r = En + "/campaigns/check";
        "410033701" === Qt && (r = "http://dev.useriq.com:3000/check_campaigns/"),
          window.location && (n._ref = te(R(window.location)),
            "" !== window.location.hash && (n.hash = te(window.location.hash.substring(1)))),
          e && (n.campaign_type = e),
          t && (n.campaign_id = t),
          Fe("GET", r, n).then(function (e) {
            if (void 0 !== e) {
              var t = null
                , n = _uiq_JSON.parse(e);
              if (n.active_campaign) {
                n.user_id && (t = n.user_id);
                var r = qn + "/active_campaign.json?site_id=" + Qt + "&uid=" + t + "&vid=" + _e().uuid + "&campaign_type=" + n.campaign_type + "&campaign_id=" + n.campaign_id
                  , i = document.getElementById("uiq-campaign-" + Qt);
                i && i.parentNode.removeChild(i);
                var o = document
                  , a = o.createElement("script")
                  , u = o.getElementsByTagName("script")[0];
                a.type = "text/javascript",
                  a.defer = !0,
                  a.async = !0,
                  a.id = "uiq-campaign-" + Qt,
                  a.src = r,
                  u.parentNode.insertBefore(a, u)
              }
            }
          })
      }
      function O() {
        return It
      }
      function C() {
        var e = En + "/campaigns/admin?site_id=" + Qt;
        _uiq_XHR("GET", e, _uiq_checkAdminXhr)
      }
      function A(e) {
        function n(e) {
          e = /^\?/.test(e) ? e.substring(1) : e;
          const t = e.split("&");
          for (var n = {}, r = 0; r < t.length; r++) {
            var i = t[r].split("=");
            n[ee(i[0])] = ee(i[1])
          }
          return n
        }
        if (!O() && "409031001" != Qt) {
          var i = "true" == window.sessionStorage.getItem("_uiq_blockCF");
          if (!i) {
            xn === !1 && ve();
            var a = ["impersonated", "impersonation", "impersonater", "impersonate"]
              , u = "&uid="
              , s = "&_ref="
              , c = "&_imp=";
            for (var l in xn)
              if (xn.hasOwnProperty(l)) {
                var d = xn[l][0].toLowerCase();
                if ("user_id" === xn[l][0])
                  var f = xn[l][1];
                else if (q(a, d) > -1) {
                  var p = "" + xn[l][1];
                  if (p = p.toLowerCase(),
                    c += p,
                    "&_imp=true" === c)
                    return
                }
              }
            t(f) && (u += te(f));
            var h, m = "";
            if (r(xn)) {
              void 0 !== Array.prototype.toJSON && delete Array.prototype.toJSON;
              try {
                _uiq_JSON.parse(xn),
                  h = xn
              } catch (v) {
                h = _uiq_JSON.stringify(xn)
              }
            } else
              h = xn;
            try {
              h = te(h)
            } catch (v) { }
            if ("511057901" != Qt || !o(xn)) {
              if (window.location) {
                var g = window.location.href;
                "?" === g.slice(-1) && (g = g.slice(0, -1)),
                  s += te(R(g))
              }
              "" !== window.location.hash && (m = "&hash=" + te(window.location.hash.substring(1)));
              var w = "&iframed=";
              w += "508044701" == Qt || "508044601" == Qt || "511057901" == Qt || "509053801" == Qt || "604074201" == Qt || "611088701" == Qt || "611088501" == Qt || "611088601" == Qt ? "false" : x();
              try {
                _uiq_mediator.trigger("cancel")
              } catch (v) { }
              var _ = ge()
                , y = En + "/campaigns/check"
                , b = "site_id=" + Qt + "&visitor_id=" + _e().uuid + u + w + m + s + "&_cvars=" + h + c + "&client_uuid=" + _
                , E = En + "/campaigns/cancel";
              (!zn && "410033701" !== Qt || e || oe) && ue(function () {
                bn || b.length > yn ? (b = JSON.stringify(n(b)),
                  _uiq_XHR("POST", y, _uiq_checkFeaturesXhr, b, E)) : (y = y + "?" + b,
                    E = E + "?" + b,
                    _uiq_XHR("GET", y, _uiq_checkFeaturesXhr, !1, E)),
                  S(),
                  G(an)
              })
            }
          }
        }
      }
      function k() {
        var e = Ot || zt;
        return e = te(R(e))
      }
      function P(e, t, n, r, i, o) {
        if (ln)
          try {
            window.localStorage.setItem(e, te(t)),
              window.sessionStorage.setItem(e, te(t))
          } catch (a) {
            u(a)
          }
        else {
          if (ln || "delete" !== t) {
            if (!ln && "delete" !== t)
              try {
                window.localStorage.removeItem(e),
                  window.sessionStorage.removeItem(e)
              } catch (a) {
                u(a)
              }
          } else
            ; var s;
          n && (s = new Date,
            s.setTime(s.getTime() + n)),
            X.cookie = e + "=" + te(t) + (n ? ";expires=" + s.toGMTString() : "") + ";path=" + (r || "/") + (i ? ";domain=" + i : "") + (o ? ";secure" : "")
        }
      }
      function N(e) {
        var t = null
          , n = new RegExp("(^|;)[ ]*" + e + "=([^;]*)")
          , r = n.exec(X.cookie)
          , i = r ? ee(r[2]) : 0
          , o = !1
          , a = !1;
        try {
          o = window.sessionStorage.getItem(e),
            a = window.localStorage.getItem(e)
        } catch (u) { }
        var s = o ? o : 0
          , c = a ? a : 0;
        return t = ln ? i ? i : s ? s : c : s || c ? s ? s : c : i,
          t ? t : 0
      }
      function R(e) {
        var t;
        return kt ? (t = new RegExp("#.*"),
          e.replace(t, "")) : e
      }
      function I(e, t) {
        var n, r = h(t);
        return r ? t : "/" === t.slice(0, 1) ? h(e) + "://" + m(e) + t : (e = R(e),
          n = e.indexOf("?"),
          n >= 0 && (e = e.slice(0, n)),
          n = e.lastIndexOf("/"),
          n !== e.length - 1 && (e = e.slice(0, n + 1)),
          e + t)
      }
      function L(e, t) {
        var n;
        if (e = String(e).toLowerCase(),
          t = String(t).toLowerCase(),
          e === t)
          return !0;
        if ("." === t.slice(0, 1)) {
          if (e === t.slice(1))
            return !0;
          if (n = e.length - t.length,
            n > 0 && e.slice(n) === t)
            return !0
        }
        return !1
      }
      function D(e) {
        var t = document.createElement("a");
        return 0 !== e.indexOf("//") && 0 !== e.indexOf("http") && (0 === e.indexOf("*") && (e = e.substr(1)),
          0 === e.indexOf(".") && (e = e.substr(1)),
          e = "http://" + e),
          t.pathname ? t.pathname : ""
      }
      function j(e) {
        var t, n, r;
        for (t = 0; t < on.length; t++) {
          if (n = y(on[t].toLowerCase()),
            e === n)
            return !0;
          if ("." === n.slice(0, 1)) {
            if (e === n.slice(1))
              return !0;
            if (r = e.length - n.length,
              r > 0 && e.slice(r) === n)
              return !0
          }
        }
        return !1
      }
      function M(e, t, n) {
        var r = new Image(1, 1);
        r.onload = function () {
          F = 0,
            "function" == typeof t && t()
        }
          ,
          n ? (e = e.replace("send_image=0", "send_image=1"),
            r.src = qn + n + (qn.indexOf("?") < 0 ? "?" : "&") + e) : (e = e.replace("send_image=0", "send_image=1"),
              r.src = Xt + (Xt.indexOf("?") < 0 ? "?" : "&") + e)
      }
      function U(e, n, r, i, o, a) {
        t(r) && null !== r || (r = !0);
        try {
          var u = new K.XMLHttpRequest;
          i ? u.open("POST", (o || qn) + i, !0) : u.open("POST", a || Xt, !0),
            "611088601" != Qt && "611088501" != Qt && "611088701" != Qt && "604074201" != Qt || (u.timeout = 2e3),
            u.onreadystatechange = function () {
              4 !== u.readyState || u.status >= 200 && u.status < 300 || !r ? 4 === u.readyState && "function" == typeof n && n() : M(e, n, i)
            }
            ,
            u.setRequestHeader("Content-Type", Vt),
            u.send(e)
        } catch (s) {
          r && M(e, n, i)
        }
      }
      function G(e) {
        var t = Date.now() + e;
        (!B || t > B) && (B = t)
      }
      function H(e) {
        var t = Date.now() + e;
        (!W || t > W) && (W = t)
      }
      function J(e) {
        !Mt && Ct && (Mt = setTimeout(function () {
          if (Mt = null,
            zn || (zn = !X.hasFocus || X.hasFocus()),
            !zn)
            return void J(Ct);
          if (!At()) {
            var e = Ct - (Date.now() - Gn);
            e = Math.min(Ct, e),
              J(e)
          }
        }, e || Ct))
      }
      function ne() {
        Mt && (clearTimeout(Mt),
          Mt = null)
      }
      function re() {
        zn = !0,
          At() || J()
      }
      function ie() {
        ne()
      }
      function ae() {
        !Bn && Ct && (Bn = !0,
          c(K, "focus", re),
          c(K, "blur", ie),
          J())
      }
      function ue(e) {
        var t = Date.now();
        if (Un && t < Un) {
          var n = Un - t;
          return setTimeout(e, n),
            G(n + 50),
            void (Un += 50)
        }
        if (Un === !1) {
          var r = 800;
          Un = t + r
        }
        e()
      }
      function se(e) {
        var t = Date.now();
        if (Gn = t,
          Mn && t < Mn) {
          var n = Mn - t;
          return setTimeout(e, n),
            H(n + 50),
            void (Mn += 50)
        }
        if (Mn === !1) {
          var r = 800;
          Mn = t + r
        }
        e()
      }
      function ce(e, t, n, r, i, o) {
        !Rt && e && se(function () {
          "POST" === Ft ? U(e, n, !0, r, i, o) : M(e, n, r),
            H(t)
        }),
          Bn ? J() : ae()
      }
      function le(e) {
        return !Rt && ("autohs" != Kt && (e && e.events && e.events.length))
      }
      function de(e) {
        var t = Sn;
        if (le(e)) {
          void 0 !== Array.prototype.toJSON && delete Array.prototype.toJSON,
            "607079401" === Qt && a(),
            nr.site_id = Qt;
          var n = r(nr) ? _uiq_JSON.stringify(nr) : nr;
          try {
            _uiq_JSON.parse(nr)
          } catch (i) {
            n = _uiq_JSON.stringify(nr)
          }
          se(function () {
            var e = n
              , r = new K.XMLHttpRequest;
            r.open("POST", t, !0),
              r.setRequestHeader("Content-Type", "application/json"),
              r.send(e),
              Jn = Date.now(),
              nr.events = []
          })
        }
      }
      function fe(e) {
        return cn + e + "." + Qt + "." + Ut
      }
      function pe() {
        if (ln)
          return "0";
        if (!t($.cookieEnabled)) {
          var e = fe("testcookie");
          return P(e, "1"),
            "1" === N(e) ? "1" : "0"
        }
        return $.cookieEnabled ? "1" : "0"
      }
      function he() {
        Ut = Fn((Nt || Bt) + (xt || "/")).slice(0, 4)
      }
      function me() {
        var e = fe("cvar")
          , t = N(e);
        if (t.length) {
          try {
            t = _uiq_JSON.parse(t)
          } catch (n) { }
          if (r(t))
            return t
        }
        return {}
      }
      function ve() {
        if (xn === !1 && (xn = me()),
          "403025501" == Qt)
          for (var e in xn)
            xn.hasOwnProperty(e) && "user_id" === xn[e][0] && (xn[e][1] = xn[e][1].toLowerCase())
      }
      function ge() {
        var e;
        try {
          e = _uiq_JSON.stringify(jn)
        } catch (t) {
          e = ""
        }
        return Fn(($.userAgent || "") + ($.platform || "") + e + (new Date).getTime() + Math.random()).slice(0, 16)
      }
      function we() {
        var e, t, n = Math.round(Date.now() / 1e3), r = fe("id"), i = N(r);
        return i ? (e = i.split("."),
          e.unshift("0"),
          Zt.length && (e[1] = Zt),
          e) : (t = Zt.length ? Zt : ge(),
            e = ["1", t, n, 0, n, "", ""])
      }
      function _e() {
        var e = we()
          , n = e[0]
          , r = e[1]
          , i = e[2]
          , o = e[3]
          , a = e[4]
          , u = e[5];
        t(e[6]) || (e[6] = "");
        var s = e[6];
        return {
          newVisitor: n,
          uuid: r,
          createTs: i,
          visitCount: o,
          currentVisitTs: a,
          lastVisitTs: u,
          lastEcommerceOrderTs: s
        }
      }
      function ye() {
        var e = Date.now()
          , t = _e().createTs
          , n = parseInt(t, 10)
          , r = 1e3 * n + hn - e;
        return r
      }
      function be(e) {
        if (Qt) {
          var n = Math.round(Date.now() / 1e3);
          t(e) || (e = _e());
          var r = e.uuid + "." + e.createTs + "." + e.visitCount + "." + n + "." + e.lastVisitTs + "." + e.lastEcommerceOrderTs;
          P(fe("id"), r, ye(), xt, Nt)
        }
      }
      function qe() {
        var e = N(fe("ref"));
        if (e.length)
          try {
            if (e = _uiq_JSON.parse(e),
              r(e))
              return e
          } catch (t) { }
        return ["", "", 0, ""]
      }
      function Ee(e, t, n) {
        P(e, "delete", -86400, t, n)
      }
      function Se(e) {
        var t = "testvalue";
        return P("test", t, 1e4, null, e),
          N("test") === t && (Ee("test", null, e),
            !0)
      }
      function Te() {
        var e = ln;
        ln = !1;
        var t, n, r = ["id", "ses", "cvar", "ref"];
        for (t = 0; t < r.length; t++)
          n = fe(r[t]),
            0 !== N(n) && Ee(n, xt, Nt);
        ln = e
      }
      function Oe(e) {
        Qt = e,
          be()
      }
      function Ce(e) {
        Tt = e
      }
      function Ae(e, t) {
        An = e,
          kn = t.toString()
      }
      function ke() {
        return An
      }
      function Pe() {
        return kn
      }
      function Ne(e) {
        Yn = e
      }
      function xe(e) {
        Vn = e
      }
      function Re(e) {
        tn = e ? e : !e
      }
      function Ie() {
        return tn
      }
      function Le() {
        return en
      }
      function De() {
        en = !0
      }
      function je(e) {
        if (e && r(e)) {
          var t, n = [];
          for (t in e)
            Object.prototype.hasOwnProperty.call(e, t) && n.push(t);
          var i = {};
          n.sort();
          var o, a = n.length;
          for (o = 0; o < a; o++)
            i[n[o]] = e[n[o]];
          return i
        }
      }
      function Me() {
        P(fe("ses"), "*", mn, xt, Nt)
      }
      function Ue(e, r, i, a) {
        function u(e, t) {
          void 0 !== Array.prototype.toJSON && delete Array.prototype.toJSON;
          var n = _uiq_JSON.stringify(e);
          return n.length > 2 ? "&" + t + "=" + te(n) : ""
        }
        var s, c, d, f, p, h, g, w = new Date, _ = Math.round(Date.now() / 1e3), y = 1024, b = xn, E = fe("ses"), S = fe("ref"), T = fe("cvar"), O = N(E), C = qe(), A = Ot || zt;
        if (ln && Te(),
          Rt)
          return "";
        var k = _e();
        t(a) || (a = "");
        var x = X.characterSet || X.charset;
        if (x && "utf-8" !== x.toLowerCase() || (x = null),
          h = C[0],
          g = C[1],
          c = C[2],
          d = C[3],
          !O) {
          var I = mn / 1e3;
          if ((!k.lastVisitTs || _ - k.lastVisitTs > I) && (k.visitCount++ ,
            k.lastVisitTs = k.currentVisitTs),
            !Dt || !h.length) {
            for (s in un)
              if (Object.prototype.hasOwnProperty.call(un, s) && (h = v(A, un[s]),
                h.length))
                break;
            for (s in sn)
              if (Object.prototype.hasOwnProperty.call(sn, s) && (g = v(A, sn[s]),
                g.length))
                break
          }
          if (f = m(Gt),
            p = d.length ? m(d) : "",
            !f.length || j(f) || Dt && p.length && !j(p) || (d = Gt),
            d.length || h.length) {
            c = _,
              C = [h, g, c, R(d.slice(0, y))];
            var L;
            try {
              L = _uiq_JSON.stringify(C)
            } catch (D) {
              L = ""
            }
            P(S, L, vn, xt, Nt)
          }
        }
        e += "&idsite=" + Qt + "&rec=1&r=" + String(Math.random()).slice(2, 8) + "&h=" + w.getHours() + "&m=" + w.getMinutes() + "&s=" + w.getSeconds() + "&url=" + te(R(A)) + (Gt.length ? "&urlref=" + te(R(Gt)) : "") + (Kt && Kt.length ? "&uid=" + te(Kt) : "") + "&_id=" + k.uuid + "&_idts=" + k.createTs + "&_idvc=" + k.visitCount + "&_idn=" + k.newVisitor + (h.length ? "&_rcn=" + te(h) : "") + (g.length ? "&_rck=" + te(g) : "") + "&_refts=" + c + "&_viewts=" + k.lastVisitTs + "&_uiqts=" + _ + (String(k.lastEcommerceOrderTs).length ? "&_ects=" + k.lastEcommerceOrderTs : "") + (String(d).length ? "&_ref=" + te(R(d.slice(0, y))) : "") + (x ? "&cs=" + te(x) : "") + "&send_image=0";
        for (s in jn)
          Object.prototype.hasOwnProperty.call(jn, s) && (e += "&" + s + "=" + jn[s]);
        var M = [];
        if (r)
          for (s in r)
            if (Object.prototype.hasOwnProperty.call(r, s) && /^dimension\d+$/.test(s)) {
              var U = s.replace("dimension", "");
              M.push(parseInt(U, 10)),
                M.push(String(U)),
                e += "&" + s + "=" + r[s],
                delete r[s]
            }
        r && o(r) && (r = null);
        for (s in Ln)
          if (Object.prototype.hasOwnProperty.call(Ln, s)) {
            var W = -1 === q(M, s);
            W && (e += "&dimension" + s + "=" + Ln[s])
          }
        r ? e += "&data=" + te(_uiq_JSON.stringify(r)) : Pt && (e += "&data=" + te(_uiq_JSON.stringify(Pt)));
        var B = je(Rn)
          , z = je(In);
        if (e += u(B, "cvar"),
          e += u(z, "e_cvar"),
          xn) {
          e += u(xn, "_cvar");
          for (s in b)
            Object.prototype.hasOwnProperty.call(b, s) && ("" !== xn[s][0] && "" !== xn[s][1] || delete xn[s]);
          _n && P(T, _uiq_JSON.stringify(xn), mn, xt, Nt)
        }
        return gn && (wn ? e += "&gt_ms=" + wn : Z && Z.timing && Z.timing.requestStart && Z.timing.responseEnd && (e += "&gt_ms=" + (Z.timing.responseEnd - Z.timing.requestStart))),
          k.lastEcommerceOrderTs = t(a) && String(a).length ? a : k.lastEcommerceOrderTs,
          be(k),
          Me(),
          e += l(i),
          $t.length && (e += "&" + $t),
          n(jt) && (e = jt(e)),
          e
      }
      function We(e, n) {
        var r = /^t[0-9]+/.test(e);
        e = r ? e.substr(1) : e;
        var i = r ? "tour" : "modal"
          , o = "c_id=" + te(e) + "&c_type=" + i + "&c_action=" + te(n.action_taken);
        return r && (o += "&t_lsr=" + te(n.last_step_rendered),
          n.visibility && (o += "&t_vis=" + te(n.visibility)),
          n.dismiss_origin && (o += "&d_origin=" + te(n.dismiss_origin))),
          n.interaction && (o += "&c_int=" + te(n.interaction) + "&c_int_s=" + te(n.interaction_state),
            n.percentage && (o += "&c_int_amt=" + te(n.percentage))),
          n.last_button_interaction && (o += "&c_lbi=" + te(n.last_button_interaction)),
          t(n._uiq_response_value) && (o += "&survey_v=" + te(n._uiq_response_value)),
          n._uiq_survey_comment && (o += "&survey_c=" + te(n._uiq_survey_comment)),
          n._uiq_survey_response && (o += "&c_response=" + te(n._uiq_survey_response)),
          o
      }
      function Be(e, t) {
        if (null !== Yn && Yn !== !1) {
          var n = Ue(We(Yn, e));
          ce(n, an, t, "/campaigns/track", En)
        }
      }
      function ze(e, t) {
        if (e) {
          var n = Ue(We(e.event_action_id, e));
          ce(n, an, t, "/campaigns/track", En)
        }
      }
      function Ge(e, t) {
        if (null !== Yn) {
          var n = Ue(We(Yn, e));
          ce(n, an, t, "/campaigns/save", En)
        }
      }
      function He(e) {
        ot(e),
          C(),
          wt(),
          qt(),
          yt(),
          vt(),
          at() || ("405027401" === Qt || "2070013001" === Qt ? document.onreadystatechange = function () {
            "complete" === document.readyState && A(!1)
          }
            : A(!1))
      }
      function Je(e, n, r, i) {
        return "e_c=" + te(e) + "&e_a=" + te(n) + (t(r) ? "&e_n=" + te(r) : "") + (t(i) ? "&e_v=" + te(i) : "")
      }
      function Fe(e, t, n, r) {
        return new Promise(function (r, i) {
          var o = Ue("?site_id=" + Qt, n)
            , a = t + o
            , u = new XMLHttpRequest;
          u.open(e, a, !0),
            u.withCredentials = !0,
            u.onload = function () {
              200 === u.status ? r(u.response) : i(Error("Image didn't load successfully; error code:" + u.statusText))
            }
            ,
            u.onerror = function () {
              i(Error("There was a network error."))
            }
            ,
            u.send()
        }
        )
      }
      function Ye(e) {
        return !Rt && (e && e.length)
      }
      function Ve(e, t) {
        if (Ye(e)) {
          var n = '{"requests":["?' + e.join('","?') + '"]}';
          se(function () {
            U(n, null, !1),
              H(t),
              Xn.length = 0
          })
        }
      }
      function Xe(e, t) {
        if (o(e))
          return !1;
        var n = (Date.now() - Hn,
          Date.now() - Jn)
          , r = xn
          , i = _e()
          , a = ["impersonated", "impersonation", "impersonater", "impersonate"];
        for (var u in xn)
          if (xn.hasOwnProperty(u)) {
            var s = xn[u][0].toLowerCase();
            if (q(a, s) > -1) {
              var c = "" + xn[u][1];
              if (c = c.toLowerCase(),
                "true" === c)
                return
            }
          }
        switch (e.event_ts = Date.now(),
        e.site_id = Qt,
        e.visitor_id = i.uuid,
        e.uid = Kt,
        e.cvars = r,
        e.res = jn.res,
        e._idvc = i.visitCount,
        e._idts = i.createTs,
        e.type) {
          case "pageview":
            e.action_name = b(e.customTitle || rn),
              e.url = ee(k()),
              e.url_ref = R(Gt);
            break;
          case "custom":
            e.action_name = "",
              e.url = ee(k()),
              e.url_ref = R(Gt);
            break;
          default:
            e.url = ee(k()),
              e.url_ref = R(Gt)
        }
        t && (e.custom_data = _uiq_JSON.stringify(t));
        var l = fn;
        if ("410033701" !== Qt && "501040701" !== Qt || (l = 2),
          "512058901" === Qt || "511058501" === Qt)
          try {
            e.url = e.url.toLowerCase(),
              e.url_ref = e.url_ref.toLowerCase()
          } catch (d) { }
        if ("702095001" === Qt || "702096601" === Qt || "1" === Qt)
          try {
            e.url_ref = null
          } catch (d) { }
        n >= l || tr.events.length == pn ? (nr.events.push(e),
          de(nr)) : nr.events.push(e)
      }
      function $e(e, t, n, r, i) {
        if (0 === String(e).length || 0 === String(t).length)
          return !1;
        var o = Ue(Je(e, t, n, r), i, "event")
          , a = new Date
          , u = a.getTime() - Gn;
        u >= fn ? (Xn.push(o),
          Ve(Xn, an)) : Xn.push(o)
      }
      function Qe() {
        de(nr)
      }
      function Ke(e, n, r, i) {
        var o = Ue("search=" + te(e) + (n ? "&search_cat=" + te(n) : "") + (t(r) ? "&search_count=" + r : ""), i, "sitesearch");
        ce(o, an)
      }
      function Ze(e, t, n) {
        var r = Ue("idgoal=" + e + (t ? "&revenue=" + t : ""), n, "goal");
        ce(r, an)
      }
      function et(e, t) {
        return "" !== e ? e + t.charAt(0).toUpperCase() + t.slice(1) : t
      }
      function tt(e) {
        var t, n, r, i = ["", "webkit", "ms", "moz"];
        if (!Lt)
          for (n = 0; n < i.length; n++)
            if (r = i[n],
              Object.prototype.hasOwnProperty.call(X, et(r, "hidden"))) {
              "prerender" === X[et(r, "visibilityState")] && (t = !0);
              break
            }
        return t ? void c(X, r + "visibilitychange", function o() {
          X.removeEventListener(r + "visibilitychange", o, !1),
            e()
        }) : void e()
      }
      function nt(e) {
        var t = !1;
        return (t = X.attachEvent ? "complete" === X.readyState : "loading" !== X.readyState) ? void e() : (X.addEventListener ? c(X, "DOMContentLoaded", function n() {
          X.removeEventListener("DOMContentLoaded", n, !1),
            t || (t = !0,
              e())
        }) : X.attachEvent && (X.attachEvent("onreadystatechange", function r() {
          "complete" === X.readyState && (X.detachEvent("onreadystatechange", r),
            t || (t = !0,
              e()))
        }),
          X.documentElement.doScroll && K === K.top && !function i() {
            if (!t) {
              try {
                X.documentElement.doScroll("left")
              } catch (n) {
                return void setTimeout(i, 0)
              }
              t = !0,
                e()
            }
          }()),
          void c(K, "load", function () {
            t || (t = !0,
              e())
          }, !1))
      }
      function rt(e, t, n) {
        var r = 128
          , i = t ? t.nodeName : ""
          , o = {};
        if (t && (t.id && (i += " id: " + t.id,
          o.id = t.id),
          t.name && (i += " name: " + t.name,
            o.name = t.name),
          t.className && (i += " className: " + t.className,
            o.className = t.className),
          t.textContent)) {
          var a = t.textContent.replace(/[\r\n\t]/g, " ");
          a = a.length > r ? a.substring(0, r - 3) + "..." : a,
            a = a.trim(),
            0 != a.length && (i += " textContent: " + a)
        }
        o.type = "custom",
          o.useriq_scheme = i,
          Xe(o, n)
      }
      function it(e, t, n) {
        var r = 128
          , i = n ? n.nodeName : ""
          , o = nn
          , a = n ? n.type : ""
          , u = ["password", "email", "hidden", "text"]
          , s = ["INPUT", "DIV"]
          , c = {};
        if (c.type = "click",
          n) {
          if (n.id && (i += " id: " + n.id,
            c.id = n.id),
            n.name && (i += " name: " + n.name,
              c.name = n.name),
            n.className) {
            var l = Y.useriqSelectorEngine.sanitizeClasses(n);
            try {
              if (l.includes("useriq-dnt"))
                return
            } catch (d) { }
            try {
              l = l.trim()
            } catch (d) {
              l = ""
            }
            "" != l && 0 != l && (i += " className: " + l,
              c.className = l)
          }
          if (n.textContent && o === !1 && q(s, i) == -1 && q(u, a) == -1 && ("411035301" !== Qt || "309016801" !== Qt || "509053701" !== Qt)) {
            var f = n.textContent.replace(/[\r\n\t]/g, " ");
            f = f.length > r ? f.substring(0, r - 3) + "..." : f,
              i += " textContent: " + f.trim()
          }
          var p = Y.useriqTracker.getDataAttrTracking()
            , h = Y.useriqTracker.getDataAttrTrackingName();
          if (p && n.dataset) {
            for (var m in n.dataset)
              if (n.dataset.hasOwnProperty(m)) {
                var v = h.indexOf("-") > -1 ? h.replace(/-([a-z])/g, function (e) {
                  return e[1].toUpperCase()
                }) : h;
                if (m === v) {
                  var g = m
                    , w = n.dataset[m];
                  try {
                    w = w.trim()
                  } catch (d) {
                    w = ""
                  }
                  "" != w && "{}" != w && (c.dataset = " dataset: {" + g + ': "' + w + '"}')
                }
              }
            if (void 0 == c.dataset || null == c.dataset || "" == c.dataset) {
              var _ = n.closest("[data-" + h + "]");
              if (_)
                return it(e, t, _),
                  !1
            }
          }
        }
        return (i == n.nodeName || n && n.nodeName && "canvas" == n.nodeName.toLowerCase()) && Nn < Pn ? (Nn += 1,
          it(e, t, n.parentElement),
          !1) : (Nn = 0,
            void (i && "div" !== i.toLowerCase() && "password" !== a && (c.useriq_scheme = i,
              Xe(c))))
      }
      function ot(e) {
        var t = {};
        t.type = "pageview",
          t.customTitle = e,
          Xe(t)
      }
      function at() {
        return X.all && !X.addEventListener
      }
      function ut(e) {
        var t = e.which
          , n = typeof e.button;
        return t || "undefined" === n || (at() ? 1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2) : 0 === e.button || "0" === e.button ? t = 1 : 1 & e.button ? t = 2 : 2 & e.button && (t = 3)),
          t
      }
      function st(e) {
        switch (ut(e)) {
          case 1:
            return "left";
          case 2:
            return "middle";
          case 3:
            return "right"
        }
      }
      function ct(e) {
        return e.target || e.srcElement
      }
      function lt() {
        return function (e) {
          e = e || K.event;
          var t = st(e)
            , n = ct(e)
            , r = ["IFRAME", "FRAME", "BODY", "HTML"];
          q(r, n.tagName) > -1 || it(e, t, n)
        }
      }
      function dt(e, t, n) {
        var r = ["210005201", "201009901", "210005301", "403025501", "409031001"];
        q(r, n) > -1 || (t === !1 ? (e.removeEventListener("click", lt()),
          nr.events = []) : c(e, "click", lt(t), !0))
      }
      function ft(e) {
        Wn || (Wn = !0,
          dt(X.body, e, Qt))
      }
      function pt() {
        var e, r, i = {
          pdf: "application/pdf",
          qt: "video/quicktime",
          realp: "audio/x-pn-realaudio-plugin",
          wma: "application/x-mplayer2",
          dir: "application/x-director",
          fla: "application/x-shockwave-flash",
          java: "application/x-java-vm",
          gears: "application/x-googlegears",
          ag: "application/x-silverlight"
        };
        if (!new RegExp("MSIE").test($.userAgent)) {
          if ($.mimeTypes && $.mimeTypes.length)
            for (e in i)
              Object.prototype.hasOwnProperty.call(i, e) && (r = $.mimeTypes[i[e]],
                jn[e] = r && r.enabledPlugin ? "1" : "0");
          "unknown" != typeof navigator.javaEnabled && t($.javaEnabled) && $.javaEnabled() && (jn.java = "1"),
            n(K.GearsFactory) && (jn.gears = "1"),
            jn.cookie = pe()
        }
        var o = parseInt(Q.width, 10)
          , a = parseInt(Q.height, 10);
        jn.res = parseInt(o, 10) + "x" + parseInt(a, 10)
      }
      function ht() {
        return new Promise(function (e, t) {
          function n(e) {
            if (e && "string" == typeof e) {
              var t = document.createElement("div");
              e = e.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, ""),
                e = e.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, ""),
                t.innerHTML = e,
                e = t.textContent,
                t.textContent = ""
            }
            return e
          }
          if (window._uiq_admin && window._uiq_admin.active_admin && window._uiq_admin.admin_enabled) {
            var r = document.getElementById("uiq_admin_js")
              , i = document.getElementById("uiq_admin_css")
              , o = document.getElementById("uiq_admin_api_js")
              , a = Y.framed
              , u = document.getElementsByTagName("body")[0]
              , s = document.getElementsByTagName("head")[0];
            if (!document.getElementById("RobotoFont")) {
              var c = document.createElement("link");
              c.id = "RobotoFont",
                c.rel = "stylesheet",
                c.type = "text/css",
                c.href = "https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i",
                c.media = "all",
                s.appendChild(c)
            }
            if (!o) {
              var l = document.createElement("script");
              l.src = 'https://app.useriq.com' + "/js/admin/useriq-admin-api.js",
                l.id = "uiq_admin_api_js",
                l.defer = !0,
                l.async = !0,
                s.appendChild(l)
            }
            Y.useriqTracker.ajax("GET", Tn + "/admin_styles").then(function (e) {
              var t = window.JSON.parse(e)
                , r = t.tour_css + t.tip_css;
              r = n(r);
              var i = document.createElement("style");
              i.id = "uiq_admin_api_css",
                i.rel = "stylesheet",
                i.type = "text/css",
                i.innerHTML = r,
                s.appendChild(i)
            });
            var d = window._uiq_admin.admin_enabled_iframes;
            if (!r && (!a || a && d)) {
              var f = document.createElement("div");
              f.id = "uiq_admin_app",
                u.appendChild(f);
              var p = document.createElement("script");
              p.src = On + Cn + ".js",
                p.id = "uiq_admin_js",
                p.defer = !0,
                p.async = !0,
                s.appendChild(p)
            }
            if (!i) {
              var h = document.createElement("link");
              h.id = "uiq_admin_css",
                h.rel = "stylesheet",
                h.type = "text/css",
                h.href = On + Cn + ".css",
                s.appendChild(h)
            }
            e()
          }
        }
        )
      }
      function mt() {
        var e;
        return e = new Promise(function (e, t) {
          ht().then(function () {
            e()
          })
        }
        )
      }
      function vt() {
        var e = Tn + "/ap/feature";
        Fe("GET", e, null).then(function (e) {
          if (void 0 !== e) {
            var t = _uiq_JSON.parse(e);
            console.log('comes here ', window.Useriq.framed, useriqPostRobot, window.top)
            window.Useriq.framed && useriqPostRobot && useriqPostRobot.send(window.top, "features-on-frame", {
              features: t,
              srcUrl: window.location.href
            })
          }
        })
      }
      function gt() {
        return $n
      }
      function wt() {
        var e = Tn + "/ap/tooltip";
        Fe("GET", e, null).then(function (e) {
          if (void 0 !== e) {
            var t = _uiq_JSON.parse(e);
            window.Useriq.framed ? useriqPostRobot && useriqPostRobot.send(window.top, "tooltips-on-frame", {
              tooltips: t,
              srcUrl: window.location.href
            }) : (Qn = [],
              t.forEach(function (e) {
                e.id && Qn.push(e)
              }))
          }
        })
      }
      function _t() {
        return Qn
      }
      function yt() {
        var e = Tn + "/ap/campaign";
        Fe("GET", e, null).then(function (e) {
          if (void 0 !== e) {
            var t = _uiq_JSON.parse(e);
            window.Useriq.framed ? useriqPostRobot && useriqPostRobot.send(window.top, "campaigns-on-frame", {
              campaigns: t,
              srcUrl: window.location.href
            }) : (Kn = [],
              t.forEach(function (e) {
                e.id && Kn.push(e)
              }))
          }
        })
      }
      function bt() {
        return Kn
      }
      function qt() {
        var e = Tn + "/ap/tour";
        Fe("GET", e, null).then(function (e) {
          if (void 0 !== e) {
            var t = _uiq_JSON.parse(e);
            window.Useriq.framed ? useriqPostRobot && useriqPostRobot.send(window.top, "tours-on-frame", {
              tours: t,
              srcUrl: window.location.href
            }) : (Zn = [],
              t.forEach(function (e) {
                e.id && Zn.push(e)
              }))
          }
        })
      }
      function Et() {
        return Zn
      }
      var St = K.location.href;
      x() && (St = document.location.href);
      var Tt, Ot, Ct, At, kt, Pt, Nt, xt, Rt, It, Lt, Dt, jt, Mt, Ut, Wt = _(X.domain, St, p()), Bt = y(Wt[0]), zt = e(Wt[1]), Gt = e(Wt[2]), Ht = !1, Jt = "POST", Ft = Jt, Yt = "application/x-www-form-urlencoded; charset=UTF-8", Vt = Yt, Xt = s || "", $t = "", Qt = d || "", Kt = "", Zt = "", en = !1, tn = !1, nn = !1, rn = "", on = [Bt], an = 500, un = ["uiq_campaign", "utm_campaign", "utm_source", "utm_medium"], sn = ["uiq_kwd", "utm_term"], cn = "_uiq_", ln = !1, dn = !0, fn = 15e3, pn = 99, hn = 339552e5, mn = 18e5, vn = 15768e6, gn = !0, wn = 0, _n = !1, yn = 2048, bn = !1, qn = "https://secure2.useriq.com", En = "http://dev.useriq.com:8080", Sn = "http://dev.useriq.com:8080/visits/push", Tn = "http://dev.useriq.com:3000", On = "https://feed.useriq.com", Cn = "/admin/useriq-admin", An = !1, kn = "useriq", Pn = 4, Nn = 0, xn = !1, Rn = {}, In = {}, Ln = {}, Dn = 200, jn = {}, Mn = !1, Un = !1, Wn = !1, Bn = !1, zn = !1, Gn = null, Hn = null, Jn = null, Fn = w, Yn = null, Vn = null, Xn = [], $n = [], Qn = [], Kn = [], Zn = [];
      try {
        rn = X.title
      } catch (er) {
        rn = ""
      }
      var tr = {}
        , nr = {};
      return tr.events = [],
        nr.events = [],
        At = function () {
          if (Gn + Ct <= Date.now()) {
            var e = Ue("ping=1", null, "ping");
            return ce(e, an),
              !0
          }
          return !1
        }
        ,
        pt(),
        he(),
        be(),
        {
          identify: function (e, t) {
            var n = "visit";
            if (e) {
              if ("useriq-visitor" === e) {
                var r = z.getVisitorId();
                z.setCustomVariable("1", "user_id", r, n)
              } else
                z.setCustomVariable("1", "user_id", e, n);
              var i = z.getSiteId();
              "601062701" !== i && "601062601" !== i && "512059501" !== i || z.setUserId(e)
            }
            var o = 2;
            "object" != typeof t || null === t || t instanceof Array || t instanceof Date || Object.keys(t).forEach(function (r) {
              "user_id" === r ? z.setCustomVariable("1", "user_id", e, n) : z.setCustomVariable(o, r, t[r], n),
                o++
            })
          },
          checkAdmin: function () {
            C()
          },
          checkFeatures: function (e) {
            tt(function () {
              A(e)
            })
          },
          getUrl: function () {
            return k()
          },
          removeAssets: function (e) {
            f(e)
          },
          checkForCampaigns: function (e, t) {
            tt(function () {
              T(e, t)
            })
          },
          setXhrPost: function (e) {
            bn = e
          },
          setDataAttrTracking: function (e, t) {
            Ae(e, t)
          },
          getDataAttrTracking: function () {
            return ke()
          },
          getDataAttrTrackingName: function () {
            return Pe()
          },
          getVisitorId: function () {
            return _e().uuid
          },
          getVisitorInfo: function () {
            return we()
          },
          getAttributionInfo: function () {
            return qe()
          },
          getAttributionCampaignName: function () {
            return qe()[0]
          },
          getAttributionCampaignKeyword: function () {
            return qe()[1]
          },
          getAttributionReferrerTimestamp: function () {
            return qe()[2]
          },
          getAttributionReferrerUrl: function () {
            return qe()[3]
          },
          setTrackerUrl: function () {
            "412039401" === Qt || "505042801" === Qt || "509044101" === Qt || "509044001" === Qt ? (Xt = "https://eu.useriq.com/visits/push",
              qn = "https://eu.useriq.com",
              En = "http://dev.useriq.com:8080",
              Sn = "http://dev.useriq.com:8080/visits/push",
              _uiq_base_cf_url = "https://eu.useriq.com",
              Tn = "https://eu.useriq.com",
              Cn = "/admin/useriq-admin-eu") : (Xt = "http://dev.useriq.com:3000/visits/push",
                qn = "https://secure2.useriq.com",
                En = "http://dev.useriq.com:8080",
                Sn = "http://dev.useriq.com:8080/visits/push",
                Tn = "http://dev.useriq.com:3000",
                Cn = "/admin/useriq-admin")
          },
          getTrackerUrl: function () {
            return Xt
          },
          getSiteId: function () {
            return Qt.toString()
          },
          setSiteId: function (e) {
            Oe(e)
          },
          getSiteSettings: function () {
            return Tt
          },
          setSiteSettings: function (e) {
            Ce(e)
          },
          getActiveCampaignId: function () {
            return Yn
          },
          setActiveCampaignId: function (e) {
            Ne(e)
          },
          getActiveCampaign: function () {
            return Vn
          },
          setActiveCampaign: function (e) {
            xe(e)
          },
          setUserId: function (e) {
            t(e) && e.length && (Kt = e,
              Zt = Fn(Kt).substr(0, 16))
          },
          getUserId: function () {
            return Kt
          },
          getCvarUserId: function () {
            var e;
            ve();
            for (var n in xn)
              xn.hasOwnProperty(n) && "user_id" === xn[n][0] && (e = xn[n][1]);
            return !(!t(e) || e && "" === e[0]) && e
          },
          getCvars: function () {
            xn === !1 && ve();
            var e = "";
            if (r(xn)) {
              void 0 !== Array.prototype.toJSON && delete Array.prototype.toJSON;
              try {
                _uiq_JSON.parse(xn),
                  e = xn
              } catch (t) {
                e = _uiq_JSON.stringify(xn)
              }
            } else
              e = xn;
            try {
              e = window.encodeURIComponent(e)
            } catch (t) { }
            return e
          },
          setCustomData: function (e, t) {
            r(e) ? Pt = e : (Pt || (Pt = {}),
              Pt[e] = t)
          },
          getCustomData: function () {
            return Pt
          },
          setCustomRequestProcessing: function (e) {
            jt = e
          },
          appendToTrackingUrl: function (e) {
            $t = e
          },
          getRequest: function (e) {
            return Ue(e)
          },
          addPlugin: function (e, t) {
            V[e] = t
          },
          setCustomDimension: function (e, n) {
            e = parseInt(e, 10),
              e > 0 && (t(n) || (n = ""),
                i(n) || (n = String(n)),
                Ln[e] = n)
          },
          getCustomDimension: function (e) {
            if (e = parseInt(e, 10),
              e > 0 && Object.prototype.hasOwnProperty.call(Ln, e))
              return Ln[e]
          },
          deleteCustomDimension: function (e) {
            e = parseInt(e, 10),
              e > 0 && delete Ln[e]
          },
          setCustomVariable: function (e, n, r, o) {
            var a, u = ["useriq-unknown", "insert_user_id", "insert_user_name", "user_name", "account_id", "account_name", "guest", "not logged in", "insert_account_id", "insert_account_name", "anonymous", "null", "user_id", "nil", "none", "empty", "visitor", "unknown"];
            if (t(o) || (o = "visit"),
              t(n)) {
              if (t(r) || (r = ""),
                e > 0) {
                n = i(n) ? n : String(n),
                  null == r && (r = ""),
                  r = i(r) ? r : String(r);
                var s = r.toLowerCase();
                q(u, s) > -1 && (r = "useriq-unknown"),
                  "user_id" == n && (Kt = r.slice(0, Dn),
                    "403025501" == Qt && (Kt = Kt.toLowerCase(),
                      r = s)),
                  "url" != n && "iframe_url" != n || z.setCustomUrl(r),
                  a = [n.slice(0, Dn), r.slice(0, Dn)],
                  "visit" === o || 2 === o ? (ve(),
                    xn[e] = a) : "page" === o || 3 === o ? Rn[e] = a : "event" === o && (In[e] = a)
              }
              if (!e) {
                ve();
                for (var c in xn)
                  xn.hasOwnProperty(c) && xn[c][0] === n && (o ? z.setCustomVariable(c, n, r, o) : z.setCustomVariable(c, n, r, "visit"))
              }
            }
          },
          getCustomVariable: function (e, n) {
            var r;
            return t(n) || (n = "visit"),
              "page" === n || 3 === n ? r = Rn[e] : "event" === n ? r = In[e] : "visit" === n || 2 === n ? (ve(),
                r = xn[e]) : "_uiq" === n && (ve(),
                  r = xn),
              !(!t(r) || r && "" === r[0]) && r
          },
          deleteCustomVariable: function (e, t) {
            this.getCustomVariable(e, t) && this.setCustomVariable(e, "", "", t)
          },
          storeCustomVariablesInCookie: function () {
            _n = !0
          },
          setLinkTrackingTimer: function (e) {
            an = e
          },
          setDomains: function (e) {
            on = i(e) ? [e] : e;
            var t, n = !1, r = 0;
            for (r; r < on.length; r++) {
              if (t = String(on[r]),
                L(Bt, y(t))) {
                n = !0;
                break
              }
              var o = D(t);
              if (o && "/" !== o && "/*" !== o) {
                n = !0;
                break
              }
            }
            n || on.push(Bt)
          },
          setRequestMethod: function (e) {
            Ft = e || Jt
          },
          setRequestContentType: function (e) {
            Vt = e || Yt
          },
          setReferrerUrl: function (e) {
            Gt = e
          },
          setCustomUrl: function (e) {
            Ot = I(zt, e)
          },
          setDocumentTitle: function (e) {
            rn = e
          },
          setCampaignNameKey: function (e) {
            un = i(e) ? [e] : e
          },
          setCampaignKeywordKey: function (e) {
            sn = i(e) ? [e] : e
          },
          discardHashTag: function (e) {
            kt = e
          },
          setCookieNamePrefix: function (e) {
            cn = e,
              xn = me()
          },
          setCookieDomain: function (e) {
            var t = y(e);
            Se(t) && (Nt = t,
              he())
          },
          setCookiePath: function (e) {
            xt = e,
              he()
          },
          setVisitorCookieTimeout: function (e) {
            hn = 1e3 * e
          },
          setSessionCookieTimeout: function (e) {
            mn = 1e3 * e
          },
          setReferralCookieTimeout: function (e) {
            vn = 1e3 * e
          },
          setConversionAttributionFirstReferrer: function (e) {
            Dt = e
          },
          requireUserId: function (e) {
            e || (dn = e)
          },
          disableCookies: function (e) {
            ln = e,
              jn.cookie = "0",
              Qt && Te()
          },
          deleteCookies: function () {
            Te()
          },
          setDoNotTrack: function (e) {
            var t = $.doNotTrack || $.msDoNotTrack;
            Rt = e || "yes" === t || "1" === t,
              Rt && this.disableCookies()
          },
          setDoNotDeliver: function (e) {
            It = e
          },
          addListener: function (e, t, n) {
            tt(function () {
              nt(function () {
                c(e, "click", t(n))
              })
            })
          },
          enableLinkTracking: function (e) {
            tt(function () {
              nt(function () {
                ft(e)
              })
            })
          },
          eventTracking: function (e) {
            tt(function () {
              nt(function () {
                ft(e)
              })
            })
          },
          enableJSErrorTracking: function () {
            if (!Ht) {
              Ht = !0;
              var e = K.onerror;
              K.onerror = function (t, n, r, i, o) {
                return tt(function () {
                  var e = "JavaScript Errors"
                    , o = n + ":" + r;
                  i && (o += ":" + i),
                    $e(e, o, t)
                }),
                  !!e && e(t, n, r, i, o)
              }
            }
          },
          disablePerformanceTracking: function () {
            gn = !1
          },
          setGenerationTimeMs: function (e) {
            wn = parseInt(e, 10)
          },
          enableHeartBeatTimer: function (e) {
            e = Math.max(e, 1),
              Ct = 1e3 * (e || 15),
              null !== Gn && ae()
          },
          killFrame: function () {
            K.location !== K.top.location && (K.top.location = K.location)
          },
          redirectFile: function (e) {
            "file:" === K.location.protocol && (K.location = e)
          },
          setCountPreRendered: function (e) {
            Lt = e
          },
          trackGoal: function (e, t, n) {
            tt(function () {
              Ze(e, t, n)
            })
          },
          trackPageView: function (e, t, n) {
            tt(function () {
              He(e, t, n)
            })
          },
          trackEvent: function (e, t, n, r, i) {
            tt(function () {
              $e(e, t, n, r, i)
            })
          },
          trackCustomEvent: function (e, t, n) {
            tt(function () {
              rt(e, t, n)
            })
          },
          setPreviewState: function (e) {
            Re(e)
          },
          getPreviewState: function () {
            return Ie()
          },
          setDoNotTrackText: function (e) {
            nn = e
          },
          startTracker: function () {
            var e = Le();
            e || (De(),
              ft(!0),
              tt(function () {
                He()
              }))
          },
          disableTracker: function (e) {
            void 0 === e && (e = !0),
              Y.useriqTracker.eventTracking(!e),
              Y.useriqTracker.setDoNotTrack(e),
              Y.useriqTracker.setDoNotDeliver(e)
          },
          sendBulk: function () {
            Qe()
          },
          trackCampaign: function (e, t) {
            tt(function () {
              Be(e, t)
            })
          },
          trackTooltip: function (e, t) {
            tt(function () {
              ze(e, t)
            })
          },
          saveCampaign: function (e, t) {
            tt(function () {
              Ge(e, t)
            })
          },
          trackSiteSearch: function (e, t, n, r) {
            tt(function () {
              Ke(e, t, n, r)
            })
          },
          ajax: function (e, t, n, r) {
            return Fe(e, t, n, r)
          },
          getFeatures: function () {
            return gt()
          },
          getTooltips: function () {
            return _t()
          },
          getTours: function () {
            return Et()
          },
          getCampaigns: function () {
            return bt()
          },
          retrieveFeatures: function () {
            vt()
          },
          retrieveTooltips: function () {
            wt()
          },
          retrieveTours: function () {
            qt()
          },
          retrieveCampaigns: function () {
            yt()
          },
          retrieveAdminAssets: function () {
            mt()
          }
        }
    }
    function D(e) {
      if (history.pushState && window.addEventListener) {
        var t;
        try {
          t = window.location
        } catch (n) { }
        var r = t.href;
        this.updateData = function (e) {
          if (e) {
            z.trackPageView();
            try {
              window.uiq_resetRecord()
            } catch (t) { }
          }
        }
          ,
          this.updateTrackerData = function (e) {
            e = e !== !1,
              setTimeout(function () {
                var n = r
                  , i = t.href;
                if (n != i && G.shouldTrackUrlChange(i, n) && (r = i,
                  e)) {
                  z.setCustomUrl(i),
                    z.setDocumentTitle(document.title),
                    z.trackPageView();
                  try {
                    window.Useriq.frames = null,
                      window.Useriq.frames = [],
                      window.uiq_resetRecord()
                  } catch (o) { }
                }
              }, 0)
          }
          ,
          this.shouldTrackUrlChange = function (e, t) {
            return e && t
          }
          ,
          "412039601" === e || /mmr/.test(X.location.host) ? window.addEventListener("popstate", this.updateData(!0), !1) : setInterval(this.updateTrackerData, 250)
      }
    }
    function j(e) {
      for (var t = j.options, n = t.parser[t.strictMode ? "strict" : "loose"].exec(e), r = {}, i = 14; i--;)
        r[t.key[i]] = n[i] || "";
      return r[t.q.name] = {},
        r[t.key[12]].replace(t.q.parser, function (e, n, i) {
          n && (r[t.q.name][n] = i)
        }),
        r
    }
    function M() {
      return {
        push: s
      }
    }
    function U(e, t) {
      var n, r, i = {};
      for (n = 0; n < t.length; n++) {
        var o = t[n];
        for (i[o] = 1,
          r = 0; r < e.length; r++)
          if (e[r] && e[r][0]) {
            var a = e[r][0];
            o === a && (s(e[r]),
              delete e[r],
              i[a] > 1,
              i[a]++)
          }
      }
      return e
    }
    var W, B, z, G, H, J, F, Y, V = {}, X = document, $ = navigator, Q = screen, K = window, Z = K.performance || K.mozPerformance || K.msPerformance || K.webkitPerformance, ee = K.decodeURIComponent, te = K.encodeURIComponent;
    unescape;
    j.options = {
      strictMode: !1,
      key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
      q: {
        name: "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
      },
      parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
      }
    },
      c(K, "beforeunload", d, !1),
      z = new L,
      H = new R,
      J = new I,
      z.isIE8orOlder || (c(X, "load", N, !0),
        "hidden" in X && c(X, "visibilitychange", function (e) { }));
    var ne = ["setDoNotTrack", "setDoNotDeliver", "disableCookies", "setSiteId", "setTrackerUrl", "enableLinkTracking", "eventTracking", "setDataAttrTracking"];
    for (_uiq = U(_uiq, ne),
      F = 0; F < _uiq.length; F++)
      _uiq[F] && s(_uiq[F]);
    _uiq = new M;
    var re = window.Useriq;
    P(),
      Y = {
        frames: [],
        framed: !1,
        init: function () {
          var e = z.getSiteId();
          if (window._uiq.invoked = !0,
            x() &&
            "601061601" !== e && "508044901" !== e && "601061501" !== e && "604074201" !== e && "611088701" !== e && "611088501" !== e && "611088601" !== e &&
            (Y.framed = !0,
              useriqPostRobot.CONFIG.LOG_LEVEL = "error",
              useriqPostRobot.send(window.top, "uiq-register", {
                site_id: e
              })),
            "603069801" === e ? Y.debugMode = !0 : Y.debugMode = !1,
            ie)
            Y.demo();
          else if (oe)
            Y.ext();
          else {
            try {
              window._uiq_app = new UserIQ(e)
            } catch (t) { }
            Y.useriqTracker = z,
              Y.useriqSelectorEngine = H,
              Y.useriqAdminTools = J,
              Y.useriqTracker.setTrackerUrl(),
              "509053801" !== e && "511057901" !== e || Y.useriqTracker.startTracker(),
              z.isIE8orOlder || "410033701" !== e && (G = new D(e))
          }
        },
        startTracker: function () {
          void 0 === typeof Y.useriqTracker && (Y.useriqTracker = z),
            Y.useriqTracker.startTracker()
        },
        record: function () {
          Y.useriqTracker.checkAdmin()
          Y.useriqTracker.checkFeatures(!0)
        },
        light: function (e) {
          var t = z.getSiteId()
            , n = document.createElement("script");
          n.type = "text/javascript",
            n.id = "uiq_light",
            n.setAttribute("data-useriq", ""),
            n.src = _uiq_base_cf_url + "/subtle/light.js?action_id=" + e + "&_uiq_site_id=" + t,
            document.getElementsByTagName("head")[0].appendChild(n)
        },
        ext: function () {
          if (oe) {
            Y.useriqTracker = z,
              Y.useriqTracker.setTrackerUrl(),
              Y.useriqTracker.setSiteId("410033701");
            var e = Y.useriqTracker.getSiteId();
            window._uiq_app = new UserIQ(e),
              Y.startTracker()
          }
        },
        demo: function () {
          if (ie) {
            Y.useriqTracker = z,
              Y.useriqTracker.setTrackerUrl(),
              Y.useriqTracker.setSiteId("2");
            var e = Y.useriqTracker.getSiteId();
            window._uiq_app = new UserIQ(e),
              Y.startTracker()
          }
        },
        replace: function (e) {
          var t, n, r, i = j(e), o = i.authority, a = "", u = o.split("*"), s = [], c = [];
          r = window.location.origin ? window.location.origin : window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
          var l = r.length;
          u.forEach(function (e) {
            if (r.includes(e)) {
              var t = r.indexOf(e);
              s.push(e.length),
                c.push(t + e.length)
            }
          });
          for (var d = 0; d < c.length; d++) {
            var f = c[d]
              , p = c[d + 1]
              , h = s[d + 1];
            a += u[d],
              0 === f && 0 !== p ? (t = p - h,
                n = !isNaN(t) && r.substring(0, t)) : 0 !== f && 0 !== p ? (t = p - h,
                  n = !isNaN(t) && r.substring(f, t)) : 0 !== f && 0 === p && (t = l - h,
                    n = !isNaN(t) && r.substring(f, t)),
              n && (a += n)
          }
          return a += i.relative
        },
        replaceCvars: function (e) {
          var t = Y.useriqTracker.getCvars();
          return t = window.decodeURIComponent(t),
            t = _uiq_JSON.parse(t),
            Object.keys(t).forEach(function (n) {
              var r = t[n][0].toLowerCase()
                , i = t[n][1].toLowerCase()
                , o = "%%" + r + "%%";
              e = e.replace(o, i)
            }),
            e
        },
        disableTracker: function (e) {
          void 0 === e && (e = !0),
            Y.useriqTracker.eventTracking(!e),
            Y.useriqTracker.setDoNotTrack(e),
            Y.useriqTracker.setDoNotDeliver(e)
        },
        noConflict: function () {
          return window.Useriq === Y && (window.Useriq = re),
            Y
        }
      };
    var ie, oe;
    try {
      ie = localStorage.getItem("uiq_demo_mode"),
        oe = localStorage.getItem("_uiq_ext_mode")
    } catch (ae) {
      ie = !1,
        oe = !1
    }
    return Y.init(),
      Y
  }();
  try {
    window.uiqInit && "function" == typeof window.uiqInit && window.uiqInit.call()
  } catch (e) { }
}
