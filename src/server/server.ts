import express = require('express');
import path = require('path');


export class Server {
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
    }

    static init(port: number) {
        return new Server(port);
    }

    start(callback: Function) {
        this.app.listen(this.port, callback());
        //Publicamos la carpeta public una vez vemos que el server está levantado.
        this.publicFolder();
    }

    private publicFolder() {
        const staticPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(staticPath));
    }

}
