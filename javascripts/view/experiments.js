import React from "react";
import {Link} from "react-router";
import mui from "material-ui";
import ThemeMixin from "../mixins/material_mixin.js";
import PageFrame from "../component/page_frame.js";

var List = mui.List;
var ListItem = mui.ListItem;
var ContentInbox = mui.ContextInbox;
var ActionGrade = mui.ActionGrade;
var ContentSend = mui.ContentSend;
var ActionInfo = mui.ActionInfo;
var ListDivider = mui.ListDivider;
var ContentDrafts = mui.ContentDrafts;
var Avatar = mui.Avatar;
var CardHeader = mui.CardHeader;
var Card = mui.Card;
var CardMedia = mui.CardMedia;
var CardTitle = mui.CardTitle;
var CardText = mui.CardText;

var Experiments = React.createClass({
    mixins: [ThemeMixin],
    render: function() {
        return <PageFrame style={styles.base} fadeIn={600}>

            <Card style={styles.card} initiallyExpanded={true}>
                <CardHeader
                    title="_"
                    subtitle="crude algorithms implements."
                    avatar={<Avatar style={styles.avatar}>A</Avatar>}
                    showExpandableButton={true}>
                </CardHeader>
                <CardText expandable={true}>
                    <List>
                        <ListItem primaryText="Tree Printer" />
                        <ListItem primaryText="Work in Progress" />
                        <ListItem primaryText="Work in Progress"  />
                        <ListItem primaryText="Work in Progress"  />
                        <ListItem primaryText="Work in Progress" />
                    </List>
                </CardText>
            </Card>

            <ListDivider />
            <List>
                <ListItem primaryText="Work in Progress"  />
                <ListItem primaryText="Work in Progress" />
                <ListItem primaryText="Work in Progress" />
                <ListItem primaryText="Work in Progress"/>
            </List>
        </PageFrame>
    }
});


var styles = {
    base: {
        width: "60%",
        margin: "0 auto",
        maxWidth: "800px",
        display: "none"
    },
    card: {
      backgroundColor: "#ddd"
    },
    avatar: {color: "#BFFF00", backgroundColor: "#000"}
};

export default Experiments;