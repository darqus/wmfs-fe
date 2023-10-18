<template>
  <q-table>
    <template #top>
      <slot name="top" />
    </template>
    <template #no-data="{ icon, message, filter }">
      <div
        class="full-width row flex-center q-gutter-sm q-pa-md"
        align="center"
      >
        <div
          :class="{
            'empty': true,
            [`text-${icon}`]: icon
          }"
        >
          <q-icon
            size="2em"
            :name="filter ? 'filter_alt' : icon"
          />
          <span
            class="text-subtitle2 q-ml-md"
            v-text="message"
          />
        </div>
      </div>
    </template>
  </q-table>
</template>
