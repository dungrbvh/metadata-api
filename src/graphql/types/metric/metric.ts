export {};
const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

const MetricType = new GraphQLObjectType({
  name: 'Metric',
  fields: {
    _id: { type: GraphQLString },
    key: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    visibility: { type: GraphQLString },
    owner: { type: GraphQLString },
    aggregation: { type: new GraphQLList(GraphQLString) },
    category: { type: GraphQLString },
    druid_key: { type: GraphQLString },
    service_groups: { type: new GraphQLList(GraphQLString) },
    event_type: { type: new GraphQLList(GraphQLString) },
    druid_filter_key: { type: GraphQLString }
  }
});

module.exports = { MetricType };