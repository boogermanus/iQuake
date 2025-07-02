import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuakesComponent } from './quakes.component';
import {provideHttpClient} from '@angular/common/http';

describe('QuakesComponent', () => {
  let component: QuakesComponent;
  let fixture: ComponentFixture<QuakesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuakesComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
