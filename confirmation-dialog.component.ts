import { Component, Inject, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    standalone: true,
    imports: [MatButtonModule],
    template: `
		<style>
            .buttons{
                display: flex;
                flex-direction: row;
                column-gap: .5rem;
            }
            h2{
                margin: 0;
            }
            .container{
                padding: 1rem 1.5rem;
                min-width: 20vw;
                display: flex;
                flex-direction: column;
                row-gap: 2rem;
            }
            .flex-container{
                display: flex;
                flex-direction: column;
            }
		</style>
		<div class="container">
            <div class="flex-container">
                <h2 mat-dialog-title>{{title}}</h2>
                <div mat-dialog-content>
                    {{message}}
                </div>

            </div>
            <div mat-dialog-actions class="buttons"  [align]="'end'">
                <button (click)="close(false)" mat-button>No, thanks</button>
                <button (click)="close(true)" mat-flat-button color="primary">Yes</button>
            </div>
		</div>
	`,
})
export class ConfirmationDialogComponent implements OnInit {
    title = "Confirmation Message";
    message = "Are you sure ?";

    constructor(
        private readonly _dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private readonly _data: ConfirmationDialogData,
    ) { }

    ngOnInit(): void {
        if (this._data?.message)
            this.message = this._data?.message
        if (this._data?.title)
            this.title = this._data?.title;
    }

    close(confirmed: boolean) {
        this._dialogRef.close(confirmed);
    }

}


export type ConfirmationDialogData = {
    title?: string;
    message?: string;
}