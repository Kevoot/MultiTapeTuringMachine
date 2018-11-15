import { TuringMachine } from "./TuringMachine";
import vis = require("vis");
import { binaryPalindromeMachine, binaryPalindromeTapeData } from "./programs/binaryPalindrome";
import { classExampleMachine, classExampleTapeData } from "./programs/classExample";
import { MachineConfig } from "./utils";

export function main(config: MachineConfig, input: string[]): void {
    let tm = new TuringMachine(config.Q, config.gamma, config.start, config.transitions, config.accept, config.reject);

    // Like in the real world, when I inserted the tape it overwrote it. But this also means that
    // data was overwritten. Make sure you keep a master copy of the data, and duplicate 
    // a new tape before insertion
    let copyTape = [];
    for (let element in input) {
        copyTape.push(input[element]);
    }

    // Insert tape and let run (up to its max cycles) then log the results
    tm.insertTape(copyTape);

    let t0 = performance.now();
    let result = tm.run();
    let t1 = performance.now();
    let totalTime = (t1 - t0);

    writeOutput(input, copyTape, result, totalTime, tm.getLogs());
    showDiagram();
}

function writeOutput(initialInput: string[], usedTape: string[], result, totalTime: number, logs: string[]) {
    let resultString = [];
    resultString.push("Initial Tape Data: " + initialInput.toString());
    resultString.push("Accepted: " + (result.accepted ? "true," : "false")); + " machine halted after ";
    resultString.push("Total Transitions: " + result.totalTransitions);
    resultString.push("Ended in state: '" + result.state + "'");
    resultString.push("Total time running: " + totalTime + " milliseconds");
    resultString.push("End Tape Data: " + usedTape.toString());
    resultString.push("States: ");
    for (let str of logs) {
        resultString.push(str);
    }

    document.getElementById('resultText').innerHTML = resultString.join('<br />');
}

export function showDiagram() {
    let options: vis.Options = {
        edges: {
            arrows: {
                to: {
                    enabled: true
                },
                middle: {
                    enabled: false
                },
                from: {
                    enabled: false
                }
            },
        },
        physics: false
    };

    let nodeSet = [];
    let edgeSet = [];
    for (let state of binaryPalindromeMachine.Q) {
        nodeSet.push({ id: state, label: state });
    }
    for (let transition of binaryPalindromeMachine.transitions) {
        let index = edgeSet.findIndex(entry => entry.from === transition.state && entry.to === transition.next);
        if (index > -1) {
            edgeSet[index].label += "\n" + transition.in + "->" + transition.out + ", " + transition.dir;
        }
        else {
            edgeSet.push({
                from: transition.state,
                to: transition.next,
                label: transition.in + "->" + transition.out + ", " + transition.dir
            });
        }
    }

    // create a network
    var container = document.getElementById('mynetwork');
    var data = {
        nodes: new vis.DataSet(nodeSet),
        edges: new vis.DataSet(edgeSet)
    };
    var network = new vis.Network(container, data, options);
}

$(document).on('click', '#runButton', () => {
    let selection = (<HTMLSelectElement>document.getElementById('programSelector')).value;
    let input = (<HTMLInputElement>document.getElementById('inputData')).value;

    let config;
    if (selection === 'class') {
        config = classExampleMachine;
    }
    else if (selection === 'palindrome') {
        config = binaryPalindromeMachine;
    }

    // Format to array of characters instead of raw string
    let inputData = [];
    for (let i = 0; i < input.length; i++) {
        inputData.push(input[i]);
    }

    main(config, inputData);
});