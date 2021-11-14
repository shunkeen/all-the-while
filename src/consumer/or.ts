import { StatelessConsumer, quit, keep } from "../datatype/machine";

export const or: StatelessConsumer<boolean, boolean> = {
    init: undefined,
    next: (_, option) => option.kind === "none"
        ? quit(false)
        : option.value
            ? quit(true)
            : keep(undefined)
};
