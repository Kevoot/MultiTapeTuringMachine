import { PADDING } from "./utils";

/**
 * This class is 100% unnecessary, but I liked the idea of 
 * pretending to insert a physical tape so bite me.
 */
export class Tape {
    private data: string[];

    constructor(data: string[]) {
        this.data = [];
        
        for(let i = 0; i < PADDING; i++) {
            this.data.push("_");
        }

        for (let entry of data) {
            this.data.push(entry);
        }


        // Since the tape can be infinitely long, let's just lock it
        // at somewhere around 200 blanks after initial data segment.
        for (let i = 0; i < PADDING; i++) {
            this.data.push("_");
        }
    }

    public getDataAtPosition(position: number): string {
        return this.data[position];
    }

    public setDataAtPosition(position: number, data: string): void {
        this.data[position] = data;
    }

    public toString(): string {
        return this.data.join("");
    }

}