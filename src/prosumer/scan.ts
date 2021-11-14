import { Prosumer, done, send } from "../datatype/machine";
import { Option, none, some } from "../datatype/option";

export function scan<I, O>(first: O, scanner: (accumulator: O, value: I) => O): Prosumer<I, Option<O>, O> {
    return {
        init: some(first),
        next: (optionX, optionY) => optionX.kind === "none"
            ? done
            : optionY.kind === "none"
                ? send(optionX.value, none)
                : send(optionX.value, some(scanner(optionX.value, optionY.value)))
    };
}
