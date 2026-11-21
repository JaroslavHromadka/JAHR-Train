import { Component, input, output } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { ITerminal } from '../terminal.model';
import { NgClass } from '@angular/common';

@Component({
  imports: [FormField, NgClass],
  selector: 'app-terminal-component',
  styleUrl: './terminal-component.scss',
  templateUrl: './terminal-component.html',
})
export class TerminalComponent {
  public terminal = input.required<FieldTree<ITerminal>>();

  public removeTerminal = output();

  public onRemoveTerminal() {
    this.removeTerminal.emit();
  }
}
