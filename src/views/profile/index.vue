<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col
          :span="6"
          :xs="24"
        >
          <user-card :user="user" />
        </el-col>
        <el-col
          :span="18"
          :xs="24"
        >
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane
                :label="$t('profile.role')"
                name="role"
              >
                <!-- <activity /> -->
                <role />
              </el-tab-pane>
              <el-tab-pane
                label="Timeline"
                name="timeline"
              >
                <timeline />
              </el-tab-pane>
              <el-tab-pane
                label="Account"
                name="account"
              >
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Account from './components/Account.vue'
import Activity from './components/Activity.vue'
import Timeline from './components/Timeline.vue'
import UserCard from './components/UserCard.vue'
import Role from '@/ADempiere/shared/components/Profile/Role'

export interface IProfile {
  name: string
  email: string
  avatar: string
  roles: string
}

const defaultProfile: IProfile = {
  name: 'Loading...',
  email: 'Loading...',
  avatar: 'Loading...',
  roles: 'Loading...'
}

@Component({
  name: 'Profile',
  components: {
    Role,
    Account,
    Activity,
    Timeline,
    UserCard
  }
})
export default class extends Vue {
  private user = defaultProfile
  private activeTab = 'activity'

  get name() {
    return this.$store.state.user.name
  }

  get email() {
    return this.$store.state.user.email
  }

  get avatar() {
    return this.$store.state.user.avatar
  }

  get roles() {
    return this.$store.state.user.roles
  }

  created() {
    this.getUser()
  }

  private getUser() {
    this.user = {
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      roles: this.roles.join(' | ')
    }
  }
}
</script>
