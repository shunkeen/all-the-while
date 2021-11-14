import { Producer, send, done } from "../datatype/machine";

export function fromArray<O>(array: ReadonlyArray<O>): Producer<number, O> {
    return {
        init: 0,
        next: i => i < array.length
            ? send(array[i], i + 1)
            : done
    };
}
