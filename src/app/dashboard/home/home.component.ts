import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PrimeIcons } from 'primeng/api';
import { interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LawyerService } from 'src/services/lawyer.service';

interface Product {
  [x: string]: any;
  id?: string;
  act?: string;
  petitioner?: string;
  respondent?: string;
  courtName?: number;
  status?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}
interface homeValues {
  orderNo?: string;
  stampNo?: string;
  regNo?: string;
  nextDate?: string;
  lastDate?: string;
  courtName?: string;
  petitioner?: string;
  respondent?: string;
  coram?: string;
  date?: string;
  file?: string;
}
interface selected {
  cnrNo?: string;
  lastDate?: string;
  coram?: string;
  courtName?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  productDialog!: boolean;

  products: any[] = [];
  resultarray: any[] = [];
  myarray: any[] = [];

  product!: Product;

  selectedProducts!: Product[];
  selectedCaseId!: any;

  submitted!: boolean;

  displayModal!: boolean;

  date3: any;

  selectedDate!: Date;
  selectedCase!: selected;

  currentDate: string;

  getDate: any;
  previousData: any;
  data: any;
  events!: any[];
  homeValue!: homeValues;
  allcasesarray: any[] = [];
  filteredProducts!: any[];
  filteredData: any[] = [];
  constructor(
    private datePipe: DatePipe,
    private http: HttpClient,
    private lawyer: LawyerService
  ) {
    const today = new Date();
    this.currentDate = this.datePipe.transform(
      today,
      'EEEE,d MMMM , y'
    ) as string;

    // this.filteredProducts = this.products.filter(case => case.nextDate !== 'na');
  }

  ngOnInit() {
    // console.log(this.resultarray);

    this.getOrdersData();

    // this.refreshdata(); // Call the method initially to load data

    // interval(150000).subscribe(() => {
    //   // Call the method every 2 minutes
    //   this.refreshdata();
    // });

    console.log(this.products);

    this.events = [
      {
        status: 'Order',
        date: '15/10/2020 10:30',
        icon: PrimeIcons.SHOPPING_CART,
        color: '#9C27B0',
        image: 'game-controller.jpg',
      },
      {
        status: 'Order',
        date: '15/10/2020 14:00',
        icon: PrimeIcons.COG,
        color: '#673AB7',
      },
      {
        status: 'Order',
        date: '15/10/2020 16:15',
        icon: PrimeIcons.ENVELOPE,
        color: '#FF9800',
      },
      {
        status: 'Order',
        date: '16/10/2020 10:00',
        icon: PrimeIcons.CHECK,
        color: '#607D8B',
      },
    ];
  }

  getOrdersData() {
    this.lawyer.getorderdata().subscribe((data: any) => {
      this.resultarray = data;
      console.log(this.resultarray, 'this is home result');
  
      // Iterate over myarray and assign corresponding values to resultarray
      for (let i = 0; i < this.myarray.length; i++) {
        this.resultarray[i].orderno = this.myarray[i].orderno;
        this.resultarray[i].coram = this.myarray[i].coram;
        this.resultarray[i].date = this.myarray[i].date;
        this.resultarray[i].file = this.myarray[i].file;
      }
  
      // Call the filterCases() function to filter and populate the filteredData array
      this.filterCases();
    });
  
    this.lawyer.getCases().subscribe((data: any) => {
      this.products = data;
      console.log(this.products, 'casedetails');
  
      // Call the filterCases() function to filter and populate the filteredData array
      this.filterCases();
    });
  }
  
  filterCases() {
    // Proceed with filtering and populating the filteredData array only if both resultarray and products are populated
    if (this.resultarray && this.products) {
      // Filter the products array based on the specified conditions
      const filteredArray = this.products.filter((item) => {
        if (!item.nextDate || item.nextDate === 'NA' || item.nextDate === '--' || item.nextDate === "- --") {
          return false; // Exclude items with empty, 'NA', '--', or "- --" date
        }
        return true;
      });
  
      // Sort the filtered array by ascending order
      filteredArray.sort((a, b) => {
        if (!a.nextDate || a.nextDate === 'NA' || a.nextDate === '--' || a.nextDate === "- --" ||
            !b.nextDate || b.nextDate === 'NA' || b.nextDate === '--' || b.nextDate === "- --") {
          return 0; // Preserve the order of items with empty, 'NA', '--', or "- --" date
        }
        const dateA: any = new Date(a.nextDate);
        const dateB: any = new Date(b.nextDate);
        return dateA - dateB;
      });
  
      this.filteredData = filteredArray;
      console.log(filteredArray, "filtered array of next date");
    }
  
    console.log(this.resultarray, 'resultarray After1');
  }
  

  delArr: any = [];

  objarray: any[] = [];

  obj = {};

  refreshdata() {
    this.lawyer.getCases().subscribe((data: any) => {
      this.products = data.reverse(); // Update the products array with new data
      console.log(data);
      this.products = data;
      console.log(this.products);

      for (let i = 0; i < this.products.length; i++) {
        this.obj = {
          cnrNo: this.products[i].cnrNo,
          courtName: this.products[i].courtName,
          dispDate: this.products[i].dispDate,
          district: this.products[i].district,
          lastCoram: this.products[i].lastCoram,
        };
        this.lawyer.orderdata(this.obj).subscribe((data: any) => {
          console.log(data);
        });
      }
    });
  }
  deleteAll() {
    this.lawyer.getCases().subscribe((data: any) => {
      this.products = data;

      // assign values to resultArray
      for (let index = 0; index < this.products.length; index++) {
        this.resultarray[index].stampNo = this.products[index].stampNo;
        this.resultarray[index].regNo = this.products[index].regNo;
        this.resultarray[index].nextDate = this.products[index].nextDate;
        this.resultarray[index].lastDate = this.products[index].lastDate;
        this.resultarray[index].courtName = this.products[index].courtName;

        // close for loop
      }

      console.log(data);
      console.log(this.products, 'store');

      for (let i = 0; i < this.products.length; i++) {
        const id = this.products[i]['_id'];
        this.delArr.push(id);
      }
    });
    console.log(this.delArr, 'delarr');
  }
  showModalDialog() {
    this.displayModal = true;
  }

  public filterDate(date: Date): string | null {
    this.datePipe.transform(date, 'M/d/yyyy');
    console.warn(date);

    this.getDate = date.getDate();
    console.log(this.getDate);

    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  idsToDelete: string[] = [];

  onDeleteSelected() {
    this.http
      .delete('/api/casedetails', { body: { ids: this.idsToDelete } })
      .subscribe();
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  showcasedetails(cases: any) {
    this.displayModal = true;
    this.selectedCaseId = cases.cnrNo;

    const cnrno = cases.cnrNo;
    console.log(cnrno);

    console.log(this.products, 'show case details');

    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].cnrNo === cnrno) {
        console.log('Match found:', this.products[i]);
        this.selectedCase = this.products[i];
        break;
      }
    }
  }
  closeModal() {
    this.displayModal = false;
  }
}
