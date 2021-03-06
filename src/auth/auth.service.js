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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var auth_entity_1 = require("./auth.entity");
var bcrypt = require("bcrypt");
var AuthService = /** @class */ (function () {
    function AuthService(authRepository, jwtService, userService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    AuthService.prototype.generationToken = function (user) {
        var payload = { id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, { secret: 'refresh', expiresIn: '30d' })
        };
    };
    AuthService.prototype.login = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.validation(data)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.generationToken(user)];
                    case 2:
                        tokens = _a.sent();
                        return [4 /*yield*/, this.saveToken(user, tokens.refresh_token)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, __assign({}, tokens)];
                }
            });
        });
    };
    AuthService.prototype.registration = function (data, admin, worker) {
        if (admin === void 0) { admin = false; }
        if (worker === void 0) { worker = false; }
        return __awaiter(this, void 0, void 0, function () {
            var hashPassword, candidate, rol, user, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.hash(data.password, 5)];
                    case 1:
                        hashPassword = _a.sent();
                        return [4 /*yield*/, this.userService.getUserByPhoneNumber(data.phone)];
                    case 2:
                        candidate = _a.sent();
                        if (candidate) {
                            throw new common_1.HttpException('?????????? ???????????????????????? ?????? ????????????????????', 400);
                        }
                        rol = admin ? 'SUPER-ADMIN' : 'USER';
                        return [4 /*yield*/, this.userService.createUser(__assign(__assign({}, data), { password: hashPassword }), rol)];
                    case 3:
                        user = _a.sent();
                        return [4 /*yield*/, this.generationToken(user)];
                    case 4:
                        tokens = _a.sent();
                        return [4 /*yield*/, this.authRepository.save({ user: user, refresh_token: tokens.refresh_token })];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, __assign({}, tokens)];
                }
            });
        });
    };
    AuthService.prototype.createWorker = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var hashPassword, candidate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.hash(data.password, 5)];
                    case 1:
                        hashPassword = _a.sent();
                        return [4 /*yield*/, this.userService.getUserByPhoneNumber(data.phone)];
                    case 2:
                        candidate = _a.sent();
                        if (candidate) {
                            throw new common_1.HttpException('?????????? ???????????????????????? ?????? ????????????????????', 400);
                        }
                        return [4 /*yield*/, this.userService.createUser(__assign(__assign({}, data), { password: hashPassword }), 'WORKER')];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService.prototype.saveToken = function (user, refresh_token) {
        return __awaiter(this, void 0, void 0, function () {
            var candidate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authRepository.findOne({ where: { user: user } })];
                    case 1:
                        candidate = _a.sent();
                        if (!candidate) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.authRepository.update({ id: candidate.id }, { refresh_token: refresh_token })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, this.authRepository.save({ refresh_token: refresh_token, user: user })];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService.prototype.validation = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, errors, campfirePassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.getUserByPhoneNumber(dto.phone)];
                    case 1:
                        user = _a.sent();
                        errors = {};
                        if (!user) {
                            errors['phone'] = ['???????????????????????? ?????????????? ??????????'];
                            throw new common_1.HttpException({ errors: errors }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
                        }
                        return [4 /*yield*/, bcrypt.compare(dto.password, user.password)];
                    case 2:
                        campfirePassword = _a.sent();
                        if (!campfirePassword) {
                            errors['password'] = ['???????????????????????? ????????????'];
                            throw new common_1.HttpException({ errors: errors }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthService.prototype.findRefreshToken = function (refresh_token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authRepository.findOne({ where: { refresh_token: refresh_token } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService.prototype.verifyRefreshToken = function (refresh_token) {
        return this.jwtService.verify(refresh_token, { secret: 'refresh' });
    };
    AuthService.prototype.refresh = function (refresh_token, push_token) {
        return __awaiter(this, void 0, void 0, function () {
            var verifyToken, refreshTokenFromDB, user, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!refresh_token) {
                            throw new common_1.UnauthorizedException({ message: '???? ???? ????????????????????????????????' });
                        }
                        verifyToken = this.verifyRefreshToken(refresh_token);
                        return [4 /*yield*/, this.findRefreshToken(refresh_token)];
                    case 1:
                        refreshTokenFromDB = _a.sent();
                        if (!verifyToken || !refreshTokenFromDB) {
                            throw new common_1.UnauthorizedException({ message: '???? ???? ????????????????????????????????' });
                        }
                        return [4 /*yield*/, this.userService.findUserById(verifyToken.id)];
                    case 2:
                        user = _a.sent();
                        if (!push_token) return [3 /*break*/, 4];
                        user.pushToken = push_token;
                        return [4 /*yield*/, this.userService.save(user)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.userService.visit(user.id)];
                    case 5:
                        _a.sent();
                        tokens = this.generationToken(user);
                        return [4 /*yield*/, this.saveToken(user, tokens.refresh_token)];
                    case 6:
                        _a.sent();
                        //res.cookie('refreshToken', tokens.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
                        return [2 /*return*/, __assign({}, tokens)];
                }
            });
        });
    };
    AuthService.prototype.logout = function (refresh_token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authRepository["delete"]({ refresh_token: refresh_token })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(auth_entity_1.Auth))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
