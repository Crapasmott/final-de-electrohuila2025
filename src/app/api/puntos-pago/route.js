// src/app/api/puntos-pago/route.js
import { NextResponse } from 'next/server';

// Datos de ejemplo basados en las imágenes proporcionadas
const puntosPagoData = [
    {
        municipio: "ACEVEDO",
        recaudador: "Suchance",
        sitioVenta: "ACEVEDO OFICINA PRINCIPAL",
        direccion: "CARRERA 5 No 7 - 35 CENTRO"
    },
    {
        municipio: "ACEVEDO",
        recaudador: "Suchance",
        sitioVenta: "GALERIA ACEVEDO",
        direccion: "CARRERA 5 No. 3-26 - CENTRO"
    },
    {
        municipio: "ACEVEDO",
        recaudador: "Suchance",
        sitioVenta: "DROGUERIA LA ECONOMIA",
        direccion: "CALLE 5 No. 5 - 47 - CENTRO"
    },
    {
        municipio: "AGRADO",
        recaudador: "Suchance",
        sitioVenta: "AGRADO OFICINA PRINCIPAL",
        direccion: "CARRERA 5 Y 6 No 5-83 BARRIO EL CENTRO LOTE Y CASA - EL CENTRO"
    },
    {
        municipio: "AIPE",
        recaudador: "Suchance",
        sitioVenta: "AIPE OFICINA PRINCIPAL",
        direccion: "CALLE 5 No 4- 30 -32-34"
    },
    {
        municipio: "AIPE",
        recaudador: "Suchance",
        sitioVenta: "GALERIAS",
        direccion: "CALLE 5 No 6 -28 -32-36-40 - CENTRO"
    },
    {
        municipio: "ALGECIRAS",
        recaudador: "Suchance",
        sitioVenta: "ALGECIRAS OFICINA PRINCIPAL",
        direccion: "CARRERA 5 No 4-48/50/52 - CENTRO"
    },
    {
        municipio: "ALGECIRAS",
        recaudador: "Suchance",
        sitioVenta: "HOTEL TOLIMA",
        direccion: "CARRERA 7A No 4 34 LA ESPERANZA"
    },
    {
        municipio: "ALTAMIRA",
        recaudador: "Suchance",
        sitioVenta: "ALTAMIRA OFICINA PRINCIPAL",
        direccion: "CARRERA 4 No. 5-73 - 75 No. 6 - 69 -73 CASA MEJORAS"
    },
    {
        municipio: "BARAYA",
        recaudador: "Suchance",
        sitioVenta: "BARAYA OFICINA PRINCIPAL",
        direccion: "CALLE 2 No. 5 - 23 - CENTRO"
    },
    {
        municipio: "BELEN",
        recaudador: "Suchance",
        sitioVenta: "BELEN OFICINA PRINCIPAL",
        direccion: "CALLE 2 No. 3-06 CASA LOTE NO. 2"
    },
    {
        municipio: "BRUSELAS",
        recaudador: "Suchance",
        sitioVenta: "BRUSELAS OFICINA PRINCIPAL",
        direccion: "PREDIO CASA ALBERTO - CENTRO"
    },
    {
        municipio: "BRUSELAS",
        recaudador: "Suchance",
        sitioVenta: "SUPER TIENDA VARGAS",
        direccion: "PREDIO NARANJO Y PEDREGAL UNIDOS"
    },
    {
        municipio: "CAMPOALEGRE",
        recaudador: "Suchance",
        sitioVenta: "CAMPOALEGRE OFICINA PRINCIPAL",
        direccion: "CALLE 18 No. 7-52 - 58 - CENTRO"
    },
    {
        municipio: "CAMPOALEGRE",
        recaudador: "Suchance",
        sitioVenta: "SAN ISIDRO",
        direccion: "CALLE 12 No 11-33"
    },
    {
        municipio: "CAMPOALEGRE",
        recaudador: "Suchance",
        sitioVenta: "PAPATOS",
        direccion: "CARRERA 9 No. 18-29 Y 18-25 - CENTRO"
    },
    {
        municipio: "CAMPOALEGRE",
        recaudador: "Suchance",
        sitioVenta: "AVENIDA PRINCIPAL",
        direccion: "CARRERA 12 No 18-11 NUMERO 3 - CENTRO"
    },
    {
        municipio: "COLOMBIA",
        recaudador: "Suchance",
        sitioVenta: "COLOMBIA OFICINA PRINCIPAL",
        direccion: "CARRERA 4 No 4 -36- 42 -46"
    },
    {
        municipio: "EL PITAL",
        recaudador: "Suchance",
        sitioVenta: "PITAL OFICINA PRINCIPAL",
        direccion: "CARRERA 5 NO. 6-15"
    },
    {
        municipio: "EL PITAL",
        recaudador: "Suchance",
        sitioVenta: "ECUADOR",
        direccion: "CARRERA 5 No 3 - 01 - 05"
    },
    {
        municipio: "ELIAS",
        recaudador: "Suchance",
        sitioVenta: "QUITURO",
        direccion: "LOTE DE TERRENO CON LOCAL PRIMER PISO"
    },
    {
        municipio: "ELIAS",
        recaudador: "Suchance",
        sitioVenta: "ELIAS OFICINA PRINCIPAL",
        direccion: "CALLE 2 No 3-21 EL CENTRO"
    },
    {
        municipio: "GARZON",
        recaudador: "Suchance",
        sitioVenta: "GUADUALES",
        direccion: "CARRERA 23 No 2A-59 5 LOTE 12"
    },
    {
        municipio: "GIGANTE",
        recaudador: "Suchance",
        sitioVenta: "PRINCIPAL COAGROHUILA",
        direccion: "CALLE 4 No. 4 48-50-52 CASA LOTE"
    },
    {
        municipio: "GIGANTE",
        recaudador: "Suchance",
        sitioVenta: "OFICINA PRINCIPAL-TORRE",
        direccion: "CARRERA 5 No. 5-29"
    },
    // Añadidos más datos basados en las demás imágenes
    {
        municipio: "NEIVA",
        recaudador: "Banco Occidente",
        sitioVenta: "Electrohuila el Saire",
        direccion: "Carrera 18 calle 9 Esquina"
    },
    {
        municipio: "NEIVA",
        recaudador: "Credifuturo",
        sitioVenta: "Sede Principal",
        direccion: "Cra 5 # 10-23"
    },
    {
        municipio: "GARZON",
        recaudador: "Credifuturo",
        sitioVenta: "Sede",
        direccion: "Cll 8 # 8-24"
    },
    {
        municipio: "LA PLATA",
        recaudador: "Credifuturo",
        sitioVenta: "Sede",
        direccion: "Cll 6 # 5-15"
    },
    {
        municipio: "NEIVA",
        recaudador: "Suchance",
        sitioVenta: "OLIMPICA AMARANTO",
        direccion: "CALLE 56 B No 17-71"
    },
    {
        municipio: "NEIVA",
        recaudador: "Suchance",
        sitioVenta: "OLIMPICA SANTA LOMA",
        direccion: "CALLE 20 No 36A -84"
    },
    {
        municipio: "YAGUARA",
        recaudador: "Suchance",
        sitioVenta: "YAGUARA OFICINA PRINCIPAL",
        direccion: "CALLE 4 No. 3 -54"
    },
    {
        municipio: "YAGUARA",
        recaudador: "Suchance",
        sitioVenta: "AVENIDA PRINCIPAL",
        direccion: "CALLE 3 NO 5-36-38"
    }
    // Puedes expandir estos datos con todos los puntos de pago que se ven en las imágenes
];

export async function GET() {
    // Simular un pequeño retraso para mostrar el estado de carga
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(puntosPagoData);
}