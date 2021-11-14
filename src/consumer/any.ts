import { StatelessConsumer, quit, keep } from "../datatype/machine";

export function any<I>(predicate: (value: I) => boolean): StatelessConsumer<I, boolean> {
    return {
        init: undefined,
        next: (_, option) => option.kind === "none"
            ? quit(false)
            : predicate(option.value)
                ? quit(true)
                : keep(undefined)
    };
}
