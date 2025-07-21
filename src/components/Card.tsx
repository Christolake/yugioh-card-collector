import { FitText } from "../hooks/useFitText";
import LevelStars from "./LevelStars";
import texture from "../assets/texture.png"; // Import the texture image
import isItPendulum from "../utils/isItPendulum";
import Artwork from "./Artwork";

const isUnityMonster = (frameType: string) =>
  frameType == "unity"
    ? `, conic-gradient(from -90deg, ${frameMap.spell}, ${frameMap.effect} 10deg 65deg, ${frameMap.fusion} 67.5deg 87.5deg, ${frameMap.synchro} 90deg 113deg, ${frameMap.xyz} 115.5deg 170deg, ${frameMap.spell} 180deg 270deg)`
    : "";

const isPendulumMonster = (frameType: string): string => {
  if (frameType.includes("unity")) return "";

  if (!frameType.endsWith("_pendulum")) return "";

  const baseType = frameType.replace("_pendulum", "");

  if (!(baseType in frameMap)) return "";

  const topColor = frameMap[baseType as keyof typeof frameMap];
  const bottomColor = frameMap.spell;

  return `, linear-gradient(to bottom, ${topColor} 40%, ${bottomColor} 60%)`;
};

const getFrameBase = (frameType: string): keyof typeof frameMap => {
  // Si termina en _pendulum, extraemos la parte de antes
  const base = frameType.endsWith("_pendulum")
    ? frameType.replace("_pendulum", "")
    : frameType;

  // Si la parte base existe en el frameMap, la devolvemos
  return base in frameMap ? (base as keyof typeof frameMap) : "unity";
};

const frameMap = {
  normal: "rgb(218,171,31)",
  effect: "rgb(186,98,45)",
  ritual: "rgb(21,105,190)",
  fusion: "rgb(148,0,211)",
  synchro: "rgb(220,220,220)",
  xyz: "rgb(0,10,15)",
  link: "rgb(21,35,190)",
  spell: "rgb(29 150 146)",
  trap: "rgb(212,104,156)",
  dark_synchro: "rgb(40,30,20)",
  unity: "rgb(128,128,128)",
};

type FrameType = keyof typeof frameMap | `${keyof typeof frameMap}_pendulum`;
export type AttributeType = keyof typeof attributeMap;

const attributeMap = {
  LIGHT: {
    kanji: `光`,
    color: `#fbbf24`, // amber-400
  },
  DARK: {
    kanji: `闇`,
    color: `#a855f7`, // purple-400
  },
  WATER: {
    kanji: `水`,
    color: `#38bdf8`, // sky-400
  },
  FIRE: {
    kanji: `炎`,
    color: `#f87171`, // red-400
  },
  EARTH: {
    kanji: `地`,
    color: `#a16207`, // brown-400 (aproximado)
  },
  WIND: {
    kanji: `風`,
    color: `#4ade80`, // green-400
  },
  DIVINE: {
    kanji: `神`,
    color: `#fbbf24`,
  },
  LAUGH: {
    kanji: `笑`,
    color: `#fb923c`, // orange-400
  },
  SPELL: {
    kanji: `魔`,
    color: `#14b8a6`, // teal-400
  },
  TRAP: {
    kanji: `罠`,
    color: `#c084fc`, // purple-400
  },
  SKILL: {
    kanji: `✦`,
    color: `#fde047`, // yellow-400
  },
};

export interface CardProps {
  name: string;
  attributeIcon: AttributeType;
  level: number;
  imageUrl?: string;
  typeLine: string;
  description: string;
  atk: number;
  def: number;
  setCode?: string;
  edition?: string;
  frameType: string;
}

const lightenRgb = (rgbStr: string, amount = 0) => {
  const match = rgbStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) return rgbStr;
  const r = Math.min(255, parseInt(match[1]) + amount);
  const g = Math.min(255, parseInt(match[2]) + amount);
  const b = Math.min(255, parseInt(match[3]) + amount);
  return `rgb(${r},${g},${b})`;
};

const Card: React.FC<CardProps> = ({
  name,
  attributeIcon,
  level,
  imageUrl,
  typeLine,
  description,
  atk,
  def,
  setCode,
  edition,
  frameType,
}) => {
  const baseFrame = getFrameBase(frameType);
  const bgColor = frameMap[baseFrame];
  const borderColor = lightenRgb(frameMap[baseFrame], 30);

  return (
    // ✅ Primera capa: fondo oscuro, sin borde
    <div
      id="border"
      className="w-85 h-124 rounded-md p-3 relative bg-gray-800 flex items-center justify-center"
    >
      {/* ✅ Segunda capa: el frame dinámico */}
      <div
        id="frame"
        className="w-full p-1.5 h-full flex flex-col border-2 justify-between overflow-hidden relative [isolation:isolate]"
        style={{
          backgroundColor: `${
            isItPendulum(frameType) ? frameMap.unity : bgColor
          }`,
          borderColor: `${
            isItPendulum(frameType) ? frameMap.unity : borderColor
          }`,
          borderStyle: "outset",
          backgroundImage: `url(${texture})${isPendulumMonster(
            frameType
          )}${isUnityMonster(frameType)}`,
          backgroundBlendMode: "hard-light",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col">
          <div
            id="header"
            className="flex w-full mx-auto h-9.5 px-0.75 justify-between gap-x-1 items-center border-3"
            style={{
              borderStyle: "outset",
              borderColor: borderColor,
            }}
          >
            <FitText
              id="name"
              text={name}
              className="h-full flex items-center leading-none font-semibold text-2xl [font-variant-caps:small-caps]"
            />
            <div
              id="attribute"
              className="h-full aspect-square rounded-full flex flex-col text-white justify-center items-center"
              style={{
                backgroundColor: attributeMap[attributeIcon].color,
              }}
            >
              <span className="text-[0.5rem] font-bold">{attributeIcon}</span>
              <span className="text-xl -translate-y-1.5">
                {attributeMap[attributeIcon].kanji}
              </span>
            </div>
          </div>

          <div
            id="level/icon"
            className="relative w-full h-7 mx-auto flex justify-center items-center"
          >
            <div className="absolute flex justify-end items-center text-2xl">
              <LevelStars level={level} frameType={frameType} />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-start">

        {/* 🎨 Arte de la Carta */}

        <div className=" h-67 relative flex justify-center w-full">
          <Artwork name={name} frame={frameType} image={imageUrl} />
        </div>
        </div>

          {/* Pie: Set Code & Edición */}

          <div className="flex w-67 justify-between items-center text-[0.5rem] mx-auto text-black">
            <span>{edition}</span>
            <span>{setCode}</span>
          </div>
        <div className="flex flex-col gap-0.5">

          {/* Caja de Texto */}
          <div className="bg-white/75 h-24 border-3 z-10 shadow-[0_0_0.5rem_rgba(0,0,0,1),0_0_0.25rem_rgba(0,0,0,0.1)] border-amber-600 p-0.5 text-[10px] leading-tight overflow-y-auto">
            <p className="font-bold uppercase mb-1">{"[" + typeLine + "]"}</p>
            <p>{description}</p>

            {/* Línea Divisoria */}
            <div className="h-px bg-black my-1 mx-2" />

            {/* ATK / DEF */}
            <div className="flex justify-end items-baseline space-x-4 px-2 text-[12px] font-bold uppercase">
              <span>ATK/{atk}</span>
              <span>DEF/{def}</span>
            </div>
          </div>
          {/*Edition and Copyright*/}
          <div className="flex relative translate-y-0.75 h-2 w-75 justify-between items-center text-[0.5rem] mx-auto text-black">
            <span>0123456789</span>
            <span>{edition}</span>
            <span>©2020 Studio Dice/SHUEISHA, TV TOKYO, KONAMI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
