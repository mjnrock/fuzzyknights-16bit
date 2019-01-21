const Dice = {
	Random: (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	Roll: (X, Y, Z = 0) => {
		let value = 0;
		for(let i = 0; i < X; i++) {
			value += Dice.Random(1, Y);
		}
		
		return value + Z;
	},

	Coin: () => {
		return Dice.Roll(1, 2) === 1 ? true : false;
	},

	D2: (Z = 0) => {
		return Dice.Roll(1, 2) + Z;
	},
	D3: (Z = 0) => {
		return Dice.Roll(1, 3) + Z;
	},
	D4: (Z = 0) => {
		return Dice.Roll(1, 4) + Z;
	},
	D6: (Z = 0) => {
		return Dice.Roll(1, 6) + Z;
	},
	D10: (Z = 0) => {
		return Dice.Roll(1, 10) + Z;
	},
	D12: (Z = 0) => {
		return Dice.Roll(1, 12) + Z;
	},
	D20: (Z = 0) => {
		return Dice.Roll(1, 20) + Z;
	},
	D25: (Z = 0) => {
		return Dice.Roll(1, 25) + Z;
	},
	D50: (Z = 0) => {
		return Dice.Roll(1, 50) + Z;
	},
	D100: (Z = 0) => {
		return Dice.Roll(1, 100) + Z;
	},

	WeightedRandom: (weights, values) => {                
		let total = 0;
		for(let i in weights) {
			total += weights[i];
		}
		
		let roll = Dice.Random(1, total);
		
		let count = 0;
		for(let i = 0; i < weights.length; i++) {
			count += weights[i];
			
			if(roll <= count) {
				return values[i];
			}
		}
		
		return values[values.length - 1];
	}
}

export default Dice;