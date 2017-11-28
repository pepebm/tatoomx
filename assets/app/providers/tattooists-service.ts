import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';

@Injectable()
export class TattooistsService {
	private headers: any;
	private serverURL: string = 'localhost:3000/';

	constructor(private http: Http){
		this.headers = new Headers();
		this.headers.append('Content-Type','application/json');
	}

	create(body){
		return this.http.post(this.serverURL + 'tattooists/register', body, {headers:this.headers}).map(res => res.json());
	}
}