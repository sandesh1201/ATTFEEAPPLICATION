var express = require('express');
const cors = require('cors')
var app = express();

app.get('/order/:orderId', cors(), function (req, res) {
    const orderId = req.params.orderId;
    const order = Orders.find(o => o.orderId === Number(orderId))
    res.end(JSON.stringify(order));
})

app.get('/customer/:customerId/orders/limit/:limit', cors(), function (req, res) {
    const limit = Number(req.params.limit);
    const orders = limit < Orders.length ? Orders.filter((val,i)=>i< Number(limit)) : Orders;
    res.end(JSON.stringify(orders));
})
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

const Orders = [
    {
      "id": 10,
      "orderId": 198772,
      "items": [
        {
          "id": 100000,
          "name": "Apple Iphone XR",
          "plan": "AT&T Unlimited Extra",
          "skuId": "sku1234",
          "skuAttributes": {
            "model": "Iphone XR",
            "manufacturer": "Apple",
            "color": "Yellow",
            "size": "64 GB"
          },
          "quantity": 1,
          "telephoneNumber": "409.406.3322",
          "complete": true,
          "estimatedShipDateRange": {
            "fromDate": "2020-09-06T13:39:52.774-05:00",
            "toDate": "2020-09-06T13:39:52.774-05:00"
          },
          "newEstimatedShipDateRange": {
            "fromDate": "2020-10-02T13:39:52.774-05:00",
            "toDate": "2020-10-02T13:39:52.774-05:00"
          },
          "userAcceptedDelay": true
        },
      ],
      "status": "ordered",
      "complete": true,
      "shipingAddress": {
        "street": "437 Lytton",
        "city": "Palo Alto",
        "state": "CA",
        "zip": "94301"
      },
      "shipments": [
        {
          "id": 110,
          "items": [
            100000
          ],
          "carrier": "USPS",
          "trackingNumber": "9400100000000000000000",
          "trackingUrl": "https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=2&text28777=&tLabels=9400100000000000000000%2C",
          "estimatedDeliveryDate": "2020-10-06T13:39:52.774-05:00",
          "shipDate": "2020-10-02T13:39:52.774-05:00"
        }
      ]
    },
    {
      "id": 11,
      "orderId": 198902,
      "items": [
        {
          "id": 1000,
          "name": "Apple XR",
          "plan": "AT&T Unlimited Extra",
          "skuId": "sku1234",
          "skuAttributes": {
            "model": "Iphone XR",
            "manufacturer": "Apple",
            "color": "Yellow",
            "size": "64 GB"
          },
          "quantity": 1,
          "telephoneNumber": "409.406.3322",
          "complete": true,
          "estimatedShipDateRange": {
            "fromDate": "2020-09-06T13:39:52.774-05:00",
            "toDate": "2020-09-06T13:39:52.774-05:00"
          },
          "newEstimatedShipDateRange": {
            "fromDate": "2020-10-02T13:39:52.774-05:00",
            "toDate": "2020-10-02T13:39:52.774-05:00"
          },
          "userAcceptedDelay": true
        }
      ],
      "status": "shipped",
      "complete": true,
      "shipingAddress": {
        "street": "437 Lytton",
        "city": "Palo Alto",
        "state": "CA",
        "zip": "94301"
      },
      "shipments": [
        {
          "id": 110,
          "items": [
            1000
          ],
          "carrier": "USPS",
          "trackingNumber": "9401110",
          "trackingUrl": "https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=2&text28777=&tLabels=9400100000000000000000%2C",
          "estimatedDeliveryDate": "2020-11-06T13:39:52.774-05:00",
          "shipDate": "2020-10-03T13:39:52.774-05:00"
        }
      ]
    }
  ];
