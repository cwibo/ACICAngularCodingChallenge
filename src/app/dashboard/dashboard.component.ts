import { Component, OnInit } from '@angular/core';
import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { RecentQuote } from '../RecentQuote';
import { RecentQuoteService } from '../recentQuote.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  linesOfBusiness: LineOfBusiness[] = [];
  recentQuotes: RecentQuote[] = [];

  constructor(private lineOfBusinessService: LineOfBusinessService,
    private recentQuoteService: RecentQuoteService) { }

  ngOnInit() {
    this.getLinesOfBusiness();
    this.getRecentQuotes();
  }

  getLinesOfBusiness(): void {
    this.lineOfBusinessService.getLinesOfBusiness()
      .subscribe(linesOfBusiness => this.linesOfBusiness = linesOfBusiness.slice(1, 4));
  }

  getRecentQuotes(): void {
    this.recentQuoteService.getRecentQuotes()
      .subscribe(recentQuotes => this.recentQuotes = recentQuotes.slice(1, 4));
  }
}
