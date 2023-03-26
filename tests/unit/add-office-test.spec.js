import {shallowMount, createLocalVue, mount} from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import AddOffice from '../../src/components/add-office'
import EditOffice from '../../src/components/edit-office'
import offices from '../../src/components/offices'
import VueRouter from 'vue-router'
import Vuex from 'vuex'


Vue.use(Vuetify,Vuex)
const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()
const routeEdit = {
    path: '/workplaces/edit'
}

describe("Add-Office.Vue", () =>{
    let vuetify
    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it("Show table of offices",()=>{
      const wrapper = mount(AddOffice,{localVue, vuetify})

      const table = wrapper.find('.v-card__title > span')

        expect(table.text()).toBe('Crear Oficina')
    })


    it('Check Cancel buttons redirect to workplaces', ()=>{
        const wrapper = mount(AddOffice,{localVue, vuetify, router,
        mocks:{
            route: routeEdit
        }})

        const cancelButton = wrapper.find('.v-btn')
        cancelButton.trigger('click')

        expect(wrapper.vm.route.path).toBe('/workplaces/edit')
    })

    it('Check buttons to cancel or add offices', ()=>{
        const wrapper = mount(AddOffice, {localVue, vuetify})

        const cancelButton = wrapper.find('.v-btn')

        expect(cancelButton.text()).toBe('Cancelar')
    })
})

describe('Office.Vue', ()=>{
    let vuetify
    let store
    beforeEach(() => {
        vuetify = new Vuetify()
        store = new Vuex.Store({
            state: {
                username: 'flavio.s.m@gmail.com',
                password: 'hola1234'

            },
            mutations: {
                updateName(state, username) {
            state.username = username
        }
    }
    })
    })

    /*it('Show Offices Page', ()=>{
        const wrapper = mount(offices,{localVue, vuetify, store})
        const table = wrapper.find('.v-card__title')

        expect(table.exists()).toBe(true)
    })


    it('Check button to cancel the edition from a office', ()=>{
        const wrapper = mount(offices,{localVue, vuetify, store})
        const buttonModify = wrapper.find('.v-btn')

        expect(buttonModify.exists()).toBe(true)
    })

    it('Check icon to modify a office', ()=>{
        const wrapper = mount(offices,{localVue, vuetify, store})
        
        const iconModify = wrapper.find('.v-icon')

        expect(iconModify.exists()).toBe(true)
    })*/
})
