// Expose the libraries as global for other modules to access
// Note that this jQuerysynjQuerytax requires the use of Webpack and expose-loader
// These are order-dependent - earlier items should not depend on later ones
require('expose?DeepFreezeStrict!deep-freeze-strict');
require('expose?React!react');
require('expose?Tether!tether');
require('expose?ReactDom!react-dom');
require('expose?Redux!redux');
require('expose?ReactRedux!react-redux');
require('expose?ReduxThunk!redux-thunk');
require('expose?ReactRouter!react-router');
require('expose?ReactRouterRedux!react-router-redux');

require('script!../../../../thirdparty/jquery/jquery.js');
require('expose?jQuery!jQuery');

require('expose?ReactBootstrap4!react-bootstrap-4');
require('expose?ReactAddonsCssTransitionGroup!react-addons-css-transition-group');
require('expose?ReactAddonsTestUtils!react-addons-test-utils');
require('expose?Page!page.js');
require('expose?BootstrapCollapse!bootstrap/dist/js/umd/collapse.js');
require('i18n.js');
require('expose?i18nx!i18nx.js');

require('babel-polyfill');
require('../../../../thirdparty/jquery-ondemand/jquery.ondemand.js');
require('../../../../thirdparty/jquery-entwine/dist/jquery.entwine-dist.js');
require('../legacy/sspath.js');
require('../../../../thirdparty/jquery-ui/jquery-ui.js');
require('../../../../thirdparty/jquery-cookie/jquery.cookie.js');
require('../../../../thirdparty/jquery-query/jquery.query.js');
require('../../../../thirdparty/jquery-form/jquery.form.js');
require('../../../thirdparty/jquery-notice/jquery.notice.js');
require('../../../thirdparty/jsizes/lib/jquery.sizes.js');
require('../../../thirdparty/jlayout/lib/jlayout.border.js');
require('../../../thirdparty/jlayout/lib/jquery.jlayout.js');
require('../../../../thirdparty/jstree/jquery.jstree.js');
require('../../../thirdparty/jquery-hoverIntent/jquery.hoverIntent.js');
require('../../../../thirdparty/jquery-changetracker/lib/jquery.changetracker.js');
require('../../../../client/src/legacy/TreeDropdownField.js');
require('../../../../client/src/legacy/DateField.js');
require('../../../../client/src/legacy/HtmlEditorField.js');
require('../../../../client/src/legacy/TabSet.js');
require('../legacy/ssui.core.js');
require('../../../../client/src/legacy/GridField.js');
require('json-js');

require('expose?SilverStripeComponent!lib/SilverStripeComponent');
require('expose?Backend!lib/Backend');
require('expose?Form!components/Form/Form');
require('expose?FormConstants!components/Form/FormConstants');
require('expose?FormAction!components/FormAction/FormAction');
require('expose?FormBuilder!components/FormBuilder/FormBuilder');
require('expose?GridField!components/GridField/GridField');
require('expose?GridFieldCell!components/GridField/GridFieldCell');
require('expose?GridFieldHeader!components/GridField/GridFieldHeader');
require('expose?GridFieldHeaderCell!components/GridField/GridFieldHeaderCell');
require('expose?GridFieldRow!components/GridField/GridFieldRow');
require('expose?GridFieldTable!components/GridField/GridFieldTable');
require('expose?HiddenField!components/HiddenField/HiddenField');
require('expose?TextField!components/TextField/TextField');
require('expose?Toolbar!components/Toolbar/Toolbar');
require('expose?Breadcrumb!components/Breadcrumb/Breadcrumb');
require('expose?BreadcrumbsActions!state/breadcrumbs/BreadcrumbsActions');
require('expose?Config!lib/Config');
require('expose?ReducerRegister!lib/ReducerRegister');
require('expose?ReactRouteRegister!lib/ReactRouteRegister');
require('expose?Injector!lib/Injector');
require('expose?Router!lib/Router');

// Chosen is manually compiled from its support files
// Loaded into global state as I don't know how to chain the exports loader into the argument
// of the imports loader
require('expose?AbstractChosen!exports?AbstractChosen!chosen/coffee/lib/abstract-chosen.coffee');
require('expose?SelectParser!exports?SelectParser!chosen/coffee/lib/select-parser.coffee');
require('chosen/coffee/chosen.jquery.coffee');
