<script setup lang='ts'>
import axios from '@/axios';
import {reactive, onMounted, ref} from 'vue'
import router from '@/routers';
import type { SheetList } from '@/views/LuckeySheet/interface'
// import  LuckyExcel from 'luckyexcel'

const fileInput = ref<HTMLInputElement | null>(null)

const state = reactive({
  list:[],
})

const picture = {
  create:new URL('@/assets/images/create.png',import.meta.url).href,
  require:new URL('@/assets/images/require.png',import.meta.url).href,
  excel: new URL('@/assets/images/excel.png',import.meta.url).href,
}
  
  
 




const init = async ()=>{
  const res = await axios('/sheet/getlist',{})
  state.list = res.data.msg.list;
}

onMounted(init)
/* 新建工作簿 */
const newSheet = async ()=>{
  const res = await axios('/sheet/new',{});
  if (res.data.code === '0') {
    const workbook_id = res.data.data;
    router.push({name:'sheet',params:{ Id:workbook_id }})
  }
}
/* 选择已有工作簿 */
const chioeWorkBook = (row:SheetList) =>{
  router.push({name:'sheet',params:{Id:row.id}})
}

/* 导入文件xlsx文件,触发input按钮 */
const importFile = ()=>{
  fileInput.value?.click()
}
/* 检测文件后缀名合法性 */
const isFileWithExtension = function(file_name:string, extension: string):boolean{
  return file_name.endsWith(extension);
}
const getFileName = function(file_all_name: string):string {
  const match = file_all_name.lastIndexOf('.')
  const file_name = file_all_name.substring(0,match)
  return file_name
}
/* 选择文件 */
const fileChange =(event:Event)=>{
  const target = event.target as HTMLInputElement
  const file = target.files![0]
  const extension = isFileWithExtension(file.name,'.xlsx')
  const file_name = getFileName(file.name);
  if (extension) {
    LuckyExcel.transformExcelToLucky(
      file,
      function(exportJson:any,luckysheetfile:any){
        if (exportJson.sheets == null || exportJson.sheets.length == 0) {
          alert('Failed to read the content of the excel file, currently does not support xls files!')
          return;
        }
        luckysheet.destroy();

        window.luckysheet.create({
          container: 'luckysheet',
          showinfobar: false,
          data: exportJson.sheets,
          title: exportJson.info.name,
          userInfo: exportJson.info.name.creator,
        });
        console.log('工作簿:',luckysheet)
        console.log('工作表:', luckysheet.getAllSheets())
        
        axios('/sheet/import',{
          data:{
            sheets:luckysheet.getAllSheets(),
            name: file_name,
          }
        }).then((res)=> {
          if (res.data.code === '0') {
            init()
          }
        })
      },
    )
  }
  
}
</script>

<template>
  <div class="SheetList">
    <div class="TopNav">
      <el-row >
        <el-button type="primary"  @click="newSheet">
          <img :src="picture.create" class="buttonPicture">
          新建
        </el-button>
        <el-button type="info" @click="importFile" >
          <input type="file" class="importfile" ref="fileInput" @change="fileChange"/>
            <img :src="picture.require" class="buttonPicture">
          导入
        </el-button>
      </el-row>
    </div>
    <div class="SheetMain">
      <el-table
        :data="state.list"
        style="width:90%"
        class="SheetTable"
        @row-click="chioeWorkBook"
      >
        <el-table-column prop="name" label="名称" >

          <template #default="scope">
            <div class="file-icon">
              <img :src="picture.excel">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="owner" label="所有者" />
        <el-table-column prop="update_time" label="上次更新" />
        
      </el-table>

      
    </div>
  </div>
  <div id="luckysheet"></div>
</template>

<style lang='scss' scoped>


#luckysheet{
  display: none;
  height: 300px;
}
.SheetTable{
  margin:20px 20px;
  
}
.TopNav{
  margin-top: 20px;
  margin-left: 80px;
}
.file-icon{
  display: flex;
  align-items: center;
  img{
    width: 24px;
    height: 24px;
  }
}
.buttonPicture{
  width: 16px;
  height: 16px;
  margin-right: 10px;
}
.importfile{
  display: none;
}
</style>