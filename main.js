require("dotenv").config();
const fs = require("fs");
const CryptoJS = require("crypto-js");
const axios = require("axios");
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const {
  walletsPath,
  token,
  chain,
  minAmount,
  maxAmount,
  minPause,
  maxPause,
} = require("./config");

const fileData = fs.readFileSync(walletsPath, "utf8");
const wallets = fileData.split("\n");

const HOST = "open-api.bingx.com";

const API = {
  uri: "/openApi/wallets/v1/capital/withdraw/apply",
  method: "POST",
  payload: {
    address: "",
    amount: "",
    coin: token,
    network: chain,
    walletType: "1",
  },
  protocol: "https",
};

async function main() {
  for (const address of wallets) {
    if (address == "") throw new Error("Add wallets to txt file");

    const amount = Math.floor(
      Math.random() * (maxAmount - minAmount + 1) + minAmount
    );
    console.log(amount);
    API.payload.amount = amount.toString();
    API.payload.address = address;

    await withdrawTokens(
      API.protocol,
      HOST,
      API.uri,
      API.method,
      API_KEY,
      API_SECRET
    );

    const pauseDuration = Math.random() * (maxPause - minPause) + minPause;
    await new Promise((resolve) => setTimeout(resolve, pauseDuration));
  }
}

function getParameters(API, timestamp, urlEncode) {
  let parameters = "";
  API.payload.timestamp = timestamp.toString();
  const sortedKeys = Object.keys(API.payload).sort();
  for (const key of sortedKeys) {
    if (urlEncode) {
      parameters += key + "=" + encodeURIComponent(API.payload[key]) + "&";
    } else {
      parameters += key + "=" + API.payload[key] + "&";
    }
  }
  return parameters.substring(0, parameters.length - 1);
}

async function withdrawTokens(
  protocol,
  host,
  path,
  method,
  API_KEY,
  API_SECRET
) {
  const timestamp = new Date().getTime();
  const sign = CryptoJS.enc.Hex.stringify(
    CryptoJS.HmacSHA256(getParameters(API, timestamp, false), API_SECRET)
  );
  const url = `${protocol}://${host}${path}?${getParameters(
    API,
    timestamp,
    true
  )}&signature=${sign}`;

  const config = {
    method: method,
    url: url,
    headers: { "X-BX-APIKEY": API_KEY },
  };

  try {
    const resp = await axios(config);
    console.log("Response Status:", resp.status);
    console.log("Response Data:", resp.data);
  } catch (error) {
    console.error("Error:", error);
  }
}

main().catch(console.error);
