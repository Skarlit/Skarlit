import React from "react";
import {Link, RouteContext} from "react-router";
import mui from "material-ui";
import ThemeMixin from "../mixins/material_mixin.js";

var Tab = mui.Tab;
var Tabs = mui.Tabs;
var IconButton = mui.IconButton;
var SvgIcon = mui.SvgIcon;

var NavBar = React.createClass({
    mixins: [ThemeMixin],
    navigate: function(value) {
        window.location.hash = value;
    },
    render: function() {
        // TMP work around
        var tabsValue = window.location.hash.split('/')[1].split('?')[0].trim();
        return  <div style={styles.wrapper}>
            <a style={styles.homeBtn} href="/#/">
                <SvgIcon style={{ fill: "#BFFF00", height: "36px", width: "36px"}}>
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
                </SvgIcon>
            </a>
            <Tabs style={styles.tabs}
                  tabItemContainerStyle={styles.tabsContent}
                  inkBarStyle={styles.inkBar}
                  onChange={this.navigate} value={'/' + tabsValue}>
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
