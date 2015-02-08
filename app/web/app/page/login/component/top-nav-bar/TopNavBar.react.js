var React = require('react');
var Link = require('react-router').Link;
var State = require('react-router').State;

var TopNavBar = React.createClass({
    mixins: [ State ],
    render: function () {
        var loginActive = this.isActive('login') ? 'active' : '';
        var registerActive = this.isActive('register') ? 'active' : '';
        var forgotActive = this.isActive('forgot') ? 'active' : '';

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
                        <a className="navbar-brand" href={window.Routing.generate('home')}>Team Spirit</a>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                        {/*<li><a>Home</a></li>*/}
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className={loginActive}><Link to="login">Login</Link></li>
                            <li className={registerActive}><Link to="register">Register</Link></li>
                            <li className={forgotActive}><Link to="forgot">Forgot Password?</Link></li>
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