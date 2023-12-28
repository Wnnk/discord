'use strict';

/**
 * @Controller
**/

const Controller = require('egg').Controller;

class SheetController extends Controller {

  async getlist() {
    /**
     * @summary 获取用户表格
     * @description 获取用户表格
     * @router post /sheet/getlist
     * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.sheet.getlist();
  }

  async createSheet() {
    /**
     * @summary 创建新表格
     * @router post /sheet/new
     * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.sheet.createSheet();
  }

  async gridKey() {
    /**
     * @summary 加载所有工作表的配置
     * @router post /sheet/loadUrl
     * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.sheet.gridKey();
  }

  async loadUrl() {
    /**
     * @summary luckysheet配置接口
     * @router post /loadUrl
     * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.sheet.loadUrl();
  }


  async getSheet() {
    /**
     * @summary 获取工作簿下的工作表
     * @router post /sheet/getSheet
     * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.sheet.getSheet();
  }

  async newSheet() {
    /**
     * @summary 创建新的工作表
     * @router post /sheet/newSheet
     * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.sheet.newSheet();
  }

  async improtFile() {
    /**
     * @summary 导入工作簿，储存入数据库
     * @router post /sheet/import
     * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.sheet.improtFile();
  }
}

module.exports = SheetController;
