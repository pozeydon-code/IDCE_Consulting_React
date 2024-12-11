import { Control, Controller, FieldError } from 'react-hook-form';
import { TipoCreditoValues } from '../models/TipoCredito.schema';

interface PropsCrear {
  name: keyof TipoCreditoValues;
  control: Control<TipoCreditoValues>;
  label: string;
  type?: string;
  error?: FieldError;
}

export const TipoCreditoCrearInput = ({
  name,
  control,
  label,
  type,
  error,
}: PropsCrear) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            {...field}
            className={`form-control ${error ? 'is-invalid' : ''}`}
            value={
              type === 'number' && field.value
                ? Number(field.value) || 0
                : field.value || ''
            }
            onChange={(e) =>
              field.onChange(
                type === 'number' ? Number(e.target.value) : e.target.value,
              )
            }
          />
        )}
      />
      {error && <p className="error">{error.message}</p>}
    </>
  );
};

interface PropsModify {
  name: keyof TipoCreditoValues;
  control: Control<TipoCreditoValues>;
  label: string;
  type?: string;
  error?: FieldError;
  value: TipoCreditoValues[keyof TipoCreditoValues];
}

export const TipoCreditoInput = ({
  name,
  control,
  label,
  type,
  error,
  value,
}: PropsModify) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={value}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            {...field}
            className={`form-control ${error ? 'is-invalid' : ''}`}
            value={
              type === 'number' && field.value
                ? Number(field.value) || 0
                : field.value || ''
            }
            onChange={(e) =>
              field.onChange(
                type === 'number' ? Number(e.target.value) : e.target.value,
              )
            }
          />
        )}
      />
      {error && <p className="error">{error.message}</p>}
    </>
  );
};
