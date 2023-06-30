<template>
  <div class="header" style="background-color: #d1dce0;height: 40px"></div>
  <el-container style="margin-top: 0">
    <el-aside width="350px">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>PC1</span>
          </div>
        </template>
        <div v-for="o in tableData" :key="o" :data="tableData" class="box-item">
          <div style="">{{o.name}}</div>
          <div>{{o.value}}</div>
        </div>
        <div class="button-item">
          <el-button round style="text-align: -webkit-center;" @click="func">功能</el-button>
        </div>

      </el-card>

      <el-card class="catch-card">
        <template #header>
          <div class="catch-header">
            <span>捕获数据包</span>
            <el-switch v-model="value" > </el-switch>
          </div>
        </template>
        <div v-if="value">
        <div class="catch-item" >
          <el-button type="primary" round @click="dataInject">数据包注入</el-button>
        </div>
        <div class="catch-item">
          <el-button type="primary" round @click="ping"> 连通 </el-button>
        </div>
        <div class="catch-item">
          <el-button type="primary" round @click="open">数据输入</el-button>
        </div>
        <div class="catch-item">
          <el-button type="primary" round @click="deliverData">数据传输</el-button>
        </div>
        </div>

      </el-card>
    </el-aside>
    <el-main>
      <el-card class="main-card">
        <template #header>
          <div class="main-header">
            <span>捕获的数据包</span>
          </div>
        </template>

        <el-table type="index" :data="dataList" style="width: 100%;text-align: center">
          <el-table-column prop="head.sourceMacAddress" label="发送方" width="150"> </el-table-column>-->
          <el-table-column prop="head.destinationMacAddress" label="接收方" width="150"> </el-table-column>
          <el-table-column prop="data.head.typeOfService" label="种类" width="60"> </el-table-column>
          <el-table-column prop="data.head.packageLength" label="大小" width="60"> </el-table-column>
          <el-table-column  label="操作" width="80">
              <template #default="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              </template>
          </el-table-column>

        </el-table>
      </el-card>

      <el-card class="show-card">
        <template #header>
          <div class="show-header">
            <span>数据包显示</span>
            <el-button class="button" type="text" @click="clearPackage">清空</el-button>
          </div>
        </template>

        <el-form :data="test"  label-width="100px" v-if="show">
          <el-form-item label="SourceIp">
            <el-input v-if="checked" v-model="test.head.sourceIpAddress"></el-input>
          </el-form-item>
          <el-form-item label="DestinationIp">
            <el-input v-if="checked" v-model="test.head.destinationIpAddress"></el-input>
          </el-form-item>
          <el-form-item label="Protocol">
            <el-input v-if="checked" v-model="test.head.protocol"></el-input>
          </el-form-item>
          <el-form-item label="SourcePort">
            <el-input v-if="checked" v-model="test.data.head.sourcePort"></el-input>
          </el-form-item>
          <el-form-item label="DestinationPort">
            <el-input v-if="checked" v-model="test.data.head.destinationPort"></el-input>
          </el-form-item>
          <el-form-item label="Data">
            <el-input v-if="checked" v-model="test.data.data"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
    <el-aside width="400px">
      <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>PC2</span>
        </div>
      </template>
        <div v-for="o in tableData2" :key="o" :data="tableData" class="box-item">
          <div style="">{{o.name}}</div>
          <div>{{o.value}}</div>
        </div>
        <div class="button-item">
          <el-button round style="text-align: -webkit-center;" @click="createHost">获取</el-button>
        </div>
    </el-card>

      <el-card class="created-card">
        <template #header>
          <div class="created-header">
            <span>已生成的数据包</span>
          </div>
        </template>
        <el-table :data="packageIntro" style="width: 100%;text-align: center">
          <el-table-column type="index" label="序号" width="60"> </el-table-column>
          <el-table-column prop="data.head.sourceIpAddress" label="发送方" width="100" style="background-color: #42b983" > </el-table-column>
          <el-table-column prop="data.head.destinationIpAddress" label="接收方" width="100" style="background-color: #2c3e50"> </el-table-column>
          <el-table-column  label="操作" width="60">
            <template #default="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>


      </el-card>
    </el-aside>
  </el-container>
  <div class="bottom" style="background-color: #d1dce0;height: 60px"></div>
</template>

<script>
import {createHostAPI,injectAPI,pingAPI,deliverDataAPI} from '../api/index';
import {ref} from 'vue';

export default {
  name: 'HelloWorld',
  data() {
    return {
      value: false,
      checked:false,
      show:false,
      message:'1253545',
      tableData: [
        {
          name: 'IP',
          value: '192.168.1.1',
        },
        {
          name: 'MAC',
          value: '00-16-EA-AE-3C-40',
        },
        {
          name: 'Port',
          value: '8080',
        },
      ],
      tableData2: [
        {
          name: 'IP',
          value: '192.168.1.2',
        },
        {
          name: 'MAC',
          value: '08-00-20-0A-8C-6D',
        },
        {
          name: 'Port',
          value: '8081',
        },
      ],
      dataList:[
      ],
      packageData: [
        {
          date: '2023-06-01',
          time: '14:13:05',
          sent: '192.168.172.0',
          receive: '192.168.155.3',
        },
        {
          date: '2023-06-01',
          time: '14:13:52',
          sent: '10.0.0.1',
          receive: '192.168.155.3',
        },
        {
          date: '2023-06-01',
          time: '14:14:23',
          sent: '192.168.172.5',
          receive: '10.0.0.2',
        },
      ],
      content:[
        {
          level:'传输层',
          size:'108kb',
          label:'xbb',
          auth:'454',
        }
      ],
      packageIntro:[
      ],
      test:[],
    }
  },
  setup(){
    let hostIp=ref(0)
    return{
      hostIp
    }
  },
  props: {
    msg: String
  },
  methods:{
    handleClick(row) {
      // console.log(row)
      // console.log("829")
      this.test=row.data;
      // console.log(row.data)
      // console.log(this.packageIntro)
      console.log(this.test.head)
      console.log(this.test.head.sourceIpAddress)
      this.checked=true
      this.show=true
    },
    async createHost(){
      const res=await createHostAPI();
      console.log(res);
      this.tableData2[0].value=res.data.ip;
      this.tableData2[1].value=res.data.mac;
    },
    async dataInject(){
      const res=await injectAPI();
      console.log(res);
      this.dataList=res.data;
      console.log(this.dataList)
      let i = 0;
      for(i=0;i<this.dataList.length;i++){
        this.packageIntro.push(this.dataList[i]);
      }
    },

    async ping(){
      const res=await pingAPI({
        fromIp:this.tableData[0].value,
        toIp:this.tableData[1].value,
      });
      console.log(res);
      this.dataList=res.data;
      console.log(this.dataList)
      let i = 0;
      for(i=0;i<this.dataList.length;i++){
        this.packageIntro.push(this.dataList[i]);
      }
    },

    async deliverData(){
      const res=await deliverDataAPI({
        fromIp:this.tableData[0].value,
        toIp:this.tableData2[0].value,
        fromPort:this.tableData[2].value,
        toPort:this.tableData2[2].value,
        data:this.message,
      });
      this.dataList=res.data;
      let i = 0;
      for(i=0;i<this.dataList.length;i++){
        this.packageIntro.push(this.dataList[i]);
      }
    },

    open() {
      this.$prompt('请输入传输数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
          .then(({ value }) => {
             this.message=value;
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入',
            })
          })
    },
    func(){
      this.value=this.value==false?true:false;
    },
    clearPackage(){
      this.show=false;
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-table {
  overflow-y: auto !important;
}



/*PC1和PC2*/
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}

.box-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  font-size: 15px;
  margin-top: 1px;
}
.button-item{
  display: flex;
  justify-content:center;
  align-items: center;
  height: 80px;
  font-size: 15px;
}

.box-card {
  margin-left: 10% ;
  margin-right: 10%;
  margin-top: 8%;
  margin-bottom: 8%;
  height: 300px;
}

/*捕获数据包*/
.catch-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.catch-item {
  display: flex;
  justify-content:center;
  align-items: center;
  margin-bottom: 1px;
  height: 60px;
  font-size:15px;
  background-color: #D3DCE6;
}

.catch-card {
  margin-left: 10% ;
  margin-right: 10%;
  margin-top: 8%;
  margin-bottom: 8%;

}

/*中间的主要部分*/
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.main-item {
  margin-bottom: 1px;
  height: 90px;
  font-size:20px;
}

.main-card {
  margin-left: 5% ;
  margin-right: 5%;
  margin-top: 5%;
  margin-bottom: 8%;
}

/*数据包显示的内容*/
.show-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.show-item {
  margin-bottom: 1px;
  height: 90px;
  font-size:20px;
}

.show-card {
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 8%;
  margin-bottom: 8%;

}

/*已生成数据包*/
.created-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.created-item {
  background-color: #E9EEF3;
  margin-bottom: 1px;
  height: 80px;
  font-size:10px;

}

.created-card {
  margin-left: 5% ;
  margin-right: 5%;
  margin-top: 8%;
  margin-bottom: 8%;

}
</style>
