import { RoutesWithNotFound } from "@/components"
import { AppRoutes } from "@/models"
import { Navigate, Route } from "react-router-dom"
import { Dashboard, Operaciones, TipoCreditos } from "."

export const PublicRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={AppRoutes.public.dashboard} replace />} />
      <Route path={AppRoutes.public.dashboard} element={<Dashboard />} />
      <Route path={AppRoutes.public.mantenimiento_operaciones} element={<Operaciones />} />
      <Route path={AppRoutes.public.mantenimiento_tipo_credito} element={<TipoCreditos />} />
    </RoutesWithNotFound>
  )
}
