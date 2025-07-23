import isItPendulum from "../utils/isItPendulum"
import type { CSSProperties } from "react";

const Artwork = ({name, frame, image}:{name:string, frame:string, image:string|undefined}) => {

  const isPendulum = isItPendulum(frame);

  const getBorderStyles = (): CSSProperties => {
    if (isPendulum) {
      return {
        borderTopStyle: "outset",
        borderLeftStyle: "outset",
        borderRightStyle: "outset",
        borderBottomStyle: "none",
        WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
    maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
      };
    }
    return {
      borderStyle: "outset",
    };
  };

    

    return (
        <div className={`shadow-[0_0_0.5rem_rgba(0,0,0,1),0_0_0.5rem_rgba(0,0,0,0.8),0_0_1rem_rgba(0,0,0,0.5)]
        absolute top-0 ${isItPendulum(frame)?'w-full border-3':'w-67 border-6 aspect-square'} mx-auto bg-gray-200  [border-style:outset] border-black`}
        style={getBorderStyles()}
        >
          {image ? (
              <img
              src={image}
              alt={name}
              className="w-full h-full object-cover object-top"
              />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
              Placeholder Art
            </div>
          )}
        </div>
        )
        }

        export default Artwork