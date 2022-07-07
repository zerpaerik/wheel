import { Prize } from "../schemas/prizeSchema";

export { seedPrizes, getPrizes, getPrizesForWheel, updatePercentageChance };

async function getPrizes() {
  const prizes = await Prize.find({
    is_active: true,
  }).sort({ credit_cost: -1 });
  return prizes;
}

async function updatePercentageChance(id, percentage_chance) {
  const prize = await Prize.findByIdAndUpdate(id, {
    percentage_chance
  });
  return prize;
}

async function getPrizesForWheel({ noOfCredits }) {
  const prizes = await Prize.find({
    credit_cost: noOfCredits,
    is_active: true,
  }).sort({ percentage_chance: -1 });
  if (prizes.length === 0) {
    throw Error("There are not prizes availables");
  }
  return prizes;
}

async function seedPrizes() {
  const prizes = await Prize.create([
    {
      credit_cost: 1,
      is_active: true,
      name: "Manzana",
      percentage_chance: 80,
    },
    {
      credit_cost: 1,
      is_active: true,
      name: "Pera",
      percentage_chance: 20,
    },
    {
      credit_cost: 2,
      is_active: true,
      name: "Piña",
      percentage_chance: 60,
    },
    {
      credit_cost: 2,
      is_active: true,
      name: "Naranja",
      percentage_chance: 30,
    },
    {
      credit_cost: 2,
      is_active: true,
      name: "Sandía",
      percentage_chance: 10,
    },
  ]);
  return prizes;
}
