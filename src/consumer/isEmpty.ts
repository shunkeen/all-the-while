import { StatelessConsumer, quit } from "../datatype/machine";

export const isEmpty: StatelessConsumer<unknown, boolean> = {
    init: undefined,
    next: (_, option) => quit(option.kind === "none")
};
