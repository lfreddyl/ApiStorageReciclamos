"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const env_1 = require("../global/env");
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const fs_1 = __importDefault(require("fs"));
const routeProducts = ("uploads/imgproducts");
const routeUsers = ("uploads/imgusers");
const routePublicaciones = ("uploads/imgpublicaciones");
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = env_1.SERVER_PORT;
        this.app.use(express_fileupload_1.default({}));
        this.config();
        this.app.use('/imgproductos', express_1.default.static(routeProducts), (err) => {
            express_1.response.send(err);
        });
        this.app.use('/imgusers', express_1.default.static(routeUsers));
        this.app.use('/imgpublicaciones', express_1.default.static(routePublicaciones));
        //SERVICIOS PARA SUBIR IMAGENES DE PRODUCTOS
        this.app.route('/uploadproducts').post((req, res) => {
            let sampleFile;
            let uploadPath;
            if (!req.files || Object.keys(req.files).length === 0) {
                res.status(400).send('No files were uploaded.');
                return;
            }
            // console.log('req.files >>>', req.files); // eslint-disable-line
            sampleFile = req.files.picture;
            uploadPath = `./uploads/imgproducts/${sampleFile.name}`;
            sampleFile.mv(uploadPath, function (err) {
                if (err) {
                    return res.status(200).send(err);
                }
                // Check if we have read/write permissions
                // When specifying multiple permission modes
                // each mode is separated by a pipe : `|`
                fs_1.default.access(uploadPath, fs_1.default.constants.R_OK | fs_1.default.constants.W_OK, (err) => {
                    if (err) {
                        res.send("%s doesn't exist" + uploadPath);
                    }
                    else {
                        res.send('can read/write %s' + uploadPath);
                    }
                });
                // res.send('File uploaded to fsdfsf' + uploadPath);
            });
        });
        //SERVICIOS PARA SUBIR IMAGENES DE TENDAS
        this.app.route('/uploadpublicaciones').post((req, res) => {
            let sampleFile;
            let uploadPath;
            let nombreImagen;
            if (!req.files || Object.keys(req.files).length === 0) {
                res.status(400).send('No files were uploaded.');
                return;
            }
            sampleFile = req.files.picture;
            uploadPath = `./uploads/imgpublicaciones/${sampleFile.name}`;
            nombreImagen = sampleFile.name;
            sampleFile.mv(uploadPath, function (err) {
                if (err) {
                    res.status(400).json({
                        STATUS: 'FAILURE',
                        MESSAGE: 'Hubo un problema la subir la imagen',
                        DATA: err
                    });
                }
                res.status(200).json({
                    STATUS: 'SUCCESS',
                    MESSAGE: 'La imagen se subio',
                    DATA: nombreImagen
                });
            });
        });
        this.app.route('/sms').get((req, res) => {
            res.send('hola como estas f');
        });
        //SERVICIOS PARA SUBIR IMAGENES DE USERS
        this.app.route('/uploadusers').post((req, res) => {
            let sampleFile;
            let uploadPath;
            if (!req.files || Object.keys(req.files).length === 0) {
                res.status(400).send('No files were uploaded.');
                return;
            }
            console.log('req.files >>>', req.files); // eslint-disable-line
            sampleFile = req.files.picture;
            uploadPath = `./uploads/imgusers/${sampleFile.name}`;
            sampleFile.mv(uploadPath, function (err) {
                if (err) {
                    console.log(err);
                    return res.status(200).send(err);
                }
                res.send('File uploaded to ' + uploadPath);
            });
        });
    }
    config() {
        // support application/json type post data
        this.app.use(body_parser_1.default.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
    }
    static get instance() {
        return this._intance || (this._intance = new this());
    }
    //escuchar sockets
    start(callback) {
        this.app.listen(this.port, callback());
    }
}
exports.default = Server;
