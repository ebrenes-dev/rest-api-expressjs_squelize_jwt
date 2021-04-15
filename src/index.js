import app from './app.js';
import util from 'util';

async function runServer(port)
{
//    await app.listen(port);
//    console.log('Server running on port: ' + port);
    const run = util.promisify(app.listen);
    await run(port);
    console.log('Server running on port: ' + port);
}

function main()
{
    const SERVER_PORT = 8000;

    const runServer = port => new Promise(callBack => app.listen(port, callBack));
    runServer(SERVER_PORT)
    .then(
        console.log('Server running on port: ' + SERVER_PORT)
    )

    // app.listen(SERVER_PORT,()=>{
    //     console.log('Server running on port: ' + SERVER_PORT)
    // });

    // app.listen(SERVER_PORT,function(){
    //     console.log('Server running on port: ' + SERVER_PORT)
    // });

    // new Promise((resolve) => {
    //     app.listen(SERVER_PORT);
    //     resolve(); //Duda con esto....
    // })
    // .then(
    //     console.log('Server running on port: ' + SERVER_PORT)
    // );

    // runServer(SERVER_PORT);

}

main();