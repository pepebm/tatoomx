import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
	private headers: any;
	private serverURL: string = 'localhost:3000/';
	private session: any;

	constructor(private http: Http){
		this.headers = new Headers();
		this.headers.append('Content-Type','application/json');
	}

	login(mail,password,type){
		let body = {
			mail: mail,
			password: password,
			type: type
		}
		return new Observable<boolean>(observer => {
			this.http.post('http://localhost:3000/login', body, {headers: this.headers}).map(res => res.json()).subscribe(
				data => {
					if(data.status == 0){
						this.session = data.data;
						this.session.mail = mail;
						this.session.type = type;
						observer.next(true);
						observer.complete();
					}
					else{
						console.log(data.message);
						//HANDLE ERROR
						observer.next(false); 
						observer.complete();
					}
				},
				err => {
					console.log(err);
				}
			);
		});
	}

	getSession(){
		return this.session;
	}
}