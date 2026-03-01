import React from 'react'
import Header from '../components/Header'
import DevConnectFooter from '../../components/DevConnectFooter'

function PaymentError() {
    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">

                    {/* GIF Placeholder */}
                    <img
                        src="/images/Error.gif"
                        alt="Payment Error GIF"
                        className="mx-auto mb-6 w-40 h-40 object-contain"
                    />

                    <h1 className="text-3xl font-bold text-red-600 mb-3">
                        Payment Failed
                    </h1>

                    <p className="text-gray-600 mb-6">
                        Something went wrong while processing your payment.
                        Please try again or contact support.
                    </p>

                    <button className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition">
                        Try Again
                    </button>
                </div>
            </div>
            <DevConnectFooter />
        </>
    )
}

export default PaymentError
