const LevelStars = ({
  level,
  frameType,
}: {
  level: number;
  frameType: string;
}) => {
  let bg = "bg-orange-600";
  let text = "text-yellow-300";
  let justify = "justify-end";

  if (frameType === "xyz") {
    bg = "bg-black";
    text = "text-yellow-400";
    justify = "justify-start";
  } else if (frameType === "darkSynchro") {
    bg = "bg-blue-900";
    text = "text-purple-600";
    justify = "justify-start";
  }

  const isOverflow = level > 12;
  const totalSlots = isOverflow ? 13 : 12;

  const stars = Array.from({ length: totalSlots }).map((_, i) => {
    const shouldRender =
      (justify === "justify-end" && i >= totalSlots - level) ||
      (justify === "justify-start" && i < level);

    return (
      <div
        key={i}
        className="flex items-center justify-center aspect-square h-5"
        style={{ flex: `0 0 calc(100% / 12)` }} // Always base size on 12
      >
        {shouldRender && (
          <span
            className={`w-full h-full rounded-full flex items-center justify-center ${bg} ${text}`}
          >
            <span className="relative -top-0.5 text-2xl leading-none font-bold">
              ★
            </span>
          </span>
        )}
      </div>
    );
  });

  return (
    <div className={`relative ${isOverflow ? 'w-73' : 'w-67'} h-6 flex justify-center items-center`}>
      <div
        className={`grid ${isOverflow ? 'grid-cols-13' : 'grid-cols-12'} w-full ${justify}`}>
        {stars}
      </div>
    </div>
  );
};

export default LevelStars;