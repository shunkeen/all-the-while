import { Consumer, quit, keep } from "../datatype/machine";

export const count: Consumer<unknown, number, number> = {
    init: 0,
    next: (accumulator, option) => option.kind === "none"
        ? quit(accumulator)
        : keep(accumulator + 1)
};
