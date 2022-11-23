export interface Usuarios {
    rol: string;
    nombre: string;
    correo: string;
    password: string;
    confirmaPass: string;
    id: string;
}



export interface Vehiculo {
    id?: string;
    patente: string;
    marca: string;
    modelo: string;
    year: number;
    color: string;
    capacidad: number;
    chofer: string;
    fechaCreacion: Date;
    fechaActualizacion: Date;
}