import { StatelessConsumer, quit } from "../datatype/machine";

export function firstOr<R>(defaultValue: R): StatelessConsumer<R, R> {
    return {
        init: undefined,
        next: (_, option) => option.kind === "none"
            ? quit(defaultValue)
            : quit(option.value)
    };
}
