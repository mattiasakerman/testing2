import { useMockData } from "infrastructure/MockDataContext";

/**
 * Mocks invoices GET request
 * @returns invoices
 */
export const useListInvoices = () => {
  const { data } = useMockData();
  return data;
};
