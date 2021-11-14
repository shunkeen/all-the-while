import { Prosumer, done, send } from "../datatype/machine";

export function withIndex<I>(): Prosumer<I, number, readonly [number, I]> {
    return {
        init: 0,
        next: (i, option) => option.kind === "none"
            ? done
            : send([i, option.value] as const, i + 1)
    };
}
