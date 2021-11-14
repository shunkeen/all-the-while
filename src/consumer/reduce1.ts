import { Consumer, quit, keep } from "../datatype/machine";
import { Option, none, some } from "../datatype/option";

export function reduce1<I>(reducer: (x: I, y: I) => I): Consumer<I, Option<I>, Option<I>> {
    return {
        init: none,
        next: (optionX, optionY) => optionY.kind === "none"
            ? quit(optionX)
            : optionX.kind === "none"
                ? keep(optionY)
                : keep(some(reducer(optionX.value, optionY.value)))
    };
}
