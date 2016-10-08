/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Application = __webpack_require__(1);

	var _Application2 = _interopRequireDefault(_Application);

	var _Constants = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	$('domready', function () {
	    new _Application2.default({
	        week: '2016_03_21',
	        plan: _Constants.plan_types.TWO_PERSON
	    });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  - Take Home Code Test
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author - Tolu Abayomi
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * May 2016
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _DataService = __webpack_require__(3);

	var _DataService2 = _interopRequireDefault(_DataService);

	var _ViewManager = __webpack_require__(4);

	var _ViewManager2 = _interopRequireDefault(_ViewManager);

	var _TwoPersonView = __webpack_require__(5);

	var _TwoPersonView2 = _interopRequireDefault(_TwoPersonView);

	var _FamilyView = __webpack_require__(6);

	var _FamilyView2 = _interopRequireDefault(_FamilyView);

	var _StateManager = __webpack_require__(7);

	var _StateManager2 = _interopRequireDefault(_StateManager);

	var _Constants = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* Array of option objects to initialize the select navigation list */
	var weeks = [{ label: '2016-03-21', value: '2016_03_21', disabled: false, selected: false }, { label: '2016-03-28', value: '2016_03_28', disabled: false, selected: false }];

	/* Application Class  - Main driver class for the application */

	var Application = function () {
	    function Application(options) {
	        _classCallCheck(this, Application);

	        var week = options.week;
	        var plan = options.plan;

	        this.view_manager = new _ViewManager2.default({
	            views: {
	                'two_person': new _TwoPersonView2.default(),
	                'family': new _FamilyView2.default()
	            },
	            view_container: document.querySelector('.recipe-group')
	        });

	        this.initApplicationState(options);
	        this.data_service = new _DataService2.default();
	        this.renderViewElements();

	        this.data_service.loadRecipes({
	            plan: this.current_state.plan.value,
	            week: this.current_state.week,
	            success: this.handleRecipeDataReady.bind(this)
	        });

	        $(this.view_manager.view_container).on('click', '.btn', this.handleWineSelect.bind(this));
	    }
	    /**
	     * Load application state. Check if location is a bookmarked state
	     * @param {object} options - user defined options to default to on application start
	     */


	    _createClass(Application, [{
	        key: 'initApplicationState',
	        value: function initApplicationState(options) {
	            var state = { 'plan': null, 'week': null, preserve_state: true };
	            var location_state = void 0;

	            _StateManager2.default.initialize(this.handlePopStateChange.bind(this));
	            location_state = _StateManager2.default.getLocationState();

	            if (location_state) {
	                this.current_state = location_state;
	            } else {
	                this.current_state = Object.assign({}, state, options);
	            }
	        }
	    }, {
	        key: 'renderViewElements',
	        value: function renderViewElements() {
	            this.compileViews();
	            this.nav_container = document.querySelector('.nav-content');
	            this.nav_el = document.querySelector('.nav');
	            this.renderNavList(this.current_state.plan.value);
	            $(this.nav_container).on('click', 'a', this.handleNavClick.bind(this));

	            this.renderSelectList();
	        }

	        /**
	         * Change in application state by one of two elements - the dropdown list and nav links triggers data load
	         * @param {object} new_state - new state of application
	         */

	    }, {
	        key: 'setState',
	        value: function setState(new_state) {
	            var updated = Object.assign({}, this.current_state, new_state);
	            this.current_state = updated;
	            var options = {
	                plan: this.current_state.plan.value,
	                week: this.current_state.week,
	                success: this.handleRecipeDataReady.bind(this)
	            };
	            this.data_service.loadRecipes(options);
	        }

	        /**
	         * pre-compile views on application load to speed up render
	         */

	    }, {
	        key: 'compileViews',
	        value: function compileViews() {
	            var nav_html = $('#nav-template').html();
	            this.nav_html = Handlebars.compile(nav_html);

	            var modal_html = $('#wine-template').html();
	            this.modal_html = Handlebars.compile(modal_html);
	        }

	        /**
	         * Render navigation links preset with current application state
	         * @parm {string} active - Currently active plan_id
	         */

	    }, {
	        key: 'renderNavList',
	        value: function renderNavList() {
	            var active = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	            var nav_plans = [];
	            var keys = Object.keys(_Constants.plan_types);

	            keys.forEach(function (type) {
	                nav_plans.push(_Constants.plan_types[type]);
	                if (_Constants.plan_types[type].value == active) {
	                    _Constants.plan_types[type].active = true;
	                } else {
	                    _Constants.plan_types[type].active = false;
	                }
	            });

	            var nav_menu = this.nav_html({
	                plans: nav_plans
	            });

	            this.nav_container.innerHTML = nav_menu;
	        }

	        /**
	         * Render dropdown list preset with current application state
	         */

	    }, {
	        key: 'renderSelectList',
	        value: function renderSelectList() {
	            var _this = this;

	            var container = document.querySelector('.recipe-week-select');
	            var default_option = { label: 'Choose a week', value: '', disabled: true, selected: false };

	            if (this.current_state.week) {
	                weeks.forEach(function (week) {
	                    if (week.value === _this.current_state.week) {
	                        week.selected = true;
	                    }
	                });
	            } else {
	                default_option.selected = true;
	            }

	            var options = [default_option].concat(weeks);

	            var selectList = document.createElement('select');
	            selectList.setAttribute('class', 'form-control');

	            options.forEach(function (option) {
	                var opt = document.createElement('option');
	                opt.setAttribute('value', option.value);
	                opt.textContent = option.label;

	                if (option.disabled) {
	                    opt.setAttribute('disabled', 'disabled');
	                }

	                if (option.selected) {
	                    opt.setAttribute('selected', 'selected');
	                }

	                selectList.appendChild(opt);
	            });

	            $(container).empty();
	            container.appendChild(selectList);
	            selectList.addEventListener('change', this.handleWeekChange.bind(this));
	        }

	        /**  Event Handlers  */

	    }, {
	        key: 'handleRecipeDataReady',
	        value: function handleRecipeDataReady(data) {
	            var location_hash = void 0;
	            var current_view = this.current_state.plan.value;
	            this.view_manager.views[current_view].setViewData(data);

	            if (this.current_state.preserve_state) {
	                //true if triggered by nav or dropdown
	                this.current_state.preserve_state = false;
	                location_hash = '#/' + this.current_state.plan.value + '/' + this.current_state.week + '/';
	                window.history.pushState(this.current_state, '', location_hash);
	            }

	            if (this.current_state.popstate) {
	                this.renderNavList(this.current_state.plan.value);
	                this.renderSelectList();
	                this.current_state.popstate = false;
	            }

	            this.view_manager.setActiveView(this.current_state.plan.value);

	            var week_label = this.current_state.week.replace(/_/g, '-');
	            var title = this.current_state.plan.label + ' Plan for Week of ' + week_label;
	            this.view_manager.setHeaderText(title);
	        }
	    }, {
	        key: 'handleWeekChange',
	        value: function handleWeekChange(e) {
	            console.log('Option selected');
	            var ind = e.target.selectedIndex - 1;
	            this.setState({ week: weeks[ind].value, preserve_state: true });
	        }
	    }, {
	        key: 'handleNavClick',
	        value: function handleNavClick(e) {
	            var nav_path = e.target.dataset.navPath;
	            console.log(nav_path);
	            this.renderNavList(nav_path);
	            var keys = Object.keys(_Constants.plan_types);
	            var selected = null;

	            keys.forEach(function (item) {
	                if (_Constants.plan_types[item].value === nav_path) {
	                    selected = _Constants.plan_types[item];
	                }
	            });

	            this.setState({ plan: selected, preserve_state: true });
	            return false;
	        }
	    }, {
	        key: 'handleWineSelect',
	        value: function handleWineSelect(e) {
	            console.log('Wine button clicked');
	            this.data_service.loadWineInfo({
	                id: e.target.dataset.wineId,
	                success: this.handleWineResponse.bind(this)
	            });
	        }
	    }, {
	        key: 'handleWineResponse',
	        value: function handleWineResponse(response) {
	            var product = response.product_pairings[0].paired_product.producible.wine;
	            var view_data = {
	                name: product.name,
	                varietals_name: product.varietals[0].name,
	                year: product.year,
	                image_url: product.bottle_image_url,
	                image_alt_text: product.name,
	                description: product.description,
	                fun_fact: product.fun_facts
	            };
	            var content = this.modal_html(view_data);
	            var modal_el = document.createElement('div');
	            modal_el.setAttribute('class', 'modal');

	            var modal_hidden = document.querySelector('#modal-window');
	            modal_hidden.innerHTML = content;
	            $(modal_hidden).modal().on('hidden.bs.modal', function (e) {
	                $(modal_hidden).empty();
	            });
	        }
	    }, {
	        key: 'handlePopStateChange',
	        value: function handlePopStateChange(data) {
	            if (data.state) {
	                data.state.popstate = true;
	                this.setState(data.state);
	            }
	        }
	    }]);

	    return Application;
	}();

	exports.default = Application;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/* Constants, variables and enums used throughout the application */
	var endpoints = exports.endpoints = {
	    'recipes': '/api/recipes/',
	    'wine': '/api/product_pairings/'
	};

	var plan_types = exports.plan_types = {
	    FAMILY: {
	        value: 'family',
	        label: 'Family',
	        data_path: 'family_plan',
	        active: false,
	        items_per_row: 2
	    },
	    TWO_PERSON: {
	        value: 'two_person',
	        data_path: 'two_person_plan',
	        label: 'Two Person',
	        active: false,
	        items_per_row: 3
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  - Take Home Code Test
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author - Tolu Abayomi
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * May 2016
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _Constants = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* Class to manage retrieval of data from data source */

	var DataService = function () {
	    function DataService() {
	        _classCallCheck(this, DataService);
	    }

	    _createClass(DataService, [{
	        key: 'loadRecipes',
	        value: function loadRecipes(options) {
	            var date_str = options.week.replace(/-/g, '_');
	            var url = '' + _Constants.endpoints.recipes + options.plan + '/' + date_str;
	            console.log(url);
	            $.getJSON(url, options.success);
	        }
	    }, {
	        key: 'loadWineInfo',
	        value: function loadWineInfo(options) {
	            var url = '' + _Constants.endpoints.wine + options.id;
	            $.getJSON(url, options.success);
	        }
	    }]);

	    return DataService;
	}();

	exports.default = DataService;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 *  - Take Home Code Test
	 * @author - Tolu Abayomi
	 * May 2016
	 */

	/* Manage application views, updates page title etc. */

	var ViewManager = function () {
	    function ViewManager(options) {
	        _classCallCheck(this, ViewManager);

	        this.views = options.views;
	        this.activeView = null;
	        this.view_container = options.view_container;
	        this.header_el = document.querySelector('.page-title');
	    }

	    _createClass(ViewManager, [{
	        key: 'setActiveView',
	        value: function setActiveView(id) {
	            var $container = $(this.view_container);
	            $container.empty();
	            $container.html(this.views[id].render());
	        }
	    }, {
	        key: 'setHeaderText',
	        value: function setHeaderText(text) {
	            this.header_el.textContent = text;
	        }
	    }]);

	    return ViewManager;
	}();

	exports.default = ViewManager;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  - Take Home Code Test
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author - Tolu Abayomi
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * May 2016
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _Constants = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* Class to render markup for Two person view */

	var TwoPersonView = function () {
	    function TwoPersonView() {
	        _classCallCheck(this, TwoPersonView);

	        this.view_data = {};
	        var recipe_html = $('#recipe-template').html();
	        this.view_template = Handlebars.compile(recipe_html);
	    }

	    _createClass(TwoPersonView, [{
	        key: 'setViewData',
	        value: function setViewData(data) {
	            this.view_data = data;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var recipes = this.view_data[_Constants.plan_types.TWO_PERSON.data_path].recipes;
	            var rows = [];
	            var items_per_row = _Constants.plan_types.TWO_PERSON.items_per_row;
	            var row_count = Math.ceil(recipes.length / items_per_row);
	            var row = void 0;
	            var start_index = void 0,
	                end_index = void 0;
	            var last_index = recipes.length - 1;

	            if (recipes.length <= 0) {
	                return;
	            }

	            for (var a = 0; a < row_count; a++) {
	                row = document.createElement('div');
	                row.setAttribute('class', 'row');
	                start_index = a * items_per_row;
	                end_index = start_index + items_per_row;
	                end_index = end_index > recipes.length ? recipes.length : end_index;
	                var rendered = '';

	                for (var b = start_index; b < end_index; b++) {
	                    var item = recipes[b];
	                    var view_data = {
	                        image_url: item.recipe.high_menu_thumb_url,
	                        image_alt_text: item.recipe.main_title,
	                        title: item.recipe.main_title,
	                        subtitle: item.recipe.sub_title,
	                        vegetarian: item.recipe.vegetarian
	                    };

	                    if (item.recipe.wine_pairing_id) {
	                        view_data.wine_pairing_id = item.recipe.wine_pairing_id;
	                    }

	                    rendered += this.view_template(view_data);
	                }

	                row.innerHTML = rendered;
	                rows.push(row);
	            }

	            return rows;
	        }
	    }]);

	    return TwoPersonView;
	}();

	exports.default = TwoPersonView;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  - Take Home Code Test
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author - Tolu Abayomi
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * May 2016
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _Constants = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* FamilyView view class renders markup customized for family view */

	var FamilyView = function () {
	    function FamilyView() {
	        _classCallCheck(this, FamilyView);

	        this.view_data = {};
	        var recipe_html = $('#recipe-template').html();
	        this.view_template = Handlebars.compile(recipe_html);
	    }

	    _createClass(FamilyView, [{
	        key: 'setViewData',
	        value: function setViewData(data) {
	            this.view_data = data;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var recipes = this.view_data[_Constants.plan_types.FAMILY.data_path].recipes;
	            var rows = [];
	            var items_per_row = _Constants.plan_types.FAMILY.items_per_row;
	            var row_count = Math.ceil(recipes.length / items_per_row);
	            var row = void 0;
	            var start_index = void 0,
	                end_index = void 0;
	            var last_index = recipes.length - 1;

	            if (recipes.length <= 0) {
	                return;
	            }

	            for (var a = 0; a < row_count; a++) {
	                row = document.createElement('div');
	                row.setAttribute('class', 'row');
	                start_index = a * items_per_row;
	                end_index = start_index + items_per_row;
	                end_index = end_index > recipes.length ? recipes.length : end_index;
	                var rendered = '';

	                for (var b = start_index; b < end_index; b++) {
	                    var item = recipes[b];
	                    var view_data = {
	                        image_url: item.recipe.high_menu_thumb_url,
	                        image_alt_text: item.recipe.main_title,
	                        title: item.recipe.main_title,
	                        subtitle: item.recipe.sub_title,
	                        vegetarian: item.recipe.vegetarian
	                    };

	                    if (item.recipe.wine_pairing_id) {
	                        view_data.wine_pairing_id = item.recipe.wine_pairing_id;
	                    }

	                    if (b == start_index) {
	                        view_data.two_column = true;
	                    }

	                    rendered += this.view_template(view_data);
	                }

	                row.innerHTML = rendered;
	                rows.push(row);
	            }

	            return rows;
	        }
	    }]);

	    return FamilyView;
	}();

	exports.default = FamilyView;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  - Take Home Code Test
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author - Tolu Abayomi
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * May 2016
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _Constants = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*  Class to manage application state. 
	    Loads application state on page load from url if exists and handles popstate event 
	*/

	var StateManager = function () {
	    function StateManager() {
	        _classCallCheck(this, StateManager);
	    }

	    _createClass(StateManager, null, [{
	        key: 'initialize',
	        value: function initialize(handler) {
	            window.addEventListener('popstate', handler);
	        }

	        /**
	         * Parse application state from url
	         */

	    }, {
	        key: 'getLocationState',
	        value: function getLocationState() {
	            var url_plan = void 0,
	                url_week = void 0;
	            //check if user coming from a bookmarked link
	            var hash = window.location.hash;
	            if (hash === '') {
	                return null;
	            }

	            var tokens = hash.split('/');
	            var plan_value = tokens[1];
	            var keys = Object.keys(_Constants.plan_types);

	            keys.forEach(function (item) {
	                if (_Constants.plan_types[item].value == plan_value) {
	                    url_plan = _Constants.plan_types[item];
	                }
	            });

	            url_week = tokens[2];
	            return { 'plan': url_plan, 'week': url_week };
	        }
	    }]);

	    return StateManager;
	}();

	exports.default = StateManager;

/***/ }
/******/ ]);