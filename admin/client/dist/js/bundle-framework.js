(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f;
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
        }
        return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
})({
    1: [ function(require, module, exports) {
        "use strict";
        var _jQuery = require("jQuery");
        var _jQuery2 = _interopRequireDefault(_jQuery);
        var _reactDom = require("react-dom");
        var _reactDom2 = _interopRequireDefault(_reactDom);
        var _redux = require("redux");
        var _reduxThunk = require("redux-thunk");
        var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
        var _reduxLogger = require("redux-logger");
        var _reduxLogger2 = _interopRequireDefault(_reduxLogger);
        var _Config = require("lib/Config");
        var _Config2 = _interopRequireDefault(_Config);
        var _Router = require("lib/Router");
        var _Router2 = _interopRequireDefault(_Router);
        var _RouteRegister = require("lib/RouteRegister");
        var _RouteRegister2 = _interopRequireDefault(_RouteRegister);
        var _ReducerRegister = require("lib/ReducerRegister");
        var _ReducerRegister2 = _interopRequireDefault(_ReducerRegister);
        var _ConfigActions = require("state/config/ConfigActions");
        var configActions = _interopRequireWildcard(_ConfigActions);
        var _ConfigReducer = require("state/config/ConfigReducer");
        var _ConfigReducer2 = _interopRequireDefault(_ConfigReducer);
        var _FormReducer = require("state/form/FormReducer");
        var _FormReducer2 = _interopRequireDefault(_FormReducer);
        var _SchemaReducer = require("state/schema/SchemaReducer");
        var _SchemaReducer2 = _interopRequireDefault(_SchemaReducer);
        var _RecordsReducer = require("state/records/RecordsReducer");
        var _RecordsReducer2 = _interopRequireDefault(_RecordsReducer);
        var _CampaignReducer = require("state/campaign/CampaignReducer");
        var _CampaignReducer2 = _interopRequireDefault(_CampaignReducer);
        var _BreadcrumbsReducer = require("state/breadcrumbs/BreadcrumbsReducer");
        var _BreadcrumbsReducer2 = _interopRequireDefault(_BreadcrumbsReducer);
        var _controller = require("containers/CampaignAdmin/controller");
        var _controller2 = _interopRequireDefault(_controller);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                    }
                }
                newObj.default = obj;
                return newObj;
            }
        }
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function getBasePath() {
            var a = document.createElement("a");
            a.href = document.getElementsByTagName("base")[0].href;
            var basePath = a.pathname;
            basePath = basePath.replace(/\/$/, "");
            if (basePath.match(/^[^\/]/)) {
                basePath = "/" + basePath;
            }
            return basePath;
        }
        function appBoot() {
            _ReducerRegister2.default.add("config", _ConfigReducer2.default);
            _ReducerRegister2.default.add("form", _FormReducer2.default);
            _ReducerRegister2.default.add("schemas", _SchemaReducer2.default);
            _ReducerRegister2.default.add("records", _RecordsReducer2.default);
            _ReducerRegister2.default.add("campaign", _CampaignReducer2.default);
            _ReducerRegister2.default.add("breadcrumbs", _BreadcrumbsReducer2.default);
            var initialState = {};
            var rootReducer = (0, _redux.combineReducers)(_ReducerRegister2.default.getAll());
            var middleware = [ _reduxThunk2.default ];
            if (window.ss.config.environment === "dev") {
                middleware.push((0, _reduxLogger2.default)());
            }
            var createStoreWithMiddleware = _redux.applyMiddleware.apply(undefined, middleware)(_redux.createStore);
            var store = createStoreWithMiddleware(rootReducer, initialState);
            store.dispatch(configActions.setConfig(window.ss.config));
            _Router2.default.base(getBasePath());
            (0, _Router2.default)("*", function(ctx, next) {
                ctx.store = store;
                next();
            });
            _Router2.default.exit("*", function(ctx, next) {
                _reactDom2.default.unmountComponentAtNode(document.getElementsByClassName("cms-content")[0]);
                next();
            });
            _Config2.default.getTopLevelRoutes().forEach(function(route) {
                _RouteRegister2.default.add("/" + route + "(/*?)?", function(ctx, next) {
                    if (document.readyState !== "complete" || ctx.init) {
                        next();
                        return;
                    }
                    (0, _jQuery2.default)(".cms-container").entwine("ss").handleStateChange(null, ctx.state).done(next);
                });
            });
            var registeredRoutes = _RouteRegister2.default.getAll();
            for (var route in registeredRoutes) {
                if (registeredRoutes.hasOwnProperty(route)) {
                    (0, _Router2.default)(route, registeredRoutes[route]);
                }
            }
            _Router2.default.start();
        }
        window.onload = appBoot;
    }, {
        "containers/CampaignAdmin/controller": 10,
        jQuery: "jQuery",
        "lib/Config": 12,
        "lib/ReducerRegister": "lib/ReducerRegister",
        "lib/RouteRegister": 13,
        "lib/Router": 14,
        "react-dom": "react-dom",
        redux: "redux",
        "redux-logger": 43,
        "redux-thunk": "redux-thunk",
        "state/breadcrumbs/BreadcrumbsReducer": 17,
        "state/campaign/CampaignReducer": 20,
        "state/config/ConfigActions": 22,
        "state/config/ConfigReducer": 23,
        "state/form/FormReducer": 25,
        "state/records/RecordsReducer": 28,
        "state/schema/SchemaReducer": 30
    } ],
    2: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _react = require("react");
        var _react2 = _interopRequireDefault(_react);
        var _SilverStripeComponent = require("lib/SilverStripeComponent");
        var _SilverStripeComponent2 = _interopRequireDefault(_SilverStripeComponent);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _defaults(obj, defaults) {
            var keys = Object.getOwnPropertyNames(defaults);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = Object.getOwnPropertyDescriptor(defaults, key);
                if (value && value.configurable && obj[key] === undefined) {
                    Object.defineProperty(obj, key, value);
                }
            }
            return obj;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
        }
        var Accordion = function(_SilverStripeComponen) {
            _inherits(Accordion, _SilverStripeComponen);
            function Accordion() {
                _classCallCheck(this, Accordion);
                return _possibleConstructorReturn(this, _SilverStripeComponen.apply(this, arguments));
            }
            Accordion.prototype.render = function render() {
                return _react2.default.createElement("div", {
                    className: "accordion",
                    role: "tablist",
                    "aria-multiselectable": "true"
                }, this.props.children);
            };
            return Accordion;
        }(_SilverStripeComponent2.default);
        exports.default = Accordion;
    }, {
        "lib/SilverStripeComponent": "lib/SilverStripeComponent",
        react: "react"
    } ],
    3: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _react = require("react");
        var _react2 = _interopRequireDefault(_react);
        var _SilverStripeComponent = require("lib/SilverStripeComponent");
        var _SilverStripeComponent2 = _interopRequireDefault(_SilverStripeComponent);
        require("bootstrap-collapse");
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _defaults(obj, defaults) {
            var keys = Object.getOwnPropertyNames(defaults);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = Object.getOwnPropertyDescriptor(defaults, key);
                if (value && value.configurable && obj[key] === undefined) {
                    Object.defineProperty(obj, key, value);
                }
            }
            return obj;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
        }
        var AccordionBlock = function(_SilverStripeComponen) {
            _inherits(AccordionBlock, _SilverStripeComponen);
            function AccordionBlock() {
                _classCallCheck(this, AccordionBlock);
                return _possibleConstructorReturn(this, _SilverStripeComponen.apply(this, arguments));
            }
            AccordionBlock.prototype.render = function render() {
                var headerID = this.props.groupid + "_Header";
                var listID = this.props.groupid + "_Items";
                var href = "#" + listID;
                var groupProps = {
                    id: listID,
                    "aria-expanded": true,
                    className: "list-group list-group-flush collapse in",
                    role: "tabpanel",
                    "aria-labelledby": headerID
                };
                return _react2.default.createElement("div", {
                    className: "accordion__block"
                }, _react2.default.createElement("a", {
                    className: "accordion__title",
                    "data-toggle": "collapse",
                    href: href,
                    "aria-expanded": "true",
                    "aria-controls": listID,
                    id: headerID,
                    role: "tab"
                }, this.props.title), _react2.default.createElement("div", groupProps, this.props.children));
            };
            return AccordionBlock;
        }(_SilverStripeComponent2.default);
        exports.default = AccordionBlock;
    }, {
        "bootstrap-collapse": "bootstrap-collapse",
        "lib/SilverStripeComponent": "lib/SilverStripeComponent",
        react: "react"
    } ],
    4: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _react = require("react");
        var _react2 = _interopRequireDefault(_react);
        var _SilverStripeComponent = require("lib/SilverStripeComponent");
        var _SilverStripeComponent2 = _interopRequireDefault(_SilverStripeComponent);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _defaults(obj, defaults) {
            var keys = Object.getOwnPropertyNames(defaults);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = Object.getOwnPropertyDescriptor(defaults, key);
                if (value && value.configurable && obj[key] === undefined) {
                    Object.defineProperty(obj, key, value);
                }
            }
            return obj;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
        }
        var Breadcrumb = function(_SilverStripeComponen) {
            _inherits(Breadcrumb, _SilverStripeComponen);
            function Breadcrumb() {
                _classCallCheck(this, Breadcrumb);
                return _possibleConstructorReturn(this, _SilverStripeComponen.apply(this, arguments));
            }
            Breadcrumb.prototype.render = function render() {
                return _react2.default.createElement("ol", {
                    className: "breadcrumb"
                }, this.getBreadcrumbs());
            };
            Breadcrumb.prototype.getBreadcrumbs = function getBreadcrumbs() {
                if (typeof this.props.crumbs === "undefined") {
                    return null;
                }
                return [].concat(this.props.crumbs.slice(0, -1).map(function(crumb, index) {
                    return [ _react2.default.createElement("li", {
                        className: "breadcrumb__item"
                    }, _react2.default.createElement("a", {
                        key: index,
                        className: "breadcrumb__item-title",
                        href: crumb.href
                    }, crumb.text)) ];
                }), this.props.crumbs.slice(-1).map(function(crumb, index) {
                    return [ _react2.default.createElement("li", {
                        className: "breadcrumb__item breadcrumb__item--last"
                    }, _react2.default.createElement("h2", {
                        className: "breadcrumb__item-title breadcrumb__item-title--last",
                        key: index
                    }, crumb.text)) ];
                }));
            };
            return Breadcrumb;
        }(_SilverStripeComponent2.default);
        Breadcrumb.propTypes = {
            crumbs: _react2.default.PropTypes.array
        };
        exports.default = Breadcrumb;
    }, {
        "lib/SilverStripeComponent": "lib/SilverStripeComponent",
        react: "react"
    } ],
    5: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _react = require("react");
        var _react2 = _interopRequireDefault(_react);
        var _SilverStripeComponent = require("lib/SilverStripeComponent");
        var _SilverStripeComponent2 = _interopRequireDefault(_SilverStripeComponent);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _defaults(obj, defaults) {
            var keys = Object.getOwnPropertyNames(defaults);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = Object.getOwnPropertyDescriptor(defaults, key);
                if (value && value.configurable && obj[key] === undefined) {
                    Object.defineProperty(obj, key, value);
                }
            }
            return obj;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
        }
        var ListGroupItem = function(_SilverStripeComponen) {
            _inherits(ListGroupItem, _SilverStripeComponen);
            function ListGroupItem(props) {
                _classCallCheck(this, ListGroupItem);
                var _this = _possibleConstructorReturn(this, _SilverStripeComponen.call(this, props));
                _this.handleClick = _this.handleClick.bind(_this);
                return _this;
            }
            ListGroupItem.prototype.render = function render() {
                var className = "list-group-item " + this.props.className;
                return _react2.default.createElement("a", {
                    tabIndex: "0",
                    className: className,
                    onClick: this.handleClick
                }, this.props.children);
            };
            ListGroupItem.prototype.handleClick = function handleClick(event) {
                if (this.props.handleClick) {
                    this.props.handleClick(event, this.props.handleClickArg);
                }
            };
            return ListGroupItem;
        }(_SilverStripeComponent2.default);
        ListGroupItem.propTypes = {
            handleClickArg: _react2.default.PropTypes.any,
            handleClick: _react2.default.PropTypes.func
        };
        exports.default = ListGroupItem;
    }, {
        "lib/SilverStripeComponent": "lib/SilverStripeComponent",
        react: "react"
    } ],
    6: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _react = require("react");
        var _react2 = _interopRequireDefault(_react);
        var _i18n = require("i18n");
        var _i18n2 = _interopRequireDefault(_i18n);
        var _SilverStripeComponent = require("lib/SilverStripeComponent");
        var _SilverStripeComponent2 = _interopRequireDefault(_SilverStripeComponent);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _defaults(obj, defaults) {
            var keys = Object.getOwnPropertyNames(defaults);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = Object.getOwnPropertyDescriptor(defaults, key);
                if (value && value.configurable && obj[key] === undefined) {
                    Object.defineProperty(obj, key, value);
                }
            }
            return obj;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
        }
        var Preview = function(_SilverStripeComponen) {
            _inherits(Preview, _SilverStripeComponen);
            function Preview() {
                _classCallCheck(this, Preview);
                return _possibleConstructorReturn(this, _SilverStripeComponen.apply(this, arguments));
            }
            Preview.prototype.render = function render() {
                var body = null;
                var previewUrl = null;
                var previewType = "";
                if (this.props.itemLinks && this.props.itemLinks.preview) {
                    if (this.props.itemLinks.preview.Stage) {
                        previewUrl = this.props.itemLinks.preview.Stage.href;
                        previewType = this.props.itemLinks.preview.Stage.type;
                    } else if (this.props.itemLinks.preview.Live) {
                        previewUrl = this.props.itemLinks.preview.Live.href;
                        previewType = this.props.itemLinks.preview.Live.type;
                    }
                }
                var editUrl = null;
                var editKey = "edit";
                var toolbarButtons = [];
                if (this.props.itemLinks && this.props.itemLinks.edit) {
                    editUrl = this.props.itemLinks.edit.href;
                    toolbarButtons.push(_react2.default.createElement("a", {
                        key: editKey,
                        href: editUrl,
                        className: "btn btn-secondary-outline font-icon-edit"
                    }, _react2.default.createElement("span", {
                        className: "btn__title"
                    }, _i18n2.default._t("Preview.EDIT", "Edit"))));
                }
                if (!this.props.itemId) {
                    body = _react2.default.createElement("div", {
                        className: "preview__overlay"
                    }, _react2.default.createElement("h3", {
                        className: "preview__overlay-text"
                    }, "No preview available."));
                } else if (!previewUrl) {
                    body = _react2.default.createElement("div", {
                        className: "preview__overlay"
                    }, _react2.default.createElement("h3", {
                        className: "preview__overlay-text"
                    }, "There is no preview available for this item."));
                } else if (previewType && previewType.indexOf("image/") === 0) {
                    body = _react2.default.createElement("div", {
                        className: "preview__file-container panel-scrollable"
                    }, _react2.default.createElement("img", {
                        alt: previewUrl,
                        className: "preview__file--fits-space",
                        src: previewUrl
                    }));
                } else {
                    body = _react2.default.createElement("iframe", {
                        className: "preview__iframe",
                        src: previewUrl
                    });
                }
                return _react2.default.createElement("div", {
                    className: "cms-content__right preview"
                }, body, _react2.default.createElement("a", {
                    href: "",
                    className: "cms-content__back-btn font-icon-left-open-big"
                }), _react2.default.createElement("div", {
                    className: "toolbar--south"
                }, _react2.default.createElement("div", {
                    className: "btn-toolbar"
                }, toolbarButtons)));
            };
            return Preview;
        }(_SilverStripeComponent2.default);
        Preview.propTypes = {
            itemLinks: _react2.default.PropTypes.object,
            itemId: _react2.default.PropTypes.number
        };
        exports.default = Preview;
    }, {
        i18n: "i18n",
        "lib/SilverStripeComponent": "lib/SilverStripeComponent",
        react: "react"
    } ],
    7: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
        var _react = require("react");
        var _react2 = _interopRequireDefault(_react);
        var _reactRedux = require("react-redux");
        var _redux = require("redux");
        var _Backend = require("lib/Backend");
        var _Backend2 = _interopRequireDefault(_Backend);
        var _BreadcrumbsActions = require("state/breadcrumbs/BreadcrumbsActions");
        var breadcrumbsActions = _interopRequireWildcard(_BreadcrumbsActions);
        var _Breadcrumb = require("components/Breadcrumb/Breadcrumb");
        var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);
        var _Router = require("lib/Router");
        var _Router2 = _interopRequireDefault(_Router);
        var _SilverStripeComponent = require("lib/SilverStripeComponent");
        var _SilverStripeComponent2 = _interopRequireDefault(_SilverStripeComponent);
        var _FormAction = require("components/FormAction/FormAction");
        var _FormAction2 = _interopRequireDefault(_FormAction);
        var _i18n = require("i18n");
        var _i18n2 = _interopRequireDefault(_i18n);
        var _Toolbar = require("components/Toolbar/Toolbar");
        var _Toolbar2 = _interopRequireDefault(_Toolbar);
        var _FormBuilder = require("components/FormBuilder/FormBuilder");
        var _FormBuilder2 = _interopRequireDefault(_FormBuilder);
        var _CampaignAdminList = require("./CampaignAdminList");
        var _CampaignAdminList2 = _interopRequireDefault(_CampaignAdminList);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                    }
                }
                newObj.default = obj;
                return newObj;
            }
        }
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _defaults(obj, defaults) {
            var keys = Object.getOwnPropertyNames(defaults);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = Object.getOwnPropertyDescriptor(defaults, key);
                if (value && value.configurable && obj[key] === undefined) {
                    Object.defineProperty(obj, key, value);
                }
            }
            return obj;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
        }
        var CampaignAdmin = function(_SilverStripeComponen) {
            _inherits(CampaignAdmin, _SilverStripeComponen);
            function CampaignAdmin(props) {
                _classCallCheck(this, CampaignAdmin);
                var _this = _possibleConstructorReturn(this, _SilverStripeComponen.call(this, props));
                _this.addCampaign = _this.addCampaign.bind(_this);
                _this.publishApi = _Backend2.default.createEndpointFetcher({
                    url: _this.props.sectionConfig.publishEndpoint.url,
                    method: _this.props.sectionConfig.publishEndpoint.method,
                    defaultData: {
                        SecurityID: _this.props.securityId
                    },
                    payloadSchema: {
                        id: {
                            urlReplacement: ":id",
                            remove: true
                        }
                    }
                });
                _this.campaignListCreateFn = _this.campaignListCreateFn.bind(_this);
                _this.campaignAddCreateFn = _this.campaignAddCreateFn.bind(_this);
                _this.campaignEditCreateFn = _this.campaignEditCreateFn.bind(_this);
                _this.handleBackButtonClick = _this.handleBackButtonClick.bind(_this);
                return _this;
            }
            CampaignAdmin.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
                var hasChangedRoute = this.props.campaignId !== props.campaignId || this.props.view !== props.view;
                if (hasChangedRoute) {
                    this.setBreadcrumbs(props.view, props.campaignId);
                }
            };
            CampaignAdmin.prototype.setBreadcrumbs = function setBreadcrumbs(view, id) {
                var breadcrumbs = [ {
                    text: _i18n2.default._t("Campaigns.CAMPAIGN", "Campaigns"),
                    href: this.props.sectionConfig.route
                } ];
                switch (view) {
                  case "show":
                    break;

                  case "edit":
                    breadcrumbs.push({
                        text: _i18n2.default._t("Campaigns.EDIT_CAMPAIGN", "Editing Campaign"),
                        href: this.getActionRoute(id, view)
                    });
                    break;

                  case "create":
                    breadcrumbs.push({
                        text: _i18n2.default._t("Campaigns.ADD_CAMPAIGN", "Add Campaign"),
                        href: this.getActionRoute(id, view)
                    });
                    break;

                  default:
                    break;
                }
                this.props.breadcrumbsActions.setBreadcrumbs(breadcrumbs);
            };
            CampaignAdmin.prototype.handleBackButtonClick = function handleBackButtonClick(event) {
                if (this.props.breadcrumbs.length > 1) {
                    var last = this.props.breadcrumbs[this.props.breadcrumbs.length - 2];
                    if (last && last.href) {
                        event.preventDefault();
                        window.ss.router.show(last.href);
                        return;
                    }
                }
            };
            CampaignAdmin.prototype.render = function render() {
                var view = null;
                switch (this.props.view) {
                  case "show":
                    view = this.renderItemListView();
                    break;

                  case "edit":
                    view = this.renderDetailEditView();
                    break;

                  case "create":
                    view = this.renderCreateView();
                    break;

                  default:
                    view = this.renderIndexView();
                }
                return view;
            };
            CampaignAdmin.prototype.renderIndexView = function renderIndexView() {
                var schemaUrl = this.props.sectionConfig.form.EditForm.schemaUrl;
                var formActionProps = {
                    label: _i18n2.default._t("Campaigns.ADDCAMPAIGN"),
                    icon: "plus",
                    handleClick: this.addCampaign
                };
                var formBuilderProps = {
                    createFn: this.campaignListCreateFn,
                    schemaUrl: schemaUrl
                };
                return _react2.default.createElement("div", {
                    className: "cms-content__inner no-preview"
                }, _react2.default.createElement("div", {
                    className: "cms-content__left cms-campaigns collapse in",
                    "aria-expanded": "true"
                }, _react2.default.createElement(_Toolbar2.default, null, _react2.default.createElement(_Breadcrumb2.default, {
                    multiline: true,
                    crumbs: this.props.breadcrumbs
                })), _react2.default.createElement("div", {
                    className: "panel-scrollable panel-scrollable--single-toolbar"
                }, _react2.default.createElement("div", {
                    className: "toolbar--content"
                }, _react2.default.createElement("div", {
                    className: "btn-toolbar"
                }, _react2.default.createElement(_FormAction2.default, formActionProps))), _react2.default.createElement("div", {
                    className: "campaign-admin container-fluid"
                }, _react2.default.createElement(_FormBuilder2.default, formBuilderProps)))));
            };
            CampaignAdmin.prototype.renderItemListView = function renderItemListView() {
                var props = {
                    sectionConfig: this.props.sectionConfig,
                    campaignId: this.props.campaignId,
                    itemListViewEndpoint: this.props.sectionConfig.itemListViewEndpoint,
                    publishApi: this.publishApi,
                    handleBackButtonClick: this.handleBackButtonClick
                };
                return _react2.default.createElement(_CampaignAdminList2.default, props);
            };
            CampaignAdmin.prototype.renderDetailEditView = function renderDetailEditView() {
                var baseSchemaUrl = this.props.sectionConfig.form.DetailEditForm.schemaUrl;
                var formBuilderProps = {
                    createFn: this.campaignEditCreateFn,
                    schemaUrl: baseSchemaUrl + "/ChangeSet/" + this.props.campaignId
                };
                return _react2.default.createElement("div", {
                    className: "cms-content__inner"
                }, _react2.default.createElement(_Toolbar2.default, {
                    showBackButton: true,
                    handleBackButtonClick: this.handleBackButtonClick
                }, _react2.default.createElement(_Breadcrumb2.default, {
                    multiline: true,
                    crumbs: this.props.breadcrumbs
                })), _react2.default.createElement("div", {
                    className: "panel-scrollable panel-scrollable--single-toolbar container-fluid m-t-1"
                }, _react2.default.createElement("div", {
                    className: "form--inline"
                }, _react2.default.createElement(_FormBuilder2.default, formBuilderProps))));
            };
            CampaignAdmin.prototype.renderCreateView = function renderCreateView() {
                var baseSchemaUrl = this.props.sectionConfig.form.DetailEditForm.schemaUrl;
                var formBuilderProps = {
                    createFn: this.campaignAddCreateFn,
                    schemaUrl: baseSchemaUrl + "/ChangeSet"
                };
                return _react2.default.createElement("div", {
                    className: "cms-content__inner"
                }, _react2.default.createElement(_Toolbar2.default, {
                    showBackButton: true,
                    handleBackButtonClick: this.handleBackButtonClick
                }, _react2.default.createElement(_Breadcrumb2.default, {
                    multiline: true,
                    crumbs: this.props.breadcrumbs
                })), _react2.default.createElement("div", {
                    className: "panel-scrollable panel-scrollable--single-toolbar container-fluid m-t-1"
                }, _react2.default.createElement(_FormBuilder2.default, formBuilderProps)));
            };
            CampaignAdmin.prototype.campaignEditCreateFn = function campaignEditCreateFn(Component, props) {
                var indexRoute = this.props.sectionConfig.route;
                if (props.name === "action_cancel") {
                    var extendedProps = _extends({}, props, {
                        handleClick: function handleClick(event) {
                            event.preventDefault();
                            _Router2.default.show(indexRoute);
                        }
                    });
                    return _react2.default.createElement(Component, _extends({
                        key: props.name
                    }, extendedProps));
                }
                return _react2.default.createElement(Component, _extends({
                    key: props.name
                }, props));
            };
            CampaignAdmin.prototype.campaignAddCreateFn = function campaignAddCreateFn(Component, props) {
                var indexRoute = this.props.sectionConfig.route;
                if (props.name === "action_cancel") {
                    var extendedProps = _extends({}, props, {
                        handleClick: function handleClick(event) {
                            event.preventDefault();
                            _Router2.default.show(indexRoute);
                        }
                    });
                    return _react2.default.createElement(Component, _extends({
                        key: props.name
                    }, extendedProps));
                }
                return _react2.default.createElement(Component, _extends({
                    key: props.name
                }, props));
            };
            CampaignAdmin.prototype.campaignListCreateFn = function campaignListCreateFn(Component, props) {
                var campaignViewRoute = this.props.sectionConfig.campaignViewRoute;
                var typeUrlParam = "set";
                if (props.component === "GridField") {
                    var extendedProps = _extends({}, props, {
                        data: _extends({}, props.data, {
                            handleDrillDown: function handleDrillDown(event, record) {
                                var path = campaignViewRoute.replace(/:type\?/, typeUrlParam).replace(/:id\?/, record.ID).replace(/:view\?/, "show");
                                _Router2.default.show(path);
                            },
                            handleEditRecord: function handleEditRecord(event, id) {
                                var path = campaignViewRoute.replace(/:type\?/, typeUrlParam).replace(/:id\?/, id).replace(/:view\?/, "edit");
                                _Router2.default.show(path);
                            }
                        })
                    });
                    return _react2.default.createElement(Component, _extends({
                        key: extendedProps.name
                    }, extendedProps));
                }
                return _react2.default.createElement(Component, _extends({
                    key: props.name
                }, props));
            };
            CampaignAdmin.prototype.addCampaign = function addCampaign() {
                var path = this.getActionRoute(0, "create");
                window.ss.router.show(path);
            };
            CampaignAdmin.prototype.getActionRoute = function getActionRoute(id, view) {
                return this.props.sectionConfig.campaignViewRoute.replace(/:type\?/, "set").replace(/:id\?/, id).replace(/:view\?/, view);
            };
            return CampaignAdmin;
        }(_SilverStripeComponent2.default);
        CampaignAdmin.propTypes = {
            breadcrumbsActions: _react2.default.PropTypes.object.isRequired,
            campaignId: _react2.default.PropTypes.string,
            sectionConfig: _react2.default.PropTypes.object.isRequired,
            securityId: _react2.default.PropTypes.string.isRequired,
            view: _react2.default.PropTypes.string
        };
        function mapStateToProps(state) {
            return {
                config: state.config,
                campaignId: state.campaign.campaignId,
                view: state.campaign.view,
                breadcrumbs: state.breadcrumbs
            };
        }
        function mapDispatchToProps(dispatch) {
            return {
                breadcrumbsActions: (0, _redux.bindActionCreators)(breadcrumbsActions, dispatch)
            };
        }
        exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CampaignAdmin);
    }, {
        "./CampaignAdminList": 9,
        "components/Breadcrumb/Breadcrumb": 4,
        "components/FormAction/FormAction": "components/FormAction/FormAction",
        "components/FormBuilder/FormBuilder": "components/FormBuilder/FormBuilder",
        "components/Toolbar/Toolbar": "components/Toolbar/Toolbar",
        i18n: "i18n",
        "lib/Backend": "lib/Backend",
        "lib/Router": 14,
        "lib/SilverStripeComponent": "lib/SilverStripeComponent",
        react: "react",
        "react-redux": "react-redux",
        redux: "redux",
        "state/breadcrumbs/BreadcrumbsActions": 16
    } ],
    8: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _react = require("react");
        var _react2 = _interopRequireDefault(_react);
        var _SilverStripeComponent = require("lib/SilverStripeComponent");
        var _SilverStripeComponent2 = _interopRequireDefault(_SilverStripeComponent);
        var _i18n = require("i18n");
        var _i18n2 = _interopRequireDefault(_i18n);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _defaults(obj, defaults) {
            var keys = Object.getOwnPropertyNames(defaults);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = Object.getOwnPropertyDescriptor(defaults, key);
                if (value && value.configurable && obj[key] === undefined) {
                    Object.defineProperty(obj, key, value);
                }
            }
            return obj;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
        }
        var CampaignAdminItem = function(_SilverStripeComponen) {
            _inherits(CampaignAdminItem, _SilverStripeComponen);
            function CampaignAdminItem() {
                _classCallCheck(this, CampaignAdminItem);
                return _possibleConstructorReturn(this, _SilverStripeComponen.apply(this, arguments));
            }
            CampaignAdminItem.prototype.render = function render() {
                var thumbnail = null;
                var badge = {};
                var item = this.props.item;
                var campaign = this.props.campaign;
                if (campaign.State === "open") {
                    switch (item.ChangeType) {
                      case "created":
                        badge.className = "label label-warning list-group-item__status";
                        badge.Title = _i18n2.default._t("CampaignItem.DRAFT", "Draft");
                        break;

                      case "modified":
                        badge.className = "label label-warning list-group-item__status";
                        badge.Title = _i18n2.default._t("CampaignItem.MODIFIED", "Modified");
                        break;

                      case "deleted":
                        badge.className = "label label-error list-group-item__status";
                        badge.Title = _i18n2.default._t("CampaignItem.REMOVED", "Removed");
                        break;

                      case "none":
                      default:
                        badge.className = "label label-success list-group-item__status";
                        badge.Title = _i18n2.default._t("CampaignItem.NO_CHANGES", "No changes");
                        break;
                    }
                }
                var links = _react2.default.createElement("span", {
                    className: "list-group-item__info campaign-admin__item-links--has-links font-icon-link"
                }, "3 linked items");
                if (item.Thumbnail) {
                    thumbnail = _react2.default.createElement("span", {
                        className: "list-group-item__thumbnail"
                    }, _react2.default.createElement("img", {
                        alt: item.Title,
                        src: item.Thumbnail
                    }));
                }
                return _react2.default.createElement("div", null, thumbnail, _react2.default.createElement("h4", {
                    className: "list-group-item-heading"
                }, item.Title), _react2.default.createElement("span", {
                    className: "list-group-item__info campaign-admin__item-links--is-linked font-icon-link"
                }), links, badge.className && badge.Title && _react2.default.createElement("span", {
                    className: badge.className
                }, badge.Title));
            };
            return CampaignAdminItem;
        }(_SilverStripeComponent2.default);
        CampaignAdminItem.propTypes = {
            campaign: _react2.default.PropTypes.object.isRequired,
            item: _react2.default.PropTypes.object.isRequired
        };
        exports.default = CampaignAdminItem;
    }, {
        i18n: "i18n",
        "lib/SilverStripeComponent": "lib/SilverStripeComponent",
        react: "react"
    } ],
    9: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
        var _react = require("react");
        var _react2 = _interopRequireDefault(_react);
        var _redux = require("redux");
        var _reactRedux = require("react-redux");
        var _BreadcrumbsActions = require("state/breadcrumbs/BreadcrumbsActions");
        var breadcrumbsActions = _interopRequireWildcard(_BreadcrumbsActions);
        var _RecordsActions = require("state/records/RecordsActions");
        var recordActions = _interopRequireWildcard(_RecordsActions);
        var _CampaignActions = require("state/campaign/CampaignActions");
        var campaignActions = _interopRequireWildcard(_CampaignActions);
        var _SilverStripeComponent = require("lib/SilverStripeComponent");
        var _SilverStripeComponent2 = _interopRequireDefault(_SilverStripeComponent);
        var _Accordion = require("components/Accordion/Accordion");
        var _Accordion2 = _interopRequireDefault(_Accordion);
        var _AccordionBlock = require("components/Accordion/AccordionBlock");
        var _AccordionBlock2 = _interopRequireDefault(_AccordionBlock);
        var _ListGroupItem = require("components/ListGroup/ListGroupItem");
        var _ListGroupItem2 = _interopRequireDefault(_ListGroupItem);
        var _Toolbar = require("components/Toolbar/Toolbar");
        var _Toolbar2 = _interopRequireDefault(_Toolbar);
        var _FormAction = require("components/FormAction/FormAction");
        var _FormAction2 = _interopRequireDefault(_FormAction);
        var _CampaignAdminItem = require("./CampaignAdminItem");
        var _CampaignAdminItem2 = _interopRequireDefault(_CampaignAdminItem);
        var _Breadcrumb = require("components/Breadcrumb/Breadcrumb");
        var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);
        var _Preview = require("components/Preview/Preview");
        var _Preview2 = _interopRequireDefault(_Preview);
        var _i18n = require("i18n");
        var _i18n2 = _interopRequireDefault(_i18n);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                    }
                }
                newObj.default = obj;
                return newObj;
            }
        }
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _defaults(obj, defaults) {
            var keys = Object.getOwnPropertyNames(defaults);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = Object.getOwnPropertyDescriptor(defaults, key);
                if (value && value.configurable && obj[key] === undefined) {
                    Object.defineProperty(obj, key, value);
                }
            }
            return obj;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
        }
        var CampaignAdminList = function(_SilverStripeComponen) {
            _inherits(CampaignAdminList, _SilverStripeComponen);
            function CampaignAdminList(props) {
                _classCallCheck(this, CampaignAdminList);
                var _this = _possibleConstructorReturn(this, _SilverStripeComponen.call(this, props));
                _this.handlePublish = _this.handlePublish.bind(_this);
                _this.handleItemSelected = _this.handleItemSelected.bind(_this);
                _this.setBreadcrumbs = _this.setBreadcrumbs.bind(_this);
                return _this;
            }
            CampaignAdminList.prototype.componentDidMount = function componentDidMount() {
                var fetchURL = this.props.itemListViewEndpoint.replace(/:id/, this.props.campaignId);
                _SilverStripeComponen.prototype.componentDidMount.call(this);
                this.setBreadcrumbs();
                if (!Object.keys(this.props.record).length) {
                    this.props.recordActions.fetchRecord("ChangeSet", "get", fetchURL).then(this.setBreadcrumbs);
                }
            };
            CampaignAdminList.prototype.setBreadcrumbs = function setBreadcrumbs() {
                if (!this.props.record) {
                    return;
                }
                var thisLink = this.props.sectionConfig.campaignViewRoute.replace(/:type\?/, "set").replace(/:id\?/, this.props.campaignId).replace(/:view\?/, "show");
                var applies = window.ss.router.routeAppliesToCurrentLocation(window.ss.router.resolveURLToBase(thisLink));
                if (!applies) {
                    return;
                }
                var breadcrumbs = [ {
                    text: _i18n2.default._t("Campaigns.CAMPAIGN", "Campaigns"),
                    href: this.props.sectionConfig.route
                } ];
                breadcrumbs.push({
                    text: this.props.record.Name,
                    href: thisLink
                });
                this.props.breadcrumbsActions.setBreadcrumbs(breadcrumbs);
            };
            CampaignAdminList.prototype.render = function render() {
                var _this2 = this;
                var itemId = this.props.campaign.changeSetItemId;
                var itemLinks = null;
                var campaignId = this.props.campaignId;
                var campaign = this.props.record;
                var itemGroups = this.groupItemsForSet();
                var accordionBlocks = [];
                Object.keys(itemGroups).forEach(function(className) {
                    var group = itemGroups[className];
                    var groupCount = group.items.length;
                    var listGroupItems = [];
                    var title = groupCount + " " + (groupCount === 1 ? group.singular : group.plural);
                    var groupid = "Set_" + campaignId + "_Group_" + className;
                    group.items.forEach(function(item) {
                        if (!itemId) {
                            itemId = item.ID;
                        }
                        var selected = itemId === item.ID;
                        if (selected && item._links) {
                            itemLinks = item._links;
                        }
                        var itemClassNames = [];
                        if (item.ChangeType === "none" || campaign.State === "published") {
                            itemClassNames.push("list-group-item--inactive");
                        }
                        if (selected) {
                            itemClassNames.push("active");
                        }
                        listGroupItems.push(_react2.default.createElement(_ListGroupItem2.default, {
                            key: item.ID,
                            className: itemClassNames.join(" "),
                            handleClick: _this2.handleItemSelected,
                            handleClickArg: item.ID
                        }, _react2.default.createElement(_CampaignAdminItem2.default, {
                            item: item,
                            campaign: _this2.props.record
                        })));
                    });
                    accordionBlocks.push(_react2.default.createElement(_AccordionBlock2.default, {
                        key: groupid,
                        groupid: groupid,
                        title: title
                    }, listGroupItems));
                });
                var pagesLink = this.props.config.sections.CMSMain.route;
                var body = accordionBlocks.length ? _react2.default.createElement(_Accordion2.default, null, accordionBlocks) : _react2.default.createElement("div", {
                    className: "alert alert-warning",
                    role: "alert"
                }, _react2.default.createElement("strong", null, "This campaign is empty."), " You can add pages by selecting", " ", _react2.default.createElement("em", null, "Add to campaign"), " from within the ", _react2.default.createElement("em", null, "More Options"), " popup on", " ", "the ", _react2.default.createElement("a", {
                    href: pagesLink
                }, "edit page screen"), ".");
                return _react2.default.createElement("div", {
                    className: "cms-content__split cms-content__split--left-sm"
                }, _react2.default.createElement("div", {
                    className: "cms-content__left cms-campaigns collapse in",
                    "aria-expanded": "true"
                }, _react2.default.createElement(_Toolbar2.default, {
                    showBackButton: true,
                    handleBackButtonClick: this.props.handleBackButtonClick
                }, _react2.default.createElement(_Breadcrumb2.default, {
                    multiline: true,
                    crumbs: this.props.breadcrumbs
                })), _react2.default.createElement("div", {
                    className: "container-fluid campaign-items panel-scrollable panel-scrollable--double-toolbar"
                }, body), _react2.default.createElement("div", {
                    className: "toolbar--south"
                }, this.renderButtonToolbar())), _react2.default.createElement(_Preview2.default, {
                    itemLinks: itemLinks,
                    itemId: itemId
                }));
            };
            CampaignAdminList.prototype.handleItemSelected = function handleItemSelected(event, itemId) {
                this.props.campaignActions.selectChangeSetItem(itemId);
            };
            CampaignAdminList.prototype.renderButtonToolbar = function renderButtonToolbar() {
                var items = this.getItems();
                if (!items || !items.length) {
                    return _react2.default.createElement("div", {
                        className: "btn-toolbar"
                    });
                }
                var actionProps = {};
                if (this.props.record.State === "open") {
                    actionProps = _extends(actionProps, {
                        label: _i18n2.default._t("Campaigns.PUBLISHCAMPAIGN"),
                        bootstrapButtonStyle: "primary",
                        loading: this.props.campaign.isPublishing,
                        handleClick: this.handlePublish,
                        icon: "rocket"
                    });
                } else if (this.props.record.State === "published") {
                    actionProps = _extends(actionProps, {
                        label: _i18n2.default._t("Campaigns.REVERTCAMPAIGN"),
                        bootstrapButtonStyle: "default",
                        icon: "back-in-time",
                        disabled: true
                    });
                }
                return _react2.default.createElement("div", {
                    className: "btn-toolbar"
                }, _react2.default.createElement(_FormAction2.default, actionProps));
            };
            CampaignAdminList.prototype.getItems = function getItems() {
                if (this.props.record && this.props.record._embedded) {
                    return this.props.record._embedded.ChangeSetItems;
                }
                return null;
            };
            CampaignAdminList.prototype.groupItemsForSet = function groupItemsForSet() {
                var groups = {};
                var items = this.getItems();
                if (!items) {
                    return groups;
                }
                items.forEach(function(item) {
                    var classname = item.BaseClass;
                    if (!groups[classname]) {
                        groups[classname] = {
                            singular: item.Singular,
                            plural: item.Plural,
                            items: []
                        };
                    }
                    groups[classname].items.push(item);
                });
                return groups;
            };
            CampaignAdminList.prototype.handlePublish = function handlePublish(e) {
                e.preventDefault();
                this.props.campaignActions.publishCampaign(this.props.publishApi, this.props.campaignId);
            };
            return CampaignAdminList;
        }(_SilverStripeComponent2.default);
        CampaignAdminList.propTypes = {
            campaign: _react2.default.PropTypes.shape({
                isPublishing: _react2.default.PropTypes.bool.isRequired,
                changeSetItemId: _react2.default.PropTypes.number
            }),
            breadcrumbsActions: _react2.default.PropTypes.object.isRequired,
            campaignActions: _react2.default.PropTypes.object.isRequired,
            publishApi: _react2.default.PropTypes.func.isRequired,
            record: _react2.default.PropTypes.object.isRequired,
            recordActions: _react2.default.PropTypes.object.isRequired,
            sectionConfig: _react2.default.PropTypes.object.isRequired,
            handleBackButtonClick: _react2.default.PropTypes.func
        };
        function mapStateToProps(state, ownProps) {
            var record = null;
            if (state.records && state.records.ChangeSet && ownProps.campaignId) {
                record = state.records.ChangeSet[parseInt(ownProps.campaignId, 10)];
            }
            return {
                config: state.config,
                record: record || {},
                campaign: state.campaign,
                breadcrumbs: state.breadcrumbs
            };
        }
        function mapDispatchToProps(dispatch) {
            return {
                breadcrumbsActions: (0, _redux.bindActionCreators)(breadcrumbsActions, dispatch),
                recordActions: (0, _redux.bindActionCreators)(recordActions, dispatch),
                campaignActions: (0, _redux.bindActionCreators)(campaignActions, dispatch)
            };
        }
        exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CampaignAdminList);
    }, {
        "./CampaignAdminItem": 8,
        "components/Accordion/Accordion": 2,
        "components/Accordion/AccordionBlock": 3,
        "components/Breadcrumb/Breadcrumb": 4,
        "components/FormAction/FormAction": "components/FormAction/FormAction",
        "components/ListGroup/ListGroupItem": 5,
        "components/Preview/Preview": 6,
        "components/Toolbar/Toolbar": "components/Toolbar/Toolbar",
        i18n: "i18n",
        "lib/SilverStripeComponent": "lib/SilverStripeComponent",
        react: "react",
        "react-redux": "react-redux",
        redux: "redux",
        "state/breadcrumbs/BreadcrumbsActions": 16,
        "state/campaign/CampaignActions": 19,
        "state/records/RecordsActions": 27
    } ],
    10: [ function(require, module, exports) {
        "use strict";
        var _jQuery = require("jQuery");
        var _jQuery2 = _interopRequireDefault(_jQuery);
        var _react = require("react");
        var _react2 = _interopRequireDefault(_react);
        var _reactDom = require("react-dom");
        var _reactDom2 = _interopRequireDefault(_reactDom);
        var _reactRedux = require("react-redux");
        var _Config = require("lib/Config");
        var _Config2 = _interopRequireDefault(_Config);
        var _CampaignAdmin = require("./CampaignAdmin");
        var _CampaignAdmin2 = _interopRequireDefault(_CampaignAdmin);
        var _CampaignActions = require("state/campaign/CampaignActions");
        var CampaignActions = _interopRequireWildcard(_CampaignActions);
        var _Router = require("lib/Router");
        var _Router2 = _interopRequireDefault(_Router);
        var _RouteRegister = require("lib/RouteRegister");
        var _RouteRegister2 = _interopRequireDefault(_RouteRegister);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                    }
                }
                newObj.default = obj;
                return newObj;
            }
        }
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        document.addEventListener("DOMContentLoaded", function() {
            var config = _Config2.default.getSection("CampaignAdmin");
            var baseRoute = _Router2.default.resolveURLToBase(config.route);
            var viewRoute = _Router2.default.resolveURLToBase(config.campaignViewRoute);
            _RouteRegister2.default.add(baseRoute + "*", function(ctx, next) {
                (0, _jQuery2.default)("#Menu-CampaignAdmin").entwine("ss").select();
                _reactDom2.default.render(_react2.default.createElement(_reactRedux.Provider, {
                    store: ctx.store
                }, _react2.default.createElement(_CampaignAdmin2.default, {
                    sectionConfig: config,
                    securityId: window.ss.config.SecurityID
                })), document.getElementsByClassName("cms-content")[0]);
                next();
            });
            _RouteRegister2.default.add(viewRoute, function(ctx) {
                CampaignActions.showCampaignView(ctx.params.id, ctx.params.view)(ctx.store.dispatch);
            });
        });
    }, {
        "./CampaignAdmin": 7,
        jQuery: "jQuery",
        "lib/Config": 12,
        "lib/RouteRegister": 13,
        "lib/Router": 14,
        react: "react",
        "react-dom": "react-dom",
        "react-redux": "react-redux",
        "state/campaign/CampaignActions": 19
    } ],
    11: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
        var _isomorphicFetch = require("isomorphic-fetch");
        var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
        var _es6Promise = require("es6-promise");
        var _es6Promise2 = _interopRequireDefault(_es6Promise);
        var _qs = require("qs");
        var _qs2 = _interopRequireDefault(_qs);
        var _merge = require("merge");
        var _merge2 = _interopRequireDefault(_merge);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        _es6Promise2.default.polyfill();
        function checkStatus(response) {
            var ret = void 0;
            var error = void 0;
            if (response.status >= 200 && response.status < 300) {
                ret = response;
            } else {
                error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            return ret;
        }
        var Backend = function() {
            function Backend() {
                _classCallCheck(this, Backend);
                this.fetch = _isomorphicFetch2.default;
            }
            Backend.prototype.createEndpointFetcher = function createEndpointFetcher(endpointSpec) {
                var _this = this;
                function encode(contentType, data) {
                    switch (contentType) {
                      case "application/x-www-form-urlencoded":
                        return _qs2.default.stringify(data);

                      case "application/json":
                      case "application/x-json":
                      case "application/x-javascript":
                      case "text/javascript":
                      case "text/x-javascript":
                      case "text/x-json":
                        return JSON.stringify(data);

                      default:
                        throw new Error("Can't encode format: " + contentType);
                    }
                }
                function decode(contentType, text) {
                    switch (contentType) {
                      case "application/x-www-form-urlencoded":
                        return _qs2.default.parse(text);

                      case "application/json":
                      case "application/x-json":
                      case "application/x-javascript":
                      case "text/javascript":
                      case "text/x-javascript":
                      case "text/x-json":
                        return JSON.parse(text);

                      default:
                        throw new Error("Can't decode format: " + contentType);
                    }
                }
                function addQuerystring(url, querystring) {
                    if (querystring === "") {
                        return url;
                    }
                    if (url.match(/\?/)) {
                        return url + "&" + querystring;
                    }
                    return url + "?" + querystring;
                }
                function parseResponse(response) {
                    return response.text().then(function(body) {
                        return decode(response.headers.get("Content-Type"), body);
                    });
                }
                function applySchemaToData(payloadSchema, data) {
                    return Object.keys(data).reduce(function(prev, key) {
                        var schema = payloadSchema[key];
                        if (schema && (schema.remove === true || schema.querystring === true)) {
                            return prev;
                        }
                        return _extends(prev, _defineProperty({}, key, data[key]));
                    }, {});
                }
                function applySchemaToUrl(payloadSchema, url, data) {
                    var opts = arguments.length <= 3 || arguments[3] === undefined ? {
                        setFromData: false
                    } : arguments[3];
                    var newUrl = url;
                    var queryData = Object.keys(data).reduce(function(prev, key) {
                        var schema = payloadSchema[key];
                        var includeThroughSetFromData = opts.setFromData === true && !(schema && schema.remove === true);
                        var includeThroughSpec = schema && schema.querystring === true && schema.remove !== true;
                        if (includeThroughSetFromData || includeThroughSpec) {
                            return _extends(prev, _defineProperty({}, key, data[key]));
                        }
                        return prev;
                    }, {});
                    newUrl = addQuerystring(newUrl, encode("application/x-www-form-urlencoded", queryData));
                    newUrl = Object.keys(payloadSchema).reduce(function(prev, key) {
                        var replacement = payloadSchema[key].urlReplacement;
                        if (replacement) {
                            return prev.replace(replacement, data[key]);
                        }
                        return prev;
                    }, newUrl);
                    return newUrl;
                }
                var refinedSpec = _extends({
                    method: "get",
                    payloadFormat: "application/x-www-form-urlencoded",
                    responseFormat: "application/json",
                    payloadSchema: {},
                    defaultData: {}
                }, endpointSpec);
                var formatShortcuts = {
                    json: "application/json",
                    urlencoded: "application/x-www-form-urlencoded"
                };
                [ "payloadFormat", "responseFormat" ].forEach(function(key) {
                    if (formatShortcuts[refinedSpec[key]]) refinedSpec[key] = formatShortcuts[refinedSpec[key]];
                });
                return function() {
                    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                    var headers = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                    var mergedHeaders = _extends({}, headers, {
                        Accept: refinedSpec.responseFormat,
                        "Content-Type": refinedSpec.payloadFormat
                    });
                    var mergedData = _merge2.default.recursive({}, refinedSpec.defaultData, data);
                    var url = applySchemaToUrl(refinedSpec.payloadSchema, refinedSpec.url, mergedData, {
                        setFromData: refinedSpec.method.toLowerCase() === "get"
                    });
                    var encodedData = encode(refinedSpec.payloadFormat, applySchemaToData(refinedSpec.payloadSchema, mergedData));
                    var args = refinedSpec.method.toLowerCase() === "get" ? [ url, mergedHeaders ] : [ url, encodedData, mergedHeaders ];
                    return _this[refinedSpec.method.toLowerCase()].apply(_this, args).then(parseResponse);
                };
            };
            Backend.prototype.get = function get(url) {
                var headers = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                return this.fetch(url, {
                    method: "get",
                    credentials: "same-origin",
                    headers: headers
                }).then(checkStatus);
            };
            Backend.prototype.post = function post(url) {
                var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                var headers = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                var defaultHeaders = {
                    "Content-Type": "application/x-www-form-urlencoded"
                };
                return this.fetch(url, {
                    method: "post",
                    headers: _extends({}, defaultHeaders, headers),
                    credentials: "same-origin",
                    body: data
                }).then(checkStatus);
            };
            Backend.prototype.put = function put(url) {
                var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                var headers = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                return this.fetch(url, {
                    method: "put",
                    credentials: "same-origin",
                    body: data,
                    headers: headers
                }).then(checkStatus);
            };
            Backend.prototype.delete = function _delete(url) {
                var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                var headers = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                return this.fetch(url, {
                    method: "delete",
                    credentials: "same-origin",
                    body: data,
                    headers: headers
                }).then(checkStatus);
            };
            return Backend;
        }();
        var backend = new Backend();
        exports.default = backend;
    }, {
        "es6-promise": 36,
        "isomorphic-fetch": 37,
        merge: 38,
        qs: 39
    } ],
    12: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var Config = function() {
            function Config() {
                _classCallCheck(this, Config);
            }
            Config.getSection = function getSection(key) {
                return window.ss.config.sections[key];
            };
            Config.getTopLevelRoutes = function getTopLevelRoutes() {
                var topLevelRoutes = [];
                Object.keys(window.ss.config.sections).forEach(function(key) {
                    var route = window.ss.config.sections[key].route;
                    var topLevelMatch = route.match(/^admin\/[^\/]+(\/?)$/);
                    if (!topLevelMatch) {
                        return;
                    }
                    route = route.replace(/\/$/, "");
                    var isUnique = topLevelRoutes.indexOf(route) === -1;
                    if (isUnique) {
                        topLevelRoutes.push(route);
                    }
                });
                return topLevelRoutes;
            };
            return Config;
        }();
        exports.default = Config;
    }, {} ],
    13: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
        var _deepFreezeStrict = require("deep-freeze-strict");
        var _deepFreezeStrict2 = _interopRequireDefault(_deepFreezeStrict);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var register = (0, _deepFreezeStrict2.default)({});
        var RouteRegister = function() {
            function RouteRegister() {
                _classCallCheck(this, RouteRegister);
            }
            RouteRegister.prototype.add = function add(route, callback) {
                if (typeof register[route] !== "undefined") {
                    throw new Error("Route callback already registered for '" + route + "'");
                }
                register = (0, _deepFreezeStrict2.default)(_extends({}, register, _defineProperty({}, route, callback)));
                return register;
            };
            RouteRegister.prototype.remove = function remove(route) {
                register = (0, _deepFreezeStrict2.default)(Object.keys(register).reduce(function(result, current) {
                    if (current === route) {
                        return result;
                    }
                    return _extends({}, result, _defineProperty({}, current, register[current]));
                }, {}));
                return register;
            };
            RouteRegister.prototype.removeAll = function removeAll() {
                register = (0, _deepFreezeStrict2.default)({});
                return register;
            };
            RouteRegister.prototype.get = function get(route) {
                return typeof register[route] !== "undefined" ? _defineProperty({}, route, register[route]) : null;
            };
            RouteRegister.prototype.getAll = function getAll() {
                return register;
            };
            return RouteRegister;
        }();
        window.ss = window.ss || {};
        window.ss.routeRegister = window.ss.routeRegister || new RouteRegister();
        exports.default = window.ss.routeRegister;
    }, {
        "deep-freeze-strict": "deep-freeze-strict"
    } ],
    14: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _page = require("page.js");
        var _page2 = _interopRequireDefault(_page);
        var _url = require("url");
        var _url2 = _interopRequireDefault(_url);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function resolveURLToBase(path) {
            var absoluteBase = this.getAbsoluteBase();
            var absolutePath = _url2.default.resolve(absoluteBase, path);
            if (absolutePath.indexOf(absoluteBase) !== 0) {
                return absolutePath;
            }
            return absolutePath.substring(absoluteBase.length - 1);
        }
        function show(pageShow) {
            return function(path, state, dispatch, push) {
                return pageShow(_page2.default.resolveURLToBase(path), state, dispatch, push);
            };
        }
        function routeAppliesToCurrentLocation(route) {
            var r = new _page2.default.Route(route);
            return r.match(_page2.default.current, {});
        }
        function getAbsoluteBase() {
            var baseTags = window.document.getElementsByTagName("base");
            if (baseTags && baseTags[0]) {
                return baseTags[0].href;
            }
            return null;
        }
        if (!_page2.default.oldshow) {
            _page2.default.oldshow = _page2.default.show;
        }
        _page2.default.getAbsoluteBase = getAbsoluteBase.bind(_page2.default);
        _page2.default.resolveURLToBase = resolveURLToBase.bind(_page2.default);
        _page2.default.show = show(_page2.default.oldshow);
        _page2.default.routeAppliesToCurrentLocation = routeAppliesToCurrentLocation;
        window.ss = window.ss || {};
        window.ss.router = window.ss.router || _page2.default;
        exports.default = window.ss.router;
    }, {
        "page.js": "page.js",
        url: 44
    } ],
    15: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = {
            SET_BREADCRUMBS: "SET_BREADCRUMBS"
        };
    }, {} ],
    16: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.setBreadcrumbs = setBreadcrumbs;
        var _BreadcrumbsActionTypes = require("./BreadcrumbsActionTypes");
        var _BreadcrumbsActionTypes2 = _interopRequireDefault(_BreadcrumbsActionTypes);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function setBreadcrumbs(breadcrumbs) {
            return {
                type: _BreadcrumbsActionTypes2.default.SET_BREADCRUMBS,
                payload: {
                    breadcrumbs: breadcrumbs
                }
            };
        }
    }, {
        "./BreadcrumbsActionTypes": 15
    } ],
    17: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
        var _deepFreezeStrict = require("deep-freeze-strict");
        var _deepFreezeStrict2 = _interopRequireDefault(_deepFreezeStrict);
        var _BreadcrumbsActionTypes = require("./BreadcrumbsActionTypes");
        var _BreadcrumbsActionTypes2 = _interopRequireDefault(_BreadcrumbsActionTypes);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var initialState = (0, _deepFreezeStrict2.default)([]);
        function reducer() {
            var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
            var action = arguments[1];
            switch (action.type) {
              case _BreadcrumbsActionTypes2.default.SET_BREADCRUMBS:
                return (0, _deepFreezeStrict2.default)(_extends([], action.payload.breadcrumbs));

              default:
                return state;
            }
        }
        exports.default = reducer;
    }, {
        "./BreadcrumbsActionTypes": 15,
        "deep-freeze-strict": "deep-freeze-strict"
    } ],
    18: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = {
            SET_CAMPAIGN_ACTIVE_CHANGESET: "SET_CAMPAIGN_ACTIVE_CHANGESET",
            SET_CAMPAIGN_SELECTED_CHANGESETITEM: "SET_CAMPAIGN_SELECTED_CHANGESETITEM",
            PUBLISH_CAMPAIGN_REQUEST: "PUBLISH_CAMPAIGN_REQUEST",
            PUBLISH_CAMPAIGN_SUCCESS: "PUBLISH_CAMPAIGN_SUCCESS",
            PUBLISH_CAMPAIGN_FAILURE: "PUBLISH_CAMPAIGN_FAILURE"
        };
    }, {} ],
    19: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.selectChangeSetItem = selectChangeSetItem;
        exports.showCampaignView = showCampaignView;
        exports.publishCampaign = publishCampaign;
        var _CampaignActionTypes = require("./CampaignActionTypes");
        var _CampaignActionTypes2 = _interopRequireDefault(_CampaignActionTypes);
        var _RecordsActionTypes = require("state/records/RecordsActionTypes");
        var _RecordsActionTypes2 = _interopRequireDefault(_RecordsActionTypes);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function selectChangeSetItem(changeSetItemId) {
            return {
                type: _CampaignActionTypes2.default.SET_CAMPAIGN_SELECTED_CHANGESETITEM,
                payload: {
                    changeSetItemId: changeSetItemId
                }
            };
        }
        function showCampaignView(campaignId, view) {
            return function(dispatch) {
                dispatch({
                    type: _CampaignActionTypes2.default.SET_CAMPAIGN_ACTIVE_CHANGESET,
                    payload: {
                        campaignId: campaignId,
                        view: view
                    }
                });
            };
        }
        function publishCampaign(publishApi, campaignId) {
            return function(dispatch) {
                dispatch({
                    type: _CampaignActionTypes2.default.PUBLISH_CAMPAIGN_REQUEST,
                    payload: {
                        campaignId: campaignId
                    }
                });
                publishApi({
                    id: campaignId
                }).then(function(data) {
                    dispatch({
                        type: _CampaignActionTypes2.default.PUBLISH_CAMPAIGN_SUCCESS,
                        payload: {
                            campaignId: campaignId
                        }
                    });
                    dispatch({
                        type: _RecordsActionTypes2.default.FETCH_RECORD_SUCCESS,
                        payload: {
                            recordType: "ChangeSet",
                            data: data
                        }
                    });
                }).catch(function(error) {
                    dispatch({
                        type: _CampaignActionTypes2.default.PUBLISH_CAMPAIGN_FAILURE,
                        payload: {
                            error: error
                        }
                    });
                });
            };
        }
    }, {
        "./CampaignActionTypes": 18,
        "state/records/RecordsActionTypes": 26
    } ],
    20: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
        var _deepFreezeStrict = require("deep-freeze-strict");
        var _deepFreezeStrict2 = _interopRequireDefault(_deepFreezeStrict);
        var _CampaignActionTypes = require("./CampaignActionTypes");
        var _CampaignActionTypes2 = _interopRequireDefault(_CampaignActionTypes);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var initialState = (0, _deepFreezeStrict2.default)({
            campaignId: null,
            changeSetItemId: null,
            isPublishing: false,
            view: null
        });
        function reducer() {
            var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
            var action = arguments[1];
            switch (action.type) {
              case _CampaignActionTypes2.default.SET_CAMPAIGN_SELECTED_CHANGESETITEM:
                return (0, _deepFreezeStrict2.default)(_extends({}, state, {
                    changeSetItemId: action.payload.changeSetItemId
                }));

              case _CampaignActionTypes2.default.SET_CAMPAIGN_ACTIVE_CHANGESET:
                return (0, _deepFreezeStrict2.default)(_extends({}, state, {
                    campaignId: action.payload.campaignId,
                    view: action.payload.view,
                    changeSetItemId: null
                }));

              case _CampaignActionTypes2.default.PUBLISH_CAMPAIGN_REQUEST:
                return (0, _deepFreezeStrict2.default)(_extends({}, state, {
                    isPublishing: true
                }));

              case _CampaignActionTypes2.default.PUBLISH_CAMPAIGN_SUCCESS:
              case _CampaignActionTypes2.default.PUBLISH_CAMPAIGN_FAILURE:
                return (0, _deepFreezeStrict2.default)(_extends({}, state, {
                    isPublishing: false
                }));

              default:
                return state;
            }
        }
        exports.default = reducer;
    }, {
        "./CampaignActionTypes": 18,
        "deep-freeze-strict": "deep-freeze-strict"
    } ],
    21: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = {
            SET_CONFIG: "SET_CONFIG"
        };
    }, {} ],
    22: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.setConfig = setConfig;
        var _ConfigActionTypes = require("./ConfigActionTypes");
        var _ConfigActionTypes2 = _interopRequireDefault(_ConfigActionTypes);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function setConfig(config) {
            return {
                type: _ConfigActionTypes2.default.SET_CONFIG,
                payload: {
                    config: config
                }
            };
        }
    }, {
        "./ConfigActionTypes": 21
    } ],
    23: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
        var _deepFreezeStrict = require("deep-freeze-strict");
        var _deepFreezeStrict2 = _interopRequireDefault(_deepFreezeStrict);
        var _ConfigActionTypes = require("./ConfigActionTypes");
        var _ConfigActionTypes2 = _interopRequireDefault(_ConfigActionTypes);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function configReducer() {
            var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var action = arguments[1];
            switch (action.type) {
              case _ConfigActionTypes2.default.SET_CONFIG:
                return (0, _deepFreezeStrict2.default)(_extends({}, state, action.payload.config));

              default:
                return state;
            }
        }
        exports.default = configReducer;
    }, {
        "./ConfigActionTypes": 21,
        "deep-freeze-strict": "deep-freeze-strict"
    } ],
    24: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var ACTION_TYPES = exports.ACTION_TYPES = {
            ADD_FORM: "ADD_FORM",
            REMOVE_FORM: "REMOVE_FORM",
            SUBMIT_FORM_FAILURE: "SUBMIT_FORM_FAILURE",
            SUBMIT_FORM_REQUEST: "SUBMIT_FORM_REQUEST",
            SUBMIT_FORM_SUCCESS: "SUBMIT_FORM_SUCCESS",
            UPDATE_FIELD: "UPDATE_FIELD"
        };
    }, {} ],
    25: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
        var _deepFreezeStrict = require("deep-freeze-strict");
        var _deepFreezeStrict2 = _interopRequireDefault(_deepFreezeStrict);
        var _FormActionTypes = require("./FormActionTypes");
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }
        var initialState = (0, _deepFreezeStrict2.default)({});
        function formReducer() {
            var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
            var action = arguments[1];
            switch (action.type) {
              case _FormActionTypes.ACTION_TYPES.SUBMIT_FORM_REQUEST:
                return (0, _deepFreezeStrict2.default)(_extends({}, state, _defineProperty({}, action.payload.formId, {
                    submitting: true
                })));

              case _FormActionTypes.ACTION_TYPES.REMOVE_FORM:
                return (0, _deepFreezeStrict2.default)(Object.keys(state).reduce(function(previous, current) {
                    if (current === action.payload.formId) {
                        return previous;
                    }
                    return _extends({}, previous, _defineProperty({}, current, state[current]));
                }, {}));

              case _FormActionTypes.ACTION_TYPES.ADD_FORM:
                return (0, _deepFreezeStrict2.default)(_extends({}, state, _defineProperty({}, action.payload.formState.id, {
                    fields: action.payload.formState.fields,
                    submitting: false
                })));

              case _FormActionTypes.ACTION_TYPES.UPDATE_FIELD:
                return (0, _deepFreezeStrict2.default)(_extends({}, state, _defineProperty({}, action.payload.formId, _extends({}, state[action.payload.formId], {
                    fields: state[action.payload.formId].fields.map(function(field) {
                        if (field.id === action.payload.updates.id) {
                            return _extends({}, field, action.payload.updates);
                        }
                        return field;
                    })
                }))));

              case _FormActionTypes.ACTION_TYPES.SUBMIT_FORM_SUCCESS:
                return (0, _deepFreezeStrict2.default)(_extends({}, state, _defineProperty({}, action.payload.response.id, {
                    fields: action.payload.response.state.fields,
                    messages: action.payload.response.state.messages,
                    submitting: false
                })));

              case _FormActionTypes.ACTION_TYPES.SUBMIT_FORM_FAILURE:
                return (0, _deepFreezeStrict2.default)(_extends({}, state, _defineProperty({}, action.payload.formId, {
                    submitting: false
                })));

              default:
                return state;
            }
        }
        exports.default = formReducer;
    }, {
        "./FormActionTypes": 24,
        "deep-freeze-strict": "deep-freeze-strict"
    } ],
    26: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = {
            CREATE_RECORD: "CREATE_RECORD",
            UPDATE_RECORD: "UPDATE_RECORD",
            DELETE_RECORD: "DELETE_RECORD",
            FETCH_RECORDS_REQUEST: "FETCH_RECORDS_REQUEST",
            FETCH_RECORDS_FAILURE: "FETCH_RECORDS_FAILURE",
            FETCH_RECORDS_SUCCESS: "FETCH_RECORDS_SUCCESS",
            FETCH_RECORD_REQUEST: "FETCH_RECORD_REQUEST",
            FETCH_RECORD_FAILURE: "FETCH_RECORD_FAILURE",
            FETCH_RECORD_SUCCESS: "FETCH_RECORD_SUCCESS",
            DELETE_RECORD_REQUEST: "DELETE_RECORD_REQUEST",
            DELETE_RECORD_FAILURE: "DELETE_RECORD_FAILURE",
            DELETE_RECORD_SUCCESS: "DELETE_RECORD_SUCCESS"
        };
    }, {} ],
    27: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.fetchRecords = fetchRecords;
        exports.fetchRecord = fetchRecord;
        exports.deleteRecord = deleteRecord;
        var _RecordsActionTypes = require("./RecordsActionTypes");
        var _RecordsActionTypes2 = _interopRequireDefault(_RecordsActionTypes);
        var _Backend = require("lib/Backend.js");
        var _Backend2 = _interopRequireDefault(_Backend);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function populate(str, params) {
            var names = [ "id" ];
            return names.reduce(function(acc, name) {
                return acc.replace(":" + name, params[name]);
            }, str);
        }
        function fetchRecords(recordType, method, url) {
            var payload = {
                recordType: recordType
            };
            var headers = {
                Accept: "text/json"
            };
            var methodToLowerCase = method.toLowerCase();
            return function(dispatch) {
                dispatch({
                    type: _RecordsActionTypes2.default.FETCH_RECORDS_REQUEST,
                    payload: payload
                });
                var args = methodToLowerCase === "get" ? [ populate(url, payload), headers ] : [ populate(url, payload), {}, headers ];
                return _Backend2.default[methodToLowerCase].apply(_Backend2.default, args).then(function(response) {
                    return response.json();
                }).then(function(json) {
                    dispatch({
                        type: _RecordsActionTypes2.default.FETCH_RECORDS_SUCCESS,
                        payload: {
                            recordType: recordType,
                            data: json
                        }
                    });
                }).catch(function(err) {
                    dispatch({
                        type: _RecordsActionTypes2.default.FETCH_RECORDS_FAILURE,
                        payload: {
                            error: err,
                            recordType: recordType
                        }
                    });
                });
            };
        }
        function fetchRecord(recordType, method, url) {
            var payload = {
                recordType: recordType
            };
            var headers = {
                Accept: "text/json"
            };
            var methodToLowerCase = method.toLowerCase();
            return function(dispatch) {
                dispatch({
                    type: _RecordsActionTypes2.default.FETCH_RECORD_REQUEST,
                    payload: payload
                });
                var args = methodToLowerCase === "get" ? [ populate(url, payload), headers ] : [ populate(url, payload), {}, headers ];
                return _Backend2.default[methodToLowerCase].apply(_Backend2.default, args).then(function(response) {
                    return response.json();
                }).then(function(json) {
                    dispatch({
                        type: _RecordsActionTypes2.default.FETCH_RECORD_SUCCESS,
                        payload: {
                            recordType: recordType,
                            data: json
                        }
                    });
                }).catch(function(err) {
                    dispatch({
                        type: _RecordsActionTypes2.default.FETCH_RECORD_FAILURE,
                        payload: {
                            error: err,
                            recordType: recordType
                        }
                    });
                });
            };
        }
        function deleteRecord(recordType, id, method, url) {
            var headers = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];
            var payload = {
                recordType: recordType,
                id: id
            };
            var methodToLowerCase = method.toLowerCase();
            var args = methodToLowerCase === "get" ? [ populate(url, payload), headers ] : [ populate(url, payload), {}, headers ];
            return function(dispatch) {
                dispatch({
                    type: _RecordsActionTypes2.default.DELETE_RECORD_REQUEST,
                    payload: payload
                });
                return _Backend2.default[methodToLowerCase].apply(_Backend2.default, args).then(function() {
                    dispatch({
                        type: _RecordsActionTypes2.default.DELETE_RECORD_SUCCESS,
                        payload: {
                            recordType: recordType,
                            id: id
                        }
                    });
                }).catch(function(err) {
                    dispatch({
                        type: _RecordsActionTypes2.default.DELETE_RECORD_FAILURE,
                        payload: {
                            error: err,
                            recordType: recordType,
                            id: id
                        }
                    });
                });
            };
        }
    }, {
        "./RecordsActionTypes": 26,
        "lib/Backend.js": 11
    } ],
    28: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
        var _deepFreezeStrict = require("deep-freeze-strict");
        var _deepFreezeStrict2 = _interopRequireDefault(_deepFreezeStrict);
        var _RecordsActionTypes = require("./RecordsActionTypes");
        var _RecordsActionTypes2 = _interopRequireDefault(_RecordsActionTypes);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }
        var initialState = {};
        function recordsReducer() {
            var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
            var action = arguments[1];
            var records = void 0;
            var recordType = void 0;
            var record = void 0;
            switch (action.type) {
              case _RecordsActionTypes2.default.CREATE_RECORD:
                return (0, _deepFreezeStrict2.default)(_extends({}, state, {}));

              case _RecordsActionTypes2.default.UPDATE_RECORD:
                return (0, _deepFreezeStrict2.default)(_extends({}, state, {}));

              case _RecordsActionTypes2.default.DELETE_RECORD:
                return (0, _deepFreezeStrict2.default)(_extends({}, state, {}));

              case _RecordsActionTypes2.default.FETCH_RECORDS_REQUEST:
                return state;

              case _RecordsActionTypes2.default.FETCH_RECORDS_FAILURE:
                return state;

              case _RecordsActionTypes2.default.FETCH_RECORDS_SUCCESS:
                recordType = action.payload.recordType;
                records = action.payload.data._embedded[recordType + "s"] || {};
                records = records.reduce(function(prev, val) {
                    return _extends({}, prev, _defineProperty({}, val.ID, val));
                }, {});
                return (0, _deepFreezeStrict2.default)(_extends({}, state, _defineProperty({}, recordType, records)));

              case _RecordsActionTypes2.default.FETCH_RECORD_REQUEST:
                return state;

              case _RecordsActionTypes2.default.FETCH_RECORD_FAILURE:
                return state;

              case _RecordsActionTypes2.default.FETCH_RECORD_SUCCESS:
                recordType = action.payload.recordType;
                record = action.payload.data;
                return (0, _deepFreezeStrict2.default)(_extends({}, state, _defineProperty({}, recordType, _extends({}, state[recordType], _defineProperty({}, record.ID, record)))));

              case _RecordsActionTypes2.default.DELETE_RECORD_REQUEST:
                return state;

              case _RecordsActionTypes2.default.DELETE_RECORD_FAILURE:
                return state;

              case _RecordsActionTypes2.default.DELETE_RECORD_SUCCESS:
                recordType = action.payload.recordType;
                records = state[recordType];
                records = Object.keys(records).reduce(function(result, key) {
                    if (parseInt(key, 10) !== parseInt(action.payload.id, 10)) {
                        return _extends({}, result, _defineProperty({}, key, records[key]));
                    }
                    return result;
                }, {});
                return (0, _deepFreezeStrict2.default)(_extends({}, state, _defineProperty({}, recordType, records)));

              default:
                return state;
            }
        }
        exports.default = recordsReducer;
    }, {
        "./RecordsActionTypes": 26,
        "deep-freeze-strict": "deep-freeze-strict"
    } ],
    29: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var ACTION_TYPES = {
            SET_SCHEMA: "SET_SCHEMA"
        };
        exports.default = ACTION_TYPES;
    }, {} ],
    30: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
        exports.default = schemaReducer;
        var _deepFreezeStrict = require("deep-freeze-strict");
        var _deepFreezeStrict2 = _interopRequireDefault(_deepFreezeStrict);
        var _SchemaActionTypes = require("./SchemaActionTypes");
        var _SchemaActionTypes2 = _interopRequireDefault(_SchemaActionTypes);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }
        var initialState = (0, _deepFreezeStrict2.default)({});
        function schemaReducer() {
            var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
            var action = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
            switch (action.type) {
              case _SchemaActionTypes2.default.SET_SCHEMA:
                {
                    var id = action.payload.schema.schema_url;
                    return (0, _deepFreezeStrict2.default)(_extends({}, state, _defineProperty({}, id, action.payload)));
                }

              default:
                return state;
            }
        }
    }, {
        "./SchemaActionTypes": 29,
        "deep-freeze-strict": "deep-freeze-strict"
    } ],
    31: [ function(require, module, exports) {
        var process = module.exports = {};
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;
        function cleanUpNextTick() {
            draining = false;
            if (currentQueue.length) {
                queue = currentQueue.concat(queue);
            } else {
                queueIndex = -1;
            }
            if (queue.length) {
                drainQueue();
            }
        }
        function drainQueue() {
            if (draining) {
                return;
            }
            var timeout = setTimeout(cleanUpNextTick);
            draining = true;
            var len = queue.length;
            while (len) {
                currentQueue = queue;
                queue = [];
                while (++queueIndex < len) {
                    if (currentQueue) {
                        currentQueue[queueIndex].run();
                    }
                }
                queueIndex = -1;
                len = queue.length;
            }
            currentQueue = null;
            draining = false;
            clearTimeout(timeout);
        }
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) {
                for (var i = 1; i < arguments.length; i++) {
                    args[i - 1] = arguments[i];
                }
            }
            queue.push(new Item(fun, args));
            if (queue.length === 1 && !draining) {
                setTimeout(drainQueue, 0);
            }
        };
        function Item(fun, array) {
            this.fun = fun;
            this.array = array;
        }
        Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        };
        process.title = "browser";
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = "";
        process.versions = {};
        function noop() {}
        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.binding = function(name) {
            throw new Error("process.binding is not supported");
        };
        process.cwd = function() {
            return "/";
        };
        process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
        };
        process.umask = function() {
            return 0;
        };
    }, {} ],
    32: [ function(require, module, exports) {
        (function(global) {
            (function(root) {
                var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
                var freeModule = typeof module == "object" && module && !module.nodeType && module;
                var freeGlobal = typeof global == "object" && global;
                if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
                    root = freeGlobal;
                }
                var punycode, maxInt = 2147483647, base = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = "-", regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, errors = {
                    overflow: "Overflow: input needs wider integers to process",
                    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                    "invalid-input": "Invalid input"
                }, baseMinusTMin = base - tMin, floor = Math.floor, stringFromCharCode = String.fromCharCode, key;
                function error(type) {
                    throw new RangeError(errors[type]);
                }
                function map(array, fn) {
                    var length = array.length;
                    var result = [];
                    while (length--) {
                        result[length] = fn(array[length]);
                    }
                    return result;
                }
                function mapDomain(string, fn) {
                    var parts = string.split("@");
                    var result = "";
                    if (parts.length > 1) {
                        result = parts[0] + "@";
                        string = parts[1];
                    }
                    string = string.replace(regexSeparators, ".");
                    var labels = string.split(".");
                    var encoded = map(labels, fn).join(".");
                    return result + encoded;
                }
                function ucs2decode(string) {
                    var output = [], counter = 0, length = string.length, value, extra;
                    while (counter < length) {
                        value = string.charCodeAt(counter++);
                        if (value >= 55296 && value <= 56319 && counter < length) {
                            extra = string.charCodeAt(counter++);
                            if ((extra & 64512) == 56320) {
                                output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
                            } else {
                                output.push(value);
                                counter--;
                            }
                        } else {
                            output.push(value);
                        }
                    }
                    return output;
                }
                function ucs2encode(array) {
                    return map(array, function(value) {
                        var output = "";
                        if (value > 65535) {
                            value -= 65536;
                            output += stringFromCharCode(value >>> 10 & 1023 | 55296);
                            value = 56320 | value & 1023;
                        }
                        output += stringFromCharCode(value);
                        return output;
                    }).join("");
                }
                function basicToDigit(codePoint) {
                    if (codePoint - 48 < 10) {
                        return codePoint - 22;
                    }
                    if (codePoint - 65 < 26) {
                        return codePoint - 65;
                    }
                    if (codePoint - 97 < 26) {
                        return codePoint - 97;
                    }
                    return base;
                }
                function digitToBasic(digit, flag) {
                    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
                }
                function adapt(delta, numPoints, firstTime) {
                    var k = 0;
                    delta = firstTime ? floor(delta / damp) : delta >> 1;
                    delta += floor(delta / numPoints);
                    for (;delta > baseMinusTMin * tMax >> 1; k += base) {
                        delta = floor(delta / baseMinusTMin);
                    }
                    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
                }
                function decode(input) {
                    var output = [], inputLength = input.length, out, i = 0, n = initialN, bias = initialBias, basic, j, index, oldi, w, k, digit, t, baseMinusT;
                    basic = input.lastIndexOf(delimiter);
                    if (basic < 0) {
                        basic = 0;
                    }
                    for (j = 0; j < basic; ++j) {
                        if (input.charCodeAt(j) >= 128) {
                            error("not-basic");
                        }
                        output.push(input.charCodeAt(j));
                    }
                    for (index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
                        for (oldi = i, w = 1, k = base; ;k += base) {
                            if (index >= inputLength) {
                                error("invalid-input");
                            }
                            digit = basicToDigit(input.charCodeAt(index++));
                            if (digit >= base || digit > floor((maxInt - i) / w)) {
                                error("overflow");
                            }
                            i += digit * w;
                            t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                            if (digit < t) {
                                break;
                            }
                            baseMinusT = base - t;
                            if (w > floor(maxInt / baseMinusT)) {
                                error("overflow");
                            }
                            w *= baseMinusT;
                        }
                        out = output.length + 1;
                        bias = adapt(i - oldi, out, oldi == 0);
                        if (floor(i / out) > maxInt - n) {
                            error("overflow");
                        }
                        n += floor(i / out);
                        i %= out;
                        output.splice(i++, 0, n);
                    }
                    return ucs2encode(output);
                }
                function encode(input) {
                    var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, output = [], inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
                    input = ucs2decode(input);
                    inputLength = input.length;
                    n = initialN;
                    delta = 0;
                    bias = initialBias;
                    for (j = 0; j < inputLength; ++j) {
                        currentValue = input[j];
                        if (currentValue < 128) {
                            output.push(stringFromCharCode(currentValue));
                        }
                    }
                    handledCPCount = basicLength = output.length;
                    if (basicLength) {
                        output.push(delimiter);
                    }
                    while (handledCPCount < inputLength) {
                        for (m = maxInt, j = 0; j < inputLength; ++j) {
                            currentValue = input[j];
                            if (currentValue >= n && currentValue < m) {
                                m = currentValue;
                            }
                        }
                        handledCPCountPlusOne = handledCPCount + 1;
                        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                            error("overflow");
                        }
                        delta += (m - n) * handledCPCountPlusOne;
                        n = m;
                        for (j = 0; j < inputLength; ++j) {
                            currentValue = input[j];
                            if (currentValue < n && ++delta > maxInt) {
                                error("overflow");
                            }
                            if (currentValue == n) {
                                for (q = delta, k = base; ;k += base) {
                                    t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                                    if (q < t) {
                                        break;
                                    }
                                    qMinusT = q - t;
                                    baseMinusT = base - t;
                                    output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                                    q = floor(qMinusT / baseMinusT);
                                }
                                output.push(stringFromCharCode(digitToBasic(q, 0)));
                                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                                delta = 0;
                                ++handledCPCount;
                            }
                        }
                        ++delta;
                        ++n;
                    }
                    return output.join("");
                }
                function toUnicode(input) {
                    return mapDomain(input, function(string) {
                        return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
                    });
                }
                function toASCII(input) {
                    return mapDomain(input, function(string) {
                        return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
                    });
                }
                punycode = {
                    version: "1.3.2",
                    ucs2: {
                        decode: ucs2decode,
                        encode: ucs2encode
                    },
                    decode: decode,
                    encode: encode,
                    toASCII: toASCII,
                    toUnicode: toUnicode
                };
                if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
                    define("punycode", function() {
                        return punycode;
                    });
                } else if (freeExports && freeModule) {
                    if (module.exports == freeExports) {
                        freeModule.exports = punycode;
                    } else {
                        for (key in punycode) {
                            punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
                        }
                    }
                } else {
                    root.punycode = punycode;
                }
            })(this);
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {} ],
    33: [ function(require, module, exports) {
        "use strict";
        function hasOwnProperty(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
        }
        module.exports = function(qs, sep, eq, options) {
            sep = sep || "&";
            eq = eq || "=";
            var obj = {};
            if (typeof qs !== "string" || qs.length === 0) {
                return obj;
            }
            var regexp = /\+/g;
            qs = qs.split(sep);
            var maxKeys = 1e3;
            if (options && typeof options.maxKeys === "number") {
                maxKeys = options.maxKeys;
            }
            var len = qs.length;
            if (maxKeys > 0 && len > maxKeys) {
                len = maxKeys;
            }
            for (var i = 0; i < len; ++i) {
                var x = qs[i].replace(regexp, "%20"), idx = x.indexOf(eq), kstr, vstr, k, v;
                if (idx >= 0) {
                    kstr = x.substr(0, idx);
                    vstr = x.substr(idx + 1);
                } else {
                    kstr = x;
                    vstr = "";
                }
                k = decodeURIComponent(kstr);
                v = decodeURIComponent(vstr);
                if (!hasOwnProperty(obj, k)) {
                    obj[k] = v;
                } else if (isArray(obj[k])) {
                    obj[k].push(v);
                } else {
                    obj[k] = [ obj[k], v ];
                }
            }
            return obj;
        };
        var isArray = Array.isArray || function(xs) {
            return Object.prototype.toString.call(xs) === "[object Array]";
        };
    }, {} ],
    34: [ function(require, module, exports) {
        "use strict";
        var stringifyPrimitive = function(v) {
            switch (typeof v) {
              case "string":
                return v;

              case "boolean":
                return v ? "true" : "false";

              case "number":
                return isFinite(v) ? v : "";

              default:
                return "";
            }
        };
        module.exports = function(obj, sep, eq, name) {
            sep = sep || "&";
            eq = eq || "=";
            if (obj === null) {
                obj = undefined;
            }
            if (typeof obj === "object") {
                return map(objectKeys(obj), function(k) {
                    var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
                    if (isArray(obj[k])) {
                        return map(obj[k], function(v) {
                            return ks + encodeURIComponent(stringifyPrimitive(v));
                        }).join(sep);
                    } else {
                        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
                    }
                }).join(sep);
            }
            if (!name) return "";
            return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
        };
        var isArray = Array.isArray || function(xs) {
            return Object.prototype.toString.call(xs) === "[object Array]";
        };
        function map(xs, f) {
            if (xs.map) return xs.map(f);
            var res = [];
            for (var i = 0; i < xs.length; i++) {
                res.push(f(xs[i], i));
            }
            return res;
        }
        var objectKeys = Object.keys || function(obj) {
            var res = [];
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
            }
            return res;
        };
    }, {} ],
    35: [ function(require, module, exports) {
        "use strict";
        exports.decode = exports.parse = require("./decode");
        exports.encode = exports.stringify = require("./encode");
    }, {
        "./decode": 33,
        "./encode": 34
    } ],
    36: [ function(require, module, exports) {
        (function(process, global) {
            (function() {
                "use strict";
                function lib$es6$promise$utils$$objectOrFunction(x) {
                    return typeof x === "function" || typeof x === "object" && x !== null;
                }
                function lib$es6$promise$utils$$isFunction(x) {
                    return typeof x === "function";
                }
                function lib$es6$promise$utils$$isMaybeThenable(x) {
                    return typeof x === "object" && x !== null;
                }
                var lib$es6$promise$utils$$_isArray;
                if (!Array.isArray) {
                    lib$es6$promise$utils$$_isArray = function(x) {
                        return Object.prototype.toString.call(x) === "[object Array]";
                    };
                } else {
                    lib$es6$promise$utils$$_isArray = Array.isArray;
                }
                var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
                var lib$es6$promise$asap$$len = 0;
                var lib$es6$promise$asap$$vertxNext;
                var lib$es6$promise$asap$$customSchedulerFn;
                var lib$es6$promise$asap$$asap = function asap(callback, arg) {
                    lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
                    lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
                    lib$es6$promise$asap$$len += 2;
                    if (lib$es6$promise$asap$$len === 2) {
                        if (lib$es6$promise$asap$$customSchedulerFn) {
                            lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
                        } else {
                            lib$es6$promise$asap$$scheduleFlush();
                        }
                    }
                };
                function lib$es6$promise$asap$$setScheduler(scheduleFn) {
                    lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
                }
                function lib$es6$promise$asap$$setAsap(asapFn) {
                    lib$es6$promise$asap$$asap = asapFn;
                }
                var lib$es6$promise$asap$$browserWindow = typeof window !== "undefined" ? window : undefined;
                var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
                var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
                var lib$es6$promise$asap$$isNode = typeof process !== "undefined" && {}.toString.call(process) === "[object process]";
                var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== "undefined" && typeof importScripts !== "undefined" && typeof MessageChannel !== "undefined";
                function lib$es6$promise$asap$$useNextTick() {
                    return function() {
                        process.nextTick(lib$es6$promise$asap$$flush);
                    };
                }
                function lib$es6$promise$asap$$useVertxTimer() {
                    return function() {
                        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
                    };
                }
                function lib$es6$promise$asap$$useMutationObserver() {
                    var iterations = 0;
                    var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
                    var node = document.createTextNode("");
                    observer.observe(node, {
                        characterData: true
                    });
                    return function() {
                        node.data = iterations = ++iterations % 2;
                    };
                }
                function lib$es6$promise$asap$$useMessageChannel() {
                    var channel = new MessageChannel();
                    channel.port1.onmessage = lib$es6$promise$asap$$flush;
                    return function() {
                        channel.port2.postMessage(0);
                    };
                }
                function lib$es6$promise$asap$$useSetTimeout() {
                    return function() {
                        setTimeout(lib$es6$promise$asap$$flush, 1);
                    };
                }
                var lib$es6$promise$asap$$queue = new Array(1e3);
                function lib$es6$promise$asap$$flush() {
                    for (var i = 0; i < lib$es6$promise$asap$$len; i += 2) {
                        var callback = lib$es6$promise$asap$$queue[i];
                        var arg = lib$es6$promise$asap$$queue[i + 1];
                        callback(arg);
                        lib$es6$promise$asap$$queue[i] = undefined;
                        lib$es6$promise$asap$$queue[i + 1] = undefined;
                    }
                    lib$es6$promise$asap$$len = 0;
                }
                function lib$es6$promise$asap$$attemptVertx() {
                    try {
                        var r = require;
                        var vertx = r("vertx");
                        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
                        return lib$es6$promise$asap$$useVertxTimer();
                    } catch (e) {
                        return lib$es6$promise$asap$$useSetTimeout();
                    }
                }
                var lib$es6$promise$asap$$scheduleFlush;
                if (lib$es6$promise$asap$$isNode) {
                    lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
                } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
                    lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
                } else if (lib$es6$promise$asap$$isWorker) {
                    lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
                } else if (lib$es6$promise$asap$$browserWindow === undefined && typeof require === "function") {
                    lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
                } else {
                    lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
                }
                function lib$es6$promise$then$$then(onFulfillment, onRejection) {
                    var parent = this;
                    var state = parent._state;
                    if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
                        return this;
                    }
                    var child = new this.constructor(lib$es6$promise$$internal$$noop);
                    var result = parent._result;
                    if (state) {
                        var callback = arguments[state - 1];
                        lib$es6$promise$asap$$asap(function() {
                            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
                        });
                    } else {
                        lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
                    }
                    return child;
                }
                var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
                function lib$es6$promise$promise$resolve$$resolve(object) {
                    var Constructor = this;
                    if (object && typeof object === "object" && object.constructor === Constructor) {
                        return object;
                    }
                    var promise = new Constructor(lib$es6$promise$$internal$$noop);
                    lib$es6$promise$$internal$$resolve(promise, object);
                    return promise;
                }
                var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
                function lib$es6$promise$$internal$$noop() {}
                var lib$es6$promise$$internal$$PENDING = void 0;
                var lib$es6$promise$$internal$$FULFILLED = 1;
                var lib$es6$promise$$internal$$REJECTED = 2;
                var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();
                function lib$es6$promise$$internal$$selfFulfillment() {
                    return new TypeError("You cannot resolve a promise with itself");
                }
                function lib$es6$promise$$internal$$cannotReturnOwn() {
                    return new TypeError("A promises callback cannot return that same promise.");
                }
                function lib$es6$promise$$internal$$getThen(promise) {
                    try {
                        return promise.then;
                    } catch (error) {
                        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
                        return lib$es6$promise$$internal$$GET_THEN_ERROR;
                    }
                }
                function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
                    try {
                        then.call(value, fulfillmentHandler, rejectionHandler);
                    } catch (e) {
                        return e;
                    }
                }
                function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
                    lib$es6$promise$asap$$asap(function(promise) {
                        var sealed = false;
                        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
                            if (sealed) {
                                return;
                            }
                            sealed = true;
                            if (thenable !== value) {
                                lib$es6$promise$$internal$$resolve(promise, value);
                            } else {
                                lib$es6$promise$$internal$$fulfill(promise, value);
                            }
                        }, function(reason) {
                            if (sealed) {
                                return;
                            }
                            sealed = true;
                            lib$es6$promise$$internal$$reject(promise, reason);
                        }, "Settle: " + (promise._label || " unknown promise"));
                        if (!sealed && error) {
                            sealed = true;
                            lib$es6$promise$$internal$$reject(promise, error);
                        }
                    }, promise);
                }
                function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
                    if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
                        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
                    } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
                        lib$es6$promise$$internal$$reject(promise, thenable._result);
                    } else {
                        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
                            lib$es6$promise$$internal$$resolve(promise, value);
                        }, function(reason) {
                            lib$es6$promise$$internal$$reject(promise, reason);
                        });
                    }
                }
                function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
                    if (maybeThenable.constructor === promise.constructor && then === lib$es6$promise$then$$default && constructor.resolve === lib$es6$promise$promise$resolve$$default) {
                        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
                    } else {
                        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
                            lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
                        } else if (then === undefined) {
                            lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
                        } else if (lib$es6$promise$utils$$isFunction(then)) {
                            lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
                        } else {
                            lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
                        }
                    }
                }
                function lib$es6$promise$$internal$$resolve(promise, value) {
                    if (promise === value) {
                        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
                    } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
                        lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
                    } else {
                        lib$es6$promise$$internal$$fulfill(promise, value);
                    }
                }
                function lib$es6$promise$$internal$$publishRejection(promise) {
                    if (promise._onerror) {
                        promise._onerror(promise._result);
                    }
                    lib$es6$promise$$internal$$publish(promise);
                }
                function lib$es6$promise$$internal$$fulfill(promise, value) {
                    if (promise._state !== lib$es6$promise$$internal$$PENDING) {
                        return;
                    }
                    promise._result = value;
                    promise._state = lib$es6$promise$$internal$$FULFILLED;
                    if (promise._subscribers.length !== 0) {
                        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
                    }
                }
                function lib$es6$promise$$internal$$reject(promise, reason) {
                    if (promise._state !== lib$es6$promise$$internal$$PENDING) {
                        return;
                    }
                    promise._state = lib$es6$promise$$internal$$REJECTED;
                    promise._result = reason;
                    lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
                }
                function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
                    var subscribers = parent._subscribers;
                    var length = subscribers.length;
                    parent._onerror = null;
                    subscribers[length] = child;
                    subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
                    subscribers[length + lib$es6$promise$$internal$$REJECTED] = onRejection;
                    if (length === 0 && parent._state) {
                        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
                    }
                }
                function lib$es6$promise$$internal$$publish(promise) {
                    var subscribers = promise._subscribers;
                    var settled = promise._state;
                    if (subscribers.length === 0) {
                        return;
                    }
                    var child, callback, detail = promise._result;
                    for (var i = 0; i < subscribers.length; i += 3) {
                        child = subscribers[i];
                        callback = subscribers[i + settled];
                        if (child) {
                            lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
                        } else {
                            callback(detail);
                        }
                    }
                    promise._subscribers.length = 0;
                }
                function lib$es6$promise$$internal$$ErrorObject() {
                    this.error = null;
                }
                var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();
                function lib$es6$promise$$internal$$tryCatch(callback, detail) {
                    try {
                        return callback(detail);
                    } catch (e) {
                        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
                        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
                    }
                }
                function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
                    var hasCallback = lib$es6$promise$utils$$isFunction(callback), value, error, succeeded, failed;
                    if (hasCallback) {
                        value = lib$es6$promise$$internal$$tryCatch(callback, detail);
                        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
                            failed = true;
                            error = value.error;
                            value = null;
                        } else {
                            succeeded = true;
                        }
                        if (promise === value) {
                            lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
                            return;
                        }
                    } else {
                        value = detail;
                        succeeded = true;
                    }
                    if (promise._state !== lib$es6$promise$$internal$$PENDING) {} else if (hasCallback && succeeded) {
                        lib$es6$promise$$internal$$resolve(promise, value);
                    } else if (failed) {
                        lib$es6$promise$$internal$$reject(promise, error);
                    } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
                        lib$es6$promise$$internal$$fulfill(promise, value);
                    } else if (settled === lib$es6$promise$$internal$$REJECTED) {
                        lib$es6$promise$$internal$$reject(promise, value);
                    }
                }
                function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
                    try {
                        resolver(function resolvePromise(value) {
                            lib$es6$promise$$internal$$resolve(promise, value);
                        }, function rejectPromise(reason) {
                            lib$es6$promise$$internal$$reject(promise, reason);
                        });
                    } catch (e) {
                        lib$es6$promise$$internal$$reject(promise, e);
                    }
                }
                function lib$es6$promise$promise$all$$all(entries) {
                    return new lib$es6$promise$enumerator$$default(this, entries).promise;
                }
                var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
                function lib$es6$promise$promise$race$$race(entries) {
                    var Constructor = this;
                    var promise = new Constructor(lib$es6$promise$$internal$$noop);
                    if (!lib$es6$promise$utils$$isArray(entries)) {
                        lib$es6$promise$$internal$$reject(promise, new TypeError("You must pass an array to race."));
                        return promise;
                    }
                    var length = entries.length;
                    function onFulfillment(value) {
                        lib$es6$promise$$internal$$resolve(promise, value);
                    }
                    function onRejection(reason) {
                        lib$es6$promise$$internal$$reject(promise, reason);
                    }
                    for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
                        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
                    }
                    return promise;
                }
                var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
                function lib$es6$promise$promise$reject$$reject(reason) {
                    var Constructor = this;
                    var promise = new Constructor(lib$es6$promise$$internal$$noop);
                    lib$es6$promise$$internal$$reject(promise, reason);
                    return promise;
                }
                var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;
                var lib$es6$promise$promise$$counter = 0;
                function lib$es6$promise$promise$$needsResolver() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
                }
                function lib$es6$promise$promise$$needsNew() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                }
                var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
                function lib$es6$promise$promise$$Promise(resolver) {
                    this._id = lib$es6$promise$promise$$counter++;
                    this._state = undefined;
                    this._result = undefined;
                    this._subscribers = [];
                    if (lib$es6$promise$$internal$$noop !== resolver) {
                        typeof resolver !== "function" && lib$es6$promise$promise$$needsResolver();
                        this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
                    }
                }
                lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
                lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
                lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
                lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
                lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
                lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
                lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;
                lib$es6$promise$promise$$Promise.prototype = {
                    constructor: lib$es6$promise$promise$$Promise,
                    then: lib$es6$promise$then$$default,
                    "catch": function(onRejection) {
                        return this.then(null, onRejection);
                    }
                };
                var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
                function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
                    this._instanceConstructor = Constructor;
                    this.promise = new Constructor(lib$es6$promise$$internal$$noop);
                    if (Array.isArray(input)) {
                        this._input = input;
                        this.length = input.length;
                        this._remaining = input.length;
                        this._result = new Array(this.length);
                        if (this.length === 0) {
                            lib$es6$promise$$internal$$fulfill(this.promise, this._result);
                        } else {
                            this.length = this.length || 0;
                            this._enumerate();
                            if (this._remaining === 0) {
                                lib$es6$promise$$internal$$fulfill(this.promise, this._result);
                            }
                        }
                    } else {
                        lib$es6$promise$$internal$$reject(this.promise, this._validationError());
                    }
                }
                lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
                    return new Error("Array Methods must be provided an Array");
                };
                lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
                    var length = this.length;
                    var input = this._input;
                    for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
                        this._eachEntry(input[i], i);
                    }
                };
                lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
                    var c = this._instanceConstructor;
                    var resolve = c.resolve;
                    if (resolve === lib$es6$promise$promise$resolve$$default) {
                        var then = lib$es6$promise$$internal$$getThen(entry);
                        if (then === lib$es6$promise$then$$default && entry._state !== lib$es6$promise$$internal$$PENDING) {
                            this._settledAt(entry._state, i, entry._result);
                        } else if (typeof then !== "function") {
                            this._remaining--;
                            this._result[i] = entry;
                        } else if (c === lib$es6$promise$promise$$default) {
                            var promise = new c(lib$es6$promise$$internal$$noop);
                            lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
                            this._willSettleAt(promise, i);
                        } else {
                            this._willSettleAt(new c(function(resolve) {
                                resolve(entry);
                            }), i);
                        }
                    } else {
                        this._willSettleAt(resolve(entry), i);
                    }
                };
                lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
                    var promise = this.promise;
                    if (promise._state === lib$es6$promise$$internal$$PENDING) {
                        this._remaining--;
                        if (state === lib$es6$promise$$internal$$REJECTED) {
                            lib$es6$promise$$internal$$reject(promise, value);
                        } else {
                            this._result[i] = value;
                        }
                    }
                    if (this._remaining === 0) {
                        lib$es6$promise$$internal$$fulfill(promise, this._result);
                    }
                };
                lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
                    var enumerator = this;
                    lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
                        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
                    }, function(reason) {
                        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
                    });
                };
                function lib$es6$promise$polyfill$$polyfill() {
                    var local;
                    if (typeof global !== "undefined") {
                        local = global;
                    } else if (typeof self !== "undefined") {
                        local = self;
                    } else {
                        try {
                            local = Function("return this")();
                        } catch (e) {
                            throw new Error("polyfill failed because global object is unavailable in this environment");
                        }
                    }
                    var P = local.Promise;
                    if (P && Object.prototype.toString.call(P.resolve()) === "[object Promise]" && !P.cast) {
                        return;
                    }
                    local.Promise = lib$es6$promise$promise$$default;
                }
                var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;
                var lib$es6$promise$umd$$ES6Promise = {
                    Promise: lib$es6$promise$promise$$default,
                    polyfill: lib$es6$promise$polyfill$$default
                };
                if (typeof define === "function" && define["amd"]) {
                    define(function() {
                        return lib$es6$promise$umd$$ES6Promise;
                    });
                } else if (typeof module !== "undefined" && module["exports"]) {
                    module["exports"] = lib$es6$promise$umd$$ES6Promise;
                } else if (typeof this !== "undefined") {
                    this["ES6Promise"] = lib$es6$promise$umd$$ES6Promise;
                }
                lib$es6$promise$polyfill$$default();
            }).call(this);
        }).call(this, require("_process"), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        _process: 31
    } ],
    37: [ function(require, module, exports) {
        require("whatwg-fetch");
        module.exports = self.fetch.bind(self);
    }, {
        "whatwg-fetch": 46
    } ],
    38: [ function(require, module, exports) {
        (function(isNode) {
            var Public = function(clone) {
                return merge(clone === true, false, arguments);
            }, publicName = "merge";
            Public.recursive = function(clone) {
                return merge(clone === true, true, arguments);
            };
            Public.clone = function(input) {
                var output = input, type = typeOf(input), index, size;
                if (type === "array") {
                    output = [];
                    size = input.length;
                    for (index = 0; index < size; ++index) output[index] = Public.clone(input[index]);
                } else if (type === "object") {
                    output = {};
                    for (index in input) output[index] = Public.clone(input[index]);
                }
                return output;
            };
            function merge_recursive(base, extend) {
                if (typeOf(base) !== "object") return extend;
                for (var key in extend) {
                    if (typeOf(base[key]) === "object" && typeOf(extend[key]) === "object") {
                        base[key] = merge_recursive(base[key], extend[key]);
                    } else {
                        base[key] = extend[key];
                    }
                }
                return base;
            }
            function merge(clone, recursive, argv) {
                var result = argv[0], size = argv.length;
                if (clone || typeOf(result) !== "object") result = {};
                for (var index = 0; index < size; ++index) {
                    var item = argv[index], type = typeOf(item);
                    if (type !== "object") continue;
                    for (var key in item) {
                        var sitem = clone ? Public.clone(item[key]) : item[key];
                        if (recursive) {
                            result[key] = merge_recursive(result[key], sitem);
                        } else {
                            result[key] = sitem;
                        }
                    }
                }
                return result;
            }
            function typeOf(input) {
                return {}.toString.call(input).slice(8, -1).toLowerCase();
            }
            if (isNode) {
                module.exports = Public;
            } else {
                window[publicName] = Public;
            }
        })(typeof module === "object" && module && typeof module.exports === "object" && module.exports);
    }, {} ],
    39: [ function(require, module, exports) {
        "use strict";
        var Stringify = require("./stringify");
        var Parse = require("./parse");
        module.exports = {
            stringify: Stringify,
            parse: Parse
        };
    }, {
        "./parse": 40,
        "./stringify": 41
    } ],
    40: [ function(require, module, exports) {
        "use strict";
        var Utils = require("./utils");
        var internals = {
            delimiter: "&",
            depth: 5,
            arrayLimit: 20,
            parameterLimit: 1e3,
            strictNullHandling: false,
            plainObjects: false,
            allowPrototypes: false,
            allowDots: false
        };
        internals.parseValues = function(str, options) {
            var obj = {};
            var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);
            for (var i = 0; i < parts.length; ++i) {
                var part = parts[i];
                var pos = part.indexOf("]=") === -1 ? part.indexOf("=") : part.indexOf("]=") + 1;
                if (pos === -1) {
                    obj[Utils.decode(part)] = "";
                    if (options.strictNullHandling) {
                        obj[Utils.decode(part)] = null;
                    }
                } else {
                    var key = Utils.decode(part.slice(0, pos));
                    var val = Utils.decode(part.slice(pos + 1));
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        obj[key] = [].concat(obj[key]).concat(val);
                    } else {
                        obj[key] = val;
                    }
                }
            }
            return obj;
        };
        internals.parseObject = function(chain, val, options) {
            if (!chain.length) {
                return val;
            }
            var root = chain.shift();
            var obj;
            if (root === "[]") {
                obj = [];
                obj = obj.concat(internals.parseObject(chain, val, options));
            } else {
                obj = options.plainObjects ? Object.create(null) : {};
                var cleanRoot = root[0] === "[" && root[root.length - 1] === "]" ? root.slice(1, root.length - 1) : root;
                var index = parseInt(cleanRoot, 10);
                if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
                    obj = [];
                    obj[index] = internals.parseObject(chain, val, options);
                } else {
                    obj[cleanRoot] = internals.parseObject(chain, val, options);
                }
            }
            return obj;
        };
        internals.parseKeys = function(givenKey, val, options) {
            if (!givenKey) {
                return;
            }
            var key = options.allowDots ? givenKey.replace(/\.([^\.\[]+)/g, "[$1]") : givenKey;
            var parent = /^([^\[\]]*)/;
            var child = /(\[[^\[\]]*\])/g;
            var segment = parent.exec(key);
            var keys = [];
            if (segment[1]) {
                if (!options.plainObjects && Object.prototype.hasOwnProperty(segment[1])) {
                    if (!options.allowPrototypes) {
                        return;
                    }
                }
                keys.push(segment[1]);
            }
            var i = 0;
            while ((segment = child.exec(key)) !== null && i < options.depth) {
                i += 1;
                if (!options.plainObjects && Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ""))) {
                    if (!options.allowPrototypes) {
                        continue;
                    }
                }
                keys.push(segment[1]);
            }
            if (segment) {
                keys.push("[" + key.slice(segment.index) + "]");
            }
            return internals.parseObject(keys, val, options);
        };
        module.exports = function(str, opts) {
            var options = opts || {};
            options.delimiter = typeof options.delimiter === "string" || Utils.isRegExp(options.delimiter) ? options.delimiter : internals.delimiter;
            options.depth = typeof options.depth === "number" ? options.depth : internals.depth;
            options.arrayLimit = typeof options.arrayLimit === "number" ? options.arrayLimit : internals.arrayLimit;
            options.parseArrays = options.parseArrays !== false;
            options.allowDots = typeof options.allowDots === "boolean" ? options.allowDots : internals.allowDots;
            options.plainObjects = typeof options.plainObjects === "boolean" ? options.plainObjects : internals.plainObjects;
            options.allowPrototypes = typeof options.allowPrototypes === "boolean" ? options.allowPrototypes : internals.allowPrototypes;
            options.parameterLimit = typeof options.parameterLimit === "number" ? options.parameterLimit : internals.parameterLimit;
            options.strictNullHandling = typeof options.strictNullHandling === "boolean" ? options.strictNullHandling : internals.strictNullHandling;
            if (str === "" || str === null || typeof str === "undefined") {
                return options.plainObjects ? Object.create(null) : {};
            }
            var tempObj = typeof str === "string" ? internals.parseValues(str, options) : str;
            var obj = options.plainObjects ? Object.create(null) : {};
            var keys = Object.keys(tempObj);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                var newObj = internals.parseKeys(key, tempObj[key], options);
                obj = Utils.merge(obj, newObj, options);
            }
            return Utils.compact(obj);
        };
    }, {
        "./utils": 42
    } ],
    41: [ function(require, module, exports) {
        "use strict";
        var Utils = require("./utils");
        var internals = {
            delimiter: "&",
            arrayPrefixGenerators: {
                brackets: function(prefix) {
                    return prefix + "[]";
                },
                indices: function(prefix, key) {
                    return prefix + "[" + key + "]";
                },
                repeat: function(prefix) {
                    return prefix;
                }
            },
            strictNullHandling: false,
            skipNulls: false,
            encode: true
        };
        internals.stringify = function(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encode, filter, sort, allowDots) {
            var obj = object;
            if (typeof filter === "function") {
                obj = filter(prefix, obj);
            } else if (Utils.isBuffer(obj)) {
                obj = String(obj);
            } else if (obj instanceof Date) {
                obj = obj.toISOString();
            } else if (obj === null) {
                if (strictNullHandling) {
                    return encode ? Utils.encode(prefix) : prefix;
                }
                obj = "";
            }
            if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
                if (encode) {
                    return [ Utils.encode(prefix) + "=" + Utils.encode(obj) ];
                }
                return [ prefix + "=" + obj ];
            }
            var values = [];
            if (typeof obj === "undefined") {
                return values;
            }
            var objKeys;
            if (Array.isArray(filter)) {
                objKeys = filter;
            } else {
                var keys = Object.keys(obj);
                objKeys = sort ? keys.sort(sort) : keys;
            }
            for (var i = 0; i < objKeys.length; ++i) {
                var key = objKeys[i];
                if (skipNulls && obj[key] === null) {
                    continue;
                }
                if (Array.isArray(obj)) {
                    values = values.concat(internals.stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, skipNulls, encode, filter, sort, allowDots));
                } else {
                    values = values.concat(internals.stringify(obj[key], prefix + (allowDots ? "." + key : "[" + key + "]"), generateArrayPrefix, strictNullHandling, skipNulls, encode, filter, sort, allowDots));
                }
            }
            return values;
        };
        module.exports = function(object, opts) {
            var obj = object;
            var options = opts || {};
            var delimiter = typeof options.delimiter === "undefined" ? internals.delimiter : options.delimiter;
            var strictNullHandling = typeof options.strictNullHandling === "boolean" ? options.strictNullHandling : internals.strictNullHandling;
            var skipNulls = typeof options.skipNulls === "boolean" ? options.skipNulls : internals.skipNulls;
            var encode = typeof options.encode === "boolean" ? options.encode : internals.encode;
            var sort = typeof options.sort === "function" ? options.sort : null;
            var allowDots = typeof options.allowDots === "undefined" ? false : options.allowDots;
            var objKeys;
            var filter;
            if (typeof options.filter === "function") {
                filter = options.filter;
                obj = filter("", obj);
            } else if (Array.isArray(options.filter)) {
                objKeys = filter = options.filter;
            }
            var keys = [];
            if (typeof obj !== "object" || obj === null) {
                return "";
            }
            var arrayFormat;
            if (options.arrayFormat in internals.arrayPrefixGenerators) {
                arrayFormat = options.arrayFormat;
            } else if ("indices" in options) {
                arrayFormat = options.indices ? "indices" : "repeat";
            } else {
                arrayFormat = "indices";
            }
            var generateArrayPrefix = internals.arrayPrefixGenerators[arrayFormat];
            if (!objKeys) {
                objKeys = Object.keys(obj);
            }
            if (sort) {
                objKeys.sort(sort);
            }
            for (var i = 0; i < objKeys.length; ++i) {
                var key = objKeys[i];
                if (skipNulls && obj[key] === null) {
                    continue;
                }
                keys = keys.concat(internals.stringify(obj[key], key, generateArrayPrefix, strictNullHandling, skipNulls, encode, filter, sort, allowDots));
            }
            return keys.join(delimiter);
        };
    }, {
        "./utils": 42
    } ],
    42: [ function(require, module, exports) {
        "use strict";
        var hexTable = function() {
            var array = new Array(256);
            for (var i = 0; i < 256; ++i) {
                array[i] = "%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase();
            }
            return array;
        }();
        exports.arrayToObject = function(source, options) {
            var obj = options.plainObjects ? Object.create(null) : {};
            for (var i = 0; i < source.length; ++i) {
                if (typeof source[i] !== "undefined") {
                    obj[i] = source[i];
                }
            }
            return obj;
        };
        exports.merge = function(target, source, options) {
            if (!source) {
                return target;
            }
            if (typeof source !== "object") {
                if (Array.isArray(target)) {
                    target.push(source);
                } else if (typeof target === "object") {
                    target[source] = true;
                } else {
                    return [ target, source ];
                }
                return target;
            }
            if (typeof target !== "object") {
                return [ target ].concat(source);
            }
            var mergeTarget = target;
            if (Array.isArray(target) && !Array.isArray(source)) {
                mergeTarget = exports.arrayToObject(target, options);
            }
            return Object.keys(source).reduce(function(acc, key) {
                var value = source[key];
                if (Object.prototype.hasOwnProperty.call(acc, key)) {
                    acc[key] = exports.merge(acc[key], value, options);
                } else {
                    acc[key] = value;
                }
                return acc;
            }, mergeTarget);
        };
        exports.decode = function(str) {
            try {
                return decodeURIComponent(str.replace(/\+/g, " "));
            } catch (e) {
                return str;
            }
        };
        exports.encode = function(str) {
            if (str.length === 0) {
                return str;
            }
            var string = typeof str === "string" ? str : String(str);
            var out = "";
            for (var i = 0; i < string.length; ++i) {
                var c = string.charCodeAt(i);
                if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122) {
                    out += string.charAt(i);
                    continue;
                }
                if (c < 128) {
                    out = out + hexTable[c];
                    continue;
                }
                if (c < 2048) {
                    out = out + (hexTable[192 | c >> 6] + hexTable[128 | c & 63]);
                    continue;
                }
                if (c < 55296 || c >= 57344) {
                    out = out + (hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63]);
                    continue;
                }
                i += 1;
                c = 65536 + ((c & 1023) << 10 | string.charCodeAt(i) & 1023);
                out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
            }
            return out;
        };
        exports.compact = function(obj, references) {
            if (typeof obj !== "object" || obj === null) {
                return obj;
            }
            var refs = references || [];
            var lookup = refs.indexOf(obj);
            if (lookup !== -1) {
                return refs[lookup];
            }
            refs.push(obj);
            if (Array.isArray(obj)) {
                var compacted = [];
                for (var i = 0; i < obj.length; ++i) {
                    if (typeof obj[i] !== "undefined") {
                        compacted.push(obj[i]);
                    }
                }
                return compacted;
            }
            var keys = Object.keys(obj);
            for (var j = 0; j < keys.length; ++j) {
                var key = keys[j];
                obj[key] = exports.compact(obj[key], refs);
            }
            return obj;
        };
        exports.isRegExp = function(obj) {
            return Object.prototype.toString.call(obj) === "[object RegExp]";
        };
        exports.isBuffer = function(obj) {
            if (obj === null || typeof obj === "undefined") {
                return false;
            }
            return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
        };
    }, {} ],
    43: [ function(require, module, exports) {
        "use strict";
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                    arr2[i] = arr[i];
                }
                return arr2;
            } else {
                return Array.from(arr);
            }
        }
        function _typeof(obj) {
            return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
        }
        var repeat = function repeat(str, times) {
            return new Array(times + 1).join(str);
        };
        var pad = function pad(num, maxLength) {
            return repeat("0", maxLength - num.toString().length) + num;
        };
        var formatTime = function formatTime(time) {
            return "@ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
        };
        var timer = typeof performance !== "undefined" && typeof performance.now === "function" ? performance : Date;
        function getLogLevel(level, action, payload, type) {
            switch (typeof level === "undefined" ? "undefined" : _typeof(level)) {
              case "object":
                return typeof level[type] === "function" ? level[type].apply(level, _toConsumableArray(payload)) : level[type];

              case "function":
                return level(action);

              default:
                return level;
            }
        }
        function createLogger() {
            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var _options$level = options.level;
            var level = _options$level === undefined ? "log" : _options$level;
            var _options$logger = options.logger;
            var logger = _options$logger === undefined ? console : _options$logger;
            var _options$logErrors = options.logErrors;
            var logErrors = _options$logErrors === undefined ? true : _options$logErrors;
            var collapsed = options.collapsed;
            var predicate = options.predicate;
            var _options$duration = options.duration;
            var duration = _options$duration === undefined ? false : _options$duration;
            var _options$timestamp = options.timestamp;
            var timestamp = _options$timestamp === undefined ? true : _options$timestamp;
            var transformer = options.transformer;
            var _options$stateTransfo = options.stateTransformer;
            var stateTransformer = _options$stateTransfo === undefined ? function(state) {
                return state;
            } : _options$stateTransfo;
            var _options$actionTransf = options.actionTransformer;
            var actionTransformer = _options$actionTransf === undefined ? function(actn) {
                return actn;
            } : _options$actionTransf;
            var _options$errorTransfo = options.errorTransformer;
            var errorTransformer = _options$errorTransfo === undefined ? function(error) {
                return error;
            } : _options$errorTransfo;
            var _options$colors = options.colors;
            var colors = _options$colors === undefined ? {
                title: function title() {
                    return "#000000";
                },
                prevState: function prevState() {
                    return "#9E9E9E";
                },
                action: function action() {
                    return "#03A9F4";
                },
                nextState: function nextState() {
                    return "#4CAF50";
                },
                error: function error() {
                    return "#F20404";
                }
            } : _options$colors;
            if (typeof logger === "undefined") {
                return function() {
                    return function(next) {
                        return function(action) {
                            return next(action);
                        };
                    };
                };
            }
            if (transformer) {
                console.error("Option 'transformer' is deprecated, use stateTransformer instead");
            }
            var logBuffer = [];
            function printBuffer() {
                logBuffer.forEach(function(logEntry, key) {
                    var started = logEntry.started;
                    var startedTime = logEntry.startedTime;
                    var action = logEntry.action;
                    var prevState = logEntry.prevState;
                    var error = logEntry.error;
                    var took = logEntry.took;
                    var nextState = logEntry.nextState;
                    var nextEntry = logBuffer[key + 1];
                    if (nextEntry) {
                        nextState = nextEntry.prevState;
                        took = nextEntry.started - started;
                    }
                    var formattedAction = actionTransformer(action);
                    var isCollapsed = typeof collapsed === "function" ? collapsed(function() {
                        return nextState;
                    }, action) : collapsed;
                    var formattedTime = formatTime(startedTime);
                    var titleCSS = colors.title ? "color: " + colors.title(formattedAction) + ";" : null;
                    var title = "action " + (timestamp ? formattedTime : "") + " " + formattedAction.type + " " + (duration ? "(in " + took.toFixed(2) + " ms)" : "");
                    try {
                        if (isCollapsed) {
                            if (colors.title) logger.groupCollapsed("%c " + title, titleCSS); else logger.groupCollapsed(title);
                        } else {
                            if (colors.title) logger.group("%c " + title, titleCSS); else logger.group(title);
                        }
                    } catch (e) {
                        logger.log(title);
                    }
                    var prevStateLevel = getLogLevel(level, formattedAction, [ prevState ], "prevState");
                    var actionLevel = getLogLevel(level, formattedAction, [ formattedAction ], "action");
                    var errorLevel = getLogLevel(level, formattedAction, [ error, prevState ], "error");
                    var nextStateLevel = getLogLevel(level, formattedAction, [ nextState ], "nextState");
                    if (prevStateLevel) {
                        if (colors.prevState) logger[prevStateLevel]("%c prev state", "color: " + colors.prevState(prevState) + "; font-weight: bold", prevState); else logger[prevStateLevel]("prev state", prevState);
                    }
                    if (actionLevel) {
                        if (colors.action) logger[actionLevel]("%c action", "color: " + colors.action(formattedAction) + "; font-weight: bold", formattedAction); else logger[actionLevel]("action", formattedAction);
                    }
                    if (error && errorLevel) {
                        if (colors.error) logger[errorLevel]("%c error", "color: " + colors.error(error, prevState) + "; font-weight: bold", error); else logger[errorLevel]("error", error);
                    }
                    if (nextStateLevel) {
                        if (colors.nextState) logger[nextStateLevel]("%c next state", "color: " + colors.nextState(nextState) + "; font-weight: bold", nextState); else logger[nextStateLevel]("next state", nextState);
                    }
                    try {
                        logger.groupEnd();
                    } catch (e) {
                        logger.log("—— log end ——");
                    }
                });
                logBuffer.length = 0;
            }
            return function(_ref) {
                var getState = _ref.getState;
                return function(next) {
                    return function(action) {
                        if (typeof predicate === "function" && !predicate(getState, action)) {
                            return next(action);
                        }
                        var logEntry = {};
                        logBuffer.push(logEntry);
                        logEntry.started = timer.now();
                        logEntry.startedTime = new Date();
                        logEntry.prevState = stateTransformer(getState());
                        logEntry.action = action;
                        var returnedValue = undefined;
                        if (logErrors) {
                            try {
                                returnedValue = next(action);
                            } catch (e) {
                                logEntry.error = errorTransformer(e);
                            }
                        } else {
                            returnedValue = next(action);
                        }
                        logEntry.took = timer.now() - logEntry.started;
                        logEntry.nextState = stateTransformer(getState());
                        printBuffer();
                        if (logEntry.error) throw logEntry.error;
                        return returnedValue;
                    };
                };
            };
        }
        module.exports = createLogger;
    }, {} ],
    44: [ function(require, module, exports) {
        "use strict";
        var punycode = require("punycode");
        var util = require("./util");
        exports.parse = urlParse;
        exports.resolve = urlResolve;
        exports.resolveObject = urlResolveObject;
        exports.format = urlFormat;
        exports.Url = Url;
        function Url() {
            this.protocol = null;
            this.slashes = null;
            this.auth = null;
            this.host = null;
            this.port = null;
            this.hostname = null;
            this.hash = null;
            this.search = null;
            this.query = null;
            this.pathname = null;
            this.path = null;
            this.href = null;
        }
        var protocolPattern = /^([a-z0-9.+-]+:)/i, portPattern = /:[0-9]*$/, simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, delims = [ "<", ">", '"', "`", " ", "\r", "\n", "	" ], unwise = [ "{", "}", "|", "\\", "^", "`" ].concat(delims), autoEscape = [ "'" ].concat(unwise), nonHostChars = [ "%", "/", "?", ";", "#" ].concat(autoEscape), hostEndingChars = [ "/", "?", "#" ], hostnameMaxLen = 255, hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/, hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, unsafeProtocol = {
            javascript: true,
            "javascript:": true
        }, hostlessProtocol = {
            javascript: true,
            "javascript:": true
        }, slashedProtocol = {
            http: true,
            https: true,
            ftp: true,
            gopher: true,
            file: true,
            "http:": true,
            "https:": true,
            "ftp:": true,
            "gopher:": true,
            "file:": true
        }, querystring = require("querystring");
        function urlParse(url, parseQueryString, slashesDenoteHost) {
            if (url && util.isObject(url) && url instanceof Url) return url;
            var u = new Url();
            u.parse(url, parseQueryString, slashesDenoteHost);
            return u;
        }
        Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
            if (!util.isString(url)) {
                throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
            }
            var queryIndex = url.indexOf("?"), splitter = queryIndex !== -1 && queryIndex < url.indexOf("#") ? "?" : "#", uSplit = url.split(splitter), slashRegex = /\\/g;
            uSplit[0] = uSplit[0].replace(slashRegex, "/");
            url = uSplit.join(splitter);
            var rest = url;
            rest = rest.trim();
            if (!slashesDenoteHost && url.split("#").length === 1) {
                var simplePath = simplePathPattern.exec(rest);
                if (simplePath) {
                    this.path = rest;
                    this.href = rest;
                    this.pathname = simplePath[1];
                    if (simplePath[2]) {
                        this.search = simplePath[2];
                        if (parseQueryString) {
                            this.query = querystring.parse(this.search.substr(1));
                        } else {
                            this.query = this.search.substr(1);
                        }
                    } else if (parseQueryString) {
                        this.search = "";
                        this.query = {};
                    }
                    return this;
                }
            }
            var proto = protocolPattern.exec(rest);
            if (proto) {
                proto = proto[0];
                var lowerProto = proto.toLowerCase();
                this.protocol = lowerProto;
                rest = rest.substr(proto.length);
            }
            if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                var slashes = rest.substr(0, 2) === "//";
                if (slashes && !(proto && hostlessProtocol[proto])) {
                    rest = rest.substr(2);
                    this.slashes = true;
                }
            }
            if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
                var hostEnd = -1;
                for (var i = 0; i < hostEndingChars.length; i++) {
                    var hec = rest.indexOf(hostEndingChars[i]);
                    if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
                }
                var auth, atSign;
                if (hostEnd === -1) {
                    atSign = rest.lastIndexOf("@");
                } else {
                    atSign = rest.lastIndexOf("@", hostEnd);
                }
                if (atSign !== -1) {
                    auth = rest.slice(0, atSign);
                    rest = rest.slice(atSign + 1);
                    this.auth = decodeURIComponent(auth);
                }
                hostEnd = -1;
                for (var i = 0; i < nonHostChars.length; i++) {
                    var hec = rest.indexOf(nonHostChars[i]);
                    if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
                }
                if (hostEnd === -1) hostEnd = rest.length;
                this.host = rest.slice(0, hostEnd);
                rest = rest.slice(hostEnd);
                this.parseHost();
                this.hostname = this.hostname || "";
                var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
                if (!ipv6Hostname) {
                    var hostparts = this.hostname.split(/\./);
                    for (var i = 0, l = hostparts.length; i < l; i++) {
                        var part = hostparts[i];
                        if (!part) continue;
                        if (!part.match(hostnamePartPattern)) {
                            var newpart = "";
                            for (var j = 0, k = part.length; j < k; j++) {
                                if (part.charCodeAt(j) > 127) {
                                    newpart += "x";
                                } else {
                                    newpart += part[j];
                                }
                            }
                            if (!newpart.match(hostnamePartPattern)) {
                                var validParts = hostparts.slice(0, i);
                                var notHost = hostparts.slice(i + 1);
                                var bit = part.match(hostnamePartStart);
                                if (bit) {
                                    validParts.push(bit[1]);
                                    notHost.unshift(bit[2]);
                                }
                                if (notHost.length) {
                                    rest = "/" + notHost.join(".") + rest;
                                }
                                this.hostname = validParts.join(".");
                                break;
                            }
                        }
                    }
                }
                if (this.hostname.length > hostnameMaxLen) {
                    this.hostname = "";
                } else {
                    this.hostname = this.hostname.toLowerCase();
                }
                if (!ipv6Hostname) {
                    this.hostname = punycode.toASCII(this.hostname);
                }
                var p = this.port ? ":" + this.port : "";
                var h = this.hostname || "";
                this.host = h + p;
                this.href += this.host;
                if (ipv6Hostname) {
                    this.hostname = this.hostname.substr(1, this.hostname.length - 2);
                    if (rest[0] !== "/") {
                        rest = "/" + rest;
                    }
                }
            }
            if (!unsafeProtocol[lowerProto]) {
                for (var i = 0, l = autoEscape.length; i < l; i++) {
                    var ae = autoEscape[i];
                    if (rest.indexOf(ae) === -1) continue;
                    var esc = encodeURIComponent(ae);
                    if (esc === ae) {
                        esc = escape(ae);
                    }
                    rest = rest.split(ae).join(esc);
                }
            }
            var hash = rest.indexOf("#");
            if (hash !== -1) {
                this.hash = rest.substr(hash);
                rest = rest.slice(0, hash);
            }
            var qm = rest.indexOf("?");
            if (qm !== -1) {
                this.search = rest.substr(qm);
                this.query = rest.substr(qm + 1);
                if (parseQueryString) {
                    this.query = querystring.parse(this.query);
                }
                rest = rest.slice(0, qm);
            } else if (parseQueryString) {
                this.search = "";
                this.query = {};
            }
            if (rest) this.pathname = rest;
            if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
                this.pathname = "/";
            }
            if (this.pathname || this.search) {
                var p = this.pathname || "";
                var s = this.search || "";
                this.path = p + s;
            }
            this.href = this.format();
            return this;
        };
        function urlFormat(obj) {
            if (util.isString(obj)) obj = urlParse(obj);
            if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
            return obj.format();
        }
        Url.prototype.format = function() {
            var auth = this.auth || "";
            if (auth) {
                auth = encodeURIComponent(auth);
                auth = auth.replace(/%3A/i, ":");
                auth += "@";
            }
            var protocol = this.protocol || "", pathname = this.pathname || "", hash = this.hash || "", host = false, query = "";
            if (this.host) {
                host = auth + this.host;
            } else if (this.hostname) {
                host = auth + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]");
                if (this.port) {
                    host += ":" + this.port;
                }
            }
            if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {
                query = querystring.stringify(this.query);
            }
            var search = this.search || query && "?" + query || "";
            if (protocol && protocol.substr(-1) !== ":") protocol += ":";
            if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
                host = "//" + (host || "");
                if (pathname && pathname.charAt(0) !== "/") pathname = "/" + pathname;
            } else if (!host) {
                host = "";
            }
            if (hash && hash.charAt(0) !== "#") hash = "#" + hash;
            if (search && search.charAt(0) !== "?") search = "?" + search;
            pathname = pathname.replace(/[?#]/g, function(match) {
                return encodeURIComponent(match);
            });
            search = search.replace("#", "%23");
            return protocol + host + pathname + search + hash;
        };
        function urlResolve(source, relative) {
            return urlParse(source, false, true).resolve(relative);
        }
        Url.prototype.resolve = function(relative) {
            return this.resolveObject(urlParse(relative, false, true)).format();
        };
        function urlResolveObject(source, relative) {
            if (!source) return relative;
            return urlParse(source, false, true).resolveObject(relative);
        }
        Url.prototype.resolveObject = function(relative) {
            if (util.isString(relative)) {
                var rel = new Url();
                rel.parse(relative, false, true);
                relative = rel;
            }
            var result = new Url();
            var tkeys = Object.keys(this);
            for (var tk = 0; tk < tkeys.length; tk++) {
                var tkey = tkeys[tk];
                result[tkey] = this[tkey];
            }
            result.hash = relative.hash;
            if (relative.href === "") {
                result.href = result.format();
                return result;
            }
            if (relative.slashes && !relative.protocol) {
                var rkeys = Object.keys(relative);
                for (var rk = 0; rk < rkeys.length; rk++) {
                    var rkey = rkeys[rk];
                    if (rkey !== "protocol") result[rkey] = relative[rkey];
                }
                if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
                    result.path = result.pathname = "/";
                }
                result.href = result.format();
                return result;
            }
            if (relative.protocol && relative.protocol !== result.protocol) {
                if (!slashedProtocol[relative.protocol]) {
                    var keys = Object.keys(relative);
                    for (var v = 0; v < keys.length; v++) {
                        var k = keys[v];
                        result[k] = relative[k];
                    }
                    result.href = result.format();
                    return result;
                }
                result.protocol = relative.protocol;
                if (!relative.host && !hostlessProtocol[relative.protocol]) {
                    var relPath = (relative.pathname || "").split("/");
                    while (relPath.length && !(relative.host = relPath.shift())) ;
                    if (!relative.host) relative.host = "";
                    if (!relative.hostname) relative.hostname = "";
                    if (relPath[0] !== "") relPath.unshift("");
                    if (relPath.length < 2) relPath.unshift("");
                    result.pathname = relPath.join("/");
                } else {
                    result.pathname = relative.pathname;
                }
                result.search = relative.search;
                result.query = relative.query;
                result.host = relative.host || "";
                result.auth = relative.auth;
                result.hostname = relative.hostname || relative.host;
                result.port = relative.port;
                if (result.pathname || result.search) {
                    var p = result.pathname || "";
                    var s = result.search || "";
                    result.path = p + s;
                }
                result.slashes = result.slashes || relative.slashes;
                result.href = result.format();
                return result;
            }
            var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/", isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], relPath = relative.pathname && relative.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
            if (psychotic) {
                result.hostname = "";
                result.port = null;
                if (result.host) {
                    if (srcPath[0] === "") srcPath[0] = result.host; else srcPath.unshift(result.host);
                }
                result.host = "";
                if (relative.protocol) {
                    relative.hostname = null;
                    relative.port = null;
                    if (relative.host) {
                        if (relPath[0] === "") relPath[0] = relative.host; else relPath.unshift(relative.host);
                    }
                    relative.host = null;
                }
                mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
            }
            if (isRelAbs) {
                result.host = relative.host || relative.host === "" ? relative.host : result.host;
                result.hostname = relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname;
                result.search = relative.search;
                result.query = relative.query;
                srcPath = relPath;
            } else if (relPath.length) {
                if (!srcPath) srcPath = [];
                srcPath.pop();
                srcPath = srcPath.concat(relPath);
                result.search = relative.search;
                result.query = relative.query;
            } else if (!util.isNullOrUndefined(relative.search)) {
                if (psychotic) {
                    result.hostname = result.host = srcPath.shift();
                    var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
                    if (authInHost) {
                        result.auth = authInHost.shift();
                        result.host = result.hostname = authInHost.shift();
                    }
                }
                result.search = relative.search;
                result.query = relative.query;
                if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
                    result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
                }
                result.href = result.format();
                return result;
            }
            if (!srcPath.length) {
                result.pathname = null;
                if (result.search) {
                    result.path = "/" + result.search;
                } else {
                    result.path = null;
                }
                result.href = result.format();
                return result;
            }
            var last = srcPath.slice(-1)[0];
            var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
            var up = 0;
            for (var i = srcPath.length; i >= 0; i--) {
                last = srcPath[i];
                if (last === ".") {
                    srcPath.splice(i, 1);
                } else if (last === "..") {
                    srcPath.splice(i, 1);
                    up++;
                } else if (up) {
                    srcPath.splice(i, 1);
                    up--;
                }
            }
            if (!mustEndAbs && !removeAllDots) {
                for (;up--; up) {
                    srcPath.unshift("..");
                }
            }
            if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
                srcPath.unshift("");
            }
            if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
                srcPath.push("");
            }
            var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
            if (psychotic) {
                result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
                var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
                if (authInHost) {
                    result.auth = authInHost.shift();
                    result.host = result.hostname = authInHost.shift();
                }
            }
            mustEndAbs = mustEndAbs || result.host && srcPath.length;
            if (mustEndAbs && !isAbsolute) {
                srcPath.unshift("");
            }
            if (!srcPath.length) {
                result.pathname = null;
                result.path = null;
            } else {
                result.pathname = srcPath.join("/");
            }
            if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
                result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
            }
            result.auth = relative.auth || result.auth;
            result.slashes = result.slashes || relative.slashes;
            result.href = result.format();
            return result;
        };
        Url.prototype.parseHost = function() {
            var host = this.host;
            var port = portPattern.exec(host);
            if (port) {
                port = port[0];
                if (port !== ":") {
                    this.port = port.substr(1);
                }
                host = host.substr(0, host.length - port.length);
            }
            if (host) this.hostname = host;
        };
    }, {
        "./util": 45,
        punycode: 32,
        querystring: 35
    } ],
    45: [ function(require, module, exports) {
        "use strict";
        module.exports = {
            isString: function(arg) {
                return typeof arg === "string";
            },
            isObject: function(arg) {
                return typeof arg === "object" && arg !== null;
            },
            isNull: function(arg) {
                return arg === null;
            },
            isNullOrUndefined: function(arg) {
                return arg == null;
            }
        };
    }, {} ],
    46: [ function(require, module, exports) {
        (function(self) {
            "use strict";
            if (self.fetch) {
                return;
            }
            function normalizeName(name) {
                if (typeof name !== "string") {
                    name = String(name);
                }
                if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
                    throw new TypeError("Invalid character in header field name");
                }
                return name.toLowerCase();
            }
            function normalizeValue(value) {
                if (typeof value !== "string") {
                    value = String(value);
                }
                return value;
            }
            function Headers(headers) {
                this.map = {};
                if (headers instanceof Headers) {
                    headers.forEach(function(value, name) {
                        this.append(name, value);
                    }, this);
                } else if (headers) {
                    Object.getOwnPropertyNames(headers).forEach(function(name) {
                        this.append(name, headers[name]);
                    }, this);
                }
            }
            Headers.prototype.append = function(name, value) {
                name = normalizeName(name);
                value = normalizeValue(value);
                var list = this.map[name];
                if (!list) {
                    list = [];
                    this.map[name] = list;
                }
                list.push(value);
            };
            Headers.prototype["delete"] = function(name) {
                delete this.map[normalizeName(name)];
            };
            Headers.prototype.get = function(name) {
                var values = this.map[normalizeName(name)];
                return values ? values[0] : null;
            };
            Headers.prototype.getAll = function(name) {
                return this.map[normalizeName(name)] || [];
            };
            Headers.prototype.has = function(name) {
                return this.map.hasOwnProperty(normalizeName(name));
            };
            Headers.prototype.set = function(name, value) {
                this.map[normalizeName(name)] = [ normalizeValue(value) ];
            };
            Headers.prototype.forEach = function(callback, thisArg) {
                Object.getOwnPropertyNames(this.map).forEach(function(name) {
                    this.map[name].forEach(function(value) {
                        callback.call(thisArg, value, name, this);
                    }, this);
                }, this);
            };
            function consumed(body) {
                if (body.bodyUsed) {
                    return Promise.reject(new TypeError("Already read"));
                }
                body.bodyUsed = true;
            }
            function fileReaderReady(reader) {
                return new Promise(function(resolve, reject) {
                    reader.onload = function() {
                        resolve(reader.result);
                    };
                    reader.onerror = function() {
                        reject(reader.error);
                    };
                });
            }
            function readBlobAsArrayBuffer(blob) {
                var reader = new FileReader();
                reader.readAsArrayBuffer(blob);
                return fileReaderReady(reader);
            }
            function readBlobAsText(blob) {
                var reader = new FileReader();
                reader.readAsText(blob);
                return fileReaderReady(reader);
            }
            var support = {
                blob: "FileReader" in self && "Blob" in self && function() {
                    try {
                        new Blob();
                        return true;
                    } catch (e) {
                        return false;
                    }
                }(),
                formData: "FormData" in self,
                arrayBuffer: "ArrayBuffer" in self
            };
            function Body() {
                this.bodyUsed = false;
                this._initBody = function(body) {
                    this._bodyInit = body;
                    if (typeof body === "string") {
                        this._bodyText = body;
                    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                        this._bodyBlob = body;
                    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                        this._bodyFormData = body;
                    } else if (!body) {
                        this._bodyText = "";
                    } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {} else {
                        throw new Error("unsupported BodyInit type");
                    }
                    if (!this.headers.get("content-type")) {
                        if (typeof body === "string") {
                            this.headers.set("content-type", "text/plain;charset=UTF-8");
                        } else if (this._bodyBlob && this._bodyBlob.type) {
                            this.headers.set("content-type", this._bodyBlob.type);
                        }
                    }
                };
                if (support.blob) {
                    this.blob = function() {
                        var rejected = consumed(this);
                        if (rejected) {
                            return rejected;
                        }
                        if (this._bodyBlob) {
                            return Promise.resolve(this._bodyBlob);
                        } else if (this._bodyFormData) {
                            throw new Error("could not read FormData body as blob");
                        } else {
                            return Promise.resolve(new Blob([ this._bodyText ]));
                        }
                    };
                    this.arrayBuffer = function() {
                        return this.blob().then(readBlobAsArrayBuffer);
                    };
                    this.text = function() {
                        var rejected = consumed(this);
                        if (rejected) {
                            return rejected;
                        }
                        if (this._bodyBlob) {
                            return readBlobAsText(this._bodyBlob);
                        } else if (this._bodyFormData) {
                            throw new Error("could not read FormData body as text");
                        } else {
                            return Promise.resolve(this._bodyText);
                        }
                    };
                } else {
                    this.text = function() {
                        var rejected = consumed(this);
                        return rejected ? rejected : Promise.resolve(this._bodyText);
                    };
                }
                if (support.formData) {
                    this.formData = function() {
                        return this.text().then(decode);
                    };
                }
                this.json = function() {
                    return this.text().then(JSON.parse);
                };
                return this;
            }
            var methods = [ "DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT" ];
            function normalizeMethod(method) {
                var upcased = method.toUpperCase();
                return methods.indexOf(upcased) > -1 ? upcased : method;
            }
            function Request(input, options) {
                options = options || {};
                var body = options.body;
                if (Request.prototype.isPrototypeOf(input)) {
                    if (input.bodyUsed) {
                        throw new TypeError("Already read");
                    }
                    this.url = input.url;
                    this.credentials = input.credentials;
                    if (!options.headers) {
                        this.headers = new Headers(input.headers);
                    }
                    this.method = input.method;
                    this.mode = input.mode;
                    if (!body) {
                        body = input._bodyInit;
                        input.bodyUsed = true;
                    }
                } else {
                    this.url = input;
                }
                this.credentials = options.credentials || this.credentials || "omit";
                if (options.headers || !this.headers) {
                    this.headers = new Headers(options.headers);
                }
                this.method = normalizeMethod(options.method || this.method || "GET");
                this.mode = options.mode || this.mode || null;
                this.referrer = null;
                if ((this.method === "GET" || this.method === "HEAD") && body) {
                    throw new TypeError("Body not allowed for GET or HEAD requests");
                }
                this._initBody(body);
            }
            Request.prototype.clone = function() {
                return new Request(this);
            };
            function decode(body) {
                var form = new FormData();
                body.trim().split("&").forEach(function(bytes) {
                    if (bytes) {
                        var split = bytes.split("=");
                        var name = split.shift().replace(/\+/g, " ");
                        var value = split.join("=").replace(/\+/g, " ");
                        form.append(decodeURIComponent(name), decodeURIComponent(value));
                    }
                });
                return form;
            }
            function headers(xhr) {
                var head = new Headers();
                var pairs = xhr.getAllResponseHeaders().trim().split("\n");
                pairs.forEach(function(header) {
                    var split = header.trim().split(":");
                    var key = split.shift().trim();
                    var value = split.join(":").trim();
                    head.append(key, value);
                });
                return head;
            }
            Body.call(Request.prototype);
            function Response(bodyInit, options) {
                if (!options) {
                    options = {};
                }
                this.type = "default";
                this.status = options.status;
                this.ok = this.status >= 200 && this.status < 300;
                this.statusText = options.statusText;
                this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
                this.url = options.url || "";
                this._initBody(bodyInit);
            }
            Body.call(Response.prototype);
            Response.prototype.clone = function() {
                return new Response(this._bodyInit, {
                    status: this.status,
                    statusText: this.statusText,
                    headers: new Headers(this.headers),
                    url: this.url
                });
            };
            Response.error = function() {
                var response = new Response(null, {
                    status: 0,
                    statusText: ""
                });
                response.type = "error";
                return response;
            };
            var redirectStatuses = [ 301, 302, 303, 307, 308 ];
            Response.redirect = function(url, status) {
                if (redirectStatuses.indexOf(status) === -1) {
                    throw new RangeError("Invalid status code");
                }
                return new Response(null, {
                    status: status,
                    headers: {
                        location: url
                    }
                });
            };
            self.Headers = Headers;
            self.Request = Request;
            self.Response = Response;
            self.fetch = function(input, init) {
                return new Promise(function(resolve, reject) {
                    var request;
                    if (Request.prototype.isPrototypeOf(input) && !init) {
                        request = input;
                    } else {
                        request = new Request(input, init);
                    }
                    var xhr = new XMLHttpRequest();
                    function responseURL() {
                        if ("responseURL" in xhr) {
                            return xhr.responseURL;
                        }
                        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
                            return xhr.getResponseHeader("X-Request-URL");
                        }
                        return;
                    }
                    xhr.onload = function() {
                        var status = xhr.status === 1223 ? 204 : xhr.status;
                        if (status < 100 || status > 599) {
                            reject(new TypeError("Network request failed"));
                            return;
                        }
                        var options = {
                            status: status,
                            statusText: xhr.statusText,
                            headers: headers(xhr),
                            url: responseURL()
                        };
                        var body = "response" in xhr ? xhr.response : xhr.responseText;
                        resolve(new Response(body, options));
                    };
                    xhr.onerror = function() {
                        reject(new TypeError("Network request failed"));
                    };
                    xhr.open(request.method, request.url, true);
                    if (request.credentials === "include") {
                        xhr.withCredentials = true;
                    }
                    if ("responseType" in xhr && support.blob) {
                        xhr.responseType = "blob";
                    }
                    request.headers.forEach(function(value, name) {
                        xhr.setRequestHeader(name, value);
                    });
                    xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
                });
            };
            self.fetch.polyfill = true;
        })(typeof self !== "undefined" ? self : this);
    }, {} ]
}, {}, [ 1 ]);
//# sourceMappingURL=bundle-framework.js.map
