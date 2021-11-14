import { StatelessProducer, send } from "../datatype/machine";

export function repeat<O>(value: O): StatelessProducer<O> {
    const step = send(value, undefined);
    return {
        init: undefined,
        next: _ => step
    };
}
