"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } = require('graphql');
const DimensionType = new GraphQLObjectType({
    name: "dimension",
    fields: {
        _id: { type: GraphQLString },
        key: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        data_type: { type: GraphQLString },
        visibility: { type: GraphQLString },
        owner: { type: GraphQLString },
        category: { type: GraphQLString },
        allocations: { type: new GraphQLList(GraphQLString) },
        default_allocation: { type: GraphQLString },
        druid_key: { type: GraphQLString },
        service_groups: { type: new GraphQLList(GraphQLString) },
        isRealtime: { type: GraphQLBoolean }
    }
});
module.exports = { DimensionType };
