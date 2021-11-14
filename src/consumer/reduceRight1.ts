import { Consumer, quit, keep } from "../datatype/machine";
import { Option, none, some } from "../datatype/option";
import { List, nil, cons } from "../datatype/list";

export function reduceRight1<I>(reducer: (x: I, y: I) => I): Consumer<I, readonly [Option<I>, List<I>], Option<I>> {
    return {
        init: [none, nil],
        next: ([optionX, list], optionY) => optionY.kind === "some"
            ? keep([optionX, cons(optionY.value, list)])
            : list.kind === "nil"
                ? quit(optionX)
                : optionX.kind === "none"
                    ? keep([some(list.head), list.tail])
                    : keep([some(reducer(list.head, optionX.value)), list.tail])
    };
}
