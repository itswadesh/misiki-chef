<template>
  <div>
    <Heading title="Chef Details" />
    <div class="w-full pb-4 m-auto lg:w-1/3">
      <form
        class="w-full mb-1 lg:mx-15 form"
        novalidate
        autocomplete="off"
        @submit.stop.prevent="submit()"
      >
        <div class="p-2 mb-4" v-if="a">
          <Avatar
            :image="profile.avatar"
            name="avatar"
            folder="avatar"
            @remove="removeImage"
            @save="saveImage"
          />
          <div type="tel" label="Phone" class="w-full text-center" name="name">
            Phone: {{ a.phone }}
          </div>
          <div
            class="flex justify-center mb-2 text-center cursor-pointer"
            v-if="profile.info"
          >
            <CheckboxLight
              :value="profile.info.public"
              label="Public"
              v-model="profile.info.public"
              >Show name to public? {{ profile.info.public }}</CheckboxLight
            >
            <br />
          </div>
          <Textbox
            label="Restaurant"
            class="w-full mb-4"
            name="restaurant"
            v-if="profile.info"
            v-model="profile.info.restaurant"
          />
          <div class="flex justify-between w-full mb-4">
            <Textbox
              label="First Name"
              class="w-1/2 mr-1"
              name="firstName"
              v-model="profile.firstName"
            />
            <Textbox
              label="Last Name"
              class="w-1/2 ml-1"
              name="lastName"
              v-model="profile.lastName"
            />
          </div>
          <Textbox
            label="Address"
            class="w-full mb-4"
            name="name"
            v-model="a.address"
          />
          <div class="flex justify-between w-full mb-4">
            <Textbox
              type="tel"
              label="Pin Code"
              class="w-1/2 mr-1"
              name="zip"
              v-model="a.zip"
            />
            <Textbox
              type="tel"
              label="Phone"
              class="w-1/2 ml-1"
              name="phone"
              v-model="a.phone"
            />
          </div>
          <div class="flex justify-between w-full mb-4">
            <Textbox
              label="City"
              class="w-1/2 mr-1"
              name="name"
              v-model="a.city"
            />
            <Textbox
              label="State"
              class="w-1/2 ml-1"
              name="name"
              v-model="a.state"
            />
          </div>
          <div class="flex justify-between w-full mb-4" v-if="profile.info">
            <Textarea
              label="About"
              class="w-full mr-1"
              name="about"
              v-model="profile.info.about"
            />
          </div>
          <!-- <ImageUpload
            :image="profile.avatar"
            name="avatar"
            folder="avatar"
            @remove="removeImage"
            @save="saveImage"
          />-->
        </div>
        <div
          class="fixed bottom-0 flex justify-between w-full shadow lg:shadow-none lg:relative"
        >
          <button
            type="button"
            @click="$router.push('/my')"
            class="w-1/2 p-3 text-sm font-semibold tracking-widest text-black bg-white lg:rounded"
          >
            CANCEL
          </button>
          <button
            type="submit"
            class="w-1/2 p-3 text-sm font-semibold tracking-widest primary lg:rounded"
          >
            CONTINUE
          </button>
        </div>
      </form>
    </div>
    <!-- <ul v-if="nwErr" class="mx-2">
      <li class="p-3 mb-2 bg-red-200 rounded" v-for="(e,ix) in nwErr" :key="ix">{{e.message}}</li>
    </ul>
    <ul v-if="graphErr" class="mx-2">
      <li class="p-3 mb-2 bg-red-200 rounded" v-for="(e,ix) in graphErr" :key="ix">{{e.message}}</li>
    </ul>-->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Avatar, Heading, ImageUpload } from '~/shared/components'
import {
  Textbox,
  Textarea,
  Checkbox,
  CheckboxLight,
} from '~/shared/components/ui'
import me from '~/gql/user/me.gql'

import { location } from '~/shared/mixins'
export default {
  middleware: ['isAuth', 'geo'],
  mixins: [location],
  data() {
    return {
      a: {},
      profile: {},
      nwErr: null,
      graphErr: null,
    }
  },
  components: {
    Heading,
    Textbox,
    Textarea,
    Checkbox,
    ImageUpload,
    Avatar,
    CheckboxLight,
  },
  computed: {
    // user() {
    //   return (this.$store.state.auth || {}).user || null;
    // }
  },
  async mounted() {
    try {
      this.$store.commit('clearErr')
      const user = (
        await this.$apollo.query({ query: me, fetchPolicy: 'no-cache' })
      ).data.me
      this.profile = { ...user }
      this.a = this.$cookies.get('geo')
      if (!this.a) {
        this.$router.push('/onboarding')
        return
      }
      this.profile.address = this.profile.address || {}
      this.a.address =
        this.profile.address.address || (this.a && this.a.address)
      this.a.district =
        this.profile.address.district || (this.a && this.a.district)
      this.a.city = this.profile.address.city || (this.a && this.a.city)
      this.a.zip = (
        this.profile.address.zip ||
        (this.a && this.a.zip)
      ).toString()
      this.a.firstName =
        this.profile.address.firstName || this.profile.firstName
      this.a.lastName = this.profile.address.lastName || this.profile.lastName
      this.a.phone = this.profile.phone
      // if (!this.profile.info) this.profile.info = {};
      // this.profile.public = this.profile.info.public || false;
      // this.profile.restaurant = this.profile.info.restaurant;
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
  },
  methods: {
    saveImage(name, image) {
      this.profile.avatar = image
      this.saveProfile()
    },
    removeImage(name) {
      this.profile.avatar = ''
      this.saveProfile()
    },
    ...mapActions({
      updateProfile: 'auth/updateProfile',
    }),
    go(url) {
      this.$router.push(url)
    },
    submit() {
      try {
        this.saveProfile()
        this.$router.push('/my')
      } catch (e) {}
    },
    async saveProfile() {
      try {
        this.$store.commit('clearErr')
        // this.profile.restaurant = this.profile.info.restaurant;
        // this.profile.public = !!this.profile.info.public;
        // this.profile.address = this.a;
        delete this.profile.address.__typename
        delete this.profile.info.__typename
        return await this.updateProfile(this.profile)
      } catch (e) {
        this.$store.commit('setErr', e, { root: true })
      } finally {
      }
    },
  },
  layout: 'none',
}
</script>

<style scoped>
/* form */
form {
  display: inline-block;
}
.field {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
}
/* label {
  order: -1;
  padding-left: 5px;
  font-size: 14px;
  transition: all 0.3s ease-in;
  transform: translateY(30px);
  pointer-events: none;
} */
input:focus + label,
textarea:focus + label {
  transform: translateY(16px);
}
/* form ends */
</style>
