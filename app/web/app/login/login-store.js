var Reflux = require('reflux');
var LoginActions = require('./login-actions.js');

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
        this.email = email;
        this.trigger(this.getStore());
    },
    updateMessage: function(message) {
        this.message = message;
        this.trigger(this.getStore());
    },
    updateErrors: function(errors) {
        this.errors = errors;
        this.trigger(this.getStore());
    },
    getInitialState: function() {
        this.message = '';
        this.email = window.TS.embed? window.TS.embed.last_username : '';
        this.errors = {};

        return this.getStore();
    },
    getStore: function() {
        return {
            message: this.message,
            email: this.email,
            errors: this.errors
        };
    }
});

module.exports = LoginStore;
