import { HiddenStateConsumer, quit, keep } from "../datatype/machine";

export function toArray<I>(): HiddenStateConsumer<I, ReadonlyArray<I>> {
    const array: I[] = [];
    return {
        init: undefined,
        next: (_, option) => option.kind === "none"
            ? quit(array)
            : keep(void array.push(option.value))
    };
}
