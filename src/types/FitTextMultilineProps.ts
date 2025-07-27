export interface FitTextMultilineProps {
  text: string;
  maxLines: number;         // Maximum number of lines allowed
  className?: string;       // Optional Tailwind classes
  id?: string;              // Optional element id
  lineHeight?: number;      // Optional line-height multiplier (default 1.2)
}