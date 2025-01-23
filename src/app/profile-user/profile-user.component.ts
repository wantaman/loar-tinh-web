import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AllApiService } from '../core/all-api.service';
import { GeneralFunctionService } from '../core/function/general-function.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NGXToastrService } from '../core/function/toast.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss'],
})
export class ProfileUserComponent {
  dataUser: any;
  profile: string | ArrayBuffer | null = null;
  is_upload_photo = true;
  selectedImage: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;

  editProfileForm: FormGroup;

  constructor(
    private allFunction: GeneralFunctionService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataDetail: any,
    public dialogRef: MatDialogRef<ProfileUserComponent>,
    private allApi: AllApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ToastrService: NGXToastrService,
  ) {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    this.dataUser = user?.data;
    this.imageUrl = this.dataUser.user.avatar

    // Initialize the form with controls
    this.editProfileForm = this.fb.group({
      name: [this.dataUser?.name || '', Validators.required],
      email: [this.dataUser?.email || '', [Validators.required, Validators.email]],
      gender: [this.dataUser?.gender || '', Validators.required],
      roleId: [this.dataUser?.roleId || '', Validators.required],
    });

    this.setDataIntoForm();

  }



  get f() {
    return this.editProfileForm.controls;
  }

  setDataIntoForm(){
    this.f['name'].setValue(this.dataUser.user.name);
    this.f['email'].setValue(this.dataUser.user.email);
    this.f['gender'].setValue(this.dataUser.user.gender);
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(): void {
    const fileInput = document.querySelector('.file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  dataJsonUser:any;
  updateUser() {
    const inputData = new FormData();
    inputData.append('name', this.f['name'].value);
    inputData.append('email', this.f['email'].value);
    inputData.append('gender', this.f['gender'].value);
    inputData.append('roleId', this.dataUser.user.id);  

    if (this.selectedImage) {
      inputData.append('avatar', this.selectedImage);
    }

    console.log('id', this.dataUser.user.id)

    this.allApi.editData(this.allApi.userUrl +'/',inputData ,this.dataUser.user.id).subscribe(
      (response: any) => {
        console.log('User updated successfully:', response);
        this.dataJsonUser = {
          data:{
            user:{
              avatar: response.data.avatar,
              email: response.data.email,
              gender: response.data.gender,
              id: response.data.id,
              name: response.data.name
            }
          }
        }
        console.log('datajson', this.dataJsonUser)
        localStorage.setItem('user', JSON.stringify(this.dataJsonUser))
        this.ToastrService.typeSuccessAddCart();
        this.closeForm();
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  closeForm(): void {
    this.allFunction.closeUserDialog(this.dataDetail?.form_name);
    setTimeout(() => {
      this.dialogRef.close({ is_refresh: true });
    }, this.allFunction.closeDelaySmall);
  }
  
}
