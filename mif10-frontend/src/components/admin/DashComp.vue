<template>
  <!-- Modals -->
  <a-modal
    :open="openGenericModal"
    @ok="handleOk(modalType)"
    @cancel="handleCancel(modalType)"
  />
  <airport-modal v-model:open="showAirportModal"/>
  <flight-modal :open="showFlightModal"/>
  <user-modal :open="showUserModal"/>
  <!-- Content -->
  <a-layout class="layout">
    <a-layout-header class="header">
      <a-row justify="space-between" align="middle">
        <a-col :span="4">
          <a-avatar size="large" icon="user" />
          <span class="username">NOM PRENOM</span>
        </a-col>
        <a-col :span="4" class="actions">
          <a-button>Se déconnecter</a-button>
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
              <a-button type="primary" @click="showModal">Ajouter</a-button>
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

              <!-- Utilisez item pour accéder aux données du vol ici -->
              <a-space>
                <a-button @click="showModal(airport)">Modifier</a-button>
                <a-button @click="showDeleteModal(airport)" danger>Supprimer</a-button>
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

              <!-- Utilisez item pour accéder aux données du vol ici -->
              <a-space>
                <a-button @click="showModal(airport)">Modifier</a-button>
                <a-button @click="showDeleteModal(airport)" danger>Supprimer</a-button>
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
                <a-button @click="showModal(airport)">Modifier</a-button>
                <a-button @click="showDeleteModal(airport)" danger>Supprimer</a-button>
              </a-space>
            </a-list-item>
          </a-list>

        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { Airports, Flights, Users } from '@/api';
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
      showAirportModal: undefined,
      showFlightModal: false,
      showUserModal: false,
      searchTimeout: null,
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
    // Shows a the modal for the current selected list type, if item is empty, it causes a "add" modal, else an "edit" modal
    showModal() {
      switch (this.selectedList) {
        case "Aeroports":
          this.showAirportModal = null;
          break
        case "Vols":
          this.showFlightModal = true;
          break
      }
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
