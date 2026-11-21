import { applyEach, max, min, required, schema, validate, validateTree } from "@angular/forms/signals";
import { ITerminal, terminalSchema } from "../terminal/terminal.model";

export interface IStation {
    name: string;
    from: number;
    to: number;
    terminals: Array<ITerminal>
}

export const stationInitial: IStation = {
    name: '',
    from: 0,
    to: 0,
    terminals: []
}

export const stationSchema = schema<IStation>(path => {
    required(path.name, { message: 'Station name is required' });
    min(path.from, 1, { message: 'Min is 1' });
    max(path.from, 99, { message: 'Max is 99' });
    min(path.to, 1, { message: 'Min is 1' });
    max(path.to, 99, { message: 'Max is 99' });
    applyEach(path.terminals, terminalSchema);
    validate(path.name, ({ valueOf }) => {
        const from = valueOf(path.from);
        const to = valueOf(path.to);

        if (from === null || to === null) {
            return null;
        }

        if (from >= to) {
            return {
                kind: 'invalidRange',
                message: 'To must be greater than From'
            }
        }

        return null;
    })
});