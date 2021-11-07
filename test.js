const axios = require('axios');


const data = {
    MbtiTYPE: "ENTP"
}


async function main() {
    var result = await axios.default.post('http://localhost/savembti', data);
    console.log(result.data);
}

main();