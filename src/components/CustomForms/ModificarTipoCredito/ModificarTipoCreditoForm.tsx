import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    tipoCreditoSchema,
    TipoCreditoValues,
} from '../models/TipoCredito.schema';
import {
    Box,
    Button,
    CardBody,
    CardFooter,
    CardRoot,
    CardTitle,
    DialogActionTrigger,
    DialogBody,
    DialogContent,
    DialogFooter,
    Heading,
    Stack,
} from '@chakra-ui/react';
import { TipoCreditoCrearInput, TipoCreditoInput } from '../components';
import { TipoCredito } from '@/models';

interface PropsCrear {
    onSubmit: SubmitHandler<TipoCreditoValues>;
}

export const CrearTipoCredito = ({ onSubmit }: PropsCrear) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TipoCreditoValues>({
        resolver: zodResolver(tipoCreditoSchema),
        mode: 'onBlur',
    });

    return (
        <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogBody pb="4">
                    <Stack gap="4">
                        <TipoCreditoCrearInput
                            name="codigo"
                            control={control}
                            label="Codigo - Tipo de Credito"
                            type="text"
                            error={errors.codigo}
                        />
                        <TipoCreditoCrearInput
                            name="nombre"
                            control={control}
                            label="Nombre - Tipo de Credito"
                            type="text"
                            error={errors.nombre}
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
    item: TipoCredito;
    onSubmit: SubmitHandler<TipoCreditoValues>;
}

export const ModificarTipoCredito = ({ item, onSubmit }: PropsModificar) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TipoCreditoValues>({
        resolver: zodResolver(tipoCreditoSchema),
        mode: 'onBlur',
    });

    return (
        <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogBody pb="4">
                    <Stack gap="4">
                        <TipoCreditoInput
                            name="codigo"
                            control={control}
                            label="Codigo - Tipo de Credito"
                            type="text"
                            value={item.codigo}
                            error={errors.codigo}
                        />
                        <TipoCreditoInput
                            name="nombre"
                            control={control}
                            label="Nombre - Tipo de Credito"
                            type="text"
                            value={item.nombre}
                            error={errors.nombre}
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
