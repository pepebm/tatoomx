import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";
import { SessionService } from './session-service';
import 'rxjs/add/operator/map';

@Injectable()
export class PeopleService {
	private headers: any;
	private serverURL: string = 'http://localhost:3000/';

	constructor(private http: Http, private session: SessionService){
		this.headers = new Headers();
		this.headers.append('Content-Type','application/json');
	}

	create(body){
		return this.http.post(this.serverURL + 'people/register', body, {headers:this.headers}).map(res => res.json());
	}

	update(body){
		return this.http.post(this.serverURL + 'people/update', {body:body, id:this.sessionService.getSession().id, uid:this.sessionService.getSession().userId}, {headers: this.headers}).map(res => res.json());
	}

	getImages(){
		return this.http.get(this.serverURL + 'people/' + this.session.getSession().id + '/images', {headers:this.headers}).map(res => res.json());
	}

	getTattooists(){
		return this.http.get(this.serverURL + 'people/' + this.session.getSession().id + '/tattooists', {headers:this.headers}).map(res => res.json());
	}

	getStudios(){
		return this.http.get(this.serverURL + 'people/' + this.session.getSession().id + '/studios', {headers:this.headers}).map(res => res.json());
	}

	likeImage(imageId){
		return this.http.post(this.serverURL + 'people/likeimage', {personId: this.session.getSession().id, imageId:imageId},{headers:this.headers}).map(res => res.json());
	}

	dislikeImage(imageId){
		return this.http.post(this.serverURL + 'people/dislikeimage', {personId: this.session.getSession().id, imageId:imageId},{headers:this.headers}).map(res => res.json());
	}

	likeTattooist(tattooistId){
		return this.http.post(this.serverURL + 'people/liketattooist', {personId: this.session.getSession().id, tattooistId:tattooistId},{headers:this.headers}).map(res => res.json());
	}

	dislikeTattooist(tattooistId){
		return this.http.post(this.serverURL + 'people/disliketattooist', {personId: this.session.getSession().id, tattooistId:tattooistId},{headers:this.headers}).map(res => res.json());
	}

	likeStudio(studioId){
		return this.http.post(this.serverURL + 'people/likestudio', {personId: this.session.getSession().id, studioId:studioId},{headers:this.headers}).map(res => res.json());
	}

	dislikeStudio(studioId){
		return this.http.post(this.serverURL + 'people/dislikestudio', {personId: this.session.getSession().id, studioId:studioId},{headers:this.headers}).map(res => res.json());
	}
}