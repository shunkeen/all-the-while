import { StatelessConsumer, quit, keep } from "../datatype/machine";

export function all<I>(predicate: (value: I) => boolean): StatelessConsumer<I, boolean> {
    return {
        init: undefined,
        next: (_, option) => option.kind === "none"
            ? quit(true)
            : predicate(option.value)
                ? keep(undefined)
                : quit(false)
    };
}
