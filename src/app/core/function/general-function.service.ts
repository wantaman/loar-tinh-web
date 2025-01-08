import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core'; 
import * as CryptoJS from 'crypto-js'; // npm i crypto-js 

@Injectable({
  providedIn: 'root',
})
export class GeneralFunctionService {
 
  environment = environment

  constructor (
    ) {
      
  }
 

  //The set method is use for encrypt the value.
  encryptFileForLocal(keys:any, value:any){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  decryptFileForLocal(keys:any, value:any){
    if(value != null){
      var key = CryptoJS.enc.Utf8.parse(keys);
      var iv = CryptoJS.enc.Utf8.parse(keys);
      var decrypted = CryptoJS.AES.decrypt(value, key, {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });
  
        return decrypted.toString(CryptoJS.enc.Utf8); 
    }
    else{
      return null;
    }
  }

  
}