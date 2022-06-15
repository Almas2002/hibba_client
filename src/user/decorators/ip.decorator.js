"use strict";
exports.__esModule = true;
exports.IpAddress = void 0;
var common_1 = require("@nestjs/common");
var requestIP = require("request-ip");
exports.IpAddress = (0, common_1.createParamDecorator)(function (data, req) {
    if (req.clientIp) {
        return req.clientIp;
    }
    return requestIP.getClientIp(req);
});
