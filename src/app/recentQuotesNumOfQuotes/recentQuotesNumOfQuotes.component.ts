import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';

import { RecentQuote } from '../RecentQuote';
import { RecentQuoteService } from '../recentQuote.service';

@Component({
  selector: 'app-recentQuotesNumOfQuotes',
  templateUrl: './recentQuotesNumOfQuotes.component.html',
  styleUrls: ['./recentQuotesNumOfQuotes.component.css']
})
export class RecentQuotesNumOfQuotesComponent implements OnInit {
  lineOfBusiness: LineOfBusiness | undefined;
  recentQuote: RecentQuote | undefined;
  recentQuotes: RecentQuote[] = [];
  quotes: RecentQuote[] = [];

  constructor(
    private route: ActivatedRoute,
    private lineOfBusinessService: LineOfBusinessService,
    private recentQuoteService: RecentQuoteService,
    private location: Location
  ) {}

  ngOnInit(): void { 
    this.getLineOfBusiness();
    this.getQuotes();
  }
  getLineOfBusiness(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.lineOfBusinessService.getLineOfBusiness(id)
      .subscribe(lineOfBusiness => this.lineOfBusiness = lineOfBusiness);
   // this.recentQuoteService.getRecentQuote(id)
   //   .subscribe(recentQuote => this.recentQuote = recentQuote)
  }

  getQuotes(): void{
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.recentQuoteService.getRecentQuote(id)
      .subscribe(recentQuote => this.recentQuote = recentQuote)
      //this.quotes.push(this.recentQuotes[1]);

  }


}
