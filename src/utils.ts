export type Transition = {
    state: string,
    in: string,
    out1: string,
    out2: string,
    out3: string,
    dir1: Direction,
    dir2: Direction,
    dir3: Direction,
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