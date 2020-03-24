import React, { useState, useEffect, useRef, EffectCallback } from "react";
// https://dev.to/droopytersen/usedebouncedeffect-hook-4204
export function useDebouncedEffect<T>(
  effectFn: (debouncedValue: T) => void | (() => void),
  value: T,
  delay: number
) {
  let effectRef = useRef(effectFn);
  let updatedValue = useDebouncedValue(value, delay);
  useEffect(() => {
    if (effectRef.current) {
      return effectRef.current(updatedValue);
    }
  }, [updatedValue]);
}

export function useDebouncedValue(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Update state to the passed in value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      // If our value changes (or the component unmounts), React will
      // run this cleanup function to cancel the state update.
      clearTimeout(handler);
    };
    // These are the dependencies, if the value or the delay amount
    // changes, then cancel any existing timeout and start waiting again
  }, [value, delay]);

  return debouncedValue;
}

export default useDebouncedValue;
