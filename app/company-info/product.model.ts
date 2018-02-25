export class Product {
    imgPath: string = "../../../assets/";
    altText: string;
    description: string;
    prodPrice: string;
  
    constructor(imgName: string, altText: string, descr: string, price: string) {
      this.imgPath += imgName;
      this.altText = altText;
      this.description = descr;
      this.prodPrice = price;
    }
  }