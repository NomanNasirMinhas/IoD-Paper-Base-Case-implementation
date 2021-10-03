const readline = require("readline");
const sha256 = require("js-sha256").sha256;
const { getDroneCode, getDroneResponse } = require("./drone.js");
var {performance} = require('perf_hooks');
async function communicateToDrone(reqID)
{
  const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const smartAgentID = 9999999;
const drones = {
  101: "Drone 1",
  102: "Drone 2",
  103: "Drone 3",
  104: "Drone 4",
  105: "Drone 5",
};
let code = getCode();
let selectedID;
// console.log(`Generated Code is ${code}`);
console.log("These are available drones");
console.log("****************************");
console.log("ID  - Name");
console.log("****************************");

var keys = Object.keys(drones);
console.log(keys);
keys.map((v, i) => {
  console.log(`${v} - ${drones[v]}`);
});
console.log("****************************");

rl.question("Please enter a drone ID to verify\n", async (droneID) => {
  var t0 = performance.now();
  selectedID = droneID;
  if (keys.includes(droneID.trim())) {
    var indx = keys.indexOf(droneID.trim());
    console.log(`You selected a valid Drone - ${drones[droneID.trim()]}`);
    let agentCode = code + Number(droneID.trim());
    let expectedCode = getVerificationCode(agentCode);
    console.log(`Code sent to the drone - ${code}`);
    console.log(`Drone should return - ${expectedCode}`);
    console.log("****************************");

    let droneCode = getDroneCode(droneID.trim(), code);
    console.log(`Drone returned - ${droneCode}`);
    console.log("****************************");

    console.log(
      `${expectedCode === droneCode ? "Drone Verified" : "Drone Not Verified"}`
    );
    console.log("****************************");
    let res = getDroneResponse(reqID);
    console.log(`Drone returned ${res}`);
    var t1 = performance.now();
    console.log(`Execution Time = ${t1-t0}`)
  } else {
    console.log(`You selected an invalid Drone - ${droneID}`);
  }

  rl.close();
});}

function getCode() {
  return Math.floor(Math.random() * (90000 - 50000)) + 50000;
}

function getVerificationCode(code) {
  return sha256(code.toString());
}

module.exports = {communicateToDrone}