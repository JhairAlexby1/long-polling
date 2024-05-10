import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

let respuestasPendientes: Response[] = [];

const notificaciones = [
    { id: 1, cuerpo: "Notificación 1." },
    { id: 2, cuerpo: "Notificación 2." },
    { id: 3, cuerpo: "Notificación 3." },
];

app.get("/notificaciones", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        notificaciones,
    });
});

app.get("/nuevaNotificacion", (req: Request, res: Response) => {
    respuestasPendientes.push(res);
});

app.post("/notificacionCreate", (req: Request, res: Response) => {
    const idNotificacion =
        notificaciones.length > 0
            ? notificaciones[notificaciones.length - 1].id + 1
            : 1;

    const notificacion = {
        id: idNotificacion,
        cuerpo: req.body.cuerpo,
    };

    notificaciones.push(notificacion);
    responderClientes(notificacion)

    res.json({
        success: true,
        message:'notificacion creada',
    });
});

function responderClientes(notificacion: { id: number, cuerpo: string }){
    for(let res of respuestasPendientes){
        res.json({
            success: true,
            notificacion
        });
    }
}

app.listen(3001, () => console.log('servidor desplegado en el puerto 3001'))