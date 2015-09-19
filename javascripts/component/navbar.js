import React from "react";
import {Link, History} from "react-router";
import mui from "material-ui";
import ThemeMixin from "../mixins/material_mixin.js";
import merge from "merge";

var Tab = mui.Tab;
var Tabs = mui.Tabs;
var IconButton = mui.IconButton;
var SvgIcon = mui.SvgIcon;

var NavBar = React.createClass({
    mixins: [ThemeMixin, History],
    contextTypes: {
        location: React.PropTypes.object
    },
    navigate: function(value) {
        window.location.hash = value;
    },
    render: function() {
        // TMP work around
        var pathname = this.context.location.pathname;
        return  <div style={styles.wrapper}>
            <a style={styles.homeBtn} href="/#/">
                <SvgIcon style={merge(true, styles.icon, pathname == '/' &&  styles.iconActivate)}>
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
                </SvgIcon>
            </a>
            <Tabs style={styles.tabs}
                  tabItemContainerStyle={styles.tabsContent}
                  inkBarStyle={styles.inkBar}
                  onChange={this.navigate} value={pathname}>
                <Tab label="About" value="/about"></Tab>
                <Tab label="Experiments" value="/experiments" ></Tab>
                <Tab label="Other" value="/other" />
            </Tabs>
        </div>
    }
});

var styles = {
    wrapper: {
        width: "100%",
        position: "relative",
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "center"
    },
    icon: { fill: "#fff", height: "36px", width: "36px",  transition: "fill 800ms ease"},
    iconActivate: { fill: "#BFFF00", transition: "fill 800ms ease"},
    homeBtn: {
        order: 1,
        flexBasis: "48px",
        backgroundColor: "#000",
        padding: "6px"
    },
    inkBar: {
        backgroundColor: "#BFFF00"
    },
    tabs: {
        order: 2,
        flexBasis: "100%"
    },
    tabsContent: {
        backgroundColor: "#000"
    }
}

export default NavBar;
