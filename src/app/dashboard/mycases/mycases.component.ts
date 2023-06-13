import { Component, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PrimeIcons } from 'primeng/api';
import { LawyerService } from 'src/services/lawyer.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
  dispDate?: any;
  status?: any;
  details?: any;
  petitioner?: any;
  respondent?: any;
  cnrNo?: any;
  stampNo?: any;
  regNo?: any;
  regDate?: any;
  petnAdvocate?: any;
  courtName?: any;
  lastDate  ?: any;
  district?: any;
  jurisdiction?: any;
  petnOrResp?: any;
  nextDate?: any;
  
}
@Component({
  selector: 'app-mycases',
  templateUrl: './mycases.component.html',
  styleUrls: ['./mycases.component.css'],
})
export class MycasesComponent {
  @ViewChild('dt') dt!: Table;

  constructor(
    private datePipe: DatePipe,
    private lawyer: LawyerService,
    private messageservice: MessageService
  ) {}
  selectedDate!: Date;
  displayModal!: boolean;
  displayCasedetails!: boolean;
  date3: any;
  events: any[] = [];
  selectedEvent: any;
  resultarray: any[] = [];
  orderarray: any[] = [];
  selectedProducts!: Product[];
  filteredProducts!: any[];
  searchText:any

  public filterDate(date: Date): string {
    if (date) {
      return this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';
    }
    return '';
  }

  ngOnInit() {
    // this.showModalDialog();

    this.lawyer.getCases().subscribe((data: any) => {
      this.products = data;
      // console.log(data,'My Cases');
      console.log(this.products, 'My Cases');

      this.filteredProducts = this.products;

      console.log(this.filteredProducts,'this is filter data');
      

      // this.events = this.products.map((product: any) => {
      //   return {
      //     dispDate: product.dispDate,
      //     status: product.status
      //   };
      // });

      // console.log(this.events, 'My Cases with Dates');

      // this.events = [

      //   {
      //     status: 'Order',
      //     date: '15/10/2020 10:30',
      //     icon: PrimeIcons.SHOPPING_CART,
      //     color: '#9C27B0',
      //     image: 'game-controller.jpg',
      //   },
      //   {
      //     status: 'Order',
      //     date: '15/10/2020 14:00',
      //     icon: PrimeIcons.COG,
      //     color: '#673AB7',
      //   },
      //   {
      //     status: 'Order',
      //     date: '15/10/2020 16:15',
      //     icon: PrimeIcons.ENVELOPE,
      //     color: '#FF9800',
      //   },
      //   {
      //     status: 'Order',
      //     date: '16/10/2020 10:00',
      //     icon: PrimeIcons.CHECK,
      //     color: '#607D8B',
      //   },
      // ];

      // console.log(this.events,"My cases with date");
    });
  }
  selectEvent(event: any) {
    this.selectedEvent = event;
    console.log('Selected Event:', this.selectedEvent);
    // Additional logic related to the selected event
  }

  showModalDialog1(cnrNo: any) {
    // console.log(this.resultarray,"showModalDialog1");

    // this.showModalDialog();

    this.lawyer.getOrderByCnr(cnrNo).subscribe((data: any) => {
      console.log(data, 'This is order by cnrno data');

      this.orderarray = data;
      console.log(this.orderarray, 'getOrderByCnr');

      if (this.orderarray.length > 0) {
        console.log('Order exist for this CNR NO:', cnrNo);
        this.displayModal = true;

        // Further processing for existing CNR number
      } else {
        console.log('Order does not exist for this CNR NO:', cnrNo);
        this.messageservice.add({
          severity: 'error',
          summary: 'Order Not Found',
          detail: 'The order does not exist for the given Case No.'
        // Further processing for non-existing CNR number
      });

      }

    });
  }

  showModalDialog() {
    this.displayModal = true;

    this.lawyer.getorderdata().subscribe((data: any) => {
      console.log(data, 'this is ordersdata');
      // this.products = data;
      // this.events = data;l
      this.resultarray = data;
      console.log(this.resultarray, 'this is show orderdata');

      this.events = [];

      for (let i = 0; i < this.resultarray.length; i++) {
        const date = this.resultarray[i].date.replace(/\//g, '-'); // Replace '/' with '-'
        const file = this.resultarray[i].file.replace(/\//g, '-'); // Replace '/' with '-'

        const event = {
          // date: this.resultarray[i].date,
          // date:date,
          date: this.resultarray[i].date,
          action: this.resultarray[i].action,
          coram: this.resultarray[i].coram,
          file: this.resultarray[i].file,
          orderno:this.resultarray[i].orderno,
          cnrNo:this.resultarray[i].cnrNo,
          
          // file:file

          // onClick: () => this.displayOrder(event),
        };

        this.events.push(event);
      }
      console.log(this.events, 'My order events');
    });
  }

  showOrderDetails(event: any) {
    console.log('Selected Order:', event);
  }

  displayOrder(event: any) {
    this.selectedEvent = event;
  }
  products!: Product[];

  DownloadOrders(filename: any) {
    // alert('Pleae wait To download');
    // console.log(this.resultarray,'result array');

    this.lawyer.getDownloadFile(filename).subscribe((x: any) => {
      // console.log(data,'file data');
      var newBlob = new Blob([x], { type: 'application/vnd.pdf' });

      const data1 = window.URL.createObjectURL(newBlob);
      var link = document.createElement('a');
      link.href = data1;
      link.download = 'File.pdf';
      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      console.log('file Downloded');
    });
  }

  showcasedetails() {}

  filterCases(event: any) {
    const searchText = event.target.value.toLowerCase();
    this.filteredProducts = this.products.filter(cases => {
      const caseString = Object.values(cases).join(' ').toLowerCase();
      return caseString.includes(searchText);
    });
  }
  resetFilter() {
    this.filteredProducts = this.products;
  }

  //  DownloadOrders1(filename:any) {
  //   //  alert("Pleae wait To download")
  //   // console.log(this.resultarray,'result array');

  //  this.lawyer.getDownloadFile(filename).subscribe((response:any)=>{
  //   const downloadLink = document.createElement('a');
  //   const fileUrl = URL.createObjectURL(response);
  //   downloadLink.href = fileUrl;
  //   downloadLink.download = 'File.pdf';
  //   downloadLink.dispatchEvent(new MouseEvent('click'));

  //  })
  // }
}
