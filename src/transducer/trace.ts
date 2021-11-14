import { Machine, quit, send } from "../datatype/machine";

export function trace<I, S>(machine: Machine<I, S, unknown, unknown>): Machine<I, S, S, S> {
    return {
        init: machine.init,
        next: (state, option) => {
            const step = machine.next(state, option);
            return step.kind === "quit"
                ? quit(state)
                : send(step.state, step.state);
        }
    };
}
