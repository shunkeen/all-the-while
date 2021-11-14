import { HiddenStateProsumer, done, keep, send } from "../datatype/machine";

export function chunks<I>(n: number): HiddenStateProsumer<I, ReadonlyArray<I>> {
    if(n < 0) {
        return {
            init: undefined,
            next: _ => done
        };
    }

    if(n === 0) {
        let inf = false;
        return {
            init: undefined,
            next: (_, option) => {
                inf ||= option.kind === "some";
                return inf
                    ? done
                    : send([], undefined);
            }
        };
    }

    let array: I[] = [];
    return {
        init: undefined,
        next: (_, option) => {
            if(option.kind === "none" && array.length === 0)
                return done;

            if(option.kind === "some") {
                array.push(option.value);
                if(array.length < n)
                    return keep(undefined);
            }

            const result = array;
            array = [];
            return send(result, undefined);
        }
    };
}
