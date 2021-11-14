import { Producer, keep } from "../datatype/machine";
import { none } from "../datatype/option";

export function* gun<S, O>(producer: Producer<S, O>): Generator<O> {
    let step: ReturnType<typeof producer.next> = keep(producer.init);
    while(step.kind !== "quit") {
        step = producer.next(step.state, none);
        if(step.kind === "send")
            yield step.value;
    }
}
