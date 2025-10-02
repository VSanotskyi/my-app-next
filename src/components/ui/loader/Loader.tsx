import React from 'react';
import { LoadingOverlay } from '@mantine/core';

interface IProps {
  isLoading: boolean;
}

const Loader: React.FC<IProps> = ({ isLoading }) => {
  return (
    <LoadingOverlay visible={isLoading} loaderProps={{ children: 'Loading...' }} zIndex={1000} />
  );
};

export default Loader;
