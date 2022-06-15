"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Message = void 0;
var user_entity_1 = require("../../user/user.entity");
var room_entity_1 = require("./room.entity");
var typeorm_1 = require("typeorm");
var notification_entity_1 = require("../../notification/notification.entity");
var complaint_entity_1 = require("../../complaint/complaint.entity");
var Message = /** @class */ (function () {
    function Message() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Message.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Message.prototype, "text");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user; })
    ], Message.prototype, "user");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return room_entity_1.Room; }, function (room) { return room.messages; })
    ], Message.prototype, "room");
    __decorate([
        (0, typeorm_1.Column)({ "default": false })
    ], Message.prototype, "read");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp" })
    ], Message.prototype, "createAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" })
    ], Message.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return notification_entity_1.Notification; }, function (notification) { return notification.message; })
    ], Message.prototype, "notifications");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return complaint_entity_1.Complaint; }, function (complaint) { return complaint.message; })
    ], Message.prototype, "complaint");
    Message = __decorate([
        (0, typeorm_1.Entity)()
    ], Message);
    return Message;
}());
exports.Message = Message;
