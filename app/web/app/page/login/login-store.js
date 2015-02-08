var Reflux = require('reflux');
var LoginActions = require('./login-actions.js');

var data = {
    message: '',
    email: window.TS.embed.last_username ? window.TS.embed.last_username : '',
    errors: {}
};

var LoginStore = Reflux.createStore({
    listenables: [LoginActions],
    onRegistrationSuccessful: function(message) {
        this.updateMessage(message);
        this.updateErrors({});
    },
    onRegistrationFailed: function(errors) {
        this.updateErrors(errors);
        this.updateMessage('');
    },
    onEmailChange: function(email) {
        this.updateEmail(email);
    },
    updateEmail: function(email) {
        data.email = email;
        this.trigger(data);
    },
    updateMessage: function(message) {
        data.message = message;
        this.trigger(data);
    },
    updateErrors: function(errors) {
        data.errors = errors;
        this.trigger(data);
    },
    getInitialState: function() {
        return data;
    }
});

module.exports = LoginStore;
