'use client';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, useAppDispatch } from '.';
const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default AppProvider;
