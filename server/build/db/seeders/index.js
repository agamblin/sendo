"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedData = void 0;
const tslib_1 = require("tslib");
const _models_1 = require("@models");
const _utils_1 = require("@utils");
const getInstances = (functionToExecute, instances) => {
    const data = [];
    for (let i = 0; i < instances; i++) {
        data.push(functionToExecute());
    }
    return data;
};
const seedUsers = (instances) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const users = getInstances(() => _utils_1.getRandomUserProps(), instances);
    yield _models_1.User.bulkCreate(users);
});
exports.seedData = (instances = 50) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    _utils_1.logger('Seeders', `Trying to seed ${instances} instances...`);
    try {
        yield seedUsers(instances);
        _utils_1.logger('Seeders', `Successfully seeded ${instances} instances.`);
    }
    catch (err) {
        _utils_1.logger('Seeders', `
            Failed to seed ${instances} instances.
            Reason: ${err}
            The seeding may have worked partially. Try putting a lower value to instances
        `);
    }
});
//# sourceMappingURL=index.js.map