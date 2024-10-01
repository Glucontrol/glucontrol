import {API_URL} from "../config.js"
export const link = {}

link.articulos = () =>fetch(`http://localhost:${API_URL}/articulos`).then((response) => response.json())

link.registros = () =>fetch(`http://localhost:${API_URL}/registros`).then((response)=>response.json())

link.articuloId = (id) => fetch(`http://localhost:${API_URL}/articulo/${id}`).then((response) => response.json())
