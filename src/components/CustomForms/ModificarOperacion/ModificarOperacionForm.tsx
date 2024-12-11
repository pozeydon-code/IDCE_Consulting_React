import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Stack,
} from '@chakra-ui/react';
import {
  createOperacionSchema,
  CreateOperacionValues,
  ModificacionOperacionValues,
  operacionSchema,
} from '../models';
import {
  OperacionCreacionInput,
  OperacionModificacionInput,
} from '../components/OperacionInput';
import { EmptyOperacion, Operacion } from '@/models';

interface PropsCrear {
  onSubmit: SubmitHandler<CreateOperacionValues>;
}

export const CrearOperacion = ({ onSubmit }: PropsCrear) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOperacionValues>({
    resolver: zodResolver(createOperacionSchema),
    mode: 'onBlur',
  });

  return (
    <DialogContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Modificar Operacion</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">
          <Stack gap="4">
            <OperacionCreacionInput
              name="identificacion"
              control={control}
              label="Identificacion"
              type="text"
              error={errors.identificacion}
            />
            <OperacionCreacionInput
              name="nombre"
              control={control}
              label="Nombre"
              type="text"
              error={errors.nombre}
            />
            <OperacionCreacionInput
              name="tipoCredito"
              control={control}
              label="Tipo de Credito"
              type="text"
              error={errors.tipoCredito}
            />
            <OperacionCreacionInput
              name="monto"
              control={control}
              label="Monto"
              type="number"
              error={errors.monto}
            />
            <OperacionCreacionInput
              name="fechaInicio"
              control={control}
              label="Fecha Inicio"
              type="date"
              error={errors.fechaInicio}
            />
            <OperacionCreacionInput
              name="plazoMeses"
              control={control}
              label="Plazo en Meses"
              type="number"
              error={errors.plazoMeses}
            />
            <OperacionCreacionInput
              name="aprobado"
              control={control}
              label="Aprobado"
              type="checkbox"
              error={errors.aprobado}
            />
            <OperacionCreacionInput
              name="fechaRegistro"
              control={control}
              label="Fecha Registro"
              type="date"
              error={errors.fechaRegistro}
            />
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button bgColor="red.400">Cancelar</Button>
          </DialogActionTrigger>
          <Button type="submit">Guardar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

interface PropsModificar {
  item: Operacion;
  onSubmit: SubmitHandler<ModificacionOperacionValues>;
}

export const ModificarOperacion = ({
  item = EmptyOperacion,
  onSubmit,
}: PropsModificar) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ModificacionOperacionValues>({
    resolver: zodResolver(operacionSchema),
    mode: 'onBlur',
  });

  return (
    <DialogContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Modificar Operacion</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">
          <Stack gap="4">
            <OperacionModificacionInput
              name="operacionID"
              control={control}
              label="operacionID"
              type="number"
              value={item.operacionID}
              error={errors.operacionID}
            />
            <OperacionModificacionInput
              name="identificacion"
              control={control}
              label="Identificacion"
              type="text"
              value={item.identificacion}
              error={errors.identificacion}
            />
            <OperacionModificacionInput
              name="nombre"
              control={control}
              label="Nombre"
              type="text"
              value={item.nombre}
              error={errors.nombre}
            />
            <OperacionModificacionInput
              name="tipoCredito"
              control={control}
              label="Tipo de Credito"
              type="text"
              value={item.tipoCredito}
              error={errors.tipoCredito}
            />
            <OperacionModificacionInput
              name="monto"
              control={control}
              label="Monto"
              type="number"
              value={item.monto}
              error={errors.monto}
            />
            <OperacionModificacionInput
              name="fechaInicio"
              control={control}
              label="Fecha Inicio"
              type="date"
              value={
                item.fechaInicio
                  ? new Date(item.fechaRegistro).toISOString().split('T')[0]
                  : ''
              }
              error={errors.fechaInicio}
            />
            <OperacionModificacionInput
              name="plazoMeses"
              control={control}
              label="Plazo en Meses"
              type="number"
              value={item.plazoMeses}
              error={errors.plazoMeses}
            />
            <OperacionModificacionInput
              name="aprobado"
              control={control}
              label="Aprobado"
              type="checkbox"
              value={item.aprobado}
              error={errors.aprobado}
            />
            <OperacionModificacionInput
              name="fechaRegistro"
              control={control}
              label="Fecha Registro"
              type="date"
              value={
                item.fechaRegistro
                  ? new Date(item.fechaRegistro).toISOString().split('T')[0]
                  : ''
              }
              error={errors.fechaRegistro}
            />
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button bgColor="red.400">Cancelar</Button>
          </DialogActionTrigger>
          <Button type="submit">Guardar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
