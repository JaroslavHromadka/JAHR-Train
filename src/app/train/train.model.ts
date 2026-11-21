import { apply, applyEach, schema, validateTree } from "@angular/forms/signals";
import { IStation, stationSchema } from "../station/station.model";
import { ITrainHeader, trainHeaderInitial, trainHeaderSchema } from "../train-header/train-header.model";
import { validateTrainStations } from "./train-stations-validation";

export interface ITrain {
    header: ITrainHeader;
    stations: Array<IStation>;
}

export const trainInitial: ITrain = {
    header: trainHeaderInitial,
    stations: []
}

export const trainSchema = schema<ITrain>(path => {
    apply(path.header, trainHeaderSchema);
    applyEach(path.stations, stationSchema);
    validateTree(path.stations, validateTrainStations);
})