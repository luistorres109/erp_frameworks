<template>
   <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-mg modal-fullscreen-lg-down">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="staticBackdropLabel">Cadastrar Produto</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               <form @submit.prevent>
                  <div class="row">
                     <div class="col">
                        <div class="mb-3">
                           <label for="Inputname" class="form-label">Nome</label>
                           <input type="text" class="form-control form-control-sm" id="Inputname">
                        </div>
                     </div>
                     <div class="col">
                        <div class="mb-3">
                           <label for="Inputbarcode" class="form-label">Código de barras</label>
                           <input type="number" class="form-control form-control-sm" id="Inputbarcode">
                        </div>
                     </div>
                     <div class="col">
                        <div class="mb-3">
                           <label for="Inputbarcode" class="form-label">Preço</label>
                           <div class="input-group input-group-sm">
                              <span class="input-group-text">R$</span>
                              <input class="form-control form-control-sm" id="Inputbarcode" type="number" step="0.1"
                                 style="-webkit-appearance: none;-moz-appearance: textfield;" v-model="money" min="0.01">
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="mb-3">
                     <label for="InputDescricao" class="form-label">Descrição</label>
                     <textarea class="form-control form-control-sm" id="InputDescricao" rows="3"></textarea>
                  </div>

               </form>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
               <button type="button" class="btn btn-primary">Salvar</button>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import { ref } from 'vue';


const money = ref(0);

</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
   -webkit-appearance: none;
   margin: 0;
   text-align: end;
}
</style>