import { MachineConfig, Transition } from "../utils";

export const binaryAdditionTransitions: Transition[] = [
    {
        state: "a",
        in: "_",
        out: "_",
        dir: "R",
        next: "a"
    },
    {
        state: "a",
        in: "1",
        out: "1",
        dir: "R",
        next: "b"
    },
    {
        state: "a",
        in: "0",
        out: "0",
        dir: "R",
        next: "b"
    },
    {
        state: "b",
        in: "B",
        out: "B",
        dir: "R",
        next: "b"
    },
    {
        state: "b",
        in: "A",
        out: "A",
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
        in: "0",
        out: "0",
        dir: "R",
        next: "b"
    },
    {
        state: "b",
        in: "_",
        out: "_",
        dir: "R",
        next: "c"
    },
    {
        state: "c",
        in: "1",
        out: "1",
        dir: "R",
        next: "c"
    },
    {
        state: "c",
        in: "0",
        out: "0",
        dir: "R",
        next: "c"
    },
    {
        state: "c",
        in: "_",
        out: "_",
        dir: "L",
        next: "d"
    },
    {
        state: "d",
        in: "0",
        out: "_",
        dir: "L",
        next: "e"
    },
    {
        state: "d",
        in: "_",
        out: "_",
        dir: "L",
        next: "k"
    },
    {
        state: "d",
        in: "1",
        out: "_",
        dir: "L",
        next: "g"
    },
    {
        state: "e",
        in: "1",
        out: "1",
        dir: "L",
        next: "e"
    },
    {
        state: "e",
        in: "0",
        out: "0",
        dir: "L",
        next: "e"
    },
    {
        state: "e",
        in: "_",
        out: "_",
        dir: "L",
        next: "f"
    },
    {
        state: "f",
        in: "B",
        out: "B",
        dir: "L",
        next: "f"
    },
    {
        state: "f",
        in: "A",
        out: "A",
        dir: "L",
        next: "f"
    },
    {
        state: "f",
        in: "0",
        out: "A",
        dir: "R",
        next: "b"
    },
    {
        state: "f",
        in: "1",
        out: "B",
        dir: "R",
        next: "b"
    },
    {
        state: "g",
        in: "1",
        out: "1",
        dir: "L",
        next: "g"
    },
    {
        state: "g",
        in: "0",
        out: "0",
        dir: "L",
        next: "g"
    },
    {
        state: "g",
        in: "_",
        out: "_",
        dir: "L",
        next: "h"
    },
    {
        state: "h",
        in: "B",
        out: "B",
        dir: "L",
        next: "h"
    },
    {
        state: "h",
        in: "A",
        out: "A",
        dir: "L",
        next: "h"
    },
    {
        state: "h",
        in: "0",
        out: "B",
        dir: "R",
        next: "b"
    },
    {
        state: "h",
        in: "1",
        out: "A",
        dir: "L",
        next: "i"
    },
    {
        state: "i",
        in: "1",
        out: "0",
        dir: "L",
        next: "i"
    },
    {
        state: "i",
        in: "_",
        out: "1",
        dir: "R",
        next: "b"
    },
    {
        state: "i",
        in: "0",
        out: "1",
        dir: "R",
        next: "b"
    },
    {
        state: "k",
        in: "B",
        out: "1",
        dir: "L",
        next: "k"
    },
    {
        state: "k",
        in: "A",
        out: "0",
        dir: "L",
        next: "k"
    },
    {
        state: "k",
        in: "1",
        out: "1",
        dir: "R",
        next: "A"
    },
    {
        state: "k",
        in: "0",
        out: "0",
        dir: "R",
        next: "A"
    },
    {
        state: "k",
        in: "_",
        out: "_",
        dir: "R",
        next: "A"
    },
];

export const binaryAdditionMachine: MachineConfig = {
    Q: ["A", "R", "a", "b", "c", "d", "e", "f", "g", "h", "i", "k"],
    gamma: ["_", "0", "1", "A", "B"],
    start: "a",
    accept: "A",
    reject: "R",
    transitions: binaryAdditionTransitions,
    wildcard: "*"
}

export const binaryAdditionTapeData = ["1", "0", "0", "_", "0", "0", "1"];