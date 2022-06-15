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
exports.__esModule = true;
exports.RoomService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var room_entity_1 = require("../model/room.entity");
var notification_gateway_service_1 = require("../../notification/service/notification-gateway.service");
var RoomService = /** @class */ (function () {
    function RoomService(roomRepository, profileService, notification) {
        this.roomRepository = roomRepository;
        this.profileService = profileService;
        this.notification = notification;
    }
    RoomService.prototype.getRoomsForUser = function (userId, option) {
        return __awaiter(this, void 0, void 0, function () {
            var limit, page, offset, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        limit = (option === null || option === void 0 ? void 0 : option.limit) || 10;
                        page = (option === null || option === void 0 ? void 0 : option.page) || 1;
                        offset = page * limit - limit;
                        query = this.roomRepository
                            .createQueryBuilder('room')
                            .leftJoin('room.users', 'users')
                            .where('users.id = :userId', { userId: userId })
                            .leftJoinAndSelect('room.users', 'all_users')
                            .leftJoinAndSelect("all_users.profile", "profile")
                            .leftJoinAndSelect("profile.avatar", 'avatar')
                            .orderBy('room.updatedAt', 'DESC')
                            .limit(limit)
                            .offset(offset);
                        return [4 /*yield*/, query.getMany()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RoomService.prototype.createRoom = function (creator, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var profile, creatorProfile, combination, query, candidate, room, r2, _i, _a, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.profileService.getUserByProfileId(userId)];
                    case 1:
                        profile = _b.sent();
                        if (!profile) {
                            throw new common_1.HttpException("профиль не найден", 404);
                        }
                        return [4 /*yield*/, this.profileService.getUserProfile(creator.id)];
                    case 2:
                        creatorProfile = _b.sent();
                        combination = creator.id + userId;
                        query = this.roomRepository.createQueryBuilder("room")
                            .leftJoinAndSelect("room.users", "users")
                            .leftJoinAndSelect("users.profile", "profile")
                            .leftJoinAndSelect("profile.avatar", "avatar")
                            .where("room.combination = :combination", { combination: combination });
                        return [4 /*yield*/, query.getOne()];
                    case 3:
                        candidate = _b.sent();
                        if (candidate) {
                            return [2 /*return*/, candidate];
                        }
                        return [4 /*yield*/, this.roomRepository.save({ combination: combination })];
                    case 4:
                        room = _b.sent();
                        room.users = [creator, profile.user];
                        return [4 /*yield*/, this.roomRepository.save(room)];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.roomRepository.findOne({ where: { id: room.id }, relations: ["users", "users.profile"] })];
                    case 6:
                        r2 = _b.sent();
                        _i = 0, _a = r2.users;
                        _b.label = 7;
                    case 7:
                        if (!(_i < _a.length)) return [3 /*break*/, 10];
                        user = _a[_i];
                        if (!(creator.id != user.id)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.notification.roomNotification("\u0432\u0430\u043C \u0445\u043E\u0447\u0435\u0442 \u043D\u0430\u043F\u0438\u0441\u0430\u0442\u044C ".concat(creatorProfile === null || creatorProfile === void 0 ? void 0 : creatorProfile.firstName), room, profile.user)];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 7];
                    case 10: return [2 /*return*/, r2];
                }
            });
        });
    };
    RoomService.prototype.getRoom = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.roomRepository.findOne({ id: id }, { relations: ["joinedUsers", "joinedUsers.user", "users"] })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RoomService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
        __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(function () { return notification_gateway_service_1.NotificationGatewayService; })))
    ], RoomService);
    return RoomService;
}());
exports.RoomService = RoomService;
