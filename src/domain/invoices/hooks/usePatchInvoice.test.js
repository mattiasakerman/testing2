import { act, renderHook } from "@testing-library/react";
import { MockDataProvider } from "infrastructure/MockDataContext";
import { usePatchInvoice } from "./usePatchInvoice";

const state = [{ id: "A" }, { id: "B" }];

const mockContext = {
  data: state,
  setData: jest.fn((func) => func(state)),
};

const Wrapper = ({ children }) => {
  return <MockDataProvider value={mockContext}>{children}</MockDataProvider>;
};

it("should patch invoice", () => {
  const { result } = renderHook(() => usePatchInvoice(), {
    wrapper: Wrapper,
  });
  act(() => {
    result.current("B", { test: "test" });
  });
  expect(mockContext.setData).toBeCalledTimes(1);
  const stateModifier = mockContext.setData.mock.lastCall[0];
  const newState = stateModifier(mockContext.data);
  expect(newState).toHaveLength(2);
  expect(newState[0]).toEqual(state[0]);
  expect(newState[1]).toEqual({ ...state[1], test: "test" });
});
