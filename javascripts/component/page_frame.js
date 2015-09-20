import React from "react/addons"
import $ from "jquery";


var TransitionGroup = React.addons.TransitionGroup;

var PageFrame = React.createClass({

    componentDidMount: function() {
        console.log('wasdf');
      $(React.findDOMNode(this)).fadeIn(this.props.fadeIn);
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return <TransitionGroup component="div" style={this.props.style} transitionAppear={true}>
                {this.props.children}
        </TransitionGroup>
    }
});

export default PageFrame;