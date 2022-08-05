import React, { useState } from 'react'
import { inject, observer } from 'mobx-react';
import { StoresNames } from '../../dictionary';
import styles from './TicketsForm.module.scss'
import TicketStore from '@stores/TicketStore';

const TicketsForm = inject(
  StoresNames.TicketStore,
)(
  observer((props: any) => {

    const { onCheck, getCurrency, filters } = props.TicketStore as TicketStore;
    const [status, setStatus] = useState("RUB");

    const isExclusive=false
    const onClickHandler = (e: any) => {
      const text = e.target.innerHTML
      setStatus(text)
      switch (text) {
        case "RUB":
          return getCurrency("ruble") 
        case "USD":
          return getCurrency("dollar")
        case "EUR":
          return getCurrency("euro")
      }
    }

    return (
      <div className={styles.Form}>
        <h4>ВАЛЮТА</h4>
        <div className={styles.btn_group}>
          <button onClick={(e) => onClickHandler(e)} className={status === "RUB" ? styles.active : ""}>
            RUB
          </button>
          <button onClick={(e) => onClickHandler(e)} className={status === "USD" ? styles.active : ""}>
            USD
          </button>
          <button onClick={(e) => onClickHandler(e)} className={status === "EUR" ? styles.active : ""}>
            EUR
          </button>
        </div>
        <h4>КОЛИЧЕСТВО ПЕРЕСАДОК</h4>
        <div className={styles.checkbox_group}>
          <div className={styles.box_input}>
            <input className={styles.checkbox} type="checkbox" id="box_4" name="all" checked={filters.length === 0} onChange={(e) => onCheck(e.target.name, -1, e.target.checked, isExclusive)} />
            <label htmlFor="box_4">Все</label>
          </div>
          <div className={styles.box_input}>
            <input type="checkbox" id="box_0" name="0_transit" checked={filters.includes(0)} onChange={(e) => onCheck(e.target.name, 0, e.target.checked, isExclusive)} />
            <label htmlFor="box_0"><span>Без пересадка</span><button onClick={()=>onCheck("0_transit", 0, true, !isExclusive)}>ТОЛЬКО</button></label>
          </div>
          <div className={styles.box_input}>
            <input type="checkbox" id="box_1" name="1_transit" checked={filters.includes(1)} onChange={(e) => onCheck(e.target.name, 1, e.target.checked, isExclusive)} />
            <label htmlFor="box_1"><span>1 пересадка</span><button onClick={()=>onCheck("1_transit", 1, true, !isExclusive)}>ТОЛЬКО</button></label>
          </div>
          <div className={styles.box_input}>
            <input type="checkbox" id="box_2" name="2_transit" checked={filters.includes(2)} onChange={(e) => onCheck(e.target.name, 2, e.target.checked, isExclusive)} />
            <label htmlFor="box_2"><span>2 пересадка</span><button onClick={()=>onCheck("2_transit", 2, true, !isExclusive)}>ТОЛЬКО</button></label>
          </div>
          <div className={styles.box_input}>
            <input type="checkbox" id="box_3" name="3_transit" checked={filters.includes(3)} onChange={(e) => onCheck(e.target.name, 3, e.target.checked, isExclusive)} />
            <label htmlFor="box_3"><span>3 пересадка</span><button onClick={()=>onCheck("2_transit", 3, true, !isExclusive)}>ТОЛЬКО</button></label>
          </div>
        </div>
      </div>
    );
  })
);
export default TicketsForm