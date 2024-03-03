const { Worker } = require('worker_threads');
const fs = require('fs');
const os = require('os');

const numCPUs = os.cpus().length;
let workers = [];

function createWorker() {
    const worker = new Worker('./worker.js');
    workers.push(worker);

    worker.on('message', ({ address, privateKey, found }) => {
        if (found) {
            console.log("\n\n ----------Found----------- \n\n");
            console.log(`${address} - ${privateKey}`);
            fs.writeFileSync(`${address}.txt`, `${address} - ${privateKey}`);
            terminateAllWorkers(); // Terminate all workers once a match is found
        }
    });

    worker.on('error', (err) => {
        console.error(err);
        workers = workers.filter(w => w !== worker); // Remove the worker from the list on error
    });

    worker.on('exit', (code) => {
        workers = workers.filter(w => w !== worker); // Remove the worker from the list on exit
        if (workers.length === 0) {
            // Optionally restart workers if needed, depending on your application's needs
        }
    });
}

function terminateAllWorkers() {
    workers.forEach(worker => worker.terminate());
    workers = []; // Clear the array of workers
}

function startWorkers() {
    const numWorkers = Math.max(numCPUs - 1, 1); // Adjust based on preference and system capabilities
    console.log(`Starting ${numWorkers} worker(s)...`);
    for (let i = 0; i < numWorkers; i++) {
        createWorker();
    }
}

startWorkers();

