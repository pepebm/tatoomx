import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class LoginService {
	private headers: any;
	private serverURL: string = 'localhost:3000/';
	private mail: string;
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
			this.http.post(this.serverURL + 'login', body, {headers: this.headers}).map(res => res.json()).subscribe(
				data => {
					if(data.status == 0){
						this.mail = mail;
						this.session = data.data;
						observer.next(true);
						observer.complete();
					}
					else{
						console.log(data.message);
						//HANDLE ERROR
					}
					console.log(data);
				},
				err => {
					console.log(err);
					//CREO QUE ESTO VA ARRIBA
					/*observer.next(false); 
					observer.complete();*/
				}
			);
		});
	}

	getMail(){
		return this.mail;
	}

	getSession(){
		return this.session;
	}
}