import { renderHook } from "@testing-library/react";
import { MockDataProvider } from "infrastructure/MockDataContext";
import { useGetInvoice } from "./useGetInvoice";

const state = [
  { id: "A", test: "A" },
  { id: "B", test: "B" },
];

const mockContext = {
  data: state,
};

const Wrapper = ({ children }) => {
  return <MockDataProvider value={mockContext}>{children}</MockDataProvider>;
};

it("should get invoice", () => {
  const { result } = renderHook(() => useGetInvoice("B"), {
    wrapper: Wrapper,
  });
  expect(result.current).toEqual({ id: "B", test: "B" });
});
