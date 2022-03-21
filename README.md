# HTML2PDF-API

## How to use (Node.js)

POST https://regal-melomakarona-dc80f3.com/api/getPDF

```javascript
const data = {
  token: <string>,
  html: <string>,
  context: <JSON>,
};
const response = await fetch(
  "https://regal-melomakarona-dc80f3.com/api/getPDF",
  {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
);
```
## Parameters
  
- html : a string containing the HTML with handlebars
- context : a JSON containing the values of handlebars
- token : API key provided by me (contact me if needed)
