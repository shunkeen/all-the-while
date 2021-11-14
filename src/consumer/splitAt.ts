import { HiddenStateConsumer, keep, quit } from "../datatype/machine";

export function splitAt<I>(n: number): HiddenStateConsumer<I, readonly [ReadonlyArray<I>, ReadonlyArray<I>]> {
    const tuple: readonly [I[], I[]] = [[], []]; 
    return {
        init: undefined,
        next: (_, option) => option.kind === "none"
            ? quit(tuple)
            : tuple[0].length <= n
                ? keep(void tuple[0].push(option.value))
                : keep(void tuple[1].push(option.value))
    };
}
