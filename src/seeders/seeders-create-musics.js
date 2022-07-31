const { faker } = require("@faker-js/faker");

"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        const randomMusicsList = (nUsers) => {
            const musicsList = []
            // userId: DataTypes.INTEGER,
            // music: DataTypes.STRING,
            // createdAt: new Date(),
            // updatedAt: new Date()
            Array.from(new Array(nUsers)).forEach((element, key) => {
                const music = {
                    userId: key + 1,
                    music: faker.helpers.arrayElement([
                        "https://www.youtube.com/watch?v=Qzc_aX8c8g4", 
                        "https://www.youtube.com/watch?v=cPkE0IbDVs4", 
                        "https://www.youtube.com/watch?v=YfDqONbzYPc", 
                        "https://www.youtube.com/watch?v=60ItHLz5WEA", 
                        "https://www.youtube.com/watch?v=YQHsXMglC9A", 
                        "https://www.youtube.com/watch?v=3AtDnEC4zak", 
                        "https://www.youtube.com/watch?v=bo_efYhYU2A", 
                        "https://www.youtube.com/watch?v=RgKAFK5djSk", 
                        "https://www.youtube.com/watch?v=RBumgq5yVrA", 
                        "https://www.youtube.com/watch?v=ShZ978fBl6Y"]),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
                musicsList.push(music)
            })
            return musicsList
        }
        return await queryInterface.bulkInsert("musics", randomMusicsList(10));
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
