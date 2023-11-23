import postgres from 'postgres'

console.log(process.env.POSTGRES_CONNECTION_STRING);
const sql = postgres(process.env.POSTGRES_CONNECTION_STRING) // will use psql environment variables

export default sql