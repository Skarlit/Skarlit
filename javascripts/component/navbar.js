import React from "react";
import {Link} from "react-router";
import mui from "material-ui";
import ThemeMixin from "../mixins/material_mixin.js";

var Tab = mui.Tab;
var Tabs = mui.Tabs;

var NavBar = React.createClass({
    mixins: [ThemeMixin],
    render: function() {
        return <Tabs>
            <Tab label="About" ></Tab>
            <Tab label="Experiement" ></Tab>
            <Tab label="Other"/>
        </Tabs>
    }
});

export default NavBar;
