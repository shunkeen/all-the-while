import { Producer, Done, Send } from "../datatype/machine";

export function produce<S, O>(init: S, next: (state: S) => Done | Send<S, O>): Producer<S, O> {
    return { init, next };
}
