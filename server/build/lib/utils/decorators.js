"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRequest = void 0;
const tslib_1 = require("tslib");
const colors_console_1 = require("./colors-console");
const lodash_1 = require("lodash");
// tslint:disable-next-line: only-arrow-functions
function logRequest(
// tslint:disable-next-line: no-any
_target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // tslint:disable-next-line: no-invalid-this
            const response = yield originalMethod.apply(this, [req, res, next]);
            if (process.env.NODE_ENV !== 'CI' && process.env.NODE_ENV !== 'test') {
                // tslint:disable-next-line: no-console
                console.log(colors_console_1.bgYellow, colors_console_1.fgBlack, `----------------------------CALLED ${key.toUpperCase()}----------------------------`);
                // tslint:disable-next-line: no-console
                console.log('NODE_ENV:', process.env.NODE_ENV);
                // tslint:disable-next-line: no-console
                console.log('Headers:', req.headers);
                if (req.owner) {
                    // tslint:disable-next-line: no-console
                    console.log('Authentified with token', req.headers.authorization);
                    // tslint:disable-next-line: no-console
                    console.log('As user:', lodash_1.pick(req.owner.get({ plain: true }), 'id', 'username', 'email', 'superAdmin'));
                }
                else {
                    // tslint:disable-next-line: no-console
                    console.log('Not authentified');
                }
                if (req.body) {
                    // tslint:disable-next-line: no-console
                    console.log('Body:', req.body);
                }
                if (req.params) {
                    // tslint:disable-next-line: no-console
                    console.log('Params:', req.params);
                }
                if (response) {
                    if (response.statusCode) {
                        // tslint:disable-next-line: no-console
                        console.log('Status Code:', response.statusCode);
                    }
                    if (response._header) {
                        // tslint:disable-next-line: no-console
                        console.log('Headers Res:', response._header);
                    }
                }
                // tslint:disable-next-line: no-console
                console.log(colors_console_1.bgYellow, colors_console_1.fgBlack, `-----------------------------------END---------------------------------`);
            }
        });
    };
    return descriptor;
}
exports.logRequest = logRequest;
//# sourceMappingURL=decorators.js.map