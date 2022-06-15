"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Profile = void 0;
var gender_entity_1 = require("../../gender/gender.entity");
var category_entity_1 = require("../../category/category.entity");
var hobby_entity_1 = require("../../hobby/hobby.entity");
var typeorm_1 = require("typeorm");
var complaint_entity_1 = require("../../complaint/complaint.entity");
var like_entity_1 = require("./like.entity");
var baseEntity_1 = require("../../baseEntity");
var religion_entity_1 = require("../../religion/religion.entity");
var profile_photos_entity_1 = require("../profile-photos.entity");
var user_entity_1 = require("../../user/user.entity");
var region_entity_1 = require("../../region/region.entity");
var place_entity_1 = require("./place.entity");
var block_entity_1 = require("./block.entity");
var Profile = /** @class */ (function (_super) {
    __extends(Profile, _super);
    function Profile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Profile.prototype, "id");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return user_entity_1.User; }, function (user) { return user; }),
        (0, typeorm_1.JoinColumn)({ name: "user_id" })
    ], Profile.prototype, "user");
    __decorate([
        (0, typeorm_1.Column)({ "default": "" })
    ], Profile.prototype, "description");
    __decorate([
        (0, typeorm_1.Column)({ "default": 0 })
    ], Profile.prototype, "age");
    __decorate([
        (0, typeorm_1.Column)()
    ], Profile.prototype, "firstName");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return profile_photos_entity_1.ProfilePhotos; }, function (photo) { return photo.profileAvatar; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)()
    ], Profile.prototype, "avatar");
    __decorate([
        (0, typeorm_1.Column)()
    ], Profile.prototype, "secondName");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return category_entity_1.Category; }, function (category) { return category; })
    ], Profile.prototype, "category");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return gender_entity_1.Gender; }, function (gender) { return gender; })
    ], Profile.prototype, "gender");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return hobby_entity_1.Hobby; }, function (hobby) { return hobby.users; }),
        (0, typeorm_1.JoinTable)({ name: 'profile_hobbies__hobby_profiles' })
    ], Profile.prototype, "hobbies");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return block_entity_1.Block; }, function (block) { return block.userProfile; })
    ], Profile.prototype, "block");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], Profile.prototype, "middleName");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return complaint_entity_1.Complaint; }, function (complaint) { return complaint.reporter; })
    ], Profile.prototype, "sendReports");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return complaint_entity_1.Complaint; }, function (complaint) { return complaint.culprit; })
    ], Profile.prototype, "complaints");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return like_entity_1.Like; }, function (like) { return like.likedProfile; })
    ], Profile.prototype, "likedUsers");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return like_entity_1.Like; }, function (like) { return like.userProfile; })
    ], Profile.prototype, "myLikes");
    __decorate([
        (0, typeorm_1.Column)({ "default": 0 })
    ], Profile.prototype, "kids");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return religion_entity_1.Religion; }, function (religion) { return religion; })
    ], Profile.prototype, "religion");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return profile_photos_entity_1.ProfilePhotos; }, function (photo) { return photo.profile; })
    ], Profile.prototype, "photos");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return region_entity_1.Region; }, function (region) { return region.profiles; })
    ], Profile.prototype, "region");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return place_entity_1.Place; }, function (place) { return place.profile; })
    ], Profile.prototype, "place");
    __decorate([
        (0, typeorm_1.Column)({ type: "timestamp", nullable: true })
    ], Profile.prototype, "date");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], Profile.prototype, "iin");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return block_entity_1.Block; }, function (block) { return block.workerProfile; })
    ], Profile.prototype, "myBlocks");
    Profile = __decorate([
        (0, typeorm_1.Entity)()
    ], Profile);
    return Profile;
}(baseEntity_1.BaseEntity));
exports.Profile = Profile;
