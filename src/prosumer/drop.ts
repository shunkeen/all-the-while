import { Prosumer, done, keep, send } from "../datatype/machine";

export function drop<I>(n: number): Prosumer<I, number, I> {
    return {
        init: n,
        next: (i, option) => option.kind === "none"
            ? done
            : i <= 0
                ? send(option.value, 0)
                : keep(i - 1)
    };
}
