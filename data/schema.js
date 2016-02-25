import {
  // GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

import {
  User,
  News,
  getViewer,

  getNewsList,
  getNewsById,
  getFilteredNewsList,
} from './database';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'User') {
      return getViewer;
    } else if (type === 'News') {
      return getNewsById(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return userType;
    } else if (obj instanceof News)  {
      return newsType;
    } else {
      return null;
    }
  }
);

const newsType = new GraphQLObjectType({
  name: 'News',
  fields: {
    id: globalIdField('News'),
    seq: { type: GraphQLString },
    type: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
  interfaces: [nodeInterface],
});

const { connectionType: newsConnection } =
  connectionDefinitions({ name: 'News', nodeType: newsType });

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    feed: {
      type: newsConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getNewsList(), args),
    },
  }),
  interfaces: [nodeInterface],
});

const newsQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: nodeField,
    viewer: {
      type: userType,
      resolve: () => getViewer(),
    },
    news: {
      args: { seq: { type: GraphQLString } },
      type: newsType,
      resolve: (_, args) => getNewsById(args.seq),
    },
    feed: {
      args: { filter: { type: GraphQLString } },
      type: new GraphQLList(newsType),
      resolve: (_, args) => getNewsList(args.filter),
    },
  },
});

export const Schema = new GraphQLSchema({
  query: newsQueryType,
});
