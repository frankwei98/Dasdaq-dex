import React, { Component } from 'react';
import ScatterJS from 'scatter-js/dist/scatter.esm';
import Store from "./store";
import { getMyInfo } from "./api/auth";
import { userLogin, setScatter } from "./actions";
import intl from 'react-intl-universal';

// Connecting store's state as props in the export process at the bottom
import { connect } from "react-redux";

// React-router stuff
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import locales from "./locale";

// Async Load Pages using react-loadable(https://github.com/jamiebuilds/react-loadable)
import accountRoutes from "./containers/Account";
import { Home, SDex } from "./pages/asyncRenderWrapper";
import Exchange from "./pages/Exchange";

// Page
import Footer from "./components/Footer";
import Header from "./containers/VisiableHeader";
import PageNotFound from "./pages/PageNotFound";

import './App.css';


class App extends Component {
  constructor() {
    super()
    this.state = {
      i18nLoaded: false
    }
  }
  
  async componentDidMount() {
    const { store } = this.props
    const lang = store.get('lang')
    // const { lang, saveUserData } = this.props
    console.info(`用户语言为: ${lang}`)
    // i18n 的黑魔法，不 await 阻塞会引起部分i18n文字为空白
    await intl.init({
      currentLocale: lang,
      locales,
    })
    this.setState({ i18nLoaded: true })
  }
  render() {
    return this.state.i18nLoaded && (
        <div className="App">
          <Router basename="/">
            <div className="container" >
              <div style={{ minHeight: 'calc(100vh - 70px)' }}>
                <Header />
                <div className="router-view" >
                  <Switch>
                    <Route exact path="/" component={Home} />
                    {/* Routes Account Part */}
                    <Route path="/account" >
                      <Switch>
                        {accountRoutes.map(route => <Route key={route.path} {...route} />)}
                      </Switch>
                    </Route>
                    {/* Routes Market Data Part */}
                    <Route path="/exchange" component={Exchange} />
                    <Route path="/SDex" component={SDex} />
                    <Route component={PageNotFound} />
                  </Switch>
                </div>
              </div>
              <Footer />
            </div>

          </Router>
        </div>
    );
  }
}


// export default connect(
//   (state) => ({ lang: state.lang }),
//   (dispatch) => ({
//     saveUserData: code => dispatch(userLogin(code)),
//   })
// )(App);
export default Store.withStore(App)
