import { Prosumer, done, keep, send } from "../datatype/machine";

export function stepBy<I>(n: number): Prosumer<I, number, I> {
    return {
        init: 0,
        next: (i, option) => option.kind === "none"
            ? done
            : i === 0
                ? send(option.value, (i + 1) % n)
                : keep((i + 1) % n)
    };
}
