import { List } from "../datatype/list";
import { Producer, done, send } from "../datatype/machine";

export function fromList<O>(list: List<O>): Producer<List<O>, O> {
    return {
        init: list,
        next: ls => ls.kind === "nil"
            ? done
            : send(ls.head, ls.tail)
    };
}
