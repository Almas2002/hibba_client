"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SocketModule = void 0;
var common_1 = require("@nestjs/common");
var socket_service_1 = require("./socket.service");
var typeorm_1 = require("@nestjs/typeorm");
var connection_user_entity_1 = require("./connection-user.entity");
var SocketModule = /** @class */ (function () {
    function SocketModule() {
    }
    SocketModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([connection_user_entity_1.ConnectionUser])],
            providers: [socket_service_1.ConnectedUserService],
            exports: [socket_service_1.ConnectedUserService]
        })
    ], SocketModule);
    return SocketModule;
}());
exports.SocketModule = SocketModule;
