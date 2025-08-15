import attributeMap from "../utils/attributeMap"
import type { AttributeType } from "../types/AttributeType";

const Attribute = ({attribute, miniText = false, className} : {attribute: string, miniText?: boolean, className?:string; }) => {
    return (
        <div
              id="attribute"
              className="h-full relative aspect-square rounded-full flex flex-col text-white justify-center items-center"
              style={{
                backgroundColor: attributeMap[attribute].color,
              }}
            >
              {miniText && <span className="text-[0.5rem] -translate-y-3 ">{attribute}</span>}
              <span className={`absolute ${className ?? ''} translate-y-0.25 flex justify-center items-center font-[DFLeiSho]`}>
                {attributeMap[attribute].kanji}
              </span>
            </div>
    )
}

export default Attribute