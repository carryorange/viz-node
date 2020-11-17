const ActionTracker = require('./service-monitors');
const http = require('http');
const port = 8086;

function debug_log(log_str, func_name='')
{
    console.log('%s %s: %s', Date(), func_name, log_str);
}


// 1. Start an http server, and shut it down after 5 seconds
async function testAutoTermination() {
    const server = http.createServer();

    let actionTracker = new ActionTracker(5, () => { server.close(); });

    server.on('close', () => debug_log('server closed', 'testAutoTermination'));

    server.listen(port, () => {debug_log(`server starts listening on port ${port}`, 'testAutoTermination')});

    return actionTracker.wait();
    // await actionTracker.wait();
}

// 2. Starting an http server, wait for some time to send some requests, then observe server is shut down after 5 seconds after that action.
async function testAction() {
    const server = http.createServer();

    let actionTracker = new ActionTracker(5, () => { server.close(); });

    let request_handler = (req, res) => {
        res.end('hello world!');
    };
    let tracked1 = actionTracker.registerAction(request_handler);
    server.on('request', tracked1);
    server.on('close', () => debug_log('server closed', 'testAction'));

    server.listen(port, () => {debug_log(`server starts listening on port ${port}`, 'testAction')});

    setTimeout(() => {
        let options = {
            hostname: 'localhost',
            port,
            method: 'GET'
        }

        let req = http.request(options, res => {
            debug_log(`statusCode: ${res.statusCode}`);

            res.on('data', d => {
                debug_log(d);
            })
        });

        req.end();
    }, 3000);

    await actionTracker.wait();
}


// Test runner
async function runTests() {
    const tests_to_run = [testAutoTermination, testAction];
    for (let test of tests_to_run) {
        await test();
    }

    console.log("all tests have finished running");
}

runTests();