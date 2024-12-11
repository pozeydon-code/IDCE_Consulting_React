import { z } from 'zod';

export const operacionSchema = z.object({
  operacionID: z.number(),
  identificacion: z
    .string()
    .min(1, 'La identificacion es requerida')
    .max(10, 'La identificacion tiene un maximo de 10 caracteres'),
  nombre: z
    .string()
    .min(1, 'El nombre es un campo requerido')
    .max(100, 'El nombre tiene un maximo de 100 caracteres'),
  tipoCredito: z
    .string()
    .min(1, 'El tipo de credito es requerido')
    .max(15, 'El tipo de credito tiene un maximo de 15 caracteres'),
  monto: z.number(),
  fechaInicio: z.preprocess((val) => new Date(val as string), z.date()),
  plazoMeses: z.number(),
  aprobado: z.preprocess((val) => val === 'true', z.boolean()),
  fechaRegistro: z.preprocess((val) => new Date(val as string), z.date()),
});

export const createOperacionSchema = operacionSchema.pick({
  identificacion: true,
  nombre: true,
  tipoCredito: true,
  monto: true,
  fechaInicio: true,
  plazoMeses: true,
  aprobado: true,
  fechaRegistro: true,
});

export type CreateOperacionValues = z.infer<typeof createOperacionSchema>;
export type ModificacionOperacionValues = z.infer<typeof operacionSchema>;
