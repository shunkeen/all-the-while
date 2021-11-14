import { Producer, Prosumer, send } from "../datatype/machine";
import { none } from "../datatype/option";

export function concat<S, O>(producer: Producer<S, O>): Prosumer<O, S, O> {
    return {
        init: producer.init,
        next: (state, option) => option.kind === "some"
            ? send(option.value, state)
            : producer.next(state, none)
    };
}
