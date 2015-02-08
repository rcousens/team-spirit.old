var bootstrap = require('bootstrap');
require('bootstrap/less/bootstrap.less');
require('font-awesome/less/font-awesome.less');
require('./login.css');

var React = require('react');
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var ReactRouter = require('react-router');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;
var NotFoundRoute = require('react-router').NotFoundRoute;
var RouteHandler = require('react-router').RouteHandler;

var Reflux = require('reflux');

var LoginStore = require('./login-store.js');

var TopNavBar = require('./component/top-nav-bar/TopNavBar.react.js').TopNavBar;
var Content = require('./component/content/Content.react.js').Content;
var Footer = require('./component/footer/Footer.react.js').Footer;
var LoginScreen = require('./component/login-screen/LoginScreen.react.js').LoginScreen;
var RegisterScreen = require('./component/register-screen/RegisterScreen.react.js').RegisterScreen;
var ForgotScreen = require('./component/forgot-screen/ForgotScreen.react.js').ForgotScreen;

var App = React.createClass({
    mixins: [ReactRouter.Navigation, Reflux.connect(LoginStore, "loginData"), ReactRouter.State ],
    render: function () {
        var name = this.getRoutes().reverse()[0].name;
        return (
        <div className="wrapper">
            <TopNavBar />
            <TransitionGroup component="div" transitionName="page" transitionLeave={false}>
                <RouteHandler key={name} data={this.state.loginData} />
            </TransitionGroup>
            <Footer />
        </div>
        );
    }
});

var Index = React.createClass({
    render: function () {
        return (
            <Content>
                <LoginScreen message={this.props.data.message} email={this.props.data.email} />
            </Content>
        );
    }
});

var Register = React.createClass({
    render: function () {
        return (
            <Content>
                <RegisterScreen message={this.props.data.message} errors={this.props.data.errors} email={this.props.data.email} />
            </Content>
        );
    }
});

var Forgot = React.createClass({
    render: function() {
        return (
            <Content>
                <ForgotScreen email={this.props.data.email} />
            </Content>
        );
    }
});

var NotFound = React.createClass({
    render: function () {
        return <h1>Not found</h1>;
    }
});

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={Index}/>
        <Route name="login" path="/" handler={Index} addHandlerKey={true} />
        <Route name="register" path="/register" handler={Register} addHandlerKey={true} />
        <Route name="forgot" path="/forgot" handler={Forgot} addHandlerKey={true} />
        <NotFoundRoute handler={NotFound} addHandlerKey={true} />
    </Route>
);

ReactRouter.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});
