import { Producer, done, Keep, keep, send, Send } from "../datatype/machine";
import { none } from "../datatype/option";

type S<S0, O0, S1, O1> = readonly [Keep<S0> | Send<S0, O0>, Keep<S1> | Send<S1, O1>];
type O<O0, O1> = readonly [O0, O1];

export function zip<S0, O0, S1, O1>(producer0: Producer<S0, O0>, producer1: Producer<S1, O1>): Producer<S<S0, O0, S1, O1>, O<O0, O1>> {
    return {
        init: [keep(producer0.init), keep(producer1.init)],
        next: ([_step0, _step1]) => {
            const step0 = _step0.kind === "send"
                ? _step0
                : producer0.next(_step0.state, none);

            const step1 = _step1.kind === "send"
                ? _step1
                : producer1.next(_step1.state, none);
            
            if(step0.kind === "quit" || step1.kind === "quit")
                return done;
            
            if(step0.kind === "keep" || step1.kind === "keep")
                return keep([step0, step1]);

            const value = [step0.value, step1.value] as const;
            const state = [keep(step0.state), keep(step1.state)] as const;
            return send(value, state);
        }
    };
}
