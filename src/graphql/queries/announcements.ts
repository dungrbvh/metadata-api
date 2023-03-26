/**
 * @namespace announcements
 * @description Announcements made through Platform UI.
 */

export {};

const { GraphQLString, GraphQLList } = require('graphql');
const { AnnouncementType } = require('../types/announcement/announcement');
const { resolvers } = require('../../mongo');


/**
 * @memberof announcements
 * @namespace announcements.announcementQueries
 * @type {Object}
 * @description Queries available for announcements.
 * @property getAnnouncements {Object} Retrieve one or more announcements.
 */


const announcements = {
    getAnnouncements: {
        type: new GraphQLList(AnnouncementType),
        args: {
            _id: { type: GraphQLString },
            body: { type: new GraphQLList(GraphQLString)},
            title: { type: GraphQLString},
            tag: { type: GraphQLString },
            created_at: { type: GraphQLString },
            updated_at: { type: GraphQLString }
        },
        /**
         * @memberof announcements.announcementQueries
         * @method getAnnouncements
         * @description Resolver for retrieval of announcements.
         * @param [_id] {string} Locate an existing announcement by its _id.
         * @param [body] {Array<string>} Locate an existing announcement by its body.
         * @param [created_at] {string} Locate an existing announcement by its creation date.
         * @param [tag] {string} Locate an existing announcement by its tag.
         * @param [title] {string} Locate an existing announcement by its title.
         * @param [updated_at] {string} Locate an existing announcement by its most recent updated date.
         */
        resolve: resolvers.announcements.getAnnouncements
    }
};

module.exports = announcements;