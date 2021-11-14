import { HiddenStateProducer, done, send } from "../datatype/machine";

export function fromIterable<O>(iterable: Iterable<O>): HiddenStateProducer<O> {
    const iterator = iterable[Symbol.iterator]();
    return {
        init: undefined,
        next: () => {
            const result = iterator.next();
            return result.done
                ? done
                : send(result.value, undefined);
        }
    }
}
