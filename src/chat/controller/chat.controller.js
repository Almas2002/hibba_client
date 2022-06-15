"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ChatController = void 0;
var common_1 = require("@nestjs/common");
var auth_guard_1 = require("../../auth/guard/auth.guard");
var user_decorator_1 = require("../../user/decorators/user.decorator");
var swagger_1 = require("@nestjs/swagger");
var ChatController = /** @class */ (function () {
    function ChatController(messageService, roomService, joinedRoomService) {
        this.messageService = messageService;
        this.roomService = roomService;
        this.joinedRoomService = joinedRoomService;
    }
    ChatController.prototype.createMessage = function (dto, id) {
        dto = __assign(__assign({}, dto), { userId: id });
        return this.messageService.createMessage(dto);
    };
    ChatController.prototype.getMessages = function (roomId, query) {
        return this.messageService.getAllMessage(roomId, __assign({}, query), query["new"]);
    };
    ChatController.prototype.getRooms = function (id, pagination) {
        return this.roomService.getRoomsForUser(id, pagination);
    };
    ChatController.prototype.createRoom = function (creator, dto) {
        return this.roomService.createRoom(creator, dto.profileId);
    };
    ChatController.prototype.leaveRoom = function (dto) {
        return this.joinedRoomService.deleteBySocketId(dto.socketId);
    };
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'создать сообщение' }),
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, common_1.Post)('message'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, user_decorator_1.UserDecorator)('id'))
    ], ChatController.prototype, "createMessage");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'взять сообщение одной комнаты' }),
        (0, common_1.Get)('message/:roomId'),
        __param(0, (0, common_1.Param)('roomId')),
        __param(1, (0, common_1.Query)())
    ], ChatController.prototype, "getMessages");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'получить чаты' }),
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, common_1.Get)('room'),
        __param(0, (0, user_decorator_1.UserDecorator)('id')),
        __param(1, (0, common_1.Query)())
    ], ChatController.prototype, "getRooms");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'создать чат' }),
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, common_1.Post)('room'),
        __param(0, (0, user_decorator_1.UserDecorator)()),
        __param(1, (0, common_1.Body)())
    ], ChatController.prototype, "createRoom");
    __decorate([
        (0, common_1.Put)('leave-room'),
        __param(0, (0, common_1.Body)())
    ], ChatController.prototype, "leaveRoom");
    ChatController = __decorate([
        (0, swagger_1.ApiTags)('чат'),
        (0, common_1.Controller)('chat')
    ], ChatController);
    return ChatController;
}());
exports.ChatController = ChatController;
