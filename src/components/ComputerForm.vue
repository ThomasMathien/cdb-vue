<template>
    <v-dialog 
      v-model="dialog"
      persistent
      max-width="600px">
        <v-card>
            <v-card-title>
                Computer Form
            </v-card-title>
            <v-btn @click="dialog = false">
                Close
            </v-btn>
        </v-card>
    </v-dialog>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data () {
        return {
            dialog: true,
        }
    }
  }
</script>
