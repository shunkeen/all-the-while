import { Producer, done } from "../datatype/machine";

export const empty: Producer<unknown, never> = {
    init: undefined,
    next: _ => done
};
