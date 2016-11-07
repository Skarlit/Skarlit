import React from "react";
import {Link, History} from "react-router";
import Animator from "../utils/sync_animator.js";
import $ from "jquery";

var NavBar = React.createClass({
    getInitialState: function() { return {selected: "HOME"}},
    changeTab: function(tabName) {
        if (tabName == this.state.selected) return;
        var $this = this;
        var $currentTab = $(this.refs.currentTab.getDOMNode());
        $currentTab.stop().animate({
            left: -200
        }, 250, function() {
            $this.setState({selected: tabName});
            $currentTab.stop().animate({left: 0}, 250);
        })
    },
    render: function() {
        return  <div className="app-bar">
            <ul className="heading app-bar-menu">
                <li className="current-tab" ref="currentTab">{this.state.selected}</li>
            </ul>
            <ul className="app-bar-menu right">
                <li onClick={this.changeTab.bind(this,"HOME")}><Link to="/">HOME</Link></li>
                <li onClick={this.changeTab.bind(this,"EXPERIMENT")}><Link to="/exp/index">EXPERIMENTS</Link></li>
                <li onClick={this.changeTab.bind(this,"POSTS")}><a className="disable">POSTS</a></li>
                <li onClick={this.changeTab.bind(this,"BIO")}><Link to="/bio" className="disable">BIO</Link></li>
                <li onClick={this.changeTab.bind(this,"CONTACT")}><Link to="/contact" className="disable">CONTACT</Link></li>
            </ul>
        </div>
    }
});

export default NavBar;
