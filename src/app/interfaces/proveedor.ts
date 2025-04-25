import { Respuesta } from "./respuesta"

export interface listarProveedores{
    proveedor: proveedor[],
    respuesta: Respuesta
}

export interface proveedor{
    idProveedor: number,
    nombre: string,
    correo: string,
    telefono: string
}

export interface crearProveedor{
    nombre: string,
    correo: string,
    telefono: string
}