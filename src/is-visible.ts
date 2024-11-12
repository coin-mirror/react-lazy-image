import { useEffect, useState } from "react";

export function useIsVisable(
  ref: React.RefObject<HTMLElement | null>,
  rootMargin = "0px",
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIntersecting(true),
      { rootMargin },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}
