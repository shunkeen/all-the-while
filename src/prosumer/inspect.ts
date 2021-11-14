import { Prosumer, done, send } from "../datatype/machine";

export function inspect<I>(body: (value: I) => void): Prosumer<I, void, I> {
    return {
        init: undefined,
        next: (_, option) => option.kind === "none"
            ? done
            : send(option.value, body(option.value))
    };
}
