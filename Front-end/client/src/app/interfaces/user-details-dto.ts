export interface UserDetailsDto {
  id: string;
  fechaRegistro: Date;
  nomApels: string;
  saldo: number;
  userName: string;
  email: string;
  phoneNumber?: string;
}
