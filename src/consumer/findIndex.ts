import { Consumer, quit, keep } from "../datatype/machine";
import { Option, none, some } from "../datatype/option";

export function findIndex<I>(predicate: (value: I) => boolean): Consumer<I, number, Option<number>> {
    return {
        init: 0,
        next: (i, option) => option.kind === "none"
            ? quit(none)
            : predicate(option.value)
                ? quit(some(i))
                : keep(i + 1)
    };
}
