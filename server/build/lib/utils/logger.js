"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.logger = (about, msg) => {
    const { LOGGER } = process.env;
    if (LOGGER) {
        // tslint:disable-next-line: no-console
        console.log(`[${about}] => ${msg}.`);
    }
};
//# sourceMappingURL=logger.js.map