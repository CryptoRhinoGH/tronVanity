const { parentPort } = require('worker_threads');
const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
    fullHost: 'http://52.53.189.99:8090' // Adjust as necessary
});

const caseSensitive = true;
const checkString = 'Abh';

async function generateAddress() {

    while (true) { // Run until terminated
        let { address, privateKey } = await tronWeb.createAccount();
        address = address.base58;
        let tempAdd = address.substr(1);
		tempAdd = caseSensitive ? tempAdd : tempAdd.toLowerCase();
		let checkStringToUse = caseSensitive ? checkString : checkString.toLowerCase();

        if (tempAdd.startsWith(checkStringToUse)) {
            parentPort.postMessage({ address, privateKey, found: true });
            break; // Stop the loop if a match is found
        } else {
            parentPort.postMessage({ found: false }); // Optional: Notify main thread of unsuccessful attempt
        }
    }
}

generateAddress();

