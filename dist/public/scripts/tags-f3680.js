webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
module.exports = __webpack_require__(6);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(0);

var f = new _index.Thumb();
xtag.register('x-praise', {
  content: '<div id="thumb" class="hand">' + '<div class="arm"></div>' + '<div class="finger"></div>' + '<div class="finger"></div>' + '</div>' + '<span class="total">0</span>' + '<span id="animation" class="hide">+1</span>',
  lifecycle: {
    created: function created() {},
    inserted: function inserted() {},
    removed: function removed() {},
    attributeChanged: function attributeChanged() {}
  },
  methods: {
    praise: function praise() {
      var _this = this;
      f.clickAction();
      var animation = _this.querySelector('#animation');
      animation.className = 'hide num';
      setTimeout(function () {
        animation.className = 'hide';
      }, 800);
    }
  },
  accessors: {
    someAccessor: {
      // links to the 'some-accessor' attribute
      attribute: {},
      set: function set() {},
      get: function get() {}
    }
  },
  events: {
    tap: function tap() {},
    focus: function focus() {},
    click: function click(e) {
      var _this = this;
      if (e.target.id == 'thumb') {
        var t = "";
        if (t) {
          clearTimeout(t);
        }
        t = setTimeout(function () {
          _this.praise();
        }, 500);
      }
    }
  }
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(0);

var f = new _index.Star();
xtag.register('x-star', {
  content: '<div id="star" class="star">' + '<div class="star1"></div>' + '</div>' + '<span id="animation" class="hide">+1</span>',
  lifecycle: {
    created: function created() {},
    inserted: function inserted() {},
    removed: function removed() {},
    attributeChanged: function attributeChanged() {}
  },
  methods: {
    praise: function praise() {
      var _this = this;
      f.clickAction();
      var animation = _this.querySelector('#animation');
      animation.className = 'hide num';
      setTimeout(function () {
        animation.className = 'hide';
      }, 800);
    }
  },
  accessors: {
    someAccessor: {
      // links to the 'some-accessor' attribute
      attribute: {},
      set: function set() {},
      get: function get() {}
    }
  },
  events: {
    tap: function tap() {},
    focus: function focus() {},
    click: function click(e) {
      var _this = this;
      if (e.target.id == 'star') {
        var t = "";
        if (t) {
          clearTimeout(t);
        }
        t = setTimeout(function () {
          _this.praise();
        }, 500);
      }
    }
  }
});

/***/ })
],[4]);