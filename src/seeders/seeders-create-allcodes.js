
"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        return await queryInterface.bulkInsert("allcodes", [
            { key: "G0", type: "gender", value: "Male", createdAt: new Date(), updatedAt: new Date() },
            { key: "G1", type: "gender", value: "Female", createdAt: new Date(), updatedAt: new Date() },
            { key: "C0", type: "category", value: "Sport", createdAt: new Date(), updatedAt: new Date() },
            { key: "C1", type: "category", value: "Life", createdAt: new Date(), updatedAt: new Date() },
            { key: "C2", type: "category", value: "Style", createdAt: new Date(), updatedAt: new Date() },
            { key: "C3", type: "category", value: "Tech", createdAt: new Date(), updatedAt: new Date() },
            { key: "C4", type: "category", value: "Music", createdAt: new Date(), updatedAt: new Date() },
            { key: "C5", type: "category", value: "Travel", createdAt: new Date(), updatedAt: new Date() },
            { key: "C6", type: "category", value: "Food", createdAt: new Date(), updatedAt: new Date() },
            { key: "R0", type: "role", value: "Admin", createdAt: new Date(), updatedAt: new Date() },
            { key: "R1", type: "role", value: "User", createdAt: new Date(), updatedAt: new Date() },
            { key: "P0", type: "position", value: "Beginner", createdAt: new Date(), updatedAt: new Date() },
            { key: "P1", type: "position", value: "Great", createdAt: new Date(), updatedAt: new Date() },
            { key: "P2", type: "position", value: "Expert", createdAt: new Date(), updatedAt: new Date() },
            { key: "P3", type: "position", value: "Master", createdAt: new Date(), updatedAt: new Date() },
        ]);
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
