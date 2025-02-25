import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AppService } from './app.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let appService: jasmine.SpyObj<AppService>;
  let router: Router;

  beforeEach(() => {
    const appServiceSpy = jasmine.createSpyObj('AppService', ['loggedIn', 'getUserRole']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AppService, useValue: appServiceSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    appService = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

});
