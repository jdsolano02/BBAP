import { useState } from "react";

const App = () => {
  // State variables to hold user selections and results
  const [round, setRound] = useState<string>(""); // Selected round

  const [method, setMethod] = useState<string | null>(null); // Selected brewing method

  const [optionalItems, setOptionalItems] = useState<string | null>(null); // Optional items based on the round

  const [coffee, setCoffee] = useState<string | null>(null); // Selected coffee

  const [grams, setGrams] = useState<number | null>(null); // Selected grams of coffee

  const [ratio, setRatio] = useState<number | null>(null); // Selected brewing ratio

  // Function to handle selection based on the chosen round
  const handleSelection = () => {
    let selectedMethod: string | null = null; // Variable to store the selected method
    let optional: string | null = null; // Variable to store optional items

    // Select method based on the chosen round
    if (round === "16vos") {
      const methods = [
        "Aeropress",
        "Origami de Resina",
        "V60 plastico",
        "kalita wave 185",
        "Chorreador Plinc",
      ];
      selectedMethod = methods[Math.floor(Math.random() * methods.length)];
    } else if (round === "8vos") {
      const methods = [
        "Aeropress",
        "Origami de Resina",
        "UFO",
        "V60 Plastico",
        "Chorreador Plinc",
      ];
      selectedMethod = methods[Math.floor(Math.random() * methods.length)];
    } else if (round === "4tos") {
      const methods = [
        "Aeropress",
        "Origami de Resina",
        "UFO",
        "V60 Plastico",
        "Graycano",
      ];
      selectedMethod = methods[Math.floor(Math.random() * methods.length)];
      optional = "TWW Medium Roast Profile, melodrip, filtros sibarist"; // Optional items for this round
    } else if (round === "semis" || round === "final") {
      const methods = [
        "Aeropress",
        "Origami de Resina",
        "UFO",
        "Brewista Tornado",
        "Graycano",
      ];
      selectedMethod = methods[Math.floor(Math.random() * methods.length)];
      optional =
        "TWW Medium Roast Profile, melodrip, filtros sibarist, Nucleus Paragon"; // Optional items for these rounds
    }

    // Randomly select coffee
    const coffees = ["slowly", "Wonderwall", "Rosa Pastel", "Dance Monkey"];
    const selectedCoffee = coffees[Math.floor(Math.random() * coffees.length)];

    // Randomly select grams (between 12 and 30)
    const gramOptions = Array.from({ length: 19 }, (_, i) => i + 12); // Generates numbers from 12 to 30
    const selectedGrams =
      gramOptions[Math.floor(Math.random() * gramOptions.length)];

    // Randomly select brewing ratio (between 1.10 and 1.21)
    const ratios = Array.from({ length: 12 }, (_, i) =>
      (1.1 + i * 0.01).toFixed(2)
    ); // Generates ratios from 1.10 to 1.20
    const selectedRatio = ratios[Math.floor(Math.random() * ratios.length)];

    // Update state with the randomly selected values
    setMethod(selectedMethod);
    setOptionalItems(optional);
    setCoffee(selectedCoffee);
    setGrams(selectedGrams);
    setRatio(parseFloat(selectedRatio));
  };

  return (
    <div>
      <h1>Bloom Battles Amateur Practice</h1>
      <p>
        Este es un sistema para randomizar una receta con base en las reglas de
        la Bloom Battles Amateur 2024
      </p>
      <p>
        Los cafes disponibles son los de la Bloom Box de setiembre 2024 sin
        embargo puedes usar el que quieras en tu casa
      </p>
      <div>
        <label htmlFor="round">Selecciona la ronda:</label>

        <select
          id="round"
          value={round}
          onChange={(e) => setRound(e.target.value)} // Update the round state on selection change
        >
          <option value="">Selecciona...</option>
          <option value="16vos">16vos</option>
          <option value="8vos">8vos</option>
          <option value="4tos">4tos</option>
          <option value="semis">Semifinales</option>
          <option value="final">Final</option>
        </select>
      </div>
      <button onClick={handleSelection}>Seleccionar</button>{" "}
      {/* Button to trigger selection */}
      {method && ( // Conditional rendering based on method selection
        <div>
          <h2>Resultados:</h2>
          <p>Tu método a usar será: {method}</p>
          {optionalItems && (
            <p>Recuerda tus opcionales: {optionalItems}</p>
          )}{" "}
          {/* Show optional items if available */}
          <p>El café a utilizar será: {coffee}</p>
          <p>La cantidad de café a utilizar será: {grams} g</p>
          <p>El ratio a utilizar será: {ratio}</p>
          <p>Mucha suerte, Let's Bloom</p>
        </div>
      )}
    </div>
  );
};

export default App; // Export the App component for use in other files
