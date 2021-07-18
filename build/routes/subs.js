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
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var Sub_1 = __importDefault(require("../entities/Sub"));
var Post_1 = __importDefault(require("../entities/Post"));
var auth_1 = __importDefault(require("../middleware/auth"));
var user_1 = __importDefault(require("../middleware/user"));
var helpers_1 = require("../util/helpers");
var createSub = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, title, description, user, errors, sub, err_1, sub, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, title = _a.title, description = _a.description;
                user = res.locals.user;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                errors = {};
                if (class_validator_1.isEmpty(name))
                    errors.name = 'Name must not be empty';
                if (class_validator_1.isEmpty(title))
                    errors.title = 'Title must not be empty';
                return [4 /*yield*/, typeorm_1.getRepository(Sub_1.default)
                        .createQueryBuilder('sub')
                        .where('lower(sub.name) = :name', { name: name.toLowerCase() })
                        .getOne()];
            case 2:
                sub = _b.sent();
                if (sub)
                    errors.name = 'Sub exist already';
                if (Object.keys(errors).length > 0) {
                    throw errors;
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(400).json(err_1)];
            case 4:
                _b.trys.push([4, 6, , 7]);
                sub = new Sub_1.default({ name: name, description: description, title: title, user: user });
                return [4 /*yield*/, sub.save()];
            case 5:
                _b.sent();
                return [2 /*return*/, res.json(sub)];
            case 6:
                err_2 = _b.sent();
                console.log(err_2);
                return [2 /*return*/, res.status(500).json({ error: 'Something went wrong' })];
            case 7: return [2 /*return*/];
        }
    });
}); };
var getSub = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, sub, posts, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.params.name;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Sub_1.default.findOneOrFail({ name: name })];
            case 2:
                sub = _a.sent();
                return [4 /*yield*/, Post_1.default.find({
                        where: { sub: sub },
                        order: { createdAt: 'DESC' },
                        relations: ['comments', 'votes'],
                    })];
            case 3:
                posts = _a.sent();
                sub.posts = posts;
                if (res.locals.user) {
                    sub.posts.forEach(function (p) { return p.setUserVote(res.locals.user); });
                }
                return [2 /*return*/, res.json(sub)];
            case 4:
                err_3 = _a.sent();
                console.log(err_3);
                return [2 /*return*/, res.status(404).json({ sub: 'Sub is not found' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
var ownSub = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, sub, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = res.locals.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Sub_1.default.findOneOrFail({ where: { name: req.params.name } })];
            case 2:
                sub = _a.sent();
                if (sub.username !== user.username) {
                    return [2 /*return*/, res.status(403).json({ error: 'You dont own this sub' })];
                }
                res.locals.sub = sub;
                return [2 /*return*/, next()];
            case 3:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: 'Something went wrong' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var upload = multer_1.default({
    storage: multer_1.default.diskStorage({
        destination: 'public/images',
        filename: function (_, file, callback) {
            var name = helpers_1.makeId(15);
            callback(null, name + path_1.default.extname(file.originalname));
        },
    }),
    fileFilter: function (_, file, callback) {
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
            callback(null, true);
        }
        else {
            callback(new Error('File is not an image'));
        }
    },
});
var uploadSubImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sub, type, oldImageUrn, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sub = res.locals.sub;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                type = req.body.type;
                if (type !== 'image' && type !== 'banner') {
                    fs_1.default.unlinkSync(req.file.path);
                    return [2 /*return*/, res.status(400).json({ error: 'Invalid Type' })];
                }
                oldImageUrn = '';
                if (type === 'image') {
                    oldImageUrn = sub.imageUrn || '';
                    sub.imageUrn = req.file.filename;
                }
                else if (type === 'banner') {
                    oldImageUrn = sub.bannerUrn || '';
                    sub.bannerUrn = req.file.filename;
                }
                if (oldImageUrn !== '') {
                    fs_1.default.unlinkSync("public\\images\\" + oldImageUrn);
                }
                return [4 /*yield*/, sub.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json(sub)];
            case 3:
                err_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: 'Something Went wrong' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var searchSubs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, subs, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                name = req.params.name;
                if (class_validator_1.isEmpty(name)) {
                    return [2 /*return*/, res.status(400).json({ error: 'Name must not be empty' })];
                }
                return [4 /*yield*/, typeorm_1.getRepository(Sub_1.default)
                        .createQueryBuilder()
                        .where('LOWER(name) LIKE :name', {
                        name: name.toLocaleLowerCase().trim() + "%",
                    })
                        .getMany()];
            case 1:
                subs = _a.sent();
                return [2 /*return*/, res.json(subs)];
            case 2:
                err_6 = _a.sent();
                console.log(err_6);
                return [2 /*return*/, res.status(500).json({ error: 'Something went wrong' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
var router = express_1.Router();
router.post('/', user_1.default, auth_1.default, createSub);
router.get('/:name', user_1.default, getSub);
router.post('/:name/image', user_1.default, auth_1.default, ownSub, upload.single('file'), uploadSubImage);
router.get('/search/:name', searchSubs);
exports.default = router;
//# sourceMappingURL=subs.js.map