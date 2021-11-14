import { Producer, send, done } from "../datatype/machine";

export function digits(n: number, base: number = 10): Producer<number, number> {
    return {
        init: n,
        next: i => i <= 0
            ? done
            : send(i % base, Math.floor(i / base))
    };
}
