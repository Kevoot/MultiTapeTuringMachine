import { TuringMachine } from "./TuringMachine";
import vis = require("vis");
import { numberSorterMachine, numberSorterTapeData} from "./programs/numberSorter";
import { MachineConfig } from "./utils";

export function main(config: MachineConfig, input: string[][]): void {
    let tm = new TuringMachine(config.Q, config.gamma, config.start, config.transitions, config.accept, config.reject);
    tm.setNumHeads(3);
    tm.setNumTapes(3);

    // Like in the real world, when I inserted the tape it overwrote it. But this also means that
    // data was overwritten. Make sure you keep a master copy of the data, and duplicate 
    // a new tape before insertion
    let copyTape1 = [];
    for (let element in input) {
        copyTape1.push(input[element]);
    }

    // 2nd and 3rd tapes start blank
    let copyTape2 = [];
    for (let element in input) {
        copyTape2.push("_");
    }
    let copyTape3 = [];
    for (let element in input) {
        copyTape3.push("_");
    }



    // Insert tape and let run (up to its max cycles) then log the results
    tm.insertTape(copyTape1, 0);
    tm.insertTape(copyTape2, 1);
    tm.insertTape(copyTape3, 2);

    let t0 = performance.now();
    let result = tm.run();
    let t1 = performance.now();
    let totalTime = (t1 - t0);

    writeOutput(input[0], tm.getTapeData(0), tm.getTapeData(1), tm.getTapeData(2), result, totalTime, tm.getLogs());
    showDiagram(config);
}

function writeOutput(initialInput: string[], usedTape1: string, usedTape2: string, usedTape3: string, result, totalTime: number, logs: string[]) {
    let resultString = [];
    resultString.push("Initial Tape Data: " + initialInput.toString());
    resultString.push("Accepted: " + (result.accepted ? "true," : "false")); + " machine halted after ";
    resultString.push("Total Transitions: " + result.totalTransitions);
    resultString.push("Ended in state: '" + result.state + "'");
    resultString.push("Total time running: " + totalTime + " milliseconds");
    resultString.push("End Tape 1 Data: " + usedTape1);
    resultString.push("End Tape 2 Data: " + usedTape2);
    resultString.push("End Tape 3 Data: " + usedTape3);
    resultString.push("States: ");
    for (let str of logs) {
        resultString.push(str);
    }

    document.getElementById('resultText').innerHTML = resultString.join('<br />');
}

export function showDiagram(config: MachineConfig) {
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
    for (let state of config.Q) {
        nodeSet.push({ id: state, label: state });
    }
    for (let transition of config.transitions) {
        let index = edgeSet.findIndex(entry => entry.from === transition.state && entry.to === transition.next);
        if (index > -1) {
            edgeSet[index].label += "\n" + transition.in + "->" + transition.out1 + ", " + transition.dir1 +
                "; " + transition.out2 + ", " + transition.dir2 + "; " + transition.out3 + ", " + transition.dir3;
            
        }
        else {
            edgeSet.push({
                from: transition.state,
                to: transition.next,
                label: (transition.in + "->" + transition.out1 + ", " + transition.dir1 +
                            "; " + transition.out2 + ", " + transition.dir2 + 
                            "; " + transition.out3 + ", " + transition.dir3)
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
    let input: string = (<HTMLInputElement>document.getElementById('inputData')).value;
    let inputData = [];

    let config;
    if (selection === 'numberSorter') {
        config = numberSorterMachine;
    }

    if (input === "") {
        inputData = numberSorterTapeData;
    }
    else {
        // Format to array of characters instead of raw string
        for (let i = 0; i < input.length; i++) {
            inputData.push(input[i]);
        }
    }

    main(config, inputData);
});