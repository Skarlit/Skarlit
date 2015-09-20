import React from "react";
import {Link, History} from "react-router";
import mui from "material-ui";
import ThemeMixin from "../mixins/material_mixin.js";
import PageFrame from "../component/page_frame.js";
import {ExperimentsData} from "../data.js";

var List = mui.List;
var ListItem = mui.ListItem;
var ListDivider = mui.ListDivider;
var Avatar = mui.Avatar;
var CardHeader = mui.CardHeader;
var Card = mui.Card;
var CardMedia = mui.CardMedia;
var CardTitle = mui.CardTitle;
var CardText = mui.CardText;



var Experiments = React.createClass({
    mixins: [ThemeMixin, History],
    navigate: function(pathname) {
      this.history.pushState(null, '/experiments/' + pathname, null);
    },
    itemsList: function() {
      var listItems = [];
      for(var i = 0; i < ExperimentsData.length; i++) {
          listItems.push(<ListItem
              primaryText={ExperimentsData[i].title}
              leftAvatar={<Avatar style={styles.avatar}>{ExperimentsData[i].type[0].toUpperCase()}</Avatar>}
              onClick={this.navigate.bind(this, ExperimentsData[i].pathname)}
              />)
      }
        return listItems;
    },
    render: function() {
        return <div style={styles.base}>
            <Card style={styles.card} initiallyExpanded={true}>
                <CardMedia
                    style={{
                        backgroundImage: 'url("http://images.fastcompany.com/upload/greencodeBIG.jpg")',
                        width: "100%",
                        paddingTop: "230px",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundOrigin: "50% 50%"
                    }}
                    overlayStyle= {{height: '90%'}}
                    overlay={<CardTitle title="Experiments" subtitle="Random pic taken from fastcompany.com."/>}>
                </CardMedia>
                <CardText expandable={true}>
                    <List>
                        {this.itemsList()}
                    </List>
                </CardText>
            </Card>
        </div>
    }
});


var styles = {
    base: {
        width: "60%",
        margin: "0 auto",
        maxWidth: "800px"
    },
    card: {
      backgroundColor: "#fff"
    },
    avatar: {color: "#BFFF00", backgroundColor: "#000"}
};

export default Experiments;