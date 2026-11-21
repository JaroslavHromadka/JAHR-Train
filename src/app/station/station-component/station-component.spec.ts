import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { StationComponent } from './station-component';
import { IStation, stationInitial, stationSchema } from '../station.model';

describe('StationComponent', () => {
  let component: StationComponent;
  let fixture: ComponentFixture<StationComponent>;
  let stationModel: ReturnType<typeof signal<IStation>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StationComponent);
    stationModel = signal<IStation>({ ...stationInitial, terminals: [] });
    fixture.componentRef.setInput(
      'station',
      TestBed.runInInjectionContext(() => form(stationModel, stationSchema)),
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('adds a blank terminal to the station', () => {
    fixture.nativeElement.querySelector('.terminal button').click();

    expect(stationModel().terminals).toEqual([{ name: '' }]);
  });
});
