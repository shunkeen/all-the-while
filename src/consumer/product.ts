import { Consumer, quit, keep } from "../datatype/machine";

export const product: Consumer<number, number, number> = {
    init: 1,
    next: (accumulator, option) => option.kind === "none"
        ? quit(accumulator)
        : keep(accumulator * option.value)
};
