var React = require('react');
var ProfileActions = require('../../action/profile-actions.js');

var ProfileScreen = React.createClass({
    componentDidMount: function() {
        ProfileActions.loadUserProfile();
    },
    render: function () {
        if (this.props.profile.loading) {
            var profile = (
                <div className="spinner">
                </div>
            );
        } else {
            profile = (
                <div>
                    <p>
                        Username: {this.props.profile.user.username}
                    </p>
                    <hr />
                    <form method="POST" action="#">
                        <div className="form-group">
                            <label htmlFor="old-password">Old Password</label>
                            <input type="password" className="form-control" id="old-password" name="old-password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="new-password">New Password</label>
                            <input type="password" className="form-control" id="new-password" name="new-password" />
                        </div>
                        <button id="submit" name="submit" type="submit" className="btn btn-primary">Change Password</button>
                    </form>
                </div>

            );
        }
        return (
            <div className="col-xs-9">
                <h2>Profile</h2>
                {profile}
            </div>
        );
    }
});

module.exports = {
    ProfileScreen: ProfileScreen
};