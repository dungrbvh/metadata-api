export {};

const { GraphQLList, GraphQLString, GraphQLNonNull } = require('graphql');
const { AnnouncementType } = require('../types/announcement/announcement');
const { resolvers } = require('../../mongo');

/**
 * @memberof announcements
 * @namespace announcements.announcementMutations
 * @type {Object}
 * @description Mutations available for announcements.
 * @property createAnnouncement {Object} Create a new announcement.
 * @property updateAnnouncement {Object} Update an existing announcement.
 * @property deleteAnnouncement {Object} Delete an existing announcement.
*/

const announcements = {
    createAnnouncement: {
        type: AnnouncementType,
        args: {
            body : { type: new GraphQLNonNull(new GraphQLList(GraphQLString))},
            title: { type: new GraphQLNonNull(GraphQLString) },
            tag: { type: new GraphQLNonNull(GraphQLString) }
        },
        /**
         * @memberof announcements.announcementMutations
         * @method createAnnouncement
         * @description Resolver for creating a new announcement.
         * @param body {Array<string>} Create the new announcement's body.
         * @param tag {string} Create the new announcement's tag.
         * @param title {string} Create the new announcement's title.
         */
        resolve: resolvers.announcements.createAnnouncement
    },
    updateAnnouncement: {
        type: AnnouncementType,
        args: {
            _id : { type: new GraphQLNonNull(GraphQLString) },
            body: { type: new GraphQLList(GraphQLString)},
            tag: { type: GraphQLString},
            title: { type: GraphQLString }
        },
        /**
         * @memberof announcements.announcementMutations
         * @method updateAnnouncement
         * @description Resolver for updating an existing announcement.
         * @param _id {string} Locate an existing announcement by its _id.
         * @param [body] {Array<string>} Update an existing announcement's body.
         * @param [tag] {string} Update an existing announcement's tag.
         * @param [title] {string} Update an existing announcement's title.
         */
        resolve: resolvers.announcements.updateAnnouncement       
    },
    deleteAnnouncement: {
        type: AnnouncementType,
        args: {
            _id: { type: new GraphQLNonNull(GraphQLString)}
        }, 
         /**
         * @memberof announcements.announcementMutations
         * @method deleteAnnouncement
         * @description Resolver for deleting an existing announcement.
         * @param _id {string} Locate an existing announcement by its _id to delete it.
         */
        resolve: resolvers.announcements.deleteAnnouncement
    }
}

module.exports = announcements;