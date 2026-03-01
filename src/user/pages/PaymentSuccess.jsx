import React from 'react'
import Header from '../components/Header'
import DevConnectFooter from '../../components/DevConnectFooter'

function PaymentSuccess() {
    return (
        <>
            <Header />

            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">

                    {/* GIF Placeholder */}
                    <img
                        src="/images/success.gif"
                        alt=""
                        className="mx-auto mb-6 w-40 h-40 object-contain"
                    />

                    <h1 className="text-3xl font-bold text-green-600 mb-3">
                        Payment Successful!
                    </h1>

                    <p className="text-gray-600 mb-6">
                        Your payment has been processed successfully.
                        Thank you for your purchase!
                    </p>

                    <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition">
                        Keep Shopping
                    </button>
                </div>
            </div>
            <DevConnectFooter />
        </>
    )
}

export default PaymentSuccess
