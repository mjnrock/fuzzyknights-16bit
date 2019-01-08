import Kinematics from "./Kinematics.js";
import RigidBody from "./RigidBody.js";

class Kinetics {
	constructor(rigidBody, kinematics = null, forces = null) {
		this.RigidBody = rigidBody;
		this.Kinematics = kinematics || new Kinematics();
		this.Forces = forces || [];
	}
}

export default Kinetics;