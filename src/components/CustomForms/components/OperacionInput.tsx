import { Control, Controller, FieldError } from 'react-hook-form';
import { CreateOperacionValues, ModificacionOperacionValues } from '../models';
import { register } from 'module';

interface PropsCreacion {
  name: keyof CreateOperacionValues;
  control: Control<CreateOperacionValues>;
  label: string;
  type?: string;
  error?: FieldError;
}

export const OperacionCreacionInput = ({
  name,
  control,
  label,
  type,
  error,
}: PropsCreacion) => {
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
              typeof field.value === 'string' ||
              typeof field.value === 'number' ||
              field.value === undefined
                ? field.value
                : ''
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

interface PropsModificacion {
  name: keyof ModificacionOperacionValues;
  control: Control<ModificacionOperacionValues>;
  label: string;
  type?: string;
  error?: FieldError;
  value: ModificacionOperacionValues[keyof ModificacionOperacionValues];
}

export const OperacionModificacionInput = ({
  name,
  control,
  label,
  type,
  error,
  value,
}: PropsModificacion) => {
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
            value={
              typeof field.value === 'string' ||
              typeof field.value === 'number' ||
              field.value === undefined
                ? field.value
                : ''
            }
            onChange={(e) =>
              field.onChange(
                type === 'number' ? Number(e.target.value) : e.target.value,
              )
            }
            className={`form-control ${error ? 'is-invalid' : ''}`}
          />
        )}
      />
      {error && <p className="error">{error.message}</p>}
    </>
  );
};
