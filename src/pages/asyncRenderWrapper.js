import React from "react";
import Loadable from 'react-loadable';

const LoadingMessage = (name) => (<div> Loading {name} modules, Please wait</div>)


export const Home = Loadable({
  loader: () => import('./Home'),
  loading: () => LoadingMessage('Home')
});

export const SDex = Loadable({
  loader: () => import('./dex'),
  loading: () => LoadingMessage('SDex')
});
