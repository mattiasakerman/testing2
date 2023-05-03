import mockData from "infrastructure/data.json";
import { createContext, useContext, useMemo, useState } from "react";

const MockDataContext = createContext("mockDataContext");

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (!context) {
    throw new Error(`useMockData must be used within a MockDataContext`);
  }
  return context;
};

/**
 * Mocks data for application. After integration with API can be removed.
 */
export const MockDataProvider = (props) => {
  const [data, setData] = useState(mockData);

  const value = useMemo(
    () => ({
      data,
      setData,
    }),
    [data]
  );
  return <MockDataContext.Provider value={value} {...props} />;
};
