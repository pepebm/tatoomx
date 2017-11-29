import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class TattooistsService {
	private headers: any;
	private serverURL: string = 'http://localhost:3000/';

	constructor(private http: Http){
		this.headers = new Headers();
		this.headers.append('Content-Type','application/json');
	}

	create(body){
		return this.http.post(this.serverURL + 'tattooists/register', body, {headers:this.headers}).map(res => res.json());
	}

	getAll(){
		return this.http.get(this.serverURL + 'tattooists/',{headers: this.headers}).map(res => res.json());
	}

	getImages(tattooistId){
		return this.http.get(this.serverURL + 'tattooists/' + tattooistId + '/images', {headers: this.headers}).map(res => res.json());
	}
}
