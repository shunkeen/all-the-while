import { Producer, send, done } from "../datatype/machine";

export function range(start: number, stop: number, step: number = 1): Producer<number, number> {
    return {
        init: start,
        next: i => i < stop
            ? send(i, i + step)
            : done
    };
}
