import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSwitcherComponent } from './image-switcher.component';

describe('ImageSwitcherComponent', () => {
  let component: ImageSwitcherComponent;
  let fixture: ComponentFixture<ImageSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageSwitcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
