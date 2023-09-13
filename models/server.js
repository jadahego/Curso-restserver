const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload')

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.categoriasPath = '/api/categorias';
        this.productosPath = '/api/productos';
        this.buscarPath = '/api/buscar';
        this.uploadPath = '/api/uploads';

        // conectar a base de datos
        this.conectarDB();
        
        //Middlewares (funcion que se ejecuta cuando se levanta el servidor)
        this.middlewares();

        this.routes();

      }

     async conectarDB() {
        await dbConnection();
     }

      middlewares() {

        //cors
        this.app.use(cors());

        //parseo y lectura del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

        // Carga de archivos. 
        this.app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/',
        createParentPath: true
        }));

      }

    routes(){
      this.app.use(this.authPath, require('../routes/auth'));
      this.app.use(this.categoriasPath, require('../routes/categorias'));
      this.app.use(this.productosPath, require('../routes/productos'));
      this.app.use(this.usuariosPath, require('../routes/user'));
      this.app.use(this.buscarPath, require('../routes/buscar'));
      this.app.use(this.uploadPath, require('../routes/uploads'));
    }
    

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
          })
          
    }


}


module.exports = Server;