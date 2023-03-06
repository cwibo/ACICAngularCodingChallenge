import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { RecentQuote } from './RecentQuote';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class RecentQuoteService{
  recentQuotes: RecentQuote[] = [];
  topQuotes: RecentQuote[] = [];
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
            tap(_ => this.log('fetched recent Quotes')),
            catchError(this.handleError<RecentQuote[]>('getRecentQuotes', []))
          );
      }  
      //lineOfBusiness
      //id: 11, name: 'General Liability', description: 'Liability coverage for businesses.' 

      //recentQuote
      //id: 101, quoteNumber: 'AC123PC', lineOfBusiness: 11
    
    getRecentQuote(id: number): Observable<RecentQuote> {
        const url = `${this.recentQuoteUrl}/${id}`;
        return this.http.get<RecentQuote>(url).pipe(
          tap(_ => this.log(`fetched recentQuote lineOfBusiness=${id}`)),
          catchError(this.handleError<RecentQuote>(`getRecentQuote lineOfBusiness=${id}`))
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
    this.messageService.add(`RecentQuoteService: ${message}`);
  }
}