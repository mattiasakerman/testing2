import { act, renderHook } from "@testing-library/react";
import { MockDataProvider } from "infrastructure/MockDataContext";
import { useDeleteInvoice } from "./useDeleteInvoice";

const state = [{ id: "A" }, { id: "B" }];

const mockContext = {
  data: state,
  setData: jest.fn((func) => func(state)),
};

const Wrapper = ({ children }) => {
  return <MockDataProvider value={mockContext}>{children}</MockDataProvider>;
};

it("should delete invoice", () => {
  const { result } = renderHook(() => useDeleteInvoice(), {
    wrapper: Wrapper,
  });
  act(() => {
    result.current("A");
  });
  expect(mockContext.setData).toBeCalledTimes(1);
  const stateModifier = mockContext.setData.mock.lastCall[0];
  const newState = stateModifier(mockContext.data);
  expect(newState).toHaveLength(1);
  expect(newState[0]).toEqual(state[1]);
});
