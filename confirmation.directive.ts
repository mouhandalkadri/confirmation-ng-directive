import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Directive({
    selector: "[on-click-confirmation]",
    standalone: true,
})
export class ConfirmationDirective {
    @Output("onConfirm") onConfirm = new EventEmitter<void>();
    @Output("onCancel") onCancel = new EventEmitter<void>();
    @Input("title") title!: string;
    @Input("message") message!: string;

    constructor(
        private readonly _dialog: MatDialog
    ) { }

    @HostListener("click")
    onClick() {
        this._dialog.open(ConfirmationDialogComponent, {
            data: {
                title: this.title, message: this.message

            }
        }).afterClosed().pipe(
            take(1)
        ).subscribe(confirmed => {
            if (confirmed) {
                this.onConfirm.emit();
            } else {
                this.onCancel.emit();
            }
        })
    }


}

export enum ViewState {
    VIEW,
    EDIT
}