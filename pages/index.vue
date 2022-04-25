<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Welcome to the Subscriber Manager for MailerLite
        </v-card-title>
        <v-card-actions>
          <v-btn color="primary" nuxt to="/subscribers">
            Browse Subscribers
          </v-btn>
          <v-spacer />
          <v-btn color="primary" nuxt to="/fields"> Browse Fields </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
