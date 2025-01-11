import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
@Injectable({
    providedIn: 'root'
})
export class NGXToastrService {
    constructor(private toastr: ToastrService) { }

    typeSuccessAddCart() {
        this.toastr.success("Add To Cart Success");
    }
}
