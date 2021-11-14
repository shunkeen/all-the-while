import { Consumer, quit, keep } from "../datatype/machine";
import { List, nil, cons } from "../datatype/list";

export function reduceRight<I, R>(init: R, reducer: (value: I, accumulator: R) => R): Consumer<I, readonly [R, List<I>], R> {
    return {
        init: [init, nil],
        next: ([accumulator, list], option) => option.kind === "some"
            ? keep([accumulator, cons(option.value, list)])
            : list.kind === "nil"
                ? quit(accumulator)
                : keep([reducer(list.head, accumulator), list.tail])
    };
}
