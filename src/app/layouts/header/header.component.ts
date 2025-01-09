import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { GeneralFunctionService } from 'src/app/core/function/general-function.service';
import { SearchFormComponent } from 'src/app/search-form/search-form.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


    visible: boolean = false;
    visiblesignUp: boolean = false;
    isPasswordVisible: boolean = false;


    menuItems = [
        {
            name: 'Women',
            showSubmenu: true,
            columns: [
                { title: 'Clothing', links: ['Dresses', 'Tops', 'Jeans', 'Skirts'] },
                { title: 'Shoes', links: ['Sandals', 'Boots', 'Sneakers'] },
                { title: 'Accessories', links: ['Bags', 'Jewelry', 'Hats'] }
            ]
        },
        {
            name: 'Men',
            showSubmenu: true,
            columns: [
                { title: 'Clothing', links: ['Shirts', 'Jeans', 'T-shirts'] },
                { title: 'Shoes', links: ['Loafers', 'Boots', 'Sneakers'] },
                { title: 'Accessories', links: ['Belts', 'Bags', 'Watches'] }
            ]
        },
        {
            name: 'Kids',
            showSubmenu: false,
            columns: [
                { title: 'Boys', links: ['Tops', 'Jeans', 'T-shirts'] },
                { title: 'Girls', links: ['Dresses', 'Tops', 'Shoes'] }
            ]
        }
    ];

    constructor(
        private allFunction: GeneralFunctionService,
        public dialog: MatDialog,
    ) {

    }


    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
    }

    showSubmenu(item: any) {
        item.showSubmenu = true;
    }

    hideSubmenu(item: any) {
        item.showSubmenu = false;
    }


    showDialoglogin() {
        this.visible = true;
    }

    showDialogsingup() {
        this.visiblesignUp = true;
    }


    openForm(type: 'add' | 'edit', data?: any) {
        let tmp_DialogData: any = {
            size: "medium",
            type: type,
            form_name: 'search'
        }
        const dialogRef = this.dialog.open(SearchFormComponent,
            this.allFunction.dialogData(
                tmp_DialogData.size,
                tmp_DialogData.type,
                tmp_DialogData.form_name,
                data
            )
        )
        dialogRef.afterClosed().subscribe(
            result => {
                if (result) {
                    if (result.is_refresh) {

                    }
                }
                console.log('close', result)
            }
        )
    }

}

