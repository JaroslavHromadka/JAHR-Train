import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrainComponent } from './train/train-component/train-component';

@Component({
  imports: [RouterOutlet, TrainComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('JAHR-Train');
}
