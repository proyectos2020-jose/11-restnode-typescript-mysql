import {Router, Request, Response} from "express";
import mysql from '../mysql/mysql';
import MysqlConnection from "../mysql/mysqlSingleton";

const router = Router();

router.get("/ping", (req: Request, res: Response) =>{
    res.json({ok:true, message: "llamada realizada correctamente"});
})

router.get("/heroes", (req: Request, res: Response) =>{
    const query = `select * from heroes`;
    MysqlConnection.query(query, (err: any, heroes: Object[]) => {
        if(err){
            res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            ok: true,
            heroes
        })
    })
})

router.get("/heroes/:id", (req: Request, res: Response) =>{
    const id = req.params.id;
    const scapedId = MysqlConnection.getConnection().connection.escape(id);
    const query = `select * from heroes where id=${scapedId}`;
    MysqlConnection.query(query, (err: any, heroe: Object[]) => {
        if(err){
            res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            ok: true,
            heroe: heroe[0]
        })
    })
})

export default router;

