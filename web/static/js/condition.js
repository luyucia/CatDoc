/**
 * Created by limingze on 2015/11/13.
 */

var React = require('react');
var ReactDom = require('react-dom');
var $ = require('jquery');
window.jQuery = $;
require('./semantic.min');

module.exports = React.createClass({
    componentDidMount: function () {
        $('select.dropdown').dropdown();
        $('.ui.accordion').accordion();
    },
    render: function () {
        return (
            <div className="ui styled fluid accordion info condition">
                <div className="active title">
                    <i className="dropdown icon"></i> 检索
                </div>
                <div className="active content">
                    <form className="ui form">
                        <div className="ui icon fluid input focus">
                            <input type="text" name="keywords" placeholder="请输入关键字" />
                            <i className="circular search link icon"></i>
                        </div>

                    </form>
                </div>

                <div className="title">
                    <i className="dropdown icon"></i> 添加文档
                </div>
                <div className="content">
                    <form className="ui form">
                        <div className="field">
                            <label>接口名称</label>
                            <input type="text" name="name" placeholder="Demo"/>
                        </div>
                        <div className="field">
                            <label>URL</label>
                            <input type="text" placeholder="http://www.510wifi.com" name="url"/>
                        </div>
                        <div className="field">
                            <label>Method</label>
                            <select className="ui dropdown">
                                <option value="post">post</option>
                                <option value="get">get</option>
                                <option value="put">put</option>
                                <option value="delete">delete</option>
                            </select>
                        </div>
                        <div className="field">
                            <label>请求参数</label>
                            <input type="text" placeholder="请求参数"/>
                        </div>

                        <button className="ui secondary button">保存</button>
                    </form>
                </div>
            </div>

        );
    }
});