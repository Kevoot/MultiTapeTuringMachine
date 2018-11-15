import { classExampleMachine, classExampleTapeData } from "./programs/classExample";
import { TuringMachine } from "./TuringMachine";
import vis = require("vis");

export function main() {
    let config = classExampleMachine;

    let tm = new TuringMachine(config.Q, config.gamma, config.start, config.transitions, config.accept, config.reject);

    // Like in the real world, when I inserted the tape it overwrote it. But this also means that
    // class example data was overwritten. Make sure you keep a master copy of the data, and duplicate 
    // a new tape before insertion
    let copyTape = [];
    for (let element in classExampleTapeData) {
        copyTape.push(classExampleTapeData[element]);
    }

    // Insert tape and let run (up to its max cycles) then log the results
    tm.insertTape(copyTape);
    let result = tm.run();
    console.log(result);

    showDiagram();
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
        configure: {
            filter: function (option, path) {
                if (path.indexOf('hierarchical') !== -1) {
                    return true;
                }
                return false;
            },
            showButton: true
        }
    };

    let nodeSet = [];
    let edgeSet = [];
    for (let state of classExampleMachine.Q) {
        nodeSet.push({ id: state, label: state });
    }
    for (let transition of classExampleMachine.transitions) {
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

$(document).on('click', '#runButton', () => main())