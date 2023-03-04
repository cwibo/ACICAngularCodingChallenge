import { Component, OnInit } from '@angular/core';

import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { InMemoryDataService } from '../in-memory-data.service';
import { RecentQuote } from '../RecentQuote';
import { RecentQuoteService } from '../recentQuote.service';

@Component({
  selector: 'app-linesOfBusiness',
  templateUrl: './linesOfBusiness.component.html',
  styleUrls: ['./linesOfBusiness.component.css'],
  providers: [InMemoryDataService]
})
export class LineOfBusinessComponent implements OnInit {
  linesOfBusiness: LineOfBusiness[] = [];
  recentQuotes: RecentQuote[] = [];

  constructor(private lineOfBusinessService: LineOfBusinessService,
    private recentQuoteService: RecentQuoteService,
    private inMemoryDataService: InMemoryDataService) { } 

  ngOnInit() {
    this.getLinesOfBusiness();
    this.getRecentQuotes();
    //this.recentQuotes = this.inMemoryDataService.recentQuotes;
  }

  getLinesOfBusiness(): void {
    this.lineOfBusinessService.getLinesOfBusiness()
    .subscribe(linesOfBusiness => this.linesOfBusiness = linesOfBusiness);
  }

  getRecentQuotes(): void{
    this.lineOfBusinessService.getQuote()
    .subscribe(recentQuotes => this.recentQuotes = recentQuotes);
  }

  add(name: string, description: string): void {
    name = name.trim();
    if (!name) { return; }
    this.lineOfBusinessService.addLineOfBusiness({ name, description } as LineOfBusiness)
      .subscribe(lineOfBusiness => {
        this.linesOfBusiness.push(lineOfBusiness);
      });
  }

  delete(lineOfBusiness: LineOfBusiness): void {
    this.linesOfBusiness = this.linesOfBusiness.filter(lob => lob !== lineOfBusiness);
    this.lineOfBusinessService.deleteLineOfBusiness(lineOfBusiness.id).subscribe();
  }

}
