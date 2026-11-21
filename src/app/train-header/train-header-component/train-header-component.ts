import { FieldTree, required, FormField } from '@angular/forms/signals';
import { Component, input } from '@angular/core';
import { ITrainHeader } from '../train-header.model';
import { NgClass } from '@angular/common';

@Component({
  imports: [FormField, NgClass],
  selector: 'app-train-header-component',
  styleUrl: './train-header-component.scss',
  templateUrl: './train-header-component.html',
})
export class TrainHeaderComponent {
  public trainHeader = input.required<FieldTree<ITrainHeader>>()
}
