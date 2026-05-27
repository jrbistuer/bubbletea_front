import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse, BubbleTea } from '../models/bubble-tea';

@Injectable({ providedIn: 'root' })
export class BubbleTeaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.bubbleTeasUrl;

  // In-memory cache of the bubble teas, populated once at app start by
  // `loadAll()` (called from the APP_INITIALIZER in app.config.ts). Components
  // read from this signal so the list and detail views stay reactive without
  // hitting the backend again.
  readonly bubbleTeas = signal<BubbleTea[]>([]);
  // Alternative pattern: keep the writable signal private and expose a
  // read-only view so consumers cannot mutate the cache from outside.
  // private readonly _bubbleTeas = signal<BubbleTea[]>([]);
  // readonly bubbleTeas = this._bubbleTeas.asReadonly();

  // Fetches every bubble tea from the backend, unwraps the `{ ok, result }`
  // envelope, normalizes each item (active 0/1 → boolean) and stores them in
  // the `bubbleTeas` signal. Returns the Observable so the caller (the app
  // initializer) can await it before bootstrap completes.
  loadAll(): Observable<BubbleTea[]> {
    return this.http.get<ApiResponse<BubbleTea[]>>(this.baseUrl).pipe(
      map((res) => res.result.map(normalize)),
      tap((items) => this.bubbleTeas.set(items)),
    );
  }

  // Synchronous lookup against the in-memory cache. Used by the detail page
  // so navigating to /bubble-tea/:id does not trigger an extra HTTP call.
  getById(id: number): BubbleTea | undefined {
    return this.bubbleTeas().find((bt) => bt.id === id);
  }

  // Direct backend fetch for a single bubble tea. Kept available for cases
  // where the cache may be stale or the item is not present (e.g. deep-link
  // refresh before `loadAll()` has completed).
  fetchById(id: number): Observable<BubbleTea> {
    return this.http
      .get<ApiResponse<BubbleTea>>(`${this.baseUrl}/${id}`)
      .pipe(map((res) => normalize(res.result)));
  }
}

// Coerces the backend's numeric `active` flag (0/1) into a proper boolean
// so templates can use it directly without comparing against numbers.
function normalize(bt: BubbleTea): BubbleTea {
  return { ...bt, active: Boolean(bt.active) };
}
