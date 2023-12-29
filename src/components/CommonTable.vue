<template>
  <q-table>
    <template #top>
      <slot name="top" />
    </template>
    <template #no-data="{ icon, message, filter }">
      <div
        align="center"
        class="full-width row flex-center q-gutter-sm q-pa-md"
      >
        <div
          :class="{
            'empty': true,
            [`text-${icon}`]: icon
          }"
        >
          <q-icon
            :name="filter ? 'filter_alt' : icon"
            size="2em"
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
