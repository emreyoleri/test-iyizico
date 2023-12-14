const express = require("express")
const cors = require('cors')
const Iyzipay = require('iyzipay');

var bodyParser = require('body-parser')
 
 
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser

const iyzipay = new Iyzipay({
    apiKey: 'sandbox-ZGlntFnyzkUEkmdmbMa6OV8LuENPos9I',
    secretKey: 'sandbox-8M22OKASdgXmwO6jqD3WvGy4m3glb0x4',
    uri: 'https://sandbox-api.iyzipay.com'
});


const app = express()

var corsOptions = {
  //origin: process.env.ORIGIN
  origin: "*",
};

app.use(cors(corsOptions));

app.post("/pay", jsonParser , async (req, res) => {
    var request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: '123456789',
        price: '1',
        paidPrice: '1.2',
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
        callbackUrl: "https://frontend.thetakkas.com/success",
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

        // basketItems: req.body.items.map(item => ({
        //     ...item,
        //     itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        // }))
    };

    iyzipay.threedsInitialize.create(request, function (err, result) {
        // console.log(err, result);
        // console.log(atob(result.threeDSHtmlContent))
        res.send(Buffer.from(result.threeDSHtmlContent, 'base64').toString('utf8'))

    });


})
app.post("/result", async (req, res) => {
    console.log(req);
    console.log(res)
    res.send("Success")
})


app.listen(5000, (req, res) => {
    console.log("server started")
})