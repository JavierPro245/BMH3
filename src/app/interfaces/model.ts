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
    ruta: string;
    capacidad: number;
    chofer: string;
    fechaCreacion: Date;
    fechaActualizacion: Date;
}

export interface Reserva {
    id?: string;
    Comuna: string;
    Destino: string;
    pasajero: string;
    pago: string;
}