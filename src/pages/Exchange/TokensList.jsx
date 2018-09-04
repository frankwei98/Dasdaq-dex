import React, { Component } from "react";
import axios from "axios";
import DataSet from "@antv/data-set";
import data from "./fakeData.json";
import { Table,  Icon } from 'antd';
const CoinPrices = require('./Dapps.json');

const columns = [{
    title: '交易对',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
        <span className="icon-ethereum">
            <a>{record.name}</a>
        </span>
    ),
}, {
    title: "价格",
    dataIndex: 'balance',
    key: 'balance',
    sorter: (a, b) => parseInt(a.balance, 10) - parseInt(b.balance, 10),
    render: (text, record) => (<span>{record.balance} EOS</span>),
    //icon is going to change to eth, nas, or eos
}, {
    title: "价格波动 24小时",
    dataIndex: 'userperday',
    key: 'userperday',
    defaultSortOrder: 'descend',
    sorter: (a, b) => parseInt(a.userperday.value, 10) - parseInt(b.userperday.value, 10),
    render: (text, record) => (<div>
        <div>{record.userperday.value}</div>
        <div style={record.userperday.change > 0 ? { color: "#f50" } : { color: "#87d068" }}>
            {(record.userperday.change > 0 ? "+" : "") + record.userperday.change}
        </div>
    </div>),
}, {
    title: "成交量 24小时",
    dataIndex: 'chargeperday',
    key: 'chargeperday',
    sorter: (a, b) => parseInt(a.chargeperday.value, 10) - parseInt(b.chargeperday.value, 10),
    render: (text, record) => (<div>
        <div><Icon type="bank" />{record.chargeperday.value}</div>
        <div style={record.chargeperday.change > 0 ? { color: "#f50" } : { color: "#87d068" }}>
            {(record.chargeperday.change > 0 ? "+" : "") + record.chargeperday.change}
        </div>
    </div>),
}, {
    title: "成交量 7天",
    dataIndex: 'chargeperweek',
    key: 'chargeperweek',
    sorter: (a, b) => parseInt(a.chargeperweek, 10) - parseInt(b.chargeperweek, 10),
}, {
    title: "交易 24小时",
    dataIndex: 'transperday',
    key: 'transperday',
    sorter: (a, b) => parseInt(a.transperday, 10) - parseInt(b.transperday, 10),
}, {
    title: "交易 7天",
    dataIndex: 'transperweek',
    key: 'transperweek',
    sorter: (a, b) => parseInt(a.transperweek, 10) - parseInt(b.transperweek, 10),
}, {
    title: "活动 7天",
    // dataIndex: 'transperweek',
    // key: 'transperweek',
    render: (text, record) => (<img alt="actimg" src="/165.png"></img>),
}];
const ds = new DataSet({
    state: {
        start: '2015-04-07',
        end: '2015-07-28'
    }
});
const dv = ds.createView();
dv.source(data)
    .transform({
        type: 'filter',
        callback: obj => {
            const date = obj.time;
            return date <= ds.state.end && date >= ds.state.start;
        }
    })
    .transform({
        type: 'map',
        callback: obj => {
            obj.trend = (obj.start <= obj.end) ? '上涨' : '下跌';
            obj.range = [obj.start, obj.end, obj.max, obj.min];
            return obj;
        }
    });

class MarketPage extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    onChange(obj) {
    }

    async componentDidMount() {
        
    }

    render() {
        const { match } = this.props
        const urlConstruct = (location) => `${match.url}/${location}`

        return (
            <div>
                <div>
                    <Table dataSource={CoinPrices} columns={columns}
                        onRow={(record) => ({
                            onClick: () => { this.props.history.push(urlConstruct(`detail/${record.name}/EOS`)) },       // 点击行
                        })
                        } />
                </div>
            </div>
        )
    }
}

export default MarketPage;