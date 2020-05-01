import mysql from "mysql";
import {Connection} from "mysql";

export default class MysqlConnection {
    private static _instance: MysqlConnection;
    public connection: Connection;

    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            port: 3306,
            password: '',
            database: 'node_db'
        });
        this.conectarDB();
    }

    conectarDB() {
        this.connection.connect((err: mysql.MysqlError) => {
            if(err) {
                throw new Error(err.message);
            }
        })

        console.log('Base de datos online!')
    }

    static query(query: string, callback: Function) {
        this.getConnection().connection.query(query, function (error, results, fields) {
            if (error) {
                callback('Error al recuperar los datos');
            }
            if(results.length === 0) {
                callback('No hay registros');
            }
            callback(null, results)
        });
    }

    static getConnection() {
        return this._instance || (this._instance = new this());
    }
}




