const sha256 = require("js-sha256").sha256;
// const fetch = require('node-fetch');
function getDroneCode(droneID, code){
  let droneCode = code + Number(droneID.trim());
  return sha256(droneCode.toString())
}

function getDroneResponse(id){
  // let res = await fetch(
  //   `https://jsonplaceholder.typicode.com/todos/${id}`
  // );
  res = Math.random();

  return res;
}

module.exports = {getDroneCode, getDroneResponse}