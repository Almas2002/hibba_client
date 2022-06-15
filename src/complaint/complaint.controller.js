"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ComplaintController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var auth_guard_1 = require("../auth/guard/auth.guard");
var user_decorator_1 = require("../user/decorators/user.decorator");
var role_guard_1 = require("../auth/guard/role.guard");
var role_decorator_1 = require("../user/decorators/role.decorator");
var role_enums_1 = require("../enums/role.enums");
var ComplaintController = /** @class */ (function () {
    function ComplaintController(complaintService) {
        this.complaintService = complaintService;
    }
    ComplaintController.prototype.reportToProfile = function (dto, userId) {
        dto = __assign(__assign({}, dto), { userId: userId });
        return this.complaintService.createComplaint(dto);
    };
    ComplaintController.prototype.getUserOfReports = function (profileId) {
        return this.complaintService.getComplaint(profileId);
    };
    ComplaintController.prototype.getComplaints = function (pagination) {
        return this.complaintService.getComplaints(pagination);
    };
    ComplaintController.prototype.changeStatus = function (id, status) {
        return this.complaintService.changeStatus(id, status.status);
    };
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: "login пользователя" }),
        (0, swagger_1.ApiResponse)({ status: 201 }),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, common_1.Post)("report-to-profile"),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, user_decorator_1.UserDecorator)('id'))
    ], ComplaintController.prototype, "reportToProfile");
    __decorate([
        (0, common_1.Get)("get-profile-of-reports/:id"),
        __param(0, (0, common_1.Param)('id'))
    ], ComplaintController.prototype, "getUserOfReports");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: "взять жалобы" }),
        (0, swagger_1.ApiQuery)({ example: 10, name: "limit", type: "number" }),
        (0, swagger_1.ApiQuery)({ example: 1, name: "offset", type: "number" }),
        (0, common_1.Get)("/"),
        __param(0, (0, common_1.Query)())
    ], ComplaintController.prototype, "getComplaints");
    __decorate([
        (0, role_decorator_1.Role)(role_enums_1.RoleEnums.WORKER, role_enums_1.RoleEnums.SUPER_ADMIN),
        (0, common_1.UseGuards)(role_guard_1.RoleGuards),
        (0, common_1.Put)('/:id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], ComplaintController.prototype, "changeStatus");
    ComplaintController = __decorate([
        (0, swagger_1.ApiTags)('complaint'),
        (0, common_1.Controller)('complaint')
    ], ComplaintController);
    return ComplaintController;
}());
exports.ComplaintController = ComplaintController;
