import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { getTheme } from '../utils/theme';

export const useTheme = () => {
  const themeMode = useAppStore((state) => state.themeMode);

  return useMemo(() => getTheme(themeMode === 'dark'), [themeMode]);
};

