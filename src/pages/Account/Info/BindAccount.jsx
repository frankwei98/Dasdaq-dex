import React, { Component } from "react";
import {Col, Row} from 'antd';
import Left from "./Left";

class InfoUser extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span={4}>
                        <Left />
                    </Col>
                    <Col span={20}>
                        嘿嘿。
                    </Col>
                </Row>
            </div>
        )
    }
}

export default InfoUser;