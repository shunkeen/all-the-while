import { Prosumer, done, keep, send } from "../datatype/machine";
import { List, nil, cons } from "../datatype/list";

export function sortBy<I>(comparator: (x: I, y: I) => number): Prosumer<I, List<State<I>>, I> {
    return {
        init: nil,
        next: (stateList, option) => {
            if(stateList.kind === "nil")
                return option.kind === "none"
                    ? done
                    : keep(cons(state(option.value, nil, nil, nil), nil));

            const {head: {head, tail, lt, ge}, tail: stateTail} = stateList;

            if(option.kind === "some")
                return comparator(option.value, head) < 0
                    ?  keep(cons(state(head, tail, cons(option.value, lt), ge), stateTail))
                    :  keep(cons(state(head, tail, lt, cons(option.value, ge)), stateTail));

            
            if(tail.kind === "cons")
                return comparator(tail.head, head) < 0
                    ?  keep(cons(state(head, tail.tail, cons(tail.head, lt), ge), stateTail))
                    :  keep(cons(state(head, tail.tail, lt, cons(tail.head, ge)), stateTail));

            if(lt.kind === "cons") {
                const frameP = state(head, nil, nil, ge);
                const frameL = state(lt.head, lt.tail, nil, nil);
                return keep(cons(frameL, cons(frameP, stateTail)));
            }

            return ge.kind === "cons"
                ? send(head, cons(state(ge.head, ge.tail, nil, nil), stateTail))
                : send(head, stateTail);
        }
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
