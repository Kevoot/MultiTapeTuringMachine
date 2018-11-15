import { Tape } from "./Tape";
import { PADDING } from "./utils";

export class Head {
    private position: number;

    constructor(startFromPosition?: number) {
        if (isNaN(startFromPosition) && startFromPosition >= 0) {
            this.position = startFromPosition;
        }
        else {
            // The data from the initial object needs to be padded
            this.position = PADDING;
        }
    }

    public read(tape: Tape): string {
        return tape.getDataAtPosition(this.position);
    }

    public write(tape: Tape, data: string): void {
        tape.setDataAtPosition(this.position, data);
    }

    public moveLeft(): void {
        this.position -= 1;
    }

    public moveRight(): void {
        this.position += 1;
    }

    public getPosition(): number {
        return this.position;
    }
}