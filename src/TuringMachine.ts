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

    private logStrings: string[];

    // Let's limit the amount of transitions to 1000 in case we get an infinite loop.
    readonly MAX_TRANSITIONS = 1000;
    private transitionsRun: number;

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

        this.logStrings = [];

        this.acceptStates = [];
        Array.isArray(qA) ? this.acceptStates.concat(qA) : this.acceptStates.push(qA);
    }

    public insertTape(data: string[]) {
        this.tape = new Tape(data);
    }

    public run(): { accepted: boolean, totalTransitions: number, state: string } {
        this.transitionsRun = 0;
        let currentInput;

        while (this.transitionsRun <= this.MAX_TRANSITIONS) {
            currentInput = this.head.read(this.tape);
            let transition = this.lookupTransition(currentInput);
            this.log(this.currentState, this.tape.toString(), this.head.getPosition());
            if (transition === undefined) {
                // If no direct transition is found, see if there's a wildcard available
                transition = this.lookupTransition('*');
                // If still not found, force to reject
                if (transition === undefined) {
                    return { 
                        accepted: false, 
                        totalTransitions: this.transitionsRun,
                        state: this.currentState 
                    };
                }
                // Otherwise write the found input since wildcard and continue
                this.head.write(this.tape, currentInput);
            }
            else {
                this.head.write(this.tape, transition.out);
            }

            transition.dir === "L" ? this.head.moveLeft() : this.head.moveRight();

            this.currentState = transition.next;
            if (this.acceptStates.includes(this.currentState)) {
                return { 
                    accepted: true, 
                    totalTransitions: this.transitionsRun,
                    state: this.currentState
                };
            }

            this.transitionsRun++;
        }

        // If accepted state has not been reached by this point we're
        // most likely in an infinite loop. Return rejected.
        return { 
            accepted: false, 
            totalTransitions: this.transitionsRun,
            state: this.currentState 
        };
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

        return transition;
    }

    public forceHalt(): string {
        this.currentState = this.rejectState;
        this.transitionsRun = this.MAX_TRANSITIONS + 1;
        return this.currentState;
    }

    public log(state: string, tape: string, headPosition: number) {
        let logString = "";
        logString += state + ": ";

        let firstHalf = tape.substr(0, headPosition - 1);
        let currentValue = tape[headPosition];
        let secondHalf =  tape.substr(headPosition + 1);
        currentValue = "[[" + currentValue + "]]";

        logString += firstHalf + currentValue + secondHalf;

        this.logStrings.push(logString);
    }

    public getLogs(): string[] {
        return this.logStrings;
    }
}