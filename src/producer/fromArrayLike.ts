import { Producer, send, done } from "../datatype/machine";

export function fromArrayLike<O>(arrayLike: ArrayLike<O>): Producer<number, O> {
    return {
        init: 0,
        next: i => i < arrayLike.length
            ? send(arrayLike[i], i + 1)
            : done
    };
}
