import { Component, input, output } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { IStation } from '../station.model';
import { NgClass } from '@angular/common';
import { TerminalComponent } from '../../terminal/terminal-component/terminal-component';
import { terminalInitial } from '../../terminal/terminal.model';

@Component({
  imports: [FormField, NgClass, TerminalComponent],
  selector: 'app-station-component',
  styleUrl: './station-component.scss',
  templateUrl: './station-component.html',
})
export class StationComponent {
  public station = input.required<FieldTree<IStation>>();

  public removeStation = output();

  public onRemoveStation() {
    this.removeStation.emit();
  }

  public onAddTerminal() {
    this.station().terminals().value.update(terminals => [
      ...terminals,
      { ...terminalInitial },
    ]);
  }

  public removeTerminal(index: number) {
    this.station().terminals().value.update(terminals => terminals.filter((_, i) => i !== index))
  }
}
