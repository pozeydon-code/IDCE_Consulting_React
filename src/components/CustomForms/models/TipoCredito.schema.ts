import { z } from 'zod';

export const tipoCreditoSchema = z.object({
  codigo: z.string().min(1, 'El codigo es obligatorio'),
  nombre: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(600, 'El numero maximo de caracteres es 600'),
});

export type TipoCreditoValues = z.infer<typeof tipoCreditoSchema>;
