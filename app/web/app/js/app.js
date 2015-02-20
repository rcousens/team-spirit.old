var bootstrap = require('bootstrap');
require('bootstrap/less/bootstrap.less');
require('font-awesome/less/font-awesome.less');
require('../css/spinner.css');

var React = require('react');

var ReactRouter = require('react-router');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;
var NotFoundRoute = require('react-router').NotFoundRoute;
var RouteHandler = require('react-router').RouteHandler;

var Reflux = require('reflux');


var Content = require('./component/content/Content.react.js').Content;
var SideNav = require('./component/sidenav/SideNav.react.js').SideNav;

var DashboardScreen = require('./component/dashboard-screen/DashboardScreen.react.js').DashboardScreen;

var ProfileScreen = require('./component/profile-screen/ProfileScreen.react.js').ProfileScreen;
var ProfileActions = require('./action/profile-actions.js');
var ProfileStore = require('./store/profile-store.js');


var App = React.createClass({
    mixins: [ReactRouter.Navigation, ReactRouter.State ],
    render: function () {
        var name = this.getRoutes().reverse()[0].name;
        return (
            <div className="wrapper">
                <RouteHandler key={name} />
            </div>
        );
    }
});

var Index = React.createClass({
    render: function () {
        return (
            <Content>
                <div className="row">
                    <SideNav />
                    <DashboardScreen />
                </div>
            </Content>
        );
    }
});

var Profile = React.createClass({
    mixins: [Reflux.connect(ProfileStore, "profile")],
    render: function () {
        return (
            <Content>
                <div className="row">
                    <SideNav />
                    <ProfileScreen profile={this.state.profile} />
                </div>
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
        <Route name="profile" path="/profile" handler={Profile} addHandlerKey={true} />
        <NotFoundRoute handler={NotFound} addHandlerKey={true} />
    </Route>
);

ReactRouter.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});
