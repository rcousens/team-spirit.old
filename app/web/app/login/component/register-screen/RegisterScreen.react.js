var React = require('react');
var Navigation = require('react-router').Navigation;
var superagent = require('superagent');
var bluebird = require('bluebird/js/browser/bluebird.js');
var LoginActions = require('../../login-actions.js');


!function(a){a.fn.extend({complexify:function(b,c){function h(a,b){for(var c=a.length-1;c>=0;c--)if(b[0]<=a.charCodeAt(c)&&a.charCodeAt(c)<=b[1])return b[1]-b[0]+1;return 0}function i(c){if("strict"===b.banmode){for(var d=0;d<b.bannedPasswords.length;d++)if(-1!==b.bannedPasswords[d].indexOf(c))return!0;return!1}return a.inArray(c,b.bannedPasswords)>-1?!0:!1}function j(){var g=a(this).val(),j=0,k=!1;if(i(g))j=1;else for(var l=f.length-1;l>=0;l--)j+=h(g,f[l]);j=Math.log(Math.pow(j,g.length))*(1/b.strengthScaleFactor),k=j>d&&g.length>=b.minimumChars,j=100*(j/e),j=j>100?100:j,c.call(this,k,j)}var d=49,e=120,f=[[32,32],[48,57],[65,90],[97,122],[33,47],[58,64],[91,96],[123,126],[128,255],[256,383],[384,591],[592,687],[688,767],[768,879],[880,1023],[1024,1279],[1328,1423],[1424,1535],[1536,1791],[1792,1871],[1920,1983],[2304,2431],[2432,2559],[2560,2687],[2688,2815],[2816,2943],[2944,3071],[3072,3199],[3200,3327],[3328,3455],[3456,3583],[3584,3711],[3712,3839],[3840,4095],[4096,4255],[4256,4351],[4352,4607],[4608,4991],[5024,5119],[5120,5759],[5760,5791],[5792,5887],[6016,6143],[6144,6319],[7680,7935],[7936,8191],[8192,8303],[8304,8351],[8352,8399],[8400,8447],[8448,8527],[8528,8591],[8592,8703],[8704,8959],[8960,9215],[9216,9279],[9280,9311],[9312,9471],[9472,9599],[9600,9631],[9632,9727],[9728,9983],[9984,10175],[10240,10495],[11904,12031],[12032,12255],[12272,12287],[12288,12351],[12352,12447],[12448,12543],[12544,12591],[12592,12687],[12688,12703],[12704,12735],[12800,13055],[13056,13311],[13312,19893],[19968,40959],[40960,42127],[42128,42191],[44032,55203],[55296,56191],[56192,56319],[56320,57343],[57344,63743],[63744,64255],[64256,64335],[64336,65023],[65056,65071],[65072,65103],[65104,65135],[65136,65278],[65279,65279],[65280,65519],[65520,65533]],g={minimumChars:8,strengthScaleFactor:1,bannedPasswords:window.COMPLEXIFY_BANLIST||[],banmode:"strict",evaluateOnInit:!0};return a.isFunction(b)&&!c&&(c=b,b={}),b=a.extend(g,b),b.evaluateOnInit&&this.each(function(){j.apply(this)}),this.each(function(){a(this).bind("keyup focus input propertychange mouseup",j)})}})}(window.jQuery);

var complexitystyle = {
    width: '0%'
};

setInterval(function() {
    console.log(complexitystyle);
}, 500);

var RegisterScreen = React.createClass({
    mixins: [Navigation],
    getInitialState: function() {
        complexitystyle.width = '0%';
        return {
            password: '',
            password_confirm: '',
            complexity: 0
        };
    },
    handleEmailChange: function(e)
    {
        LoginActions.registrationFailed({});
        LoginActions.emailChange(e.target.value);
    },
    componentDidMount: function() {
        var component = this;
        $(this.refs.password.getDOMNode()).complexify({strengthScaleFactor: 0.5}, function(valid, complexity) {
            complexitystyle.width = parseInt(complexity).toString() + '%';
        });
    },
    handlePasswordChange: function(e)
    {
        this.setState({'password': e.target.value});
    },
    handlePasswordConfirmChange: function(e)
    {
        this.setState({'password_confirm': e.target.value});
    },
    doRegister: function() {
        var component = this;
        superagent
            .post(window.Routing.generate('user_bundle_register'))
            .type('form')
            .send('fos_user_registration_form[_token]=' + window.TS.embed.register_csrf_token)
            .send('fos_user_registration_form[username]=' + this.props.email)
            .send('fos_user_registration_form[email]=' + this.props.email)
            .send('fos_user_registration_form[plainPassword][first]=' + this.state.password)
            .send('fos_user_registration_form[plainPassword][second]=' + this.state.password_confirm)
            .end(function(err, res) {
                if (res.body.errors) {
                    LoginActions.registrationFailed(res.body.errors);
                } else if (res.body.registration) {
                    LoginActions.registrationSuccessful('Registration successful. Please login.');
                    component.transitionTo('login');
                }
            });
    },
    render: function () {
        var message = this.props.message ? (<p className="help-block">{this.props.message}</p>) : '';
        var emailErrorClass = 'form-group';
        var emailErrorLabel = '';
        if (this.props.errors.email !== undefined) {
            emailErrorClass = 'form-group has-error';
            emailErrorLabel = (<label className="control-label">{this.props.errors.email}</label>);
        }

        if (this.state.password.length >= 8 && this.state.password === this.state.password_confirm) {
            var equalPassword = true;
        }


        var complexity = parseInt(complexitystyle.width);
        
        var progressBarType;
        if (complexity === 0) {
            progressBarType = 'none'
        } else if (complexity >= 1 && complexity <= 25) {
            progressBarType = 'danger';
        } else if (complexity >= 26 && complexity <= 50) {
            progressBarType = 'warning';
        } else if (complexity >= 51 && complexity <= 75) {
            progressBarType = 'info';
        } else if (complexity >= 76 && complexity <= 100) {
            progressBarType = 'success';
        }

        return (
            <div className="row">
                <div className="jumbotron">
                    <h2 className="text-center">Register</h2>
                    <form action="#">
                        <div className={emailErrorClass}>
                            <label className="control-label" htmlFor="email">Email Address</label>
                            <input type="email" value={this.props.email} onChange={this.handleEmailChange} className="form-control" id="email" name="fos_user_registration_form[email]" placeholder="Email Address" />
                            {emailErrorLabel}
                        </div>
                        <div className={'form-group ' + (equalPassword ? 'has-success' : '')}>
                            <label className="control-label" htmlFor="password">Password</label>
                            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" ref="password"  id="password" name="fos_user_registration_form[plainPassword][first]" placeholder="Password" />
                        </div>
                        <div className={'form-group ' + (equalPassword ? 'has-success' : '')}>
                            <label className="control-label" htmlFor="password_confirm">Confirm Password</label>
                            <input type="password" value={this.state.password_confirm} onChange={this.handlePasswordConfirmChange} className="form-control" id="password_confirm" name="fos_user_registration_form[plainPassword][second]" placeholder="Confirm Password" />
                        </div>
                        <label className="control-label">Complexity {complexity > 0 ? '(' + complexity + '/100)' : ''}</label>
                        <div className="progress">
                            <div className={'progress-bar progress-bar-' + progressBarType} role="progressbar" aria-valuenow={complexity} aria-valuemin="0" aria-valuemax="100" style={complexitystyle}>
                                <span className="sr-only">{complexity}%</span>
                            </div>
                        </div>

                        <br />
                        <button type="button" disabled={!equalPassword} onClick={this.doRegister} className="btn btn-success">Register <i className="fa fa-fw fa-check"></i></button>
                        {message}
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = {
    RegisterScreen: RegisterScreen
};