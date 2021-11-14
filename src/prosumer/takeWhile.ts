import { StatelessProsumer, done, send } from "../datatype/machine";

export function takeWhile<I>(predicate: (value: I) => boolean): StatelessProsumer<I, I> {
    return {
        init: undefined,
        next: (_, option) => option.kind === "some" && predicate(option.value)
            ? send(option.value, undefined)
            : done
    };
}
