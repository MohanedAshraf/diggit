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
var Post_1 = __importDefault(require("./Post"));
var User_1 = __importDefault(require("./User"));
var helpers_1 = require("../util/helpers");
var Vote_1 = __importDefault(require("./Vote"));
var class_transformer_1 = require("class-transformer");
var Comment = /** @class */ (function (_super) {
    __extends(Comment, _super);
    function Comment(comment) {
        var _this = _super.call(this) || this;
        Object.assign(_this, comment);
        return _this;
    }
    Object.defineProperty(Comment.prototype, "voteScore", {
        get: function () {
            var _a;
            return (_a = this.votes) === null || _a === void 0 ? void 0 : _a.reduce(function (prev, curr) { return prev + (curr.value || 0); }, 0);
        },
        enumerable: false,
        configurable: true
    });
    Comment.prototype.setUserVote = function (user) {
        var _a;
        var index = (_a = this.votes) === null || _a === void 0 ? void 0 : _a.findIndex(function (v) { return v.username === user.username; });
        this.userVote = index > -1 ? this.votes[index].value : 0;
    };
    Comment.prototype.makeIdAndSlug = function () {
        this.identifier = helpers_1.makeId(8);
    };
    __decorate([
        typeorm_1.Index(),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Comment.prototype, "identifier", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Comment.prototype, "body", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Comment.prototype, "username", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.default; }),
        typeorm_1.JoinColumn({ name: 'username', referencedColumnName: 'username' }),
        __metadata("design:type", User_1.default)
    ], Comment.prototype, "user", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Post_1.default; }, function (post) { return post.comments; }, { nullable: false }),
        __metadata("design:type", Post_1.default)
    ], Comment.prototype, "post", void 0);
    __decorate([
        class_transformer_1.Exclude(),
        typeorm_1.OneToMany(function () { return Vote_1.default; }, function (vote) { return vote.comment; }),
        __metadata("design:type", Array)
    ], Comment.prototype, "votes", void 0);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [])
    ], Comment.prototype, "voteScore", null);
    __decorate([
        typeorm_1.BeforeInsert(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Comment.prototype, "makeIdAndSlug", null);
    Comment = __decorate([
        typeorm_1.Entity('comments'),
        __metadata("design:paramtypes", [Object])
    ], Comment);
    return Comment;
}(Entity_1.default));
exports.default = Comment;
//# sourceMappingURL=Comment.js.map