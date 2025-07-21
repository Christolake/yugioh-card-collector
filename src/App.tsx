import Card, { type CardProps } from "./components/Card";
import CardSearch from "./components/CardSearch";

function App() {
  const blueEyes: CardProps = {
    name: "D/D/D/D Great Dimension King Arc Crisis",
    attributeIcon: "DARK",
    level: 12,
    imageUrl: "dmm.png",
    typeLine: "Dragón/Efecto",
    description:
      "Esta carta es siempre tratada como una 'Millennium card'. Puedes descartarla para añadir 'Millennium Ankh'...",
    atk: 3000,
    def: 2500,
    setCode: "ROTA-EN004",
    edition: "1st Edition",
    frameType: "unity",
  };

  return (
    <>
    <CardSearch />
      <div className="flex">
        <Card {...blueEyes} />
        <div className="w-auto">
          <img src="/LUNGO.png" alt="pepe" className="w-85 h-auto object-contain" />
        </div>
      </div>
      <div className="w-auto">
          <img src="/LUNGO.png" alt="pepe" className="w-85 h-auto object-contain" />
        </div>
    </>
  );
}

export default App;
