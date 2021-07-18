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
var user_1 = __importDefault(require("../middleware/user"));
var User_1 = __importDefault(require("../entities/User"));
var Post_1 = __importDefault(require("../entities/Post"));
var Comment_1 = __importDefault(require("../entities/Comment"));
var getUserSubmissons = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_2, posts, comments, submissions_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, User_1.default.findOneOrFail({
                        where: { username: req.params.username },
                        select: ['username', 'createdAt'],
                    })];
            case 1:
                user_2 = _a.sent();
                return [4 /*yield*/, Post_1.default.find({
                        where: { user: user_2 },
                        relations: ['comments', 'votes', 'sub'],
                    })];
            case 2:
                posts = _a.sent();
                return [4 /*yield*/, Comment_1.default.find({
                        where: { user: user_2 },
                        relations: ['post'],
                    })];
            case 3:
                comments = _a.sent();
                if (res.locals.user) {
                    posts.forEach(function (p) { return p.setUserVote(res.locals.user); });
                    comments.forEach(function (c) { return c.setUserVote(res.locals.user); });
                }
                submissions_1 = [];
                posts.forEach(function (p) { return submissions_1.push(__assign({ type: 'Post' }, p.toJSON())); });
                comments.forEach(function (c) {
                    return submissions_1.push(__assign({ type: 'Comment' }, c.toJSON()));
                });
                submissions_1.sort(function (a, b) {
                    if (b.createdAt > a.createdAt)
                        return 1;
                    if (b.createdAt < a.createdAt)
                        return -1;
                    return 0;
                });
                return [2 /*return*/, res.json({ user: user_2, submissions: submissions_1 })];
            case 4:
                err_1 = _a.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(500).json({ error: 'Something went wrong' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
var router = express_1.Router();
router.get('/:username', user_1.default, getUserSubmissons);
exports.default = router;
//# sourceMappingURL=users.js.map