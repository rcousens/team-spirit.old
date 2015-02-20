var Reflux = require('reflux');
var ProfileActions = require('../action/profile-actions.js');
var superagent = require('superagent');

var ProfileStore = Reflux.createStore({
    listenables: [ProfileActions],
    onLoadUserProfile: function() {
        var store = this;

        this.loading = true;
        this.trigger(this.getStore());
        superagent
            .get(window.Routing.generate('api_me'))
            .end(function(err, res) {
                store.loading = false;
                if (res.body.me) {
                    store.user = res.body.me;
                }
                store.trigger(store.getStore());
            });
    },
    getInitialState: function() {
        this.loading = false;
        this.user = {
            username: '',
            id: '',
            email: ''
        };
        return this.getStore();
    },
    getStore: function() {
        return {
            loading: this.loading,
            user: this.user
        }
    }
});

module.exports = ProfileStore;
