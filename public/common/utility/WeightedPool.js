import Utility from "./package.js";

class WeightedPool {
	//@param weights = [...<int>], values = [...<any>]
	constructor(weights, values) {
		this.Weights = weights;
		this.Values = values;
	}

	Roll() {
		return Utility.Dice.WeightedRandom(this.Weights, this.Values);
	}
	
	GetChance(index) {
		var sum = 0;
		for(var i in this.Weights) {
			sum += this.Weights[i];
		}
		
		return Utility.Functions.Round(this.Weights[index] / sum * 100.0, 2);
	}
	
	GetWeight(index) {
		return this.Weights[index];
	}
	SetWeight(index, value) {
		this.Weights[index] = value;
	}
	
	GetValue(index) {
		return this.Values[index];
	}
	SetValue(index, value) {
		this.Values[index] = value;
	}
}

export { WeightedPool };