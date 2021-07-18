"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var typeorm_1 = require("typeorm");
var Comment_1 = __importDefault(require("../entities/Comment"));
var Post_1 = __importDefault(require("../entities/Post"));
var Vote_1 = __importDefault(require("../entities/Vote"));
var Sub_1 = __importDefault(require("../entities/Sub"));
var auth_1 = __importDefault(require("../middleware/auth"));
var user_1 = __importDefault(require("../middleware/user"));
var vote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, identifier, slug, commentIdentifier, value, user_2, post, vote_1, comment, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, identifier = _a.identifier, slug = _a.slug, commentIdentifier = _a.commentIdentifier, value = _a.value;
                // Va;idate vote value
                if (![-1, 0, 1].includes(value)) {
                    return [2 /*return*/, res.status(400).json({ value: 'Value must be -1 , 0  or 1' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 16, , 17]);
                user_2 = res.locals.user;
                return [4 /*yield*/, Post_1.default.findOneOrFail({ identifier: identifier, slug: slug })];
            case 2:
                post = _b.sent();
                comment = void 0;
                if (!commentIdentifier) return [3 /*break*/, 5];
                return [4 /*yield*/, Comment_1.default.findOneOrFail({ identifier: commentIdentifier })];
            case 3:
                // IF there is a comment identifier find vote by comment
                comment = _b.sent();
                return [4 /*yield*/, Vote_1.default.findOne({ user: user_2, comment: comment })];
            case 4:
                vote_1 = _b.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, Vote_1.default.findOne({ user: user_2, post: post })];
            case 6:
                // Else find vote by post
                vote_1 = _b.sent();
                _b.label = 7;
            case 7:
                if (!(!vote_1 && value === 0)) return [3 /*break*/, 8];
                // IF no vote and value equal zero return error
                return [2 /*return*/, res.status(404).json({ error: 'Vote not found' })];
            case 8:
                if (!!vote_1) return [3 /*break*/, 10];
                // If no vote create it
                vote_1 = new Vote_1.default({ user: user_2, value: value });
                if (comment)
                    vote_1.comment = comment;
                else
                    vote_1.post = post;
                return [4 /*yield*/, vote_1.save()];
            case 9:
                _b.sent();
                return [3 /*break*/, 14];
            case 10:
                if (!(value === 0)) return [3 /*break*/, 12];
                // IF vote exists and value equal zero , remove vote from DB
                return [4 /*yield*/, vote_1.remove()];
            case 11:
                // IF vote exists and value equal zero , remove vote from DB
                _b.sent();
                return [3 /*break*/, 14];
            case 12:
                if (!(vote_1.value !== value)) return [3 /*break*/, 14];
                // IF vote and value has changed , update vote
                vote_1.value = value;
                return [4 /*yield*/, vote_1.save()];
            case 13:
                _b.sent();
                _b.label = 14;
            case 14: return [4 /*yield*/, Post_1.default.findOneOrFail({ identifier: identifier, slug: slug }, { relations: ['comments', 'comments.votes', 'sub', 'votes'] })];
            case 15:
                post = _b.sent();
                post.setUserVote(user_2);
                post.comments.forEach(function (comment) { return comment.setUserVote(user_2); });
                return [2 /*return*/, res.json(post)];
            case 16:
                err_1 = _b.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(500).json({ error: 'Something went wrong' })];
            case 17: return [2 /*return*/];
        }
    });
}); };
// top subs with the most number of posts
var topSubs = function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imageUrlExp, subs, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                imageUrlExp = "COALESCE('" + process.env.APP_URL + "/images/' || s.\"imageUrn\" , 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y')";
                return [4 /*yield*/, typeorm_1.getConnection()
                        .createQueryBuilder()
                        .select("s.title, s.name, " + imageUrlExp + " as \"imageUrl\", count(p.id) as \"postCount\"")
                        .from(Sub_1.default, 's')
                        .leftJoin(Post_1.default, 'p', "s.name = p.\"subName\"")
                        .groupBy('s.title, s.name, "imageUrl"')
                        .orderBy("\"postCount\"", 'DESC')
                        .limit(5)
                        .execute()];
            case 1:
                subs = _a.sent();
                return [2 /*return*/, res.json(subs)];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: 'Something went wrong' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
var router = express_1.Router();
router.post('/vote', user_1.default, auth_1.default, vote);
router.get('/top-subs', topSubs);
exports.default = router;
//# sourceMappingURL=misc.js.map