import { useMockData } from "infrastructure/MockDataContext";
import { useCallback } from "react";
import { generateInvoiceId } from "../utils";

/**
 * Mocks invoice POST request
 * @returns function to mutate data
 */
export const usePostInvoice = () => {
  const { data, setData } = useMockData();

  const postInvoice = useCallback(
    (newInvoice) => {
      // generate unique id
      let index = -1;
      let newId;
      do {
        newId = generateInvoiceId();
        // eslint-disable-next-line no-loop-func
        index = data.findIndex((invoice) => invoice.id === newId);
      } while (index > -1);

      // this would be a POST request
      setData((state) => [
        ...state,
        {
          ...newInvoice,
          id: newId,
        },
      ]);
    },
    [data, setData]
  );

  return postInvoice;
};
