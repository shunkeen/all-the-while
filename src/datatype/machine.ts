import { Option } from "./option";

// I = Input, S = State, O = Output, R = Result
export type Machine<I, S, O, R> = Readonly<{
    next: (state: S, option: Option<I>) => Quit<R> | Keep<S> | Send<S, O>,
    init: S
}>;

export type Hermit<S, R> = Machine<never, S, void, R>; // TailRec
export type Explosion<S, R> = Machine<never, S, S, R>; // LeafRec
export type Implosion<S, R> = Machine<R, S, S, R>; // Rec

export type Producer<S, O> = Machine<never, S, O, void>;
export type Prosumer<I, S, O> = Machine<I, S, O, void>;
export type Consumer<I, S, R> = Machine<I, S, void, R>;
// export type Transducer = (machine: Machine) => Machine;

export type StatelessProducer<O> = Machine<never, undefined, O, void>;
export type StatelessProsumer<I, O> = Machine<I, undefined, O, void>;
export type StatelessConsumer<I, R> = Machine<I, undefined, void, R>;

export type HiddenStateProducer<O> = Machine<never, void, O, void>;
export type HiddenStateProsumer<I, O> = Machine<I, void, O, void>;
export type HiddenStateConsumer<I, R> = Machine<I, void, void, R>;

export type Done = Quit<void>;
export const done: Done = quit(undefined);

export type Quit<V> = Readonly<{
    kind: "quit",
    value: V
}>;
export function quit<V>(value: V): Quit<V> {
    return {
        kind: "quit",
        value
    };
}

export function keep<S>(state: S): Keep<S> {
    return {
        kind: "keep",
        state
    };
}
export type Keep<S> = Readonly<{
    kind: "keep",
    state: S
}>;

export type Send<S, V> = Readonly<{
    kind: "send",
    value: V,
    state: S
}>;
export function send<S, V>(value: V, state: S): Send<S, V> {
    return {
        kind: "send",
        value,
        state
    };
}
