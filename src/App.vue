<script setup lang="ts">
import { ref, computed } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import type {
  ColDef,
} from 'ag-grid-community';
import TreeStore from '@/service/TreeStore.ts';

const treeStore = ref<TreeStore>(new TreeStore([
  { id: 1, parent: null, label: 'Айтем 1' },
  { id: '91064cee', parent: 1, label: 'Айтем 2' },
  { id: 3, parent: 1, label: 'Айтем 3' },
  { id: 4, parent: '91064cee', label: 'Айтем 4' },
  { id: 5, parent: '91064cee', label: 'Айтем 5' },
  { id: 6, parent: '91064cee', label: 'Айтем 6' },
  { id: 7, parent: 4, label: 'Айтем 7' },
  { id: 8, parent: 4, label: 'Айтем 8' }
]));

const defaultColDef = ref<ColDef>({
  flex: 1,
});
const autoGroupColumnDef = ref<ColDef>({
  headerName: 'Категория',
  valueFormatter: (params) => {
    const children = treeStore.value.getChildren(params.data.id);

    if (children.length > 0) {
      return '<span style="font-weight: bold;">Группа</span>';
    }

    return 'Элемент';
  },
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: {
    suppressCount: true,
    innerRenderer: (params: { valueFormatted: string }) => {
      return params.valueFormatted;
    },
  },
});
const columnDefs = ref<ColDef[]>([
  {
    headerName: '№ п\\п',
    minWidth: 280,
    valueGetter: (params) => {
      const rowIndex = params.node?.rowIndex;

      if (rowIndex !== null && rowIndex !== undefined) {
        return rowIndex + 1;
      }

      return 'Неизвестный элемент';
    },
    cellRendererParams: {
      suppressCount: true,
    },
    cellStyle: {
      fontWeight: 'bold',
    },
    pinned: 'left',
  },
  {
    headerName: 'Наименование',
    valueFormatter: (params) => {
      const children = treeStore.value.getChildren(params.data.id);

      if (children.length > 0) {
        return `<span style="font-weight: bold;">${params.data.label}</span>`;
      }

      return params.data.label;
    },
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      suppressCount: true,
      innerRenderer: (params: { valueFormatted: string }) => {
        return params.valueFormatted;
      },
    },
  },
]);

const items = computed(() => treeStore.value.getAll())

const getRowId = (params) => params.data.id;
</script>

<template>
  <div class="app">
    <ag-grid-vue
      style="width: 80%; height: 80%;"
      :columnDefs="columnDefs"
      :defaultColDef="defaultColDef"
      :rowData="items"
      :getRowId="getRowId"
      :treeData="true"
      :autoGroupColumnDef="autoGroupColumnDef"
      treeDataParentIdField="parent"
    />
  </div>
</template>

<style>
body {
  margin: 0;
}
</style>

<style scoped>
.app {
  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
