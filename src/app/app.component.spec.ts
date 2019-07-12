import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { NbThemeModule, NbSidebarModule, NbLayoutModule, NbButtonModule, NbInputModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NbThemeModule.forRoot({ name: 'cosmic' }),
        NbLayoutModule,
        NbSidebarModule.forRoot(),
        NbButtonModule,
        NbInputModule,
        NbCardModule,
        NbEvaIconsModule,
        NbIconModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

/*   test('this test will fail', () => {
    throw new Error('It crashed!');
  }); */

  test('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  test(`should have as title 'The Project SU'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('The Project SU');
  });

  test('should render title in a h6 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h6').textContent).toContain('Welcome to The Project SU!');
  });

  test('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('The future is: Now! 👨‍💻');
  });

  test(`should have a button with text 'Get early access'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Get early access');
  });
});
