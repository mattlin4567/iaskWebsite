/**
 * jquery.matchHeight-min.js v0.5.2
 * http://brm.io/jquery-match-height/
 * License: MIT
 */
(function (d) {
  var g = -1, e = -1, n = function (a) {
    var b = null, c = [];
    d(a).each(function () {
      var a = d(this), k = a.offset().top - h(a.css("margin-top")), l = 0 < c.length ? c[c.length - 1] : null;
      null === l ? c.push(a) : 1 >= Math.floor(Math.abs(b - k)) ? c[c.length - 1] = l.add(a) : c.push(a);
      b = k
    });
    return c
  }, h = function (a) {
    return parseFloat(a) || 0
  }, b = d.fn.matchHeight = function (a) {
    if ("remove" === a) {
      var f = this;
      this.css("height", "");
      d.each(b._groups, function (a, b) {
        b.elements = b.elements.not(f)
      });
      return this
    }
    if (1 >= this.length)return this;
    a = "undefined" !== typeof a ? a : !0;
    b._groups.push({elements: this, byRow: a});
    b._apply(this, a);
    return this
  };
  b._groups = [];
  b._throttle = 80;
  b._maintainScroll = !1;
  b._beforeUpdate = null;
  b._afterUpdate = null;
  b._apply = function (a, f) {
    var c = d(a), e = [c], k = d(window).scrollTop(), l = d("html").outerHeight(!0), g = c.parents().filter(":hidden");
    g.css("display", "block");
    f && (c.each(function () {
      var a = d(this), b = "inline-block" === a.css("display") ? "inline-block" : "block";
      a.data("style-cache", a.attr("style"));
      a.css({
        display: b, "padding-top": "0", "padding-bottom": "0",
        "margin-top": "0", "margin-bottom": "0", "border-top-width": "0", "border-bottom-width": "0", height: "100px"
      })
    }), e = n(c), c.each(function () {
      var a = d(this);
      a.attr("style", a.data("style-cache") || "").css("height", "")
    }));
    d.each(e, function (a, b) {
      var c = d(b), e = 0;
      f && 1 >= c.length || (c.each(function () {
        var a = d(this), b = "inline-block" === a.css("display") ? "inline-block" : "block";
        a.css({display: b, height: ""});
        a.outerHeight(!1) > e && (e = a.outerHeight(!1));
        a.css("display", "")
      }), c.each(function () {
        var a = d(this), b = 0;
        "border-box" !== a.css("box-sizing") &&
        (b += h(a.css("border-top-width")) + h(a.css("border-bottom-width")), b += h(a.css("padding-top")) + h(a.css("padding-bottom")));
        a.css("height", e - b)
      }))
    });
    g.css("display", "");
    b._maintainScroll && d(window).scrollTop(k / l * d("html").outerHeight(!0));
    return this
  };
  b._applyDataApi = function () {
    var a = {};
    d("[data-match-height], [data-mh]").each(function () {
      var b = d(this), c = b.attr("data-match-height") || b.attr("data-mh");
      a[c] = c in a ? a[c].add(b) : b
    });
    d.each(a, function () {
      this.matchHeight(!0)
    })
  };
  var m = function (a) {
    b._beforeUpdate &&
    b._beforeUpdate(a, b._groups);
    d.each(b._groups, function () {
      b._apply(this.elements, this.byRow)
    });
    b._afterUpdate && b._afterUpdate(a, b._groups)
  };
  b._update = function (a, f) {
    if (f && "resize" === f.type) {
      var c = d(window).width();
      if (c === g)return;
      g = c
    }
    a ? -1 === e && (e = setTimeout(function () {
      m(f);
      e = -1
    }, b._throttle)) : m(f)
  };
  d(b._applyDataApi);
  d(window).bind("load", function (a) {
    b._update(!1, a)
  });
  d(window).bind("resize orientationchange", function (a) {
    b._update(!0, a)
  })
})(jQuery);