const fs = require('fs');

const CUSTOMER_COUNT = process.argv[2];

// Hard coded first and last names which are randomly combined to generate customer names
const firstNames = ["James", "Mary", "Robert", "Patricia", "John", "Jennifer",
  "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard",
  "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen",
  "Christopher", "Nancy", "Daniel", "Lisa", "Matthew", "Betty", "Anthony",
  "Margaret", "Mark", "Sandra", "Gary", "Jason", "Jasmin", "Sofie", "Anna",
  "Lily", "Diana", "Markus", "Jessie", "Peter", "Malcolm", "Harry"
];
const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzales", "Wilson",
  "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez",
  "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis",
  "Robinson", "Washington", "Potter", "Sussman"
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
const getRandomFloat = (min, max) => (
  Math.random() * (max - min) + min
);
const getRandomDate = (start, end) => (
  new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
);

const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return (month + '/' + day + '/' + year);
}

const generateRandomRewardsData = (totalCustomers) => {
  const customers = [];

  for (let i=0; i < totalCustomers; i++) {
      const purchaseCount = getRandomInt(0, 50);
      let purchases = [];
      for (let j=0; j < purchaseCount; j++) {
        purchases.push({
          date: getFormattedDate(
            getRandomDate(new Date("01/01/2021"), new Date("03/31/2021"))
          ),
          price: getRandomFloat(0.01, 1000).toFixed(2)
        })
      }
      purchases = purchases.sort((a, b) => (
        (a.date > b.date) ? 1 : -1
      ));
      customers.push({
        id: customers.length,
        firstName: firstNames[getRandomInt(0, firstNames.length-1)],
        lastName: lastNames[getRandomInt(0, lastNames.length-1)],
        purchases: purchases
      })
  }
  
  return customers;
}

console.log(`generating dataset with ${CUSTOMER_COUNT} customers...`)

fs.writeFile(
  './public/dataset.json',
  JSON.stringify(
    generateRandomRewardsData(CUSTOMER_COUNT)
  ),
  (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(`dataset successfully generated!`);
});
