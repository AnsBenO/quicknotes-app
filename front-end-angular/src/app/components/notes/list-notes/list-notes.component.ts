import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import { NoteService } from '../../../services/note.service';
import { Subject, take, takeUntil } from 'rxjs';
import { TNote } from '../../../types/note';
import { RouterModule } from '@angular/router';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-list-notes',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './list-notes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListNotesComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  notes: WritableSignal<TNote[]> = signal([]);
  plusIcon = faPlus;
  deleteIcon = faTrash;

  constructor(private noteService: NoteService) {}
  ngOnInit(): void {
    this.noteService
      .getNotes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((notes) => this.notes.set(notes));
  }

  handleKeydown($event: KeyboardEvent, noteId: string) {
    if ($event.key === 'Enter' || $event.key === ' ') {
      this.handleRemoveClick(noteId);
    }
  }

  handleRemoveClick(noteId: string) {
    this.noteService
      .deleteNote(noteId)
      .pipe(take(1))
      .subscribe(() =>
        this.notes.update((notes) => notes.filter((n) => n._id !== noteId))
      );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
