"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.NotificationGatewayService = void 0;
var common_1 = require("@nestjs/common");
var notification_entity_1 = require("../notification.entity");
var NotificationGatewayService = /** @class */ (function () {
    function NotificationGatewayService(notificationService, notificationGateway, connectedUserService, push) {
        this.notificationService = notificationService;
        this.notificationGateway = notificationGateway;
        this.connectedUserService = connectedUserService;
        this.push = push;
    }
    NotificationGatewayService.prototype.congratulationNotification = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var notification, users, _i, users_1, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.notificationService.createNotificationForEverybody(message)];
                    case 1:
                        notification = _a.sent();
                        return [4 /*yield*/, this.connectedUserService.findAllUser()];
                    case 2:
                        users = _a.sent();
                        for (_i = 0, users_1 = users; _i < users_1.length; _i++) {
                            user = users_1[_i];
                            this.notificationGateway.sendToUser(user.socketId, notification);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    NotificationGatewayService.prototype.congratulationNotificationForOneUser = function (message, userTo, type) {
        if (type === void 0) { type = notification_entity_1.NotificationType.NOTIFICATION; }
        return __awaiter(this, void 0, void 0, function () {
            var notification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.notificationService.createNotificationForOneUser(message, userTo.id, type)];
                    case 1:
                        notification = _a.sent();
                        return [4 /*yield*/, this.defaultNotificationOne(notification, userTo)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NotificationGatewayService.prototype.likeNotification = function (message, like, userTo) {
        return __awaiter(this, void 0, void 0, function () {
            var notification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.notificationService.createLikeNotification(message, userTo.id, like)];
                    case 1:
                        notification = _a.sent();
                        return [4 /*yield*/, this.defaultNotificationOne(notification, userTo)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NotificationGatewayService.prototype.messageNotification = function (message, message1, userTo) {
        return __awaiter(this, void 0, void 0, function () {
            var notification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.notificationService.createMessageNotification(message, message1, userTo.id)];
                    case 1:
                        notification = _a.sent();
                        return [4 /*yield*/, this.defaultNotificationOne(notification, userTo)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NotificationGatewayService.prototype.roomNotification = function (message, room, userTo) {
        return __awaiter(this, void 0, void 0, function () {
            var notification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.notificationService.createRoomNotification(message, room, userTo.id)];
                    case 1:
                        notification = _a.sent();
                        return [4 /*yield*/, this.defaultNotificationOne(notification, userTo)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NotificationGatewayService.prototype.defaultNotificationOne = function (notification, userTo) {
        return __awaiter(this, void 0, void 0, function () {
            var users, candidate, _i, users_2, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connectedUserService.findAllUser()];
                    case 1:
                        users = _a.sent();
                        candidate = users.filter(function (u) { return u.user.id === userTo.id; });
                        if (!!candidate.length) return [3 /*break*/, 4];
                        if (!userTo.pushToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.push.sendNotification(userTo.pushToken, notification)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        for (_i = 0, users_2 = users; _i < users_2.length; _i++) {
                            user = users_2[_i];
                            if (user.user.id == userTo.id) {
                                this.notificationGateway.sendToUser(user.socketId, notification);
                            }
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    NotificationGatewayService = __decorate([
        (0, common_1.Injectable)()
    ], NotificationGatewayService);
    return NotificationGatewayService;
}());
exports.NotificationGatewayService = NotificationGatewayService;
