import { Consumer, keep, quit } from "../datatype/machine";

export function lastOr<R>(defaultValue: R): Consumer<R, R, R> {
    return {
        init: defaultValue,
        next: (value, option) => option.kind === "none"
            ? quit(value)
            : keep(option.value)
    };
}
