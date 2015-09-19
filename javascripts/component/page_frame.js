import React from "react"
import $ from "jquery";


var PageFrame = React.createClass({
    componentDidMount: function() {
      $(React.findDOMNode(this)).fadeIn(this.props.fadeIn);
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return <div style={this.props.style}>
            {this.props.children}
        </div>
    }
});

export default PageFrame;