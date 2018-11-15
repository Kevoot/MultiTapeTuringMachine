import { Head } from "./Head";
import { Transition } from "./utils";
import { Tape } from "./Tape";

export class TuringMachine {
    private head: Head;
    private tape: Tape;
    private currentState: string;
    private states: string[];
    private rwVals: string[];
    private startState: string;
    private transitions: Transition[];
    private acceptStates: string[];
    private rejectState: string;

    // Let's limit the amount of transitions to 1000 in case we get an infinite loop.
    readonly MAX_CYCLES = 1000;
    private cyclesRun: number;

    // Epsilon will be defined as the alphabet won't be passed as param,
    // Q isn't really necessary either but included for the sake of the assignment 
    constructor(Q: string[], Gamma: string[], q0: string, delta: Transition[], qA: string | string[], qR: string) {
        this.states = Q;
        this.rwVals = Gamma;
        this.startState = q0;
        this.currentState = q0;
        this.transitions = delta;
        this.rejectState = qR;
        this.head = new Head();

        this.acceptStates = [];
        Array.isArray(qA) ? this.acceptStates.concat(qA) : this.acceptStates.push(qA);
    }

    public insertTape(data: string[]) {
        this.tape = new Tape(data);
    }

    public run(): boolean {
        this.cyclesRun = 0;
        let currentInput;

        while (this.cyclesRun <= this.MAX_CYCLES) {
            currentInput = this.head.read(this.tape);
            let transition = this.lookupTransition(currentInput);
            if (transition === undefined) {
                return false;
            }

            this.head.write(this.tape, transition.out);
            transition.dir === "L" ? this.head.moveLeft() : this.head.moveRight();

            this.currentState = transition.next;
            if (this.acceptStates.includes(this.currentState)) {
                return true;
            }

            this.cyclesRun++;
        }

        // If accepted state has not been reached by this point we're
        // most likely in an infinite loop. Return rejected.
        return false;
    }

    public lookupTransition(input: string): Transition {
        let transition = this.transitions.find(entry => {
            if (entry.state === this.currentState && entry.in === input) {
                return true;
            }
            else {
                return false;
            }
        });

        if (transition === undefined) {
            this.forceHalt();
            return undefined;
        }
        else {
            return transition;
        }
    }

    public forceHalt(): string {
        this.currentState = this.rejectState;
        this.cyclesRun = this.MAX_CYCLES + 1;
        return this.currentState;
    }
}