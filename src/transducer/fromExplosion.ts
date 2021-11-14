import { Explosion, Producer, done, keep, send } from "../datatype/machine";
import { List, nil, cons } from "../datatype/list";
import { none } from "../datatype/option";

export function fromExplosion<S, R>(explosion: Explosion<S, R>): Producer<List<S>, R> {
    return {
        init: cons(explosion.init, nil),
        next: list => {
            if(list.kind === "nil")
                return done;

            const {head, tail} = list;
            const step = explosion.next(head, none);
            if(step.kind === "quit")
                return send(step.value, tail);
            
            return step.kind === "keep"
                ? keep(cons(step.state, tail))
                : keep(cons(step.value, cons(step.state, tail)));
        }
    }
}
