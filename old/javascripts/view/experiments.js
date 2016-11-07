import React from "react";
import {Link, History} from "react-router";
import Animator from "../utils/sync_animator.js";
import $ from "jquery";


var Exp = React.createClass({
    getInitialState: function() {
        return {toggled: false, frameUrl: ''};
    },
    componentDidMount: function() {
    },
    toggle: function(url) {
        if (this.state.toggled) {
            this.setState({frameUrl: url});
        } else {
            this.animateList(url);
        }
    },
    animateList: function(url) {
        var $list = $(this.refs.panel.getDOMNode());
        var $this = this;
        var listWidth = $list.width();
        var listFinalWidth = 250;
        Animator.animate({
            duration:  300,
            step: function(countDown, dt) {
                $list.css('left',  (25 * (1 - countDown/ 300) + 50 * countDown / 300)+ '%');
            }
        });
        Animator.animate({
            duration:  300,
            step: function(countDown, dt) {
                $list.css('width',  (listFinalWidth * (1 - countDown/ 300) + listWidth * countDown / 300));
            }
        });
        var $frame = $(this.refs.frame.getDOMNode());
        var bodyWidth = $('.body').width();
        var marginLeft = 30;
        Animator.animate({
            duration: 10,
            step: function() {},
            callback: function() {
                $frame.width(10);
                $frame.height(10);
                $frame.show();
                $frame.css('left', listFinalWidth + marginLeft);
            }
        });
        Animator.animate({
            duration: 400,
            step: function(countDown, dt) {
                $frame.width(10* countDown/ 400 + (1 - countDown / 400) * (bodyWidth - listFinalWidth - marginLeft));
                $frame.height(10 * countDown/ 400 + (1 - countDown / 400) * (window.innerHeight - 200));
            },
            callback: function() {
                $this.setState({frameUrl: url, toggled: true})
            }
        })
    },
    componentWillUnmount: function() {
        Animator.flush();
    },
    render: function() {
        return <div style={{position: 'relative'}}>
            <div ref="panel" className="panel exp">
                <div className="listview">
                    <div onClick={this.toggle.bind(null, "/javascripts/algorithm/magic_wand/index.html")} className="list">
                        <span className="list-icon icon-font-icon"></span>
                        <span className="list-title">Magic Wand</span>
                    </div>
                    <div onClick={this.toggle.bind(null, "/javascripts/algorithm/SplitString/index.html")} className="list">
                        <span className="list-icon icon-font-icon"></span>
                        <span className="list-title">String Split</span>
                    </div>
                </div>
            </div>
            <iframe ref="frame" style={frameStyle} seamless={true} src={this.state.frameUrl} ></iframe>
        </div>
    }
});

var frameStyle = {
    top: 0,
    position: 'absolute',
    border: "1px solid #777",
    display: 'none'
};

export default Exp;