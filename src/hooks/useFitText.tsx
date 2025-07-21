import React, { useLayoutEffect, useRef, useState } from 'react';

interface FitTextProps {
  text: string;
  // opcional: clases Tailwind para contenedor
  className?: string;
  id?: string;
}

export const FitText: React.FC<FitTextProps> = ({ text, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // función que mide y ajusta el scaleX
  const fit = () => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const parentWidth = parent.clientWidth;
    const textWidth = el.scrollWidth;
    // calculamos escala horizontal
    const newScale = parentWidth / textWidth;
    setScale(newScale < 1 ? newScale : 1);
  };

  // cada vez que cambie el texto, recalculamos
  useLayoutEffect(() => {
    fit();
  }, [text]);

  // y al redimensionar ventana
  useLayoutEffect(() => {
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <div className={`${className ?? ''} w-full h-6 overflow-hidden flex items-center`}>
      <div
        ref={ref}
        className="whitespace-nowrap origin-left transform -translate-y-0.5 leading-none"
        style={{
          transform: `scaleX(${scale})`,
          transformOrigin: 'left',
        }}
      >
        {text}
      </div>
    </div>
  );
};
