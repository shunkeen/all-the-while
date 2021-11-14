import { Machine, done, keep } from "../datatype/machine";
import { Option, some, none } from "../datatype/option";

export function link<I, S, T, U, O, R>(left: Machine<I, S, T, unknown>, right: Machine<T, U, O, R>): Machine<I, readonly [Option<S>, U], O, R> {
    return {
        init: [some(left.init), right.init],

        next: ([optionL, stateR], option) => {
            const stepL = optionL.kind === "none"
                ? done
                : left.next(optionL.value, option);

            const stepR = stepL.kind === "keep"
                ? keep(stateR)
                : stepL.kind === "quit"
                    ? right.next(stateR, none)
                    : right.next(stateR, some(stepL.value));
            
            return stepR.kind === "quit"
                ? stepR
                : stepL.kind === "quit"
                    ? {...stepR, state: [none, stepR.state]}
                    : {...stepR, state: [some(stepL.state), stepR.state]};
        }
    }
}
