import React from "react";
import {RouteContext} from 'react-router'
import PageFrame from "../component/page_frame.js";

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
            <iframe src={config.src}
                    style={merge(true, styles.iframe, config.wrapperCss, {maxHeight: maxHeight})}
                    seamless={true}
                    sandbox="allow-scripts">
            </iframe>
        </div>
    }
});


export default Demo;