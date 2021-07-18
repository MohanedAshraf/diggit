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
var bcrypt_1 = __importDefault(require("bcrypt"));
var User_1 = __importDefault(require("../entities/User"));
var Sub_1 = __importDefault(require("../entities/Sub"));
var Post_1 = __importDefault(require("../entities/Post"));
var Comment_1 = __importDefault(require("../entities/Comment"));
var Vote_1 = __importDefault(require("../entities/Vote"));
function timePlus(duration) {
    if (duration === void 0) { duration = 0; }
    var time = new Date('2020-11-07 07:01:43.18').getTime();
    return new Date(time + duration).toISOString();
}
var CreateData = /** @class */ (function () {
    function CreateData() {
    }
    CreateData.prototype.run = function (_, connection) {
        return __awaiter(this, void 0, void 0, function () {
            var password, minute, hour, day, john, jane, reactJsSub, funnySub, iqSub, oneliners, post6, post7, post8, post9, comment1, comment2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt_1.default.hash('123456', 6)];
                    case 1:
                        password = _a.sent();
                        minute = 1000 * 60;
                        hour = minute * 60;
                        day = hour * 24;
                        // Create users
                        return [4 /*yield*/, connection
                                .createQueryBuilder()
                                .insert()
                                .into(User_1.default)
                                .values([
                                {
                                    username: 'john',
                                    email: 'john@email.com',
                                    password: password,
                                    createdAt: timePlus(),
                                    updatedAt: timePlus(),
                                },
                                {
                                    username: 'jane',
                                    email: 'jane@email.com',
                                    password: password,
                                    createdAt: timePlus(minute * 5),
                                    updatedAt: timePlus(minute * 5),
                                },
                            ])
                                .execute()];
                    case 2:
                        // Create users
                        _a.sent();
                        return [4 /*yield*/, User_1.default.findOne({ username: 'john' })];
                    case 3:
                        john = _a.sent();
                        return [4 /*yield*/, User_1.default.findOne({ username: 'jane' })];
                    case 4:
                        jane = _a.sent();
                        // Create subs
                        return [4 /*yield*/, connection
                                .createQueryBuilder()
                                .insert()
                                .into(Sub_1.default)
                                .values([
                                {
                                    name: 'reactjs',
                                    title: 'React JS Developer Community',
                                    description: 'A group of React JS fanboys',
                                    user: john,
                                    createdAt: timePlus(minute * 20),
                                    updatedAt: timePlus(minute * 20),
                                },
                                {
                                    name: 'funny',
                                    title: 'Everything Funny',
                                    description: 'If you cant joke your life is a joke',
                                    user: jane,
                                    createdAt: timePlus(minute * 25),
                                    updatedAt: timePlus(minute * 25),
                                },
                                {
                                    name: 'InsightfulQuestions',
                                    title: 'Insightful Questions',
                                    description: "Questions that make you go 'Ohhh'",
                                    user: john,
                                    createdAt: timePlus(minute * 30),
                                    updatedAt: timePlus(minute * 30),
                                },
                                {
                                    name: 'oneliners',
                                    title: 'Oneliners',
                                    description: 'A variety of funny, one line jokes in a well-moderated, friendly community!',
                                    user: john,
                                    createdAt: timePlus(hour),
                                    updatedAt: timePlus(hour),
                                },
                                {
                                    name: 'readyplayerone',
                                    title: 'Ready Player One',
                                    description: 'Your nexus for all things Ready Player One',
                                    user: jane,
                                    createdAt: timePlus(hour),
                                    updatedAt: timePlus(hour),
                                },
                                {
                                    name: 'reallyannoyingsounds',
                                    title: 'Ahhhhhhhhhhhhhhhhh',
                                    description: 'Ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
                                    user: jane,
                                    createdAt: timePlus(hour),
                                    updatedAt: timePlus(hour),
                                },
                            ])
                                .execute()];
                    case 5:
                        // Create subs
                        _a.sent();
                        return [4 /*yield*/, Sub_1.default.findOne({ where: { name: 'reactjs' } })];
                    case 6:
                        reactJsSub = _a.sent();
                        return [4 /*yield*/, Sub_1.default.findOne({ where: { name: 'funny' } })];
                    case 7:
                        funnySub = _a.sent();
                        return [4 /*yield*/, Sub_1.default.findOne({ where: { name: 'InsightfulQuestions' } })];
                    case 8:
                        iqSub = _a.sent();
                        return [4 /*yield*/, Sub_1.default.findOne({ where: { name: 'oneliners' } })];
                    case 9:
                        oneliners = _a.sent();
                        // Create posts
                        return [4 /*yield*/, connection
                                .createQueryBuilder()
                                .insert()
                                .into(Post_1.default)
                                .values([
                                {
                                    // id: 1
                                    identifier: 'rggenVY',
                                    title: 'React 17 is out!!',
                                    slug: 'react_17_is_out',
                                    body: 'But it has no new features...',
                                    user: john,
                                    sub: reactJsSub,
                                    createdAt: timePlus(minute * 20),
                                    updatedAt: timePlus(minute * 20),
                                },
                                {
                                    // id: 2
                                    identifier: '00fOyPQ',
                                    title: 'Comparing Redux to Vue composition API',
                                    slug: 'comparing_redux_to_vue_composition_api',
                                    body: 'It feels like Redux is too much boilerplate',
                                    user: jane,
                                    sub: reactJsSub,
                                    createdAt: timePlus(hour),
                                    updatedAt: timePlus(hour),
                                },
                                {
                                    // id: 3
                                    identifier: 'IvzYvbG',
                                    title: "What's your favourite React component library?",
                                    slug: 'whats_your_favourite_react_component_library',
                                    body: '(title) Mine is @material-ui',
                                    user: john,
                                    sub: reactJsSub,
                                    createdAt: timePlus(hour + minute * 30),
                                    updatedAt: timePlus(hour + minute * 30),
                                },
                                {
                                    // id: 4
                                    identifier: 'DnwJSvj',
                                    title: 'What is the difference between healthy venting and shit talking?',
                                    slug: 'what_is_the_difference_between_healthy_venting_and_shit_talking',
                                    body: 'What exactly does “talking behind your back” mean? When does giving an aggressive rant to a friend become disloyalty? Gossip?',
                                    user: jane,
                                    sub: iqSub,
                                    createdAt: timePlus(minute * 40),
                                    updatedAt: timePlus(minute * 40),
                                },
                                {
                                    // id: 5
                                    identifier: 'saUwqdP',
                                    title: "What's the most difficult thing when you try to change your job?",
                                    slug: 'whats_the_most_difficult_thing_when_you_try_to_change_your_job',
                                    body: "This 2020 was a hard year for everyone, on June 2, my first son born. \n            I've too much stuff in my mind at this moment and one of them is finding a new job. My question is, \n            what's the most difficult thing when you try to change your job? I'm still in my comfort zone and I'm scared, \n            any advice to help me to take the step?",
                                    user: john,
                                    sub: iqSub,
                                    createdAt: timePlus(hour + minute * 40),
                                    updatedAt: timePlus(hour + minute * 40),
                                },
                                {
                                    // id: 6
                                    identifier: 'ckVoiPf',
                                    title: 'What was the most important social lesson you learned when you were younger?',
                                    slug: 'what_was_the_most_important_social_lesson_you_learned_when_you_were_younger',
                                    body: "I'm still relatively young, and I'm learning more and more about social situations and how people react to anything at all. I'd love to hear your advice and experiences that helped you.",
                                    user: jane,
                                    sub: iqSub,
                                    createdAt: timePlus(3 * hour),
                                    updatedAt: timePlus(3 * hour),
                                },
                                {
                                    // id: 7
                                    identifier: 'tbkzHxF',
                                    title: 'Why do cows never have any money? Because the farmers milk them dry!',
                                    slug: 'why_do_cows_never_have_any_money_because_the_farmers_milk_them_dry',
                                    user: john,
                                    sub: funnySub,
                                    createdAt: timePlus(9 * day),
                                    updatedAt: timePlus(9 * day),
                                },
                                {
                                    // id: 8
                                    identifier: 'CEPVxjR',
                                    title: "You would think that taking off a snail's shell would make it move faster, but it actually just makes it more sluggish.",
                                    slug: 'you_would_think_that_taking_off_a_snails_shell_would_make_it_move_faster_but_it_actually_just_makes_it_more_sluggish',
                                    user: jane,
                                    sub: funnySub,
                                    createdAt: timePlus(10 * day),
                                    updatedAt: timePlus(10 * day),
                                },
                                {
                                    // id: 9
                                    identifier: 'FyztVqe',
                                    title: 'I ate a clock yesterday, it was very time-consuming.',
                                    slug: 'i_ate_a_clock_yesterday_it_was_very_time_consuming',
                                    user: john,
                                    sub: funnySub,
                                    createdAt: timePlus(10 * day + 2 * hour),
                                    updatedAt: timePlus(10 * day + 2 * hour),
                                },
                                {
                                    // id: 10
                                    identifier: 'kk0GXky',
                                    title: 'What’s the best thing about Switzerland?',
                                    slug: 'whats_the_best_thing_about_switzerland',
                                    body: 'I don’t know, but the flag is a big plus.',
                                    user: john,
                                    sub: funnySub,
                                    createdAt: timePlus(3 * day),
                                    updatedAt: timePlus(3 * day),
                                },
                                {
                                    // id: 11
                                    identifier: 'aWbiMTf',
                                    title: 'I invented a new word: Plagiarism!',
                                    slug: 'i_invented_a_new_word_plagiarism',
                                    user: john,
                                    sub: funnySub,
                                    createdAt: timePlus(4 * day),
                                    updatedAt: timePlus(4 * day),
                                },
                                {
                                    // id: 12
                                    identifier: 'eOMqOFS',
                                    title: 'Did you hear about the mathematician who’s afraid of negative numbers?',
                                    slug: 'did_you_hear_about_the_mathematician_whos_afraid_of_negative_numbers',
                                    body: 'He’ll stop at nothing to avoid them.',
                                    user: jane,
                                    sub: funnySub,
                                    createdAt: timePlus(5 * day),
                                    updatedAt: timePlus(5 * day),
                                },
                                {
                                    // id: 13
                                    identifier: 'u1PZphn',
                                    title: 'Helvetica and Times New Roman walk into a bar',
                                    slug: 'helvetica_and_times_new_roman_walk_into_a_bar',
                                    body: '“Get out of here!” shouts the bartender. “We don’t serve your type.”',
                                    user: john,
                                    sub: funnySub,
                                    createdAt: timePlus(6 * day),
                                    updatedAt: timePlus(6 * day),
                                },
                                {
                                    // id: 14
                                    identifier: 'HylUYd5',
                                    title: 'Dove chocolate taste better than their soap.',
                                    slug: 'dove_chocolate_taste_better_than_their_soap',
                                    user: john,
                                    sub: oneliners,
                                    createdAt: timePlus(day + hour),
                                    updatedAt: timePlus(day + hour),
                                },
                                {
                                    // id: 15
                                    identifier: 'PwsDv25',
                                    title: 'Raisin Awareness',
                                    slug: 'raisin_awareness',
                                    body: "I've been telling everyone about the benefits of eating dried grapes -- it's all about raisin awareness.",
                                    user: jane,
                                    sub: oneliners,
                                    createdAt: timePlus(day + 2 * hour),
                                    updatedAt: timePlus(day + 2 * hour),
                                },
                                {
                                    // id: 16
                                    identifier: 'iqx3acA',
                                    title: 'Iron Man and War Machine are cool, but there’s a stark difference between them.',
                                    slug: 'iron_man_and_war_machine_are_cool_but_theres_a_stark_difference_between_them',
                                    user: john,
                                    sub: oneliners,
                                    createdAt: timePlus(day + 6 * hour),
                                    updatedAt: timePlus(day + 6 * hour),
                                },
                                {
                                    // id: 17
                                    identifier: 'oCSW50J',
                                    title: 'The adjective for metal is metallic, but not so for iron, which is ironic.',
                                    slug: 'the_adjective_for_metal_is_metallic_but_not_so_for_iron_which_is_ironic',
                                    user: jane,
                                    sub: oneliners,
                                    createdAt: timePlus(day + 8 * hour),
                                    updatedAt: timePlus(day + 8 * hour),
                                },
                            ])
                                .execute()];
                    case 10:
                        // Create posts
                        _a.sent();
                        return [4 /*yield*/, Post_1.default.findOne(6)];
                    case 11:
                        post6 = _a.sent();
                        return [4 /*yield*/, Post_1.default.findOne(7)];
                    case 12:
                        post7 = _a.sent();
                        return [4 /*yield*/, Post_1.default.findOne(8)];
                    case 13:
                        post8 = _a.sent();
                        return [4 /*yield*/, Post_1.default.findOne(9)];
                    case 14:
                        post9 = _a.sent();
                        // Create comments
                        return [4 /*yield*/, connection
                                .createQueryBuilder()
                                .insert()
                                .into(Comment_1.default)
                                .values([
                                {
                                    body: "That' punny hahaha!!",
                                    post: post7,
                                    user: john,
                                    identifier: 'wZ9m66zb',
                                    createdAt: timePlus(10 * day + 5 * hour),
                                    updatedAt: timePlus(10 * day + 5 * hour),
                                },
                                {
                                    body: 'Poor cows hahaha',
                                    post: post7,
                                    user: jane,
                                    identifier: 'G9ntregv',
                                    createdAt: timePlus(10 * day + 3 * hour),
                                    updatedAt: timePlus(10 * day + 3 * hour),
                                },
                                {
                                    body: 'To work even when I didnt have to!!',
                                    post: post6,
                                    user: john,
                                    identifier: 'JFd7haNZ',
                                    createdAt: timePlus(9 * day + hour * 2),
                                    updatedAt: timePlus(9 * day + hour * 2),
                                },
                                {
                                    body: "It's funny cuz it's true haha!",
                                    post: post8,
                                    user: john,
                                    identifier: 'VOLXaQzd',
                                    createdAt: timePlus(10 * day + 2 * hour),
                                    updatedAt: timePlus(10 * day + 2 * hour),
                                },
                                {
                                    body: "At least we're enjoying the milk I guess hihi",
                                    post: post7,
                                    user: jane,
                                    identifier: 'MCqqWy8r',
                                    createdAt: timePlus(10 * day + 4 * hour),
                                    updatedAt: timePlus(10 * day + 4 * hour),
                                },
                                {
                                    body: 'This is so bad, I dont know why im laughing Hahahaha!!',
                                    post: post9,
                                    user: jane,
                                    identifier: 'VxnlwvEx',
                                    createdAt: timePlus(10 * day + 7 * hour),
                                    updatedAt: timePlus(10 * day + 7 * hour),
                                },
                            ])
                                .execute()];
                    case 15:
                        // Create comments
                        _a.sent();
                        return [4 /*yield*/, Comment_1.default.findOne(1)];
                    case 16:
                        comment1 = _a.sent();
                        return [4 /*yield*/, Comment_1.default.findOne(2)];
                    case 17:
                        comment2 = _a.sent();
                        // Create votes
                        return [4 /*yield*/, connection
                                .createQueryBuilder()
                                .insert()
                                .into(Vote_1.default)
                                .values([
                                { value: 1, user: john, post: post9 },
                                { value: 1, user: jane, post: post9 },
                                { value: 1, user: jane, post: post8 },
                                { value: 1, user: john, comment: comment1 },
                                { value: 1, user: jane, comment: comment1 },
                                { value: 1, user: john, comment: comment2 },
                            ])
                                .execute()];
                    case 18:
                        // Create votes
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CreateData;
}());
exports.default = CreateData;
//# sourceMappingURL=create-fake-data.js.map