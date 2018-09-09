import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import { withRouter, Route, Switch } from "react-router-dom";

import axios from "axios";
import Store from "../../store";

class OrdersList extends Component {
    constructor() {
        super()
        this.state = { order: null }
    }

    async componentDidMount() {
        const { match } = this.props
        const paramId = match.params.id
        const { data } = await axios({
            method: 'post',
            url: 'https://api-kylin.eosasia.one/v1/chain/get_table_rows',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                "code": "eosotcbackup",
                "table": "order",
                "scope": "eosio.token",
                "json": true
            },
            withCredentials: false
        })
        console.log(data)
        const order = data.rows.filter(
            ({ id }) => `${id}` === paramId
        )[0]
        this.setState({ order })
    }
    render() {
        const { store, match } = this.props
        const { id } = match.params
        const { order } = this.state
        const scatter = store.get('scatter')
        return (
            order && <div className="order">
                订单番号 {id}
                <p> {JSON.stringify(this.state.order)}</p>
                <Card title={`订单 ${id}`}>
                    <p>出价: {order.bid.quantity}</p>
                    <p>要价: {order.ask.quantity}</p>
                    <p>订单创建时间 {order.timestamp} </p>
                    <p></p>
                    <p></p>
                </Card>
            </div>
        )
    }
}

export default withRouter(
    Store.withStore(OrdersList)
)