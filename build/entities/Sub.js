"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Entity_1 = __importDefault(require("./Entity"));
var User_1 = __importDefault(require("./User"));
var Post_1 = __importDefault(require("./Post"));
var class_transformer_1 = require("class-transformer");
var Sub = /** @class */ (function (_super) {
    __extends(Sub, _super);
    function Sub(sub) {
        var _this = _super.call(this) || this;
        Object.assign(_this, sub);
        return _this;
    }
    Object.defineProperty(Sub.prototype, "imageUrl", {
        get: function () {
            return this.imageUrn
                ? process.env.APP_URL + "/images/" + this.imageUrn
                : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sub.prototype, "bannerUrl", {
        get: function () {
            return this.bannerUrn
                ? process.env.APP_URL + "/images/" + this.bannerUrn
                : undefined;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        typeorm_1.Index(),
        typeorm_1.Column({ unique: true }),
        __metadata("design:type", String)
    ], Sub.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Sub.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], Sub.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Sub.prototype, "imageUrn", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Sub.prototype, "bannerUrn", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Sub.prototype, "username", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.default; }),
        typeorm_1.JoinColumn({ name: 'username', referencedColumnName: 'username' }),
        __metadata("design:type", User_1.default)
    ], Sub.prototype, "user", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Post_1.default; }, function (post) { return post.sub; }),
        __metadata("design:type", Array)
    ], Sub.prototype, "posts", void 0);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], Sub.prototype, "imageUrl", null);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Sub.prototype, "bannerUrl", null);
    Sub = __decorate([
        typeorm_1.Entity('subs'),
        __metadata("design:paramtypes", [Object])
    ], Sub);
    return Sub;
}(Entity_1.default));
exports.default = Sub;
//# sourceMappingURL=Sub.js.map