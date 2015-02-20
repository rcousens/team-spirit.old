var React = require('react');
var Link = require('react-router').Link;
var State = require('react-router').State;

var SideNav = React.createClass({
    mixins: [ State ],
    render: function () {
        var dashboardActive = this.isActive('dashboard') ? 'active' : '';
        var profileActive = this.isActive('profile') ? 'active' : '';

        return (
            <div className="col-xs-3">
                <ul className="nav nav-pills nav-stacked">
                    <li role="presentation" className={dashboardActive}><Link to="dashboard">Dashboard</Link></li>
                    <li role="presentation" className={profileActive}><Link to="profile">Profile</Link></li>
                </ul>
            </div>
        );
    }
});

module.exports = {
    SideNav: SideNav
};