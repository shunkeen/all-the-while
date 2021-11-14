import { Consumer, quit, keep } from "../datatype/machine";

export const max: Consumer<number, number, number> = {
    init: -Infinity,
    next: (accumulator, option) => option.kind === "none"
        ? quit(accumulator)
        : keep(Math.max(accumulator, option.value))
};
