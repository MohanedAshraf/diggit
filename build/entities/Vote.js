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
var Comment_1 = __importDefault(require("./Comment"));
var Vote = /** @class */ (function (_super) {
    __extends(Vote, _super);
    function Vote(vote) {
        var _this = _super.call(this) || this;
        Object.assign(_this, vote);
        return _this;
    }
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Vote.prototype, "value", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.default; }),
        typeorm_1.JoinColumn({ name: 'username', referencedColumnName: 'username' }),
        __metadata("design:type", User_1.default)
    ], Vote.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Vote.prototype, "username", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Post_1.default; }),
        __metadata("design:type", Post_1.default)
    ], Vote.prototype, "post", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Comment_1.default; }),
        __metadata("design:type", Comment_1.default)
    ], Vote.prototype, "comment", void 0);
    Vote = __decorate([
        typeorm_1.Entity('votes'),
        __metadata("design:paramtypes", [Object])
    ], Vote);
    return Vote;
}(Entity_1.default));
exports.default = Vote;
//# sourceMappingURL=Vote.js.map