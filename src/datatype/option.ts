export type Option<T> = None | Some<T>;

export type None = Readonly<{
    kind: "none"
}>;
export const none: None = {
    kind: "none"
};

export type Some<T> = Readonly<{
    kind: "some",
    value: T
}>;
export function some<T>(value: T): Some<T> {
    return {
        kind: "some",
        value
    };
}
