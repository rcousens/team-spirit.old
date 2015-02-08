var React = require('react');

var Footer = React.createClass({
    render: function () {
        return (
            <footer className="footer">
                <div className="container">
                    <p className="text-muted">&copy; Stork Patrol 2014</p>
                </div>
            </footer>
        );
    }
});

module.exports = {
    Footer: Footer
};