import { useEffect, useRef, useState } from "react";

const useEllipsisTooltip = (text) => {
  const textRef = useRef(null);
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      const isOverflowing = element.offsetWidth < element.scrollWidth;
      setIsEllipsisActive(isOverflowing);
    }
  }, [text]);

  return { textRef, isEllipsisActive };
};

export default useEllipsisTooltip;
