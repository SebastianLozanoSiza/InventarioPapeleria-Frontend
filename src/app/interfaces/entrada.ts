import { Respuesta } from "./respuesta"

export interface listarEntradas{
    entradas: entradas[],
    repuesta: Respuesta
}

export interface entradas{
    id: number,
    fecha: string,
    total: number,
    idProveedor: number,
    proveedor: string,
    detalles: detalleEntradas[]
}

export interface detalleEntradas{
    id: number,
    cantidad: number,
    precioUnitario: number,
    idProducto: number,
    producto: string
}

//CREAR ENTRADA
export interface crearEntrada{
    idProveedor: number,
    detalles: crearDetalleEntrada[]
}

export interface crearDetalleEntrada{
    cantidad: number,
    precioUnitario: number,
    idProducto: number
}