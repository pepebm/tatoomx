import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';

@Injectable()
export class SessionService {
	private headers: any;
	private serverURL: string = 'http://localhost:3000/';
	private session: any = null;

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
		return new Observable<Object>(observer => {
			this.http.post('http://localhost:3000/login', body, {headers: this.headers}).map(res => res.json()).subscribe(
				data => {
					if(data.status == 0){
						this.session = data.data;
						this.session.mail = mail;
						this.session.type = type;
						observer.next({data:true});
						observer.complete();
					}
					else{
						observer.next({data:false,err:data.message}); 
						observer.complete();
					}
				},
				err => {
					console.log(err);
				}
			);
		});
	}

	logout(){
		this.session = null;
	}

	getSession(){
		return this.session;
	}
}