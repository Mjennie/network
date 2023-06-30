<template>
 <el-container>
   <el-aside width="200px">leftside</el-aside>
   <el-main>Main</el-main>
   <el-aside width="200px">rightside</el-aside>
 </el-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "home",
  methods:{

  }

}
</script>

<style scoped>
.el-aside {
  background-color: #D3DCE6;
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

</style>