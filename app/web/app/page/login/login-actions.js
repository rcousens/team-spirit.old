var Reflux = require('reflux');

var LoginActions = Reflux.createActions([
    "registrationSuccessful",
    "registrationFailed",
    "emailChange"
]);

module.exports = LoginActions;