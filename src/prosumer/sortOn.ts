import { Prosumer, done, keep, send } from "../datatype/machine";
import { List, nil, cons } from "../datatype/list";

export function sortOn<I, K>(toKey: (value: I) => K): Prosumer<I, List<State<Tuple<I, K>>>, I> {
    return {
        init: nil,
        next: (stateList, option) => {
            if(stateList.kind === "nil")
                return option.kind === "none"
                    ? done
                    : keep(cons(state(tuple(option.value, toKey(option.value)), nil, nil, nil), nil));

            const {head: {head, tail, lt, ge}, tail: stateTail} = stateList;

            if(option.kind === "some") {
                const t = tuple(option.value, toKey(option.value));
                return t.key < head.key
                    ?  keep(cons(state(head, tail, cons(t, lt), ge), stateTail))
                    :  keep(cons(state(head, tail, lt, cons(t, ge)), stateTail));
            }
            
            if(tail.kind === "cons")
                return tail.head.key < head.key
                    ?  keep(cons(state(head, tail.tail, cons(tail.head, lt), ge), stateTail))
                    :  keep(cons(state(head, tail.tail, lt, cons(tail.head, ge)), stateTail));

            if(lt.kind === "cons") {
                const frameP = state(head, nil, nil, ge);
                const frameL = state(lt.head, lt.tail, nil, nil);
                return keep(cons(frameL, cons(frameP, stateTail)));
            }

            return ge.kind === "cons"
                ? send(head.value, cons(state(ge.head, ge.tail, nil, nil), stateTail))
                : send(head.value, stateTail);
        }
    };
}

type Tuple<I, K> = {
    value: I,
    key: K
};
function tuple<I, K>(value: I, key: K): Tuple<I, K> {
    return {
        value,
        key
    };
}

type State<I> = Readonly<{
    head: I,
    tail: List<I>
    lt: List<I>,
    ge: List<I>,
}>;
function state<I>(head: I, tail: List<I>, lt: List<I>, ge: List<I>): State<I> {
    return { head, tail, lt, ge };
}
