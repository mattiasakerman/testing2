import { useMockData } from "infrastructure/MockDataContext";
import { useCallback } from "react";

/**
 * Mocks invoice PATCH request
 * @returns function to mutate data
 */
export const usePatchInvoice = () => {
  const { data, setData } = useMockData();

  const patchInvoice = useCallback(
    (id, patch) => {
      const index = data.findIndex((invoice) => id === invoice.id);
      // this would be a PATCH request
      setData((state) => {
        state.splice(index, 1, {
          ...state[index],
          ...patch,
        });
        return [...state];
      });
    },
    [data, setData]
  );

  return patchInvoice;
};
