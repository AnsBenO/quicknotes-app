import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-list-notes',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './list-notes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListNotesComponent { }
