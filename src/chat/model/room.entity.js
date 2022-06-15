"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Room = void 0;
var user_entity_1 = require("../../user/user.entity");
var typeorm_1 = require("typeorm");
var joined_room_entity_1 = require("./joined-room.entity");
var message_entity_1 = require("./message.entity");
var notification_entity_1 = require("../../notification/notification.entity");
var Room = /** @class */ (function () {
    function Room() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Room.prototype, "id");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return user_entity_1.User; }, { primary: true }),
        (0, typeorm_1.JoinTable)()
    ], Room.prototype, "users");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], Room.prototype, "combination");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return message_entity_1.Message; }, function (message) { return message.room; })
    ], Room.prototype, "messages");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Room.prototype, "createAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Room.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return joined_room_entity_1.JoinedRoom; }, function (room) { return room.room; })
    ], Room.prototype, "joinedUsers");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return notification_entity_1.Notification; }, function (notification) { return notification.room; })
    ], Room.prototype, "notification");
    Room = __decorate([
        (0, typeorm_1.Entity)()
    ], Room);
    return Room;
}());
exports.Room = Room;
