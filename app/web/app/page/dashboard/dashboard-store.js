var Reflux = require('reflux');
var DashboardActions = require('./dashboard-actions.js');

var data = {
    username: window.TS.embed.username,
    modal: {
        viewProfileModalVisible: false
    },
    user: {}
};

var DashboardStore = Reflux.createStore({
    listenables: [DashboardActions],
    onShowViewProfileModal: function() {
        data.modal.viewProfileModalVisible = true;
        this.trigger(data);
    },
    onHideViewProfileModal: function() {
        data.modal.viewProfileModalVisible = false;
        this.trigger(data);
    },
    onLoadUserProfile: function(user) {
        data.user = user;
        this.trigger(data);
    },
    getInitialState: function() {
        return data;
    }
});

module.exports = DashboardStore;
