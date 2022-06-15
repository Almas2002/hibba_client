"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotificationModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var notification_entity_1 = require("./notification.entity");
var notification_service_1 = require("./service/notification.service");
var chat_gateway_1 = require("./chat.gateway");
var notification_gateway_service_1 = require("./service/notification-gateway.service");
var notification_controller_1 = require("./notification.controller");
var socket_module_1 = require("../socket/socket.module");
var chat_module_1 = require("../chat/chat.module");
var pushNotification_module_1 = require("../pushNotification/pushNotification.module");
var NotificationModule = /** @class */ (function () {
    function NotificationModule() {
    }
    NotificationModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([notification_entity_1.Notification]), socket_module_1.SocketModule, (0, common_1.forwardRef)(function () { return chat_module_1.ChatModule; }), pushNotification_module_1.PushNotificationModule],
            controllers: [notification_controller_1.NotificationController],
            providers: [notification_service_1.NotificationService, notification_gateway_service_1.NotificationGatewayService, chat_gateway_1.ChatGateway],
            exports: [notification_gateway_service_1.NotificationGatewayService]
        })
    ], NotificationModule);
    return NotificationModule;
}());
exports.NotificationModule = NotificationModule;
