# BingX Withdrawal

"BingX Withdrawal" is a JavaScript script designed to facilitate withdrawals from the BingX cryptocurrency exchange (CEX).

## Installation

Follow these steps to set up the script:

1. **Create a Project Folder and Install Dependencies**

   Open your terminal and run the following commands:

   ```bash
   mkdir your_folder_name
   cd your_folder_name
   npm install
   ```

2. \*\*Set Up the .env File

   Inside your project directory, create a .env file and add your API key and secret as follows:

   ```bash
   # Type exactly as in the example, without extra characters after "="!

   API_KEY=alskjdlasjdlkajsdlkjasdlajsdklalksjdlaksjd
   API_SECRE=Talskjdlasjdlkajsdlkjasdlajsdklalksjdlaksjd
   ```

3. \*\* Add Wallet Addresses
   Create a wallets.txt file in the project directory and list your wallet addresses.

## Usage

Configure the script by editing parameters in the config.js file:

```javascript
const config = {
  walletsPath: "./wallets.txt",
  token: "MEME",
  chain: "ERC20",
  minAmount: 345,
  maxAmount: 355,
  minPause: 30000,
  maxPause: 90000,
};
```

Run the script using the command:

```bash
node main
```

If the transaction is processing, you will see this output in your terminal:

```javascript
Response Status: 200
Response Data: {
  code: 0,
  timestamp: 1705412013959,
  data: { id: '1264823906541154306' }
}
```
