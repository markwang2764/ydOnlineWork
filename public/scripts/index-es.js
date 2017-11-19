'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PraiseButton = function () {
    function PraiseButton(num, element) {
        _classCallCheck(this, PraiseButton);

        this.num = num;
        this.element = element;
    }
    // 下面这个方法应该封装到外面 import进来


    _createClass(PraiseButton, [{
        key: 'throttle',
        value: function throttle(method, context) {
            clearTimeout(method.tId);
            method.tId = setTimeout(function () {
                method.call(context);
            }, 200);
        }
    }, {
        key: 'clickAction',
        value: function clickAction() {
            var _this = this;

            this.element.click(function () {
                _this.throttle(_this.praiseLogic, _this);
            });
        }
    }, {
        key: 'praiseLogic',
        value: function praiseLogic() {
            if (this.num < 10) {
                this.element.css('-webkit-filter', 'grayscale(0)');
                $('.hide').addClass('num');
                this.num++;
                setTimeout(function () {
                    $('.hide').removeClass('num');
                }, 1000);
            } else {
                this.element.css('-webkit-filter', 'grayscale(1)');
                this.num = 0;
            }
            console.log(this.num);
        }
    }]);

    return PraiseButton;
}();

var Thumb = function (_PraiseButton) {
    _inherits(Thumb, _PraiseButton);

    function Thumb(num, element) {
        _classCallCheck(this, Thumb);

        return _possibleConstructorReturn(this, (Thumb.__proto__ || Object.getPrototypeOf(Thumb)).call(this, num, element));
    }

    return Thumb;
}(PraiseButton);

exports.default = {
    Thumb: Thumb
};
