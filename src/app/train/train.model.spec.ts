import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form } from '@angular/forms/signals';
import { ITrain, trainInitial, trainSchema } from './train.model';

describe('trainSchema', () => {
  it('marks every station with a duplicate name as invalid', () => {
    const model = signal<ITrain>({
      ...trainInitial,
      stations: [
        { name: 'Central', from: 1, to: 2, terminals: [] },
        { name: ' central ', from: 2, to: 3, terminals: [] },
      ],
    });
    const trainForm = TestBed.runInInjectionContext(() => form(model, trainSchema));

    expect(trainForm.stations[0].name().errors()).toContainEqual(
      expect.objectContaining({ kind: 'duplicateStationName' }),
    );
    expect(trainForm.stations[1].name().errors()).toContainEqual(
      expect.objectContaining({ kind: 'duplicateStationName' }),
    );
  });

  it('does not mark distinct or blank names as duplicates', () => {
    const model = signal<ITrain>({
      ...trainInitial,
      stations: [
        { name: 'Central', from: 1, to: 2, terminals: [] },
        { name: 'West', from: 2, to: 3, terminals: [] },
        { name: '', from: 3, to: 4, terminals: [] },
      ],
    });
    const trainForm = TestBed.runInInjectionContext(() => form(model, trainSchema));

    expect(trainForm.stations[0].name().errors()).not.toContainEqual(
      expect.objectContaining({ kind: 'duplicateStationName' }),
    );
    expect(trainForm.stations[1].name().errors()).not.toContainEqual(
      expect.objectContaining({ kind: 'duplicateStationName' }),
    );
    expect(trainForm.stations[2].name().errors()).not.toContainEqual(
      expect.objectContaining({ kind: 'duplicateStationName' }),
    );
  });
});
