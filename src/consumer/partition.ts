import { HiddenStateConsumer, keep, Prosumer, quit } from "../datatype/machine";

export function partition<I>(predicate: (value: I) => boolean): HiddenStateConsumer<I, readonly [ReadonlyArray<I>, ReadonlyArray<I>]> {
    const tuple: readonly [I[], I[]] = [[], []];
    return {
        init: undefined,
        next: (_init_, option) => option.kind === "none"
            ? quit(tuple)
            : predicate(option.value)
                ? keep(void tuple[0].push(option.value))
                : keep(void tuple[1].push(option.value))
    }
}
