import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';


import { AuthenticationService } from '../services/authentication.service';
import { DataService } from '../services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-createcampaign',
  templateUrl: './createcampaign.component.html',
  styleUrls: ['./createcampaign.component.css']
})
export class CreatecampaignComponent implements OnInit {

    selectedFile: ImageSnippet;
    campModel: any = {
      "borrower":{}
    };
    categories = ['Select Category','Health Care','Education','Skill Development','Social Initiative','Farming'];
    campData = "";
    endUrl = "campaigns";
    public error = "";
    public returnUrl = "/dashboard";
    public submitted = false;
    states = ['Select state','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'];
    objDate = Date();
    public getData = "";

    imageSrc:string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAADzCAMAAAAW57K7AAAARVBMVEX+/v4AAAD///8kJCTq6uoZGRmEhISXl5fx8fGIiIgMDAwYGBjs7OyZmZkVFRXd3d3X19d6enpRUVFGRkbi4uKOjo5aWlrum6J7AAABXUlEQVR4nO3Pi03CYACAQcpDoBQQFPcfVRrjDpc/321wm2ksm2m67UZxWz+3n9f1OILr+Tm/P7vX92kM98dl/VxP2zEsH4f1czxtNyPY7vvI+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj62PrY+tj+P9fTdgzL3+d1X/YjWD4fl/fn9vw4j+HxNb8/03w5DGKe1s9QfgH3Y0ZmYqp8WgAAAABJRU5ErkJggg==";
    constructor(private router: Router,private modalService: NgbModal,
      private route: ActivatedRoute,private authenticationService: AuthenticationService,private dataService:DataService) { }

    processFile(imageInput: any) {
      const file: File = imageInput.files[0];
      const reader = new FileReader();
      
      reader.addEventListener('load', (event: any) => {
  
        this.selectedFile = new ImageSnippet(event.target.result, file);
        this.imageSrc = this.selectedFile.src;
      });
  
      reader.readAsDataURL(file);
    }

    ngOnInit() {
      window.scroll(0,0);
      this.campModel.campaign_category = this.categories[0];
      this.campModel.borrower.state = this.states[0];
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
      this.getData = this.dataService.getCampaignDetail();
      if(this.getData !=''){
        this.submitted = true;
        this.campModel = this.getData;
        this.imageSrc = this.campModel.borrower.image_url;
      }
    }
    
      
    onSubmit(content):void {
      this.campModel = {
        "campaign_name":this.campModel.campaign_name,
        "campaign_description":this.campModel.campaign_description,
        "borrower":{
            "firstname":this.campModel.borrower.firstname,
            "lastname":this.campModel.borrower.lastname,
            "age":this.campModel.borrower.age,
            "city":this.campModel.borrower.city,
            "state":this.campModel.borrower.state,
            "pin":this.campModel.borrower.pin,
            "bio":this.campModel.borrower.bio,
            "image_url":this.imageSrc
        },
        "campaign_category":this.campModel.campaign_category,
        "contribution_amount":this.campModel.contribution_amount,
        "contribution_type":"Donation",
        "contribution_enddate":this.campModel.contribution_enddate,
        "creater_id":this.authenticationService.currentUserValue.userId,
        "creation_date":Date(),
        "status":false
    }​;

    this.authenticationService.addCampaign(this.campModel)
      .pipe(first())
      .subscribe(
          data => {
            this.modalService.open(content, { centered: true });
            setTimeout(() => {
              this.modalService.dismissAll();
              this.router.navigate([this.returnUrl]);
            },2000);
          },
          error => {
              this.error = error;
          });
    }
    //Edit
    onEdit(content):void{
      this.campModel.creation_date = Date();
      console.log(this.imageSrc);
      this.campModel.borrower.image_url = this.imageSrc;
      this.authenticationService.editCampaign(this.authenticationService.currentUserValue.userId,this.campModel)
      .pipe(first())
      .subscribe(
          data => {
            this.modalService.open(content, { centered: true });
             setTimeout(() => {
               this.modalService.dismissAll();
               this.router.navigate([this.returnUrl]);
             },2000);
          },
          error => {
              this.error = error;
          });
    }
}
  
