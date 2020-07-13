
const Items = require('./models/Items')

async function createItems (itemlist, listId) {
  // returns buffer of concatted UUIDs for insertion into Lists

  if (!listId) {
    listId = itemList[0].listId
  }

  let idArr = itemList.map(i => Buffer.from(i.id));

  for (let i in itemlist) {
    let item = await Items.create({
      listId,
      itemId: i.id,
      description: i.description      
    })
  }

  return Buffer.concat(idArr)

}




module.exports = {
  createItems
}