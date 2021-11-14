import { Consumer, quit, keep } from "../datatype/machine";
import { Option, none } from "../datatype/option";

export function maxBy<R>(comparator: (x: R, y: R) => number): Consumer<R, Option<R>, Option<R>> {
    return {
        init: none,
        next: (optionX, optionY) => optionY.kind === "none"
            ? quit(optionX)
            : optionX.kind === "some" && comparator(optionX.value, optionY.value) >= 0 
                ? keep(optionX)
                : keep(optionY)
    };
}
