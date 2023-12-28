import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-html2canvas',
  standalone: true,
  templateUrl: './html2canvas.component.html',
  styleUrl: './html2canvas.component.scss',
  imports: [MatButtonModule],
})
export class Html2CanvasComponent {
  ngOnInit() {}
  setInitialState() {}
  screenshotEmbed() {
    const capture = document.querySelector('#capture') as HTMLElement;
    const showArea = document.querySelector('#showArea') as HTMLElement;
    const canvas = html2canvas(capture).then((canvas) => {
      showArea.appendChild(canvas);
    });
    console.log(canvas);
  }

  screenshotDATAURL() {
    // Select the element that you want to capture
    const captureElement = document.querySelector('#capture') as HTMLElement;

    // Call the html2canvas function and pass the element as an argument
    html2canvas(captureElement).then((canvas) => {
      // Get the image data as a base64-encoded string
      const imageData = canvas.toDataURL('image/png');

      // Do something with the image data, such as saving it as a file or sending it to a server
      // For example, you can create an anchor element and trigger a download action
      const link = document.createElement('a');
      link.setAttribute('download', 'screenshot.png');
      link.setAttribute('href', imageData);
      link.click();

      // Open the image in a new window
      window.open(imageData, '_blank');
    });
  }

  screenshotBlob() {
    // Select the element that you want to capture
    const captureElement = document.querySelector('#capture') as HTMLElement;

    html2canvas(captureElement).then((canvas) => {
      // Export canvas as a blob
      canvas.toBlob((blob) => {
        // Generate file download
        this.saveAs(blob as Blob, 'yourwebsite_screenshot.png');
      });
    });
  }

  saveAs(blob: Blob, fileName: string) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }
}
