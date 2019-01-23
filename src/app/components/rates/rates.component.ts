import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styles: []
})
export class RatesComponent implements OnInit {
  private rates: any[] = [
    {
      empresa: "Endesa",
      tarifa: "One",
      limitepotenciakw: 10,
      precioPotenciaContratadakwmes: 3.429702,
      precioEnergiakwh: 0.119893,
      permanencia: "No",
      contratacion: "Web/App, electronic bill, resident payment, management through the app or the web",
      facturacion: "Bimonthly",
      tipoCliente: "Residential, Business, Communities of owners",
      tiempoOferta: "15/01/2019-14/04/2019"
    },
    {
      empresa: "Iberdrola",
      tarifa: "Stable plan",
      limitepotenciakw: 10,
      precioPotenciaContratadakwmes: 3.503619,
      precioEnergiaPromokwh: 0.139278,
      precioEnergiaNoPromokwh: 0.00,
      permanencia: "12 months",
      contratacion: "Electronic bill",
      facturacion: "Monthly",
      tiempoConsumo: "24 hours (everyday)",
      tiempoOferta: "Today-15/02/2019"
    },
    {
      empresa: "Iberdrola",
      tarifa: "Night plan",
      limitepotenciakw: 10,
      precioPotenciaContratadakwmes: 3.503619,
      precioEnergiaPromokwh: 0.086565,
      precioEnergiaNoPromokwh: 0.165323,
      permanencia: "12 months",
      contratacion: "Electronic bill",
      facturacion: "Monthly",
      tiempoConsumo: "22:00-12:00(Winter), 23:00-13:00(Summer)",
      tiempoOferta: "Today-15/02/2019"
    },
    {
      empresa: "Iberdrola",
      tarifa: "Weekends plan",
      limitepotenciakw: 10,
      precioPotenciaContratadakwmes: 3.503619,
      precioEnergiaPromokwh: 0.090613,
      precioEnergiaNoPromokwh: 0.184531,
      permanencia: "12 months",
      contratacion: "Electronic bill, counter capable of sending and receiving data remotely",
      facturacion: "Monthly",
      tiempoConsumo: "24 hours (weekends)",
      tiempoOferta: "Today-15/02/2019"
    },
    {
      empresa: "Iberdrola",
      tarifa: "Sencond housing plan",
      limitepotenciakw: 10,
      precioPotenciaContratadakwmes: 3.503619,
      precioEnergiaPromokwh: 0.199531,
      precioEnergiaNoPromokwh: 0.105613,
      permanencia: "12 months",
      contratacion: "Electronic bill, counter capable of sending and receiving data remotely",
      facturacion: "Monthly",
      tiempoConsumo: "24 hours (weekends and 15/06-15/09)",
      tiempoOferta: "Today-15/02/2019"
    },
    {
      empresa: "Iberdrola",
      tarifa: "Summer plan",
      limitepotenciakw: 10,
      precioPotenciaContratadakwmes: 3.503619,
      precioEnergiaPromokwh: 0.090613,
      precioEnergiaNoPromokwh: 0.184531,
      permanencia: "12 months",
      contratacion: "Electronic bill, counter capable of sending and receiving data remotely",
      facturacion: "Monthly",
      tiempoConsumo: "15/06-15/09",
      tiempoOferta: "Today-15/02/2019"
    },
    {
      empresa: "Iberdrola",
      tarifa: "Winter plan",
      limitepotenciakw: 10,
      precioPotenciaContratadakwmes: 3.503619,
      precioEnergiaPromokwh: 0.090613,
      precioEnergiaNoPromokwh: 0.184531,
      permanencia: "12 months",
      contratacion: "Electronic bill, counter capable of sending and receiving data remotely",
      facturacion: "Monthly",
      tiempoConsumo: "24 hours (01/12-01/03)",
      tiempoOferta: "Today-15/02/2019"
    },
    {
      empresa: "Iberdrola",
      tarifa: "8 hour plan",
      limitepotenciakw: 10,
      precioPotenciaContratadakwmes: 3.503619,
      precioEnergiaPromokwh: 0.090613,
      precioEnergiaNoPromokwh: 0.184531,
      permanencia: "12 months",
      contratacion: "Electronic bill, counter capable of sending and receiving data remotely",
      facturacion: "Monthly",
      tiempoConsumo: "You choose 8 hours of each day",
      tiempoOferta: "Today-15/02/2019"
    },
    {
      empresa: "Endesa",
      tarifa: "One",
      limitepotenciakw: 15,
      precioPotenciaContratadakwmes: 3.973137,
      precioEnergiakwh: 0.132668,
      permanencia: "No",
      contratacion: "Web/App, electronic bill, resident payment, management through the app or the web",
      facturacion: "Bimonthly",
      tipoCliente: "Residential, Business, Communities of owners",
      tiempoOferta: "15/01/2019-14/04/2019"
    },
    {
      empresa: "Iberdrola",
      tarifa: "Stable plan",
      limitepotenciakw: 15,
      precioPotenciaContratadakwmes: 4.127668,
      precioEnergiaPromokwh: 0.148011,
      precioEnergiaNoPromokwh: 0.00,
      permanencia: "12 months",
      contratacion: "Electronic bill",
      facturacion: "Monthly",
      tiempoConsumo: "24 hours (everyday)",
      tiempoOferta: "Today-15/02/2019"
    },
    {
      empresa: "Iberdrola",
      tarifa: "Night plan",
      limitepotenciakw: 15,
      precioPotenciaContratadakwmes: 4.127668,
      precioEnergiaPromokwh: 0.105421,
      precioEnergiaNoPromokwh: 0.169602,
      permanencia: "12 months",
      contratacion: "Electronic bill",
      facturacion: "Monthly",
      tiempoConsumo: "22:00-12:00(Winter), 23:00-13:00(Summer)",
      tiempoOferta: "Today-15/02/2019"
    },
    {
      empresa: "Iberdrola",
      tarifa: "Weekends plan",
      limitepotenciakw: 15,
      precioPotenciaContratadakwmes: 4.127668,
      precioEnergiaPromokwh: 0.116142,
      precioEnergiaNoPromokwh: 0.187022,
      permanencia: "12 months",
      contratacion: "Electronic bill, counter capable of sending and receiving data remotely",
      facturacion: "Monthly",
      tiempoConsumo: "24 hours (weekends)",
      tiempoOferta: "Today-15/02/2019"
    },
    {
      empresa: "Iberdrola",
      tarifa: "Sencond housing plan",
      periodoPromocionado: "Weekends and summer (15/06-15/09)",
      limitepotenciakw: 15,
      precioPotenciaContratadakwmes: 4.127668,
      precioEnergiaPromokwh: 0.203022,
      precioEnergiaNoPromokwh: 0.132142,
      permanencia: "12 months",
      contratacion: "Electronic bill, counter capable of sending and receiving data remotely",
      facturacion: "Monthly",
      tiempoConsumo: "24 hours (weekends and 15/06-15/09)",
      tiempoOferta: "Today-15/02/2019"
    },
    {
      empresa: "Iberdrola",
      tarifa: "Summer plan",
      limitepotenciakw: 15,
      precioPotenciaContratadakwmes: 4.127668,
      precioEnergiaPromokwh: 0.116142,
      precioEnergiaNoPromokwh: 0.187022,
      permanencia: "12 months",
      contratacion: "Electronic bill, counter capable of sending and receiving data remotely",
      facturacion: "Monthly",
      tiempoConsumo: "15/06-15/09",
      tiempoOferta: "Today-15/02/2019"
    },
    {
      empresa: "Iberdrola",
      tarifa: "Winter plan",
      limitepotenciakw: 15,
      precioPotenciaContratadakwmes: 4.127668,
      precioEnergiaPromokwh: 0.116142,
      precioEnergiaNoPromokwh: 0.187022,
      permanencia: "12 months",
      contratacion: "Electronic bill, counter capable of sending and receiving data remotely",
      facturacion: "Monthly",
      tiempoConsumo: "24 hours (01/12-01/03)",
      tiempoOferta: "Today-15/02/2019"
    },
    {
      empresa: "Iberdrola",
      tarifa: "8 hour plan",
      limitepotenciakw: 15,
      precioPotenciaContratadakwmes: 4.127668,
      precioEnergiaPromokwh: 0.116142,
      precioEnergiaNoPromokwh: 0.187022,
      permanencia: "12 months",
      contratacion: "Electronic bill, counter capable of sending and receiving data remotely",
      facturacion: "Monthly",
      tiempoConsumo: "You choose 8 hours of each day",
      tiempoOferta: "Today-15/02/2019"
    }
  ];

  constructor() {}

  ngOnInit() {}

}
