import React from "react";
import {Link} from "react-router";
import mui from "material-ui";
import ThemeMixin from "../mixins/material_mixin.js";


var Card = mui.Card;
var CardHeader = mui.CardHeader;
var CardMedia = mui.CardMedia;
var CardTitle = mui.CardTitle;
var CardActions = mui.CardActions;
var CardText = mui.CardText;
var Avatar = mui.Avatar;
var FlatButton = mui.FlatButton;


var Index = React.createClass({
    mixins: [ThemeMixin],
    render: function() {
        return <div style={styles.base}>
            <Card initiallyExpanded={true}>
                <CardHeader
                    title="Hello,"
                    subtitle="world."
                    avatar={<Avatar style={{color:'red'}}>S</Avatar>}
                    showExpandableButton={true}>
                </CardHeader>
                <CardText expandable={true}>
                    <h3>Rewriting everything in Material-UI....</h3>
                </CardText>
            </Card>
        </div>
    }
});


var styles = {
    base: {
        width: "60%",
        margin: "120px auto",
        maxWidth: "800px"
    }
};

export default Index;