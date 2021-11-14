import { Producer, send } from "../datatype/machine";

export function iterate<S>(init: S, iterator: (value: S) => S): Producer<S, S> {
    return {
        init,
        next: value => send(value, iterator(value))
    };
}
