var Reflux = require('reflux');

var DashboardActions = Reflux.createActions([
    'showViewProfileModal',
    'hideViewProfileModal',
    'loadUserProfile'
]);

module.exports = DashboardActions;