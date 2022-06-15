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
exports.Complaint = exports.ComplainStatus = void 0;
var typeorm_1 = require("typeorm");
var profile_entity_1 = require("../profile/models/profile.entity");
var baseEntity_1 = require("../baseEntity");
var message_entity_1 = require("../chat/model/message.entity");
var ComplainStatus;
(function (ComplainStatus) {
    ComplainStatus["NEW"] = "NEW";
    ComplainStatus["MODERATION"] = "MODERATION";
    ComplainStatus["COMPLETED"] = "COMPLETED";
    ComplainStatus["REJECTED"] = "REJECTED";
})(ComplainStatus = exports.ComplainStatus || (exports.ComplainStatus = {}));
var Complaint = /** @class */ (function (_super) {
    __extends(Complaint, _super);
    function Complaint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Complaint.prototype, "id");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return profile_entity_1.Profile; }, function (profile) { return profile.complaints; })
    ], Complaint.prototype, "culprit");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return profile_entity_1.Profile; }, function (profile) { return profile.sendReports; })
    ], Complaint.prototype, "reporter");
    __decorate([
        (0, typeorm_1.Column)()
    ], Complaint.prototype, "text");
    __decorate([
        (0, typeorm_1.Column)({ "enum": ComplainStatus, "default": ComplainStatus.NEW })
    ], Complaint.prototype, "status");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return message_entity_1.Message; }, function (message) { return message.complaint; }),
        (0, typeorm_1.JoinColumn)()
    ], Complaint.prototype, "message");
    Complaint = __decorate([
        (0, typeorm_1.Entity)()
    ], Complaint);
    return Complaint;
}(baseEntity_1.BaseEntity));
exports.Complaint = Complaint;
