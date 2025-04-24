import { Respuesta } from "./respuesta"

export interface listarProductos {
    productos: productos[],
    respuesta: Respuesta
}

export interface productos{
    id: number,
    nombre: string,
    descripcion: string,
    stockActual: number,
    stockMinimo: number,
    precioCompra: number,
    precioVenta: number,
    fechaRegistro: string,
    idCategoria: number,
    categoria: string
}

export interface crearProductos{
    nombre: string,
    descripcion: string,
    stockActual: number,
    stockMinimo: number,
    precioCompra: number,
    precioVenta: number,
    idCategoria: number
}