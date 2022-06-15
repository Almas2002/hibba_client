"use strict";
exports.__esModule = true;
exports.UserDecorator = void 0;
var common_1 = require("@nestjs/common");
exports.UserDecorator = (0, common_1.createParamDecorator)(function (data, ctx) {
    var req = ctx.switchToHttp().getRequest();
    if (data) {
        return req.user[data];
    }
    return req.user;
});
