
import React from "react"
import { Router, Route, Link } from 'react-router'
import NavBar from "./component/navbar.js"
import Experiment from "./view/experiment.js"

var App = React.createClass({
    render: function() {
        return <div>
            <NavBar />
            {this.props.children}
        </div>
    }
});


var NotFound = React.createClass({
    render: function() {
        return <h1> Not Found</h1>
    }
});


window.onload = function() {
    React.render((
        <Router>
            <Route path="/" component={App}>
                <Route path="experiments" component={Experiment} />
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    ), document.body)
};