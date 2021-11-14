import { Option, none, some } from "../datatype/option";
import { Prosumer, done, send, keep } from "../datatype/machine";
import { List, nil, cons } from "../datatype/list";

export function scanRight1<I>(scanner: (value: I, accumulator: I) => I): Prosumer<I, readonly [Option<I>, List<I>], I> {
    return {
        init: [none, nil],
        next: ([optionX, list], optionY) => {
            if(optionY.kind === "some")
                return keep([optionX, cons(optionY.value, list)]);

            if(list.kind === "nil")
                return done;

            if(optionX.kind === "none")
                return send(list.head, [some(list.head), list.tail]);
            
            const value = scanner(list.head, optionX.value);
            return send(value, [some(value), list.tail]);
        }
    };
}
