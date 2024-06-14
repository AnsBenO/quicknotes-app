import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './note-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteDetailComponent { }
