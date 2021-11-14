import { Consumer, quit, keep } from "../datatype/machine";

export function maxOr<R>(defaultValue: R, comparator: (x: R, y: R) => number): Consumer<R, R, R> {
    return {
        init: defaultValue,
        next: (accumulator, option) => option.kind === "none"
            ? quit(accumulator)
            : comparator(accumulator, option.value) >= 0 
                ? keep(accumulator)
                : keep(option.value)
    };
}
