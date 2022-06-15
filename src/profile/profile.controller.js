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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ProfileController = void 0;
var common_1 = require("@nestjs/common");
var auth_guard_1 = require("../auth/guard/auth.guard");
var platform_express_1 = require("@nestjs/platform-express");
var user_decorator_1 = require("../user/decorators/user.decorator");
var api_implicit_file_decorator_1 = require("@nestjs/swagger/dist/decorators/api-implicit-file.decorator");
var swagger_1 = require("@nestjs/swagger");
var role_guard_1 = require("../auth/guard/role.guard");
var role_decorator_1 = require("../user/decorators/role.decorator");
var role_enums_1 = require("../enums/role.enums");
var ProfileController = /** @class */ (function () {
    function ProfileController(profileService, fileService) {
        this.profileService = profileService;
        this.fileService = fileService;
    }
    ProfileController.prototype.addImage = function (userId, file) {
        return __awaiter(this, void 0, void 0, function () {
            var image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fileService.createFile(file)];
                    case 1:
                        image = _a.sent();
                        return [4 /*yield*/, this.profileService.addImagesToProfile({ userId: userId, image: image })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileController.prototype.createProfile = function (profile, id, files) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(id);
                profile = __assign(__assign({}, profile), { userId: id });
                return [2 /*return*/, this.profileService.createProfile(profile, files.file)];
            });
        });
    };
    ProfileController.prototype.getUserProfile = function (id) {
        return this.profileService.getUserProfile(id);
    };
    ProfileController.prototype.getProfiles = function (data, userId) {
        data = __assign(__assign({}, data), { userId: userId });
        return this.profileService.getProFiles(data);
    };
    ProfileController.prototype.getLikes = function (id) {
        return this.profileService.getLikes(id);
    };
    ProfileController.prototype.likeProfile = function (data, userId) {
        data = __assign(__assign({}, data), { userId: userId });
        return this.profileService.likeProfile(data);
    };
    ProfileController.prototype.blockProfile = function (profileId, id, text) {
        return this.profileService.blockUser(profileId, id, text);
    };
    ProfileController.prototype.getBlockedProfiles = function (pagination) {
        return this.profileService.getBlockedUsers(pagination);
    };
    ProfileController.prototype.updateAvatar = function (dto, id) {
        return this.profileService.updateAvatar(id, dto.photoId);
    };
    ProfileController.prototype.removeImage = function (dto, id) {
        dto = __assign(__assign({}, dto), { userId: id });
        return this.profileService.deleteImage(dto);
    };
    ProfileController.prototype.getStatics = function (to, from) {
        return this.profileService.statistics();
    };
    ProfileController.prototype.createWorker = function (dto) {
        return this.profileService.createWorker(dto);
    };
    ProfileController.prototype.getWorkers = function () {
        return this.profileService.getWorkers();
    };
    ProfileController.prototype.getOneWorker = function (id) {
        return this.profileService.getOneWorker(id);
    };
    ProfileController.prototype.blockWorker = function (id, text, workerId) {
        return this.profileService.blockWorker(id, workerId, text);
    };
    ProfileController.prototype.blockProfiles = function (id) {
        return this.profileService.getMyBlockProfiles(id);
    };
    ProfileController.prototype.blockProfilesId = function (id) {
        return this.profileService.getMyBlockProfiles(id, true);
    };
    ProfileController.prototype.listProfile = function (dto) {
        return this.profileService.profileListAdmin(dto);
    };
    ProfileController.prototype.updateWorker = function (id, dto) {
        return this.profileService.updateWorker(id, dto);
    };
    ProfileController.prototype.getOneUser = function (id) {
        return this.profileService.getOneUser(id);
    };
    __decorate([
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, api_implicit_file_decorator_1.ApiImplicitFile)({ name: 'file', description: 'аватар можно добавить 7 фотографий' }),
        (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
        (0, common_1.Post)('add-image'),
        __param(0, (0, user_decorator_1.UserDecorator)('id')),
        __param(1, (0, common_1.UploadedFile)('file'))
    ], ProfileController.prototype, "addImage");
    __decorate([
        (0, api_implicit_file_decorator_1.ApiImplicitFile)({ name: 'file', description: 'аватар можно добавить 7 фотографий' }),
        (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)(([{ name: 'file', maxCount: 7 }]))),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, common_1.Post)('create-profile'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, user_decorator_1.UserDecorator)('id')),
        __param(2, (0, common_1.UploadedFiles)())
    ], ProfileController.prototype, "createProfile");
    __decorate([
        (0, swagger_1.ApiOperation)({ description: 'получить профиль по токену' }),
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, common_1.Get)('me'),
        __param(0, (0, user_decorator_1.UserDecorator)('id'))
    ], ProfileController.prototype, "getUserProfile");
    __decorate([
        (0, swagger_1.ApiOperation)({ description: 'получить профили' }),
        (0, swagger_1.ApiQuery)({ name: 'limit', type: 'int', required: false }),
        (0, swagger_1.ApiQuery)({ name: 'page', type: 'int', required: false }),
        (0, swagger_1.ApiQuery)({ name: 'ageTo', type: 'int', required: false, example: '18' }),
        (0, swagger_1.ApiQuery)({ name: 'ageFrom', type: 'int', required: false }),
        (0, swagger_1.ApiQuery)({ name: 'category', type: 'number', required: false, example: 1 }),
        (0, swagger_1.ApiQuery)({ name: 'hobby', type: 'sting', required: false, example: '1,2,3' }),
        (0, swagger_1.ApiQuery)({ name: 'religion', type: 'number', required: false, example: 1 }),
        (0, swagger_1.ApiQuery)({ name: 'region', type: 'number', required: false, example: 1 }),
        (0, swagger_1.ApiQuery)({ name: 'search', type: 'string', required: false }),
        (0, swagger_1.ApiQuery)({ name: 'kids', type: 'boolean', required: false }),
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, common_1.Get)('get-profiles'),
        __param(0, (0, common_1.Query)()),
        __param(1, (0, user_decorator_1.UserDecorator)('id'))
    ], ProfileController.prototype, "getProfiles");
    __decorate([
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, common_1.Get)('get-likes'),
        __param(0, (0, user_decorator_1.UserDecorator)('id'))
    ], ProfileController.prototype, "getLikes");
    __decorate([
        (0, swagger_1.ApiOperation)({ description: 'получить профилей' }),
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, common_1.Post)('like-profile'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, user_decorator_1.UserDecorator)('id'))
    ], ProfileController.prototype, "likeProfile");
    __decorate([
        (0, swagger_1.ApiOperation)({ description: 'блокировать профиль' }),
        (0, swagger_1.ApiBearerAuth)(),
        (0, role_decorator_1.Role)(role_enums_1.RoleEnums.WORKER, role_enums_1.RoleEnums.SUPER_ADMIN),
        (0, common_1.UseGuards)(role_guard_1.RoleGuards),
        (0, common_1.Put)('block-profile/:id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, user_decorator_1.UserDecorator)('id')),
        __param(2, (0, common_1.Body)('text'))
    ], ProfileController.prototype, "blockProfile");
    __decorate([
        (0, swagger_1.ApiOperation)({ description: 'получить блокированных пользователей' }),
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, common_1.Get)('get-blocked-profiles'),
        __param(0, (0, common_1.Query)())
    ], ProfileController.prototype, "getBlockedProfiles");
    __decorate([
        (0, swagger_1.ApiOperation)({ description: 'изменить аватар' }),
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, common_1.Put)('update-avatar'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, user_decorator_1.UserDecorator)('id'))
    ], ProfileController.prototype, "updateAvatar");
    __decorate([
        (0, swagger_1.ApiOperation)({ description: 'удалить фотку' }),
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, common_1.Delete)('remove-image'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, user_decorator_1.UserDecorator)('id'))
    ], ProfileController.prototype, "removeImage");
    __decorate([
        (0, swagger_1.ApiOperation)({ description: 'Статистика' }),
        (0, role_decorator_1.Role)(role_enums_1.RoleEnums.ADMIN, role_enums_1.RoleEnums.SUPER_ADMIN),
        (0, common_1.UseGuards)(role_guard_1.RoleGuards),
        (0, common_1.Get)("statistic"),
        __param(0, (0, common_1.Body)('to')),
        __param(1, (0, common_1.Body)('city'))
    ], ProfileController.prototype, "getStatics");
    __decorate([
        (0, common_1.Post)('workers'),
        __param(0, (0, common_1.Body)())
    ], ProfileController.prototype, "createWorker");
    __decorate([
        (0, common_1.Get)('workers')
    ], ProfileController.prototype, "getWorkers");
    __decorate([
        (0, common_1.Get)('workers/:id'),
        __param(0, (0, common_1.Param)('id'))
    ], ProfileController.prototype, "getOneWorker");
    __decorate([
        (0, role_decorator_1.Role)(role_enums_1.RoleEnums.SUPER_ADMIN),
        (0, common_1.UseGuards)(role_guard_1.RoleGuards),
        (0, common_1.Put)('block-worker/:id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)('text')),
        __param(2, (0, user_decorator_1.UserDecorator)('id'))
    ], ProfileController.prototype, "blockWorker");
    __decorate([
        (0, role_decorator_1.Role)(role_enums_1.RoleEnums.WORKER, role_enums_1.RoleEnums.SUPER_ADMIN),
        (0, common_1.UseGuards)(role_guard_1.RoleGuards),
        (0, common_1.Get)('my-blockProfiles'),
        __param(0, (0, user_decorator_1.UserDecorator)('id'))
    ], ProfileController.prototype, "blockProfiles");
    __decorate([
        (0, role_decorator_1.Role)(role_enums_1.RoleEnums.WORKER, role_enums_1.RoleEnums.SUPER_ADMIN),
        (0, common_1.UseGuards)(role_guard_1.RoleGuards),
        (0, common_1.Get)('my-blockProfiles/:id'),
        __param(0, (0, common_1.Param)('id'))
    ], ProfileController.prototype, "blockProfilesId");
    __decorate([
        (0, swagger_1.ApiQuery)({ name: 'limit', type: 'int', required: false }),
        (0, swagger_1.ApiQuery)({ name: 'page', type: 'int', required: false }),
        (0, swagger_1.ApiQuery)({ name: 'firstName', type: 'sting', required: false }),
        (0, swagger_1.ApiQuery)({ name: 'secondName', type: 'string', required: false }),
        (0, swagger_1.ApiQuery)({ name: 'phone', type: 'sting', required: false }),
        (0, swagger_1.ApiOperation)({ summary: "лист листов админ" }),
        (0, common_1.Get)('/list'),
        __param(0, (0, common_1.Query)())
    ], ProfileController.prototype, "listProfile");
    __decorate([
        (0, role_decorator_1.Role)(role_enums_1.RoleEnums.WORKER),
        (0, common_1.UseGuards)(role_guard_1.RoleGuards),
        (0, common_1.Put)('worker'),
        __param(0, (0, user_decorator_1.UserDecorator)('id')),
        __param(1, (0, common_1.Body)())
    ], ProfileController.prototype, "updateWorker");
    __decorate([
        (0, common_1.Get)('user/:id'),
        __param(0, (0, common_1.Param)('id'))
    ], ProfileController.prototype, "getOneUser");
    ProfileController = __decorate([
        (0, swagger_1.ApiTags)('profile'),
        (0, common_1.Controller)('profile')
    ], ProfileController);
    return ProfileController;
}());
exports.ProfileController = ProfileController;
