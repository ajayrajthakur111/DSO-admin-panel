/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/razorpay.ts
interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    order_id: string;
    name: string;
    handler: (response: any) => void;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
  }
  
  export const initiatePayment = (options: RazorpayOptions) => {
    const razorpay = new (window as any).Razorpay({
      ...options,
      theme: {
        color: '#5567dd',
      },
    });
  
    razorpay.open();
  };
  