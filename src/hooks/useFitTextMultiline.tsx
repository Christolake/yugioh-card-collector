import React from "react";

interface FitTextMultilineProps {
  text: string;
  className?: string;
  id?: string;
}

export const FitTextMultiline: React.FC<FitTextMultilineProps> = ({
  text,
  className,
  id,
}) => {
  return (
    <div className={className ?? ""} id={id}>
      {text.split("").map((char, i) => (
        <span key={i}>{char === " " ? "\u00A0" : char}</span>
      ))}
    </div>
  );
};
