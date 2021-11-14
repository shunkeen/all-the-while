import { Producer, done, send } from "../datatype/machine";

export function replicate<O>(value: O, times: number): Producer<number, O> {
    return {
        init: times,
        next: n => n <= 0
            ? done
            : send(value, n - 1)
    };
}
