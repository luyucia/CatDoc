/**
 * Created by limingze on 2015/11/13.
 */

var React = require('react');
var ReactDom = require('react-dom');
var $ = require('jquery');
window.jQuery = $;
require('./semantic.min');
var format = require('json-nice');

var Modal = React.createClass({
    getInitialState: function () {
        return {
            dataParams: this.props.dataParams,
            modalClassName: {
                warp: 'hidden',
                modal: 'hidden'
            },
            loadClassName: "hidden"
        };
    },
    componentWillReceiveProps: function (m) {
        if (m.dataParams.url) {
            var data = {};
            data['url'] = m.dataParams.url;
            data['method'] = m.dataParams.method;
            data['params'] = m.dataParams.params;
            data['id'] = m.dataParams.id;

            $.ajax({
                url: 'api/test',
                method: 'post',
                data: data,
                dataType: 'json',
                beforeSend: function () {
                    this.setState({
                        dataParams: {
                            cost: '',
                            rtn: '',
                        },
                        modalClassName: {
                            warp: 'ui dimmer modals page transition visible active',
                            //modal:'hidden'
                        },
                        loadClassName: "ui text loader"
                    });
                }.bind(this),
                success: function (result) {
                    this.setState({
                        dataParams: {
                            cost: result.cost,
                            rtn: result.rtn,
                        },
                        modalClassName: {
                            warp: 'ui dimmer modals page transition visible active',
                            modal: 'ui modal transition visible active'
                        },
                        loadClassName: "hidden"
                    });
                }.bind(this),
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus);
                    this.setState({
                        modalClassName: {
                            warp: 'hidden',
                            //modal:'hidden'
                        },
                        loadClassName: "hidden"
                    });
                }.bind(this)
            });
        }

    },
    handleCloseClick: function () {
        this.setState({
            modalClassName: {
                warp: 'hidden',
                modal: 'ui modal'
            }
        });
    },
    //componentDidMount: function () {
    //
    //},
    render: function () {
        var jsonStr = '';
        if(this.state.dataParams.rtn){
            var jsonObj = $.parseJSON(this.state.dataParams.rtn);
            jsonStr = format(jsonObj);
        }
        return (
            <div className={this.state.modalClassName.warp}>
                <div className={this.state.modalClassName.modal}>
                    <i className="close icon" onClick={this.handleCloseClick}></i>

                    <div className="header">
                        请求结果
                    </div>
                    <div className="description">
                        <div className="ui header">{this.state.dataParams.cost}</div>
                        <pre className="ui success message" >
                            {jsonStr}
                        </pre>
                    </div>
                    <div className="actions">
                        <div className="ui black button" onClick={this.handleCloseClick}>
                            关闭
                        </div>
                    </div>
                </div>
                <div className={this.state.loadClassName}>Loading</div>
            </div>
        );
    }
});

module.exports = React.createClass({
    getInitialState: function () {
        return {
            tableData: {},
            dataParams: {},
        };
    },
    componentDidMount: function () {
        $.ajax({
            url: '/api/lists',
            method: 'post',
            dataType: 'json',
            success: function (result) {
                this.setState({
                    tableData: result.info,
                });
            }.bind(this)
        });
    },
    handleSimulationClick: function (id, url, method, params) {
        this.setState({
            dataParams: {
                id: id,
                url: url,
                method: method,
                params: params
            },
        });
    },
    handleDeleteClick: function (id) {
        if (!confirm('确认删除?')) {
            return;
        }
        var _this = this;
        $.ajax({
            url: '/api/delete',
            method: 'post',
            data: 'id=' + id,
            success: function (result) {
                alert('删除成功')
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus);
            },
        }).done(function () {
            $.ajax({
                url: '/api/lists',
                method: 'post',
                dataType: 'json',
                success: function (result) {
                    _this.setState({
                        tableData: result.info,
                    });
                }
            });
        });
    },
    render: function () {
        var row = [];
        if (typeof(this.state.tableData.map) !== 'undefined') {
            row = this.state.tableData.map(
                function (item) {
                    return (
                        <tr>
                            <td>
                                <div
                                    className="ui teal ribbon label"
                                    title={item.name}> {item.name}
                                </div>
                            </td>
                            <td title={item.url}>{item.url}</td>
                            <td title={item.method}>{item.method}</td>
                            <td title={item.params}>
                                <div className="ui form">
                                    <div className="field">
                                        <textarea rows="2" defaultValue={item.params}></textarea>
                                    </div>
                                </div>
                            </td>
                            <td data-id={item.id} className="simulation">
                                <button
                                    className="ui blue basic button small"
                                    onClick={this.handleSimulationClick.bind(this,item.id, item.url,item.method,item.params)}
                                    dataUrl={item.url}
                                    dataMethod={item.method}
                                    dataParams={item.params}>模拟
                                </button>
                            </td>
                            <td data-id={item.id} className="delete">
                                <button className="ui red  basic button small"
                                        onClick={this.handleDeleteClick.bind(this,item.id)}>删除
                                </button>
                            </td>
                        </tr>
                    )
                }.bind(this)
            );
        }

        return (
            <div>
                <table className="ui celled table">
                    <thead>
                    <tr>
                        <th>接口名</th>
                        <th>URL</th>
                        <th>方法</th>
                        <th>参数</th>
                        <th>测试</th>
                        <th>删除</th>
                    </tr>
                    </thead>
                    <tbody>
                    {row}
                    </tbody>
                </table>

                <Modal dataParams={this.state.dataParams}/>
            </div>
        );
    }
});