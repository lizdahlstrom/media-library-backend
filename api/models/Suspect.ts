import db from '../config/db'

class Suspect {
  first_name: string
  last_name: string

  constructor (first_name: string, last_name: string) {
    this.first_name = first_name
    this.last_name = last_name
  }

  async save () {
    const itemData:Record<string, any> = {
      first_name: this.first_name,
      last_name: this.last_name
    }

    return db.execute(`
    INSERT INTO suspects (
      ${Object.keys(itemData).join(', ')}
      ) VALUES (
        ${Object.keys(itemData).map(k => '?').join(', ')}
      )
      `, Object.values(itemData))
  }

  static findAll () {
    return db.execute('SELECT * FROM suspects;')
  }

  static findById (id: string) {
    return db.execute('SELECT * FROM suspects WHERE ID=?', [id])
  }

  static update (id: string, body: Object) {
    const sql = `
    UPDATE suspects 
    SET ${Object.keys(body).map(k => k + ' = ?').join(', ')}
    WHERE ID=?
    `
    const values = [...Object.values(body), id]
    return db.execute(sql, values)
  }

  static delete (id: string) {
    return db.execute('DELETE FROM suspects WHERE ID=?', [id])
  }
}

export default Suspect
