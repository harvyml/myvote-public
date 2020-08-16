'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pulseEditor = require('./pulse-editor');

var _buttons = require('./pulse-editor/buttons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyEditor = function (_Component) {
  _inherits(MyEditor, _Component);

  function MyEditor() {
    _classCallCheck(this, MyEditor);

    return _possibleConstructorReturn(this, (MyEditor.__proto__ || Object.getPrototypeOf(MyEditor)).apply(this, arguments));
  }

  _createClass(MyEditor, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { onSubmit: this.props.onSubmit },
        _react2.default.createElement(
          _pulseEditor.Editor,
          {
            name: 'main-editor',
            defaultValue: this.props.defaultValue,
            onChange: this.props.onChange ? this.props.onChange : this.props.onChangedMarkdown,
            onDrop: this.props.onDrop,
            editorRef: this.props.editorRef,
            onFocus: this.props.onFocus
          },
          _react2.default.createElement(
            _pulseEditor.ButtonBar,
            null,
            _react2.default.createElement(
              _pulseEditor.ButtonGroup,
              null,
              _react2.default.createElement(
                _buttons.Bold,
                null,
                _react2.default.createElement(
                  'strong',
                  null,
                  'N'
                )
              ),
              _react2.default.createElement(
                _buttons.Italic,
                null,
                _react2.default.createElement(
                  'em',
                  null,
                  'I'
                )
              )
            ),
            _react2.default.createElement(
              _pulseEditor.ButtonGroup,
              null,
              _react2.default.createElement(
                _buttons.Code,
                null,
                'Insertar Codigo'
              ),
              _react2.default.createElement(
                _buttons.Link,
                null,
                'Link'
              ),
              _react2.default.createElement(
                _buttons.Image,
                null,
                'Imagen'
              )
            ),
            _react2.default.createElement(
              _pulseEditor.ButtonGroup,
              null,
              _react2.default.createElement(
                _buttons.OrderedList,
                null,
                '1.'
              ),
              _react2.default.createElement(
                _buttons.UnorderedList,
                null,
                '\xB0'
              ),
              _react2.default.createElement(
                _buttons.Quote,
                null,
                'Frase'
              ),
              _react2.default.createElement(
                _buttons.Heading,
                null,
                'T'
              ),
              _react2.default.createElement(
                _buttons.Youtube,
                null,
                'YT'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'main-markdown-fields' },
            _react2.default.createElement(_pulseEditor.Field, { style: { height: '39px' } }),
            _react2.default.createElement(_pulseEditor.Preview, null)
          )
        ),
        this.props.button ? _react2.default.createElement(
          'button',
          { type: 'button', className: 'btn hoverable waves', onClick: this.props.send },
          this.props.buttonValue
        ) : null
      );
    }
  }]);

  return MyEditor;
}(_react.Component);

exports.default = MyEditor;