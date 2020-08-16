'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Footer = exports.Nav = exports.WhereTo = exports.SocialMedia = exports.TwitterEmbbed = exports.HeaderForMobile = exports.Info = exports.WhatWeveDone = exports.MainNav = exports.About = exports.ItemCardToShow = exports.AutocompleteCustomed = exports.SliderMini = exports.FacebookPage = exports.Objective = exports.Entries = exports.Comments = exports.LastProjects = exports.MainProjects = exports.ParticipantsHandler = exports.Main = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _reactMaterialize = require('react-materialize');

var _reactRemarkable = require('react-remarkable');

var _reactRemarkable2 = _interopRequireDefault(_reactRemarkable);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _AutoComplete = require('material-ui/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _Participant = require('./Participant');

var _Participant2 = _interopRequireDefault(_Participant);

var _Judge = require('./Judge');

var _Judge2 = _interopRequireDefault(_Judge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import MyEditor from "./MyEditor"


var ParticipantsHandler = function (_Component) {
    _inherits(ParticipantsHandler, _Component);

    function ParticipantsHandler() {
        _classCallCheck(this, ParticipantsHandler);

        return _possibleConstructorReturn(this, (ParticipantsHandler.__proto__ || Object.getPrototypeOf(ParticipantsHandler)).apply(this, arguments));
    }

    _createClass(ParticipantsHandler, [{
        key: 'render',
        value: function render(props) {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'mini mini-m' },
                _react2.default.createElement(
                    'h4',
                    null,
                    props.contestName
                ),
                _react2.default.createElement(
                    'table',
                    { className: 'highlight table participants-judges-table participants' },
                    _react2.default.createElement(
                        'thead',
                        null,
                        _react2.default.createElement(
                            'th',
                            null,
                            'Name'
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            'School'
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            'Av. Score'
                        ),
                        _react2.default.createElement(
                            'th',
                            { className: 'hide-on-med-and-up' },
                            'Vote'
                        )
                    ),
                    _react2.default.createElement(
                        'tbody',
                        null,
                        _react2.default.createElement(
                            'tr',
                            null,
                            _react2.default.createElement(
                                'td',
                                null,
                                props.name
                            ),
                            _react2.default.createElement(
                                'td',
                                null,
                                props.group
                            ),
                            _react2.default.createElement(
                                'td',
                                null,
                                props.score
                            ),
                            _react2.default.createElement(
                                'td',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: '#vote-con-mobile', 'data-target': 'modal-vote-con', className: 'btn modal-trigger button-desktop-vote', onClick: function onClick() {
                                            _this2.setState({
                                                uid: props.uid
                                            });
                                        } },
                                    _react2.default.createElement(
                                        'i',
                                        { className: 'material-icons' },
                                        'person'
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ParticipantsHandler;
}(_react.Component);

var Nav = function (_Component2) {
    _inherits(Nav, _Component2);

    function Nav() {
        _classCallCheck(this, Nav);

        return _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).apply(this, arguments));
    }

    _createClass(Nav, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            InitializeAll();
        }
    }, {
        key: 'render',
        value: function render(props) {
            return _react2.default.createElement(
                'div',
                { className: 'navbar-fixed' },
                _react2.default.createElement(
                    'nav',
                    { className: 'nav not-animated' },
                    _react2.default.createElement(
                        'div',
                        { className: 'nav-wrapper' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'left' },
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: this.props.index, className: 'colored' },
                                    ' ',
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'bold' },
                                        'Linki | Project Your Ideas'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'ul',
                            { className: 'right' },
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: this.props.index, className: 'colored' },
                                    _react2.default.createElement(
                                        'i',
                                        { className: 'material-icons' },
                                        'home'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: this.props.posts, className: 'colored' },
                                    'Blog'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: this.props.about, className: 'colored' },
                                    'Acerca De'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Nav;
}(_react.Component);

var HeaderForMobile = function (_Component3) {
    _inherits(HeaderForMobile, _Component3);

    function HeaderForMobile() {
        _classCallCheck(this, HeaderForMobile);

        return _possibleConstructorReturn(this, (HeaderForMobile.__proto__ || Object.getPrototypeOf(HeaderForMobile)).apply(this, arguments));
    }

    _createClass(HeaderForMobile, [{
        key: 'render',
        value: function render(props) {
            return _react2.default.createElement(
                'header',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'navbar-fixed' },
                    _react2.default.createElement(
                        'nav',
                        { className: 'nav not-animated' },
                        _react2.default.createElement(
                            'div',
                            { className: 'nav-wrapper' },
                            _react2.default.createElement(
                                'ul',
                                { className: 'left' },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: this.props.index, className: 'colored' },
                                        ' ',
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'bold' },
                                            'Linki | Project Your Ideas'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'ul',
                                { className: 'right' },
                                _react2.default.createElement(Side, { user: this.props.user, loggedIn: this.props.loggedIn, login: this.props.login, logout: this.props.logout })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return HeaderForMobile;
}(_react.Component);

var Side = function (_Component4) {
    _inherits(Side, _Component4);

    function Side() {
        _classCallCheck(this, Side);

        return _possibleConstructorReturn(this, (Side.__proto__ || Object.getPrototypeOf(Side)).apply(this, arguments));
    }

    _createClass(Side, [{
        key: 'render',
        value: function render(props) {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _reactMaterialize.SideNav,
                    { trigger: _react2.default.createElement(
                            'a',
                            null,
                            _react2.default.createElement(
                                'i',
                                { className: 'material-icons' },
                                'menu'
                            )
                        ), options: { closeOnClick: true } },
                    _react2.default.createElement(
                        'a',
                        { href: '/', className: 'colored center title-sidenav' },
                        _react2.default.createElement(
                            'h5',
                            { className: 'colored' },
                            'Linki, Project Your Ideas'
                        )
                    ),
                    _react2.default.createElement(_reactMaterialize.SideNavItem, { divider: true, className: 'no-margin divider' }),
                    _react2.default.createElement(
                        _reactMaterialize.SideNavItem,
                        { href: '/', icon: 'home' },
                        'Home'
                    ),
                    _react2.default.createElement(
                        _reactMaterialize.SideNavItem,
                        { href: '/blog', icon: 'cloud' },
                        'Blog'
                    ),
                    _react2.default.createElement(
                        _reactMaterialize.SideNavItem,
                        { href: '/acercaDe', icon: 'person' },
                        'Acerca De'
                    ),
                    _react2.default.createElement(_reactMaterialize.SideNavItem, { divider: true })
                )
            );
        }
    }]);

    return Side;
}(_react.Component);

var Footer = function (_Component5) {
    _inherits(Footer, _Component5);

    function Footer() {
        _classCallCheck(this, Footer);

        return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
    }

    _createClass(Footer, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'footer',
                { className: 'row footer center' },
                _react2.default.createElement(
                    'div',
                    { className: 'col s12 m4' },
                    _react2.default.createElement(
                        'div',
                        { className: 'info' },
                        _react2.default.createElement(
                            'h5',
                            null,
                            'Contacto'
                        ),
                        _react2.default.createElement(
                            'ul',
                            null,
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: 'tel:3137307365' },
                                    '3137307365'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: 'tel:3116263711' },
                                    '3116263711'
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col s12 m4 center' },
                    _react2.default.createElement(
                        'h5',
                        null,
                        'Direcci\xF3n'
                    ),
                    _react2.default.createElement(
                        'ul',
                        null,
                        _react2.default.createElement(
                            'li',
                            null,
                            'Edificio Plaza San Fernando: Oficina 217'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'map center' },
                        _react2.default.createElement('iframe', { src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1293.0899858399412!2d-76.54567757374082!3d3.4280138418420076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x164a5706d1525386!2sSan+Fernando+Plaza+building!5e0!3m2!1sen!2sco!4v1557616652336!5m2!1sen!2sco', allowfullscreen: true })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col s12 m4' },
                    _react2.default.createElement(
                        'h5',
                        null,
                        'Dejanos tu informacion'
                    ),
                    _react2.default.createElement(
                        'form',
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'input-field' },
                            _react2.default.createElement('input', { type: 'text', id: 'form-name' }),
                            _react2.default.createElement(
                                'label',
                                { 'for': 'form-name' },
                                'Nombre'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'input-field' },
                            _react2.default.createElement('input', { type: 'text', id: 'form-phone-number' }),
                            _react2.default.createElement(
                                'label',
                                { 'for': 'form-phone-number' },
                                'Tel\xE9fono'
                            )
                        ),
                        _react2.default.createElement(
                            'button',
                            { className: 'btn hoverable waves-effect' },
                            'Enviar'
                        )
                    )
                )
            );
        }
    }]);

    return Footer;
}(_react.Component);

var WhereTo = function (_Component6) {
    _inherits(WhereTo, _Component6);

    function WhereTo() {
        _classCallCheck(this, WhereTo);

        var _this7 = _possibleConstructorReturn(this, (WhereTo.__proto__ || Object.getPrototypeOf(WhereTo)).call(this));

        _this7.state = {
            page: window.location.pathname
        };
        _this7.title = _this7.title.bind(_this7);
        return _this7;
    }

    _createClass(WhereTo, [{
        key: 'title',
        value: function title() {}
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'main-title white-text' },
                _react2.default.createElement(
                    'h1',
                    { clasName: 'bold white-text' },
                    this.state.page.substring(this.state.page.lastIndexOf("/") + 1) == "blog" ? _react2.default.createElement(
                        'h1',
                        null,
                        'Linki | Blog'
                    ) : null
                )
            );
        }
    }]);

    return WhereTo;
}(_react.Component);

var SocialMedia = function (_Component7) {
    _inherits(SocialMedia, _Component7);

    function SocialMedia() {
        _classCallCheck(this, SocialMedia);

        return _possibleConstructorReturn(this, (SocialMedia.__proto__ || Object.getPrototypeOf(SocialMedia)).apply(this, arguments));
    }

    _createClass(SocialMedia, [{
        key: 'render',
        value: function render(props) {
            return _react2.default.createElement(
                'div',
                { className: this.props.classes },
                _react2.default.createElement(
                    'ul',
                    null,
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'fb-share-button', 'data-href': this.props.URL, 'data-layout': 'box_count', 'data-size': 'small' },
                            _react2.default.createElement(
                                'a',
                                { target: '_blank', href: this.props.URL, className: 'fb-xfbml-parse-ignore' },
                                'Compartir'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'a',
                            { href: 'https://twitter.com/intent/tweet?text=Linki, Project Your Ideas ' + this.props.postTitle + " " + this.props.URL,
                                className: 'twitter-share-button', 'data-show-count': 'false' },
                            'Tweet'
                        )
                    )
                )
            );
        }
    }]);

    return SocialMedia;
}(_react.Component);

var TwitterEmbbed = function (_Component8) {
    _inherits(TwitterEmbbed, _Component8);

    function TwitterEmbbed() {
        _classCallCheck(this, TwitterEmbbed);

        return _possibleConstructorReturn(this, (TwitterEmbbed.__proto__ || Object.getPrototypeOf(TwitterEmbbed)).apply(this, arguments));
    }

    _createClass(TwitterEmbbed, [{
        key: 'render',
        value: function render(props) {
            return _react2.default.createElement(
                'div',
                { className: this.props.classes },
                _react2.default.createElement(
                    'a',
                    { className: 'twitter-timeline',
                        'data-chrome': 'nofooter noborders',
                        'data-height': this.props.height,
                        href: "https://twitter.com/" + this.props.user + "?ref_src=twsrc%5Etfw" },
                    'Tweets by ',
                    this.props.user
                )
            );
        }
    }]);

    return TwitterEmbbed;
}(_react.Component);

var FacebookPage = function (_Component9) {
    _inherits(FacebookPage, _Component9);

    function FacebookPage() {
        _classCallCheck(this, FacebookPage);

        return _possibleConstructorReturn(this, (FacebookPage.__proto__ || Object.getPrototypeOf(FacebookPage)).apply(this, arguments));
    }

    _createClass(FacebookPage, [{
        key: 'render',
        value: function render(props) {
            return _react2.default.createElement(
                'div',
                { className: 'fb-page ' + this.props.classes, 'data-href': 'https://www.facebook.com/Harvy-Mosquera-Todos-por-Cali-193290967379196/', 'data-tabs': 'timeline', 'data-width': '400', 'data-small-header': 'false', 'data-adapt-container-width': 'true', 'data-hide-cover': 'false', 'data-show-facepile': 'true', 'data-height': this.props.height },
                _react2.default.createElement(
                    'blockquote',
                    { cite: 'https://www.facebook.com/Harvy-Mosquera-Todos-por-Cali-193290967379196/', className: 'fb-xfbml-parse-ignore' },
                    _react2.default.createElement(
                        'a',
                        { href: 'https://www.facebook.com/Harvy-Mosquera-Todos-por-Cali-193290967379196/' },
                        'Linki - Todos por Cali'
                    )
                )
            );
        }
    }]);

    return FacebookPage;
}(_react.Component);

var WhatWeveDone = function (_Component10) {
    _inherits(WhatWeveDone, _Component10);

    function WhatWeveDone() {
        _classCallCheck(this, WhatWeveDone);

        var _this11 = _possibleConstructorReturn(this, (WhatWeveDone.__proto__ || Object.getPrototypeOf(WhatWeveDone)).call(this));

        _this11.state = {
            darken: false
        };
        return _this11;
    }

    _createClass(WhatWeveDone, [{
        key: 'render',
        value: function render(props) {
            return _react2.default.createElement(
                _reactMaterialize.Slider,
                null,
                _react2.default.createElement(
                    _reactMaterialize.Slide,
                    { image: _react2.default.createElement('img', { src: 'https://i.ibb.co/tqsmqc0/4.png', className: 'darken-img' }) },
                    _react2.default.createElement(
                        _reactMaterialize.Caption,
                        null,
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Project Your Ideas'
                        ),
                        _react2.default.createElement(
                            'h5',
                            { className: 'light grey-text text-lighten-3' },
                            'Sumando Esfuerzos Por una Cali Segura'
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactMaterialize.Slide,
                    { image: _react2.default.createElement('img', { src: 'https://i.ibb.co/CWcw91T/6.png', className: 'darken-img', onMouseOver: this.changeDarkenForImg }) },
                    _react2.default.createElement(
                        _reactMaterialize.Caption,
                        { placement: 'left' },
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Project Your Ideas'
                        ),
                        _react2.default.createElement(
                            'h5',
                            { className: 'light grey-text text-lighten-3' },
                            'Celebramos el D\xEDa de la Afrocolombianidad con gran Esperanza So\xF1amos una Cali segura, #lncluyente y Pr\xF3spera'
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactMaterialize.Slide,
                    { image: _react2.default.createElement('img', { src: 'https://i.ibb.co/gDQ55Qr/addedOne.jpg', className: 'darken-img', onMouseOver: this.changeDarkenForImg }) },
                    _react2.default.createElement(
                        _reactMaterialize.Caption,
                        { placement: 'right' },
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Project Your Ideas'
                        ),
                        _react2.default.createElement(
                            'h5',
                            { className: 'light grey-text text-lighten-3' },
                            'Por una Cali ',
                            _react2.default.createElement(
                                'span',
                                { className: 'bold' },
                                'Prospera, Incluyente y Segura'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactMaterialize.Slide,
                    { image: _react2.default.createElement('img', { src: 'https://i.ibb.co/z77CpN6/1.png', className: 'darken-img', onMouseOver: this.changeDarkenForImg }) },
                    _react2.default.createElement(
                        _reactMaterialize.Caption,
                        { placement: 'left' },
                        _react2.default.createElement(
                            'h5',
                            { className: 'light grey-text text-lighten-3' },
                            'para avanzar en la construcci\xF3n de una Cali m\xE1s Segura, Incluyente y Pr\xF3spera.'
                        )
                    )
                )
            );
        }
    }]);

    return WhatWeveDone;
}(_react.Component);

var Info = function (_Component11) {
    _inherits(Info, _Component11);

    function Info() {
        _classCallCheck(this, Info);

        return _possibleConstructorReturn(this, (Info.__proto__ || Object.getPrototypeOf(Info)).apply(this, arguments));
    }

    _createClass(Info, [{
        key: 'render',
        value: function render(props) {
            return _react2.default.createElement(
                'div',
                { className: 'col s12' },
                _react2.default.createElement(
                    'div',
                    { className: 'white info-main' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'title' },
                        '\xA1Linki!'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        'Concejal 2012 - 2015, ExDirector INPEC Regional Occidente, Gestor Social, Docente Universitario, Administrador de Empresas. ',
                        _react2.default.createElement('br', null),
                        ' ',
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'span',
                            { className: 'colored bold' },
                            'Project Your Ideas'
                        )
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'btn hoverable waves center white orange-text', href: '/acercaDe' },
                        'Sobre Nosotros'
                    )
                )
            );
        }
    }]);

    return Info;
}(_react.Component);

var About = function (_Component12) {
    _inherits(About, _Component12);

    function About() {
        _classCallCheck(this, About);

        return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).apply(this, arguments));
    }

    _createClass(About, [{
        key: 'render',
        value: function render(props) {
            return _react2.default.createElement(
                'div',
                { className: "card info-about " + this.props.classes },
                _react2.default.createElement(
                    'div',
                    { className: 'card-image' },
                    _react2.default.createElement('img', { src: './assets/logo-linki.png' })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'card-stacked' },
                    _react2.default.createElement(
                        'div',
                        { className: 'card-content' },
                        _react2.default.createElement(
                            'h3',
                            null,
                            'linki Mission'
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'p',
                            null,
                            'Linki mission is to embrace any kind of enterprenourship led by any kind of agent, letting them store their whole projects on a platform that will point big brands and potential investors to them.'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'card-action' },
                        _react2.default.createElement(
                            'a',
                            { href: 'https://www.facebook.com/pages/category/Politician/Harvy-Mosquera-Todos-por-Cali-193290967379196/' },
                            'Facebook'
                        ),
                        _react2.default.createElement(
                            'a',
                            { href: 'https://twitter.com/HARVYMOSQUERA' },
                            'Twitter'
                        )
                    )
                )
            );
        }
    }]);

    return About;
}(_react.Component);

var ItemCardToShow = function (_Component13) {
    _inherits(ItemCardToShow, _Component13);

    function ItemCardToShow() {
        _classCallCheck(this, ItemCardToShow);

        return _possibleConstructorReturn(this, (ItemCardToShow.__proto__ || Object.getPrototypeOf(ItemCardToShow)).apply(this, arguments));
    }

    _createClass(ItemCardToShow, [{
        key: 'render',
        value: function render(props) {
            return _react2.default.createElement(
                'div',
                { className: "card card-item " + this.props.classes },
                _react2.default.createElement(
                    'div',
                    { className: 'card-image' },
                    _react2.default.createElement('img', { src: this.props.imgSrc })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'card-stacked' },
                    _react2.default.createElement(
                        'h5',
                        null,
                        this.props.title
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'div',
                        { className: 'card-content' },
                        _react2.default.createElement(
                            'p',
                            null,
                            this.props.description
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'card-action' },
                        _react2.default.createElement(
                            'a',
                            { href: 'https://www.facebook.com/pages/category/Politician/Harvy-Mosquera-Todos-por-Cali-193290967379196/' },
                            'Facebook'
                        ),
                        _react2.default.createElement(
                            'a',
                            { href: 'https://twitter.com/HARVYMOSQUERA' },
                            'Twitter'
                        )
                    )
                )
            );
        }
    }]);

    return ItemCardToShow;
}(_react.Component);

var MainNav = function (_Component14) {
    _inherits(MainNav, _Component14);

    function MainNav() {
        _classCallCheck(this, MainNav);

        return _possibleConstructorReturn(this, (MainNav.__proto__ || Object.getPrototypeOf(MainNav)).apply(this, arguments));
    }

    _createClass(MainNav, [{
        key: 'render',
        value: function render(props) {
            return _react2.default.createElement(
                'div',
                { className: 'navbar-fixed' },
                _react2.default.createElement(
                    'nav',
                    { className: 'nav nav-animated' },
                    _react2.default.createElement(
                        'div',
                        { className: 'nav-wrapper' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'left' },
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: '#!' },
                                    ' ',
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'bold' },
                                        'Linki | Project Your Ideas'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'ul',
                            { className: 'right' },
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: this.props.index },
                                    _react2.default.createElement(
                                        'i',
                                        { className: 'material-icons' },
                                        'home'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: this.props.blog },
                                    'Blog'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: this.props.about },
                                    'Acerca De'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return MainNav;
}(_react.Component);

var AutocompleteCustomed = function (_Component15) {
    _inherits(AutocompleteCustomed, _Component15);

    _createClass(AutocompleteCustomed, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this17 = this;

            _firebase2.default.database().ref("posts").on("child_added", function (snap) {
                _this17.setState({
                    all: _this17.state.all.concat(snap.val())
                });
            });
        }
    }]);

    function AutocompleteCustomed() {
        _classCallCheck(this, AutocompleteCustomed);

        var _this16 = _possibleConstructorReturn(this, (AutocompleteCustomed.__proto__ || Object.getPrototypeOf(AutocompleteCustomed)).call(this));

        _this16.state = {
            all: []
        };
        _this16.toJson = _this16.toJson.bind(_this16);
        return _this16;
    }

    _createClass(AutocompleteCustomed, [{
        key: 'render',
        value: function render(props) {
            var dataSourceConfig = {
                text: 'textKey',
                value: 'valueKey'
            };
            console.log(this.toJson(this.state.all));
            return _react2.default.createElement(
                _MuiThemeProvider2.default,
                null,
                _react2.default.createElement(
                    'div',
                    { className: this.props.classes },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(_AutoComplete2.default, {
                            hintText: 'Buscar',
                            openOnFocus: true,
                            dataSource: this.toJson(this.state.all),
                            dataSourceConfig: dataSourceConfig,
                            onNewRequest: function onNewRequest(chosenRequest, index) {
                                return window.location.href = chosenRequest.valueKey;
                            },
                            filter: _AutoComplete2.default.fuzzyFilter,
                            maxSearchResults: 5
                        })
                    )
                )
            );
        }
    }, {
        key: 'toJson',
        value: function toJson(array) {
            var a = [];
            array.map(function (e, i) {
                a.push({ textKey: e.title, valueKey: 'https://linkii.web.app/blog/' + e.titleForURL });
            });
            return a;
        }
    }]);

    return AutocompleteCustomed;
}(_react.Component);

var Objective = function (_Component16) {
    _inherits(Objective, _Component16);

    function Objective() {
        _classCallCheck(this, Objective);

        return _possibleConstructorReturn(this, (Objective.__proto__ || Object.getPrototypeOf(Objective)).apply(this, arguments));
    }

    _createClass(Objective, [{
        key: 'render',
        value: function render(props) {
            return _react2.default.createElement(
                'div',
                { className: 's12 main-name' },
                _react2.default.createElement('span', { className: 'line-left line' }),
                _react2.default.createElement(
                    'h1',
                    { className: 'first-title colored' },
                    'Linki - Project Your Ideas'
                ),
                _react2.default.createElement('span', { className: 'line-right line' }),
                _react2.default.createElement(
                    'h1',
                    { className: 'first-subtitle' },
                    'Por una Cali ',
                    _react2.default.createElement(
                        'span',
                        { className: 'bold' },
                        'Segura, Incluyente y Prospera'
                    )
                )
            );
        }
    }]);

    return Objective;
}(_react.Component);

var SliderMini = function (_Component17) {
    _inherits(SliderMini, _Component17);

    function SliderMini() {
        _classCallCheck(this, SliderMini);

        return _possibleConstructorReturn(this, (SliderMini.__proto__ || Object.getPrototypeOf(SliderMini)).apply(this, arguments));
    }

    _createClass(SliderMini, [{
        key: 'render',
        value: function render(props) {
            return _react2.default.createElement(
                'div',
                { className: 'c-slider' },
                _react2.default.createElement(
                    'div',
                    { className: 'slider' },
                    _react2.default.createElement(
                        'section',
                        { className: 'jquery-responsive' },
                        _react2.default.createElement('img', { src: 'https://i.ibb.co/7WszS1p/1.png', alt: 'Imagen' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'caption slider-caption' },
                            _react2.default.createElement(
                                'h5',
                                null,
                                'Hola'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'Hola un subtitulo de Linki, Cali segura, incluyente y prospera'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'description' },
                            _react2.default.createElement(
                                'h3',
                                null,
                                '"Los Jovenes..."'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'bold' },
                                'Los J\xF3venes requieren Pol\xEDticas P\xFAblicas pertinentes que faciliten su desarrollo Acad\xE9mico y Laboral. En el Concejo Municipal 2020-2023 ser\xE1 nuestra prioridad.'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'section',
                        { className: 'jquery-responsive' },
                        _react2.default.createElement('img', { src: 'https://i.ibb.co/8DjGM3N/5.png', alt: 'Imagen' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'caption slider-caption' },
                            _react2.default.createElement(
                                'h5',
                                null,
                                'Hola'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'Hola un subtitulo de Linki, Cali segura, incluyente y prospera'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'description' },
                            _react2.default.createElement(
                                'h3',
                                null,
                                '"Avanzamos..."'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'bold' },
                                'Avanzamos en la construcci\xF3n de una Cali Segura, Incluyente y Pr\xF3spera.'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'section',
                        { className: 'jquery-responsive' },
                        _react2.default.createElement('img', { src: 'https://i.ibb.co/z77CpN6/1.png', alt: 'Imagen' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'caption slider-caption' },
                            _react2.default.createElement(
                                'h5',
                                null,
                                'Hola'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'Hola un subtitulo de Linki, Cali segura, incluyente y prospera'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'description' },
                            _react2.default.createElement(
                                'h3',
                                null,
                                '"Por..."'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'bold' },
                                'Por una Cultura Ciudadana soportada en Valores.'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'section',
                        { className: 'jquery-responsive' },
                        _react2.default.createElement('img', { src: 'https://i.ibb.co/tqsmqc0/4.png', alt: 'Imagen' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'caption slider-caption' },
                            _react2.default.createElement(
                                'h5',
                                null,
                                'Hola'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'Hola un subtitulo de Linki, Cali segura, incluyente y prospera'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'description' },
                            _react2.default.createElement(
                                'h3',
                                null,
                                '"Transparencia..."'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'bold' },
                                'Constancia y Transparencia en Nuestra Gesti\xF3n Social y Administrativa.'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SliderMini;
}(_react.Component);

var Subscribe = function (_Component18) {
    _inherits(Subscribe, _Component18);

    function Subscribe() {
        _classCallCheck(this, Subscribe);

        return _possibleConstructorReturn(this, (Subscribe.__proto__ || Object.getPrototypeOf(Subscribe)).apply(this, arguments));
    }

    _createClass(Subscribe, [{
        key: 'render',
        value: function render(props) {
            return _react2.default.createElement(
                'div',
                { className: 'col s12 m4' },
                _react2.default.createElement(
                    'h5',
                    null,
                    'Dejanos tu informacion'
                ),
                _react2.default.createElement(
                    'form',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'input-field' },
                        _react2.default.createElement('input', { type: 'text', id: 'form-name' }),
                        _react2.default.createElement(
                            'label',
                            { 'for': 'form-name' },
                            'Nombre'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'input-field' },
                        _react2.default.createElement('input', { type: 'text', id: 'form-phone-number' }),
                        _react2.default.createElement(
                            'label',
                            { 'for': 'form-phone-number' },
                            'Tel\xE9fono'
                        )
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'btn hoverable waves-effect' },
                        'Enviar'
                    )
                )
            );
        }
    }]);

    return Subscribe;
}(_react.Component);

var Entries = function (_Component19) {
    _inherits(Entries, _Component19);

    function Entries() {
        _classCallCheck(this, Entries);

        return _possibleConstructorReturn(this, (Entries.__proto__ || Object.getPrototypeOf(Entries)).apply(this, arguments));
    }

    _createClass(Entries, [{
        key: 'render',
        value: function render(props) {
            function replaceUnnecessary(el, first, second) {
                var all = el.html;
                var start = all.indexOf(first);
                var finish = all.indexOf(second, start);
                var whole = (all.slice(0, start) + all.slice(finish, all.length + 1)).replace(/#/g, "");
                return whole.slice(0, 100) + "...";
            }
            return _react2.default.createElement(
                'div',
                { className: 'flex-always posts-to-adv' },
                this.props.posts.slice(0, 3).map(function (p) {
                    return _react2.default.createElement(
                        'a',
                        { className: 'post-to-adv', href: "https://linkii.web.app/blog" + p.titleForURL },
                        _react2.default.createElement(
                            'div',
                            { className: 'card' },
                            _react2.default.createElement(
                                'div',
                                { className: 'card-image' },
                                _react2.default.createElement('img', { src: p.imgURL })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'card-content' },
                                _react2.default.createElement(
                                    'h1',
                                    { className: 'first-title' },
                                    p.title
                                ),
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    p.html
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'card-action' },
                                _react2.default.createElement(
                                    'a',
                                    { href: '#' },
                                    'This is a link'
                                )
                            )
                        )
                    );
                })
            );
        }
    }]);

    return Entries;
}(_react.Component);

var Comments = function (_Component20) {
    _inherits(Comments, _Component20);

    _createClass(Comments, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this23 = this;

            var postURL = this.state.page;
            _firebase2.default.database().ref("comments").orderByChild("titleForURL").equalTo(postURL).on("child_added", function (snap) {
                _this23.setState({
                    comments: _this23.state.comments.concat(snap.val())
                });
                console.log(snap.val());
            });
        }
    }]);

    function Comments() {
        _classCallCheck(this, Comments);

        var _this22 = _possibleConstructorReturn(this, (Comments.__proto__ || Object.getPrototypeOf(Comments)).call(this));

        _this22.state = {
            comments: [],
            page: eliminarDiacriticos(window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1))
        };
        return _this22;
    }

    _createClass(Comments, [{
        key: 'render',
        value: function render(props) {
            return _react2.default.createElement(
                'div',
                { className: this.props.classes },
                _react2.default.createElement(
                    'div',
                    { className: 'comments' },
                    _react2.default.createElement(MyEditor, {
                        button: true,
                        buttonValue: 'Enviar Comentario',
                        send: this.props.send,
                        onChangedMarkdown: this.props.onChangedMarkdown,
                        onFocus: this.props.onFocus
                    }),
                    _react2.default.createElement(
                        'div',
                        { className: 'all-comments' },
                        this.state.comments.map(function (el, i) {
                            return _react2.default.createElement(Comment, {
                                displayImg: el.displayImg,
                                displayName: el.user,
                                html: el.html
                            });
                        })
                    )
                )
            );
        }
    }]);

    return Comments;
}(_react.Component);

var Comment = function (_Component21) {
    _inherits(Comment, _Component21);

    function Comment() {
        _classCallCheck(this, Comment);

        return _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).apply(this, arguments));
    }

    _createClass(Comment, [{
        key: 'render',
        value: function render(props) {
            return _react2.default.createElement(
                'article',
                { className: 'comment' },
                _react2.default.createElement(
                    'div',
                    { className: 'user-info flex-always' },
                    _react2.default.createElement(
                        'div',
                        { className: 'user-img' },
                        _react2.default.createElement('img', { src: this.props.displayImg, alt: this.props.displayName, className: 'circle responsive-img' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'username' },
                        _react2.default.createElement(
                            'h5',
                            null,
                            this.props.displayName
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'markdown' },
                    _react2.default.createElement(_reactRemarkable2.default, { source: this.props.html })
                )
            );
        }
    }]);

    return Comment;
}(_react.Component);

var SearchBar = function (_Component22) {
    _inherits(SearchBar, _Component22);

    function SearchBar() {
        _classCallCheck(this, SearchBar);

        return _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).apply(this, arguments));
    }

    _createClass(SearchBar, [{
        key: 'render',
        value: function render(props) {
            var _this26 = this;

            return this.state.page == "/blog" && window.innerWidth < 600 ? _react2.default.createElement(AutocompleteCustomed, { classes: 'search-bar', data: this.state.data, 'function': this.changeAutocomplete, search: function search() {
                    _this26.autoCompletePostsName(_this26.state.posts);
                } }) : null;
        }
    }]);

    return SearchBar;
}(_react.Component);

var LastProjects = function (_Component23) {
    _inherits(LastProjects, _Component23);

    _createClass(LastProjects, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this28 = this;

            _firebase2.default.database().ref("projects").limitToFirst(this.state.limit).orderByChild(this.state.orderBy).on("child_added", function (snapshot) {
                _this28.setState({
                    projects: _this28.state.projects.concat(snapshot.val()) });
            });
        }
    }]);

    function LastProjects(props) {
        _classCallCheck(this, LastProjects);

        var _this27 = _possibleConstructorReturn(this, (LastProjects.__proto__ || Object.getPrototypeOf(LastProjects)).call(this, props));

        _this27.state = {
            projects: [],
            limit: _this27.props.limit,
            orderBy: _this27.props.orderBy,
            title: _this27.props.title,
            subtitle: _this27.props.subtitle
        };
        return _this27;
    }

    _createClass(LastProjects, [{
        key: 'render',
        value: function render(props) {
            return _react2.default.createElement(
                'div',
                { className: 'projects-container' },
                _react2.default.createElement(
                    'div',
                    { className: 'projects-con' },
                    _react2.default.createElement(
                        'div',
                        { className: 'projects-info' },
                        _react2.default.createElement(
                            'span',
                            { className: 'sub-wide-bar last-tree-projects' },
                            this.state.title
                        ),
                        _react2.default.createElement(
                            'a',
                            { href: '#last-projects' },
                            this.state.subtitle
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'projects' },
                        this.state.projects.map(function (t, i) {
                            return _react2.default.createElement(Projects, { key: i, name: t.name, description: t.description, img: t.img, by: t.by, owner: t.owner });
                        })
                    )
                )
            );
        }
    }]);

    return LastProjects;
}(_react.Component);

var MainProjects = function (_Component24) {
    _inherits(MainProjects, _Component24);

    function MainProjects(props) {
        _classCallCheck(this, MainProjects);

        var _this29 = _possibleConstructorReturn(this, (MainProjects.__proto__ || Object.getPrototypeOf(MainProjects)).call(this, props));

        _this29.state = {
            projects: [],
            limit: _this29.props.limit,
            orderBy: _this29.props.orderBy,
            title: _this29.props.title,
            subtitle: _this29.props.subtitle
        };
        return _this29;
    }

    _createClass(MainProjects, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this30 = this;

            _firebase2.default.database().ref("projects").limitToFirst(this.state.limit).orderByChild(this.state.orderBy).on("child_added", function (snapshot) {
                _this30.setState({
                    projects: _this30.state.projects.concat(snapshot.val()) });
            });
        }
    }, {
        key: 'render',
        value: function render(props) {
            return _react2.default.createElement(
                'div',
                { className: 'main-project' },
                _react2.default.createElement(
                    'span',
                    { className: 'sub-wide-bar' },
                    this.state.title
                ),
                this.state.projects.map(function (t, i) {
                    return _react2.default.createElement(Projects, { key: i, name: t.name, description: t.description, img: t.img, by: t.by, owner: t.owner });
                })
            );
        }
    }]);

    return MainProjects;
}(_react.Component);

function Main(props) {
    var _useState = (0, _react.useState)({
        form: props.form,
        info: props.info,
        personalCode: "",
        user: {},
        activeInfo: false,
        activeForm: true,
        groupInfo: {},
        contestInfo: []
    }),
        _useState2 = _slicedToArray(_useState, 2),
        state = _useState2[0],
        setState = _useState2[1];

    var handleAuth = function handleAuth(e) {
        e.preventDefault();
        _firebase2.default.database().ref('users').orderByChild("code").equalTo(parseInt(state.personalCode)).once("value").then(function (snap) {
            if (snap.val()) {
                var key = Object.keys(snap.val())[0];
                setState({
                    user: snap.val()[key],
                    activeInfo: true,
                    activeForm: false
                });
            } else {
                alert("El codigo no existe");
            }
        }).catch(function (err) {
            return console.log(err.message);
        });
    };

    var changeString = function changeString(ev) {
        ev.preventDefault();
        setState(Object.assign(state, {
            personalCode: ev.target.value
        }));
    };

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(
                'form',
                { className: "form-login-container" + (' ' + state.activeForm), onSubmit: handleAuth, method: 'post' },
                _react2.default.createElement(
                    'h3',
                    { className: 'center' },
                    'Inicia Sesi\xF3n'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-login' },
                    _react2.default.createElement('input', { placeholder: 'Type here your personal code', onChange: changeString }),
                    _react2.default.createElement('input', { type: 'submit', className: 'btn hoverable waves-light btn-form', value: 'Login' })
                )
            )
        ),
        state.activeInfo ? _react2.default.createElement(ShowPerCategory, { state: state }) : ""
    );
}

function ShowPerCategory(props) {
    if (props.state.user.rol == 3) {
        return _react2.default.createElement(_Participant2.default, _extends({ user: props.state.user }, props.state.user, props.state.contestInfo));
    } else if (props.state.user.rol == 4) {
        return _react2.default.createElement(_Participant2.default, _extends({ user: props.state.user }, props.state.user, props.state.contestInfo));
    } else if (props.state.user.rol == 2) {
        return _react2.default.createElement(_Judge2.default, _extends({ user: props.state.user }, props.state.user, props.state.contestInfo));
    }
}

function Projects(props) {
    return _react2.default.createElement(
        'div',
        { className: 'project', key: props.key },
        _react2.default.createElement('img', { src: props.img, className: 'img img-project' }),
        _react2.default.createElement(
            'div',
            { className: 'project-info' },
            _react2.default.createElement(
                'h4',
                null,
                props.name
            ),
            _react2.default.createElement(
                'p',
                null,
                props.description
            ),
            _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                    'a',
                    { className: 'grey-text by project-by', href: props.owner },
                    props.by
                )
            )
        )
    );
}
function eliminarDiacriticos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}
function InitializeAll() {
    var dropdown = document.getElementsByClassName('dropdown-trigger');
    M.AutoInit();
}
exports.Main = Main;
exports.ParticipantsHandler = ParticipantsHandler;
exports.MainProjects = MainProjects;
exports.LastProjects = LastProjects;
exports.Comments = Comments;
exports.Entries = Entries;
exports.Objective = Objective;
exports.FacebookPage = FacebookPage;
exports.SliderMini = SliderMini;
exports.AutocompleteCustomed = AutocompleteCustomed;
exports.ItemCardToShow = ItemCardToShow;
exports.About = About;
exports.MainNav = MainNav;
exports.WhatWeveDone = WhatWeveDone;
exports.Info = Info;
exports.HeaderForMobile = HeaderForMobile;
exports.TwitterEmbbed = TwitterEmbbed;
exports.SocialMedia = SocialMedia;
exports.WhereTo = WhereTo;
exports.Nav = Nav;
exports.Footer = Footer;