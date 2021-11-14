
import { Prosumer, done, keep, send } from "../datatype/machine";
import { List, nil, cons } from "../datatype/list";

export function reverse<I>(): Prosumer<I, List<I>, I>{
    return {
        init: nil,
        next: (list, option) => option.kind === "some"
            ? keep(cons(option.value, list))
            : list.kind === "nil"
                ? done
                : send(list.head, list.tail)
    };
}
