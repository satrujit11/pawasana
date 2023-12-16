import { writable } from 'svelte/store'

const initialData = {
    name: '',
    emailId: '',
    phoneNumber: '',
    eventId: '',
    childTicketNumber: '',
    AdultTicketNumber: '',
    pricePaid: '',
    transactionNumber: '',
    merchantTransactionId: ''
}

const bookingData = writable(initialData)
export default bookingData;
