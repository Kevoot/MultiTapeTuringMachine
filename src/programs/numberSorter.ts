import { Transition, MachineConfig } from "../utils";

const numberSorter: Transition[] = [
    {
        state: "0",
        in: "a",
        out1: "a",
        out2: "a",
        out3: "_",
        dir1: "R",
        dir2: "R",
        dir3: "*",
        next: "0"
    },
    {
        state: "0",
        in: "b",
        out1: "b",
        out2: "_",
        out3: "b",
        dir1: "R",
        dir2: "*",
        dir3: "R",
        next: "1"
    },
    {
        state: "0",
        in: "c",
        out1: "c",
        out2: "_",
        out3: "_",
        dir1: "*",
        dir2: "*",
        dir3: "*",
        next: "R"
    },
    {
        state: "1",
        in: "b",
        out1: "b",
        out2: "_",
        out3: "b",
        dir1: "R",
        dir2: "*",
        dir3: "R",
        next: "1"
    },
    {
        state: "1",
        in: "c",
        out1: "c",
        out2: "_",
        out3: "_",
        dir1: "*",
        dir2: "L",
        dir3: "L",
        next: "2"
    },
    {
        state: "1",
        in: "a",
        out1: "a",
        out2: "_",
        out3: "_",
        dir1: "*",
        dir2: "*",
        dir3: "*",
        next: "R"
    },
    {
        state: "2",
        in: "c",
        out1: "c",
        out2: "a",
        out3: "b",
        dir1: "R",
        dir2: "L",
        dir3: "L",
        next: "2"
    },
    {
        state: "2",
        in: "_",
        out1: "_",
        out2: "_",
        out3: "_",
        dir1: "*",
        dir2: "*",
        dir3: "R",
        next: "3"
    },
    {
        state: "2",
        in: "b",
        out1: "b",
        out2: "_",
        out3: "_",
        dir1: "*",
        dir2: "*",
        dir3: "*",
        next: "R"
    },
    {
        state: "0",
        in: "_",
        out1: "_",
        out2: "_",
        out3: "_",
        dir1: "*",
        dir2: "L",
        dir3: "*",
        next: "4"
    },
    {
        state: "4",
        in: "_",
        out1: "_",
        out2: "_",
        out3: "_",
        dir1: "*",
        dir2: "*",
        dir3: "*",
        next: "3"
    },
];

export const numberSorterMachine: MachineConfig = {
    Q: ["R", "0", "1", "2", "3", "4"],
    gamma: ["_", "a", "b", "c"],
    start: "0",
    accept: "3",
    reject: "R",
    transitions: numberSorter
}

export const numberSorterTapeData = ["a", "a", "b", "b", "c", "c"];
