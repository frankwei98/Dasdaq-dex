import React from "react";
import Loadable from 'react-loadable';
import { Route, Switch } from "react-router-dom";

import withContent from "../ContentWrapper";

const LoadingMessage = (name) => (<div> Loading Market {name} modules, Please wait</div>)

export const MarketList = Loadable({
    loader: () => import(/* webpackChunkName: "exchange" */ './TokensList'),
    loading: () => LoadingMessage('Market')
});

export const MarketDetail = Loadable({
    loader: () => import(/* webpackChunkName: "exchange-detail" */ './TokenDetail'),
    loading: () => LoadingMessage('MarketDetail')
});

function MarketView({ match }) {
    const urlConstruct = (location) => `${match.url}/${location}`
    return (
        <div className="market-view">
            <Switch>
                <Route exact path={match.url} component={MarketList} />
                <Route path={urlConstruct("detail/:symbol/:exchange")} component={MarketDetail} />
            </Switch>
        </div>
    )
}

export default withContent(MarketView)