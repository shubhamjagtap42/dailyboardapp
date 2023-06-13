import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LawyerService {

  constructor(private http:HttpClient) { }

  getCases(){
    // return this.http.get(this.url2)
    return this.http.get(`${environment.url3}/caseDetails`)
  }
  
  delete(ids:any){
    // return this.http.delete(this.url2,ids)
    // return this.http.delete(`${environment.deleteUrl}/caseDetails`,ids)
  }
  orderdata(data:any)
    {
      return this.http.post(`${environment.url3}/orders`,data)
    }

    getorderdata()
    {
      return this.http.get(`${environment.url3}/orders`)
    }

    getDownloadFile(filename:any)
    {
      return this.http.get(`${environment.url3}/download/${filename}`)   
    }
    getOrderByCnr(cnrNo:any)
    {
      // cnrNo = 'HCBM010241792011';
      return this.http.get(`${environment.url3}/orders/${cnrNo}`)
    }
      
    

}
