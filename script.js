// Get references to DOM elements
const coffeeInput = document.getElementById("coffeeInput");
const roundSelect = document.getElementById("roundSelect");
const generateRecipeBtn = document.getElementById("generateRecipeBtn");
const result = document.getElementById("result");
const recipeDetails = document.getElementById("recipeDetails");
const followUp = document.getElementById("followUp");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const additionalInputs = document.getElementById("additionalInputs");
const commanderClicks = document.getElementById("commanderClicks");
const waterTemp = document.getElementById("waterTemp");
const optionalItemsContainer = document.getElementById(
  "optionalItemsContainer"
);
const finalRecipeBtn = document.getElementById("finalRecipeBtn");
const finalResult = document.getElementById("finalResult");
const finalDetails = document.getElementById("finalDetails");

// Coffee methods and optional items based on rounds
const coffeeMethods = {
  "16ths": [
    "Aeropress Original con filtros originales",
    "Origami Resina con filtros cónicos Origami o planos Kalita",
    "V60 Plastico con filtros cónicos Hario V02",
    "Kalita Wave 185 con filtros planos Kalita",
    "Chorreador Plinc con filtro Plinc",
  ],
  "8ths": [
    "Aeropress Original con filtros originales",
    "Origami Resina con filtros cónicos Origami o planos Kalita",
    "UFO con filtros Sibarist",
    "V60 con filtros cónicos Hario V02",
    "Chorreador Plinc con filtro Plinc",
  ],
  "4ths": ["Aeropress Original", "Origami Resina", "V60", "UFO", "Graycano"],
  semifinals: [
    "Aeropress Original",
    "Origami Resina",
    "Brewista Tornado",
    "Graycano",
    "UFO",
  ],
  finals: [
    "Aeropress Original",
    "Origami Resina",
    "Brewista Tornado",
    "Graycano",
    "UFO",
  ],
};

// Optional items for rounds
const optionalItems = {
  "4ths": [
    "Third Wave Water Medium Roast Profile",
    "Melodrip",
    "Filtros Sibarist",
  ],
  semifinals: [
    "Third Wave Water Medium Roast Profile",
    "Melodrip",
    "Filtros Sibarist",
    "Nucleus Paragon",
  ],
  finals: [
    "Third Wave Water Medium Roast Profile",
    "Melodrip",
    "Filtros Sibarist",
    "Nucleus Paragon",
  ],
};

// Function to generate a random number in a range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Variables to hold the recipe details
let selectedCoffee, selectedMethod, coffeeGrams, ratio;

// Function to generate the recipe
generateRecipeBtn.addEventListener("click", () => {
  // Get user inputs
  const coffeeList = coffeeInput.value
    .split(",")
    .map((coffee) => coffee.trim());
  const selectedRound = roundSelect.value;

  // Randomly select a coffee and a method based on the round
  selectedCoffee = coffeeList[getRandomNumber(0, coffeeList.length - 1)];
  selectedMethod =
    coffeeMethods[selectedRound][
      getRandomNumber(0, coffeeMethods[selectedRound].length - 1)
    ];

  // Generate random coffee grams and ratio
  coffeeGrams = getRandomNumber(12, 30);
  let isAeropress = selectedMethod.includes("Aeropress");

  if (isAeropress) {
    ratio = "No se utiliza ratio, se requieren al menos 150ml de líquido.";
  } else {
    const ratioValue = getRandomNumber(10, 20);
    ratio = `1:${ratioValue}`;
  }

  // Display the initial recipe
  result.classList.remove("hidden");
  recipeDetails.innerHTML = `
        <strong>Café a usar:</strong> ${selectedCoffee} <br>
        <strong>Método a usar:</strong> ${selectedMethod} <br>
        <strong>Gramos a usar:</strong> ${coffeeGrams}g <br>
        <strong>Ratio a usar:</strong> ${ratio}
    `;

  // Show follow-up options
  followUp.classList.remove("hidden");
});

// Handling Yes and No buttons
yesBtn.addEventListener("click", () => {
  // Show additional inputs for clicks, water temp, and optional items
  additionalInputs.classList.remove("hidden");

  // Get selected round
  const selectedRound = roundSelect.value;

  // Display optional items based on the selected round
  const optionalItemsList = optionalItems[selectedRound] || [];
  optionalItemsContainer.innerHTML = optionalItemsList
    .map(
      (item) => `
        <div>
            <input type="checkbox" id="${item}" name="optionalItems" value="${item}">
            <label for="${item}">${item}</label>
        </div>
    `
    )
    .join("");
  finalDetails.classList.remove("hidden");
});

noBtn.addEventListener("click", () => {
  // Hide everything
  result.classList.add("hidden");
  followUp.classList.add("hidden");
  additionalInputs.classList.add("hidden");
  finalDetails.classList.add("hidden");
});

// Final recipe generation
finalRecipeBtn.addEventListener("click", () => {
  // Get additional inputs
  const clicks = commanderClicks.value;
  const temp = waterTemp.value;
  const selectedOptionalItems = Array.from(
    document.querySelectorAll('input[name="optionalItems"]:checked')
  )
    .map((item) => item.value)
    .join(", ");

  // Display the final recipe details
  finalResult.classList.remove("hidden");
  finalDetails.innerHTML = `
        <strong>Café seleccionado:</strong> ${selectedCoffee} <br>
        <strong>Método a usar:</strong> ${selectedMethod} <br>
        <strong>Gramos a usar:</strong> ${coffeeGrams}g <br>
        <strong>Ratio a usar:</strong> ${ratio} <br>
        <strong>Clicks en comandante:</strong> ${clicks} <br>
        <strong>Temperatura del agua:</strong> ${temp}°C <br>
        <strong>Items opcionales usados:</strong> ${selectedOptionalItems}
    `;
});
