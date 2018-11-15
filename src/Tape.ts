export class Tape {
    private data: string[];

    constructor(data: string[]) {
        if(data === undefined || data.length < 1) {
            this.data = [];
        }
        else {
            this.data = data;
        }

        // Tape could be imagined to be infinitely long, 
        // so we'll just initialize it with (or add) 1k blanks
        // represented by a space char
        for (let i = 0; i < 1000; i++) {
            this.data.push(' ');
        }
    }

    public getDataAtPosition(position: number): string {
        return this.data[position];
    }

    public setDataAtPosition(position: number, data: string): void {
        this.data[position] = data;
    }

}