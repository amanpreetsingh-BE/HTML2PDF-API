import Head from "next/head";
import { CodeBlock } from "@atlaskit/code";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const codeExample = ` 
    const data = {
      token: <string>,
      html: <string>,
      context: <JSON>,
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
    const responseJSON = await response.json();
    console.log(responseJSON.base64PDF)
  `;

  return (
    <div className="container">
      <Head>
        <title>HTML2PDF</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p className="description">
          <ReactMarkdown># HTML2PDF-API </ReactMarkdown>
          <ReactMarkdown>## How to use (Node.js) POST</ReactMarkdown>
          <ReactMarkdown>
            POST https://regal-melomakarona-dc80f3.netlify.app/api/getPDF
          </ReactMarkdown>
          <CodeBlock
            language="jsx"
            showLineNumbers={false}
            text={codeExample}
          />

          <ReactMarkdown>## Parameters</ReactMarkdown>
          <ReactMarkdown>
            - html : a string containing the HTML with handlebars
          </ReactMarkdown>
          <ReactMarkdown>
            - context : a JSON containing the values of handlebars
          </ReactMarkdown>
          <ReactMarkdown>
            - token : API key provided by me (contact me if needed)
          </ReactMarkdown>
          <ReactMarkdown>## Raturn value</ReactMarkdown>
          <ReactMarkdown>Return a BASE64 pdf </ReactMarkdown>
        </p>
      </main>
    </div>
  );
}
