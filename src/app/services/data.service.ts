import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
    private editData = "";
    setCampaignDetail(e){
        this.editData = e;
    }
    getCampaignDetail(){
        return this.editData;
    }
}
