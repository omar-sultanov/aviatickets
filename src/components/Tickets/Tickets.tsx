import React, { useEffect, useState } from 'react'
import styles from './Tickets.module.scss'
import { ITicket } from '@models/Ticket';
import { inject, observer } from 'mobx-react';
import { StoresNames } from '../../dictionary';
import TicketStore from '@stores/TicketStore';
import moment from 'moment'
import 'moment/locale/ru';

const Tickets = inject(
  StoresNames.TicketStore,
)(
  observer((props: any) => {

    const { filteredTickets, currency } = props.TicketStore as TicketStore;

    const [currencyUSD, setCurrencyUSD] = useState<number>(0);
    const [currencyEUR, setCurrencyEUR] = useState<number>(0)

    const api = "https://api.exchangerate-api.com/v4/latest/RUB";
    useEffect(() => {
      fetch(api)
        .then(res => res.json())
        .then(data => {
          setCurrencyEUR(data.rates.EUR);
          setCurrencyUSD(data.rates.USD);
        })
    }, [])

    const convertDate = (date: string) => {
      moment.locale("ru");
      return moment(date, "DD.MM.YY").format('DD MMM YYYY, ddd')
    }
    const onGetPrice = (price: number) => {
      switch (currency) {
        case "ruble":
          return price
        case "dollar":
          return Math.round(price * currencyUSD)
        case "euro":
          return Math.round(price * currencyEUR)
      }
    }

    const getTransitLabel = (ticket: ITicket) => {
      return ticket.stops === 0 ? `0 ПЕРЕСАДОК` :
        ticket.stops === 1 ? `1 ПЕРЕСАДКА` :
          `${ticket.stops} ПЕРЕСАДКИ`
    }

    return (
      <div className={styles.list}>
        {filteredTickets.map((ticket: ITicket, index: number) => (

          <div className={styles.Tickets} key={index}>
            <div className={styles.get_ticket}>
              <img src={require("../../assets/images/turkish-airlines-logo.jpg")} alt="turkish airlines" />
              <button >Купить <br /> за {onGetPrice(ticket.price)} <i className={`fa-solid fa-${currency}-sign`}></i></button>
            </div>

            <div className={styles.info_ticket}>
              <div className={styles.time}>
                <div className={styles.hour_time}>
                  <h3>{ticket.departure_time}</h3>
                  <div className={styles.transplant}>
                    <span>{getTransitLabel(ticket)}</span>
                    <div className={styles.icon}>
                      <i id={styles.iconPlane} className="fa-solid fa-plane"></i>
                    </div>
                  </div>
                  <h3>{ticket.arrival_time}</h3>
                </div>

                <div className={styles.typography}>
                  <div>
                    <h6>{ticket.origin}, {ticket.origin_name} </h6>
                    <p>{convertDate(ticket.departure_date)}</p>
                  </div>
                  <div>
                    <h6>{ticket.destination_name}, {ticket.destination}</h6>
                    <p>{convertDate(ticket.arrival_date)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>))}
      </div>
    );
  })
);


export default Tickets