import "reflect-metadata";
import * as express from "express";
import * as compression from "compression";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as path from "path";

import { AppDataSource } from "./data-source";
import clientRoutes from "./routes/clientRoutes";
import balanceSheetRoutes from "./routes/balanceSheetRoutes";
import { errorHandler } from "./middlewares/errorHandler";


const app = express();
const port = 3000;

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(cookieParser());
app.use(compression());

// Routes
app.use("/api/clients", clientRoutes);
app.use("/api/balance-sheets", balanceSheetRoutes);

// Error handler middleware
app.use(errorHandler);

// Initialize Data Source and Start Server
AppDataSource.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Error during Data Source initialization", error);
    });
