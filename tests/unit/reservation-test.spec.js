import {shallowMount, createLocalVue, mount} from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import ReservationsTable from '../../src/components/reservations-table'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()
const routeCancelEdit = {
    path: '/workplaces/:id/reservations/:id'
}

describe('Reservations Table.Vue', () =>{
    let vuetify
    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('Show Reservations from the user', ()=>{
        const wrapper = mount(ReservationsTable,{localVue, vuetify})

        const reservations = wrapper.find('.v-card__title')

        expect(reservations.exists()).toBe(true)
    })


    it('Close the delete windows from a Reservation', ()=>{
        const wrapper = mount(ReservationsTable,{localVue, vuetify})

        const closeButton = wrapper.find('.v-btn')

        expect(closeButton.exists()).toBe(true)
    })


    it('test de icon', ()=>{
        const wrapper = mount(ReservationsTable, {localVue, vuetify,router,
            mocks:{
            route: routeCancelEdit
            }
        })

        const cancelButton = wrapper.find('.v-icon')
        cancelButton.trigger('click')

        expect(wrapper.vm.route.path).toBe('/workplaces/:id/reservations/:id')
    })
})
/*
describe('Add Reservation.Vue', ()=>{
    let vuetify
    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('show form to create reservations', ()=>{
        const wrapper = mount(AddReservation,{localVue, vuetify})

        const reservationForm = wrapper.find('.v-btn')

        expect(reservationForm.exists()).toBe(true)
    })
})*/
