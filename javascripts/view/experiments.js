import React from "react";
import {Link, History} from "react-router";


var Exp = React.createClass({
    render: function() {
        return <div>
            <div className="panel exp">
                <div className="listview">
                    <div className="list">
                        <span className="list-icon icon-font-icon"></span>
                            <span className="list-title">...list title...</span>
                    </div>
                    <div className="list">
                        <span className="list-icon icon-font-icon"></span>
                        <span className="list-title">...list title...</span>
                    </div>
                </div>
            </div>
        </div>
    }
});


export default Exp;