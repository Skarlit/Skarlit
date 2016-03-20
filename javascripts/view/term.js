import React from "react";
import $ from "jquery";

var intro = `
  About Code Rain: \n
    Powered by THREE.JS. \n
    Bloom effect uses 9x9 gaussian blur filter with horizontal and vertical pass. \n
    2 passes are ported from https://github.com/Jam3/glsl-fast-gaussian-blur \n
`

export var Term = React.createClass({
    getInitialState: function() {
        return {initialized: false}
    },
    componentDidMount: function() {
        var $term = $(this.refs.term.getDOMNode());
        $term.width(window.innerWidth < 400 ? window.innerWidth * 0.8 : 640);
        $term.height(window.innerHeight < 400 ? window.innerHeight * 0.8 : 480);
        $term.css('margin-left', -$term.width() / 2);
        $term.css('margin-top', -$term.height() / 2);
    },
    componentWillUnmount: function() {

    },
    focus: function() {
        $('#user-input').focus();
    },
    render: function() {
        return <div id="term" ref="term">
            <div style={{position: "relative", width: "100%", height: "100%"}} onClick={this.focus.bind(this)}>
                <TermHead key="termhead" />
                <TermBody key="termbody" />
            </div>
        </div>
    }
});


var TermHead = React.createClass({
    render: function() {
        return <div id="term-head">
            <div className="title">Welcome to Ran Xie's Homepage</div>
        </div>
    }
});

var TermBody = React.createClass({
    componentDidUpdate: function() {
        var el = this.refs.termBody.getDOMNode();
        el.scrollTop = el.scrollHeight;
    },
    getInitialState: function() {
        return {userInput: '', loc: ['~'], dispStack: [intro]}
    },
    componentDidMount: function() {
        var man = new InputManager(this);
    },
    render: function() {
        var history = [];
        for(var i = 0;  i < this.state.dispStack.length; i++) {
            history.push(<Output key={'output-' + i } output={this.state.dispStack[i]} />);
        }
        return <div id="term-body" ref="termBody">
            {history}
            <CurrentLine userInput={this.state.userInput} loc={this.state.loc.join('/')} />
        </div>
    }
});

var Output = React.createClass({
    render: function() {
        var text = this.props.output.split('\n');
        var lines = [];
        for(var i =0; i < text.length; i++) {
            lines.push(<div className="line">{text[i]}</div>)
        }
        return <div className="output">
            {lines}
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
        }.bind(this));

        $(window).on('mousewheel', function(e) {
            var d = e.originalEvent.wheelDelta;
            this.view.refs.termBody.getDOMNode().scrollTop -= d;
        }.bind(this))
    }
    cloneCurrentLine() {
        var s = 'guest@Skarlit.github.io '+ this.view.state.loc + '> ' + this.inputQueue.join('');
        this.view.state.dispStack.push(s);
        this.view.setState({});
    }
}

