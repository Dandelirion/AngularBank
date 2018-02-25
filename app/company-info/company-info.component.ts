import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  productsList: Product[] = [
                  new Product("net.jpg",
                              "Сеть",
                              "Настройка сетевого оборудования (удары молотом по коммутатору)",
                              "1000₽ (за один удар)"),
                  new Product("tamada.jpg",
                              "Тамада",
                              "Организация свадеб и проводов в армию",
                              "20000₽"),
                  new Product("js.jpg",
                              "JS",
                              "Написание сайтов с адаптивным дизайном и скриптов к ним",
                              "цена договорная"),
                  new Product("meetup.jpg",
                              "Встреча",
                              "Выезжаю на деловые встречи и конференции за Вас",
                              "500₽ (регистрация), \
                              3000₽ (досидеть до конца), \
                              500₽ (1 вопрос спикеру), \
                              поесть на фуршете: бесценно")]
}
