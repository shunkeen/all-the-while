import { Consumer, quit, keep } from "../datatype/machine";

export const min: Consumer<number, number, number> = {
    init: Infinity,
    next: (accumulator, option) => option.kind === "none"
        ? quit(accumulator)
        : keep(Math.min(accumulator, option.value))
};
