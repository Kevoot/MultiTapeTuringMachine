export type Transition = {
    state: string,
    in: string,
    out: string,
    dir: Direction,
    next: string;
};

export type Direction = "L" | "R";