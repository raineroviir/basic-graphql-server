import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GrpahQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  Test,
  getTest,
  getTestOne,
} from './database';


// node interface..
var { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    var { type, id } = fromGlobalId(globalId);
    if (type === 'Test') {
      return getTest(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Test) {
      return testType;
    } else {
      return null;
    }
  }
);

// self defined types

var testType = new GraphQLObjectType({
  name: 'Test',
  description: 'blah di bla bla',
  fields: () => ({
    id: globalIdField('Test'),
    testOne: {
      type: GraphQLInt,
      description: 'you\'ve found testOne, congrats',
      resolve: () => getTestOne(),
    },
  }),
  interfaces: [nodeInterface],
});

// self defined connection types

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    test: {
      type: testType,
      resolve: () => getTest()
    },
  }),
});

// mutation types


// construct schema and export it

export var Schema = new GraphQLSchema({
  query: queryType
});
