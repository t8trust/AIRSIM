<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <a-row justify="space-between" align="middle">
        <a-col :span="4">
          <a-avatar size="large" icon="user" />
          <span class="username">NOM PRENOM</span>
        </a-col>
        <a-col :span="4" class="actions">
          <a-button @click="showModal('logout')">Se déconnecter</a-button>
          <a-button @click="showModal('editProfile')">Modifier profil</a-button>
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
              />
            </a-col>
            <a-col :span="4" class="add-button">
              <a-button type="primary" @click="showModal('add')">Ajouter</a-button>
            </a-col>
          </a-row>
          <a-list
              item-layout="horizontal"
              :data-source="airports"
              class="list"
          >
            <a-list-item
                v-for="(airport, index) in airports"
                :key="index"
            >
              <a-list-item-meta
                  :title="airport.nom"
                  :description="airport.pays + ', ' + airport.ville"
              />

              <!-- Utilisez item pour accéder aux données du vol ici -->
              <a-space>
                <a-button @click="showModal('edit', airport)">Modifier</a-button>
                <a-button @click="showDeleteModal(airport)" danger>Supprimer</a-button>
              </a-space>
            </a-list-item>
          </a-list>

        </a-col>
      </a-row>
      <!-- Modals -->
      <a-modal
          v-for="modalType in Object.keys(modals)"
          :key="modalType"
          :visible="modals[modalType].visible"
          @ok="handleOk(modalType)"
          @cancel="handleCancel(modalType)"
      >
        <!-- The content of the modal can be customized here -->
        <template #title>
          <span>{{ modals[modalType].title }}</span>
        </template>
        <p v-if="modalType === 'delete'">
          Voulez-vous vraiment supprimer ce vol ?
          <br>
        </p>
        <p v-else>
          Content for {{ modalType }} modal
        </p>
      </a-modal>
      <!-- Modal for adding a flight -->
      <a-modal
          v-model:visible="modals.add.visible"
          title="Ajouter un vol"
          @ok="handleAddFlight"
          @cancel="handleCancel('add')"
      >
        <a-form model="flightForm">
          <a-form-item label="Aéroport départ">
            <a-select v-model:value="flightForm.departureAirport" placeholder="Aéroport départ">
              <a-select-option value="airport1">Airport 1</a-select-option>
              <!-- More options -->
            </a-select>
          </a-form-item>
          <a-form-item label="Pays départ" v-if="isNewAirport">
            <a-input v-model:value="flightForm.departureCountry" placeholder="Pays départ"></a-input>
          </a-form-item>
          <a-form-item label="Aéroport arrivée">
            <a-select v-model:value="flightForm.arrivalAirport" placeholder="Aéroport arrivée">
              <a-select-option value="airport2">Airport 2</a-select-option>
              <!-- More options -->
            </a-select>
          </a-form-item>
          <a-form-item label="Pays arrivée" v-if="isNewAirport">
            <a-input v-model:value="flightForm.arrivalCountry" placeholder="Pays arrivée"></a-input>
          </a-form-item>
        </a-form>
      </a-modal>

      <!-- Modal for editing a flight -->
      <a-modal
          :visible="modals.edit.visible"
          title="Modifier un vol"
          @ok="handleEditFlight"
          @cancel="handleCancel('edit')"
      >
        <a-form model="flightForm">
          <a-form-item label="Aéroport départ">
            <a-select v-model:value="flightForm.departureAirport" placeholder="Aéroport départ">
              <a-select-option value="airport1">Airport 1</a-select-option>
              <!-- More options -->
            </a-select>
          </a-form-item>
          <a-form-item label="Pays départ" v-if="isNewAirport">
            <a-input v-model:value="flightForm.departureCountry" placeholder="Pays départ"></a-input>
          </a-form-item>
          <a-form-item label="Aéroport arrivée">
            <a-select v-model:value="flightForm.arrivalAirport" placeholder="Aéroport arrivée">
              <a-select-option value="airport2">Airport 2</a-select-option>
              <!-- More options -->
            </a-select>
          </a-form-item>
          <a-form-item label="Pays arrivée" v-if="isNewAirport">
            <a-input v-model:value="flightForm.arrivalCountry" placeholder="Pays arrivée"></a-input>
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- Modal for editing user profile -->
      <a-modal
          v-model:visible="modals.editProfile.visible"
          title="Modifier le profil"
          @ok="handleEditProfile"
          @cancel="handleCancel('editProfile')"
      >
        <a-form model="userProfileForm">
          <a-form-item label="Nom d'utilisateur">
            <a-input v-model:value="userProfileForm.username" placeholder="Entrez votre nom d'utilisateur"></a-input>
          </a-form-item>
          <a-form-item label="Mot de passe">
            <a-input-password v-model:value="userProfileForm.password" placeholder="Entrez votre nouveau mot de passe"></a-input-password>
          </a-form-item>
        </a-form>
      </a-modal>

    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      currentItem: null,
      data: [
        { title: 'Item 1' },
        { title: 'Item 2' },
      ],
      userProfileForm: {
        username: '',
        password: '',
      },
      flightModal: {
        visible: false,
        title: 'Ajouter un vol',
        isEditMode: false
      },
      modals: {
        add: { visible: false, title: 'Ajouter un élément' },
        edit: { visible: false, title: 'Modifier un élément' },
        delete: { visible: false, title: 'Suppression' },
        logout: { visible: false, title: 'Se déconnecter' },
        editProfile: { visible: false, title: 'Modifier le profil' },
      },
      flightForm: {

        departureAirport: 'paris',
        departureCountry: '',
        arrivalAirport: 'lyon',
        arrivalCountry: ''
      },
      airports: [
        { iata: "ABC", nom: "Airport 1", pays: "Country 1", ville: "City 1" },
        { iata: "DEF", nom: "Airport 2", pays: "Country 2", ville: "City 2" },
        // Add more airports as needed
      ],
      isNewAirport: true,
    };
  },
  methods: {
    showModal(modalType, item) {
      if (item) {
        this.currentItem = item;
      }
      if (modalType === 'edit' && item) {
        this.flightForm = { ...item }; // Make a copy of the item to edit
        this.currentItemIndex = this.data.indexOf(item); // Save the index to update the correct item later
      } else {
        this.resetFlightForm(); // Reset the form when adding a new flight
      }
      this.modals[modalType].visible = true;
    },
    showDeleteModal(item) {
      this.currentItem = item;
      this.showModal('delete');
    },
    handleOk(modalType) {
      console.log(modalType, 'OK Clicked!');
      if (modalType === 'delete') {
        const index = this.data.findIndex(item => item === this.currentItem);
        if (index !== -1) {
          this.data.splice(index, 1);
        }
      }
      this.modals[modalType].visible = false;
    },
    handleCancel(modalType) {
      console.log(modalType, 'Cancel Clicked!');
      this.modals[modalType].visible = false;
    },
    handleAddFlight() {
      // Logic to add a flight
      console.log('Adding flight:', this.flightForm);
      this.modals.add.visible = false;
      // Reset form after submission
      this.flightForm = {
        departureAirport: null,
        departureCountry: '',
        arrivalAirport: null,
        arrivalCountry: ''
      };
    },
    handleEditFlight() {
      if (this.currentItemIndex !== null) {
        // Directly assign the updated object to the array at the current index
        this.data[this.currentItemIndex] = { ...this.flightForm };
        // Close the edit modal
        this.modals.edit.visible = false;
        // Optionally reset the form and current item index
        this.resetFlightForm();
        this.currentItemIndex = null;
      } else {
        console.error('No flight selected to edit.');
      }
    },
    handleEditProfile() {
      console.log('Profile updated:', this.userProfileForm);
      // Ici, vous devez ajouter la logique pour actualiser les informations de l'utilisateur
      this.modals.editProfile.visible = false;
    },

    resetFlightForm() {
      this.flightForm = {
        departureAirport: '',
        departureCountry: '',
        arrivalAirport: '',
        arrivalCountry: ''
      };
    },
    currentItemIndex: null,
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
