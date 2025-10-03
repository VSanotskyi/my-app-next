import React from 'react';
import { LoadingOverlay } from '@mantine/core';

import { useTheme } from '@/context/ThemeContext';

interface IProps {
  isLoading: boolean;
}

const Loader: React.FC<IProps> = ({ isLoading }) => {
  const { getColor } = useTheme();
  return (
    <LoadingOverlay
      overlayProps={{ radius: 'sm', blur: 2, opacity: 0.3 }}
      loaderProps={{ color: `${getColor('primary')}`, type: 'bars' }}
      visible={isLoading}
      zIndex={1000}
    />
  );
};

export default Loader;
