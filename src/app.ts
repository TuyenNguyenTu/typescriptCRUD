import express from 'express'
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import path from 'path';


//Route
import indexRoute from './routes';
import tasksRoute from './routes/tasks'

class Application{
    app:express.Application;

    constructor(){
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }
    //config
    //PORT :3000
    // path static file
    settings(){
        this.app.set('port',3000);
        this.app.set('views',path.join(__dirname,'views'));
        this.app.engine('.hbs',exphbs({
            layoutsDir:path.join(this.app.get('views'),'layouts'),
            partialsDir:path.join(this.app.get('views'),'partials'),
            defaultLayout: '_layout',
            extname:'.hbs'
        }))
        this.app.set('view engine','.hbs');
    }
    // gần giống sử dụng service trong .net core
    middlewares(){
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }
    // config route
    routes(){
        this.app.use(indexRoute);
        this.app.use('/tasks',tasksRoute);
        this.app.use(express.static(path.join(__dirname,'public')));
    }
    // start localhost
    start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log("Server on port",this.app.get('port'));
        })
    }
}
export default Application;

