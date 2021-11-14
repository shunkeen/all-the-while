import { Option, none, some } from "../datatype/option";
import { Prosumer, done, send, keep } from "../datatype/machine";
import { List, nil, cons } from "../datatype/list";

export function scanRight<I, O>(last: O, scanner: (value: I, accumulator: O) => O): Prosumer<I, readonly [Option<O>, List<I>], O> {
    return {
        init: [some(last), nil],
        next: ([optionX, list], optionY) => {
            if(optionY.kind === "some")
                return keep([optionX, cons(optionY.value, list)]);

            if(optionX.kind === "none")
                return done;

            return list.kind === "nil"
                ? send(optionX.value, [none, nil])
                : send(optionX.value, [some(scanner(list.head, optionX.value)), list.tail]);
        }
    };
}
