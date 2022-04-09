import db from '../config/db'
import FormatHelper from '../utils/FormatHelper'

/**
 * Handle SQL queries for items table
 *
 * @class MediaItem
 */
class MediaItem {
 police_id: string
 case_id: string
 note: string

 constructor (
   police_id: string,
   case_id: string = '',
   note: string = ''
 ) {
   this.police_id = police_id
   this.case_id = case_id
   this.note = note
 }

 /**
  * Save the item to db
  *
  * @returns {Promise}
  * @memberof MediaItem
  *
  */
 async save () {
   // Get the date
   const created = FormatHelper.getCurrentDateInSQLFormat()

   const itemData:Record<string, any> = {
     police_id: this.police_id,
     created
   }

   // handle optional params
   if (this.case_id.length > 0) itemData.case_id = this.case_id
   if (this.note.length > 0) itemData.note = this.note

   const sql = `
   INSERT INTO items(
     ${Object.keys(itemData).join(', ')}
     )
     VALUES(
       ${Object.keys(itemData).map(k => '?').join(', ')}
     )
     `

   return db.execute(sql, Object.values(itemData))
 }

 /**
  * Gets all rows in item table
  *
  * @returns {Promise} all rows in item table
  */
 static findAll () {
   return db.execute('SELECT * FROM items;')
 }

 /**
  * Get row by id
  *
  * @param {string} id
  * @returns {Promise} item by id
  */
 static findById (id: string) {
   return db.execute('SELECT * FROM items WHERE ID=?', [id])
 }

 /**
  * Update item
  *
  * @param {string} id
  * @param {Object} body
  * @returns {Promise} updated items
  */
 static updateItem (id: string, body: Object) {
   const sql = `
   UPDATE items 
   SET ${Object.keys(body).map(k => k + ' = ?').join(', ')} 
   WHERE ID=?;
   `
   const values = [...Object.values(body), id]

   return db.execute(sql, values)
 }

 /**
  * Delete items from items table
  *
  * @static
  * @param {string} id
  */
 static deleteItem (id: string) {
   return db.execute('DELETE FROM items WHERE ID=?', [id])
 }
}

export default MediaItem
