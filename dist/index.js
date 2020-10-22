"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const cors_1 = __importDefault(require("cors"));
const server = server_1.default.instance;
//BodyParser
server.app.use(cors_1.default({ origin: true, credentials: true }));
//CORS
//RUTAS DE SERVICIOS
server.start(() => {
    console.log(server.port);
});
