import { Prosumer, done, send } from "../datatype/machine";

export function take<I>(n: number): Prosumer<I, number, I> {
    return {
        init: n,
        next: (i, option) => i <= 0 || option.kind === "none"
            ? done
            : send(option.value, i - 1)
    };
}
