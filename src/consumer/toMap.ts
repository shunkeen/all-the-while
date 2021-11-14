import { HiddenStateConsumer, quit, keep } from "../datatype/machine";

export function toMap<I, K>(toKey: (value: I) => K): HiddenStateConsumer<I, ReadonlyMap<K, ReadonlyArray<I>>> {
    const accumulator = new Map<K, I[]>();
    return {
        init: undefined,
        next: (_, option) => {
            if(option.kind === "none")
                return quit(accumulator);
            
            const key = toKey(option.value);
            if(accumulator.has(key))
                accumulator.set(key, []);

            accumulator.get(key)!.push(option.value);
            return keep(undefined);
        }
    };
}
