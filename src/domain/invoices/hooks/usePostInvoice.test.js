import { act, renderHook } from "@testing-library/react";
import { MockDataProvider } from "infrastructure/MockDataContext";
import { usePostInvoice } from "./usePostInvoice";

const mockContext = {
  data: [],
  setData: jest.fn((func) => func([])),
};

const Wrapper = ({ children }) => {
  return <MockDataProvider value={mockContext}>{children}</MockDataProvider>;
};

it("should add new invoice", () => {
  const { result } = renderHook(() => usePostInvoice(), {
    wrapper: Wrapper,
  });
  act(() => {
    result.current({ test: "test" });
  });
  expect(mockContext.setData).toBeCalledTimes(1);
  const stateModifier = mockContext.setData.mock.lastCall[0];
  const state = stateModifier(mockContext.data);
  expect(state).toHaveLength(1);
  expect(state[0].test).toEqual("test");
  expect(state[0]).toHaveProperty("id");
});
