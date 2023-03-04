import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { RecentQuote } from './RecentQuote';
import { LineOfBusiness } from './LineOfBusiness';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class RecentQuoteService{
    private recentQuoteUrl = 'api/recentQuotes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };    

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
      
    }

    getRecentQuotes(): Observable<RecentQuote[]> {
        return this.http.get<RecentQuote[]>(this.recentQuoteUrl)
          .pipe(
            tap(_ => this.log('fetched lines of business')),
            catchError(this.handleError<RecentQuote[]>('getRecentQuotes', []))
          );
      }




      /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation
   * @param result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); 

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`LineOfBusinessService: ${message}`);
  }
}