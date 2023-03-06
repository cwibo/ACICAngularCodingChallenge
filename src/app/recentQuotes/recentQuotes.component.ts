import { Component, OnInit } from '@angular/core';
import { RecentQuote } from '../RecentQuote';
import { RecentQuoteService } from '../recentQuote.service';
import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';
@Component({
  selector: 'app-recentQuotes',
  templateUrl: './recentQuotes.component.html',
  styleUrls: ['./recentQuotes.component.css']
})
export class RecentQuotesComponent implements OnInit {
  recentQuotes: RecentQuote[] = [];
  linesOfBusiness: LineOfBusiness[] = [];
  topQuotes: RecentQuote[] = [];
  count: number[] = [];
  
  testArray = [
    { id: 101, quoteNumber: 'AC123PC', lineOfBusiness: 11 },
    { id: 102, quoteNumber: 'AC124PC', lineOfBusiness: 12 },
    { id: 103, quoteNumber: 'AC125PC', lineOfBusiness: 13 },
    { id: 104, quoteNumber: 'AC126PC', lineOfBusiness: 14 },
    { id: 105, quoteNumber: 'AC127PC', lineOfBusiness: 15 },
    { id: 106, quoteNumber: 'AC125PC', lineOfBusiness: 13 },
    { id: 107, quoteNumber: 'AC126PC', lineOfBusiness: 13 },
    { id: 108, quoteNumber: 'AC127PC', lineOfBusiness: 15 }
  ];
  numb: {lineOfBusinessId: number, count: number;}[] = [];
  num = [0];
  id = [0];

  constructor(private recentQuoteService: RecentQuoteService,
    private lineOfBusinessService: LineOfBusinessService) { }

  ngOnInit(): void {
    this.getRecentQuotes();
   // this.addPopularQuote();
    this.arrayLength();
   // this.getNumOfQuotes();
   this.getQuotes();
  }

  getQuotes(){
    //1,2,3,4,1,2,5,6,9,12,15,18,21
    // { id: 101, quoteNumber: 'AC123PC', lineOfBusiness: 11 },
    // { id: 102, quoteNumber: 'AC124PC', lineOfBusiness: 12 },
    // { id: 103, quoteNumber: 'AC125PC', lineOfBusiness: 13 },
    // { id: 104, quoteNumber: 'AC126PC', lineOfBusiness: 14 },
    // { id: 105, quoteNumber: 'AC127PC', lineOfBusiness: 15 },
    // { id: 106, quoteNumber: 'AC125PC', lineOfBusiness: 13 },
    // { id: 107, quoteNumber: 'AC126PC', lineOfBusiness: 13 },
    // { id: 108, quoteNumber: 'AC127PC', lineOfBusiness: 15 },
    // { id: 109, quoteNumber: 'AC128PC', lineOfBusiness: 15 }
    
  }

  public async arrayLength(){
    this.num.pop();   
    this.id.pop();
    var result = await this.recentQuoteService.getRecentQuotes().toPromise()
      .then(result => {
        this.recentQuotes = result;
      }, 
        error => {
          
          console.log("There was an error");
        });
        var rQL = this.recentQuotes.length;
 
    
        var counter = 0;
    for (let i = 0; i < this.linesOfBusiness.length; i++) {
      this.id.push(this.recentQuotes[i].lineOfBusiness)
      for(var j = 0; j < this.testArray.length; j++) {
        
        if (this.recentQuotes[j].lineOfBusiness === this.linesOfBusiness[i].id){
          console.log(this.id[i]);
          console.log(this.recentQuotes[j].id);
        console.log(this.recentQuotes[i].lineOfBusiness);
          counter++;
        }
      }  
      //this.numb.push(counter);
      //console.log(this.numb[i] = counter);
      //this.numb[i].count = counter;
      
      this.num.push(counter);
      counter = 0; 
    }
    this.num.sort().reverse();
    this.id.reverse();
   
  }

  getRecentQuotes(): void{
    this.recentQuoteService.getRecentQuotes()
    .subscribe(recentQuotes => this.recentQuotes = recentQuotes); 

    this.lineOfBusinessService.getLinesOfBusiness()
      .subscribe(linesOfBusiness => this.linesOfBusiness = linesOfBusiness);
  }

   
    
}
