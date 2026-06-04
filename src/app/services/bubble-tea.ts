import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { BubbleTea } from '../models/bubble-tea';
import { AuthService } from './auth';
import { getFirebaseAuth } from './firebase';

@Injectable({ providedIn: 'root' })
export class BubbleTeaService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.bubbleTeasUrl;
  private readonly auth = inject(AuthService);

  readonly bubbleTeas = signal<BubbleTea[]>([]);

  constructor() {
    this.loadAll().catch((err) => console.error('Failed to load bubble teas', err));
  }

  async getAuthHeader(): Promise<{ headers: HttpHeaders }> {
    const token = await getFirebaseAuth().currentUser!.getIdToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return { headers };
  }

  async loadAll() {
    const options = await this.getAuthHeader();
    const res: any = await firstValueFrom(this.http.get(this.url, options));
    const items = res && res.ok ? res.results : [];
    this.bubbleTeas.set(items);
    return items;
  }

  getById(id: number) {
    return this.bubbleTeas().find((bt) => bt.id === id);
  }

  async add(bt: Omit<BubbleTea, 'id'>) {
    const options = await this.getAuthHeader();
    await firstValueFrom(this.http.post(`${this.url}/`, bt, options));
    await this.loadAll();
  }

  async update(id: number, bt: Omit<BubbleTea, 'id'>) {
    const options = await this.getAuthHeader();
    await firstValueFrom(this.http.put(`${this.url}/${id}/`, bt, options));
    await this.loadAll();
  }

  async delete(id: number) {
    const options = await this.getAuthHeader();
    await firstValueFrom(this.http.delete(`${this.url}/${id}/`, options));
    await this.loadAll();
  }

}