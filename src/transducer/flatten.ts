import { Producer, Done, Keep, keep, Send, done, send } from "../datatype/machine";
import { none } from "../datatype/option";

type Thunk<O> = () => Done | Keep<Thunk<O>> | Send<Thunk<O>, O>;

export function flatten<S, T, O>(producer: Producer<S, Producer<T, O>>): Producer<Thunk<O>, O> {
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

            const {next: rec, init: arg} = step.value;
            return keep(child(step.state, rec, arg));
        };
    }

    function child(stateP: S, rec: Producer<T, O>["next"], state: T): Thunk<O> {
        return () => {
            const step = rec(state, none);
            return step.kind === "quit"
                ? keep(parent(stateP))
                : {...step, state: child(stateP, rec, step.state)};
        };
    }
}
