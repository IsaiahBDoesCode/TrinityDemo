import { Injectable } from "@angular/core"
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Observable } from "rxjs"


@Injectable({
    providedIn: 'root'
  })


export class ApiService {
    moviesURl = "https://moviesdatabase.p.rapidapi.com"

    constructor(private http: HttpClient) { }


    getRandomMovie():Observable<any>{
        console.log("Hello From The Service")
        return this.http.get(`${this.moviesURl}/titles`, {
            headers: {"X-RapidAPI-Key": "76331e07c9msh45b11b17a5a7493p1fb701jsnb508332567a8"}
        } )
    }

    getMovieRating(id: string):Observable<any>{
        console.log("Id is...", id)
        
        console.log("Whole URL", `${this.moviesURl}/titles/${id}/ratings`)
        return this.http.get(`${this.moviesURl}/titles/${id}/ratings`, {
            headers: {"X-RapidAPI-Key": "76331e07c9msh45b11b17a5a7493p1fb701jsnb508332567a8"}
        } )
    }

    getMovieImage(url:string):Observable<any>{
        return this.http.get('https://m.media-amazon.com/images/M/MV5BNDgxYjBjY2QtYjg5Mi00MGI2LWFlZWUtNWI5MDAzOTMyOGM4XkEyXkFqcGdeQXVyNTI2NTY2MDI@._V1_.jpg', {
            headers: {"X-RapidAPI-Key": "76331e07c9msh45b11b17a5a7493p1fb701jsnb508332567a8"}
        } )
    }
}


