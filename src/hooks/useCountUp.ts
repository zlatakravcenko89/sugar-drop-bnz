import { useEffect, useRef, useState } from 'react';

/** Animated integer count-up driven by a JS interval (no layout props touched). */
export function useCountUp(target: number, duration = 900): number {
  const [value, setValue] = useState(0);
  const frame = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const safeTarget = Number.isFinite(target) ? Math.max(0, target) : 0;
    const steps = 30;
    const stepMs = Math.max(16, Math.round(duration / steps));
    let i = 0;
    setValue(0);

    frame.current = setInterval(() => {
      i += 1;
      const t = Math.min(1, i / steps);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(safeTarget * eased));
      if (t >= 1 && frame.current) {
        clearInterval(frame.current);
        frame.current = null;
      }
    }, stepMs);

    return () => {
      if (frame.current) {
        clearInterval(frame.current);
        frame.current = null;
      }
    };
  }, [target, duration]);

  return value;
}

export default useCountUp;
