"use client"
import React, { createContext, useContext } from 'react';

// Define the shape of the dictionary and context
type DictionaryContextType = Record<string, string> | null;

const DictionaryContext = createContext<DictionaryContextType>(null);

export const DictionaryProvider = ({
  dictionary,
  children,
}: {
  dictionary: DictionaryContextType;
  children: React.ReactNode;
}) => {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
};

export const useDictionary = () => {
  const context = useContext(DictionaryContext);
  if (context === null) {
    throw new Error(
      'useDictionary must be used within a DictionaryProvider'
    );
  }
  return context;
};
