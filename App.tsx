import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContext } from './context/authContext';
import globalStyles from './globalStyles';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

globalStyles();

export default function App() {
  const [token, setToken] = useState("");
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext.Provider value={{token, setToken}}>
          <Navigation colorScheme={colorScheme} />
        </AuthContext.Provider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
