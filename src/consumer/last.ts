import { Consumer, keep, quit } from "../datatype/machine";
import { Option, none } from "../datatype/option";

export function last<I>(): Consumer<I, Option<I>, Option<I>> {
    return {
        init: none,
        next: (prev, option) => option.kind === "none"
            ? quit(prev)
            : keep(option)
    };
}
