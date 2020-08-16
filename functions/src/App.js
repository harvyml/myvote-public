'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _reactMaterialize = require('react-materialize');

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _Body = require('./Body');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const config = {
//   apiKey: "AIzaSyAon2l7MexGkcaM2xkhMZ_JCBvdt_YPmwA",
//   authDomain: "myvote-sandbox.firebaseapp.com",
//   databaseURL: "https://myvote-sandbox.firebaseio.com",
//   projectId: "myvote-sandbox",
//   storageBucket: "myvote-sandbox.appspot.com",
//   messagingSenderId: "763004420769",
//   appId: "1:763004420769:web:e7081df0e5352c979d26e0",
//   measurementId: "G-9HP4E6HPZC"
// }
// firebase.initializeApp(config)

var App = function (_Component) {
  _inherits(App, _Component);

  _createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      _firebase2.default.auth().onAuthStateChanged(function (user) {
        _this2.setState({ user: user });
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      console.log(this.state.form, this.state.info, this.state.personalCode);
    }
  }]);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      user: null,
      page: window.location.pathname,
      projects: [],
      personalCode: "",
      rol: {},
      form: true,
      info: false
    };
    _this.handleAuth = _this.handleAuth.bind(_this);
    _this.changeMarginFromTop = _this.changeMarginFromTop.bind(_this);
    _this.showNav = _this.showNav.bind(_this);
    _this.send = _this.send.bind(_this);
    _this.inputOnChange = _this.inputOnChange.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'send',
    value: function send() {
      try {
        _firebase2.default.database().ref("comments").push({
          html: this.state.comment,
          displayImg: this.state.user.photoURL,
          titleForURL: this.state.page,
          user: this.state.user.displayName,
          email: this.state.user.email,
          uid: this.state.user.uid,
          date: date().today
        });
      } catch (err) {
        alert("Inicia Sesión para enviar un comentario");
      }
    }
  }, {
    key: 'handleAuth',
    value: function handleAuth() {
      var _this3 = this;

      _firebase2.default.database().ref("users").orderByChild("code").equalTo(parseInt(this.state.personalCode)).once("value").then(function (snap) {
        var k = Object.keys(snap.val())[0];
        _this3.setState({
          rol: snap.val()[k].rol
        });
      }).then(function () {
        _this3.setState({
          form: false,
          info: true
        });
        console.log(_this3.state.rol);
      }).catch(function (err) {
        return console.log(err.message);
      });
    }
  }, {
    key: 'inputOnChange',
    value: function inputOnChange(e) {
      this.setState({
        personalCode: e.target.value
      });
    }
  }, {
    key: 'changeMarginFromTop',
    value: function changeMarginFromTop() {
      if (window.innerWidth <= 500 && this.state.page == "/blog") {
        return "separated-from-top posts-container col s12 m12 l12";
      } else if (this.state.page == "/newPost") {
        return "col s12 m12 l12";
      } else if (this.state.page == "/blog" && window.innerWidth >= 500) {
        return "col s12 m9 l9 separated-from-top";
      } else {
        return "col s12 m12 l12";
      }
    }
  }, {
    key: 'showNav',
    value: function showNav() {
      if (window.innerWidth > 790) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_Body.Nav, { index: '../../',
            posts: '../blog',
            about: '../acercaDe',
            user: this.state.user
          })
        );
      } else if (window.innerWidth < 790) {
        return _react2.default.createElement(_Body.HeaderForMobile, { index: '/', loggedIn: this.state.user ? true : false, login: this.signInWithGoogle, logout: this.logout });
      }
    }
    //---------------- Functions -----------------------------

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactAddonsCssTransitionGroup2.default,
        { transitionName: 'anim', transitionAppear: true, transitionAppearTimeout: 5000, transitionEnter: false, transitionLeave: false },
        _react2.default.createElement(
          'div',
          { className: 'App' },
          _react2.default.createElement(
            'header',
            null,
            this.showNav()
          ),
          _react2.default.createElement(
            'div',
            { className: "separated-from-top section white" },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(_Body.Main, {
                form: this.state.form,
                info: this.state.info,
                code: this.state.code
              })
            )
          )
        ),
        _react2.default.createElement(_Body.Footer, null)
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;