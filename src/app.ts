import express from 'express';
import router from './routes';
import errorHandler from './middleware/errorHandler';
import dotenv from 'dotenv';
import cors from 'cors'


const app = express();
app.use(cors({
    origin: '*'
}));
dotenv.config();
app.use(express.json()); //Colocar esto, si no express no parsea correctamente el body de las peticiones
app.use("/api", router);
app.use(errorHandler);


export default app;

