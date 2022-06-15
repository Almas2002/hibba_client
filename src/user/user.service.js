"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var user_entity_1 = require("./user.entity");
var user_visit_entity_1 = require("./user-visit.entity");
var UserService = /** @class */ (function () {
    function UserService(userRepository, roleService, userVisitRepository) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.userVisitRepository = userVisitRepository;
    }
    UserService.prototype.createUser = function (dto, rol) {
        if (rol === void 0) { rol = "ADMIN"; }
        return __awaiter(this, void 0, void 0, function () {
            var role, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.roleService.getRoleByValue(rol)];
                    case 1:
                        role = _a.sent();
                        if (!!role) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.roleService.create({ description: "".concat(rol, " \u0441\u0430\u0439\u0442\u0430"), value: rol })];
                    case 2:
                        role = _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.userRepository.save(dto)];
                    case 4:
                        user = _a.sent();
                        user.roles = [role];
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 5:
                        _a.sent();
                        delete user.password;
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.getUserByPhoneNumber = function (phone) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userRepository.findOne({ phone: phone }, { select: ['password', 'id', 'phone'] })];
            });
        });
    };
    UserService.prototype.addRoleForUser = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, role, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.workWithRole(dto)];
                    case 1:
                        _a = _b.sent(), role = _a.role, user = _a.user;
                        user.roles = __spreadArray(__spreadArray([], user.roles, true), [role], false);
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 2:
                        _b.sent();
                        delete user.password;
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.visit = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var visit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userVisitRepository.findOne({ where: { user: { id: id }, date: new Date() } })];
                    case 1:
                        visit = _a.sent();
                        if (!!visit) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userVisitRepository.save({ user: { id: id }, date: new Date() })];
                    case 2:
                        visit = _a.sent();
                        _a.label = 3;
                    case 3:
                        visit.amount = visit.amount + 1;
                        return [4 /*yield*/, this.userVisitRepository.save(visit)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.deleteRoleFromUser = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, role, user, roles;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.workWithRole(dto)];
                    case 1:
                        _a = _b.sent(), role = _a.role, user = _a.user;
                        roles = user.roles.filter(function (e) { return e.value !== role.value; });
                        user.roles = __spreadArray([], roles, true);
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 2:
                        _b.sent();
                        delete user.password;
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.workWithRole = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, role;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserByPhoneNumber(dto.phone)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.roleService.getRoleByValue(dto.role)];
                    case 2:
                        role = _a.sent();
                        if (!user || !role) {
                            throw new common_1.HttpException('не найден пользователь или роль', common_1.HttpStatus.BAD_REQUEST);
                        }
                        if (user.roles.some(function (userRole) { return userRole.value == role.value; })) {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, { user: user, role: role }];
                }
            });
        });
    };
    UserService.prototype.findUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({ id: id }, { relations: ["roles", "profile"] })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getAllAdmins = function (role) {
        if (role === void 0) { role = 'ADMIN'; }
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.createQueryBuilder('user')
                            .leftJoinAndSelect('user.roles', 'roles')
                            .andWhere('roles.value = :role', { role: role })];
                    case 1:
                        query = _a.sent();
                        return [4 /*yield*/, query.getMany()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getStatistic = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var query, a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.userVisitRepository.createQueryBuilder("visit")
                            .select("SUM(visit.amount) ", "amount")
                            .andWhere("visit.date >= :dateFrom AND visit.date <= :dateTo", { dateFrom: dto.dateFrom, dateTo: dto.dateTo });
                        return [4 /*yield*/, query.getRawOne()];
                    case 1:
                        a = _a.sent();
                        return [2 /*return*/, a.amount];
                }
            });
        });
    };
    UserService.prototype.getRoles = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.userRepository.createQueryBuilder("user")
                            .leftJoinAndSelect("user.roles", "roles")
                            .andWhere("user.id = :id", { id: id });
                        return [4 /*yield*/, query.getOne()];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user.roles];
                }
            });
        });
    };
    UserService.prototype.save = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.save(user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
        __param(2, (0, typeorm_1.InjectRepository)(user_visit_entity_1.UserVisit))
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
