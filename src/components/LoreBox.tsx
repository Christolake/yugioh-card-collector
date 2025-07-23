import isItPendulum from "../utils/isItPendulum";

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
    const pBoxSize =  description.length<150?'h-10':'h15'

  return (
    <div className="flex flex-col relative z-10 shadow-[0_0_0.5rem_rgba(0,0,0,1),0_0_0.25rem_rgba(0,0,0,0.1)]">
      {/*Caja de Pendulo */}
        
      { pendulum && (
        <div 
        className={`${pBoxSize} w-full border-3 border-b-0 bg-white/80 border-gray-600 absolute flex justify-between top-0 -translate-y-full`}
        >
        <div id="scale-left" className="flex w-7 flex-col items-center justify-around border-gray-600 border-r-3">
        <span>🔵</span>
        <span>1</span>
        </div>
        <div id="pendulum-lore"></div>
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
          <p className="font-bold uppercase mb-1">{"[" + typeLine + "]"}</p>
          <p>{description}</p>
        </div>
        { atk && (

            <div>
          
          <div className="h-0.25 bg-black" />

          {/* ATK / DEF */}
          <div className="flex justify-end gap-1 text-xs font-bold uppercase">
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
