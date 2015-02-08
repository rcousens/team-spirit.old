var React = require('react');

var Content = React.createClass({

    render: function () {
        return (
            <div className="container">
                {this.props.children}
            </div>
        );
    }
});

module.exports = {
    Content: Content
}