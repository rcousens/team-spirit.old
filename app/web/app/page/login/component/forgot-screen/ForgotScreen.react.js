var React = require('react');

var LoginActions = require('../../login-actions.js');

var RegisterScreen = require('../register-screen/RegisterScreen.react.js').RegisterScreen;

var ForgotScreen = React.createClass({
    handleUsernameChange: function(e) {
        LoginActions.emailChange(e.target.value);
    },
    render: function () {
        return (
            <div className="row">
                <div className="jumbotron">
                    <h2 className="text-center">Forgot Password?</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email Address</label>
                            <input type="email" defaultValue={this.props.email} onChange={this.handleUsernameChange} className="form-control" id="inputEmail" placeholder="Email Address" />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-danger">Reset Password <i className="fa fa-fw fa-envelope"></i></button>
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = {
    ForgotScreen: ForgotScreen
};