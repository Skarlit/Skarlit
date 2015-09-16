import React from "react";
import {Link, RouteContext} from "react-router";
import mui from "material-ui";
import ThemeMixin from "../mixins/material_mixin.js";

var Tab = mui.Tab;
var Tabs = mui.Tabs;
var IconButton = mui.IconButton;

var NavBar = React.createClass({
    mixins: [ThemeMixin],
    navigate: function(value) {
        window.location.hash = value;
    },
    render: function() {
        // TMP work around
        var tabsValue = window.location.hash.split('/')[1].split('?')[0].trim();
        return <Tabs onChange={this.navigate} value={'/' + tabsValue}>
                <Tab label="Home" value="/"></Tab>
                <Tab label="About" value="/about"></Tab>
                <Tab label="Experiments" value="/experiments" ></Tab>
                <Tab label="Other" value="/other" />
            </Tabs>
    }
});

export default NavBar;
