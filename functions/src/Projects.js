'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Body = require('./Body');

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _reactMaterialize = require('react-materialize');

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Projects = function (_Component) {
    _inherits(Projects, _Component);

    _createClass(Projects, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            _firebase2.default.auth().onAuthStateChanged(function (user) {
                _this2.setState({ user: user });
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            _firebase2.default.auth().onAuthStateChanged(function (user) {
                if (user) {
                    var user = user;
                    console.log("Logueado", user.displayName);
                    if ((typeof user === 'undefined' ? 'undefined' : _typeof(user)) == 'object') {
                        _this3.setState({
                            user: user
                        });
                        _firebase2.default.database().ref("users").update({
                            user: user
                        });
                        console.log('User: \n ' + _this3.state.user);
                    } else {
                        console.log("Not Array");
                    }
                } else {
                    console.log("Not logged In");
                    _this3.setState({
                        user: false
                    });
                }
            });
        }
    }]);

    function Projects(props) {
        _classCallCheck(this, Projects);

        var _this = _possibleConstructorReturn(this, (Projects.__proto__ || Object.getPrototypeOf(Projects)).call(this, props));

        _this.state = {
            user: null,
            limit: 1
        };
        _this.signInWithGoogle = _this.signInWithGoogle.bind(_this);
        _this.logout = _this.logout.bind(_this);
        _this.showNav = _this.showNav.bind(_this);
        return _this;
    }

    //---------------- Functions -------------------------------


    _createClass(Projects, [{
        key: 'signInWithGoogle',
        value: function signInWithGoogle() {
            var provider = new _firebase2.default.auth.GoogleAuthProvider();
            _firebase2.default.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                console.log(credential, errorCode, errorMessage, email);
            });
        }
    }, {
        key: 'logout',
        value: function logout() {
            var _this4 = this;

            _firebase2.default.auth().signOut().then(function (result) {
                _this4.setState({
                    user: false
                });
                console.log(_this4.state.user);
            });
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
                        loggedIn: this.state.user ? true : false,
                        login: this.signInWithGoogle,
                        logout: this.logout,
                        user: this.state.user
                    })
                );
            } else if (window.innerWidth < 790) {
                return _react2.default.createElement(_Body.HeaderForMobile, { index: '/', loggedIn: this.state.user ? true : false, login: this.signInWithGoogle, logout: this.logout });
            }
        }

        //============================================================================  

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
                        this.showNav(),
                        _react2.default.createElement(_reactMaterialize.Parallax, {
                            image: _react2.default.createElement('img', { alt: '', src: 'http://materializecss.com/images/parallax1.jpg' }),
                            options: {
                                responsiveThreshold: 0
                            }
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col s12 m6 l6 container-main-projects' },
                        _react2.default.createElement(
                            'div',
                            { className: 'main-projects-con' },
                            _react2.default.createElement(_Body.MainProjects, { limit: 1, orderBy: 'likes', title: 'FEATURED PROJECT' })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col m6 l6 hide-on-med-and-down aside-container-main-projects' },
                        _react2.default.createElement(
                            'div',
                            { className: 'container-aside-projects' },
                            _react2.default.createElement(
                                'span',
                                { className: 'sub-wide-bar' },
                                'Most Viewed'
                            ),
                            _react2.default.createElement(_Body.MainProjects, { limit: 2, orderBy: 'views' })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'separated-from-top' },
                    _react2.default.createElement(_Body.LastProjects, { title: 'Last Projects: ', subtitle: 'See all projects', limit: 3, orderBy: 'likes' })
                )
            );
        }
    }]);

    return Projects;
}(_react.Component);

function ScrollableProjects(props) {
    var _useState = (0, _react.useState)(1),
        _useState2 = _slicedToArray(_useState, 2),
        limit = _useState2[0],
        setLimit = _useState2[1];

    (0, _react.useEffect)(function () {
        window.onscroll = function (ev) {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                //bottom of the page
                setLimit(limit + 15);
                console.log(limit);
            } else {
                console.log("nothing");
            }
        };
        console.log(limit);
        return limit;
    });
}

exports.default = Projects;