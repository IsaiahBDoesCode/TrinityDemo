import { Injectable } from "@angular/core"
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Observable } from "rxjs"
import * as config from "../../../config/config.json"

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    moviesURl = "https://moviesdatabase.p.rapidapi.com"
    constructor(private http: HttpClient) { }
    fetchConfigs() {
        return config
    }

    getRandomMovie(): Observable<any> {
        return this.http.get(`${this.fetchConfigs().movieUrl}/titles`, {
            headers: { "X-RapidAPI-Key": this.fetchConfigs().apiKey }
        })
    }

    getMovieRating(id: string): Observable<any> {
        return this.http.get(`${this.fetchConfigs().movieUrl}/titles/${id}/ratings`, {
            headers: { "X-RapidAPI-Key": this.fetchConfigs().apiKey}
        })

    }
}


