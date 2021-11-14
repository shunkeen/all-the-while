import { StatelessProsumer, done, send } from "../datatype/machine";

export function map<I, O>(transformer: (value: I) => O): StatelessProsumer<I, O> {
    return {
        init: undefined,
        next: (_, option) => option.kind === "none"
            ? done
            : send(transformer(option.value), undefined)
    };
}
