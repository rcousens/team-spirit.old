var bootstrap = require('bootstrap');
require('bootstrap/less/bootstrap.less');
require('font-awesome/less/font-awesome.less');

var React = require('react');

var ReactRouter = require('react-router');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;
var NotFoundRoute = require('react-router').NotFoundRoute;
var RouteHandler = require('react-router').RouteHandler;

var Reflux = require('reflux');

var DashboardStore = require('./dashboard-store.js');

var TopNavBar = require('../../template/component/top-nav-bar/TopNavBar.react.js').TopNavBar;
var Content = require('../../template/component/content/Content.react.js').Content;
var Footer = require('../../template/component/footer/Footer.react.js').Footer;
var ViewProfileModal = require('../../template/component/modal/ViewProfileModal.react.js').ViewProfileModal;
var DashboardScreen = require('./component/dashboard-screen/DashboardScreen.react.js').DashboardScreen;
var DashboardActions = require('./dashboard-actions.js');

var App = React.createClass({
    mixins: [ReactRouter.Navigation, Reflux.connect(DashboardStore, "data"), ReactRouter.State ],
    render: function () {
        var name = this.getRoutes().reverse()[0].name;
        return (
            <div className="wrapper">
                <TopNavBar actions={DashboardActions} active={'dashboard'} username={this.state.data.username} />
                <RouteHandler key={name} data={this.state.data} />
                <Footer />
                <ViewProfileModal user={this.state.data.user} visible={this.state.data.modal.viewProfileModalVisible} actions={DashboardActions} />
            </div>
        );
    }
});

var Index = React.createClass({
    render: function () {
        return (
            <Content>
                <DashboardScreen />
            </Content>
        );
    }
});

var Something = React.createClass({
    render: function () {
        return (
            <Content>
                <DashboardScreen />
            </Content>
        );
    }
});

var Else = React.createClass({
    render: function() {
        return (
            <Content>
                <DashboardScreen />
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
        <Route name="dashboard" path="/" handler={Index} addHandlerKey={true} />
        <Route name="something" path="/something" handler={Something} addHandlerKey={true} />
        <Route name="else" path="/else" handler={Else} addHandlerKey={true} />
        <NotFoundRoute handler={NotFound} addHandlerKey={true} />
    </Route>
);

ReactRouter.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});
