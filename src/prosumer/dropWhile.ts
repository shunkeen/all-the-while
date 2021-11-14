import { Prosumer, done, send, keep } from "../datatype/machine";

export function dropWhile<I>(predicate: (value: I) => boolean): Prosumer<I, boolean, I> {
    return {
        init: true,
        next: (flag, option) => option.kind === "none"
            ? done
            : flag && predicate(option.value)
                ? keep(true)
                : send(option.value, false)
    };
}
