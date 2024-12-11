import { Button, DialogRoot, DialogTrigger } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  label: string;
  children: ReactNode;
  onHandleClick?: () => void;
}

export const ModalButton = ({
  label,
  children,
  onHandleClick = () => {},
}: Props) => {
  return (
    <DialogRoot scrollBehavior="outside" motionPreset="slide-in-bottom">
      <DialogTrigger asChild>
        <Button onClick={onHandleClick}>{label}</Button>
      </DialogTrigger>
      {children}
    </DialogRoot>
  );
};
