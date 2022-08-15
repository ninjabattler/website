import { Pool, QueryResult } from "pg"
import { UserData } from "../../types"

const selectUserId = async (db: Pool, ip: string | null): Promise<UserData[]> => {
  try {
    const userId: QueryResult<any> = await db.query(`
      SELECT id FROM users WHERE ip = $1
    `, [ip]);

    return userId.rows
  }
  catch(err) {
    console.log(err)
    return err
  }
}

export default selectUserId;