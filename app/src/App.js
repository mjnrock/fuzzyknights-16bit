import React, { Component } from "react";

import FKGE from "./engine/FKGE.js";
import FuzzyKnightsCore from "./modules/fuzzy-knights-core/Main.js";
const FuzzyKnights = (new FKGE(window, [ FuzzyKnightsCore ])).GetFuzzyKnights();

console.log("[Loaded] FuzzyKnights");
console.log(FuzzyKnights);
console.log(FuzzyKnights.Common.Game.GameManager.Player);

class App extends Component {
	render() {
		return (
			<div className="App">			
				<div id="canvas-container" style={{ position: "relative" }}>
					<canvas id="viewport" className="bg-dark-gray" width="1280" height="896" style={{ position: "absolute", left: 0, top: 0, zIndex: 100 }}></canvas>
					<canvas id="debug" width="1280" height="896" style={{ position: "absolute", left: 0, top: 0, zIndex: 9999 }}></canvas>
				</div>
			</div>
		);
	}
}

export default App;