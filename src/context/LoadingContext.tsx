import React, { createContext, useState } from 'react';

interface LoadingContextData {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextData>({
  loading: false,
  setLoading: () => {},
});

interface Props {
  children: React.ReactNode;
}

const LoadingProvider: React.FC<Props> = ({ children }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
