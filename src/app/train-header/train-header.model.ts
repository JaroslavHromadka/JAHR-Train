import { required, schema } from "@angular/forms/signals";

export interface ITrainHeader {
    code: string;
    wagonsCount: number;
    maxLength: number;
    maxWeight: number;
}

export const trainHeaderInitial: ITrainHeader = {
    code: '',
    wagonsCount: 10,
    maxLength: 150,
    maxWeight: 50,
}

export const trainHeaderSchema = schema<ITrainHeader>(path => {
    required(path.code, {message: 'Code is required'});
    required(path.wagonsCount, {message: 'Wagons count is required'});
    required(path.maxLength, {message: 'Max length is required'});
    required(path.maxWeight, {message: 'Max weight is required'});
});