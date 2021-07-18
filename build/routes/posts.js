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
var Post_1 = __importDefault(require("../entities/Post"));
var Sub_1 = __importDefault(require("../entities/Sub"));
var Comment_1 = __importDefault(require("../entities/Comment"));
var auth_1 = __importDefault(require("../middleware/auth"));
var user_1 = __importDefault(require("../middleware/user"));
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, body, sub, user, subRecord, post, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, body = _a.body, sub = _a.sub;
                user = res.locals.user;
                if (title.trim() === '')
                    return [2 /*return*/, res.status(400).json({ title: 'Title must not empty' })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Sub_1.default.findOneOrFail({ name: sub })];
            case 2:
                subRecord = _b.sent();
                post = new Post_1.default({ title: title, body: body, user: user, sub: subRecord });
                return [4 /*yield*/, post.save()];
            case 3:
                _b.sent();
                return [2 /*return*/, res.json(post)];
            case 4:
                err_1 = _b.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(500).json({ error: 'Something went wrong' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentPage, postsPerPage, posts, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentPage = (req.query.page || 0);
                postsPerPage = (req.query.count || 8);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post_1.default.find({
                        order: { createdAt: 'DESC' },
                        relations: ['comments', 'votes', 'sub'],
                        skip: currentPage * postsPerPage,
                        take: postsPerPage,
                    })];
            case 2:
                posts = _a.sent();
                if (res.locals.user) {
                    posts.forEach(function (post) { return post.setUserVote(res.locals.user); });
                }
                return [2 /*return*/, res.json(posts)];
            case 3:
                err_2 = _a.sent();
                console.log(err_2);
                return [2 /*return*/, res.json({ error: 'Something went wrong' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, identifier, slug, post, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, identifier = _a.identifier, slug = _a.slug;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post_1.default.findOneOrFail({ identifier: identifier, slug: slug }, { relations: ['comments', 'votes', 'sub'] })];
            case 2:
                post = _b.sent();
                if (res.locals.user) {
                    post.setUserVote(res.locals.user);
                }
                return [2 /*return*/, res.json(post)];
            case 3:
                err_3 = _b.sent();
                console.log(err_3);
                return [2 /*return*/, res.status(404).json({ error: 'Post not found' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var commentOnPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, identifier, slug, body, post, comment, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, identifier = _a.identifier, slug = _a.slug;
                body = req.body.body;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Post_1.default.findOneOrFail({ identifier: identifier, slug: slug })];
            case 2:
                post = _b.sent();
                comment = new Comment_1.default({
                    body: body,
                    user: res.locals.user,
                    post: post,
                });
                return [4 /*yield*/, comment.save()];
            case 3:
                _b.sent();
                return [2 /*return*/, res.json(comment)];
            case 4:
                err_4 = _b.sent();
                console.log(err_4);
                return [2 /*return*/, res.status(404).json({ error: 'Post not found' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getPostComments = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, identifier, slug, post, comments, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, identifier = _a.identifier, slug = _a.slug;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Post_1.default.findOneOrFail({ identifier: identifier, slug: slug })];
            case 2:
                post = _b.sent();
                return [4 /*yield*/, Comment_1.default.find({
                        where: { post: post },
                        order: { createdAt: 'DESC' },
                        relations: ['votes'],
                    })];
            case 3:
                comments = _b.sent();
                if (res.locals.user) {
                    comments.forEach(function (c) { return c.setUserVote(res.locals.user); });
                }
                return [2 /*return*/, res.json(comments)];
            case 4:
                err_5 = _b.sent();
                console.log(err_5);
                return [2 /*return*/, res.status(500).json({ error: 'Something went wrong' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
var router = express_1.Router();
router.post('/', user_1.default, auth_1.default, createPost);
router.get('/', user_1.default, getPosts);
router.get('/:identifier/:slug', user_1.default, getPost);
router.post('/:identifier/:slug/comments', user_1.default, auth_1.default, commentOnPost);
router.get('/:identifier/:slug/comments', user_1.default, getPostComments);
exports.default = router;
//# sourceMappingURL=posts.js.map