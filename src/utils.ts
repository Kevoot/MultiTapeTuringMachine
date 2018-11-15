export type Transition = {
    state: string,
    in: string,
    out: string,
    dir: Direction,
    next: string;
};

export type Direction = "L" | "R" | "*";

export type MachineConfig = {
    Q: string[],
    gamma: string[],
    start: string,
    accept: string,
    reject: string,
    transitions: Transition[],
    wildcard?: string
}

export const PADDING = 10;