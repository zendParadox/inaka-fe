import { Component } from '@angular/core';
import { ModalConfirmComponent } from '../../components/modal-confirm/modal-confirm.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private dialog: MatDialog) {}
  logout(): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '450px',
      data: { message: 'Apakah Anda yakin ingin logout?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        localStorage.removeItem('accessToken');
        // Redirect atau lakukan tindakan lain setelah logout

        // Hapus localStorage
        // localStorage.clear();

        // Refresh halaman
        window.location.reload();
      }
    });
  }

  // openDialog(): void {
  //   this.dialog.open(ModalConfirmComponent, {
  //     width: '500px',
  //   });
  // }
}
