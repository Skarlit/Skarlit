
import React from "react"
import { Router, Route, Link, RouteContext, IndexRoute} from 'react-router'
import NavBar from "./component/navbar.js"
import Experiments from "./view/experiments.js"
import Index from "./view/index.js"

var App = React.createClass({
    mixins: [RouteContext],
    render: function() {
        console.log(this.context)
        return <div style={styles.app}>
            <NavBar />
            <div style={{marginTop: "150px"}}>
              {this.props.children}
            </div>
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
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "auto",
        paddingTop: "440px",
        backgroundColor: "#ccc"
    }
};


window.onload = function() {
    React.render((
        <Router>
            <Route name="app" path="/" component={App}>
                <IndexRoute component={Index} />
                <Route path="experiments" component={Experiments} />
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    ), document.body)
};