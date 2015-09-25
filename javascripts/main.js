import React from "react"
import { Router, Route, Link, RouteContext, IndexRoute} from 'react-router'
import NavBar from "./component/navbar.js"
import Experiments from "./view/experiments.js"
import Index from "./view/index.js"
import Demo from "./view/demo.js"
import PageFrame from "./component/page_frame.js";
import InitMouse from "./mouse";

var App = React.createClass({
    componentDidMount: function() {
      InitMouse(React.findDOMNode(this.refs.background));
    },
    render: function() {
        return <div style={styles.app}>
            <NavBar />
            <PageFrame style={{marginTop: "80px"}} fadeIn={600}>
              {this.props.children}
            </PageFrame>
            <canvas ref="background"></canvas>
        </div>
    }
});


var NotFound = React.createClass({
    render: function() {
        return <div style={styles.base}>
           <div style={styles.notFound}> </div>
        </div>
    }
});

var styles = {
    app: {
        backgroundColor: "#333",
        height: "100%",
        width: "100%"
    },
    base: {
        width: "50%",
        margin: "0 auto",
        maxWidth: "800px"
    },
    notFound: {
        backgroundImage: "url(" + "http://www.uchy.pl/error_404_by_pichu007-d6gdo7j.png" + ")",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "auto",
        paddingTop: "70%",
        backgroundColor: "#ccc"
    }
};

var _titleChange = function(title) {
    document.title = `Skarlit | ${title}`;
};


window.onload = function() {
    React.render((
        <Router>
            <Route name="app" path="/" component={App}>
                <IndexRoute component={Index} onEnter={_titleChange.bind(this, "Home")}/>
                <Route path="experiments" component={Experiments} onEnter={_titleChange.bind(this, "Experiments")} />
                <Route path="experiments/:name" component={Demo} onEnter={_titleChange.bind(this, "Demo")} />
                <Route path="*" component={NotFound} onEnter={_titleChange.bind(this, "Not Found")}/>
            </Route>
        </Router>
    ), document.body)
};