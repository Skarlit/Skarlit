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

var Experiment = React.createClass({
    mixins: [ThemeMixin],
    render: function() {
        return <div>
            <List>
                <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
                <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
                <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
                <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
            </List>
            <ListDivider />
            <List>
                <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
                <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
                <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
                <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} />
            </List>
        </div>
    }
});


export default Experiment;