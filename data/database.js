
const sourceNews = [
  {
    id: '1',
    seq: '1',
    title: 'title news #1',
    content: 'The v0 API is essentially a dump of our in-memory data structures.',
    type: 'story',
  },
  {
    id: '2',
    seq: '2',
    title: 'title news #2',
    content: 'The v0 API is essentially a dump of our in-memory data structures.',
    type: 'story',
  },
  {
    id: '3',
    seq: '3',
    title: 'title news #3',
    content: 'The v0 API is essentially a dump of our in-memory data structures.',
    type: 'story',
  },
  {
    id: '4',
    seq: '4',
    title: 'title news #4',
    content: 'The v0 API is essentially a dump of our in-memory data structures.',
    type: 'news',
  },
  {
    id: '5',
    seq: '5',
    title: 'title news #5',
    content: 'The v0 API is essentially a dump of our in-memory data structures.',
    type: 'news',
  },
  {
    id: '6',
    seq: '6',
    title: 'title news #6',
    content: 'The v0 API is essentially a dump of our in-memory data structures.',
    type: 'news',
  },
  {
    id: '7',
    seq: '7',
    title: 'title news #7',
    content: 'The v0 API is essentially a dump of our in-memory data structures.',
    type: 'comment',
  },
  {
    id: '8',
    seq: '8',
    title: 'title news #8',
    content: 'The v0 API is essentially a dump of our in-memory data structures.',
    type: 'comment',
  },
  {
    id: '9',
    seq: '9',
    title: 'title news #9',
    content: 'The v0 API is essentially a dump of our in-memory data structures.',
    type: 'poll',
  },
  {
    id: '10',
    seq: '10',
    title: 'title news #10',
    content: 'The v0 API is essentially a dump of our in-memory data structures.',
    type: 'poll',
  },
];

class User {}
class News {}

const viewer = new User();
viewer.id = '1';
viewer.name = 'Anonymous';

const newsList = sourceNews.map((item) => {
  const news = new News();
  news.id = item.id;
  news.seq = item.seq;
  news.title = item.title;
  news.content = item.content;
  news.type = item.type;

  return news;
});

module.exports = {
  User,
  News,
  getViewer: () => viewer,
  getNewsList: (type = 'all') => {
    if (type !== 'all') {
      return newsList.filter(item => item.type === type);
    }
    return newsList;
  },
  getNewsById: (seq) => newsList.find(item => item.seq === seq),
};
