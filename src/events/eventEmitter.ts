import { EventEmitter } from "events";


// interface Callable {
//   [key: string]: () => void
// }

// interface Subscriber {
//   [key: string]: Callable
// }

class BasicEmitter extends EventEmitter {
  static #instance: BasicEmitter | null;
  // #subscribers: Subscriber | null;
  
  private constructor() {
    super();
  }

  static getInstance() {
    if (BasicEmitter.#instance) return BasicEmitter.#instance;
    BasicEmitter.#instance = new BasicEmitter;
    return BasicEmitter.#instance;
  }
}

const customEmitter = BasicEmitter.getInstance();

export default customEmitter;
