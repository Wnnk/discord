<script setup lang='ts'>
import {onMounted, ref, reactive, onBeforeUnmount } from 'vue'
import axios from '@/axios';
import { useRoute } from 'vue-router';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import ExcelJs from 'exceljs'




const route = useRoute();
/* 当前的工作簿id */
const workbook_id = route.path.split('/').pop();
const socket = ref<Socket | null>(null);
/* 当前激活工作表 */
let active_sheet_index = '';

const init = async ()=> {
  /* 获取工作簿option */
  const res = await axios('/sheet/gridKey',{
    data:{
      workbook_id,
    }
  })

 /* 获取工作表option以及celldata */
  const sheets = await axios('/loadUrl', {
    data:{
      gridKey: res.data.data.option.gridKey
    }
  })
  const option = res.data.data.option
  option.data = sheets.data

  /* socket连接 */
  socket.value = io('http://127.0.0.1:7001/excel',{
    query:{},
  })
  socket.value.on('connect',()=>{
    socket.value.emit('joinExcel',{
      workbook_id,
    })
    socket.value.on('updateRange',(res:any)=>{
      const {r, c, v, index} = res;
      const order_target = option.data.find((item:any)=>{
        if (item.index === index) {
          return item
        }
      })
      if (order_target) {
        const order = order_target.order;
        luckysheet.setCellValue(r, c, v, {
          isRefresh:true,
          order,
        })
      }
    })
  })


  option.hook = {
    async sheetActivate(index:string,isPivotInitial:boolean,isNewSheet:boolean) {
      /* 创建新的表 */
      if (isNewSheet) {
        const all_sheets = luckysheet.getAllSheets();
        const res = await axios('/sheet/newsheet',{
          data:{
            data:{
              workbook_id,
              sheet_option: all_sheets[ all_sheets.length - 1 ],
            }
          }
        })
      }
      /* 切换当前激活表 */
      active_sheet_index = index;
    },
    cellUpdateBefore(r:number,c:number,data:any) {
      if ( typeof(data) !== 'string') {
        if (data.v === luckysheet.getCellValue(r,c)) {
          return false
        }
      }

    },
    cellUpdated(r:number,c:number,oldval:object,v:object){
      socket.value.emit('update',{
        r,
        c,
        v,
        active_sheet_index,
        workbook_id,
      })
    },

  }
 
  /* 创建工作簿 */
  luckysheet.create(option);
  active_sheet_index = option.data[0].index
  console.log(option.data)
}

// const downloadExcel = async function () {
//   const sheet_file = luckysheet.getLuckysheetfile();
//   /* 创建一个工作簿 */
//   const workbook = new ExcelJs.Workbook();
//   /* 创建表格 */
//   sheet_file.every(function(table:any){
//     if (table.data.length === 0) return true
//       const worksheet = workbook.addWorksheet(table.name);
//       setStyleAndValue(table.data,worksheet);
//       setMerge(table.config.merge, worksheet);
//       return true
//   })
//   const buffer = await workbook.xlsx.writeBuffer();
//   return buffer;
// }


// const borderConvert = function(borderType:any,style:any = 1  ,color:string = '#000'){
//   if (!borderType) return {}
//   const luckToExcel = {
//     type: {
//       'border-all': 'all',
//       'border-top': 'top',
//       'border-right': 'right',
//       'border-bottom': 'bottom',
//       'border-left': 'left',
//     },
//     style: {
//       0:'none',
//       1: 'thin',
//       2: 'hair',
//       3: 'dotted',
//       4: 'dashDot',
//       5: 'dashDot',
//       6: 'dashDotDot',
//       7: 'double',
//       8: 'medium',
//       9: 'mediumDashed',
//       10: 'mediumDashDot',
//       11: 'mediumDashDotDot',
//       12: 'slantDashDot',
//       13: 'thick',
//     }
//   }
//   let template = {style: luckToExcel.style[style],color:{arbg:color.replace('#','')}}
//   let border = {}
//   if (luckToExcel.type[borderType] === 'all') {
//     border['top'] = template
//     border['right'] = template
//     border['bottom'] = template
//     border['left'] = template
//   } else {
//     border[luckToExcel.type[borderType]] = template
//   }
//   return border
// }

// const setBorder = function(luckyBorderInfo:any,worksheet:any){
//   if (!Array.isArray(luckyBorderInfo)) return
//   luckyBorderInfo.forEach((elem)=>{
//     let border = borderConvert(elem.borderType, elem.style, elem.color)
//     let rang = elem.range[0],
//     worksheet.getCell(rang.row_focus + 1, rang.column_focus + 1).border = border
//   })
// }

// const fillConvert = (bg:any) =>{
//   if (!bg) {
//     return {}
//   }
//   let fill = {
//     type: 'pattern',
//     pattern: 'solid',
//     fgColor: {argb: bg.replace('#', '')}
//   }
//   return fill
// }

// const fontConvert = (ff:number = 0, fc:string = '#000000', bl:number = 0, it:number = 0, fs:number = 10, cl:number = 0, ul:number = 0)=>{
//   const luckToExcel = {
//     0: '微软雅黑',
//     1: '宋体（Song）',
//     2: '黑体（ST Heiti）',
//     3: '楷体（ST Kaiti）',
//     4:'仿宋（ST FangSong）',
//     5:'新宋体（ST Song）',
//     6:'华文新魏',
//     7:'华文行楷',
//     8:'华文隶书',
//     9:'Arial',
//     10:'Times New Roman ',
//     11:'Tahoma ',
//     12:'Verdana',
//     num2bl:function(num:number) {
//       return num === 0? false : true
//     }
//   }
//   let font = {
//     name: luckToExcel[ff],
//     family: 1,
//     size: fs,
//     color: {argb: fc.replace('#', '')},
//     bold: luckToExcel.num2bl(bl),
//     italic: luckToExcel.num2bl(it),
//     underline: luckToExcel.num2bl(ul),
//     strike: luckToExcel.num2bl(cl),
//   }
//   return font
// }
// const alignmentConvert =(vt:string = 'default', ht:string = 'default', tb:string= 'default', tr = 'default') =>{
//   const luckToExcel = {
//     vertical:{
//       0:'middle',
//       1:'top',
//       2:'bottom',
//       default: 'top'
//     },
//     horizontal:{
//       0: 'center',
//       1: 'left',
//       2: 'right',
//       default: 'left'
//     },
//     wrapText:{
//       0: false,
//       1: false,
//       2: true,
//       default: false
//     },
//     textRotation: {
//       0: 0,
//       1: 45,
//       2: -45,
//       3: 'vertical',
//       4: 90,
//       5: -90,
//       default: 0,
//     },
//   }

//   let alignment = {
//     vertival: luckToExcel.vertical[vt],
//     horizontal: luckToExcel.horizontal[ht],
//     wrapText: luckToExcel.wrapText[tb],
//     textRotation: luckToExcel.textRotation[tr],
//   }
//   return alignment
// }

// const setStyleAndValue = function(cellArr:any, worksheet:any) {
//   if (!Array.isArray(cellArr)) return 
//   cellArr.forEach(function (row,rowid) {
//     row.every( (cell:any, columind:any) => {
//       if (!cell) true
//       let fill = fillConvert(cell.bg)
//       let font = fontConvert(cell.ff, cell.fc, cell.bl,cell.it, cell.fs, cell.cl, cell.ul)
//       let alignment  = alignmentConvert(cell.vt, cell.ht, cell.tb, cell.tr)
//       let value
//       if (cell.f) {
//         value = { formula: cell.f, result: cell.v}
//       } else {
//         value = cell.v
//       }
//       let target = worksheet.getCell(rowid + 1, columind + 1)
//       target.fill = fill
//       target.font = font
//       target.alignment = alignment
//       target.value = value
//       return true
//     })
//   })
// }

// const setMerge = function(luckyMerge:any, worksheet:any){
//   const mergearr = Object.values(luckyMerge)
//   mergearr.forEach((elem:any)=>{
//     worksheet.mergeCells(elem.r + 1,elem.c + 1, elem.r + elem.rs, elem.c + elem.cs)
//   })
// }




onMounted(() =>{
  init()
})

onBeforeUnmount(()=>{
  socket.value.emit('leaveroom',{
    workbook_id
  });
})



</script>




<template>
  <div id="luckysheet" :style="{height:'600px'}">
    
  </div>

  <!-- <el-button  type="primary" @click="downloadExcel()">Download</el-button> -->
</template>

<style lang='scss' scoped>
#LuckeySheet{
  width:100%;
  height:100%;

}
</style>