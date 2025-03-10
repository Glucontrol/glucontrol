import { Request, Response } from "express";
import {client} from "../helpers/database"
const Controller =  {
    "add":(_req: Request,res: Response):void=>{
        //Lógica de Añadir
    },
    "delete":(_req: Request,res: Response):void=>{
        //Lógica de Eliminar
    },
    "edit":(_req: Request,res: Response):void=>{
        //Lógica de Editar
    },
    "list":(_req: Request,res: Response):void=>{
        client().db("glucontrol").collections().then((response)=>res.send(response.toString()))
    }
}

export default Controller