import db from '../config/db'
import FormatHelper from '../utils/FormatHelper'

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

 async save () {
   // Get the date
   const created = FormatHelper.getCurrentDateInSQLFormat()

   const items:Record<string, any> = {
     police_id: this.police_id,
     created
   }

   // handle optional params
   if (this.case_id.length > 0) items.case_id = this.case_id
   if (this.note.length > 0) items.note = this.note

   const sql = `
   INSERT INTO items(
     ${Object.keys(items).join(', ')}
     )
     VALUES(
       ${Object.keys(items).map(k => '?').join(', ')}
     )
     `

   return db.execute(sql, Object.values(items))
 }

 static findAll () {
   const sql = 'SELECT * FROM items;'

   return db.execute(sql)
 }

 static findById (id: string) {
   const sql = 'SELECT * FROM items WHERE ID=?'

   return db.execute(sql, [id])
 }
}

export default MediaItem
