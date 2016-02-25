import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';

import NewsItem from './NewsItem';
import Filter from './Filter';

class NewsList extends Component {
  render() {
    const feed = this.props.viewer ? this.props.viewer.feed.edges : null;
    const items = feed ? feed.map(edge => <NewsItem key={edge.cursor} news={edge.node} />) : null;
    return (
      <div>
        <h1>News list</h1>
        <Filter />
        <ul>
          {items}
        </ul>
        {this.props.children}
      </div>
    );
  }
}

NewsList.propTypes = {
  children: PropTypes.node,
  viewer: PropTypes.object,
  relay: PropTypes.object,
};

const NewsListContainer = Relay.createContainer(NewsList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        feed(first: 10) {
          edges {
            cursor
            node {
              ${NewsItem.getFragment('news')}
            },
          },
        },
      }
    `,
  },
});

export default NewsListContainer;
