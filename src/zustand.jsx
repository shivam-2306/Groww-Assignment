import { create } from 'zustand'

const progressStep = (set) => ({
    Step: 'Checkout',
    changeStep: (step) => set({ Step: step })

})

export const currStep = create(progressStep);

const company = (set) => ({
    name: 'groww', logo: '', theme: [{ background:'black', foreground:'', primary:'', fprimary:'' }]

})

export const cInfo = create(company);

// const payment 

const orderDetails = (set) => ({
})

export const orderList = create(orderDetails);

const paymentDetails = (set) => ({
    totalCost: 0, paymentMethod: 'null'
})

export const paymentInfo = create(paymentDetails);

