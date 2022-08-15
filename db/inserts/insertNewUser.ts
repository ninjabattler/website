import { Pool, QueryResult } from 'pg';
import { encrypt } from '../../helpers/encryptHelper';
import { UserData } from '../../types';

const insertNewUser = async (db: Pool, ip: string | null): Promise<UserData[]> => {
  try {
    const newUser: QueryResult<UserData> = await db.query(`
      INSERT INTO users(username, avatar, ip)
      VALUES($1, $2, $3)
      RETURNING ${"*"}
    `, [encrypt(ip), Math.ceil(Math.random() * 4), ip]);

    return newUser.rows;
  }
  catch(err) {
    console.log(err);
    return err;
  }
}

export default insertNewUser;