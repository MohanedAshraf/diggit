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
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var cookie_1 = __importDefault(require("cookie"));
var User_1 = __importDefault(require("../entities/User"));
var auth_1 = __importDefault(require("../middleware/auth"));
var user_1 = __importDefault(require("../middleware/user"));
var mapErrors = function (errors) {
    return errors.reduce(function (prev, err) {
        prev[err.property] = Object.entries(err.constraints)[0][1];
        return prev;
    }, {});
};
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, username, password, errors, emailUser, usernameUser, user_2, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                errors = {};
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 2:
                emailUser = _b.sent();
                return [4 /*yield*/, User_1.default.findOne({ username: username })];
            case 3:
                usernameUser = _b.sent();
                if (emailUser)
                    errors.email = 'Email already taken';
                if (usernameUser)
                    errors.username = 'Username already taken';
                if (Object.keys(errors).length > 0)
                    return [2 /*return*/, res.status(400).json(errors)];
                user_2 = new User_1.default({ email: email, username: username, password: password });
                return [4 /*yield*/, class_validator_1.validate(user_2)];
            case 4:
                //db validation
                errors = _b.sent();
                if (errors.length > 0)
                    return [2 /*return*/, res.status(400).json(mapErrors(errors))];
                return [4 /*yield*/, user_2.save()];
            case 5:
                _b.sent();
                return [2 /*return*/, res.json(user_2)];
            case 6:
                err_1 = _b.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(500).json(err_1)];
            case 7: return [2 /*return*/];
        }
    });
}); };
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, errors, user_3, passwordMatches, token, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                errors = {};
                if (class_validator_1.isEmpty(username))
                    errors.username = 'Username must not be empty';
                if (class_validator_1.isEmpty(password))
                    errors.password = 'Password must not be empty';
                if (Object.keys(errors).length > 0)
                    return [2 /*return*/, res.status(400).json(errors)];
                return [4 /*yield*/, User_1.default.findOne({ username: username })];
            case 2:
                user_3 = _b.sent();
                if (!user_3)
                    return [2 /*return*/, res.status(404).json({ username: 'User not found' })];
                return [4 /*yield*/, bcrypt_1.default.compare(password, user_3.password)];
            case 3:
                passwordMatches = _b.sent();
                if (!passwordMatches)
                    return [2 /*return*/, res.status(401).json({ password: 'Password is incorrect' })];
                token = jsonwebtoken_1.default.sign({ username: username }, process.env.JWT_SECRET);
                res.set('Set-Cookie', cookie_1.default.serialize('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV == 'production',
                    sameSite: 'strict',
                    maxAge: 3600,
                    path: '/',
                }));
                return [2 /*return*/, res.json(user_3)];
            case 4:
                err_2 = _b.sent();
                console.log(err_2);
                return [2 /*return*/, res.status(500).json(err_2)];
            case 5: return [2 /*return*/];
        }
    });
}); };
var me = function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, res.json(res.locals.user)];
    });
}); };
var logout = function (_, res) {
    res.set('Set-Cookie', cookie_1.default.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/',
    }));
    return res.status(200).json({ success: true });
};
var router = express_1.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', user_1.default, auth_1.default, me);
router.get('/logout', user_1.default, auth_1.default, logout);
exports.default = router;
//# sourceMappingURL=auth.js.map