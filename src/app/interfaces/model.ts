import { PasajeroGuard } from '../pasajero.guard';
export interface Usuarios {
    uid: string;
    //imagen: string;
    nombre: string;
    correo: string;
    password: string;
    confirmaPass: string;
    rol: string;
    discapacidad: string;
}



export interface Vehiculo {
    id?: string;
    patente: string;
    marca: string;
    modelo: string;
    // year: number;
    capacidad: number;
    uid: string;
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

export interface Solicitud {
    id?: string;
    patenteVehiculo: string;
    marca: string;
    modelo: string;
    Pasajero: string;
    fechaSolicitud: Date;
    uid: string
}

export interface Historial {
    id?: string;
    patenteVehiculo: string;
    marca: string;
    modelo: string;
    Pasajero: string;
    fechaViaje: Date;
    uid: string
}