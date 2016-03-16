import React from "react"
import { Router, Route, Link, RouteContext, IndexRoute} from 'react-router'
import {Motion, spring} from 'react-motion';
import NavBar from "./component/navbar.js";
import Exp from "./view/experiments.js";
import Bio from "./view/bio.js";
import Contact from "./view/contact";
import Index from "./view/index.js";
import Animator from "./utils/sync_animator.js";
import {Rain} from "./view/background.js";

var App = React.createClass({
    componentDidMount: function() {

     // InitMouse(React.findDOMNode(this.refs.background));
    },
    render: function() {
        return <div className="app">
            <canvas id="canvas-overlay" ref="background"></canvas>
            <div className="canvas-label">Code Rain v0.0.1</div>
            <div className="body">
                <NavBar />
                <div className="body-content">
                   {this.props.children}
                </div>
            </div>
        </div>
    }
});

var NotFound = React.createClass({
    render: function() {
        return <div>
           <div> </div>
        </div>
    }
});

window.onload = function() {

    React.render((
        <Router>
            <Route name="app" path="/" component={App}>
                <IndexRoute component={Index} />
                <Route name="bio" path="bio" component={Bio} />
                <Route name="exp" path="exp/index" component={Exp} />
                <Route name="contact" path="contact" component={Contact} />
                <Route path="*" component={NotFound} />
            </Route>
        </Router>
    ), document.body, function() {
        Rain().start();
    })
};