import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';

class NewsDetail extends Component {

  render() {
    const news = this.props.news;
    const details = Object.keys(news).map((key, i) => (
      <li key={i}>[{key}] {news[key]}</li>
    ));
    return (
      <div>
        <h1>News detail</h1>
        <ul>
          {details}
        </ul>
      </div>
    );
  }
}

NewsDetail.propTypes = { news: PropTypes.object.isRequired };

export default Relay.createContainer(NewsDetail, {
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
