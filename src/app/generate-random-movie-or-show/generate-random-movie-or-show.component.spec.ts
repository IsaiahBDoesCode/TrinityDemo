import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateRandomMovieOrShowComponent } from './generate-random-movie-or-show.component';

describe('GenerateRandomMovieOrShowComponent', () => {
  let component: GenerateRandomMovieOrShowComponent;
  let fixture: ComponentFixture<GenerateRandomMovieOrShowComponent>;

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

});
