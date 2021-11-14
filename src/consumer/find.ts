import { Option, none } from "../datatype/option";
import { StatelessConsumer, keep, quit } from "../datatype/machine";

export function find<R>(predicate: (value: R) => boolean): StatelessConsumer<R, Option<R>> {
    return {
        init: undefined,
        next: (_, option) => option.kind === "none"
            ? quit(none)
            : predicate(option.value)
                ? quit(option)
                : keep(undefined)
    };
}
