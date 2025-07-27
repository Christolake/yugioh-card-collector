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
  linkmarkers?: string[]
  frameType: string;
}) => {
  console.log(scale)
  const pendulum = isItPendulum(frameType);
  const borderColor = pendulum ? 'border-gray-600' : 'border-amber-600';

  const cleanText = (description ?? '').replace(/\r\n/g, '\n');

  let pendulumPart = '';
  let monsterPart = cleanText;

  if (pendulum) {
    [pendulumPart, monsterPart] = (cleanText.split(/\n\n(.+)/s) ?? [])
      .slice(0, 2)
      .map(p => (p ?? '').replace(/^\[[^\]]*Effect\s*\]\s*/i, ''));
  }

const monsterText = monsterPart ?? '';
const lines = monsterText.split('\n');

const firstLine = lines.length > 1
  ? lines[0]
  : monsterText.includes('+') ? monsterText : '';

const restLines = lines.length > 1
  ? lines.slice(1).join('\n')
  : monsterText.includes('+') ? '' : monsterText;


  const pBoxSize = pendulumPart.length < 150 ? 'h-10' : 'h-15';

  return (
    <div className="flex flex-col relative z-10 shadow-[0_0_0.5rem_rgba(0,0,0,1),0_0_0.25rem_rgba(0,0,0,0.1)]">
      {/*Caja de Pendulo */}
      { pendulum && (
        <div 
        className={`${pBoxSize} overflow-hidden w-full border-3 border-b-0 bg-white/80 border-gray-600 absolute flex justify-between top-0 -translate-y-full`}
        >
        <div id="scale-left" className="flex w-7 flex-col items-center justify-center border-gray-600 border-r-3">
        <span className="leading-none">🔵</span>
        <span className="leading-none font-bold [font-variant-caps:small-caps]">{scale ?? ''}</span>
        </div>
        <div id="pendulum-lore" className="text-[0.72rem]">
          {/* <p className="text-justify p-0.5 leading-[0.68rem]">{pendulumPart}</p> */}
        <FitTextMultiline 
          text={pendulumPart}
          maxLines={5}
          className="text-justify p-0.5 leading-[0.66rem]"
        />
        
        </div>
        <div id="scale-right" className="flex w-7 flex-col items-center justify-center border-gray-600 border-l-3">
            <span className="leading-none">🔴</span>
            <span className="leading-none font-bold [font-variant-caps:small-caps]">{scale ?? ''}</span>
        </div>
        </div>
      ) }
      
      {/* Caja de Texto */}
      <div
        className={`bg-white/80 h-26 border-3
            ${borderColor} p-0.5 text-[10px] leading-tight overflow-y-auto
            flex flex-col`}
      >
        <div className="flex flex-col flex-grow text-[0.6rem]">
          {typeline && (<FitText text={'[ '+ typeline.join(' / ') + ' ]'} className="text-[0.75rem] p-0 m-0 leadin-none font-bold [font-variant-caps:small-caps]" />)}
          {firstLine && <FitText text={firstLine} className="leading-none whitespace-pre-line" />}
          {/* <p className="whitespace-pre-line text-justify">{restLines.trim()}</p> */}
          <FitTextMultiline 
          text={restLines.trim()}
          maxLines={6}
          className="text-justify leading-[0.66rem]"
          />
        </div>
        {atk !== undefined && (
    <div className="mt-1">
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
