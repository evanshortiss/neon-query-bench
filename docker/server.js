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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const __1 = __importDefault(require("../"));
const server = (0, fastify_1.default)({
    logger: {
        level: process.env.LOG_LEVEL || 'info',
    }
});
const { platform, runner, neonRegion, version } = (0, __1.default)(process.env);
server.get('/health', () => __awaiter(void 0, void 0, void 0, function* () {
    return {
        status: 'ok',
        uptime: uptime(),
    };
}));
server.get('/benchmark/metadata', () => __awaiter(void 0, void 0, void 0, function* () {
    return {
        version,
        neonRegion,
        platform: platform.getPlatformName(),
        region: platform.getPlatformRegion()
    };
}));
server.get('/benchmark/results', (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { queryTimes } = yield runner({
        apiKey: req.headers['x-api-key'] ? req.headers['x-api-key'].toString() : undefined,
        count: req.query.count ? parseInt(req.query.count.toString()) : 5
    });
    return {
        queryTimes
    };
}));
server.listen({
    port: parseInt(process.env.PORT || '3000'),
    host: process.env.HOST || '0.0.0.0'
});
// Convert uptime to human readable format with days, hours, minutes, seconds
const uptime = () => {
    const totalSeconds = Math.floor(process.uptime());
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};
