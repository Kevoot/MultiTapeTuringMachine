import { Transition, MachineConfig } from "../utils";

const classExampleTransitions: Transition[] = [
    {
        state: "a",
        in: "_",
        out: "_",
        dir: "R",
        next: "R"
    },
    {
        state: "a",
        in: "#",
        out: "#",
        dir: "R",
        next: "g"
    },
    {
        state: "a",
        in: "0",
        out: "_",
        dir: "R",
        next: "b"
    },
    {
        state: "a",
        in: "1",
        out: "_",
        dir: "R",
        next: "e"
    },
    {
        state: "b",
        in: "0",
        out: "0",
        dir: "R",
        next: "b"
    },
    {
        state: "b",
        in: "1",
        out: "1",
        dir: "R",
        next: "b"
    },
    {
        state: "b",
        in: "#",
        out: "#",
        dir: "R",
        next: "c"
    },
    {
        state: "c",
        in: "x",
        out: "x",
        dir: "R",
        next: "c"
    },
    {
        state: "c",
        in: "0",
        out: "x",
        dir: "L",
        next: "d"
    },
    {
        state: "d",
        in: "0",
        out: "0",
        dir: "L",
        next: "d"
    },
    {
        state: "d",
        in: "1",
        out: "1",
        dir: "L",
        next: "d"
    },
    {
        state: "d",
        in: "x",
        out: "x",
        dir: "L",
        next: "d"
    },
    {
        state: "d",
        in: "#",
        out: "#",
        dir: "L",
        next: "d"
    },
    {
        state: "d",
        in: "_",
        out: "_",
        dir: "R",
        next: "a"
    },
    {
        state: "e",
        in: "0",
        out: "0",
        dir: "R",
        next: "e"
    },
    {
        state: "e",
        in: "1",
        out: "1",
        dir: "R",
        next: "e"
    },
    {
        state: "e",
        in: "#",
        out: "#",
        dir: "R",
        next: "f"
    },
    {
        state: "f",
        in: "x",
        out: "x",
        dir: "R",
        next: "f"
    },
    {
        state: "f",
        in: "1",
        out: "x",
        dir: "L",
        next: "d"
    },
    {
        state: "g",
        in: "x",
        out: "x",
        dir: "R",
        next: "g"
    },
    {
        state: "g",
        in: "_",
        out: "_",
        dir: "L",
        next: "A"
    },
]

export const classExampleMachine: MachineConfig = {
    Q: ["A", "R", "a", "b", "c", "d", "e", "f", "g"],
    gamma: ["_", "0", "1", "x", "#"],
    start: "a",
    accept: "A",
    reject: "R",
    transitions: classExampleTransitions
}

export const classExampleTapeData = ["1", "0", "#", "1", "0"];
