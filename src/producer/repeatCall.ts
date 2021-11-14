import { HiddenStateProducer, send } from "../datatype/machine";

export function repeatCall<O>(callback: () => O): HiddenStateProducer<O> {
    return {
        init: undefined,
        next: () => send(callback(), undefined)
    };
}
