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
exports.__esModule = true;
exports.RegionController = void 0;
var common_1 = require("@nestjs/common");
var RegionController = /** @class */ (function () {
    function RegionController(regionService) {
        this.regionService = regionService;
    }
    RegionController.prototype.create = function (value) {
        return this.regionService.createRegion({ value: value });
    };
    RegionController.prototype.getAll = function () {
        return this.regionService.getRegions();
    };
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)('value'))
    ], RegionController.prototype, "create");
    __decorate([
        (0, common_1.Get)()
    ], RegionController.prototype, "getAll");
    RegionController = __decorate([
        (0, common_1.Controller)('region')
    ], RegionController);
    return RegionController;
}());
exports.RegionController = RegionController;
