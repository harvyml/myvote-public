'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMaterialize = require('react-materialize');

var _reactLazyload = require('react-lazyload');

var _reactLazyload2 = _interopRequireDefault(_reactLazyload);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading() {
    return _react2.default.createElement(
        'div',
        { className: 'participant loading' },
        _react2.default.createElement(
            'h5',
            null,
            'Loading contest...'
        )
    );
};
function Participant(props) {
    var _useReducer = (0, _react.useReducer)(reducer, {}),
        _useReducer2 = _slicedToArray(_useReducer, 2),
        contest = _useReducer2[0],
        setContest = _useReducer2[1];

    var _useReducer3 = (0, _react.useReducer)(reducer, 0),
        _useReducer4 = _slicedToArray(_useReducer3, 2),
        contestKeys = _useReducer4[0],
        setContestKeys = _useReducer4[1];

    var _useReducer5 = (0, _react.useReducer)(reducer, 0),
        _useReducer6 = _slicedToArray(_useReducer5, 2),
        participantsKeys = _useReducer6[0],
        setParticipants = _useReducer6[1];

    var _useReducer7 = (0, _react.useReducer)(reducer, []),
        _useReducer8 = _slicedToArray(_useReducer7, 2),
        allGroups = _useReducer8[0],
        setAllGroups = _useReducer8[1];

    var _useReducer9 = (0, _react.useReducer)(reducer, [""]),
        _useReducer10 = _slicedToArray(_useReducer9, 2),
        categories = _useReducer10[0],
        setCategories = _useReducer10[1];

    function reducer(state, action) {
        return action;
    }

    function bringGroupInfo(contest) {
        _firebase2.default.database().ref('contest/' + contest + '/').once("value").then(function (snap) {
            if (snap.val()) {
                setContest(Object.assign(contest, snap.val().info));
                setCategories(Object.assign(categories, snap.val().info.categories));
                setContestKeys(Object.keys(snap.val()).length - 1); // Keys minus one because of the "info" node
                //===== Groups ======
                var keys = Object.keys(snap.val());
                for (var i = 0; i < keys.length; i++) {
                    setAllGroups(Object.assign(allGroups, snap.val()));
                }
            }
        }).catch(function (err) {
            return console.log("ERROR: -----> " + err.message);
        });
    }

    function bringParticipants(contest) {
        _firebase2.default.database().ref('users/').orderByChild("contest").equalTo(contest).once("value").then(function (snap) {
            if (snap.val()) {
                setParticipants(Object.keys(snap.val()).length);
            }
        }).catch(function (err) {
            return console.log("ERROR: -----> " + err.message);
        });
    }

    (0, _react.useEffect)(function () {
        reducer(bringGroupInfo(props.user.contest));
        reducer(bringParticipants(props.user.contest));
    }, [props.user]);

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            { className: 'main-row row' },
            _react2.default.createElement(UserInfo, props.user),
            _react2.default.createElement(
                'div',
                { className: 'customed-container' },
                _react2.default.createElement(
                    'div',
                    { className: 'col s12 m6 l6' },
                    _react2.default.createElement(
                        'div',
                        { className: 'mini mini-m' },
                        _react2.default.createElement(
                            'div',
                            { className: 'contest-info' },
                            _react2.default.createElement(
                                'h5',
                                null,
                                contest.name
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                contest.description
                            )
                        ),
                        _react2.default.createElement(
                            'ul',
                            null,
                            _react2.default.createElement(
                                'li',
                                null,
                                'Number of Groups: ',
                                contestKeys
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                'Number of participants: ',
                                participantsKeys - contestKeys
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactLazyload2.default,
                    { key: props.user.contest, placeholder: _react2.default.createElement(Loading, null) },
                    _react2.default.createElement(InfoPerCategory, { contestName: contest.name, contestCode: props.user.contest, allGroups: allGroups, categories: categories })
                )
            )
        )
    );
}

function UserInfo(props) {
    return _react2.default.createElement(
        'div',
        { className: 'customed-container' },
        _react2.default.createElement(
            'div',
            { className: 'col s12 m6 l6' },
            _react2.default.createElement(
                'div',
                { className: 'mini mini-m' },
                _react2.default.createElement(
                    'h5',
                    null,
                    props.name
                ),
                _react2.default.createElement(
                    'ul',
                    null,
                    _react2.default.createElement(
                        'li',
                        null,
                        defineRol(props.rol)
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        'Phone: ',
                        props.phone
                    )
                )
            )
        )
    );
}

function defineRol(rol) {
    if (rol == 1) {
        return "Manager";
    } else if (rol == 2) {
        return "Judge";
    } else if (rol == 3) {
        return "Participant";
    } else if (rol == 4) {
        return "Group";
    } else {
        return "Not Defined Rol";
    }
}

function InfoPerCategory(props) {
    var _useState = (0, _react.useState)([]),
        _useState2 = _slicedToArray(_useState, 2),
        categories = _useState2[0],
        setCategories = _useState2[1];

    var _useReducer11 = (0, _react.useReducer)(reducer, 0),
        _useReducer12 = _slicedToArray(_useReducer11, 2),
        category = _useReducer12[0],
        setCategory = _useReducer12[1];

    var _useReducer13 = (0, _react.useReducer)(reducer, {}),
        _useReducer14 = _slicedToArray(_useReducer13, 2),
        allGroupsM = _useReducer14[0],
        setAllGroupsM = _useReducer14[1]; //The "M" stands for modified


    var _useReducer15 = (0, _react.useReducer)(reducer, false),
        _useReducer16 = _slicedToArray(_useReducer15, 2),
        ready = _useReducer16[0],
        setReady = _useReducer16[1];

    var _useReducer17 = (0, _react.useReducer)(reducer, {}),
        _useReducer18 = _slicedToArray(_useReducer17, 2),
        scores = _useReducer18[0],
        setScores = _useReducer18[1];

    function reducer(state, action) {
        return action;
    }

    function modifyAllGroups(category) {
        var keys;
        if (ready) {
            _firebase2.default.database().ref('contest/' + props.contestCode + '/').orderByChild("category").equalTo(category).once("value").then(function (snap) {
                keys = snap.val() ? Object.keys(snap.val()) : "";
                if (snap.val()) {
                    if (snap.val()[keys]) {
                        setAllGroupsM(snap.val());
                        setReady(false);
                    } else {
                        setAllGroupsM({});
                        setAllGroupsM(snap.val());
                    }
                }
            }).catch(function (err) {
                console.log(err.message);
                setAllGroupsM(["No Groups In This Category"]);
            });
        } else {
            setAllGroupsM({});
        }
    }
    (0, _react.useEffect)(function () {
        setCategories(props.categories);
    }, [props.contest], [categories]);
    (0, _react.useEffect)(function () {
        console.log(category, allGroupsM, scores);
    }, [category]);
    (0, _react.useEffect)(function () {
        if (ready) {
            modifyAllGroups(1000000);
            modifyAllGroups(category);
        } else {
            modifyAllGroups(category);
        }
    }, [category], [ready]);

    return _react2.default.createElement(
        'div',
        { className: 'col s12 m12 l12' },
        _react2.default.createElement(
            'div',
            { className: 'mini mini-m' },
            _react2.default.createElement(
                'div',
                { className: 'contest-info flex' },
                _react2.default.createElement(
                    'h4',
                    null,
                    props.contestName
                ),
                _react2.default.createElement(
                    _reactMaterialize.Dropdown,
                    {
                        options: {
                            alignment: 'left',
                            autoTrigger: true,
                            closeOnClick: true,
                            constrainWidth: true,
                            container: null,
                            coverTrigger: true,
                            hover: false,
                            inDuration: 150,
                            onCloseEnd: null,
                            onCloseStart: null,
                            onOpenEnd: null,
                            onOpenStart: null,
                            outDuration: 250
                        },
                        trigger: _react2.default.createElement(
                            _reactMaterialize.Button,
                            { node: 'button', className: 'categories-dropdown' },
                            'Category'
                        )
                    },
                    categories.map(function (t, i) {
                        var k = i + 1; //i+1 because the first element in dropdown is an empty category
                        return _react2.default.createElement(
                            'a',
                            { key: k, onClick: function onClick() {
                                    setReady(true);
                                    setCategory(k);
                                } },
                            t
                        );
                    })
                )
            ),
            _react2.default.createElement(
                'table',
                { className: 'highlight table participants-judges-table participants' },
                _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                        'td',
                        null,
                        'Group'
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        'Code'
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        'Current Score'
                    )
                ),
                _react2.default.createElement(
                    'tbody',
                    null,
                    Object.keys(allGroupsM).map(function (key) {
                        var t = allGroupsM[key];
                        var j = 0;
                        var scoreKeys = Object.keys(t.scores);
                        scoreKeys.forEach(function (scg) {
                            var sc = t.scores[scg];
                            j += sc;
                        });
                        var average = (j / scoreKeys.length).toFixed(2);
                        return _react2.default.createElement(
                            'tr',
                            { key: t.code },
                            _react2.default.createElement(
                                'td',
                                null,
                                t.name
                            ),
                            _react2.default.createElement(
                                'td',
                                null,
                                t.code
                            ),
                            _react2.default.createElement(
                                'td',
                                null,
                                average
                            )
                        );
                    })
                )
            )
        )
    );
}

exports.default = Participant;