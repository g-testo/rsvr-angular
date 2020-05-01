import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];
  loggedInUserId: string;
  resourceUrl: string = "http://localhost:8080/users/";
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  
  constructor(private http: HttpClient, private eventService: EventService) { }

  getUser(id: number){
    return this.http.get(this.resourceUrl + id, this.httpOptions);
  }
  getUsers(): void {
    this.http.get<User[]>(this.resourceUrl).subscribe((users: User[])=>{
      this.users = users;
    });
  }
  postUser(user: User){
    return this.http.post(this.resourceUrl, user, this.httpOptions);
  }
  putUser(){
  }
  deleteUser(id: number): void{
    this.http.delete(this.resourceUrl + id).subscribe(()=>{
      this.getUsers();
    });
  }
}
