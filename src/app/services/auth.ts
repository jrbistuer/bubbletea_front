import { Injectable, signal } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { getFirebaseAuth } from './firebase';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = getFirebaseAuth();

  readonly user = signal<User | null>(this.auth.currentUser);
  readonly ready: Promise<void>;

  constructor() {
    this.ready = new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(this.auth, (u) => {
        this.user.set(u);
        resolve();
        unsubscribe();
        onAuthStateChanged(this.auth, (next) => this.user.set(next));
      });
    });
  }

  async login(email: string, password: string): Promise<User> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    return credential.user;
  }

  async register(email: string, password: string, name: string): Promise<User> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    if (name) {
      await updateProfile(credential.user, { displayName: name });
    }
    return credential.user;
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
