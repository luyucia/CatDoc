/**
 * Created by limingze on 2015/11/12.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var Condition = require('./condition');
var Table = require('./table');

//WiFi点点文档系统
ReactDOM.render(
    <div className="warp" >
        <h3 className="ui header">
            WiFi点点文档系统
        </h3>
        <Condition />
        <div className="ui divider"></div>
        <Table />
    </div>,
    document.getElementById('exp')
);

