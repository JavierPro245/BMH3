export interface Usuarios {
    uid: string;
    //imagen: string;
    nombre: string;
    correo: string;
    password: string;
    confirmaPass: string;
    rol: string;
}



export interface Vehiculo {
    id?: string;
    patente: string;
    marca: string;
    modelo: string;
    // year: number;
    capacidad: number;
    chofer: string;
    fechaCreacion?: Date;
    fechaActualizacion: Date;
}

export interface Reserva {
    id?: string;
    comuna: string;
    destino: string;
    capacidad: number;
    pasajero: string;
    pago: string;
    fechaReserva: Date;
}