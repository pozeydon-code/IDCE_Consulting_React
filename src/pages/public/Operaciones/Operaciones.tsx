import {
  CrearOperacion,
  CreateOperacionValues,
  Layout,
  ModalButton,
  ModificacionOperacionValues,
  ModificarOperacion,
  ModificarTipoCredito,
} from '@/components';
import { useApi } from '@/hooks';
import {
  CreateOperacion,
  EmptyOperacion,
  EmptyTipoCredito,
  Operacion,
} from '@/models';
import {
  crearOperacion,
  crearTipoCredito,
  deleteOperacion,
  deleteTipoCredito,
  getOperaciones,
  modificarOperacion,
} from '@/services';
import {
  Box,
  Button,
  Center,
  Container,
  DialogRoot,
  DialogTrigger,
  Spinner,
  Table,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

interface ModificarProps {
  id: number;
  data: Partial<Operacion>;
}

export const Operaciones = () => {
  const [operaciones, setOperaciones] = useState<Operacion[]>([]);
  const [selectedOperacion, setSelectedOperacion] = useState<Operacion | null>(
    null,
  );
  const { loading, error, data, fetch } = useApi<Operacion[], number>(
    getOperaciones,
    { autoFetch: true, params: 0 },
  );

  const {
    loading: deleting,
    error: deleteError,
    fetch: executeDelete,
  } = useApi<void, number>(deleteOperacion, { params: 0 });

  const {
    loading: modifcando,
    error: modificandoError,
    fetch: executeModificar,
  } = useApi<void, ModificarProps>(modificarOperacion, {
    params: { id: 0, data: EmptyOperacion },
  });

  const {
    loading: creando,
    data: dataCrear,
    error: creandoError,
    fetch: executeCrear,
  } = useApi<Operacion, CreateOperacion>(crearOperacion, {
    params: EmptyOperacion,
  });

  useEffect(() => {
    if (data) setOperaciones(data);

    if (dataCrear) {
      setOperaciones((prev) => [...prev, dataCrear]);
    }
  }, [data, dataCrear]);

  if (loading || deleting || modifcando || creando) {
    console.log(loading);
    return <Spinner size="lg" />;
  }

  if (error || deleteError || modificandoError || creandoError) {
    return (
      <>
        {error && (
          <p>Error al cargar los datos: {JSON.stringify(error.errors)}</p>
        )}
        {deleteError && (
          <p>
            Error al eliminar los datos: {JSON.stringify(deleteError.errors)}
          </p>
        )}
        {modificandoError && (
          <p>
            Error al modificar los datos:{' '}
            {JSON.stringify(modificandoError.errors)}
          </p>
        )}
        {creandoError && (
          <p>Error al crear los datos: {JSON.stringify(creandoError.errors)}</p>
        )}
      </>
    );
  }

  const handleDelete = (id: number) => {
    try {
      executeDelete(id);
      setOperaciones((prev) => prev.filter((item) => item.operacionID !== id));
    } catch (err) {
      alert(err);
    }
  };

  const handleUpdate: SubmitHandler<ModificacionOperacionValues> = (params) => {
    if (!selectedOperacion) return;

    executeModificar({ id: selectedOperacion.operacionID, data: params });
    setOperaciones((prev) =>
      prev.map((item) =>
        item.operacionID === selectedOperacion.operacionID
          ? { ...item, ...params }
          : item,
      ),
    );
    setSelectedOperacion(null);
    fetch(0);
  };

  const handleCreate: SubmitHandler<CreateOperacionValues> = (params) => {
    executeCrear(params);
    fetch(0);
  };

  const calcularFechaFinal = (
    fechaInicio: Date,
    plazoMeses: number,
  ): string => {
    const fecha = new Date(fechaInicio);
    fecha.setMonth(fecha.getMonth() + plazoMeses);
    return new Date(fecha).toLocaleDateString('es-ES'); // Devuelve la fecha en formato YYYY-MM-DD
  };

  return (
    <Layout title="Operaciones">
      <Container mt={20}>
        <DialogRoot>
          <ModalButton label="Crear Operacion">
            <CrearOperacion onSubmit={handleCreate} />
          </ModalButton>
          <Box style={{ position: 'sticky', top: 30, overflow: 'auto' }}>
            {selectedOperacion && (
              <ModificarOperacion
                key={selectedOperacion.operacionID}
                item={selectedOperacion}
                onSubmit={handleUpdate}
              />
            )}
          </Box>
          <Table.Root>
            <Table.Header>
              <Table.Row bgColor="black">
                <Table.ColumnHeader textAlign="center" color="white">
                  Codigo
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center" color="white">
                  Identificacion
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center" color="white">
                  Nombre
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center" color="white">
                  Tipo de Credito
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center" color="white">
                  Monto
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center" color="white">
                  Fecha de Inicio
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center" color="white">
                  Plazo en Meses
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center" color="white">
                  Fecha Final
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center" color="white">
                  Aprobado
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center" color="white">
                  Fecha de Registro
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center" color="white">
                  Acciones
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {operaciones?.map((item) => (
                <Table.Row key={item.operacionID}>
                  <Table.Cell>{item.operacionID}</Table.Cell>
                  <Table.Cell>{item.identificacion}</Table.Cell>
                  <Table.Cell>{item.nombre}</Table.Cell>
                  <Table.Cell>{item.tipoCreditoNavigation.nombre}</Table.Cell>
                  <Table.Cell>{item.monto}</Table.Cell>
                  <Table.Cell>
                    {new Date(item.fechaInicio).toLocaleDateString('es-ES')}
                  </Table.Cell>
                  <Table.Cell>{item.plazoMeses}</Table.Cell>
                  <Table.Cell>
                    {calcularFechaFinal(
                      new Date(item.fechaInicio),
                      item.plazoMeses,
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {item.aprobado === true ? 'SI' : 'NO'}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(item.fechaRegistro).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false, // Usa formato de 24 horas
                    })}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      bgColor="red.500"
                      onClick={() => handleDelete(item.operacionID)}
                    >
                      Eliminar
                    </Button>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedOperacion(item)}>
                        Modificar
                      </Button>
                    </DialogTrigger>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </DialogRoot>
      </Container>
    </Layout>
  );
};
