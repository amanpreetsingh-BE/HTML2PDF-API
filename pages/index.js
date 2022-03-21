import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";

export async function getServerSideProps() {
  const token = process.env.TOKEN;
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Receipt</title>
  
      <style>
        * {
          background-color: #FFF;
        }
        .invoice-box {
          max-width: 800px;
          padding: 30px;
              margin: auto;
          box-shadow: 0 0px 4px 3px rgba(15, 15, 15, 0.25);
          font-size: 16px;
          line-height: 24px;
          font-weight: 500;
          font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
          color: #151515;
              background-color: #FFF;
        }
  
        .invoice-box table {
          width: 100%;
          line-height: inherit;
          text-align: left;
        }
  
        .invoice-box table td {
          padding: 5px;
          vertical-align: top;
        }
  
        .invoice-box table tr td:nth-child(2) {
          text-align: right;
        }
  
        .invoice-box table tr.top table td {
          padding-bottom: 20px;
        }
  
        .invoice-box table tr.top table td.title {
          font-size: 45px;
          line-height: 45px;
          color: #fff;
        }
  
        .invoice-box table tr.information table td {
          padding-bottom: 40px;
        }
  
        .invoice-box table tr.heading td {
          background: #20b075;
          color : #f4f4f4;
          font-weight: bold;
          border-bottom: 1px solid #20b075;
          font-weight: bold;
          text-align: left;
        }
  
        .invoice-box table tr.details td {
          padding-bottom: 20px;
        }
  
        .invoice-box table tr.item td {
          border-bottom: 1px solid #eee;
        }
  
        .invoice-box table tr.item.last td {
          border-bottom: none;
          text-align: left;
        }
  
        .invoice-box table tr.total td:nth-child(2) {
          border-top: 2px solid #eee;
          font-weight: bold;
        }
  
        @media only screen and (max-width: 600px) {
          .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
          }
  
          .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
          }
        }
  
        /** RTL **/
        .invoice-box.rtl {
          direction: rtl;
          font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        }
  
        .invoice-box.rtl table {
          text-align: right;
        }
  
        .invoice-box.rtl table tr td:nth-child(2) {
          text-align: left;
        }
      </style>
    </head>
  
    <body>
      <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="6">
              <table>
                <tr>
                  <td class="title">
                    <img src="https://firebasestorage.googleapis.com/v0/b/findmystuff-74e93.appspot.com/o/logos%2Flogo_blk.svg?alt=media&token=7f454c69-d374-41f1-b934-02c70b9186c4" style="width: 200px; max-width: 300px" />
                  </td>
                  <td>
                    Invoice #: {{ orderNumber }}<br />
                    Date: {{ date }}<br />
                    Status: PAID
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  
          <tr class="information">
            <td colspan="6">
              <table>
                <tr>
                  <td>
                    FindMyStuff<br />
                    Chemin du Cyclotron, 6<br />
                    Louvain-la-Neuve, 1348<br />
                    BELGIUM
                  </td>
                  <td>
                    Billing To : <br />
                    {{lastname}} {{firstname}}<br />
                    {{email}}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  
          <tr class="heading">
            <td>Payment Method</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
  
          <tr class="details">
            <td>{{paymentMethod}}</td>
            
          </tr>
  
          <tr class="heading">
            <td>Item</td>
  
            <td>Color</td>
  
            <td>Quantity</td>
  
            <td>Unit Price</td>
  
            <td>Tax (21%)</td>
  
            <td>Price TVAC</td>
          </tr>
  
          <tr class="item last">
            <td>{{model}}</td>
  
            <td>{{model_description}}</td>
  
            <td>1</td>
  
            <td>€{{htvaAmont}}</td>
  
            <td>€{{tva}}</td>
  
            <td>€{{totalAmount}}</td>
          </tr>
  
  
        </table>
      </div>
    </body>
  </html>
  `;
  const context = {
    fullname: "dajfipekjfpa",
    firstname: "fkoefzk",
    lastname: "fkoefzk",
    email: "fkoefzk@gz.com",
    model: "fz",
    model_description: "blue",
    paymentMethod: "banocnt",
    street: "blrrrrre",
    zip: "teghzrhrh",
    country: "blzgfzgzgue",
    orderNumber: "efef",
    date: "FFFF",
    totalAmount: "1211",
    htvaAmont: "12",
    tva: "45",
  };
  const data = {
    token: token,
    html: html,
    context: context,
  };
  const response = await fetch(
    "https://regal-melomakarona-dc80f3.netlify.app/api/getPDF",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const base64PDF = await response.json();

  return {
    props: {
      base64PDF: base64PDF,
    },
  };
}

export default function Home({ base64PDF }) {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">{base64PDF}</p>
      </main>

      <Footer />
    </div>
  );
}
