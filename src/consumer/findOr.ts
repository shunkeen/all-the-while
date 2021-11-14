import { StatelessConsumer, keep, quit } from "../datatype/machine";

export function findOr<R>(defaultValue: R, predicate: (value: R) => boolean): StatelessConsumer<R, R> {
    return {
        init: undefined,
        next: (_, option) => option.kind === "none"
            ? quit(defaultValue)
            : predicate(option.value)
                ? quit(option.value)
                : keep(undefined)
    };
}
