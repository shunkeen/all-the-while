import { HiddenStateConsumer, keep, quit } from "../datatype/machine";


export function toSet<I>(): HiddenStateConsumer<I, ReadonlySet<I>> {
    const accumulator = new Set<I>();
    return {
        init: undefined,
        next: (_, option) => option.kind === "none"
            ? quit(accumulator)
            : keep(void accumulator.add(option.value))
    };
}
