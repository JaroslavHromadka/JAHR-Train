import { stationInitial } from './../../station/station.model';
import { ITrain, trainInitial, trainSchema } from './../train.model';
import { Component, signal } from '@angular/core';
import { TrainHeaderComponent } from '../../train-header/train-header-component/train-header-component';
import { form, FormRoot } from '@angular/forms/signals';
import { StationComponent } from '../../station/station-component/station-component';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [TrainHeaderComponent, StationComponent, FormRoot, JsonPipe],
  selector: 'app-train-component',
  styleUrl: './train-component.scss',
  templateUrl: './train-component.html',
})
export class TrainComponent {
  private model = signal<ITrain>(trainInitial);

  public errors: any = null;

  public form = form(this.model, trainSchema, {
    submission: {
      action: async (field) => {
        console.log(field().value());
      },
      onInvalid: field => {
        this.errors = field().errorSummary();
      }
    }
  });

  public addStation() {
    this.model.update(train => ({
      ...train,
      stations: [...train.stations, { ...stationInitial }]
    }))
  }

  public removeStation(index: number) {
    this.model.update(train => ({
      ...train,
      stations: train.stations.filter((_, i) => i !== index)
    }))
  }
}
