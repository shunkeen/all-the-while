import { Consumer, quit, keep } from "../datatype/machine";

export const sum: Consumer<number, number, number> = {
    init: 0,
    next: (accumulator, option) => option.kind === "none"
        ? quit(accumulator)
        : keep(accumulator + option.value)
};
