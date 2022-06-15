"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfilePhotos = void 0;
var profile_entity_1 = require("./models/profile.entity");
var typeorm_1 = require("typeorm");
var ProfilePhotos = /** @class */ (function () {
    function ProfilePhotos() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], ProfilePhotos.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], ProfilePhotos.prototype, "image");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return profile_entity_1.Profile; }, function (profile) { return profile.photos; }, { onDelete: "CASCADE" })
    ], ProfilePhotos.prototype, "profile");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return profile_entity_1.Profile; }, function (profile) { return profile.avatar; }, { onDelete: "CASCADE" })
    ], ProfilePhotos.prototype, "profileAvatar");
    ProfilePhotos = __decorate([
        (0, typeorm_1.Entity)()
    ], ProfilePhotos);
    return ProfilePhotos;
}());
exports.ProfilePhotos = ProfilePhotos;
