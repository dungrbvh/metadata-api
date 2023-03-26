"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const AnnouncementType = new GraphQLObjectType({
    name: "Announcement",
    fields: {
        _id: { type: GraphQLString },
        body: { type: new GraphQLList(GraphQLString) },
        created_at: { type: GraphQLString },
        tag: { type: GraphQLString },
        updated_at: { type: GraphQLString }
    }
});
module.exports = { AnnouncementType };
