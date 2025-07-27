import isItPendulum from "../utils/isItPendulum";
import { FitText } from "../hooks/useFitText";

const LoreBox = ({
  description,
  typeLine,
  atk,
  def,
  frameType,
}: {
  description: string;
  typeLine: string;
  atk?: number;
  def?: number;
  frameType: string;
}) => {
    const pendulum = isItPendulum(frameType)
    const borderColor = pendulum ? 'border-gray-600' : 'border-amber-600';
   
    const cleanText = description.replace(/\r\n/g, '\n');
    const [pendulumPart, monsterPart] = cleanText.split(/\n\n(.+)/s) ?? [];
    const monsterLines = (monsterPart ?? '').split('\n');
  const firstLine = monsterLines[0];
  const restLines = monsterLines.slice(1).join('\n');
    const pBoxSize =  pendulumPart.length<150?'h-10':'h15'


  return (
    <div className="flex flex-col relative z-10 shadow-[0_0_0.5rem_rgba(0,0,0,1),0_0_0.25rem_rgba(0,0,0,0.1)]">
      {/*Caja de Pendulo */}
        
      { pendulum && (
        <div 
        className={`${pBoxSize} overflow-hidden w-full border-3 border-b-0 bg-white/80 border-gray-600 absolute flex justify-between top-0 -translate-y-full`}
        >
        <div id="scale-left" className="flex w-7 flex-col items-center justify-around border-gray-600 border-r-3">
        <span>🔵</span>
        <span>1</span>
        </div>
        <div id="pendulum-lore" className="text-[0.5rem]">
          <p>{pendulumPart}</p>
        </div>
        <div id="scale-right" className="flex w-7 flex-col items-center justify-around border-gray-600 border-l-3">
            <span>🔴</span>
            <span>1</span>
        </div>
        </div>
      ) }
      
      {/* Caja de Texto */}
      <div
        className={`bg-white/80 h-26 border-3
            ${borderColor} p-0.5 text-[10px] leading-tight overflow-y-auto
            flex flex-col justify-between`}
      >
        <div>
          <FitText text={'['+ typeLine + ']'} className="text-[0.75rem] font-medium [font-variant-caps:small-caps]" />
          <FitText text={firstLine} className="text-[0.75rem] whitespace-pre-line font-medium" />
          <p className="whitespace-pre-line">{restLines.trim()}</p>
        </div>
        { atk && (

            <div>
          
          <div className="h-0.25 bg-black" />

          {/* ATK / DEF */}
          <div className="flex justify-end gap-1 text-xs [font-variant-caps:small-caps] font-bold">
            <span>ATK/{atk}</span>
            <span>DEF/{def}</span>
            <div></div>
          </div>
        </div>
        )

        }
      </div>
    </div>
  );
};

export default LoreBox;
