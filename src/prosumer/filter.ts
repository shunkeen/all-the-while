import { StatelessProsumer, done, keep, send } from "../datatype/machine";

export function filter<I>(predicate: (value: I) => boolean): StatelessProsumer<I, I> {
    return {
        init: undefined,
        next: (_, option) => option.kind === "none"
            ? done
            : predicate(option.value)
                ? send(option.value, undefined)
                : keep(undefined)
    };
}
