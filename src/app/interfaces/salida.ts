import { Respuesta } from "./respuesta";

export interface listarSalidas{
    detalle: salidas[],
    respuesta: Respuesta
}

export interface salidas{
    id: number,
    motivo: string,
    fecha: string,
    detalleSalida: detalleSalidas[]
}

export interface detalleSalidas{
    id: number,
    cantidad: number,
    precioUnitario: number,
    idProducto: number,
    producto: string
}

//CREAR SALIDAS
export interface crearSalida{
    motivoSalida: string,
    detalleSalida: crearDetalle[]
}

export interface crearDetalle{
    cantidad: number,
    precioUnitario: number,
    idProducto: number
}