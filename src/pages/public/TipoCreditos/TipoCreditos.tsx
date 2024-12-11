import {
  CrearTipoCredito,
  Layout,
  ModalButton,
  ModificarTipoCredito,
  TipoCreditoValues,
} from '@/components';
import { useModalContext } from '@/context';
import { useApi } from '@/hooks';
import { EmptyTipoCredito, TipoCredito } from '@/models';
import {
  crearTipoCredito,
  deleteTipoCredito,
  getTipoCreditos,
  modificarTipoCredito,
} from '@/services';
import {
  Button,
  Center,
  DialogRoot,
  DialogTrigger,
  Spinner,
  Table,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

interface ModificarProps {
  codigo: string;
  data: Partial<TipoCredito>;
}

export const TipoCreditos = () => {
  const [tipoCreditos, setTipoCreditos] = useState<TipoCredito[]>([]);
  const [selectedCredito, setSelectedCredito] = useState<TipoCredito | null>(
    null,
  );
  const { loading, error, data, fetch } = useApi<TipoCredito[], number>(
    getTipoCreditos,
    { autoFetch: true, params: 0 },
  );

  const {
    loading: deleting,
    error: deleteError,
    fetch: executeDelete,
  } = useApi<void, string>(deleteTipoCredito, { params: '' });

  const {
    loading: modifcando,
    error: modificandoError,
    fetch: executeModificar,
  } = useApi<void, ModificarProps>(modificarTipoCredito, {
    params: { codigo: '', data: EmptyTipoCredito },
  });

  const {
    loading: creando,
    data: dataCrear,
    error: creandoError,
    fetch: executeCrear,
  } = useApi<TipoCredito, TipoCredito>(crearTipoCredito, {
    params: EmptyTipoCredito,
  });

  useEffect(() => {
    if (data) setTipoCreditos(data);

    if (dataCrear) {
      setTipoCreditos((prev) => [...prev, dataCrear]);
    }
  }, [data, dataCrear]);

  if (loading || deleting || modifcando) {
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

  const handleDelete = (codigo: string) => {
    try {
      executeDelete(codigo);
      setTipoCreditos((prev) => prev.filter((item) => item.codigo !== codigo));
    } catch (err) {
      alert(err);
    }
  };

  const handleUpdate: SubmitHandler<TipoCreditoValues> = (params) => {
    console.log(selectedCredito);
    if (!selectedCredito) return;
    executeModificar({ codigo: selectedCredito.codigo, data: params });
    setTipoCreditos((prev) =>
      prev.map((item) =>
        item.codigo === selectedCredito.codigo ? { ...item, ...params } : item,
      ),
    );
  };

  const handleCreate: SubmitHandler<TipoCreditoValues> = (params) => {
    executeCrear(params);
    fetch(0);
  };

  return (
    <Layout title="Tipo Creditos">
      <DialogRoot>
        <Center minHeight="100svh" flexDirection="column">
          <ModalButton label="Crear Tipo Credito">
            <CrearTipoCredito onSubmit={handleCreate} />
          </ModalButton>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Codigo</Table.ColumnHeader>
                <Table.ColumnHeader>Nombre</Table.ColumnHeader>
                <Table.ColumnHeader>Acciones</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tipoCreditos?.map((item) => (
                <Table.Row key={item.codigo}>
                  <Table.Cell>{item.codigo}</Table.Cell>
                  <Table.Cell>{item.nombre}</Table.Cell>
                  <Table.Cell>
                    <Button
                      bgColor="red.500"
                      onClick={() => handleDelete(item.codigo)}
                    >
                      Eliminar
                    </Button>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedCredito(item)}>
                        Modificar
                      </Button>
                    </DialogTrigger>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          {selectedCredito && (
            <ModificarTipoCredito
              key={selectedCredito.codigo}
              item={selectedCredito}
              onSubmit={handleUpdate}
            />
          )}
        </Center>
      </DialogRoot>
    </Layout>
  );
};
