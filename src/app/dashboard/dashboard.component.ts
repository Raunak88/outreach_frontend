import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthenticationService } from '../services/authentication.service';
import { DataService } from '../services/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { User } from '../campaign';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  constructor(private router: Router,
  private http: HttpClient, private authenticationService: AuthenticationService,
  private dataService: DataService,private modalService: NgbModal){
    this.currentUser = this.authenticationService.currentUserValue;
  } 
  currentUser: User;
  public camps;
  public products;
  private imageSrc;
  public creatorList = [];
  public price;
  public category_state;
  public campaign_category;
  loading = false;
  states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];
  categories = ['Health Care', 'Education', 'Skill Development', 'Social Initiative', 'Farming'];
  error = '';
  p: number = 1;
  ngOnInit() {
    this.getCampaign();
  }
  //GET
  getCampaign() {
    this.authenticationService.getCampaign()
      .pipe(first())
      .subscribe(
      data => {
        console.log(JSON.stringify(data));
        if(this.currentUser.role == "Creator"){
          data.forEach(element => {
            if(this.currentUser.userId == element.creater_id ){
              this.creatorList.push(element);
              this.camps = this.creatorList;
            }
          });
          if(this.creatorList.length == 0){
            this.error = "No campaign added";
          }
        }else{
          this.camps = data;
        }
        
      },
      error => {
        console.log(error);
        this.error = error;
        this.loading = false;
      });
  }
  //Delete
  delete(e) {
    this.authenticationService.deleteCampaign(e._id)
      .pipe(first())
      .subscribe(
      data => {
        window.location.reload();
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  };

  //Edit
  edit(e) {
    this.dataService.setCampaignDetail(e);
    this.router.navigate(['/campaignCreate']);
  };

  //Add camp
  addCampaign() {
    this.error = "";
    this.dataService.setCampaignDetail(this.error);
    this.router.navigate(['/campaignCreate']);
  }
  
  submit(e,content) {
    if(e.contribution){
      let remAmount = e.contribution_amount - e.contribution;
      if (remAmount > 0) {
        let contribution_details = {
          'contribution_details':{
            'contribution' : e.contribution,
            'contributor_id' : this.currentUser.userId
          }
        };
        //e.contribution_amount = remAmount;
        this.authenticationService.payment(e._id, contribution_details)
          .pipe(first())
          .subscribe(
          data => {
            console.log(data);
            this.error = '';
            this.modalService.open(content, { centered: true });
            e.contribution = '';
            this.getCampaign();
          });
  
      } else {
        this.error = "Amount Invalid";
        e.contribution = '';
        window.scroll(0,0);
      }
    }else{
      this.error = "Amount Invalid";
      e.contribution = '';
      window.scroll(0,0);
    }
    

  }
  //Clear
  clearAll(){
    this.price = "";
    this.category_state = "";
    this.campaign_category = "";
  }
}


@Pipe({
    name: 'personSearch'
})
export class PersonSearchPipe implements PipeTransform {
    transform(items: Array<any>, nameSearch: number, emailSearch: string, companySearch: string){
        if (items && items.length){
            return items.filter(item =>{
                if ((nameSearch == 5000 && item.contribution_amount > nameSearch) || (nameSearch == 10000 && ((nameSearch-4999)  < item.contribution_amount && item.contribution_amount > nameSearch) || ((nameSearch-4999)  > item.contribution_amount && item.contribution_amount < nameSearch)) || (nameSearch == 15000 && ((nameSearch-4999)  < item.contribution_amount && item.contribution_amount > nameSearch) || ((nameSearch-4999)  > item.contribution_amount && item.contribution_amount < nameSearch)) || (nameSearch == 20000 && ((nameSearch-4999)  < item.contribution_amount && item.contribution_amount > nameSearch) || ((nameSearch-4999)  > item.contribution_amount && item.contribution_amount < nameSearch)) || (nameSearch == 20001 && item.contribution_amount < nameSearch) ){
                    return false;
                }
                if (emailSearch && item.borrower.state.indexOf(emailSearch) === -1){
                    return false;
                }
                if (companySearch && item.campaign_category.indexOf(companySearch) === -1){
                    return false;
                }
                return true;
           })
        }
        else{
            return items;
        }
    }
}