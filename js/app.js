
import React from 'react';
import { render } from 'react-dom';
import Relay from 'react-relay';

import { RelayRouter } from 'react-router-relay';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, hashHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';

import App from './components/App';
import NewsDetail from './components/NewsDetail';


Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql', {
    credentials: 'same-origin',
  })
);

const reducer = combineReducers(Object.assign({}, {
  routing: routeReducer,
}));
// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(hashHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);
// Required for replaying actions from devtools to work
// reduxRouterMiddleware.listenForReplays(store);

render(
  <Provider store={store}>
    <RelayRouter history={hashHistory}>
      <Route
        path="/"
        component={App}
        queries={{ viewer: () => Relay.QL`query {viewer}` }}
      >
        <Route
          path="/news/:newsId"
          component={NewsDetail}
          queries={{ news: () => Relay.QL`query {news(seq: $newsId)}` }}
        />
      </Route>
    </RelayRouter>
  </Provider>,
  document.getElementById('app')
);
