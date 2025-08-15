import Card from "./components/Card";
import type { CardProps } from "./types/CardProps";
import CardSearch from "./components/CardSearch";
import Binder from "./components/Binder";

function App() {
  const blueEyes: CardProps = {
    id: 71398055,
    name: "D/D/D/D High Dimension King Arc Crisis",
    typeline: ["Fiend","Fusion","Pendulum","Effect"],
    frameType: "unity",
    desc:`[ Pendulum Effect ] \nYou can remove 6 Spell Counters from your field; Special Summon this card from the Pendulum Zone, then count the number of cards you control that can have a Spell Counter, destroy up to that many cards on the field, and if you do, place Spell Counters on this card equal to the number of cards destroyed. You can only use this effect of "Endymion, the Mighty Master of Magic" once per turn.\n\n[ Monster Effect ] \nOnce per turn, when a Spell/Trap Card or effect is activated (Quick Effect): You can return 1 card you control with a Spell Counter to the hand, and if you do, negate the activation, and if you do that, destroy it. Then, you can place the same number of Spell Counters on this card that the returned card had. While this card has a Spell Counter, your opponent cannot target it with card effects, also it cannot be destroyed by your opponent's card effects. When this card with a Spell Counter is destroyed by battle: You can add 1 Normal Spell from your Deck to your hand.`,
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
        <div className="w-full flex justify-center">


          <Binder />

        </div>
        {/* <Card {...blueEyes} /> */}
        {/* <div className="w-auto">
          <img src="/chuchi.webp" alt="pepe" className="w-85 h-auto object-contain" />
        </div>
      </div>
      <div className="w-auto">
          <img src="/chuchi.webp" alt="pepe" className="w-85 h-auto object-contain" /> */}
        </div>
        {/* <FoilCardArt src='dmm.png' applyFoil /> */}
    </>
  );
}

export default App;
