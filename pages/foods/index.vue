<template>
  <div>
    <Heading title="My Dishes" />
    <ApolloQuery :query="require('~/gql/user/me.gql')">
      <template v-slot="{ result: { error, data }, isLoading }">
        <div v-if="isLoading">Loading........</div>
        <ErrComponent v-else-if="error" :error="error" />
        <div class="container" v-else-if="data && data.me && data.me.verified">
          <!-- <button
        class="button-lg blue"
        style="margin-bottom:20px"
        @click="go('/my/food/dishes/new')"
          >Add New</button>-->
          <!-- <v-pagination
        v-if="noOfPages>1"
        v-model="currentPage"
        @input="changePage(currentPage)"
        :length="noOfPages"
        :total-visible="10"
        circle
          ></v-pagination>-->
          <Search />
          <div class="flex flex-wrap mx-1 mt-2">
            <ApolloQuery
              :query="require('~/gql/product/products.gql')"
            >
              <template v-slot="{ result: { error, data }, isLoading }">
                <div v-if="isLoading">Loading........</div>
                <ErrComponent v-else-if="error" :error="error" />
                <div v-else-if="data && data.products">
                  <div
                    v-for="p in data.products"
                    :key="p.id"
                    @click="go('/foods/' + p.id)"
                    class="w-1/2 mb-2 bg-gray-100 shadow"
                  >
                    <img v-lazy="p.img" class="w-full h-32 bg-cover border-b" />
                    <!-- <div class="delete-icon">
                    <v-icon>delete</v-icon>
                    </div>-->
                    <div class="p-3">
                      <div class="flex items-center justify-between">
                        <div class="text-red-500" v-if="p.stock > 0">
                          <span v-if="p.stock < 6">Only</span>
                          {{ p.stock }} left
                        </div>
                        <div class="text-green-500" v-else>Sold out</div>
                        <img
                          v-if="p.type == 'N'"
                          v-lazy="`/non-veg.png`"
                          class="w-5 h-5"
                        />
                        <img v-else v-lazy="`/veg.png`" class="w-5 h-5" />
                      </div>
                      <div class="p-name">{{ p.name }}</div>
                    </div>
                  </div>
                </div>
                <nuxt-link class="top-0 mt-1 fab" to="/foods/new">
                  <PlusIcon aria-hidden="true" />
                </nuxt-link>
              </template>
            </ApolloQuery>
          </div>
        </div>
        <div
          v-else
          class="flex flex-col items-center justify-center text-center align-middle mx-atuo h-72"
        >
          <ClockIcon
            class="mb-2 text-gray-700 text-primary"
            style="font-size: 4rem;"
          />
          You must be verified by admin to add new Dish
        </div>
      </template>
    </ApolloQuery>
    <StickyFooter />
  </div>
</template>
<script>
import { Heading, Search } from '~/shared/components'
import StickyFooter from '~/components/StickyFooter'
import { query, search, pagination } from '~/shared/mixins'
import { ClockIcon, PlusIcon } from 'vue-feather-icons'
// import getProducts from '~/gql/product/products.gql'
// import me from '~/gql/user/me.gql'

export default {
  middleware: 'isAuth',
  mixins: [query, search, pagination],
  components: { Heading, Search, StickyFooter, ClockIcon, PlusIcon },

  data() {
    return {
      loading: false,
      error: null,
      // products: null,
      user: null,
    }
  },
  async mounted() {
    // try {
    // this.$store.commit('clearErr')
    //     const { loading, error, data } = await this.$apollo.query({
    //       query: getProducts,
    //     })
    // const user = (await this.$apollo.query({ query: me })).data.me
    //     this.products = data.products
    //     this.loading = loading
    //     this.error = error
    //     this.user = user
    // } catch (e) {
    //   this.$store.commit('setErr', e)
    // } finally {
    //   this.$store.commit('busy', false)
    // }
  },
  layout: 'none',
  head() {
    return {
      title: 'Post Your Food',
    }
  },
}
</script>
<style scoped>
.big-button {
  text-transform: initial;
  color: #fff;
  background: linear-gradient(87deg, #fb6340 0, #da1c5f 100%) !important;
  border-color: #fb6340;
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 100%;
  display: block;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  padding: 7px;
  outline: none;
  font-family: Karla, Roboto, sans-serif;
}
.big-button .loading {
  -webkit-animation: fadeIn 3s infinite;
  -moz-animation: fadeIn 3s infinite;
  -o-animation: fadeIn 3s infinite;
  animation: fadeIn 3s infinite;
}
.listingcard {
  /* height: 29vh;  */
  border-radius: 0.2rem;
  background-color: rgb(247, 247, 247);
  display: flex;
  justify-content: center;
  margin: 0.2rem;
  box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.175) !important;
  width: 156px;
}
@media (min-width: 650px) {
  .listingcard {
    height: 22vh;
  }
}
.backgroundimg {
  border-radius: 0.3rem 0.3rem 0 0;
  min-height: 126px;
  /* box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.175) !important; */
}

.a-listing {
  display: flex;
  flex-direction: column;
}
.p-name {
  line-height: 1.2rem;
}
.align-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: space-evenly; */
}
/* @media (min-width:300px) and (max-width:800px ) {
     .align-row{
        display: flex;
    flex-direction: row;
    } 
    } */
.name {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.pinky {
  color: rgb(255, 0, 104);
  letter-spacing: 1px;
}

/* .time {
  font-size: 0.8rem;
  color: #eee;
} */
.delete-icon {
  margin-top: -9rem;
  margin-left: 8rem;
}
.greenclr {
  color: green;
}
</style>
