import { Producer, keep } from "../datatype/machine";
import { none } from "../datatype/option";

export function cycle<S, O>(producer: Producer<S, O>): Producer<S, O> {
    return {
        init: producer.init,
        next: state => {
            const step = producer.next(state, none);
            return step.kind === "quit"
                ? keep(producer.init)
                : step;
        }
    }
}
