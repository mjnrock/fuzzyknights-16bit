class LinkedListNode {
	constructor(data) {
		this.Data = data;
		this.Previous = null;
		this.Next = null;
	}
}

class LinkedList {
	constructor() {
		this.Length = 0;
		this.Head = null;
		this.Tail = null;
	}

	Get(index) {
		let curr = this.Head,
			i = 0;

		if (this.Length === 0 || index < 0 || index > this.Length - 1) {
			return false;
		}
		
		while (i < index) {
			curr = curr.Next;
			i++;
		}
		
		return curr;
	}

	Add(value) {
		let node = new LinkedListNode(value);

		if(this.Length > 0) {
			this.Tail.Next = node;
			node.Previous = this.Tail;
			this.Tail = node;
		} else {
			this.Head = node;
			this.Tail = node;
		}

		this.Length++;

		return this;
	}
	Remove(index) {
		if (this.Length === 0 || index < 0 || index > this.Length - 1) {
			return false;
		}

		if(index === 0) {
			if(!this.Head.Next) {
				this.Head = null;
				this.Tail = null;
			} else {
				this.Head = this.Head.Next;
			}
		} else if(index === this.Length - 1) {
			this.Tail = this.Tail.Previous;
		} else {
			let i = 0,
				curr = this.Head;
			while(i < index) {
				curr = curr.Next;
				i++;
			}
			
			curr.Previous.Next = curr.Next;
			curr.Next.Previous = curr.Previous;
		}
				
		this.Length--;
		if(this.Length === 1) {
			this.Tail = this.Head;
		}
		if(this.Length > 0) {
			this.Head.Previous = null;
			this.Tail.Next = null;
		}
	 

		return this;
	}
}

export { LinkedList };