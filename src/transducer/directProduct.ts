import { Producer, done, Keep, keep, send, Send } from "../datatype/machine";
import { none } from "../datatype/option";

type S<S0, O0, S1> = readonly [Keep<S0> | Send<S0, O0>, Keep<S1>];
type O<O0, O1> = readonly [O0, O1];

export function directProduct<S0, O0, S1, O1>(producer0: Producer<S0, O0>, producer1: Producer<S1, O1>): Producer<S<S0, O0, S1>, O<O0, O1>> {
    return {
        init: [keep(producer0.init), keep(producer1.init)],
        next: ([_step0, _step1]) => {
            if(_step0.kind === "keep") {
                const step0 = producer0.next(_step0.state, none);
                return step0.kind === "quit"
                    ? done
                    : keep([step0, _step1]);
            }
            
            const step1 = producer1.next(_step1.state, none);
            if(step1.kind === "quit")
                return keep([keep(_step0.state), keep(producer1.init)])
            
            if(step1.kind === "keep")
                return keep([_step0, step1]);

            const value = [_step0.value, step1.value] as const;
            const state = [_step0, keep(step1.state)] as const;
            return send(value, state);
        }
    };
}
