'use strict';

const sheet = require('../model/sheet');

const Service = require('egg').Service;


class SheetService extends Service {
  async getlist() {
    const { ctx } = this;
    const owner = ctx.helper.uuidGet();
    const res = await ctx.model.WorkBook.findAll({
      owner,
    });

    const owner_name = await ctx.model.User.findOne({
      where: { uuid: owner },
      attributes: [ 'user_name' ],
    });

    const list = res.map(item => {
      /* 将uuid替换为拥有者名字 */
      item.owner = owner_name.user_name;
      return item;
    });
    if (list) {
      return ctx.success({ list });
    }
    return ctx.fail('获取工作簿列表失败');
  }

  async createSheet() {
    const { ctx } = this;
    /* 工作簿配置 */
    const option = {
      container: 'luckysheet', // 容器
      title: 'Demo', // 工作簿名称
      myFolderUrl: '/#/luckysheet', // 回退地址
      loadUrl: 'http://127.0.0.1:7001/loadUrl',
      lang: 'zh', // 语言
      allowUpdate: false, // 允许更新
      // updateUrl: 'ws://127.0.0.1:7001/websocket', // 更新地址
      row: 18, // 行数
      column: 18, // 列数
      gridKey: ctx.helper.uuidSet(),
    };

    const sheet_index = ctx.helper.strSet();
    /* 工作表配置 */
    const sheet_option = {
      name: '无名字表格', // 工作表名称
      color: '', // 工作表颜色
      index: sheet_index, // 工作表索引
      status: 1, // 激活状态
      order: 0, // 工作表的下标
      hide: 0, // 是否隐藏
      row: 36, // 行数
      column: 18, // 列数
      defaultRowHeight: 19, // 自定义行高
      defaultColWidth: 73, // 自定义列宽
      celldata: [], // 初始化使用的单元格数据
      config: {
        merge: {}, // 合并单元格
        rowlen: {}, // 表格行高
        columnlen: {}, // 表格列宽
        rowhidden: {}, // 隐藏行
        colhidden: {}, // 隐藏列
        borderInf: {}, // 边框
        authority: {}, // 工作表保护
      },
      scrollLeft: 0, // 左右滚动条位置
      scrollTop: 0, // 上下滚动条位置
      luckysheet_select_save: [], // 选中的区域
      calcChain: [], // 公式链
      isPivotTable: false, // 是否数据透视表
      pivotTable: {}, // 数据透视表设置
      filter_select: {}, // 筛选范围
      filter: null, // 筛选配置
      luckysheet_alternateformat_save: [], // 交替颜色
      luckysheet_alternateformat_save_modelCustom: [], // 自定义交替颜色
      luckysheet_conditionformat_save: {}, // 条件格式
      frozen: {}, // 冻结行列配置
      chart: [], // 图表配置
      zoomRatio: 1, // 缩放比例
      image: [], // 图片
      showGridLines: 1, // 是否显示网格线
      dataVerification: {}, // 数据验证配置
    };
    const owner = ctx.helper.uuidGet();
    /* 创建工作簿 */
    const createWorkbook = await ctx.model.WorkBook.create({
      owner,
      option,
    });
    /* 创建单元格内容 */
    const range = {
      ct: { // 单元格值格式
        fa: 'General', // 格式名称为自动格式
        t: 'n', // 格式类型为数字类型
      },
      v: 233, // 内容的原始值为 233
      m: 233, // 内容的显示值为 233
      bg: '#f6b26b', // 背景为 "#f6b26b"
      ff: 1, // 字体为 "Arial"
      fc: '#990000', // 字体颜色为 "#990000"
      bl: 1, // 字体加粗
      it: 1, // 字体斜体
      fs: 9, // 字体大小为 9px
      cl: 1, // 启用删除线
      ht: 0, // 水平居中
      vt: 0, // 垂直居中
      tr: 2, // 文字旋转 -45°
      tb: 2, // 文本自动换行
      ps: { // 批注
        left: 92, // 批注框左边距
        top: 10, // 批注框上边距
        width: 91, // 批注框宽度
        height: 48, // 批注框高度
        value: 'I am a comment', // 批准内容
        isshow: true, // 批注框为显示状态
      },
      f: '=SUM(233)', // 单元格是一个求和公式
    };

    if (createWorkbook) {
      const workbook_id = createWorkbook.dataValues.id;
      /* 创建工作表 */
      const createSheet = await ctx.model.Sheet.create({
        workbook_id,
        option: sheet_option,
      });
      if (createSheet) {
        /* 创建单元格默认 */
        ctx.model.SheetData.create({
          sheet_Id: createSheet.dataValues.id,
          r: 0,
          c: 0,
          v: range,
          index: sheet_index,
        });
        return ctx.success('工作簿与工作表创建成功', workbook_id);
      }
    }
  }

  async gridKey() {
    const { ctx } = this;
    const workbook_id = ctx.request.body.workbook_id;
    const res = await ctx.model.WorkBook.findOne({
      where: { id: workbook_id },
    });
    if (res) {
      const option = res.option;
      return ctx.success('gridKey获取成功', { option });
    }
  }

  async loadUrl() {
    const { ctx } = this;
    /* 根据gridKey获得工作簿 */
    const workbook = await ctx.model.WorkBook.findOne({
      where: {
        'option.gridKey': ctx.request.body.gridKey,
      },
      attributes: [ 'id' ],
    });
    const workbook_id = workbook.dataValues.id;
    /* 所有工作表 */
    const sheets = await ctx.model.Sheet.findAll({
      where: {
        workbook_id,
      },
      attributes: [ 'option' ],
      include: {
        model: ctx.model.SheetData,
        as: 'celldata',
        attributes: [ 'r', 'c', 'v' ],
      },
    });
    /* 转为需要的格式 */
    const res = sheets.map(item => {
      const { option } = item.dataValues;
      const celldata = item.celldata.map(data => {
        const { r, c, v } = data.dataValues;
        return { r, c, v };
      });
      return { ...option, celldata };
    });

    const data = JSON.stringify(res);


    return data;
  }

  async getSheet() {
    const { ctx } = this;
    const workbook_id = ctx.request.body.workbook_id;
    const data = await ctx.model.Sheet.findAll({
      where: { workbook_id },
      include: {
        model: ctx.model.SheetData,
        as: 'celldata',
        attributes: [ 'r', 'c', 'v' ],
      },
    });
    if (data) {
      return ctx.success('成功获取配置', { data });
    }

  }

  async newSheet() {
    const { ctx } = this;
    const { workbook_id, sheet_option } = ctx.request.body.data;
    console.log(workbook_id, sheet_option);
    const flag = await ctx.model.Sheet.create({
      workbook_id,
      option: sheet_option,
    });
    if (flag) {
      return ctx.success('新建工作表成功');
    }
    return ctx.fail('新建工作表失败');
  }

  async updateRange(r, c, v, active_sheet_index, workbook_id) {
    const { ctx } = this;
    const hasRecord = await ctx.model.SheetData.findOne({
      where: { r, c, index: active_sheet_index },
    });

    if (hasRecord) {
      /* 更新 */
      await ctx.model.SheetData.update({
        v,
      },
      {
        where: {
          r,
          c,
          index: active_sheet_index,
        },
        returning: true,
      }
      );
      const res = await ctx.model.SheetData.findOne({
        where: { r, c, index: active_sheet_index },
      });

      return res;
    }


    /* 新建 */
    const createRange = await ctx.model.Sheet.findOne({
      where: { workbook_id },
      attributes: [ 'id' ],
    });
    const res = await ctx.model.SheetData.create({
      sheet_Id: createRange.dataValues.id,
      r,
      c,
      v,
      index: active_sheet_index,
    });
    if (res) {
      return res;
    }
  }

  async improtFile() {
    const { ctx } = this;
    /* 工作簿配置 */
    const option = {
      container: 'luckysheet', // 容器
      title: 'Demo', // 工作簿名称
      myFolderUrl: '/#/luckysheet', // 回退地址
      loadUrl: 'http://127.0.0.1:7001/loadUrl',
      lang: 'zh', // 语言
      allowUpdate: false, // 允许更新
      row: 18, // 行数
      column: 18, // 列数
      gridKey: ctx.helper.uuidSet(),
    };

    const sheets = ctx.request.body.sheets;
    const name = ctx.request.body.name;


    const recordData = [];
    const sheet = [];
    for (const item of sheets) {
      item.index = ctx.helper.strSet();
      const option = {
        name: item.name,
        index: item.index,
        status: item.status,
        order: item.order,
        defaultColWidth: item.defaultColWidth,
        defaultRowHeight: item.defaultRowHeight,
      };
      const celldata = item.celldata;
      sheet.push(option);
      for (const cell of celldata) {
        const record = {
          r: cell.r,
          c: cell.c,
          v: cell.v,
          index: option.index,
        };
        recordData.push(record);
      }
    }

    const owner = ctx.helper.uuidGet();
    const importWorkbook = await ctx.model.WorkBook.create({
      name,
      owner,
      option,
    });

    if (importWorkbook) {
      /* 储存表 */
      await ctx.model.WorkBookMember.create({
        workbook_id: importWorkbook.dataValues.id,
        uuid: owner,
      });
      const importSheets = await Promise.all(sheet.map(async item => {
        const importSheet = await ctx.model.Sheet.create({
          workbook_id: importWorkbook.dataValues.id,
          option: item,
        });
        return importSheet;
      }));

      if (importSheets.length > 0) {
        /* 储存celldata */
        const createSheetDataPromises = recordData.map(async item => {
          await ctx.model.SheetData.create({
            sheet_Id: importSheets[0].dataValues.id,
            r: item.r,
            c: item.c,
            v: item.v,
            index: item.index,
          });
        });

        const res = await Promise.all(createSheetDataPromises);
        if (res) {
          return ctx.success('导入工作簿成功');
        }
      }
    }
  }
}

module.exports = SheetService;
