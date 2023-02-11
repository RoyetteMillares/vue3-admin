<template>
  <!-- <va-card>
    <va-card-title>
      {{ t('dashboard.setupRemoteConnections') }}
    </va-card-title>
    <va-card-content>
      <va-tabs v-model="activeTabName" grow>
        <template #tabs>
          <va-tab name="OverviewTab">
            {{ t('dashboard.tabs.overview.title') }}
          </va-tab>
          <va-tab name="BillingAddressTab">
            {{ t('dashboard.tabs.billingAddress.title') }}
          </va-tab>
          <va-tab name="BankDetailsTab">
            {{ t('dashboard.tabs.bankDetails.title') }}
          </va-tab>
        </template>
      </va-tabs>
      <va-separator />
      <component :is="tabs[activeTabName]" @submit="submit" />
    </va-card-content>
  </va-card> -->
  <va-card>
    <va-card-title>{{ t('dashboard.TronsData') }}</va-card-title>
    <va-card-content>
      <div class="table-wrapper">
        <table class="va-table va-table--striped va-table--hoverable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(account, i) in accounts" :key="i">
              <td>{{ account }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </va-card-content>
  </va-card>
</template>

<script setup lang="ts">
  import { onMounted, computed, ref } from 'vue'
  import { useToast } from 'vuestic-ui'
  import { useI18n } from 'vue-i18n'
  import { useAccountCenter } from '../../../stores/accounts/index'
  const { t } = useI18n()

  const { init, close, closeAll } = useToast()

  const accounts = computed<Array<any>>(() => accountStore.accountList)

  const accountStore = useAccountCenter()

  onMounted(() => {
    accountStore.GET_ACCOUNT_LIST()
  })

  const showFetchNotif = () => {
    init('Fetching Data...')
  }

  // const tabs = {
  //   OverviewTab: defineAsyncComponent(() => import('./dashboard-tabs/OverviewTab.vue')),
  //   BillingAddressTab: defineAsyncComponent(() => import('./dashboard-tabs/BillingAddressTab.vue')),
  //   BankDetailsTab: defineAsyncComponent(() => import('./dashboard-tabs/BankDetailsTab.vue')),
  // }

  // const emit = defineEmits<{
  //   (e: 'submit', data: any): void
  // }>()

  // const activeTabName = ref<keyof typeof tabs>('BillingAddressTab')

  // function submit(data: any) {
  //   emit('submit', data)
  // }
</script>

<style lang="scss">
  // .va-tabs__tabs {
  //   height: 100%;
  // }
</style>
