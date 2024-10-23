import {Express} from "express";
import helmet from "helmet";
import compression from "compression";

const prod = (app: Express): void => {
    app.use(helmet());
    app.use(compression());
}

export default prod;