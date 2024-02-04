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

export interface TableData {
  caption: string
  image: string
  rating: number
  title: string
  year: number
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

export class GenerateRandomMovieOrShowComponent {
  movieRating: number
  movieImageUrl: string
  movieTitle: string
  displayedColumns: string[] = ['image', 'title', 'rating', 'caption', 'year'];
  tableData: TableData[] = []
  movieCaption: string
  imageUrl: string
  imageFetched: boolean = false
  titleFetched: boolean = false
  ratingFetched: boolean = false
  captionFetched: boolean = false
  isDuplicate: boolean = false
  selectedMovie: MovieResponse
  showLoadingSpinner: boolean
  showTable: boolean = false
  releaseYear: number
  constructor(private apiService: ApiService, private _snackBar: MatSnackBar) { }
  getRandomIndex(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1))
  }

  async getARandomTitle() {
    this.showLoadingSpinner = true
    this.apiService.getRandomMovie().forEach((movieResults) => {
      const maxIndex = this.getRandomIndex(0, movieResults.results.length)
      console.log("Max Index", maxIndex)
      this.selectedMovie = movieResults.results[maxIndex]
      const waitForAllFunctions = [
        this.getMovieRating(this.selectedMovie),
        this.getMovieTitle(this.selectedMovie),
        this.getMovieCaption(this.selectedMovie),
        this.getMovieImage(this.selectedMovie),
        this.getMovieReleaseYear(this.selectedMovie),
        this.dontAddDuplicates(this.selectedMovie)
      ]
      Promise.all(waitForAllFunctions).then(() => {
        this.showLoadingSpinner = false
        this.showTable = true
        this.fillTable()
      })
    })
  }

  async handleError(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  async getMovieCaption(movieData: MovieResponse) {
    return new Promise(resolve => {
      resolve(this.movieCaption = movieData?.primaryImage?.caption?.plainText ?? "No Caption Available")
    })
  }

  async getMovieReleaseYear(movieData: MovieResponse) {
    return new Promise(resolve => {
      resolve(this.releaseYear = movieData?.releaseYear?.year ?? "No Release Available")
    })
  }

  async getMovieTitle(movieData: MovieResponse) {
    return new Promise(resolve => {
      resolve(this.movieTitle = movieData?.titleText?.text ?? "No Title Available")
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
      resolve(this.imageUrl = movieData?.primaryImage?.url ?? null)
    })
  }

  dontAddDuplicates(selectedMovie: MovieResponse) {
    console.log("Type Of", this.tableData)
  }

  async checkForNoImage(imageResult: string) {
    if (imageResult === null) {
      imageResult = ""
    }
    return imageResult
  }

  async clearTable() {
    this.tableData = []
    this.showTable = false

  }

  async fillTable() {
    this.tableData = [...this.tableData, { title: this.movieTitle, rating: this.movieRating, image: await this.checkForNoImage(this.imageUrl), caption: this.movieCaption, year: this.releaseYear }]

    console.log("This Table Data", this.tableData)
  }
}
