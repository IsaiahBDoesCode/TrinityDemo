import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/apiService'
import { Observable } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface MovieElement {
  title: string
  image: string;
  rating: number;
  caption: string;
}

export interface MovieResponse {

  _id: string,
  id: string,
  primaryImage: {
    id: string,
    width: number,
    height: number,
    url: string,
    caption: {
      plainText: string,
      __typename: string
    },
    __typename: string
  },
  titleType: {
    text: string,
    id: string,
    isSeries: boolean,
    isEpisode: boolean,
    __typename: string
  },
  titleText: {
    text: string,
    __typename: string
  },
  originalTitleText: {
    text: string,
    __typename: string
  },
  releaseYear: {
    year: number,
    endYear: null,
    __typename: string
  },
  releaseDate: null
}

@Component({
  selector: 'app-generate-random-movie-or-show',
  templateUrl: './generate-random-movie-or-show.component.html',
  styleUrls: ['./generate-random-movie-or-show.component.css'],

})

export class GenerateRandomMovieOrShowComponent{
  movieRating: number
  movieImageUrl: string
  movieTitle: string
  displayedColumns: string[] = ['image', 'title', 'rating', 'caption'];
  tableData: any = []
  movieCaption: string
  imageUrl: string
  imageFetched: boolean = false
  titleFetched: boolean = false
  ratingFetched: boolean = false
  captionFetched: boolean =  false
  selectedMovie: MovieResponse
  constructor(private apiService: ApiService, private _snackBar: MatSnackBar) { }
  getRandomIndex(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1))
  }

  async getARandomTitle() {
      this.apiService.getRandomMovie().forEach((movieResults) => {
        const maxIndex = this.getRandomIndex(0, movieResults.results.length)
        this.selectedMovie = movieResults.results[maxIndex]
        const waitForAllFunctions = [this.getMovieRating(this.selectedMovie), this.getMovieTitle(this.selectedMovie), this.getMovieCaption(this.selectedMovie), this.getMovieImage(this.selectedMovie)]
        Promise.all(waitForAllFunctions).then(results => {
          console.log("Results", results)
          console.log("This Movie Rating in Promise....", this.movieRating)
          this.fillTable()
        })
      })
  }

  async handleError(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  async getMovieCaption(movieData: MovieResponse) {
    return new Promise(resolve => {
      resolve(this.movieCaption = movieData?.primaryImage?.caption?.plainText ?? "")
    })
  }

  async getMovieTitle(movieData: MovieResponse) {
    return new Promise(resolve => {
        resolve(this.movieTitle = movieData?.titleText?.text ?? "")
    })
  }

  async getMovieRating(movieData: MovieResponse) {
    return new Promise(resolve => {
    let movieId = movieData?.id
    this.apiService.getMovieRating(movieId).forEach((rating) => {
        resolve(this.movieRating = rating?.results?.averageRating ?? "")
      })
     
    })
  }

  async getMovieImage(movieData: MovieResponse) {
    return new Promise(resolve => {
      resolve(this.imageUrl = movieData?.primaryImage?.url ?? "")
    })
    
  }



  async fillTable() {
    console.log("This Movie Rating", this.movieRating)
    this.tableData = [...this.tableData, { title: this.movieTitle, rating: this.movieRating, image: this.imageUrl, caption: this.movieCaption, }]
  }

}
