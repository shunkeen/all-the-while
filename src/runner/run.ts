import { Hermit, keep } from "../datatype/machine";
import { none } from "../datatype/option";

export function run<S, R>(hermit: Hermit<S, R>): R {
    let step: ReturnType<typeof hermit.next> = keep(hermit.init);
    while(step.kind !== "quit") {
        step = hermit.next(step.state, none);
    }
    return step.value;
}
