<template>
   <main class="p-4">
      <div id="title">
         <h2 style="font-weight: 700;">Produtos</h2>
         <button type="button" class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#staticBackdrop">Adicionar</button>
      </div>

      <table class="table table-hover">
         <thead>
            <tr>
               <th scope="col">#</th>
               <th scope="col">Nome</th>
               <th scope="col">Descrição</th>
               <th scope="col">Código de barras</th>
               <th scope="col">Preço</th>
               <th scope="col">Medida</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="prod in dados.produtos">
               <th scope="row">{{ prod.id }}</th>
               <td>{{ prod.name }}</td>
               <td>{{ prod.description }}</td>
               <td>{{ prod.barcode }}</td>
               <td>{{ prod.price }}</td>
               <td>{{ prod.unmedida.value }}</td>
            </tr>
         </tbody>
      </table>
   </main>
   <ProductModal />
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import http from '@/services/http.js';
import { toast } from 'vue3-toastify';
import ProductModal from '@/components/product/ProductModal.vue'

let dados = reactive({
   produtos: []
});

onMounted(() => {
   refresh();
})

async function refresh() {
   try {
      const { data } = await http.get("/product");
      dados.produtos = data;
   } catch (e) {
      console.log(e)
      toast.error("Erro ao buscar produtos")
   }
}


</script>

<style scoped>
#title {
   height: 60px;
   padding: 0.6em;
   display: flex;
   justify-content: space-between;
   border: 2px solid;
   border-radius: 6px;
   border-color: darkgray;
}
</style>