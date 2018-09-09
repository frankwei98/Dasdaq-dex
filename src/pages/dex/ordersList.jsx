import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import { withRouter, Route, Switch } from "react-router-dom";

import axios from "axios";
import Store from "../../store";

class OrdersList extends Component {
    state = { orders: [] }

    async componentDidMount() {
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
        const orders = data.rows
        this.setState({ orders })
    }

    jumpToOrder(id) {
        const { history, match } = this.props
        history.push(`${match.url}/${id}`)
    }

    render() {
        const { store } = this.props
        const { orders } = this.state
        const scatter = store.get('scatter')
        return (
            <div className="dex">
                <Row gutter={16}>
                    {orders.map(order =>
                        <Col span={8}>
                            <Card key={order.id} onClick={() => this.jumpToOrder(order.id)}>
                                {JSON.stringify(order)}
                            </Card>
                        </Col>
                    )}

                </Row>
            </div>
        )
    }
}

export default withRouter(
    Store.withStore(OrdersList)
)