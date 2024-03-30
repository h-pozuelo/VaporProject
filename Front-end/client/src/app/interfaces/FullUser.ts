import { Biblioteca } from "./Biblioteca";
import { Resenya } from "./Resenya";
import { Transaccion } from "./Transaccion";

export interface FullUser_Output_DTO {
    fechaRegistro: string;
    nomApels: string | null;
    saldo: number;
    email: string | null;
    bibliotecas: Biblioteca[] | null;
    resenyas: Resenya[] | null;
    transacciones: Transaccion[] | null;
}