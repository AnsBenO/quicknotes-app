import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-note-create-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteCreateFormComponent {}
