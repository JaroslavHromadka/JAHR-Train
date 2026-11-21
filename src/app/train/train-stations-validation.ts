import type { PathKind, TreeValidator } from "@angular/forms/signals";
import { IStation } from "../station/station.model";

export const validateTrainStations: TreeValidator<Array<IStation>, PathKind.Child> = ctx => {
    const stations = ctx.value();

    const errors = [];
    const stationNameCounts = new Map<string, number>();
    const terminalNameCounts = new Map<string, number>();

    for (const station of stations) {
        const name = station.name.trim().toLowerCase();
        if (name) {
            stationNameCounts.set(name, (stationNameCounts.get(name) ?? 0) + 1);
        }
        for(const terminal of station.terminals) {
            const terminalName = terminal.name;
            if (terminalName) {
                terminalNameCounts.set(terminalName, (terminalNameCounts.get(terminalName) ?? 0) + 1);
            }
        }
    }

    for (let i = 0; i < stations.length - 1; i++) {
        const current = stations[i];
        const next = stations[i + 1];

        if (current.to > next.from) {
            errors.push({
                kind: 'intervalOverlap',
                message: 'Interval overlap',
                fieldTree: ctx.fieldTree[i].to
            });
        }
    }

    for (let i = 0; i < stations.length; i++) {
        const station = stations[i];
        const name = station.name.trim().toLowerCase();
        if (name && (stationNameCounts.get(name) ?? 0) > 1) {
            errors.push({
                kind: 'duplicateStationName',
                message: 'Station names must be unique',
                fieldTree: ctx.fieldTree[i].name
            });
        }
        for(let j = 0; j < station.terminals.length; j++) {
            const terminalName = station.terminals[j].name.toLowerCase();
            if (terminalName && (terminalNameCounts.get(terminalName) ?? 0) > 1) {
                errors.push({
                    kind: 'duplicateTerminalName',
                    message: 'Terminal names must be unique',
                    fieldTree: ctx.fieldTree[i].terminals[j].name
                })
            }
        }
    }

    return errors;
};
