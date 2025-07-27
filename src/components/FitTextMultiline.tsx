import React, { useLayoutEffect, useRef, useState } from "react";

interface FitTextMultilineProps {
  text: string;
  maxLines?: number;
  className?: string;
  id?: string;
  minStretch?: number; // 50 = 50%
}

export const FitTextMultiline: React.FC<FitTextMultilineProps> = ({
  text,
  maxLines = 5,
  className,
  id,
  minStretch = 50,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [stretch, setStretch] = useState(100); // % inicial

  const fitText = () => {
    const el = ref.current;
    if (!el) return;

    const style = getComputedStyle(el);
    const lineHeight = parseFloat(style.lineHeight || "0");
    const maxHeight = lineHeight * maxLines;

    let currentStretch = 100;

    while (el.scrollHeight > maxHeight && currentStretch > minStretch) {
      currentStretch -= 1;
      el.style.fontStretch = `${currentStretch}%`;
    }

    setStretch(currentStretch);
  };

  useLayoutEffect(() => {
    fitText();
  }, [text, maxLines, minStretch]);

  useLayoutEffect(() => {
    window.addEventListener("resize", fitText);
    return () => window.removeEventListener("resize", fitText);
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`${className ?? ""} w-full`}
      style={{ fontStretch: `${stretch}%` }}
    >
      {text}
    </div>
  );
};
