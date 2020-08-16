'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _reactMaterialize = require('react-materialize');

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _reactRemarkable = require('react-remarkable');

var _reactRemarkable2 = _interopRequireDefault(_reactRemarkable);

var _Body = require('./Body');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Edit = function (_Component) {
    _inherits(Edit, _Component);

    _createClass(Edit, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            _firebase2.default.database().ref("posts").orderByChild("titleForURL").equalTo(this.state.page).on("child_added", function (snap) {
                _this2.setState({
                    post: snap.val()
                });
            });
        }
    }]);

    function Edit() {
        _classCallCheck(this, Edit);

        var _this = _possibleConstructorReturn(this, (Edit.__proto__ || Object.getPrototypeOf(Edit)).call(this));

        _this.state = {
            page: window.location.pathname.slice(window.location.pathname.lastIndexOf("/") + 1, window.location.href),
            post: {
                title: "Title",
                html: "Hello **world**",
                metatags: "Post",
                date: date().today,
                imgURL: "",
                video: ""
            },
            postToEdit: "",
            postEdited: {
                title: "Title",
                html: "Hello **world**",
                metatags: "Post",
                date: date().today,
                imgURL: "",
                video: ""
            }
        };

        _this.deletePost = _this.deletePost.bind(_this);
        _this.editPost = _this.editPost.bind(_this);
        _this.newPost = _this.newPost.bind(_this);
        _this.changeMetaTags = _this.changeMetaTags.bind(_this);
        _this.changeTitle = _this.changeTitle.bind(_this);
        _this.changeImgURL = _this.changeImgURL.bind(_this);
        _this.changeDate = _this.changeDate.bind(_this);
        _this.changeVideoSRC = _this.changeVideoSRC.bind(_this);
        _this.uploadPost = _this.uploadPost.bind(_this);
        _this.reloadPost = _this.reloadPost.bind(_this);
        return _this;
    }

    _createClass(Edit, [{
        key: 'deletePost',
        value: function deletePost(e) {
            var key = e.currentTarget.dataset.value;
            var k = "";
            _firebase2.default.database().ref("posts").orderByChild("titleForURL").once("child_added", function (snap) {
                k = snap.key;
            }).then(function () {
                _firebase2.default.database().ref('posts/' + k).set({}).then(function () {
                    return alert("Borrado");
                }).catch(function (err) {
                    return console.log(err.message, "Error");
                });
            }).catch(function (err) {
                return console.log("Error", err.message);
            });
        }
    }, {
        key: 'editPost',
        value: function editPost(e) {
            this.setState({
                postToEdit: e.target.value
            });
            console.log(this.state.postToEdit);
        }
    }, {
        key: 'newPost',
        value: function newPost(e) {
            var postEdited = Object.assign({}, this.state.postEdited);
            postEdited.html = e.target.value;
            this.setState({ postEdited: postEdited });
            console.log(postEdited, "Changed");
        }
    }, {
        key: 'changeMetaTags',
        value: function changeMetaTags(e) {
            var postEdited = Object.assign({}, this.state.postEdited);
            postEdited.metatags = e.target.value;
            this.setState({ postEdited: postEdited });
            console.log(postEdited, "MetaTags");
        }
    }, {
        key: 'changeTitle',
        value: function changeTitle(e) {
            var postEdited = Object.assign({}, this.state.postEdited);
            var val = e.target.value;
            postEdited.title = eliminarDiacriticos(val);
            this.setState({ postEdited: postEdited });
            console.log(postEdited, "Title Changed");
        }
    }, {
        key: 'changeImgURL',
        value: function changeImgURL(e) {
            var postEdited = Object.assign({}, this.state.postEdited);
            var val = e.target.value;
            postEdited.imgURL = val;
            this.setState({ post: post });
            console.log(post, "imgURL Changed");
        }
    }, {
        key: 'changeDate',
        value: function changeDate(e) {
            var postEdited = Object.assign({}, this.state.postEdited);
            var val = e.target.value;
            postEdited.date = val;
            this.setState({ postEdited: postEdited });
            console.log(postEdited, "Date Changed");
        }
    }, {
        key: 'changeVideoSRC',
        value: function changeVideoSRC(e) {
            var postEdited = Object.assign({}, this.state.postEdited);
            var val = e.target.value;
            postEdited.video = getURLOutOfEmbbed(val);
            this.setState({ postEdited: postEdited });
            console.log(postEdited, "video Changed");
        }
    }, {
        key: 'changeAutocomplete',
        value: function changeAutocomplete(e) {
            this.setState({
                Autocomplete: e.target.value
            });
            console.log(this.state.Autocomplete);
        }
    }, {
        key: 'reloadPost',
        value: function reloadPost(e) {
            var _this3 = this;

            _firebase2.default.database().ref('posts').orderByChild("titleForURL").equalTo(e.currentTarget.dataset.key).once("child_added", function (snap) {
                _this3.setState({
                    post: snap.val()
                });
            }).then(function () {
                return console.log(_this3.state.postEdited);
            }).catch(function (err) {
                return console.log(err.message + "\nsomething happened");
            });
        }
    }, {
        key: 'uploadPost',
        value: function uploadPost(e) {
            var _this4 = this;

            var html = this.state.postEdited.html;
            var title = this.state.postEdited.title;
            var titleForURL = title.replace(/ /g, "-");
            var metatags = this.state.postEdited.metatags;
            var date = this.state.postEdited.date;
            var imgURL = this.state.postEdited.imgURL;
            var video = this.state.postEdited.video;
            console.log(html, title);
            _firebase2.default.database().ref("posts").push({
                title: title,
                html: html,
                metatags: metatags,
                titleForURL: titleForURL,
                date: date,
                imgURL: imgURL,
                video: video
            }).then(function (res) {
                console.log(_this4.state.postEdited.html, "Alright");
                alert("Posteado");
            }).catch(function (err) {
                alert(err.message + "Error");
            });
        }
    }, {
        key: 'render',
        value: function render(props) {
            var _this5 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(
                        'table',
                        null,
                        _react2.default.createElement(
                            'tr',
                            null,
                            _react2.default.createElement(
                                'th',
                                null,
                                'Titulo'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                'Fecha'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                'URL'
                            )
                        ),
                        this.props.posts.map(function (p, i) {
                            return _react2.default.createElement(
                                'tr',
                                { key: i },
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    p.title
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    p.date
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: "https://harvymosquera.co/blog/" + p.titleForURL },
                                        p.titleForURL
                                    )
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { className: 'red-text', id: p.i, 'data-value': p.titleForURL, href: '#', onClick: _this5.deletePost },
                                        _react2.default.createElement(
                                            'i',
                                            { className: 'material-icons' },
                                            'delete'
                                        )
                                    )
                                )
                            );
                        })
                    )
                )
            );
        }
    }]);

    return Edit;
}(_react.Component);

function FormatForPost(props) {
    return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
            'div',
            { className: 'MarkdownEditor' },
            _react2.default.createElement(
                'h3',
                null,
                'Input'
            ),
            _react2.default.createElement(
                'label',
                { htmlFor: 'markdown-content' },
                'Enter some markdown'
            ),
            _react2.default.createElement(
                'label',
                { htmlFor: 'title-of-markdown' },
                'Enter the title'
            ),
            _react2.default.createElement('input', { id: 'title-of-markdown', onChange: props.changeTitle, defaultValue: props.title, value: props.title }),
            _react2.default.createElement(
                'label',
                { htmlFor: 'metatags-of-markdown' },
                'Enter MetaTags separed by comas'
            ),
            _react2.default.createElement('input', { id: 'metatags-of-markdown', onChange: props.changeMetaTags, defaultValue: props.metaTags, value: props.metaTags }),
            _react2.default.createElement(
                'textarea',
                { className: 'textarea blog-post',
                    id: 'markdown-content',
                    onChange: props.function
                },
                function () {
                    console.log(props.source);
                    setInterval(function () {
                        return props.source;
                    }, 2000);
                }
            ),
            _react2.default.createElement('input', { onChange: props.changeDate }),
            _react2.default.createElement('input', { onChange: props.changeImgURL, placeholder: 'Url de la Imagen', value: props.imgURL }),
            _react2.default.createElement('input', { onChange: props.changeVideo, placeholder: 'Url del video', value: props.video }),
            _react2.default.createElement(
                'button',
                { className: 'btn hoverable waves-light center', onClick: props.sendToDB },
                'Enviar Post'
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
                'span',
                { className: 'tags' },
                props.metaTags
            ),
            _react2.default.createElement('img', { src: props.imgURL }),
            _react2.default.createElement(_reactRemarkable2.default, { source: props.source }),
            _react2.default.createElement('iframe', { width: '100%', src: props.video, frameborder: '0', allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture', allowfullscreen: true }),
            _react2.default.createElement(
                'span',
                { className: 'colored right bold' },
                props.date
            )
        )
    );
}

var today = "";
var month = "";
var month_day = "";
var dates = "";
function date() {
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = mm + '/' + dd + '/' + yyyy;
    month = mm;
    month_day = mm + '-' + dd;
    dates = {
        today: today,
        month: month,
        month_day: month_day
    };
    return dates;
}

function getURLOutOfEmbbed(url) {
    var u = url.lastIndexOf("/") + 1;
    var whole = url.slice(u, url.length);
    var youtubeLink = "https://www.youtube.com/embed/";
    return youtubeLink + whole;
}
function eliminarDiacriticos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}
exports.default = Edit;