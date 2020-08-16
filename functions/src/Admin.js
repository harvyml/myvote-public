'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var firebaseConfig = {
    apiKey: "AIzaSyAon2l7MexGkcaM2xkhMZ_JCBvdt_YPmwA",
    authDomain: "myvote-sandbox.firebaseapp.com",
    databaseURL: "https://myvote-sandbox.firebaseio.com",
    projectId: "myvote-sandbox",
    storageBucket: "myvote-sandbox.appspot.com",
    messagingSenderId: "763004420769",
    appId: "1:763004420769:web:e7081df0e5352c979d26e0",
    measurementId: "G-9HP4E6HPZC"
};

_firebase2.default.initializeApp(firebaseConfig);

var Admin = function (_Component) {
    _inherits(Admin, _Component);

    _createClass(Admin, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            _firebase2.default.auth().onAuthStateChanged(function (user) {
                _this2.setState({ user: user });
            });
            _firebase2.default.database().ref("users").once("child_added", function (snap) {
                _this2.setState({
                    participants: _this2.state.participants.concat(snap.val())
                });
            });
        }
    }]);

    function Admin(props) {
        _classCallCheck(this, Admin);

        var _this = _possibleConstructorReturn(this, (Admin.__proto__ || Object.getPrototypeOf(Admin)).call(this, props));

        _this.state = {
            user: null,
            limit: 1,
            participant: {},
            participants: [],
            contest: {}
        };
        _this.showNav = _this.showNav.bind(_this);
        return _this;
    }

    _createClass(Admin, [{
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
                return _react2.default.createElement(_Body.HeaderForMobile, { index: '/' });
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
                        this.showNav()
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row separated-from-top' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col s12 m8 l8 container-main-projects' },
                        _react2.default.createElement(
                            'div',
                            { className: 'participants-table-container' },
                            this.state.participants.map(function (t, i) {
                                return _react2.default.createElement(_Body.ParticipantsHandler, { contestName: 'Spme' });
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col s12 m4 l4 aside-container-main-projects' },
                        _react2.default.createElement(
                            'div',
                            { className: 'mini mini-m' },
                            _react2.default.createElement(
                                'h4',
                                null,
                                'Name of contest'
                            ),
                            _react2.default.createElement(
                                'ul',
                                null,
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Number of schools: 1'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    'Number of participants: 5'
                                ),
                                _react2.default.createElement('li', null),
                                _react2.default.createElement('li', null)
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col s12 m12 l12' },
                        _react2.default.createElement(
                            'div',
                            { className: 'container-project-story' },
                            _react2.default.createElement('div', { className: 'project-story' })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'modal-vote-con', className: 'modal' },
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-content' },
                            _react2.default.createElement(
                                'h4',
                                null,
                                'Vote for ',
                                _react2.default.createElement('span', { className: 'participant-name' })
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'Average score: ',
                                _react2.default.createElement('span', { className: 'participant-av' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'vote-con-mobile-modal white' },
                                _react2.default.createElement(
                                    'ul',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: '', className: '1' },
                                        '1'
                                    ),
                                    _react2.default.createElement(
                                        'a',
                                        { href: '', className: '2' },
                                        '2'
                                    ),
                                    _react2.default.createElement(
                                        'a',
                                        { href: '', className: '3' },
                                        '3'
                                    ),
                                    _react2.default.createElement(
                                        'a',
                                        { href: '', className: '4' },
                                        '4'
                                    ),
                                    _react2.default.createElement(
                                        'a',
                                        { href: '', className: '5' },
                                        '5'
                                    ),
                                    _react2.default.createElement(
                                        'a',
                                        { href: '', className: '6' },
                                        '6'
                                    ),
                                    _react2.default.createElement(
                                        'a',
                                        { href: '', className: '7' },
                                        '7'
                                    ),
                                    _react2.default.createElement(
                                        'a',
                                        { href: '', className: '8' },
                                        '8'
                                    ),
                                    _react2.default.createElement(
                                        'a',
                                        { href: '', className: '9' },
                                        '9'
                                    ),
                                    _react2.default.createElement(
                                        'a',
                                        { href: '', className: '10' },
                                        '10'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-footer' },
                            _react2.default.createElement(
                                'a',
                                { href: '#!', className: 'modal-close waves-effect waves-green btn-flat' },
                                'Agree'
                            )
                        )
                    )
                ),
                _react2.default.createElement(_Body.Footer, null)
            );
        }
    }]);

    return Admin;
}(_react.Component);

exports.default = Admin;