import Card, { type CardProps } from "./components/Card";
import CardSearch from "./components/CardSearch";

function App() {
  const blueEyes: CardProps = {
    name: "D/D/D/D High Dimension King Arc Crisis",
    attributeIcon: "DARK",
    level: 12,
    imageUrl: "dmm.png",
    typeLine: "Fiend/Pendulum/Effect",
    description:
      '[ Pendulum Effect ] \nYou can target any number of "Dark Contract" cards you control; destroy them, then you can Special Summon up to that many "Doom King" Pendulum Monsters from your Deck and/or Extra Deck. You can only use this effect of "D/D/D/D Great Dimension King Arc Crisis" once per turn.\n\n[ Monster Effect ] \n4 Fiend monsters (1 Fusion, 1 Synchro, 1 Xyz, and 1 Pendulum)\r\nMust be either Fusion Summoned, or Special Summoned (from your face-down Extra Deck) by banishing the above cards from your field and/or GY. You can only Special Summon "D/D/D/D Great Dimension King Arc Crisis" once per turn this way, no matter which method you use. If this card is Special Summoned: You can negate the effects of all face-up monsters your opponent currently controls. Can attack all monsters your opponent controls once each. If this card in the Monster Zone is destroyed: You can place this card in your Pendulum Zone.',
    atk: 3000,
    def: 2500,
    setCode: "ROTA-EN004",
    edition: "1st Edition",
    frameType: "unity",
  };

  return (
    <>
    {/* <CardSearch /> */}
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
