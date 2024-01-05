import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_CONNECTION_STRING) // will use psql environment variables

export default sql