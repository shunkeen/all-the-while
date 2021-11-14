import { StatelessProsumer, done, keep, send } from "../datatype/machine";

export function typeFilter<I, O extends I>(typeGuard: (value: I) => value is O): StatelessProsumer<I, O> {
    return {
        init: undefined,
        next: (_, option) => option.kind === "none"
            ? done
            : typeGuard(option.value)
                ? send(option.value, undefined)
                : keep(undefined)
    };
}
