import { useEffect } from "react";

function useObserver(targetRef, callback, hold = 0.1) {
  useEffect(() => {
    if (!targetRef.current) return; // Ensure ref is valid

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        callback(entry.isIntersecting); // Call the provided callback with isIntersecting value
      },
      { threshold: hold, root: null }
    );

    const target = targetRef.current;
    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target); // Cleanup safely
    };
  }, [targetRef, callback, hold]); // Dependency array

  return null; // Hook does not render anything
}

export default useObserver;
