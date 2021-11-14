import { Consumer, keep, quit } from "../datatype/machine";
import { Option, none, some } from "../datatype/option";

export function nth<R>(n: number): Consumer<R, number, Option<R>> {
    return {
        init: 0,
        next: (i, option) => i > n || option.kind === "none"
            ? quit(none)
            : i === n
                ? quit(some(option.value))
                : keep(i + 1)
    };
}
