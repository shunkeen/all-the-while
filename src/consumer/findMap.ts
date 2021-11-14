import { Option, none } from "../datatype/option";
import { StatelessConsumer, keep, quit } from "../datatype/machine";

export function findMap<I, R>(transformer: (value: I) => Option<R>): StatelessConsumer<I, Option<R>> {
    return {
        init: undefined,
        next: (_, option) => {
            if(option.kind === "none")
                return quit(none);
            
            const optionR = transformer(option.value)
            return optionR.kind === "none"
                ? keep(undefined)
                : quit(optionR);
        }
    };
}
