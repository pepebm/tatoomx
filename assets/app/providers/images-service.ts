import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";
import { SessionService } from './session-service';
import 'rxjs/add/operator/map';

@Injectable()
export class ImagesService {
	private headers: any;
	private serverURL: string = 'http://localhost:3000/';

	constructor(private http: Http, private sessionService: SessionService){
		this.headers = new Headers();
		this.headers.append('Content-Type','application/json');
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

	}

	getAll(){
		return this.http.get(this.serverURL + 'images/' + this.currentUser.id,{headers: this.headers}).map(res => res.json());
	}

	addImage(image){
		let body = {
			image:image,
			tattooistId: this.currentUser.id
		};
		return this.http.post(this.serverURL + 'images/add', body, {headers:this.headers}).map(res => res.json());
	}

	deleteImage(imageId){
		return this.http.post(this.serverURL + 'images/delete', {imageId: imageId}, {headers:this.headers}).map(res => res.json());
	}
}
