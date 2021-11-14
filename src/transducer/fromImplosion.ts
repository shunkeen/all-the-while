import { Implosion, Hermit, quit, keep } from "../datatype/machine";
import { List, nil, cons } from "../datatype/list";
import { Option, none, some } from "../datatype/option";

export function fromImplosion<S, R>(rec: Implosion<S, R>): Hermit<readonly [S, List<S>, Option<R>], R> {
    return {
        init: [rec.init, nil, none],
        next: ([head, tail, option]) => {
            const step = rec.next(head, option);
            if(step.kind === "quit")
                return tail.kind === "nil"
                    ? quit(step.value)
                    : keep([tail.head, tail.tail, some(step.value)]);

            return step.kind === "keep"
                ? keep([step.state, tail, none])
                : keep([step.value, cons(step.state, tail), none]);
        }
    }
}
