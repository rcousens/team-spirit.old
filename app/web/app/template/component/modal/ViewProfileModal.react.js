var React = require('react');
var superagent = require('superagent');

var timer;
var loadingText;

function startTimer(callback) {
    loadingText = 'Loading';
    timer = setInterval(function() {
        loadingText += '.';
        callback();
    }, 200);
}

function stopTimer(callback) {
    clearInterval(timer);
    callback();
}

var ViewProfileModal = React.createClass({
    getInitialState: function() {
        return {
            loadingText: ''
        }
    },
    componentWillReceiveProps: function(nextProps) {
        console.log('cWRP');

        if (this.props.visible === false && nextProps.visible === true) {
            this.loadUserProfile();
            $(this.refs.viewProfileModal.getDOMNode()).modal('show');
        } else if (this.props.visible === true && nextProps.visible === false) {
            $(this.refs.viewProfileModal.getDOMNode()).modal('hide');
        } else if (nextProps.visible === true) {
            $(this.refs.viewProfileModal.getDOMNode()).modal('show');
        }
    },
    loadUserProfile: function() {
        var component = this;
        startTimer(function() { if (loadingText.length < 15) { component.setState({loadingText: loadingText}) } else { loadingText = 'Loading'; }});
        superagent
            .get(window.Routing.generate('api_me'))
            .end(function(err, res) {
                stopTimer(function() { component.setState({loadingText: ''})});
                if (res.body.me) {
                    component.props.actions.loadUserProfile(res.body.me);
                } 
            });
    },
    handleClose: function() {
        this.props.actions.hideViewProfileModal();
    },
    handleSaveAndClose: function() {
        this.props.actions.hideViewProfileModal();
    },
    render: function () {
        var userId = this.props.user.id ? this.props.user.id : '';
        var email = this.props.user.email ? this.props.user.email : '';
        var username = this.props.user.username ? this.props.user.username : '';
        var userProfile = this.state.loadingText ? (<p>{this.state.loadingText}</p>) : (<div><p>id: {userId}</p> <p>username: {email}</p><p>email: {username}</p></div>);
        return (
            <div ref="viewProfileModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={this.handleClose} type="button" className="close" data-dismall="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Your Profile</h4>
                        </div>
                        <div className="modal-body">
                            {userProfile}
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.handleClose} type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button onClick={this.handleSaveAndClose} type="button" className="btn btn-primary" data-dismiss="modal">Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
});

module.exports = {
    ViewProfileModal: ViewProfileModal
};