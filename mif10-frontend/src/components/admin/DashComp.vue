<template>
  <!-- Modals -->
  <a-modal
    v-model:open="genericModal.open"
    :title="genericModal.title"
    @ok="genericModal.onsuccess"
    @cancel="genericModal.onfail"
  >
    {{ genericModal.content }}
  </a-modal>

  <airport-modal v-model:open="airportModalData" @success="onAirportModalSuccess"/>
  <flight-modal v-model:open="flightModalData" @success="onFlightModalSuccess"/>
  <user-modal v-model:open="userModalData" @success="onUserModalSuccess"/>
  <!-- Content -->
  <a-layout class="layout">
    <a-layout-header class="header">
      <a-row justify="space-between" align="middle">
        <a-col :span="4">
          <a-avatar size="large" icon="user" />
          <span class="username">NOM PRENOM</span>
        </a-col>
        <a-col :span="4" class="actions">
          <a-button @click="showDisconnectModal">Se déconnecter</a-button>
          <a-button>Modifier profil</a-button>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content class="content">
      <a-row :gutter="16">
        <a-col :span="10" :offset="6">
          <a-row class="search-bar">
            <a-col :span="20">
              <a-input-search
                placeholder="Rechercher"
                enter-button
                @change="onSearch"
              />
            </a-col>
            <a-col :span="4" class="add-button">
              <a-button type="primary" @click="addOrUpdateItem()">Ajouter</a-button>
            </a-col>
          </a-row>

          
          <div style="margin-top: 1em;"> 
            <h2>Liste des {{selectedList}} Enregistrés </h2>
            <a-radio-group v-model:value="selectedList" style="margin-left: 1em;">
              <a-radio-button value="Aeroports">Aeroports</a-radio-button>
              <a-radio-button value="Vols">Vols</a-radio-button>
              <a-radio-button value="Utilisateurs">Administrateurs</a-radio-button>
            </a-radio-group>
          </div>

          <a-list
              v-if="selectedList == 'Aeroports'"
              item-layout="horizontal"
              :data-source="airports"
              class="list"
          >
            <a-list-item
                v-for="(airport, index) in airports"
                :key="index"
            >
              <a-list-item-meta>
              <template v-slot:title>
                <div style="display: flex;">
                  <div style="min-width: 20ch">{{ airport.nom }}</div>
                  <span style="color: gray">{{ airport.pays }} , {{ airport.ville }}</span>
                </div>
              </template>
              </a-list-item-meta>

              <a-space>
                <a-button @click="addOrUpdateItem(airport, index)">Modifier</a-button>
                <a-button @click="showDeleteAirportModal(airport, index)" danger>Supprimer</a-button>
              </a-space>
            </a-list-item>
          </a-list>

          <a-list
              v-if="selectedList == 'Vols'"
              item-layout="horizontal"
              :data-source="airports"
              class="list"
          >
            <a-list-item
                v-for="(vol, index) in vols"
                :key="index"
            >
              <a-list-item-meta>
                <template v-slot:title>
                <div style="display: flex;">
                  <div style="min-width: 25ch; max-width: 25ch">
                    <span>Départ: </span> 
                    {{ vol.depart.nom }}
                  </div>
                  <div style="color: gray">
                    {{ vol.depart.pays }} , {{ vol.depart.ville }}
                  </div>
                </div>
                <div style="display: flex;">
                  <div style="min-width: 25ch; max-width: 25ch">
                    <span>Arrivée: </span> 
                    {{ vol.destination.nom }}
                  </div>
                  <div style="color: gray">
                    {{ vol.destination.pays }} , {{ vol.destination.ville }}
                  </div>
                </div>
                </template>
              </a-list-item-meta>

              <a-space>
                <a-button @click="addOrUpdateItem(vol, index)">Modifier</a-button>
                <a-button @click="showDeleteFlightModal(vol, index)" danger>Supprimer</a-button>
              </a-space>
            </a-list-item>
          </a-list>

          <a-list
              v-if="selectedList == 'Utilisateurs'"
              item-layout="horizontal"
              :data-source="users"
              class="list"
          >
            <a-list-item
                v-for="(user, index) in users"
                :key="index"
            >
              <a-list-item-meta :title="user.login" description="Administrateur"></a-list-item-meta>

              <a-space>
                <a-button @click="addOrUpdateItem(user, index)">Modifier</a-button>
                <a-button @click="showDeleteUserModal(user, index)" danger>Supprimer</a-button>
              </a-space>
            </a-list-item>
          </a-list>

        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { Airports, Auth, Flights, Users } from '@/api';
import { InputSearch, Modal } from 'ant-design-vue';
import AirportModal from './modals/AirportModal.vue';
import FlightModal from './modals/FlightModal.vue';
import UserModal from './modals/UserModal.vue';

export default {
  components: {
    AInputSearch: InputSearch,
    AirportModal,
    AModal: Modal,
    FlightModal,
    UserModal
  },
  data() {
    return {
      airports: [],
      vols: [],
      users: [],
      selectedList: "Aeroports",
      airportModalData: undefined,
      flightModalData: undefined,
      userModalData: undefined,
      searchTimeout: null,
      genericModal: {
        open: false,
        title: "",
        content: "",
        onsuccess: null,
        onfail: null
      }
    };
  },
  async mounted() {
    this.getData("Aeroports", { limit: 10, page: 0 })
    this.getData("Utilisateurs", { limit: 10, page: 0 })
    this.getData("Vols", { limit: 10, page: 0 })
    // this.showFlightModal = true;
  },
  methods: {
    /** @param {import('ant-design-vue/es/_util/EventInterface').ChangeEvent} e */
    onSearch(e) {
      clearTimeout(this.searchTimeout)
      const currentList = this.selectedList
      this.searchTimeout = setTimeout(async () => {
        this.getData(currentList, { search: e.target.value, page: 0, limit: 10 })
      }, 500);
    },
    /**
     * @param {"Aeroports" | "Vols" | "Utilisateurs"} listType 
     * @param {*} params 
     */
    async getData(listType, params) {
      if (listType == "Aeroports")
        this.airports = await Airports.findAll(params)

      if (listType == "Utilisateurs")
        this.users = await Users.findAll(params)

      if (listType == "Vols") {
        const vols = await Flights.findAll(params)
        this.vols = await Promise.all(vols.map(async(vol) => {
          const promiseAeroport1 = Airports.findOne(vol.depart)
          const promiseAeroport2 = Airports.findOne(vol.destination)

          vol.depart = await promiseAeroport1;
          vol.destination = await promiseAeroport2;
          
          return vol
      }))
    }

    },
    // Shows a modal for the current selected list type, if item is empty, it causes a "add" modal, else an "edit" modal
    addOrUpdateItem(item, index) {
      // undefined = do not show modal, null = open with no input data 
      switch (this.selectedList) {
        case "Aeroports":
          this.airportModalData = item ? { airport: item, index } : null;
          break
        case "Vols":
          this.flightModalData = item ? { flight: item, index } : null;
          break
        case "Utilisateurs":
          this.userModalData = item ? { user: item, index } : null;
          break
      }
    },

    showDeleteAirportModal(airport, id){
      this.showGenericModal({
        title: "Suppression d'un vol",
        content: `Voulez vous vraiment supprimer l'aéroport : ${airport.nom} ?`,
        onsuccess: async () => {
          await Airports.delete(airport.iata)
          this.airports.splice(id, 1)
        }
      })
    },

    showDeleteUserModal(user, id){
      this.showGenericModal({
        title: "Suppression d'un utilisateur",
        content: `Voulez vous vraiment supprimer l'utilisateur au login : ${user.login} ?`,
        onsuccess: async () => {
          await Users.delete(user.login)
          this.users.splice(id, 1)
        }
      })
    },

    showDeleteFlightModal(vol, id){
      this.showGenericModal({
        title: "Suppression d'un vol",
        content: `Voulez vous vraiment supprimer le vol ${vol.depart.iata} : ${vol.depart.nom} vers ${vol.destination.iata} : ${vol.destination.nom} ?`,
        onsuccess: async () => {
          await Flights.delete(vol.id_vol)
          this.vols.splice(id, 1)
        }
      })
    },

    showDisconnectModal(){
      this.showGenericModal({
        title: "Déconnexion",
        content: "Voulez vous vraiment vous déconnecter ?",
        onsuccess: () => {
          Auth.disconnect();
          this.$router.push("/")
        }
      })
    },

    async onAirportModalSuccess(newItem, input){
      if (input){
        const id = input.airport.iata;
        await Airports.update(id, newItem)
        this.airports[input.index] = newItem
        return;
      }

      await Airports.create(newItem)
      this.airports.unshift(newItem);
    },

    async onFlightModalSuccess(newItem, input){
      const dbFlight = { ...newItem, depart: newItem.depart.iata, destination: newItem.destination.iata}

      if (input){
        const id = input.flight.id_vol;
        await Flights.update(id, dbFlight)
        this.vols[input.index] = newItem
        return;
      }

      await Flights.create(dbFlight)
      this.vols.unshift(newItem);
    },
    
    async onUserModalSuccess(newItem, input){
      if (input){
        const id = input.flight.id_vol;
        await Users.update(id, newItem)
        this.users[input.index] = newItem
        return;
      }

      await Users.create(newItem)
      this.users.unshift(newItem);
    },

    /**
     * @param {{title, content, onsuccess, onfail}} params 
     */
    showGenericModal(params){
      params.open = true;
      const {onsuccess, onfail} = params;
      params.onsuccess = () => { if (onsuccess) onsuccess(); this.genericModal.open = false }
      params.onfail = () => { if (onfail) onfail(); this.genericModal.open = false }
      this.genericModal = params;
    }
  },
};
</script>

<style scoped>
.layout {
  /* ... */
}

.header {
  background: #f0f2f5;
  padding: 0 24px;
}

.username {
  margin-left: 12px;
  font-weight: bold;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.content {
  padding: 24px;
}

.search-bar {
  width: 100%;
  margin-bottom: 24px;
}

.list {
  margin-bottom: 24px;
}

.add-button {
  display: flex;
  align-items: center;
}

</style>
