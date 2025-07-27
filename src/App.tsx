import Card from "./components/Card";
import type { CardProps } from "./types/CardProps";
import CardSearch from "./components/CardSearch";

function App() {
  const blueEyes: CardProps = {
    id: 71398055,
    name: "D/D/D/D High Dimension King Arc Crisis",
    typeline: ["Fiend","Fusion","Pendulum","Effect"],
    frameType: "unity",
    desc:'[ Pendulum Effect ] \nYou can remove 6 Spell Counters from your field; Special Summon this card from the Pendulum Zone, then, if it is Special Summoned from the Pendulum Zone, you can add 1 "Spell Power Grasp" from your Deck or GY to your hand. You can only use this effect of "Endymion, the Mighty Master of Magic" once per turn.\n\n[ Monster Effect ] \n4 Fiend monsters (1 Fusion, 1 Synchro, 1 Xyz, and 1 Pendulum)\r\nMust be either Fusion Summoned, or Special Summoned (from your face-down Extra Deck) by banishing the above cards from your field and/or GY. You can only Special Summon "D/D/D/D Great Dimension King Arc Crisis" once per turn this way, no matter which method you use. If this card is Special Summoned: You can negate the effects of all face-up monsters your opponent currently controls. Can attack all monsters your opponent controls once each. If this card in the Monster Zone is destroyed: You can place this card in your Pendulum Zone.',
    race: "Fiend",
    atk: 3000,
    def: 2500,
    level: 12,
    attribute: "FIRE",
    linkval: 1,
    linkmarkers: ["Bottom-Left"],
    scale: 13,
    imageUrl: "dmm.png",
    setCode: "ROTA-EN004",
    edition: "1st Edition",
  };

  return (
    <>
    <CardSearch />
      <div className="flex">
        <Card {...blueEyes} />
        <div className="w-auto">
          <img src="/unity.webp" alt="pepe" className="w-85 h-auto object-contain" />
        </div>
      </div>
      <div className="w-auto">
          <img src="/chuchi.webp" alt="pepe" className="w-85 h-auto object-contain" />
        </div>
    </>
  );
}

export default App;
