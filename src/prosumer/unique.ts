import { done, keep, Prosumer, send } from "../datatype/machine";
import { Option, none } from "../datatype/option";

export function unique<I>(): Prosumer<I, Option<I>, I> {
    return {
        init: none,
        next: (optionX, optionY) => optionY.kind === "none"
            ? done
            : optionX.kind === "none" || optionX.value !== optionY.value
                ? send(optionY.value, optionY)
                : keep(optionX)
    };
}
