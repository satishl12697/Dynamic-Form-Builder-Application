/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormViewerComponent } from './form-viewer.component';

describe('FormViewerComponent', () => {
  let component: FormViewerComponent;
  let fixture: ComponentFixture<FormViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
