import type { AttributeType } from "./AttributeType";

export interface CardProps {
  id?: number,
  name: string;
  type: string;
  typeline: string[];
  frameType: string;
  desc: string;
  race: string;
  atk?: number;
  def?: number;
  level?: number;
  attribute: AttributeType;
  linkval?: number;
  linkmarkers?: string[];
  scale?: number;
  imageUrl?: string;
  setCode?: string;
  edition?: string;
}