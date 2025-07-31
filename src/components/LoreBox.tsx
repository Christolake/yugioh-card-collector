import isItPendulum from "../utils/isItPendulum";
import { FitText } from "../hooks/useFitText";
import { FitTextMultiline } from "./FitTextMultiline";

const LoreBox = ({
  description,
  typeline,
  atk,
  def,
  scale,
  linkval,
  linkmarkers,
  frameType,
}: {
  description: string;
  typeline: string[];
  atk?: number;
  def?: number;
  scale?: number;
  linkval?: number;
  linkmarkers?: string[];
  frameType: string;
}) => {
  console.log(scale);
  const pendulum = isItPendulum(frameType);
  const borderColor = pendulum ? "border-gray-600" : "border-amber-600";

  const cleanText = (description ?? "").replace(/\r\n/g, "\n");

  let pendulumPart = "";
  let monsterPart = cleanText;

  if (pendulum) {
    [pendulumPart, monsterPart] = (cleanText.split(/\n\n(.+)/s) ?? [])
      .slice(0, 2)
      .map((p) => (p ?? "").replace(/^\[[^\]]*Effect\s*\]\s*/i, ""));
  }

  const monsterText = monsterPart ?? "";
  const lines = monsterText.split("\n");

  const firstLine =
    lines.length > 1 ? lines[0] : monsterText.includes("+") ? monsterText : "";

  const restLines =
    lines.length > 1
      ? lines.slice(1).join("\n")
      : monsterText.includes("+")
      ? ""
      : monsterText;

  const pBoxSize = pendulumPart.length < 150 ? "h-10" : "h-15";

  const totalLength = (firstLine + restLines).length;

  let textSizeClass = "";

  switch (true) {
  case totalLength > 650:
    textSizeClass = "text-[0.625rem]/2.25 font-stretch-condensed tracking-[0.0165rem]";
    break;
    case totalLength > 580:
    textSizeClass = "text-[0.575rem]/2.25 font-stretch-semi-condensed tracking-none";
    break;
    case totalLength > 530:
    textSizeClass = "text-[0.56rem]/2.25 font-stretch-semi-condensed tracking-none";
    break;
  case totalLength > 480:
    textSizeClass = "text-[0.625rem]/2.5 font-stretch-semi-condensed tracking-none";
    break;
  default:
    textSizeClass = "text-[0.625rem]/2.5 [font-weight:300]";
    break;
}


  return (
    <div className="flex flex-col relative z-10 shadow-[0_0_0.5rem_rgba(0,0,0,1),0_0_0.25rem_rgba(0,0,0,0.1)]">
      {/*Caja de Pendulo */}
      {pendulum && (
        <div
          className={`${pBoxSize} overflow-hidden w-full border-3 border-b-0 bg-white/80 border-gray-600 absolute flex justify-between top-0 -translate-y-full`}
        >
          <div
            id="scale-left"
            className="flex w-7 flex-col items-center justify-center border-gray-600 border-r-3"
          >
            <span className="leading-none">🔵</span>
            <span className="leading-none font-bold [font-variant-caps:small-caps]">
              {scale ?? ""}
            </span>
          </div>
          <div id="pendulum-lore">
            {/* <p className="text-justify p-0.5 leading-[0.68rem]">{pendulumPart}</p> */}
            <p
              className={`text-justify [text-justify:inter-character]  p-[0.1rem] px-1 leading-[0.676rem] 
            ${
              pendulumPart.length > 300
                ? "font-stretch-condensed tracking-wider text-[0.676rem]"
                : pendulumPart.length > 200
                ? "text-[0.575rem]"
                : "text-[0.67rem]"
            }`}
            >
              {pendulumPart}
            </p>
          </div>
          <div
            id="scale-right"
            className="flex w-7 flex-col items-center justify-center border-gray-600 border-l-3"
          >
            <span className="leading-none">🔴</span>
            <span className="leading-none font-bold [font-variant-caps:small-caps]">
              {scale ?? ""}
            </span>
          </div>
        </div>
      )}

      {/* Caja de Texto */}
      <div
        className={`bg-white/80 h-26 border-3
            ${borderColor} p-0.5 px-1 text-[10px] overflow-y-auto
            flex flex-col`}
      >
        {typeline && (
          <FitText
            text={"[ " + typeline.join(" / ") + " ]"}
            className="text-[0.8rem] p-0 m-0 font-bold [font-variant-caps:small-caps]"
          />
        )}
        <div className="flex flex-col flex-grow text-[0.754rem]">
          <p
            className={`text-justify font-normal [text-justify:inter-character]
            ${textSizeClass}`}
          >
            {firstLine && <FitText text={firstLine} className="font-stretch-normal tracking-normal" />}
            {restLines.trim()}
          </p>
        </div>
        {atk !== undefined && (
          <div>
            <div className="h-0.25 bg-black" />
            <div className="flex justify-end gap-1 text-xs [font-variant-caps:small-caps] font-bold">
              <span>ATK/{atk}</span>
              <span>DEF/{def}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoreBox;
