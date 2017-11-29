import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";
import { SessionService } from './session-service';
import 'rxjs/add/operator/map';

@Injectable()
export class StudiosService {
	private headers: any;
	private serverURL: string = 'http://localhost:3000/';

	constructor(private http: Http, private sessionService: SessionService){
		this.headers = new Headers();
		this.headers.append('Content-Type','application/json');
	}

	getAll(){
		return this.http.get(this.serverURL + 'studios/' + this.sessionService.getSession().id,{headers: this.headers}).map(res => res.json());
	}

	getTattooists(studioId){
		return this.http.get(this.serverURL + 'studios/' + studioId + '/tattooists', {headers: this.headers}).map(res => res.json());
	}
}