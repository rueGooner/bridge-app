import React, { createContext, useContext, useState } from "react";

export interface Dependent {
  firstName: string;
  surname: string;
  schoolName: string;
  dateOfBirth: string;
}

export interface DependentsContextType {
  dependents: Dependent[];
  addDependent: (dependent: Dependent) => void;
  removeDependent: (dependent: Dependent) => void;
}

const DependentsContext = createContext<DependentsContextType | undefined>(
  undefined
);

export const DependentsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [dependents, setDependents] = useState<Dependent[]>([]);

  const addDependent = (dependent: Dependent) => {
    setDependents((prev) => [...prev, dependent]);
  };

  const removeDependent = (dependent: Dependent) => {
    setDependents((prev) => prev.filter((d) => d !== dependent));
  };

  return (
    <DependentsContext.Provider
      value={{ dependents, addDependent, removeDependent }}
    >
      {children}
    </DependentsContext.Provider>
  );
};

export const useDependents = () => useContext(DependentsContext);
