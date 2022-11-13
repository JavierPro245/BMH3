export interface Usuarios {
    rol: string;
    nombre: string;
    correo: string;
    password: string;
    confirmaPass: string;
    id: string;
}



export interface Vehiculo {
    patente: string;
    marca: string;
    modelo: string;
    year: number;
    color: string;
    capacidad: number;
    chofer: Usuarios;
}