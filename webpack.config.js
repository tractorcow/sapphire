const webpack = require('webpack');

const PATHS = {
  MODULES: './node_modules',
  ADMIN: './admin',
  ADMIN_IMAGES: './admin/client/dist/images',
  ADMIN_CSS_SRC: './admin/client/src/styles',
  ADMIN_CSS_DIST: './admin/client/dist/styles',
  ADMIN_THIRDPARTY: './admin/thirdparty',
  ADMIN_JS_SRC: './admin/client/src',
  ADMIN_JS_DIST: './admin/client/dist/js',
  ADMIN_SPRITES_SRC: './admin/client/src/sprites',
  ADMIN_SPRITES_DIST: './admin/client/dist/images/sprites',
  FRAMEWORK: '.',
  FRAMEWORK_CSS_SRC: './client/src/styles',
  FRAMEWORK_CSS_DIST: './client/dist/styles',
  FRAMEWORK_THIRDPARTY: './thirdparty',
  INSTALL_CSS_SRC: './dev/install/client/src/styles',
  INSTALL_CSS_DIST: './dev/install/client/dist/styles',
  FRAMEWORK_JS_SRC: './client/src',
  FRAMEWORK_JS_DIST: './client/dist/js',
};

module.exports = {
  entry: {
    framework: `${PATHS.ADMIN_JS_SRC}/boot/index.js`,
    legacy: `${PATHS.ADMIN_JS_SRC}/bundles/legacy.js`,
    lib: `${PATHS.ADMIN_JS_SRC}/bundles/lib.js`,
  },
  resolve: {
    modulesDirectories: [PATHS.ADMIN_JS_SRC, PATHS.FRAMEWORK_JS_SRC, PATHS.MODULES],
  },
  output: {
    path: PATHS.ADMIN_JS_DIST,
    filename: 'bundle-[name].js',
  },
  externals: {
    'bootstrap-collapse': 'BootstrapCollapse',
    'components/Breadcrumb/Breadcrumb': 'Breadcrumb',
    'state/breadcrumbs/BreadcrumbsActions': 'BreadcrumbsActions',
    'components/FormAction/FormAction': 'FormAction',
    'components/FormBuilder/FormBuilder': 'FormBuilder',
    'components/GridField/GridField': 'GridField',
    'components/Toolbar/Toolbar': 'Toolbar',
    'deep-freeze-strict': 'DeepFreezeStrict',
    i18n: 'i18n',
    i18nx: 'i18nx',
    jQuery: 'jQuery',
    'lib/Backend': 'Backend',
    'lib/ReducerRegister': 'ReducerRegister',
    'lib/ReactRouteRegister': 'ReactRouteRegister',
    'lib/SilverStripeComponent': 'SilverStripeComponent',
    'page.js': 'Page',
    'react-addons-test-utils': 'ReactAddonsTestUtils',
    'react-dom': 'ReactDom',
    tether: 'Tether',
    'react-bootstrap-4': 'ReactBootstrap4',
    'react-redux': 'ReactRedux',
    'react-router-redux': 'ReactRouterRedux',
    'react-router': 'ReactRouter',
    react: 'React',
    'redux-thunk': 'ReduxThunk',
    redux: 'Redux',
    config: 'Config',
    'lib/Router': 'Router',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|thirdparty)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'es2015-ie', 'react'],
          plugins: ['transform-object-assign', 'transform-object-rest-spread'],
          comments: false,
        },
      },
      {
        test: /\.coffee$/,
        loader: 'coffee-loader',
      },
      {
        test: '/i18n.js/',
        loader: 'script-loader',
      },
    ],
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jQuery',
        $: 'jQuery',
      }),
    ],
  },
};
