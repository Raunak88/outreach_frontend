import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../campaign';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private apiUrl = 'http://localhost:3000'; 
    
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'token': JSON.parse(localStorage.getItem('currentUser'))
        })
    };
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    
    //LOGIN
    login(empid: string, password: string) {
        return this.http.post<any>(`${this.apiUrl}/user/login`, { empid, password})
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }
    //SIGNUP
    signup(empid: string, password: string,role: string) {
        return this.http.post<any>(`${this.apiUrl}/user/signup`, { empid, password, role })
            .pipe(map(user => {
                return user;
            }));
    }
    //GET CAMPAIGN   
    getCampaign() {
        return this.http.get<any>(`${this.apiUrl}/campaigns`,this.httpOptions)
            .pipe(map(user => {
                return user;
            }));
    }

     //ADD CAMPAIGN
     addCampaign(data) {
        return this.http.post<any>(`${this.apiUrl}/campaigns`,data,this.httpOptions)
            .pipe(map(user => {
                return user;
            }));
    }

      //EDIT CAMPAIGN
      editCampaign(id,data):Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/campaigns/${id}`, data,this.httpOptions)
            .pipe(map(user => {
                return user;
            }));
    }

    //Delete campaign
    deleteCampaign(id){
        return this.http.delete<any>(`${this.apiUrl}/campaigns/${id}`,this.httpOptions)
        .pipe(map(user => {
            return user;
        }));
    }
    //LOGOUT
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userId');
        this.currentUserSubject.next(null);
    }
    //PAYMENT
    payment(id,contribution_details){
        return this.http.put<any>(`${this.apiUrl}/campaigns/payment/${id}`,contribution_details,this.httpOptions)
        .pipe(map(user => {
            return user;
        }));
    }
}