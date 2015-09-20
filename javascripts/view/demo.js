import React from "react";
import {RouteContext} from 'react-router'
import PageFrame from "../component/page_frame.js";
import {ExperimentsStyle} from "../data.js";
import mui from "material-ui";
import ThemeMixin from "../mixins/material_mixin.js";
import merge from "merge";

var List = mui.List;
var ListItem = mui.ListItem;
var Avatar = mui.Avatar;
var CardHeader = mui.CardHeader;
var Card = mui.Card;
var CardMedia = mui.CardMedia;
var CardTitle = mui.CardTitle;
var CardText = mui.CardText;

var Demo = React.createClass({
    render: function() {
        var config = ExperimentsStyle[this.props.params.name] || {};
        var maxHeight = window.innerHeight - 130;
        return <div style={styles.base}>
            <CardTitle style={styles.cardTitle}
                       titleStyle={styles.titleText}
                       subtitleStyle={styles.subTitleText}
                       title={config.title}
                       subtitle={config.description}/>
            <iframe style={merge(true, styles.iframe, config.wrapperCss, {maxHeight: maxHeight})} seamless={true} sandbox="">

            </iframe>
        </div>
    }
});

var styles = {
    base: {
        margin: "0 auto",
        maxWidth: "80%",
        position: 'relative',
        backgroundColor: '#fff'
    },
    cardTitle: {

    },
    titleText: {

    },
    subTitleText: {

    },
    iframe: {
        width: '100%',
        border: 'none'
    }
}
export default Demo;