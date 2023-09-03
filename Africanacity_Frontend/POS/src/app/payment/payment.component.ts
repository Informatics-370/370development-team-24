import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../service/order.service';
import { KitchenOrder } from '../shared/kitchen-order';
import { ModalController } from '@ionic/angular';
import { PrintReceiptComponent } from '../print-receipt/print-receipt.component';
//import jsPDF from 'jspdf';
//import autoTable from 'jspdf-autotable';
//import { saveAs } from 'file-saver'; // Import file-saver for saving the PDF

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent  implements OnInit {

  order!: KitchenOrder | undefined;
  checkedListItems: KitchenOrder [] = [];
  

  constructor(private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private modalController: ModalController ) { }

    ngOnInit() {
      this.route.params.subscribe((params) => {
        const kitchenOrderNumber = params['kitchenOrderNumber'];
        this.order = this.orderService.getKitchenOrderByNumber(kitchenOrderNumber);
      });
    }

    async presentModal() {
      const modal = await this.modalController.create({
        component: 'print-receipt', // Replace 'modal-content' with the selector or class name of your modal content component
        componentProps: {
          order: this.order // Pass the order object to the modal content component
        }
      });
      return await modal.present();
    }
    
    

   /*async onPaidButtonClick() {
      console.log('Paid button clicked!');

        // Show the print receipt modal here
      if (this.order) {
        // Perform any payment processing logic here
        // For demonstration purposes, we'll just update the order status
        this.order.status = 'paid';
  
        // Save the updated kitchen orders to local storage
        this.orderService.saveKitchenOrders(this.orderService.getKitchenOrders());
  
        // Show the print receipt modal here
        // You can use a third-party library like ngx-bootstrap or implement your custom modal
        // For demonstration purposes, we'll assume the receipt is printed and proceed to navigate back to the Kitchen Screen
       
        this.goBackToKitchenScreen();
      } else {
        // Handle the case where the order is undefined
        // For example, you can redirect to an error page or show a message
        console.log('Order not found or undefined.');
      }

      const doc = new jsPDF();
    const headers = [['Kitchen Order Number', 'Subtotal']];

      // Map the checklistItems to generate the data array
    const data = this.checkedListItems.map(item => [item.kitchenOrderNumber, item.subtotal]);
  
    doc.setFontSize(12);
  
    // Generate the table using autoTable
    // startY is the initial position for the table
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 20,
      // Other options for styling the table if needed
    });

// Function to convert the array of OrderedItem objects into a string


  
    doc.setFontSize(12);
  
    // Generate the table using autoTable
    // startY is the initial position for the table
   
    
    // Convert the PDF blob to a Base64 string
    const pdfBlob = doc.output('blob');
  
    // Create a file-saver Blob object
    const file = new Blob([pdfBlob], { type: 'application/pdf' });
  
    // Save the Blob to a file
    saveAs(file, 'receipt.pdf');
      
    }*/

  
    goBackToKitchenScreen() {
      // Navigate back to the Kitchen Screen
      // You can also pass any parameters if needed
      this.router.navigate(['/kitchen-screen']);
    }

    

}
