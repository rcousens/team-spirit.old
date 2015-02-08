var React = require('react');
var LoginActions = require('../../login-actions.js');

var LoginScreen = React.createClass({
    handleUsernameChange: function(e) {
        LoginActions.emailChange(e.target.value);
    },
    render: function () {
        var csrf_token = window.TS.embed.csrf_token;
        var message = this.props.message ? (<p className="help-block">{this.props.message}</p>) : '';
        return (
            <div className="row">
                <div className="jumbotron">
                    <h2 className="text-center">Login</h2>
                    <form method="POST" action={window.Routing.generate('security_check')}>
                        <input type="hidden" name="_csrf_token" value={csrf_token} />
                        <div className="form-group">
                            <label htmlFor="username">Email Address</label>
                            <input type="email" className="form-control" id="username" name="_username" defaultValue={this.props.email} onChange={this.handleUsernameChange} placeholder="Email Address" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" name="_password" placeholder="Password" />
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" name="_remember_me" value="on" /> Remember me?
                            </label>
                        </div>
                        <br />
                        {message}
                        <button id="_submit" name="_submit" type="submit" className="btn btn-primary">Login<i className="fa fa-fw fa-sign-in"></i></button>
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = {
    LoginScreen: LoginScreen
};