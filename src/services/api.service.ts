import { Operacion, TipoCredito } from "@/models";
import { UseApiCall } from "@/models/useApi.model";
import { loadAbort } from "@/utilities";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASEURL;

export const getTipoCreditos = (): UseApiCall<TipoCredito[]> => {
  const controller = loadAbort();

  return {
    call: axios.get<TipoCredito[]>(`${BASE_URL}/TipoCreditos/GetAll`, { signal: controller.signal }),
    controller
  }
}

export const deleteTipoCredito = (codigo: string): UseApiCall<void> => {
  const controller = loadAbort();
  return {
    call: axios.delete(`${BASE_URL}/TipoCreditos/Delete/${codigo}`, { signal: controller.signal }),
    controller
  }
}

interface ModificarProps {
  codigo: string;
  data: Partial<TipoCredito>;
}
export const modificarTipoCredito = ({ codigo, data }: ModificarProps): UseApiCall<void> => {
  const controller = loadAbort();
  return {
    call: axios.put(`${BASE_URL}/TipoCreditos/Modificar/${codigo}`, data, { signal: controller.signal }),
    controller
  }
}

export const crearTipoCredito = (data: Partial<TipoCredito>): UseApiCall<TipoCredito> => {
  const controller = loadAbort();
  return {
    call: axios.post<TipoCredito>(`${BASE_URL}/TipoCreditos/Crear`, data, { signal: controller.signal }),
    controller
  }
}

export const getOperaciones = (): UseApiCall<Operacion[]> => {
  const controller = loadAbort();

  return {
    call: axios.get<Operacion[]>(`${BASE_URL}/Operaciones/GetAll`, { signal: controller.signal }),
    controller
  }
}

export const deleteOperacion = (id: number): UseApiCall<void> => {
  const controller = loadAbort();
  return {
    call: axios.delete(`${BASE_URL}/Operaciones/Delete/${id}`, { signal: controller.signal }),
    controller
  }
}

interface ModificarOperacionProps {
  id: number;
  data: Partial<Operacion>;
}
export const modificarOperacion = ({ id, data }: ModificarOperacionProps): UseApiCall<void> => {
  const controller = loadAbort();
  return {
    call: axios.put(`${BASE_URL}/Operaciones/Modificar/${id}`, data, { signal: controller.signal }),
    controller
  }
}

export const crearOperacion = (data: Partial<Operacion>): UseApiCall<Operacion> => {
  const controller = loadAbort();
  return {
    call: axios.post<Operacion>(`${BASE_URL}/Operaciones/Crear`, data, { signal: controller.signal }),
    controller
  }
}
