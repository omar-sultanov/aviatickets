import { observable, action, reaction, makeAutoObservable } from 'mobx';
import { ITicket } from '@models/Ticket';
import data from '../data/tickets.json';

class TicketStore {
  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.tickets,
      (_) => console.log(this.tickets.length),
    );
  }

  @observable tickets: ITicket[] = data.tickets;
  @observable filteredTickets: ITicket[] = data.tickets;
  @observable currency?: string = 'ruble';

  // selected amounts of stops
  @observable filters: number[] = [];

  @action
  getCurrency = (currName: string) => {
    this.currency = currName;
  };

  @action
  onCheck = (
    name: string,
    value: number,
    isChecked: boolean,
    isExclusive: boolean,
  ) => {
    if (isChecked) {
      // -1 stands for "all"
      // if "all" is selected then deselect other checkboxes
      if (value === -1) {
        this.filters = [];
      } else if (isExclusive) {
        this.filters = [value];
      } else if (!this.filters.includes(value)) {
        this.filters.push(value);
      }
    } else {
      const index = this.filters.indexOf(value);
      this.filters.splice(index, 1);
    }

    // if no filters selected then show all, otherwise filter on amount of stops
    this.filteredTickets =
      this.filters.length === 0
        ? this.tickets
        : this.tickets.filter((item: ITicket) =>
            this.filters
              .map((stopsAmount) => item.stops === stopsAmount)
              .reduce((prev, curr) => prev || curr, false),
          );
  };
}
export default TicketStore;
