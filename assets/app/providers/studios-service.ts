import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class StudiosService {
	private headers: any;
	private serverURL: string = 'localhost:3000/';

	constructor(private http: Http){
		this.headers = new Headers();
		this.headers.append('Content-Type','application/json');
	}

	getAll(){
		return this.http.get(this.serverURL + 'studios/',{headers: this.headers}).map(res => res.json());
	}

	getTattooists(studioId){
		return this.http.get(this.serverURL + 'studios/' + studioId + '/tattooists', {headers: this.headers}).map(res => res.json());
	}
}