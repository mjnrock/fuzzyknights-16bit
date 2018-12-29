import Functions from "../utility/Functions.js";
import Dice from "../utility/Dice.js";
import Grid from "../utility/Grid.js";

import Terrain from "./../entity/terrain/package.js";

import { Map } from "./Map.js";
import { Node } from "./Node.js";

//TODO CellularAutomata is complete for T/F, but needs a more meaningful generation paradigm
class CellularAutomata {
	constructor(xmax, ymax) {
		this.XMax = xmax;
		this.YMax = ymax;

		this.BirthRate = 0.45;
		this.BirthThreshold = 5;
		this.DeathThreshold = 3;
		this.Simulations = 7;
		
		// this.Cells = new Grid(xmax, ymax, "number");
		this.Cells = new Grid(xmax, ymax, "boolean");
	}

	Run() {
		this.Cells.ForEach((p, e, g, a) => {
			// g.Set(p.X, p.Y, Math.random() < a[0] ? 255 : 0);
			g.Set(p.X, p.Y, Math.random() < a[0] ? true : false);
		}, [this.BirthRate]);

		for (let i = 0; i < this.Simulations; i++) {
			this.Cells = this.SimulateStep(this.Cells);
		}

		return this;
	}

	SimulateStep(grid0) {
		// let grid1 = new Grid(this.XMax, this.YMax, "number");
		let grid1 = new Grid(this.XMax, this.YMax, "boolean");

		grid0.ForEach((p, e, g, a) => {
			let n = a[0].CountAliveNeighbors(a[1], p.X, p.Y);
			if (!!a[1].Get(p.X, p.Y)) {
				// a[2].Set(p.X, p.Y, !(n < a[0].DeathThreshold) ? 255 : 0);
				a[2].Set(p.X, p.Y, !(n < a[0].DeathThreshold));
			} else {
				// a[2].Set(p.X, p.Y, !!(n > a[0].BirthThreshold) ? 255 : 0);
				a[2].Set(p.X, p.Y, !!(n > a[0].BirthThreshold));
			}
		}, [this, grid0, grid1]);

		return grid1;
	}

	CountAliveNeighbors(grid, x, y) {
		let count = 0;
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				let nX = x + i,
					nY = y + j;

				count += (nX < 0 || nY < 0 || nX >= this.XMax || nY >= this.YMax || !!grid.Get(nX, nY)) ? 1 : 0;
			}
		}

		return count;
	}
}

class RandomAverage {
	constructor(xmax, ymax) {
		this.XMax = xmax;
		this.YMax = ymax;

		this.CellAverage = 0;
		this.CellMin = 255;
		this.CellMax = 0;

		this.Cells = new Grid(xmax, ymax, "number");
	}

	Run() {
		this.Cells.ForEach((p, e, g, a) => {
			g.Set(p.X, p.Y, Dice.Random(0, 255));
		});

		this.Cells.ForEach(function (p, e, g, a) {
			let avg = Functions.Round(a[0].GetNeighbors(p.X, p.Y), 0);
			a[0].CellAverage += avg;

			a[0].CellMin = avg < a[0].CellMin ? avg : a[0].CellMin;
			a[0].CellMax = avg > a[0].CellMax ? avg : a[0].CellMax;

			g.Set(p.X, p.Y, avg);
		}, [this]);

		this.CellAverage = Functions.Round(this.CellAverage / this.Cells.Size(), 0);

		return this;
	}

	GetGrid(run = true) {
		if(run) {
			this.Run();
		}

		return this.Cells;
	}
	GetMap(...terrainRanges) {
		this.Run();
		
		let grid = this.ConvertToTerrain([
			...terrainRanges
		]);
		return new Map(grid);
	}

	GetNeighbors(x, y) {
		let value = 0,
			count = 0;

		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				let nX = x + i,
					nY = y + j;

				if (nX >= 0 && nX < this.XMax && nY >= 0 && nY < this.YMax) {
					value += this.Cells.Get(nX, nY);
					++count;
				}
			}
		}

		return value / count;
	}

	/**
	 * 
	 * @param array | [ [ min, max, Terrain ], ... ]
	 */
	//TODO Build a default case here (e.g. Void or Water)
	ConvertToTerrain(array = []) {
		if(array.length === 0) {			
			return null;
		}

		let terrainGrid = new Grid(this.Cells.XMax, this.Cells.YMax, Node, (x, y) => [ x, y ]);

		if(array.length === 1) {
			this.Cells.ForEach((pos, ele, t) => {				
				if(ele >= array[0][0] && ele < array[0][1]) {
					terrainGrid.Get(pos.X, pos.Y).AddEntity(new array[0][2]());
				}				
			});

			return terrainGrid;
		}

		for(let i in array) {
			let arr = array[i];

			this.Cells.ForEach((pos, ele, t) => {
				if(ele >= arr[0] && ele < arr[1]) {
					terrainGrid.Get(pos.X, pos.Y).AddEntity(new arr[2]());
				}				
			});
		}

		return terrainGrid;
	}
}

const MapGenerator = {
	RandomAverage() {
		return new RandomAverage(...arguments);
	},
	CellularAutomata() {
		return new CellularAutomata(...arguments);
	}
};

export { MapGenerator };