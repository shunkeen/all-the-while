import { Producer, Done, Keep, keep, Send, done, send } from "../datatype/machine";
import { none } from "../datatype/option";

type Thunk<O> = () => Done | Keep<Thunk<O>> | Send<Thunk<O>, O>;

export function flatMap<S, T, U, O>(producer: Producer<S, T>, transformer: (value: T) => Producer<U, O>): Producer<Thunk<O>, O> {
    return {
        init: parent(producer.init),
        next: thunk => thunk()
    };

    function parent(state: S): Thunk<O> {
        return () => {
            const step = producer.next(state, none);
            if(step.kind !== "send")
                return step.kind === "quit"
                    ? done
                    : keep(parent(step.state));

            const {next, init} = transformer(step.value);
            return keep(child(step.state, next, init));
        };
    }

    function child(stateP: S, rec: Producer<U, O>["next"], state: U): Thunk<O> {
        return () => {
            const step = rec(state, none);
            return step.kind === "quit"
                ? keep(parent(stateP))
                : {...step, state: child(stateP, rec, step.state)};
        };
    }
}
