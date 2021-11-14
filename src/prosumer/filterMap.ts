import { StatelessProsumer, done, send, keep } from "../datatype/machine";
import { Option } from "../datatype/option";

export function filterMap<I, O>(transformer: (value: I) => Option<O>): StatelessProsumer<I, O> {
    return {
        init: undefined,
        next: (_, option) => {
            if(option.kind === "none")
                return done;
            
            const result = transformer(option.value);
            return result.kind === "none"
                ? keep(undefined)
                : send(result.value, undefined)
        }
    };
}
