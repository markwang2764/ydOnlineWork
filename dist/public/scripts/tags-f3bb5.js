webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Star = exports.Thumb = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PraiseButton = function () {
  function PraiseButton() {
    _classCallCheck(this, PraiseButton);
  }

  _createClass(PraiseButton, [{
    key: 'clickAction',
    value: function clickAction() {
      axios.get('/index/update').then(function (response) {
        var num = response.data.data;
        $('.total').text(num);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }]);

  return PraiseButton;
}();

var Thumb = function (_PraiseButton) {
  _inherits(Thumb, _PraiseButton);

  function Thumb() {
    _classCallCheck(this, Thumb);

    return _possibleConstructorReturn(this, (Thumb.__proto__ || Object.getPrototypeOf(Thumb)).call(this));
  }

  return Thumb;
}(PraiseButton);

var Star = function (_PraiseButton2) {
  _inherits(Star, _PraiseButton2);

  function Star() {
    _classCallCheck(this, Star);

    return _possibleConstructorReturn(this, (Star.__proto__ || Object.getPrototypeOf(Star)).call(this));
  }

  return Star;
}(PraiseButton);

exports.Thumb = Thumb;
exports.Star = Star;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
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