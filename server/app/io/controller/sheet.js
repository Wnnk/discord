'use strict';
const Controller = require('egg').Controller;

class ExcelController extends Controller {
  async joinExcel() {
    const { ctx } = this;
    const { workbook_id } = ctx.args[0];
    ctx.socket.join(workbook_id);
  }

  async update() {
    const { ctx } = this;
    const { r, c, v, active_sheet_index, workbook_id } = ctx.args[0];
    const res = await ctx.service.sheet.updateRange(r, c, v, active_sheet_index, workbook_id);
    console.log('现存连接', ctx.socket.adapter.rooms[workbook_id].length);
    if (res) {
      ctx.socket.broadcast.to(workbook_id).emit('updateRange', res);
    }
    // const json_data = JSON.stringify(res);

  }

  async leaveRoom() {
    const { ctx } = this;
    const { workbook_id } = ctx.args[0];
    ctx.socket.leave(workbook_id);
    console.log(`${workbook_id}离开sheet`);
  }


}

module.exports = ExcelController;
