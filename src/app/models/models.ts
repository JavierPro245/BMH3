
export interface UserI{
    uid: string,
    nombre:string,
    correo: string,
    edad: number,
    password: string,
    repasPassword: string,
    perfil: 'conductor'|'pasajero',
}

export interface RutasI{
    conductor:{
        nombre:string;
        patente:string;
    }
    rutas:{
        avenida1: string;
        avenida2: string;
        avenida3: string;
    }
    avenidaOpcional1?:string;
    avenidaOpcional2?:string;
    id: string;
}

export interface ViajeI{

    busqueda:string,
    nombre:string,
    direccion: string,
    referencia: string,
    ciudad: string,
    provincia: string,
    region: string,
    id:string;

    
}
export interface ViajePasajeroI{

    busqueda:string,
    direccion: string,
    referencia: string,
    ciudad: string,
    provincia: string,
    region: string,
    id:string;

    
}