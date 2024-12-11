import { EmptyTipoCredito, TipoCredito } from "./tipoCredito.model";

export interface Operacion {
  operacionID: number;
  identificacion: string;
  nombre: string;
  tipoCredito: string;
  monto: number;
  fechaInicio: Date;
  plazoMeses: number;
  aprobado: boolean;
  fechaRegistro: Date;
  tipoCreditoNavigation: TipoCredito
}

export type CreateOperacion = Omit<Operacion, 'operacionID' | 'tipoCreditoNavigation'>;

export const EmptyOperacion: Operacion = {
  operacionID: 0,
  identificacion: '',
  nombre: '',
  tipoCredito: '',
  monto: 0,
  fechaInicio: new Date(),
  plazoMeses: 0,
  aprobado: false,
  fechaRegistro: new Date(),
  tipoCreditoNavigation: EmptyTipoCredito
}

export const EmptyCreateOperacion: Omit<Operacion, 'operacionID'> = {
  identificacion: '',
  nombre: '',
  tipoCredito: '',
  monto: 0,
  fechaInicio: new Date(),
  plazoMeses: 0,
  aprobado: false,
  fechaRegistro: new Date(),
  tipoCreditoNavigation: EmptyTipoCredito
}
