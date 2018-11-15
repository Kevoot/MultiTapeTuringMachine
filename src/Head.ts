import { Tape } from "./Tape";

export class Head {
    private position: number;

    constructor(startFromPosition?: number) {
        if (isNaN(startFromPosition) && startFromPosition >= 0) {
            this.position = startFromPosition;
        }
        else {
            this.position = 0;
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
}