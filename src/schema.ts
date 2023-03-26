export {};

const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const mutations = require('./graphql/mutations');
const queries = require('./graphql/queries');
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...queries
    }
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        ...mutations
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

module.exports = schema;