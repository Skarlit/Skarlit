import React from "react";
import $ from "jquery";

export var Term = React.createClass({
    getInitialState: function() {
        return {initialized: false}
    },
    componentDidMount: function() {
        var $term = $(this.refs.term.getDOMNode());
        var center = [window.innerWidth / 2, window.innerHeight / 2];
        var tgtHeight = window.innerHeight * (window.innerHeight > window.innerWidth ?  0.6 : 0.6);
        var tgtWidth = window.innerWidth * (window.innerHeight > window.innerWidth ?  0.8 : 0.6);
        $({t: 0}).animate({
            t: 1
        }, {
            duration: 300,
            easing: 'linear',
            step: function(t) {
                $term.width(t*tgtWidth);
                $term.height(t*tgtHeight);
                $term.css('left', center[0] *(1 - t) + t * (window.innerWidth - tgtWidth) / 2)
                    .css('top', center[1] * (1 - t) + t * (window.innerHeight - tgtHeight) / 2);
            },
            complete: function() {
                this.setState({initialized: true});
                window.onresize = function() {
                    var h = window.innerHeight * (window.innerHeight > window.innerWidth ?  0.6 : 0.6);
                    var w = window.innerWidth * (window.innerHeight > window.innerWidth ?  0.8 : 0.6);
                    var left = (window.innerWidth - w) / 2;
                    var top = (window.innerHeight - h) / 2;
                    $term.css('left', (window.innerWidth - $term.width()) / 2)
                        .css('top', (window.innerHeight - $term.height()) / 2);
                }
            }.bind(this)
        })
    },
    componentWillUnmount: function() {

    },
    focus: function() {
        $('#user-input').focus();
    },
    render: function() {
        var termStyle;
        var children = null;
        if (this.state.initialized) {
            var h = window.innerHeight * (window.innerHeight > window.innerWidth ?  0.6 : 0.6);
            var w = window.innerWidth * (window.innerHeight > window.innerWidth ?  0.8 : 0.6);
            var left = (window.innerWidth - w) / 2;
            var top = (window.innerHeight - h) / 2;
            termStyle = {
                height: h,
                width: w,
                top: top,
                left: left
            };
            children = [
                <TermHead key="termhead" />,
                <TermBody key="termbody" />
            ]
        } else {
            termStyle = collapse;
        }
        return <div id="term" ref="term" style={termStyle}>
            <div style={{position: "relative", width: "100%", height: "100%"}} onClick={this.focus.bind(this)}>
                {children}
            </div>
        </div>
    }
});

var collapse = {
    width: 0,
    height: 0,
    top: '50%',
    left: '50%'
}


var TermHead = React.createClass({
    close: function() {
        window.open('','_self');
        window.close();
    },
    render: function() {
        return <div id="term-head">
            <div className="title">Ran Xie's Homepage</div>
            <a href="javascript://" onClick={this.close} className="close">&#10005;</a>
        </div>
    }
});

var TermBody = React.createClass({
    getInitialState: function() {
        return {userInput: '', loc: ['~'], dispStack: []}
    },
    componentDidMount: function() {
        var man = new InputManager(this);
    },
    render: function() {
        var history = [];
        for(var i = 0;  i < this.state.dispStack.length; i++) {
            history.push(<Output key={'output-' + i } output={this.state.dispStack[i]} />);
        }
        return <div id="term-body">
            {history}
            <CurrentLine userInput={this.state.userInput} loc={this.state.loc.join('/')} />
        </div>
    }
});

var Output = React.createClass({
    render: function() {
        return <div className="output">
            {this.props.output}
        </div>
    }
});

var CurrentLine = React.createClass({
   render: function() {
       return <div id="current-line" className="section">
           <span className="prefix">guest@Skarlit.github.io {this.props.loc}></span>
           <span id="user-input" >{this.props.userInput}</span>
           <span className="blinking-cursor"></span>
       </div>
   }
});

class InputManager {
    constructor(view) {
        this.view = view;
        this.inputQueue = [];
        this.initListener();
    }
    initListener() {
        $(window).on('keydown', function(e) {
            switch(e.which) {
                case 13:
                    e.preventDefault();
                    e.stopPropagation();
                    this.cloneCurrentLine();
                    this.inputQueue = [];
                    break;
                case 8:
                    e.preventDefault();
                    e.stopPropagation();
                    this.inputQueue.pop();
                    break;
                default:
                    var key = String.fromCharCode(e.which);
                    this.inputQueue.push(e.shiftKey ? key : key.toLowerCase());
                    break;
            }
            this.view.setState({userInput: this.inputQueue.join('')});
        }.bind(this))
    }
    cloneCurrentLine() {
        var s = 'guest@Skarlit.github.io '+ this.view.state.loc + '> ' + this.inputQueue.join('');
        this.view.state.dispStack.push(s);
        this.view.setState({});
    }
}

