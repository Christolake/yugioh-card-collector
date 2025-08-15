import { useState, useRef } from "react";
import Card from "./Card";
import type { AttributeType } from "../types/AttributeType";
import type { CardProps } from "../types/CardProps";
import { addToBinder, type BinderCard } from "../utils/binder"; // ⬅️ NEW

// 🎯 Función para aplicar el efecto de tilt
const handleCardTilt = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  cardRef: React.RefObject<HTMLDivElement>
) => {
  const card = cardRef.current;
  if (!card) return;

  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -10;
  const rotateY = ((x - centerX) / centerX) * 10;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  card.style.transition = "transform 0.1s";
};

// 🎯 Reset al salir del mouse
const resetTilt = (cardRef: React.RefObject<HTMLDivElement>) => {
  const card = cardRef.current;
  if (card) {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.transition = "transform 0.3s ease";
  }
};

const CardSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardProps | null>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState<string | null>(null); // ⬅️ tiny feedback

  const fetchCards = async () => {
    if (query.length < 3) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (data.data) {
        setResults(data.data.slice(0, 12));
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchCards();
    }
  };

  const parseCardData = (apiCard: any): CardProps => {

    return {
      id: apiCard.id,
      name: apiCard.name,
      type: apiCard.type,
      typeline: apiCard.typeline,
      frameType: apiCard.frameType || "token",
      desc: apiCard.desc,
      race: apiCard.race,
      atk: apiCard.atk,
      def: apiCard.def,
      level: apiCard.level,
      attribute: (
  apiCard.attribute ||
  (["Spell Card", "Trap Card", "Skill Card"].includes(apiCard.type)
    ? apiCard.type.split(" ")[0].toUpperCase()
    : undefined)
) as AttributeType | undefined,
      linkval: apiCard.linkval,
      linkmarkers: apiCard.linkmarkers,
      scale: apiCard.scale,
      imageUrl: apiCard.card_images[0].image_url_cropped||apiCard.card_images[0].image_url,
      setCode: apiCard.card_sets?.[0]?.set_code ?? "",
      edition: apiCard.card_sets?.[0]?.set_rarity ?? "",
    };
  };

   const handleAddToBinder = () => {
  if (!selectedCard) return;
  const res = addToBinder(selectedCard);  // ⬅️ full CardProps
  // optional toast
};

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {!selectedCard && (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar carta (mínimo 3 letras)..."
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={fetchCards}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Buscar
            </button>
          </div>

          {loading && <p className="mt-2 text-sm text-gray-500">Buscando...</p>}

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-4">
            {results.map((card) => (
              <img
                key={card.id}
                src={card.card_images[0].image_url_cropped}
                alt={card.name}
                title={card.name}
                className="rounded hover:scale-105 transition-transform duration-200 cursor-pointer"
                onClick={() => setSelectedCard(parseCardData(card))}
              />
            ))}
          </div>
        </>
      )}

      {/* 🎴 Carta seleccionada con efecto 3D */}
       {selectedCard && (
        <div className="mt-6 flex flex-col items-center gap-4">
          <div
            style={{ perspective: "1000px" }}
            onMouseMove={(e) => handleCardTilt(e, cardRef)}
            onMouseLeave={() => resetTilt(cardRef)}
          >
            <div ref={cardRef} className="transition-transform duration-300 ease-out">
              <Card {...selectedCard} />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddToBinder}
              className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
            >
              ADD TO BINDER
            </button>
            <button
              onClick={() => {
                setSelectedCard(null);
                setQuery("");
                setResults([]);
              }}
              className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700"
            >
              Volver a buscar
            </button>
          </div>

          {toast && <p className="text-sm text-gray-700">{toast}</p>}
        </div>
      )}
    </div>
  );
};

export default CardSearch;
