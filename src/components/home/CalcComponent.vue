<template>
  <div>
    <div class="calc-component">
      <div class="calc-component-header">
        <h2>Calcule o valor de suas ligações gratuitamente</h2>
        <hr />
      </div>
      <b-form>
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group>
              <b-form-select
                v-model="sourceCod"
                :options="optionsSourceCod"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group>
              <b-form-select
                v-model="destinyCod"
                :options="optionsDestinyCod"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group>
              <b-form-select
                v-model="plan"
                :options="optionsPlan"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group>
              <b-form-input
                v-model.number="minutos"
                type="number"
                placeholder="Minutos de ligação"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-button class="float-right mt-2" variant="info" @click="calculateCall"
          >Calcular</b-button
        >
        <b-button
          class="float-right mr-2 mt-2"
          variant="secondary"
          @click="formClear"
          >Limpar</b-button
        >
      </b-form>
    </div>
    <div class="result-components" v-if="calcReady">
      <ResultComponent
        class="result-component-element"
        title="Valor sem FaleMais"
        :value="totalValueWithoutPlan"
        colorComponent="#ff3300"
        colorFont="#fff"
        resultType="semFaleMais"
      />
      <ResultComponent
        title="Valor com FaleMais"
        :value="totalValueWithPlan"
        colorComponent="#00ff99"
        colorFont="#000"
        resultType="comFaleMais"
      />
    </div>
    <b-alert :show="showAlert" variant="danger" class="mt-3">{{
      error
    }}</b-alert>
  </div>
</template>

<script>
import ResultComponent from "./ResultComponent.vue";
import {
  calcCallPriceWithFM,
  calcCallPriceWithoutFM
} from "@/service/CallService.js";
export default {
  data() {
    return {
      minutos: null,
      sourceCod: null,
      destinyCod: null,
      plan: null,
      totalValueWithPlan: "",
      totalValueWithoutPlan: "",
      calcReady: false,
      showAlert: false,
      error: "",
      optionsSourceCod: [
        { value: null, text: "Selecione o código de origem" },
        { value: "011", text: "011" },
        { value: "016", text: "016" },
        { value: "017", text: "017" },
        { value: "018", text: "018" }
      ],
      optionsDestinyCod: [
        { value: null, text: "Selecione o código de Destino" },
        { value: "011", text: "011" },
        { value: "016", text: "016" },
        { value: "017", text: "017" },
        { value: "018", text: "018" }
      ],
      optionsPlan: [
        { value: null, text: "Selecione um plan FaleMais" },
        { value: "FaleMais 30", text: "FaleMais 30" },
        { value: "FaleMais 60", text: "FaleMais 60" },
        { value: "FaleMais 120", text: "FaleMais 120" }
      ]
    };
  },
  props: ["title"],
  components: {
    ResultComponent
  },
  methods: {
    calculateCall() {
      var errors = this.validateForm();
      if (errors === undefined || errors.length === 0) {
        this.calcReady = true;

        if (this.showAlert) this.showAlert = false;

        this.totalValueWithPlan = calcCallPriceWithFM(
          this.sourceCod,
          this.destinyCod,
          this.plan,
          this.minutos
        );
        this.totalValueWithoutPlan = calcCallPriceWithoutFM(
          this.sourceCod,
          this.destinyCod,
          this.minutos
        );
      } else {
        this.error = errors[0];

        this.showAlert = true;

        if (this.calcReady) this.calcReady = false;
      }
    },
    validateForm() {
      var error = [];

      console.log(this.sourceCod, this.destinyCod, this.minutos);

      if (this.sourceCod === undefined || this.sourceCod === null)
        error.push("Selecione o código de origem para continuar");
      if (this.destinyCod === undefined || this.destinyCod === null)
        error.push("Selecione o código de destino para continuar");
      if (this.minutos === undefined || this.minutos === null)
        error.push("Preencha o campo de minutos para continuar");
      if (!this.isInt(this.minutos) && !this.isFloat(this.minutos))
        error.push("Preencha o campo de minutos somente com números");

      return error;
    },
    formClear() {
      this.sourceCod = null;
      this.destinyCod = null;
      this.plan = null;
      this.minutos = null;
      this.calcReady = false;
      this.showAlert = false;
    },
    isInt(n) {
      return Number(n) === n && n % 1 === 0;
    },
    isFloat(n) {
      return Number(n) === n && n % 1 !== 0;
    }
  }
};
</script>

<style>
.calc-component {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 750px;
  background-color: white;
}

.calc-component-header h2 {
  color: #777;
  margin-top: 5px;
  font-size: 1.3rem;
}

.result-components {
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;
  max-width: 750px;
}

@media (min-width: 576px) {
  .result-component-element {
    margin-right: 30px;
  }
}
</style>
