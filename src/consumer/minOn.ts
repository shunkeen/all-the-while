import { Consumer, quit, keep } from "../datatype/machine";
import { Option, none, some } from "../datatype/option";

export function minOn<R, K>(toKey: (value: R) => K): Consumer<R, Option<readonly [R, K]>, Option<R>> {
    return {
        init: none,
        next: (optionX, optionY) => {
            if(optionY.kind === "none")
                return optionX.kind === "none"
                    ? quit(none)
                    : quit(some(optionX.value[0]));

            const key = toKey(optionY.value);
            return optionX.kind === "some" && optionX.value[1] <= key
                ? keep(optionX)
                : keep(some([optionY.value, key]));
        }
    };
}
