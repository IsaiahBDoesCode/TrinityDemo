import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateRandomMovieOrShowComponent } from './generate-random-movie-or-show.component';

describe('GenerateRandomMovieOrShowComponent', () => {
  let component: GenerateRandomMovieOrShowComponent;
  let fixture: ComponentFixture<GenerateRandomMovieOrShowComponent>;
  let defaultData = {
    
      "_id": "61e57fd65c5338f43c777f4a",
      "id": "tt0000081",
      "primaryImage": {
          "id": "rm211543552",
          "width": 226,
          "height": 300,
          "url": "https://m.media-amazon.com/images/M/MV5BM2ZlYjA4NmItZTYxYy00MGFiLTg3MWUtNzZmYjE1ODZmMThjXkEyXkFqcGdeQXVyNTI2NTY2MDI@._V1_.jpg",
          "caption": {
              "plainText": "Les haleurs de bateaux (1896)",
              "__typename": "Markdown"
          },
          "__typename": "Image"
      },
      "titleType": {
          "text": "Short",
          "id": "short",
          "isSeries": false,
          "isEpisode": false,
          "__typename": "TitleType"
      },
      "titleText": {
          "text": "Les haleurs de bateaux",
          "__typename": "TitleText"
      },
      "originalTitleText": {
          "text": "Les haleurs de bateaux",
          "__typename": "TitleText"
      },
      "releaseYear": {
          "year": 1896,
          "endYear": null,
          "__typename": "YearRange"
      },
      "releaseDate": null
  
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateRandomMovieOrShowComponent]
    });
    
    fixture = TestBed.createComponent(GenerateRandomMovieOrShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should Return the release date or no release', async () => {
    const hasYearTest = await component.getMovieReleaseYear(defaultData)
  })


});
