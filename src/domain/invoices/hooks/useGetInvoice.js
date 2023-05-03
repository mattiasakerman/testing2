import { useMockData } from "infrastructure/MockDataContext";
import { useMemo } from "react";

/**
 * Mocks invoice GET request
 * @param {*} invoiceId
 * @returns invoice
 */
export const useGetInvoice = (invoiceId) => {
  const { data } = useMockData();
  const invoice = useMemo(
    () => data.find((invoice) => invoiceId === invoice.id),
    [data, invoiceId]
  );
  return invoice;
};
