import { act, renderHook } from "@testing-library/react";
import { useModal } from "./useModal";

it("should be closed by default", () => {
  const { result } = renderHook(() => useModal());
  expect(result.current.isOpen).toBeFalsy();
});

it("should use default value when initializing", () => {
  const { result } = renderHook(() => useModal(true));
  expect(result.current.isOpen).toBeTruthy();
});

it("should use own state", () => {
  const { result, rerender } = renderHook(() => useModal(false));
  expect(result.current.isOpen).toBeFalsy();
  rerender(true);
  expect(result.current.isOpen).toBeFalsy();
});

it("should change state to open", () => {
  const { result } = renderHook(() => useModal());
  expect(result.current.isOpen).toBeFalsy();
  act(() => {
    result.current.open();
  });
  expect(result.current.isOpen).toBeTruthy();
});

it("should change state to closed", () => {
  const { result } = renderHook(() => useModal(true));
  expect(result.current.isOpen).toBeTruthy();
  act(() => {
    result.current.close();
  });
  expect(result.current.isOpen).toBeFalsy();
});
