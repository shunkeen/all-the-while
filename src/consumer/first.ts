import { StatelessConsumer, quit } from "../datatype/machine";
import { Option } from "../datatype/option";

export function first<R>(): StatelessConsumer<R, Option<R>>{
    return {
        init: undefined,
        next: (_, option) => quit(option)
    };
}
