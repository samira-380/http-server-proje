//Aynı şeyi bir de async/await ile yaz.

function hello() {
    return new Promise((resolve)=> {
        setTimeout(()=> {
            console.log("Hello");
            resolve();
        },3000);
    });
}
function goodbye() {
    console.log("goodbye");
}

async function main() {
    await hello(); 
    goodbye();      
}

main();