"use strict";
exports.__esModule = true;
exports.Role = exports.ROLE_KEY = void 0;
var common_1 = require("@nestjs/common");
exports.ROLE_KEY = "ROLES";
var Role = function () {
    var role = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        role[_i] = arguments[_i];
    }
    return (0, common_1.SetMetadata)(exports.ROLE_KEY, role);
};
exports.Role = Role;
