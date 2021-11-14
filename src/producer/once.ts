import { Producer, done, send } from "../datatype/machine";

export function once<O>(value: O): Producer<boolean, O> {
    return {
        init: false,
        next: isDone => isDone
            ? done
            : send(value, true)
    };
}
