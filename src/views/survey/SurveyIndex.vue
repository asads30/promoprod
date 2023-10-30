<template>
  <div class="servey">
    <div style="height: 70px; max-height: 70px; overflow: hidden">
      <Header :left="false" :right="false" :center="true" :centerText="$t('survey.header_title')"/>
    </div>
    <div class="survey-status" v-for="question in currentQuestion" :key="question.id">
      <Modal
          :btnName="$t('completeModalSurvey.btnName')"
          v-show="isModalEndVisible"
          @close="closeEndModal"
      >
        <template v-slot:header>
          <img src="@/assets/images/survey/end-survey.svg" loading="lazy" class="header-end-image" alt="">
          <p class="header-text">{{ $t('completeModalSurvey.title') }}</p>
          <div class="border-header"></div>
        </template>
        <template v-slot:body>
          <p class="modal-body-content">
            {{ $t('completeModalSurvey.description') }}
          </p>
        </template>
        <template v-slot:footer></template>
      </Modal>
      <div class="question-stats">
        <p class="question-item">{{$t('survey.question')}} {{question.id }}/ </p>
        <p class="question-total">{{ questionsList?.length || '-' }}</p>
      </div>
      <div class="myProgress">
        <div class="myBar" :style="{width: Math.round(($route.params.id / questionsList?.length)*100) + '%'}"></div>
      </div>
    <div class="wrapper">
      <template v-if="question?.input_type?.key === 'radio'">
        <div>
        <div class="questions">
          <p>{{ question.id}}.</p>
          <p v-if="$i18n.locale == 'en'">{{ question.question_en }}</p>
          <p v-if="$i18n.locale == 'ru'">{{ question.question_ru }}</p>
          <p v-if="$i18n.locale == 'uz'">{{ question.question_uz }}</p>
        </div>
        <div v-for="questionData in question.options" :key="questionData.id">
          <div class="radio-wrapper" :class="{ 'checked-border': questionData.id === radioAnswerData.option_id }">
            <input @change="sendAnswerRadioData(questionData.question_id)" style="width: 24px; height: 24px" class="radio-custom" :id="questionData.id" v-model="radioAnswerData.option_id" :value="questionData.id" name="radio" type="radio">
            <label v-if="$i18n.locale == 'en'" style="width: calc(100% - 24px); height: calc(100% - 24px)" :for="questionData.id" class="radio-label">{{ questionData?.option_en }}</label>
            <label v-if="$i18n.locale == 'ru'" style="width: calc(100% - 24px); height: calc(100% - 24px)" :for="questionData.id" class="radio-label">{{ questionData?.option_ru }}</label>
            <label v-if="$i18n.locale == 'uz'" style="width: calc(100% - 24px); height: calc(100% - 24px)" :for="questionData.id" class="radio-label">{{ questionData?.option_uz }}</label>
          </div>
        </div>
        </div>
        <div class="next-btn-container">
          <button
              @click.once="nextPage('radio')"
              :disabled="!radioAnswerData.option_id"
              :class="radioAnswerData.option_id  ? 'next-btn-active' : 'next-btn-disabled'"
              aria-label="Close modal"
              type="button"
          >
            {{checkLastQuestion ? $t('survey.lastBtn') : $t('survey.stepBtn')}}
          </button>
        </div>
      </template>
      <template v-else-if="question?.input_type?.key === 'checkbox'">
        <div>
        <div class="questions">
          <p>{{ question.id }}.</p>
          <p v-if="$i18n.locale == 'en'">{{ question.question_en }}</p>
          <p v-if="$i18n.locale == 'ru'">{{ question.question_ru }}</p>
          <p v-if="$i18n.locale == 'uz'">{{ question.question_uz }}</p>
        </div>
        <div class="checkbox-wrapper" :class="{ 'checked-border': checkBoxAnswerData.option_ids?.includes(questionVariant.id)}" v-for="questionVariant in question.options" :key="questionVariant.id">
          <input @change="sendAnswerCheckBoxData(questionVariant.question_id)" type="checkbox" :id="questionVariant.id" :value="questionVariant.id" name="checkbox" v-model="checkBoxAnswerData.option_ids">
          <label style="width: 100%" v-if="$i18n.locale == 'en'" :for="questionVariant.id" :data-content="questionVariant.option_en">{{ questionVariant.option_en }}</label>
          <label style="width: 100%" v-if="$i18n.locale == 'ru'" :for="questionVariant.id" :data-content="questionVariant.option_ru">{{ questionVariant.option_ru }}</label>
          <label style="width: 100%" v-if="$i18n.locale == 'uz'" :for="questionVariant.id" :data-content="questionVariant.option_uz">{{ questionVariant.option_uz }}</label>
        </div>
        </div>
        <div class="next-btn-container">
          <button
              @click.once="nextPage('checkbox')"
              :disabled="!checkBoxAnswerData.option_ids?.length"
              :class="checkBoxAnswerData.option_ids?.length ? 'next-btn-active' : 'next-btn-disabled'"
              aria-label="Close modal"
              type="button"
          >
            {{checkLastQuestion ? $t('survey.lastBtn') : $t('survey.stepBtn')}}
          </button>
        </div>
      </template>
      <template v-else-if="question?.input_type?.key === 'input'">
        <div class="questions">
          <p>{{ question.id }}.</p>
          <p v-if="$i18n.locale == 'en'">{{ question.question_en }}</p>
          <p v-if="$i18n.locale == 'ru'">{{ question.question_ru }}</p>
          <p v-if="$i18n.locale == 'uz'">{{ question.question_uz }}</p>
        </div>
        <form class="input-wrapper" @submit.prevent.once="nextPage('input', question.id)"
        >
          <input ref="inputText" class="input-text" v-model="inputAnswerData.text" type="text" pattern="^[^\s]+(\s+[^\s]+)*$" title="Минимальное количество символов 5, Пробелов в начале и конце поля" inputmode="text" placeholder="Введите свой ответ..." maxlength="140" minlength="5">
          <img class="img-cancel" @click="clearTextInput" src="@/assets/images/survey/cancel-var.svg" alt="">
          <div class="next-btn-container">
            <button
                :disabled="!inputAnswerData.text"
                :class="inputAnswerData.text?.length >=5 ? 'next-btn-active' : 'next-btn-disabled'"
                aria-label="Close modal"
                type="submit"
            >
              {{checkLastQuestion ? $t('survey.lastBtn') : $t('survey.stepBtn')}}
            </button>
          </div>
        </form>
      </template>
    </div>
    </div>
  </div>
</template>

<script setup>
import {computed, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {getCookie} from "@/boot/util";
import Header from "@/components/Header.vue";
import Modal from "@/components/Modal.vue";

const route = useRoute();
const store = useStore();
const router = useRouter();

const isModalEndVisible = ref(false);
const inputText = ref(null);

const radioAnswerData = reactive({
  question_id: null,
  option_id: null,
})
const checkBoxAnswerData = reactive({
  question_id: null,
  option_ids: [],
})
const inputAnswerData = reactive({
  question_id: null,
  text: null,
})

const cookie = computed(()=> getCookie('web-session'))
const getWeb = computed(()=> store.getters.getWeb)
if(!store.state.questionsList?.length){
  const queryQuestionsList = (cookie.value) ? cookie.value : getWeb.value;
  store.dispatch('getQuestionsList', queryQuestionsList);
}

const questionsList = computed(()=> store.getters["getQuestionsList"]);
const routeId = ref(+route.params.id);
const currentQuestion = computed(()=> questionsList.value?.filter((question)=> question.id === +routeId.value));
const checkLastQuestion = computed(()=> questionsList.value?.length === routeId.value);

const clearTextInput = ()=> {
  inputAnswerData.text = null;
  // inputText.value.focus();
}

const closeEndModal = () => {
  isModalEndVisible.value = false
  if(store.state.endGuestSurvey){
    router.replace({name: 'ident'});
  } else {
    router.replace({name: 'home'});
  }
}

const sendAnswerRadioData = (questionId) => {
   radioAnswerData.question_id = questionId
}

const sendAnswerCheckBoxData = (questionId) => {
  checkBoxAnswerData.question_id = questionId
}

const nextPage = async (typeQuestion, inputTypeQuestionId= null)=> {
  if(checkLastQuestion.value){
    if(typeQuestion === 'radio'){
      const stateCopyRadio = { ...radioAnswerData}
      store.commit('setAnswerQuestion', stateCopyRadio)
      const data = {
        web_session: (cookie.value) ? cookie.value : getWeb.value,
        answers: store.state.answerQuestion
      }
      const request = {
        method: "POST",
        headers: {
          "Accept": 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
      fetch('https://promadm.click.uz/api/answer', request).then((response)=>{
        if(response.status === 200 && !store.state.guestCompletesSurvey){
          store.state.surveyPoolId = null;
          isModalEndVisible.value = true;
        } else {
          store.state.surveyPoolId = null;
          store.state.guestCompletesSurvey = false
          store.state.endGuestSurvey = true
          isModalEndVisible.value = true;
        }
      });
    }
    else if(typeQuestion === 'checkbox'){
      const stateCopyCheckboxCopy = { ...checkBoxAnswerData }
      store.commit('setAnswerQuestion', stateCopyCheckboxCopy)
      const data = {
        web_session: (cookie.value) ? cookie.value : getWeb.value,
        answers: store.state.answerQuestion
      }
      const request = {
        method: "POST",
        headers: {
          "Accept": 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
      fetch('https://promadm.click.uz/api/answer', request).then((response)=>{
        if(response.status === 200 && !store.state.guestCompletesSurvey){
          store.state.surveyPoolId = null;
          isModalEndVisible.value = true;
        }else {
          store.state.surveyPoolId = null;
          store.state.guestCompletesSurvey = false
          store.state.endGuestSurvey = true
          isModalEndVisible.value = true;
        }
      });
    }
    else if (typeQuestion === 'input') {
        inputAnswerData.question_id = inputTypeQuestionId
        const inputCopyAnswerData = { ...inputAnswerData }
        store.commit('setAnswerQuestion', inputCopyAnswerData)
        const data = {
          web_session: (cookie.value) ? cookie.value : getWeb.value,
          answers: store.state.answerQuestion
        }
        const request = {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
        fetch('https://promadm.click.uz/api/answer', request).then((response)=>{
          if(response.status === 200 && !store.state.guestCompletesSurvey){
            store.state.surveyPoolId = null;
            isModalEndVisible.value = true;
          }else {
            store.state.surveyPoolId = null;
            store.state.guestCompletesSurvey = false
            store.state.endGuestSurvey = true
            isModalEndVisible.value = true;
          }
        });
    }
  } else if(!checkLastQuestion.value) {
    if(typeQuestion === 'radio'){
      const stateCopyRadio = { ...radioAnswerData}
      await store.commit('setAnswerQuestion', stateCopyRadio)
    } else if(typeQuestion === 'checkbox'){
      const stateCopyCheckboxCopy = { ...checkBoxAnswerData }
      await store.commit('setAnswerQuestion', stateCopyCheckboxCopy)
    } else {
        inputAnswerData.question_id = inputTypeQuestionId
        const inputCopyAnswerData = { ...inputAnswerData }
        await store.commit('setAnswerQuestion', inputCopyAnswerData)
    }
    routeId.value += 1;
    router.replace({name: 'survey.index', params:{ id: routeId.value}})
    if(typeQuestion ==='radio'){
      radioAnswerData.question_id = null;
      radioAnswerData.option_id= null;
    } else if(typeQuestion === 'checkbox'){
      checkBoxAnswerData.question_id = null;
      checkBoxAnswerData.option_ids= [];
    } else {
      inputAnswerData.question_id = inputTypeQuestionId
      inputAnswerData.question_id = null;
      inputAnswerData.text = null;
    }
  }
}
</script>

<style lang="scss" scoped>
$white: #fff;
$color1: #34353F;
$color2: #0073FF;
.servey{
  //max-height: 100dvh;
  height: 100dvh;
  overflow: hidden;
}
.survey-status {
  width: 100vw;
  height: calc(100dvh - 70px);
  max-height: calc(100dvh - 70px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 6px 20px 20px;
  & .question-stats {
    p {
      margin: 0;
    }
    padding-bottom: 10px;
    display: flex;
    & .question-item {
      color: var(--text);
      font-family: Golos Text, sans-serif !important;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
    & .question-total {
      color: var(--survey-total-count);
      font-family: Golos Text, sans-serif !important;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  & .myProgress {
    width: 100%;
    border-radius: 100px;
    background-color: var(--progress-bar-backgorund);
    margin-bottom: 10px;
  }
  & .myBar {
    border-radius: 100px;
    height: 10px;
    background-color: #0073FF;
  }
}
.wrapper {
  overflow-y: auto;
  height: calc(100dvh - 70px);
  max-height: calc(100dvh - 70px);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  & .next-btn-container{
    & .next-btn-active {
      margin-top: 22px;
      border-radius: 10px;
      background: linear-gradient(0deg, #0073FF 0%, #00C2FF 100%), #FFF;
      height: 40px;
      line-height: 40px;
      border: 0;
      width: 100%;
      color: var(--btn-next-active);
      text-align: center;
      font-size: 14px;
      font-weight: 700;
    }
    & .next-btn-disabled{
      margin-top: 22px;
      border-radius: 10px;
      background: var(--survey-light-background);
      height: 40px;
      border: 0;
      width: 100%;
      color: var(--survey-btn-text-color);
      text-align: center;
      font-family: Golos Text,sans-serif!important;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }
}
.questions{
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  gap: 5px;
  color: var(--text);
  font-family: Golos Text,sans-serif!important;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.checkbox-wrapper{
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 12px;
  background: var(--survey-light-background);
  padding: 10px;
  margin-bottom: 10px;
  & .question-title{
    color: #B3B7CE;
    font-family: Golos Text,sans-serif!important;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  input[type="checkbox"] {
    position: relative;
    width: 24px;
    height: 24px;
    border: 1px solid #B3B7CE;
    border-radius: 5px;
    appearance: none;
    outline: 0;
    cursor: pointer;
    transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
    &::before {
      position: absolute;
      content: '';
      display: block;
      top: 3px;
      left: 7px;
      width: 7px;
      height: 12px;
      border-style: solid;
      border-color: $white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      opacity: 0;
    }
    &:checked {
      transition: all 250ms ease;
      color: $white;
      border-color:#0073FF;
      background: #0073FF;
      &::before {
        opacity: 1;
      }
      ~ label::before {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
    }
  }
  & label {
    position: relative;
    cursor: pointer;
    align-self: center;
    color: var(--text-label-question);
    font-family: Golos Text,sans-serif!important;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
.checked-border {
  border: 1px solid #0073FF;
}
.radio-wrapper {
  border-radius: 12px;
  background: var(--survey-light-background);
  padding: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 8px;
  input[type="radio"] {
    all: unset;
    width: 24px;
    height: 24px;
    content: '';
    background-color: var(--radio-background);
    border-radius: 100%;
    border: 1px solid #9395A5;
    transition: all 100ms ease;
  }
  input[type="radio"] + label{
    cursor: pointer;
    color: var(--text-label-question);
    font-family: Golos Text,sans-serif!important;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-right: 5px;
  }
  input[type="radio"]:checked {
    color: $white;
    font-family: Golos Text,sans-serif!important;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    transition: all 250ms ease;
    border: 1px solid #9395A5;
    background-color: $color2;
    box-shadow: inset 0 0 0 3.5px var(--radio-background);
  }
}
.input-wrapper{
  height: 100dvh;
  max-height: 100dvh;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  & .input-text {
    all: unset;
    width: calc(100% - 26px);
    height: 40px;
    position: relative;
    color: var(--text-label-question);
    font-family: Golos Text,sans-serif!important;
    font-size: 12px;
    padding-left: 12px;
    padding-right: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 135%;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.20);
    background: var(--survey-light-background);
    & :focus {
      all: unset;
      width: calc(100% - 26px);
      height: 40px;
      position: relative;
      padding-left: 12px;
      padding-right: 12px;
      color: var(--text-label-question);
      font-family: Golos Text,sans-serif!important;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 135%;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.20);
      background-color: #34353F;
    }
  }
  & .img-cancel{
    position: absolute;
    top: 12px;
    right: 10px;
    width: 16.67px;
    height: 16.67px;
  }
}
.header-end-image{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto 15px auto;
}
.header-image{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  margin: 20px auto 10px auto;
}
.header-text{
  margin: 0;
  color: #363845;
  text-align: center;
  font-family: 'Golos Text', sans-serif !important;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  white-space: break-spaces;
}
.border-header{
  margin: 15px 0;
  border: 1px solid rgba(0, 0, 0, 0.10);
}
.modal-body-content{
  color: #363845;
  text-align: center;
  font-family: Golos Text,sans-serif!important;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>