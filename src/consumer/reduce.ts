import { Consumer, quit, keep } from "../datatype/machine";

export function reduce<I, R>(init: R, reducer: (accumulator: R, value: I) => R): Consumer<I, R, R> {
    return {
        init,
        next: (accumulator, option) => option.kind === "none"
            ? quit(accumulator)
            : keep(reducer(accumulator, option.value))
    };
}
