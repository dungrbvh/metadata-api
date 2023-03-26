export {};
const { GraphQLObjectType, GraphQLString } = require('graphql')

const ApiUserType = new GraphQLObjectType({
    name: 'ApiUser',
    fields: {
        _id: { type:  GraphQLString },
        role: { type: GraphQLString }, 
        email: { type: GraphQLString }
    }
});

module.exports = { ApiUserType }; 
