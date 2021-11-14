import { Consumer, quit, keep } from "../datatype/machine";
import { Option, none, some } from "../datatype/option";

export function findLastIndex<I>(predicate: (value: I) => boolean): Consumer<I, readonly[number, Option<number>], Option<number>> {
    return {
        init: [0, none],
        next: ([i, prev], option) => option.kind === "none"
            ? quit(prev)
            : predicate(option.value)
                ? keep([i + 1, some(i)])
                : keep([i + 1, prev])
    };
}
