<template>
    <n-data-table
    :style="{margin:'10px auto',width:'90%'}"
    :columns="columns"
    :data="logs"
  />
</template>

<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'

definePageMeta({
    key: (route) => route.fullPath,
    middleware:['auth'],
});
useHeadSafe({ title: "系统日志" });
const { data: logs } = await useFetch('/api/admin/logs')
const columns =  [
    {
      title: 'Id',
      key: 'id'
    },
    {
      title: 'UserName',
      key: 'username'
    },
    {
      title: 'Date',
      key: 'date'
    },
    {
      title: 'Status',
      key: 'status'
    }
  ]

</script>