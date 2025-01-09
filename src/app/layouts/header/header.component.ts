import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


    visible: boolean = false;
    
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

    showSubmenu(item: any) {
        item.showSubmenu = true;
    }

    hideSubmenu(item: any) {
        item.showSubmenu = false;
    }


    showDialog() {
        this.visible = true;
    }


}

