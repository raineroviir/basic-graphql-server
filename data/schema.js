
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
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
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  User,
  getUser,
  getViewer,
  Card,
  addCard,
  getCard,
  getCards,
  checkCardForValue,
  Game,
  getGame,
  getTurnsRemaining,
  viewerContinues,
  viewerRetreats,
} from './database';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
 var {nodeInterface, nodeField} = nodeDefinitions(
   (globalId) => {
     var {type, id} = fromGlobalId(globalId);
     if (type === 'User') {
       return getUser(id);
     }
     else if (type ==='Game') {
       return getGame(id);
     }
     else if (type ==='Card') {
       return getCard(id);
     }
     return null;
   },
   (obj) => {
     if (obj instanceof User) {
       return GraphQLUser;
     }
     else if (obj instanceof Game) {
       return GraphQLGame;
     }
     else if (obj instanceof Card) {
       return GraphQLCard;
     }
     return null;
   }
 );

/**
 * Define your own types here
 */
var GraphQLGame = new GraphQLObjectType({
  name: 'Game',
  fields: () => ({
    id: globalIdField('Game'),

  })
})
var GraphQLUser = new GraphQLObjectType({
   name: 'User',
   fields: () => ({
     id: globalIdField('User'),
     cards: {
       type: CardsConnection,
       args: connectionArgs,
       resolve: (user, {...args}) => connectionFromArray(getCards(), args),
     },
     continue: {
       type: GraphQLBoolean,
       resolve: (user) => user.continue,
     },
     retreat: {
       type: GraphQLBoolean,
       resolve: (user) => user.retreat,
     },
     totalTreasure: {
       type: GraphQLInt,
       resolve: (user) => user.totalTreasure,
     },
   }),
   interfaces: [nodeInterface],
});
var GraphQLCard = new GraphQLObjectType({
   name: 'Card',
   fields: () => ({
     id: globalIdField('Card'),
     hasBeenChecked: {
       type: GraphQLBoolean,
       resolve: (card) => card.hasBeenChecked,
     },
     value: {
       type: GraphQLString,
       resolve: (card) => card.value,
     },
   }),
   interfaces: [nodeInterface]
});
/**
 * Define your own connection types here
 */
var {
   connectionType: CardsConnection,
   edgeType: GraphQLCardEdge,
 } = connectionDefinitions({
   name: 'Card',
   nodeType: GraphQLCard,
});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var Root = new GraphQLObjectType({
  name: 'Root',
    fields: () => ({
    node: nodeField,
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    }
  }),
});

var GraphQLCheckCardForValueMutation = mutationWithClientMutationId({
  name: 'CheckCardForValue',
  inputFields: {
    id: {
      type: GraphQLID
    },
  },
  outputFields: {
    card: {
      type: GraphQLCard,
      resolve: ({localCardId}) => getCard(localCardId),
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: ({id}) => {
    var localCardId = fromGlobalId(id).id;
    // the db mutation fn, which in this case changes our card hasBeenChecked boolean to true.  Which in the front end allows us to show the card.
    // we return the card this mutation is applied to
    checkCardForValue(localCardId)
    return {localCardId};
  }
});

var GraphQLUserContinueMutation = mutationWithClientMutationId({
  name: 'UserContinueMutation',
  inputFields: {
    id: {
      type: GraphQLID
    },
  },
  outputFields: {
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: ({id}) => {
    var localUserId = fromGlobalId(id).id;
    // our mutation function:
    viewerContinues(localUserId);
    return {localUserId};
  }
});

var GraphQLUserRetreatMutation = mutationWithClientMutationId({
  name: 'UserRetreatMutation',
  inputFields: {
    id: {
      type: GraphQLID
    },
    treasure: {
      type: GraphQLInt,
    },
  },
  outputFields: {
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: ({id, treasure}) => {
    console.log(treasure);
    var localUserId = fromGlobalId(id).id;
    // the mutation fn:
    viewerRetreats(id, treasure);
    return {localUserId};
  }
})
/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */

var Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    checkCardForValue: GraphQLCheckCardForValueMutation,
    userContinueMutation: GraphQLUserContinueMutation,
    userRetreatMutation: GraphQLUserRetreatMutation,
  }
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
 export var Schema = new GraphQLSchema({
   query: Root,
   mutation: Mutation,
 });
