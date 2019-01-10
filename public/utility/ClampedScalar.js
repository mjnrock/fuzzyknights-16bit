import Scalar from "./Scalar.js";

class ClampedScalar extends Scalar {
	/**
	 * You can use either of the Min or the Max.  Default behavior is to act identical to Scalar (i.e. unclamped).
	 * @param {number} value 
	 * @param {obj} [ min?, max? ]
	 */
	constructor(value, { min = null, max = null, fixed = 2 } = {}) {
		super(value);
		this.Min = min;
		this.Max = max;

		this.Fixed = fixed;

		this.Set(value);
	}
	
	Set(value) {
		this.Value = value;

		if(this.Max && this.Value > this.Max) {
			this.Value = this.Max;
		}
		if(this.Min && this.Value < this.Min) {
			this.Value = this.Min;
		}

		if(this.Fixed) {
			this.Value = +this.Value.toFixed(this.Fixed);
		}

		return this;
	}

	SetMin(min) {
		this.Min = min;

		return this;
	}
	RemoveMin() {
		this.Min = null;

		return this;
	}

	SetMax(max) {
		this.Max = max;

		return this;
	}
	RemoveMax() {
		this.Max = null;

		return this;
	}


	Copy() {
		return ClampedScalar.Generate(this.Value, { min: this.Min, max: this.Max });
	}
	static Generate(value, { min = null, max = null } = {}) {
		return new ClampedScalar(value, { min: min, max: max });
	}
}

export default ClampedScalar;