import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/apiService'
import { Observable } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';


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

  /**
   * 
   * @param min 
   * @param max 
   * @returns A random index within the range of the results set
   */
  getRandomIndex(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1))
  }


  /**
   * Fetch a list of titles from the API and retrieve a value at a random index within the range of the results set.
   * Executes a series of asynchronous functions concurrently using Promise.all.
   * This function is designed to coordinate the execution of multiple asynchronous tasks,
   * ensuring that all tasks complete before proceeding to the next step in the program flow (Filling the table).
   */
  async getARandomTitle() {
    this.showLoadingSpinner = true
    this.apiService.getRandomMovie().forEach((movieResults) => {
      const maxIndex = this.getRandomIndex(0, movieResults.results.length)
      console.log("Max Index", maxIndex)
      this.selectedMovie = movieResults.results[maxIndex]
      const buildMovieResults = [
        this.getMovieRating(this.selectedMovie),
        this.getMovieTitle(this.selectedMovie),
        this.getMovieCaption(this.selectedMovie),
        this.getMovieImage(this.selectedMovie),
        this.getMovieReleaseYear(this.selectedMovie)
      ]
      Promise.all(buildMovieResults).then(() => {
        this.showLoadingSpinner = false
        this.showTable = true
        this.fillTable()
      })
    })
  }

  /**
   * @param message 
   * @param action 
   * Recieves both a message and an action to display to the user
   */
  async handleError(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  /**
   * @param movieData 
   * @returns A promise after fetching the needed movie caption else it assigns a default value
   */
  async getMovieCaption(movieData: MovieResponse) {
    return new Promise(resolve => {
      resolve(this.movieCaption = movieData?.primaryImage?.caption?.plainText ?? "No Caption Available")
    })
  }

  /**
   * @param movieData 
   * @returns A promise after fetching the needed movie release year else it assigns a default value
   */

  async getMovieReleaseYear(movieData: MovieResponse) {
    return new Promise(resolve => {
      resolve(this.releaseYear = movieData?.releaseYear?.year ?? "No Release Available")
    })
  }
  /**
   * @param movieData 
   * @returns A promise after fetching the needed movie title else it assigns a default value
   */
  async getMovieTitle(movieData: MovieResponse) {
    return new Promise(resolve => {
      resolve(this.movieTitle = movieData?.titleText?.text ?? "No Title Available")
    })
  }

  /**
   * @param movieData 
   * @returns A promise after fetching the needed movie rating else it assigns a default value
   */
  async getMovieRating(movieData: MovieResponse) {
    return new Promise(resolve => {
      let movieId = movieData?.id
      this.apiService.getMovieRating(movieId).forEach((rating) => {
        resolve(this.movieRating = rating?.results?.averageRating ?? "")
      })
    })
  }

  /**
   * @param movieData 
   * @returns A promise after fetching the needed movie image else it assigns a default value
   */

  async getMovieImage(movieData: MovieResponse) {
    return new Promise(resolve => {
      resolve(this.imageUrl = movieData?.primaryImage?.url ?? null)
    })
  }

  /**
   * @param movieData 
   * @returnsTo Avoid an error if no image is found we first check if the value is null, if yes we assign it to "" else return the image URL
   */
  async checkForNoImage(imageResult: string) {
    if (imageResult === null) {
      imageResult = ""
    }
    return imageResult
  }


/**
 * Empty the table array to clear the UI
 */
  async clearTable() {
    this.tableData = []
    this.showTable = false

  }

  /**
   * Once all of the data has been fetched this route it called add the data to the table and display it to the user
   */

  async fillTable() {
    this.tableData = [...this.tableData, { title: this.movieTitle, rating: this.movieRating, image: await this.checkForNoImage(this.imageUrl), caption: this.movieCaption, year: this.releaseYear }]

    console.log("This Table Data", this.tableData)
  }
}
