import { Option } from "../datatype/option";
import { Consumer, keep, quit } from "../datatype/machine";

export function nthOr<R>(n: number, defaultValue: R): Consumer<R, number, R> {
    return {
        init: 0,
        next: <R>(i: number, option: Option<R>) => i > n || option.kind === "none"
            ? quit(defaultValue)
            : i === n
                ? quit(option.value)
                : keep(i + 1)
    };
}
