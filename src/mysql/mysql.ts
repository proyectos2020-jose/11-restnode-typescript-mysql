import mysql from "mysql";
import {Connection} from "mysql";

export default abstract class MysqlConnection {
    public static connection: Connection;

    static getConnection() {
        if (!this.connection) {
            this.connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                port: 3306,
                password: '',
                database: 'node_db'
            });
        }
        return this.connection;
    }

    static queryMySql(query: string) {
        this.connection.connect();
        query = 'select * from node_db.heroes';
        this.connection.query(query, function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
        });
        this.connection.end();
    }
}




