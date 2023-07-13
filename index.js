const express = require("express")



const Iyzipay = require('iyzipay');

const iyzipay = new Iyzipay({
    apiKey: 'sandbox-ZGlntFnyzkUEkmdmbMa6OV8LuENPos9I',
    secretKey: 'sandbox-8M22OKASdgXmwO6jqD3WvGy4m3glb0x4',
    uri: 'https://sandbox-api.iyzipay.com'
});


const app = express()

var request = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: '123456789',
    price: '1200',
    paidPrice: '1200.2',
    currency: Iyzipay.CURRENCY.TRY,
    enabledInstallments: [1],
    basketId: 'B67832',
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
        cardHolderName: 'John Doe',
        cardNumber: '4543590000000006',
        expireMonth: '12',
        expireYear: '2024',
        cvc: '123',
        registerCard: '0'
    },
    buyer: {
        id: 'BY789',
        name: 'John',
        surname: 'Doe',
        gsmNumber: '+905350000000',
        email: 'email@email.com',
        identityNumber: '74300864791',
        lastLoginDate: '2015-10-05 12:43:35',
        registrationDate: '2013-04-21 15:12:09',
        registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        ip: '85.34.78.112',
        city: 'Istanbul',
        country: 'Turkey',
        zipCode: '34732'
    },
    callbackUrl: "https://test-iyizico.onrender.com/result",
    shippingAddress: {
        contactName: 'Jane Doe',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        zipCode: '34742'
    },
    billingAddress: {
        contactName: 'Jane Doe',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        zipCode: '34742'
    },
    basketItems: [
        {
            id: 'BI101',
            name: 'Binocular',
            category1: 'Collectibles',
            category2: 'Accessories',
            itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price: '0.3'
        },
        {
            id: 'BI102',
            name: 'Game code',
            category1: 'Game',
            category2: 'Online Game Items',
            itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
            price: '0.5'
        },
        {
            id: 'BI103',
            name: 'Usb',
            category1: 'Electronics',
            category2: 'Usb / Cable',
            itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price: '0.2'
        }
    ]
};




app.get("/pay" , async (req,res) => {
    iyzipay.payment.create(request, function (err, result) {
    console.log(err, result);
    res.send("Success")
});


})
app.get("/result" , async (req,res) => {
   console.log(err, result);
    res.send("Success")


})


app.listen(5000, (req,res) => {
    console.log("server started")
})