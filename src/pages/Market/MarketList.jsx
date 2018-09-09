import React, { Component } from "react";
import axios from "axios-jsonp-pro";
import DataSet from "@antv/data-set";
import data from "./fakeData.json";
import { Table } from 'antd';

const columns = [{
    title: '名称',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '兑换为BTC',
    dataIndex: 'BTC',
    key: 'BTC',
    sortOrder: 'ascend',
    sorter: (a, b) => parseInt(a.BTC, 10) - parseInt(b.BTC, 10),
}, {
    title: '兑换为ETH',
    dataIndex: 'ETH',
    key: 'ETH',
    defaultSortOrder: 'descend',
    sorter: (a, b) => parseInt(a.ETH, 10) - parseInt(b.ETH, 10),
}, {
    title: '兑换为EOS',
    dataIndex: 'EOS',
    key: 'EOS',
    defaultSortOrder: 'descend',
    sorter: (a, b) => parseInt(a.EOS, 10) - parseInt(b.EOS, 10),
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
            historyData: [],
            coinPrice: []
        }
    }

    onChange(obj) {
        const { startText, endText } = obj;
        ds.setState('start', startText);
        ds.setState('end', endText);
    }

    async componentDidMount() {
        const api = 'https://min-api.cryptocompare.com/data/histominute?&'
        const { data } = await axios.get(api, {
            params: {
                fsym: 'BTC',
                tsym: 'ETH',
                limit: 1440,
                aggregate: 15,
                extraParams: "Cryptocurrency_Market"
            }
        })
        console.info(data)
        this.setState({ historyData: data })
        var thiz = this;
        const url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,EOS&tsyms=USD,CNY,JPY";
        axios.get(url)
            .then(function (resp) {
                let data = resp.data;
                let values = [
                    { key: "1", name: "USD", BTC: data.BTC.USD, ETH: data.ETH.USD, EOS: data.EOS.USD },
                    { key: "2", name: "CNY", BTC: data.BTC.CNY, ETH: data.ETH.CNY, EOS: data.EOS.CNY },
                    { key: "3", name: "JPY", BTC: data.BTC.JPY, ETH: data.ETH.JPY, EOS: data.EOS.JPY },
                ]
                thiz.setState({ coinPrice: values });
            })
            .catch(function (err) {
                console.info(err)
            })
    }

    render() {
        
        const { coinPrice, historyData } = this.state;
        historyData.toString();
        return (
            <div className="market">
                    <div>
                        <Table dataSource={coinPrice} columns={columns}
                            onRow={(record) =>
                                ({
                                    onClick: () => {
                                        this.props.history.push(`/market/detail/${record.name}`)
                                    }
                                })
                            } />
                    </div>
            </div>
        )
    }
}

export default MarketPage;