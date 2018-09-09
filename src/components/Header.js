
import React from "react";
import { Layout, Row, Col } from "antd";
import Nav from "./nav";
import Store from "../store";
import smartNavbarColor from "./nav/smartColor";
import BrandLight from "../Brand-Light1.svg";
import BrandDark from "../Brand-Dark1.svg";

const { Header } = Layout;

const HeaderComponent = (props) => {
    const { location, store } = props
    const theme = store.get('theme')
    const { headerBackgroundColor, otherColor } = smartNavbarColor({ location, theme })
    const Brand = theme === 'light' ? BrandDark : BrandLight
    return (
    <Header className="header" style={{ background: headerBackgroundColor, padding: 0 }}>
        <Row style={
            {
                background: otherColor,
            }}>
            <Col span={2} >
                <div className="logo" >
                    <img src={Brand} alt="Dasdaq Brand"
                        style={{ maxHeight: '3rem' }}></img>
                </div>
            </Col>
            <Col span={22}>
                <Nav {...props} theme={theme} />
            </Col> 
        </Row>
    </Header>
    )
}

export default Store.withStore(HeaderComponent)