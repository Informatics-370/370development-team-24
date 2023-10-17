import { Component, OnInit } from '@angular/core';
import { Result } from '@zxing/library';
import { MenuService } from 'src/app/services/Menu.Service';
import * as QRCode from 'qrcode-generator';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-digital',
  templateUrl: './digital.component.html',
  styleUrls: ['./digital.component.scss']
})
export class DigitalComponent implements OnInit {

  qrCodeData!: string;

  constructor(
    private router: Router,
    private menuService: MenuService,
    private route: ActivatedRoute // Add ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Define the URL you want to open when the QR code is scanned
    const urlToOpen = 'http://localhost:51627/menu';

    // Generate a QR code with the URL
    this.generateQRCode(urlToOpen);
  }

  generateQRCode(url: string): void {
    const qr = QRCode(0, 'L'); // Create a QR code generator instance
    qr.addData(url); // Add the URL to the QR code generator
    qr.make();

    // Get the data URL of the QR code image
    this.qrCodeData = qr.createDataURL();
  }

  navigateToMenu(): void {
    // Redirect to the defined URL when the QR code is scanned
    window.location.href = 'http://localhost:51627/menu';
   }
  

  // qrCodeData!: string;

  // constructor(
  //   private router: Router,
  //   private menuService: MenuService,
  //   private route: ActivatedRoute
  // ) {}

  // ngOnInit(): void {
  //   // Fetch menu items from the API
  //   this.menuService.getAllMenuItems().subscribe((data) => {
  //     // Generate QR code with menu data
  //     this.generateQRCode(data);
  //   });
  // }

  // generateQRCode(data: any): void {
  //   const qr = QRCode(0, 'L'); // Create a QR code generator instance
  //   qr.addData(JSON.stringify(data)); // Add data to the QR code generator
  //   qr.make();

  //   // Get the data URL of the QR code image
  //   this.qrCodeData = qr.createDataURL();
  // }

  // navigateToMenu(): void {
  //   // Navigate to the menu display component with the barcode as a parameter
  //   this.router.navigate(['/menu', 'your-barcode-here']);
  // }
}
  
