import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    private apiUrl = 'https://random.imagecdn.app/v1/image?width=500&height=150';

    constructor(private http: HttpClient) { }

    getImageUrl(): Observable<string> { 
        return this.http.get(this.apiUrl, { responseType: 'text' });
      }
}
