<template>
    <div>
        <div class="calc-component">
            <div class="calc-component-header">
                <h2>Calcule o valor de suas ligações gratuitamente</h2>
                <hr>
            </div>
            <b-form>
                <b-row>
                    <b-col md="6" sm="12">
                        <b-form-group>
                            <b-form-select v-model="codOrigem" :options="optionsCodOrigem"></b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col md="6" sm="12">
                        <b-form-group>
                            <b-form-select v-model="codDestino" :options="optionsCodDestino"></b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="6" sm="12">
                        <b-form-group>
                            <b-form-select v-model="plano" :options="optionsPlano"></b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col md="6" sm="12">
                        <b-form-group>
                            <b-form-input v-model.number="minutos" type="number" placeholder="Minutos de ligação"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-button class="float-right mt-2" variant="info" @click="calculateCall">
                    Calcular</b-button>
                <b-button class="float-right mr-2 mt-2" variant="secondary" @click="formClear">
                    Limpar</b-button>
            </b-form>
        </div>
        <div class="result-components" v-if="calculoRealizado">
            <ResultComponent class="result-component-element" title="Valor sem FaleMais" 
                :value="valorTotalSemFm" colorComponent="#ff3300" colorFont="#fff" resultType="semFaleMais" />
            <ResultComponent title="Valor com FaleMais" 
                :value="valorTotalComFm" colorComponent="#00ff99" colorFont="#000" resultType="comFaleMais" />
        </div>
        <b-alert :show="showAlert" variant="danger" class="mt-3">{{ erro }}</b-alert>
    </div>
</template>

<script>
import ResultComponent from './ResultComponent.vue'
import { calcCallPriceWithFM, calcCallPriceWithoutFM } from '@/service/CallService.js'
export default {
    name: 'component',
    data(){
        return{
            minutos: null,
            codOrigem: null,
            codDestino: null,
            plano: null,
            valorTotalComFm: '',
            valorTotalSemFm: '',
            calculoRealizado: false,
            showAlert: false,
            erro: '',
            optionsCodOrigem: [
                { value: null, text: 'Selecione o código de origem' },
                { text: '011' },
                { text: '016' },
                { text: '017' },
                { text: '018' }
            ],
            optionsCodDestino: [
                { value: null, text: 'Selecione o código de Destino' },
                { text: '011' },
                { text: '016' },
                { text: '017' },
                { text: '018' }
            ],
            optionsPlano: [
                { value: null, text: 'Selecione um plano FaleMais' },
                { text: 'FaleMais 30' },
                { text: 'FaleMais 60' },
                { text: 'FaleMais 120' }
            ]
        }
    },
    props: ['title'],
    components:{
        ResultComponent
    },
    methods:{
        calculateCall(){
            var erros = this.validateForm()
            if(erros === undefined || erros.length === 0){
                this.calculoRealizado = true
                
                if(this.showAlert)
                    this.showAlert = false

                this.valorTotalComFm = calcCallPriceWithFM(this.codOrigem, this.codDestino, this.plano, this.minutos)
                this.valorTotalSemFm = calcCallPriceWithoutFM(this.codOrigem,this.codDestino,this.minutos)
            }else{
                this.erro = erros[0]

                this.showAlert = true

                if(this.calculoRealizado)
                    this.calculoRealizado = false
            }
        },
        validateForm(){
            var error = []

            if(this.codOrigem === undefined || this.codOrigem === null)
                error.push("Selecione o código de origem para continuar")
            if(this.codDestino === undefined || this.codDestino === null)
                error.push("Selecione o código de destino para continuar")
            if(this.minutos === undefined || this.minutos === null)
                error.push("Preencha o campo de minutos para continuar")
            if(!this.isInt(this.minutos) && !this.isFloat(this.minutos))
                error.push("Preencha o campo de minutos somente com números")

            return error
        },
        formClear(){
            this.codOrigem = null
            this.codDestino = null
            this.plano = null
            this.minutos = null
            this.calculoRealizado = false
            this.showAlert = false
        },
        isInt(n){
            return Number(n) === n && n % 1 === 0;
        },
        isFloat(n){
            return Number(n) === n && n % 1 !== 0;
        }
    }
}
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

.calc-component-header h2{
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

@media (min-width: 576px){
    .result-component-element {
        margin-right: 30px;
    }
}
</style>
