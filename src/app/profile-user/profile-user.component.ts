import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { AllApiService } from '../core/all-api.service';
import { GeneralFunctionService } from '../core/function/general-function.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent {
  editProfileForm: FormGroup;
  dataUser :any[] = [];
  profile: string | ArrayBuffer | null = null;
  is_upload_photo = true;

  constructor(
    private allFunction: GeneralFunctionService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataDetail: any,
    public dialogRef: MatDialogRef<ProfileUserComponent>,
    private allApi: AllApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    this.dataUser = user.data;

    this.editProfileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      roleId: ['', Validators.required]
    });

  }


  onImageAdded(event: any): void {
    const file = event[0]; // Get the first file from the dropzone
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profile = reader.result; // Update the preview
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  }

  // Optional: Handle the change event
  onImageChange(event: any): void {
    console.log('Image changed:', event);
  }


  closeForm() {
    console.log('close form')
    this.allFunction.closeDialog(this.dataDetail?.form_name );
    setTimeout(() => {
      this.dialogRef.close({ is_refresh: true });
    }, this.allFunction.closeDelaySmall);
  }


}
