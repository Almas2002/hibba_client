"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ComplaintModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var complaint_entity_1 = require("./complaint.entity");
var complaint_service_1 = require("./complaint.service");
var complaint_controller_1 = require("./complaint.controller");
var profile_module_1 = require("../profile/profile.module");
var auth_module_1 = require("../auth/auth.module");
var ComplaintModule = /** @class */ (function () {
    function ComplaintModule() {
    }
    ComplaintModule = __decorate([
        (0, common_1.Module)({
            controllers: [complaint_controller_1.ComplaintController],
            providers: [complaint_service_1.ComplaintService],
            imports: [typeorm_1.TypeOrmModule.forFeature([complaint_entity_1.Complaint]), profile_module_1.ProfileModule, auth_module_1.AuthModule]
        })
    ], ComplaintModule);
    return ComplaintModule;
}());
exports.ComplaintModule = ComplaintModule;
