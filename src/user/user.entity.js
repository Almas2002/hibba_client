"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
var role_entity_1 = require("../role/role.entity");
var profile_entity_1 = require("../profile/models/profile.entity");
var connection_user_entity_1 = require("../socket/connection-user.entity");
var room_entity_1 = require("../chat/model/room.entity");
var joined_room_entity_1 = require("../chat/model/joined-room.entity");
var user_visit_entity_1 = require("./user-visit.entity");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], User.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ unique: true })
    ], User.prototype, "phone");
    __decorate([
        (0, typeorm_1.Column)({ select: false })
    ], User.prototype, "password");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return profile_entity_1.Profile; }, function (profile) { return profile.user; })
    ], User.prototype, "profile");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return role_entity_1.Role; }, function (user) { return user.users; }),
        (0, typeorm_1.JoinTable)({ name: 'user_roles__roles_user' })
    ], User.prototype, "roles");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return connection_user_entity_1.ConnectionUser; }, function (user) { return user.user; })
    ], User.prototype, "connection");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return room_entity_1.Room; }, function (room) { return room.users; })
    ], User.prototype, "rooms");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return joined_room_entity_1.JoinedRoom; }, function (room) { return room.user; })
    ], User.prototype, "joinedRooms");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return user_visit_entity_1.UserVisit; }, function (v) { return v.user; })
    ], User.prototype, "visit");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], User.prototype, "pushToken");
    User = __decorate([
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}());
exports.User = User;
