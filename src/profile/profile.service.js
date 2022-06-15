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
exports.ProfileService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var profile_entity_1 = require("./models/profile.entity");
var like_entity_1 = require("./models/like.entity");
var profile_photos_entity_1 = require("./profile-photos.entity");
var region_entity_1 = require("../region/region.entity");
var place_entity_1 = require("./models/place.entity");
var block_entity_1 = require("./models/block.entity");
var ProfileService = /** @class */ (function () {
    function ProfileService(profileRepository, likeRepository, hobbyService, profilePhotosRepository, fileService, categoryService, regionService, religionService, genderService, notificationService, authService, placeRepository, blockRepository) {
        this.profileRepository = profileRepository;
        this.likeRepository = likeRepository;
        this.hobbyService = hobbyService;
        this.profilePhotosRepository = profilePhotosRepository;
        this.fileService = fileService;
        this.categoryService = categoryService;
        this.regionService = regionService;
        this.religionService = religionService;
        this.genderService = genderService;
        this.notificationService = notificationService;
        this.authService = authService;
        this.placeRepository = placeRepository;
        this.blockRepository = blockRepository;
    }
    ProfileService.prototype.createProfile = function (data, file) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var images, candidate, candidateCategory, candidateRegion, candidateReligion, candidateGender, profile, _i, file_1, f, _b, _c, hobby, len, _d, len_1, h, photo, i, e_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 24, , 25]);
                        images = [];
                        return [4 /*yield*/, this.profileRepository.findOne({ id: data.userId })];
                    case 1:
                        candidate = _e.sent();
                        if (candidate) {
                            throw new common_1.HttpException('у вас уже есть профиль', 400);
                        }
                        return [4 /*yield*/, this.categoryService.findOne(data.categoryId)];
                    case 2:
                        candidateCategory = _e.sent();
                        return [4 /*yield*/, this.regionService.findOne(data.regionId)];
                    case 3:
                        candidateRegion = _e.sent();
                        return [4 /*yield*/, this.religionService.findOne(data.religionId)];
                    case 4:
                        candidateReligion = _e.sent();
                        return [4 /*yield*/, this.genderService.findOne(data.genderId)];
                    case 5:
                        candidateGender = _e.sent();
                        if (!candidateCategory || !candidateGender || !candidateRegion || !candidateReligion) {
                            throw new common_1.HttpException('вы не правильно дали парметры,может быть не правильно дан категория,регион,гендер или религия', 400);
                        }
                        return [4 /*yield*/, this.profileRepository.save(__assign(__assign({}, data), { user: { id: data.userId }, region: { id: data.regionId }, gender: { id: data.genderId }, category: { id: data.categoryId }, religion: { id: data.religionId } }))];
                    case 6:
                        profile = _e.sent();
                        return [4 /*yield*/, this.blockRepository.save({ userProfile: profile })];
                    case 7:
                        _e.sent();
                        if (!(file === null || file === void 0 ? void 0 : file.length)) return [3 /*break*/, 11];
                        _i = 0, file_1 = file;
                        _e.label = 8;
                    case 8:
                        if (!(_i < file_1.length)) return [3 /*break*/, 11];
                        f = file_1[_i];
                        _c = (_b = images).push;
                        return [4 /*yield*/, this.fileService.createFile(f)];
                    case 9:
                        _c.apply(_b, [_e.sent()]);
                        _e.label = 10;
                    case 10:
                        _i++;
                        return [3 /*break*/, 8];
                    case 11:
                        hobby = void 0;
                        profile.hobbies = [];
                        if (!((_a = data.hobby) === null || _a === void 0 ? void 0 : _a.length)) return [3 /*break*/, 15];
                        len = data.hobby.split(',');
                        _d = 0, len_1 = len;
                        _e.label = 12;
                    case 12:
                        if (!(_d < len_1.length)) return [3 /*break*/, 15];
                        h = len_1[_d];
                        return [4 /*yield*/, this.hobbyService.getOneHobby(+h)];
                    case 13:
                        hobby = _e.sent();
                        if (hobby) {
                            profile.hobbies.push(hobby);
                        }
                        _e.label = 14;
                    case 14:
                        _d++;
                        return [3 /*break*/, 12];
                    case 15:
                        photo = void 0;
                        if (!(file === null || file === void 0 ? void 0 : file.length)) return [3 /*break*/, 21];
                        i = 0;
                        _e.label = 16;
                    case 16:
                        if (!(i < images.length)) return [3 /*break*/, 21];
                        if (!(i == 0)) return [3 /*break*/, 18];
                        return [4 /*yield*/, this.profilePhotosRepository.save({ image: images[i], profile: profile })];
                    case 17:
                        photo = _e.sent();
                        return [3 /*break*/, 20];
                    case 18: return [4 /*yield*/, this.profilePhotosRepository.save({ image: images[i], profile: profile })];
                    case 19:
                        _e.sent();
                        _e.label = 20;
                    case 20:
                        i++;
                        return [3 /*break*/, 16];
                    case 21: return [4 /*yield*/, this.updateAvatar(data.userId, photo.id)];
                    case 22:
                        _e.sent();
                        return [4 /*yield*/, this.profileRepository.save(profile)];
                    case 23:
                        _e.sent();
                        return [3 /*break*/, 25];
                    case 24:
                        e_1 = _e.sent();
                        console.log(e_1);
                        return [3 /*break*/, 25];
                    case 25: return [2 /*return*/];
                }
            });
        });
    };
    ProfileService.prototype.getUserProfile = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileRepository.findOne({
                            where: { user: { id: userId } },
                            relations: ['hobbies', 'category', 'gender', 'myLikes',
                                'religion', 'photos', 'avatar', 'region', 'user',]
                        })];
                    case 1: 
                    //'myLikes', 'likedUsers','likedUsers.userProfile','userProfile.avatar','likedProfile.avatar'
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileService.prototype.getLikes = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var profile, query, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileRepository.findOne({ where: { user: { id: id } } })];
                    case 1:
                        profile = _a.sent();
                        query = this.profileRepository.createQueryBuilder("profile")
                            .leftJoinAndSelect("profile.likedUsers", 'likedUsers')
                            .leftJoinAndSelect("likedUsers.userProfile", "userProfile")
                            .leftJoinAndSelect("userProfile.avatar", "avatar")
                            .andWhere("profile.id = :id", { id: profile.id });
                        return [4 /*yield*/, query.getOne()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data.likedUsers];
                }
            });
        });
    };
    ProfileService.prototype.getUserByProfileId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileRepository.findOne({ where: { id: id }, relations: ["user"] })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileService.prototype.updateProfile = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var profile, region;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileRepository.findOne({ where: { id: dto.profileId } })];
                    case 1:
                        profile = _a.sent();
                        profile.religion = { id: dto.religionId, value: '', profiles: [] };
                        profile.age = dto.age;
                        profile.firstName = dto.firstName;
                        profile.category = { id: dto.categoryId, gender: null, value: null, profiles: [] };
                        profile.secondName = dto.secondName;
                        profile.description = dto.description;
                        region = new region_entity_1.Region();
                        region.id = dto.regionId;
                        profile.region = region;
                        return [4 /*yield*/, this.profileRepository.save(profile)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileService.prototype.deleteImage = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileRepository.findOne({ where: { userId: dto.userId }, relations: ['photos'] })];
                    case 1:
                        profile = _a.sent();
                        console.log(dto.imageId);
                        return [4 /*yield*/, this.profilePhotosRepository.findOne({
                                where: {
                                    id: dto.imageId,
                                    profile: profile
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.profilePhotosRepository["delete"]({ profile: profile, id: dto.imageId })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileService.prototype.addImagesToProfile = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileRepository.findOne({ where: { userId: dto.userId } })];
                    case 1:
                        profile = _a.sent();
                        return [4 /*yield*/, this.profilePhotosRepository.save({ image: dto.image, profile: profile })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileService.prototype.getProFiles = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var limit, page, offset, profile, query, ids, ids, ids, ids, profiles, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        limit = (data === null || data === void 0 ? void 0 : data.limit) || 10;
                        page = (data === null || data === void 0 ? void 0 : data.page) || 1;
                        offset = page * limit - limit;
                        return [4 /*yield*/, this.getUserProfile(data.userId)];
                    case 1:
                        profile = _a.sent();
                        query = this.profileRepository.createQueryBuilder('profile')
                            .leftJoinAndSelect('profile.hobbies', 'hobbies')
                            .leftJoinAndSelect('profile.gender', 'gender')
                            .leftJoinAndSelect('profile.category', 'category')
                            .leftJoinAndSelect('profile.religion', 'religion')
                            .leftJoinAndSelect('profile.region', 'region')
                            .leftJoinAndSelect('profile.avatar', 'avatar')
                            .leftJoinAndSelect('profile.photos', 'photos')
                            .andWhere("profile.id != :id", { id: profile.id })
                            .leftJoin("profile.block", "block")
                            .andWhere("block.block  = :block", { block: false })
                            .andWhere("profile.genderId != :genderId", { genderId: profile.gender.id });
                        query.limit(limit);
                        query.offset(offset);
                        if (!(data === null || data === void 0 ? void 0 : data.region) && data.hobby && !data.religion) {
                            ids = data.hobby.split(",");
                            query.andWhere('hobbies.id IN (:...hobbies) AND profile.genderId != :genderId', {
                                hobbies: ids,
                                genderId: profile.gender.id
                            });
                        }
                        if ((data === null || data === void 0 ? void 0 : data.region) && data.hobby && !data.religion) {
                            ids = data.hobby.split(",");
                            query.andWhere('hobbies.id IN (:...hobbies) AND profile.genderId != :genderId AND profile.regionId = :regionId', {
                                hobbies: ids,
                                genderId: profile.gender.id,
                                regionId: data.region
                            });
                        }
                        if (!(data === null || data === void 0 ? void 0 : data.region) && data.hobby && data.religion) {
                            ids = data.hobby.split(",");
                            query.andWhere('hobbies.id IN (:...hobbies) AND profile.genderId != :genderId AND profile.religionId = :religionId ', {
                                hobbies: ids,
                                genderId: profile.gender.id,
                                religionId: data.religion
                            });
                        }
                        if (data === null || data === void 0 ? void 0 : data.category) {
                            query.andWhere('category.id = :id ', { id: data.category });
                        }
                        if ((data === null || data === void 0 ? void 0 : data.region) && !data.hobby && !data.religion) {
                            query.andWhere('profile.regionId = :id AND profile.genderId != :genderId', {
                                id: data.region,
                                genderId: profile.gender.id
                            });
                        }
                        if ((data === null || data === void 0 ? void 0 : data.region) && data.hobby && data.religion) {
                            ids = data.hobby.split(",");
                            query.andWhere('hobbies.id IN (:...hobbies) AND profile.regionId = :id AND profile.religionId = :religionId AND profile.genderId != :genderId', {
                                id: data.region,
                                religionId: data.religion,
                                genderId: profile.gender.id,
                                hobbies: ids
                            });
                        }
                        if (!(data === null || data === void 0 ? void 0 : data.region) && !data.hobby && data.religion) {
                            query.andWhere('profile.religionId = :id AND profile.genderId != :genderId', {
                                id: data.religion,
                                genderId: profile.gender.id
                            });
                        }
                        if (!(data === null || data === void 0 ? void 0 : data.ageFrom) && data.ageTo) {
                            query.andWhere('profile.age <= :age AND profile.genderId != :genderId ', {
                                age: data.ageTo,
                                genderId: profile.gender.id
                            });
                        }
                        if ((data === null || data === void 0 ? void 0 : data.ageFrom) && !data.ageTo) {
                            query.andWhere('profile.age >= :age AND profile.genderId != :genderId ', {
                                age: data.ageFrom,
                                genderId: profile.gender.id
                            });
                        }
                        if (data === null || data === void 0 ? void 0 : data.block) {
                            query.andWhere('profile.block = :block', { block: data.block });
                        }
                        if ((data === null || data === void 0 ? void 0 : data.ageFrom) && (data === null || data === void 0 ? void 0 : data.ageTo)) {
                            query.andWhere('profile.age >= :price2 AND profile.age <= :price AND profile.genderId != :genderId', {
                                price: data.ageTo,
                                price2: data.ageFrom,
                                genderId: profile.gender.id
                            });
                        }
                        if (data === null || data === void 0 ? void 0 : data.search) {
                            query.andWhere('profile.firstName ILIKE :firstName OR profile.secondName ILIKE :secondName', {
                                firstName: "%".concat(data.search, "%"),
                                secondName: "%".concat(data.search, "%")
                            });
                            // .andWhere('profile.userId <> :userId', { userId: data.userId })
                            // .andWhere('profile.block = :block', {block: false});
                            //.andWhere('gender.id = any', { ids: ['1', '2'] });
                        }
                        if ((data === null || data === void 0 ? void 0 : data.kids) === false) {
                            query.andWhere('profile.kids = :amount', { amount: 0 });
                        }
                        if (data === null || data === void 0 ? void 0 : data.kids) {
                            query.andWhere('profile.kids <> :amount', { amount: 0 });
                        }
                        return [4 /*yield*/, query.getMany()];
                    case 2:
                        profiles = _a.sent();
                        return [4 /*yield*/, query.getCount()];
                    case 3:
                        count = _a.sent();
                        return [2 /*return*/, { profiles: profiles, count: count }];
                }
            });
        });
    };
    ProfileService.prototype.likeProfile = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var candidateProfile, userProfile, profile, candidate, like;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileRepository.findOne({ where: { id: dto.profileId }, relations: ["user"] })];
                    case 1:
                        candidateProfile = _a.sent();
                        if (!candidateProfile) {
                            throw new common_1.HttpException({ message: 'такого профиля нету' }, common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [4 /*yield*/, this.profileRepository.findOne({ where: { user: { id: dto.userId } } })];
                    case 2:
                        userProfile = _a.sent();
                        if (!userProfile) {
                            throw new common_1.HttpException({ message: 'вы полностью не зарегестрировались' }, common_1.HttpStatus.BAD_REQUEST);
                        }
                        if ((userProfile === null || userProfile === void 0 ? void 0 : userProfile.id) == candidateProfile.id) {
                            throw new common_1.HttpException({ message: 'вы не можете лайкнуть себя' }, common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [4 /*yield*/, this.likeRepository.findOne({
                                where: {
                                    likedProfile: { id: dto.profileId },
                                    userProfile: { id: userProfile.id }
                                }
                            })];
                    case 3:
                        profile = _a.sent();
                        return [4 /*yield*/, this.likeRepository.findOne({
                                where: {
                                    likedProfile: { id: userProfile.id },
                                    userProfile: { id: dto.profileId }
                                }
                            })];
                    case 4:
                        candidate = _a.sent();
                        if (!profile) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.likeRepository["delete"]({ id: profile.id })];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                    case 6:
                        if (!candidate) return [3 /*break*/, 9];
                        candidate.mutually = true;
                        return [4 /*yield*/, this.likeRepository.save(candidate)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.likeRepository.save({
                                userProfile: { id: userProfile.id },
                                likedProfile: { id: dto.profileId },
                                mutually: true
                            })];
                    case 8: return [2 /*return*/, _a.sent()];
                    case 9: return [4 /*yield*/, this.likeRepository.save({ userProfile: userProfile, likedProfile: { id: candidateProfile === null || candidateProfile === void 0 ? void 0 : candidateProfile.id } })];
                    case 10:
                        like = _a.sent();
                        return [4 /*yield*/, this.notificationService.likeNotification("\u0412\u0430\u0441 \u043B\u0430\u0439\u043A\u043D\u0443\u043B\u0438 ".concat(userProfile === null || userProfile === void 0 ? void 0 : userProfile.firstName, "!"), like, candidateProfile.user)];
                    case 11:
                        _a.sent();
                        return [2 /*return*/, like];
                }
            });
        });
    };
    ProfileService.prototype.blockUser = function (id, workerId, text) {
        return __awaiter(this, void 0, void 0, function () {
            var profile, workerProfile, block;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileRepository.findOne({ id: id })];
                    case 1:
                        profile = _a.sent();
                        return [4 /*yield*/, this.profileRepository.findOne({ where: { user: { id: workerId } } })];
                    case 2:
                        workerProfile = _a.sent();
                        return [4 /*yield*/, this.blockRepository.findOne({ where: { userProfile: profile } })];
                    case 3:
                        block = _a.sent();
                        if (block.block) {
                            throw new common_1.HttpException("этот пользольватель уже заблокирован", 400);
                        }
                        block.block = true;
                        block.text = text;
                        block.workerProfile = workerProfile;
                        return [4 /*yield*/, this.blockRepository.save(block)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfileService.prototype.getBlockedUsers = function (pagination) {
        return __awaiter(this, void 0, void 0, function () {
            var limit, page, offset, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        limit = (pagination === null || pagination === void 0 ? void 0 : pagination.limit) || 10;
                        page = (pagination === null || pagination === void 0 ? void 0 : pagination.page) || 1;
                        offset = page * limit - limit;
                        query = this.profileRepository.createQueryBuilder('profile')
                            .leftJoinAndSelect("profile.block", "block")
                            .leftJoinAndSelect("block.workerProfile", "workerProfile")
                            .andWhere('block.block = :block', { block: true });
                        query.limit(limit);
                        query.offset(offset);
                        return [4 /*yield*/, query.getManyAndCount()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileService.prototype.getOneUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileRepository.findOne({
                            where: { id: id },
                            relations: ["block", "block.workerProfile", "region", "category", "hobbies", "gender",
                                "complaints", "sendReports", "complaints.reporter", "sendReports.culprit", "complaints.message", "sendReports.message"]
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileService.prototype.updateAvatar = function (userId, photoId) {
        return __awaiter(this, void 0, void 0, function () {
            var profile, photo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileRepository.findOne({ where: { user: { id: userId } } })];
                    case 1:
                        profile = _a.sent();
                        return [4 /*yield*/, this.profilePhotosRepository.findOne({ where: { id: photoId }, relations: ["profile"] })];
                    case 2:
                        photo = _a.sent();
                        if (!photo) {
                            throw new common_1.HttpException("Не найден фото", 404);
                        }
                        if (profile.id != photo.profile.id) {
                            throw new common_1.HttpException("это не ваше фото", 400);
                        }
                        profile.avatar = photo;
                        return [4 /*yield*/, this.profileRepository.save(profile)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfileService.prototype.getStatisticAge = function (from, to) {
        return __awaiter(this, void 0, void 0, function () {
            var query, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.profileRepository.createQueryBuilder("profile");
                        if (to) {
                            query.select("COUNT(profile.age)", "count")
                                .andWhere("profile.age >= :from AND profile.age < :to", { from: from, to: to });
                        }
                        else {
                            query.select("COUNT(profile.age)", "count")
                                .andWhere("profile.age >= :from", { from: from });
                        }
                        return [4 /*yield*/, query.getRawOne()];
                    case 1:
                        count = (_a.sent()).count;
                        return [2 /*return*/, count];
                }
            });
        });
    };
    ProfileService.prototype.getCountProfiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileRepository.createQueryBuilder("count")
                            .leftJoin("count.user", "user")
                            .leftJoin("user.roles", "roles")
                            .andWhere("roles.value <> :role", { role: "WORKER" })
                            .getCount()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileService.prototype.getStatisticCity = function (city, another) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.profileRepository.createQueryBuilder("profile")
                            .leftJoin("profile.region", "region")
                            .select("count(profile.id)", "count")
                            .addSelect("region.value", "value")
                            .groupBy("region.value");
                        return [4 /*yield*/, query.getRawMany()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileService.prototype.getStatisticsStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.profileRepository.createQueryBuilder("profile")
                            .leftJoin("profile.category", "category")
                            .select("count(profile.id)", "count")
                            .addSelect("category.value", "value")
                            .groupBy("category.value");
                        return [4 /*yield*/, query.getRawMany()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileService.prototype.getStatisticsGender = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.profileRepository.createQueryBuilder("profile")
                            .leftJoin("profile.gender", "gender")
                            .select("count(profile.id)", "count")
                            .addSelect("gender.value", "value")
                            .groupBy("gender.value");
                        return [4 /*yield*/, query.getRawMany()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileService.prototype.getStatisticsHobby = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.profileRepository.createQueryBuilder("profile")
                            .leftJoin("profile.hobbies", "hobby")
                            .select("count(profile.id)", "count")
                            .addSelect("hobby.value", "value")
                            .groupBy("hobby.value");
                        return [4 /*yield*/, query.getRawMany()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileService.prototype.getStatisticsReligion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.profileRepository.createQueryBuilder("profile")
                            .leftJoin("profile.religion", "religion")
                            .select("count(profile.id)", "count")
                            .addSelect("religion.value", "value")
                            .groupBy("religion.value");
                        return [4 /*yield*/, query.getRawMany()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileService.prototype.statisticAge = function () {
        return __awaiter(this, void 0, void 0, function () {
            var count, range1822, range2225, range2530, range3040, range4050, range5065, range65;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCountProfiles()]; //100
                    case 1:
                        count = _a.sent() //100
                        ;
                        return [4 /*yield*/, this.getStatisticAge(18, 22)];
                    case 2:
                        range1822 = (_a.sent()) / +count;
                        return [4 /*yield*/, this.getStatisticAge(22, 25)];
                    case 3:
                        range2225 = (_a.sent()) / +count;
                        return [4 /*yield*/, this.getStatisticAge(25, 30)];
                    case 4:
                        range2530 = (_a.sent()) / +count;
                        return [4 /*yield*/, this.getStatisticAge(30, 40)];
                    case 5:
                        range3040 = (_a.sent()) / +count;
                        return [4 /*yield*/, this.getStatisticAge(40, 50)];
                    case 6:
                        range4050 = (_a.sent()) / +count;
                        return [4 /*yield*/, this.getStatisticAge(50, 65)];
                    case 7:
                        range5065 = (_a.sent()) / +count;
                        return [4 /*yield*/, this.getStatisticAge(65)];
                    case 8:
                        range65 = (_a.sent()) / +count;
                        return [2 /*return*/, { range1822: range1822, range2225: range2225, range2530: range2530, range3040: range3040, range4050: range4050, range5065: range5065, range65: range65 }];
                }
            });
        });
    };
    ProfileService.prototype.statistics = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ages, religions, genders, hobbies, status, cities, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.statisticAge()];
                    case 1:
                        ages = _a.sent();
                        return [4 /*yield*/, this.getStatisticsReligion()];
                    case 2:
                        religions = _a.sent();
                        return [4 /*yield*/, this.getStatisticsGender()];
                    case 3:
                        genders = _a.sent();
                        return [4 /*yield*/, this.getStatisticsHobby()];
                    case 4:
                        hobbies = _a.sent();
                        return [4 /*yield*/, this.getStatisticsStatus()];
                    case 5:
                        status = _a.sent();
                        return [4 /*yield*/, this.getStatisticCity()];
                    case 6:
                        cities = _a.sent();
                        return [4 /*yield*/, this.getCountProfiles()];
                    case 7:
                        count = _a.sent();
                        return [2 /*return*/, { ages: ages, religions: religions, genders: genders, hobbies: hobbies, status: status, cities: cities, count: count }];
                }
            });
        });
    };
    ProfileService.prototype.createWorker = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var date, user, profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = new Date(dto.date);
                        return [4 /*yield*/, this.authService.createWorker({ password: dto.password, phone: dto.phone })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.profileRepository.save(__assign({ user: user, description: "", age: 0, date: date }, dto))];
                    case 2:
                        profile = _a.sent();
                        return [4 /*yield*/, this.blockRepository.save({ userProfile: profile })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.placeRepository.save(__assign({ profile: profile, city: { id: dto.cityId } }, dto))];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfileService.prototype.getWorkers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileRepository.createQueryBuilder("profile")
                            .select('profile.id')
                            .addSelect('profile.firstName')
                            .addSelect('profile.secondName')
                            .addSelect('profile.iin')
                            .leftJoin('profile.user', 'user')
                            .addSelect('user.phone')
                            .leftJoinAndSelect('user.roles', 'roles')
                            .andWhere('roles.value = :WORKER', { WORKER: "WORKER" })
                            .groupBy('profile.id')
                            .addGroupBy('user.id')
                            .addGroupBy('roles.id')];
                    case 1:
                        query = _a.sent();
                        return [4 /*yield*/, query.getMany()
                            //name fisrtname secondname iin role
                        ];
                    case 2: return [2 /*return*/, _a.sent()
                        //name fisrtname secondname iin role
                    ];
                }
            });
        });
    };
    ProfileService.prototype.getOneWorker = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileRepository.findOne({
                            where: { id: id },
                            relations: ["place", "user", "place.city", "block", "block.workerProfile"]
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileService.prototype.getMyBlockProfiles = function (id, param) {
        if (param === void 0) { param = false; }
        return __awaiter(this, void 0, void 0, function () {
            var profile, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!param) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.profileRepository.findOne({ where: { user: { id: id } } })];
                    case 1:
                        profile = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.profileRepository.findOne({ where: { id: id } })];
                    case 3:
                        profile = _a.sent();
                        _a.label = 4;
                    case 4:
                        query = this.profileRepository.createQueryBuilder("profile")
                            .leftJoinAndSelect("profile.block", "block")
                            .leftJoinAndSelect("profile.avatar", "avatar")
                            .leftJoin("block.workerProfile", "workerProfile")
                            .andWhere("workerProfile.id = :id", { id: profile.id })
                            .andWhere("block.block = :block", { block: true });
                        return [4 /*yield*/, query.getMany()];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileService.prototype.blockWorker = function (id, workerId, text) {
        return __awaiter(this, void 0, void 0, function () {
            var profile, block, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.profileRepository.findOne({ id: id })];
                    case 1:
                        profile = _b.sent();
                        return [4 /*yield*/, this.blockRepository.findOne({ where: { userProfile: profile } })];
                    case 2:
                        block = _b.sent();
                        if (block.block) {
                            throw new common_1.HttpException("этот пользователь уже заблокирован!", 400);
                        }
                        _a = block;
                        return [4 /*yield*/, this.profileRepository.findOne({ where: { user: { id: workerId } } })];
                    case 3:
                        _a.workerProfile = _b.sent();
                        block.text = text;
                        block.block = true;
                        return [4 /*yield*/, this.blockRepository.save(block)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfileService.prototype.profileListAdmin = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var limit, page, offset, query, profiles, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        limit = (dto === null || dto === void 0 ? void 0 : dto.limit) || 10;
                        page = (dto === null || dto === void 0 ? void 0 : dto.page) || 1;
                        offset = page * limit - limit;
                        query = this.profileRepository.createQueryBuilder("profile")
                            .leftJoinAndSelect("profile.block", "block")
                            .leftJoinAndSelect("profile.user", "user");
                        if (dto === null || dto === void 0 ? void 0 : dto.firstName) {
                            query.andWhere("profile.firstName ILIKE :firstName", { firstName: "%".concat(dto.firstName, "%") });
                        }
                        if (dto === null || dto === void 0 ? void 0 : dto.secondName) {
                            query.andWhere("profile.secondName ILIKE :secondName", { secondName: "%".concat(dto.secondName, "%") });
                        }
                        if (dto === null || dto === void 0 ? void 0 : dto.phone) {
                            query.andWhere("user.phone ILIKE :phone", { phone: "%".concat(dto.phone, "%") });
                        }
                        query.limit(limit);
                        query.offset(offset);
                        return [4 /*yield*/, query.getMany()];
                    case 1:
                        profiles = _a.sent();
                        return [4 /*yield*/, query.getCount()];
                    case 2:
                        count = _a.sent();
                        return [2 /*return*/, { profiles: profiles, count: count }];
                }
            });
        });
    };
    ProfileService.prototype.updateWorker = function (id, dto) {
        return __awaiter(this, void 0, void 0, function () {
            var profile, place, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.profileRepository.findOne({ user: { id: id } })];
                    case 1:
                        profile = _b.sent();
                        profile.firstName = dto.firstName;
                        profile.secondName = dto.secondName;
                        profile.middleName = dto.middleName;
                        return [4 /*yield*/, this.placeRepository.findOne({ where: { profile: profile } })];
                    case 2:
                        place = _b.sent();
                        place.apartment = dto.apartment;
                        place.floor = dto.floor;
                        place.index = dto.index;
                        place.building = dto.building;
                        if (!dto.cityId) return [3 /*break*/, 4];
                        _a = place;
                        return [4 /*yield*/, this.regionService.findOne(dto.cityId)];
                    case 3:
                        _a.city = _b.sent();
                        _b.label = 4;
                    case 4: return [4 /*yield*/, this.profileRepository.save(profile)];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.placeRepository.save(place)];
                    case 6:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfileService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(profile_entity_1.Profile)),
        __param(1, (0, typeorm_1.InjectRepository)(like_entity_1.Like)),
        __param(3, (0, typeorm_1.InjectRepository)(profile_photos_entity_1.ProfilePhotos)),
        __param(11, (0, typeorm_1.InjectRepository)(place_entity_1.Place)),
        __param(12, (0, typeorm_1.InjectRepository)(block_entity_1.Block))
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;
