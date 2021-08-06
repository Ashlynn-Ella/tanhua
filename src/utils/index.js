import { useState, useEffect } from "react";

export const useThrottle = (value, delay) => {
  const [throttleVale, setThrottleValue] = useState(0);
  let time = null
  useEffect(() => {
    if (time) return
    time = setTimeout(() => {
      setThrottleValue(value)
    }, delay)
    return () => time = null
  }, [value, delay])
  return throttleVale
}
