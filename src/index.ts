import {AppDataSource} from "./data-source";
import app from "./app";


const port = 3000;
AppDataSource.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Error during Data Source initialization", error);
    });