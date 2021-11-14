import { keep, quit, StatelessConsumer } from "../datatype/machine";

export const and: StatelessConsumer<boolean, boolean> = {
    init: undefined,
    next: (_, option) => option.kind === "none"
        ? quit(true)
        : option.value
            ? keep(undefined)
            : quit(false)
};
