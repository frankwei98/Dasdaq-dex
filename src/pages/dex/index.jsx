import React, { Component } from "react";
import { withRouter, Route, Switch } from "react-router-dom";

import OrdersList from "./ordersList";
import OrderDetail from "./OrderDetail";
import Store from "../../store";
import net from "../../scatter/commonNetwork.json";
import ScatterJS from 'scatter-js/dist/scatter.esm';

class SimpleDex extends Component {
    eosNetwork=net['kylin']
    async componentDidMount() {
        const { history, match, store } = this.props
        const {scatter} = store.get('scatter')
        scatter.connect("EOS SimpleDex").then(connected => {
            if(!connected) return false;
            const scatter = ScatterJS.scatter;
            scatter.getIdentity({ accounts: [this.eosNetwork] }).then(id => this.setState({id}))
            window.scatter = null;
        });
        console.info(scatter)
        
    }
    render() {
        const { history, match, store } = this.props
        const scatter = store.get('scatter')
        return (
            <div className="dex">
            <Switch>
                <Route exact path={`${match.url}`} component={OrdersList} />
                <Route path={`${match.url}/:id`} component={OrderDetail} />
            </Switch>
            </div>
        )
    }
}

export default withRouter(
    Store.withStore(SimpleDex)
)