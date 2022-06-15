"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChatModule = void 0;
var common_1 = require("@nestjs/common");
var joined_room_service_1 = require("./service/joined-room.service");
var message_service_1 = require("./service/message.service");
var room_service_1 = require("./service/room.service");
var typeorm_1 = require("@nestjs/typeorm");
var joined_room_entity_1 = require("./model/joined-room.entity");
var message_entity_1 = require("./model/message.entity");
var room_entity_1 = require("./model/room.entity");
var chat_controller_1 = require("./controller/chat.controller");
var profile_entity_1 = require("../profile/models/profile.entity");
var semi_profile_service_1 = require("./service/semi-profile.service");
var notification_module_1 = require("../notification/notification.module");
var ChatModule = /** @class */ (function () {
    function ChatModule() {
    }
    ChatModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([joined_room_entity_1.JoinedRoom, message_entity_1.Message, room_entity_1.Room, profile_entity_1.Profile]), (0, common_1.forwardRef)(function () { return notification_module_1.NotificationModule; })],
            providers: [joined_room_service_1.JoinedRoomService, message_service_1.MessageService, room_service_1.RoomService, semi_profile_service_1.SemiProfileService],
            exports: [joined_room_service_1.JoinedRoomService, message_service_1.MessageService, room_service_1.RoomService],
            controllers: [chat_controller_1.ChatController]
        })
    ], ChatModule);
    return ChatModule;
}());
exports.ChatModule = ChatModule;
