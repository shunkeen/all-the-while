import { Producer, Prosumer, Consumer } from "../datatype/machine";
import { Option } from "../datatype/option";
import { link } from "./link";
import { gun } from "../runner/gun";
import { run } from "../runner/run";

export type Links<S, O> = Readonly<{
    producer: Producer<S, O>,
    gun: () => Generator<O>,
    link: <T, P>(prosumer: Prosumer<O, T, P>) => Links<readonly [Option<S>, T], P>,
    run: <T, R>(consumer: Consumer<O, T, R>) => R,
}>;

export function links<S, O>(producer: Producer<S, O>): Links<S, O> {
    return {
        producer,

        gun: () =>
            gun(producer),

        link: <T, P>(prosumer: Prosumer<O, T, P>) =>
            links(link<never, S, O, T, P, void>(producer, prosumer)),

        run: <T, R>(consumer: Consumer<O, T, R>) =>
            run(link<never, S, O, T, void, R>(producer, consumer))
    };
}
