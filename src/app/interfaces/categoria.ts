import { Respuesta } from "./respuesta"

export interface listarCategoria{
    categoria: Categoria[],
    respuesta: Respuesta
}

export interface Categoria {
    idCategoria: number,
    nombre: string,
    fechaRegistro: string
}

export interface CrearCategoria{
    nombre: string
}
