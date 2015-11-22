import React from "react";
import {Link} from "react-router";
import Animator from "../utils/sync_animator.js";
import $ from "jquery";

var intro = `My name is Ran.
I am a web application engineer.
I love learning and building cool things.
`;

var Index = React.createClass({
    componentDidMount: function() {
        var $titleEl = $(this.refs.title.getDOMNode());
        $titleEl.fadeIn(300);
        var $introLetters = $('.intro-letter');
        for(var i = 0; i < $introLetters.length; i++) {
            (function(j) {
                Animator.animate({
                    duration: 50,
                    step: function(countDown, dt) {
                        if (countDown > 0) {
                            $introLetters[j].textContent = intro[Math.floor(Math.random()*intro.length)];
                        } else {
                            $introLetters[j].textContent = intro[j];
                        }
                    }
                })
            })(i);
        }
    },
    componentWillUnmount: function() {
        Animator.flush();
    },
    render: function() {
        var introLetters = intro.split('');
        var introText = [];
        for(var i = 0; i < introLetters.length; i++) {
            introText.push(<span className="intro-letter"></span>);
        }
        return <div style={home}>
                <div ref="title" style={title}>
                   HELLO.
                </div>
                <div style={text}>
                    {introText}
                </div>
        </div>
    }
});

var home = {
    position:" absolute",
    width:" 640px",
    height:" 480px",
    top:" 50%",
    marginTop:" -240px",
    left:" 50%",
    marginLeft:" -320px"
};
var title = {'fontSize': '72px',  color: '#aaa'};
var text = {'fontSize': '30px', lineHeight: '70px', marginTop: '40px', color: '#999'};


export default Index;