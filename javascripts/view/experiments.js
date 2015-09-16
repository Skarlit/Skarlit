import React from "react";
import {Link} from "react-router";
import mui from "material-ui";
import ThemeMixin from "../mixins/material_mixin.js";

var List = mui.List;
var ListItem = mui.ListItem;
var ContentInbox = mui.ContextInbox;
var ActionGrade = mui.ActionGrade;
var ContentSend = mui.ContentSend;
var ActionInfo = mui.ActionInfo;
var ListDivider = mui.ListDivider;
var ContentDrafts = mui.ContentDrafts;

var Experiments = React.createClass({
    mixins: [ThemeMixin],
    render: function() {
        return <div style={styles.base}>
            <List>
                <ListItem primaryText="Work in Progress" />
                <ListItem primaryText="Work in Progress" />
                <ListItem primaryText="Work in Progress"  />
                <ListItem primaryText="Work in Progress"  />
                <ListItem primaryText="Work in Progress" />
            </List>
            <ListDivider />
            <List>
                <ListItem primaryText="Work in Progress"  />
                <ListItem primaryText="Work in Progress" />
                <ListItem primaryText="Work in Progress" />
                <ListItem primaryText="Work in Progress"/>
            </List>
        </div>
    }
});


var styles = {
    base: {
        width: "60%",
        margin: "0 auto",
        maxWidth: "800px"
    }
};

export default Experiments;