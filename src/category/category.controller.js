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
exports.CategoryController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var CategoryController = /** @class */ (function () {
    function CategoryController(categoryService) {
        this.categoryService = categoryService;
    }
    CategoryController.prototype.createCategory = function (data) {
        return this.categoryService.createCategory(data);
    };
    CategoryController.prototype.updateCategory = function (data) {
        return this.categoryService.updateCategory(data);
    };
    CategoryController.prototype.removeCategory = function (id) {
        return this.categoryService.deleteCategory(id);
    };
    CategoryController.prototype.getCategories = function (id) {
        return this.categoryService.getCategories(id);
    };
    CategoryController.prototype.getOneCategory = function (id) {
        return this.categoryService.getOneCategory(id);
    };
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'создать категорию' }),
        (0, swagger_1.ApiResponse)({ status: 201 }),
        (0, common_1.Post)('create-category'),
        __param(0, (0, common_1.Body)())
    ], CategoryController.prototype, "createCategory");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'изменить категорию' }),
        (0, swagger_1.ApiResponse)({ status: 200 }),
        (0, common_1.Put)('update-category'),
        __param(0, (0, common_1.Body)())
    ], CategoryController.prototype, "updateCategory");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'удалить категорию' }),
        (0, swagger_1.ApiResponse)({ status: 201 }),
        (0, common_1.Delete)('remove-category/:id'),
        __param(0, (0, common_1.Param)('id'))
    ], CategoryController.prototype, "removeCategory");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'взять категорий' }),
        (0, swagger_1.ApiQuery)({ example: '1', description: 'взять категорий по гендер айди', required: false }),
        (0, swagger_1.ApiResponse)({ status: 201 }),
        (0, common_1.Get)('get-categories'),
        __param(0, (0, common_1.Query)('id'))
    ], CategoryController.prototype, "getCategories");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'взять одну категорию' }),
        (0, swagger_1.ApiResponse)({ status: 201 }),
        (0, common_1.Get)('get-one-category/:id'),
        __param(0, (0, common_1.Param)('id'))
    ], CategoryController.prototype, "getOneCategory");
    CategoryController = __decorate([
        (0, swagger_1.ApiTags)('category'),
        (0, common_1.Controller)('category')
    ], CategoryController);
    return CategoryController;
}());
exports.CategoryController = CategoryController;
