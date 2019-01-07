import Kinematics from "./Kinematics.js";
import RigidBody from "./RigidBody";

class Dynamics {
	constructor(rigidBody, kinematics) {
		this.RigidBody = rigidBody || new RigidBody();
		this.Kinematics = kinematics || new Kinematics();
	}

	//TODO	Build functions to apply forces to the Kinematics
}

export default Dynamics;