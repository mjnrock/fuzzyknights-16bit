const chai = require("chai");

import Bitwise from "../../public/common/utility/Bitwise";

describe("Bitwise", () => {
	it("Add - Type Check", () => {
		chai.expect(Bitwise.Add(1, 5)).to.be.a("number");
	});

	it("Add 1", () => {
		chai.expect(Bitwise.Add(1, 5)).to.equal(5);
	});
	
	it("Add 2", () => {
		chai.expect(Bitwise.Add(0, 1 << 2)).to.equal(1 << 2);
	});
	
	it("Add 3", () => {
		chai.expect(Bitwise.Add(3, 1 << 2)).to.equal(3 | 1 << 2);
	});

	it("Has - Type Check", () => {
		chai.expect(Bitwise.Has(3, 1 << 2)).to.be.a("boolean");
	});
	
	it("Has 1", () => {
		chai.expect(Bitwise.Has(3, 1 << 2)).to.equal(false);
	});

	it("Has 2", () => {
		chai.expect(Bitwise.Has(5, 1 << 2)).to.equal(true);
	});

	it("Remove - Type Check", () => {
		chai.expect(Bitwise.Remove(3, 1 << 2)).to.be.a("number");
	});
	
	it("Remove 1", () => {
		chai.expect(Bitwise.Remove(3, 1 << 2)).to.equal(3 & ~(1 << 2));
	});

	it("Remove 2", () => {
		chai.expect(Bitwise.Remove(5, 1 << 2)).to.equal(5 & ~(1 << 2));
	});
});