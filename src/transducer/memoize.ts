import { Producer, Done, Keep, Send } from "../datatype/machine";
import { Option, none, some } from "../datatype/option";

type Thunk<O> = () => Done | Keep<Thunk<O>> | Send<Thunk<O>, O>;

export function memoize<S, O>(producer: Producer<S, O>): Producer<Thunk<O>, O> {
    return {
        init: memo(toThunk(producer.init)),
        next: thunk => thunk()
    };

    function toThunk(state: S): Thunk<O> {
        return () => {
            const stepP = producer.next(state, none);
            return stepP.kind === "quit"
                ? stepP
                : {...stepP, state: memo(toThunk(stepP.state))};
        };
    }

    function memo(thunk: Thunk<O>): Thunk<O> {
        let option: Option<ReturnType<Thunk<O>>> = none;
        return () => {
            if(option.kind === "none") {
                option = some(thunk());
            }
            return option.value;
        }
    }
}
