import React from "react";

type SpellTrapType =
  | "Equip"
  | "Field"
  | "Ritual"
  | "Quick-Play"
  | "Continuous"
  | "Counter";

interface SpellTrapSymbolProps {
  type: string;
  className?: string;
}

/**
 * Mapping of Spell/Trap subtypes to Unicode glyphs.
 * We choose glyphs that resemble the official Yu-Gi-Oh! symbols.
 */
const symbolMap: Record<SpellTrapType, string> = {
  Equip: "✛",       // Heavy cross
  Field: "✦",       // 4-pointed star / compass
  Ritual: "♨",      // Brazier with fire
  'Quick-Play': "↯",   // Lightning
  Continuous: "∞",  // Infinity
  Counter: "↻"      // Circular arrow
};

export const SpellTrapSymbol: React.FC<SpellTrapSymbolProps> = ({
  type,
  className
}) => {
  return (
    <span
      className={`inline-block text-center text-white font-bold select-none ${className ?? ""}`}
      style={{
        fontFamily: `'Segoe UI Symbol', 'Noto Sans Symbols', 'DejaVu Sans', sans-serif`,
        lineHeight: 1
      }}
    >
      {' '+symbolMap[type]}
    </span>
  );
};
