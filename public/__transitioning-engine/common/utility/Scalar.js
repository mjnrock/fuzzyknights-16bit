class Scalar {
	constructor(value) {
		this.Value = value;
	}

	Get() {
		return this.Value;
	}
	Set(value) {
		this.Value = value;

		return this;
	}

	Add(value) {
		this.Set(this.Value + value);

		return this;
	}
	Subtract(value) {
		this.Set(this.Value - value);

		return this;
	}
	Multiply(value) {
		this.Set(this.Value * value);

		return this;
	}
	Divide(value) {
		this.Set(this.Value / value);

		return this;
	}
	Power(pow) {
		this.Set(this.Value ** pow);

		return this;
	}


	Copy() {
		return Scalar.Generate(this.Value);
	}
	static Generate(value) {
		return new Scalar(value);
	}
}

export default Scalar;