import { Transition, MachineConfig } from "../utils";

export const binaryPalindromeTransitions: Transition[] = [
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
        next: "c"
    },
    {
        state: "a",
        in: "_",
        out: "_",
        dir: "R",
        next: "A"
    },
    {
        state: "b",
        in: "*",
        out: "*",
        dir: "R",
        next: "b"
    },
    {
        state: "b",
        in: "_",
        out: "_",
        dir: "L",
        next: "d"
    },
    {
        state: "c",
        in: "*",
        out: "*",
        dir: "R",
        next: "c"
    },
    {
        state: "c",
        in: "_",
        out: "_",
        dir: "L",
        next: "f"
    },
    {
        state: "d",
        in: "_",
        out: "_",
        dir: "R",
        next: "A"
    },
    {
        state: "d",
        in: "*",
        out: "*",
        dir: "R",
        next: "R"
    },
    {
        state: "d",
        in: "_",
        out: "_",
        dir: "R",
        next: "R"
    },
    {
        state: "d",
        in: "0",
        out: "_",
        dir: "L",
        next: "e"
    },
    {
        state: "e",
        in: "*",
        out: "*",
        dir: "L",
        next: "g"
    },
    {
        state: "e",
        in: "_",
        out: "_",
        dir: "R",
        next: "A"
    },
    {
        state: "f",
        in: "_",
        out: "_",
        dir: "R",
        next: "A"
    },
    {
        state: "f",
        in: "1",
        out: "_",
        dir: "L",
        next: "e"
    },
    {
        state: "f",
        in: "*",
        out: "*",
        dir: "R",
        next: "R"
    },
    {
        state: "g",
        in: "_",
        out: "_",
        dir: "R",
        next: "a"
    },
    {
        state: "g",
        in: "*",
        out: "*",
        dir: "L",
        next: "g"
    },
]

export const binaryPalindromeMachine: MachineConfig = {
    Q: ["A", "R", "a", "b", "c", "d", "e", "f", "g"],
    gamma: ["_", "0", "1"],
    start: "a",
    accept: "A",
    reject: "R",
    transitions: binaryPalindromeTransitions,
    wildcard: "*"
}

export const binaryPalindromeTapeData = ["1", "0", "0", "1", "0", "0", "1"];