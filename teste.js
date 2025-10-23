const arrayNum = [1, 2, 3, 4, 5, 6]
const arrayPar = arrayNum.filter((n) => n % 2 === 0)

const names = ["Vitoria", "Kolel", "Morio", "Juana"]
let nameWithA = []
names.forEach((n) => n.includes("a") ? nameWithA.push(n) : "")
console.log(nameWithA)