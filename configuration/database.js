const mongoose = require('mongoose');


const connectDB = async()=>{
  await mongoose.connect('mongodb+srv://siva:9618666169sS$@nodestart.g43rrlg.mongodb.net/learning')
}

module.exports = connectDB;


// const url = 'mongodb+srv://siva:9618666169sS$@nodestart.g43rrlg.mongodb.net/';
// const client = new MongoClient(url);
  
// const dbName = 'learning';

// async function main() {
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('users');
//   const data = { name: "Neapolitan pizza", shape: "round" };
//    const abc = await collection.insertOne(data)
//   return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());