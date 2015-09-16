import React from "react";
import mui from "material-ui";
import tap from "react-tap-event-plugin"

// Initialize click/tap event for material ui.
tap();

var ThemeManager = new mui.Styles.ThemeManager();


var ThemeMixin = {
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext: function() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }
};

export default ThemeMixin;