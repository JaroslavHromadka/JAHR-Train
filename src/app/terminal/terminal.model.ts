import { required, schema } from "@angular/forms/signals";

export interface ITerminal {
    name: string;
}

export const terminalInitial: ITerminal = {
    name: '',
}

export const terminalSchema = schema<ITerminal>(path => {
    required(path.name, {message: 'Terminal name is required'});
});