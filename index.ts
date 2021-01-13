import Server from './classes/server';
import cors from 'cors'


const server= Server.instance;

//BodyParser


server.app.use(cors({ origin: true, credentials: true }) );

//CORS
//RUTAS DE SERVICIOS
server.start( ()=> {
console.log(server.port)
});
