import express, { response } from 'express';
import { SERVER_PORT} from '../global/env';
import {Request, Response} from 'express'
import bodyParser from 'body-parser';
import fileUpload from "express-fileupload";
import fs from 'fs'
const routeProducts = ("uploads/imgproducts");
const routeUsers = ("uploads/imgusers");
const routeStores = ("uploads/imgstores");
export default class Server{
private static _intance: Server;


public app: express.Application;
public port:number;
private constructor(){
    
    this.app=express();
    this.port=SERVER_PORT;
    this.app.use(fileUpload({
    }));
    this.config();
    this.app.use('/imgproductos',express.static(routeProducts),(err)=>{
        response.send(err)
    })
    this.app.use('/imgusers',express.static(routeUsers))
    this.app.use('/imgpstores',express.static(routeStores))
    
    //SERVICIOS PARA SUBIR IMAGENES DE PRODUCTOS
    this.app.route('/uploadproducts').post((req:Request, res:Response) =>{
        let sampleFile;
        let uploadPath: any;
    
        if (!req.files || Object.keys(req.files).length === 0) {
          res.status(400).send('No files were uploaded.');
          return;
        }
      
       // console.log('req.files >>>', req.files); // eslint-disable-line
      
        sampleFile = req.files.picture;

        uploadPath=`./uploads/imgproducts/${sampleFile.name}`;
        
        sampleFile.mv(uploadPath, function(err) {
          if (err) {
            return res.status(200).send(err);
          }
         
                // Check if we have read/write permissions
                // When specifying multiple permission modes
                // each mode is separated by a pipe : `|`
                fs.access(uploadPath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
                    if (err) {
                        res.send("%s doesn't exist"+uploadPath);
                    } else {
                        res.send('can read/write %s'+ uploadPath);
                    }
                });
        // res.send('File uploaded to fsdfsf' + uploadPath);
        });
      });
      //SERVICIOS PARA SUBIR IMAGENES DE TENDAS
    this.app.route('/uploadstores').post((req:Request, res:Response) =>{
        let sampleFile;
        let uploadPath: any;
    
        if (!req.files || Object.keys(req.files).length === 0) {
          res.status(400).send('No files were uploaded.');
          return;
        }
      
        console.log('req.files >>>', req.files); // eslint-disable-line
      
        sampleFile = req.files.picture;
        
        uploadPath=`./uploads/imgstores/${sampleFile.name}`;
        sampleFile.mv(uploadPath, function(err) {
          if (err) {
              console.log(err)
            return res.status(200).send(err);
          }
      
          res.send('File uploaded to ' + uploadPath);
        });
      });
      this.app.route('/sms').get((req:Request, res:Response) =>{
      res.send('hola')
      });
            //SERVICIOS PARA SUBIR IMAGENES DE USERS
    this.app.route('/uploadusers').post((req:Request, res:Response) =>{
        let sampleFile;
        let uploadPath: any;
    
        if (!req.files || Object.keys(req.files).length === 0) {
          res.status(400).send('No files were uploaded.');
          return;
        }
      
        console.log('req.files >>>', req.files); // eslint-disable-line
      
        sampleFile = req.files.picture;
        
        uploadPath=`./uploads/imgusers/${sampleFile.name}`;
        sampleFile.mv(uploadPath, function(err) {
          if (err) {
              console.log(err)
            return res.status(200).send(err);
          }
      
          res.send('File uploaded to ' + uploadPath);
        });
      });


    

   
}
private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });
    
 }



public static get instance(){
return this._intance||(this._intance=new this());
}

//escuchar sockets

start(callback: Function){
this.app.listen(this.port, callback());
}
}

