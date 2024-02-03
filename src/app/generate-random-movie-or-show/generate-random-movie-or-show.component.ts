import { Component } from '@angular/core';
import { ApiService } from '../services/apiService'
import { Observable } from 'rxjs';

export interface MovieElement {
  image: string;
  rating: number;
  caption: number;
}

export interface MovieResponse {

    _id : string,
    id : string,
    primaryImage : {
        id : string,
        width : number,
        height : number,
        url : string,
        caption : {
            plainText : string,
            __typename : string
       },
        __typename : string
   },
    titleType : {
        text : string,
        id : string,
        isSeries : boolean,
        isEpisode : boolean,
        __typename : string
   },
    titleText : {
        text : string,
        __typename : string
   },
    originalTitleText : {
        text : string,
        __typename : string
   },
    releaseYear : {
        year : number,
        endYear : null,
        __typename : string
   },
    releaseDate : null
}

// const ELEMENT_DATA: MovieElement[] = 


@Component({
  selector: 'app-generate-random-movie-or-show',
  templateUrl: './generate-random-movie-or-show.component.html',
  styleUrls: ['./generate-random-movie-or-show.component.css'],

})

export class GenerateRandomMovieOrShowComponent {
  
  displayedColumns: string[] = ['rating', 'image', 'caption'];
  tableData = [
    {rating: 1, image: 'Hydrogen', caption: 1, },
  ];

  constructor(private apiService: ApiService){}

  getRandomIndex(min:number,max:number){
    return Math.floor(Math.random() * (max - min + 1))
  } 

  buttonClicked(){
  this.apiService.getRandomMovie().forEach((movieResults) =>{
    const maxIndex = this.getRandomIndex(0, movieResults.results.length)
      const results = movieResults.results[maxIndex]
      console.log("results", typeof results)
      this.fillTable(results)
     })
  }

  getMovieRating(id: string){
    this.apiService.getMovieRating(id)
  }

  fillTable(movieData: MovieResponse){
    let movieId = movieData.id
    
    console.log("Movie Data..", typeof movieId)
    console.log("Results from rating", this.getMovieRating(movieId))




    // this.tableData = [...this.tableData, {rating: 1, image: 'Test', caption: 1.0079, }]
    // console.log("Filled Table Data", this.tableData)
    


  }

}
