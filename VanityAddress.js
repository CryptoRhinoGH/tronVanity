const TronWeb = require('tronweb');
const fs = require('fs');

const checkString = 'Abhi';
const tronWeb = new TronWeb({
    fullHost: 'http://52.53.189.99:8090' // or another Tron network endpoint
});

async function findMatchingAddress() {
    let matched = false;
    while (!matched) {
        let { address, privateKey } = await tronWeb.createAccount();
		address = address.base58
        // Assuming address is returned with a leading character that should be ignored
        let tempAdd = address.substr(1);
        if (tempAdd.startsWith(checkString)) {
            matched = true;
            console.log("\n\n ----------Found----------- \n\n");
            console.log(`${address} - ${privateKey}`);
            fs.writeFileSync(`${address}.txt`, `${address} - ${privateKey}`);
        }
    }
}

findMatchingAddress();
