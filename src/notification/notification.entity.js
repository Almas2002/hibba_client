"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Notification = exports.NotificationType = void 0;
var user_entity_1 = require("../user/user.entity");
var typeorm_1 = require("typeorm");
var like_entity_1 = require("../profile/models/like.entity");
var message_entity_1 = require("../chat/model/message.entity");
var room_entity_1 = require("../chat/model/room.entity");
var NotificationType;
(function (NotificationType) {
    NotificationType["LIKE"] = "LIKE";
    NotificationType["NOTIFICATION"] = "NOTIFICATION";
    NotificationType["MESSAGE"] = "MESSAGE";
    NotificationType["ROOM"] = "ROOM";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
var Notification = /** @class */ (function () {
    function Notification() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Notification.prototype, "id");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user; }, { cascade: true })
    ], Notification.prototype, "user");
    __decorate([
        (0, typeorm_1.Column)()
    ], Notification.prototype, "text");
    __decorate([
        (0, typeorm_1.Column)({ "enum": NotificationType, "default": NotificationType.NOTIFICATION })
    ], Notification.prototype, "type");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return like_entity_1.Like; }, function (like) { return like; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)()
    ], Notification.prototype, "like");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return message_entity_1.Message; }, function (message) { return message.notifications; }, { nullable: true, cascade: true }),
        (0, typeorm_1.JoinColumn)()
    ], Notification.prototype, "message");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return room_entity_1.Room; }, function (room) { return room.notification; }),
        (0, typeorm_1.JoinColumn)()
    ], Notification.prototype, "room");
    Notification = __decorate([
        (0, typeorm_1.Entity)()
    ], Notification);
    return Notification;
}());
exports.Notification = Notification;
