import { useMockData } from "infrastructure/MockDataContext";
import { useCallback } from "react";

/**
 * Mocks invoice DELETE request
 * @returns function to mutate data
 */
export const useDeleteInvoice = () => {
  const { setData } = useMockData();

  const deleteInvoice = useCallback(
    (id) => {
      // this would be a DELETE request
      setData((state) => {
        return state.filter((invoice) => id !== invoice.id);
      });
    },
    [setData]
  );

  return deleteInvoice;
};
