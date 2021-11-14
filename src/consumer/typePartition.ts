import { HiddenStateConsumer, keep, Prosumer, quit } from "../datatype/machine";

export function typePartition<I, J extends I>(predicate: (value: I) => value is J): HiddenStateConsumer<I, readonly [ReadonlyArray<J>, ReadonlyArray<I>]> {
    const tuple: readonly [J[], I[]] = [[], []];
    return {
        init: undefined,
        next: (_, option) => option.kind === "none"
            ? quit(tuple)
            : predicate(option.value)
                ? keep(void tuple[0].push(option.value))
                : keep(void tuple[1].push(option.value))
    }
}
