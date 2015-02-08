var React = require('react');
var Link = require('react-router').Link;
var State = require('react-router').State;

var TopNavBar = React.createClass({
    handleViewProfile: function() {
        this.props.actions.showViewProfileModal();
    },
    render: function () {
        var dashboardActive = (this.props.active === 'dashboard') ? 'active' : '';
        var teamActive = (this.props.active === 'team') ? 'active' : '';
        var username = this.props.username;
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Team Spirit</a>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li className={dashboardActive}><Link to="dashboard">Dashboard</Link></li>
                            <li className={teamActive}><a href="#">Team</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-fw fa-user"></i>{username}<span className="caret"></span></a>
                            <ul className="dropdown-menu" role="menu">
                                <li><a href="#" onClick={this.handleViewProfile}>View Profile</a></li>
                                <li className="divider"></li>
                                <li><a href="/logout">Logout</a></li>
                            </ul>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
});

module.exports = {
    TopNavBar: TopNavBar
};