"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomUserProps = void 0;
const faker_1 = require("faker");
exports.getRandomUserProps = () => {
    const firstName = faker_1.name.firstName();
    const lastName = faker_1.name.lastName();
    return {
        firstName,
        lastName,
        email: faker_1.internet.email(firstName, lastName),
        avatarUrl: faker_1.internet.avatar(),
        password: faker_1.internet.password(),
    };
};
//# sourceMappingURL=modelPropsGenerator.js.map