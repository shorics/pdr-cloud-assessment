import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { App } from './app';

@Component({
  template: `<app-root></app-root>`,
  imports: [App],
})
class TestHost {}

describe('App', () => {
  let component: TestHost;
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
