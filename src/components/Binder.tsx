import frameMap from "../utils/frameMap";
import texture2 from "../assets/texture2.png";
import Attribute from "./Attribute";
import { useEffect, useRef, useState } from "react";
import {
  getBinder,
  subscribeBinder,
  removeFromBinder,
  type BinderCard,
} from "../utils/binder";
import type { CardProps } from "../types/CardProps";
import Card from "./Card";

const chunkArray = <T,>(arr: T[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const isUnityMonster = (frameType: string) =>
  frameType === "unity"
    ? `, conic-gradient(from -90deg, ${frameMap.spell}, ${frameMap.effect} 10deg 65deg, ${frameMap.fusion} 67.5deg 87.5deg, ${frameMap.synchro} 90deg 113deg, ${frameMap.xyz} 115.5deg 170deg, ${frameMap.spell} 180deg 270deg)`
    : "";

const whiteText: string[] = [
  "spell",
  "trap",
  "skill",
  "xyz",
  "link",
  "xyz_pendulum",
  "dark_synchro",
];

const isPendulumMonster = (frameType: string): string => {
  if (frameType.includes("unity")) return "";
  if (!frameType.endsWith("_pendulum")) return "";
  const baseType = frameType.replace("_pendulum", "");
  if (!(baseType in frameMap)) return "";
  const topColor = frameMap[baseType as keyof typeof frameMap];
  const bottomColor = frameMap.spell;
  return `, linear-gradient(to bottom, ${topColor} 40%, ${bottomColor} 60%)`;
};

const levelAlign = (frameType: string) => {
  const starShadow =
    frameType === "xyz"
      ? "[text-shadow:0_0_3px_theme(colors.white)]"
      : frameType === "dark_synchro"
      ? "[text-shadow:0_0_2px_theme(colors.blue.400)]"
      : "[text-shadow:0_0_2px_theme(colors.red.500)]";
  if (frameType === "xyz" || frameType === "dark_synchro")
    return `text-start ${starShadow}`;
  return `text-end ${starShadow}`;
};

const Binder = () => {
  const [cards, setCards] = useState<BinderCard[]>([]);
  const [page, setPage] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState<
    "left" | "right" | null
  >(null);

  const cardsPerPage = 4;
  const pages = chunkArray(cards, cardsPerPage);

  useEffect(() => {
    // initial load
    setCards(getBinder());
    // listen for adds/removes
    const unsub = subscribeBinder(() => {
      setCards(getBinder());
    });
    return unsub;
  }, []);

  useEffect(() => {
    // keep page in range if items removed
    if (page > 0 && page >= pages.length) {
      setPage(Math.max(0, pages.length - 1));
    }
  }, [pages.length, page]);

  const touchStartX = useRef<number | null>(null);
  const mouseDownX = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    handleSwipe(deltaX);
    touchStartX.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseDownX.current = e.clientX;
    isDragging.current = true;
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || mouseDownX.current === null) return;
    const deltaX = e.clientX - mouseDownX.current;
    handleSwipe(deltaX);
    isDragging.current = false;
    mouseDownX.current = null;
  };

  const handleSwipe = (deltaX: number) => {
    const swipeThreshold = 50;
    if (deltaX > swipeThreshold && page > 0) {
      setTransitionDirection("right");
      setTimeout(() => {
        setPage((p) => p - 1);
        setTransitionDirection(null);
      }, 300);
    } else if (deltaX < -swipeThreshold && page < pages.length - 1) {
      setTransitionDirection("left");
      setTimeout(() => {
        setPage((p) => p + 1);
        setTransitionDirection(null);
      }, 300);
    }
  };

  // inside Binder component
  const handleRemove = (id: number) => {
    // Optional confirm (kill it if you don’t want it)
    if (confirm("Remove this card from the binder?")) {
      removeFromBinder(id); // subscribers will update the UI
    }
  };

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [viewCard, setViewCard] = useState<null>(null);
  
  const handlePocketClick = (id: number) => {
  setOpenMenuId((prev) => (prev === id ? null : id));
};

const handleLookCard = (card: CardProps, e: React.MouseEvent) => {
  e.stopPropagation();
  setViewCard(card);
};

const handleRemoveCard = (id: number, e: React.MouseEvent) => {
  e.stopPropagation();
  removeFromBinder(id);
  setOpenMenuId(null);
};

  return (
    <div
      id="binder-case"
      className="bg-gray-500 rounded-xl w-80 aspect-[9/13] flex flex-col items-center overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="p-2 w-full text-center text-sm text-white/90">Binder</div>

      {cards.length === 0 ? (
        <div className="flex-1 w-full flex items-center justify-center text-center p-4 text-white/80">
          <div>
            <p className="text-sm">Your binder is empty.</p>
            <p className="text-xs opacity-80">
              Use “ADD TO BINDER” from a card.
            </p>
          </div>
        </div>
      ) : (
        <div
          id="page"
          className={`bg-gray-300 w-76 aspect-[9/13] m-2 grid grid-cols-2 gap-2 transform transition-transform duration-300 ${
            transitionDirection === "left"
              ? "-translate-x-full"
              : transitionDirection === "right"
              ? "translate-x-full"
              : ""
          }`}
        >
          {pages[page].map((el, i) => (
            <div
              id="card-pocket"
              key={el.id ?? i}
              onClick={() => el.id && handlePocketClick(el.id)}   // ⬅️ add this
              className={`relative m-1 border-4 border-gray-800 w-34 rounded-md aspect-[9/13]
              flex flex-col items-center justify-between [font-variant-caps:small-caps]
              font-stretch-semi-condensed text-[0.75rem]`}
              style={{
                // @ts-expect-error dynamic key from map
                backgroundColor: `${frameMap[el.frameType] ?? frameMap.token}`,
                backgroundImage: `url(${texture2})
      ${isPendulumMonster(el.frameType)}
      ${isUnityMonster(el.frameType)}`,
                backgroundBlendMode: "hard-light",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h2
                className={`px-0.5 mt-1 w-[94%] relative h-[9%] leading-none flex justify-between [border-style:outset] border-2 ${
                  el.name.length > 25
                    ? "font-stretch-condensed tracking-wide"
                    : ""
                } ${
                  whiteText.includes(el.frameType) ? "text-white" : "text-black"
                }`}
                style={{
                  borderImage:
                    "conic-gradient(from 135deg,rgba(255, 255, 255, 0.5) 0deg,rgba(255, 255, 255, 0.5) 90deg, rgba(0, 0, 0, 0.5) 90deg, rgba(0, 0, 0, 0.5) 180deg, rgba(255, 255, 255, 0.5) 180deg, rgba(255, 255, 255, 0.5) 270deg, rgba(0, 0, 0, 0.5) 270deg, rgba(0, 0, 0, 0.5) 360deg)",
                  borderImageSlice: 1,
                }}
              >
                {el.name}
                <Attribute attribute={el.attribute} />
              </h2>

              {el.level && (
                <span
                  className={`${
                    el.frameType === "dark_synchro"
                      ? "text-indigo-500"
                      : "text-yellow-300"
                  } ${
                    el.level > 12 ? "w-full" : "w-[92%]"
                  } h-[5%] relative text-[10px] ${levelAlign(
                    el.frameType
                  )} -top-0.5 tracking-[0.1em]`}
                >
                  {"🟊".repeat(el.level)}
                </span>
              )}

              {el.frameType === "unity" ||
              el.frameType.endsWith("_pendulum") ? (
                <div
                  className="relative w-[94%] h-[50%] border-2 border-gray-300 border-b-0"
                  style={{
                    backgroundImage: `url(${el.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                  }}
                />
              ) : (
                <img
                  src={el.imageUrl}
                  alt={el.name}
                  className={`${
                    el.frameType.endsWith("_pendulum")
                      ? "w-[94%] border-2 border-gray-300 border-b-0"
                      : "w-[90%] [border-style:outset] border-3 aspect-square"
                  } relative object-cover object-top`}
                />
              )}

              {(el.frameType.endsWith("_pendulum") ||
                el.frameType === "unity") && (
                <div className=" h-[10%] w-[94%] font-normal tracking-wide leading-tight bg-white/70 border-2 relative flex justify-between items-center border-amber-800/50">
                  <span className="text-center">🔵</span>
                  <span className="border-2 w-[70%] border-amber-800/50 text-center lining-nums tracking-widest border-y-0">
                    {el.scale}
                  </span>
                  <span className="text-center">🔴</span>
                </div>
              )}

              <div className="mb-1 h-[18%] w-[94%] font-normal tracking-wide leading-tight bg-white/70 border-2 relative flex flex-col justify-center items-center border-amber-800/50">
                <span className="text-[0.5rem]">{`[${(el.typeline ?? []).join(
                  "/"
                )}]`}</span>
                <span className="text-[0.5rem] lining-nums">
                  {el.atk != null && el.def != null
                    ? `ATK/${el.atk} DEF/${el.def}`
                    : `—`}
                </span>
              </div>
              {openMenuId === el.id && (
    <div className="w-[94%] mt-1 mb-1">
      <div className="flex gap-2 text-xs">
        <button
          onClick={(e) => handleLookCard(el, e)}   // ⬅️ pass the full card
          className="flex-1 rounded bg-black/40 hover:bg-black/55 text-white px-2 py-1"
        >
          Look Card
        </button>
        <button
          onClick={(e) => el.id && handleRemoveCard(el.id, e)}
          className="flex-1 rounded bg-red-600/80 hover:bg-red-600 text-white px-2 py-1"
        >
          Remove Card
        </button>
      </div>
    </div>
  )}
            </div>
          ))}
        </div>
        
      )}

      {cards.length > 0 && (
        <div className="w-full flex items-center justify-between px-3 py-2 text-white/80 text-xs">
          <button
            className="px-2 py-1 rounded bg-black/30 hover:bg-black/40"
            onClick={() => page > 0 && setPage((p) => p - 1)}
          >
            ◀ Prev
          </button>
          <span>
            Page {page + 1}/{pages.length}
          </span>
          <button
            className="px-2 py-1 rounded bg-black/30 hover:bg-black/40"
            onClick={() => page < pages.length - 1 && setPage((p) => p + 1)}
          >
            Next ▶
          </button>
        </div>
      )}
      {/* ⬇⬇⬇ Add the modal here ⬇⬇⬇ */}
{viewCard && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    onClick={() => setViewCard(null)}
  >
    <div
      className="bg-white rounded-xl shadow-xl max-w-[min(90vw,28rem)] w-full p-3"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">{viewCard.name}</h3>
        <button
          className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xs"
          onClick={() => setViewCard(null)}
        >
          Close
        </button>
      </div>

      <div className="flex justify-center">
        <Card {...viewCard} /> {/* Your full Card component */}
      </div>
    </div>
  </div>
)}
    </div>
  );
};



export default Binder;
