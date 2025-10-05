import React from 'react';
import { LoadingOverlay } from '@mantine/core';

interface IProps {
  isLoading: boolean;
}

const Loader: React.FC<IProps> = ({ isLoading }) => {
  return (
    <LoadingOverlay
      overlayProps={{ radius: 'sm', blur: 2, opacity: 0.3 }}
      loaderProps={{ color: 'blue', type: 'bars' }}
      visible={isLoading}
      zIndex={1000}
    />
  );
};

export default Loader;
