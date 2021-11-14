import { Option, none, some } from "../datatype/option";
import { Prosumer, done, send, keep } from "../datatype/machine";

export function scan1<I>(scanner: (accumulator: I, value: I) => I): Prosumer<I, Option<I>, I> {
    return {
        init: none,
        next: (optionX, optionY) => {
            if(optionY.kind === "none")
                return done;

            if(optionX.kind === "none")
                return send(optionY.value, optionY);

            const value = scanner(optionX.value, optionY.value);
            return send(value, some(value));
        }
    };
}
