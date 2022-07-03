const { faker } = require("@faker-js/faker");

"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        const randomPostsList = (nPosts, nUsers) => {
            const postsList = []
            // userId: DataTypes.INTEGER,
            // image: DataTypes.STRING,
            // title: DataTypes.TEXT,
            // category: DataTypes.STRING,
            // content: DataTypes.TEXT,
            // likesNumber: DataTypes.INTEGER,
            // createdAt: new Date(),
            // updatedAt: new Date()
            Array.from(new Array(nUsers)).forEach((element, key1) => {
                Array.from(new Array(nPosts)).forEach((element, key2) => {
                    const post = {
                        userId: key1 + 1,
                        image: faker.image.image(1280, 720).replace("http://", "https://"), //
                        title: faker.lorem.lines(1), //
                        category: faker.helpers.arrayElement(["C0", "C1", "C2", "C3", "C4", "C5", "C6"]),
                        content: faker.lorem.paragraphs(40), //
                        likesNumber: 10, //
                        commentsNumber: 6, //
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                    postsList.push(post)
                })
            })
            return postsList
        }
        return await queryInterface.bulkInsert("posts", randomPostsList(10, 10));
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete("People", null, {});
         */
    }
};
