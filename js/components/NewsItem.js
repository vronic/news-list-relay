import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';

class NewsItem extends Component {
  render() {
    const news = this.props.news;
    return (
      <li><a href={`#/news/${news.seq}`}>{news.title}</a> - {news.content} [{news.type}]</li>
    );
  }
}

NewsItem.propTypes = { news: PropTypes.object.isRequired };

export default Relay.createContainer(NewsItem, {
  fragments: {
    news: () => Relay.QL`
      fragment on News {
        id
        seq
        title
        content
        type
      }
    `,
  },
});
